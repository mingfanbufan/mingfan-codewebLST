# openstack搭建自动化脚本-xc

> 本文作者：[小诚]()
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)

---

## 测试成功脚本（待优化）


```bash
#!/bin/bash
#打印菜单并测试
tiao() {
cat <<EOF
小诚的openstack搭建工具箱
wl.控制节点静态网络
wl1.计算节点静态网络
a.控制节点修改控制节点用户名
a1.计算节点修改计算节点用户名
b.控制和计算节点做地址解析
c.控制和计算节点关闭防火墙
d.控制节点上做本地yum源
e.控制节点上做ftp服务
f.计算节点上做yum源
g.控制和计算节点下载网络软件包net-tools
h.控制节点安装与配置chronyd时间同步
h1.计算节点安装与配置chronyd时间服务
i.控制和计算节点安装与配置openstack的基础软件框架
j.控制节点安装与配置mariadb组件
k.控制节点安装与配置rabbitmq组件
l.控制节点安装与配置memcached组件
m.控制控制安装与配置etcd组件
n.控制节点安装与配置Keystone组件
o.控制节点安装Glance镜像组件
p.控制节点安装与配置Placement组件
q.控制节点安装与配置Nova组件
q1.计算节点节点安装与配置nova组件
r3.控制和计算节点网络准备
r.控制节点安装与配置Neutron组件
r1.计算节点安装与配置Neutron组件
s.#计算节点安装与配置Dashboard组件
t.#控制节点安装与配置cinder组件
t1.#计算节点安装与配置cinder组件
xc.最终解释权由小诚所有！
exit.退出
EOF
}


# 执行命令并检查其退出状态
execute() {
    echo "#正在执行: $@"
    "$@"
    if [ $? -ne 0 ]; then
        echo "#错误：命令 '$@' #执行失败" >&2
        exit 1
    else
        echo "#命令 '$@' #执行成功"
    fi
}
#controller静态网络
network1(){
cat >  /etc/sysconfig/network-scripts/ifcfg-ens33 << EOF
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=c23098d2-c971-45a5-847a-966bc75e3cb2
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.10.10
NETMASK=255.255.255.0
EOF
cat > /etc/sysconfig/network-scripts/ifcfg-ens34 << EOF
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens34"
UUID="46857c5f-d83a-44bd-b4da-8af9a3d9ed54"
DEVICE="ens34"
ONBOOT="yes"
IPADDR=192.168.20.10
METMASK=255.255.255.0
GATEWAY=192.168.20.2
DNS1=114.114.114.114
DNS2=8.8.8.8
EOF
execute systemctl restart network
}
#compute静态网络
network2(){
cat >  /etc/sysconfig/network-scripts/ifcfg-ens33 << EOF
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=c23098d2-c971-45a5-847a-966bc75e3cb2
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.10.20
NETMASK=255.255.255.0
EOF
cat > /etc/sysconfig/network-scripts/ifcfg-ens34 << EOF
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens34"
UUID="46857c5f-d83a-44bd-b4da-8af9a3d9ed54"
DEVICE="ens34"
ONBOOT="yes"
IPADDR=192.168.20.20
METMASK=255.255.255.0
GATEWAY=192.168.20.2
DNS1=114.114.114.114
DNS2=8.8.8.8
EOF
execute systemctl restart network
}

#修改用户名
hostname(){
execute hostnamectl set-hostname controller
}
hostname1(){
execute hostnamectl set-hostname compute    
}

#做本地地址解析
hosts(){
cat >> /etc/hosts << EOF
192.168.10.10 controller
192.168.10.20 computer
EOF
execute cat /etc/hosts
}

#关闭防火墙
firewalld(){
execute systemctl stop firewalld
execute systemctl disable firewalld
execute setenforce 0
}

#在controller上做本地yum源
controlleryum(){
execute mkdir /opt/openstack
execute mount openStack-train.iso /opt/openstack/
cat >> /etc/fstab << EOF
/opt/openStack-train.iso /opt/openstack iso9660 defaults 0 0
EOF
execute rm -rf /etc/yum.repos.d/*
execute touch /etc/yum.repos.d/openstack.repo
cat > /etc/yum.repos.d/openstack.repo << EOF
[base]
name=base
baseurl=file:///opt/openstack/base/     
enable=1                         
gpgcheck=0
[extras]
name=extras
baseurl=file:///opt/openstack/extras/     
enable=1                         
gpgcheck=0
[updates]
name=updates
baseurl=file:///opt/openstack/updates/     
enable=1                         
gpgcheck=0
[train]
name=train
baseurl=file:///opt/openstack/train/     
enable=1                         
gpgcheck=0
[virt]
name=virt
baseurl=file:///opt/openstack/virt/     
enable=1                         
gpgcheck=0
EOF
execute yum clean all
execute yum makecache
}

#在controller上做ftp服务
ftp(){
execute yum install vsftpd -y
cat >> /etc/vsftpd/vsftpd.conf << EOF
anon_root=/opt
EOF
execute systemctl start vsftpd
execute systemctl enable vsftpd
execute systemctl restart vsftpd
execute systemctl status vsftpd
}

#在compute上做yum源
computeyum(){
execute rm -rf /etc/yum.repos.d/*
execute touch /etc/yum.repos.d/ftp.repo
cat > /etc/yum.repos.d/ftp.repo << EOF
[base]
name=base
baseurl=ftp://controller/openstack/base/     
enable=1                         
gpgcheck=0
[extras]
name=extras
baseurl=ftp://controller/openstack/extras/     
enable=1                         
gpgcheck=0
[updates]
name=updates
baseurl=ftp://controller/openstack/updates/     
enable=1                         
gpgcheck=0
[train]
name=train
baseurl=ftp://controller/openstack/train/     
enable=1                         
gpgcheck=0
[virt]
name=virt
baseurl=ftp://controller/openstack/virt/     
enable=1                         
gpgcheck=0
EOF
execute yum clean all
execute yum makecache
}

#下载网络软件包net-tools
net-tools(){
execute yum install -y net-tools
}

#chronyd时间同步
chronyd(){
execute yum install -y chrony
sed -i '/^server [0-3]\.centos.pool.ntp.org iburst/d' /etc/chrony.conf
cat >> /etc/chrony.conf << EOF
server ntp.aliyun.com iburst
allow 192.168.0.0/16
local stratum 1
EOF
execute systemctl restart chronyd
execute systemctl status chronyd
}

#compute时间服务
chronyd1(){
execute yum install -y chrony
sed -i '/^server [0-3]\.centos.pool.ntp.org iburst/d' /etc/chrony.conf
cat >> /etc/chrony.conf << EOF
server controller iburst
EOF
execute systemctl restart chronyd
execute systemctl status chronyd
}

#安装openstack的基础软件框架
openstack(){
execute yum install -y centos-release-openstack-train 
execute rm -rf /etc/yum.repos.d/C*.repo
execute yum install -y python-openstackclient openstack-selinux
execute rm -rf /etc/yum.repos.d/C*.repo
execute yum install -y openstack-selinux
}

#安装mariadb
mariadb(){
execute yum install mariadb-server python2-PyMySQL -y
execute touch /etc/my.cnf.d/openstack.cnf
cat >> /etc/my.cnf.d/openstack.cnf << EOF
[mysqld]
bind-address = 192.168.10.10
default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8
EOF
execute systemctl enable mariadb
execute systemctl start mariadb
execute systemctl status mariadb
execute mysql_secure_installation
}

#安装rabbitmq
rabbitmq(){
execute yum install -y rabbitmq-server
execute systemctl enable rabbitmq-server
execute systemctl start rabbitmq-server
execute systemctl status rabbitmq-server
execute rabbitmqctl add_user rabbitmq 000000
execute rabbitmqctl set_permissions rabbitmq ".*" ".*" ".*"
execute rabbitmqctl list_user_permissions rabbitmq
}

#安装memcached
memcached(){
execute yum -y install memcached python-memcached
sed -i 's/^OPTIONS=.*/OPTIONS="-l 127.0.0.1,::1,192.168.10.10"/' /etc/sysconfig/memcached
execute systemctl enable memcached
execute systemctl start memcached
execute systemctl status memcached
}

#安装etcd
etcd(){
execute yum -y install etcd
sed -i 's|^[#]*ETCD_LISTEN_PEER_URLS=.*|ETCD_LISTEN_PEER_URLS="http://192.168.10.10:2380"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_LISTEN_CLIENT_URLS=.*|ETCD_LISTEN_CLIENT_URLS="http://192.168.10.10:2379,http://127.0.0.1:2379"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_NAME=.*|ETCD_NAME="controller"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_INITIAL_ADVERTISE_PEER_URLS=.*|ETCD_INITIAL_ADVERTISE_PEER_URLS="http://192.168.10.10:2380"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_ADVERTISE_CLIENT_URLS=.*|ETCD_ADVERTISE_CLIENT_URLS="http://192.168.10.10:2379"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_INITIAL_CLUSTER=.*|ETCD_INITIAL_CLUSTER="controller=http://192.168.10.10:2380"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_INITIAL_CLUSTER_TOKEN=.*|ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-01"|' /etc/etcd/etcd.conf
sed -i 's|^[#]*ETCD_INITIAL_CLUSTER_STATE=.*|ETCD_INITIAL_CLUSTER_STATE="new"|' /etc/etcd/etcd.conf
execute systemctl enable etcd
execute systemctl start etcd
execute systemctl status etcd
}

#Keystone安装
Keystone(){
execute yum  -y install openstack-keystone httpd mod_wsgi
mysql -u root -p000000 -e "CREATE DATABASE keystone;"
mysql -u root -p000000 -e "GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'localhost' IDENTIFIED BY '000000';"
mysql -u root -p000000 -e "GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' IDENTIFIED BY '000000';"
sed -i 's|^[#]*connection =.*|connection = mysql+pymysql://keystone:000000@controller/keystone|' /etc/keystone/keystone.conf
sed -i 's|^[#]*provider =.*|provider = fernet|' /etc/keystone/keystone.conf
execute su keystone -s /bin/sh -c "keystone-manage db_sync"
execute keystone-manage fernet_setup --keystone-user keystone --keystone-group keystone
execute keystone-manage credential_setup --keystone-user keystone --keystone-group keystone
execute keystone-manage bootstrap --bootstrap-password 000000 --bootstrap-admin-url http://controller:5000/v3 --bootstrap-internal-url http://controller:5000/v3 --bootstrap-public-url http://controller:5000/v3 --bootstrap-region-id RegionOne
execute ln -s /usr/share/keystone/wsgi-keystone.conf /etc/httpd/conf.d/
sed -i 's|^[#]*ServerName.*|ServerName controller|' /etc/httpd/conf/httpd.conf
execute systemctl enable httpd 
execute systemctl start httpd
execute systemctl status httpd
execute touch /root/admin-login
cat >> /root/admin-login << EOF
export OS_USERNAME=admin
export OS_PASSWORD=000000
export OS_PROJECT_NAME=admin
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://controller:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
EOF
source admin-login
execute export -p
}

#安装Glance镜像组件
glance(){
execute yum -y install openstack-glance
execute mysql -uroot -p000000 -e "CREATE DATABASE glance;"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON glance.* TO 'glance'@'%' IDENTIFIED BY '000000';"
cp /etc/glance/glance-api.conf /etc/glance/glance-api.bak
grep -Ev '^$|#' /etc/glance/glance-api.bak > /etc/glance/glance-api.conf
sed -i '/\[database\]/a connection = mysql+pymysql://glance:000000@controller/glance' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a username = glance' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/glance/glance-api.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/glance/glance-api.conf
sed -i '/\[paste_deploy\]/a flavor = keystone' /etc/glance/glance-api.conf
sed -i '/\[glance_store\]/a stores = file' /etc/glance/glance-api.conf
sed -i '/\[glance_store\]/a default_store = file' /etc/glance/glance-api.conf
sed -i '/\[glance_store\]/a filesystem_store_datadir = /var/lib/glance/images/' /etc/glance/glance-api.conf
su glance -s /bin/sh -c "glance-manage db_sync"
execute systemctl enable openstack-glance-api
execute systemctl start openstack-glance-api
execute systemctl status openstack-glance-api
}

#安装与配置Placement
placement(){
yum -y install openstack-placement-api
execute mysql -uroot -p000000 -e "CREATE DATABASE placement;"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON placement.* TO placement@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON placement.* TO placement@'%' IDENTIFIED BY '000000';"
cp /etc/placement/placement.conf  /etc/placement/placement.bak
grep -Ev '^$|#' /etc/placement/placement.bak > /etc/placement/placement.conf
sed -i '/\[placement_database\]/a connection = mysql+pymysql://placement:000000@controller/placement' /etc/placement/placement.conf
sed -i '/\[api\]/a auth_strategy = keystone' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a username = placement' /etc/placement/placement.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/placement/placement.conf
cat > /etc/httpd/conf.d/00-placement-api.conf << EOF
Listen 8778

<VirtualHost *:8778>
  WSGIProcessGroup placement-api
  WSGIApplicationGroup %{GLOBAL}
  WSGIPassAuthorization On
  WSGIDaemonProcess placement-api processes=3 threads=1 user=placement group=placement
  WSGIScriptAlias / /usr/bin/placement-api
  <IfVersion >= 2.4>
    ErrorLogFormat "%M"
  </IfVersion>
  ErrorLog /var/log/placement/placement-api.log
  #SSLEngine On
  #SSLCertificateFile ...
  #SSLCertificateKeyFile ...
 <Directory /usr/bin>
      Require all granted
  </Directory>
</VirtualHost>

Alias /placement-api /usr/bin/placement-api
<Location /placement-api>
  SetHandler wsgi-script
  Options +ExecCGI
  WSGIProcessGroup placement-api
  WSGIApplicationGroup %{GLOBAL}
  WSGIPassAuthorization On
</Location>
EOF
execute su placement -s /bin/sh -c "placement-manage db sync"
execute systemctl restart httpd
}

#安装与配置Nova
nova(){
yum -y install openstack-nova-api openstack-nova-conductor openstack-nova-scheduler openstack-nova-novncproxy
execute mysql -uroot -p000000 -e "CREATE DATABASE nova_api;"
execute mysql -uroot -p000000 -e "CREATE DATABASE nova_cell0;"
execute mysql -uroot -p000000 -e "CREATE DATABASE nova;"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'localhost' IDENTIFIED BY '000000';" 
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova_api.* TO 'nova'@'%' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova_cell0.* TO 'nova'@'%' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON nova.* TO 'nova'@'%' IDENTIFIED BY '000000';"
cp /etc/nova/nova.conf /etc/nova/nova.bak
grep -Ev '^$|#' /etc/nova/nova.bak >/etc/nova/nova.conf
sed -i '/\[api_database\]/a connection = mysql+pymysql://nova:000000@controller/nova_api' /etc/nova/nova.conf
sed -i '/\[database\]/a connection = mysql+pymysql://nova:000000@controller/nova' /etc/nova/nova.conf
sed -i '/\[api\]/a auth_strategy = keystone' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a username = nova' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/nova/nova.conf
sed -i '/\[placement\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[placement\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[placement\]/a project_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[placement\]/a user_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[placement\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[placement\]/a username = placement' /etc/nova/nova.conf
sed -i '/\[placement\]/a password = 000000' /etc/nova/nova.conf
sed -i '/\[placement\]/a region_name = RegionOne' /etc/nova/nova.conf
sed -i '/\[glance\]/a api_servers = http://controller:9292' /etc/nova/nova.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/nova/tmp' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a enabled_apis = osapi_compute,metadata' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller:5672' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a my_ip = 192.168.10.10' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a use_neutron = true' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a firewall_driver = nova.virt.firewall.NoopFirewallDriver' /etc/nova/nova.conf
sed -i '/\[vnc\]/a enabled = true' /etc/nova/nova.conf
sed -i '/\[vnc\]/a server_listen = $my_ip' /etc/nova/nova.conf
sed -i '/\[vnc\]/a server_proxyclient_address = $my_ip' /etc/nova/nova.conf
su nova -s /bin/sh -c "nova-manage api_db sync"
su nova -s /bin/sh -c "nova-manage cell_v2 create_cell --name=cell1"
su nova -s /bin/sh -c "nova-manage cell_v2 map_cell0"
su nova -s /bin/sh -c "nova-manage db sync"
nova-manage cell_v2 list_cells
execute systemctl enable openstack-nova-api openstack-nova-scheduler openstack-nova-conductor openstack-nova-novncproxy
execute systemctl start openstack-nova-api openstack-nova-scheduler openstack-nova-conductor openstack-nova-novncproxy
}
#计算节点安装nova
nova1(){
yum -y install openstack-nova-compute
cp /etc/nova/nova.conf /etc/nova/nova.bak
grep -Ev '^$|#' /etc/nova/nova.bak >/etc/nova/nova.conf
sed -i '/\[api\]/a auth_strategy = keystone' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a username = nova' /etc/nova/nova.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/nova/nova.conf
sed -i '/\[placement\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[placement\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[placement\]/a project_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[placement\]/a user_domain_name = Default' /etc/nova/nova.conf
sed -i '/\[placement\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[placement\]/a username = placement' /etc/nova/nova.conf
sed -i '/\[placement\]/a password = 000000' /etc/nova/nova.conf
sed -i '/\[placement\]/a region_name = RegionOne' /etc/nova/nova.conf
sed -i '/\[glance\]/a api_servers = http://controller:9292' /etc/nova/nova.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/nova/tmp' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a enabled_apis = osapi_compute,metadata' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller:5672' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a my_ip = 192.168.10.20' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a use_neutron = true' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a firewall_driver = nova.virt.firewall.NoopFirewallDriver' /etc/nova/nova.conf
sed -i '/\[vnc\]/a enabled = true' /etc/nova/nova.conf
sed -i '/\[vnc\]/a server_listen = 0.0.0.0' /etc/nova/nova.conf
sed -i '/\[vnc\]/a server_proxyclient_address = $my_ip' /etc/nova/nova.conf
sed -i '/\[vnc\]/a novncproxy_base_url = http://192.168.10.10:6080/vnc_auto.html' /etc/nova/nova.conf
sed -i '/\[libvirt\]/a virt_type = qemu' /etc/nova/nova.conf
execute systemctl enable libvirtd openstack-nova-compute
execute systemctl start libvirtd openstack-nova-compute
}

#网络准备
net(){
ifconfig ens34 promisc
echo 'ifconfig ens34 promisc' | sudo tee -a /etc/profile
echo 'net.bridge.bridge-nf-call-iptables = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.bridge.bridge-nf-call-ip6tables = 1' | sudo tee -a /etc/sysctl.conf
modprobe br_netfilter
execute sysctl -p
}
#安装Neutron组件
neutron(){
yum -y install openstack-neutron openstack-neutron-ml2 openstack-neutron-linuxbridge
execute mysql -uroot -p000000 -e "CREATE DATABASE neutron;"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON neutron.* TO 'neutron'@'%' IDENTIFIED BY '000000';"
cp /etc/neutron/neutron.conf /etc/neutron/neutron.bak
grep -Ev '^$|#' /etc/neutron/neutron.bak>/etc/neutron/neutron.conf
sed -i '/\[database\]/a connection = mysql+pymysql://neutron:000000@controller/neutron' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a auth_strategy = keystone' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a username = neutron' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a core_plugin = ml2' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a service_plugins =' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a auth_strategy = keystone' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a notify_nova_on_port_status_changes = true' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a notify_nova_on_port_data_changes = true' /etc/neutron/neutron.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/neutron/tmp' /etc/neutron/neutron.conf
echo '[nova]' | sudo tee -a /etc/neutron/neutron.conf
echo 'auth_url = http://controller:5000' | sudo tee -a /etc/neutron/neutron.conf
echo 'auth_type = password' | sudo tee -a /etc/neutron/neutron.conf
echo 'project_domain_name = default' | sudo tee -a /etc/neutron/neutron.conf
echo 'user_domain_name = default' | sudo tee -a /etc/neutron/neutron.conf
echo 'project_name = project' | sudo tee -a /etc/neutron/neutron.conf
echo 'username = nova' | sudo tee -a /etc/neutron/neutron.conf
echo 'password = 000000' | sudo tee -a /etc/neutron/neutron.conf
echo 'region_name = RegionOne' | sudo tee -a /etc/neutron/neutron.conf
echo 'server_proxyclient_address = 192.168.10.10' | sudo tee -a /etc/neutron/neutron.conf
cp /etc/neutron/plugins/ml2/ml2_conf.ini /etc/neutron/plugins/ml2/ml2_conf.bak
grep -Ev '^$|#' /etc/neutron/plugins/ml2/ml2_conf.bak>/etc/neutron/plugins/ml2/ml2_conf.ini
echo '[ml2]' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'type_drivers = flat' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'tenant_network_types =' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'mechanism_drivers = linuxbridge' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'extension_drivers = port_security' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo '[ml2_type_flat]' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'flat_networks = provider' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo '[securitygroup]' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
echo 'enable_ipset = true' | sudo tee -a /etc/neutron/plugins/ml2/ml2_conf.ini
ln -s /etc/neutron/plugins/ml2/ml2_conf.ini /etc/neutron/plugin.ini
cp /etc/neutron/plugins/ml2/linuxbridge_agent.ini /etc/neutron/plugins/ml2/linuxbridge_agent.bak
grep -Ev '^$|#' /etc/neutron/plugins/ml2/linuxbridge_agent.bak>/etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo '[linux_bridge]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'physical_interface_mappings = provider:ens34' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo '[vxlan]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'enable_vxlan = false' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo '[securitygroup]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'enable_security_group = true' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini

cp /etc/neutron/dhcp_agent.ini /etc/neutron/dhcp_agent.bak
grep -Ev '^$|#' /etc/neutron/dhcp_agent.bak> /etc/neutron/dhcp_agent.ini
sed -i '/\[DEFAULT\]/a interface_driver = linuxbridge' /etc/neutron/dhcp_agent.ini
sed -i '/\[DEFAULT\]/a dhcp_driver = neutron.agent.linux.dhcp.Dnsmasq' /etc/neutron/dhcp_agent.ini
sed -i '/\[DEFAULT\]/a enable_isolated_metadata = true' /etc/neutron/dhcp_agent.ini

echo 'nova_metadata_host = controller' | sudo tee -a /etc/neutron/metadata_agent.ini
echo 'metadata_proxy_shared_secret = METADATA_SECRET' | sudo tee -a /etc/neutron/metadata_agent.ini
sed -i '/\[neutron\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[neutron\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[neutron\]/a project_domain_name = default' /etc/nova/nova.conf
sed -i '/\[neutron\]/a user_domain_name = default' /etc/nova/nova.conf
sed -i '/\[neutron\]/a region_name = RegionOne' /etc/nova/nova.conf
sed -i '/\[neutron\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[neutron\]/a username = neutron' /etc/nova/nova.conf
sed -i '/\[neutron\]/a password = 000000' /etc/nova/nova.conf
sed -i '/\[neutron\]/a service_metadata_proxy = true' /etc/nova/nova.conf
sed -i '/\[neutron\]/a metadata_proxy_shared_secret = METADATA_SECRET' /etc/nova/nova.conf

su neutron -s /bin/sh -c "neutron-db-manage --config-file /etc/neutron/neutron.conf --config-file /etc/neutron/plugins/ml2/ml2_conf.ini upgrade heads"
execute systemctl restart openstack-nova-api
execute systemctl enable neutron-server neutron-linuxbridge-agent neutron-dhcp-agent neutron-metadata-agent
execute systemctl start neutron-server neutron-linuxbridge-agent neutron-dhcp-agent neutron-metadata-agent
}
#计算节点
neutron1(){
yum -y install openstack-neutron-linuxbridge
cp /etc/neutron/neutron.conf /etc/neutron/neutron.bak
grep -Ev '^$|#' /etc/neutron/neutron.bak>/etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a username = neutron' /etc/neutron/neutron.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller:5672' /etc/neutron/neutron.conf
sed -i '/\[DEFAULT\]/a auth_strategy = keystone' /etc/neutron/neutron.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/neutron/tmp' /etc/neutron/neutron.conf

echo '[linux_bridge]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'physical_interface_mappings = provider:ens34' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo '[vxlan]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'enable_vxlan = false' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo '[securitygroup]' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'enable_security_group = true' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini
echo 'firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver' | sudo tee -a /etc/neutron/plugins/ml2/linuxbridge_agent.ini

sed -i '/\[DEFAULT\]/a vif_plugging_is_fatal = false' /etc/nova/nova.conf
sed -i '/\[DEFAULT\]/a vif_plugging_timeout = 0' /etc/nova/nova.conf
sed -i '/\[neutron\]/a auth_url = http://controller:5000' /etc/nova/nova.conf
sed -i '/\[neutron\]/a auth_type = password' /etc/nova/nova.conf
sed -i '/\[neutron\]/a project_domain_name = default' /etc/nova/nova.conf
sed -i '/\[neutron\]/a user_domain_name = default' /etc/nova/nova.conf
sed -i '/\[neutron\]/a region_name = RegionOne' /etc/nova/nova.conf
sed -i '/\[neutron\]/a project_name = project' /etc/nova/nova.conf
sed -i '/\[neutron\]/a username = neutron' /etc/nova/nova.conf
sed -i '/\[neutron\]/a password = 000000' /etc/nova/nova.conf
execute systemctl restart openstack-nova-compute
execute systemctl enable neutron-linuxbridge-agent
execute systemctl start neutron-linuxbridge-agent
}

#安装与配置Dashboard服务
dashboard(){
yum -y install openstack-dashboard
cat > /etc/openstack-dashboard/local_settings << EOF
# -*- coding: utf-8 -*-

# ----------------------------------------------------------------------
# NOTE: The default values of the settings are defined in
# openstack_dashboard/defaults.py. Prevously most available settings
# were listed in this example file, but it is no longer true.
# For available settings, see openstack_dashboard/defaults.py and
# the horizon setting reference found at
# https://docs.openstack.org/horizon/latest/configuration/settings.html.
#
# Django related settings and HORIZON_CONFIG still exist here.
# Keep in my mind that they will be revisit in upcoming releases.
# ----------------------------------------------------------------------

import os

from django.utils.translation import ugettext_lazy as _


from openstack_dashboard.settings import HORIZON_CONFIG

DEBUG = False

# This setting controls whether or not compression is enabled. Disabling
# compression makes Horizon considerably slower, but makes it much easier
# to debug JS and CSS changes
#COMPRESS_ENABLED = not DEBUG

# This setting controls whether compression happens on the fly, or offline
# with `python manage.py compress`
# See https://django-compressor.readthedocs.io/en/latest/usage/#offline-compression
# for more information
#COMPRESS_OFFLINE = not DEBUG

# If horizon is running in production (DEBUG is False), set this
# with the list of host/domain names that the application can serve.
# For more information see:
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['*']

# Set SSL proxy settings:
# Pass this header from the proxy after terminating the SSL,
# and don't forget to strip it from the client's request.
# For more information see:
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-proxy-ssl-header
#SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# If Horizon is being served through SSL, then uncomment the following two
# settings to better secure the cookies from security exploits
#CSRF_COOKIE_SECURE = True
#SESSION_COOKIE_SECURE = True

# If provided, a "Report Bug" link will be displayed in the site header
# which links to the value of this setting (ideally a URL containing
# information on how to report issues).
#HORIZON_CONFIG["bug_url"] = "http://bug-report.example.com"

# Show backdrop element outside the modal, do not close the modal
# after clicking on backdrop.
#HORIZON_CONFIG["modal_backdrop"] = "static"

# Specify a regular expression to validate user passwords.
#HORIZON_CONFIG["password_validator"] = {
#    "regex": '.*',
#    "help_text": _("Your password does not meet the requirements."),
#}

# Turn off browser autocompletion for forms including the login form and
# the database creation workflow if so desired.
#HORIZON_CONFIG["password_autocomplete"] = "off"

# Setting this to True will disable the reveal button for password fields,
# including on the login form.
#HORIZON_CONFIG["disable_password_reveal"] = False

LOCAL_PATH = '/tmp'

# Set custom secret key:
# You can either set it to a specific value or you can let horizon generate a
# default secret key that is unique on this machine, e.i. regardless of the
# amount of Python WSGI workers (if used behind Apache+mod_wsgi): However,
# there may be situations where you would want to set this explicitly, e.g.
# when multiple dashboard instances are distributed on different machines
# (usually behind a load-balancer). Either you have to make sure that a session
# gets all requests routed to the same dashboard instance or you set the same
# SECRET_KEY for all of them.
SECRET_KEY='7c81dd4d4692c7c573b8'

# We recommend you use memcached for development; otherwise after every reload
# of the django development server, you will have to login again. To use
# memcached set CACHES to something like below.
# For more information, see
# https://docs.djangoproject.com/en/1.11/topics/http/sessions/.
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': 'controller:11211',
    },
}
OPENSTACK_KEYSTONE_MULTIDOMAIN_SUPPORT=True
OPENSTACK_API_VERSIONS={
"identity":3,
"image":2,
"volume":3,
}
OPENSTACK_KEYSTONE_DEFAULT_DOMAIN="Default"
OPENSTACK_KEYSTONE_DEFAULT_ROLE="user"


# If you use ``tox -e runserver`` for developments,then configure
# SESSION_ENGINE to django.contrib.sessions.backends.signed_cookies
# as shown below:
#SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'


# Send email to the console by default
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# Or send them to /dev/null
#EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

# Configure these for your outgoing email host
#EMAIL_HOST = 'smtp.my-company.com'
#EMAIL_PORT = 25
#EMAIL_HOST_USER = 'djangomail'
#EMAIL_HOST_PASSWORD = 'top-secret!'

OPENSTACK_HOST = "controller"
OPENSTACK_KEYSTONE_URL = "http://%s:5000/v3" % OPENSTACK_HOST

# The OPENSTACK_NEUTRON_NETWORK settings can be used to enable optional
# services provided by neutron. Options currently available are load
# balancer service, security groups, quotas, VPN service.
OPENSTACK_NEUTRON_NETWORK = {
    'enable_auto_allocated_network': False,
    'enable_distributed_router': False,
    'enable_fip_topology_check': False,
    'enable_ha_router': False,
    'enable_ipv6': False,
    # TODO(amotoki): Drop OPENSTACK_NEUTRON_NETWORK completely from here.
    # enable_quotas has the different default value here.
    'enable_quotas': False,
    'enable_rbac_policy': False,
    'enable_router': False,

    'default_dns_nameservers': [],
    'supported_provider_types': ['*'],
    'segmentation_id_range': {},
    'extra_provider_types': {},
    'supported_vnic_types': ['*'],
    'physical_networks': [],

}

# The timezone of the server. This should correspond with the timezone
# of your entire OpenStack installation, and hopefully be in UTC.
TIME_ZONE = "Asia/Shanghai"

# Change this patch to the appropriate list of tuples containing
# a key, label and static directory containing two files:
# _variables.scss and _styles.scss
#AVAILABLE_THEMES = [
#    ('default', 'Default', 'themes/default'),
#    ('material', 'Material', 'themes/material'),
#    ('example', 'Example', 'themes/example'),
#]

LOGGING = {
    'version': 1,
    # When set to True this will disable all logging except
    # for loggers specified in this configuration dictionary. Note that
    # if nothing is specified here and disable_existing_loggers is True,
    # django.db.backends will still log unless it is disabled explicitly.
    'disable_existing_loggers': False,
    # If apache2 mod_wsgi is used to deploy OpenStack dashboard
    # timestamp is output by mod_wsgi. If WSGI framework you use does not
    # output timestamp for logging, add %(asctime)s in the following
    # format definitions.
    'formatters': {
        'console': {
            'format': '%(levelname)s %(name)s %(message)s'
        },
        'operation': {
            # The format of "%(message)s" is defined by
            # OPERATION_LOG_OPTIONS['format']
            'format': '%(message)s'
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console': {
            # Set the level to "DEBUG" for verbose output logging.
            'level': 'DEBUG' if DEBUG else 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'console',
        },
        'operation': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'operation',
        },
    },
    'loggers': {
        'horizon': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'horizon.operation_log': {
            'handlers': ['operation'],
            'level': 'INFO',
            'propagate': False,
        },
        'openstack_dashboard': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'novaclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'cinderclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'keystoneauth': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'keystoneclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'glanceclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'neutronclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'swiftclient': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'oslo_policy': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'openstack_auth': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        # Logging from django.db.backends is VERY verbose, send to null
        # by default.
        'django.db.backends': {
            'handlers': ['null'],
            'propagate': False,
        },
        'requests': {
            'handlers': ['null'],
            'propagate': False,
        },
        'urllib3': {
            'handlers': ['null'],
            'propagate': False,
        },
        'chardet.charsetprober': {
            'handlers': ['null'],
            'propagate': False,
        },
        'iso8601': {
            'handlers': ['null'],
            'propagate': False,
        },
        'scss': {
            'handlers': ['null'],
            'propagate': False,
        },
    },
}

# 'direction' should not be specified for all_tcp/udp/icmp.
# It is specified in the form.
SECURITY_GROUP_RULES = {
    'all_tcp': {
        'name': _('All TCP'),
        'ip_protocol': 'tcp',
        'from_port': '1',
        'to_port': '65535',
    },
    'all_udp': {
        'name': _('All UDP'),
        'ip_protocol': 'udp',
        'from_port': '1',
        'to_port': '65535',
    },
    'all_icmp': {
        'name': _('All ICMP'),
        'ip_protocol': 'icmp',
        'from_port': '-1',
        'to_port': '-1',
    },
    'ssh': {
        'name': 'SSH',
        'ip_protocol': 'tcp',
        'from_port': '22',
        'to_port': '22',
    },
    'smtp': {
        'name': 'SMTP',
        'ip_protocol': 'tcp',
        'from_port': '25',
        'to_port': '25',
    },
    'dns': {
        'name': 'DNS',
        'ip_protocol': 'tcp',
        'from_port': '53',
        'to_port': '53',
    },
    'http': {
        'name': 'HTTP',
        'ip_protocol': 'tcp',
        'from_port': '80',
        'to_port': '80',
    },
    'pop3': {
        'name': 'POP3',
        'ip_protocol': 'tcp',
        'from_port': '110',
        'to_port': '110',
    },
    'imap': {
        'name': 'IMAP',
        'ip_protocol': 'tcp',
        'from_port': '143',
        'to_port': '143',
    },
    'ldap': {
        'name': 'LDAP',
        'ip_protocol': 'tcp',
        'from_port': '389',
        'to_port': '389',
    },
    'https': {
        'name': 'HTTPS',
        'ip_protocol': 'tcp',
        'from_port': '443',
        'to_port': '443',
    },
    'smtps': {
        'name': 'SMTPS',
        'ip_protocol': 'tcp',
        'from_port': '465',
        'to_port': '465',
    },
    'imaps': {
        'name': 'IMAPS',
        'ip_protocol': 'tcp',
        'from_port': '993',
        'to_port': '993',
    },
    'pop3s': {
        'name': 'POP3S',
        'ip_protocol': 'tcp',
        'from_port': '995',
        'to_port': '995',
    },
    'ms_sql': {
        'name': 'MS SQL',
        'ip_protocol': 'tcp',
        'from_port': '1433',
        'to_port': '1433',
    },
    'mysql': {
        'name': 'MYSQL',
        'ip_protocol': 'tcp',
        'from_port': '3306',
        'to_port': '3306',
    },
    'rdp': {
        'name': 'RDP',
        'ip_protocol': 'tcp',
        'from_port': '3389',
        'to_port': '3389',
    },
}

# Help URL can be made available for the client. To provide a help URL, edit the
# following attribute to the URL of your choice.
#HORIZON_CONFIG["help_url"] = "http://openstack.mycompany.org"
EOF

cd /usr/share/openstack-dashboard
python manage.py make_web_conf --apache > /etc/httpd/conf.d/openstack-dashboard.conf
cd
ls /etc/openstack-dashboard
ln 	-s	 /etc/openstack-dashboard /usr/share/openstack-dashboard/openstack_dashboard/conf
execute systemctl start httpd
execute systemctl enable httpd
}

#安装Cinder
cinder(){
yum -y install openstack-cinder
execute mysql -uroot -p000000 -e "CREATE DATABASE cinder; "
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'localhost' IDENTIFIED BY '000000';"
execute mysql -uroot -p000000 -e "GRANT ALL PRIVILEGES ON cinder.* TO 'cinder'@'%' IDENTIFIED BY '000000';"
cp /etc/cinder/cinder.conf /etc/cinder/cinder.bak
grep -Ev '^$|#' /etc/cinder/cinder.bak > /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a auth_strategy = keystone' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a username = cinder' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/cinder/cinder.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/cinder/tmp' /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller:5672' /etc/cinder/cinder.conf
sed -i '/\[cinder\]/a os_region_name = RegionOne' /etc/cinder/cinder.conf
su cinder -s /bin/sh -c "cinder-manage db sync"
execute systemctl restart openstack-nova-api
execute systemctl enable openstack-cinder-api openstack-cinder-scheduler
execute systemctl start openstack-cinder-api openstack-cinder-scheduler
}
cinder1(){
lsblk
pvcreate /dev/sdb
vgcreate cinder-volumes /dev/sdb
sed -i '/^devices {/a \    filter = \[ "a/sdb/", "r/.*/" \]' /etc/lvm/lvm.conf
execute systemctl enable lvm2-lvmetad
execute systemctl start lvm2-lvmetad
yum -y install openstack-cinder targetcli python-keystone
cp /etc/cinder/cinder.conf /etc/cinder/cinder.bak
grep -Ev '^$|#' /etc/cinder/cinder.bak > /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a auth_url = http://controller:5000' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a memcached_servers = controller:11211' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a auth_type = password' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a project_domain_name = Default' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a user_domain_name = Default' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a project_name = project' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a username = cinder' /etc/cinder/cinder.conf
sed -i '/\[keystone_authtoken\]/a password = 000000' /etc/cinder/cinder.conf
sed -i '/\[database\]/a connection = mysql+pymysql://cinder:000000@controller/cinder' /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a auth_strategy = keystone' /etc/cinder/cinder.conf
sed -i '/\[oslo_concurrency\]/a lock_path = /var/lib/cinder/tmp' /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a enabled_backends = lvm' /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a transport_url = rabbit://rabbitmq:000000@controller:5672' /etc/cinder/cinder.conf
sed -i '/\[DEFAULT\]/a glance_api_servers = http://controller:9292' /etc/cinder/cinder.conf
execute systemctl enable openstack-cinder-volume target
execute systemctl start openstack-cinder-volume target 
}

zhuan() {
read -p "请输入工具序号[xc进入帮助]:" action
case "$action" in
wl)
network1
;;
wl1)
network2
;;
a)
hostname
;;
a1)
hostname1
;;
b)
hosts
;;
c)
firewalld
;;
d)
controlleryum
;;
e)
ftp
;;
f)
computeyum
;;
g)
net-tools
;;
h)
chronyd
;;
h1)
chronyd1
;;
i)
openstack
;;
j)
mariadb
;;
k)
rabbitmq
;;
l)
memcached
;;
m)
etcd
;;
n)
Keystone
;;
o)
glance
;;
p)
placement
;;
q)
nova
;;
q1)
nova1
;;
r3)
net
;;
r)
neutron
;;
r1)
neutron1
;;
s)
dashboard
;;
t)
cinder
;;
t1)
cinder1
;;
exit)
exit
;;
xc)
echo "关于脚本，最终解释权归小诚所有."
;;
*)
echo "输入错误"
;;
esac
}
while true; do
    tiao
    zhuan
done
```