# INDUSTRIAL TRAINING REPORT

Project 1: QR-Based Stock Inventory Management Website

Student: Wong Sook En | Student ID: 2200498

Programme: Software Engineering

Company: Bakti Makmur (M) Sdn. Bhd.

Reporting period: 12–24 October 2026

Draft for review, prepared on 21 October 2026. Project 1 is provisionally scheduled over four reporting weeks, from 12 October to 7 November 2026. These are reporting intervals, not daily attendance records. The first two weeks focus on requirements, research and design; core implementation and testing are scheduled for Weeks 3 and 4. Activities dated 22 October onward are planned and must be updated according to actual work before submission. Meeting dates and progress should be checked against the student’s records.

## Week 1 12–17 Oct 2026

Conducted online and face-to-face discussions with the client to understand the existing stock recording process and the intended use of QR codes by workers.

Reviewed the supplied inventory spreadsheet, Google Form and product QR-code PDF. Identified relevant fields, including product code, name, unit, quantity and photo evidence.

Organised an initial requirements list covering stock issues and receipts, automatic balance calculation, worker and administrator views, and product-specific reorder thresholds.

Explored a mobile-friendly website as a practical alternative to a native application and outlined the main worker and administrator workflows.

## Week 2 19–24 Oct 2026

Progress recorded up to 21 October: researched feasible solutions, compared a mobile-friendly website with a native application, and outlined the proposed technical approach.

Studied HTML, CSS and JavaScript for the interface, Google Apps Script for backend processing, Google Sheets for data records, and Google Drive for photos.

Prepared the initial worker/admin workflow and data-field design. Considered QR-to-product navigation, employee ID entry, quantity validation, separate stock issue/receipt records and administrator access.

Planned for 22–24 October: prepare simple page wireframes, review the requirements and workflow with the client, and prioritise the core functions for development in Week 3. Full implementation, integration and acceptance testing are reserved for later weeks.

## 1. Project Background

The first project focused on a QR-based stock inventory management website. The client supplied an inventory spreadsheet and a PDF containing individual product QR codes and images. The existing QR links opened a Google Form for workers to record information when collecting items. The proposed solution aimed to bring product identification, stock movements and supporting photographs into a clearer workflow while allowing administrators to monitor stock quantities.

## 2. Week 1: Client Communication and Requirements Analysis (12–17 October 2026)

During the first reporting week, I discussed the project with the client through online communication and face-to-face meetings. The discussions helped me understand how workers identify and collect stock, what information should be recorded, and how administrators need to review inventory. I used the supplied materials to clarify the difference between a stock issue, which reduces a balance, and a stock receipt, which increases it.

I organised the requirements into worker-facing and administrator-facing functions. Workers should scan a product-specific QR code, see the product name, image and unit, and submit an employee ID, quantity and photograph. Stock quantities should be available only to administrators. The administrator requirements included inventory monitoring, individual reorder thresholds, product maintenance, correction of mistaken transactions and reprinting product QR labels. These were treated as requirements and design considerations rather than evidence that every function had been completed during the week.

I also considered whether the solution should be a native application or a website. A mobile-friendly website was selected as the initial approach because workers could open it directly through their phone camera after scanning a QR code. This reduced installation requirements and allowed the same interface to be used on phones and computers. The discussions strengthened my ability to translate a client’s operational needs into software requirements.

## 3. Week 2: Technical Exploration and Workflow Design (19–24 October 2026)

The second reporting week focused on technical exploration and initial design rather than completion of the full system. Up to 21 October, I investigated a mobile-friendly web application as the initial solution. HTML would define the page structure, CSS would control layout and readability, and JavaScript would support page interaction, validation and QR-code generation. Google Apps Script, which uses JavaScript, was identified as a suitable backend for connecting Google Sheets and Google Drive. Java and a separate native mobile application were not required for this approach.

I proposed separating product information from transaction records. The Products table would hold product codes, names, units, opening balances and reorder thresholds. The Transactions table would record stock receipts and issues, employee IDs, quantities and photo references. Google Drive would store the uploaded photo files. The proposed stock calculation was opening balance plus receipts minus issues. These structures and calculations were design decisions at this stage; integration and verification were scheduled for subsequent development work.

The worker flow was outlined as scanning a product QR code, checking the product name, image and unit, entering an employee ID and quantity, attaching a photo and submitting the form. The administrator flow included inventory review, product maintenance, reorder settings and QR-label printing. I identified positive-quantity checks, insufficient-stock handling, duplicate-request protection and server-side administrator checks as technical requirements. Employee ID entry was treated as a recording field rather than verified authentication.

For 22–24 October, the proposed tasks are to prepare simple worker and administrator page wireframes, review the workflow with the client and prioritise the implementation scope. The aim is to establish a design baseline before Week 3 development, not to claim that all features have been delivered. Initial testing ideas will also be documented, including correct QR routing, expected balance changes and photo retrieval. The actual completion of these planned tasks must be confirmed before the weekly record is finalised.

## 4. Learning Outcomes and Reflection

This project provided an opportunity to apply requirements analysis, workflow modelling and basic data design to a practical inventory problem. It also encouraged independent exploration of Google Apps Script and QR-code technology. Communicating with the client helped me explain technical choices in operational terms. I recognised the importance of protecting uploaded photographs, limiting administrative actions, preserving accurate records and distinguishing a proposed design from a verified implementation. These activities relate primarily to CO1, CO2, CO5, CO6 and CO7, while the data-handling considerations support the intent of CO3 and CO4.

## 5. Proposed One-Month Project Schedule

Week 1 — 12–17 October 2026: client discussions, review of existing stock records and forms, identification of user roles, and preparation of the initial requirements list. Expected output: a requirements draft and an outline of the existing process.

Week 2 — 19–24 October 2026: technology research, solution comparison, workflow design, data-field planning and simple page wireframes. Expected output: a proposed technical approach, workflow and prioritised development scope.

Week 3 — 26–31 October 2026 (planned): develop the worker and administrator interfaces; integrate Google Sheets and Drive; implement product-specific QR access, employee ID entry, photos, stock receipts/issues and validation. Expected output: a working core prototype for internal testing. Begin with one sample product before extending the catalog.

Week 4 — 2–7 November 2026 (planned): test and refine the core prototype; complete agreed product-management, record-correction, company-branding, QR-label and reorder-alert functions as time allows; obtain client feedback and prepare deployment and user instructions. Expected output: a reviewed release candidate and handover documentation, subject to actual test results and client acceptance. Additional messaging integrations remain outside the initial scope unless separately agreed.

