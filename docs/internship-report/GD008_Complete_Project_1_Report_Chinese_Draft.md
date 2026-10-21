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

本阶段报告仅记录第一个项目——二维码库存管理网站的第一、二周，期间为 2026 年 10 月 12–24 日。内容涵盖客户需求、技术研究、流程与数据设计及初步原型。原型现待客户检视，反馈与修改将在取得实际资料后补充。10 月 21 日之后的安排仍须确认。

关键词：库存管理；二维码；网页应用；Google Apps Script；实习。

## 目录

## 表格与附录清单

表 A1：需求清单

表 A2：第一、二周进度

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

### 2.2 流程与初步原型

工人流程为扫描二维码、确认商品、填写员工 ID 和数量、附照片及提交。管理员可维护商品、查看库存、更正误填记录及打印指定标签。库存计算规则为期初库存加有效进货，再减有效领货。

研究和初步开发后，已具备供客户检视的原型。设计考虑包括数量验证、库存不足拦截、防止重复提交及后台管理权限检查。员工 ID 仍是自行填写，共用管理员密码也属于初版限制。

## 第三章——工业实习工作经验

### 3.1 第一周：需求与流程理解（10 月 12–17 日）

我通过线上沟通和线下会议了解工人领货及管理员检查库存的方式，查阅现有库存资料和扫码进入表单的流程，识别所需字段并整理初步需求。我也拟定工人与管理员流程，并探索可行的网站方案。

### 3.2 第二周：研究、设计与初步开发（10 月 19–24 日）

截至 10 月 21 日，工作集中于工具选择、商品与交易数据设计，以及初步网站开发。原型整合了二维码商品选择、员工 ID、数量、照片、库存计算及管理员功能。本周其余时间安排检查原型并准备交给客户检视。正式验收及客户要求的修改仍待确认。

## 第四章——工作任务与专业实践

### 4.1 主要任务与验证

项目工作涵盖需求、流程与数据设计、初步网页原型及客户测试准备。试运行应检查二维码对应商品、库存加减、照片读取、指定标签打印及管理员记录更正。仅能打开页面不足以证明这些功能正确。

### 4.2 数据责任与学习

正式使用前须核实期初库存，清楚标识测试记录，并在更正时保留核查资料。密码与私人照片链接不应公开。项目促进软件设计及工具应用能力（CO1–CO2）、沟通与自主学习（CO5–CO7），以及负责任地处理客户资料（CO3–CO4）。

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

### 表 A2：第一、二周进度

| 周次 | 日期 | 重点 |

| --- | --- | --- |

| 第一周 | 2026/10/12–17 | 需求与客户沟通 |

| 第二周 | 2026/10/19–24 | 研究、设计与初步原型 |

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

| 第一周<br>2026 年<br>10 月<br>12–17 日 | 项目一：基于二维码的库存管理网站——需求分析。<br><br>通过线上讨论及线下会议与客户沟通，了解现有库存记录流程，以及工人扫描商品二维码的操作需求。<br><br>查阅库存电子表格、Google Form 和二维码 PDF，整理商品识别、进货与领货、照片凭证、管理员权限及补货警戒值等初步需求。<br><br>拟定工人与管理员的主要操作流程，并研究以手机友好的网站代替原生应用程序的可行性。 |  |

| 第二周<br>10/19–24 | 截至 10 月 21 日：研究 HTML、CSS、JavaScript、Apps Script、Sheets 与 Drive，规划数据和流程，并准备初步网站原型。<br><br>原型涵盖商品扫码、员工 ID、数量与照片、库存计算及管理功能。10 月 22–24 日拟检查和整理原型，准备交客户检视；正式反馈及修改尚待确认。 |  |

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
