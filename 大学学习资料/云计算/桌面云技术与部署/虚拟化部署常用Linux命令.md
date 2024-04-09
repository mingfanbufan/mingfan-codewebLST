# 虚拟化部署常用Linux命令

> 本文作者：[明凡]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)

## 1 修改Linux网卡IP地址（以bridge0网络为例）：

### 1.1 配置静态IP

①使用ifconfig查看网卡名称：


![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301534929.png)

②在/etc/sysconfig/network-scripts/目录中找对应的网卡文件

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301640225.png)

③用vi/vim编辑网卡文件

```bash
vi ifcfg-bridge0
```

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301641706.png)

文本的编辑方式：  
“i”进入编辑模式  
“Esc”退出编辑模式  
“：”（Shift键+：）输入wq，退出并保存；w：write（写入）；q：quit（退出）；q！强制退出  
以上步骤完成，通过ifconfig命令查看IP地址并没有修改，需要执行以下命令：  

```bash
systemctl restart network            #重启网络服务
用ifconfig或ip a验证网卡地址是否修改
```

### 1.2 配置动态IP

参考1.1步骤找到ifcfg-bridge0网卡文件  
修改前：

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301643241.png)

将BOOTPROTO=none改为BOOTPROTO=dhcp，删除IP地址信息

```bash
BOOTPROTO=dhcp
IPADDR=192.168.1.90  #删掉
PREFIX=24  #删掉
GATEWAY=192.168.1.1  #删掉
DNS1=114.114.114.114  #删掉
```

修改后：

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301645961.png)

```bash
systemctl restart network            #重启网络服务
用ifconfig或ip a验证网卡地址是否修改
```

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301645196.png)

## 2 修改SSH相关内容（X11转发、允许root用户登录）

### 2.1 开启X11转发

①备份sshd_config文件

X11转发需要修改sshd_config文件，一旦参数修改错误，会导致sshd服务无法启动，导致远程无法连接。为保险起见，先备份sshd_config文件

```bash
cd /etc/ssh                           #sshd_config文件所在目录
 cp sshd_config sshd_config.bak        #备份sshd_config文件
```

②修改sshd_config文件
```bash
vi sshd_config
```

进入文件后输入/X11，回车（/X11：目的是索引X11开头的语句。注意：不要进入文本编辑模式后输入）

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301647295.png)

开启X11转发，把no改成yes  
文本的编辑方式：  
“i”进入编辑模式  
“Esc”退出编辑模式  
“：”（Shift键+：）输入wq，退出并保存；w：write（写入）；q：quit（退出）；q！强制退出  
以上步骤完成，需要执行以下命令，重启sshd服务：  

```bash
systemctl restart sshd            #重启网络服务
```

错误示范：  
sshd_config文件在修改时输入了错误的字符，导致sshd服务无法启动，进而导致远程无法连接

![](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301648237.png)

### 2.2 允许root用户登录（CNA、VRM默认不允许root用户登录）

修改sshd_config文件

```bash
vi /etc/ssh/sshd_config
```

进入文件后输入/Permit，回车（/Permit：目的是索引Permit开头的语句。注意：不要进入文本编辑模式后输入）

![图片](https://mingfanweb-img.obs.cn-north-4.myhuaweicloud.com/University-studies/cloud-computing/DesktopCloudTechnology/CommonLinuxCommandsForVirtualizationDe/202403301653042.png)

```bash
如果截图为：
#PermitRootLogin yes
把#删掉
```

文本的编辑方式：  
“i”进入编辑模式  
“Esc”退出编辑模式  
“：”（Shift键+：）输入wq，退出并保存；w：write（写入）；q：quit（退出）；q！强制退出  
以上步骤完成，需要执行以下命令，重启sshd服务：  

```bash
systemctl restart sshd            #重启网络服务
```






