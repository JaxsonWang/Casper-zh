# Casper

该主题改自 Ghost 默认主题，集成中国本地化功能以及一些其他功能：

- 代码高亮支持
- 评论功能
- 国内分享
- 一键回到顶部
- 文章搜索功能
- 文章版权说明
- 集成百度统计
- 集成百度推送
- 良好的SEO优化
- 文章图箱功能
- ...

### 配置

本来是想把可变变量导出集成一个脚本里，但对SEO不是很好。博客任何关键词利用文本全局搜索修改即可！

**评论：**

打开`/assets/js/casper.js`修改207行的`appId`和`appKey`字段修改为自己的，具体设置请参考：[Valine文档](https://valine.js.org/configuration.html#appId)

**网站统计：**

打开`/assets/js/casper.js`修改195行的`https://hm.baidu.com/hm.js?37d3bf3116f041cb10bd1d890e65bcfc`，将里面的字符串替换成自己的统计代码即可。

**网站搜索：**

打开`/assets/js/casper.js`修改259行的`key`字段，该字段从ghost程序获取：`ghost-admin/Integrations/Add custom integration`，新建获取得到`Content API Key`字段名赋值即可，参考：[ghost-search](https://github.com/HauntedThemes/ghost-search#step-3---setup-a-custom-integration)

The default theme for [Ghost](http://github.com/tryghost/ghost/). This is the latest development version of Casper. If you're just looking to download the latest release, head over to the [releases](https://github.com/TryGhost/Casper/releases) page.

&nbsp;

![screenshot-desktop](https://user-images.githubusercontent.com/120485/27221326-1e31d326-5280-11e7-866d-82d550a7683b.jpg)

&nbsp;

# First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

We've documented our default theme pretty heavily so that it should be fairly easy to work out what's going on just by reading the code and the comments. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://themes.ghost.org) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

One really neat trick is that you can also create custom one-off templates just by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for the `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive


# Development

Casper styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
$ yarn install
$ yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
$ yarn zip
```

# PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables - Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)


# SVG Icons

Casper uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.


# Copyright & License

Copyright (c) 2013-2019 Ghost Foundation - Released under the [MIT license](LICENSE).
