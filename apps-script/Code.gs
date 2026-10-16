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
  return rows_('Products').map(function(p){return {code:String(p.code),name:String(p.name),category:String(p.category),unit:String(p.unit),imageUrl:String(p.imageUrl||'')};});
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
