const vm=require('vm'),fs=require('fs'),assert=require('assert/strict');
const sheets={Products:[['code','name','category','unit','opening','threshold','imageUrl','ordered'],['DU01','Glove','Daily Use','PAIR',10,8,'',false]],Transactions:[['requestId','time','code','type','quantity','employee','note','photoUrl']]};let files=0,mails=0,lastMail=null;const properties={SHEET_ID:'test',ADMIN_PASSWORD:'secret',PHOTO_FOLDER_ID:'folder',ADMIN_EMAIL:'admin@example.com'},authCache={};
const sheet=n=>({getDataRange:()=>({getValues:()=>sheets[n].map(r=>r.slice())}),appendRow:r=>sheets[n].push(r),getRange:(r,c)=>({setValue:v=>sheets[n][r-1][c-1]=v,setValues:values=>values.forEach((row,di)=>row.forEach((value,dj)=>{sheets[n][r-1+di][c-1+dj]=value;}))})});
const context={console,PropertiesService:{getScriptProperties:()=>({getProperty:k=>properties[k],setProperty:(k,v)=>properties[k]=v,getProperties:()=>({...properties})})},CacheService:{getScriptCache:()=>({get:k=>authCache[k],put:(k,v)=>authCache[k]=v,remove:k=>delete authCache[k]})},SpreadsheetApp:{openById:()=>({getSheetByName:sheet}),flush(){}},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},DriveApp:{getFolderById:()=>({createFile:()=>{files++;return {getUrl:()=> 'https://drive.google.com/file/test',setTrashed(){}}}})},Utilities:{getUuid:()=>require('crypto').randomUUID(),computeHmacSha256Signature:(password,salt)=>Array.from(require('crypto').createHmac('sha256',salt).update(password).digest()),base64Decode:s=>Buffer.from(s,'base64'),newBlob:()=>({})},UrlFetchApp:{fetch:()=>({getResponseCode:()=>200,getBlob:()=>({getContentType:()=> 'image/jpeg',getBytes:()=>Buffer.from([255,216,255])})})},MailApp:{sendEmail:message=>{mails++;lastMail=message;}}};vm.createContext(context);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../apps-script/Code.gs'),'utf8'),context);
const accounts=Array.from({length:6},(_,i)=>({id:'F'+(i+1),name:'Foreman '+(i+1),enabled:i<2,salt:'legacy-'+i,hash:context.staffPasswordHash_('ForemanPass'+(i+1),'legacy-'+i)}));properties.FOREMAN_ACCESS_V1=JSON.stringify(accounts);assert.equal(context.getStaffAccounts('secret').length,6);assert(!JSON.stringify(context.getStaffAccounts('secret')).includes('hash'));
assert(!('stock' in context.getCatalog()[0]));assert(!('opening' in context.getCatalog()[0]));assert.throws(()=>context.getAdmin('wrong'),/password/);
let req={requestId:'request_test_001',code:'DU01',type:'OUT',quantity:3,employee:'=HYPERLINK("x")',note:'test',staffType:'Foreman',account:'F1',staffPassword:'ForemanPass1',photoSource:'camera',capturedAt:new Date().toISOString(),photo:'data:image/jpeg;base64,YWJj'};
assert(context.submitMovement(req).ok);assert.equal(context.getAdmin('secret').products[0].stock,7);assert.equal(mails,1);context.submitMovement(req);assert.equal(files,1);assert.equal(sheets.Transactions.length,2);assert(context.safe_('=HYPERLINK("x")').startsWith("'="));assert.equal(sheets.Transactions[1][5],'F1');assert.throws(()=>context.submitMovement({...req,requestId:'request_test_002',quantity:8}),/Unable to issue/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_003',quantity:-1}),/Quantity/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_004',type:'IN',staffPassword:'wrong',adminPassword:'secret'}),/password/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_005',photo:''}),/photo/);context.updateProduct('secret','DU01',8,true);context.submitMovement({...req,requestId:'request_test_006',type:'IN',quantity:20,staffType:'Foreman',account:'F1',staffPassword:'ForemanPass1',photoSource:'camera',capturedAt:new Date().toISOString()});assert.equal(context.getAdmin('secret').products[0].stock,27);assert.equal(context.getAdmin('secret').products[0].ordered,false);context.submitMovement({...req,requestId:'request_test_007',quantity:1.001});assert.equal(context.getAdmin('secret').products[0].stock,25.999);console.log('PASS backend simulation: private catalog, auth, OUT/IN, threshold mail, duplicate idempotency, insufficient stock, negative quantity, photo required, spreadsheet formula escaping, order reset, decimal quantities. Google services mocked.');
// Product upload must be admin-only, must leave balances intact, and must not
// expose transaction photos or arbitrary Drive files through the catalog.
let storedName='',storedBlob=null,trashed=false;
context.Utilities.getUuid=()=> 'test-uuid';
context.Utilities.newBlob=(bytes,mime,name)=>({getBytes:()=>bytes,getContentType:()=>mime,name});
context.Utilities.base64Encode=bytes=>Buffer.from(bytes).toString('base64');
context.DriveApp.getFolderById=()=>({createFile:blob=>{storedName=blob.name;storedBlob=blob;return {getId:()=> 'photo_123',setTrashed:()=>{trashed=true;}};}});
context.DriveApp.getFileById=()=>({getName:()=>storedName,getBlob:()=>storedBlob,getSize:()=>storedBlob.getBytes().length,getParents:()=>{let done=false;return {hasNext:()=>!done,next:()=>{done=true;return {getId:()=> 'folder'};}};}});
const jpg='data:image/jpeg;base64,/9j/YWJj';
assert.throws(()=>context.uploadProductPhoto('wrong','DU01',jpg),/password/);
assert.throws(()=>context.uploadProductPhoto('secret','DU01','data:image/jpeg;base64,YWJj'),/format/);
assert.throws(()=>context.uploadProductPhoto('secret','UNKNOWN',jpg),/not found/);
const before=context.getAdmin('secret').products[0].stock;
assert(context.uploadProductPhoto('secret','DU01',jpg).ok);
assert.equal(sheets.Products[1][6],'drive:photo_123');
assert.equal(context.getCatalog()[0].imageUrl,jpg);
assert.equal(context.getAdmin('secret').products[0].stock,before);
storedName='request_test_001.jpeg';assert.equal(context.getCatalog()[0].imageUrl,'');
storedName='product-DU01-test.jpeg';context.DriveApp.getFileById=()=>{throw Error('Deleted');};assert.equal(context.getCatalog()[0].imageUrl,'');
console.log('PASS product images: administrator authorization, format rejection, unknown product, upload/link, private image rendering, unchanged stock, non-product photo exclusion, missing image fallback.');

// Test additive headers on original 8-column sheets, CRUD, reversible deletion
// and unchanged original rows for audit and retry safety.
assert.throws(()=>context.saveProduct('wrong',{}),/password/);
assert.throws(()=>context.setProductActive('wrong','DU01',false),/password/);
assert.throws(()=>context.deleteTransaction('wrong','request_test_001','test'),/password/);
const product={code:'NEW01',name:'New product',category:'Store',unit:'PCS',opening:10,threshold:3,imageUrl:''};
assert(context.saveProduct('secret',product).ok);
assert.equal(sheets.Products[0][8],'active');assert.equal(context.getCatalog().length,2);
assert.throws(()=>context.saveProduct('secret',product),/already exists/);
assert.throws(()=>context.saveProduct('secret',{...product,opening:-1,code:'NEW02'}),/non-negative/);
context.saveProduct('secret',{...product,originalCode:'NEW01',name:'Edited product',opening:12});
assert.equal(context.getAdmin('secret').products.find(p=>p.code==='NEW01').stock,12);
context.setProductActive('secret','NEW01',false);
assert(!context.getCatalog().some(p=>p.code==='NEW01'));
assert.throws(()=>context.submitMovement({...req,requestId:'request_archive_001',code:'NEW01'}),/inactive/);
assert.throws(()=>context.saveProduct('secret',product),/already exists/);
context.setProductActive('secret','NEW01',true);
assert(context.getCatalog().some(p=>p.code==='NEW01'));
assert.throws(()=>context.saveProduct('secret',{...product,originalCode:'DU01',code:'DU01',unit:'KG'}),/Unit cannot change/);
const balance=context.getAdmin('secret').products[0].stock;
context.deleteTransaction('secret','request_test_001','Wrong issue');
assert.equal(context.getAdmin('secret').products[0].stock,Math.round((balance+3)*1000)/1000);
assert(!context.getAdmin('secret').transactions.some(t=>t.requestId==='request_test_001'));
assert(sheets.Transactions[1][8]);assert.equal(sheets.Transactions[1][9],'Wrong issue');
context.deleteTransaction('secret','request_test_001','Retry');
assert.equal(context.getAdmin('secret').products[0].stock,Math.round((balance+3)*1000)/1000);
assert.throws(()=>context.submitMovement(req),/deleted/);
assert.throws(()=>context.deleteTransaction('secret','request_test_006',''),/reason/);
// Removing a receipt after its stock has been issued would produce a negative balance.
sheets.Transactions.push(['large_issue_0001',new Date(),'DU01','OUT',20,'Worker','', '']);
assert.throws(()=>context.deleteTransaction('secret','request_test_006','Wrong receipt'),/negative/);
context.deleteTransaction('secret','large_issue_0001','Correct issue first');
context.deleteTransaction('secret','request_test_006','Wrong receipt');
assert.equal(context.getAdmin('secret').products[0].stock,8.999);
assert(sheets.Transactions.find(r=>r[0]==='request_test_006')[8]);
console.log('PASS management: admin-only CRUD/delete, additive schema, unique codes, edits, archive/restore, inactive issue rejection, unit history protection, audit retention, void stock correction, idempotent delete, void retry rejection, negative-balance guard.');
sheets.Settings=[['key','value'],['otherSetting','keep me']];
assert.equal(context.getBranding().companyName,'StockFlow');
assert.throws(()=>context.saveBranding('wrong',{companyName:'ACME',logoData:''}),/password/);
assert.throws(()=>context.saveBranding('secret',{companyName:'=BAD',logoData:''}),/company name/);
assert.throws(()=>context.saveBranding('secret',{companyName:'ACME',logoData:'data:image/jpeg;base64,YWJj'}),/Invalid logo/);
context.saveBranding('secret',{companyName:'ACME Store',logoData:jpg});
assert.equal(context.getBranding().companyName,'ACME Store');assert.equal(context.getBranding().logoData,jpg);assert.equal(sheets.Settings[1][1],'keep me');
context.saveBranding('secret',{companyName:'New Company',logoData:''});assert.equal(context.getBranding().logoData,'');assert.equal(context.getBranding().companyName,'New Company');
console.log('PASS branding: defaults, admin authorization, validation, save/read name and logo, removal and unrelated settings preserved.');

assert.equal(sheets.Transactions[1][6],'');

context.sendReorderEmail_('admin@example.com',{code:'DU01',name:'Glove <safe>',unit:'PAIR',threshold:5,imageUrl:''},4);
assert.match(lastMail.htmlBody,/Current stock/);assert.match(lastMail.htmlBody,/4 PAIR/);assert.match(lastMail.htmlBody,/Reorder threshold/);assert.match(lastMail.htmlBody,/please reorder/);assert.match(lastMail.htmlBody,/Glove &lt;safe&gt;/);assert(lastMail.inlineImages.productPhoto);assert.match(lastMail.htmlBody,/cid:productPhoto/);
context.UrlFetchApp.fetch=()=>{throw Error('Image source unavailable');};
context.sendReorderEmail_('admin@example.com',{code:'OTHER',name:'No image',unit:'PCS',threshold:2,imageUrl:'https://example.com/missing.jpg'},0);
assert.match(lastMail.htmlBody,/Out of stock/);assert.match(lastMail.htmlBody,/Product photo unavailable/);assert(!lastMail.inlineImages);assert.match(lastMail.body,/0 PCS/);
context.sendReorderEmail_('admin@example.com',{code:'OTHER',name:'Inline image',unit:'PCS',threshold:2,imageUrl:jpg},1);
assert(lastMail.inlineImages.productPhoto);assert.match(lastMail.body,/Please arrange replenishment/);
console.log('PASS reorder email: inline product images, stock/threshold/replenishment text, HTML escaping, missing-image fallback, out-of-stock message; legacy note inputs ignored; no new purpose recorded.');


// Dynamic staff accounts preserve legacy foremen and require admin credentials
// on every mutation, regardless of whether an admin UI session is already open.
context.Utilities.getUuid=()=>require('crypto').randomUUID();
const staffInput={account:'worker01',permissions:['OUT'],newPassword:'x'};
assert.throws(()=>context.getStaffAccounts('wrong'),/administrator password/);
assert.throws(()=>context.saveStaffAccount('wrong',staffInput),/administrator password/);
assert.throws(()=>context.saveStaffAccount('secret',{...staffInput,newPassword:''}),/Set a password/);
context.saveStaffAccount('secret',staffInput);
assert.throws(()=>context.saveStaffAccount('secret',{...staffInput,account:'WORKER01'}),/already exists/);
const worker=context.getStaffAccounts('secret').find(a=>a.account==='worker01');assert(worker);assert(!JSON.stringify(worker).includes('salt'));assert(!JSON.stringify(worker).includes('hash'));assert(!JSON.stringify(worker).includes('newPassword'));
assert.equal(context.verifyStaff_('WORKER01','x','OUT').id,worker.id);
assert.throws(()=>context.verifyStaff_('worker01','x','IN'),/not allowed/);

assert.throws(()=>context.verifyStaff_('worker01','secret','OUT'),/Incorrect/);
assert.throws(()=>context.saveStaffAccount('wrong',{...staffInput,id:worker.id,newPassword:'new'}),/administrator password/);
context.saveStaffAccount('secret',{...staffInput,id:worker.id,account:'worker02',newPassword:''});assert.equal(context.verifyStaff_('worker02','x','OUT').id,worker.id);
assert.throws(()=>context.deleteStaffAccount('wrong',worker.id),/administrator password/);
context.deleteStaffAccount('secret',worker.id);context.deleteStaffAccount('secret',worker.id);assert.throws(()=>context.verifyStaff_('worker02','x','OUT'),/Incorrect/);
assert.equal(context.verifyStaff_('F1','ForemanPass1','IN').id,'F1');
context.saveStaffAccount('secret',{id:'F1',account:'chief',permissions:['IN','OUT'],newPassword:''});assert.equal(context.verifyStaff_('chief','ForemanPass1','IN').id,'F1');
assert.throws(()=>context.verifyStaff_('F1','ForemanPass1','IN'),/Incorrect/);
const longPassword='letters'.repeat(30);context.saveStaffAccount('secret',{id:'F1',account:'chief',permissions:['IN','OUT'],newPassword:longPassword});assert.equal(context.verifyStaff_('chief',longPassword,'OUT').id,'F1');
context.DriveApp.getFolderById=()=>({createFile:()=>({getUrl:()=> 'https://drive.google.com/file/face',setTrashed(){}})});
const receipt={...req,requestId:'staff_receipt_001',type:'IN',quantity:1,account:'chief',staffPassword:longPassword};
assert.throws(()=>context.submitMovement({...receipt,photoSource:'file'}),/face photo/);
assert.throws(()=>context.submitMovement({...receipt,capturedAt:new Date(Date.now()-11*60000).toISOString()}),/face photo/);
const beforeStock=context.getAdmin('secret').products[0].stock;context.submitMovement(receipt);context.submitMovement(receipt);assert.equal(context.getAdmin('secret').products[0].stock,beforeStock+1);
const record=sheets.Transactions.find(r=>r[0]===receipt.requestId);assert.equal(record[5],'chief');assert.equal(record[14],'F1');assert.equal(record[15],'Foreman');assert.equal(record[16],'chief');assert(!JSON.stringify(record).includes(longPassword));
context.saveStaffAccount('secret',{account:'ordinary',permissions:['OUT'],newPassword:'p'});
const ordinary=context.getStaffAccounts('secret').find(a=>a.account==='ordinary');
assert.throws(()=>context.submitMovement({...receipt,requestId:'staff_only_in_001',staffType:'Staff',account:'ordinary',staffPassword:'p'}),/not allowed/);
context.submitMovement({...receipt,requestId:'staff_out_000001',type:'OUT',staffType:'Staff',account:'ordinary',staffPassword:'p'});
assert.throws(()=>context.submitMovement({...receipt,requestId:'staff_file_00001',type:'OUT',staffType:'Staff',account:'ordinary',staffPassword:'p',photoSource:'file'}),/face photo/);
context.deleteStaffAccount('secret','F1');assert(!context.getStaffAccounts('secret').some(a=>a.id==='F1'));assert.throws(()=>context.verifyStaff_('chief',longPassword,'IN'),/Incorrect/);assert(context.getAdmin('secret').transactions.some(t=>t.requestId===receipt.requestId));
assert.throws(()=>context.verifyStaff_('ordinary','','OUT'),/Incorrect/);
for(let i=0;i<8;i++)context.saveStaffAccount('secret',{account:'extra'+i,permissions:['OUT'],newPassword:'a'});
assert(context.getStaffAccounts('secret').length>6);
console.log('PASS staff access: both movements authenticated; staff OUT only; no fixed account count; short/long passwords; fresh live photos; per-mutation admin checks; legacy foreman preservation/edit/tombstone; no secrets in responses or transactions; stable audit identity.');

assert(!Object.hasOwn(context.getStaffAccounts('secret')[0],'type'));
context.saveStaffAccount('secret',{account:'inonly',permissions:['IN'],newPassword:'q'});
assert(context.verifyStaff_('inonly','q','IN'));
assert.throws(()=>context.verifyStaff_('inonly','q','OUT'),/not allowed/);
const inonly=context.getStaffAccounts('secret').find(a=>a.account==='inonly');
context.saveStaffAccount('secret',{id:inonly.id,account:'inonly',permissions:['IN','OUT'],newPassword:''});assert(context.verifyStaff_('inonly','q','OUT'));
assert.throws(()=>context.saveStaffAccount('wrong',{id:inonly.id,account:'inonly',permissions:['OUT'],newPassword:''}),/administrator password/);
assert(context.verifyStaff_('inonly','q','IN'));
context.saveStaffAccount('secret',{id:inonly.id,account:'inonly',permissions:['OUT'],newPassword:''});assert.throws(()=>context.verifyStaff_('inonly','q','IN'),/not allowed/);assert(context.verifyStaff_('inonly','q','OUT'));
context.saveStaffAccount('secret',{id:inonly.id,account:'inonly',permissions:[],newPassword:''});assert.throws(()=>context.verifyStaff_('inonly','q','OUT'),/Incorrect/);
assert.throws(()=>context.saveStaffAccount('secret',{account:'bad',permissions:['BAD'],newPassword:'p'}),/valid Stock/);
console.log('PASS permission Status: no public Type, IN-only/OUT-only/both/no-access, permission revocation, passwords preserved and fresh admin authorization enforced.');

const nativeRequest={...req,requestId:'native_capture_0001',type:'OUT',account:'ordinary',staffPassword:'p',photoSource:'device-capture',capturedAt:new Date().toISOString(),quantity:1};
context.submitMovement(nativeRequest);assert.equal(sheets.Transactions.find(r=>r[0]===nativeRequest.requestId)[12],'device-capture');
console.log('PASS native photo: device-capture submission accepted and its distinct source retained for audit.');
