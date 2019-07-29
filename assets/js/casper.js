(function ($) {
  var loadFiles = {
    js: [],
    css: []
  };

  /**
   * 打开捐赠弹窗
   */
  $('#btn-modal').click(function () {
    $('#overlay').addClass('is-visible');
    $('#modal').addClass('is-visible animated fadeInDown').removeClass('fadeOutDown');
    $('html').css('overflow-y', 'hidden');
  });
  /**
   * 关闭捐赠弹窗
   */
  $('#close-btn').click(function () {
    $('#overlay').removeClass('is-visible');
    $('#modal').removeClass('is-visible animated fadeInDown').addClass('animated fadeOutDown');
    $('html').css('overflow-y', 'scroll');
  });
  $('#overlay').click(function () {
    $('#overlay').removeClass('is-visible');
    $('#modal').removeClass('is-visible animated fadeInDown').addClass('animated fadeOutDown');
    $('html').css('overflow-y', 'scroll');
  });

  /**
   * 评论跳转
   */
  if (window.location.hash) {
    var checkExist = setInterval(function () {
      if ($(window.location.hash).length) {
        $('html, body').animate(
          {scrollTop: $(window.location.hash).offset().top - 90},
          1000
        );
        clearInterval(checkExist);
      }
    }, 100);
  }

  /**
   * 时间转换
   * @param timestamp
   * @returns {string}
   */
  function timestampFormat(timestamp) {
    timestamp = Date.parse(timestamp) / 1000;

    function zeroize(num) {
      return (String(num).length === 1 ? '0' : '') + num;
    }

    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
    var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear(),
      m = tmDate.getMonth() + 1,
      d = tmDate.getDate();
    var H = tmDate.getHours(),
      i = tmDate.getMinutes(),
      s = tmDate.getSeconds();
    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚';
    } else if (timestampDiff < 3600) {
      // 一小时前之内
      return Math.floor(timestampDiff / 60) + '分钟前';
    } else if (
      curDate.getFullYear() === Y &&
      curDate.getMonth() + 1 === m &&
      curDate.getDate() === d
    ) {
      return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
      var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
      if (
        newDate.getFullYear() === Y &&
        newDate.getMonth() + 1 === m &&
        newDate.getDate() === d
      ) {
        return '昨天' + zeroize(H) + ':' + zeroize(i);
      } else if (curDate.getFullYear() === Y) {
        return (
          zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
        );
      } else {
        return (
          Y +
          '年' +
          zeroize(m) +
          '月' +
          zeroize(d) +
          '日 ' +
          zeroize(H) +
          ':' +
          zeroize(i)
        );
      }
    }
  }

  /**
   * 动态加载JS文件的方法
   * Load javascript file method
   *
   * @param {String}   fileName              JS文件名
   * @param {Function} [callback=function()] 加载成功后执行的回调函数
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadScript(fileName, callback, into) {
    into = into || 'body';
    callback = callback || function () {
    };
    var script = null;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = fileName;
    script.onload = function () {
      loadFiles.js.push(fileName);
      callback();
    };
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(script);
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
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadCSS(fileName, callback, into) {
    into = into || 'head';
    callback = callback || function () {
    };

    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.onload = css.onreadystatechange = function () {
      loadFiles.css.push(fileName);
      callback();
    };
    css.href = fileName;
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(css);
    } else {
      document.body.appendChild(css);
    }
  }

  $(document).ready(function () {
    /**
     * 回到顶部
     */
    var returnTop = $('#return-to-top');
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 50) {
        returnTop.fadeIn(200);
      } else {
        returnTop.fadeOut(200);
      }
    });
    returnTop.click(function () {
      $('body,html').animate(
        {
          scrollTop: 0
        },
        500
      );
    });

    //百度推送
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var bdPush = document.getElementsByTagName('script')[0];
    bdPush.parentNode.insertBefore(bp, bdPush);

    //百度统计
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?37d3bf3116f041cb10bd1d890e65bcfc';
    var bdhmt = document.getElementsByTagName('script')[0];
    bdhmt.parentNode.insertBefore(hm, bdhmt);

    //valine评论支持
    loadScript('//cdn.jsdelivr.net/npm/leancloud-storage/dist/av-min.js', function () {
      loadScript(
        'https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js',
        function () {
          if (document.getElementById('vcomments') !== null) {
            new Valine({
              el: '#vcomments',
              appId: 'rEDT0uBB2LEdndoJ4od2SlKf-gzGzoHsz',
              appKey: 'lmX57j7hrYGCHROA72tBUIXq',
              notify: true,
              verify: true,
              avatar: 'mm',
              visitor: true, // 文章访问量统计
              highlight: true, // 代码高亮
              recordIP: true, // 是否记录评论者IP
              placeholder: '请您理智发言，共建美好社会！'
            });
          }
        }
      );
    });
    //图箱支持
    loadScript('//cdn.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js', function () {
      mediumZoom(document.querySelectorAll('.post-full-content .post-content img'));
    });
    //Prism高亮支持
    // loadCSS('//cdn.jsdelivr.net/npm/prismjs@1.15.0/themes/prism-tomorrow.min.css');
    loadScript('//cdn.jsdelivr.net/npm/prismjs/components/prism-core.min.js', function () {
      loadScript('//cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js', function () {
          //将html代码块支持高亮
          $('.post-content pre code').attr('class', function (i, clazz) {
            if (clazz !== undefined) {
              return clazz.replace(/language-html/g, 'language-markup');
            }
          });
          //设置高亮语言样式文件地址
          if (window.Prism !== 'undefined') {
            Prism.plugins.autoloader.languages_path = '//cdn.jsdelivr.net/npm/prismjs/components/';
            Prism.highlightAll();
          }
        }
      );
    });
    //行号
    loadCSS('//cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.css');
    loadScript('//cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js');
    //支持行号显示
    $('.post-content pre').addClass('line-numbers');
    //显示语言或者粘贴
    loadCSS('//cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.min.css');
    loadScript('//cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.min.js');
    loadScript('//cdn.jsdelivr.net/npm/prismjs/plugins/show-language/prism-show-language.min.js');
    loadScript('//cdn.jsdelivr.net/npm/clipboard/dist/clipboard.min.js');
    loadScript('//cdn.jsdelivr.net/npm/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js');

    // 配置搜索
    var ghostSearch = new GhostSearch({
      // key: '1c8b902ac09889962117d082e6',
      // host: 'http://localhost:2368'
      key: '99efee9603c92e5cd04501f069',
      host: 'https://iiong.com'
    });
    // 搜索事件执行
    $('#ghost-search-field').focus(function () {
      $('#ghost-search-results').fadeIn(500);
      $('.search-cover').fadeIn(500);
      $('html').css('overflow-y', 'hidden')
    }).blur(function () {
      $('#ghost-search-results').fadeOut(500);
      $('.search-cover').fadeOut(500);
      $('html').css('overflow-y', 'scroll')
    });

    // 监听点击链接时间，非本站链接进行新标签打开
    $(document).on("click", 'a', function (event) {
      var link = event.target.href; // 完整链接
      var host = event.target.hostname;
      if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(link)) {
        if (host !== window.location.hostname) {
          event.preventDefault();
          window.open(event.target.href)
        }
      }
    });

    console.log('已经动态加载资源：', loadFiles);
  });
})(jQuery);
