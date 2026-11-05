# 5 November 2026 — Client meeting revisions

Purpose removed from Stock in/out. Stock in restricted to six independently configured foremen and live front-camera face capture, with no gallery upload. Inventory and movement tables gain small product thumbnails. Customer review states remain pending; this document records requested changes, not client acceptance or proof of Google-hosted camera compatibility.

Camera clarification: the foreman may photograph the employee or themselves using a front/rear selector. The authenticated operator and photographed person need not be the same.

Further revision: both movements require Type/Account/Password and a simple live capture. Staff accounts moves to a separate dynamic management page; fresh admin password is required for every change. Foreman-only stock in remains. Older fixed six-slot descriptions are superseded.

Status refinement: remove account Type, show Account/Status/Action, and select IN/OUT/both permissions. Operation permission is authoritative rather than a role. Existing role-based access is mapped without expansion.

Direct-camera refinement: a separate HTTPS camera page avoids requesting webcam access inside the inventory iframe. No gallery fallback is added. GitHub Pages hosting and actual phone capture remain deployment prerequisites.

Client accepted the simpler native phone capture flow instead of independent camera hosting. Capture may expose a photo-library/file option depending on browser; strict live-only assurance is no longer claimed. No GitHub Pages activation is required.
