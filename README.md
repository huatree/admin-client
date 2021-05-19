# react-client

> wyh |2021-05-12

## 目录结构

**注意：**基于`create-react-app`做的相应设计

```js
+-- node_modules/      node模块目录
+-- public
|   --- index.html     首页入口html文
|   --- ...
|   +-- api            http请求存放目录
|   |   --- ajax.js    axios封装  
|   |   --- index.js   api请求配置
|   +-- assets         静态资源
|   |   +-- style      样式
|   |   +-- img        图片
|   +-- components     公共组件             
|   |   +-- common     非路由的公共内容、ui组件
|   |   +-- content    路由下拆分的内容组件（日后用到）
|   +-- config         菜单配置、路由配置等
|   +-- layout         页面布局模块
|   +-- pages          页面模块
|   +-- router         路由封装（日后用到）
|   +-- utils          工具类
|   --- App.js         应用访问入口
|   --- index.js       App渲染入口
|   --- router.js      路由封装
--- .gitignore         忽略项配置
--- craco.config.js    覆盖webpack配置
--- package.json       项目的配置信息
--- README.md          项目文档
--- yarn.lock          node模块（简称包）版本管理
```

## 运行相关

克隆或下载到本地，然后安装依赖，测试运行

```cmd
cd admin-client
yarn install
yarn start
```
