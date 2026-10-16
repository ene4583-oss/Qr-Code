/** Deploy as a web app: execute as owner. Set Script Properties first; see README. */
function doGet(e) {
  var t = HtmlService.createTemplateFromFile('Index');
  t.itemCode = (e && e.parameter.item) || '';
  return t.evaluate().setTitle('StockFlow Inventory management').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
function db_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('The administrator has not configured SHEET_ID.');
  return SpreadsheetApp.openById(id);
}
function setup() {
  if (PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL')) MailApp.getRemainingDailyQuota();
  var db = db_();
  var schemas = {
    Products: ['code','name','category','unit','opening','threshold','imageUrl','ordered'],
    Transactions: ['requestId','time','code','type','quantity','employee','note','photoUrl'],
    Settings: ['key','value']
  };
  Object.keys(schemas).forEach(function(name) {
    var s = db.getSheetByName(name) || db.insertSheet(name);
    if (!s.getLastRow()) { s.appendRow(schemas[name]); s.setFrozenRows(1); }
  });
}
function rows_(name) {
  var s = db_().getSheetByName(name);
  if (!s) throw new Error('Run setup first');
  var v = s.getDataRange().getValues(), h = v.shift();
  return v.filter(function(r){return r[0] !== '';}).map(function(r){var o={};h.forEach(function(k,i){o[k]=r[i];});return o;});
}
function products_() {
  var p=rows_('Products'), tx=rows_('Transactions'), sums={};
  tx.forEach(function(t){sums[t.code]=(sums[t.code]||0)+(t.type==='IN'?1:-1)*Number(t.quantity);});
  return p.map(function(x){x.opening=Number(x.opening)||0;x.threshold=Number(x.threshold)||0;x.stock=Math.round((x.opening+(sums[x.code]||0))*1000)/1000;x.ordered=x.ordered===true||x.ordered==='TRUE';return x;});
}
function getCatalog() {
  return rows_('Products').map(function(p){return {code:String(p.code),name:String(p.name),category:String(p.category),unit:String(p.unit),imageUrl:catalogImage_(p.imageUrl)};});
}
function verifyAdmin_(password) {
  var expected=PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!expected || String(password)!==expected) throw new Error('Incorrect administrator password.');
}
function getAdmin(password) {
  verifyAdmin_(password);
  return {products:products_(),transactions:rows_('Transactions').reverse().map(function(t){t.time=new Date(t.time).toISOString();return t;})};
}
function safe_(s) { s=String(s||'').trim(); return /^[=+@\-]/.test(s)?"'"+s:s; }
function submitMovement(data) {
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    if (!data || !/^[A-Za-z0-9_-]{12,100}$/.test(String(data.requestId))) throw new Error('Invalid request ID');
    var existing=rows_('Transactions').filter(function(t){return t.requestId===data.requestId;});
    if(existing.length) return {ok:true,message:'This request was already recorded. Do not submit it again.'};
    var qty=Number(data.quantity);
    if (!isFinite(qty)||qty<=0||qty>1000000||Math.abs(Math.round(qty*1000)-qty*1000)>0.000001) throw new Error('Quantity must be positive, with at most three decimal places.');
    if (['IN','OUT'].indexOf(data.type)<0) throw new Error('Invalid movement type');
    if (!String(data.employee||'').trim()||String(data.employee).length>100||String(data.note||'').length>1000) throw new Error('Enter a name. Notes must not exceed 1,000 characters.');
    if (data.type==='IN') verifyAdmin_(data.adminPassword);
    var p=products_().filter(function(x){return x.code===data.code;})[0];
    if (!p) throw new Error('Product not found');
    if(data.type==='OUT'&&qty>p.stock) throw new Error('Unable to issue items. Please contact the administrator to check stock.');
    var match=String(data.photo||'').match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if(!match) throw new Error('Please provide a JPG, PNG or WebP photo.');
    var bytes=Utilities.base64Decode(match[2]);
    if(bytes.length>2*1024*1024) throw new Error('Photo must not exceed 2MB');
    var folderId=PropertiesService.getScriptProperties().getProperty('PHOTO_FOLDER_ID');
    if(!folderId) throw new Error('The administrator has not configured the photo folder.');
    var ext=match[1].split('/')[1];
    var file=DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(bytes,match[1],data.requestId+'.'+ext));
    try { db_().getSheetByName('Transactions').appendRow([data.requestId,new Date(),p.code,data.type,qty,safe_(data.employee),safe_(data.note),file.getUrl()]); SpreadsheetApp.flush(); }
    catch(e) { file.setTrashed(true);throw e; }
    var next=p.stock+(data.type==='IN'?qty:-qty);
    if(data.type==='IN'&&next>p.threshold) setOrdered_(p.code,false);
    // A mail failure must not turn a committed transaction into a failed response.
    if(data.type==='OUT'&&p.stock>p.threshold&&next<=p.threshold&&!p.ordered) {
      try { var email=PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL');if(email) MailApp.sendEmail(email,'Reorder alert: '+p.code+' '+p.name,'Current stock: '+next+' '+p.unit+'; threshold: '+p.threshold+'. Sign in to the admin page to arrange a reorder.'); }
      catch(e) { console.error('Low-stock mail failed: '+e.message); }
    }
    return {ok:true,message:'Successfully recorded '+(data.type==='IN'?'Stock in':'Stock out')+' '+qty+' '+p.unit+'.'};
  } finally {lock.releaseLock();}
}
function setOrdered_(code, ordered) {
  var s=db_().getSheetByName('Products'),v=s.getDataRange().getValues();
  for(var i=1;i<v.length;i++)if(v[i][0]===code){s.getRange(i+1,8).setValue(ordered);return;}
}
function updateProduct(password,code,threshold,ordered) {
  verifyAdmin_(password);var n=Number(threshold);
  if(!isFinite(n)||n<0)throw new Error('The reorder threshold must be a non-negative number.');
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {var s=db_().getSheetByName('Products'),v=s.getDataRange().getValues();for(var i=1;i<v.length;i++)if(v[i][0]===code){s.getRange(i+1,6).setValue(n);s.getRange(i+1,8).setValue(Boolean(ordered));return {ok:true};}throw new Error('Product not found');} finally {lock.releaseLock();}
}

// Product photos stay private in the existing photo folder. Only explicitly linked
// product images are served to workers; transaction photos are never in the catalog.
function catalogImage_(value) {
  value=String(value||'');
  if (value.indexOf('drive:')!==0) return value;
  try {
    var id=value.substring(6);
    if(!/^[A-Za-z0-9_-]+$/.test(id)) return '';
    var file=DriveApp.getFileById(id),parents=file.getParents(),folderId=PropertiesService.getScriptProperties().getProperty('PHOTO_FOLDER_ID'),allowed=false;
    while(parents.hasNext()) if(parents.next().getId()===folderId) allowed=true;
    if(!allowed||file.getName().indexOf('product-')!==0||file.getSize()>2*1024*1024) return '';
    var blob=file.getBlob(),mime=blob.getContentType();
    if(['image/jpeg','image/png','image/webp'].indexOf(mime)<0) return '';
    return 'data:'+mime+';base64,'+Utilities.base64Encode(blob.getBytes());
  } catch(e) {console.error('Product image unavailable: '+e.message);return '';}
}
function uploadProductPhoto(password,code,dataUrl) {
  verifyAdmin_(password);
  var match=String(dataUrl||'').match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if(!match||match[2].length>2800000) throw new Error('Choose a JPG, PNG or WebP image under 2MB.');
  var bytes=Utilities.base64Decode(match[2]);
  if(!bytes.length||bytes.length>2*1024*1024) throw new Error('Product image must be under 2MB.');
  var signature=bytes.slice(0,12).map(function(b){return b&255;});
  var valid=match[1]==='image/jpeg'?signature[0]===255&&signature[1]===216&&signature[2]===255:
    match[1]==='image/png'?signature.slice(0,8).join(',')==='137,80,78,71,13,10,26,10':
    signature.slice(0,4).join(',')==='82,73,70,70'&&signature.slice(8,12).join(',')==='87,69,66,80';
  if(!valid) throw new Error('The file content does not match its image format.');
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    var s=db_().getSheetByName('Products'),rows=s.getDataRange().getValues(),row=0;
    for(var i=1;i<rows.length;i++)if(rows[i][0]===code){row=i+1;break;}
    if(!row) throw new Error('Product not found');
    var folderId=PropertiesService.getScriptProperties().getProperty('PHOTO_FOLDER_ID');
    if(!folderId) throw new Error('The administrator has not configured the photo folder.');
    var file=DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(bytes,match[1],'product-'+code+'-'+Utilities.getUuid()+'.'+match[1].split('/')[1]));
    try {s.getRange(row,7).setValue('drive:'+file.getId());SpreadsheetApp.flush();}
    catch(e){file.setTrashed(true);throw e;}
    return {ok:true,message:'Product photo saved. Workers will see it when they reload the page.'};
  } finally {lock.releaseLock();}
}
