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

## TABLE OF CONTENTS

## LIST OF TABLES AND APPENDICES

Table A1: Requirements list

Table A2: Weeks 1–2 reporting schedule (12–25 October)

Table A3: Test-run checklist

Appendix A: Requirements, schedule and test cases

## CHAPTER 1 — INTRODUCTION

### 1.1 Training and Project Background

The industrial training placement is at Bakti Makmur (M) Sdn. Bhd. (registration no. 1316038-M), at A13, Tingkat Bawah, Lorong Seri Setali 113/1, Perumahan Seri Setali, 25300 Kuantan, Pahang. The company telephone/fax is 09-509 3745 and the company email is baktimakmurm@yahoo.com. These details are taken from the internship offer letter dated 15 September 2026. The company logo will be added separately. (Bakti Makmur (M) Sdn. Bhd., 2026).

The client previously used product QR codes linked to a Google Form. The project brings stock issues, receipts, employee IDs and photo evidence into a mobile-friendly website, with inventory quantities and management functions available to administrators.

The offered position is IT Technician in the IT Department, for the placement from 12 October 2026 to 9 January 2027. The role description includes assisting with IT infrastructure, networks, backups, user accounts, office and application support, and system improvements. These are role responsibilities, not claims that every duty has been performed during this reporting period. This account remains limited to the first two weeks of the inventory website project.

The offer letter states that the intern reports to Christopher Kong San Hor, Managing Director, and Alexander Kong San Lum, Executive Director. This is the documented internship reporting relationship, not a complete company organisation chart. The IT Plan lists Christopher Kong San Hor as IT Technician, which differs from the offer letter and should be confirmed before submission. The letter does not establish the company’s principal business sector, so no industry background is invented.

Normal working hours are 8 a.m.–5 p.m., Monday to Friday, with a one-hour lunch break, and 8 a.m.–12 noon on Saturday. Sunday is a non-working day as separately confirmed by the student. Individual daily tasks still require verification against actual records.

Figure 1.1: Internship reporting relationship documented in the offer letter (not a complete company organisation chart)

| Christopher Kong San Hor<br>Managing Director | Alexander Kong San Lum<br>Executive Director |

| --- | --- |

| ↓ | ↓ |

| Wong Sook En<br>IT Technician Intern | Wong Sook En<br>IT Technician Intern |

The full company organisation chart and principal business still require company confirmation; the supervisor-title discrepancy with the IT Plan also remains to be resolved.

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

12 October 2026 (Monday) — Project introduction and review of existing records — I reviewed the inventory spreadsheet, existing Google Form and PDF of product QR codes and images to understand the current recording process. I identified product codes, names, units and stock figures as the main data, and outlined how a worker scans a label before recording a movement. I prepared questions about receipts versus issues, required evidence and administrator stock visibility as the basis for requirements gathering.

13 October 2026 (Tuesday) — Online client discussion and initial requirements — I discussed the intended workflow with the client online, focusing on product-form access, employee identification, quantities, photographs and optional notes. I translated general expectations such as automatic stock deduction into defined transaction and balance rules, then organised an initial requirements list. This linked the client’s operational descriptions to the proposed design; the exact discussion date remains subject to verification against the actual meeting record.

14 October 2026 (Wednesday) — Face-to-face discussion and workflow clarification — The face-to-face discussion clarified that workers should see the product name, image and unit, while stock quantities remain administrator-only. Receipts also require administrator authorisation. I considered units such as PAIR, PCS, PACK and KG to prevent incorrect quantity interpretation, and noted that product codes must remain stable because printed QR labels use them. Meeting details and the exact date should be checked against the student’s records.

15 October 2026 (Thursday) — Consolidation of the requirements list — I grouped requirements into worker, administrator and system functions: scanning, employee ID and photo entry, stock calculations, product maintenance, corrections, reorder thresholds, branding and QR-label printing. I separated essential behaviour from later enhancements, keeping additional messaging channels outside the initial scope. The result was a clearer checklist for client review, rather than a claim that every feature had been accepted or formally tested.

16 October 2026 (Friday) — Research into a suitable development approach — I compared a mobile-friendly website with a native application and selected the web approach because workers can open product links through a phone camera without installation. I researched HTML, CSS and JavaScript for the interface and Google Apps Script, Sheets and Drive for processing, records and photos. I also noted internet dependence, service quotas and the need to check administrator permissions on the server.

17 October 2026 (Saturday, work until 12 noon) — Initial workflow and data-field planning — During the Saturday half-day, ending at 12 noon, I outlined separate worker and administrator workflows and planned product and transaction fields. Product data included code, name, unit, opening balance, threshold and image; transactions included movement type, quantity, employee ID, time and photo. I defined stock as opening balance plus valid receipts minus valid issues. The precise task allocation should still be checked against actual records.

18 October 2026 (Sunday) — Rest day — Sunday was a rest day with no work attendance. No meetings, development work or project tasks are recorded for this date.

### 3.2 Week 2: 19–25 October 2026

19 October 2026 (Monday) — Data organisation and prototype structure — I refined the organisation of Products, Transactions and Settings, separating product details from movements and keeping company branding in Settings. I distinguished product display images from transaction photos and arranged the worker form, administrator view and QR-label page around a shared product code. Opening stock was treated as a balance requiring physical verification, rather than a replacement for normal receipt entries.

20 October 2026 (Tuesday) — Initial worker interface and submission flow — I developed the initial worker form with HTML, CSS and JavaScript, including product information, employee ID, quantity and a required photo in a phone-friendly layout. I outlined input validation, product identification, receipt/issue processing and photo references, considering positive quantities, insufficient stock and duplicate requests. Employee IDs were kept as text to preserve letters and leading zeroes, without treating them as verified authentication.

21 October 2026 (Wednesday) — Initial administrator functions and review preparation — I consolidated administrator requirements in the initial prototype, including inventory/history, product maintenance, reorder settings, photo updates and printable QR labels. Labels support single, multiple or all products with removal of accidental selections. I considered corrections that reverse stock once, retain the original record and reason, and reject receipt deletion that creates negative stock. The prototype was prepared for client review; acceptance and requested changes remained pending.

22 October 2026 (Thursday) — Planned prototype checks and information review — Planned: check the initial prototype against the existing requirements, especially product codes, units, employee ID, quantity and photo fields, worker stock privacy and administrator authorisation for receipts. Record discrepancies or missing information before client review. No particular defect, repair or passing result is claimed in advance; replace this entry with the actual checks and outcomes after execution.

23 October 2026 (Friday) — Planned QR-label and administrator review — Planned: review QR destinations and the label layout, including product code, name, unit, photo and optional text. Check that the selected list identifies the intended print items and that removing a selection does not delete a product. Review the already-scoped branding, product and correction controls; actual findings remain to be recorded after execution.

24 October 2026 (Saturday, work until 12 noon) — Planned consolidation for client review — Planned for the Saturday morning, ending at 12 noon: consolidate requirements, workflow notes and the prototype for client review, and prepare the customer requirement table with confirmation and comment fields. Keep expected behaviour consistent across documents. The intended outcome is readiness for feedback, not final acceptance; actual preparation tasks and specific client-requested modifications remain to be confirmed.

25 October 2026 (Sunday) — Rest day — Sunday is a scheduled rest day under the confirmed work arrangement. No work tasks, meetings, tests or modifications are planned or claimed for this date.

## CHAPTER 4 — TASKS PERFORMED AND PROFESSIONAL PRACTICE

### 4.1 Core Tasks and Validation

The project work covers requirements, workflow and data design, an initial web prototype and preparation for client testing. The test run should confirm correct QR routing, stock deductions and additions, photo retrieval, selected-label printing and administrator record correction. A successful page load alone is not sufficient to validate these functions.

### 4.2 Responsible Data Handling and Learning

Opening stock should be checked before operational use. Test records should be identified clearly, and corrections should retain an audit trail. Credentials and private photo links should not be published. The project develops software design and tool-use skills (CO1–CO2), communication and independent learning (CO5–CO7), and responsible handling of client information (CO3–CO4).

The main difficulty in this stage was translating everyday descriptions into precise rules: which unit a quantity uses, which information is restricted, and what a correction should do. I addressed this through grouped requirements, separate worker/admin workflows and explicit data fields. This strengthened communication, independent research and problem decomposition. Client feedback is still pending, so no particular requested modification is invented.

## CHAPTER 5 — INTERIM CONCLUSION

### 5.1 Project Status and Next Steps

During Weeks 1 and 2, client discussions, requirements analysis, technical research and initial development established a prototype for the QR-based inventory website. It is now ready for client review. Actual feedback, modifications and maintenance will be documented separately when available. This account is limited to the first two weeks and forms the first part of the longer industrial training report.

## REFERENCES

Bakti Makmur (M) Sdn. Bhd. (2026) Internship offer letter to Wong Sook En, 15 September. Unpublished document; company details only.

Universiti Tunku Abdul Rahman (2026) Industrial Training Plan: Wong Sook En, FM-FES-ITC-004, revision 4, 13 October. Unpublished training document.

Universiti Tunku Abdul Rahman (2024a) Industrial Training Report Guidelines (Engineering, Architecture and Science), GD-FES-ITC-007, revision 6, effective 1 April.

Universiti Tunku Abdul Rahman (2024b) GD008 IT Report Template 2024. Report template.

Google (n.d.) Apps Script documentation. Available at: https://developers.google.com/apps-script/.

MDN Web Docs (n.d.) Web technology documentation: HTML, CSS and JavaScript. Available at: https://developer.mozilla.org/.

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

| Week 1<br>12–18 Oct | 12 Oct: project introduction and existing-material review.<br>13 Oct: online requirements discussion (date to verify).<br>14 Oct: face-to-face workflow clarification (date to verify).<br>15 Oct: group worker/admin/system requirements.<br>16 Oct: research web approach and tools.<br>17 Oct (morning, until 12 noon): outline workflows/data fields.<br>18 Oct: Sunday rest day; no work attendance. |  |

| Week 2<br>19–25 Oct | 19 Oct: refine product/transaction/settings data organisation.<br>20 Oct: initial worker interface and submission flow.<br>21 Oct: organise admin functions/prototype for client review.<br>22 Oct (planned): review prototype and data against requirements.<br>23 Oct (planned): review labels and administrator interface.<br>24 Oct (planned morning, until 12 noon): consolidate client review material.<br>25 Oct: Sunday rest day; no work scheduled. |  |

|  |  |  |

|  |  |  |

| Summary of the Month: October 2026 | Summary of the Month: October 2026 | Summary of the Month: October 2026 |

|  |  |  |

Student: Wong Sook En | Student ID: 2200498

Industry supervisor: Christopher Kong San Hor | Managing Director (offer letter; the IT Plan lists IT Technician—confirm before submission)

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
