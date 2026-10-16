/** Deploy as a web app: execute as owner. Set Script Properties first; see README. */
function doGet() {
  // Serve static HTML: no template compiler can rewrite client JavaScript.
  // The browser reads ?item via google.script.url.getLocation.
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('StockFlow Inventory management')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
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
  var p=rows_('Products'), tx=rows_('Transactions').filter(function(t){return !t.deletedAt;}), sums={};
  tx.forEach(function(t){sums[t.code]=(sums[t.code]||0)+(t.type==='IN'?1:-1)*Number(t.quantity);});
  return p.map(function(x){x.opening=Number(x.opening)||0;x.threshold=Number(x.threshold)||0;x.stock=Math.round((x.opening+(sums[x.code]||0))*1000)/1000;x.ordered=x.ordered===true||x.ordered==='TRUE';return x;});
}
function getCatalog() {
  return rows_('Products').filter(function(p){return !inactive_(p);}).map(function(p){return {code:String(p.code),name:String(p.name),category:String(p.category),unit:String(p.unit),imageUrl:catalogImage_(p.imageUrl)};});
}
function verifyAdmin_(password) {
  var expected=PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!expected || String(password)!==expected) throw new Error('Incorrect administrator password.');
}
function getAdmin(password) {
  verifyAdmin_(password);
  return {products:products_(),transactions:rows_('Transactions').filter(function(t){return !t.deletedAt;}).reverse().map(function(t){t.time=new Date(t.time).toISOString();return t;})};
}
function safe_(s) { s=String(s||'').trim(); return /^[=+@\-]/.test(s)?"'"+s:s; }
function submitMovement(data) {
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    if (!data || !/^[A-Za-z0-9_-]{12,100}$/.test(String(data.requestId))) throw new Error('Invalid request ID');
    var existing=rows_('Transactions').filter(function(t){return t.requestId===data.requestId;});
    if(existing.length&&existing[0].deletedAt) throw new Error('This request was deleted by an administrator. Start a new form if needed.');
    if(existing.length) return {ok:true,message:'This request was already recorded. Do not submit it again.'};
    var qty=Number(data.quantity);
    if (!isFinite(qty)||qty<=0||qty>1000000||Math.abs(Math.round(qty*1000)-qty*1000)>0.000001) throw new Error('Quantity must be positive, with at most three decimal places.');
    if (['IN','OUT'].indexOf(data.type)<0) throw new Error('Invalid movement type');
    if (!String(data.employee||'').trim()||String(data.employee).length>100||String(data.note||'').length>1000) throw new Error('Enter an employee ID. Notes must not exceed 1,000 characters.');
    if (data.type==='IN') verifyAdmin_(data.adminPassword);
    var p=products_().filter(function(x){return x.code===data.code;})[0];
    if (!p||inactive_(p)) throw new Error('Product not found or inactive');
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


function inactive_(p) {return p.active===false||String(p.active).toUpperCase()==='FALSE';}
function ensureColumns_(name,expected) {
  var s=db_().getSheetByName(name);
  if(!s)throw new Error('Missing '+name+' sheet. Run setup first.');
  var h=s.getDataRange().getValues()[0];
  for(var i=0;i<expected.length;i++) {
    if(h[i]&&h[i]!==expected[i]) throw new Error('Unexpected '+name+' column '+(i+1)+'. Check sheet headers.');
    if(!h[i])s.getRange(1,i+1).setValue(expected[i]);
  }
  return s;
}
function productSheet_(){return ensureColumns_('Products',['code','name','category','unit','opening','threshold','imageUrl','ordered','active','deletedAt']);}
function transactionSheet_(){return ensureColumns_('Transactions',['requestId','time','code','type','quantity','employee','note','photoUrl','deletedAt','deleteReason']);}
function number_(v,label) {
  if(v===''||v===null||v===undefined)throw new Error(label+' is required.');
  var n=Number(v);
  if(!isFinite(n)||n<0||n>1000000000||Math.abs(n*1000-Math.round(n*1000))>0.00001)throw new Error(label+' must be non-negative with at most 3 decimal places.');
  return n;
}
function saveProduct(password,data) {
  verifyAdmin_(password);
  if(!data)throw new Error('Product details are required.');
  var code=String(data.code||'').trim().toUpperCase(),original=String(data.originalCode||'');
  if(!/^[A-Z0-9][A-Z0-9_-]{0,39}$/.test(code))throw new Error('Use a unique product code of 1–40 letters, numbers, hyphens or underscores.');
  if(original&&original!==code)throw new Error('Product codes cannot be changed because QR labels and history use them.');
  var name=String(data.name||'').trim(),unit=String(data.unit||'').trim(),category=String(data.category||'').trim();
  if(!name||name.length>200||!unit||unit.length>30||category.length>100)throw new Error('Enter a name (max 200), unit (max 30) and category (max 100).');
  var opening=number_(data.opening,'Opening stock'),threshold=number_(data.threshold,'Threshold'),url=String(data.imageUrl||'').trim();
  if(url&&!/^https:\/\/[^\s<>"']{1,2000}$/.test(url)&&!/^drive:[A-Za-z0-9_-]+$/.test(url))throw new Error('Enter an HTTPS image URL or retain the uploaded photo reference.');
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    var s=productSheet_(),v=s.getDataRange().getValues(),row=0;
    for(var i=1;i<v.length;i++)if(v[i][0]===code){row=i+1;break;}
    if(original&&!row)throw new Error('Product no longer exists. Refresh and try again.');
    if(!original&&row)throw new Error('This code already exists, including inactive products. Use Edit or Restore.');
    var tx=rows_('Transactions').filter(function(t){return t.code===code;}),current=opening;
    tx.forEach(function(t){if(!t.deletedAt)current+=(t.type==='IN'?1:-1)*Number(t.quantity);});
    if(current<-0.00001)throw new Error('Opening stock would make current stock negative.');
    if(row&&tx.length&&String(v[row-1][3])!==unit)throw new Error('Unit cannot change after transactions exist. Create a new product code for a different unit.');
    var values=[code,safe_(name),safe_(category),safe_(unit),opening,threshold,url,row?v[row-1][7]:false,row?!inactive_({active:v[row-1][8]}):true,row?(v[row-1][9]||''):''];
    if(row)s.getRange(row,1,1,10).setValues([values]);else s.appendRow(values);
    SpreadsheetApp.flush();return {ok:true,message:original?'Product updated.':'Product added.'};
  } finally {lock.releaseLock();}
}
function setProductActive(password,code,active) {
  verifyAdmin_(password);
  if(typeof active!=='boolean')throw new Error('Invalid product status.');
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {var s=productSheet_(),v=s.getDataRange().getValues();
    for(var i=1;i<v.length;i++)if(v[i][0]===code){s.getRange(i+1,9).setValue(active);s.getRange(i+1,10).setValue(active?'':new Date().toISOString());SpreadsheetApp.flush();return {ok:true};}
    throw new Error('Product not found');
  } finally {lock.releaseLock();}
}
function deleteTransaction(password,requestId,reason) {
  verifyAdmin_(password);reason=String(reason||'').trim();
  if(!reason||reason.length>500)throw new Error('Enter a deletion reason (max 500 characters).');
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {var s=transactionSheet_(),v=s.getDataRange().getValues(),row=0;
    for(var i=1;i<v.length;i++)if(v[i][0]===requestId){row=i+1;break;}
    if(!row)throw new Error('Record not found');
    if(v[row-1][8])return {ok:true,message:'This record was already deleted.'};
    var record=v[row-1],p=products_().filter(function(x){return x.code===record[2];})[0];
    if(!p)throw new Error('Product missing. Restore its sheet row before deleting this record.');
    var next=p.stock+(record[3]==='IN'?-1:1)*Number(record[4]);
    if(next<-0.00001)throw new Error('Deleting this receipt would make stock negative. Correct the related issue records first.');
    s.getRange(row,9,1,2).setValues([[new Date().toISOString(),safe_(reason)]]);
    SpreadsheetApp.flush();return {ok:true,message:'Record deleted. Stock has been recalculated.'};
  } finally {lock.releaseLock();}
}
function getDeploymentUrl(){return ScriptApp.getService().getUrl()||'';}

function getBranding() {
  var settings=rows_('Settings'),name='StockFlow',logo='';
  settings.forEach(function(r){if(r.key==='companyName'&&String(r.value||'').trim())name=String(r.value);if(r.key==='companyLogo')logo=String(r.value||'');});
  if(!/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(logo)||logo.length>45000)logo='';
  return {companyName:name,logoData:logo};
}
function saveBranding(password,data) {
  verifyAdmin_(password);
  var name=String(data&&data.companyName||'').trim(),logo=String(data&&data.logoData||'');
  if(!name||name.length>100||/^[=+@\-]/.test(name))throw new Error('Enter a company name of 1–100 characters, without a spreadsheet formula prefix.');
  if(logo) {
    var m=logo.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/);
    if(!m||logo.length>45000)throw new Error('Logo is too large or has an unsupported format. Please choose a smaller JPG, PNG or WebP image.');
    var bytes=Utilities.base64Decode(m[2]),sig=bytes.slice(0,12).map(function(b){return b&255;});
    var valid=m[1]==='image/jpeg'?sig[0]===255&&sig[1]===216&&sig[2]===255:m[1]==='image/png'?sig.slice(0,8).join(',')==='137,80,78,71,13,10,26,10':sig.slice(0,4).join(',')==='82,73,70,70'&&sig.slice(8,12).join(',')==='87,69,66,80';
    if(!valid)throw new Error('Invalid logo image content.');
  }
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try {
    var s=ensureColumns_('Settings',['key','value']),rows=s.getDataRange().getValues();
    [['companyName',name],['companyLogo',logo]].forEach(function(pair){var row=0;for(var i=1;i<rows.length;i++)if(rows[i][0]===pair[0]){row=i+1;break;}if(row)s.getRange(row,2).setValue(pair[1]);else s.appendRow(pair);});
    SpreadsheetApp.flush();return {companyName:name,logoData:logo};
  } finally {lock.releaseLock();}
}
