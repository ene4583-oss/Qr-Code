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

逐日编排说明：本节将上一版相同的活动扩写并按日期暂分配，并非已经核实的逐日出勤日志。12–21 日的具体任务日期须按实际记录确认；22–25 日为未来安排。线上与线下沟通确属原需求，但具体会议日期尚未提供。星期日是否工作待确认，后续客户反馈、修改及维护不预先编写。

### 3.1 第一周：2026 年 10 月 12–18 日

#### 2026 年 10 月 12 日（星期一）——项目了解与现有记录查阅

我先了解库存网站项目的用途，并查阅客户提供的资料。库存电子表格列出了需要保留的商品编号、名称、单位与数量。我也查看原有 Google Form 入口，以及包含个别二维码和商品图片的 PDF。这帮助我认识到，网站应改善现有记录流程，而不是另建一个与原操作无关的应用。

主要任务是理解起点流程：工人扫描标签后记录一次库存操作。我整理了需要澄清的问题，尤其是进货与领货的区别、每次操作需要的凭证，以及谁可以看到库存数量。当天内容的预期产出是用于需求沟通的初步问题清单。

#### 2026 年 10 月 13 日（星期二）——线上客户沟通与初步需求

我通过线上沟通厘清预期操作方式，重点包括工人如何进入商品表单、应填写什么资料，以及提交后库存如何变化。主要记录字段确定为员工识别资料、操作数量及照片，必要时也可以填写备注。

我把客户期望的结果与实施方法分开。例如，“库存自动减少”需要定义清楚的领货交易和一致的计算规则。我将这些内容整理为初步需求清单，让实际操作描述可以成为设计依据。此项沟通的具体日期仍须以学生实际会议记录核对。

#### 2026 年 10 月 14 日（星期三）——线下讨论与流程澄清

线下讨论用于了解拟议系统如何配合领货操作。重要要求是工人扫码后能看到名称、图片及单位，但实际库存只让管理员查看。进货也应通过管理员授权登记，不作为一般工人的操作。

我考虑 PAIR、PCS、PACK 和 KG 等单位的实际意义，数量输入必须配合该商品的单位，避免把一包误当成一件。我也记录商品编号应保持固定，因为已打印二维码使用这个编号。会议细节和日期须根据学生实际记录确认。

#### 2026 年 10 月 15 日（星期四）——需求清单整理

我把需求分成工人、管理员与系统责任。工人部分包括扫描对应商品、查看资料、填写员工 ID、数量及照片；管理员部分包括查看库存、登记进货、维护商品、更正错误记录、设置警戒值及打印标签。公司名称与 Logo 设置也归入相同的管理范围。

我区分必要行为与后续增强功能。首阶段以已配置的邮件和网页提醒为主，其他消息渠道不纳入当前范围，以避免需求不断扩大。产出是可供客户检视的清单，不将其当成已验收或已完成测试的证明。

#### 2026 年 10 月 16 日（星期五）——开发方案研究

我比较手机友好的网站与原生应用。网站适合现有流程，因为手机相机扫码后便能直接打开商品链接，无须另行安装，管理员也可以使用电脑。我研究 HTML、CSS 与 JavaScript 如何构成表单及响应式界面。

我也研究 Google Apps Script 作为连接 Sheets 和 Drive 的后台。Sheets 可以保存商品及操作记录，Drive 保存照片。这配合已有 Google 工具，减少初始架构工作。我同时记录网络依赖、服务配额，以及不能只靠隐藏按钮、必须由后台检查权限等限制。

#### 2026 年 10 月 17 日（星期六）——初步流程与数据字段规划

我将工人流程整理为扫码、核对商品、输入员工 ID 和数量、附照片及提交。管理员流程涵盖检查库存、进货、修改商品及标签打印。分开描述两类流程，有助于辨认需要管理权限的操作。

我规划分开保存商品与交易。商品包括编号、名称、单位、期初库存、警戒值和图片引用；交易包括对应商品、进出类型、数量、员工 ID、时间及照片引用。计算规则为期初库存加有效进货，再减有效领货。这为初步原型建立基础。星期六的任务归属仍须核对实际出勤。

#### 2026 年 10 月 18 日（星期日）——活动记录待确认

目前没有提供这个星期日的实际工作或出勤资料，因此不声称当天进行了会议、开发或特定工时。如实际为休息日，应按实记录；如确有项目工作，则在提交前补入实际任务与结果。

### 3.2 第二周：2026 年 10 月 19–25 日

#### 2026 年 10 月 19 日（星期一）——数据组织与原型结构

我完善 Products、Transactions 和 Settings 的数据组织。商品资料与库存交易分开，便于追踪变化；Settings 用于公司名称及 Logo。数据模型也区分商品展示图片与每一笔操作的现场照片。

页面结构分为工人表单、管理员库存页及二维码标签页，使用相同商品编号连接库存记录、表单和标签。期初库存视为需要盘点核实的起点，不用它代替正常进货。产出是更清楚的界面与记录连接方式。

#### 2026 年 10 月 20 日（星期二）——工人界面与提交流程

我使用 HTML、CSS 和 JavaScript 建立初步工人界面。表单显示所选商品，接收员工 ID 和数量，并要求照片。由于扫码是主要入口，布局需要在手机上保持易读。

我考虑提交后的处理步骤：验证输入、识别商品、区分进货和领货，以及保存照片引用。设计包括正数数量、库存不足拦截及重复请求处理。员工 ID 作为文字保留，以支持字母和开头的 0，但不将填写 ID 视为已核实身份。

#### 2026 年 10 月 21 日（星期三）——初步管理功能与审阅准备

我将管理员需求整合到初步原型，包括库存与近期记录、商品维护、警戒值、照片更新及商品二维码生成。标签选择需要支持单件、多件或全部，并能在打印前移除误选项。

我也考虑如何受控地更正错误库存记录：只撤销一次库存影响，保留原始记录与原因；删除进货不能造成负库存。研究、设计及初步原型已准备供客户检视，但客户验收和具体修改仍待反馈，不能混同为已完成交付。

#### 2026 年 10 月 22 日（星期四）——计划检查原型与资料

计划内容：根据现有需求清单检查原型，重点核对商品编号、单位、员工 ID、数量和照片字段；检查工人页面不显示库存，进货操作需要管理员授权。

预期产出是客户审阅前需要澄清的差异或遗漏清单。不预先声称发现了特定故障、完成修复或通过测试，实际检查内容及结果应在执行后替换这项计划。

#### 2026 年 10 月 23 日（星期五）——计划检视标签与管理界面

计划内容：检视商品二维码链接和标签排版，包括编号、名称、单位、可用照片和可选文字；检查已选清单清楚显示打印对象，移除选项不会删除商品。

管理界面检视拟包括已在需求内的公司名称与 Logo、商品资料及记录更正控制。这是现有范围内的准备，不新增功能承诺。实际发现的问题及结果待执行后记录。

#### 2026 年 10 月 24 日（星期六）——计划整理客户审阅材料

计划内容：整理初步需求、流程说明和原型，让客户能够一起检视；准备可供确认功能、要求修改或填写意见的客户需求表，并保持预期行为与报告一致。

预期阶段成果是准备好接受反馈的原型，不假定已取得最终验收。由于尚未收到反馈，具体修改及维护不预先编写。这个星期六是否工作及实际完成了哪些准备，都需要之后确认。

#### 2026 年 10 月 25 日（星期日）——工作安排待确认

保留此日期是为了覆盖要求的 10 月 12–25 日，但不假定当天有工作；相对本稿日期，这也是未来日期。如实际休息，按休息日记录；如有项目工作，之后补入核实内容。不声称当天已完成客户检视、测试、修改或维护。

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

| 第一周<br>10/12–18 | 12/10：了解项目及查阅现有库存、表单和二维码资料。<br><br>13/10：线上需求讨论（具体日期待核对）。<br><br>14/10：线下澄清角色、单位与扫码流程（日期待核对）。<br><br>15/10：整理工人、管理员及系统需求。<br><br>16/10：研究网页方案及开发工具。<br><br>17/10：拟定流程与数据字段（工作日期待核对）。<br><br>18/10：星期日，工作安排待确认。 |  |

| 第二周<br>10/19–25 | 19/10：完善商品、交易及设置数据组织。<br><br>20/10：初步工人界面与提交流程。<br><br>21/10：整理管理功能及原型，准备客户检视。<br><br>22/10（计划）：按既有需求检查原型与资料。<br><br>23/10（计划）：检视标签及管理界面。<br><br>24/10（计划）：整理需求表及客户审阅材料。<br><br>25/10：星期日，工作安排待确认。 |  |

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
