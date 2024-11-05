# Nginx-1

## 一、HTTP 介绍

HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。

HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

### 1、HTTP 工作原理

-  HTTP协议工作于客户端-服务端架构上。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。 
-  Web服务器有：Nginx，Apache服务器，IIS服务器（Internet Information Services）等。 
-  Web服务器根据接收到的请求后，向客户端发送响应信息。 
-  HTTP默认端口号为80，但是你也可以改为8080或者其他端口。 

**HTTP三点注意事项：**

- HTTP是无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- HTTP是媒体独立的：只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。
- HTTP是无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

以下图表展示了HTTP协议通信流程：

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407224.png)

### 2、HTTP 消息结构

HTTP是基于客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。

一个HTTP"客户端"是一个应用程序（Web浏览器或其他任何客户端），通过连接到服务器达到向服务器发送一个或多个HTTP的请求的目的。

一个HTTP"服务器"同样也是一个应用程序（通常是一个Web服务，如Nginx、Apache Web服务器或IIS服务器等），通过接收客户端的请求并向客户端发送HTTP响应数据。

HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。

### 3、客户端请求消息

客户端发送一个HTTP请求到服务器的请求消息包括以下格式：请求行（request line）、请求头部（header）、空行和请求数据四个部分组成，下图给出了请求报文的一般格式。

([https://www.baidu.com/s?ie=UTF-8&wd=QQ音乐](https://www.baidu.com/s?ie=UTF-8&wd=QQ%E9%9F%B3%E4%B9%90),此链接可看请求头的内容)

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407775.png)
![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407909.png)


### 4、服务器响应消息

HTTP响应也由四个部分组成，分别是：状态行、消息报头、空行和响应正文。

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407892.png)

**实例**

下面实例是一典型的使用GET来传递数据的实例：

客户端请求：

```http
Connected to www.testpm.cn (47.244.247.240) port 80 (#0)
> GET /hello.txt HTTP/1.1   # 请求方式与版本协议。
> User-Agent: curl/7.29.0   #用什么客户端访问
> Host: www.testpm.cn  #主机名，域名。主机和端口号，
> Accept: */*  #匹配什么文件类型，“*” 是通用匹配。匹配所有类型
```

服务端响应:

```http
< HTTP/1.1 200 OK       #请求返回的状态码
< Server: nginx/1.16.0  #请求的服务和版本号
< Date: Thu, 04 Jul 2019 08:19:40 GMT
< Content-Type: text/plain #文本类型，有html，plain:普通文本
< Content-Length: 12
< Last-Modified: Thu, 04 Jul 2019 08:13:25 GMT
< Connection: keep-alive  #是否支持长连接
< ETag: "5d1db525-c"  #标识，每次访问如果与最开始的一样返回304否则校验不一致返回200
< Accept-Ranges: bytes
```

输出结果:

```shell
hello world
```

### 5、HTTP 请求方法

根据HTTP标准，HTTP请求可以使用多种请求方法。

HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。

HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

重点方法：

GET：单纯获取数据（获取一个index.html页面）

POST：上传/创建文件（会产生新的数据）

PUT：保存数据（覆盖/更新文件、图片等，不会产生新的数据）

DELETE：删除

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407915.png)

### 6、HTTP 响应头信息

HTTP请求头提供了关于请求，响应或者其他的发送实体的信息。

在本章节中我们将具体来介绍HTTP响应头信息。

| 应答头 | 说明 |
| --- | --- |
| Allow | 服务器支持哪些请求方法（如GET、POST等）。 |
| Content-Encoding | 文档的编码（Encode）方法。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。Java的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE 4、IE 5才支持它。因此，Servlet应该通过查看Accept-Encoding头（即request.getHeader("Accept-Encoding")）检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面。 |
| Content-Length | 表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。如果你想要利用持久连接的优势，可以把输出文档写入 ByteArrayOutputStream，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容。 |
| Content-Type | 表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。 |
| Date | 当前的GMT时间。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦。 |
| Expires | 应该在什么时候认为文档已经过期，从而不再缓存它？ |
| Last-Modified | 文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304（Not Modified）状态。Last-Modified也可用setDateHeader方法来设置。 |
| Location | 表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302。 |
| Refresh | 表示浏览器应该在多少时间之后刷新文档，以秒计。除了刷新当前文档之外，你还可以通过setHeader("Refresh", "5; URL=http://host/path")让浏览器读取指定的页面。  注意这种功能通常是通过设置HTML页面HEAD区的＜META HTTP-EQUIV="Refresh" CONTENT="5;URL=http://host/path"＞实现，这是因为，自动刷新或重定向对于那些不能使用CGI或Servlet的HTML编写者十分重要。但是，对于Servlet来说，直接设置Refresh头更加方便。   注意Refresh的意义是"N秒之后刷新本页面或访问指定页面"，而不是"每隔N秒刷新本页面或访问指定页面"。因此，连续刷新要求每次都发送一个Refresh头，而发送204状态代码则可以阻止浏览器继续刷新，不管是使用Refresh头还是＜META HTTP-EQUIV="Refresh" ...＞。   注意Refresh头不属于HTTP 1.1正式规范的一部分，而是一个扩展，但Netscape和IE都支持它。 |
| Server | 服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置。 |
| Set-Cookie | 设置和页面关联的Cookie。Servlet不应使用response.setHeader("Set-Cookie", ...)，而是应使用HttpServletResponse提供的专用方法addCookie。参见下文有关Cookie设置的讨论。 |


### 7、HTTP 状态码

当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含HTTP状态码的信息头（server header）用以响应浏览器的请求。

HTTP状态码的英文为HTTP Status Code。

下面是常见的HTTP状态码：

- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 302  - 资源（网页等）临时转移到其它URL
- 404 - 请求的资源（网页等）不存在
- 403 - 服务器理解请求客户端的请求，但是拒绝执行此请求
- 500 - 内部服务器错误

**HTTP状态码分类**

HTTP状态码由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字没有分类的作用。HTTP状态码共分为5种类型：

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407383.png)

HTTP状态码列表:

| 状态码 | 状态码英文名称 | 中文描述 |
| --- | --- | --- |
| 100 | Continue | 继续。客户端应继续其请求 |
| 101 | Switching Protocols | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|  |  |  |
| 200 | OK | 请求成功。一般用于GET与POST请求 |
| 201 | Created | 已创建。成功请求并创建了新的资源 |
| 202 | Accepted | 已接受。已经接受请求，但未处理完成 |
| 203 | Non-Authoritative Information | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204 | No Content | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205 | Reset Content | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206 | Partial Content | 部分内容。服务器成功处理了部分GET请求 |
|  |  |  |
| 300 | Multiple Choices | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301 | Moved Permanently | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302 | Found | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303 | See Other | 查看其它地址。与301类似。使用GET和POST请求查看 |
| 304 | Not Modified | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305 | Use Proxy | 使用代理。所请求的资源必须通过代理访问 |
| 306 | Unused | 已经被废弃的HTTP状态码 |
| 307 | Temporary Redirect | 临时重定向。与302类似。使用GET请求重定向 |
|  |  |  |
| 400 | Bad Request | 客户端请求的语法错误，服务器无法理解 |
| 401 | Unauthorized | 请求要求用户的身份认证 |
| 402 | Payment Required | 保留，将来使用 |
| 403 | Forbidden | 服务器理解请求客户端的请求，但是拒绝执行此请求 |
| 404 | Not Found | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405 | Method Not Allowed | 客户端请求中的方法被禁止 |
| 406 | Not Acceptable | 服务器无法根据客户端请求的内容特性完成请求 |
| 407 | Proxy Authentication Required | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408 | Request Time-out | 服务器等待客户端发送的请求时间过长，超时 |
| 409 | Conflict | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突 |
| 410 | Gone | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411 | Length Required | 服务器无法处理客户端发送的不带Content-Length的请求信息 |
| 412 | Precondition Failed | 客户端请求信息的先决条件错误 |
| 413 | Request Entity Too Large | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414 | Request-URI Too Large | 请求的URI过长（URI通常为网址），服务器无法处理 |
| 415 | Unsupported Media Type | 服务器无法处理请求附带的媒体格式 |
| 416 | Requested range not satisfiable | 客户端请求的范围无效 |
| 417 | Expectation Failed | 服务器无法满足Expect的请求头信息 |
|  |  |  |
| 500 | Internal Server Error | 服务器内部错误，无法完成请求 |
| 501 | Not Implemented | 服务器不支持请求的功能，无法完成请求 |
| 502 | Bad Gateway | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503 | Service Unavailable | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504 | Gateway Time-out | 充当网关或代理的服务器，未及时从远端服务器获取请求 |
| 505 | HTTP Version not supported | 服务器不支持请求的HTTP协议的版本，无法完成处理 |


## 二、Nginx 服务

### 1、Nginx 介绍

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407040.png)

_Nginx_ (engine x) 是一个高性能的 HTTP 和 反向代理 服务，也是一个IMAP/POP3/SMTP服务。因它的稳定性、丰富的功能集、示例配置文件和低系统资源的消耗而闻名。

Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好

在高连接并发的情况下，Nginx是Apache服务器不错的替代品。

**创始人伊戈尔·赛索耶夫**

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161407577.png)

### 2、为什么选择 Nginx

Nginx 是一个高性能的 Web 和反向代理服务器, 它具有有很多非常优越的特性:

单机环境下参考服务器配置。 并发连接数在7000+ -8000左右。 集群模式20000+

**作为 Web 服务器**：相比 Apache，Nginx 使用更少的资源，支持更多的并发连接，体现更高的效率，这点使 Nginx 尤其受到虚拟主机提供商的欢迎。能够支持高达 50,000 个并发连接数的响应。

**作为负载均衡服务器**：Nginx 既可以在内部直接支持 Rails 和 PHP，也可以支持作为 HTTP代理服务器 对外进行服务。Nginx 用 C 编写, 不论是系统资源开销还是 CPU 使用效率都比 Perl要好的多。

**作为邮件代理服务器**: Nginx 同时也是一个非常优秀的邮件代理服务器（最早开发这个产品的目的之一也是作为邮件代理服务器），Last.fm 描述了成功并且美妙的使用经验。

**Nginx 安装非常的简单，配置文件 非常简洁（还能够支持perl语法），Bugs非常少的服务器**: Nginx 启动特别容易，并且几乎可以做到7*24不间断运行，即使运行数个月也不需要重新启动。你还能够在 不间断服务的情况下进行软件版本的升级。

### 3、IO多路复用

#### 1、I/O multiplexing【多并发】

第一种方法就是最传统的多进程并发模型 (每进来一个新的I/O流会分配一个新的进程管理。)

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408377.png)

第二种方法就是I/O多路复用 (单个线程，通过记录跟踪每个I/O流(sock)的状态，来同时管理多个I/O流 。)

I/O multiplexing 这里面的 multiplexing 指的其实是在单个线程通过记录跟踪每一个Sock(I/O流)的状态来同

时管理多个I/O流。发明它的原因，是尽量多的提高服务器的吞吐能力。

在同一个线程里面， 通过拨开关的方式，来同时传输多个I/O流。

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408960.png)

#### 2、一个请求到来了，nginx使用epoll接收请求的过程是怎样的?

ngnix会有很多连接进来， epoll会把他们都监视起来，然后像拨开关一样，谁有数据就拨向谁，然后调用相应的代码处理。

- **epoll**.

epoll 可以说是I/O 多路复用最新的一个实现，epoll 修复了select/poll绝大部分问题, 比如：

• epoll 线程安全的。

• epoll 告诉你具体哪个sock有数据，你不用自己去找了。

#### 3、异步，非阻塞

```shell
$ pstree |grep nginx
 |-+= 81666 root nginx: master process nginx
 | |--- 82500 nobody nginx: worker process
 | \--- 82501 nobody nginx: worker process
```

1个master进程，2个work进程

     每进来一个request，会有一个worker进程去处理。但不是全程的处理，处理到什么程度呢？处理到可能发生阻塞的地方，比如向后端服务器转发request，并等待请求返回。那么，这个处理的worker不会这么一直等着，他会在发送完请求后，注册一个事件：“如果upstream返回了，告诉我一声，我再接着干”。于是他就休息去了。这就是异步。此时，如果再有request 进来，他就可以很快再按这种方式处理。这就是非阻塞和IO多路复用。而一旦上游服务器返回了，就会触发这个事件，worker才会来接手，这个request才会接着往下走。这就是异步回调。

## Nginx安装部署和配置管理

#### **1、Nginx部署-Yum安装**

访问nginx的官方网站：[http://www.nginx.org/](http://www.nginx.org/)

Nginx版本类型

Mainline version：   主线版，即开发版

Stable version：       最新稳定版，生产环境上建议使用的版本

Legacy versions：    遗留的老版本的稳定版

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408617.png)

**Yum安装nginx**

配置Yum源的官网:[http://nginx.org/en/linux_packages.html](http://nginx.org/en/linux_packages.html)

**1、配置nginx的Yum源**

安装说明

在新计算机上首次安装nginx之前，需要设置nginx软件包存储库。 之后，您可以从存储库安装和更新nginx。

**RHEL/CENTOS**

Install the prerequisites:

```shell
# sudo yum install yum-utils -y
```

```shell
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

```shell
# sudo yum install nginx -y
```

**这里我们用稳定版本**

```shell
[root@nginx-server yum.repos.d]# yum install -y nginx
[root@nginx-server yum.repos.d]# nginx -V    //格式化打印
nginx version: nginx/1.16.0
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC) 
built with OpenSSL 1.0.2k-fips  26 Jan 2017
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie'
```

```shell
[root@nginx-server yum.repos.d]# nginx -v
nginx version: nginx/1.16.0
```

**关闭防火墙和selinux:**

```shell
[root@nginx-server ~]# getenforce 
Enforcing

[root@nginx-server ~]# setenforce 0

[root@nginx-server ~]# systemctl stop firewalld
[root@nginx-server ~]# systemctl disable firewalld
```

**启动并设置开机启动**

```shell
[root@nginx-server ~]# systemctl start nginx 
[root@nginx-server ~]# systemctl enable nginx
```

浏览器输入ip访问:

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408063.png)

#### 2、Nginx 编译安装与配置使用

##### 1、安装编译环境

```shell
yum -y install gcc gcc-c++
```

##### 2、安装pcre软件包（使nginx支持http rewrite模块）

```shell
yum install -y pcre pcre-devel
```

##### 3、安装openssl-devel（使nginx支持ssl）

```shell
yum install -y openssl openssl-devel
```

##### 4、安装zlib

```shell
yum install -y zlib zlib-devel
```

##### 5、创建用户nginx

```shell
useradd nginx
passwd nginx
```

**6、安装nginx**

```shell
[root@localhost ~]# wget http://nginx.org/download/nginx-1.16.0.tar.gz
[root@localhost ~]# tar xzf nginx-1.16.0.tar.gz -C /usr/local/
[root@localhost ~]# cd /usr/local/nginx-1.16.0/
[root@localhost nginx-1.16.0]# ./configure --prefix=/usr/local/nginx --group=nginx --user=nginx --sbin-path=/usr/local/nginx/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/tmp/nginx/client_body --http-proxy-temp-path=/tmp/nginx/proxy --http-fastcgi-temp-path=/tmp/nginx/fastcgi --pid-path=/var/run/nginx.pid --lock-path=/var/lock/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_gzip_static_module --with-pcre --with-http_realip_module --with-stream
[root@localhost nginx-1.16.0]# make && make install
```

**7、Nginx 编译参数**

```shell
# 查看 nginx 安装的模块
[root@localhost ~]#/usr/local/nginx/sbin/nginx -V
# 模块参数具体功能
--with-cc-opt='-g -O2 -fPIE -fstack-protector    //设置额外的参数将被添加到CFLAGS变量。（FreeBSD或者ubuntu使用）
--param=ssp-buffer-size=4 -Wformat -Werror=format-security -D_FORTIFY_SOURCE=2' 
--with-ld-opt='-Wl,-Bsymbolic-functions -fPIE -pie -Wl,-z,relro -Wl,-z,now' 

--prefix=/usr/local/nginx                        //指向安装目录
--conf-path=/etc/nginx/nginx.conf                //指定配置文件
--http-log-path=/var/log/nginx/access.log        //指定访问日志
--error-log-path=/var/log/nginx/error.log        //指定错误日志
--lock-path=/var/lock/nginx.lock                 //指定lock文件
--pid-path=/run/nginx.pid                        //指定pid文件

--http-client-body-temp-path=/var/lib/nginx/body    //设定http客户端请求临时文件路径
--http-fastcgi-temp-path=/var/lib/nginx/fastcgi     //设定http fastcgi临时文件路径
--http-proxy-temp-path=/var/lib/nginx/proxy         //设定http代理临时文件路径
--http-scgi-temp-path=/var/lib/nginx/scgi           //设定http scgi临时文件路径
--http-uwsgi-temp-path=/var/lib/nginx/uwsgi         //设定http uwsgi临时文件路径

--with-debug                                        //启用debug日志
--with-pcre-jit                                     //编译PCRE包含“just-in-time compilation”
--with-ipv6                                         //启用ipv6支持
--with-http_ssl_module                              //启用ssl支持
--with-http_stub_status_module                      //获取nginx自上次启动以来的状态
--with-http_realip_module                 //允许从请求标头更改客户端的IP地址值，默认为关
--with-http_auth_request_module           //实现基于一个子请求的结果的客户端授权。如果该子请求返回的2xx响应代码，所述接入是允许的。如果它返回401或403中，访问被拒绝与相应的错误代码。由子请求返回的任何其他响应代码被认为是一个错误。
--with-http_addition_module               //作为一个输出过滤器，支持不完全缓冲，分部分响应请求
--with-http_dav_module                    //增加PUT,DELETE,MKCOL：创建集合,COPY和MOVE方法 默认关闭，需编译开启
--with-http_geoip_module                  //使用预编译的MaxMind数据库解析客户端IP地址，得到变量值
--with-http_gunzip_module                 //它为不支持“gzip”编码方法的客户端解压具有“Content-Encoding: gzip”头的响应。
--with-http_gzip_static_module            //在线实时压缩输出数据流
--with-http_image_filter_module           //传输JPEG/GIF/PNG 图片的一个过滤器）（默认为不启用。gd库要用到）
--with-http_spdy_module                   //SPDY可以缩短网页的加载时间
--with-http_sub_module                    //允许用一些其他文本替换nginx响应中的一些文本
--with-http_xslt_module                   //过滤转换XML请求
--with-mail                               //启用POP3/IMAP4/SMTP代理模块支持
--with-mail_ssl_module                    //启用ngx_mail_ssl_module支持启用外部模块支持
```

**8、修改配置文件/etc/nginx/nginx.conf**

```shell
# 全局参数设置
user  nginx;				  #指定用户
worker_processes  4;          #设置nginx启动进程的数量，一般设置成与逻辑cpu数量相同
error_log  logs/error.log;    #指定错误日志
worker_rlimit_nofile 10240;  #设置一个nginx进程能打开的最大文件数
pid        /var/run/nginx.pid;
events {
    worker_connections  1024; #设置一个进程的最大并发连接数
}

# http 服务相关设置
http {
    include      mime.types;
    default_type  application/octet-stream;
    log_format  main  'remote_addr - remote_user [time_local] "request" '
                      'status body_bytes_sent "$http_referer" '
                      '"http_user_agent" "http_x_forwarded_for"'; 
    access_log  /var/log/nginx/access.log  main;    #设置访问日志的位置和格式 
    sendfile          on; #是否调用sendfile函数输出文件，一般设置为on，若nginx是用来进行磁盘IO负载应用时，可以设置为off，降低系统负载
    gzip              on;      #是否开启gzip压缩，将注释去掉开启 
    keepalive_timeout  65;     #设置长连接的超时时间
# 虚拟服务器的相关设置
server { 
        listen      80;        #设置监听的端口 
        server_name  localhost;        #设置绑定的主机名、域名或ip地址 
#        charset koi8-r;        # 设置编码字符 
		charset utf-8;
        location / { 
            root  /var/www/nginx;           #设置服务器默认网站的根目录位置,需要手动创建
            index  index.html index.htm;    #设置默认打开的文档 
        } 
        error_page  500 502 503 504  /50x.html; #设置错误信息返回页面 
        location = /50x.html { 
            root  html;        #这里的绝对位置是/usr/local/nginx/html
        }
    }
}
```

```shell
nginx.conf的组成:nginx.conf一共由三部分组成，分别为：全局块、events块、http块。在http块中又包含http全局块、多个server块。每个server块中又包含server全局块以及多个location块。在统一配置块中嵌套的配置快，各个之间不存在次序关系。
```

**检测nginx配置文件是否正确**

```shell
[root@localhost ~]# /usr/local/nginx/sbin/nginx -t
[root@localhost ~]# mkdir -p /tmp/nginx
[root@localhost ~]# mkdir /usr/local/nginx/logs
```

**10、启动nginx服务**

```shell
[root@localhost ~]# /usr/local/nginx/sbin/nginx
```

**11、通过 nginx 命令控制 nginx 服务**

a、常用命令

```shell
nginx -c /path/nginx.conf  	     # 以特定目录下的配置文件启动nginx:
nginx -s reload            	 	 # 修改配置后重新加载生效
nginx -s stop  				 	 # 快速停止nginx
nginx							 # 快速启动nginx
nginx -t    					 # 测试当前配置文件是否正确
nginx -t -c /path/to/nginx.conf  # 测试特定的nginx配置文件是否正确
```

b、添加权限

```shell
# chmod +x /etc/init.d/nginx
```

c、重新加载系统启动文件

```shell
# systemctl daemon-reload
```

d、启动并设置开机自启

```shell
# systemctl start nginx
```

**10、Nginx 日志文件详解**

    nginx 日志文件分为 **log_format** 和 **access_log** 两部分

    log_format 定义记录的格式，其语法格式为

    log_format        样式名称        样式详情

    配置文件中默认有

```shell
log_format  main  'remote_addr - remote_user [time_local] "request" '
                  'status body_bytes_sent "$http_referer" '
                  '"http_user_agent" "http_x_forwarded_for"';
```

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408710.png)

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408193.png)

#### **3、使用 limit_rate 限制客户端传输数据的速度**

1、编辑/etc/nginx/nginx.conf

```shell
location / {
            root   /var/www/nginx/;
            index  index.html index.htm;
            limit_rate  2k;  #对每个连接的限速为2k/s
}
```

修改完配置文件，需要重启服务（重新加载服务）

**注意要点：**

-      配置文件中的每个语句要以 ; 结尾  
#### 4、Nginx 虚拟主机配置

**什么是虚拟主机？**
虚拟主机是一种特殊的软硬件技术，它可以将网络上的每一台计算机分成多个虚拟主机，每个虚拟主机可以独立对外提供web服务，这样就可以实现一台主机对外提供多个web服务，每个虚拟主机之间是独立的，互不影响。

![image.png](http://img.mingfancloud.cn/University-studies/ComputerScienceAndTechnology/nginx2024/nginx-1/202404161408108.png)

nginx可以实现虚拟主机的配置，nginx支持三种类型的虚拟主机配置。
1、基于域名的虚拟主机 （server_name来区分虚拟主机——应用：web网站）
2、基于ip的虚拟主机， （一个主机绑定多个ip地址）
3、基于端口的虚拟主机 （端口来区分虚拟主机——应用：公司内部网站，外部网站的管理后台）

**1、 基于域名的虚拟主机**

1、配置通过域名区分的虚拟机

```shell
[root@localhost ~]# cat /etc/nginx/nginx.conf
user nginx;
worker_processes  4;

#error_log  logs/error.log;
worker_rlimit_nofile 102400;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    
    server {
        listen       80;
        server_name  web.testpm.com;
        location / {
            root   /var/www/nginx/;
            index  index.html index.htm;
            limit_rate	2k;
        	}
        }
    
    server {
        listen       80;
        server_name  web.1000phone.com;
        location / {
            root   /1000phone/html;
            index  index.html index.htm;
        	}
        }
}

[root@localhost nginx]# cat /var/www/nginx/index.html 
hello tianyun

[root@localhost nginx]# cat /1000phone/html/index.html 
this is my 1000phone
```

2、 为域名为 web.1000phone.com 的虚拟机，创建 index 文件

```shell
[root@localhost ~]# mkdir -p /1000phone/html
[root@localhost ~]# vim /1000phone/html/index.html
this is my 1000phone
```

3、重新加载配置文件

```shell
# 如果编译安装的执行
[root@nginx]# /usr/local/nginx/sbin/nginx -s reload
# 如果 yum 安装的执行
[root@nginx]# nginx -s reload
```

4、客户端配置解析
在 C:\Windows\System32\drivers\etc\hosts 文件中添加两行(linux:/etc/hosts)

```shell
10.0.105.199 web.testpm.com
10.0.105.199 web.1000phone.com
```

5、 测试访问

浏览器输入：[http://web.testpm.com/](http://web.testpm.com/)

浏览器输入：[http://web.1000phone.com/](http://web.1000phone.com/)

**2、 基于ip的虚拟主机**

```shell
[root@localhost ~]# ip a 
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:17:f1:af brd ff:ff:ff:ff:ff:ff
    inet 10.0.105.199/24 brd 10.0.105.255 scope global dynamic ens33
       valid_lft 81438sec preferred_lft 81438sec
    inet6 fe80::9d26:f3f0:db9c:c9be/64 scope link 
       valid_lft forever preferred_lft forever
[root@localhost ~]# ifconfig ens33:1 10.0.105.201/24
[root@localhost ~]# ifconfig
ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.105.199  netmask 255.255.255.0  broadcast 10.0.105.255
        inet6 fe80::9d26:f3f0:db9c:c9be  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:17:f1:af  txqueuelen 1000  (Ethernet)
        RX packets 9844  bytes 1052722 (1.0 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5567  bytes 886269 (865.4 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

ens33:1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.0.105.201  netmask 255.255.255.0  broadcast 10.0.105.255
        ether 00:0c:29:17:f1:af  txqueuelen 1000  (Ethernet)

2、配置通过ip区分的虚拟机
[root@localhost ~]# cat /etc/nginx/nginx.conf
user  root;
worker_processes  4;

#error_log  logs/error.log;
worker_rlimit_nofile 102400;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    server {
        listen       80;
        server_name  10.0.105.199;
        location / {
            root   /var/www/nginx/;
            index  index.html index.htm;
            limit_rate	2k;
        }
        
     server {
        listen       80;
        server_name  10.0.105.201;
        location / {
            root   /1000phone/html/;
            index  index.html index.htm;
        	}
        }
}
3、重新加载配置文件
[root@localhost ~]# /usr/local/nginx/sbin/nginx -s reload
4、 测试访问
浏览器输入：http://10.0.105.199
浏览器输入：http://10.0.105.201
5、补充
-- 删除绑定的临时ip
[root@localhost ~]# ifconfig ens33:1 10.0.105.201/24 down
重启一下nginx
[root@localhost ~]# systemctl restart nginx
```

**3、 基于端口的虚拟主机**

```shell
[root@localhost ~]# cat /etc/nginx/nginx.conf
user  root;
worker_processes  4;

worker_rlimit_nofile 102400;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';


    sendfile        on;

    keepalive_timeout  65;


    server {
        listen       80;
        server_name  web.testpm.com;
        location / {
            root   /var/www/nginx/;
            index  index.html index.htm;
            limit_rate	2k;
        }
        
    
     server {
        listen       8080;
        server_name  web.testpm.com;
        location / {
            root   /1000phone/html/;
            index  index.html index.htm;
        	}
        }
}
重新加载配置文件:
[root@localhost ~]# /usr/local/nginx/sbin/nginx -s reload
测试访问:
浏览器输入：http://web.testpm.com/
浏览器输入：http://web.1000phone.com:8080
```



