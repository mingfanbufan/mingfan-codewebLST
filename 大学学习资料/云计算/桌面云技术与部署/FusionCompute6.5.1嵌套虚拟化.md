# FusionCompute6.5.1嵌套虚拟化


> 本文作者：[明凡]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)

## 虚拟化嵌套逻辑图

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301609197.png)

## 逻辑拓扑图

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301609673.png)

## 1.openEuler系统安装

### 1.1 创建虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301610460.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301611454.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301611961.png)

### 1.2 安装openEuler

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301611220.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301611350.png)

### 1.3 安装图形化包

```bash
yum install -y vim net-tools bash-completion        # vim ifconfig 'tab'
reboot                                              # 重启
yum install -y dde                                  # dde图形化
systemctl set-default graphical.target              # 设置默认图形化登录
reboot                                              # 重启
```

重启后进入图形化界面

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301613819.png)

## 2.搭建虚拟化嵌套环境

### 2.1 安装虚拟系统管理器

```bash
yum install -y qemu                # 安完这个顺带能用qemu-img建磁盘文件
yum install -y libvirt             # 提供接口
yum install -y virt-manager        # 图形化管理界面
systemctl enable libvirtd --now    # 不配置导致虚拟系统管理启动失败
systemctl restart libvirtd
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301614074.png)

### 2.2 X11转发（可选步骤）

```bash
vi /etc/ssh/sshd_config
```

/X11 搜索关键字，回车
“i” 进入编辑模式
“esc” 退出编辑模式
“：wq” 保存并退出

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301616833.png)

```bash
systemctl restart sshd     #重启sshd服务
MobaXterm重连openEuler会话
virt-manager
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301616207.png)

### 2.3 配置网卡桥接

```bash
yum install -y bridge-utils                # 安装网卡桥接依赖包
ifconfig                                   # 查看网卡名,openEuler的ens33
brctl addbr bridge0                        # 创建网桥“bridge0”
ifconfig bridge0 192.168.1.100 netmask 255.255.255.0        # 给个IP临时激活（网段以电脑所在网络为准，需要命令行ping一个没有使用的IP地址）
执行完成第4行代码后，用Xshell之类远程软件无法连接，通过虚拟机执行命令行
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301620735.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301620169.png)

```bash
nmcli connection modify bridge0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1 ipv4.dns 114.114.114.114 connection.autoconnect yes        

# 生成bridge0网卡文件
```

```bash
cd /etc/sysconfig/network-scripts/          #切换目录
ls                                          #查看ifcfg-bridge0网卡文件是否存在
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301621876.png)

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301622114.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301622919.png)

```bash
nmcli connection reload
nmcli connection up ens33
nmcli connection up bridge0
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301623042.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301623793.png)

## 3.安装CNA和VRM

### 3.1 上传镜像至openEuler

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301624332.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301624212.png)

### 3.2 创建虚拟机（QEMU）

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301625012.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301625016.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301625663.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301625207.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301625717.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301626380.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301626790.png)

### 3.3 创建磁盘文件

```bash
mkdir /home/data
cd /home/data
qemu-img create -f qcow2 CNA01.qcow2 180g -o preallocation=metadata
```

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301627478.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301627365.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301627942.png)

### 3.4 自定义虚拟机

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301628896.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301628305.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301628501.png)

### 3.5 CNA安装

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301629152.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301630803.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301630196.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301630352.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301630259.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301630374.png)

![img](http://img.mingfancloud.cn/University-studies/cloud-computing/DesktopCloudTechnology/FusionCompute6.5.1NestedVirtualization/202403301631311.png)

### 3.6 安装VRM（安装步骤参考CNA）

VRM图形化界面地址：https://vrm的IP地址:8443  
用户名：admin  
密码：IaaS@PORTAL-CLOUD8!




