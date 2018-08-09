/**
 * @file demo
 * @author yuxianbo
 */

/* eslint-disable */
let swanParse = require('../../swanParse/swanParse');

Page({
    data: {},
    onLoad() {
        let me = this;

        // html解析示例
        let article = `
            < !DOCTYPE HTML ><!--注释: swanParse试验文本-->
                    <div style="text-align:center;margin-top:10px;">
                <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/507fab9aeab442c9406fccd6fd1d8348_259_194.jpg" alt="swanParse-智能小程序富文本解析组件Logo">
                <h1 style="color:red;">swanParse-智能小程序富文本解析组件</h1>
                <h2 >支持Html及markdown转swan可视化</h2>
            </div>
            <div style="margin-top:10px;">
                <h3 style="color: #000;">支持video</h3>
                <p>支持video</p>
                <div style="margin-top:10px;">
                    <video src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"></video>
                </div>
            </div>
        `;

        swanParse.swanParse('article', 'html', article, me, 5);
    }

});
