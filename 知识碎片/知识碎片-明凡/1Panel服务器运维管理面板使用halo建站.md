# 1Panel服务器运维管理面板使用halo建站

> 本文作者：[明凡](../../作者.md)
>
> 站长：[明凡]()
>
> 本站地址：[https://mingfancloud.cn](https://mingfancloud.cn)

- 1panel 是一个基于 PHP 的服务器运维管理面板，支持 Linux、Windows、MacOS 操作系统，支持 MySQL、MariaDB、PostgreSQL、SQLite、Oracle、MongoDB、Redis、Elasticsearch、MSSQL、CockroachDB、ClickHouse、Kafka、Kubernetes、Docker、Docker-Compose、Kubernetes
- [官网](https://1panel.cn/)

## 在服务器中安装1Panel

```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh

```

## 维护1panel

安装成功后，可使用 ``1pctl`` 命令行工具来维护 ``1Panel``

```bash
Usage:
  1pctl [COMMAND] [ARGS...]
  1pctl --help

Commands: 
  status              查看 1Panel 服务运行状态
  start               启动 1Panel 服务
  stop                停止 1Panel 服务
  restart             重启 1Panel 服务
  uninstall           卸载 1Panel 服务
  user-info           获取 1Panel 用户信息
  listen-ip           切换 1Panel 监听 IP
  version             查看 1Panel 版本信息
  update              修改 1Panel 系统信息
  reset               重置 1Panel 系统信息
  restore             恢复 1Panel 服务及数据

```




