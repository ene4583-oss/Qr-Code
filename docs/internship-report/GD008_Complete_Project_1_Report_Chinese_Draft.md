INDUSTRIAL TRAINING REPORT AT

BAKTI MAKMUR (M) SDN. BHD.

BY

WONG SOOK EN

(2200498)

Programme: Software Engineering

Lee Kong Chian Faculty of Engineering and Science

Lee Kong Chian Faculty of Engineering and Science Universiti Tunku Abdul Rahman

October 2026 Trimester

## 声明

本人确认：本文件为依据 GD008 模板整理的阶段性草稿，须由本人核对实际工作、资料准确性及公开许可后，按照大学规定签署正式声明。

原模板声明要求包括：报告由学生本人负责撰写，实习资料在本人所知范围内正确，且不含与公司利益冲突的机密内容。使用辅助写作的情况须按大学要求处理；本稿不代替本人声明。

姓名: Wong Sook En

学号: 2200498

签名：____________________

日期：实际签署时填写

## 摘要

本阶段报告涵盖 2026 年 10 月 12–25 日，即第一个项目——二维码库存管理网站的前两个报告周。将上一版相同的需求、研究、流程与数据设计及初步原型内容扩写为逐日记录。原型待客户检视；具体每日分配须核实，21 日之后仍属计划，不将后续反馈、修改与维护写为已完成工作。

关键词：库存管理；二维码；网页应用；Google Apps Script；实习。

## 目录

## 表格与附录清单

表 A1：需求清单

表 A2：第一、二周进度（10 月 12–25 日）

表 A3：试运行检查清单

附录 A：需求、计划及测试案例

## 第一章——绪论

### 1.1 实习与项目背景

实习单位为 Bakti Makmur (M) Sdn. Bhd.，实习期为 2026 年 10 月 12 日至 2027 年 1 月 9 日，企业主管为 Christopher Kong San Hor，职位 IT Technician。本部分只记录第一个项目——二维码库存管理网站的第一、二周。公司背景资料及 Logo 之后补充。

客户原本使用商品二维码连接 Google Form。项目将领货、进货、员工 ID 与照片凭证整合到手机友好的网站，并由管理员查看库存数量及执行管理操作。

### 1.2 目标与范围

目标是简化扫码记录、自动计算库存，并提供商品维护、错误记录更正、补货提醒，以及附照片的二维码标签打印。方案使用现有 Google 服务，不开发原生手机应用。额外消息渠道暂不纳入本阶段范围。

## 第二章——研究与学习

### 2.1 需求与技术选型

我查阅客户提供的库存表、Google Form 和商品二维码 PDF，并通过线上及线下沟通理解需求。主要要求包括扫描对应商品、输入员工 ID 和数量、提供照片、区分管理员权限，以及每件商品独立的补货警戒值。

界面选择 HTML、CSS 和 JavaScript，后台使用 Google Apps Script，Google Sheets 保存商品与交易记录，Google Drive 储存照片。网站让工人通过手机相机直接进入商品表单，无须安装应用。

从技术职责看，HTML 定义商品选择、输入字段及管理表格；CSS 提供手机布局和打印样式；JavaScript 负责交互、输入准备和二维码生成。Apps Script 在后台核对请求并连接表格与文件，避免让工人直接修改库存表。工具分工围绕相同需求展开，没有增加新的项目范围。

### 2.2 流程与初步原型

工人流程为扫描二维码、确认商品、填写员工 ID 和数量、附照片及提交。管理员可维护商品、查看库存、更正误填记录及打印指定标签。库存计算规则为期初库存加有效进货，再减有效领货。

研究和初步开发后，已具备供客户检视的原型。设计考虑包括数量验证、库存不足拦截、防止重复提交及后台管理权限检查。员工 ID 仍是自行填写，共用管理员密码也属于初版限制。

## 第三章——工业实习工作经验

逐日编排说明：本节将上一版相同的活动扩写并按日期暂分配，并非已经核实的逐日出勤日志。12–21 日的具体任务日期须按实际记录确认；22–25 日为未来安排。线上与线下沟通确属原需求，但具体会议日期尚未提供。星期六工作至中午 12 点，星期日没有上班，后续客户反馈、修改及维护不预先编写。

### 3.1 第一周：2026 年 10 月 12–18 日

2026 年 10 月 12 日（星期一）——项目了解与现有记录查阅 — 我查阅库存表、现有 Google Form 和商品二维码及图片 PDF，理解原有记录流程，识别编号、名称、单位及库存等主要资料。我梳理工人扫码后记录操作的基本流程，并整理进货与领货区别、照片凭证及管理员库存可见性等问题，为需求沟通作准备。

2026 年 10 月 13 日（星期二）——线上客户沟通与初步需求 — 我通过线上沟通厘清进入商品表单、员工识别、数量、照片及可选备注等需求，将“自动扣库存”等期望转化为明确的交易与计算规则，并整理初步需求清单，让客户的日常操作描述成为设计依据。具体沟通日期仍须按实际会议记录核对。

2026 年 10 月 14 日（星期三）——线下讨论与流程澄清 — 线下讨论明确了工人只看名称、图片与单位，库存数量仅供管理员查看，进货也需要管理员授权。我考虑 PAIR、PCS、PACK 和 KG 的含义，避免数量被错误理解，并记录商品编号应保持稳定，因为已打印标签使用该编号。会议细节和日期仍须按实际记录确认。

2026 年 10 月 15 日（星期四）——需求清单整理 — 我将需求分为工人、管理员和系统功能，包括扫码、员工 ID 与照片、库存计算、商品维护、错误更正、警戒值、公司标识及标签打印。我区分必要行为与后续增强，把额外消息渠道排除在首阶段范围外，形成较清楚的客户审阅清单，不将其当作所有功能已验收或正式测试的证明。

2026 年 10 月 16 日（星期五）——开发方案研究 — 我比较手机网站与原生应用，选用网站方向，使工人可通过手机相机进入商品链接而无须安装。我研究 HTML、CSS、JavaScript，以及 Apps Script、Sheets 和 Drive 在界面、后台、记录与照片方面的分工，同时考虑网络依赖、服务配额及后台权限检查。

2026 年 10 月 17 日（星期六，工作至中午 12 点）——初步流程与数据字段规划 — 星期六工作至中午 12 点，我梳理工人与管理员流程，并规划商品及交易字段。商品包括编号、名称、单位、期初库存、警戒值与图片；交易包括进出类型、数量、员工 ID、时间和照片。库存定义为期初加有效进货、再减有效领货。具体任务日期仍须以实际记录核对。

2026 年 10 月 18 日（星期日）——休息日 — 星期日为休息日，没有上班，不记录会议、开发或项目任务。

### 3.2 第二周：2026 年 10 月 19–25 日

2026 年 10 月 19 日（星期一）——数据组织与原型结构 — 我完善 Products、Transactions 和 Settings 的组织，把商品资料、交易及公司标识分开，并区分展示图片与交易现场照片。工人表单、管理页与标签页通过相同商品编号连接，期初库存则作为需盘点核实的起点，不代替正常进货记录。

2026 年 10 月 20 日（星期二）——工人界面与提交流程 — 我以 HTML、CSS 和 JavaScript 开发初步工人表单，在手机布局中提供商品资料、员工 ID、数量及必填照片，并规划输入验证、商品识别、进出货处理和照片引用。设计考虑正数数量、库存不足及重复请求；ID 以文字保存，支持字母和开头的 0，但不视为身份认证。

2026 年 10 月 21 日（星期三）——初步管理功能与审阅准备 — 我整合初步管理员功能，包括库存与记录、商品维护、警戒值、照片和二维码标签，并支持单件、多件、全选及移除误选。我考虑记录更正只撤销一次库存影响、保留原记录与原因，以及阻止造成负库存的进货删除。原型已准备供客户检视，验收和具体改动仍待反馈。

2026 年 10 月 22 日（星期四）——计划检查原型与资料 — 计划：根据既有需求检查原型，重点为商品编号、单位、员工 ID、数量和照片、工人库存隐私及进货管理授权，整理客户检视前的差异和遗漏。不预先声称发现故障、完成修复或通过测试，执行后按实际检查与结果更新。

2026 年 10 月 23 日（星期五）——计划检视标签与管理界面 — 计划：检视二维码目标和标签布局，包括编号、名称、单位、照片与可选文字，检查已选清单及移除选项不会删除商品；同时检视原范围内的公司标识、商品与更正控制。实际问题及结果待执行后记录。

2026 年 10 月 24 日（星期六，工作至中午 12 点）——计划整理客户审阅材料 — 计划于星期六上午至中午 12 点，整理需求、流程与原型供客户检视，并准备具确认和意见栏的客户需求表，保持文件中的预期行为一致。目标是准备好接受反馈，而非假定最终验收；实际完成事项及具体修改仍待确认。

2026 年 10 月 25 日（星期日）——休息日 — 按已确认安排，星期日为休息日，不上班，不安排或声称已完成会议、测试、修改等工作。

## 第四章——工作任务与专业实践

### 4.1 主要任务与验证

项目工作涵盖需求、流程与数据设计、初步网页原型及客户测试准备。试运行应检查二维码对应商品、库存加减、照片读取、指定标签打印及管理员记录更正。仅能打开页面不足以证明这些功能正确。

### 4.2 数据责任与学习

正式使用前须核实期初库存，清楚标识测试记录，并在更正时保留核查资料。密码与私人照片链接不应公开。项目促进软件设计及工具应用能力（CO1–CO2）、沟通与自主学习（CO5–CO7），以及负责任地处理客户资料（CO3–CO4）。

本阶段的主要困难是把日常操作描述转化为明确规则，例如数量使用哪个单位、哪些信息需要隐藏、记录填错后如何更正。我以分类需求、分开工人与管理员流程，以及明确数据字段的方式处理。这加强了沟通、独立研究和问题拆解能力；客户意见尚待收集，因此不虚构具体修改结果。

## 第五章——阶段总结

### 5.1 当前状态与后续工作

第一、二周通过客户沟通、需求分析、技术研究与初步开发，建立了二维码库存网站的原型，目前待客户检视。实际反馈、修改与维护将在取得资料后另外记录。本部分仅涵盖前两周，作为较长实习报告的开端。

## 附录 A——需求、计划及测试案例

### 表 A1：需求清单

| 编号 | 使用者 | 需求 |

| --- | --- | --- |

| R1 | 工人 | 扫描二维码并打开正确商品表单。 |

| R2 | 工人 | 查看名称、图片和单位；提交员工 ID、数量与照片。 |

| R3 | 后台 | 记录进出货及计算库存，避免重复处理。 |

| R4 | 管理员 | 查看库存，新增、修改、停用及恢复商品。 |

| R5 | 管理员 | 填写原因更正错误记录，并安全地重新计算库存。 |

| R6 | 管理员 | 设定每件商品警戒值与已订货状态。 |

| R7 | 管理员 | 打印选定二维码，包含照片与可选货架文字。 |

| R8 | 管理员 | 更改公司名称与 Logo，后台限制管理操作。 |

### 表 A2：第一、二周进度（10 月 12–25 日）

| 周次 | 日期 | 重点 |

| --- | --- | --- |

| 第一周 | 2026/10/12–18 | 需求与客户沟通 |

| 第二周 | 2026/10/19–25 | 研究、设计与初步原型 |

### 表 A3：功能测试计划

| 编号 | 测试场景 | 预期结果 | 执行状态 |

| --- | --- | --- | --- |

| T1 | 扫描商品 A | 打开正确商品 A 表单 | 待执行／补证据 |

| T2 | 库存 10 领货 1 | 库存变为 9 | 待执行／补证据 |

| T3 | 库存 9 进货 1 | 库存变为 10 | 待执行／补证据 |

| T6 | 删除错误领货 | 只加回一次，保留核查记录 | 待执行／补证据 |

| T8 | 多选标签并移除一项 | 只打印剩余选项 | 待执行／补证据 |

| T12 | 上传并查看照片 | 授权人员能读取正确照片 | 待执行／补证据 |

## 工程／理科每周及每月记录

仅填写第一、二周。其余周次与月份总结留空，之后按实际情况补充。

| Week | Duties Performed / Task setting | Remarks<br>by Supervisor |

| --- | --- | --- |

| 第一周<br>10/12–18 | 12/10：了解项目及查阅现有库存、表单和二维码资料。<br>13/10：线上需求讨论（具体日期待核对）。<br>14/10：线下澄清角色、单位与扫码流程（日期待核对）。<br>15/10：整理工人、管理员及系统需求。<br>16/10：研究网页方案及开发工具。<br>17/10（上午，至中午 12 点）：拟定流程与数据字段。<br>18/10：星期日休息，没有上班。 |  |

| 第二周<br>10/19–25 | 19/10：完善商品、交易及设置数据组织。<br>20/10：初步工人界面与提交流程。<br>21/10：整理管理功能及原型，准备客户检视。<br>22/10（计划）：按既有需求检查原型与资料。<br>23/10（计划）：检视标签及管理界面。<br>24/10（上午计划，至中午 12 点）：整理需求表及客户审阅材料。<br>25/10：星期日休息，不安排工作。 |  |

|  |  |  |

|  |  |  |

| 月份总结：2026 年 10 月 | 月份总结：2026 年 10 月 | 月份总结：2026 年 10 月 |

|  |  |  |

学生：Wong Sook En｜学号：2200498

主管：Christopher Kong San Hor｜IT Technician

学生签名：____________________

主管签名及公司印章：____________________

## 评分表及评分标准（评核人员填写）

以下评估内容保留原 GD008 格式，分数、评语及签署由评核人员填写，不由报告代填。

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
