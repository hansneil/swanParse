
<h1 align="center" style="margin-bottom: 20px;"> swanParse - 智能小程序富文本解析组件</h1>
<h2 align="center">支持 Html 及 markdown 转 swan 可视化</h2>

## 基本使用方法

* 1. 复制文件夹 `swanParse` 到小程序目录
```
- swanParse/
  -swanParse.js (必须存在)
  -html2json.js (必须存在)
  -htmlparser.js (必须存在)
  -showdown.js (必须存在)
  -swanDecode.js (必须存在)
  -swanParse.swan (必须存在)
  -swanParse.css (必须存在)
```

* 2. 引入必要文件

```
// 在使用的 View 中引入 swanParse 模块
let swanParse = require('../../swanParse/swanParse.js');
```

```
//在使用的 css 中引入 swanParse.css, 可以在 app.css
@import "/swanParse/swanParse.css";
```

* 3. 数据绑定
```
let article = '<div>我是HTML代码</div>';
/**
* swanParse.swanParse(bindName, type, data, target,imagePadding)
* 1.bindName 绑定的数据名(必填)
* 2.type 可以为 html 或者 md (必填)
* 3.data 为传入的具体数据(必填)
* 4.target 为 Page 对象,一般为 this (必填)
* 5.imagePadding 为当图片自适应时左右的单一 padding(默认为0,可选)
*/

var target = this;
swanParse.swanParse('article', 'html', article, target, 5);
```

* 4. 模版引用
```
// 引入模板
<import src="path/swanParse/swanParse.swan"/>
//这里 data 中 article 为 bindName
<template is="swanParse" data="{{ {swanParseData: article.nodes} }}"/>
```
