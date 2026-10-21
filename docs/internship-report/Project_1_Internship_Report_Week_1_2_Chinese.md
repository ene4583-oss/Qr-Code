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

本报告介绍 Bakti Makmur (M) Sdn. Bhd. 软件工程实习中的第一个项目：二维码库存管理网站。实习计划期间为 2026 年 10 月 12 日至 2027 年 1 月 9 日；第一个项目暂按 10 月 12 日至 11 月 7 日约四周安排。本稿涵盖需求分析、技术研究、工作流程、数据设计、专业实践及后续计划。工人拟扫描商品二维码进入表单，填写员工 ID、数量并附照片；管理员负责库存、商品、记录更正、标签和补货提醒。方案使用 HTML、CSS、JavaScript、Google Apps Script、Google Sheets 和 Google Drive。本稿截至 10 月 21 日，未来工作及测试结果未作为已完成事实，正式实习报告仍须补入实际证据与后续项目。

关键词：库存管理；二维码；网页应用；Google Apps Script；实习。

## 目录

## 表格与附录清单

表 A1：需求清单

表 A2：一个月进度计划

表 A3：功能测试计划

附录 A：需求、计划及测试案例

附录 B：部署与使用说明

附录 C：证据与待确认资料

## 第一章——绪论

### 1.1 公司与实习背景

根据实习计划，实习单位为 Bakti Makmur (M) Sdn. Bhd.，专业为软件工程，实习期为 2026 年 10 月 12 日至 2027 年 1 月 9 日。计划中列明的企业主管为 Christopher Kong San Hor，职位为 IT Technician。本报告集中描述第一个项目：基于二维码的库存管理网站。

本项目涉及进货、领货及相关商品资料与照片的管理。客户提供了库存电子表格、Google Form 链接，以及包含个别商品二维码与照片的 PDF，作为需求讨论的基础。公司完整地址、主要业务及正式组织架构尚未提供，定稿前需要补充核实。

### 1.2 实习汇报关系

已知的实习汇报关系为：企业主管 Christopher Kong San Hor（IT Technician）向软件工程实习生 Wong Sook En 提供指导。这里只说明计划支持的实习关系，不将其当作已经核实的完整公司组织架构。

### 1.3 项目背景与问题定义

原有流程是工人扫描商品二维码后填写 Google Form。拟议改善是将商品识别、员工资料、数量和照片凭证与一致的库存计算连接起来，同时让管理员能够检查余额及辨认需要补货的商品。

核心问题不仅是制作网上表单，也涉及流程和数据管理。系统需要区分进货与领货、把每笔操作对应到商品、防止意外重复处理，并限制库存管理操作只能由管理员执行。网站方案让工人继续使用手机相机作为主要入口。

### 1.4 项目目标与范围

项目目标包括明确扫码进入商品表单的流程、记录进出货、关联照片及根据交易计算库存。其他需求涵盖每件商品的补货警戒值、管理员维护商品、纠正错误记录、公司名称与 Logo，以及打印带商品资料和照片的指定二维码标签。

首阶段采用手机友好的网站与 Google 服务，不开发原生 Android 或 iOS 应用。WhatsApp、Telegram 与 SMS 整合暂缓。已核实的个人员工账号、完整采购系统、离线同步及大型仓库管理也不属于初始范围，以便将项目控制在约一个月内。

### 1.5 报告范围与项目安排

本稿编写于 2026 年 10 月 21 日，为阶段性项目报告。周记录涵盖 10 月 12–24 日，未来工作另列为计划。第一个项目拟安排至 11 月 7 日，并不代表已完成延续至 2027 年 1 月的整个实习。后续日期的进展及结论须根据实际记录更新。

## 第二章——研究与学习

### 2.1 需求收集与现有资料

我通过线上讨论与线下会议了解客户的操作方式。库存资料列出了商品类别、编号、名称、期初数量及单位；二维码 PDF 则说明标签及扫码的应用方式。我把这些内容视作需要核对的资料来源，而不是默认所有字段和余额都准确。

沟通重点包括区分工人和管理员需要看到的资料。工人应看到商品名称、图片及单位，具体库存只供管理员查看。记录字段由员工姓名调整为员工 ID。PAIR、PCS、PACK 和 KG 等单位需要分别处理，部分商品数量也可能使用小数。

### 2.2 网站与原生应用方案比较

手机友好的网站能够保留原来的扫码习惯。二维码可包含网站地址和商品编号，让手机相机直接打开对应表单。工人无须安装独立原生应用，管理员也能在电脑上使用同一服务。

这个方案仍有局限：提交需要网络，手机浏览器的相机行为可能不同，主屏幕快捷方式也不等于原生推送。网页弹窗需要打开管理员页面；邮件可在页面外提醒管理员，其他消息渠道则需要额外整合。

### 2.3 开发语言与工具

HTML 定义表单、表格、对话框及打印标签结构；CSS 负责排版、颜色、响应式布局和打印样式；JavaScript 负责交互、验证、图片处理及二维码生成。Google Apps Script 同样使用 JavaScript，提供后台处理、读取或更新 Google Sheets 及将照片存入 Drive 的功能。虽然实习计划列有 Java，本网站方案并不需要使用它。

Google Sheets 适合作为初期小团队的记录存储，Google Drive 用于照片文件，GitHub 用于版本管理及说明文件，Microsoft Word 用于报告。这些工具能降低初始架构复杂度，但权限、验证、服务配额与恢复安排仍不可忽略。

### 2.4 系统架构与数据设计

架构将使用界面与数据修改操作分开。浏览器负责显示表单和提交请求，Apps Script 在写入前验证。不能只通过隐藏页面数字来保护库存，后台同样需要控制管理员资料与操作。

Products 表保存商品编号、名称、类别、单位、期初库存、警戒值、图片引用和商品状态。Transactions 保存请求编号、时间、商品、进出类型、数量、员工 ID、备注和照片引用。Settings 保存公司名称与 Logo。商品编号应保持稳定，让原有二维码和历史记录仍指向同一商品。

当前库存定义为期初库存加有效进货，再减有效领货。错误记录经过管理员更正后不再参与计算，但保留原始行以便核对。删除进货若造成负库存，则必须拒绝。

### 2.5 二维码识别与打印标签

商品二维码包含部署网址和 item 参数，工人打开后可自动选中对应商品。找不到或已停用的商品不能悄悄变成另一件商品，应提示联系管理员，或由使用者明确选择有效商品。

标签结合二维码、编号、名称、单位及可用照片，也可以加货架或仓位文字。管理员可以选择单件、多件或全部打印，并移除误选项。实际使用前必须检查目标网址及纸上扫码效果，不能只以画面有二维码就判断流程成功。

### 2.6 权限、验证与限制

初期使用后台核对的共用管理员密码，属于有限管理机制，不是完整个人账号系统。员工 ID 是自行填写的值，不代表已验证身份。如果允许匿名访问，持有网址的人便可能提交领货，推广使用前必须了解这个限制。

其他考虑包括正数数量、小数单位、库存不足处理、文件格式与大小检查、重复请求编号，以及库存更新串行处理。照片不应意外公开。Apps Script、邮件和 Drive 有配额；随着交易增加，逐行计算库存也需要优化。

## 第三章——工业实习工作经验

### 3.1 第一周：客户沟通与需求分析

第一周报告区间为 2026 年 10 月 12–17 日，重点是了解库存管理需求。线上沟通与线下会议帮助我把操作描述整理成需求清单，并查阅库存表、Google Form 入口和商品二维码资料。

我区分工人领用流程与管理员监控流程，厘清进货和领货对库存的影响，也研究网站能否比原生应用更简单地满足需要。该阶段的预期产出是需求草稿与流程概要，不是宣称整个系统已交付。

### 3.2 第二周：技术探索与初步设计

第二周区间为 2026 年 10 月 19–24 日。本稿记录截至 21 日的研究与流程规划，包括 HTML、CSS、JavaScript、Apps Script、Sheets 和 Drive 的用途，以及需要的数据字段与处理步骤。

10 月 22–24 日计划准备页面草图、与客户检视流程和确定开发优先次序，不提前写成已经完成。这有助于保持实习日志准确，避免将安排表误当作已发生的工作。

### 3.3 第三、四周计划

第三周 10 月 26–31 日安排核心原型：工人和管理员界面、商品二维码入口、员工 ID、数量、照片、进出货，以及 Sheets 和 Drive 整合。应先使用独立测试商品，再扩大清单或使用真实余额。

第四周 11 月 2–7 日安排完善、整合测试、客户反馈及交接准备。功能包括商品维护、管理员更正记录、公司标识、选定标签打印和补货提醒。交付须依据实际测试与验收，若范围超出时间，应重新排定优先次序。

### 3.4 沟通、自主学习与解决问题

项目需要把实际问题转成明确行为，例如谁能看到库存、扫码后发生什么、何时补货提醒，以及填错记录如何更正。我尝试清楚说明这些行为，并在设计确定前取得反馈。

自主学习集中于 JavaScript、Apps Script，以及电子表格、上传文件和网页之间的关系。解决问题时应检查具体错误、区分前端与后台或权限问题，并在有实质调整后重试。更新部署前先测试，也有助于保护正在使用的版本。

### 3.5 学习成果对应

CO1 对应需求分析、流程建模及数据设计；CO2 对应网页语言、Google 服务、二维码和版本管理；CO5 对应客户沟通与书面说明；CO6 对应独立研究及与客户或主管讨论；CO7 对应学习新工具并根据反馈改进。这些是学习反思的对应关系，不能代替主管确认或正式评分。

## 第四章——工作任务与专业实践

### 4.1 需求及设计产出

本阶段产出包括需求清单、工人和管理员流程、技术选型和初步数据模型。工人界面拟用于确认商品和提交操作，管理员界面拟用于管理商品、检查库存、更正错误及生成标签。附录将这些要求整理成可继续与客户完善的形式。

### 4.2 功能验证计划

验证应根据真实业务场景，而不是只看页面能否打开。二维码应指向正确商品；领货应减少库存，进货应增加；库存不足时应拒绝；授权人员应能查看已保存照片。管理员删除记录应只撤销一次库存影响、保留核查资料，并拒绝产生负库存的更正。

附录列出测试案例及预期结果。本报告未取得正式带日期的执行记录、截图与客户验收证据，因此该表是测试计划，不虚构通过结果。实际执行后才可填写结果。

### 4.3 数据准确性与授权访问

正式使用前应盘点并核实期初库存，测试交易应明确标识并使用适当机制更正。手动删除电子表格行可能破坏可追溯性，应尽量避免。管理员更正应保留原记录、删除时间和原因，同时将该笔交易排除于有效库存计算。

共用管理员密码意味着持有人权限相同。密码应私下传递，不应出现在公开代码、截图或报告。分享网站与分享私人 Drive 照片权限是不同操作，增加使用者前应检视访问需要。

### 4.4 专业行为与报告诚信

专业实践包括谨慎处理客户资料、遵守授权范围、保持记录准确，以及如实说明限制。实习计划中的 CO3 和 CO4 包含这些责任。由于没有提供具体内部政策，本稿不会宣称已符合某个特定合规标准或通过正式安全审计。

报告区分已知需求、技术设计与未来计划，不捏造会议出席、工时、主管批准、测试证据或客户验收。学生应核对事实、根据自身理解修订，并依大学对辅助写作的要求处理后，才签署正式声明。

## 第五章——阶段总结与后续工作

### 5.1 阶段性结论

初期工作为通过二维码和手机网站改善库存记录建立了方向。需求分析指出，工人最重要的操作是扫码后进入正确商品表单；将商品、交易、照片及管理设置分开，也为后续实施提供更清晰的基础。

当前学习重点是客户沟通、技术评估和一致的库存流程设计。需要继续完善的领域包括身份与访问控制、系统化测试证据、实际库存核对，以及服务配额。本节是第一个项目的阶段结论，并非整个实习的最终评价。

### 5.2 后续工作与未来改善

后续安排是开发或完善已确认原型、执行代表性测试、确认初始库存、收集反馈，并准备部署及使用说明。最终报告须把计划内容替换为核实成果，并加入适合公开的证据。

未来可考虑个人管理员账号、更可靠的员工验证、数据库优化及其他通知渠道。迁往公司管理的 Google 账号，也需要规划表格与照片权限、部署所有权和二维码网址变化。这些是后续方向，并非首个月内全部完成的承诺。

## 参考资料

Universiti Tunku Abdul Rahman (2024) GD008 IT Report Template 2024. User-supplied report template.

Universiti Tunku Abdul Rahman (n.d.) GD007 IT Report Guidelines, LKC FES, revision 06 (Non-QS). User-supplied guidelines.

Universiti Tunku Abdul Rahman (2026) Industrial Training Plan, FM-FES-ITC-004, revision 4. Prepared by Wong Sook En; dated 13 October 2026. User-supplied document.

Client-supplied materials (n.d.) STORE INVENTORY SYSTEM — Google spreadsheet export and DU01–DU16 Individual QR and Images PDF. Internal project references; no private operational URLs reproduced.

Google (n.d.) Apps Script documentation. Available at: https://developers.google.com/apps-script/ (technical reference for further verification).

MDN Web Docs (n.d.) HTML, CSS and JavaScript documentation. Available at: https://developer.mozilla.org/ (technical reference for further verification).

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



### 表 A2：一个月进度计划

| 周次 | 日期 | 重点 |

| --- | --- | --- |

| 第一周 | 2026/10/12–17 | 需求与客户沟通 |

| 第二周 | 2026/10/19–24 | 研究、流程、数据设计与草图 |

| 第三周（计划） | 2026/10/26–31 | 核心开发与整合 |

| 第四周（计划） | 2026/11/2–7 | 完善、测试、反馈与交接 |



### 表 A3：功能测试计划

| 编号 | 测试场景 | 预期结果 | 执行状态 |

| --- | --- | --- | --- |

| T1 | 扫描商品 A | 打开正确商品 A 表单 | 待执行／补证据 |

| T2 | 库存 10 领货 1 | 库存变为 9 | 待执行／补证据 |

| T3 | 库存 9 进货 1 | 库存变为 10 | 待执行／补证据 |

| T4 | 领货超过库存 | 拒绝请求，不扣库存 | 待执行／补证据 |

| T5 | 重试同一请求 | 不重复扣货 | 待执行／补证据 |

| T6 | 删除错误领货 | 只加回一次，保留核查记录 | 待执行／补证据 |

| T7 | 删除进货会造成负数 | 拒绝更正 | 待执行／补证据 |

| T8 | 多选标签并移除一项 | 只打印剩余选项 | 待执行／补证据 |

| T9 | 保存名称和 Logo | 刷新后设置仍保留 | 待执行／补证据 |

| T10 | 未授权管理请求 | 后台拒绝 | 待执行／补证据 |

| T11 | 达到警戒值且已配置邮件 | 尝试提醒，另核实送达 | 待执行／补证据 |

| T12 | 上传并查看照片 | 授权人员能读取正确照片 | 待执行／补证据 |



## 附录 B——部署与使用说明

1. 使用授权 Google 账号准备库存表和私人照片文件夹，并在 Apps Script 配置其 ID 及管理员凭据。不要在报告或公开代码记录密码。

2. 保留 Products、Transactions 和 Settings 的正确字段，核实商品单位和期初库存。

3. 保存网页与后台代码后，先用测试部署检视流程；发布时更新原部署以尽量保留二维码网址。

4. 工人扫描商品二维码，核对商品，填写员工 ID、数量和照片，等成功提示后再领取。

5. 管理员检查库存、处理进货、维护资料及更正测试记录。

6. 打印前核实正式网址、已选商品和照片，先在纸上试扫一张。

7. 交接时说明共用管理员密码、照片权限、Google 配额与消息渠道限制。

## 附录 C——证据与待确认资料

已提供依据为 IT Plan、GD008 模板、报告指引、库存表及二维码 PDF。未提供正式会议记录、主管确认、带日期的测试截图、验收签署及完整公司资料。以下清单用于后续补齐，不代表这些证据已存在。

公司地址、业务介绍与正式组织架构：待公司确认。

公司 Logo：留空，之后插入。

会议日期、参与者及需求确认：按实际记录补充。

界面截图与扫码实测：补充获准公开的版本。

测试日期、结果及问题修复记录：实际执行后填写。

交付日期、客户或主管意见：确认后补充。

完整实习的后续项目、周记录与最终总结：后续期间完成。

## 工程／理科每周及每月记录

第一、二周为当前记录草稿；第三、四周为项目计划，不作为已完成工作或出勤证明。

| Week | Duties Performed / Task setting | Remarks<br>by Supervisor |

| --- | --- | --- |

| 第一周<br>2026 年<br>10 月<br>12–17 日 | 项目一：基于二维码的库存管理网站——需求分析。<br><br>通过线上讨论及线下会议与客户沟通，了解现有库存记录流程，以及工人扫描商品二维码的操作需求。<br><br>查阅库存电子表格、Google Form 和二维码 PDF，整理商品识别、进货与领货、照片凭证、管理员权限及补货警戒值等初步需求。<br><br>拟定工人与管理员的主要操作流程，并研究以手机友好的网站代替原生应用程序的可行性。 |  |

| 第二周<br>2026 年<br>10 月<br>19–24 日 | 项目一：技术研究与初步系统设计。<br><br>截至 10 月 21 日的进展：研究使用 HTML、CSS 和 JavaScript 建立手机友好的界面，以 Google Apps Script 处理后台，Google Sheets 管理库存记录，以及 Google Drive 保存照片。<br><br>规划商品及交易数据字段、扫码进入对应商品、员工 ID 输入和库存计算规则，并将数量验证及管理员权限列为设计要求。<br><br>10 月 22–24 日计划：准备简单页面草图，与客户检视需求及流程，并确定第三周优先开发的核心功能。系统整合、详细测试与交付安排于第三、四周。 |  |

| 第三周<br>10/26–31<br>（计划） | 计划开发核心界面及 Google 服务整合，实施扫码、员工 ID、数量与照片、进出货和库存计算。完成情况及问题待实际执行后补充。 |  |

| 第四周<br>11/2–7<br>（计划） | 计划完善管理、记录更正、品牌、标签及提醒功能，执行测试、收集反馈和准备交接。实际结果与验收待确认。 |  |

| 月份总结：2026 年 10 月（截至 21 日的阶段性草稿） | 月份总结：2026 年 10 月（截至 21 日的阶段性草稿） | 月份总结：2026 年 10 月（截至 21 日的阶段性草稿） |

| 本阶段重点为客户沟通、需求分析、技术研究与流程设计。完整月总结须在月底根据实际工作更新；第三、四周计划不计作已完成成果。 | 本阶段重点为客户沟通、需求分析、技术研究与流程设计。完整月总结须在月底根据实际工作更新；第三、四周计划不计作已完成成果。 | 本阶段重点为客户沟通、需求分析、技术研究与流程设计。完整月总结须在月底根据实际工作更新；第三、四周计划不计作已完成成果。 |



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
