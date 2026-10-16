# StockFlow

A mobile-friendly stock inventory website with a worker form, administrator dashboard, reorder alerts, printable product QR labels, and a Google Apps Script backend for Google Sheets and Drive.

## Try the demo

Open `index.html` in a browser, or run this command from the repository:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

The demo administrator password is **demo123**. Demo data is stored only in this browser's localStorage. It is not connected to Google Sheets, is not synchronized between users, and is erased when browser site data is cleared. Photos can exhaust browser storage. Demo stock levels and thresholds are illustrative.

DU01–DU16 names and units come from the supplied inventory PDF. Product photos for DU01–DU16 are extracted from the supplied QR PDF and stored in `assets/products`. The standalone demo still uses placeholders until image URLs are supplied. Additional products, including other categories and DU17–DU18, must be imported separately. The demo catalog is included in the page source; it does not contain production stock figures.

## Features

- Workers see product name, code, category, image and unit, without stock quantities.
- Workers enter their employee ID, quantity, purpose/notes and a required photo to issue stock.
- Stock receipts require the administrator password.
- Administrators can view stock, the latest 100 movements and photo links, adjust each product's threshold, and mark products as ordered.
- The administrator page polls every 30 seconds and opens a dialog for newly detected reorder items.
- QR labels link directly to a product using `?item=DU01`.
- Photos are compressed in the browser and stored privately in Drive; Sheets stores the photo URL.

## Deploy with Google Sheets and Apps Script

1. Create a **new Google Sheet** to avoid changing the layout of the existing inventory spreadsheet. Copy the Sheet ID between `/d/` and `/edit` in its URL. This backend uses normalized tables, not the original PDF's section-based layout.
2. Create a private Google Drive folder for transaction photos and copy its folder ID. Do not publicly share this folder.
3. Open the new spreadsheet's **Extensions → Apps Script**. Copy `apps-script/Code.gs` into the script file. Add an HTML file named **Index** and copy `apps-script/Index.html` into it.
4. Under **Project Settings → Script Properties**, add:

   | Property | Value |
   | --- | --- |
   | SHEET_ID | The new spreadsheet ID |
   | PHOTO_FOLDER_ID | The private photo folder ID |
   | ADMIN_PASSWORD | A long, random administrator password; do not use demo123 |
   | ADMIN_EMAIL | Optional: reorder email recipient |

   Keep the password in Script Properties, never in source code, public files or spreadsheet cells.
5. Run the `setup` function from the editor and grant the requested Google permissions. It creates Products, Transactions and Settings sheets without overwriting non-empty sheets. Administrator management operations add their required columns to the right of the original columns automatically. If ADMIN_EMAIL is configured, setup also requests email authorization. Settings is reserved for future use and currently unused.
6. Import `products-import.csv` into **Products**, replacing that sheet's contents. Preserve the exact English header names and column order. This CSV contains PDF opening balances: DU01 = 10, others = 0. Thresholds start at 0. Check actual physical stock and set appropriate thresholds before use; do not import demo balances.
7. Products columns are:

   ```text
   code,name,category,unit,opening,threshold,imageUrl,ordered
   ```

   Codes must be unique. `opening` is the verified starting balance at launch; `threshold` is the product-specific reorder point; `ordered` is TRUE/FALSE. KG quantities support up to three decimal places. Set `imageUrl` to a readable HTTPS image URL; an ordinary Drive preview page URL is not a direct image URL. Test product images on a phone.
8. Choose **Deploy → New deployment → Web app**, executing as yourself. Select the access scope supported by your Google Workspace policies. Workers without Google accounts require anonymous access; if your organization prohibits it, use supported account access or ask its administrator about policy. Copy the URL ending in `/exec`.
9. Open `/exec` on a phone, confirm the catalog loads, then sign in as administrator and check balances and thresholds. The production page has no demo banner and does not accept demo123 unless you incorrectly configured it as your password.
10. Open **QR labels**, paste the production `/exec` URL and generate labels. Scan one label on a phone, verify the product, then print the remaining labels.
11. Before launch, use a separate test Sheet and folder to verify stock out, stock in, photos, insufficient-stock rejection and reorder email delivery. Verify the resulting Sheet rows and Drive files. Test movements affect balances; do not casually delete real transaction records.

After updates, edit the **existing deployment** and select a new version to preserve its `/exec` URL. Creating a different deployment URL may leave printed labels pointing to the old version.

## Stock and alert behavior

Current stock is calculated as **opening balance + receipts − issues**. Movement submissions append transaction rows. Administrators can void a mistaken record with a reason; the app excludes voided rows from stock and history while retaining the original row and photo for audit. Avoid manually editing or deleting spreadsheet rows.

Apps Script uses a script lock to serialize movements and administrator updates. Request IDs prevent a retry of the same request from deducting stock twice. Editing the form creates a new request ID. After a timeout, retry the unchanged form first and confirm the result before starting another movement.

A product needs reordering when stock is at or below its threshold and it is not marked as ordered. Email is attempted when an issue crosses from above the threshold to at/below it. Further issues below the threshold do not repeatedly send email. Products imported with low stock appear in the dashboard but do not trigger an initial email automatically.

Marking an item as ordered suppresses repeat reorder alerts. A receipt taking its stock above the threshold clears the ordered flag. Partial receipts that leave stock low retain the flag; an administrator can cancel it manually.

On-page alert dialogs require the administrator page to be open. **This version has no PWA installation or phone lock-screen push notifications.** Email delivery depends on Google authorization, quotas and delivery conditions. Email failure is logged and does not undo a saved movement.

## Access and limitations

This is a first version for a small internal team. It uses a shared administrator password, not individual administrator accounts. Employee IDs are self-reported, not verified identities. If deployed anonymously, anyone with the link can submit stock issues; a QR code is not authentication. Choose account-based access restrictions or add worker authentication and abuse controls according to your operational requirements before production use.

The production worker catalog endpoint omits stock quantities. Administrator operations are checked on the server; hiding interface elements is not the access control.

Photos are required, compressed, and limited to 2MB by the backend. Users may choose an existing image; the app cannot prove a photo was taken live. Photos remain private in Drive. Give authorized administrators access through their Google accounts; the app password does not grant Drive permissions.

This version does not include SMS, WhatsApp, purchase approval, supplier management, offline submission or a full product edit history. Deleted transaction rows retain their deletion timestamp and reason. Google services have quotas. Stock calculations currently scan the transaction table; larger datasets need aggregation, pagination or a database.

## Validation

Run the backend simulation with Node.js (no package install required):

```sh
node tests/backend.cjs
```

Google services are mocked in this test. It verifies catalog stock privacy, administrator checks, stock in/out, crossing-threshold email calls, idempotent retries, insufficient stock, invalid quantities, required photos, formula escaping, ordered-flag reset and decimal quantities.

Browser checks cover product deep links, worker stock visibility, invalid/valid administrator sign-in, reorder dialogs, threshold/order updates, photographed stock out 48→45, photographed stock in 45→65, 16 generated QR labels, sign-out and mobile layout. Real Google authorization, Sheets writes, Drive uploads, email delivery and phone camera behavior must still be verified in your Google deployment. No live Google integration is claimed.

QR generation uses vendored qrcode-generator 1.4.4 with its original MIT license notice. The website requires no runtime CDN download.

## Add photos to an existing deployment

No code redeployment is needed. In Products, verify rows 2–17 are DU01–DU16 in order, then paste the 16 lines in `product-image-urls.txt` into G2 (imageUrl). Do not replace the whole sheet or change balances/transactions. Reload the worker page to load updated images. Images are publicly served from this repository. DU03 has inconsistent names in the source documents: inventory says Latex glove, while the QR PDF says Cloth Glove; confirm the product before operational use.

## Administrator product photo uploads

The **Manage inventory → Product photo upload** section lets an administrator choose a product, select a JPG/PNG/WebP image, preview it and upload it. Images are resized to at most 900 pixels and compressed before submission. This operation never changes stock or transaction photos.

Update both `Code.gs` and `Index.html` in Apps Script, save, then edit the existing deployment and choose **New version**. Preserve the existing deployment URL and all Script Properties. No `setup` rerun, CSV reimport or schema change is required. Test with one product after deployment.

Uploads use the existing PHOTO_FOLDER_ID without making the folder public. Products.imageUrl is automatically set to an internal `drive:<file ID>` reference. The catalog reads that explicitly linked product image and returns image data to workers; transaction photos stay private. Do not replace these references with ordinary Drive preview links. Existing HTTPS image links continue to work. Product display images are visible to everyone allowed to access the website.

Workers on other devices must reload to see a replacement photo. Old uploaded product photos are retained in Drive rather than deleted, allowing manual recovery; this consumes Drive storage. A deleted/inaccessible image falls back to a placeholder. Drive/Apps Script quotas and catalog payload size apply, so this approach is intended for a small catalog. Local demo uploads remain browser-only.

Backend simulations additionally cover upload authorization, invalid image formats, unknown products, unchanged stock, linked image delivery and unavailable image fallback. Local browser verification covers preview/upload, worker rendering, persistence after reload, invalid-file rejection and mobile layout. Live Google upload remains a deployment check in the owner's account.

## Photo + QR printable labels

The QR labels page now prints the product photo beside the QR code, followed by product code, name and unit. It uses the configured/uploaded photo first and falls back to the supplied PDF photos for DU01–DU16. Products without an available image show a placeholder. These fallback photos are public GitHub assets; product-image uploads remain in Drive. Printing waits for image decoding; choose A4, disable browser headers/footers and test-scan a printed label. The print layout uses two columns. Existing QR destination URLs stay unchanged.


## Product management and correcting mistakes

In **Manage inventory**, use **+ Add product**, **Edit**, **Delete product**, or **Restore product**. Product codes are unique, including archived products, and cannot be renamed because QR labels/history use them. Deleted products disappear from worker lists and cannot accept movements, but keep their balances, images and history. Use **Show deleted products** to restore one. Unit changes are blocked after any transaction exists. Opening balance changes affect current stock and require confirmation; use Stock in for normal receipts.

In **Recent stock movements**, only administrators can use **Delete record**. Enter a reason and confirm. Deleting an issue adds its quantity back; deleting a receipt subtracts its quantity. A receipt cannot be deleted if this would make stock negative: correct related issue records first. Deletion is a logical void, not physical removal, retaining original row/photo, deletedAt and deleteReason for audit and duplicate-request safety. Repeated deletion does not reverse stock twice. A retry of a voided original movement is rejected. Void/correction operations update dashboard alerts but do not send threshold-crossing emails.

**Print QR** on each product opens its printable label. Alternatively open **QR labels**, choose one product or all, enter an optional extra label such as a shelf name, generate and print/save PDF. Labels contain the product name, code, unit, photo when available, and QR. The production URL is loaded automatically from Apps Script. Test-scan labels after deployment.

### Upgrade an existing deployment

1. Keep the current working deployment selected while copying updated code; optionally make a spreadsheet backup first.
2. Replace the contents of both Code.gs and Index.html from this repository and save. Do not change Script Properties, reimport CSV or delete any sheets.
3. The HTML is now served directly using createHtmlOutputFromFile, without server-side scriptlets. QR parameters are read with google.script.url.getLocation inside the Apps Script iframe. Both files must be updated together.
4. Use **Deploy → Test deployments** to validate the saved code as owner without replacing the working deployment. Check the catalog, administrator login, a test product and its QR label. No live Google deployment has been tested by the repository's local automated checks.
5. Edit the existing deployment, choose **New version**, then deploy, retaining the existing /exec URL.

Existing eight-column Products/Transactions sheets remain readable. Management operations add Products columns I/J (`active`, `deletedAt`) and Transactions columns I/J (`deletedAt`, `deleteReason`) as needed; blank active values mean active. Original headers, rows, balances, links and Script Properties are preserved. The app refuses unexpected column headers rather than overwriting them. Do not reorder sheet columns.

### Management tests

`node tests/backend.cjs` also tests additive headers, administrator-only management/deletion, duplicate and archived codes, editing, archive/restore, inactive stock rejection, unit protection, void audit retention, recalculated stock, repeated deletion and negative-balance protection. With Playwright and Chromium available, run `node tests/browser.cjs` for CRUD, single-product QR/photo/extra-label generation, recorded movement deletion, invalid QR safety and a mocked Apps Script iframe startup. CHROMIUM_PATH can override the browser executable. These are local tests, not a claim of live Google deployment verification.

## Employee IDs

The movement form and administrator history show Employee ID. IDs are stored as text (including leading zeroes) in the existing `employee` column for compatibility. Do not rename that Sheet header. Old name values remain as originally submitted; they are not converted to IDs. Employee IDs are required but are not verified against a staff directory.
