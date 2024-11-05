# 构建软RAID磁盘阵列实操

## 1、mdadm软件简介

mdadm是multiple devices admin的简称，它是Linux下的一款标准的软件 RAID 管理工具；最小化默认不安装，需要yum安装；
mdadm是一个用于创建、管理、监控RAID设备的工具，它使用linux中的md驱动。
mdadm程序是一个独立的程序，能完成所有软件RAID的管理功能，主要有7种使用模式

## 2、配置文件

mdadm的配置文件：/etc/mdadm.conf
/proc/mdstat ： 当前md(软RAID)的状态信息

## 操作前准备

###  先添加七块硬盘，每个硬盘1G

​    前2个做 RAID 0，另外2个做 RAID 1，最后3个做RAID5。执行 `fdsik -l` 查看硬盘已经添加进来了，分别是 `/dev/sdb、 /dev/sdc、 /dev/sdd、 /dev/sde、/dev/sdf、/dev/sdg 、/dev/sdh。`
   为虚拟机中的实验服务器增加两块容量相同的磁盘（本次实验均在虚拟机中进行）

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810696.png)

至少添加7块硬盘

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810046.png)



###          **安装完后，重启服务器，并用Xshell进行远程连接。开启我们的实验。**

###        （步骤1）  

​         进入/dev目录下，检查磁盘是否安装成功

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810920.png)



###       （步骤2） 

​         使用“fdisk”命令进入到磁盘管理工具界面，在交互界面中首先按“L”即可查询到所有磁盘格式对应的ID号——磁盘阵列为fd，

###        （步骤3） 

​          接着依次按“n”新建磁盘分区——“t”修改磁盘格式（修改HEX代码为fd）——“w”保存退出 ,完成第一块磁盘分区的创建（另几块同理）

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810867.png)

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810818.png)

## mdadm软件创建RAID


## 1、配置RAID 0

### 第一步、创建md0

rpm -q mdadm:先查询系统是否安装mdadm
mdadm -C -v   /dev/md0    -l0   -n2   /dev/sd[b-c]：在分区/dev/sdb sdc 创建md0
-C:创建
-v：显示详情
/dev/md0：为磁盘阵列名称
-l：指定raid级别 level；有0,1,5,10,50等
-n2:2块磁盘
/devsd[b-c]：磁盘的位置
mdadm: chunk size defaults to 512K //这样显示即为成功

### 第二步、查看创建是否成功

**mdadm -D /dev/md0:查看详情**

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810466.png)

### 第三步、写入配置文件

mdadm -Ds /dev/md0:扫描查看/dev/md0详情
mdadm -Dsv /dev/md0 > /etc/mdadm.conf：生成配置文件
-D：查询
-s：扫描
-v：详情：级别、磁盘
若有多个RAID生成配置文件追加方法：mdadm -Dsv /dev/md0 >>etc/mdadm.conf

### 第四步、格式化

mkfs.xfs /dev/mdo

### 第五步、挂载：mount

mkdir /raid0
mount /dev/md0 /raid0

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810197.png)





## 2、配置RAID 1

### 2.1、配置步骤

### 第一步、创建md1

mdadm -C -v /dev/md1 -l1 -n2 /dev/sdc /dev/sdd：创建md0

### 第二步、查询

mdadm -D /dev/md1：查询md1详情；查看文件容量和读数据不受影响

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810196.png)

### 第三步、格式化：

mkfs.xfs /dev/md1

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810633.png)



### 第四步、挂载

mkdir /raid1
mount /dev/md1 /raid1

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810907.png)



### 2.2、模拟破坏硬盘md1并移除

**第一步、**先拷贝一份文件：cp -p /etc/passwd /raid1
**第二步、**移除分区：mdadm /dev/md1 -f /dev/sdc
查询详情：mdadm -D /dev/md1：其中一个硬盘faulty

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230810788.png)

cat /proc/mdstat：查看当前md时时状态

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811017.png)

cat /raid1/passwd
虽然md1删除了，但是内容还可以看

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811678.png)

移除损坏的硬盘 md1：也可以合并成一个命令
mdadm -r /dev/md1 /dev/sdc

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811215.png)


### 2.3、增加一个磁盘

**第一步、**增加磁盘：mdadm -a /dev/md1 /dev/sde
**第二步、**查看是否创建成功：mdadm -D /dev/md1
查看状态会发现需要一点时间同步，具体看下两图

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811295.png)

![img](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811466.png)

**第三步、**同步配置文件：mdadm -Dvs /dev/md11 > /etc/mdadm.conf

### 为了防止这种情况，还可以在一开始创建Raid1的时候就指定热备盘

mdadm -C -v /dev/md11 -l1 -n3 -x1 /dev/sd[f-h]：创建一块热备盘（若有磁盘损坏可以顶替工作）
-x:热备份；一块磁盘备份
实例：创建raid11
mdadm -C -v /dev/md11 -l1 -n2 -x1 /dev/sdf[f-h]创建md11，一块是热备盘，两块硬盘

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811719.png)

这是我们可以看一下raid11内删除硬盘盒增加硬盘属性的变化
查询创建结果：mdadm -D /dev/md11

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811071.png)

mdadm -D /dev/md11:删除md11内的sdf盘
发现sdf变成faulty；sdg自动上位，无须重新设置

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811442.png)



### 2.4、模拟损坏其中一块观察raid状态

破坏和移除磁盘：mdadm /dev/md11 -f /dev/sdf -r /dev/sdf

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811192.png)

这时移除被磨坏的sdf盘，新增一个sdi盘，增加至md11内，发现是备用盘



![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811327.png)

## 3、配置RAID 5

### 第一步、创建raid 5

mdadm -C -v /dev/md5 -l5 -n3 -x1 /dev/sd[b,c,d,e] //3块盘做raid5，1块盘做热备

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811610.png)



### 第二步、查看状态

查看状态：mdadm -D /dev/md5；同步需要时间

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811402.png)

### 第三步、写入RAID配置文件

mdadm -Dvs > /etc/mdadm.conf

### 第四步、格式化

mkfs.xfs /dev/md5

### 第五步、挂载

mkdir /raid5
mount /dev/md5 /raid5/

## 拓展：

watch -n 0.5 ‘mdadm -D /dev/md5’:每0.5s监控一次
watch -n 0.5 'mdadm -D /dev/md5 | tail ‘：每0.5秒监控一次，看后面状态10条

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811736.png)


### 3.1、模拟损坏硬盘并移除

mdadm /dev/md5 -f /dev/sdb -r /dev/sdb：损坏硬盘并移除

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230811658.png)

cat /proc/mdstat：查看md时时状态
mdadm -Dvs /dev/md5 > /etc/mdadm.conf ：损坏之后先更新

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230812487.png)

### 3.2、添加硬盘

-G:前提是存在热备份的时候才可以使用 //需要先-a添加磁盘

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230812810.png)

在raid5中把原来的备份盘变成正式盘:
mdadm -G /dev/md5 -n 4 //原来3块现在变成4块

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230812199.png)

### 4、停止阵列

若有挂载需要先卸载挂载umount /dev/md5
mdadm -s /dev/md5：删除md5；ls /dev/md5

![在这里插入图片描述](http://img.mingfancloud.cn/University-studies/DataStorage/BuildingASoftRAIDDiskArray/202404230812297.png)



### 测试结果：
```bash
ls: 无法访问/dev/md5: 没有那个文件或目录
我们要注意的是
cat /etc/mdadm.conf //配置文件还有便于恢复

**1.**ARRAY /dev/md5 level=raid5 num-devices=3 metadata=1.2 name=localhost.localdomain:5 UUID=19141953:15e712a3:70fc1faa:220b06c7
**2.**devices=/dev/sdc,/dev/sdd,/dev/sde

cat /proc/mdstat //内存中已经读不到了

**1.**Personalities : (raid6) (raid5) (raid4)
**2.**unused devices: <none>


```


### 删除raid不用了，磁盘做其他用（也要先卸载）

umount /dev/md5
mdadm -S /dev/md5

### 5、激活阵列

激活：mdadm -As//s表示恢复的时候会去配置文件中扫描
彻底删除RAID:
rm -rf /etc/mdamd.conf：删除配置文件
再清除superblock
mdadm --zero-surpeblock /dev/sdb:擦除设备中MD超级块



---

- BuildingASoftRAIDDiskArray
