# Docker容器技术

> 本文作者：[明凡]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)



## 1.容器介绍

 容器其实是一种沙盒技术。沙盒就是能够像一个集装箱一样，把你的应用"装"起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰；而被装进集装箱的应用，也可以被方便地搬来搬去。

问题：容器的本质到底是什么？容器的本质是进程。容器镜像就是这个系统里的".exe"安装包。

## 2.Docker介绍

[Docker 教程 | 菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)

[Docker教程 - 运维派](https://www.yunweipai.com/docker%e6%95%99%e7%a8%8b)

 Docker是Docker.Inc公司开源的一个基于轻量级虚拟化技术的容器引擎项目，整个项目基于Go语言开发，并遵从Apache 2.0协议。通过分层镜像标准化和内核虚拟化技术，Docker使得应用开发者和运维工程师可以以统一的方式跨平台发布应用，并且以几乎没有额外开销的情况下提供资源隔离的应用运行环境。

 Docker 是一个开源工具，它可以让创建和管理 docker 容器变得简单。容器就像是轻量级的虚拟机，并且可以以秒级的速度来启动或停止。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

 容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app），更重要的是容器性能开销极低。

没有容器的时候：

`开发 测试 运维`

1）RD开发产品（需要配置开发环境）LAMP2）QA测试(需要配置测试环境)3）OP上线（需要线上环境）

有容器之后：一次构建多次发布

1）RD开发产品（需要在docker容器里配置开发环境）2）把容器打包成镜像交给运维，运维上线 

Docker跟原有的工具区别：

传统的部署模式是：安装(包管理工具或者源码包编译)->配置->运行； Docker的部署模式是：复制->运行。

Docker对服务器端开发/部署带来的变化：

方便快速部署，对于部署来说可以极大的减少部署的时间成本和人力成本 Docker支持将应用打包进一个可以移植的容器中，重新定义了应用开发，测试，部署上线的过程，核心理念是Build once，Run anywhere。 1）标准化应用发布，docker容器包含了运行环境和可执行程序，可以跨平台和主机使用；2）节约时间，快速部署和启动，VM启动一般是分钟级，docker容器启动是秒级；3）方便构建基于微服务架构的系统，通过服务编排，更好的松耦合；4）节约成本，以前一个虚拟机至少需要几个G的磁盘空间，docker容器可以减少到MB级。

Docker 优势：

1、交付物标准化：Docker的标准化交付物称为"镜像"，它包含了应用程序及其所依赖的运行环境，大大简化了应用交付的模式。 2、应用隔离：Docker可以隔离不同应用程序之间的相互影响，但是比虚拟机开销更小。总之，容器技术部署速度快，开发、测试更敏捷；提高系统利用率，降低资源成本. 3、一次构建，多次交付：类似于集装箱的"一次装箱，多次运输"，Docker镜像可以做到"一次构建，多次交付"。

Docker的度量：

Docker是利用容器来实现的一种轻量级的虚拟技术，从而在保证隔离性的同时达到节省资源的目的。Docker的可移植性可以让它一次建立，到处运行。Docker的度量可以从以下四个方面进行： 1）隔离性：通过内核的命名空间来实现的，将容器的进程、网络、消息、文件系统和主机名进行隔离。 2）可度量性：Docker主要通过cgroups控制组来控制资源的度量和分配。 3）移植性：Docker利用AUFS来实现对容器的快速更新。AUFS是一种支持将不同目录挂载到同一个虚拟文件系统下的文件系统，支持对每个目录的读写权限管理。AUFS具有层的概念，每一次修改都是在已有的只写层进行增量修改，修改的内容将形成新的文件层，不影响原有的层。 4）安全性：安全性可以分为容器内部之间的安全性；容器与托管主机之间的安全性。容器内部之间的安全性主要是通过命名空间和cgroups来保证的。容器与托管主机之间的安全性主要是通过内核能力机制的控制，可以防止Docker非法入侵托管主机。

Docker容器使用AUFS作为文件系统，有如下优势：

1）节省存储空间：多个容器可以共享同一个基础镜像存储。 2）快速部署3）升级方便：升级一个基础镜像即可影响到所有基于它的容器。需要注意已经在运行的docker容器不受影响。

容器和 VM 的主要区别：

表面区别：容器占用体积小，虚拟机占用体积大。

隔离性：容器提供了基于进程的隔离，而虚拟机提供了资源的完全隔离。

启动速度：虚拟机可能需要一分钟来启动，而容器只需要一秒钟或更短。容器使用宿主操作系统的内核，而虚拟机使用独立的内核。Docker 的局限性之一是，它只能用在64位的操作系统上。

本质区别：容器是被隔离的进程。

### 2.1 Docker基本概念

#### 2.1.1 Docker架构

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455965.jpeg)

#### 2.1.2 Docker系统

Docker系统有两个程序：Docker服务端和Docker客户端Docker服务端：是一个服务进程，管理着所有的容器。也叫docker engine。 Docker客户端：扮演着docker服务端的远程控制器，可以用来控制docker的服务端进程。 Docker服务端和客户端运行在一台机器上。

#### 2.1.3 Docker三大核心组件

1）Docker 仓库- Docker Registeries

Docker仓库：用来保存镜像，可以理解为代码控制中的代码仓库。同样的，Docker 仓库也有公有和私有的概念。公有的 Docker 仓库名字是 Docker Hub。Docker Hub 提供了庞大的镜像集合供用户使用。这些镜像可以是自己创建，或者在别人的镜像基础上创建。仓库(registry) -->Repository-->镜像:v1.1(按版本区分)。

docker 国内仓库：aliyun、网易蜂巢、daocloud docker公有仓库：docker.io -------docker官方库也叫docker-hub；类似于github一样，面向全球的一个docker镜像的公共仓库。如果在国内使用速度太慢。 docker私有仓库：个人或者公司部署的非公开库

2）Docker 镜像 - Docker Images

Docker镜像是Docker容器运行时的只读模板，每一个镜像由一系列的层 (layers) 组成。Docker 使用 UnionFS 来将这些层联合到单独的镜像中。正因为有了这些层的存在，Docker 是如此的轻量。当你改变了一个Docker 镜像，比如升级到某个程序到新的版本，一个新的层会被创建。因此，不用替换整个原先的镜像或者重新建立(在使用虚拟机的时候你可能会这么做)，只是一个新的层被添加或升级了。在Docker的术语里，一个只读层被称为镜像，一个镜像是永久不会变的。由于Docker使用一个统一文件系统，由于镜像不可写，所以镜像是无状态的。

镜像由三部分组成：

镜像名称：仓库名称+镜像分类+tag名称(镜像版本)

1.存储对象：images

2.格式：库名/分类：tag

3.tag：表示镜像版本

镜像ID：所有镜像都是通过一个 64 位十六进制字符串来标识的。 为简化使用，前 12 个字符可以组成一个短ID，可以在命令行中使用。短ID还是有一定的碰撞机率，所以服务器总是返回长ID。镜像ID：64位的id号，一般我们看到的是12位的我们称之为短ID，只要我们每个ID号不冲突就可以了。镜像本身：是由一层一层的镜像合在一起的，最底层的镜像我们称为基础镜像，在这个基础镜像的基础上还可以在做镜像，在做的镜像称为子镜像，对于子镜像来讲在谁的基础之上做的就是父镜像。基础镜像：一个没有任何父镜像的镜像，谓之基础镜像。

3）Docker 容器- Docker Containers

 Docker 容器和文件夹很类似，一个Docker容器包含了所有的某个应用运行所需要的环境。每一个 Docker 容器都是从 Docker 镜像创建的。Docker 容器可以运行、开始、停止、移动和删除。每一个 Docker 容器都是独立和安全的应用平台，Docker 容器是 Docker 的运行部分。

#### 2.1.4 容器的三大组成要素

1）名称空间 namespace 容器隔离（pid，net，mnt，user，hostname...） 2）资源限制 cgroups 资源（内存，cpu） 3）文件系统 overlay2（UnionFS）

#### 2.1.5 Docker镜像命名解析

镜像是Docker最核心的技术之一，也是应用发布的标准格式。无论你是用docker pull image，或者是在Dockerfile里面写FROM image，从Docker官方Registry下载镜像应该是Docker操作里面最频繁的动作之一了。那么docker镜像是如何命名的，这也是Docker里面比较容易令人混淆的一块概念：Registry，Repository, Tag and Image。 那么Registry又是什么呢？Registry存储镜像数据，并且提供拉取和上传镜像的功能。Registry中镜像是通过Repository来组织的，而每个Repository又包含了若干个Image。

下面是在本地机器运行docker images的输出结果：

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455925.png)

常说的"ubuntu"镜像其实不是一个镜像名称，而是代表了一个名为ubuntu的Repository，同时在这个Repository下面有一系列打了tag的Image，Image的标记是一个GUID，为了方便也可以通过Repository:tag来引用。

Image[:tag]

当一个镜像的名称不足以分辨这个镜像所代表的含义时，你可以通过tag将版本信息添加到run命令中，以执行特定版本的镜像。

```plain  
例如:docker run ubuntu:14.04 
```
 
#### 2.1.6 Docker镜像和容器的区别

Docker镜像：

一个Docker镜像可以构建于另一个Docker镜像之上，这种层叠关系可以是多层的。第1层的镜像层我们称之为基础镜像（Base Image），其他层的镜像（除了最顶层）我们称之为父层镜像（Parent Image）。这些镜像继承了他们的父层镜像的所有属性和设置。

Docker镜像通过镜像ID进行识别。镜像ID是一个64字符的十六进制的字符串。但是当我们运行镜像时，通常我们不会使用镜像ID来引用镜像，而是使用镜像名来引用。

要列出本地所有有效的镜像，可以使用命令

```plain
docker images
```

镜像可以发布为不同的版本，这种机制我们称之为标签（Tag）。

可以使用pull命令加上指定的标签：

```plain  
docker pull ubuntu:14.04
docker pull ubuntu:12.04
```

Docker容器：

Docker容器可以使用命令创建：

```plain
docker run  -it  imagename  /bin/bash 
```

它会在所有的镜像层之上增加一个可写层。这个可写层有运行在CPU上的进程，而且有两个不同的状态：运行态（Running）和退出态 （Exited）。这就是Docker容器。当我们使用docker run启动容器，Docker容器就进入运行态，当我们停止Docker容器时，它就进入退出态。

当我们有一个正在运行的Docker容器时，从运行态到停止态，我们对它所做的一切变更都会永久地写到容器的文件系统中。要切记，对容器的变更是写入到容器的文件系统的，而不是写入到Docker镜像中的。我们可以用同一个镜像启动多个Docker容器，这些容器启动后都是活动的，彼此还是相互隔离的。我们对其中一个容器所做的变更只会局限于那个容器本身。如果对容器的底层镜像进行修改，那么当前正在运行的容器是不受影响的，不会发生自动更新现象。

#### 2.1.7 名字空间（namespace）

名字空间是 Linux 内核一个强大的特性。每个容器都有自己单独的名字空间，运行在其中的应用都像是在独立的操作系统中运行一样。名字空间保证了容器之间彼此互不影响。

1）pid 名字空间：不同用户的进程就是通过 pid 名字空间隔离开的，且不同名字空间中可以有相同的 pid。所有的 LXC(Linux container) 进程在 Docker中的父进程为Docker进程，每个 LXC 进程具有不同的名字空间。同时由于允许嵌套，因此可以很方便的实现嵌套的 Docker 容器。

2）net 名字空间：做网络接口隔离的；有了 pid 名字空间, 每个名字空间中的 pid 能够相互隔离，但是网络端口还是共享 host 的端口。网络隔离是通过 net 名字空间实现的， 每个 net 名字空间有独立的网络设备, IP 地址, 路由表, /proc/net 目录。这样每个容器的网络就能隔离开来。 

3）ipc 名字空间：容器中进程交互还是采用了 Linux 常见的进程间交互方法(interprocess communication - IPC), 包括信号量、共享内存、socket、管道等。

面试题：linux系统里面ipc通信有几种方式？

socket:网络进程间的通信

管道：本地进程间的通信：echo hello | grep e

信号： kill -9 PID 这种我们叫信号量级，也是本地进程间的通信

共享内存：每个操作系统里面共享内存多大，是物理内存的一半

4）mnt名字空间：mnt 名字空间允许不同名字空间的进程看到的文件结构不同，这样每个名字空间中的进程所看到的文件目录就被隔离开了。

5）uts 名字空间：UTS("UNIX Time-sharing System") 名字空间允许每个容器拥有独立的 hostname 和 domain name, 使其在网络上可以被视作一个独立的节点而非主机上的一个进程。

6）user 名字空间：每个容器可以有不同的用户和组 id, 也就是说可以在容器内用容器内部的用户执行程序而非主机上的用户。

### 2.2 镜像管理

#### 2.2.1 搜索镜像

```plain 
这种方法只能用于官方镜像库
搜索基于 centos 操作系统的镜像
[root@docker-server ~]# docker search centos
```

#### 2.2.2 按星级搜索镜像

```plain
查找 star 数至少为 100 的镜像，默认不加 s 选项找出所有相关 centos 镜像： 
[root@docker-server ~]# docker search centos -s 100
或者
[root@docker-server ~]# docker search ubuntu -f stars=100
```

#### 2.1.3 拉取镜像

```plain
docker pull centos
注：没有加registry，默认是从docker.io下载的
[root@docker-server ~]# docker pull daocloud.io/library/tomcat:7
[root@docker-server ~]# docker pull daocloud.io/library/centos:6
```

#### 2.1.4 查看本地镜像

```plain
[root@docker-server ~]# docker image list 
或者
[root@docker-server ~]# docker images
```

#### 2.1.5 查看镜像详情

```plain
[root@docker-server ~]# docker image inspect 镜像id 
[root@docker-server ~]# docker inspect 镜像id
```

#### 2.1.6 删除镜像

删除一个或多个，多个之间用空格隔开，可以使用镜像名称或id

```plain
[root@docker-server ~]# docker rmi daocloud.io/library/mysql
或者
[root@docker-server ~]# docker rmi 81debc

参数解释：
rm          Remove one or more containers   ---移除一个或多个容器
rmi         Remove one or more images       ---删除一个或多个镜像

强制删除：--force
如果镜像正在被使用中可以使用--force强制删除    
docker rmi docker.io/ubuntu:latest --force
-f, --force      Force removal of the image
注意: 容器运行中不能删除，将容器停止后，删除容器在删除镜像。
```

#### 2.1.7 只查看所有镜像的id

```plain
[root@docker-server ~]# docker images -q
-q, --quiet
```

#### 2.1.8 删除所有镜像

```plain
[root@docker-server ~]# docker rmi $(docker images -q)
```

#### 2.1.9 查看镜像制作的过程

```plain
相当于dockfile
[root@docker-server ~]# docker history daocloud.io/library/nginx  使用镜像名或者镜像ID都可以
```

#### 2.1.10 Docker镜像加载原理

UnionFS（联合文件系统）

UnionFS（联合文件系统）：Union文件系统是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下（unite several directories into a single virtual filesystem）。Union文件系统是Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

Docker镜像加载原理

Bootfs（Boot File System）主要包括bootloader和kernel，bootloader主要是引导加载kernel，Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs，

Rootfs（Root File System），在bootfs之上。包含的就是典型Linux系统中的/dev，/proc，/bin，/etc等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，CentOS等。

### 2.3 容器管理

#### 2.3.1 创建新容器但不启动

```plain
[root@docker-server ~]# docker create -it daocloud.io/library/centos:5 /bin/bash
```

创建并运行一个新Docker 容器：同一个镜像可以启动多个容器,每次执行run子命令都会运行一个全新的容器

```plain
[root@docker-server ~]# docker run -it --restart=always daocloud.io/library/centos:7 /bin/bash   #最常用
-i ：标准输入输出
-t：分配一个终端或控制台
--restart=always：容器随docker engine自启动，因为在重启docker的时候默认容器都会被关闭   
也适用于create选项
-d  后台运行容器，并返回容器ID
```

如果执行成功，说明CentOS 容器已经被启动，并且应该已经得到了 bash 提示符。

```plain
--rm:默认情况下，每个容器在退出时，它的文件系统也会保存下来.另一方面，也可以保存容器所产生的数据。但是当你仅仅需要短暂的运行一个容器，并且这些数据不需要保存，你可能就希望Docker能在容器结束时自动清理其所产生的数据。这个时候就需要--rm参数了。
注意：--rm 和 -d不能共用

示例：
[root@docker-server ~]# docker run -it --rm daocloud.io/library/nginx:latest  /bin/bash
root@be2d0a462ce1:/# exit 
exit

[root@docker-server ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

#### 2.3.2 容器名称

```plain
为容器分配一个名字，如果没有指定，docker会自动分配一个随机名称是 docker run子命令的参数
--name= Assign a name to the container
docker run -it --name 名字  daocloud.io/centos:6 /bin/bash   #名字自定义
```

如果你在执行docker run时没有指定--name，那么自动生成一个随机字符串UUID。这个UUID标识是由Docker deamon生成的。但是对于一个容器来说有个name会非常方便，当你需要连接其它容器时或者类似需要区分其它容器时，使用容器名称可以简化操作。无论容器运行在前台或者后台，这个名字都是有效的。

若要断开与容器的连接，并且关闭容器：容器内部执行如下命令

```plain
root@37b8b8cdd75f:/# exit
```

如果只想断开和容器的连接而不关闭容器：

```plain
快捷键：ctrl+p+q
```

#### 2.3.3 查看容器

```plain
1.只查看运行状态的容器：
docker ps
2.-a  查看所有容器
docker ps -a
3.只查看所有容器id:
docker ps -a -q
```

#### 2.3.4 查看容器详细信息：

inspect :用于查看容器的配置信息，包含容器名、环境变量、运行命令、主机配置、网络配置和数据卷配置等。 目标：查找某一个运行中容器的id，然后使用docker inspect命令查看容器的信息。 提示：可以使用容器id的前面部分，不需要完整的id。

```plain
[root@docker-server ~]# docker inspect bbdc71e   #机器上运行的一个容器ID或者名称
[
    {
        "Id": "d95a220a498e352cbfbc098c949fc528dbf5a5c911710b108ea3a9b4aa3a4761",
        "Created": "2017-07-08T03:59:16.18225183Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "exited",
           "Running": false,
            "Paused": false,
           "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
容器信息很多，这里只粘贴了一部分
```

#### 2.3.5 启动容器

```plain
docker start  name   #容器ID也可以
这里的名字是状态里面NAMES列列出的名字，这种方式同样会让容器运行在后台
```

#### 2.3.6 关闭容器

```plain
docker stop  name
docker kill  name      --强制终止容器
```

#### 2.3.7 杀死所有running状态的容器

```plain
docker kill $(docker ps  -q)
```

stop和kill的区别：

 docker stop命令给容器中的进程发送SIGTERM信号，默认行为是会导致容器退出，当然，容器内程序可以捕获该信号并自行处理，例如可以选择忽略。而docker kill则是给容器的进程发送SIGKILL信号，该信号将会使容器必然退出。

#### 2.3.8 删除容器：

```plain
docker rm 容器id或名称
要删除一个运行中的容器，添加 -f 参数 --慎用。先stop在删除
```

根据格式删除所有容器：

```plain
docker rm $(docker ps -qf status=exited)
-f：过滤

pause :暂停容器中所有的进程
unpause：恢复容器内暂停的进程，与pause对应

[root@docker-server ~]# docker pause c7
[root@docker-server ~]# docker ps 
CONTAINER ID        IMAGE                          COMMAND             CREATED             STATUS                  PORTS               NAMES
3c0e0f43807d        98ebf73aba                     "/bin/bash"         7 minutes ago       Up 7 minutes (Paused)   80/tcp              c7
[root@docker-server ~]# docker unpause c7  #恢复
```

#### 2.3.9 重启容器

```plain
[root@docker-server ~]# docker restart name
```

#### 2.3.10 让容器运行在后台

```plain
docker run -dit 镜像ID /bin/bash
-d后台运行必须要加-it
```

如果在docker run后面追加-d=true或者-d，那么容器将会运行在后台模式。此时所有I/O数据只能通过网络资源或者共享卷组来进行交互。因为容器不再监听你执行docker run的这个终端命令行窗口。但你可以通过执行docker attach来重新附着到该容器的回话中。

```plain
[root@docker-server ~]# docker ps
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS               NAMES
455a92f0b90c        daocloud.io/library/nginx   "/docker-entrypoint.…"   14 minutes ago      Up 33 seconds       80/tcp              silly_mahavira

[root@docker-server ~]# docker attach 容器ID/容器名字

[root@docker-server ~]# docker attach silly_mahavira
root@455a92f0b90c:/# ls 
bin   dev                  docker-entrypoint.sh  home  lib64  mnt  proc  run   srv  tmp  var
boot  docker-entrypoint.d  etc                   lib   media  opt  root  sbin  sys  usr
```

注：

容器运行在后台模式下，是不能使用--rm选项的(老版本是这样，新版本已经可以同时生效)

#### 3.3.11 修改容器名称

rename ---修改容器名称

```plain
[root@docker-server ~]# docker rename mytest testmy
[root@docker-server ~]# docker ps -a
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS              PORTS               NAMES
774c02898fb1        daocloud.io/library/nginx   "/bin/bash -c 'while…"   5 minutes ago       Up About a minute   80/tcp              testmy
```

#### 3.3.12 显示容器资源使用统计信息的实时流

```plain
[root@docker-server ~]# docker stats
--当有容器在运行的时候动态显示容器的资源消耗情况，包括：CPU、内存、网络I/O
```

#### 3.3.13 连接容器

前提是容器在运行状态中

方法1.attach

```plain
docker attach 容器id   #前提是容器创建时必须指定了交互shell
```

方法2.exec

```plain
通过exec命令可以创建两种任务：后台型任务和交互型任务
1.交互型任务：
[root@docker-server ~]# docker exec -it  容器id  /bin/bash
root@68656158eb8e:/# ls

2.后台型任务：不进入容器里面执行命令
[root@docker-server ~]# docker exec 容器id touch /testfile
```

#### 3.3.14 监控容器的运行

可以使用logs、top、wait这些子命令

 logs:使用logs命令查看守护式容器

 可以通过使用docker logs命令来查看容器的运行日志，其中--tail选项可以指定查看最后几条日志，使用-f选项可以跟踪日志的输出，直到手动停止。

```plain
[root@docker-server ~]# docker pull daocloud.io/library/nginx
[root@docker-server ~]# docker images 
[root@docker-server ~]# docker run -it --name nginx1 98ebf73 /bin/bash 
root@8459191dbe7c:/# /usr/sbin/nginx   #启动nginx
ctrl+p+q --- 退出
[root@docker-server ~]# docker inspect nginx1  #找到ip地址
[root@docker-server ~]# curl -I http://172.17.0.3  #宿主机访问容器可以访问成功
HTTP/1.1 200 OK
Server: nginx/1.17.1
Date: Mon, 09 Mar 2020 14:49:40 GMT
Content-Type: text/html
Content-Length: 612
Last-Modified: Tue, 25 Jun 2019 12:19:45 GMT
Connection: keep-alive
ETag: "5d121161-264"
Accept-Ranges: bytes
[root@docker-server ~]# curl -I http://172.17.0.3  #继续测试访问

在开启一个终端：
[root@docker-server ~]# docker logs -f nginx1  
root@8459191dbe7c:/# /usr/sbin/nginx
root@8459191dbe7c:/# 172.17.0.1 - - [09/Mar/2020:14:49:33 +0000] "HEAD / HTTP/1.1" 200 0 "-" "curl/7.29.0" "-"
172.17.0.1 - - [09/Mar/2020:14:49:40 +0000] "HEAD / HTTP/1.1" 200 0 "-" "curl/7.29.0" "-"


docker logs --tail -2 App_Conainer
```

 top:显示一个运行的容器里面的进程信息

```plain
[root@docker-server ~]# docker top  nginx   #容器ID也可以
```

 wait :--捕捉容器停止时的退出码

执行此命令后，该命令会"hang"在当前终端，直到容器停止，此时，会打印出容器的退出码

```plain
在第一个终端执行停止容器命令
[root@docker-server ~]# docker stop nginx1
=============================================================================
[root@docker-server ~]# docker wait 01d8aa  #第二个终端操作
0

docker run 之后容器退出的状态码：
0，表示正常退出
非0，表示异常退出（退出状态码采用chroot标准）
125，Docker守护进程本身的错误
126，容器启动后，要执行的默认命令无法调用
127，容器启动后，要执行的默认命令不存在
```

#### 3.3.15 宿主机和容器之间相互COPY文件

 cp的用法如下：

```plain
Usage: 
docker cp [OPTIONS] CONTAINER:PATH LOCALPATH   --从容器拷贝到本机
docker cp [OPTIONS] LOCALPATH CONTAINER:PATH   --从本机拷贝到容器
```

 如：容器nginx中/usr/local/bin/存在test.sh文件，可如下方式copy到宿主机

```plain
[root@docker-server ~]# docker exec -it --name mytest nginx /bin/bash
root@2a9a18b4a485:/# cd /usr/local/bin/
root@2a9a18b4a485:/usr/local/bin# touch test.sh
ctrl+p+q  退出
[root@docker-server ~]# docker cp mytest:/usr/local/bin/test.sh /root/
```

修改完毕后，将该文件重新copy回容器

```plain
[root@docker-server ~]# ls
anaconda-ks.cfg  test.sh
[root@docker-server ~]# echo "123" >> test.sh
[root@docker-server ~]# docker cp /root/test.sh mytest:/usr/local/bin/
```

## 4.Docker容器镜像制作

### 4.1 容器文件系统打包

将容器的文件系统打包成tar文件,也就是把正在运行的容器直接导出为tar包的镜像文件

export

 Export a container's filesystem as a tar archive

有两种方式：

第一种：

```plain
[root@docker-server ~]# docker images
REPOSITORY                                         TAG                 IMAGE ID            CREATED             SIZE
centos                                             latest              831691599b88        5 weeks ago         215MB

[root@docker-server ~]# docker run -itd --name centos centos /bin/bash
[root@docker-server ~]# docker ps
CONTAINER ID        IMAGE                       COMMAND                  CREATED              STATUS              PORTS               NAMES
b028c756d20f        centos                      "/bin/bash"              About a minute ago   Up About a minute                       centos

[root@docker-server ~]# docker exec -it centos /bin/bash
[root@96e2b7265d93 /]# vi a.txt #编辑一个文件
123
[root@96e2b7265d93 /]# yum install -y vim wget  #安装一个软件
[root@docker-server ~]# docker export -o centos6-1.tar 96e2b726
-o, --output
[root@docker-server ~]# ls  #保存到当前目录下
anaconda-ks.cfg  centos6-1.tar
```

第二种：

```plain
[root@docker-server ~]# docker export 容器名称 > 镜像.tar
```

导入镜像归档文件到其他宿主机：

import

```plain
[root@docker-server ~]# docker import centos6-1.tar centos6-1:v1
 sha256:b8414448c913259a28d623643a7b67a6c13da9b3259e70ee5febb16c2b0b1095
[root@docker-server ~]# docker images
[root@docker-server ~]# docker run -it --name c6.1 centos6-1:v1 /bin/bash 
[root@4a29d58d3bd2 /]# ls
a.txt  bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  sbin  selinux  srv  sys  tmp  usr  var
[root@4a29d58d3bd2 /]# cat a.txt 
123123
```

### 4.2 通过容器创建本地镜像

背景：容器运行起来后，又在里面做了一些操作，并且要把操作结果保存到镜像里

方案：使用 docker commit 指令，把一个正在运行的容器，直接提交为一个镜像。

commit 是提交的意思,类似告诉svn服务器我要生成一个新的版本。

例子：

在容器内部新建了一个文件

```plain
[root@docker-server ~]# docker run -it --name c7 daocloud.io/library/centos:7 /bin/bash
[root@2e8f79cb5922 /]# touch test.txt
```

将这个新建的文件提交到镜像中保存

```plain
[root@docker-server ~]# docker commit 2e8f79cb5922 soso/test:v2
sha256:2214bad66e9b1c2079dc89a2e14e997604237cd49a6dc6c29d84e915fbbeb5bd
[root@docker-server ~]# docker images
```

也可以这样例子：

```plain
docker commit -m "my images version1" -a "soso" 108a85b1ed99 daocloud.io/ubuntu:v2
sha256:ffa8a185ee526a9b0d8772740231448a25855031f25c61c1b63077220469b057
-m                           添加注释
-a                           作者
108a85b1ed99                 容器环境id
daocloud.io/ubuntu:v2      镜像名称：hub的名称/镜像名称：tag 
-p，–pause=true              提交时暂停容器运行
```

镜像迁移

保存一台宿主机上的镜像为tar文件，然后可以导入到其他的宿主机上：

save

 将镜像打包，与下面的load命令相对应

```plain
[root@docker-server ~]# docker save -o nginx.tar daocloud.io/library/nginx
```

load

 与上面的save命令相对应，将上面sava命令打包的镜像通过load命令导入,（实验环境中原来机器上面有镜像可以先删除掉。）

```plain
[root@docker-server ~]# docker load < nginx.tar
[root@docker-server ~]# docker images

把容器导出成tar包 export   import 
把容器做成镜像  commit  -a "" -m ""  
把镜像保存为tar包 save    load
```

通过Dockerfile创建镜像

Docker 提供了一种更便捷的方式，叫作 Dockerfile

docker build命令用于根据给定的Dockerfile构建Docker镜像。

docker build语法：

```plain
docker build [OPTIONS] <PATH | URL | ->
常用选项说明
--build-arg，设置构建时的变量
--no-cache，默认false。设置该选项，将不使用Build Cache构建镜像
--pull，默认false。设置该选项，总是尝试pull镜像的最新版本
--compress，默认false。设置该选项，将使用gzip压缩构建的上下文
--disable-content-trust，默认true。设置该选项，将对镜像进行验证
--file, -f，Dockerfile的完整路径，默认值为‘PATH/Dockerfile’
--isolation，默认--isolation="default"，即Linux命名空间；其他还有process或hyperv
--label，为生成的镜像设置metadata
--squash，默认false。设置该选项，将新构建出的多个层压缩为一个新层，但是将无法在多个镜像之间共享新层；设置该选项，实际上是创建了新image，同时保留原有image。
--tag, -t，镜像的名字及tag，通常name:tag或者name格式；可以在一次构建中为一个镜像设置多个tag
--network，默认default。设置该选项，Set the networking mode for the RUN instructions during build
--quiet, -q ，默认false。设置该选项，Suppress the build output and print image ID on success
--force-rm，默认false。设置该选项，总是删除掉中间环节的容器
--rm，默认--rm=true，即整个构建过程成功后删除中间环节的容器
```

```plain
示例： 
docker build -t soso/bbauto:v2.1 .

docker build  是docker创建镜像的命令 
-t 是标识新建的镜像属于 soso的 bbauto镜像 
：v2.1 是tag 
"."是用来指明 我们的使用的Dockerfile文件当前目录的
```

2.1、 创建镜像所在的文件夹和Dockerfile文件

```plain
[root@docker-server ~]# mkdir sinatra
[root@docker-server ~]# cd sinatra/
[root@docker-server sinatra]# touch Dockerfile
```

2.2、 在Dockerfile文件中写入指令，每一条指令都会更新镜像的信息例如：

```plain
[root@docker-server sinatra]# vim Dockerfile
#This is a comment 
FROM daocloud.io/library/centos:7
MAINTAINER soso soso@docker-server
RUN touch a.txt
RUN mkdir /test
```

格式说明：

```plain
命令要大写，"#"是注解。 
每一个指令后面需要跟空格，语法。
FROM 命令是告诉docker 我们的镜像什么从哪里下载。 
MAINTAINER 是描述 镜像的创建人。 
RUN 命令是在镜像内部执行。就是说他后面的命令应该是针对镜像可以运行的命令。
```

2.3、创建镜像

命令：

```plain
docker build -t soso/centso:7 .
docker build  是docker创建镜像的命令
```

详细执行过程：

```plain
[root@docker-server sinatra]# docker build -t soso/centos:7 . 
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM daocloud.io/library/centos
latest: Pulling from library/centos
d8d02d457314: Pull complete 
Digest: sha256:a36b9e68613d07eec4ef553da84d0012a5ca5ae4a830cf825bb68b929475c869
Status: Downloaded newer image for daocloud.io/library/centos:latest
 ---> 67fa590cfc1c
Step 2/4 : MAINTAINER soso soso@docker-server
 ---> Running in aab3d80939d8
Removing intermediate container aab3d80939d8
 ---> 12bae7d75a23
....
```

2.4、创建完成后，从镜像创建容器

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455910.png)

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455891.png)

### 4.3 Dockerfile实例：容器化python的flask应用

目标：用Docker部署一个用Python编写的Web应用。

首先部署整个流程：

基础镜像（python）-->flask-->部署python应用

web框架 flask django

代码功能：

 如果当前环境中有"NAME"这个环境变量，就把它打印在"Hello"后，否则就打印"Hello world"，最后再打印出当前环境的 hostname。

```plain
[root@docker-server ~]# mkdir python_app
[root@docker-server ~]# cd python_app/
[root@docker-server python_app]# vim app.py
from flask import Flask
import socket
import os

app = Flask(__name__)

@app.route('/')
def hello():
    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname())

if name == "__main__":
    app.run(host='0.0.0.0', port=80)
```

应用依赖：

定义在同目录下的 requirements.txt 文件里，内容如下：

```plain
[root@docker-server python_app]# vim requirements.txt
Flask
```

Dockerfile制作容器镜像:

```plain
vim Dockerfile
FROM python:2.7-slim
WORKDIR /app
ADD . /app
RUN pip install --trusted-host pypi.python.org -r requirements.txt
EXPOSE 80
ENV NAME World
CMD ["python", "app.py"]
```

Dockerfile文件说明：

```plain
FROM python:2.7-slim
使用官方提供的 Python 开发镜像作为基础镜像
指定"python:2.7-slim"这个官方维护的基础镜像，从而免去安装 Python 等语言环境的操作。：

WORKDIR /app     ---cd /app
将工作目录切换为 /app,意思是在这一句之后，Dockerfile 后面的操作都以这一句指定的 /app 目录作为当前目录。

ADD . /app
将当前目录下的所有内容复制到 /app 下 Dockerfile 里的原语并不都是指对容器内部的操作。比如 ADD，指的是把当前目录（即 Dockerfile 所在的目录）里的文件，复制到指定容器内的目录当中。

RUN pip install --trusted-host pypi.python.org -r requirements.txt
使用 pip 命令安装这个应用所需要的依赖

EXPOSE 80
允许外界访问容器的 80 端口

ENV NAME World
设置环境变量

CMD ["python", "app.py"]
设置容器进程为：python app.py，即：这个 Python 应用的启动命令,这里app.py 的实际路径是 /app/app.py。CMD ["python", "app.py"] 等价于 "docker run python app.py"。
```

现在目录结构：

```plain
[root@docker-server python_app]# ls
Dockerfile  app.py   requirements.txt
```

构建镜像：

```plain
[root@docker-server python_app]# docker build -t testpython .
-t  给这个镜像加一个 Tag
```

Dockerfile 中的每个原语执行后，都会生成一个对应的镜像层。即使原语本身并没有明显地修改文件的操作（比如，ENV 原语），它对应的层也会存在。只不过在外界看来，这个层是空的。

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455933.png)

查看结果：

```plain
[root@docker-server python_app]# docker images
REPOSITORY                              TAG                 IMAGE ID           ...
testpython                              latest              16bc21f3eea3
```

启动容器：

```plain
[root@docker-server python_app]# docker run -it -p 4000:80 testpython /bin/bash
```

查看容器：

```plain
[root@docker-server python_app]# docker ps 
CONTAINER ID        IMAGE               COMMAND             CREATED                  
ce02568e64ce        testpython          "/bin/bash"         About a minute ago
```

进入容器：

```plain
[root@docker-server python_app]# docker exec -it ce02568 /bin/bash 
root@ce02568e64ce:/app# python app.py &        #将python运行起来
```

访问容器内应用：

```plain
[root@docker-server ~]# curl http://localhost:4000
<h3>Hello World!</h3><b>Hostname:</b> f201f6855136<br/>
```

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455905.png)

### 4.4 实战练习

```plain
1.创建一个jenkins的Dockerfile
[root@docker-server ~]# mkdir tomcat 
[root@docker-server ~]# cd tomcat/
将以下安装包拷贝至tomcat目录中
[root@docker-server1 tomcat]# ls
apache-tomcat-8.5.47.tar.gz  Dockerfile  jdk-8u211-linux-x64.tar.gz  jenkins.war
[root@docker-server tomcat]# vim Dockerfile
This my first jenkins Dockerfile
Version 1.0

FROM centos:7
MAINTAINER docker-server
ENV JAVA_HOME /usr/local/jdk1.8.0_211
ENV TOMCAT_HOME /usr/local/apache-tomcat-8.5.47
ENV PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
ENV CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib:$JAVA_HOME/lib/tools.jar
ADD apache-tomcat-8.5.47.tar.gz /usr/local/
ADD jdk-8u211-linux-x64.tar.gz /usr/local/
RUN rm -rf /usr/local/apache-tomcat-8.5.47/webapps/*
ADD jenkins.war /usr/local/apache-tomcat-8.5.47/webapps
RUN rm -rf apache-tomcat-8.5.47.tar.gz  jdk-8u211-linux-x64.tar.gz
EXPOSE 8080
ENTRYPOINT ["/usr/local/apache-tomcat-8.5.47/bin/catalina.sh","run"]  #运行命令

[root@docker-server tomcat]# pwd
/root/tomcat

[root@docker-server tomcat]# ls  #将jdk与tomcat还有jenkins的包上传到tomcat目录中
apache-tomcat-8.5.47.tar.gz  Dockerfile  jdk-8u211-linux-x64.tar.gz  jenkins.war
[root@docker-server tomcat]# docker build -t jenkins:v1 .
[root@docker-server tomcat]# docker run -itd --name jenkins1 -p 8081:8080 jenkins:v1
```

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455401.png)

扩展----CMD与ENTRYPOINT区别

```plain
一、Dockerfile中的CMD

1、每个Dockerfile中只能有一个CMD如果有多个那么只执行最后一个。
2、CMD 相当于启动docker时候后面添加的参数看，举个简单例子：
docker run -itd --name test image(镜像) /bin/bash -c
a、镜像名称后面跟了一个/bin/bash -c ，其实等价于在dockerfile中的CMD ["/bin/bash","-c"]。
b、如果dockerfile中的CMD中有了CMD["/bin/bash","-c"],那么就不用在执行的时候再添加了，如果添加了参数的话那么就相当于要执行你添加的参数，默认的CMD中的参数就无效了。
 
二、Dockerfile中的ENTRYPOINT
1、一个dockerfile中ENTRYPOINT也只能存在一个，若存在多个那么只执行最后一个，你可以理解为开机启动的意思，和CMD有点像，不过还是有区别。

2、举个简单例子：
a、dockerfile中有ENTRYPOINT ["tail","-f","/var/log/nginx/access.log"]，那么启动的时候镜像就执行了这个里面的内容，如果你像上面带参数的话就相当于在这个执行的内容后面再加入参数。
案例:
如果我们的dockerfile中有a中的这句话然后我们启动我们的docker:
docker run -itd --name test image(镜像名) /bin/bash -c

此时就相当于我们启动docker的时候执行了：tail -f /var/log/nginx/access.log /bin/bash -c
这个命令明显就不对.
```

### 4.5 Dockerfile优化

编译一个简单的nginx成功以后发现好几百M。

```plain
1、RUN 命令要尽量写在一条里，每次 RUN 命令都是在之前的镜像上封装，只会增大不会减小

2、每次进行依赖安装后，记得yum clean all【centos】
#yum clean all 清除缓存中的rpm头文件和包文件

3、选择比较小的基础镜像。alpine
```

## 5.部署私有仓库应用

私有仓库镜像:

registry --官方出品， 没有图形界面。Docker hub官方已提供容器镜像registry,用于搭建私有仓库

拉取镜像：

```plain
[root@docker-server ~]# docker pull daocloud.io/library/registry:latest
```

运行容器：

```plain
[root@docker-server ~]# docker run -d -v /home/dockerdata/registry:/var/lib/registry --name "pri_registry" --restart=always -p 5000:5000 daocloud.io/library/registry
参数解释:
/home/dockerdata/registry表示为宿主机的目录，如果不存在自动创建
-v映射目录：  宿主机的目录:容器目录
把宿主机的目录挂载到容器中，将数据目录挂载出来就是为了防止docker私有仓库这个容器被删除的时候，仓库里面的镜像也被删除。
-p 端口映射：本地端口:容器端口
```

注：如果创建容器不成功，报错防火墙，解决方案如下：

```plain
#systemctl stop firewalld
#yum install iptables*
#systemctl start iptables
#iptables -F
#systemctl restart docker
```

```plain
[root@docker-server ~]# docker ps 
CONTAINER ID        IMAGE                          COMMAND                  CREATED              STATUS              PORTS                    NAMES
0823df72b160        daocloud.io/library/registry   "/entrypoint.sh /etc…"   About a minute ago   Up About a minute   0.0.0.0:5000->5000/tcp   pri_registry
```

连接容器查看端口状态：

```plain
[root@docker-server ~]# docker exec -it  0823df7  /bin/sh
/ # netstat -lntp    #查看5000端口是否开启
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 :::5000                 :::*                    LISTEN      1/registry
/ #
```

在本机查看能否访问该私有仓库, 看看状态码是不是200

```plain
[root@docker-server ~]# curl -I http://127.0.0.1:5000
HTTP/1.1 200 OK
```

为了测试，下载1个比较小的镜像,buysbox

```plain
[root@docker-server ~]# docker pull daocloud.io/library/busybox
```

上传前必须给镜像打tag 注明ip和端口：

```plain
[root@docker-server ~]# docker tag daocloud.io/library/busybox 192.168.246.141:5000/busybox
```

下面这个Mysql是我测试的第二个镜像，从daocloud拉取的：

```plain
[root@docker-server ~]# docker pull daocloud.io/library/mysql
[root@docker-server ~]# docker tag daocloud.io/library/mysql 192.168.246.141:5000/daocloud.io/library/mysql
[root@docker-server ~]# docker images
```

注：tag后面可以使用镜像名称也可以使用id,我这里使用的镜像名称，如果使用官方的镜像，不需要加前缀，但是daocloud.io的得加前缀.

修改请求方式为http:

```plain
默认为https，不改会报以下错误:
Get https://master.up.com:5000/v1/_ping: http: server gave HTTP response to HTTPS client

[root@docker-server ~]# vim /etc/docker/daemon.json    #不存在则创建
{ "insecure-registries":["192.168.246.141:5000"] }
```

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455409.png)

```plain
重启docker：
[root@docker-server ~]# systemctl restart docker
```

上传镜像到私有仓库：

```plain
[root@docker-server ~]# docker push 192.168.246.141:5000/busybox
[root@docker-server ~]# docker push 192.168.246.141:5000/daocloud.io/library/mysql

宿主机查看存放镜像目录：
[root@docker-server ~]# ls /home/dockerdata/registry/docker/registry/v2/repositories/
```

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455426.png)

查看私有仓库里的所有镜像：

```plain
语法： # curl  http://ip:port/v2/repo名字/tags/list
[root@docker-server ~]# curl http://192.168.246.141:5000/v2/busybox/tags/list
{"name":"busybox","tags":["latest"]}

[root@docker-server ~]# curl http://192.168.246.141:5000/v2/daocloud.io/library/mysql/tags/list
{"name":"daocloud.io/library/mysql","tags":["latest"]} 

这条命令会查看仓库下面所有的镜像：
[root@docker-server ~]# curl http://192.168.246.141:5000/v2/_catalog
```

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455446.png)

拉取镜像测试：

```plain
1.先将刚才打了tags的镜像删掉
[root@docker-server ~]# docker rmi 192.168.246.141:5000/busybox
2.拉取镜像：
[root@docker-server ~]# docker pull 192.168.246.141:5000/busybox
[root@docker-server ~]# docker images
```

## 6.部署docker web ui应用

下载并运行容器：

```plain
[root@docker-server ~]# docker pull uifd/ui-for-docker
[root@docker-server ~]# docker run -it -d --name docker-web -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock docker.io/uifd/ui-for-docker
```

浏览器访问测试：

 ip:9000

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455467.png)

## 7.Docker资源限制

在使用 docker 运行容器时，一台主机上可能会运行几百个容器，这些容器虽然互相隔离，但是底层却使用着相同的 CPU、内存和磁盘资源。如果不对容器使用的资源进行限制，那么容器之间会互相影响，小的来说会导致容器资源使用不公平；大的来说，可能会导致主机和集群资源耗尽，服务完全不可用。

CPU 和内存的资源限制已经是比较成熟和易用，能够满足大部分用户的需求。磁盘限制也是不错的，虽然现在无法动态地限制容量，但是限制磁盘读写速度也能应对很多场景。

至于网络，docker 现在并没有给出网络限制的方案，也不会在可见的未来做这件事情，因为目前网络是通过插件来实现的，和容器本身的功能相对独立，不是很容易实现，扩展性也很差。

资源限制一方面可以让我们为容器（应用）设置合理的 CPU、内存等资源，方便管理；另外一方面也能有效地预防恶意的攻击和异常，对容器来说是非常重要的功能。

系统压力测试工具stress：stress是一个linux下的压力测试工具，专门为那些想要测试自己的系统，完全高负荷和监督这些设备运行的用户。

### 7.1 cpu资源限制

1）限制CPU Share

什么是cpu share？

docker 允许用户为每个容器设置一个数字，代表容器的 CPU share，默认情况下每个容器的 share 是 1024。这个 share 是相对的，本身并不能代表任何确定的意义。当主机上有多个容器运行时，每个容器占用的 CPU 时间比例为它的 share 在总额中的比例。docker 会根据主机上运行的容器和进程动态调整每个容器使用 CPU 的时间比例。

例子： 如果主机上有两个一直使用 CPU 的容器（为了简化理解，不考虑主机上其他进程），其 CPU share 都是 1024，那么两个容器 CPU 使用率都是 50%；如果把其中一个容器的 share 设置为 512，那么两者 CPU 的使用率分别为 70% 和 30%；如果删除 share 为 1024 的容器，剩下来容器的 CPU 使用率将会是 100%。

好处：能保证 CPU 尽可能处于运行状态，充分利用 CPU 资源，而且保证所有容器的相对公平；

缺点：无法指定容器使用 CPU 的确定值。

设置 CPU share 的参数：

```plain
-c --cpu-shares，它的值是一个整数
```

我的机器是 4 核 CPU，因此运行一个stress容器,使用 stress 启动 4 个进程来产生计算压力：（无CPU限制）

```plain
[root@docker-server ~]# docker pull progrium/stress
[root@docker-server ~]# yum -y install epel-release
[root@docker-server ~]# yum install -y htop
[root@docker-server ~]# docker run --rm -it progrium/stress --cpu 4
stress: info: [1] dispatching hogs: 4 cpu, 0 io, 0 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 12000us
stress: dbug: [1] --> hogcpu worker 4 [6] forked
stress: dbug: [1] using backoff sleep of 9000us
stress: dbug: [1] --> hogcpu worker 3 [7] forked
stress: dbug: [1] using backoff sleep of 6000us
stress: dbug: [1] --> hogcpu worker 2 [8] forked
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogcpu worker 1 [9] forked
```

在另外一个 terminal 使用 htop 查看资源的使用情况：

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455522.png)

上图中看到，CPU 四个核资源都达到了 100%。

为了比较，另外启动一个 share 为 512 的容器：

```plain
1.先将没有做限制的命令运行起来
[root@docker-server ~]# docker run --rm -it progrium/stress --cpu 4
2.在开启一个终端，运行做了CPU限制的命令
[root@docker-server ~]# docker run --rm -it -c 512 progrium/stress --cpu 4
stress: info: [1] dispatching hogs: 4 cpu, 0 io, 0 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 12000us
stress: dbug: [1] --> hogcpu worker 4 [6] forked
stress: dbug: [1] using backoff sleep of 9000us
stress: dbug: [1] --> hogcpu worker 3 [7] forked
stress: dbug: [1] using backoff sleep of 6000us
stress: dbug: [1] --> hogcpu worker 2 [8] forked
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogcpu worker 1 [9] forked
3.在开启一个终端执行htop命令
[root@docker-server ~]# htop
```

因为默认情况下，容器的 CPU share 为 1024，所以这两个容器的 CPU 使用率应该大致为 2：1，下面是启动第二个容器之后的监控截图：

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455711.png)

两个容器分别启动了四个 stress 进程，第一个容器 stress 进程 CPU 使用率都在 60% 左右，第二个容器 stress 进程 CPU 使用率在 30% 左右，比例关系大致为 2：1，符合之前的预期。

### 7.2 限制CPU 核数

限制容器能使用的 CPU 核数

```plain
-c --cpu-shares 参数只能限制容器使用 CPU 的比例，或者说优先级，无法确定地限制容器使用 CPU 的具体核数；从 1.13 版本之后，docker 提供了 --cpus 参数可以限定容器能使用的 CPU 核数。这个功能可以让我们更精确地设置容器 CPU 使用量，是一种更容易理解也因此更常用的手段.
```

```plain
--cpus 后面跟着一个浮点数，代表容器最多使用的核数，可以精确到小数点二位，也就是说容器最小可以使用 0.01 核 CPU。
```

限制容器只能使用 1.5 核数 CPU：

```plain
[root@docker-server ~]# docker run --rm -it --cpus 1.5 progrium/stress --cpu 3
stress: info: [1] dispatching hogs: 3 cpu, 0 io, 0 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 9000us
stress: dbug: [1] --> hogcpu worker 3 [6] forked
stress: dbug: [1] using backoff sleep of 6000us
stress: dbug: [1] --> hogcpu worker 2 [7] forked
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogcpu worker 1 [8] forked
```

在容器里启动三个 stress 来跑 CPU 压力，如果不加限制，这个容器会导致 CPU 的使用率为 300% 左右（也就是说会占用三个核的计算能力）。实际的监控如下图：

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455744.png)

可以看到，每个 stress 进程 CPU 使用率大约在 50%，总共的使用率为 150%，符合 1.5 核的设置。

如果设置的 --cpus 值大于主机的 CPU 核数，docker 会直接报错：

```plain
[root@docker-server ~]# docker run --rm -it --cpus 8 progrium/stress --cpu 3  #启用三个进程做测试
docker: Error response from daemon: Range of CPUs is from 0.01 to 4.00, as there are only 4 CPUs available.
See 'docker run --help'.
```

如果多个容器都设置了 --cpus ，并且它们之和超过主机的 CPU 核数，并不会导致容器失败或者退出，这些容器之间会竞争使用 CPU，具体分配的 CPU 数量取决于主机运行情况和容器的 CPU share 值。也就是说 --cpus 只能保证在 CPU 资源充足的情况下容器最多能使用的 CPU 数，docker 并不能保证在任何情况下容器都能使用这么多的 CPU（因为这根本是不可能的）。

### 7.3 CPU 绑定

限制容器运行在某些 CPU 核

注：

一般并不推荐在生产中这样使用

docker 允许调度的时候限定容器运行在哪个 CPU 上。

案例：

假如主机上有 4 个核，可以通过 --cpuset 参数让容器只运行在前两个核上：

```plain
[root@docker-server ~]# docker run --rm -it --cpuset-cpus=0,1 progrium/stress --cpu 2 
stress: info: [1] dispatching hogs: 2 cpu, 0 io, 0 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 6000us
stress: dbug: [1] --> hogcpu worker 2 [6] forked
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogcpu worker 1 [7] forked
```

这样，监控中可以看到只有前面两个核 CPU 达到了 100% 使用率。

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455800.png)

### 7.4 memory资源限制

docker默认没有对容器内存进行限制，容器可以使用主机提供的所有内存。

不限制内存带来的问题：

这是非常危险的事情，如果某个容器运行了恶意的内存消耗软件，或者代码有内存泄露，很可能会导致主机内存耗尽，因此导致服务不可用。可以为每个容器设置内存使用的上限，一旦超过这个上限，容器会被杀死，而不是耗尽主机的内存。

限制内存带来的问题：

限制内存上限虽然能保护主机，但是也可能会伤害到容器里的服务。如果为服务设置的内存上限太小，会导致服务还在正常工作的时候就被 OOM 杀死；如果设置的过大，会因为调度器算法浪费内存。

合理做法：

1）为应用做内存压力测试，理解正常业务需求下使用的内存情况，然后才能进入生产环境使用

2）一定要限制容器的内存使用上限，尽量保证主机的资源充足，一旦通过监控发现资源不足，就进行扩容或者对容器进行迁移

3）尽量不要使用 swap，swap 的使用会导致内存计算复杂，对调度器非常不友好

docker 限制容器内存使用量:

```plain
docker 启动参数中，和内存限制有关的包括（参数的值一般是内存大小，也就是一个正数，后面跟着内存单位 b、k、m、g，分别对应 bytes、KB、MB、和 GB):
-m --memory：容器能使用的最大内存大小，最小值为 4m
```

如果限制容器的内存使用为 64M，在申请 64M 资源的情况下，容器运行正常（如果主机上内存非常紧张，并不一定能保证这一点）：

```plain
[root@docker-server ~]# docker run --rm -it -m 64m progrium/stress --vm 1 --vm-bytes 64M --vm-hang 0
stress: info: [1] dispatching hogs: 0 cpu, 0 io, 1 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogvm worker 1 [6] forked
stress: dbug: [6] allocating 67108864 bytes ...
stress: dbug: [6] touching bytes in strides of 4096 bytes ...
stress: dbug: [6] sleeping forever with allocated memory

容器可以正常运行。
-m 64m：限制你这个容器只能使用64M
--vm-bytes 64M：将内存撑到64兆是不会报错，因为我有64兆内存可用。
hang:就是卡在这里。
--vm：生成几个占用内存的进程
```

而如果申请 150M 内存，会发现容器里的进程被 kill 掉了（worker 6 got signal 9，signal 9 就是 kill 信号）

```plain
[root@docker-server ~]# docker run --rm -it -m 64m progrium/stress --vm 1 --vm-bytes 150M --vm-hang 0
stress: info: [1] dispatching hogs: 0 cpu, 0 io, 1 vm, 0 hdd
stress: dbug: [1] using backoff sleep of 3000us
stress: dbug: [1] --> hogvm worker 1 [6] forked
stress: dbug: [6] allocating 157286400 bytes ...
stress: dbug: [6] touching bytes in strides of 4096 bytes ...
stress: FAIL: [1] (416) <-- worker 6 got signal 9
stress: WARN: [1] (418) now reaping child worker processes
stress: FAIL: [1] (422) kill error: No such process
stress: FAIL: [1] (452) failed run completed in 1s
```

### 7.5 IO资源限制(了解)

对于磁盘来说，考量的参数是容量和读写速度，因此对容器的磁盘限制也应该从这两个维度出发。目前 docker 支持对磁盘的读写速度进行限制，但是并没有方法能限制容器能使用的磁盘容量（一旦磁盘 mount 到容器里，容器就能够使用磁盘的所有容量）。

1）第一种是：磁盘的读写速率的限制

2）第二种是：磁盘的读写频率的限制

## 8.端口转发

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455777.png)

使用端口转发解决容器端口访问问题

-p:创建应用容器的时候，一般会做端口映射，这样是为了让外部能够访问这些容器里的应用。可以用多个-p指定多个端口映射关系。

mysql应用端口转发：

查看本地地址：

```plain
[root@docker-server ~]# ip a 
...
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:9c:bf:66 brd ff:ff:ff:ff:ff:ff
    inet 192.168.246.141/24 brd 192.168.246.255 scope global dynamic ens33
       valid_lft 5217593sec preferred_lft 5217593sec
    inet6 fe80::a541:d470:4d9a:bc29/64 scope link
       valid_lft forever preferred_lft forever
```

运行容器：使用-p作端口转发，把本地3307转发到容器的3306，其他参数需要查看发布容器的页面提示

```plain
[root@docker-server ~]# docker pull daocloud.io/library/mysql:5.7
[root@docker-server ~]# docker run -d --name mysql1 -p 3307:3306  -e MYSQL_ROOT_PASSWORD=Qf@123! daocloud.io/library/mysql:5.7
a4327dbddf665b4302c549320bff869b8a027c2e1eead363d84ce5d06acf2698

-e MYSQL_ROOT_PASSWORD= 设置环境变量，这里是设置mysql的root用户的密码
```

通过本地IP：192.168.246.141的3307端口访问容器mysql1内的数据库，出现如下提示恭喜你

```plain
1.安装一个mysql客户端
[root@docker-server ~]# yum install -y mysql
2.登录
[root@docker-server ~]# mysql -uroot -p'Qf@123!' -h 192.168.246.141 -P 3307
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.26 MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]>
```

-P（大P）:当使用-P标记时，Docker 会随机映射一个 32768~49900 的端口到内部容器开放的网络端口。如下：

```plain
[root@docker-server ~]# docker pull daocloud.io/library/redis
[root@docker-server ~]# docker images
REPOSITORY                   TAG        IMAGE ID            CREATED           SIZE
daocloud.io/library/redis    latest     598a6f110d01        2months ago       118MB
[root@docker-server ~]# docker run --name myredis -P -d daocloud.io/library/redis
ca06a026d84a0605d9a9ce6975389a79f4ab9a9a043a03f088cd909c1fe52e29
[root@docker-server ~]# docker ps 
CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS              PORTS                               NAMES
ca06a026d84a        daocloud.io/library/redis       "docker-entrypoint.s…"   22 seconds ago      Up 21 seconds       0.0.0.0:32768->6379/tcp             myredis
从上面的结果中可以看出，本地主机的32768端口被映射到了redis容器的6379端口上，也就是说访问本机的32768端口即可访问容器内redis端口。
在别的机器上通过上面映射的端口32768连接这个容器的redis
[root@docker-server2 ~]# yum install -y redis
[root@docker-server2 ~]# redis-cli -h 192.168.246.141 -p 32768
192.168.246.141:32768> ping
PONG
192.168.246.141:32768>
```

## 9.容器卷

把本地宿主机上面的某一个目录挂载到容器里面的目录去。这两个目录都不用提前存在，会自动创建

新卷只能在容器创建过程当中挂载

```plain
[root@docker-server ~]# docker run -it --name testnginx -v /test:/test2 daocloud.io/library/nginx /bin/bash
root@86320e734cd1:/# ls
root@86320e734cd1:/# ctrl+p+q  #退出  · 

测试：
[root@docker-server ~]# cd /test/
[root@docker-server test]# ls
[root@docker-server test]# touch a.txt 
[root@docker-server test]# cd
[root@docker-server ~]# docker exec -it testnginx /bin/bash
root@86320e734cd1:/# cd test2/
root@86320e734cd1:/test2# ls
a.txt

共享文件：
[root@docker-server ~]# mkdir /dir
[root@docker-server ~]# vim /dir/a.txt
123
[root@docker-server ~]# docker run -it --name testnginx2 -v /dir/a.txt:/dir1/a.txt daocloud.io/library/nginx /bin/bash
root@f899be627552:/# cat dir1/a.txt 
123
root@f899be627552:/#
```

共享其他容器的卷（其他容器用同一个卷）：

```plain
[root@docker-server ~]# docker run -it --name testnginx1 --volumes-from testnginx daocloud.io/library/nginx /bin/bash
root@50e6f726335c:/# ls
bin   dev  home  lib64  mnt  proc  run   srv  test2  usr
boot  etc  lib   media  opt  root  sbin  sys  tmp    var
root@50e6f726335c:/# cd test2/
root@50e6f726335c:/test2# ls
a.txt
```

实际应用中可以利用多个-v选项把宿主机上的多个目录同时共享给新建容器：

比如：

```plain
docker run -it -v /abc:/abc -v /def:/def 1ae9
```

## 10.部署centos7容器应用

镜像下载：

```plain
[root@docker-server ~]# docker pull daocloud.io/library/centos:7
```

systemd 整合:

因为 systemd 要求 CAPSYSADMIN 权限，从而得到了读取到宿主机 cgroup 的能力，CentOS7 中已经用 fakesystemd 代替了 systemd 。 但是我们使用systemd，可用参考下面的 Dockerfile：

```plain
[root@docker-server ~]# mkdir test
[root@docker-server ~]# cd test/
[root@docker-server test]# vim Dockerfile
FROM daocloud.io/library/centos:7
MAINTAINER "soso"  soso@qq.com
ENV container docker

RUN yum -y swap -- remove fakesystemd -- install systemd systemd-libs
RUN yum -y update; yum clean all; \
(cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;

VOLUME [ "/sys/fs/cgroup" ]

CMD ["/usr/sbin/init"]
```

这个Dockerfile删除fakesystemd 并安装了 systemd。然后再构建基础镜像:

```plain
[root@docker-server test]# docker build -t local/c7-systemd .
```

执行没有问题这就生成一个包含 systemd 的应用容器示例

```plain
[root@docker-server test]# docker images
REPOSITORY         TAG                 IMAGE ID            CREATED             SIZE
local/c7-systemd   latest              a153dcaa642e        6 minutes ago       391MB
```

为了使用像上面那样包含 systemd 的容器，需要创建一个类似下面的Dockerfile：

```plain
[root@docker-server test]# mkdir http
[root@docker-server test]# cd http/
[root@docker-server http]# vim Dockerfile
FROM local/c7-systemd
RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
EXPOSE 80
CMD ["/usr/sbin/init"]
```

构建镜像:

```plain
[root@docker-server http]# docker build -t local/c7-systemd-httpd .
```

运行包含 systemd 的应用容器:

为了运行一个包含 systemd 的容器，需要使用--privileged选项， 并且挂载主机的 cgroups 文件夹。 下面是运行包含 systemd 的 httpd 容器的示例命令：

```plain
[root@docker-server http]# docker run --privileged -tid -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 80:80 local/c7-systemd-httpd

--privileged:授权提权。让容器内的root用户拥有真正root权限(有些权限是没有的)
```

注意：如果不加会运行在前台(没有用-d)，可以用ctrl+p+q放到后台去

测试可用：

```plain
[root@docker-server http]# yum install -y elinks
[root@docker-server http]# elinks --dump http://192.168.246.141 #apache的默认页面
                                 Testing 123..

   This page is used to test the proper operation of the [1]Apache HTTP
   server after it has been installed. If you can read this page it means
   that this site is working properly. This server is powered by [2]CentOS.
```

再来个安装openssh-server的例子：

```plain
[root@docker-server http]# cd ..
[root@docker-server test]# mkdir ssh
[root@docker-server test]# cd ssh/
[root@docker-server ssh]# vim Dockerfile
FROM local/c7-systemd
RUN yum -y install openssh-server; yum clean all; systemctl enable sshd.service
RUN echo 1 | passwd --stdin root
EXPOSE 22
CMD ["/usr/sbin/init"]
[root@docker-server ssh]# docker build --rm -t local/c7-systemd-sshd .
[root@docker-server ssh]# docker run --privileged -tid -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 2222:22 local/c7-systemd-sshd
[root@docker-server ssh]# ssh 192.168.246.141 -p 2222
[root@ce1af52a6f6c ~]#
```

## 11.Docker数据存储位置

```plain
查看存储路径
[root@docker-server ~]# docker info | grep Root
 Docker Root Dir: /var/lib/docker

修改默认存储位置：
在dockerd的启动命令后面追加--data-root参数指定新的位置
[root@docker-server ~]# vim  /usr/lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --data-root=/data

[root@docker-server ~]# systemctl daemon-reload 
[root@docker-server ~]# systemctl restart docker

查看是否生效：
[root@docker-server ~]# docker info | grep Root
 Docker Root Dir: /data
 
[root@docker-server ~]# cd /data/
[root@docker-server data]# ls
builder  buildkit  containers  image  network  overlay2  plugins  runtimes  swarm  tmp  trust  volumes
```

## 12.Docker网络

### 12.1 容器网络分类

注：

面试用，用了编排之后就没有用了

查看当前网络：

```plain
[root@docker-server ~]# docker network list
NETWORK ID          NAME                DRIVER              SCOPE
9b902ee3eafb        bridge              bridge              local
140a9ff4bb94        host                host                local
d1210426b3b0        none                null                local
```

docker安装后，默认会创建3种网络类型，bridge、host和none

1、bridge:网络桥接

默认情况下启动、创建容器都是用该模式，所以每次docker容器重启时会按照顺序获取对应ip地址。

2、none：无指定网络

启动容器时，可以通过--network=none,docker容器不会分配局域网ip

3、host：主机网络

docker容器和主机共用一个ip地址。

使用host网络创建容器：

```plain
[root@docker-server ~]# docker run -it --name testnginx2 --net host 98ebf73ab
[root@docker-server ~]# netstat -lntp | grep 80
tcp6       0      0 :::80                   :::*                    LISTEN      3237/docker-proxy
浏览器访问宿主ip地址
```

4、固定ip:

创建固定IP的容器：

4.1、创建自定义网络类型，并且指定网段

```plain
[root@docker-server ~]# docker network create --subnet=192.168.0.0/16 staticnet
4efd309244c6ad70eda2d047a818a3aec5b162f5ca29fb6024c09a5efbf15854
通过docker network ls可以查看到网络类型中多了一个staticnet:
[root@docker-server ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
9b902ee3eafb        bridge              bridge              local
140a9ff4bb94        host                host                local
d1210426b3b0        none                null                local
4efd309244c6        staticnet           bridge              local
```

 4.2、使用新的网络类型创建并启动容器

```plain
[root@docker-server ~]# docker run -itd --name server --net staticnet --ip 192.168.0.2 daocloud.io/library/centos:7
 通过docker inspect可以查看容器ip为192.168.0.2:
[root@docker-server ~]# docker inspect userserver | grep -i ipaddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "192.168.0.2",

关闭容器并重启，发现容器ip并未发生改变
```

4.3、删除已创建网络

```plain
需要删除使用当前网络的容器。才能删除网络
[root@docker-server]# docker network rm staticnet
```

### 12.2 异主容器互联

#### 方式1、路由方式

小规模docker环境大部分运行在单台主机上，如果公司大规模采用docker，那么多个宿主机上的docker如何互联

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455794.png)

Docker默认的内部ip为172.17.42.0网段，所以必须要修改其中一台的默认网段以免ip冲突。

```plain
注:docker版本为1.13
1.在docker-server1上面操作----192.168.246.141
[root@docker-server1 ~]# docker pull daocloud.io/library/centos
[root@docker-server1 ~]# vim /etc/sysconfig/docker-network
DOCKER_NETWORK_OPTIONS=--bip=172.17.0.1/16
[root@docker-server1 ~]# vim /etc/sysctl.conf
net.ipv4.ip_forward=1
[root@docker-server1 ~]# sysctl -p
[root@docker-server1 ~]# reboot
[root@docker-server1 ~]# docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
daocloud.io/library/centos   latest              0f3e07c0138f        3 weeks ago         220MB
[root@docker-server1 ~]# docker run -it --name centos daocloud.io/library/centos:latest /bin/bash
[root@ef1a4d6be97f /]#
[root@docker-server1 ~]# docker inspect centos | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
                    "IPAddress": "172.17.0.2",
===============================================
2.docker-server2(192.168.246.143)上：
[root@docker-server2 ~]# vim /etc/sysconfig/docker-network
DOCKER_NETWORK_OPTIONS=--bip=172.18.0.1/16
[root@docker-server2 ~]# vim /etc/sysctl.conf
net.ipv4.ip_forward = 1
[root@docker-server2 ~]# sysctl -p
[root@docker-server2 ~]# reboot
[root@docker-server2 ~]# systemctl daemon-reload
[root@docker-server2 ~]# systemctl restart docker
[root@docker-server2 ~]# docker images
REPOSITORY                   TAG                 IMAGE ID            CREATED             SIZE
daocloud.io/library/centos   latest              0f3e07c0138f        3 weeks ago         220MB
[root@docker-server2 ~]# docker run -it --name centos daocloud.io/library/centos:latest /bin/bash 
[root@c84a8c704d03 /]#
[root@docker-server2 ~]# docker inspect centos| grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "172.18.0.2",
                    "IPAddress": "172.18.0.2",
```

添加路由：

```plain
[root@docker-server1 ~]# route add -net 172.18.0.0/16 gw 192.168.246.143
[root@docker-server2 ~]# route add -net 172.17.0.0/16 gw 192.168.246.141
```

验证：

进入到docker-server1主机的centos容器中，ping docker-server2主机的centos容器，进行测试

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455825.png)

进入到docker-server2主机的centos容器中，ping docker-server1主机的centos容器，进行测试

![](http://img.mingfancloud.cn/University-studies/docker/DockerTeaching/202411051455081.png)

现在两台宿主机里的容器就可以通信了。

#### 方式2、open vswitch

如果要在生产和测试环境大规模采用docker技术，首先就需要解决不同物理机建的docker容器互联问题。

centos7环境下可以采用open vswitch实现不同物理服务器上的docker容器互联

