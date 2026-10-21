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

This interim account covers 12–25 October 2026, the first two reporting weeks of Project 1: a QR-based stock inventory website. It expands the same client requirements, research, workflow/data design and initial-prototype content into daily entries. The prototype is awaiting client review. Exact daily allocations require verification; dates after 21 October remain planned. Later feedback, modifications and maintenance are not included as completed activities.

Keywords: inventory management; QR codes; web application; Google Apps Script; industrial training.

## TABLE OF CONTENTS

## LIST OF TABLES AND APPENDICES

Table A1: Requirements list

Table A2: Weeks 1–2 reporting schedule (12–25 October)

Table A3: Test-run checklist

Appendix A: Requirements, schedule and test cases

## CHAPTER 1 — INTRODUCTION

### 1.1 Training and Project Background

The industrial training placement is at Bakti Makmur (M) Sdn. Bhd., from 12 October 2026 to 9 January 2027, under Christopher Kong San Hor, IT Technician. This account covers only Weeks 1–2 of Project 1, the QR-based stock inventory website. Company background details and the company logo will be added separately.

The client previously used product QR codes linked to a Google Form. The project brings stock issues, receipts, employee IDs and photo evidence into a mobile-friendly website, with inventory quantities and management functions available to administrators.

### 1.2 Objectives and Scope

The objectives are to simplify QR-based recording, calculate stock automatically, and provide product maintenance, record correction, reorder alerts and printable photo/QR labels. The solution uses existing Google services rather than a native mobile application. Additional messaging integrations are outside the current scope.

## CHAPTER 2 — RESEARCH / STUDY

### 2.1 Requirements and Technology Selection

I reviewed the client’s inventory spreadsheet, Google Form and product QR-code PDF, and discussed the requirements through online and face-to-face communication. Important requirements included product-specific scanning, employee ID entry, quantities, photos, separate administrator access and individual reorder thresholds.

HTML, CSS and JavaScript were selected for the interface. Google Apps Script handles backend operations, Google Sheets holds product and transaction records, and Google Drive stores photos. A website allows workers to open a product form directly from a phone camera without installing an application.

The tool roles were considered separately: HTML defines product selection, fields and management tables; CSS supports phone layouts and printed labels; JavaScript manages interaction, input preparation and QR generation. Apps Script checks requests and connects records to files, rather than allowing workers to edit stock directly. These roles elaborate the existing requirements without adding new project scope.

### 2.2 Workflow and Initial Prototype

The worker scans a QR code, confirms the product, enters an employee ID and quantity, attaches a photo and submits the movement. Administrators manage products, review inventory, correct mistaken records and print selected labels. Current stock is calculated as opening balance plus valid receipts minus valid issues.

Following the research and development work, an initial prototype is available for client review. Design considerations include quantity validation, insufficient-stock rejection, duplicate-submission protection and server-side administrator checks. Employee IDs remain self-reported, and shared administrator access is a limitation of the initial version.

## CHAPTER 3 — INDUSTRIAL TRAINING WORKING EXPERIENCE

Daily allocation note: this section expands the same activities as the previous draft and provisionally assigns them to dates; it is not a verified daily attendance log. Check the actual dates for 12–21 October. Entries for 22–25 October are future arrangements. Online and face-to-face discussions are part of the original account, but their exact dates were not supplied. Saturdays are half-days ending at 12 noon; Sundays are non-working days. Later client feedback, modifications and maintenance are not prewritten.

### 3.1 Week 1: 12–18 October 2026

#### 12 October 2026 (Monday) — Project introduction and review of existing records

I began by reviewing the purpose of the stock inventory project and the material supplied by the client. The inventory spreadsheet showed the main information that had to be retained, including product codes, names, units and stock figures. I also examined the existing Google Form entry route and the PDF of individual QR codes and product images. This helped me understand that the proposed website should improve an existing recording process rather than create an unrelated application.

The main task was to identify the starting workflow: a worker scans a product label and records a stock movement. I noted the information that would need clarification, particularly the difference between receipts and issues, the evidence required for each movement and who should see inventory quantities. The output was an initial set of discussion points for requirements gathering.

#### 13 October 2026 (Tuesday) — Online client discussion and initial requirements

I used online communication with the client to clarify the intended operation of the system. The discussion focused on how workers would enter a product form, what information they should provide and how stock quantities should change after submission. The key recording fields were identified as employee identification, movement quantity and a supporting photograph, with notes available when needed.

I separated statements about the desired result from decisions about implementation. For example, “stock should reduce automatically” required a defined issue transaction and a consistent balance calculation. I organised these points into a preliminary requirements list so that the client’s operational descriptions could be used as a basis for design. The exact date of this discussion should be checked against the actual meeting record.

#### 14 October 2026 (Wednesday) — Face-to-face discussion and workflow clarification

The face-to-face discussion was used to clarify how the proposed system would fit the stock collection process. An important requirement was that workers should see the product name, image and unit after scanning, while the actual stock quantity should be visible only to administrators. Incoming stock would be recorded through an administrator-authorised operation rather than treated as an ordinary worker action.

I considered the practical meaning of units such as PAIR, PCS, PACK and KG. The quantity field must use the unit assigned to the product so that a package is not accidentally recorded as an individual piece. I also noted that product codes must remain stable because printed QR labels use those identifiers. The meeting details and date remain subject to confirmation from the student’s records.

#### 15 October 2026 (Thursday) — Consolidation of the requirements list

I grouped the requirements into worker, administrator and system responsibilities. The worker requirements covered product-specific scanning, product information, employee ID, quantity and photo submission. Administrator requirements covered stock visibility, receipts, product maintenance, correction of mistaken records, reorder thresholds and QR-label printing. Company name and logo settings were included in the same proposed administrative scope.

I also distinguished essential behaviour from later enhancements. The initial solution would use email and on-page reminders where configured; other messaging channels were outside the agreed first scope. This prevented the requirements list from expanding into unrelated functions. The result was a clearer checklist that could support client review without being mistaken for proof of acceptance or completed testing.

#### 16 October 2026 (Friday) — Research into a suitable development approach

I compared a mobile-friendly website with a native application. The website approach was appropriate because a phone camera could open the product link directly after scanning, with no separate installation needed. It also allowed administrators to use a computer while workers used phones. I investigated how HTML, CSS and JavaScript could provide the form and responsive interface.

I researched Google Apps Script as the backend connecting Google Sheets and Google Drive. Sheets could hold product and movement records, while Drive could store photos. This choice matched the existing use of Google tools and reduced initial infrastructure work. I noted limitations such as internet dependence, service quotas and the need for server-side permission checks rather than relying on hidden interface controls.

#### 17 October 2026 (Saturday, work until 12 noon) — Initial workflow and data-field planning

I organised the proposed worker flow as scanning, checking product information, entering an employee ID and quantity, attaching a photo and submitting. The administrator flow covered inventory review, incoming stock, product changes and label printing. Describing the flows separately helped identify which actions required administrator permission.

I outlined separate product and transaction records. A product would hold its code, name, unit, opening balance, reorder threshold and image reference. A transaction would identify the product, movement type, quantity, employee ID, time and photo reference. The balance rule was opening stock plus valid receipts minus valid issues. This provided a design basis for the initial prototype. Saturday is a half-day ending at 12 noon; the exact task allocation still requires verification against actual records.

#### 18 October 2026 (Sunday) — Rest day

Sunday was a rest day with no work attendance. No meetings, development work or project tasks are recorded for this date.

### 3.2 Week 2: 19–25 October 2026

#### 19 October 2026 (Monday) — Data organisation and prototype structure

I refined the data organisation for Products, Transactions and Settings. Product details were kept separate from stock movements to make changes easier to trace. Settings would hold the company name and logo. The proposed data model also retained the distinction between a product display image and the photograph attached to an individual movement.

I organised the page structure around a worker form, an administrator inventory view and a QR-label page. The same product code would connect the stock record, form and QR label. Opening stock was treated as a starting balance that required physical verification, not a substitute for normal incoming-stock entries. The output was a clearer structure for connecting the interface and stored records.

#### 20 October 2026 (Tuesday) — Initial worker interface and submission flow

I developed the initial worker-facing structure using HTML, CSS and JavaScript. The form was designed to show the selected product, accept an employee ID and quantity, and require a photo. The responsive layout was intended to remain readable on a phone, as scanning is the main way workers enter the system.

I considered the processing steps needed after submission: validate the input, identify the product, distinguish an issue from a receipt and record the photo reference. Positive quantities, insufficient-stock rejection and duplicate-request handling were included in the design. Employee IDs were treated as text so that leading zeroes and letters could be retained, but this entry was not presented as verified identity.

#### 21 October 2026 (Wednesday) — Initial administrator functions and review preparation

I brought the administrator-facing requirements together with the initial prototype. These included inventory and recent-record views, product maintenance, reorder settings, photo updates and the generation of product QR labels. Label selection needed to support one, several or all products and allow accidental selections to be removed before printing.

I also considered controlled correction of mistaken stock records. A correction should reverse the stock effect once while retaining the original record and a reason. Deleting a receipt should not create a negative balance. The research, design and initial prototype were prepared for client review, but actual client acceptance and specific requested modifications were still pending. These points were recorded separately from confirmed delivery results.

#### 22 October 2026 (Thursday) — Planned prototype checks and information review

Planned activity: review the initial prototype against the existing requirements list, concentrating on the product code, unit, employee ID, quantity and photo fields. Check that stock quantities remain excluded from the worker view and that receipt operations require administrator authorisation.

The intended output is a short list of discrepancies or missing information to resolve before the client review. No particular fault, repair or successful test is claimed in advance. The actual checks performed and their results should replace this planned entry once the work has taken place.

#### 23 October 2026 (Friday) — Planned QR-label and administrator review

Planned activity: review product QR links and the label layout, including the code, name, unit, available photo and optional label text. Verify that a selection list clearly identifies the products intended for printing and that removing a selection does not delete the product itself.

The administrator review is intended to cover company name/logo settings, product information and record-correction controls already included in the requirements. This is preparation within the existing scope, not a new feature commitment. Actual findings, if any, remain to be recorded after execution.

#### 24 October 2026 (Saturday, work until 12 noon) — Planned consolidation for client review

Planned activity: consolidate the initial requirements, workflow notes and prototype so the client can review them together. Prepare the customer-facing requirement table with space to confirm a function, request a change or leave a comment. Keep the description of expected behaviour consistent with the report.

The intended stage outcome is a prototype ready for feedback, not an assumed final acceptance. Detailed client-requested changes and maintenance work are not prewritten because the feedback has not yet been received. Saturday work is limited to the morning, ending at 12 noon; actual preparation tasks completed remain to be confirmed.

#### 25 October 2026 (Sunday) — Rest day

Under the confirmed work arrangement, Sunday is a non-working day. This date is a scheduled rest day; no work tasks, meetings, test results or modifications are recorded in advance.

## CHAPTER 4 — TASKS PERFORMED AND PROFESSIONAL PRACTICE

### 4.1 Core Tasks and Validation

The project work covers requirements, workflow and data design, an initial web prototype and preparation for client testing. The test run should confirm correct QR routing, stock deductions and additions, photo retrieval, selected-label printing and administrator record correction. A successful page load alone is not sufficient to validate these functions.

### 4.2 Responsible Data Handling and Learning

Opening stock should be checked before operational use. Test records should be identified clearly, and corrections should retain an audit trail. Credentials and private photo links should not be published. The project develops software design and tool-use skills (CO1–CO2), communication and independent learning (CO5–CO7), and responsible handling of client information (CO3–CO4).

The main difficulty in this stage was translating everyday descriptions into precise rules: which unit a quantity uses, which information is restricted, and what a correction should do. I addressed this through grouped requirements, separate worker/admin workflows and explicit data fields. This strengthened communication, independent research and problem decomposition. Client feedback is still pending, so no particular requested modification is invented.

## CHAPTER 5 — INTERIM CONCLUSION

### 5.1 Project Status and Next Steps

During Weeks 1 and 2, client discussions, requirements analysis, technical research and initial development established a prototype for the QR-based inventory website. It is now ready for client review. Actual feedback, modifications and maintenance will be documented separately when available. This account is limited to the first two weeks and forms the first part of the longer industrial training report.

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

### Table A2: Weeks 1–2 Reporting Schedule

| Week | Dates | Focus |

| --- | --- | --- |

| Week 1 | 12–18 Oct 2026 | Requirements and client discussions |

| Week 2 | 19–25 Oct 2026 | Research, design and initial prototype |

### Table A3: Functional Test Plan

| ID | Scenario | Expected outcome | Execution status |

| --- | --- | --- | --- |

| T1 | Scan item A | Correct item A form opens | To execute / evidence pending |

| T2 | Issue 1 from balance 10 | Balance becomes 9 | To execute / evidence pending |

| T3 | Receive 1 at balance 9 | Balance becomes 10 | To execute / evidence pending |

| T6 | Delete mistaken issue | Stock restored once; audit retained | To execute / evidence pending |

| T8 | Select several labels; remove one | Only remaining labels printed | To execute / evidence pending |

| T12 | Upload and review a photo | Authorised reviewer can retrieve correct image | To execute / evidence pending |

## LOG RECORDS — ENGINEERING / SCIENCE

Only Weeks 1 and 2 are populated. The remaining weekly rows and monthly summary are left blank for later completion.

| Week | Duties Performed / Task setting | Remarks<br>by Supervisor |

| --- | --- | --- |

| Week 1<br>12–18 Oct | 12 Oct: project introduction and existing-material review.<br><br>13 Oct: online requirements discussion (date to verify).<br><br>14 Oct: face-to-face workflow clarification (date to verify).<br><br>15 Oct: group worker/admin/system requirements.<br><br>16 Oct: research web approach and tools.<br><br>17 Oct (morning, until 12 noon): outline workflows/data fields.<br><br>18 Oct: Sunday rest day; no work attendance. |  |

| Week 2<br>19–25 Oct | 19 Oct: refine product/transaction/settings data organisation.<br><br>20 Oct: initial worker interface and submission flow.<br><br>21 Oct: organise admin functions/prototype for client review.<br><br>22 Oct (planned): review prototype and data against requirements.<br><br>23 Oct (planned): review labels and administrator interface.<br><br>24 Oct (planned morning, until 12 noon): consolidate client review material.<br><br>25 Oct: Sunday rest day; no work scheduled. |  |

|  |  |  |

|  |  |  |

| Summary of the Month: October 2026 | Summary of the Month: October 2026 | Summary of the Month: October 2026 |

|  |  |  |

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
