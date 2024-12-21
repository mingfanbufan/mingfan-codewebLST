# Nginx-5


## HTTPS

### https 介绍

HTTPS（全称：HyperText Transfer Protocol over Secure Socket Layer），其实 HTTPS 并不是一个新鲜协议，Google 很早就开始启用了，初衷是为了保证数据安全。 近些年，Google、Baidu、Facebook 等这样的互联网巨头，不谋而合地开始大力推行 HTTPS， 国内外的大型互联网公司很多也都已经启用了全站 HTTPS，这也是未来互联网发展的趋势。

### 1、加密算法

1.  对称加密
A要给B发送数据
1、A做一个对称密钥
2、使用密钥给文件加密
3、发送加密以后的文件和钥匙
4、B拿钥匙解密
加密和解密都是使用的同一个密钥。 
2.  非对称加密 ----  公钥加密，私钥解密
A要给B发送数据
1、B做一对非对称的密钥（公钥、私钥）
2、发送公钥给A
3、A拿公钥对数据进行加密
4、发送加密后的数据给B
5、B拿私钥解密 
3.  哈希算法
将任意长度的信息转换为较短的固定长度的值，通常其长度要比信息小得多。
例如：MD5、SHA-1、SHA-2、SHA-256 等 
4.  数字签名
签名就是在信息的后面再加上一段内容（信息经过hash后的值），可以证明信息没有被修改过。hash值一般都会加密后（也就是签名）再和信息一起发送，以保证这个hash值不被修改。 

### 2、HTTPS 协议介绍

HTTP 协议（Hyper Text Transfer Protocol，超文本传输协议）：是客户端浏览器或其他程序与Web服务器之间的应用层通信协议 。

- HTTPS 协议（HyperText Transfer Protocol over Secure Socket Layer）：可以理解为HTTP+SSL/TLS， 即 HTTP 下加入 SSL 层，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL，用于安全的 HTTP 数据传输。

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161417220.png)

-  如上图所示 HTTPS 相比 HTTP 多了一层 SSL/TLS
**SSL/TLS :SSL(Secure Sockets Layer 安全套接层),及其继任者传输层安全（Transport Layer Security，TLS）是为网络通信提供安全及数据完整性的一种安全协议。TLS与SSL在传输层为数据通讯进行加密提供安全支持。** 

           **SSL协议可分为两层：** SSL握手协议（SSL Handshake Protocol）：它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。**相当于连接**

    SSL记录协议（SSL Record Protocol）：它建立在可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能的支持。 **相当于通信**

**SSL协议提供的服务主要有：**

ssl:身份认证和数据加密。保证数据完整性
1）认证用户和服务器，确保数据发送到正确的客户机和服务器；

2）加密数据以防止数据中途被窃取；

3）维护数据的完整性，确保数据在传输过程中不被改变。

### 3、HTTPS 原理

#### 1、HTTP 访问过程

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161417554.png)

如上图所示，HTTP请求过程中，客户端与服务器之间没有任何身份确认的过程，数据全部明文传输，“裸奔”在互联网上，所以很容易遭到黑客的攻击，如下：

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161417675.png)

可以看到，客户端发出的请求很容易被黑客截获，如果此时黑客冒充服务器，则其可返回任意信息给客户端，而不被客户端察觉。

**所以 HTTP 传输面临的风险有：**

- 窃听风险：黑客可以获知通信内容。
- 篡改风险：黑客可以修改通信内容。
- 冒充风险：黑客可以冒充他人身份参与通信。

那有没有一种方式既可以安全的获取公钥，又能防止黑客冒充呢？ 那就需要用到终极武器了：SSL 证书（申购）

-  证书：.crt, .pem 
-  私钥：.key 
-  证书请求文件：.csr 

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161417783.png)

如上图所示，在第 ② 步时服务器发送了一个SSL证书给客户端，SSL 证书中包含的具体内容有：

（1）证书的发布机构(CA认证中心)

（2）证书的有效期

（3）公钥

（4）证书所有者

（5）签名   -----   签名就可以理解为是钞票里面的一个防伪标签。

**客户端在接受到服务端发来的SSL证书时，会对证书的真伪进行校验，以浏览器为例说明如下：**

（1）首先浏览器读取证书中的证书所有者、有效期等信息进行校验

（2）浏览器开始查找操作系统中已内置的受信任的证书发布机构CA，与服务器发来的证书中的颁发者CA比对，用于校验证书是否为合法机构颁发

（3）如果找不到，浏览器就会报错，说明服务器发来的证书是不可信任的。

（4）如果找到，那么浏览器就会从操作系统中取出颁发者CA 的公钥，然后对服务器发来的证书里面的签名进行解密

（5）浏览器使用相同的hash算法计算出服务器发来的证书的hash值，将这个计算的hash值与证书中签名做对比

（6）对比结果一致，则证明服务器发来的证书合法，没有被冒充

（7）此时浏览器就可以读取证书中的公钥，用于后续加密了

(8）client与web协商对称加密算法，client生成一个对称加密密钥并使用web公钥加密，发送给web服务器，web服务器使用web私钥解密

(9)使用对称加密密钥传输数据，并校验数据的完整性

**所以相比HTTP，HTTPS 传输更加安全**

（1） 所有信息都是加密传播，黑客无法窃听。

（2） 具有校验机制，一旦被篡改，通信双方会立刻发现。

（3） 配备身份证书，防止身份被冒充。

#### 3、HTTPS 总结

**综上所述，相比 HTTP 协议，HTTPS 协议增加了很多握手、加密解密等流程，虽然过程很复杂，但其可以保证数据传输的安全。**

HTTPS 缺点：

1. SSL 证书费用很高，以及其在服务器上的部署、更新维护非常繁琐
2. HTTPS 降低用户访问速度（多次握手）
3. 网站改用HTTPS 以后，由HTTP 跳转到 HTTPS 的方式增加了用户访问耗时（多数网站采用302跳转）
4. HTTPS 涉及到的安全算法会消耗 CPU 资源，需要增加大量机器（https访问过程需要加解密）

### 4、Nginx HTTPS 部署实战

1. 申请证书与认证
2. 证书下载与配置
3. 问题分析与总结

#### 1、申请证书与认证

要搭建https服务首先需有SSL证书，证书通常是在第三方申请，在阿里云的安全服务中有SSL证书这一项，可以在里面申请免费的证书；

> 也可以在自己电脑中生成，虽然也能完成加密，但是浏览器是不认可的，因此最好还是去第三方申请


##### 1、证书申请

阿里云提供免费的证书，不需要人工审核，用来做测试是非常不错的选择，申请地址如下URL。

```shell
https://common-buy.aliyun.com/?spm=5176.2020520163.cas.1.1aa12b7aWWn20O&commodityCode=cas#/buy
```

免费型的证书隐藏的比较深，想要申请免费证书需要先选择 1个域名->Symantec->免费型  ,所以读者这里需要注意一下，如下图参考。

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418893.png)

选择之后，一直点击下一步，便可购买完成，免费购买证书之后笔者需要回到证书控制台，在控制台有一个补全信息的链接地址，需要通过此地址补充申请人的联系信息，参考下图填写!

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418371.png)

##### 2、域名验证

补全个人信息之后，还需要给阿里云验证当前域名是属于本人的，验证方式有两种，第一种是通过dns解析认证，第二种是通过上传验证文件认证，这里采用的是验证文件认证，首先需要下载文件，如下图

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418000.png)

在下载验证文件完成之后，笔者需要把文件放到服务器中去，这里提供一条复制命令

```shell
[root@web ~]#scp ~/Downloads/fileauth.txt  root@192.168.43.34:~/
```

将验证文件复制到服务器之后，还需要将验证文件放到站点对应目录，参考命令如下：

```shell
[root@xiaoxuan ~]# cd /usr/share/nginx/html/
[root@xiaoxuan html]#mkdir -p /website/.well-known/pki-validation  &&  cp  fileauth.txt  /website/.well-known/pki-validation/
[root@xiaoxuan html]# cd && vim /etc/nginx/nginx.conf
server {
        listen       80;
        server_name  localhost;
        location / {
             root /usr/share/nginx/html/website;
        }
```

###### 1、手动验证

手动验证的目的是首先确保文件位置放置是否正确，可以通过访问站点的url是否成功进行判断，比如笔者可以访问如下URL，如果返回如果页面能够正常打开，并且可以看到某些值，则代表配置成功。

```shell
http://www.qf.com/.well-known/pki-validation/fileauth.txt
```

###### 2、通过阿里云来验证

在确保文件放置正确之后，关键的是能让阿里云能访问到，阿里云这里提供了一个检查配置的功能，在下载验证文件页面，有一个检测配置的链接，单击之后便可进行检查，如下图。

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418764.png)

当点击 检查配置 之后，如果阿里云能够正常访问，则会在左侧给出提示，现在可以返回证书列表，在列表中可以看到当前状态为审核中，如下图

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418570.png)

审核因为不需要人为干预，所以很快就能下发证书，下发证书的时间大约是2分钟左右。

#### 2、证书下载与配置

##### 1、证书下载

证书签发之后，可以在列表中可以看到状态栏中为 已签发 ，同时操作栏可以下载以及查看详情等，如下图所示

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418386.png)

点击下载后，会跳转到下载详情页面，在下载详情页可以选择自己相对应的web服务，比如使用nginx，当选择nginx之后，下方还会很贴心的提示如何配置，下载nginx配置文件。

下载配置文件之后，需要将其解压，解压之后可以看见里面包含了两个证书文件

xxx.key

xxx.pem

接着需要把这两个证书文件给复制到服务器当中去，首先需要在服务器创建对应的文件夹，参考命令如下

```shell
[root@xiaoxuan ~]# cd /etc/nginx/ && mkdir cert
```

在服务器创建完成对应文件夹之后，将证书文件复制到服务器中

```shell
[root@xiaoxuan ~]# ls
2447549_www.testpm.cn_nginx.zip
[root@xiaoxuan ~]# unzip 2447549_www.testpm.cn_nginx.zip
Archive:  2447549_www.testpm.cn_nginx.zip
Aliyun Certificate Download
  inflating: 2447549_www.testpm.cn.pem  
  inflating: 2447549_www.testpm.cn.key   
[root@xiaoxuan ~]# ls
2447549_www.testpm.cn.key  2447549_www.testpm.cn_nginx.zip  2447549_www.testpm.cn.pem
[root@xiaoxuan ~]# cp 2447549_www.testpm.cn* /etc/nginx/cert/
[root@xiaoxuan ~]# cd /etc/nginx/cert/
[root@xiaoxuan cert]# mv 2447549_www.testpm.cn.key www.testpm.cn.key 
[root@xiaoxuan cert]# mv 2447549_www.testpm.cn.pem www.testpm.cn.pem
```

##### 2、证书配置

证书复制完成之后，可以对nginx配置文件进行更改，使用vim命令编辑nginx配置文件，参考命令如下：

```shell
[root@xiaoxuan ~]# cd /etc/nginx/conf.d/
[root@xiaoxuan conf.d]# cp default.conf default.conf.bak
[root@xiaoxuan conf.d]# mv default.conf nginx_ssl.conf
[root@xiaoxuan conf.d]# vim nginx_ssl.conf
[root@xiaoxuan conf.d]# cat /etc/nginx/conf.d/nginx_ssl.conf 
server {
    listen 443 ssl;
    server_name www.testpm.cn;
    access_log  /var/log/nginx/https_access.log  main;

    #ssl on;
    ssl_certificate   /etc/nginx/cert/2447549_www.testpm.cn.pem;
    ssl_certificate_key  /etc/nginx/cert/2447549_www.testpm.cn.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    ssl_prefer_server_ciphers on;

    location / {
        root  /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```

##### 3、重启Nginx

修改配置文件之后，需要测试nginx配置文件是否正确

```shell
[root@xiaoxuan cert]# nginx -t 
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[root@xiaoxuan cert]# nginx -s reload
```

![image.png](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-5/202404161418618.png)

如果看到浏览器，展示安全，并且显示绿色就说明大功告成了!

### 5、Nginx 性能优化

当我需要进行性能优化时，说明我们服务器无法满足日益增长的业务。性能优化是一个比较大的课题，需要从以下几个方面进行探讨

- 当前系统结构瓶颈
- 了解业务模式
- 性能与安全

#### 1、当前系统结构瓶颈

首先需要了解的是当前系统瓶颈，用的是什么，跑的是什么业务。里面的服务是什么样子，每个服务最大支持多少并发。比如针对Nginx而言，我们处理静态资源效率最高的瓶颈是多大？

可以通过查看当前cpu负荷，内存使用率，进程使用率来做简单判断。还可以通过操作系统的一些工具来判断当前系统性能瓶颈，如分析对应的日志，查看请求数量。也可以通过nginx http_stub_status_module模块来查看对应的连接数，总握手次数，总请求数。也可以对线上进行压力测试，来了解当前的系统的性能，并发数，做好性能评估。

#### 2、了解业务模式

虽然我们是在做性能优化，但还是要熟悉业务，最终目的都是为业务服务的。我们要了解每一个接口业务类型是什么样的业务，比如电子商务抢购模式，这种情况平时流量会很小，但是到了抢购时间，流量一下子就会猛涨。也要了解系统层级结构，每一层在中间层做的是代理还是动静分离，还是后台进行直接服务。需要我们对业务接入层和系统层次要有一个梳理

#### 3、性能与安全

性能与安全也是一个需要考虑的因素，往往大家注重性能忽略安全或注重安全又忽略性能。比如说我们在设计防火墙时，如果规则过于全面肯定会对性能方面有影响。如果对性能过于注重在安全方面肯定会留下很大隐患。所以大家要评估好两者的关系，把握好两者的孰重孰轻，以及整体的相关性。权衡好对应的点。

#### 4、系统与Nginx性能优化

大家对相关的系统瓶颈及现状有了一定的了解之后，就可以根据影响性能方面做一个全体的评估和优化。

- 网络（网络流量、是否有丢包，网络的稳定性都会影响用户请求）
- 系统（系统负载、饱和、内存使用率、系统的稳定性、硬件磁盘是否有损坏）
- 服务（连接优化、内核性能优化、http服务请求优化都可以在nginx中根据业务来进行设置）
- 程序（接口性能、处理请求速度、每个程序的执行效率）
- 数据库、底层服务

上面列举出来每一级都会有关联，也会影响整体性能，这里主要关注的是Nginx服务这一层。

##### 1、文件句柄

在linux/unix操作系统中一切皆文件，我们的设备是文件，文件是文件，文件夹也是文件。当我们用户每发起一次请求，就会产生一个文件句柄。文件句柄可以简单的理解为`文件句柄就是一个索引`。文件句柄就会随着请求量的增多,进程调用频繁增加，那么产生的文件句柄也就会越多。

系统默认对文件句柄是有限制的，不可能会让一个进程无限制的调用句柄。因为系统资源是有限的，所以我们需要限制每一个服务能够使用多大的文件句柄。操作系统默认使用的文件句柄是1024个句柄。

##### 2、设置方式

- 系统全局性修改
- 用户局部性修改
- 进程局部性修改

##### 3、系统全局性修改和用户局部性修改

```shell
[root@nginx-server ~]# vim /etc/security/limits.conf
```

```shell
#*               soft    core            0
#*               hard    rss             10000
#@student        hard    nproc           20
#@faculty        soft    nproc           20
#@faculty        hard    nproc           50
#ftp             hard    nproc           0
#@student        -       maxlogins       4

#root只是针对root这个用户来限制，soft只是发提醒，操作系统不会强制限制,一般的站点设置为一万左右就ok了
root soft nofile 65535
root hard nofile 65535
# *代表通配符 所有的用户
*    soft nofile 25535
*    hard nofile 25535
```

可以看到`root`和`*`，root代表是root用户，*代表的是所有用户，后面的数字就是文件句柄大小。大家可以根据个人业务来进行设置。

##### **4、进程局部性修改**

```shell
[root@nginx-server ~]# vim /etc/nginx/nginx.conf
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

worker_rlimit_nofile 65535; #进程限制

events {
    worker_connections  1024; #最大连接数
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$http_user_agent' '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      '"$args" "$request_uri"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on; 
    #tcp_nopush     on; 

    keepalive_timeout  65; 

    #gzip  on; 

    include /etc/nginx/conf.d/*.conf;
}
```

`worker_rlimit_nofile` 是在进程上面进行限制。

##### 5、cpu的亲和配置

cpu的亲和能够使nginx对于不同的work工作进程绑定到不同的cpu上面去。就能够减少在work间不断切换cpu，把进程通常不会在处理器之间频繁迁移，进程迁移的频率小，来减少性能损耗。[nginx 亲和配置](https://nginx.org/en/docs/ngx_core_module.html#worker_cpu_affinity)

查看cpu核心数

```shell
[root@nginx-server ~]# cat /proc/cpuinfo|grep "cpu cores"|uniq
```

查看cpu使用率

```shell
[root@nginx-server ~]#top  回车后按 1
```

##### **6、配置worker_processes**

```shell
[root@nginx-server ~]# vim /etc/nginx/nginx.conf
将刚才查看到自己cpu * cpu核心就是worker_processes
worker_processes 2; #根据自己cpu核心数配置/这里也可以设置为auto
```

##### 7、cpu

假设 配置是2cpu，每个cpu是8核，配置如下：

```shell
worker_processes 16;
worker_cpu_affinity 1010101010101010 0101010101010101;
```

在nginx 1.9版本之后，就帮我们自动绑定了cpu;

```shell
worker_cpu_affinity auto;
```

##### **8、nginx通用配置优化**

```shell
#将nginx进程设置为普通用户，为了安全考虑
user nginx; 

#当前启动的worker进程，官方建议是与系统核心数一致
worker_processes 2;
#方式一，就是自动分配绑定
worker_cpu_affinity auto;

#日志配置成warn
error_log /var/log/nginx/error.log warn; 
pid /var/run/nginx.pid;

#针对 nginx 句柄的文件限制
worker_rlimit_nofile 35535;
#事件模型
events {
    #使用epoll内核模型
    use epoll;
    #每一个进程可以处理多少个连接，如果是多核可以将连接数调高 worker_processes * 1024
    worker_connections 10240;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    charset utf-8;  #设置字符集

    #设置日志输出格式，根据自己的情况设置
    log_format  main  '$http_user_agent' '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      '"$args" "$request_uri"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;   #对静态资源的处理比较有效
    #tcp_nopush     on;   #如果做静态资源服务器可以打开

    keepalive_timeout  65; 

    ########
    #Gzip module
    gzip  on;    #文件压缩默认可以打开

    include /etc/nginx/conf.d/*.conf;
}
```

#### 6、ab接口压力测试工具

ab是Apache超文本传输协议(HTTP)的性能测试工具。其设计意图是描绘当前所安装的Apache的执行性能，主要是显示你安装的Apache每秒可以处理多少个请求。

```shell
[root@nginx-server ~]# yum install httpd-tools -y
[root@nginx-server ~]# ab -n 2000 -c 2 http://127.0.0.1/
-n 总的请求数
-c 并发数
```

**1、参数选项**

```shell
-n：即requests，用于指定压力测试总共的执行次数
-c：即concurrency，用于指定的并发数
-t：即timelimit，等待响应的最大时间(单位：秒)
-b：即windowsize，TCP发送/接收的缓冲大小(单位：字节)
-p：即postfile，发送POST请求时需要上传的文件，此外还必须设置-T参数
-u：即putfile，发送PUT请求时需要上传的文件，此外还必须设置-T参数
-T：即content-type，用于设置Content-Type请求头信息，例如：application/x-www-form-urlencoded，默认值为text/plain
-v：即verbosity，指定打印帮助信息的冗余级别
-w：以HTML表格形式打印结果
-i：使用HEAD请求代替GET请求
-x：插入字符串作为table标签的属性
-y：插入字符串作为tr标签的属性
-z：插入字符串作为td标签的属性
-C：添加cookie信息，例如："Apache=1234"(可以重复该参数选项以添加多个)
-H：添加任意的请求头，例如："Accept-Encoding: gzip"，请求头将会添加在现有的多个请求头之后(可以重复该参数选项以添加多个)
-A：添加一个基本的网络认证信息，用户名和密码之间用英文冒号隔开
-P：添加一个基本的代理认证信息，用户名和密码之间用英文冒号隔开
-X：指定使用的和端口号，例如:"126.10.10.3:88"
-V：打印版本号并退出
-k：使用HTTP的KeepAlive特性
-d：不显示百分比
-S：不显示预估和警告信息
-g：输出结果信息到gnuplot格式的文件中
-e：输出结果信息到CSV格式的文件中
-r：指定接收到错误信息时不退出程序
-H：显示用法信息，其实就是ab -help
```

**2、内容解释**

```shell
Server Software:        nginx/1.10.2 (服务器软件名称及版本信息)
Server Hostname:        192.168.1.106(服务器主机名)
Server Port:            80 (服务器端口)

Document Path:          /index1.html. (供测试的URL路径)
Document Length:        3721 bytes (供测试的URL返回的文档大小)

Concurrency Level:      1000 (并发数)
Time taken for tests:   2.327 seconds (压力测试消耗的总时间)
Complete requests:      5000 (的总次数)
Failed requests:        688 (失败的请求数)
Write errors:           0 (网络连接写入错误数)
Total transferred:      17402975 bytes (传输的总数据量)
HTML transferred:       16275725 bytes (HTML文档的总数据量)
Requests per second:    2148.98 [#/sec] (mean) (平均每秒的请求数) 这个是非常重要的参数数值，服务器的吞吐量 
Time per request:       465.338 [ms] (mean) (所有并发用户(这里是1000)都请求一次的平均时间)
Time  request:       	0.247 [ms] (mean, across all concurrent requests) (单个用户请求一次的平均时间)
Transfer rate:          7304.41 [Kbytes/sec] received 每秒获取的数据长度 (传输速率，单位：KB/s)
...
Percentage of the requests served within a certain time (ms)
  50%    347  ## 50%的请求在347ms内返回 
  66%    401  ## 60%的请求在401ms内返回 
  75%    431
  80%    516
  90%    600
  95%    846
  98%   1571
  99%   1593
  100%   1619 (longest request)
```

**3、示例演示**

##### 注意事项

● 测试机与被测试机要分开

● 不要对线上的服务器做压力测试

● 观察测试工具ab所在机器，以及被测试的机器的CPU、内存、网络等都不超过最高限度的75%

```shell
[root@nginx-server ~]# ab -n 50 -c 2 http://www.testpm.cn/
This is ApacheBench, Version 2.3 <$Revision: 1430300 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking www.testpm.cn (be patient).....done


Server Software:        nginx/1.16.0
Server Hostname:        www.testpm.cn
Server Port:            80

Document Path:          /
Document Length:        612 bytes

Concurrency Level:      2
Time taken for tests:   2.724 seconds
Complete requests:      50
Failed requests:        0
Write errors:           0
Total transferred:      42250 bytes
HTML transferred:       30600 bytes
Requests per second:    18.35 [#/sec] (mean)
Time per request:       108.968 [ms] (mean)
Time per request:       54.484 [ms] (mean, across all concurrent requests)
Transfer rate:          15.15 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       42   52  17.3     46     137
Processing:    43   54  20.8     47     170
Waiting:       42   53  20.7     47     170
Total:         84  106  28.9     93     219

Percentage of the requests served within a certain time (ms)
  50%     93
  66%     96
  75%    101
  80%    130
  90%    153
  95%    161
  98%    219
  99%    219
 100%    219 (longest request)
```

