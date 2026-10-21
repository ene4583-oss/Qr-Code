INDUSTRIAL TRAINING REPORT AT

BAKTI MAKMUR (M) SDN. BHD.

BY

WONG SOOK EN

(2200498)

Programme: Software Engineering

Lee Kong Chian Faculty of Engineering and Science

Lee Kong Chian Faculty of Engineering and Science Universiti Tunku Abdul Rahman

October 2026 Trimester

## DECLARATION

I sincerely declare that:

I am the sole writer of this report

The information contained in the Industrial Training Report is correct to the knowledge of the author during the training period.

All the information contained in this Industrial Training Report has NO CONFIDENTIAL INFORMATION AND NOT IN CONFLICT with the company’s interest.

Unsigned draft: the student must verify the statements above, revise the text to reflect actual work, and meet university requirements concerning assisted writing before signing.

Name: Wong Sook En

ID No.: 2200498

Signature: ____________________

Date: To be completed on actual signing

## SUMMARY

This report presents the first software engineering internship project at Bakti Makmur (M) Sdn. Bhd.: a QR-based stock inventory management website. The training plan covers 12 October 2026 to 9 January 2027, while Project 1 is provisionally scheduled over four weeks, 12 October to 7 November 2026. The report describes requirements analysis, technical research, workflow and data design, professional practice and planned next steps. Workers scan product QR codes to enter an employee ID, quantity and photo; administrators manage inventory, products, corrections, labels and reorder settings. The proposed stack uses HTML, CSS, JavaScript, Google Apps Script, Google Sheets and Drive. This is an interim draft as at 21 October; future work and test outcomes are not represented as completed facts. Actual evidence and later training work must be added before final submission.

Keywords: inventory management; QR codes; web application; Google Apps Script; industrial training.

## TABLE OF CONTENTS

## LIST OF TABLES AND APPENDICES

Table A1: Requirements list

Table A2: One-month project schedule

Table A3: Functional test plan

Appendix A: Requirements, schedule and test cases

Appendix B: Deployment and user guidance

Appendix C: Evidence and outstanding information

## CHAPTER 1 — INTRODUCTION

### 1.1 Company and Training Context

Bakti Makmur (M) Sdn. Bhd. is the host organisation stated in my Industrial Training Plan. My programme is Software Engineering, and the training period recorded in the plan is 12 October 2026 to 9 January 2027. The industry supervisor named in the plan is Christopher Kong San Hor, IT Technician. This report concentrates on the first assigned project: a QR-based stock inventory management website.

The project concerns the recording of stock issues and receipts and the organisation of supporting product and transaction information. The client provided an inventory spreadsheet, a Google Form link, and a PDF containing individual product QR codes and photographs. These materials formed the starting point for requirements discussions. The company’s full address, business profile and complete organisation chart have not been supplied and must be confirmed before the company-background section is finalised.

### 1.2 Training Reporting Relationship

The training relationship supported by the supplied plan is: industry supervisor, Christopher Kong San Hor (IT Technician), providing guidance to the student, Wong Sook En (Software Engineering intern). This describes the internship reporting relationship only; it is not presented as a verified organisation chart of the company.

### 1.3 Project Background and Problem Definition

The original workflow required workers to scan an item’s QR code and complete a Google Form. The proposed improvement was to connect product identification, employee information, quantities and photographic evidence with a consistent stock calculation. The administrator also needed a practical way to inspect balances and identify items that required reordering.

The main problem was therefore a workflow and data-management problem rather than simply the creation of an online form. The design needed to distinguish a receipt from an issue, associate each movement with a product, avoid accidental duplicate processing and restrict inventory-management actions to administrators. A simple website was preferred so that workers could continue using a phone camera as their entry point.

### 1.4 Project Objectives and Scope

The objectives were to define a clear QR-to-form workflow, record stock receipts and issues, link photographs to records, and calculate balances from traceable transactions. Further requirements included product-specific reorder thresholds, administrator product maintenance, correction of mistaken records, company branding and printing selected product QR labels with identification information and photographs.

The first release was scoped as a mobile-friendly website supported by Google services. It was not a native Android or iOS application. WhatsApp, Telegram and SMS integration were deferred. Individual verified employee accounts, enterprise purchasing, offline synchronisation and large-scale warehouse functions were not included in the initial scope. These boundaries helped prioritise a manageable month-long project.

### 1.5 Report Coverage and Project Schedule

This is an interim project report drafted on 21 October 2026. The weekly records cover 12–24 October, with future activities identified as plans. The proposed first-project schedule extends to 7 November 2026. It does not represent the completion of the entire industrial training placement, which continues until January 2027. Activities and conclusions for later dates must be updated from actual records.

## CHAPTER 2 — RESEARCH / STUDY

### 2.1 Requirements Elicitation and Existing Materials

I used online discussions and face-to-face meetings with the client to understand the intended operating process. The supplied inventory document provided examples of product categories, codes, names, opening balances and units. The QR-code PDF showed how product labels were intended to be placed and scanned. I considered these documents as source data and references, rather than assuming every field and balance was already accurate.

Important clarifications included the distinction between employee-facing and administrator-facing information. Workers required the product name, image and unit, but stock quantities were to remain visible only to administrators. Employee ID replaced employee name as the requested recording field. Units such as PAIR, PCS, PACK and KG required attention because quantities have different meanings and some products permit decimal values.

### 2.2 Choice of Website Rather than Native Application

A mobile-friendly website was investigated as the simplest way to retain the existing scanning habit. A QR code can contain a web address with a product identifier, allowing a phone camera to open the correct form. Workers do not need to install a separate native application, and administrators can use the same web service on a computer.

This choice also introduced limitations. An internet connection is required for submission, phone-camera behaviour varies by browser, and a home-screen shortcut does not automatically provide native push notifications. Website dialogs require the administrator page to remain open. Email alerts can reach an administrator outside the page, while other messaging channels require additional integration.

### 2.3 Languages and Development Tools

HTML defines the structure of forms, tables, dialogs and printable labels. CSS controls spacing, colour, responsive layouts and print styling. JavaScript manages interface behaviour, validation, image preparation and QR-code generation. Google Apps Script also uses JavaScript and provides the server-side functions that read or update Google Sheets and save photo files in Google Drive. Java was listed among possible training tools in the plan, but it was not required for this website.

Google Sheets was selected as a small-team record store because administrators were already familiar with spreadsheet-based inventory information. Google Drive provides file storage for transaction and product photographs. GitHub stores source-code versions and supporting documentation. Microsoft Word is used for reporting. These choices reduce initial infrastructure complexity but do not remove the need for permission checks, validation, quotas and recovery procedures.

### 2.4 System Architecture and Data Design

The architecture separates the user interface from data-changing operations. The browser displays the form and submits a request to Apps Script. The backend validates it before writing records. Workers should not receive administrator stock data merely because a field is hidden on screen. Server-side checks are required for administrative actions.

Products holds product codes, names, categories, units, opening balances, reorder thresholds, image references and product status. Transactions holds a request identifier, time, product code, movement type, quantity, employee ID, notes and a photo reference. Settings stores the company name and logo. Product codes remain stable so that existing QR labels and transaction references continue to identify the same product.

Current stock is calculated as opening balance plus active receipts minus active issues. A corrected transaction is excluded from the calculation while its original row is retained. This supports traceability and makes the effect of a mistake understandable. Deleting a receipt must be refused when the correction would make the product balance negative.

### 2.5 QR Identification and Printable Labels

A product QR code contains the deployed website address and an item parameter. The identifier selects the product when the worker opens the form. A missing or inactive product must not silently become a different product. The worker should be prompted to contact the administrator or explicitly select an active product.

Labels combine a QR code with the product code, name, unit and an available photograph. Optional text can identify a shelf or store area. The administrator can select one item, several items or all items for printing and remove accidental selections before generation. Correct QR destinations and physical scanability must be checked; a visually present code alone does not prove that the printed label works.

### 2.6 Access Control, Validation and Limitations

The initial design uses a shared administrator password checked by backend functions. It is a limited administrative access mechanism, not a complete per-user account system. Employee IDs are self-reported values, not verified identity. If anonymous website access is enabled, anyone with the link can submit a stock issue. These constraints must be understood before wider operational use.

Other design considerations include positive quantities, decimal-unit handling, insufficient-stock rejection, file-format and size checks, duplicate-request identifiers and serialised stock updates. Photos should not be publicly shared unintentionally. Apps Script, email and Drive quotas apply, and calculating stock from all transactions will eventually require optimisation as data volume grows.

## CHAPTER 3 — INDUSTRIAL TRAINING WORKING EXPERIENCE

### 3.1 Week 1: Communication and Requirements Analysis

During the first reporting interval, 12–17 October 2026, the focus was on understanding the client’s stock-management needs. Online communication and face-to-face meetings helped translate operational descriptions into a structured requirements list. I reviewed the inventory spreadsheet, the current Google Form entry route and the item-specific QR-code material.

I separated the worker’s collection process from the administrator’s monitoring process and outlined the distinction between receipts and issues. I also explored whether a website could meet the need more simply than a native application. The intended output of this stage was a requirements draft and workflow outline, not a claim that the whole system had been delivered.

### 3.2 Week 2: Technical Investigation and Initial Design

The second reporting interval is 19–24 October 2026. The draft records technical research and workflow planning up to 21 October. I investigated the roles of HTML, CSS, JavaScript, Apps Script, Sheets and Drive, and outlined the data fields and processing steps required to connect them.

For 22–24 October, the planned activities are to prepare simple page wireframes, review the proposed workflow with the client and prioritise development tasks. These activities are not recorded as completed in advance. This distinction is important when preparing an accurate internship log rather than a retrospective schedule that implies unsupported completion dates.

### 3.3 Proposed Work for Weeks 3 and 4

Week 3, 26–31 October, is allocated to the core prototype: worker and administrator interfaces, product-specific QR routing, employee ID entry, quantities, photos, stock receipts and issues, and integration with Sheets and Drive. Initial checks should use a dedicated test product before increasing the catalog or using real operational balances.

Week 4, 2–7 November, is allocated to refinement, integration tests, client feedback and handover preparation. Additional agreed functions include product maintenance, administrator record correction, company branding, selected-label printing and reorder alerts. Delivery depends on actual test results and acceptance. Features should be reprioritised if the scope exceeds the available time.

### 3.4 Communication, Independent Learning and Problem Solving

The project required translating practical questions into specific behaviour: who may see stock, what happens after scanning, when a reorder reminder appears, and how a mistaken movement is corrected. I aimed to describe these behaviours clearly and obtain feedback before treating a design as settled.

Independent learning focused on JavaScript, Apps Script and the relationship between a spreadsheet, uploaded files and a web interface. A useful problem-solving approach is to inspect the exact error, distinguish a client-side failure from a backend or permission issue, and repeat the affected check after a meaningful change. The workflow also emphasises testing saved code separately before replacing a working deployment.

### 3.5 Mapping to Course Outcomes

CO1 is addressed through requirements analysis, workflow modelling and data design. CO2 relates to the practical use of web languages, Google services, QR technology and version control. CO5 concerns client communication and written instructions; CO6 concerns carrying out research independently while discussing requirements with the client or supervisor. CO7 concerns learning unfamiliar tools and improving the solution through feedback. These are reflective mappings, not a substitute for supervisor verification or formal assessment.

## CHAPTER 4 — TASKS PERFORMED AND PROFESSIONAL PRACTICE

### 4.1 Requirements and Design Deliverables

The initial deliverables for this reporting period are a requirements list, a proposed worker/admin workflow, a technology selection and a preliminary data model. The worker interface is intended to identify the item and collect a movement record. The administrator interface is intended to manage products, review balances, correct mistakes and generate clear labels. The appendices record these requirements in a form that can be refined with the client.

### 4.2 Planned Functional Verification

The proposed verification approach follows actual business scenarios rather than merely checking that a page loads. A QR label should open the correct item; an issue should reduce stock; a receipt should increase stock; insufficient stock should prevent an issue; a saved photo should remain available to an authorised reviewer. Administrative deletion should reverse the record’s stock effect once, retain its audit information and reject a correction that creates a negative balance.

The appendices include test cases and expected outcomes. A formal dated execution log, screenshots and client acceptance evidence have not been supplied for this report draft. Therefore the matrix is a test plan, not a fabricated set of pass results. Results should be entered only after the corresponding checks have been performed and recorded.

### 4.3 Data Accuracy and Responsible Access

An opening balance must be verified against actual stock before operational launch. Test movements should be clearly identified and corrected through the appropriate mechanism. Manually deleting spreadsheet rows can damage traceability and should be avoided. Administrator corrections retain the original transaction, deletion time and reason, while excluding the voided movement from active balances.

Shared administrator credentials provide equal permissions to everyone who receives them. Credentials should be exchanged privately and must not appear in public source code, screenshots or reports. Sharing the website is different from granting permission to view private Drive photos. Access should be limited to authorised purposes and reviewed before additional users are invited.

### 4.4 Professional Conduct and Reporting Integrity

Professional practice in this project includes careful handling of client information, respecting authorised access, maintaining accurate records and explaining limitations honestly. The supplied training plan identifies these responsibilities under CO3 and CO4. Specific internal policies were not provided, so this draft does not claim that a named compliance standard or formal security audit has been satisfied.

The report distinguishes observed project needs, technical design and proposed future work. It does not invent meeting attendance, working hours, supervisor approval, test evidence or client acceptance. The student should verify factual statements, revise the draft in their own understanding and comply with university requirements on assisted writing before signing the official declaration.

## CHAPTER 5 — CONCLUSIONS AND NEXT STEPS

### 5.1 Interim Conclusion

The initial project stages establish a practical direction for improving stock records through product QR codes and a mobile-friendly website. Requirements analysis highlights that the most important worker interaction is scanning a label and reaching the correct product form. A separation between product information, transactions, photographs and administrative settings provides a clearer basis for later implementation.

At this stage, the main learning relates to client communication, technical evaluation and designing a consistent stock workflow. Areas requiring further development include secure user access, systematic test evidence, physical stock verification and operating within Google service quotas. This is an interim conclusion for the first project, not a final assessment of the whole training period.

### 5.2 Remaining Work and Future Improvements

The remaining scheduled work is to implement or refine the agreed prototype, execute representative tests, confirm the initial stock figures, obtain client feedback and prepare deployment and user instructions. The final report should replace planned entries with verified outcomes and include evidence appropriate for public disclosure.

Possible later improvements include individual administrator accounts, stronger employee verification, database optimisation and additional notification channels. Moving ownership to a company-managed Google account also requires planning for spreadsheet and photo access, deployment ownership and possible changes to QR destinations. These improvements are future considerations rather than commitments within the initial month.

## REFERENCES

Universiti Tunku Abdul Rahman (2024) GD008 IT Report Template 2024. User-supplied report template.

Universiti Tunku Abdul Rahman (n.d.) GD007 IT Report Guidelines, LKC FES, revision 06 (Non-QS). User-supplied guidelines.

Universiti Tunku Abdul Rahman (2026) Industrial Training Plan, FM-FES-ITC-004, revision 4. Prepared by Wong Sook En; dated 13 October 2026. User-supplied document.

Client-supplied materials (n.d.) STORE INVENTORY SYSTEM — Google spreadsheet export and DU01–DU16 Individual QR and Images PDF. Internal project references; no private operational URLs reproduced.

Google (n.d.) Apps Script documentation. Available at: https://developers.google.com/apps-script/ (technical reference for further verification).

MDN Web Docs (n.d.) HTML, CSS and JavaScript documentation. Available at: https://developer.mozilla.org/ (technical reference for further verification).

## APPENDIX A — REQUIREMENTS, SCHEDULE AND TEST CASES

### Table A1: Requirements List

| ID | Role | Requirement |

| --- | --- | --- |

| R1 | Worker | Scan a product QR and open the correct item form. |

| R2 | Worker | View name, photo and unit; submit employee ID, quantity and photo. |

| R3 | Backend | Record receipts/issues and calculate stock without duplicate processing. |

| R4 | Admin | View stock; add, edit, deactivate and restore products. |

| R5 | Admin | Void mistaken records with a reason and recalculate stock safely. |

| R6 | Admin | Set per-item reorder thresholds and ordered status. |

| R7 | Admin | Print selected QR labels with product photos and optional shelf text. |

| R8 | Admin | Change company name/logo; restrict administrative requests server-side. |



### Table A2: One-Month Project Schedule

| Week | Dates | Focus |

| --- | --- | --- |

| Week 1 | 12–17 Oct 2026 | Requirements and client discussions |

| Week 2 | 19–24 Oct 2026 | Research, workflows, data design and wireframes |

| Week 3 — planned | 26–31 Oct 2026 | Core implementation and integration |

| Week 4 — planned | 2–7 Nov 2026 | Refinement, tests, feedback and handover |



### Table A3: Functional Test Plan

| ID | Scenario | Expected outcome | Execution status |

| --- | --- | --- | --- |

| T1 | Scan item A | Correct item A form opens | To execute / evidence pending |

| T2 | Issue 1 from balance 10 | Balance becomes 9 | To execute / evidence pending |

| T3 | Receive 1 at balance 9 | Balance becomes 10 | To execute / evidence pending |

| T4 | Issue above available stock | Request rejected; no deduction | To execute / evidence pending |

| T5 | Retry identical request | No second deduction | To execute / evidence pending |

| T6 | Delete mistaken issue | Stock restored once; audit retained | To execute / evidence pending |

| T7 | Delete receipt causing negative stock | Correction rejected | To execute / evidence pending |

| T8 | Select several labels; remove one | Only remaining labels printed | To execute / evidence pending |

| T9 | Save company name/logo | Branding persists after reload | To execute / evidence pending |

| T10 | Unauthorised admin request | Backend denies operation | To execute / evidence pending |

| T11 | Threshold crossing with email configured | Alert attempted; actual delivery checked | To execute / evidence pending |

| T12 | Upload and review a photo | Authorised reviewer can retrieve correct image | To execute / evidence pending |



## APPENDIX B — DEPLOYMENT AND USER GUIDANCE

1. Prepare the spreadsheet and private photo folder using an authorised Google account. Configure their IDs and administrator credentials in Apps Script; do not publish passwords.

2. Preserve Products, Transactions and Settings headers, and verify product units and opening balances.

3. Test saved frontend/backend code before updating the existing deployment, retaining the QR destination URL where possible.

4. Workers scan, check the product, enter an employee ID and quantity, attach a photo, and wait for confirmation before collection.

5. Administrators review stock, record receipts, maintain products and correct clearly identified test records.

6. Confirm the production URL, selected products and images, then test-scan a printed label before bulk printing.

7. Explain shared administrator credentials, private-photo permissions, service quotas and notification limitations during handover.

## APPENDIX C — EVIDENCE AND OUTSTANDING INFORMATION

Available references are the IT Plan, GD008 template, report guidelines, inventory material and QR PDF. Formal meeting records, supervisor confirmation, dated test screenshots, acceptance sign-off and complete company information have not been supplied. The following checklist identifies material to add; it does not imply that evidence already exists.

Company address, business profile and formal organisation chart: company confirmation required.

Company logo: blank for later insertion.

Meeting dates, participants and requirements confirmation: add from actual records.

Interface and QR scan evidence: add versions approved for disclosure.

Test dates, results and corrections: complete after execution.

Handover date and client/supervisor feedback: add when confirmed.

Later projects, remaining weekly logs and final placement reflection: complete during the remaining training period.

## LOG RECORDS — ENGINEERING / SCIENCE

Weeks 1 and 2 are current draft records; Weeks 3 and 4 are project plans, not completed-work or attendance certification.

| Week | Duties Performed / Task setting | Remarks<br>by Supervisor |

| --- | --- | --- |

| Week 1<br>12–17 Oct<br>2026 | Project 1: QR-Based Stock Inventory Management Website — Requirements Analysis.<br><br>Communicated with the client through online discussions and face-to-face meetings to understand the existing stock recording process and the intended use of product QR codes.<br><br>Reviewed the inventory spreadsheet, Google Form and QR-code PDF. Organised the initial requirements, including product identification, stock receipts and issues, photo evidence, administrator access and reorder thresholds.<br><br>Outlined the worker and administrator workflows and considered a mobile-friendly website as an alternative to a native application. |  |

| Week 2<br>19–24 Oct<br>2026 | Project 1: Technical Research and Initial System Design.<br><br>Progress up to 21 October: investigated HTML, CSS and JavaScript for a mobile-friendly interface, Google Apps Script for backend processing, Google Sheets for inventory records and Google Drive for photos.<br><br>Outlined product and transaction data fields, QR-to-product navigation, employee ID entry and the calculation of stock balances. Identified quantity validation and administrator permissions as design requirements.<br><br>Planned for 22–24 October: prepare simple page wireframes, review requirements and workflows with the client, and prioritise core functions for Week 3 development. Integration, detailed testing and handover are scheduled for Weeks 3–4. |  |

| Week 3<br>26–31 Oct<br>PLANNED | Planned: implement core interfaces and Google integration; develop QR routing, employee ID, photos, receipts/issues and stock calculations. Add actual outcomes and issues after execution. |  |

| Week 4<br>2–7 Nov<br>PLANNED | Planned: refine management, corrections, branding, labels and alerts; perform tests, collect feedback and prepare handover. Results and acceptance remain to be confirmed. |  |

| Summary of the Month: October 2026 — interim draft as at 21 October | Summary of the Month: October 2026 — interim draft as at 21 October | Summary of the Month: October 2026 — interim draft as at 21 October |

| The period focuses on client communication, requirements, technical research and workflow design. Finalise the monthly summary from actual work at month end; planned Weeks 3–4 are not completed outcomes. | The period focuses on client communication, requirements, technical research and workflow design. Finalise the monthly summary from actual work at month end; planned Weeks 3–4 are not completed outcomes. | The period focuses on client communication, requirements, technical research and workflow design. Finalise the monthly summary from actual work at month end; planned Weeks 3–4 are not completed outcomes. |



Student: Wong Sook En | Student ID: 2200498

Industry supervisor: Christopher Kong San Hor | IT Technician

Student signature: ____________________

Supervisor signature and company stamp: ____________________

## MARKING SCHEME & RUBRICS — FOR ASSESSORS

The following official GD008 assessment material is retained. Scores, assessor comments and signatures must be entered by the authorised assessors, not invented in this draft.

| <br>No. | <br>Category | Max Mark | <br>Relevant CO | For Engine ering | <br>Criterion | Assessment (1-5) |

| --- | --- | --- | --- | --- | --- | --- |

| <br><br><br><br><br>A. | <br><br><br><br>Details of Industrial training experience | <br>5 | <br>CO1 |  | 1. Apply science/engineering fundamentals to task assigned |  |

| <br><br><br><br><br>A. | <br><br><br><br>Details of Industrial training experience | <br>5 | <br>CO3 |  | 2. Comply with the rules and guidelines relevant to  professional/professional |  |

| <br><br><br><br><br>A. | <br><br><br><br>Details of Industrial training experience | <br>5 | <br>CO4 |  | 3. Demonstrate code of ethics and standards of professional conduct |  |

| <br><br><br><br><br>A. | <br><br><br><br>Details of Industrial training experience | <br>5 | <br>CO6 |  | 4. Perform work independently and as a team |  |

| <br><br>B. | <br>Presentation of Report | <br><br>10 | <br><br>CO5 | <br><br>EA1 | 1. Logical and coherent report layout and content follow the format of IT guideline and template. Legible report with proper grammar and<br>terms. |  |

| <br><br>C | <br><br>Log Book | <br>10 | <br>CO7 |  | 1. Demonstrate life-long learning and self-improvement |  |

| <br><br>C | <br><br>Log Book | 5 | CO5 |  | 2. Quality and Usage of Logbook in recording works and events |  |



| Scale<br>(X weightage) | Poor<br>(1) | Unsatisfactory<br>(2) | Satisfactory<br>(3) | Good<br>(4) | Excellent<br>(5) |

| --- | --- | --- | --- | --- | --- |

| <br><br><br><br>A.1 | The student seriously misuses or misapplied science/engineering fundamentals to task assigned and gives no explanation or explanations are virtually incomplete or incorrect. | The student is able to apply a few science/engineering fundamentals to task assigned but occasionally make some errors in the explanation. | The student applies most of the science/engineering fundamental correctly to task assigned and explanations are correct or with no significant errors. | The student explains all the science/engineering fundamentals to task assigned correctly. | All applied science/engineering fundamentals to task assigned are explained clearly, completely and concisely with a good sense of what are essential to the explanation and what is irrelevant or unnecessary. |

| <br><br><br><br>A.2 | No or lack of evidence to show that the student able to comply with the rules and guidelines relevant to professional/professional engineering practice | The report poorly show that the student is able to comply with the rules and guidelines relevant to professional/professional engineering practice | The report able to provide few evidence of the student is able to comply with the rules and guidelines relevant to professional/professional engineering practice | The report clearly stated that the student is able to comply with the rules and guidelines relevant to professional/professional engineering practice | The report clearly and precisely stated the student comply with the rules and guidelines relevant to professional/professional engineering practice |

| <br><br><br>A.3 | No or lack of evidence to show that the student able to demonstrate code of ethics and standards of professional conduct | The report poorly show that the student is able to  demonstrate code of ethics and standards of professional conduct | The report able to provide few evidence of the student is able to demonstrate code of ethics and standards of professional conduct | The report clearly stated that the student is able to demonstrate code of ethics and standards of professional conduct | The report clearly and precisely stated the student demonstrate code of ethics and standards of professional conduct |

| <br><br><br>A.4 | No or lack of evidence to show that the student able to perform work independently and as a team | The report poorly show that the student is able to perform work independently and as a team | The report able to provide few evidence of the student is able to perform work independently and as team | The report clearly stated that the student is able to perform work independently and as a team | The report clearly and precisely stated the student perform work independently and as a team |

| <br><br><br><br><br>B.1 (x2) | Very limited range of resources. Very poor formatted or with formatting errors and the report is very poor in readability of readers. Very frequent grammar or spelling errors with un-acceptable writing<br>Style. | Limited range of resources. Not well formatted or with formatting errors causing difficulty in readability of readers. Frequent grammar or spelling errors with immature	writing<br>Style. | Acceptable range of resources. Not so well formatted or with some formatting errors but the report is readable for readers. Occasional grammar or spelling errors but with good writing Style. | Sufficient range of resources.	Good formatted with only minor formatting errors and the report is well readable for readers. Minor grammar or spelling errors with good writing Style. | Optimum range of resources. Very well formatted or without any formatting errors and the report is very readable for readers. No grammar or spelling errors with excellent writing Style. |

| <br><br>C.1 (x2) | No or lack of evidence to show that the student demonstrates life-long learning and self- improvement. | The report poorly show that the student demonstrates life-long learning and self- improvement. | The report able to provide few evidence of the	student<br>demonstrates      life-long<br>learning and self- improvement. | The report clearly stated that the student demonstrates life-long learning and self- improvement. | The report clearly and precisely stated the student demonstrates life-long learning and self-improvement. |

| <br>C.2 | A "logbook" is very poorly organized and not systematic. | A "logbook" is poorly organized and lack of consistency. | A "logbook" is organized, but inconsistently and has many omissions. | A "logbook" is well organized	and systematic with minor<br>errors. | The student is developing a professional approach to keeping a logbook. |
