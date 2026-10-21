# Stock Inventory Website — Customer Requirements Review

For customer review, not completion or acceptance certification. Mark each requirement Confirmed, Change requested or Out of scope, and add comments.

| ID | User | Function | Requirement | Review check / expected behavior | Proposed priority | Customer decision | Comments / changes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | Worker | Scan product QR | Scan a label with a phone camera to open the matching product form. | Correct product selected automatically; unavailable codes do not silently select another item. | Required | Pending |  |
| R02 | Worker | Product information | Show product code, name, image when available and unit. Hide stock quantities from workers. | The worker can identify the product without seeing its stock balance. | Required | Pending |  |
| R03 | Worker | Stock issue form | Enter employee ID and quantity, attach a photo, and optionally add a note. | Missing ID/photo or a non-positive quantity is rejected. IDs can contain letters or leading zeroes. | Required | Pending |  |
| R04 | System | Automatic stock calculation | An issue deducts stock; an administrator receipt adds stock. | From 10 units: issue 1 gives 9; receive 1 gives 10. Insufficient stock is rejected. | Required | Pending |  |
| R05 | Administrator | Stock receipts | Require the administrator password when recording incoming stock. | A receipt without valid administrator authorization is rejected. | Required | Pending |  |
| R06 | System | Prevent duplicate movements | Retrying the same submission must not apply the stock change twice. | Retrying one recorded request leaves only one active stock effect. | Required | Pending |  |
| R07 | Administrator | Inventory and history | View stock balances, units and recent movements, including employee ID, time and photo references. | An administrator can check a recorded movement and open its photo with the necessary Drive permission. | Required | Pending |  |
| R08 | Administrator | Add and edit products | Maintain code, name, category, unit, opening balance, threshold and product image. | New active products appear in the worker list. Codes are unique and stable; units cannot change after transactions exist. | Required | Pending |  |
| R09 | Administrator | Delete and restore products | Remove a product from active use while retaining its history, and restore it if needed. | Deleted products cannot accept new movements. Restoration keeps the same code and history. | Required | Pending |  |
| R10 | Administrator | Product photo upload | Choose a product and upload or replace its display photo. | The new photo appears on the worker form and regenerated labels after reloading. Transaction photos remain separate. | Required | Pending |  |
| R11 | Administrator | Correct mistaken records | Delete/void a movement with a reason; recalculate stock and retain the original record for audit. | Deleting an issue restores its quantity once. A receipt deletion that makes stock negative is blocked. | Required | Pending |  |
| R12 | Administrator | Reorder thresholds | Set a separate low-stock threshold for each product and mark an item as ordered. | Stock at/below threshold is flagged unless marked as ordered. A receipt above threshold clears the ordered flag. | Required | Pending |  |
| R13 | Administrator | Reorder notifications | Display low-stock alerts while the admin page is open; optionally send threshold-crossing email. | The open dashboard checks about every 30 seconds. Configured email is attempted when stock crosses down to/below the threshold. | Optional | Pending |  |
| R14 | Administrator | Select and print QR labels | Tick one, several or all products; review the selected list and remove accidental selections. | Only selected products are printed, with code, name, unit, QR, available photo and optional label text. | Required | Pending |  |
| R15 | Administrator | Company name and logo | Change the displayed company name and upload, replace or remove the logo. | Saved branding appears on the website and newly generated labels; other devices reload to see changes. | Optional | Pending |  |
| R16 | Administrator / System | Access and shared records | Use one shared Google Sheets record store and restrict management actions to administrators. | Two administrators see the same records after refresh. Worker requests cannot access administrator actions without valid credentials. | Required | Pending |  |

## Operating Conditions and Scope

Internet access is required; use a phone browser or computer. Verify opening stock by a physical count before launch.

Administrators currently share one password and equal permissions. Employee IDs are user-entered, not verified identities.

Photos are private in Drive and need the appropriate Google permissions to view. Product display photos and company logos are visible to website users.

If anonymous access is enabled, anyone holding the link can submit an issue. The customer must confirm the access arrangement and photo-collection process.

Offline submissions, WhatsApp/Telegram/SMS and lock-screen push are not included. Email depends on authorization, quotas and delivery.

Changing names/photos retains fixed product codes. A new deployment URL or Google-account migration may require replacement QR labels.
