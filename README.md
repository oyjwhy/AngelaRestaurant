# Angela餐厅

安其拉餐厅，南开大学2017年软件工程大作业，目标是实现智能的餐厅管理系统。

## quick start
###  环境配置
需要NodeJS，Mysql,及Redis支持，请自行安装配置。

### 启动
下载代码完成后，请到目录下执行

```javascript
$ npm install
```
安装依赖完成后，执行以下语句，在浏览器输入 localhost:3000 
```javascript
$ node app.js
```

### 相关配置
```json
{
    "db":{ //数据库配置
        "user":"",
        "password":"",
        "port":"",
        "host":",
        "database":""
    },
    "redis":{ //Redis配置
        "host":"localhost",
        "port":"6379",
        "ttl":"3600"
    },
    "title":"安其拉餐厅",// 网站title
    "port":"3000",// 服务器端口
    "role":{ // 默认角色及默认权限
        "Customer":[2,4,9],
        "Waiter":[2,3,4,5,6,9],
        "Manager":[5,7,9],
        "BusBoy":[6]
    },
    "icon":{ //创建菜的默认图标
        "dish":"http://i2.muimg.com/1949/be70d55a6c109c1d.png"
    }
}
```


## 界面

清晰美观，简洁大方

登陆界面
![Alt text](http://i1.piimg.com/588926/dcd5c88a1e14de2d.png)

点餐界面
![Alt text](http://i1.piimg.com/588926/a94ee8eb77e8bee5.png)


餐桌管理界面
![Alt text](http://i1.piimg.com/588926/6ac54d57b827656f.png )

预订单队列
![Alt text](http://i1.piimg.com/588926/aa5d6ef0dde24b82.png)

经理管理界面
![Alt text](http://i1.piimg.com/588926/b27e26b7a08f63af.png)

报表界面
![Alt text](http://i1.piimg.com/588926/ad9ade7d76ac78e5.png)


