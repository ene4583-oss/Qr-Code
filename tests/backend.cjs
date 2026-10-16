const vm=require('vm'),fs=require('fs'),assert=require('assert/strict');
const sheets={Products:[['code','name','category','unit','opening','threshold','imageUrl','ordered'],['DU01','Glove','Daily Use','PAIR',10,8,'',false]],Transactions:[['requestId','time','code','type','quantity','employee','note','photoUrl']]};let files=0,mails=0;
const sheet=n=>({getDataRange:()=>({getValues:()=>sheets[n].map(r=>r.slice())}),appendRow:r=>sheets[n].push(r),getRange:(r,c)=>({setValue:v=>sheets[n][r-1][c-1]=v,setValues:values=>values.forEach((row,di)=>row.forEach((value,dj)=>{sheets[n][r-1+di][c-1+dj]=value;}))})});
const context={console,PropertiesService:{getScriptProperties:()=>({getProperty:k=>({SHEET_ID:'test',ADMIN_PASSWORD:'secret',PHOTO_FOLDER_ID:'folder',ADMIN_EMAIL:'admin@example.com'}[k])})},SpreadsheetApp:{openById:()=>({getSheetByName:sheet}),flush(){}},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},DriveApp:{getFolderById:()=>({createFile:()=>{files++;return {getUrl:()=> 'https://drive.google.com/file/test',setTrashed(){}}}})},Utilities:{base64Decode:s=>Buffer.from(s,'base64'),newBlob:()=>({})},MailApp:{sendEmail:()=>mails++}};vm.createContext(context);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../apps-script/Code.gs'),'utf8'),context);
assert(!('stock' in context.getCatalog()[0]));assert(!('opening' in context.getCatalog()[0]));assert.throws(()=>context.getAdmin('wrong'),/password/);
let req={requestId:'request_test_001',code:'DU01',type:'OUT',quantity:3,employee:'=HYPERLINK("x")',note:'test',photo:'data:image/jpeg;base64,YWJj'};
assert(context.submitMovement(req).ok);assert.equal(context.getAdmin('secret').products[0].stock,7);assert.equal(mails,1);context.submitMovement(req);assert.equal(files,1);assert.equal(sheets.Transactions.length,2);assert(sheets.Transactions[1][5].startsWith("'="));assert.throws(()=>context.submitMovement({...req,requestId:'request_test_002',quantity:8}),/Unable to issue/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_003',quantity:-1}),/Quantity/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_004',type:'IN'}),/password/);assert.throws(()=>context.submitMovement({...req,requestId:'request_test_005',photo:''}),/photo/);context.updateProduct('secret','DU01',8,true);context.submitMovement({...req,requestId:'request_test_006',type:'IN',quantity:20,adminPassword:'secret'});assert.equal(context.getAdmin('secret').products[0].stock,27);assert.equal(context.getAdmin('secret').products[0].ordered,false);context.submitMovement({...req,requestId:'request_test_007',quantity:1.001});assert.equal(context.getAdmin('secret').products[0].stock,25.999);console.log('PASS backend simulation: private catalog, auth, OUT/IN, threshold mail, duplicate idempotency, insufficient stock, negative quantity, photo required, spreadsheet formula escaping, order reset, decimal quantities. Google services mocked.');
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
