var casper = {
    weibo: "http://weibo.com/JaxsonWang",
    qq: "http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=1466469024"
};

var vm = new Vue({
    el: "#casper",
    delimiters: ["${", "}"],
    data: casper
});