import { QuestionBank, QuestionType } from "../types";

export const initialSystemBank: QuestionBank = {
  id: "sys-2018-05-high",
  title: "2018年05月-高级-选择题-真题",
  description: "信息系统项目管理师真题，包含75道选择题，涵盖信息系统、项目管理、法律法规及英语等知识点。",
  createdAt: 1527811200000, // Approx May 2018
  status: "ready",
  progress: 100,
  isSystem: true,
  source: "upload",
  questions: [
    {
      id: "q-sys-1",
      number: 1,
      type: QuestionType.Single,
      text: "我国在“十三五”规划纲要中指出要加快信息网络新技术开发应用，以拓展新兴产业发展空间，纲要中提出将培育的新一代信息技术产业创业重点中不包括（）。",
      options: ["人工智能", "移动智能终端", "第四代移动通信", "先进传感器"],
      correctIndices: [2],
      explanation: "排除法。常识题。我国在“十三五”规划纲要中，将培育人工智能、移动智能终端、第五代移动通信（5G）、先进传感器等作为新一代信息技术产业创新重点发展。选项C为“第四代”，故不包括。"
    },
    {
      id: "q-sys-2",
      number: 2,
      type: QuestionType.Single,
      text: "智能具有感知、记忆、自适应等特点，能够存储感知到的外部信息及由思维产生的知识，同时能够利用己有的知识对信息进行分析、计算、比较、判断、联想和决策属于智能的（）能力。",
      options: ["感知", "记忆和思维", "学习和自适应", "行为决策"],
      correctIndices: [1],
      explanation: "智能一般具有记忆和思维能力，即能够存储感知到的外部信息及由思维产生的知识，同时能够利用已有的知识对信息进行分析、计算、比较、判断、联想、决策。"
    },
    {
      id: "q-sys-3",
      number: 3,
      type: QuestionType.Single,
      text: "某快消品连锁企业委托科技公司 a 开发部署电子商务平台，a 公司根据系统设计任务书所确定的范围，确定系统的基本目标和逻辑功能要求，提出新系统的逻辑模型，这属于信息系统生命周期中（）阶段的工作。",
      options: ["系统规划", "系统分析", "系统设计", "系统实施"],
      correctIndices: [1],
      explanation: "系统分析阶段的任务是根据系统设计任务书所确定的范围，对现行系统进行详细调查，描述现行系统的业务流程，指出现行系统的局限性和不足之处，确定新系统的基本目标和逻辑功能要求，即提出新系统的逻辑模型。"
    },
    {
      id: "q-sys-4",
      number: 4,
      type: QuestionType.Single,
      text: "区块链 2.0 技术架构自上而下分为数据层、网络层、共识层、激励层、智能合约层，数据传播机制、数据验证机制属于其中的（）。",
      options: ["数据层", "网络层", "共识层", "激励层"],
      correctIndices: [1],
      explanation: "区块链系统由数据层、网络层、共识层、激励层、合约层和应用层组成。网络层包括分布式组网机制、数据传播机制和数据验证机制等。"
    },
    {
      id: "q-sys-5",
      number: 5,
      type: QuestionType.Single,
      text: "区块链是（）、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。",
      options: ["数据仓库", "中心化数据库", "非链式数据结构", "分布式数据存储"],
      correctIndices: [3],
      explanation: "区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。"
    },
    {
      id: "q-sys-6",
      number: 6,
      type: QuestionType.Single,
      text: "某云计算服务商向电信运营商提供计算能力、存储空间及相应的运营管理服务。按照云计算服务提供的资源层次，该服务类型属于（）。",
      options: ["IaaS", "CaaS", "PaaS", "SaaS"],
      correctIndices: [0],
      explanation: "IaaS（基础设施即服务），向用户提供计算机能力、存储空间等基础设施方面的服务。"
    },
    {
      id: "q-sys-7",
      number: 7,
      type: QuestionType.Single,
      text: "老于是某银行的系统架构师，他为银行投资管理系统设计的软件架构包括进程通信和事件驱动的系统，该软件架构风格属于（）。",
      options: ["数据流风格", "独立构件风格", "仓库风格", "虚似机风格"],
      correctIndices: [1],
      explanation: "独立构件风格包括进程通信和事件驱动的系统。"
    },
    {
      id: "q-sys-8",
      number: 8,
      type: QuestionType.Single,
      text: "办公软件开发公司 A 非常重视软件过程管理，按照 CMMI（能力成熟度模型）逐步进行过程改进，刚刚实现了组织级过程性能、定量项目管理，按照 CMMI（能力成熟度模型），A 公司达到了（）级别。",
      options: ["CMMI2", "CMMI3", "CMMI4", "CMMI5"],
      correctIndices: [2],
      explanation: "CMMI4级（已量化管理级）：组织与项目建立了质量与过程性能的量化目标并将其用作管理项目的准则。"
    },
    {
      id: "q-sys-9",
      number: 9,
      type: QuestionType.Single,
      text: "软件测试是发现软件错误（缺陷）的主要手段，软件测试方法可分为静态测试和动态测试，其中（）属于静态测试。",
      options: ["代码走查", "功能测试", "黑盒测试", "白盒测试"],
      correctIndices: [0],
      explanation: "静态测试包括对文档的静态测试和对代码的静态测试。对代码的静态测试一般采用桌前检查、代码走查和代码审查。"
    },
    {
      id: "q-sys-10",
      number: 10,
      type: QuestionType.Single,
      text: "结束软件测试工作时，应按照软件配置管理的要求，将（）纳入配置管理。",
      options: ["全部测试工具", "被测试软件", "测试支持软件", "以上者是"],
      correctIndices: [3],
      explanation: "结束软件测试工作时，应达到准出条件，其中一条是：全部测试工具、被测软件、测试支持软件和评审结果已纳入配置管理。"
    },
    {
      id: "q-sys-11",
      number: 11,
      type: QuestionType.Single,
      text: "企业应用集成技术（EAI）可以消除信息孤岛，将多个企业信息系统连接起来，实现无缝集成。EAI 包括多个层次和方面。其中在业务逻辑层上对应用系统进行黑盒集成的，属于（）。",
      options: ["数据集成", "控制集成", "表示集成", "业务流程集成"],
      correctIndices: [1],
      explanation: "控制集成也称为功能集成或应用集成，是在业务逻辑层上对应用系统进行集成的。控制集成是黑盒集成。"
    },
    {
      id: "q-sys-12",
      number: 12,
      type: QuestionType.Single,
      text: "根据 GB/T 11457-2006《软件工程术语》由某人、某小组或借助某种工具对源代码进行的独立的审查，以验证其是否符合软件设计文件和程序设计标准，称为（）。",
      options: ["桌面检查", "代码评审", "代码走查", "代码审计"],
      correctIndices: [3],
      explanation: "代码审计：由某人、某小组或借助某种工具对源代码进行的独立的审查，以验证其是否符合软件设计文件和程序设计标准。"
    },
    {
      id: "q-sys-13",
      number: 13,
      type: QuestionType.Single,
      text: "根据 GB/T 16260.1-2006《软件工程产品质量》，软件产品使用质量特性中的可靠性，是指与软件在规定的一段时间内和规定的条件下维持其性能水平的一组软件属性。（）不属于可靠性质量特性。",
      options: ["安全性", "成熟性", "容错性", "可恢复性"],
      correctIndices: [0],
      explanation: "可靠性包括：成熟性、容错性、可恢复性。安全性属于功能性。"
    },
    {
      id: "q-sys-14",
      number: 14,
      type: QuestionType.Single,
      text: "根据 GB/T 14394-2008《计算机软件可靠性和可维护性管理》，软件开发各阶段都要进行评审，与软件可靠性和可维护性有关的评审要求中，（）不属于需求评审的内容。",
      options: ["测试用例", "可靠性和可维护性目标", "实施计划", "验证方法"],
      correctIndices: [0],
      explanation: "需求评审内容包括：可靠性和可维护性目标；实施计划；功能降级使用方式下软件产品最低功能保证的规格说明；选用和制定的规范和准则；验证方法。测试用例属于测试阶段。"
    },
    {
      id: "q-sys-15",
      number: 15,
      type: QuestionType.Single,
      text: "信息系统设备安全是信息系统安全的重要内容，其中设备的（）是指设备在一定时间内不出故障的概率。",
      options: ["完整性", "稳定性", "可靠性", "保密性"],
      correctIndices: [1],
      explanation: "设备的稳定性：设备在一定时间内不出故障的概率。"
    },
    {
      id: "q-sys-16",
      number: 16,
      type: QuestionType.Single,
      text: "信息系统安全技术中，关于信息认证、加密、数字签名的描述，正确的是（）。",
      options: ["数字签名具备发送方不能抵赖、接收方不能伪造的能力", "数字签名允许收发双方互相验证其真实性，不准许第三方验证", "认证允许收发双方和第三方验证", "认证中用来鉴别对象真实性的数据是公开的"],
      correctIndices: [0],
      explanation: "数字签名具有发送方不能抵赖、接收方不能伪造和具有在公证人前解决纠纷的能力。"
    },
    {
      id: "q-sys-17",
      number: 17,
      type: QuestionType.Single,
      text: "在网络安全防护中，（ ）注重对网络安全状况的监管，通过监视网络或系统资源，寻找违反安全策略的行为或攻击迹象，并发出报警。",
      options: ["防火墙", "蜜罐技术", "入侵检测系统", "入侵防护系统"],
      correctIndices: [2],
      explanation: "入侵检测系统（IDS）注重的是网络安全状况的监管，通过监视网络或系统资源，寻找违反安全策略的行为或攻击迹象，并发出报警。"
    },
    {
      id: "q-sys-18",
      number: 18,
      type: QuestionType.Single,
      text: "（）不属于网页防篡改技术。",
      options: ["时间轮询", "事件触发", "文件过滤驱动", "反间谍软件"],
      correctIndices: [3],
      explanation: "网页防篡改技术包括时间轮询技术、核心内嵌技术、事件触发技术、文件过滤驱动技术等。"
    },
    {
      id: "q-sys-19",
      number: 19,
      type: QuestionType.Single,
      text: "TCP/IP 是 Internet 的核心协议，应用程序通过用应用层协议利用网络完成数据交互的任务，其中，（）是用来在客户机与服务器之间进行简单文件的传输的协议，提供不复杂，开销不大的文件传输服务。",
      options: ["FTP", "TFTP", "HTTP", "SMTP"],
      correctIndices: [1],
      explanation: "TFTP（Trivial File Transfer Protocol，简单文件传输协议）是用来在客户机与服务器之间进行简单文件传输的协议。"
    },
    {
      id: "q-sys-20",
      number: 20,
      type: QuestionType.Single,
      text: "在开放系统互连参考模型（OSI）中，（）的主要功能是将网络地址翻译成对应的物理地址，并决定如何将数据从发送方经路由送达到接收方。",
      options: ["数据链路层", "物理层", "网络层", "传输层"],
      correctIndices: [2],
      explanation: "网络层的主要功能是将网络地址翻译成对应的物理地址，并决定如何将数据从发送方经路由送达到接收方。"
    },
    {
      id: "q-sys-21",
      number: 21,
      type: QuestionType.Single,
      text: "IEEE 802 规范定义了网卡如何访问传输介质，以及如何在传输介质上传输数据的方法。其中，（）是重要的局域网协议。",
      options: ["IEEE 802.1", "IEEE 802.3", "IEEE 802.6", "IEEE 802.11"],
      correctIndices: [1],
      explanation: "IEEE 802.3 是以太网协议，是重要的局域网协议。"
    },
    {
      id: "q-sys-22",
      number: 22,
      type: QuestionType.Single,
      text: "大型信息系统具备的特点包括（）。\n①规模宠大，包含的独立运行和管理的子系统多\n②跨地域性，系统分布广阔，部署不集中\n③提供的业务种类繁多，业务的处理逻辑复杂\n④采用虚似化技术管理软硬件环境\n⑤采用国际领先的软硬件设备\n⑥处理的业务和信息量大，存储的数据复杂、内容多且形式多样",
      options: ["①②③⑥", "②③⑤⑥", "②③④⑤", "①②③④⑤⑥"],
      correctIndices: [0],
      explanation: "大型信息系统特点：规模庞大；跨地域性；网络结构复杂；业务种类多；数据量大；用户多。"
    },
    {
      id: "q-sys-23",
      number: 23,
      type: QuestionType.Single,
      text: "企业系统规划（Business System Planning，BSP）方法包含一定的步骤，完成准备工作后，需要进行的四个步骤依次是：（）。",
      options: ["定义企业过程，识别定义数据类，确定管理部门对系统要求，分析现有系统", "识别定义数据类，定义企业过程，确定管理部门对系统要求，分析现有系统", "定义企业过程，识别定义数据类，分析现有系统，确定管理部门对系统要求", "识别定义数据类，定义企业过程，分析现有系统，确定管理部门对系统要求"],
      correctIndices: [2],
      explanation: "BSP方法步骤：定义企业过程 -> 识别定义数据类 -> 分析现有系统 -> 确定管理部门对系统要求。"
    },
    {
      id: "q-sys-24",
      number: 24,
      type: QuestionType.Single,
      text: "在信息系统的规划工具中，下表是（）。\n(表略：人员与过程的关系矩阵)",
      options: ["过程/组织矩阵", "资源/数据矩阵", "优先矩阵", "过程/数据矩阵"],
      correctIndices: [0],
      explanation: "为把企业组织结构与企业过程联系起来，说明每个过程与组织的联系，指出过程决策人，可以采用建立过程/组织（Process/Organization，P/O）矩阵的方法。"
    },
    {
      id: "q-sys-25",
      number: 25,
      type: QuestionType.Single,
      text: "在面向对象的基本概念中，（）体现对象间的交互，通过它向目标对象发送操作请求。",
      options: ["继承", "多态", "接口", "消息"],
      correctIndices: [3],
      explanation: "对象通过相互间传递消息来相互作用和通信。"
    },
    {
      id: "q-sys-26",
      number: 26,
      type: QuestionType.Single,
      text: "关于 UML 的描述，不正确的是：（）。",
      options: ["UML 是一种可视化编程语言", "UML 适用于各种软件开发方法", "UML 用于对软件进行可视化描述", "UML 适用于软件生命周期的各个阶段"],
      correctIndices: [0],
      explanation: "UML（统一建模语言）是一种可视化建模语言，而非编程语言。"
    },
    {
      id: "q-sys-27",
      number: 27,
      type: QuestionType.Single,
      text: "UML 图不包括（）。",
      options: ["用例图", "序列图", "组件图", "继承图"],
      correctIndices: [3],
      explanation: "UML 2.0 包括14种图，如类图、用例图、序列图等，没有“继承图”这一说法。"
    },
    {
      id: "q-sys-28",
      number: 28,
      type: QuestionType.Single,
      text: "在合同履行过程中，当事人就有关合同内容约定不明确时，不正确的是:（ ）",
      options: ["价款或者报酬不明确的，按照订立合同履行地的市场价格履行", "履行地点不明确，给付货币的，在支付货币一方所在地履行", "履行方式不明确的，按照有利于实现合同目的的方式履行", "履行费用的负担不明确的，由履行义务方负担"],
      correctIndices: [1],
      explanation: "履行地点不明确，给付货币的，在接受货币一方所在地履行；交付不动产的，在不动产所在地履行。"
    },
    {
      id: "q-sys-29",
      number: 29,
      type: QuestionType.Single,
      text: "关于招投标的描述，不正确的是: ( ) 。",
      options: ["招标人采用邀请招标方式的，应当向三个以上具备承担项目的能力、资信良好的特定法人或者其他组织发出投标邀请书", "招标人对已发出的招标文件进行必要的澄清或者修改的，应当在招标文件要求提交投标文件截止时间至少十五日前通知", "投标人在招标文件要求提交投标文件的截止时间前，可以补充、修改或者撤回已提交的投标文件", "依法必须进行招标的项目，其评标委员会由招标人的代表和有关技术、经济等方面的专家组，成员人数为五人以上单数，其中技术、经济等方面的专家不得少于成员总数的一半"],
      correctIndices: [3],
      explanation: "评标委员会中技术、经济等方面的专家不得少于成员总数的三分之二。"
    },
    {
      id: "q-sys-30",
      number: 30,
      type: QuestionType.Single,
      text: "信息系统可行性研究包括很多方面的内容，（）中经常会用到敏感性分析。",
      options: ["技术可行性分析", "经济可行性分析", "运行环境可行性分析", "社会可行性分析"],
      correctIndices: [1],
      explanation: "经济可行性分析主要是对整个项目的投资及所产生的经济效益进行分析，包括敏感性分析。"
    },
    {
      id: "q-sys-31",
      number: 31,
      type: QuestionType.Single,
      text: "关于项目评估和项目论证的描述。不正确的是：（）。",
      options: ["项目论证应该围绕市场需求、开发技术、财务经济三个方面展开调查和分析", "项目论证一般可分为机会研究、初步可行性研究和详细可行性研究三个阶段", "项目评估由项目建设单位实施，目的是审查项目可行性研究的可靠性、真实性、和客观性", "项目评估的依据包括项目建议书及其批准文件、项目可行性研究报告、报送单位的申请报告及主管部门的初审意见等一系列文件"],
      correctIndices: [2],
      explanation: "项目评估指在项目可行性研究的基础上，由第三方（国家、银行或有关机构）进行评估，而不是由建设单位自己实施。"
    },
    {
      id: "q-sys-32",
      number: 32,
      type: QuestionType.Single,
      text: "（）不是 V 模型的特点。",
      options: ["体现了开发和测试同等重要的思想", "测试是开发生命周期中的阶段", "针对每个开发阶段都有一个测试级别与之相对应", "适用于用户需求不明确或动态变化的情形"],
      correctIndices: [3],
      explanation: "V 模型适用于需求明确和需求变更不频繁的情形。"
    },
    {
      id: "q-sys-33",
      number: 33,
      type: QuestionType.Single,
      text: "识别项目干系人是（）的子过程。",
      options: ["启动过程组", "计划过程组", "执行过程组", "监督与控制过程组"],
      correctIndices: [0],
      explanation: "启动过程组包括“制定项目章程”和“识别项目干系人”两个过程。"
    },
    {
      id: "q-sys-34",
      number: 34,
      type: QuestionType.Single,
      text: "项目管理计划的内容不包括（）。",
      options: ["沟通管理计划", "选择的生命周期模型", "资源日历", "成本基准"],
      correctIndices: [2],
      explanation: "项目管理计划内容包括里程碑清单、进度基准、成本基准、风险登记册等。资源日历通常是项目文件的内容，虽然关联紧密，但在选项中C最不属于管理计划本身的内容（或依据不同教材版本），参考答案选C。"
    },
    {
      id: "q-sys-35",
      number: 35,
      type: QuestionType.Single,
      text: "关于项目目标的描述，不正确的是：（）。",
      options: ["项目可以有一个目标，也可以有多个目标", "项目目标可以量化，也可以不量化", "项目的成果目标与约束目标可能会冲突", "项目目标应该是具体的、可实现的"],
      correctIndices: [1],
      explanation: "项目目标要量化。可以量化的目标，例如时间目标和成本目标。"
    },
    {
      id: "q-sys-36",
      number: 36,
      type: QuestionType.Single,
      text: "关于变更申请的描述，不正确的是: （）",
      options: ["实施整体变更控制过程贯穿项目始终", "变更请求可能包括纠正措施、预防措施和缺陷补救", "变更请求必须由 CCB 来负责审查、评价、批准或否决", "实施整体变更过程中涉及到的配置管理活动包括配置识别、配置状态记录、配置核实与审计"],
      correctIndices: [2],
      explanation: "每一个变更申请必须由项目管理团队内部的有权者，或者代表某一外部组织的发起人、赞助人或顾客认可或否决。虽然CCB负责由于基准的变更，但并非“必须”所有变更都由CCB，如具体合同变更需顾客批准。"
    },
    {
      id: "q-sys-37",
      number: 37,
      type: QuestionType.Single,
      text: "某项目包含 a、b、c、d、e、f、g 七个活动，各活动的历时估算和活动间的逻辑关系如下表所示。活动 c 的总浮动时间是（）天。\n活动: A(2), B(4, pre:A), C(5, pre:A), D(6, pre:A), E(4, pre:B), F(4, pre:C,D), G(3, pre:E,F)",
      options: ["0", "1", "2", "3"],
      correctIndices: [1],
      explanation: "通过绘制网络图计算，关键路径为 A-D-F-G (2+6+4+3=15)。活动C所在路径为A-C-F-G，长度为2+5+4+3=14。C的总浮动时间 = 关键路径长度 - C所在路径长度 = 15 - 14 = 1天。"
    },
    {
      id: "q-sys-38",
      number: 38,
      type: QuestionType.Single,
      text: "接上题，该项目工期是（）天。",
      options: ["13", "14", "15", "16"],
      correctIndices: [2],
      explanation: "关键路径 A-D-F-G 的总时长为 2+6+4+3=15 天。"
    },
    {
      id: "q-sys-39",
      number: 39,
      type: QuestionType.Single,
      text: "关于 WBS 的描述，不正确的是：（）。",
      options: ["WBS 必须且只能包括 100%的工作", "WBS 的元素必须指定一个或多个负责人", "WBS 应该由全体项目成员、用户和项目干系人一致确认", "分包出去的工作也应纳入 WBS 中"],
      correctIndices: [1],
      explanation: "WBS 中的元素必须有人负责，而且只由一个人负责。"
    },
    {
      id: "q-sys-40",
      number: 40,
      type: QuestionType.Single,
      text: "（）属于控制范围的活动。",
      options: ["与客户仔细讨论项目范围说明书，并请客户签字", "当客户提出新的需求时，说服用户放弃新的需求", "确认项目范围是否覆盖了需要完成的产品或服务进行的所有活动", "确认每项工作是否有明确的质量标准"],
      correctIndices: [1],
      explanation: "A是定义范围/确认范围相关，C是确认范围，D是质量规划。B涉及到范围变更控制，即控制范围过程。"
    },
    {
      id: "q-sys-41",
      number: 41,
      type: QuestionType.Single,
      text: "从参与者的观点来看，（）沟通方式的参与程度最高。",
      options: ["叙述", "推销", "征询", "讨论"],
      correctIndices: [3],
      explanation: "讨论（Discussion）通常意味着双向或多向的深入交流，参与程度最高。"
    },
    {
      id: "q-sys-42",
      number: 42,
      type: QuestionType.Single,
      text: "在项目沟通过程中，会使用各种沟通方法。电子邮件沟通属于（）。",
      options: ["实时沟通", "推式沟通", "拉式沟通", "情景式沟通"],
      correctIndices: [1],
      explanation: "推式沟通包括信件、电子邮件、报告等。"
    },
    {
      id: "q-sys-43",
      number: 43,
      type: QuestionType.Single,
      text: "在了解和管理干系人期望时，可以采用多种分类方法对干系人进行分类管理。其中（）方法是根据干系人主动参与项目的程度改变项目计划或执行的能力进行分组。",
      options: ["权力/利益方格", "权力/影响方格", "影响/作用方格", "凸显模型"],
      correctIndices: [2],
      explanation: "影响/作用方格：干系人主动参与（影响）项目的程度及改变项目计划或者执行的能力进行分类。"
    },
    {
      id: "q-sys-44",
      number: 44,
      type: QuestionType.Single,
      text: "A 公司承接了某银行网上银行系统的建设项目。针对该项目，不正确的是：（）。",
      options: ["该项目的干系人包括客户、公司高层领导、项目成员及网上银行用户", "干系人管理工作应由该项目成员分工负责", "干系人管理有助于为项目赢得更多的资源", "通常来说，干系人对项目的影响能力在项目启动阶段最大"],
      correctIndices: [1],
      explanation: "干系人管理应该由项目经理负责。"
    },
    {
      id: "q-sys-45",
      number: 45,
      type: QuestionType.Single,
      text: "人们对风险事件都有一定的承受能力，当（）时，人们愿意承担的风险越大。",
      options: ["项目活动投入的越多", "项目的收益越大", "个人、组织拥有的资源越少", "组织中高级别管理人员相对较少"],
      correctIndices: [1],
      explanation: "收益越大，人们愿意承担的风险也越大（风险收益权衡）。"
    },
    {
      id: "q-sys-46",
      number: 46,
      type: QuestionType.Single,
      text: "（）不属于风险识别的依据。",
      options: ["成本管理计划", "范围基准", "采购文件", "风险类别"],
      correctIndices: [3],
      explanation: "风险类别（风险分解结构RBS中的内容）通常是风险管理计划的内容，用于指导风险识别，而不是风险识别的直接输入依据（如范围基准、成本计划等）。"
    },
    {
      id: "q-sys-47",
      number: 47,
      type: QuestionType.Single,
      text: "通过概率和影响级别定义以及专家访谈，有助于纠正该过程所使用的数据中的偏差属于（）。",
      options: ["定性风险分析", "识别风险", "定量风险分析", "风险监控"],
      correctIndices: [0],
      explanation: "定性风险分析通过概率和影响级别定义以及专家访谈，有助于纠正该过程所使用的数据中的偏差。"
    },
    {
      id: "q-sys-48",
      number: 48,
      type: QuestionType.Single,
      text: "关于项目人力资源的描述，正确的是（）。",
      options: ["新团员加入到项目团中，他们的经验水平将会降低项目风险", "项目人力资源管理包括规划人力资源管理、组建项目团队、建设项目团队三个过程", "项目经理对所有冲突要设法解决或减少，鼓励团队成员良性竞争", "项目团中项目经理的管理能力和领导能力二者缺一不可"],
      correctIndices: [3],
      explanation: "项目经理具有领导者和管理者的双重身份，管理能力和领导能力二者均不可或缺。"
    },
    {
      id: "q-sys-49",
      number: 49,
      type: QuestionType.Single,
      text: "建设项目团队过程所使用的技术不包括（）。",
      options: ["人际关系技能", "基本规则", "人事评测工具", "项目人员分派"],
      correctIndices: [3],
      explanation: "项目人员分派是组建项目团队的输出，而不是建设项目团队的工具。"
    },
    {
      id: "q-sys-50",
      number: 50,
      type: QuestionType.Single,
      text: "某项目团队每周组织羽毛球活动，根据马斯洛需求层次理论，该活动满足了项目成员（ ）的需求。",
      options: ["生理", "受尊重", "社会交往", "自我实现"],
      correctIndices: [2],
      explanation: "社会交往（归属与爱）的需求，包括对友谊、爱情以及隶属关系的需求。团队活动满足社交需求。"
    },
    {
      id: "q-sys-51",
      number: 51,
      type: QuestionType.Single,
      text: "某软件开发项目在测试时发现需求需要调整，涉及到需求规格说明书、概要设计、详细设计及代码等相关文档的变更，需要对（）进行变更控制。",
      options: ["知识库", "配置库", "产品库", "数据库"],
      correctIndices: [1],
      explanation: "基于配置库的变更控制可以解决多处变更连锁反应的问题。"
    },
    {
      id: "q-sys-52",
      number: 52,
      type: QuestionType.Single,
      text: "做好变更管理可以使项目的质量、进度、成本管理更加有效。关于变更工作程序的描述，不正确的是（）。\n①及时、正式的提出变更，且留下书面记录\n②变更初审的常见方式为变更申请文档的格式校验\n③变更方案论证首先是对变更请求是否可行实现进行论证\n④审查过程中，客户根据变更申请及评估方案，决定是否变更项目基准\n⑤发出变更通知并组织实施\n⑥变更实施的过程监控，配置管理员负责基准的监控\n⑦变更效果评估中的首要评估依据是项目的基准\n⑧基准调整后，需要判断项目是否已纳入正轨",
      options: ["②③⑤", "②④⑥", "①②③④", "⑤⑥⑦⑧"],
      correctIndices: [1],
      explanation: "④审查过程中，是CCB（或项目所有者）决定是否变更，不仅仅是客户。⑥项目经理负责基准的监控。"
    },
    {
      id: "q-sys-53",
      number: 53,
      type: QuestionType.Single,
      text: "有关战略合作管理的描述，不正确的是（）。",
      options: ["战略合作管理的管理模式是“以企业为中心”", "可以缩短供应商的供应周期，提高供应灵活性", "可以与供应商共享管理经验，推动企业整体管理水平的提高", "可以降低企业采购设备的库存水平，降低管理费用，加快资金周转"],
      correctIndices: [0],
      explanation: "必须摒弃“以企业为中心”的传统管理模式，代之以现代战略合作的管理模式（供应链管理）。"
    },
    {
      id: "q-sys-54",
      number: 54,
      type: QuestionType.Single,
      text: "关于合同管理的描述，不正确的是（）。\n①合同管理包括：合同签订管理、合同履行管理、合同变更管理、合同档案管理、合同违约索赔管理。\n②对于合同中需要变更、转让、解除等内容应有详细说明。\n③如果合同中有附件，对于附件的内容也应精心准备，当主合同与附件产生矛盾时，以附件为主。\n④为了使签约各方对合同有一致的理解，合同一律使用行业标准合同。\n⑤签订合同前应了解相关环境，做出正确的风险分析判断。",
      options: ["①②", "③④", "②⑤", "①⑤"],
      correctIndices: [1],
      explanation: "③当主合同与附件矛盾时，通常以主合同为准（除非约定附件优先）。④合同不一定“一律”使用行业标准合同，可协商。"
    },
    {
      id: "q-sys-55",
      number: 55,
      type: QuestionType.Single,
      text: "关于组织战略的描述，不正确的是（）。",
      options: ["战略目标根据特定时期的战略形式和组织的利益需要确定", "战略方针具有较强的针对性", "战略实施能力是组织自身拥有的，无法通过外部获得", "战略措施是组织决策机构根据战略实施的需要安排的"],
      correctIndices: [2],
      explanation: "战略实施能力这种物质基础既可以是组织自身拥有的，也可以是被组织通过协商获得的资源（外部获得）。"
    },
    {
      id: "q-sys-56",
      number: 56,
      type: QuestionType.Single,
      text: "（）是为了从流程角度衡量流程的“瓶颈”活动，通过评价相关活动的三个参数：r（价值系数）、f（贡献）、c（成本），衡量活动的运行效果。",
      options: ["供应链分析", "增值性分析", "挣值分析", "净现值分析"],
      correctIndices: [1],
      explanation: "增值性分析利用模型的对象属性尤其是活动的价值系数分析流程的运营合理性和潜在问题，找出“瓶颈”活动。"
    },
    {
      id: "q-sys-57",
      number: 57,
      type: QuestionType.Single,
      text: "小李作为项目经理需要从以下四个项目方案中选择项目，已知项目周期均为 2 年且期初投资额都是 30,000 元，折现均为 10％。项目情况如下：\n方案A：第一年14,000，第二年19,000\n方案B：第一年23,000，第二年20,000\n方案C：第一年18,000，第二年24,000\n方案D：第一年21,000，第二年22,000\n则小李应该优先选择（）",
      options: ["方案 A", "方案 B", "方案 C", "方案 D"],
      correctIndices: [1],
      explanation: "考虑资金时间价值，越早回款越好。B方案第一年回款最多，且总额也较高，净现值最高。"
    },
    {
      id: "q-sys-58",
      number: 58,
      type: QuestionType.Single,
      text: "（）不属于制定预算过程的输出。",
      options: ["成本基准", "范围基准", "项目资金需求", "更新的活动成本估算"],
      correctIndices: [1],
      explanation: "范围基准是制定预算的输入，不是输出。"
    },
    {
      id: "q-sys-59",
      number: 59,
      type: QuestionType.Single,
      text: "某信息系统集成项目计划 6 周完成，项目经理就前 4 周的项目进展情况进行分析情况如下，项目的成本执行指数 CPI 为（）。\n前4周总PV=28500，总AC=28500（按表格累加前4周实际投入），总EV=各周计划*完成百分比累加。",
      options: ["0.83", "0.87", "0.88", "0.95"],
      correctIndices: [0],
      explanation: "AC = 1000+2500+10000+15000 = 28500。EV = 1000*1 + 3000*1 + 8000*1 + 13000*0.9 = 12000 + 11700 = 23700。CPI = EV/AC = 23700/28500 ≈ 0.83。"
    },
    {
      id: "q-sys-60",
      number: 60,
      type: QuestionType.Single,
      text: "（）是项目集的决策机构，负责为项目集的管理方式提供支持。",
      options: ["项目集指导委员会", "项目治理委员会", "项目集变更控制委员会", "项目管理办公室"],
      correctIndices: [0],
      explanation: "项目集指导委员会（项目集治理委员会）是项目集的决策机构。"
    },
    {
      id: "q-sys-61",
      number: 61,
      type: QuestionType.Single,
      text: "项目组合管理实施的主要过程不包括（）。",
      options: ["评估项目组合管理战略计划", "定义项目组合管理的愿景和计划", "实施项目组合管理过程", "改进项目组合管理过程"],
      correctIndices: [0],
      explanation: "过程包括：评估项目组合管理过程的当前状态；定义愿景和计划；实施；改进。"
    },
    {
      id: "q-sys-62",
      number: 62,
      type: QuestionType.Single,
      text: "（）按时间顺序统计被发现缺陷的数量分布。",
      options: ["缺陷分布密度", "缺陷修改质量", "缺陷趋势分析", "缺陷存活时间"],
      correctIndices: [2],
      explanation: "缺陷趋势分析：按时间顺序统计被发现缺陷的数量分布。"
    },
    {
      id: "q-sys-63",
      number: 63,
      type: QuestionType.Single,
      text: "规划质量管理的输入不包含（）。",
      options: ["质量测量指标", "项目管理计划", "需求文件", "风险登记册"],
      correctIndices: [0],
      explanation: "质量测量指标是规划质量管理的输出。"
    },
    {
      id: "q-sys-64",
      number: 64,
      type: QuestionType.Single,
      text: "（）是一种统计方法，用于识别哪些因素会对正在生产的产品或正在开发的流程的特定变量产生影响。",
      options: ["过程分析", "实施设计", "标杆对照", "质量审计"],
      correctIndices: [1],
      explanation: "实验设计（DOE）是一种统计方法，用于识别哪些因素会对正在生产的产品或正在开发的流程的特定变量产生影响。"
    },
    {
      id: "q-sys-65",
      number: 65,
      type: QuestionType.Single,
      text: "质量管理实施阶段的工具与技术不包括（）。",
      options: ["储备分析", "统计抽样", "过程决策程序图", "质量审计"],
      correctIndices: [0],
      explanation: "储备分析通常用于成本或风险管理，不是质量保证（实施阶段）的典型工具。"
    },
    {
      id: "q-sys-66",
      number: 66,
      type: QuestionType.Single,
      text: "某项工程的活动明细如下表...根据上表，在预算约束（63万元）下该工程最快能完成时间为（）周。",
      options: ["9", "8", "14", "12"],
      correctIndices: [0],
      explanation: "正常进度关键路径 A-B-D = 3+8+5=16周 X(错误)。A-B无，A-C-D。网络结构需自行推导。若不赶工，路径时间为多少？题目复杂，根据真题解析，参考答案为A。"
    },
    {
      id: "q-sys-67",
      number: 67,
      type: QuestionType.Single,
      text: "接上题，所需项目总费用为（）万元。",
      options: ["60", "64", "56", "45"],
      correctIndices: [0],
      explanation: "参考答案为A。"
    },
    {
      id: "q-sys-68",
      number: 68,
      type: QuestionType.Single,
      text: "某项目由并行的 3 个活动甲、乙和丙组成...在此情况下，项目最短工期为（ ）天。",
      options: ["6", "7", "8", "9"],
      correctIndices: [1],
      explanation: "参考答案为B。"
    },
    {
      id: "q-sys-69",
      number: 69,
      type: QuestionType.Single,
      text: "接上题，此时人员最少配置为（ ）。",
      options: ["6", "9", "10", "13"],
      correctIndices: [2],
      explanation: "参考答案为C。"
    },
    {
      id: "q-sys-70",
      number: 70,
      type: QuestionType.Single,
      text: "某拟建项目财务净现金流量如下表所示，该项目的静态投资回收期是（ ）年。",
      options: ["5.4", "5.6", "7.4", "7.6"],
      correctIndices: [2],
      explanation: "静态投资回收期计算，参考答案C。"
    },
    {
      id: "q-sys-71",
      number: 71,
      type: QuestionType.Single,
      text: "（）is the technology that appears to emulate human performance typicality by learning, coming to its own conclusions, appearing to understand complex content...",
      options: ["Cloud service", "Blockchain", "Internet of things", "Artificial intelligence"],
      correctIndices: [3],
      explanation: "Artificial Intelligence (人工智能) 模拟人类行为、学习和理解。"
    },
    {
      id: "q-sys-72",
      number: 72,
      type: QuestionType.Single,
      text: "（）is a decentralized, distributed and public digital ledger that is used to record transactions across many computers...",
      options: ["Cloud service", "Blockchain", "Internet of things", "Artificial intelligence"],
      correctIndices: [1],
      explanation: "Blockchain (区块链) 是去中心化、分布式的公共账本。"
    },
    {
      id: "q-sys-73",
      number: 73,
      type: QuestionType.Single,
      text: "（） includes the processes required to ensure that the project includes all the work required , and only the work required...",
      options: ["Create scope", "Project stake holder management", "Project scope management", "Project cost management"],
      correctIndices: [2],
      explanation: "Project Scope Management (项目范围管理) 确保项目包含且仅包含所需的工作。"
    },
    {
      id: "q-sys-74",
      number: 74,
      type: QuestionType.Single,
      text: "Estimate activity durations is the process of estimating the number of work periods... The tools and techniques is not including（）.",
      options: ["expert judgment", "analogous estimating", "requirements traceability matrix", "three-point estimating"],
      correctIndices: [2],
      explanation: "Requirements traceability matrix (需求跟踪矩阵) 是范围管理的工具，不是估算活动持续时间的工具。"
    },
    {
      id: "q-sys-75",
      number: 75,
      type: QuestionType.Single,
      text: "（）is the process of translating the quality management plan into executable quality activities that incorporate the organization's quality policies into the project.",
      options: ["Manage quality", "Quality audit", "Quality metrics", "Quality improvement"],
      correctIndices: [0],
      explanation: "Manage Quality (管理质量) 是将质量管理计划转化为可执行的质量活动的过程。"
    }
  ]
};