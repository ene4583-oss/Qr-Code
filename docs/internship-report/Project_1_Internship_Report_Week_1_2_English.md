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

This interim account covers Project 1, a QR-based stock inventory website. Weeks 1–2 focus on client requirements, technical research, workflow design and an initial prototype. Week 3 is reserved for client review and test runs, followed by retesting and maintenance in Week 4. Specific modifications remain pending client feedback. Future activities are not represented as completed outcomes.

Keywords: inventory management; QR codes; web application; Google Apps Script; industrial training.

## TABLE OF CONTENTS

## LIST OF TABLES AND APPENDICES

Table A1: Requirements list

Table A2: One-month project schedule

Table A3: Test-run checklist

Appendix A: Requirements, schedule and test cases

## CHAPTER 1 — INTRODUCTION

### 1.1 Training and Project Background

The industrial training placement is at Bakti Makmur (M) Sdn. Bhd., from 12 October 2026 to 9 January 2027, under Christopher Kong San Hor, IT Technician. This section covers Project 1, a QR-based stock inventory website, provisionally scheduled from 12 October to 7 November 2026. Company background details and the company logo will be added separately.

The client previously used product QR codes linked to a Google Form. The project brings stock issues, receipts, employee IDs and photo evidence into a mobile-friendly website, with inventory quantities and management functions available to administrators.

### 1.2 Objectives and Scope

The objectives are to simplify QR-based recording, calculate stock automatically, and provide product maintenance, record correction, reorder alerts and printable photo/QR labels. The solution uses existing Google services rather than a native mobile application. Additional messaging integrations are outside the current scope.

## CHAPTER 2 — RESEARCH / STUDY

### 2.1 Requirements and Technology Selection

I reviewed the client’s inventory spreadsheet, Google Form and product QR-code PDF, and discussed the requirements through online and face-to-face communication. Important requirements included product-specific scanning, employee ID entry, quantities, photos, separate administrator access and individual reorder thresholds.

HTML, CSS and JavaScript were selected for the interface. Google Apps Script handles backend operations, Google Sheets holds product and transaction records, and Google Drive stores photos. A website allows workers to open a product form directly from a phone camera without installing an application.

### 2.2 Workflow and Initial Prototype

The worker scans a QR code, confirms the product, enters an employee ID and quantity, attaches a photo and submits the movement. Administrators manage products, review inventory, correct mistaken records and print selected labels. Current stock is calculated as opening balance plus valid receipts minus valid issues.

Following the research and development work, an initial prototype is available for client review. Design considerations include quantity validation, insufficient-stock rejection, duplicate-submission protection and server-side administrator checks. Employee IDs remain self-reported, and shared administrator access is a limitation of the initial version.

## CHAPTER 3 — INDUSTRIAL TRAINING WORKING EXPERIENCE

### 3.1 Week 1: Requirements and Process Understanding (12–17 October)

I communicated with the client online and in person to understand how workers collect items and how administrators monitor stock. I reviewed the supplied stock data and existing QR-to-form process, identified the required data fields, and organised the initial requirements. I outlined worker and administrator workflows and explored a practical web-based approach.

### 3.2 Week 2: Research, Design and Initial Development (19–24 October)

The work up to 21 October focused on selecting tools, organising the product and transaction data, and preparing the initial website. The prototype brings together QR product selection, employee ID and quantity entry, photos, stock calculations and administrator functions. The remaining days of this week are allocated to checking the prototype and preparing it for the client’s review. Formal acceptance and any client-requested changes remain pending.

### 3.3 Week 3: Client Review and Test Run (26–31 October — Planned)

The third week is reserved for the client to review and try the website. Test runs will focus on scanning printed labels, selecting the correct product, submitting receipts/issues, checking photos and verifying inventory changes. Comments and problems will be recorded for prioritisation. Specific modifications are left open until the client provides feedback.

### 3.4 Week 4: Follow-up Testing and Maintenance (2–7 November — Planned)

The fourth week is allocated to further test runs, checking any changes agreed with the client and initial maintenance. Modifications will depend on the feedback received; no particular fix is claimed in advance. The actual changes, retest results and handover status will be added after confirmation.

## CHAPTER 4 — TASKS PERFORMED AND PROFESSIONAL PRACTICE

### 4.1 Core Tasks and Validation

The project work covers requirements, workflow and data design, an initial web prototype and preparation for client testing. The test run should confirm correct QR routing, stock deductions and additions, photo retrieval, selected-label printing and administrator record correction. A successful page load alone is not sufficient to validate these functions.

### 4.2 Responsible Data Handling and Learning

Opening stock should be checked before operational use. Test records should be identified clearly, and corrections should retain an audit trail. Credentials and private photo links should not be published. The project develops software design and tool-use skills (CO1–CO2), communication and independent learning (CO5–CO7), and responsible handling of client information (CO3–CO4).

## CHAPTER 5 — INTERIM CONCLUSION

### 5.1 Project Status and Next Steps

The research and initial prototype provide a basis for the client’s test run. The next stage is to collect feedback, identify necessary changes and maintain the website while checking its suitability for daily stock recording. Weeks 3–4 are future work in this draft dated 21 October 2026; actual feedback, modifications and acceptance will be entered later. This project account forms only the first part of the longer industrial training report.

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

| Week 2 | 19–24 Oct 2026 | Research, design and initial prototype |

| Week 3 — planned | 26–31 Oct 2026 | Client review, test runs and feedback; changes pending |

| Week 4 — planned | 2–7 Nov 2026 | Retesting and maintenance according to client feedback |

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

Weeks 1 and 2 are current draft records; Weeks 3 and 4 are project plans, not completed-work or attendance certification.

| Week | Duties Performed / Task setting | Remarks<br>by Supervisor |

| --- | --- | --- |

| Week 1<br>12–17 Oct<br>2026 | Project 1: QR-Based Stock Inventory Management Website — Requirements Analysis.<br><br>Communicated with the client through online discussions and face-to-face meetings to understand the existing stock recording process and the intended use of product QR codes.<br><br>Reviewed the inventory spreadsheet, Google Form and QR-code PDF. Organised the initial requirements, including product identification, stock receipts and issues, photo evidence, administrator access and reorder thresholds.<br><br>Outlined the worker and administrator workflows and considered a mobile-friendly website as an alternative to a native application. |  |

| Week 2<br>19–24 Oct | Progress up to 21 October: researched HTML, CSS, JavaScript, Apps Script, Sheets and Drive; designed data/workflows and prepared the initial website prototype.<br><br>The prototype covers product QR entry, employee ID, quantities/photos, stock calculations and admin functions. For 22–24 October, check and organise the prototype for Week 3 client testing. Formal feedback and modifications are pending. |  |

| Week 3<br>26–31 Oct<br>PLANNED | Planned: client review and test runs of QR routing, forms, inventory and photos. Collect comments and record issues. Specific modifications await client feedback. |  |

| Week 4<br>2–7 Nov<br>PLANNED | Planned: follow-up tests and initial maintenance. Make and verify only changes agreed with the client. Actual modifications and results will be filled after feedback. |  |

| Summary of the Month: October 2026 — interim draft as at 21 October | Summary of the Month: October 2026 — interim draft as at 21 October | Summary of the Month: October 2026 — interim draft as at 21 October |

| Requirements, research, design and an initial prototype form the first stage. Client review, test runs, agreed changes and maintenance are reserved for later weeks. Update this summary from actual feedback and work at month end. | Requirements, research, design and an initial prototype form the first stage. Client review, test runs, agreed changes and maintenance are reserved for later weeks. Update this summary from actual feedback and work at month end. | Requirements, research, design and an initial prototype form the first stage. Client review, test runs, agreed changes and maintenance are reserved for later weeks. Update this summary from actual feedback and work at month end. |

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
