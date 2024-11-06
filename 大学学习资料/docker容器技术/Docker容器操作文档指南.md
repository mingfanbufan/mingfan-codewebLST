# Docker容器操作指南

> 本文作者：[明凡]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)



## 1.安装CentOS 7

### 1.1 VMware安装CentOS 7

系统镜像下载：

[https://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso](https://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso)

#### 1.1.1 CentOS Yum源目录

CentOS Yum源均在/etc/yum.repos.d/目录下，输入以下命令切换至该目录下

```plain
cd /etc/yum.repos.d/
```

#### 1.1.2 更新Yum源

CentOS 7自带Yum源无法使用，需要更新Yum源

阿里云官方镜像站：`https://developer.aliyun.com/mirror/`

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303626.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303615.png)

#### 1.1.3 更换Yum源步骤

（`wget`和`curl`选其一）

①使用 `wget` 命令下载文件：

```plain
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

如果提示 -bash: wget: command not found 则代表示系统中没有安装 `wget` 工具，因此无法使用 `wget` 命令下载文件。你可以尝试使用其他方法来下载文件，比如使用 `curl` 命令或直接在浏览器中下载。

②使用 curl 命令下载文件：如果系统中有 `curl` 工具，你可以使用以下命令下载文件：

```plain
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

③在浏览器中下载：

你也可以在浏览器中打开链接 `http://mirrors.aliyun.com/repo/Centos-7.repo`，将镜像源文件 “Centos-7.repo” 下载到本地电脑，然后手动将文件上传至CentOS。

暂时无法在飞书文档外展示此内容

#### 1.1.4执行Yum源更新命令

```plain
yum -y update    //更新yum
yum clean all    //清除yum缓存
yum makecache    //重建yum缓存
```

#### 1.1.5 Linux常用包下载

```plain
yum install -y bash-completion    //命令行补全
yum install -y net-tools          //网络工具
```

### 1.2 ECS（弹性云服务器）安装CentOS 7

#### 1.2.1 登录阿里云控制台

阿里云免费试用ECS申请[ECS弹性计算服务免费资源申请](https://q1h6kdpo24v.feishu.cn/docx/P9wJdgoFhow9AHxWYfjcgq9NnBg?from=from_copylink)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303555.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303641.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303711.png)

#### 1.2.2 CentOS主机名修改

查看当前主机名:

```plain
hostnamectl
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303544.png)

临时修改主机名，重启失效：

```plain
hostname docker                        //临时修改，重启失效
su                                     //命名生效；用法：切换当前用户身份到其他用户身份，特别是切换到超级用户（root）身份
```

永久修改主机名，重启不失效：

```plain
hostnamectl set-hostname docker        //永久修改
su                                     //命名生效；用法：切换当前用户身份到其他用户身份，特别是切换到超级用户（root）身份
```

#### 1.2.3 查看操作系统发行版信息

```plain
cat /etc/redhat-release
```

## 2.Docker安装

### 2.1 查看CentOS内核版本

Docker要求CentOS的内核版本不低于3.10

```plain
uname -r
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303989.png)

### 2.2 删除已安装的Docker

```plain
yum remove docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-selinux \
docker-engine-selinux \
docker-engine
```

### 2.3 配置Docker Yum源

使用阿里云docker Yum源安装新版docker

```plain
yum install -y yum-utils device-mapper-persistent-data lvm2 git
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 2.4 安装、卸载、运行Docker

#### 2.4.1 安装Docker-ce

```plain
yum install -y docker-ce    //安装Docker-ce，社区版
```

#### 2.4.2 卸载Docker（需要时卸载）

```plain
yum remove docker-ce docker-ce-cli containerd.io       //卸载docker
rm -rf /var/lib/docker                                 //删除资源
```

### 2.4.3 Docker基本Linux命令

```plain
systemctl start docker     //启动docker
systemctl enable docker    //设置docker开机自启
systemctl stop docker      //停止docker
systemctl restart docker   //重启docker
systemctl status docker    //查看docker运行状态
```

#### 2.4.4 查看Docker版本

```plain
docker -v                   //查看docker版本号
docker version              //查看docker的系统信息，包括镜像和容器的数量
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303149.png)

### 2.5 配置Docker镜像加速器

Docker拉取镜像的源在国外，不配置加速器无法拉取镜像或速度慢！！！

#### 2.5.1 获取加速器地址

访问华为云官网`https://www.huaweicloud.com/`，登录华为云账号，产品→容器→容器镜像服务

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303117.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303326.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303353.png)

加速器地址：`https://88a8bf279d4a486ba021cdfcb4abc36d.mirror.swr.myhuaweicloud.com`

#### 2.5.2 配置镜像加速

修改或创建daemon.json配置文件

```plain
vi /etc/docker/daemon.json
#将以下内容添加到daemon.json文件内
{
    "registry-mirrors": [ "https://88a8bf279d4a486ba021cdfcb4abc36d.mirror.swr.myhuaweicloud.com" ]
}
#重启Docker引擎
systemctl restart docker
```

```plain
{
  "registry-mirrors": [
    "https://register.liberx.info",
    "https://dockerpull.com",
    "https://docker.anyhub.us.kg",
    "https://dockerhub.jobcher.com",
    "https://dockerhub.icu",
    "https://docker.awsl9527.cn"
    ]
}
```

查看修改结果：

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303314.png)

执行docker info，当Registry Mirrors字段的地址为加速器的地址时，说明加速器已经配置成功。

```plain
docker info
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303344.png)

## 3.Docker使用

### 3.1 Docker镜像命令

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303512.png)

## 单词解释：

  repository 镜像的仓库源tag 镜像的标签image id 镜像的idcreated 镜像的创建时间size 镜像的大小

```plain
docker images -a        //列出所有镜像
docker images -q        //只显示镜像id
```

#### 3.1.1 搜索镜像

docker search xxxx；如搜索ngnix：

```plain
docker search nginx
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303716.png)

#### 3.1.2 拉取镜像

docker pull xxxx；如拉取nginx：

```plain
docker pull nginx
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303685.png)

#### 3.1.3 查看本地镜像

docker images 或 docker images xxxx

```plain
docker images
docker images nginx    //查看本地nginx镜像
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303730.png)

#### 3.1.4 删除镜像

```plain
docker rmi IMAGE ID                        //删除指定镜像
docker rmi -f IMAGE ID IMAGE ID IMAGE ID   //删除多个镜像
docker rmi -f $(docker images -aq)         //删除全部镜像
```

删除tomcat镜像：

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303736.png)

```plain
docker rmi bf4709e77b18
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303834.png)

### 3.2 Docker容器命令

#### 3.2.1 查看容器

```plain
docker ps       //查看运行中的容器
docker ps -a    //查看所有的容器（包括未运行的容器）
```

#### 3.2.2 运行容器

```plain
docker run --name nginx -p 8080:80 -d nginx
            指定容器名称  端口映射  后台运行 镜像名称
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303924.png)

参数说明：--name nginx：指定容器名称。

 -p 8080:80：端口进行映射，将本地 8080 端口映射到容器内部的 80 端口。

-d nginx：设置容器在后台一直运行。

 -it 使用交互方式运行，进入容器查看内容

docker run流程：

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303177.png)

#### 3.2.3 停止运行中的容器

docker stop container-name/container-id；如停止nginx容器

```plain
docker stop nginx
```

#### 3.3.4 启动和停止容器

docker start container-name/container-id；如启动nginx容器

```plain
docker start nginx        //启动
docker restart nginx      //重启
docker kill nginx         //强制停止
```

#### 3.2.5 删除容器

docker rm container-name/container-id；如删除nginx容器

```plain
docker rm nginx                       //删除单个容器，不能删除正在运行的容器，强制删除rm -f
docker rm -f 容器ID 容器ID             //删除多个容器
docker rm -f $(docker ps -aq)         //删除全部容器（递归删除）
docker ps -a -q|xargs docker rm       //删除全部容器
```

删除容器示例：

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303193.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303234.png)

#### 3.2.6 查看容器的日志

docker logs container-name/container-id；如查看nginx日志

```plain
docker logs nginx
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303296.png)

#### 3.2.7 查看镜像详细信息

docker inspect container-name/container-id；如查看nginx详细信息

```plain
docker inspect nginx
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303394.png)

#### 3.2.8 在运行的容器中执行命令

```plain
sudo docker exec -it <容器ID> /bin/bash     //进入当前容器
exit                                        //退出当前容器
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303543.png)

#### 3.2.9 从容器内拷贝文件到主机

```plain
docker cp <容器id>:容器内文件路径 目的主机路径
```

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303583.png)

#### 3.2.10 容器重命名

docker rename <容器ID> <容器名字>

```plain
[root@docker etc]# docker ps
CONTAINER ID   IMAGE                    COMMAND              CREATED       STATUS       PORTS                                                           NAMES
52b58ff3599c   centos                   "/bin/bash"          5 hours ago   Up 5 hours                                                                   modest_poincare
2874015af5c2   httpd                    "httpd-foreground"   5 hours ago   Up 5 hours   0.0.0.0:80->80/tcp, :::80->80/tcp                               confident_chebyshev
0692a3c1d93b   portainer/portainer-ce   "/portainer"         4 weeks ago   Up 8 hours   8000/tcp, 9443/tcp, 0.0.0.0:9001->9000/tcp, :::9001->9000/tcp   portainer
[root@docker etc]# docker rename 2874015af5c2 httpd
[root@docker etc]# docker ps
CONTAINER ID   IMAGE                    COMMAND              CREATED       STATUS       PORTS                                                           NAMES
52b58ff3599c   centos                   "/bin/bash"          5 hours ago   Up 5 hours                                                                   modest_poincare
2874015af5c2   httpd                    "httpd-foreground"   5 hours ago   Up 5 hours   0.0.0.0:80->80/tcp, :::80->80/tcp                               httpd
0692a3c1d93b   portainer/portainer-ce   "/portainer"         4 weeks ago   Up 8 hours   8000/tcp, 9443/tcp, 0.0.0.0:9001->9000/tcp, :::9001->9000/tcp   portainer
```

#### 3.2.11 基于容器生成新的镜像

docker commit命令将该容器提交并在本地生成新的镜像。

docker commit <容器ID> <镜像名称>

```plain
[root@docker etc]# docker ps
CONTAINER ID   IMAGE                    COMMAND              CREATED       STATUS       PORTS                                                           NAMES
52b58ff3599c   centos                   "/bin/bash"          5 hours ago   Up 5 hours                                                                   modest_poincare
2874015af5c2   httpd                    "httpd-foreground"   6 hours ago   Up 6 hours   0.0.0.0:80->80/tcp, :::80->80/tcp                               httpd
0692a3c1d93b   portainer/portainer-ce   "/portainer"         4 weeks ago   Up 8 hours   8000/tcp, 9443/tcp, 0.0.0.0:9001->9000/tcp, :::9001->9000/tcp   portainer
[root@docker etc]# docker commit 52b58ff3599c centos-next
sha256:2b9acc114fb6c20116bce35108c36bfbbe8e1bf391031e91f7257e19fc2c3b1a
[root@docker etc]# docker images
REPOSITORY                                                                   TAG             IMAGE ID       CREATED         SIZE
centos-next                                                                  latest          2b9acc114fb6   9 seconds ago   233MB
portainer/portainer-ce                                                       latest          9c0b5a6a7e4d   4 weeks ago     301MB
mysql                                                                        latest          680b8c60dce6   2 months ago    586MB
httpd                                                                        latest          5daf6a4bfe74   2 months ago    148MB
centos                                                                       latest          5d0da3dc9764   3 years ago     231MB
crpi-b2rfixvy6w6eq5ew.cn-hangzhou.personal.cr.aliyuncs.com/flowing/flowing   aliyun-tomcat   bf4709e77b18   3 years ago     667MB
tomcat                                                                       latest          bf4709e77b18   3 years ago     667MB
swr.cn-north-4.myhuaweicloud.com/flowing/tomcat                              0911            bf4709e77b18   3 years ago     667MB
```

### 3.3 Dockerfile

#### 3.3.1 基本语法

Dockerfile由一系列指令和参数构成，每条指令都会创建一个新的镜像层。以下是一些常用的Dockerfile指令：

1. FROM：指定基础镜像，所有后续操作都基于这个镜像。
2. LABEL：为镜像添加元数据。
3. RUN：在镜像中执行命令，通常用于安装软件包、配置环境等。
4. CMD：指定容器启动时默认执行的命令。
5. ENTRYPOINT：配置容器启动时运行的命令，且该命令不会被docker run提供的参数覆盖。
6. EXPOSE：声明容器运行时监听的端口。
7. ENV：设置环境变量。
8. ADD：将文件、目录或远程URL内容添加到镜像中，并可以自动解压压缩文件。
9. COPY：将文件或目录从构建上下文复制到镜像中，但不会解压压缩文件。
10. WORKDIR：设置工作目录，后续的RUN、CMD、ENTRYPOINT、COPY和ADD指令都会在这个目录下执行。
11. VOLUME：创建一个可以从本地主机或其他容器挂载的挂载点。
12. USER：设置运行后续命令的用户和组。

#### 3.3.2 指令使用举例

1. FROM

```plain
FROM ubuntu:20.04
```

这条指令指定了使用Ubuntu 20.04作为基础镜像。

1. LABEL

```plain
LABEL maintainer="example@example.com"
```

这条指令为镜像添加了维护者信息。

1. RUN

```plain
RUN apt-get update && apt-get install -y python3
```

这条指令在镜像中执行了更新软件包列表并安装Python 3的命令。

1. CMD

```plain
CMD ["python", "app.py"]
```

这条指令指定了容器启动时默认执行的命令，即运行Python脚本`app.py`。

1. ENTRYPOINT

```plain
ENTRYPOINT ["/bin/echo"]
```

这条指令设置了容器启动时执行的命令为`/bin/echo`，且该命令不会被docker run提供的参数覆盖。

1. EXPOSE

```plain
EXPOSE 5000
```

这条指令声明了容器运行时将监听5000端口。

1. ENV

```plain
ENV APP_ENV=production
```

这条指令设置了环境变量`APP_ENV`的值为`production`。

1. ADD

```plain
ADD ./app.tar.gz /app
```

这条指令将本地的`app.tar.gz`压缩文件解压并复制到镜像中的`/app`目录。

1. COPY

```plain
COPY ./app /app
```

这条指令将本地的`app`目录复制到镜像中的`/app`目录。

1. WORKDIR

```plain
WORKDIR /app
```

这条指令设置了工作目录为`/app`，后续的指令都会在这个目录下执行。

1. VOLUME

```plain
VOLUME ["/data"]
```

这条指令创建了一个名为`/data`的挂载点，可以从本地主机或其他容器挂载。

1. USER

```plain
USER appuser
```

这条指令设置了运行后续命令的用户为`appuser`。

### 3.4 工具使用

#### 3.4.1 Portainer可视化面板

Portainer是一个受欢迎的开源 Web UI 工具，它简化了 Docker 和 [Kubernetes](https://zhida.zhihu.com/search?q=Kubernetes&zhida_source=entity&is_preview=1) 环境的管理。它提供了一个用户友好的界面，使得部署和管理容器及其相关资源变得更加直观。Portainer提供了一个图形用户界面（GUI），通过它，用户可以轻松地执行各种容器管理任务，如查看容器状态、管理日志、网络、卷和技术栈。它支持通过 URL 或 Web 套接字连接到各种环境，如 Kubernetes、Docker Swarm 和 ACI。Portainer提供社区版（CE）和商业版（BE）。社区版是免费的，适合个人和小型实验室使用，而商业版提供了更多高级功能，如注册表管理和[基于角色的访问控制](https://zhida.zhihu.com/search?q=%E5%9F%BA%E4%BA%8E%E8%A7%92%E8%89%B2%E7%9A%84%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6&zhida_source=entity&is_preview=1)（RBAC）。Portainer的直观界面消除了命令行操作的需要，使得容器管理更加高效。商业版还支持在现有基础设施上配置 Kubernetes 集群，并通过 [API](https://zhida.zhihu.com/search?q=API+&zhida_source=entity&is_preview=1)连接到 Hashicorp Nomad。

##### ①拉取Portainer镜像

```plain
docker pull portainer/portainer-ce            //这里拉取的是Portainer的社区版（Community Edition，简称CE）
```

##### ②启动Portainer容器

```plain
docker run -d -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

参数说明：

+ `-d`：在后台运行容器。
+ `-p 9000:9000`：将容器的9000端口映射到宿主机的9000端口上。你可以根据需要更改宿主机的端口号。
+ `--name portainer`：为容器指定一个名称（这里使用`portainer`），便于后续管理。
+ `--restart=always`：设置容器的重启策略为总是重启。
+ `-v /var/run/docker.sock:/var/run/docker.sock`：将宿主机的Docker守护进程socket文件映射到容器中，以便Portainer能够管理Docker。
+ `-v portainer_data:/data`：将之前创建的数据卷挂载到容器的`/data`目录下，用于保存Portainer的配置和数据。

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303636.png)

##### ③访问Portainer页面

启动Portainer容器后，通过浏览器访问`http://<IP地址>:9000`来访问Portainer的界面。首次访问时，需要设置一个管理员密码。

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303704.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303834.png)

##### ④Portainer功能

仪表盘

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303865.png)

查看容器

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303996.png)

查看镜像

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303034.png)

### 3.5 Docker所有流程

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303058.png)

![](http://img.mingfancloud.cn/University-studies/docker/Temp/202411061303244.png)

### 3.6 理解Docker 网络

```plain
#删除所有容器
docker rm -f $(docker ps -aq)
#删除所有镜像
docker rmi -f $(docker images -aq)
```

查看虚拟机网络信息：

```plain
[root@docker ~]# ifconfig
docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:cf:0f:02:b2  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.110  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::5b0b:f792:2883:f876  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:7a:55:c7  txqueuelen 1000  (Ethernet)
        RX packets 1817  bytes 201450 (196.7 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2210  bytes 256983 (250.9 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

查看Docker网络类型（docker0是一个网桥）：

```plain
[root@docker ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
879af9fea800   bridge    bridge    local
cbcf6d592ad6   host      host      local
82d37c1dfade   none      null      local
[root@docker ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.0242cf0f02b2       no
#brctl show 命令找不到时，yum install -y bridge-utils
```

查看容器内部网络地址

```plain
[root@docker ~]# docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS                                         NAMES
7b913f8f7387   tomcat    "catalina.sh run"         5 minutes ago   Up 5 minutes   0.0.0.0:32769->8080/tcp, :::32769->8080/tcp   loving_robinson
1b9d6271077d   centos    "/bin/bash"               22 hours ago    Up 22 hours                                                  magical_pasteur
eeeddb2eabc7   nginx     "/docker-entrypoint.…"   23 hours ago    Up 23 hours    0.0.0.0:32768->80/tcp, :::32768->80/tcp       cool_vaughan
[root@docker ~]# docker exec -it 1b9d6271077d ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
13: eth0@if14: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

#Linux虚拟机ping容器内部地址
[root@docker ~]# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.048 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.046 ms
64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.046 ms
64 bytes from 172.17.0.3: icmp_seq=4 ttl=64 time=0.047 ms
64 bytes from 172.17.0.3: icmp_seq=5 ttl=64 time=0.045 ms
--- 172.17.0.3 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 3999ms
rtt min/avg/max/mdev = 0.045/0.046/0.048/0.006 ms
[root@docker ~]#
```

原理：

安装docker引擎后会添加docker0网卡，默认使用桥接模式，每启动一个docker容器，docker就会给容器分配一个ip。容器网卡是成对出现的（veth-pair）

--link

自定义网络：

```plain
docker network create --driver bridge --subnet 172.18.0.0/16 --gateway 172.18.0.1 Network

[root@docker ~]# docker network inspect Network
[
    {
        "Name": "Network",
        "Id": "6771e07cacdf07bb294922068868862ef5d49f7f14e12317aedf6a1e20eb0982",
        "Created": "2024-10-31T15:53:37.018470609+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
```

网络连通

```plain
[root@docker ~]# docker network connect --help
Usage:  docker network connect [OPTIONS] NETWORK CONTAINER
docker network connect centos22 bridge
```

## 4.Linux命令

### （1）find

`find` 是 Linux 和 Unix 系统中一个非常强大的命令行工具，用于在目录树中查找文件和目录。它提供了丰富的选项和表达式，可以根据文件名、类型、大小、时间戳等多种条件进行搜索。以下是一些常见的 `find` 命令用法示例：

使用find / -name xxxx 命令查找文件的具体路径

```plain
root@2874015af5c2:/usr/local/apache2/htdocs# find / -name index.html
find: '/proc/1/map_files': Operation not permitted
find: '/proc/8/map_files': Operation not permitted
find: '/proc/9/map_files': Operation not permitted
find: '/proc/10/map_files': Operation not permitted
find: '/proc/92/map_files': Operation not permitted
find: '/proc/120/map_files': Operation not permitted
find: '/proc/150/map_files': Operation not permitted
/usr/local/apache2/htdocs/index.html
```

#### 基本语法

```plain
find [起始目录] [匹配条件] [执行的操作]
```

+ 起始目录：搜索的起始位置，可以是一个目录路径，`.` 表示当前目录，`/` 表示根目录。
+ 匹配条件：用于指定要查找的文件或目录的特征，如名称、类型、大小、时间戳等。
+ 执行的操作：对找到的每个文件或目录执行的操作，如删除、修改权限、打印详细信息等。

#### 常用选项

+ `-name`：按名称查找文件。
+ `-type`：按类型查找文件（`f` 表示普通文件，`d` 表示目录，`l` 表示符号链接等）。
+ `-size`：按大小查找文件（`+n` 表示大于 n，`-n` 表示小于 n，`n` 表示等于 n，单位可以是 c（字节）、k（千字节）、M（兆字节）等）。
+ `-mtime`：按内容修改时间查找文件（`+n` 表示 n 天前，`-n` 表示 n 天内，`n` 表示恰好 n 天前）。
+ `-user`：按文件属主查找文件。
+ `-group`：按文件属组查找文件。
+ `-perm`：按文件权限查找文件。
+ `-exec`：对找到的每个文件执行指定的命令。
+ `-print`：打印找到的文件的路径（默认操作）。

#### 案例

1. 查找当前目录及其子目录中名为 `example.txt` 的文件

```plain
find . -name "example.txt"
```

1. 查找 `/home` 目录中所有的目录

```plain
find /home -type d
```

1. 查找大于 10MB 的文件

```plain
find / -size +10M
```

1. 查找在过去 7 天内修改过的文件

```plain
find /var/log -mtime -7
```

1. 查找属于用户 `john` 的文件

```plain
find /home -user john
```

1. 查找权限为 755 的文件

```plain
find / -perm 755
```

1. 删除所有 `.tmp` 文件

```plain
find /tmp -name "*.tmp" -exec rm {} \;
```

注意：使用 `-exec` 选项时要非常小心，因为 `-exec` 会对找到的每个文件执行指定的命令。在这个例子中，`rm` 命令会删除找到的每个 `.tmp` 文件。

1. 将找到的所有 `.log` 文件复制到 `/backup` 目录

```plain
find /var/log -name "*.log" -exec cp {} /backup/ \;
```

1. 查找并打印出所有 `.conf` 文件的详细信息

```plain
find /etc -name "*.conf" -ls
```

1. 查找所有既是 `.sh` 脚本文件又是最近 3 天内修改过的文件，并给它们添加执行权限

```plain
find /usr/local/bin -name "*.sh" -mtime -3 -exec chmod +x {} \;
```

#### 注意事项

+ `find` 命令的选项和参数可以组合使用，以实现更复杂的搜索条件。
+ 使用 `-exec` 选项时要小心，确保不会对重要文件执行破坏性操作。
+ 如果需要处理大量文件或目录，`find` 命令可能会占用较多系统资源。
+ 可以通过管道（`|`）将 `find` 命令的输出传递给其他命令进行进一步处理。

### （2）echo

`echo` 命令在 Linux 和其他 Unix-like 操作系统中用于在终端输出字符串或变量的值。它是一个非常基本的命令，但在脚本编写和日常任务管理中非常有用。以下是 `echo` 命令的一些基本用法和案例：

#### 基本语法

```plain
echo [选项] [字符串或变量]
```

+ 选项：`echo` 命令有几个选项，但最常用的是 `-e`，它启用了对反斜杠转义字符的解释（如 `\n` 表示换行，`\t` 表示制表符等）。
+ 字符串或变量：要输出的文本或变量的值。

#### 常用选项

+ `-e`：启用转义字符解释。
+ `-n`：不在输出的末尾添加换行符。

#### 案例

1. 输出简单的字符串

```plain
echo "Hello, World!"
```

这将输出 `Hello, World!` 并自动在新的一行开始。

1. 输出变量的值

```plain
NAME="Alice"  
echo "Hello, $NAME!"
```

这将输出 `Hello, Alice!`。

1. 使用转义字符

```plain
echo -e "First Line\nSecond Line"
```

这将输出两行文本：`First Line` 和 `Second Line`。`-e` 选项使 `\n` 被解释为换行符。

1. 不在末尾添加换行符

```plain
echo -n "No newline here"  
echo " but this is on a new line"
```

第一个 `echo` 命令输出 `No newline here` 但不换行，第二个 `echo` 命令的输出将紧接着第一个命令的输出。

1. 输出带有制表符的文本

```plain
echo -e "Column1\tColumn2\tColumn3"
```

这将输出三列文本，每列之间用制表符分隔。

1. 在脚本中使用 `echo`

在脚本中，`echo` 常用于打印消息或变量的值，以向用户提供反馈或调试信息。

```plain
#!/bin/bash  
echo "This is a script."  
USER=$(whoami)  
echo "The current user is $USER."
```

运行此脚本将输出 `This is a script.` 和当前用户的用户名。

1. 将输出重定向到文件

```plain
echo "Some text" > output.txt
```

这将把 `Some text` 写入 `output.txt` 文件，如果文件已存在，则覆盖其内容。

1. 追加输出到文件

```plain
echo "More text" >> output.txt
```

这将把 `More text` 追加到 `output.txt` 文件的末尾，而不是覆盖它。

#### 注意事项

+ 在某些 shell（如 zsh）中，`echo` 的行为可能与 bash 中的略有不同，特别是关于转义字符的处理。
+ 在编写脚本时，尽量使用 `-e` 选项来确保转义字符按预期工作，但也要意识到这可能会在不同的环境中导致不一致的行为。
+ 如果需要更复杂的输出格式或需要确保跨平台的兼容性，可以考虑使用 `printf` 命令。

### （3）备份原有的Yum源

```plain
cd /etc/yum.repos.d/    //切换镜像源目录
ls                      //查看镜像源文件列表
mkdir yum-bak           //创建yum-bak目录
mv C* yum-bak/          //将C开头的源文件移动到yum-bak
ls                      //查看镜像源文件列表
```

