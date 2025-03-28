# 如何解决数据查询为空的 Bug？

> 作者：[程序员鱼皮](https://space.bilibili.com/12890453/)，[编程导航星球](https://yuyuanweb.feishu.cn/wiki/VC1qwmX9diCBK3kidyec74vFnde) 编号 1



大家在开发时，遇到的一个典型的 Bug 就是：为什么数据查询为空？

对应的现象就是：前端展示不出数据、或者后端查询到的数据列表为空。

![img](https://pic.yupi.icu/1/1698891856196-b6f20274-9224-4fd9-a0c8-f10a46170aef-20231102133931574.png)

遇到此类问题，其实是有经典的解决套路的，下面鱼皮给大家分享如何高效解决这个问题。

只需 4 个步骤：



## 解决步骤

### 1、定位问题边界

首先要定位数据查询为空的错误边界。说简单一点，就是要确认是前端还是后端的锅。

要先从请求的源头排查，也就是前端浏览器，毕竟前端和后端是通过接口（请求）交互的。

在浏览器中按 F12 打开浏览器控制台，进入网络标签，然后刷新页面或重新触发请求，就能看到请求的信息了。

选中请求并点击预览，就能看到后端返回结果，有没有返回数据一看便知。

![img](https://pic.yupi.icu/1/1698891947432-a521a5c2-2c57-4307-bad3-0242cb3dff67-20231102133931604.png)

![img](https://pic.yupi.icu/1/1698892093874-2517f3bf-49d5-40c8-9f8c-c6c40fe926e6-20231102133931639.png)



如果发现后端正常返回了数据，那就是前端的问题，查看自己的页面代码来排查为什么数据没在前端显示，比如是不是取错了数据的结构？可以多用 debugger 或 console.log 等方式输出信息，便于调试。

星球同学可以免费阅读前端嘉宾神光的《前端调试通关秘籍》：https://t.zsxq.com/13Rh4xxNK



如果发现后端未返回数据，那么前端需要先确认下自己传递的参数是否正确。

比如下面的例子，分页参数传的太大了，导致查不到数据：

![img](https://pic.yupi.icu/1/1698892380058-7484b6af-21ef-4159-9267-64e22c162a90-20231102133931650.png)



如果发现请求参数传递的没有问题，那么就需要后端同学帮忙解决了。

通过这种方式，直接就定位清楚了问题的边界，高效~



### 2、后端验证请求

接下来的排查就是在后端处理了，首先开启 Debug 模式，从接受请求参数开始逐行分析。

比如先查看请求参数对象，确认前端有没有按照要求传递请求参数：

![img](https://pic.yupi.icu/1/1698893025601-50145488-e10a-47a2-a787-8d5e66e23e81-20231102133931709.png)

毕竟谁能保证我们的同事（或者我们自己）不是小迷糊呢？即使前端说自己请求是正确的，但也必须要优先验证，而不是一上来就去分析数据库和后端程序逻辑的问题。

验证请求参数对象没问题后，接着逐行 Debug，直到要执行数据库查询。



### 3、后端验证数据库查询

无论是从 MySQL、MongoDB、Redis，还是文件中查询数据，为了理解方便，我们暂且统称为数据库。

上一步中，我们已经 Debug 到了数据库查询，需要重点关注 2 个点：

1）查看封装的请求参数是否正确

对于 MyBatis Plus 框架来说，就是查看 QueryWrapper 内的属性是否正确填充了查询条件

![img](https://pic.yupi.icu/1/1698893321346-e29f225f-4506-4c3a-a0f7-77b176bfcb6e-20231102133931781.png)



2）查看数据库的返回结果是否有值

比如 MyBatis Plus 的分页查询中，如果 records 属性的 size 大于 0，表示数据库返回了数据，那么就不用再排查数据库查询的问题了；而如果 size = 0，就要分析为什么从数据库中查询的数据为空。

![img](https://pic.yupi.icu/1/1698893389456-177c8d95-3825-44f6-b713-98d7dddaa31f-20231102133931819.png)



这一步尤为关键，我们需要获取到实际发送给数据库查询的 SQL 语句。如果你使用的是 MyBatis Plus 框架，可以直接在 `application.yml` 配置文件中开启 SQL 语句日志打印，参考配置如下：

```yaml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```



然后执行查询，就能看到完整的 SQL 语句了：

![img](https://pic.yupi.icu/1/1698902718455-5731f602-a2ee-4b7c-8ca6-9bbf2790bc59-20231102133931835.png)



把这个 SQL 语句复制到数据库控制台执行，验证下数据结果是否正确。如果数据库直接执行语句都查不出数据，那就确认是查询条件错误了还是数据库本身就缺失数据。



### 4、后端验证数据处理逻辑

如果数据库查询出了结果，但最终响应给前端的数据为空，那么就需要在数据库查询语句后继续逐行 Debug，验证是否有过滤数据的逻辑。

比较典型的错误场景是查询出的结果设置到了错误的字段中、或者由于权限问题被过滤和脱敏掉了。



## 最后

以后再遇到数据查询为空的情况，按照以上步骤排查问题即可。排查所有 Bug 的核心流程都是一样的，先搜集信息、再定位问题、最后再分析解决。

