##astro-asset-parse

Astros 中间件

该中间件实现了URL和资源的映射机制。如：


页面`home`的JS引用路径为：`http://cdn/js/p/home.js`，对应的[Asset](http://www.iastros.com/doc/asset)属性

属性|值
----|----
modType|page
fileType| js
name|home

如果需要自定义资源访问路径（如通过 http://cdn/js/page/home.js访问页面JS），你可以通过实现自己的中间件替换 `astro-asset-parse`来实现。

####资源引用

本插件定义的资源访问规则如下：

页面|JS| http://cdn/**js**/**p**/login.js
web组件|JS| http://cdn/**js**/**webcom**/header.js
js组件|JS| http://cdn/**js**/**jscom**/dialog.js
共用资源|js| http://cdn/**js**/**jquery**.js
页面|CSS| http://cdn/**css**/**p/login**.css
web组件|CSS| http://cdn/**css**/**webcom**/header.css
js组件|CSS| http://cdn/**css**/**jscom**/dialog.css
页面|img| http://cdn/**img**/**p/banner**.png
web组件|img| http://cdn/**img**/**webcom**/logo.png
js组件|img| http://cdn/**img**/**jscom**/close.png
共用资源|img| http://cdn/**img**/**avatar**.png
