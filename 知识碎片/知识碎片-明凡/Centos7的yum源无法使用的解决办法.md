# Centos7的yum源无法使用的解决办法

> 本文作者：[明凡](../../作者.md)
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)


## 建立文件夹


```bash
 vi /etc/yum.repos.d/CentOS-Base.repo
```

Centos7
```bash
curl -o /etc/yum.repos.d/CentOSmingfan-Base.repo https://mingfanwin.obs.cn-north-4.myhuaweicloud.com/Centos-mingfan.repo
```

## yum源

```bash
# CentOS-Base.repo  
#  
# 这里配置了CentOS的yum源，使用了阿里云和清华大学的镜像点。  
#  
  
[base]  
name=CentOS-$releasever - Base  
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/  
        http://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/os/$basearch/  
gpgcheck=1  
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7  
  
#released updates   
[updates]  
name=CentOS-$releasever - Updates  
baseurl=http://mirrors.aliyun.com/centos/$releasever/updates/$basearch/  
        http://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/updates/$basearch/  
gpgcheck=1  
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7  
  
#additional packages that may be useful  
[extras]  
name=CentOS-$releasever - Extras  
baseurl=http://mirrors.aliyun.com/centos/$releasever/extras/$basearch/  
        http://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/extras/$basearch/  
gpgcheck=1  
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7  
  
#additional packages that extend functionality of existing packages  
[centosplus]  
name=CentOS-$releasever - Plus  
baseurl=http://mirrors.aliyun.com/centos/$releasever/centosplus/$basearch/  
        http://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/centosplus/$basearch/  
gpgcheck=1  
enabled=0  
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7  
  
#contrib - packages by Centos Users  
[contrib]  
name=CentOS-$releasever - Contrib  
baseurl=http://mirrors.aliyun.com/centos/$releasever/contrib/$basearch/  
        http://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/contrib/$basearch/  
gpgcheck=1  
enabled=0  
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7  
  
# 使用failovermethod指定优先级，这里设置为随机（roundrobin），也可以改为priority并指定每个URL的优先级  
failovermethod=roundrobin

```



## 清理

```bash
sudo yum clean all

sudo yum makecache

sudo yum update
```




