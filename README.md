# position
##### 演示地址：https://stardew516.github.io/position/dist/view/index.html
扫码查看：
![扫码查看](https://raw.githubusercontent.com/stardew516/position/master/%E6%95%88%E6%9E%9C%E5%9B%BE/%E6%89%AB%E7%A0%81%E6%9F%A5%E7%9C%8B.png)


个人地址
h5定位，失败后调百度接口，根据ip定位，pc端会出现位置偏差。

### npm run dev启动项目
http://localhost:8080/view/index.html进入页面

可在效果演示文件夹查看效果

#### 功能:
##### 1. 定位当前位置
使用h5的getCurrentPosition方法定位, 有时候不稳定, 失败时调百度的接口
##### 2. 姓名, 手机号, 地址信息列表
列表展示
##### 3. 点赞
左滑动可点赞, 也可修改保存地址.


#### 页面结构:
>position  <br/>
>>build  <br/>
>>>build.js -------------------- webpack编译  <br/>
>>>getentry.js -------------------- 获取打包入口方法  <br/>
>>>unit-dev-server.js -------------------- webpack依赖包  <br/>
>>>utils.js -------------------- css加载的方法  <br/>
>>>webpack.base.conf.js -------------------- webpack基本配置  <br/>
>>>webpack.conf.js -------------------- webpack配置  <br/>
>
>>dist -------------------- 打包后的目标地址  <br/>
>>node_modules -------------------- 依赖包放置  <br/>
>>src  <br/>
>>>component  <br/>
>>>>Locate -------------------- 定位组件  <br/>
>>>>Slide -------------------- 滑动组件  <br/>
>>>>ThumbUp -------------------- 点赞组件  <br/>
>>>js  <br/>
>>>>index.js -------------------- html页面对应的js  <br/>
>>>page  <br/>
>>>>index.vue -------------------- 组件页面  <br/>
>>>style  <br/>
>>>>common.scss -------------------- 样式  <br/>
>>>view  <br/>
>>>>index.html -------------------- 页面  <br/>
>>效果图  <br/>
>>>定位.jpeg  <br/>
>>>左滑动效果.jpeg  <br/>
>>>页面效果.jpeg  <br/>
>>>演示小视频.mov  <br/>
>>.babelrc -------------------- es6设置转码的规则和插件  <br/>
>>.editorcongig -------------------- 规范代码缩进  <br/>
>>.eslintrc.js -------------------- 语法检验规则配置  <br/>
>>.gitignore -------------------- 不上传文件配置  <br/>
>>config.js -------------------- 基本配置  <br/>
>>entries_config.js -------------------- 入口文件配置  <br/>
>>package.json -------------------- 依赖包配置  <br/>
>>read.md -------------------- readme  <br/>



