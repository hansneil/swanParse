/**
 * @file swanParse
 * @author yuxianbo
 *
 * 参考wxParse: https://github.com/icindy/wxParse
 */

/* globals swan */
import showdown from './showdown.js';
import htmlToJson from './html2json.js';

// 配置及公有属性
let realWindowWidth = 0;
let realWindowHeight = 0;
swan.getSystemInfo({
    success(res) {
        realWindowWidth = res.windowWidth;
        realWindowHeight = res.windowHeight;
    }
});

/**
 * swanParse 解析函数
 *
 * @param {string} bindName 待转换页面的变量名
 * @param {string} type 转换类型：html / markdown
 * @param {string} data 待转换的数据
 * @param {Object} target 待转换页面的 Page 对象
 * @param {number} imagePadding 图片 Padding
 */
function swanParse(
	bindName = 'swanParseData',
	type = 'html',
	data = '<div class="color:red;">数据不能为空</div>',
	target,
	imagePadding
) {
    if (type === 'md' || type === 'markdown') {
        let converter = new showdown.Converter();
        data = converter.makeHtml(data);
    }

	// 存放转化后的数据
    let transData = {
        ...htmlToJson.html2json(data, bindName),
        view: {
            imagePadding: imagePadding || 0
        }
    };

    let bindData = {
        [bindName]: transData
    };

    target.setData(bindData);
    target.swanParseImgLoad = swanParseImgLoad;
    target.swanParseImgTap = swanParseImgTap;
}

/**
 * swanParseImgTap 图片点击 Handler
 *
 * @param {Object} evt 事件对象
 */
function swanParseImgTap(evt) {
    let {src, from} = evt.target.dataset;

    swan.previewImage({
        current: src,
        urls: this.data[from] && this.data[from].imageUrls || [src]
    });
}

 /**
  * swanParseImgLoad 图片视觉宽高计算函数
  *
  * @param {Object} evt 事件对象
  */
function swanParseImgLoad(evt) {
    let {from, idx} = evt.target.dataset;

    calMoreImageInfo(evt, idx, this, from);
}

/**
 * calMoreImageInfo 获取计算图片视觉最佳宽高
 *
 * @param {Object} evt 事件对象
 * @param {string} idx 索引值
 * @param {Object} target 作用域对象
 * @param {string} bindName 变量名
 */
function calMoreImageInfo(evt, idx, target, bindName) {
    let images = target.data[bindName] && target.data[bindName].images;

    if (images.length === 0) {
        return;
    }

    // 因为无法获取view宽度 需要自定义padding进行计算，稍后处理
    let recal = swanAutoImageCal(evt.detail.width, evt.detail.height, target, bindName);

    let index = images[idx].index;
    let key = index.split('.').reduce((prev, i) => `${prev}.nodes[${i}]`, bindName);

    target.setData({
        [key + '.width']: recal.imageWidth,
        [key + '.height']: recal.imageheight
    });
}

/**
 * swanAutoImageCal 计算视觉优先的图片宽高
 *
 * @param {number} originalWidth 原始宽度
 * @param {number} originalHeight 原始高度
 * @param {Object} target 作用域对象
 * @param {string} bindName 变量名
 * @return {Object} results 计算结果
 */
function swanAutoImageCal(originalWidth, originalHeight, target, bindName) {
    // 获取图片的原始长宽
    let windowWidth = 0;
    let windowHeight = 0;

    let autoWidth = 0;
    let autoHeight = 0;

    let results = {};
    let padding = target.data[bindName].view.imagePadding;

    windowWidth = realWindowWidth - 2 * padding;
    windowHeight = realWindowHeight;

    // 判断按照那种方式进行缩放
    if (originalWidth > windowWidth) {
        // 在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        autoHeight = autoWidth * originalHeight / originalWidth;
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
    }
    else {
        // 否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
    }
    return results;
}

/**
 * swanParseTemArray 渲染数组
 *
 * @param {string} temArrayName 数组名
 * @param {string} bindNameReg 参数名
 * @param {number} total 数组长度
 * @param {Object} target 作用域对象
 */
function swanParseTemArray(temArrayName, bindNameReg, total, target) {
    let array = [];
    let temData = target.data;
    let obj = null;

    for (let i = 0; i < total; i++) {
        let simArr = temData[bindNameReg + i].nodes;
        array.push(simArr);
    }

    temArrayName = temArrayName || 'swanParseTemArray';
    obj = JSON.parse('{"' + temArrayName + '":""}');
    obj[temArrayName] = array;
    target.setData(obj);
}

module.exports = {
    swanParse,
    swanParseTemArray
};
