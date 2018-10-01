var casper = {
    // String 微博链接
    weibo: "http://weibo.com/JaxsonWang",
    // String QQ号码
    qq: "1466469024",
    // Boolean 百度推送
    bdPush: false,
    // String 百度统计ID
    bdhmt: '',
    // String 页脚百度统计链接 例如：https://tongji.baidu.com/web/10921506/overview/index?siteId=12616599
    footerBdhmt: 'https://tongji.baidu.com/web/10921506/overview/index?siteId=12616599',
    // String 备案号 例如：苏ICP备15050739号-4
    footerBA1: '苏ICP备15050739号-4',
    // String 备案号 例如：苏公网安备32010402000196号
    footerBA2: '苏公网安备32010402000196号',

    // Boolean 是否开启valine评论支持
    valine: true,
    // String 参考：https://valine.js.org/quickstart.html#%E8%8E%B7%E5%8F%96APP-ID-%E5%92%8C-APP-Key
    valineAppId: "mWCLNEwkFdkWoVvyk2KzTBRv-gzGzoHs",
    // String 参考：https://valine.js.org/quickstart.html#%E8%8E%B7%E5%8F%96APP-ID-%E5%92%8C-APP-Key
    valineAppKey: "l2VQhynNxixHBGfhPiwbKMvv",
    // Boolean 评论回复邮件提醒 参考：https://valine.js.org/notify.html
    valineNotify: false,
    // Boolean 验证码服务
    valineVerify: false,
    // String 评论框占位提示符
    valinePlaceholder: "支持Markdown评论",

};

var defaultCasper = {
    footerBA2URL: ''
};

casper = jQuery.extend(casper,defaultCasper);

var vm = new Vue({
    el: "#casper",
    delimiters: ["${", "}"],
    data: casper,
    methods: {
        getDigital: function (digital) {
            var digitalReg = /\d+/g;
            return digital.match(digitalReg);
        }
    },
    mounted: function () {
        this.qq = "http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=" + this.qq;
        this.footerBA2URL = "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=" + this.getDigital(this.footerBA2);

        //百度推送
        if ( this.bdPush ) {
            var bp = document.createElement('script');
            var curProtocol = window.location.protocol.split(':')[0];
            if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            }
            else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            }
            var bdPush = document.getElementsByTagName("script")[0];
            bdPush.parentNode.insertBefore(bp, bdPush);
        }
        //百度统计
        if ( this.bdhmt !== "" ) {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?37d3bf3116f041cb10bd1d890e65bcfc";
            var bdhmt = document.getElementsByTagName("script")[0];
            bdhmt.parentNode.insertBefore(hm, bdhmt);
        }
        //valine评论支持
        if( this.valine ) {
            loadScript("//cdn.jsdelivr.net/npm/leancloud-storage/dist/av-min.js",function () {
                loadScript("//cdn.jsdelivr.net/npm/valine/dist/Valine.min.js",function () {
                    new Valine({
                        el: "#vcomments" ,
                        appId: casper.valineAppId,
                        appKey: casper.valineAppKey,
                        notify: casper.valineNotify,
                        verify: casper.valineVerify,
                        avatar: "mm",
                        placeholder: casper.valinePlaceholder
                    });
                });
            });
        }
    }
});

/**
 * 代码块生效
 */
//将html代码块支持高亮
jQuery(".post-content pre code").attr("class", function (i, cls) {
    return cls.replace(/language-html/g, "language-markup");
});
//支持行号显示
jQuery(".post-content pre").addClass("line-numbers");
//设置高亮语言样式文件地址
Prism.plugins.autoloader.languages_path = "//cdn.jsdelivr.net/npm/prismjs/components/";


/**
 * 回到顶部
 */
jQuery(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
        $("#return-to-top").fadeIn(200);
    } else {
        $("#return-to-top").fadeOut(200);
    }
});
$("#return-to-top").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 500);
});

/**
 * 图箱配置
 */
mediumZoom(document.querySelectorAll(".post-full-content .post-content img"));

/**
 * 时间转换
 * @param timestamp
 * @returns {string}
 */
function timestampFormat(timestamp) {
    timestamp = Date.parse(timestamp) / 1000;

    function zeroize(num) {
        return (String(num).length === 1 ? "0" : "") + num;
    }

    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
    if (timestampDiff < 60) { // 一分钟以内
        return "刚刚";
    } else if (timestampDiff < 3600) { // 一小时前之内
        return Math.floor(timestampDiff / 60) + "分钟前";
    } else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
        return "今天" + zeroize(H) + ":" + zeroize(i);
    } else {
        var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
            return "昨天" + zeroize(H) + ":" + zeroize(i);
        } else if (curDate.getFullYear() === Y) {
            return zeroize(m) + "月" + zeroize(d) + "日 " + zeroize(H) + ":" + zeroize(i);
        } else {
            return Y + "年" + zeroize(m) + "月" + zeroize(d) + "日 " + zeroize(H) + ":" + zeroize(i);
        }
    }
}

/**
 * 动态加载JS文件的方法
 * Load javascript file method
 *
 * @param {String}   fileName              JS文件名
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */
function loadScript(fileName, callback, into) {
    into = into || "head";
    callback = callback || function () {
    };
    var script = null;
    script = document.createElement("script");
    script.id = fileName.replace(/[\./]+/g, "-");
    script.type = "text/javascript";
    script.src = fileName;
    script.onload = function () {
        loadFiles.js.push(fileName);
        callback();
    };
    if (into === "head") {
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        document.body.appendChild(script);
    }
}

/**
 * 动态加载CSS文件的方法
 * Load css file method
 *
 * @param {String}   fileName              CSS文件名
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */
function loadCSS(fileName, callback, into) {
    into = into || "head";
    callback = callback || function () {
    };

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel = "stylesheet";
    css.onload = css.onreadystatechange = function () {
        loadFiles.css.push(fileName);
        callback();
    };
    css.href = fileName;
    if (into === "head") {
        document.getElementsByTagName("head")[0].appendChild(css);
    } else {
        document.body.appendChild(css);
    }
}

var loadFiles = {
    js: [],
    css: []
};

console.log("已经动态加载资源：",loadFiles);