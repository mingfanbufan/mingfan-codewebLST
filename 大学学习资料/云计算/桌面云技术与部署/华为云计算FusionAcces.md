# 华为云计算-FusionAccess

> 本文作者：[明凡]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)


华为FusionAccess桌面云解决方案是基于华为云平台的一种虚拟桌面应用，通过在云平台上部署华为桌面云软件，使终端用户通过瘦客户端或者其他设备来访问跨平台的整个客户桌面和应用。

桌面云就是一个桌面池，这个池子中每一个桌面都有一个User来关联，信息靠HDC维护，写在DB中。

FusionAccess就是VDI（虚拟桌面基础设施）[Virtual](https://so.csdn.net/so/search?q=Virtual&spm=1001.2101.3001.7020) Desktop Infrastructure。FA是实现方式，VDI是一套解决方案。用虚拟桌面来替代物理PC。

物理PC：本地计算/处理，数据local

①数据分散②维护成本高

虚拟桌面：从人àPC变成人àTC/SC（弱终端），只做Access“IO”的接入。

①数据集中（集中解决方案）②缓解了部署难度



ITA：①运维（log、告警、统计）②运营：快速发放、桌面管理

  从管理员视角来部署。ITA必须与VRM对接（虚拟化环境（VM/模板（链接克隆、完整复制、全内存、快速封装））），再与AD对接（手工在AD中创建用户），ITA把用户与虚拟机加在一起成为桌面（分配模式：专有（单用户和静态多用户）（用于完整复制）和池模式（静态池和动态池）（用于链接克隆和完整复制））。

ITA 快速发放

①定义VM组（Template类型）选中某个模板、在VRM中选中集群、数据存储、规格（CPU、Mem、系统（数据存储、几块、……）、NIC）

②VM 规则（主机名）+域（vdesktop.huawei.com）“UserOU” user（手工） PC（自动）

## （一）FusionAccess桌面云解决方案介绍

### 1.桌面云概述

（1）信息化时代核心诉求

1. 信息经济时代，IT能力及信息资产将成为企业核心竞争力。

 （1）Gartner报告：所有的公司都将成为IT公司。

 （2）海星数据协同丰富的智能终端时代。

 （3）数据保护让公司和用户数据更安全。

2. 核心诉求：提升IT系统效率以促进业务发展，保障信息资产安全。

1. 新技术不断发展，云计算、大数据、移动化、社交IT、物联网等，人们的生活和办公习惯以及环境，也在发生在巨大的改变，变得：
   1. 离不开互联网、
   2. 移动性、随时随地在线
   3. 更加习惯从云端获取信息，甚至办公
   4. 企业利用大数据进行业务分析，帮助企业调整战略
   5. 更加习惯使用各种社交工具进行交流，而不再是传统的电话、固定的位置

（2）传统PC办公缺陷

1. 数据安全漏洞

（1）数据在终端本地存储。

（2）各种端口难以管控。

（3）使用者行为难以约束。

（4）电脑失窃导致数据丢失和信息泄露。

2. 后期运营维护开支巨大

（1）传统PC向员工发放消耗时间长。

（2）终端故障现场维护，时间长、效率低。

（3）软硬件多种多样，桌面标准化管理困难，不堪重负。

（4）传统PC磁盘易造成个人数据丢失，业务宕机，影响业务运行。

3. 固化不灵活，利用率低

（1）接入方式固定，影响办公效率。

（2）不利于业务信息的有效整合与协同。

（3）硬件标准化配置，无法灵活升级。

（4）硬件资源固化，空闲时无法复用，资源利用率低下。

1. 信息化发展到今天，PC成为每个企业必备的办公设备，然而随着PC的普及，使用过程中越来越多的问题和挑战开始暴露出来。
   1. 首先是信息安全的问题，由于所有的数据和信息都分散存储在PC本地硬盘中，使得数据丢失和信息泄露的途径非常多，我们付出大量成本来封堵信息泄露的途径，收效却非常有限。
   2. 其次随着PC数量的增加和各种业务应用的不断出现，PC的管理维护工作也逐渐不堪重负，管理人员的大量时间被用于解决各种PC故障，越来越多的企业将IT运维外包，无形中增加了成本。而且终端的故障时间长、PC发放和业务发放效率低，都影响业务的正常有效开展。
   3. 资源的固化导致了另外一种形式的浪费，PC每天只有约1/3的时间处于工作状态，另外2/3的时间处于关机或者空闲状态，这些空闲的资源无法被有效利用，另一方面，当业务变化需要更强的处理能力的时候，却受限于硬件限制无法做到及时的响应。基于PC的办公桌面对业务发展的制约逐渐凸显。

（3）桌面云优势

优点：节省空间，提升资源利用率，降低运营运维复杂性，数据集中存放（安全），运维成本大大减少

缺点：有延迟，播放的视频清晰度会变差。业务弱化、非智能；业务处理数据集中后移。所以分离用户机和虚拟机，两者以HDP会话通道联系。

1. 数据安全

（1）终端与数据隔离，防泄密

（2）高可靠性架构，防丢失

2. 运维效率

（1）桌面标准化

（2）桌面快速发放，集中运维

3. 灵活性

（1）资源按需调整

（2）移动办公

1. 数据上移，信息安全
   1. 传统桌面环境下，由于用户数据都保存在本地PC，内部泄密途径众多，且容易受到各种网络攻击，从而导致数据丢失。桌面云环境下，终端与信息分离，桌面和数据在后台集中存储和处理，无需担心企业的智力资产泄露。
2. 高效维护，自动管控
   1. 传统桌面系统故障率高，且每台PC维护流程需要2～4个小时。桌面云环境下， 强大的一键式维护工具让自助维护更加方便，每位IT人员可管理超过2000台虚拟桌面。自动监控资源负载情况，保证物理服务器负载均衡。
3. 应用上移，业务可靠
   1. 传统桌面环境下，所有的业务和应用都在本地PC上进行处理，稳定性仅99.5%，在桌面云中，所有的业务和应用都在数据中心进行处理，强大的机房保障系统能保持99.9%的业务稳定性，有效降低了办公环境的管理维护成本。
4. 无缝切换，移动办公
   1. 传统桌面环境下，用户只能通过单一的专用设备访问其个性化桌面，采用桌面云，用户都可以方便的通过桌面云接入个人电脑桌面。
5. 降温去噪，绿色办公
   1. 节能、无噪的TC部署，让办公室噪音从50分贝降低到10分贝。TC和液晶显示器的总功耗大约60W左右，相比传统PC机，能有效减少70%的电费，低能耗可以有效减少降温费用。
6. 资源弹性，复用共享
   1. 所有资源都集中在数据中心，可实现资源的集中管控，弹性调度资源利用率提高资源的集中共享，提高了资源利用率。传统PC的CPU平均利用率为5%～20%。桌面云环境下，云数据中心的CPU利用率可控制在60%左右，整体资源利用率提升。

4. 桌面转型

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311227016.png)


启动企业“云数据中心”建设

变“成本中心、服务中心”为“创新中心、盈利中心” 的ICT云化战略探路石

5. 价值优势

 （1）本地无数据，安全可控

 （2）移动办公，随时随地接入

 （3）简单运维 一人维护超过2000个桌面

 （4）故障快速恢复 减少业务中断时间

1. 高安全性
   1. 支持HDP华为自研桌面接入协议。 支持远程加密访问数据中心。 统一管理外接存储设备。 支持SSL数字证书认证机制。
2. 电信级可靠性
   1. 采用电信级服务器，全局虚拟机年度平均可用度达99.9%。

支持软件HA（High Availability System）。 支持数据存储多重备份。

1. 优异的用户体验
   1. 端到端网络QoS设计，消除网络时延影响。 采用智能调度算法，达到系统负载均衡。
2. 高效管理维护
   1. 支持Web模式远程维护管理工具。 支持全自动诊断恢复。 支持故障信息采集工具。 支持健康检查工具。 支持数据一致性审校。 支持“黑匣子”功能。
3. 多业务集成
   1. 支持集成传统语音、会议和视频业务。 支持集成传统Email业务。

（4）桌面云典型应用场景

1. 普通办公

2. 安全办公

3. 云工作站

4. 呼叫中心

5. 公用终端

6. 分支机构

7. DaaS

8. 移动办公

（5）桌面云应用场景

1）分支机构

1. 简介：企业中除了总部机构需要使用桌面云外，很多分支机构也需要使用桌面云，为了提高分支机构桌面云的用户体验，系统将分支机构桌面云部署在分支机构本地。

2. 特点：

 （1）降低网络使用成本

 （2）业务连续不中断

 （3）集中运维和管理

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311230088.png)


1. 分支机构业务资源部署在本地，虚拟机远程桌面流量也被限制在本地，因此分支机构到总部之间的网络仅用于传输管理数据，对网络带宽要求较低（带宽≥2M，时延<50ms）。而传统的集中部署桌面云的方式，对远程接入桌面云的网络带宽和延时要求都比较高，如果有播放音频、视频的需求，则要求更高。部署分支机构后不但节省了远程专线网络的成本，而且保障了流畅的虚拟机用户体验。
2. 分支机构本地也部署了一套桌面管理软件，如果总部数据中心故障或与分支机构的网络中断，分支机构本地的用户仍然可以访问本地虚拟桌面。广域网连接中断不影响已登录的虚拟桌面正常运行，确保分支机构业务连续不中断。
3. 在总部部署一套集中运维管理系统，集中运维和管理总部和各分支机构的桌面云业务。

2）办公

1. 简介：企业使用桌面云进行正常的办公活动（如处理邮件、编辑文档等），同时提供多种安全方案，保证办公环境的信息安全

2. 特点：

 （1）减少投资，平滑过渡

 （2）可靠的信息安全机制

 （3）部署简单灵活

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311345395.png)


1. 支持与企业已有的IT系统对接，充分利用已有的IT应用。比如利用已有的AD系统进行桌面云用户鉴权；在桌面云上使用已有的IT工作流；通过DHCP给虚拟桌面分配IP地址；通过企业的DNS来进行桌面云的域名解析等。
2. 桌面云提供多种认证鉴权与管理机制，保证办公环境的信息安全。
   1. 桌面云的用户需要经过企业的AD进行认证才能使用企业的虚拟桌面。
   2. 分区域隔离（即红黄绿区），红区为信息资产安全控制最严格区域，传出的数据受到严格控制。黄区对应信息资产控制中等区域，传出的数据有限受控。绿区对应信息资产控制级别较低区域，可接入移动用户，且可在企业外部接入企业应用平台。
3. 安全分区级别默认为三级控制，满足大多数企业的安全性管理要求，部署的规划设计要求简单，适应性强。

### 2.华为桌面云解决方案

（1）桌面云架构VDI与IDV

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311346196.png)
 

​        云管端

VDI：面向用户的一端叫弱终端（TC），它不进行处理，只把IO输入输出，拦截下来通过管道进出。所以小盒子、瘦客户端（面向用户的）处理能力极弱。VRM通过模板（统一镜像）发放桌面在云上，TC远程访问桌面。更安全

IDV：它是提高终端的处理能力。智能终端（虚拟机）是VRM通过模板（统一镜像）发放的。

1. 技术比较

（1）和传统的PC+管理软件相比，IDV只做了小步改良，一般包含镜像服务器+管理软件+本地虚拟桌面终端（胖终端）。而VDI是彻底的技术革新，固定办公采用瘦终端+云端虚拟桌面的架构，也可扩展到任意终端，本地无数据，彻底解决了传统方案管理维护成本高，效率低，不安全等问题。

（2）IDV方案，引入本地虚拟桌面，增加了终端的复杂度，使其管理和维护难度和传统PC或者VDI相比都大大提高，在管理大规模终端时，还需要引入复杂的服务端来集中管理终端镜像，并同步各终端上分布的数据，所以其为“伪简化管理”，而VDI不存在这些问题。

（3）在特定个别场景下，IDV确实可以离线工作，但是随着网络的普及和各类应用的联网，一方面需要离线还能够工作的业务越来越少，另一方面，网络基础设施的持续投入，断网将成为过去时。

2. 行业趋势

（1）从方案的主推厂商看， 业界华为、思杰、Vmware（IDC国内桌面云市场份额排名前三）都主推VDI，目前推IDV架构的只有锐捷、噢易等少数国内厂商。

（2）当前IT变革的一个主要方向就是“云化”，VDI是真正和“云”结合的方案，符合时代潮流，而IDV则相反，只是一个伪云的集中管理方案。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311346579.png)


（2）华为桌面云解决方案逻辑架构

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311347194.png)



1. FusionAccess桌面虚拟化以服务器虚拟化为基础，允许多个用户桌面以虚拟机的形式独立运行，同时共享CPU、内存、网络连接和存储器等底层物理硬件资源。这种架构将虚机彼此隔离开来，同时可以实现精确的资源分配，并能保护用户免受由其他用户活动所造成的应用程序崩溃和操作系统故障的影响。
2. FusionAccess采用业界领先的高清保真HDP桌面协议，并可将授权用户安全连接至集中式虚拟桌面。它与 FusionSphere协同工作，可提供一个完整的端到端桌面虚拟化解决方案，此解决方案不仅能增强控制能力和可管理性，还可以提供与PC一致的桌面体验，FusionAccess能简化虚拟桌面的管理、调配和部署。用户能够通过FusionAccess安全而方便地访问虚拟桌面，升级和修补工作都从单个控制台集中进行，因此可以有效地管理数百甚至数千个桌面，从而节约时间和资源。数据、信息和知识财产将保留在数据中心内，而且永远不外流。
3. 配备FusionAccess桌面虚拟化方案具备下列优势：
   1. 集控制能力和可管理性于一身：由于桌面在数据中心运行，因此管理员可以更轻松地对其进行部署、管理和维护。
   2. 与PC一致的体验：用户可以灵活访问与普通 PC 桌面功能相同的个性化虚拟桌面。
   3. 降低总体拥有成本 (TCO)：桌面虚拟化可以减低其管理和资源成本。
   4. FusionAccess支持GPU直通、GPU硬件虚拟化，使用户远程使用图形桌面成为可能，降低了图形桌面的TCO。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311347327.png)


1. FusionAccess:是华为公司自研的桌面云接入管理系统，内部使用了Huawei公司自研HDP桌面控制协议，实现虚拟桌面的业务管理、权限控制等。
2. HDP Agent，Huawei桌面协议代理软件，将虚拟机的桌面显示信息以HDP协议传送到客户端，并接受客户端的键盘、鼠标、外设信息，是FusionAccess系统的一部分。
3. FusionSphere:是华为公司研发的云操作系统，实现物理资源的虚拟化，为桌面云接入管理系统提供虚拟资源。
4. FusionAccess管理Portal: 是华为公司研发的统一管理系统，实现FusionAccess桌面云业务管理，并支持嵌入到FusionSphere虚拟平台管理FusionManager中。

（3）FusionSphere云平台架构

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311348027.png)

 

1. 华为云平台FusionSphere主要有虚拟化基础引擎FusionCompute、云管理FusionManager两个节点组成。一套云平台部署一对FusionManager主备节点，FusionManager通过自动发现功能发现其管辖下的物理设备资源（包括机框、服务器、刀片、存储设备、交换机）以及他们的组网关系；提供虚拟资源与物理资源管理功能（统一拓扑、统一告警、统一监控、容量管理、用量计费、性能报表、关联分析，生命周期），并且对外提供统一的管理Portal。FusionManager还包括统一硬件管理（UHM：Unified Hardware Management）功能，提供对硬件自动发现，硬件自动配置、统一监控（带内和带外）、硬件统一告警、硬件拓扑、异构硬件支持。
2. FusionCompute提供基础计算、存储、网络的虚拟化功能，并向上对FusionManager提供管理接口。每套FusionCompute主要由一对主备管理节点VRM组成。一对VRM对应一个物理集群。一个物理集群中可以把多台服务器划分成一个资源集群（又叫HA资源池）。计算资源池不包括网络资源与存储资源。一个物理集群中可以包含多个资源集群。
3. 多个物理集群（此时对应多对VRM）可以级联，由FusionManager统一管理。本项目采用华为FusionSphere虚拟化计算技术作为基础，使整个系统具有以下优势：
   1. 通过云平台HA、热迁移功能，能够有效减少设备故障时间，确保核心业务的连续性，避免传统IT，单点故障导致的业务不可用。
   2. 易实现物理设备、虚拟设备、应用系统的集中监控、管理维护自动化与动态化。
   3. 便于业务的快速发放, 缩短业务上线周期，高度灵活性与可扩充性、提高管理维护效率。

### 3.HDP桌面协议介绍

（1）华为桌面协议

1. HDP（Huawei Desktop Protocol）是华为自研的新一代云接入桌面协议，相对比于传统桌面协议，它具备以下特点：

（1）最大支持64虚拟通道，每个虚拟通道可承载不同的上层应用协议。

（2）可根据不同的应用类型采用不同的压缩算法，灵活使用服务器渲染及本地加速渲染

（3）视频播放更清晰流畅

（4）无损压缩算法

（5）还原声音细节

（6）丰富协议管理策略

1. 通过虚拟通道既可以保证每个通道的通讯安全，也可以通过每个通道的优先级QoS（Quality of Service，服务质量）保证用户的基础体验（比如定义键盘鼠标的虚拟通道为最高优先级）。
2. 利用芯片硬件接口进行视频解码加速，使视频播放更清晰流畅，最大支持4K的视频播放。
3. 通过对非自然图像的智能识别而采用无损的压缩算法、对重复图像免传输等技术，HDP在显示“文字、图标、OA常用办公的界面”等非自然图像的PSNR指标达到50000dB以上，SSIM指标达到0.999955，接近无损的表现。
4. 通过对语音场景自动识别、嘈杂音的自动降噪、TC端语音透传等技术，HDP能够提供更加清晰实时的声音，准确还原声音细节，PESQ超过3.4。
5. 丰富的协议管理策略，可根据单个用户，用户组等进行单独的通道策略控制，充分保证每个用户的通讯安全。

（2）HDP总体架构

云管端三位一体（瘦客户端、管段、服务端）

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311349875.png)

 

（3）常见桌面协议

1. ICA/HDX

（1）ICA（Citrix Independent Computing Architecture）是目前应用较多的虚拟桌面协议之一， ICA除了功能齐全之外，还有：

1）广泛的移动终端支持。

2）ICA的网络协议无关性，使其可以支持TCP/IP、NetBIOS和IPX/SPX。

3）ICA不仅支持Citrix自家的虚拟化平台XenServer，还支持vSphere和Hyper-V。

4）性能上比较突出的特点是较低的带宽占用，在网络环境差（延迟高）的情况下也能正常使用。

（2）HDX（High Definition Experience）作为ICA的增强版，尽量改善用户体验，包括音视频，多媒体和3D，HDX支持H.264。

1. Citrix交付中心解决方案的核心是虚拟化技术，虚拟化计算的核心是ICA协议，ICA协议连接了运行在平台上的应用客户端运行环境和远端终端设备，通过ICA的**32个虚拟通道**（分别传递各种输入输出数据如鼠标、键盘、图像、声音、端口、打印等等），运行在中心服务器上的应用运行环境的输入输出数据重新定向到远端终端设备的输入输出设备上，因此虽然应用客户端软件并没有运行在客户端设备上，但是用户使用起来和在客户端安装运行客户端软件相比，没有感觉任何操作上的改变。

2. PCoIP（PC-over-IP）

（1）最初由加拿大公司Teradici开发，早期定位于高端图形设计，2008年VMware宣布与Teradici共同开发PCoIP，以改进自己的VDI解决方案VMware View。

1）PCoIP和硬件结合紧密，数据的编码和解码，图形的处理可以通过专门的硬件来完成，让CPU有精力来做其他的事情，也有专门集成了PCoIP显示芯片的显示器。

2）PCoIP是基于UDP协议的，UDP传输不可靠，但是UDP没有TCP的三次握手复杂的校验和数据恢复，传输速度快，适合多媒体的传输。

3）原生PCoIP协议没有串并口等外设的重定向能力，但一些TC厂商通过额外的端口重定向插件弥补了其这方面功能的不足。

1. PCoIP的最大特点就是，将用户的会话以图像的方式进行压缩传输，对于用户的操作，只传输变化部分，保证在低带宽下也能高效的使用。同时，PCoIP提供多台显示器及2560*1600分辨率和最多4台32位显示器的支持，此外它还支持把字体设置成清晰模式（Clear Type）。
2. PCOIP协议不同于其他的协议(例如RDP或者ICA/HDX)它不是居于TCP底层传输而是基于UDP的底层传输。TCP有什么问题？需要经过3次握手，整个数据包中的校验包的长度大于UDP，这样会带来一些问题使其不适应于有较高的网络延时以及丢包的广域网环境，举个例子，大家在线使用在线流媒体观看视频，例如迅雷看看，PPLIVE等，他们使用的传输协议是TCP还是UDP？显然是UDP，它可以最大程度的利用网络带宽，确保视频的流畅播放，正因为UDP协议简单、效率高，一般常见用于传输VOIP，视频等实时性要求高的内容。
3. 将用户的会话以图像的方式进行压缩传输，对于用户的操作，只传输变化部分，保证在低带宽下也能高效的使用。PCOIP协议在广域网环境下，具有更强的自适应功能，能够充分利用网络带宽，这里更充分的利用带宽，而不是无止境的抢占带宽。举个例子：QQ和宝马有区别么？在早晚高峰的时候，路上很堵，QQ开30迈，宝马也只能开30迈，你能说QQ和宝马一样慢么？但是到了临晨，路上没车了，我QQ开个100迈都费劲了，宝马轻松超过200，这时候充分利用带宽的优势就显现出来了。
4. PCOIP协议是典型的主机端渲染协议，兼容性较好。而且在不同连接线路速度下PCoIP显示图像的效果也不同。在低速线路下，PCOIP会先传输一份感觉上无损的图像到客户端，随着线路速度逐渐提高，渐渐将高清晰度的图形显示出来。PCOIP不但支持VMWARE软件的解决方案而且还能在装载了Teradici主机卡的刀片PC和机架式工作站上通过硬件编解码的方式存在。

3. SPICE（Simple Protocol for Independent Computing Environments）

（1）一款开源虚拟桌面协议，最初是由Qumranet开发，后来被RedHat收购并开源，经过几年的社区开发，SPICE协议不断成熟。

（2）SPICE协议对于视频具有一定的优越性，其主要原因还是对于显示信息的压缩处理由KVM完成，避免了GuestOS内由于视频压缩对于CPU的过量消耗。SPICE协议采用无损压缩，所以清晰度较高，缺点是带宽较高，消耗的资源较大。

1. Redhat推出的SPICE协议是一项高性能、动态的自适应远程呈现技术，能为终端用户带来和物理桌面个人计算机难以区分的体验。SPICE是为远程访问虚拟化桌面而专门设计和创建，它是使用redhat企业虚拟化桌面版时，将用户连接至虚拟化桌面的协议。
2. 与Microsoft的RDP和Citrix的ICA旧协议不同，SPICE是以多层架构为基础，旨在满足目前桌面用户的丰富多媒体需求。设计的核心是实现对用户端设备(CPU、RAM等)或主机虚拟服务器上可用系统资源的智能访问。作为访问的结果，协议会以动态方式判定是在客户端设备上还是在主机服务器上对桌面应用程序进行呈现，从而在任何网络条件下都能生成最佳用户体验。
3. SPICE协议可以提供超群的客户体验，市场潜力巨大，也备受国内虚拟化厂商的青睐，深圳京华科讯、云巅网络科技、拿云时代等厂商都基于SPICE推出自己的协议，在此基础上的虚拟桌面产品也受到了客户好评。

4. RDP/RemoteFX

（1）RDP（Remote Desktop Protocol）是微软的远程桌面协议，最初是由Citrix开发，支持的功能较少，且主要应用在Windows环境中，现在也有Mac下的RDP客户端和Linux下的RDP客户端rdesktop。历经多个版本的开发，RDP最新版也支持了打印机重定向，音频重定向，剪贴板共享等功能。

（2）RemoteFX是RDP的增强版，提供了vGPU、视频支持、多点触摸、USB重定向等功能。

1. RDP协议中，终端服务使任何一台有权限的终端机，用已知的账号登录服务器，可以使用账号内的资源，包括软件、硬件资源；同时，在协议升级后，客户端连接后可以使用本地的资源，包括本地打印机、声音本地回放、本地磁盘资源和本地硬件接口。所有的计算都在服务器端进行，客户端只需要处理网络连接、接收数据、界面显示和设备数据输出。国内基于RDP协议开发的虚拟化厂商有北京方物、西安瑞友天翼等。

（4）常见桌面协议对比

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311349480.png)

 

（5）桌面协议功能

1）2D图形显示技术

1. 桌面云要实现远程屏幕显示，要通过服务端侧的操作系统接口，抓取屏幕内容，再经过一定的处理后传送到客户端侧显示出来。

   图形处理后                 HDP Client

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311349134.png)

 


1. 从上图中我们可以看到，在操作系统软件层次中，与显卡进行交互的是显示驱动，上层系统需通过显示驱动来与显卡进行交互，可以考虑在显示驱动处来截获屏幕显示内容，将其传输至远程瘦终端的显卡上，完成远程显示的效果。

2. HDP显示关键技术

（1）非自然图像采用无损压缩：自动识别整幅图像中的文字、Windows图框、线条等非自然图像，对非自然图像采用无损压缩；相片、图片等自然图像采用合适的压缩率进行有损压缩。

（2）重复图像数据不传输：自动识别图像中的未变化部分，只有变化的部分数据会传输，极大降低带宽。

（3）支持多种图像压缩算法：支持多种图像压缩算法，可以根据不同的图像特点和场景选择最优的压缩算法。

2）语音技术

1. 通常桌面协议服务器端可以在虚拟机里面实现一个音频驱动，音频驱动会和Windows的音频子系统（音频引擎）进行交互。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311350564.png)

 

1. 在放音阶段，音频驱动将收到Windows音频子系统发送过来的音频数据，经过压缩处理后传输到桌面协议客户端，客户端进行解码并进行放音。在录音阶段，协议客户端将获取客户端本地的录音数据，并将数据进行压缩后传输到协议服务器端，服务器端进行解码后，由音频驱动返回给Windows音频子系统。由于音频对延时非常敏感，整个过程要关注对延时的控制。

2. HDP语音关键技术

（1）高保真Music压缩算法：自动识别声音场景，VOIP场景下采用针对人声优化的电信语音算法，音乐场景采用专业的高保真音乐编解码算法，极大提升音乐播放品质。

（2）自动降噪算法：VoIP启动自动降噪来压抑周边嘈杂音和背景声音，即使嘈杂环境也能通话自如。

（3）低延时：采用在TC端语音透传算法，降低语音在TC端由于缓冲带来的积累时延，保障语音实时性。

（4）高音质：采用更高的声音采样率（默认采用44.1K的采样率，友商一般16K），避免音质源头损失。

（5）立体混音：支持“立体混音”，即虚拟机所有输入声音和输出声音的混合。

3）视频显示技术

1. 目前在桌面云中，支持多媒体视频播放，通常有两种方式：

（1）将服务端的多媒体视频播放图像重新进行视频编码处理，然后将视频编码数据传输到客户端进行解码播放显示。

（2）视频重定向方式，通过捕获服务端播放器需要播放的视频编码流，直接将视频编码流发送到客户端进行解码播放显示。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311351501.png)


1. 根据上图原理显示，视频重定向方式，看上去效率更高，服务器端也少了视频解码与重新编码的资源消耗，但实际上这种方式非常受限，无法广泛的支持。具体原因解释如下：
2. 第一种方式，因在桌面虚拟机中的播放器对视频进行了解码，这里会有较大的解码CPU资源消耗，再加上会对视频区域进行重新编码，此时CPU消耗更大，这样会降低服务器的虚拟机密度。另外对视频区域的动态识别，也是一个重要的技术点，通常是根据刷新频率超过一定帧率的图像变更区域来识别。
3. 第二种方式，由于仅在服务器端截获待解码的视频码流，直接传输到客户端进行解码显示，这样对服务器端的开销较小。目前比较流行的技术，基本上是针对Media Player支持的多媒体重定向技术，但是该技术在国内的实用性并不高，因为国内使用Media Player播放器的较少，所以第二种方式的应用场景实际比较受限。当然技术也在发展，对其他播放器能够支持的多媒体重定向技术后续也会不断出现。

2. HDP协议提供了支持4K视频播放的能力，该能力是通过把视频原始文件解封装后的音视频数据包发送到客户端，在客户端直接使用音视频数据包进行解码显示。

（1）直接使用解封装后的音视频码流，可以降低网络带宽的压力

（2）可以降低对服务端计算资源的消耗

（3）可以充分应用客户端TC的能力实现4K视频的播放

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311351285.png)


3. HDP视频关键技术

（1）视频场景智能识别：在Display Server能够自动识别是视频数据还是普通的GDI数据，对于视频数据，采用高效的H.264或MPEG2进行编码，并充分利用TC端硬件能力进行解码。

（2）帧率动态调整：根据网络的质量动态调整视频播放的帧率，优先保证视频流畅度。

（3）视频数据自适应：根据显示器的分辨率和播放视频窗口的大小，自动调整视频数据流的大小，在播放器最小化时终止发数据，几乎没带宽，降低CPU消耗，提升用户体验。

（4）多媒体重定向：充分利用TC的硬件解码的能力，支持断线自动重线播放，流量动态调整，最大支持4K视频播放，流畅度优于ICA。

（5）强大的应用感知能力：对常用视频播放软件（Flash）和图像处理软件（如Photoshop）进行针对性优化，比ICA更流畅。

4）外设重定向技术

1. 在桌面云场景下，把TC/SC终端侧的外围设备，通过桌面协议映射到远程桌面中，并能通过远程桌面使用这些外围设备的技术。基于外设技术实现的原理来分，主要分如下两种：

（1）端口重定向：是指在远程桌面的操作系统中，针对端口底层协议进行重定向的技术；如USB端口重定向、串口重定向、并口重定向等。

（2）设备重定向：是指在远程桌面的操作系统中，针对设备应用协议进行重定向的技术；如摄像头重定向、TWAIN重定向等。

2.传统PC机USB外设工作原理

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311352276.png)
 

1. 从上图可以了解到，所有USB外设正常工作，在软件层面依赖的是USB总线驱动。一个应用需要使用USB外设必须与USB设备驱动进行交互，而设备驱动的工作完全依赖USB总线驱动来交互USB设备数据，与硬件交互都是由总线驱动来代理完成。

3.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311352035.png)

 

1. 上图所示，即为USB端口重定向方式，它通过在虚拟机和客户端各内置一个虚拟USB总线驱动，实现原物理下USB总线驱动的拉远。而设备对应的真实USB设备驱动安装并运行在虚拟机中，与虚拟机USB总线驱动进行交互，这样对虚拟机中的USB设备驱动来说，并不会感知到所控制的设备实际上在TC远端，同样应用程序也不会感知到这个差异。因为USB端口重定向与具体的设备和应用无关，直接将USB端口重定向到桌面虚拟机中，所以USB端口重定向具有良好的设备兼容性。但同时，也正是因为这个原因，USB端口重定向也有一定的局限性，由于没有经过设备驱动层的压缩和预处理，对于某些扫描仪和摄像头等图像类应用，可能会导致带宽过大，网络时延敏感等问题。在这种情况下，需要使用到设备重定向技术。

4.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311352351.png)


1. 相对于USB端口重定向，设备重定向是从设备驱动上层进行重定向处理。通过在TC客户端和桌面虚拟机里面内置设备驱动，将设备采集的原始数据，经过TC端的设备驱动进行压缩和预处理，并将处理之后的数据，通过桌面协议传送到虚拟桌面里面的设备驱动进行还原，并提交给应用程序处理。
2. 比如摄像头，如果走USB重定向的方式，其带宽有数十M甚至更多，这基本没法实际部署。针对这类型的设备一般会单独为它优化来使其可以满足实际商用。如针对摄像头，我们可以采用上图摄像头设备重定向方式实现优化。
3. 如上图所示，在客户端可以通过应用程序级别的接口来获取摄像头的数据（一般为位图数据或者YUV数据），再将数据通过视频压缩算法（如H.264）进行压缩处理，发送到服务器端，服务器端解码摄像头视频数据后通过虚拟摄像头提供给应用程序使用。这种方式的摄像头重定向比基于USB总线的重定向技术带宽下降数十倍。

5）3D图形显示技术

1. 华为桌面云也推出了相应的解决方案（华为高清制图桌面），能支持多种高清制图软件，根据其3D显示实现原理，主要有如下几大类技术：

（1）GPU直通

（2）GPU硬件虚拟化

（3）图形工作站纳管

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311352161.png)


1. GPU直通：
   1. GPU直通技术是将每个物理GPU绑定给一个虚拟机，该虚拟机独享GPU卡，通过驱动直接访问GPU。华为GPU直通高清制图特性，利用GPU直通技术，使用华为桌面协议HDP（Huawei Desktop Protocol），使得终端用户通过终端远程接入用户虚拟机获取GPU的3D加速能力。本特性支持多种类型的显卡，兼容性好，支持符合最新DirectX、OpenGL规范的3D应用。
2. GPU硬件虚拟化：
   1. GPU硬件虚拟化技术，是利用虚拟化vGPU技术，将NVIDIA GRID显卡虚拟成几个vGPU，每个vGPU绑定给一个虚拟机，该虚拟机像访问GPU一样直接访问该vGPU。华为GPU硬件虚拟化高清制图特性，利用FusionSphere虚拟化平台将1个物理GPU卡，虚拟成多个vGPU卡，每个vGPU卡绑定给一个虚拟机，该虚拟机独享一个vGPU，多个虚拟机共享一个物理GPU卡，从而达到资源共享的目的。本特性支持最多32个用户共享一个GPU卡，支持符合最新DirectX、OpenGL规范的3D应用。
3. 图形工作站纳管：
   1. “图形工作站”是一种专业从事图形、图像（静态）、图像（动态）与视频工作的高档次专用电脑的总称。从工作站的用途来看，无论是三维动画、数据可视化处理乃至CAD/CAM和EDA，都要求系统具有很强的图形处理能力，从这个意义上来说，可以认为大部分工作站都用作图形工作站。通过图形工作站纳管方式，可以把图形工作站导入到桌面云解决方案中，并向终端用户提供HDP协议接入图形工作站获取GPU的3D加速能力。本特性支持NVIDIA多种类型的显卡，兼容性好，支持符合最新DirectX、OpenGL规范的3D应用。

### 4.华为桌面云部署方案

（1）硬件部署方案

1. 华为桌面云解决方案硬件形态

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311355795.png)
 

2. 华为桌面云解决方案物理部署组网

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311355619.png)

 

1. VRRP是一种选择协议，它可以把一个虚拟路由器的责任动态分配到局域网上的 VRRP 路由器中的一台。控制虚拟路由器 IP 地址的 VRRP 路由器称为主路由器，它负责转发数据包到这些虚拟 IP 地址。一旦主路由器不可用，这种选择过程就提供了动态的故障转移机制，这就允许虚拟路由器的 IP 地址可以作为终端主机的默认第一跳路由器。
2. VRRP是一种路由容错协议，也可以叫做备份路由协议。一个局域网络内的所有主机都设置缺省路由，当网内主机发出的目的地址不在本网段时，报文将被通过缺省路由发往外部路由器，从而实现了主机与外部网络的通信。当缺省路由器down掉（即端口关闭）之后，内部主机将无法与外部通信，如果路由器设置了VRRP时，那么这时，虚拟路由将启用备份路由器，从而实现全网通信。

（2）软件部署方案

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311356120.png)


需要的支持：①MS（微软）域AD（让VM出现在它里面）、DNS服务器（做运维解析）、DHCP（做地理分配，分配网关和DNS）

​        AD：维护用户名、密码的策略，管理微软里的资源（用户资源、PC机资源等）

②虚拟化（存储、计算、网络）

③LB（负载分担器）

关联了用户的虚拟机叫桌面，没有关联用户的虚拟机。

1. 桌面云替代了传统物理PC分散，现在在用户一侧放置了TC/SC（瘦客户端）（TC是个小盒子，SC是个PC机上的Soft）帮我通过HDP协议把瘦客户端连到桌面VM。桌面VM一定要有HDA（HDP Agent），瘦客户端一定要有HDP Client。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311356720.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311356607.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311357048.png)

 

①vLB：（软件）负载分担器  接收http/https协议，然后重定向后台的web server （可选）Linux虚拟机

vAG（Access Gateway）（软件）接入网关 负责HDP/VNC协议 （可选）  Linux虚拟机

作用：a.做HDP的接入 （把用户端IO外设和VM之间做IO数据的传递）（可选）

b.VNC（虚拟网络Client，做运维。仿佛是一个对虚拟机做显示的显示器，通过客户的接入对虚拟机做操作/运维）自助维护通道 所以VNC一般不用，故障或做维护时用。（VNC必须经过vAG） 通过VNC连进桌面的方式叫自助维护。

 场景：虚拟机不能通网或IP地址没有了，就可以通过接入网关通过VNC访问到虚拟机。

②SVN 是Client，是一个VPN接入网关。可以帮华为提供硬件的LB的解决方案。

③WI（Web Interface）就是web server。通过云客户端访问虚拟机第一个呈现出的界面（web portal给企业用户用）（用户名、密码窗口）（桌面云入口）。 （必有） Linux虚拟机

  瘦客户端（Client）àvLBàWIàADàHDC虚拟机

用途：把用户名、密码输送给WI的时候，WI先去找AD进行用户名、密码验证，然后去找HDC发送请求（给它用户名），HDC把用户名换成IP地址端口送给WI，WI给Client，然后Client就发起HDP会话。

④HDC（Huawei Desktop Controller）华为桌面控制器（核心部件）。 （必有） Linux虚拟机

负责把用户名和IP地址端口对应上返回给WI。提供User（username、password）跟桌面（ip+port）的关联。（HDP控制器后面有个DB（Gauss高斯（华为的）））

⑤DB：（Gauss）做数据的提供。（IT资源数据库）（必有）  用户名、密码 Linux虚拟机

⑥license：做管理的  （必有） Linux虚拟机

⑦ITA：（IT Adapter基础设施适配器）华为桌面云的一个管理系统。（FA桌面管理系统，呈现web portal给admin管理员用）调动以上组件的一个管理系统。负责运营和运维。

（快速发放、桌面管理、告警监控、任务中心、统计报表、系统管理）

  运营                运维

Linux虚拟机

 用途：①桌面发放

②关联用户

然后就出现了有用户关联的桌面。这就是桌面组。

   ITA要跟DB、HDC、WI、vAG、vLB、VRM全要联动。

   ITA可以通过VRM对CNA服务器，CNA服务器对虚拟机（桌面）进行操作（下电、重启）。

Euler OS（欧拉操作系统）

⑧TCM：瘦客户端管理器

⑨AD/DNS/DHCP：windows系统

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311357388.png)

 

AD做了两次验证：

①允许访问桌面云

②Client朝桌面发起会话“免/省”（在后台把刚才WI送给AD的密码送到客户端去了）

RDP是给懂网络的人用的，而HDP可以给不懂网络的人用。

下边就是基础设施（FusionCompute虚拟化），上边就是FusionAccess桌面云应用给管理视图ITA，驱动ITA给VRM对接。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311357879.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311358399.png)

 

虚拟化平台就是VDI。

配双网卡，一个网卡连管理平面与VRM要IP可达，一个网卡连业务平面。

所以必须在当前DVS上创建两个端口组，一个Mgn（Vlan100）连管理平面，一个Desktop（Vlan200）连业务平面。

场景：若是桌面2故障了，用户通过VNC访问到vAG，然后vAG通过VNC访问到CNA，CNA通过API访问到桌面2。（这种情况是不是通过网络连进来的是VNC，通过网络连进桌面的是HDP）

2.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311358223.png)

 

1. 虚拟桌面业务发放
   1. 桌面组管理：HDC根据ITA的请求，完成桌面组的创建、删除、修改和查询，完成与桌面组相关的资源状态统计（如未注册虚拟机数量、已注册虚拟机数量、已连接虚拟机数量和已断开虚拟机数量）。
   2. 虚拟机的关联和解关联：HDC根据ITA的请求，完成虚拟机和用户（或用户组）的关联以及解关联，关联模式包括1:1、1：N和M：N。
2. 虚拟桌面登录管理
   1. 虚拟桌面的状态管理：HDC接收已分配虚拟机的注册请求，已关联虚拟机在HDC的初始化状态为“未注册”；注册成功后的虚拟机，HDC将其状态修改为“已注册”；虚拟机被成功登录后，状态将变为“已连接”；用户断开同虚拟机的连接之后，虚拟机的状态将被置为“已断开”。
   2. 用户登录虚拟机时，HDC根据License的消耗情况，进行访问控制。
   3. 用户在WI上成功登录后，HDC提供分配给用户的虚拟机列表信息。
3. 虚拟机的策略管理
   1. 根据ITA的请求，完成策略组的创建、删除、修改和查询，以及将策略组应用到用户、虚拟机和桌面组。

（3）时钟同步方案

1. 时钟同步是桌面云系统稳定运行的必备条件，如果时钟不同步，会导致桌面云系统管理混乱，时钟同步保证桌面云系统时钟、虚拟机时钟一致：

（1）当客户无提供外部时钟源，华为提供AD时，推荐采用AD通过管理平面从FusionCompute的主、备VRM所对应主机同步时间的方案。

（2）当由客户提供稳定的时钟源时，不管AD组件由客户提供还是华为提供，采用客户提供外部时钟源同步方案。

1）无外部时钟源

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311359239.png)

 

1. FusionCompute、第三方设备分别从VRM对应的CNA节点同步时间。
2. 用户虚拟机及基础架构虚拟机自动从AD同步时间。
3. 在FusionAccess配置时钟源后，AD将自动从时钟源同步时间。

2）客户提供AD

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311400649.png)

 

1. 客户提供Windows AD，此时建议管理平面和业务平面均从客户提供的AD同步时间
2. FusionCompute以及VRM对应的CNA节点分别向外部时钟源同步时间。
3. 第三方设备分别向VRM对应的CNA节点同步时间。
4. 用户虚拟机及基础架构虚拟机自动从AD同步时间。
5. 在FusionAccess配置时钟源后，AD将自动从时钟源同步时间。

3）华为提供AD

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311400877.png)

 

1. AD组件由华为提供，此时建议管理平面和业务平面均从AD同步时间
2. FusionCompute、AD组件以及VRM对应的CNA节点分别向外部时钟源同步时间。
3. 第三方设备分别向VRM对应的CNA节点同步时间。
4. 用户虚拟机及基础架构虚拟机自动从AD同步时间。
5. 在FusionAccess配置时钟源后，AD将自动从时钟源同步时间。

（4）网关与负载均衡器部署方案

1. 网关/负载均衡器功能介绍如下：

（1）负载均衡器可通过vLB实现该功能，用于将用户的HTTP(S)请求分配到不同的WI，能够自动对WI进行健康检查，确保所有的用户请求都能分配到可用的WI。

（2）网关可通过vAG实现该功能，用于业务接入（桌面协议HDP的接入）和自助维护接入（VNC），对客户端的接入进行加密保护，提高系统的安全性。

1. 若不配置网关，则用户数据没有经过加密，存在泄露隐患。

2.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311401478.png)

 

1. 用户数不超过500：两台CNA，每台部署一台vAG/vLB虚拟机
2. 用户数500-1000：两台CNA，每台部署两台vAG虚拟机，其中管理集群中第一对用于部署vAG的虚拟机，总是和vLB合并部署

3.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311401190.png)

 

1. 用户数1000-2000：新增网关集群，新增一台CNA，新增的CNA部署三台vAG虚拟机；原管理集群上的两台CNA，保持每台部署两台vAG虚拟机
2. 用户数2000-3500：新增网关集群，新增两台CNA，新增的CNA每台部署三台vAG虚拟机；原管理集群上的两台CNA，保持每台部署一台vAG虚拟机

4.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311401070.png)

 

1. 用户数3500-5000：新增网关集群，新增三台CNA，新增的CNA每台部署三台vAG虚拟机；原管理集群上的两台CNA，保持每台部署一台vAG虚拟机

## （二）FusionAccess桌面云组件介绍与安装

### 1.桌面云管理组件

华为FusionAccess桌面云解决方案在接入和访问控制层的组件有vAG、vLB、WI；虚拟桌面管理层的组件有ITA、HDC、TCM、License服务器、GaussDB数据库、Backup Server服务器；除了这些之外，还有安装在桌面虚拟机内容的HDA组件，有了HDA，客户端才能通过HDP协议登录虚拟桌面。

（1）FusionAccess全景图

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311418489.png)

 

上面是管理系统，下面是业务系统。

（2）接入和访问控制层

1）WI

1. WI（Web Interface） Web接口

WI为最终用户提供Web登录界面，在用户发起登录请求时，将用户的登录信息（加密后的用户名和密码）转发到AD上进行用户身份验证，验证通过后，WI将HDC提供的虚拟机列表呈现给用户，为用户访问虚拟机提供入口。

1. 用户可以在WI上连接、启动、重启虚拟机。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311418119.png)

 

2）vAG

1. vAG（Virtual Access Gateway） 虚拟接口网关

vAG的主要功能是桌面接入网关（HDP）和自助维护网关（VNC）。当用户虚拟机出现故障时，用户无法通过桌面协议登录到虚拟机，需要通过VNC自助维护台登录到虚拟机进行自助维护。

如果用到VNC必须经过vAG。

HDP也可以通过vAG走到HDA。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311418010.png)

 

*3**）vLB*

1. vLB（Virtual Load Balance） 虚拟负载均衡器

vLB功能的主要作用是在用户访问WI时，进行负载均衡，避免大量用户访问到同一个WI。

1. 通过部署vLB方式实现WI的负载均衡时，将多台WI的IP地址绑定在一个域名下，当用户输入域名发起请求时，vLB按照IP地址绑定的顺序依次解析WI的IP，同时将用户的登录请求分流到依次解析出IP地址的WI上，提高WI的响应速度，保证WI服务的可靠性。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311418449.png)

 

①使用vAG/vLB做接入网关

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311419655.png)

 

②使用F5（硬件盒子）做接入网关

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311419406.png)

 

场景一：部署vAG，桌面协议HDP不经过网关。

vLB完成WI的负载均衡；vAG作为自助维护网关，HDP协议不过vAG,由客户端直接和虚拟机桌面协议服务通信。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311419376.png)

 

场景二：部署vAG，桌面协议HDP经过网关。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311420574.png)

 

场景三：部署F5，桌面协议HDP不经过网关。

F5完成WI的负载均衡和自助维护网关，HDP协议不过F5，由客户端直接和虚拟机桌面协议服务通信。

F5部署要求如下：

a.部署两台F5，工作在主备状态。

b.F5采用双臂模式挂载在核心交换机上，F5通过trunk端口连接到核心交换机，该trunk端口允许业务平面的IP包通过。

c.创建虚拟网关，只启用负载均衡功能，配置VIP对应的实际WI地址。

d.使用负载均衡功能，需要给负载均衡网关导入证书，保持主备负载均衡网关证书一致。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311420240.png)

 

场景四：部署F5，桌面协议HDP经过网关。

F5完成负载均衡、自助维护网关，业务接入网关功能。对于外网/公网的终端，可通过F5的虚拟网关实现。

F5部署要求如下：

a.部署两台F5，工作在主备状态。

b.F5采用双臂模式挂载在核心交换机上，F5通过trunk端口连接到核心交换机，在核心交换机上配置管理平面和业务平面的vlan的数据包都能通过该trunk端口。

c.F5所在的管理VLAN与业务VLAN需不同，且桌面云管理组件所在VLAN不能与F5管理VLAN共用。

d.选择业务平面的VLAN（如果业务平面有多个，随机选择一个），创建业务子接口，选择管理平面的VLAN创建管理子接口。

e.创建虚拟网关，启用负载均衡和安全云网关功能。F5作为负载均衡网关时，任何访问负载均衡网关的IP的请求，都会被转发到WI上；F5作为业务接入网关时，代理HDP客户端（HDP Client）访问HDP服务器（有HDA的VM）；F5作为自助维护网关时，F5代理自助维护客户端访问CNA上UVP的VNC Server（如果管理平面和业务平面不通，需要配置业务平面到管理平面的路由，保证自助维护的数据包能够到达管理网络）。

f.使用负载均衡功能，需要给负载均衡网关导入证书，保持主备负载均衡网关证书一致，且配置负载均衡模式为源IP方式。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311420807.png)

 

（3）虚拟桌面管理层

1）ITA

1. ITA（IT Adaptor） IT适配器

ITA为用户管理虚拟机（管理员）提供接口，其通过与HDC（Huawei Desktop Controller）的交互、以及与云平台软件FusionCompute的交互，实现虚拟机创建与分配、虚拟机状态管理、虚拟机模板管理、虚拟机系统操作维护功能。

1. 虚拟机创建，发放，及日常维护都是通过ITA的portal进行。ITA调用HDC提供的接口。
2. ITA为基于Tomcat的一个Web Service，对上（IT Portal）提供统一接口，对下则集中了HDC、FusionSphere、虚拟机、DNS的接口，完成功能的整合。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311421340.png)

 

2）HDC

1. HDC（Huawei Desktop Controller） 华为桌面控制器

HDC是虚拟桌面管理软件的核心组件，根据ITA发送的请求进行桌面组的管理、用户和虚拟桌面的关联管理，处理虚拟机登录的相关请求等。

1. 单套HDC桌面控制器可管理5000桌面，一套ITA支持管理多套HDC的方式，最大可管理20,000桌面。
   1. 实现并维护用户与其虚拟桌面的对应关系
   2. 用于用户接入时，与WI交互，为其提供接入信息，支持完成用户的整个接入过程
   3. 与VM中的HDA进行交互，收集HDA上报的虚拟机状态及接入状态

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311421661.png)

 

3）TCM

1. TCM（Thin Client Management） 瘦终端管理服务器

TCM为升腾曦帆桌面管理系统，管理员通过TCM对TC进行日常管理。

1. 采用管理服务器对TC进行集中管理，包括版本升级、状态管理、信息监控、日志管理等。
2. 管理服务器可搜索到待管理的TC终端，并对其进行管理。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311421280.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311421035.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311422513.png)



2. TCM功能概述

 （1）基本管理

1）终端基本管理操作；

2）终端的桌面配置；

3）远程协助

4）电源控制等。

 （2）部署管理

1）实现对终端的文件复制和安装等操作。

 （3）策略管理

1）实现智能管理过程中相关策略的关联和配置。

 （4）公共管理

  1）包括对管理员的管理、系统日志管理和客户端的升级等。

 （5）任务管理

  1）管理系统的任务管理中心，完成查看、分析、维护等操作。

4）License

1. License服务器

（1）License服务器是License的管理与发放系统，负责HDC的License管理与发放。

（2）FusionAccess桌面管理软件主要用到其HDP连接数license，当用户连接虚拟机时会到License服务器上检查license，判断是否可以连接到虚拟机。（license决定授权的用户数量）

1. 华为桌面接入的License由License 服务器统一控制。
2. License总数是实际购买的License个数，当License已使用数达到总数的1.1倍时，新的用户将无法登录桌面。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311422093.png)

 

5）GaussDB

1. GaussDB数据库

GaussDB为ITA、HDC提供数据库，用于存储数据信息。

6）Backup Server

1. Backup Server 备份服务器

（1）Backup Server的主要功能是备份各个组件的关键文件和数据。

（2）Backup Server备份策略：

1）每天01:00定时备份并上传到备份服务器，存放的目录是“/var/ftpsite/配套的ITA名称/各组件文件夹名称”。

2）备份空间充足时，备份服务器保存10天内的备份数据；备份空间不足时，系统会自动删除最早的备份文件。

（4）桌面虚拟机核心组件-HDA

1. HDA（Huawei Desktop Agent）安装在每一个用户的虚拟桌面中，提供终端与虚拟桌面之间的连接功能。（安装在模板里，安装后都有了）

2. TC（SC）要通过HDP协议连接到虚拟机必须要在虚拟机上安装HDA。

3. HDA实际上是一系列桌面连接服务（能够升级），为TC（SC）使用虚拟机提供支持。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311423004.png)

 

### 2.桌面云管理组件安装

（1）安装部署

1.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311423851.png)

 

即处在业务平面也处在管理平面内的三个虚拟机都需要双网卡。

为了让微软的系统可以支持HDP就需要植入HDA。

1. 端口组：
   1. FusionAccess基础架构虚拟机管理平面网卡创建端口组：在搭建虚拟化平台过程中，会自动创建ManagementDVS及VLAN号为0的端口组，管理平面网卡的端口组即设置为该VLAN号为“0”的端口组。
   2. FusionAccess基础架构虚拟机业务平面网卡创建端口组：在搭建虚拟化平台过程中，如果管理平面和业务平面合一，则在ManagementDVS上创建业务平面网卡的端口组（推荐）；如果管理平面和业务平面分离，则在业务分布式交换机上创建业务平面网卡的端口组。
2. 每个组件可以分开安装在不同的虚拟机上，也可以ITA/GaussDB/HDC/WI/License组件安装在一台虚拟机上，vAG/vLB安装在另外一台。商用环境下，在资源足够的情况下，选择前者，但本次课程和实验选择后者来讲解。

2.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311423265.png)

 

1. 可选的Linux基础架构虚拟机还包括
   1. Backup Server
   2. TCM: Thin Client manager

（2）管理组件安装流程

1）配置云平台

1. 配置网络

（1）创建分布式交换机DVS

（2）创建端口组

2. 配置数据存储

（1）关联存储资源

（2）分配存储设备并映射给集群

（3）创建数据存储

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311424445.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311424363.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311424658.png)


2）创建Linux基础架构虚拟机

1。根据规划，创建Linux基础架构裸虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311425587.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311425213.png)

 

2。配置Linux基础架构虚拟机

1. 设置虚拟机自恢复属性

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311426883.png)

 

1. 重启完VRM进程后，需要重新登录FusionCompute界面进行虚拟机下电和上电操作。

3。从光驱安装虚拟机操作系统，根据规划

1. 配置网络

2. 配置主机名

3. 配置时区

4. 配置root用户密码

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311426021.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311427904.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311427790.png)

4。虚拟机挂载安装Tools（PvDriver）

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311427296.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311428610.png)

3）安装ITA/GaussDB/HDC/WI/License

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311428965.png)
 

1. 主用组件安装的时候节点选择“Create a new node”
2. 备用组件安装的时候节点选择“Add to an existing node”

4）安装vAG/vLB

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311428727.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311429462.png)


1. 如果实际规划有两台WI服务器，需要输入这两台WI服务器的业务平面IP地址。
2. vLB一定不能和WI部署在同一台虚拟机上。

### 3.桌面云关联组件

（1）AD

1）什么是AD

1. 概念：

（1）活动目录（Active Directory）是用来存储网络上的用户账户、计算机、打印机等资源信息，方便用户的查找和使用。

（2）一种目录服务，可以提供对象的存储、快速查找与定位，并且能够统一、集中、安全的管理计算机资源。

（3）是微软Windows Server中，负责架构中大型网络环境的集中式目录管理服务。

2. 内容：

（1）在Windows Server AD域内的目录是用来存储用户帐户、组、打印机、共享文件夹等对象。

3. 作用：

（1）AD管理和保护系统的用户账户、客户机及应用程序，提供了集中统一的界面，增强了信息的安全性。

1. 目前 AD 已成为Windows Server中成熟的目录服务组件，它处理了在组织中的网络对象，对象可以是用户，组群，电脑，网域控制站，邮件，设置档，组织单元，树系等等。

4. 活动目录(Active Directory)主要提供以下功能：

（1）基础网络服务：包括DNS、WINS、DHCP、证书服务等。

（2）服务器及客户端计算机管理：管理服务器及客户端计算机账户，所有服务器及客户端计算机加入域管理并实施组策略。

（3）用户服务：管理用户域账户、用户信息、企业通讯录（与电子邮件系统集成）、用户组管理、用户身份认证、用户授权管理等，缺省实施组管理策略。

（4）资源管理：管理打印机、文件共享服务等网络资源。

（5）桌面配置：系统管理员可以集中的配置各种桌面配置策略，如：界面功能的限制、应用程序执行特征限制、网络连接限制、安全配置限制等。

（6）应用系统支撑：支持财务、人事、电子邮件、企业信息门户、办公自动化、补丁管理、防病毒系统等各种应用系统。

2）AD对象

1. 活动目录（AD）的最小管理单元为对象（Object），也是一组属性的集合，一个 AD 网域中，以树状结构，组织如下的基本对象：

（1）域控（Domain Controllers），存储网域所属的网域控制站（简称 设备上下文、域控） 。

（2）计算机（Computers），存储加入网域的电脑对象。

（3）系统默认账户组群（Builtin），存储自带的帐户组群。

（4）用户（Users），存储 AD 中的用户对象。

（5）组织单元（Organization Unit，OU），可以在 OU 之中存放 AD 的对象，包括用户，组群，电脑等，让组织结构在 AD 中可以被真实的反映出来，便于以组织结构方式管理对象。

3）子域多域

1. **树**由多个域组成，形成一个连续的名字空间。

1. 树由多个域组成，这些域共享同一个表结构和配置，形成一个连续的名字空间。树中的域通过信任关系连接起来。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311429228.png)


2. 域森林是指一个或多个没有形成连续名字空间的域树。

1. 默认情况下，森林之间没有建立信任关系，如果要达到虚拟机灵活分配的目的，必须要求森林中的域之间建立信任关系。
2. 配置森林间的信任关系，也就是配置根域与根域之间的信任关系。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311430506.png)

 

3. 信任关系

（1）双向信任

1）A域、B域互相信任

（2）单向信任

1）A域信任B域，表示为：A > B，使得B域的员工可以直接访问A域上的资源

2）B域信任A域，表示为：A < B，使得A域的员工可以直接访问B域上的资源

1. 访问方向与信任方向相反。

4.

（1）双向:本地域信任指定域,同时指定域信任本地域

（2）单向:内传:指定域信任本地域

（3）单向:外传:本地域信任指定域

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311431184.png)

 

4）域控制器

1. AD域服务的目录数据存储在域控制器内，一个域内可以有多台域控制器，每台域控制器的地位（几乎）是平等的，由于控制器间存在着数据同步，他们各自储存着一份（几乎）完全相同的AD数据库。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311431323.png)

 

5）域策略

1. 域控组策略（域策略）是一种单到多的管理模式，它可以

（1）实现强制性对网络中的客户端进行安全配置。

（2）灵活的对网络中的客户端进行软件的部署。

（3）强化企业中的软件管理（例如可以限制某类软件不能在企业中使用）。

（4）将复杂的系统设置变得简单化。

（5）站点、域级别的集中化管理，组织单位级别的分散式管理。

（6）控制用户的系统软件环境。

（7）通过控制用户和计算机环境，降低企业的管理成本。

1. 管理员可以很方便的管理域中的计算机和用户的工作环境，例如，用户的桌面环境，计算机启动、关机与用户登录、注销时所执行的脚本文件、软件安装、安全设置等。

2. 计算机配置：当计算机开机时，系统会根据计算机配置的属性来设置计算机环境。

（1）举例来说，如果对huawei.com设置了组策略，则此组策略内的计算机配置就会被应用到这个域内所有计算机。

3. 用户配置：当用户登录时，系统会根据用户配置的属性来配置用户的工作环境。

（1）举例来说，如果对组织单位UserOU配置了组策略，则此组策略内的用户配置就会被应用到这个组织单位内的所有用户

4. 组策略通过组策略对象（GPO）来设置，只要将GPO链接到指定的站点、域或组织单位，此GPO内的设置值就会影响到该站点、域或组织单位内的所有用户与计算机。

5. AD 域已经有两个内置的GPO：

（1）Default Domain Policy

（2）Default Domain Controller Policy

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311431429.png)


1. Default Domain Policy
   1. 此GPO默认已经被链接到域，因此其设置值会被应用到整个域内所有用户与计算机。
      例如：默认情况下，只有加入到本地管理员组中的用户（组），才可以登录虚拟机。在制作桌面模板时，如果勾选“配置用户登录”，则表明虚拟机允许Users组成员（含域用户）登录。用户需要配置AD服务器的Default Domain Policy中“允许本地登录”策略才能使登录策略生效。
2. Default Domain Controller Policy
   1. 此GPO默认已经被链接到组织单位Domain Controllers,因此其设置值会被应用到组织单位Domain Controllers内的所有用户与计算机

6）AD组策略应用

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311431567.png)


*7**）用户域账号*

1. 域用户账号是在域控制器上建立的，域用户账号是访问域的唯一凭证，作为AD的一个对象保存在域的AD数据库中。用户从域中的任何一台计算机登录到域中的时候必须提供一个合法的域用户账号，该账号将被域控制器所验证。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311432862.png)

 

8）域账号常用操作

1. 添加到组

2. 禁用账号

3. 重设密码

4. 移动

5. 删除

6. 重命名

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311433998.png)

 

9）用户域账号属性

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311433738.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311433466.png)

 

10）查找用户域账号

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311433478.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311434973.png)

 

11）用户组

1. 组是用户账号的逻辑的集合。

2. 将用户账号分组管理，方便管理域内资源的访问权限。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311434109.png)


12）AD中的组

1. 使用组来简化资源权限的分配

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311434971.png)

 

2. 一个用户可以是许多组的成员

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311434295.png)



3. 组可以被嵌套在其他的组中

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311434269.png)


13）创建用户组

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311435271.png)



14）组织单位OU

1. OU 可以把对象组织到一个逻辑结构中，使其能最佳适应组织的需要。

2. 委派 OU 的管理控制权，必须把 OU 及 OU 包含对象的具体的权限指定给一个或几个用户和组。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311435274.png)

 

15）创建组织单位

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311435508.png)



1. 普通容器对象不能创建OU
2. 普通容器和OU是平级的，没有包含关系
3. 只能在域或OU下创建OU

16）OU之间移动AD对象

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311436621.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311436848.png)
 

1. 用户移动账号后,赋予该用户账号的权限设置不会变
2. 该用户账号会使用新OU的组策略设置

17）用户组与组织单位OU区别

1. 相同点：

（1）OU和用户组都是活动目录的对象。

2. 不同点：

（1）用户组中包含的对象类型有限，只能是账号。

（2）OU中可以包含账号、计算机、打印机、共享文件夹。

（3）OU还有组策略的功能。

18）域与组织单位OU关系

1. 相同点：

（1）OU和域都属于活动目录的逻辑结构范畴。

（2）OU和域都是用户和计算机的管理单元，都可以容纳活动目录的对象，都可以对其设置组策略。

2. 不同点：

（1）用户只能登录到域，而不能登录到OU。

（2）先有域，后有OU。

（3）OU只能存在域中，域不能在OU中存在。

（4）域的级别比OU高。

19）AD典型应用模型

1.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311437815.png)


1. 所有用户在单个域内
2. 适用于小规模组织。
3. 所有用户、设备，都在一个域内。
4. 单一域的方式，部署方便，集中管理，维护简单。
5. 不同部门之间，可以通过设置不同OU来对不同的用户用户和设备，进行分离管理。

2.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311437782.png)


1. 专门的森林根域, 按地理分布的子域来控制复制。
2. 适用于较大规模，不同的部门所处不同地域的组织。
3. 根据部门所处的不同地域，分别建立不同的子域，但子域应尽可能少。
4. 多域方式，不同地域有不同的子域的策略，管理维护、部署上，都比单一域复杂。
5. 每个子域内，不同部门之间，可以通过设置不同OU来对不同的用户和设备，进行分离管理。
6. 不同子域之间，需要进行用户数据同步，因此需要预留网络带宽。

20）把计算机加入到AD域

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311437385.png)


1. 如果用户试图登录主机，主机获取用户的帐号和密码，然后经过密钥机制处理，并和存储在帐号数据库中的密钥进行对比，如果对比的结果匹配，允许用户登录计算机。如果对比的结果不匹配，用户就无法登录计算机。
2. 如果用户试图登录到域，那么系统会使用存储在域控制器数据库中的帐号信息同用户提供的信息进行比较；验证域控制器上的信息同用户登录的信息是否匹配；如果匹配，允许登录。

21）AD典型桌面应用

1. 用户按域中的用户名来登录桌面。

2. HDC向AD进行用户信息认证。

3. 用户虚拟机向域控同步域信息。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311438656.png)



1. 用户虚拟机从域控同步信息，可以在用户登录时同步，或者通过AD强制同步。

（2）DNS

1）DNS

1. 域名系统（Domain Name System ,DNS），是一种提供域名和IP地址之间的转换的分布式数据库，以方便访问网络。

2. DNS的优势

（1）用户不需要通过IP数字串，只需要通过容易记忆的字符串来访问网络。

3. DNS与域控制器协同工作

（1）域控制器会将它的主机名、IP地址和所扮演的角色等信息注册到DNS服务器内以便其他计算机可以通过DNS服务器找到这台域控制器。

4. 域名空间采用分层结构包括：根域、顶级域、二级域、子域和主机名。域名空间的层次结构类似一棵倒置的树，其中根作为最高级别，大树枝处于下一级级别，树叶则处于最低级别。

5.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311438253.png)


1. 普通域，3个字符长度
   1. com，商业组织
   2. edu，教育机构
   3. gov，政府机关
   4. int，国际组织
   5. mil，军事站点
   6. net，网络
   7. org，其他组织
2. 国家（地区）域，2个字符长度
   1. cn，中国大陆
   2. tw，中国台湾

6.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311439584.png)



1. 递归查询
递归查询是一种DNS 服务器的查询模式，在该模式下DNS 服务器接收到客户机请求，必须使用一个准确的查询结果回复客户机。如果DNS 服务器本地没有存储查询DNS 信息，那么该服务器会询问其他服务器，并将返回的查询结果提交给客户机。

2. 迭代查询
DNS 服务器另外一种查询方式为迭代查询，DNS 服务器会向客户机提供其他能够解析查询请求的DNS 服务器地址，当客户机发送查询请求时，DNS 服务器并不直接回复查询结果，而是告诉客户机另一台DNS 服务器地址，客户机再向这台DNS 服务器提交请求，依次循环直到返回查询的结果。

1. 知识点
   1. hosts文件：以静态映射的方式提供IP地址与主机名的对照表，类似ARP表
   2. 域：abc.com是一个域，它可以划分为多个区域，如abc.com和xyz.abc.com

3. 假设www.abc.com的主机要查询www.xyz.abc.com的服务器ip地址。

（1）递归查询

1. 1. 第一步：在hosts静态文件、DNS解析器缓存中查找某主机的ip地址
   2. 第二步：上一步无法找到，去DNS本地服务器（即域服务器）查找，其本质是去区域服务器、服务器缓存中查找
   3. 第三步：本地DNS服务器查不到就根据‘根提示文件’向负责顶级域‘.com’的DNS服务器查询
   4. 第四步：‘根DNS服务器’根据查询域名中的‘xyz.com’，再向xyz.com的区域服务器查询
   5. 第五步：www.xyz.abc.com的DNS服务器直接解析该域名，将查询到的ip再原路返回给请求查询的主机

（2）迭代查询

1. 1. 第一步：在hosts静态文件、DNS解析器缓存中查找某主机的ip地址
   2. 第二步：上一步无法找到，在DNS本地服务器（即域服务器）查找所有本层次的区域服务器
   3. 第三步：本地DNS服务器查不到就查询上一层次的所有区域服务器，以此类推直至根域名DNS服务器‘.’
   4. 第四步：到达根域名服务器后又向下查询，直至查到结果为止。

4. 迭代查询与递归查询结合

1. 递归查询需要经过逐层查询才能获得查询结果，当查询具有许多层次的DNS结构时效率很低，所以一般采用两者相结合的查询方式。
   1. 第一步：在hosts静态文件、DNS解析器缓存中查找某主机的ip地址
   2. 第二步：上一步无法找到，去DNS本地服务器（即域服务器）查找，其本质是去区域服务器、服务器缓存中查找
   3. 第三步：本地DNS服务器查不到就根据‘根提示文件’向负责顶级域‘.com’的根DNS服务器查询
   4. 第四步：根DNS服务器直接将其区域DNS服务器的ip地址返回给本地服务器，而不用再向xyz.com的区域服务器查询。
   5. 第五步：本地DNS服务器将结果返回给请求的主机

2）DNS正向解析

1. DNS正向解析需要建立正向查找区域，正向查找区域是指在DNS域名空间中使用正向查找的区域，正向查找是根据DNS客户端提供的域名解析成IP地址。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311439201.png)



3）DNS添加记录

1. 创建正向查找区域后，为新区域创建主机名为host01的主机记录，主机用于将DNS域名映射到计算机使用的IP地址。

2. 在创建正向查找区域的主机记录时，勾选“创建相关的指针（PTR）记录”，则会在反向查找区域内自动加入相应的指针。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311440772.png)

 

4）DNS反向解析

1. DNS反向解析需要建立反向查找区域，将IP地址解析成域名。

2. 当反向查找区域创建后，要为该区域创建记录指针。该指针用于指向正向DNS域名计算机的IP地址到反向DNS域名的映射。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311440983.png)

 

5）DNS设置转发器

1. 设置转发器

（1）当DNS客户机向DNS服务器发送名称解析请求时，DNS服务器首先尝试自己解析该名称，如果不能解析，DNS服务器会向其他的DNS服务器进行递归查询，此时需要设置本服务器可以使用转发器功能。

（2）当虚拟机需要登录外网/公网时，需要在DNS服务器上配置DNS转发。

6）客户端DNS配置

1. 配置客户端的DNS服务器地址。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311440956.png)



7）DNS工作流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311440337.png)

 

8）DNS服务资源记录

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311440477.png)


9）DNS在FusionAccess中的解析

1. vLB/WI 登录域名

（1）用户登录虚拟机的地址，需在DNS配置登录所需的域名地址。

2. HDC计算机名

（1）用户虚拟机在向HDC注册时，需要通过HDC的域名到DNS上查找相应的IP地址，进行认证。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311441877.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311441640.png)

 


（3）DHCP

AD实际上就是一个信息的数据库，保存账号、密码、组织等等信息；DNS就是域名解析服务将IP和域名关联起好记忆；DHCP就是一个IP管理机构，每台电脑开机的时候，网卡就要在整个网络中广播自己的MAC，DHCP收到以后就会根据规则，分配给电脑相应的IP、掩码、网关、DNS等。

1）DHCP

1. DHCP (Dynamic Host Configuration Protocol)是一种动态的向Internet终端提供配置参数的协议。在终端提出申请之后，DHCP可以向终端提供IP地址、网关、DNS服务器地址等参数。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311442483.png)

 

2）DHCP的必要性

1. 在大型网络中，如果每台终端的地址都是由不同的使用者来分配，那么就很容易出现地址相同的情况。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311442494.png)



2. 在TCP/IP网络上，每台工作站在访问网络及其资源之前，都必须进行基本的网络配置，一些主要参数诸如IP地址，子网掩码，缺省网关，DNS等必不可少，还可能需要一些附加的信息如IP管理策略之类。

3. 在大型网络中，确保所有主机都拥有正确的配置是一件的相当困难的管理任务。

4. 因此，需要有一种机制来简化IP地址的配置，实现IP的集中式管理。而IETF（Internet网络工程师任务小组）设计的动态主机配置协议（DHCP，Dynamic Host Configuration Protocol）正是这样一种机制。

1. 手动的网络配置工作，尤其对于含有漫游用户和笔记本电脑的动态网络更是困难，经常有计算机从一个子网移到另一个子网以及从网络中移出。手动配置或重新配置数量巨大的计算机可能要花很长时间，而IP主机配置过程中的错误可能导致该主机无法与网络中的其他主机通信。

3）DHCP的优点

1. DHCP减少错误

（1）通过配置DHCP，把手工配置IP地址所导致的错误减少到最低程度，例如已分配的IP地址再次分配给另一设备所造成的地址冲突等将大大减少。

2. DHCP减少网络管理

（1）TCP/IP配置是集中化和自动完成的，不需要网络管理员手工配置。网络管理员能集中定义全局和特定子网的TCP/IP配置信息。使用DHCP选项可以自动给客户机分配全部范围的附加TCP/IP配置值。客户机配置的地址变化必须经常更新，比如远程访问客户机经常到处移动，这样便于它在新的地点重新启动时，高效而又自动地进行配置。同时大部分路由器能转发DHCP配置请求，这就减少了在每个子网设置DHCP服务器的必要，除非有其它原因要这样做。

4）DHCP的责任

1. 保证任何IP地址在同一时刻只能由一台DHCP客户机所使用。

2. DHCP应当可以给用户分配永久固定的IP地址。

3. DHCP应当可以同用其他方法获得IP地址的主机共存（如手工配置IP地址的主机）。

4. DHCP服务器应当向现有的BOOTP客户端提供服务。

5. 在桌面云解决方案中，DHCP服务器负责为所有桌面分发网络配置信息。

5）DHCP流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311442895.png)



1. 如果希望DHCP服务器需要对另一个网络中的计算机配置网络，那么需要配置DHCP中继（DHCP-RELAY），用以实现在不同子网和物理网段之间处理和转发DHCP信息的功能。

### 4.桌面云关联组件安装

（1）安装部署

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311443322.png)

 

1. 端口组：
   1. FusionAccess基础架构虚拟机管理平面网卡创建端口组：在搭建虚拟化平台过程中，会自动创建ManagementDVS及VLAN号为0的端口组，管理平面网卡的端口组即设置为该VLAN号为“0”的端口组。
   2. FusionAccess基础架构虚拟机业务平面网卡创建端口组：在搭建虚拟化平台过程中，如果管理平面和业务平面合一，则在ManagementDVS上创建业务平面网卡的端口组（推荐）；如果管理平面和业务平面分离，则在业务分布式交换机上创建业务平面网卡的端口组。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311443937.png)



（2）关联组件安装流程

1）创建Windows基础架构虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311443268.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311444287.png)
 

​             ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311444196.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311444133.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311445537.png)

2）安装AD/DNS/DHCP组件

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311445608.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311445928.png)

 

3）配置AD服务

1. 创建新域

2. 配置域用户及域策略

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311446573.png)

 

4）配置DNS服务

1. 配置DNS正、反向解析

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311446606.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311446585.png)

 

5）配置DHCP服务

1. 设置DHCP作用域，可以将IP地址分发给网络上的计算机

（1）配置IP地址范围

（2）配置路由器（默认网关）

（3）配置租用期限

（4）配置域名称和DNS服务器

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311446052.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311446544.png)



### 5.FusionAccess初始化配置

（1）初始化配置

1. 完成桌面云管理组件和关联组件的安装后，需要登录FusionAccess的ITA Portal界面进行初始化配置。

1. 1. 配置虚拟化环境
   2. 配置域和DNS
   3. 配置vAG/vLB

（2）配置虚拟化环境

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311447813.png)

 

1. 虚拟化环境类型：选择“FusionCompute”。
2. FusionCompute IP：输入VRM节点的浮动IP地址。
3. FusionCompute端口号：输入“7070”。
4. SSL端口号：输入“7443”。
5. 用户名：默认为“vdisysman”。
6. 密码：默认为“VdiEnginE@234”。
7. 通讯协议类型：选择FusionCompute与ITA通讯协议类型，建议设置为“https”。

（3）配置域和DNS

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311447387.png)


1. 域：AD/DNS/DHCP服务器的域名，填写“vdesktop.huawei.com”。
2. 域账号：在AD/DNS/DHCP服务器里创建的域管理员账号，填写“vdsadmin”。
3. 密码：vdsadmin用户的密码，如果按照建议创建的密码，则填写“Huawei@1234”。
4. 主域控制器IP：AD/DNS/DHCP服务器业务平面IP地址，填写“192.168.203.32”。
5. 主DNS IP：AD/DNS/DHCP服务器业务平面IP地址，填写“192.168.203.32”。

**（4）配置vAG/vLB**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311447133.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311447804.png)


1. 服务器IP：vAG服务器业务平面IP地址，填写“192.168.203.31”。
2. 部署类型：虚拟机上部署的组件类型，选择“vAG+vLB”。
3. SSH账户：vAG服务器的维护账号，默认填写“gandalf”。
4. 密码：vAG服务器的维护密码，默认为“Cloud12#$”。

**（5）初始化配置完成**

1. 配置完成进入FusionAccess系统界面

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311448985.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311448083.png)
 

### **6.桌面云组件交互流程**

云客户端（CloudClient）通过访问ITA下载下来，客户端装好后输入IOB的地址后出现一个界面要求我们输入用户名和密码（用户要事先在AD域中创建好（密码都在AD域中做好）。用户必须是在微软域中创建的或已有的用户，然后桌面云为这个用户分配了一个桌面虚拟机），

①SC/TC客户端界面上（访问入口）：输入Username/password

②看见几个电脑图标，选择其中一个进入（弹出桌面列表）。若是只有一台就自动进入。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311448266.png)

 

有一个另一种登录当时自助维护通道（VNC），不是通过IP地址进去，是VNC连到该CNA服务器上通过API接口进入当前虚拟机的管理窗口里去的。

③看： a.启动VM （可选）（running中或启动中）

​    b.启动客户端HDA

​    c.Alt-ctrl-Del（“用户”）它隐含的把我提交给WI的用户名密码拿去尝试了，然后验证（AD）通过了；要是没通过就需要手工输入。

​    d.进入win7系统

**（1）虚拟桌面发放流程：创建、关联虚拟机**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311448255.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311449192.png)

 

入域操作：

①每个虚拟机里面都有一个WinRM服务在运行中，ITA是通过远程管理向WinRM服务发起指令，然后WinRM服务向DB执行加入域的操作。（WinRM服务是Windows系统在电脑里植入的一个用于远程对Windows的一个对电脑做指令控制的，Windows自带。）

②人工入域。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311449631.png)

 

**（2）虚拟机注册流程**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311449155.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311449394.png)

 

**（3）登录流程**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311449901.png)

 

1-10：桌面与系统验证成功              http协议

11-19：桌面list（VM列表）获取，选择         http协议

20-30：预连接  29返回的是Address Ticket,login Ticket  http协议

31-38：真正连接                   HDP协议

39：连接后  HDA向HDC报告登录状态（Connected）

**1）访问WI界面**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311450948.png)

 

vAG/vLB是属于SVN（硬件）的。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311450171.png)

 

登录界面从WI走到了Client。

**2）用户鉴权**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311450566.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311450382.png)


**3）获取虚拟机列表**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311451688.png)

 

**（4）访问虚拟机流程**

**1）预连接 (HDP经过网关)** 

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311451233.png)

 

1. 登录信息包括Address ticket、Login ticket、网关ip和端口。

HDC把IP地址+端口换成Address Ticket来替代，把用户名用login Ticket来替代返回给Client。

**2）HDP经过网关**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311451879.png)

 

过网关（AG），Client收到Address Ticket，由AG将Address Ticket问HDC翻译成IP+port，由AG将HDP定向到IP+port。（适用于外网User访问内网的VM）

**3）预连接 (HDP不经过网关)** 

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311451798.png)


Login Ticket:用于登录的凭证

**4）HDP不经过网关**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311451775.png)



1. 登录信息包括Login ticket、网关ip和端口。

不过网关（AG），Client直接得到IP+port+login Ticket，Client向HDA所在的桌面VM发送请求。（适用于内网（企业网内）User访问内网的VM）

内网到内网也可以经过AG，但是外网到内网必须经过AG。



场景1：HDP过AG（网关）

​    适用于：用户在WAN（公网）上，而HDA在私网，所以用户不能/无法和桌面VM相通。（外网用户访问内网桌面虚拟机）

场景2：HDP不过AG

User（Client TC/SC）和HDA桌面VM可以路由相通。（内网）



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311452297.png)

 

如何知道有没有通过AG？

在HDA里面用netstat –a –n命令，查看里面有没有Client的地址，如果有AG的地址，说明通过了AG。

如何知道谁是AG的地址？

进入ITA，在里面查看即可。

## **（三）FusionAccess桌面云业务发放**

虚拟桌面技术中最重要的就是克隆技术，它实现了从一个模板批量部署大量桌面的功能，克隆技术主要可分为完整复制和链接克隆两种，根据不同需求，又衍生出了全内存和快速封装两种。

### **1.克隆技术**

**（1）克隆技术产生背景**

1. 虚拟桌面技术实现了办公桌面的批量发放和运维，简化企业IT管理。其中最重要的就是克隆技术，利用克隆技术，管理员可以很方便地根据一个源虚拟机（模板（文件））克隆出一个或多个克隆虚拟机，且克隆虚拟机拥有与源虚拟机完全相同的操作系统、应用系统乃至数据和文档，克隆功能给管理员在IT管理和运维上带来了极大的便利。

2. 克隆技术主要可分为完整复制和链接克隆两种，根据不同的需求，又衍生了快速封装和全内存另外两种。

模板怎么来的呢?

 答：给虚拟机装好系统、装好软件后，用专用工具对其做处理，选择生成哪种模板就制作成了不同的模板。

**（2）完整复制**

**1）完整复制虚拟桌面**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311715768.png)

 

完整复制的虚拟机都有自己独立的系统盘。

虚拟机数量越多，所需要的数据存储的磁盘文件就越大。

**2）完整复制原理**

1. 完整复制虚拟机指直接根据源虚拟机（即普通虚拟机模板），完整创建出独立的虚拟机。在该方式下，创建出来的虚拟机和源虚拟机是两个完全独立的实体，源虚拟机的修改乃至删除，都不会影响到复制出来的虚拟机的运行。

**3）完整复制优缺点**

1. 优点：每台虚拟机都是独立的个体，用户对虚拟机上数据的变更（如安装软件）可以保存。

2. 缺点：源虚拟机（模板虚拟机）和目标虚拟机（克隆出的虚拟机）分别占用独立的CPU、内存、磁盘资源，当需要对虚拟机的软件进行维护（如升级软件、更新软件病毒库等）时，需要对每台虚拟机进行操作。

**（3）快速封装虚拟桌面**

根据完整复制演化出来的。所以它生成的VM有自己的独立系统盘。

1. 方案原理说明

（1）不采用sysprep封装，而是由虚拟机里的应用程序改名和加域。

（2）完整复制和快速发放并无本质区别。

2. 优点

（1）相对于完整复制模板，使用快速封装模板发放虚拟机速度更快，效率更高。

**（4）链接克隆**

**1）链接克隆虚拟桌面**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311715526.png)


1. 技术特点
   1. 相同OS多个客户虚拟机共享同一母镜像，母镜像可统一升级、维护。
   2. 每个客户虚拟机保存虚拟化镜像差异化部分
   3. 可以实现关机自动还原
   4. 降低存储成本60%
   5. 创建单个链接克隆虚拟机仅需12秒 （测试数据）
2. 适用场景
   1. 任务型桌面，或只有个性化数据、但没有个性化程序的场景（可以拥有临时性个性化程序，但母镜像更新后会丢失）

**2）链接克隆原理**

1. 链接克隆是一种通过将链接克隆母卷和链接克隆差分卷组合映射为一个链接克隆卷，提供给虚拟机使用的技术；其中链接克隆母卷为只读卷，多个链接克隆虚拟机共用一份。

2. 链接克隆差分卷是读写卷，其存储是精简配置的，每个链接克隆虚拟机一份，保存了每个虚拟机差异化的数据。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311715603.png)

 

1. 链接克隆技术具有创建速度快、占用存储空间小的优点，非常适合于同质化用户、桌面高度标准化场景。
2. 由于系统母盘是很多桌面共用的，所以对于系统母盘需要很高的读性能。

**3）链接克隆的优势**

1. 管理员可以统一对链接克隆虚拟机进行系统升级、系统补丁、安装新软件。

2. 共用系统母盘，创建虚拟桌面减少系统盘的复制过程。（共用存储，节省空间）

3. 链接克隆的差分盘，保存用户工作的临时系统数据，只要把虚拟机关闭，差分盘就可以自动清除。

4. 通过与Active Directory配合，可以满足保存用户的个性化配置及个性化数据要求。

1. 只需要通过把原链接克隆模板克隆为虚拟机，再启动该虚拟机，进行相关系统更新后，再把此虚拟机转为模板，使用“更新虚拟机组软件”功能，即可完成系统母卷的更新；对IT系统运维和安全带来极大便利，对IT系统稳定性提供较好保障。
2. 使用链接克隆桌面的用户，如果有保存个性化配置及个性化数据的要求，则可以通过在Active Directory上为这些用户规划配置Profile重定向或文件夹重定向的方式来满足。其重定向保存的位置，可以是远程文件服务器目录、或网盘、或链接克隆桌面本身带的数据盘。其中，保存在远程文件服务器目录、或网盘中的个性化配置及个性化数据具有漫游能力，能随用户登录漫游到对应的桌面中。

5. 支持系统还原。

**4）链接克隆的价值**

1. 基于链接克隆，能帮助客户提升效率、节约成本：

（1）只需秒级就能完成虚拟机的快速创建，缩短了发放时间，提高了虚拟机的发放效率。

（2）节省大量的存储空间，从而使企业的IT成本更低。

（3）提高维护管理效率，可以很方便的对链接克隆虚拟机进行统一的系统更新与打补丁等操作，节约后期维护成本。

**5）模板、母卷与差分卷**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311715393.png)


1. 如上图所示，如果一个链接克隆模板为30G，在数据存储1上创建链接克隆VM时，会自动复制模板，在数据存储1上产生一个A母卷，大小也为30G，再以A母卷为基础，自动快照为每个VM创建差分卷；当A母卷上创建的差分卷个数达到128个时（规格限制一个母卷最多产生128个差分卷，防止每个母卷所在存储块区域在VMs都运行的情况下I/O压力过高），系统会自动在该数据存储1上产生一个新的B母卷，为其它链接克隆VM创建新的差分卷，以此类推。（并且这个128个链接克隆出来的虚拟机不能跨数据存储）
2. 系统为每个VM创建的差分卷，是精简配置的存储（瘦分配），最初大小接近于0，但差分卷最终要保存数据，每个差分卷最小存储预估大小不能小于3G，最大不会超过模板大小，一般根据链接克隆的使用场景以及还原频率，平均预估5G、10G、12G不等。
3. 从上图也可以看到，母卷、差分卷是必须在同一数据存储上；模板与母卷、差分卷可以不在同一数据存储上；只能在支持精简配置（瘦分配）的数据存储上，才能创建链接克隆VM。

数据存储=公共模板（30G）+n（链接克隆出的虚拟机个数）*差分盘

链接克隆模板就是用来生成母盘/卷的

问1：

（1）有一个链接克隆模板template（模板文件）在数据存储1上，有3个链接克隆的VM（1、2、3）也在数据存储1上，请问还需要生成母卷吗？

答：需要，生成的母卷用来做3个VM的系统盘。

（2）如果有一个数据存储2，在其上创建了3个链接克隆的VM（4、5、6），数据存储1上的链接克隆模板生成一个母盘在数据存储2上，做为这3个VM的系统盘。

（3）在前面的前提下，我想创建第7个链接克隆的VM（7），把这个虚拟机的磁盘落在数据存储1上，那么它的就自动连上了数据存储1上已有的母盘了。（因为母盘1没有达到128个差分磁盘）

（4）在数据存储1上创建第8个链接克隆VM（8），它会自动连上已有母盘1.

问2：创建的1、2、3、7、8号VM，它们的创建速度如何？

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311716200.png)


VM1时间长，VM2和VM3一样时间短。

**6）链接克隆存储规划**

1. 存储子系统设计从容量和IOPS两个维度设计。

2. 存储容量维度

（1）总硬盘数 = (Roundup(总人数 / 128, 0) * 母盘大小 + 总人数 * 差分盘大小) / 每盘有效容量 * 热备盘率

3. 存储IOPS维度

（1）总硬盘数 = (总人数 * (母盘IOPS + 差分盘IOPS)) / 每盘有效IOPS * 热备盘率

1. 1. 存储容量维度
   2. 注1：每个母盘最大支持128个VM共用；差分盘大小需根据具体应用场景来估计
   3. 注2：每盘有效容量，需根据磁盘的实际容量以及所组成的RAID组两方面来考虑，一般的：每盘有效容量 = 磁盘容量 /（1.024 ^ 3） * 对应RAID组有效容量比，常见的RAID组有效容量比的计算方式如下：
      1. RAID5：N块盘组成，总有效容量为N-1块盘实际容量之和
      2. RAID5有效容量比 = (N-1) / N
      3. RAID10：2N块盘组成，总有效容量为N块盘实际容量之和
      4. RAID10有效容量比 = N / 2N = 0.5
   4. 注3：热备盘率 ＝ 1 + (为RAID组配的热备盘个数 / 该RAID组磁盘个数)，譬如11个磁盘组成一个RAID组，为此RAID组配了1个热备盘，则热备盘率=12/11
2. 存储IOPS维度
   1. 注1：每盘有效IOPS，需根据磁盘的极限IOPS、具体应用场景中写IO所占比例以及所组成的RAID组几方面来考虑，常见RAID组下的每盘有效IOPS计算方式如下：
      1. RAID5中每盘有效IOPS = 单块磁盘的极限IOPS / (1 + 3 * 写IO所占比例)
      2. RAID10中每盘有效IOPS = 单块磁盘的极限IOPS / (1 + 1 * 写IO所占比例)
   2. 注2：对于单块磁盘的极限IOPS，不同的磁盘类型，其极限值不同，常见的如下：
      1. SAS磁盘的极限IOPS为200
      2. SATA磁盘的极限IOPS为60
   3. 注3：对于系统盘不要使用NL-SAS/SATA类磁盘（含IPSAN中通过分级存储使用此类磁盘的场景）。

2. 存储计算举例

（1）设链接克隆母盘大小为40G，母盘IOPS为2，差分盘的大小5G，差分盘IOPS为3；采用300G的SAS盘，组成RAID10，VDI应用场景的写IO占70%，则：

（2）每个300G SAS盘的有效容量 = 300 / (1.024 ^ 3) * 0.5 = 139G。

（3）每个SAS盘的有效IOPS = 200 / (1 + 1 * 70%) = 117。

（4）计算500链接克隆VM需要多少硬盘数？

（5）（容量维度）总硬盘数= ((Roundup(500 / 128, 0) * 40 + 500 * 5) / 139) * 12 / 11 = 22。

（6）（IOPS维度）总硬盘数= (500 * (2 + 3)) / 117 * （12 / 11） = 24。

（7）故结合容量和IOPS维度，500链接克隆虚拟机最少需要24块300G的SAS盘。

**7）链接克隆适用场景-公共阅览室**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311716014.png)


1. 电子阅览室场景中，用户只需要登录和使用虚拟机，阅览所需要的软件提前安装在镜像中，业务比较简单。电子阅览室主要有如下特点：
   1. 可以上网，网络传播的病毒、木马、防不胜防。
   2. 人员流动性大，虚拟机无需经常关机。
   3. 需要支持外接U盘。
   4. 维护简单，提高工作效率。
2. 此场景对存储的要求也不高，有安全威胁，非常适用链接克隆虚拟桌面。链接克隆共用一个只读的系统母盘，母盘中预装了电子阅览所需要应用软件，不会感染病毒、木马。用户登录使用时，上网、浏览产生的临时数据保存在差分盘中，即使差分盘中了病毒木马。只需要对虚拟机进行重启，差分盘即可清除，还原到系统的初始状态。管理员要对虚拟机需要升级、打补丁，只要更新母盘即可。
3. 为提高资源复用率，可使用以动态多用户方式（Pool）分配给用户。每个TC绑定固定的虚拟机账户，开机即可登录使用。流动的用户不用再输入帐户与密码，使用起来非常方便。

**（5）完整复制与链接克隆区别**

1. 链接克隆桌面与完整复制桌面的区别主要在于系统盘的存储上。

（1）链接克隆桌面的虚拟机共享一个相同的系统母盘，每台虚拟机对系统盘的写操作数据（如工作临时缓存数据、个性化配置（C:\User）、临时安装的个性化应用程序（C:\Program Files）等）都保存在自己的差分盘中。并且通过将母盘和差分盘组合映射为一个链接克隆盘作为虚拟机的整个系统盘（即C盘），提供给虚拟机使用。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311717537.png)


1. 对于链接克隆虚拟机，提供了手工强制还原功能，管理员可以强制把链接克隆虚拟机还原到最初状态。提供了系统更新操作，管理员可以统一对链接克隆虚拟机组中的虚拟机进行软件更新操作，完成链接克隆虚拟机的系统母卷更新。

2.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311717420.png)


3. 链接克隆在克隆出虚拟机之前也就是链接克隆成模板时需要加域，所以母盘已经有自己的SID了已经是域中的成员了，再把这个模板创建出虚拟机，这些虚拟机的SID不一样（因为创建出这些虚拟机的时候必须临时分配给它们不同的SID，否则入域会出现问题）。

**（6）完整复制和链接克隆混合场景 - 公司员工日常**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311717469.png)


1. 员工个人办公：完整复制
2. 员工参加会议：链接克隆
3. 会议室桌面的特点：
4. 典型用户：所有使用会议室电脑资源的用户。
5. 场景描述：会议开始前的共享资料准备，会议中的材料共享和演示投影，会议结束清除本地会议材料。
6. 场景特点：
   1. 应用场景单一，主要是资料共享和投影。使用时间短，一般是2～4个小时。
   2. 本地员工一般有自已的私有办公桌面，自己办公点和会议室存在一定的物理距离。
   3. 异地性，出差员工没有办公桌面，临时使用，使用人频繁，需要保证其使用的桌面不保留前一个使用者的数据信息。
   4. 对于本地员工在会议室开会，通过会议室的本地TC可以直接登录自已的私有桌面；开完会直接注销后即可。
   5. 对于出差员工使用的桌面，采用链接克隆桌面，建立一个会议室虚拟桌面资池，以动态多用户方式（动态池）分配给用户。只需要会议室用户组与会议室虚拟桌面池绑定。出差员工每次使用登录时，系统随机分配一个可用的虚拟机，用户注销后，虚拟机被资源池回收，清除会议使用时残留数据。

**（7）全内存桌面**

根据链接克隆衍生出来的。所以它的方式生成的VM共用同一个母盘。

**1）产生背景**

1. 与传统PC相比，VDI将用户的存储资源集中化，一方面提高了存储资源的共享和利用率，但是在一些特定场景下会出现“IO风暴”问题。例如在多个VM进行同时系统启动和登录时，会产生大量突发读IO，是平时IO的几十倍甚至几百倍，这就是我们常说的“启动风暴”或“登录风暴”。

2. 全内存桌面解决方案在此背景下应运而生，充分利用内存介质极高的IO读写性能，采用在线去重压缩技术，将虚拟桌面的存储读写转换为对内存的读写，很好的解决了VDI系统的“IO风暴”问题，大幅提升桌面用户体验。

链接克隆：①对存储进行读写。（母盘和差分盘都在存储中）

②持久化

全内存：①对内存进行读写。（母盘和差分盘都在内存中）

②IOPS大、时延短

③非持久化（掉链就还原了（差分数据丢了））

**2）全内存桌面方案简介**

1. 方案原理说明

（1）采用内存去重压缩和复用技术，将桌面虚拟机的系统盘全部放到内存中，使得桌面虚拟机的磁盘读写操作，转化为内存操作，大幅提升用户的使用体验，超越本地物理机。

（2）支持链接克隆类型/场景的虚拟机，不提供系统盘个性化数据能力；非常适用于学校上机室、电子阅览室等无状态桌面场景。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311717728.png)


**3）全内存桌面方案概述**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311718253.png)


1. 全内存桌面是运用IO Tailor技术，将虚拟机的系统盘数据，进行在线实时去重压缩后，全量放入内存；以此获得极高的读写存储IO性能。放入内存的数据不进行实时持久化，虚拟机关机或者服务器主机重启，虚拟机将恢复到初始状态。适用于如：学校教学、呼叫中心、CI等无状态任务型桌面场景。
2. 全内存桌面方案，每个虚拟机共同拥有相同公共系统模版，差异化的系统数据经过去重处理后保存在一一对应的去重的系统卷中。其中模版备份保存在本地磁盘或共享存储中，供硬件下电后恢复上电时，恢复系统使用。ID盘和应急盘也保存在本地磁盘或共享存储中，分别用于关机还原恢复以及磁盘写满应急使用。全内存桌面支持统一虚拟机模板部署、统一完成模板更新和还原。同时支持动态池和静态池两种部署形态。

**4）方案架构**

1. 带共享数据的全内存桌面方案架构：

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311718258.png)

 

1. 数据盘是D盘，防止主机挂掉然后数据消失，它是持久化的。
2. 一个CNA主机对应一个应急盘。
3. ID盘（IG）是一种备份，如果主机挂掉（注册在AD域中的各个虚拟机的SID都没了，因为它们是随机分配的），所以想要把SID持久化存储的话，就做一个ID盘放在里面。

ID盘解决的问题：用来防止主机每次重启等之后，数据没有了。所以主机重启后，母盘重新复制，虚拟机就会通过AD在ID盘中去查，有数据就可以放进来。

1. 一个虚拟机一个ID盘。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311718026.png)


1. 模板T在数据存储上，然后在数据存储上根据模板创建出一个母盘d，再根据母盘d复制出放在CNA主机内存中的母盘m。
2. 每个数据存储上都有一个母盘文件，但是这些母盘都来自同一个模板T。

**5）内存规划**

1. 业务总逻辑容量=虚拟机数量*（模板母卷大小+单台虚拟机内存）

2. 内存盘容量=（虚拟机数量*业务去重保障系数）+模板母卷大小

3. IO Tailor运行内存≈内存盘容量的10%

4. Dom0内存=Dom0预留+内存盘容量+IO Tailor运行内存

5. Dom0内存=虚拟机数量*单台虚拟机内存*内存复用系数

6. 服务器总内存=（Dom0内存+DomU内存）*（1+服务器内存管理损耗系数）

场景：假设某项目采用全内存桌面部署，虚拟机规格为3G内存，30G系统盘，业务相似度为重，每台物理服务器上需要部署70台虚拟机，那么需要多少内存资源？

   业务总逻辑容量=（70*（30+3））=2310G

   内存盘容量=70*1+30=100G

   IO Tailor运行时内存=

（（100/256）+1）*1128/1024+100/4096*64+2310/4096*8+0.51=10G

   Dom0内存=6+100+10=116G

   DomU内存=70*3*1=210G

   服务器总内存=（116+210）*（1+0.03）=336G

   折算成为16G的内存条，需要21根，则每台服务器上需要插21根16G内存条。

**6）全内存桌面方案优势**

1. 与传统VDI和链接克隆相比，全内存桌面采用的是全盘去重技术，存在以下差异化的优势：

（1）永远在线重删系统数据，最大限度提高存储空间利用率，不存在链接克隆只能去重母卷数据，后续子卷数据无法去重的问题。

（2）没有性能老化的问题，所有系统盘数据始终在内存中，不存在链接克隆会将后续子卷数据保存在存储磁盘中。

（3）全内存桌面采用内存做主存介质，在提升用户体验的同时最大程度减少了用户的存储资源，简化后续运维。

（4）IO Tailor的去重压缩方案（IO优化）针对VDI和内存介质进行专门优化，去重压缩的同时，还保证了数据交互实时性和一致性；并采用高效的空间管理算法解决小块数据存储问题，极大降低内存空间管理消耗。

（5）提供应急磁盘保障机制，确保一旦出现内存空间用尽时（差分盘越来越大）业务不中断。（当内存不足时，把应急盘拿出来用）

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311719540.png)


1. 在VDI系统中，每个用户虚拟机的操作系统（如windows）和应用程序大多相同，因此系统盘数据相似程度非常高。一般的VDI系统中，多个用户的系统盘被重复存放在存储系统中，造成了大量的存储空间的浪费。
2. 全内存桌面特性是将用户虚拟机的系统盘全量放到内存介质中，将内存作为系统盘的存储介质，极大提高了系统盘IO性能，百倍于普通磁盘的性能，很好的解决了“IO风暴”的问题；同时采用基于内存的在线重删和实时压缩技术（简称IO Tailor技术），将多个用户虚拟机的系统盘进行去重压缩，大大缩减了数据占用空间，去重率可达90%以上。
3. 方案优势说明：
   1. 全内存极速桌面除了具备链接克隆桌面的优势，还有极高的读写性能。启动，重启虚拟机都非常快。
   2. 管理员支持统一虚拟机模板部署、统一完成模板更新和还原。
   3. 全内存桌面云创建速度快；支持快速批量创建和发放虚拟机。

**（8）桌面虚拟机类型对比**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311719491.png)


链接克隆和全内存的差别：链接克隆的母盘和差分盘在数据存储中（共享存储-持久化、IO慢），全内存的母盘和差分盘在内存（非持久化、IO快）中。

完整复制与快速封装的差别：

（1）完整复制的虚拟机

1）有不同的SID（进行了系统封装）。

2）未加域

因为进行SysPrep时删掉了SID，所以在创建虚拟机时需要先创建SID后再加域，需要花时间。

（2）快速封装的虚拟机

1）SID全都相同（没有进行系统封装）。

2）加域

因为未进行SysPrep，所以没有删去原有SID，所以已经在域中了，所以时间短。

所以四个模板中，在做成模板时只有完整复制没有入域，所以完整复制慢还有一个虚拟机入域的时间。

### **2.模板制作**

**（1）操作步骤**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311719480.png)


**（2）创建裸虚拟机**

1. 管理员登录FusionCompute，选择“资源池 > 集群 > 创建虚拟机”，创建模板空虚拟机。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311720807.png)


**（3）安装操作系统**

1. 管理员通过VNC登录模板虚拟机，挂载操作系统ISO，安装操作系统。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311720445.png)


2. 管理员通过FusionCompute里虚拟机“挂载Tools”菜单为虚拟机挂载PvDriver安装盘，再通过VNC窗口完成安装。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311720153.png)


**（4）安装系统补丁、应用软件**

1. 管理员安装系统补丁

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311720872.png)

 

2. 管理员根据需要在模板内预装各种应用软件

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311721589.png)


**（5）使用工具制作模板**

1. 使用Administrator帐号登录虚拟机。

2. 将模板工具的ISO文件FusionAccess_Windows_Installer_V100R006Cxx.iso挂载到虚拟机中。

3. 打开光盘文档，双击“run.bat”运行模板制作工具。

4. 单击“制作模板”，按照界面提示完成模板制作。

5. 卸载光驱，关闭虚拟机。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311721482.png)


**1）完整复制**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311721810.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311721332.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311722746.png)   

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311722532.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311722256.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311722224.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311722044.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311723227.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311723206.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311723352.png)



1. HDA组件安装完毕后需要重启计算机。
2. 系统初始化主要内容：
   1. 系统减肥：关闭系统还原、关闭系统休眠，转移虚拟内存页面文件到其  他盘，卸载不用的Windows组件，关闭内存转储
   2. 更改系统硬件驱动：更改系统组策略，更改IDE驱动器及计算机驱动
   3. 增加电源补丁，让系统启动的时候自动检测电源。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311723796.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311723114.png)

 

1. 封装后不要乱运行程序，否则很容易死机，破坏封装环境。

**（6）封装系统**

1. 概念

（1）封装系统，就是把系统制作成镜像的方法刻录到光盘，用在系统安装上面，不同于系统的正常安装，最本质的区别在于系统封装是将一个完整的系统以拷贝的形式打包，然后用粘贴的形式安装在另外一个系统盘上，而正常安装则是通过Setup程序进行安装。

2. 优点

（1）把系统安装的时间缩短N倍，安装系统只需要5-10分钟。

（2）在系统里加入自己喜欢的软件。

1. Windows安装的过程，系统安装到某个步骤，Windows会重启然后进入Windows界面，继续安装后面的Windows组件以及配置网络、用户、CDKEY等，这个过程大概10分钟左右；可以理解系统封装就是把一个装好的系统还原到前面说的这个步骤，这样这个系统再次启动的时候就会重新进行那些组件安装、网络配置之类的初始部署工作。

**（7）封装系统工具 - Sysprep**

1. 特点

（1）从 Windows 中删除系统特定的数据。

（2）将 Windows 配置为启动进入审核模式。

（3）将 Windows 配置为启动进入“欢迎使用 Windows”。

（4）重置 Windows 产品激活。

1. Sysprep 可以从已安装的 Windows 映像删除所有系统特定的信息，其中包括计算机安全标识符 (SID)，然后可以通过组织捕获和安装 Windows 安装。
2. 使用审核模式可以安装第三方应用程序和设备驱动器，以及测试计算机的功能。
3. 将 Windows 安装配置为下次启动计算机时进入“欢迎使用 Windows”，通常，在将计算机交付至客户之前将系统配置为启动时立即进入“欢迎使用 Windows”。
4. Sysprep 最多可以重置 Windows 产品激活三次。

**（8）为什么要进行Sysprep**

1. 微软的操作系统使用安全标识符（SID）对计算机和用户进行识别，对于域管理员来说，分配给计算机账号的叫 Machine SID，分配给用户账户的是用户账户 SID。

2. 当从一台主机克隆出多个PC，或者使用同一虚拟机母板克隆出多台VM之后，其SID势必会相同，在加入域时会造成安全主体的识别混乱和加域失败等。对于同一局域网中，存在相同SID的计算机或账户也可能会导致很多奇怪的问题，特别是权限和安全方面的问题。

使根据完整模板生成的虚拟机可以有不同的信息（SID）。

**（9）使用工具制作模板**

**1）链接克隆**

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311724257.png)         

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311724512.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311724814.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311724676.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311725093.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311725524.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311725267.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311725371.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311725991.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311726568.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311726045.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311726136.png)


**（10）完整复制制作模板和链接克隆制作模板的差异**

1. 完整复制制作模板的过程中

（1）未做加域处理

（2）结束时，做了一个系统封装

2. 链接克隆制作模板的过程中

（1）做了加域处理

（2）没有系统封装

**（11）将虚拟机转化为模板**

1. 在FusionCompute中，选择“资源池”，在待转为模板的虚拟机所在行，右击选择“模板 > 转为模板”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311726785.png)

 

**（12）配置模板**

1. 在FusionAccess界面，选择“桌面管理”，在左侧导航树中，选择“业务配置 > 虚拟机模板”，在右侧窗口中，在待发放虚拟机模板所在行，根据实际应用场景选择参数。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311726107.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311727081.png)


### 3.虚拟桌面发放

桌面组的虚拟机都是已分配的状态，桌面组是对应用户的。虚拟机组就是用哪种模板分配的虚拟机。

虚拟机+用户=桌面组（VRM+AD=FA）

（1）桌面发放概述

1. 目前FusionAccess支持专有分配和池分配两种分配模式：

（1）“专有”指一人一台虚拟桌面，常用于OA办公等场景。

（2）“池”指一群人共用一组虚拟机，无个性化数据，常用于呼叫中心等场景。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311727831.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311727882.png)

 

2. 虚拟机组类型

（1）链接克隆：虚拟机组中的虚拟机可以共享一个系统盘，具有虚拟机创建速度快、软件更新快捷的特点，该虚拟机组类型对应的虚拟机模板类型为“链接克隆”。

（2）完整复制：虚拟机组中的每个虚拟机都分配一个系统盘，该虚拟机组类型对应的虚拟机模板类型为“完整复制”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311728060.png)


1. 注：先了解创建虚拟机时的几个名词，便于于理解后面创建虚拟机
2. 创建虚拟机时，根据不同的场景需创建不同类型的虚拟机分配给不同类型的用户
3. 虚拟机组和桌面组有一定的关系，“链接克隆”虚拟机组对应“动态池”，“静态池”桌面组，“完整复制”虚拟机组对应“专有”桌面组
4. 创建虚拟机时将虚拟机添加到指定的虚拟机组中
5. 分配虚拟机时将虚拟机添加到指定的桌面组中

3. 桌面组类型

（1）池：

1）动态池：“虚拟机组类型”为“链接克隆”，桌面组中用户与虚拟机没有固定的分配绑定关系，但一个用户只能一次使用其中一台虚拟机。

2）静态池：“虚拟机组类型”为“链接克隆”，桌面组在用户首次登录时，会随机分配给用户一台虚拟机与用户绑定，且一个用户只能绑定一台虚拟机。

（2）专有：“虚拟机组类型”为“完整复制”，则该参数为“专有”。专有包括“静态多用户”和“单用户”。

   1）单用户：一台虚拟机对应一个用户。一对一。（完整复制）

  2）静态多用户：一台虚拟机有多个用户共用，用户与虚拟机的关系是固定的。（呼叫中心：比如一天三个时段上班，user1使用0-8点，user2使用8-16点，user3使用16-24点）

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311728592.png)


1. 链接克隆池化桌面支持两种：动态池与静态池。
   1. 动态池，是一组用户对应一个桌面池，用户与桌面池中的VM，不是固定的分配关系；只要是就绪态的VM，每个用户都有可能登录使用其中的一台。
   2. 静态池，是一组用户对应一个桌面池，最开始每个用户与桌面池中的VM没有固定的分配关系，但处于就绪态的VM首次被某用户登录使用后，该用户与此VM的分配关系才固定下来，后续该用户再使用此桌面池中的VM，还是前次登录使用过的那台。
2. 对于链接克隆池化桌面，提供了系统关机自动还原功能，管理员可以根据需要，配置桌面组是否需要支持系统关机自动还原；如果需要支持系统重启自动还原或系统注销自动还原，则需要在做链接克隆模板时，通过修改虚拟机操作系统的策略，把重启、注销操作，转化为关机操作来间接支持。
3. 对应的池化桌面组，提供了虚拟机预启动功能，支持管理员配置在不同高低峰时间段内预启动保持一定数量空闲虚拟机数处于就绪态，来及时响应新用户的登录，既兼顾节能减排，又提升用户体验；另外，池化桌面组还能配置后端备用虚拟机组，当池中桌面不够时，能及时从后端备用虚拟机组中，自动补充虚拟机进来。

（2）桌面发放-快速发放

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311728821.png)


1. FusionAccess提供了快速发放功能，此功能就是通过向导式方法，简化管理员的发放操作难度，通过把桌面发放操作串联起来，管理员只需按照此向导进行操作即可实现批量为用户发放虚拟桌面的目的。

2. “快速发放”操作是以任务的形式来进行的，管理员只需按照操作向导完成任务创建即可，后续操作都是由FusionAccess系统在后台进行，无需管理员再人工干预。

3. 管理员可以在“任务中心”查看快速发放任务的进度，了解任务进展情况。

1）创建虚拟机

1. 第一步，创建虚拟机：

（1）虚拟机组名称

（2）选择模板

（3）存储

（4）网络

（5）指定创建数量

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311729817.png)


2）配置虚拟机选项

1. 第二步，配置虚拟机选项：

（1）虚拟机命名规则

（2）虚拟机名称前缀（可选）

（3）域名称

（4）OU名称（可选）



1. 管理员需要选择必选项，虚拟机命名规则和域；可以根据需要选择OU或者启动Windows激活。

3）分配桌面

1. 第三步，分配桌面：

（1）桌面组名称、类型

（2）分配类型、分配虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311729117.png)


1. 桌面组（完整复制）- 桌面组类型（专有）-分配类型（单用户/静态多用户）
2. 桌面组（链接克隆）- 桌面组类型（静态池/动态池）
3. 管理员为创建好的虚拟机指定用户。

4）确认信息

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311729558.png)


1. 管理员确认选择的参数，分配的人员是否正确，确认后提交即可。

5）完成

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311729647.png)


6）任务查看

1. 管理员可以在“任务中心”查看任务进度，也可以查看任务详情。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311730827.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311730875.png)



## （四）FusionAccess桌面云运维与管理

### 1.概述及常用工具

（1）云桌面运维概述

1. 在华为桌面云解决方案中，运维操作包括如下内容：

（1）登录FusionCompute系统，主要完成基础架构虚拟机的创建、资源池的管理维护、各服务器虚拟机的管理维护。

（2）登录FusionAccess系统，主要完成用户虚拟机业务调整、业务回收、策略管理、账户管理、告警、统计报表、备份和恢复的管理维护。

（3）登录FusionAccess基础架构虚拟机，主要完成系统重启、补丁安装、病毒扫描、备份恢复的管理维护。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311731127.png)

 

（2）FusionCare工具

1. FusionCare是专门为运维准备的工具软件，主要功能有两点，如下：

（1）创建健康检查任务，对桌面云管理节点进行健康检查，并输出健康检查报告，发现系统的潜在问题或风险，给出相关处理建议或最佳实践。

（2）当系统出现问题时，管理员可以创建收集任务，选择日志收集节点，一键式打包收集日志，无需管理员再到每个系统组件上手动收集，提高效率。

自动巡检、诊断工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311732896.png)


（3）vDesk

1）用户体验优化工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311732735.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311732013.png)


**Huawei vDesk** **用户体验优化工具，包含了华为长期对桌面云用户体验优化的经验积累，极大方便提升用户使用桌面云的体验。**

1. 连接诊断工具：当虚拟机无法连接时，使用该工具进行检测并对可修复的选项进行自动修复。

2. 日志收集工具：一键式收集虚拟机的日志用于问题定位。

3. 华为外设助手：

（1）策略自检（自动检测虚拟机当前外设策略，只能识别典型设备重定向方式）

（2）配置指导（显示当前外设配置的重定向方式，提供图文并茂的配置指导）

（3）常规分析（根据不同的重定向方式，提供自动及手动排查结合的常规分析）

（4）深度分析（结合关键日志流程，进行外设问题的一键式深度分析）

2）优化用户使用桌面体验

1. 一键式体验优化

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311732352.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311732924.png)


2. 一键式连接修复

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311733306.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311733380.png)

3. 一键式日志/信息收集

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311733693.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311733165.png)



（4）vTools

联测工具

1）运维管理工具集

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311733683.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311734291.png)
 

**Huawei vTools** **运维管理工具集，华为桌面云维护工具大全，累积华为桌面云长期维护经验总结，极大方便并提升桌面云的日常运维操作。**

2）极大提升管理员效率

1. AD检查工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311734767.png)


2. WI拨测工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311734971.png)

 

3. WI换图工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311734875.png)

 

4. 信息分析工具

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311735892.png)

 

5. 在线搜索

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311735785.png)

 

6. 第三方工具链接

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311735539.png)

 

### 2.云桌面维护任务

本节主要讲述了FusionAccess在日、周、月不同时间点的维护任务，部分任务会有一定的重叠，但一些虚拟机重启操作一定不要在日维护任务中执行。

（1）FusionAccess日维护任务

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736285.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736177.png)

 

1. VIP桌面策略
   1. 资源保障策略
      1. CPU保障优先级
      2. 内存保障优先级 
   2. 实时看护策略
      1. 虚拟机注册状态异常（虚拟机运行中但未注册成功，此情况用户不能正常登陆桌面）
      2. CPU使用率超过80%
      3. 系统盘使用率超过80%
      4. 内存使用率超过80%
      5. 虚拟机关机

（2）组件状态监控

1. FusionAccess Portal入口：“告警监控 > 状态监控”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736523.png)

 

（3）系统告警监控

1. FusionAccess Portal入口：“告警监控 > 系统告警”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736795.png)

 

（4）VIP桌面告警监控

1. 方式一，主动查看： FusionAccess Portal入口：“告警监控 > VIP桌面告警” 。

2. 方式二，告警转邮件，当VIP桌面状态异常时能够实时收到告警邮件。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736180.png)

 

（5）用户虚拟机状态监控

1. FusionAccess Portal入口：“统计报表 > 虚拟机信息”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311736126.png)

 

（6）用户使用虚拟机状态统计

1. FusionAccess Portal入口：“统计报表 > 用户使用信息”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311737892.png)



（7）网关状态监控

1. FusionAccess Portal入口：“统计报表 > vAG信息 > 基本信息”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311737300.png)

 

（8）FusionAccess周维护任务

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311737169.png)

 

（9）用户虚拟机重启

1. 建议用户虚拟机每3-5天重启一次，持续运行不要超过1周。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311737099.png)


（10）FusionAccess月维护任务

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311737593.png)

 

（11）系统补丁更新、病毒扫描

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311738033.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311738016.png)


### 3.运维注意事项

（1）禁用操作概述

1. 在维护FusionAccess时，禁止进行下表所示的操作，否则可能会给设备的正常运行带来致命危险。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311738885.png)


（2）禁用操作

1）进程服务类

1. 禁止更改msconfig系统配置中默认的服务和启动选项。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311738898.png)

 

2. 禁止禁用HDP类服务；禁止卸载相关运行必备的软件

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311739238.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311739783.png)


3. 禁止在任务管理器中禁用以下进程：

（1）Local service

（2）Network service

（3）System

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311739747.png)

 

2）网络

1. 禁止禁用VM网卡，禁用或修改网络配置。

2. 禁止执行修改路由的脚本或命令，如route DELETE。

3. 禁止在Windows防火墙例外选项中删除以下端口：28511、285512、28521、28522。

4. 禁止打开Ipsec等具有禁止网络流量功能的软件或工具。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311739563.png)

 

3）其他禁用操作

1. 禁止删除C:\Program Files\Huawei目录下的文件和文件夹。

2. 禁止对VM执行睡眠操作，VM默认不启用睡眠操作。

3. 禁止修改HDP客户端（Access Agent）配置文件。

4. 禁止运行优化软件对注册表进行清理和优化。

5. （慎用操作）自定义安装具有复杂变换功能的屏保，该操作会消耗大量系统资源，用户重新进入VM桌面时会有一定的延迟。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311740186.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311740140.png)


（3）高危操作

1. 在维护FusionAccess时，为了确保系统的安全性和稳定性，还需注意下表所示的高危操作。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311740233.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311740744.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311741333.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311741110.png)



### 4.业务调整

（1）修改虚拟机规格

1. 在FusionAccess的“桌面管理 > 所有计算机”中找到将要修改的虚拟机，点击关闭虚拟机，等待虚拟机状态为“已停止”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311741437.png)

 

1. 用户在使用虚拟桌面过程中，出现性能不够情况，管理员可以对虚拟桌面进行规格调整。

2. 选中已关机的虚拟机，选择“高级功能 > 修改虚拟机”，进入虚拟机规格修改界面，修改结束后重启即可。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311741377.png)



（2）追加虚拟机用户

1. “分配类型”是“静态多用户”的虚拟机才能进行追加用户操作。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311741162.png)

 

1. 华为桌面云系统在使用过程中，需要一台虚拟机分配给多个用户使用时，管理员需要对虚拟桌面追加虚拟机用户。
2. “静态多用户”分配类型:
   1. 如果用户A已登录到某台虚拟机，用户B无法再登录到此虚拟机。
   2. 如果用户A登录使用某台虚拟机后，断开虚拟机连接但未注销用户，此时用户B也可登录此虚拟机，但登录时会强制注销用户A。
   3. 静态多用户”分配方式下，多个用户共享同一台虚拟机，用户保存的资料可被其他用户访问，请不要在虚拟机中保存个人敏感数据。
   4. 在池桌面场景下，如果将池桌面分配给用户组A，为了保证A中所有用户登录成功，A中的所有用户必须直接属于用户组A。
   5. 例如：用户a隶属于A部门，同时A部门隶属于C部门，如果池桌面分配给A部门，则用户a可以正常登录池桌面，如果分配给C部门，则用户a无法登录池桌面。

2. 添加的用户为AD服务器中存在的用户，并且需与创建虚拟机用户时设置的“用户登录名”保持一致，多个用户帐号之间使用英文逗号隔开，例如“vdesktop\User01,vdesktop\User02,…”。

3. 追加用户所属的权限组，若模板制作过程中配置“Users”权限组，此处才可设置“Users”组，否则只能设置“Administrators”权限。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742884.png)

 

（3）追加虚拟机

1. 虚拟机添加到虚拟机组

（1）在虚拟机组管理界面，选中列表中待添加虚拟机的虚拟机组，点击“添加虚拟机”，填写虚拟机的规格信息即可完成添加。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742730.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742464.png)

 

1. 一些用户当有多台虚拟桌面使用需求时，管理员需要对该用户追加虚拟机。

2. 在桌面组中分配虚拟机

（1）在桌面组管理界面，选中列表中的桌面组，单击“分配虚拟机”，配置完虚拟机命名规则、分配类型、虚拟机组、用户以及权限等信息即可完成分配。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742147.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742174.png)

 

（4）普通用户升级为VIP

1. 只有已分配的完整复制、链接克隆虚拟机才能升级为VIP桌面。

2. VIP桌面的资源保障和实时看护策略针对FusionAccess系统中所有的VIP虚拟机，推荐保持为默认值。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311742305.png)

 

1. 在普通办公场景下，所有虚拟机的资源请求优先级相同。在一些特定场景下，部分虚拟桌面需要优先保障资源供给，此时可将普通桌面升级为VIP桌面，并提供CPU、内存资源的保障，以及虚拟机状态的实时看护，让用户享受更优质的桌面使用体验。管理员可根据实际诉求便捷的将普通桌面升级为VIP桌面。

（5）虚拟桌面迁移

1. 在FusionAccess中，进入“桌面管理 > 所有计算机 > 虚拟机”，找到将要迁移的虚拟桌面，复制虚拟机ID。

2. 在FusionCompute中的“资源池”界面，通过虚拟机ID查找到要迁移的虚拟机，点击“迁移”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311743431.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311743935.png)

 

1. 管理员需要对桌面云的某台服务器进行下电维护的时候，要把该服务器上虚拟桌面迁移到其他服务器上。
2. 将一正在运行的桌面虚拟机迁移到其它服务器节点，不中断业务。

3. 在FusionAccess界面，可以看到桌面虚拟机运行状态为“迁移中”，登录状态仍为“使用中”。

4. 登录到迁移的桌面虚拟机上，整个迁移过程中ping网关的状态都是正常，业务没有受到影响。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311743289.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311743209.png)

 

（6）设置用户接入控制策略

1. 用户接入控制策略主要包括：

（1）基于时间段的访问控制策略

（2）设备与用户绑定

（3）TC与计算机绑定

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311743711.png)

 

1. 在普通模式下，无需设置用户接入控制策略对用户虚拟机进行接入限制和控制。当在信息安全级别高的场景下，即企业从安全角度出发，要求保护部分虚拟机中的敏感信息时，可以通过设置用户接入的控制策略，限制用户访问接入虚拟机的时间、IP地址、用户帐号和访问地点等，限定了用户只能在固定地点或固定时间段或通过固定终端访问固定虚拟机，从而保证了虚拟机中信息的安全性。
2. 用户接入控制策略主要包括：
   1. 基于时间段的访问控制策略：管理员可根据需要设定多个时间段，并指定在这些时间内禁止某些对象登录虚拟机。
   2. TC绑定：配置用户和TC的绑定关系，用户只能使用绑定的TC才能登录虚拟机，非指定的TC将无法访问虚拟机，从而保证了虚拟机中敏感信息的安全性。管理员可将用户或TC分组，实现用户组和TC组的批量绑定，简化管理员的录入操作。

（7）解分配虚拟桌面

1. 在FusionAccess的虚拟机列表中，勾选待解分配的一台或多台虚拟机，单击“解分配”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311745746.png)

 

1. 当用户对某个虚拟桌面不使用时，管理员要及时的进行解分配。
2. 分配类型为“单用户”和“静态多用户”的完整复制类型虚拟机解分配后将自动关闭。

（8）恢复分配虚拟桌面

1. 在FusionAccess的虚拟机列表中，选中状态为“已解分配”的虚拟机，点击“高级功能”，选择“恢复分配”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311746285.png)

 

1. 当用户确认要再使用一些虚拟桌面时，需要对已解分配的虚拟机进行恢复分配。
2. 分配类型为“单用户”的完整复制类型虚拟机解分配后还可以通过“高级功能 > 恢复分配” 再分配，但只能分配原用户且用户组权限保持不变。虚拟机解分配后再恢复分配，把虚拟机启动后，WI上虚拟图标变亮后，等待3分钟后登录。
3. 分配类型为“静态多用户”的完整复制类型虚拟机解分配后不可以再分配。

（9）还原虚拟桌面系统

1. 强制将链接克隆虚拟机的系统还原到初始状态。

2. 只有“运行状态”为“运行中”或“已停止”，“分配状态”为“已分配”并且“登录状态”不为“使用中”的链接克隆虚拟机，才允许进行还原系统的操作。

3. 可以针对单台虚拟机、虚拟机组或桌面组进行还原。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311746739.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311746621.png)

 

1. 当用户使用过程中，需要对虚拟桌面进行系统盘还原时，会使用到此功能。
2. 还原系统盘后，链接克隆虚拟机的只保留数据盘的数据，系统盘的数据（如桌面，收藏夹等）会丢失，如果需要这些数据，请提前通知用户备份。

### 5.业务回收

（1）回收单用户桌面

1. 第一步，解分配

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311749578.png)


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311749845.png)

 

1. 对不使用的虚拟桌面进行回收，有利于资源的合理利用和功耗节能。

2. 第二步，删除虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311750673.png)

 

1. 删除分配给用户的“单用户”类型的虚拟机，删除后，该用户将无法访问桌面资源。

（2）回收静态多用户桌面

1. 勾选“分配类型”为“静态多用户”的虚拟机，选择“高级功能 > 删除用户”。

2. 将要删除的用户从“已存在的用户”移动到“需要删除的用户”中。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311750252.png)

 

1. 用户从分配类型为“静态多用户”的用户群组中删除，删除后，该用户将无法访问桌面资源。

（3）回收动态多用户桌面

1. 桌面组类型为静态池

（1）虚拟桌面解分配

（2）删除虚拟机

（3）AD中将用户从用户群组里删除

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311750061.png)

 

1. 桌面组类型分为动态池和静态池，动态池和静态池统称为池模式。
2. 池模式对应的用户分配类型即为动态多用户。

2. 桌面组类型为动态池

（1）AD中将用户从用户群组里删除

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751775.png)

 

### 6.策略管理

（1）策略管理

1. 根据各终端用户的实际环境及特有需求，对某一桌面组中的所有虚拟机、某一台虚拟机或某个用户拥有的虚拟机在以下几个方面进行应用策略的定制及规划，创建出满足用户真实需求的最优、最高效的策略管理方案，帮助用户更好的使用虚拟机。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751338.png)

 

1. 策略管理主要包含：外设、音频、Flash、多媒体、客户端、显示、文件和剪切板、接入控制、会话、带宽、虚拟通道、水印、键盘鼠标、通用音视频旁路、个性化数据管理、自定义

（2）策略管理应用场景

1. 创建音频典型场景配置：

（1）在工作、会议等重要场合，需要关闭音乐、游戏等娱乐方面的录音和播音功能时，“音频重定向”可以选择“已禁用”。

（2）教育场景下的电教室，需要统一设置合理音量时，才需要设置“播音设置音量”。

2. 创建显示策略场景配置：

（1）对于需求高清晰的桌面环境，修改“显示 > 显示策略等级 > 展开高级设置”中的带宽、有损压缩识别阈值、有损压缩质量等参数。

（2）对于需求视频播放流畅场景，采用服务端解码方式播放视频，包括本地视频和网络视频，本地视频播放开启多媒体重定向方式，网络视频播放开启Flash重定向方式。

（3）策略管理实践-文件重定向

1. 登录FusionAccess，进入“桌面管理 > 策略管理”，点击“创建策略组”。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751747.png)

 

2. 第一步，创建策略组。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751066.png)

 

2. 第二步，定制策略。


![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751483.png)


3. 第三步，策略应用对象。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311751137.png)
 


4. 验证结果：

（1）使用用户vdsuser登录虚拟桌面，打开“此电脑”，查看本地客户端磁盘驱动器是否重定向到虚拟桌面中。

（2）从客户端驱动器中任意复制一个文件，将其粘贴到虚拟桌面用户驱动器中。检查是否可以成功操作。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311752871.png)

 

### 7.账户管理

（1）更改账户密码

1. 系统中涉及的所有帐号的密码均需要定期修改，建议修改周期为三个月。

（1）FusionAccess系统帐号

（2）域管理账号

（3）组件服务器帐号

（4）访问数据库的帐号

（5）FTP帐号

（6）ITA北向接口帐号

（7）WI北向接口帐号

（8）虚拟机镜像模板中的本地帐号

1. “FusionAccess系统”帐号
   1. FusionAccess Portal默认的登录帐号，拥有ITA系统的管理员帐号的权限。
      1. 用户名：admin 密码：Cloud12#$
2. 域管理帐号
   1. 域管理员帐号，该帐号在AD域控上创建，需在FusionAccess Portal上配置。用户名：安装时设置，例如vdesktop\vdsadmin 密码：安装时设置
3. 组件服务器帐号
   1. Linux服务器root帐号：用于各组件（除GaussDB）程序的安装，该帐号已经被禁止用于SSH登录。
      1. 用户名：root 密码：安装时设置
   2. 用于SSH登录Linux服务器时使用，启动和停止vAG/vLB、WI、HDC、License、ITA、Backup Server的服务。
      1. 用户名：gandalf 密码：Cloud12#$
   3. 安装、启动和停止GaussDB数据库时使用的帐号。
      1. 用户名：gaussdba 密码：Cloud12#$
4. ITA北向接口帐号
   1. ITA对外提供的北向接口认证默认帐号，可通过该帐号访问ITA北向接口。
      1. 用户名：systemman 密码：激活FusionAccess ITA systemman设置的密码

1. 访问数据库的帐号
   1. GaussDB数据库管理员帐号，拥有数据库管理员权限，可远程登录数据库。
      1. 用户名：fauser 密码：Cloud12#$
   2. 用于安装过程的初始帐号，拥有数据库管理员权限，但无法进行远程登录数据库。
      1. 用户名：gaussdba 密码：Cloud12#$
   3. ITA访问ITA数据库的帐号，GaussDB中ITA数据库实例的帐号权限。
      1. 用户名：安装时设置，例如ITALoginUser 密码：安装时设置
   4. HDC访问HDC数据库的帐号， GaussDB中HDC数据库实例的帐号权限。
      1. 用户名：hdcdbuser，安装DB数据库时设置的默认值 密码：Cloud12#$
2. FTP帐号
   1. 备份服务器FTP服务上传备份数据时的帐号。
      1. Backup Server默认用户名：ConfBack_user，默认密码：Cloud12#$
      2. 第三方FTP备份服务器，由用户自行设置。
3. WI北向接口帐号
   1. WI对外提供的北向接口认证默认帐号，可通过该帐号访问WI北向接口。
      1. 用户名：WI配置时设置，默认：WIRestUser，可更改 密码：WI配置时设置的密码

（2）修改账户锁定阈值

1. 在基础架构域AD服务器上编辑组策略中的帐户锁定阈值。

2. 从安全角度考虑，为了防范帐户无限制的尝试登录访问，需要对FusionAccess组件的服务器帐号设置登录失败尝试次数的限制。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311752018.png)

 

### 8.安全管理

（1）安全方案总体架构

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311752290.png)


1. 分层简要介绍如下：
2. 云平台安全
   1. 数据存储安全 从隔离用户数据、控制数据访问、保护剩余信息、存储数据的可靠性等方面保证用户数据的安全和完整性。
   2. 虚拟机隔离 实现同一物理机上不同虚拟机之间的资源隔离，避免虚拟机之间的数据窃取或恶意攻击，保证虚拟机的资源使用不受周边虚拟机的影响。终端用户使用虚拟机时，仅能访问属于自己的虚拟机的资源（如硬件、软件和数据），不能访问其他虚拟机的资源，保证虚拟机隔离安全。
   3. 网络传输安全 通过网络平面隔离、引入防火墙、传输加密等手段，保证业务运行和维护安全。
3. 接入与管理安全
   1. 运维管理安全 从帐号、密码、管理员和用户权限、日志等方面介绍日常管理方面的安全措施。
   2. 终端安全 包含终端自身安全、接入云计算时对终端进行SSL证书校验等方式保证终端安全。
   3. 接入控制安全 系统管理员和用户接入进行认证，对通过AD域、指纹、USBKey、VNC等认证方式接入的用户进行认证，保证接入安全。
4. 除上述安全方案外，还通过修复Web应用漏洞、对操作系统和数据库进行加固、安装安全补丁和防病毒软件等手段保证各物理主机的安全。

（2）TC加固，防止“病从口入”

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311753466.png)

 

**瘦终端采用精简的OS固件，系统更为安全可靠**

（3）终端接入安全认证

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311753092.png)



1. 1、TC开机后检测到自身没有证书后，可自动向TCM申请证书，TCM通过从TC搜集到的信息自动到CA申请证书；TCM获取CA签发的证书后，自动下发证书到TC上。整个TC证书获取过程无需用户参与，且能保证每个TC都能根据自身信息获得与其他TC不同的证书；
2. 2、TC检测自身有证书后，自动发起到交换机的基于EAP-TLS的802.1x的双向证书认证，交换机会将认证信息通过Radius协议转发到AAA服务器处理。证书认证失败的TC将不会获得接入网络的权限；
3. 3、除了支持EAP-TLS的双向证书认证外，TC还可支持基于EAP-MD5的用户名密码的802.1x认证。
   1. 802.1x协议是基于Client/Server的访问控制和认证协议。它可以限制未经授权的用户/设备通过接入端口(access port)访问LAN/WLAN。在获得交换机或LAN提供的各种业务之前，802.1x对连接到交换机端口上的用户/设备进行认证。在认证通过之前，802.1x只允许EAPoL（基于局域网的扩展认证协议）数据通过设备连接的交换机端口；认证通过以后，正常的数据可以顺利地通过以太网端口。

（4）终端接入安全-固定TC接入

1. 桌面云管理员可以通过在ITA界面开启TC绑定功能，并录入TC MAC和用户的绑定关系

2. 支持手工录入和批量导入两种录入方式

3. 被绑定到固定TC的桌面用户，只能从被绑定的TC登录WI，而无法使用其他TC登录桌面。

方式一：手工录入

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311753739.png)



方式二：批量录入

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311753614.png)

 

1. 固定TC接入：通过在TC MAC地址/MAC地址组与域用户/域用户组之间建立绑定关系，实现指定域用户/域用户组成员从固定TC/TC组接入桌面。固定TC接入可以和WI任何一种认证方式同时使用。
2. 指定IP段接入：支持配置客户端IP段访问权限，禁止用户从非指定IP段登陆，IP段包含IP地址和子网掩码。
3. 应用场景：在信息安全要求高的场合，只允许特定用户从固定地点的TC登录包含敏感信息的虚拟桌面，以避免敏感信息在其它地方被查看。

4.

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311753473.png)

 

（5）数据集中管理，终端侧无运行数据

1. 数据分散在每个终端

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754241.png)

 

**操作系统和应用部署在终端，信息在本地保存和运行，容易被病毒攻击、恶意窃取**

2. 应用与数据被集中管理

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754633.png)

 

**终端与信息分离，桌面和数据在后台集中存储和处理，传输到终端的仅是屏幕的刷新信息**

（6）传输通道加密，防止监听窃取

1. 管理Portal over HTTPS

（1）用户通过portal界面的访问传输通道都是加密的

2. HDP over SSL

（1）管理面信任域与非信任域之间全部SSL加密

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754106.png)

 

（7）虚拟桌面外设端口控制

1. HDP协议可以对外设通道独立控制，可灵活实现信息安全

（1）USB本地驱动器

1）支持客户端本地驱动器映射关闭

（2）USB设备控制

1）支持USB端口打开与关闭

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754177.png)

 

**各类端口作为独立的虚拟通道，实现灵活独立的端口控制策略**

（8）用户接入身份认证

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754280.png)

 

（9）认证模式

1）AD认证模式

1. 账号系统统一由AD维护

（1）方便简洁，具备密码重置、虚拟桌面权限配置等AD系统支持的功能

2. 单点登录

（1）用户只要输入一次域账号密码即可登录虚拟机，有效减少账号密码输入次数，提供方便快捷的登录方式

事实上内部访问了两次AD（一次登录桌面云系统、一次登录WI），但是用户体验上只有一次因为只输入了一次用户名和密码。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311754882.png)
 

1. 虚拟机登录时，通过AD认证的流程如下：
   1. 1、用户在WI登录界面输入用户名和密码，进行登录。
   2. 2、WI受到用户登录请求后，向AD发起验证域帐号请求。
   3. 3、AD校验域帐号合法后，将校验结果返回给WI，WI到HDC查询虚拟机列表，并返回给用户。
2. AD登录通常设置为单点登录模式（SSON），在访问WI是输出用户名和密码后，进入虚拟机时，就不必再次输出用户名和密码信息了。

2）非AD认证模式

1. 技术特点

（1）无需AD系统，虚拟机不加入AD域，使用模式类似于物理PC不加入域。

（2）一个虚拟桌面支持与多个账号关联，但需由管理员设置。

2. 约束

（1）不支持链接克隆模式、Pool模式虚拟机（此两种模式需要AD机制）。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311755335.png)

 

3）指纹认证模式

1. 技术特点

（1）指令认证需要和AD用户名和密码认证结合起来使用。用户登录时，需要先输入AD用户名和密码，登录虚拟机时，再输入指纹信息

2. 约束

（1）目前仅支持奔凯指纹仪，其它指纹仪需要定制支持

3. 价值

（1）指纹登录认证利用人的指纹生物特征进行强认证，难以伪造和破解，使用起来更便利

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311755603.png)

 

1. 具体流程说明如下：
   1. 1、指纹仪与云终端连接后，用户在云终端上输入桌面云域名，通过HTTPS方式接入WI，WI向用户提供用户名，密码登录界面。 用户在登录界面出现后输入用户名、密码，传递给FusionAccess。
   2. 2、FusionAccess使用在云终端上读取的用户名、密码向AD请求用户认证。
   3. 3、通过AD认证的用户，WI向HDC查询用户拥有的虚拟机列表，HDC返回用户拥有虚拟机列表给WI
   4. 4、WI返回用户虚拟机列表给用户
   5. 5、用户选择所需登录的虚拟机，FusionAccess向用户选中的虚拟机和用户发送用户连接认证信息。 云终端利用FusionAccess提供的用户连接认证信息登录虚拟机
   6. 6、登录后，虚拟机会要求用户输入指纹信息，用户输入指纹并验证成功后，进入用户桌面。

4）USBKEY认证模式

1。二次登录

1. 优势

（1）USBKey属于智能卡的一种，具有硬件和PIN码双重保护机制，用户只有同时取得USB Key和PIN码，才能登录系统，安全系数非常高

（2）USBKEY移除后，自动中断虚拟桌面连接

2. 约束

（1）TC必须为CT5000和CT6000，TC的操作系统可以为Windows或Linux

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311755779.png)

 

2。单点登录

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311755979.png)

 

1. 单点登录原理为：
   1. 用户登录WI时，WI登录页面会给TC浏览器端下载一个Applet插件，Applet插件通过PKCS11接口和各个厂商的智能卡pkcs11.dll库文件通信，实现对智能卡的操作。
   2. 当用户在Applet插件的PIN码输入框中输入正确的PIN码后，Applet插件会产生一个随机字符串，并发给智能卡的私钥做签名。
   3. 然后Applet会将随机字符串、私钥签名、公钥证书和截获的PIN码发给WI认证，WI认证通过后，从证书中提取出域账号、域的信息，发给AD验证该域账号是否存在，如果存在则将域账号、域名发给HDC，HDC查询虚拟机列表返回给WI，WI再返回给TC浏览器。
   4. 当用户点击一台虚拟机登录时，WI将本地缓存的域账号、域名、PIN码、认证方式的信息发给HDC缓存。用户点击虚拟机登录时，HDA用LoginTicket从HDC换回PIN码，代填到Windows登录的PIN码输入框中，从而实现智能卡的单点登录。

5）智能卡网关认证模式

1. 智能卡网关认证

（1）智能卡网关认证，是第三方安全网关认证模式，不需要借助AD域系统。适合于机密性要求非常高的系统

2. 约束

（1）目前支持卫士通、鼎普、北京CA三种安全网关系统，其它网关系统提供定制支持能力

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311756278.png)

 

1. 以卫士一KEY通为例来说明：
   1. 1、用户将Key插入TC；
   2. 2、用户打开TC电源，TC登录界面将出现智能卡登录界面，包含用户名、密码和PIN码，改登录界面替换TC Windows 7 Embedded的登录界面
   3. 3、用户输入TC的用户名、密码、PIN码。TC的用户名、密码验证通过后，一Key通软件将TC的用户名密码写到USBkey中（下次登陆TC不需要再输入），并将PIN码缓存到TC中。另登陆过程中，一Key通软件到身份认证网关作USBkey认证，认证信息中携带TC的身份标识信息，判断该TC允许使用该key，且USBkey认证通过后身份认证网关从管控平台获取域用户和密码；
   4. 4、TC启动后自动运行配置了桌面云登录页面的Firefox/IE浏览器，TC上的智能卡软件会截获浏览器的报文发送给身份认证网关，报文中携带从TC缓存中获取的PIN码。由身份认证网关并代填域用户名、密码到WI上做登录认证。认证通过后，弹出有用户虚拟机列表的WI界面
   5. 5、点击虚拟机列表，进入用户虚拟机。其中虚拟机登录认证过程为：登录过程中HDP agent通知虚拟机上的一Key通登录模块，由一Key通登录模块去卫士通的管控平台获取域用户名和密码及PIN码（使用后清除PIN码），然后登录虚拟机）；
   6. 6、用户登录虚拟机后，USBkey重定向的虚拟机中，相当于TC上拔key。这时候TC与身份认证网关的通道将中断，即TC与WI的通道亦中断，WI的界面将僵死，TC上的卫士通客户端模块检测到USBkey移除，杀掉浏览器进程。
2. 如果用户在虚拟机上方点击登出按钮，桌面会话协议中断，同时虚拟机要进行锁屏。

6）安全身份认证模式

1。动态口令卡

1. 技术特点

（1）域账号密码+软/硬件动态口令卡认证：登录WI时同时输入域账号+密码+动态密码，用户持有软/硬件动态口令卡

（2）可支持使用RADIUS(PAP)、API等方式对接动态口令认证服务器

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311756994.png)

 

1. OTP全称叫One-time Password,也称动态口令，是根据专门的算法每隔60秒生成一个与时间相关的、不可预测的随机数字组合，每个口令只能使用一次，每天可以产生43200个密码。

2。短信动态口令

1. 技术特点

（1）域账号密码+短消息动态口令：用户手机替代了实体形式的动态口令卡，使用方便

（2）可支持使用RADIUS(PAP)、API等方式对接动态口令认证服务器
![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311759625.png)

 

1. OTP Server：OTP Server是一个基于动态口令的身份认证系统,它可以为应用系统提供高安全性的身份认证服务,帮助应用系统提高身份认证的安全性。

（10）管理系统“三员分立”

1. 技术特点

（1）三员分立，权限由系统管理员、安全管理员、安全审计员分摊(无超级管理员)。管理员间的权限应相互制约、互相监督，避免由于权限过于集中带来的安全风险

（2）“三员分立”机制需在系统安装时指定，否则依然采用传统的超级管理员模式

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311800897.png)


（11）分权分域管理

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311800451.png)

 

1. “分权”：区分操作权限，由“角色”进行控制。一个“角色”可拥有一个或多个不同的“操作权限”，一个“用户”可拥有一个或多个不同的“角色”。通过绑定“用户”和“角色”，实现“用户”和“操作权限”的绑定。
2. “分域”：区分管理的数据权限，也即管理员能够管理的范围，如“管理员A”仅能管理“集群1”中虚拟机，“管理员C”仅能管理“集群2”中虚拟机。
3. 美国国家标准与技术研究院（National Institute of Standards and Technology，NIST），直属美国商务部
4. RBAC：Role-Based Access Control基于角色的访问控制

### 9.备份与恢复

（1）备份策略

1. 针对数据的备份通过系统提供的自动备份功能来实现，当系统部件故障无法通过常规方法修复时，利用备份数据快速恢复系统部件和业务。

2. 系统提供两种备份：

（1）本地备份，每天03:00备份，存放的目录是“/var/vdesktop/backup/”

（2）远程备份，每天01:00定时备份并上传到备份服务器（包括Backup Server临时备份服务器和第三方FTP备份服务器），存放的目录是“/var/ftpsite/配套的ITA名称/各组件文件夹名称”。

（2）组件备份说明

1. vLB组件无备份数据。

2. 备份AD时，需要在FusionAccess“系统管理 > 初始配置 > 域/OU”中，将“是否开启备份”设置为“是”。

3. 备份DNS时，需要在FusionAccess“告警组件”中配置DNS信息。

4. 备份DHCP时，需要在FusionAccess“告警组件”中配置DHCP信息。

5. 备份AD/DNS/DHCP，需要在相应的服务器上安装监控代理以及配置备份路径。

6. 多套FusionAccess对接一套AD/DNS/DHCP的场景，只需在其中一套FusionAccess上配置备份，否则会出现备份失败。

（3）备份机制

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311801546.png)

 

1. 备份空间充足时，备份服务器保存10天内的备份数据。备份空间不足时，系统会自动删除最早的备份文件。

（4）恢复策略

1. 数据恢复到备份服务器选取对应组件的备份文件，其中备份文件的选取原则为：先查看相应组件故障告警的时间，选取故障时间之前最接近的备份文件进行恢复。

2. 不同故障场景下的恢复策略不同：

（1）软件重装恢复：基础架构服务器部分或所有软件引起的故障，需要重装软件并利用备份服务器上的备份数据进行数据恢复。

（2）系统重装恢复：基础架构服务器操作系统故障，需要新建一台服务器和重装软件并利用备份服务器上的备份数据进行数据恢复。

（5）软件重装恢复

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311801769.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311801421.png)

 


1. 卸载ITA
   1. 以root用户登录ITA服务器，输入startTools，弹出“FusionAccess”界面。
   2. 进入“Software”目录，执行“Custom Install”，根据界面提示选择“ITA > Uninstall ITA”，当出现“ITA uninstalled successfully.”提示时说明卸载成功。
2. 重新安装ITA
   1. 进入“Software”目录，执行“Custom Install > ITA > Install ITA”，根据界面提示操作，当出现“ITA installed successfully.”提示时说明安装成功。
3. 恢复业务
   1. 使用FTP工具，gandalf用户登录ITA，将之前拷贝到本地的备份文件拷贝到ITA的“/home/FussionAccess”目录下。
   2. root用户登录ITA，执行命令移动备份文件到“/opt”目录下：
      1. mv /home/FussionAccess/ITA备份文件名 /opt/
   3. 执行命令覆盖新安装的ITA配置文件：
      1. sh /opt/ITA/script/recovery.sh -r /opt/ITA备份文件名
   4. 执行命令重启HA服务：
      1. service ha restart
   5. 执行命令重启ITA服务，重启服务后，约3分钟后业务才能恢复：
      1. service ITAService restart

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311802335.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311802316.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311803094.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311803713.png)



![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311804288.png) ![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311804855.png)

 

1. 如果卸载的是主GaussDB服务器，另一台备GaussDB服务器将会自动升为新的主GaussDB服务器。
2. 执行以下命令，查看当前GaussDB服务器是否为主GaussDB服务器。
   1. su - gaussdba -c "gs_ctl query"
      1. 结果显示“LOCAL_ROLE”为“Primary”表示当前服务器为主GaussDB服务器。

（6）软件重装恢复示例

1. **卸载ITA**

（1）以root用户登录ITA服务器。

（2）输入**startTools**，弹出“FusionAccess”界面。

（3）进入“Software”目录，执行“Custom Install”，根据界面提示选择“ITA > Uninstall ITA”，当出现“ITA uninstalled successfully.”提示时说明卸载成功。

2. **重新安装ITA**

（1）进入“Software”目录，执行“Custom Install > ITA > Install ITA”，根据界面提示操作，当出现“ITA installed successfully.”提示时说明安装成功。

3. **恢复业务**

（1）使用FTP工具，gandalf用户登录ITA，将之前拷贝到本地的备份文件拷贝到ITA的“/home/FussionAccess”目录下。

（2）root用户登录ITA，执行命令移动备份文件到“/opt”目录下：

1）**mv /home/FussionAccess/***ITA备份文件名* **/opt/**

（3）执行命令覆盖新安装的ITA配置文件：

1）**sh /opt/ITA/script/recovery.sh -r** */opt/ITA**备份文件名*

（4）执行命令重启HA服务：

1）**service ha restart**

（5）执行命令重启ITA服务，重启服务后，约3分钟后业务才能恢复：

1）**service ITAService restart**

（7）系统重装恢复

1. 场景一：恢复AD/DNS/DHCP服务器

（1）在系统的主或备AD/DNS/DHCP服务器单节点故障的场景下，将备份的AD/DNS/DHCP服务器数据拷贝到新建服务器上，并执行恢复AD服务器的操作。

2. 场景二：恢复ITA/GaussDB/HDC/WI/License服务器

（1）在系统的ITA/GaussDB/HDC/WI/License服务器单节点故障场景下，将备份数据拷贝到新建服务器上，并执行恢复服务器的操作。

3. 场景三：恢复vAG/vLB服务器

（1）在系统的vAG/vLB服务器单节点故障场景下，将备份的vAG服务器数据拷贝到新建服务器上，并执行恢复服务器的操作。vLB服务器无备份数据，需要重新安装vLB组件。

4. 场景四：恢复Backup Server服务器  

（1）Backup Server服务器故障，创建新的服务器并在FusionAccess界面完成“立即执行备份”。

## （五）FusionAccess桌面云故障处理

### 1. FusionAccess故障处理流程

（1）FusionAccess故障类型

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311804401.png)

 

1. 根据FusionAccess的主要功能，故障相应的也可以分为几大类：
   1. 业务发放故障，包括模板制作故障、虚拟机发放故障等
   2. 登录连接故障，包括虚拟机注册故障、用户登录故障、客户端连接故障等
   3. 性能体验故障，包括视频播放、多媒体重定向故障等
   4. 外设使用故障，包括外设映射、重定向、使用故障等
   5. 软件兼容故障，包括操作系统、软件等兼容故障
2. 本章节主要介绍FusionAccess如上类型的故障处理方法，每种类型的故障处理会按照基本原理、分析思路和故障处理案例来介绍。

（2）故障处理流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311805353.png)

 

1. 通常，故障处理思路分为这四个步骤。

（3）信息收集

1. 基本故障信息收集

（1）通过基本信息，可大概了解现场发生的问题、目前的状态、产生故障前的设备状态和引起故障的可能因素。比如故障现象描述、故障出现时间、故障出现频率、业务影响程度、故障发生前后的系统任何操作...

2. 告警信息收集

（1）登录FusionAccess Portal、FusionCompute Portal检查是否有新增告警。在告警详细信息里可以显示当前告警原因及建议处理方法。

（4）FusionAccess系统日志收集方法

1. FusionAccess的组件类型有四种，对应的日志收集方式也有四种。将FusionAccess产品部件的日志进行统一收集，便于系统维护人员在系统出现故障后，能够方便地收集日志并发送给日志分析人员。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311805785.png)

 

1. FusionAccess系统日志收集主要收集：Windows基础架构虚拟机、Linux基础架构虚拟机、用户虚拟机和用户终端日志。

（5）故障定位常用方法

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311805497.png)

 

（6）重大事故处理原则

1. 由于重大事故很容易导致大面积的用户虚拟机故障、设备瘫痪等严重后果，具有很大的危害性。为提高重大事故的处理效率、并尽最大的限度降低此类事故的损失，在维护本设备之前，应充分考虑并遵循以下应急处理的基本原则：

（1）应急处理以快速恢复设备的正常运行与业务的提供为核心；

（2）以客户业务尽快恢复，对客户影响最低为原则；

（3）维护人员在上岗前必须接受必要的应急处理培训，学习判断重大事故的基本方法、掌握处理重大事故的基本技能；

（4）在重大事故的处理过程中，维护人员应及时联系服务厂商，以便能够快速获取厂商的技术支持；

（5）当维护人员完成重大事故的处理以后，应该及时采集与本次事故有关的设备故障告警信息，以便于再次碰到改问题时能提供帮助。

### 2.FusionAccess典型故障处理

（1）业务发放故障

1）完整复制虚拟机发放流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311806218.png)

 

1. 完整复制虚拟机发放不成功时，参考该流程，逐步分析可能的故障点。
2. 完整复制发放流程要点：
   1. 创建虚拟机
   2. 加域
   3. 加入桌面组，关联用户
   4. 用户加入权限组、写注册表ListOfHDCs
   5. 按命名规则重命名

2）链接克隆虚拟机发放流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311806461.png)

 

1. 链接克隆虚拟机发放失败时，参考该流程，逐步分析可能的故障点。
2. 链接克隆与快速封装的发放流程类似，但不会将发放用户写入到权限组（已经在制作模板时设置）。
3. 链接克隆发放流程要点：
   1. 创建虚拟机
   2. 改名、加域、写注册表ListOfHDCs
   3. 加入桌面组，关联用户

 PC加域方式：

①管理员走到AD下直接创建一个虚拟机（写计算机名字），再在虚拟机上把它更改、加入域（名字重合即可），这个计算机名字就会有相应的SID与它对应上，PC启动就会往AD上注册（周期性）。

②用户直接在虚拟机上更改、加入域，它就直接往AD上写，PC启动就会往AD上注册（周期性）。

3）业务发放问题查看信息方法

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311807936.png)

 

1. 看错误提示
   1. 根据FusionAccess任务中心的错误提示进行问题处理，通过查阅在线帮助，按照在线帮助中的指导一步一步排查问题。
2. 看告警
   1. 在FusionAccess Portal上检查是否存在系统告警，如果有告警按照告警帮助消除告警。
3. 看日志
   1. 大部分情况根据以上两步即可处理完成，极少数情况需要您查看FusionAccess系统日志，根据日志关键字即可轻松找出问题的错误信息。

4）业务发放问题处理实例

1。看错误提示

1. 打开任务中心，查看任务进展信息。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311807265.png)

 

1. 可以根据FusionAccess错误提示信息定位并处理故障

2。看告警

1. 检查FusionAccess上是否存在告警，根据告警帮助消除告警。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311807508.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311807612.png)

 

3。看日志

1. 若依旧无法定位问题，可在FC上VNC登录发放失败的虚拟机桌面，进入C:\Program Files (x86)\Huawei\HW.SysPrep\Logs 查看发放日志。

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808183.png)

 

1. 可以看用户虚拟机中查看FusionAccess发放失败的日志信息。

（2）登录连接故障

1）FusionAccess登录连接原理

终端        接入层          后台

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808979.png)

 

1. FusionAccess桌面云用户登录连接过程包含两个部分：
   1. 用户先通过Web浏览器访问WI选择桌面虚拟机，然后WI返回虚拟机连接信息；
   2. 浏览器将连接信息传递给AccessClient，AccessClient再与AccessAgent建立连接实现远程接入。

2）虚拟机注册流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808821.png)

 

1. 从注册表读取ListOfHDCs（注：如果存在ListOfHDCsReal，则读取ListOfHDCsReal的值），然后到DNS依次解析得到各HDC的IP地址。
2. 依次循环向各个IP地址尝试注册，直到成功。
   1. 到AD获取自己的SID（虚拟机唯一标识）
   2. 上报注册请求消息（携带SID）
   3. 解析注册响应消息，如果成功则跳出循环
3. 注册成功后，HDA周期性向HDC上报心跳消息（心跳消息跟注册消息实际上是同样的消息，如果没有注册HDC就当做注册消息；如果已注册就当心跳消息）。
4. 注册成功后，在FA Portal的桌面管理中可以查询到虚拟机的状态为已就绪；在WI上看到的虚拟机图标会变为蓝色（对应未注册状态虚拟机图标为灰色）。
5. 注册的目的是确定虚拟机是否就绪可供连接。另外，单击虚拟机图标时，WI根据虚拟机是否注册决定是否要对虚拟机检查上电状态（未注册则调用FC检查上电状态，未上电则上电）。

3）用户登录流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808784.png)

 

1. 用户打开浏览器或者云客户端登录到WI。
2. WI将用户名密码传递到AD鉴权，鉴权成功后从HDC经DB获取用户虚拟机列表。
3. 用户单击虚拟机图标，然后WI向HDC发起到VM的预连接请求。
4. 预连接成功后，WI虚拟机图标上显示“正在启动客户端”。然后WI通过浏览器拉起HDPClient客户端，进入客户端连接流程。

4）客户端连接流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808306.png)

 

1. 客户端初始化。
2. 客户端尝试与AG/VM建立连接。
3. 建立连接后显示“正在连接界面”。
4. 发送登录请求自动登录到虚拟机。
5. 虚拟机切换状态机并启动各重定向服务。
6. 各服务提供重定向内容，用户正常操作虚拟机。

5）问题处理思路

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311808559.png)

 

6）登录连接故障案例-虚拟机图标显示为灰色

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311809730.png)

 

（3）性能体验故障

1）FusionAccess产品形态

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311809512.png)

 

1. 基于用户业务的部署和应用可以分为三大层次：
   1. 用户业务应用层:用户业务部署需求，不同的应用场景，不同的业务方式；
   2. 虚拟化OS层：虚拟化OS层和云管理OS层，虚拟资源的调度，管理，应用；
   3. 基础设施硬件层：物理设备，提供可以虚拟化使用的物理资源；
2. 所以，基于此结构的云计算产品形态，在出现性能问题时我们按照这三层逻辑关系进行分段式排查和定位。

2）虚拟桌面I/O流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311809428.png)

 

1. 通过上图可以看到，现网系统中需要涉及到下面的这些硬件，软件，OS，中间件等，所以在出现性能问题时需要全流程排查（先定位到某个设备或者模块）。
2. 需要清楚这些信息：服务器的配置，存储的配置，网络规划，虚拟机的配置，操作系统的类型，应用软件等，终端的TC和虚拟机的网络等
3. 具体以下内容：
   1. 服务器：CPU型号及数量、BIOS的设置、内存规格，承载的虚拟机个数（密度），业务压力指标；
   2. 存储：存储的配置和规划，容量大小，承载的业务压力；
   3. 虚拟机：OS类型、OS规格、特殊配置；
   4. VM业务：应用场景，安装的软件，压力模型，特殊配置，业务运行依赖的资源；
   5. 系统组网：组网结构，网络带宽，网络质量；
   6. 特殊软件：系统中安装大型数据库软件、高清图像软件、视频播放器、不常见的杀毒软件、行业的定制软件、网页系统等；
   7. 瘦终端：硬件型号、软件及补丁版本；
   8. 操作系统：虚拟机出现卡死，断链，白屏等异常情况，一般情况可能是操作系统异常导致的;
4. 业务指标：访问系统时间，数据传输速率，呼叫语音时延，拷贝速率，系统处理时间等；

3）性能问题定位思路

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311809898.png)



1. 在定位性能问题时，基本按照上面的整体思路去初步定位，搞清楚问题现象后先判断是个体问题还是整体问题：
   1. 对于整体问题就要考虑：集群，主机，统一存储，网络，用户业务压力等共性因素；
   2. 对于个体问题就要考虑：单个VM，单个软件，差异点，单个主机，差异特性等；
   3. 问题处理顺序：先由上层往底层判断，由单个虚拟机到整个主机/集群。

4）性能问题处理流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311809583.png)

 

1. 问题现象：时间，现象，触发因素，产生的日志，发生的概率，发生前后对比，环境变化，是否概率性问题等；
2. 数据采集：上面介绍的软件层次和逻辑架构，对于问题先做初步判断，然后确定需要抓取那些组件的数据，从VM侧，到服务器侧，到底层存储侧等；
3. 云计算系统涉及多个系统，组件，模块，从相应的流程开始，逐一分段排查，作为初步的问题界定，定位到相关的模块或者设备上；
4. 在分析问题时，可能涉及多个因素，要一并去分析排查，特别是性能相关的问题，对每个点都去优化，将会带来很好的提升和好的用户体验。

5）性能体验故障案例-网络视频效果不佳

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311810351.png)

 

（4）外设使用故障

1）外设技术回顾

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311810657.png)

 

1. 通过FusionAccess管理界面可以创建各种重定向相关的策略配置，并能有针对性的发布应用这些策略配置。
   1. 一般地，所有USB接口设备理论上都可使用USB重定向方式；但市场上USB设备层出不穷，各厂商实现也有差异，对USB协议标准遵从度，以及USB设备使用环境，使用条件等因素，都会导致某些USB设备采用USB重定向后，效果不理想，可尝试通过策略配置，针对这些USB设备使用其它重定向技术。
   2. 一般地，串、并口设备可以使用串、并口重定向，如果无法使用，可尝试使用USB串口转接线、USB并口转接线，间接地使用USB重定向方式来实现。

2）外设使用故障处理流程

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311810057.png)

 

1. Windows TC客户端日志：
   1. C:\HDPLOG
2. Linux TC客户端日志：
   1. TCM收集，请参考TCM配套指导书
3. VM日志：
   1. 开始菜单->所有程序->Huawei FusionAccess->Collect Log

3）外设使用故障案例-手写板无法使用

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/HuaweiCloudComputingFusionAcces/202403311810505.png)






 