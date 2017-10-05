!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function e(t){var e=++d;return String(null==t?"rmjs-":t)+e}function i(t){var e=t.clone().css({height:"auto",width:t.width(),maxHeight:"none",overflow:"hidden"}).insertAfter(t),i=e.outerHeight(),a=parseInt(e.css({maxHeight:""}).css("max-height").replace(/[^-\d\.]/g,""),10),n=t.data("defaultHeight");e.remove();var o=a||t.data("collapsedHeight")||n;t.data({expandedHeight:i,maxHeight:a,collapsedHeight:o}).css({maxHeight:"none"})}function a(t){if(!s[t.selector]){var e=" ";t.embedCSS&&""!==t.blockCSS&&(e+=t.selector+" + [data-readmore-toggle], "+t.selector+"[data-readmore]{"+t.blockCSS+"}"),e+=t.selector+"[data-readmore]{transition: height "+t.speed+"ms;overflow: hidden;}",function(t,e){var i=t.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),t.getElementsByTagName("head")[0].appendChild(i)}(document,e),s[t.selector]=!0}}function n(e,i){this.element=e,this.options=t.extend({},r,i),a(this.options),this._defaults=r,this._name=o,this.init(),window.addEventListener?(window.addEventListener("load",h),window.addEventListener("resize",h)):(window.attachEvent("load",h),window.attachEvent("resize",h))}var o="readmore",r={speed:100,collapsedHeight:200,heightMargin:16,moreLink:'<a href="#">Read More</a>',lessLink:'<a href="#">Close</a>',embedCSS:!0,blockCSS:"display: block; width: 100%;",startOpen:!1,beforeToggle:function(){},afterToggle:function(){}},s={},d=0,h=function(t,e,i){var a;return function(){var n=this,o=arguments,r=i&&!a;clearTimeout(a),a=setTimeout(function(){a=null,i||t.apply(n,o)},e),r&&t.apply(n,o)}}(function(){t("[data-readmore]").each(function(){var e=t(this),a="true"===e.attr("aria-expanded");i(e),e.css({height:e.data(a?"expandedHeight":"collapsedHeight")})})},100);n.prototype={init:function(){var a=t(this.element);a.data({defaultHeight:this.options.collapsedHeight,heightMargin:this.options.heightMargin}),i(a);var n=a.data("collapsedHeight"),o=a.data("heightMargin");if(a.outerHeight(!0)<=n+o)return!0;var r=a.attr("id")||e(),s=this.options.startOpen?this.options.lessLink:this.options.moreLink;a.attr({"data-readmore":"","aria-expanded":this.options.startOpen,id:r}),a.after(t(s).on("click",function(t){return function(e){t.toggle(this,a[0],e)}}(this)).attr({"data-readmore-toggle":"","aria-controls":r})),this.options.startOpen||a.css({height:n})},toggle:function(e,i,a){a&&a.preventDefault(),e||(e=t('[aria-controls="'+_this.element.id+'"]')[0]),i||(i=_this.element);var n=t(i),o="",r="",s=!1,d=n.data("collapsedHeight");n.height()<=d?(o=n.data("expandedHeight")+"px",r="lessLink",s=!0):(o=d,r="moreLink"),this.options.beforeToggle(e,n,!s),n.css({height:o}),n.on("transitionend",function(i){return function(){i.options.afterToggle(e,n,s),t(this).attr({"aria-expanded":s}).off("transitionend")}}(this)),t(e).replaceWith(t(this.options[r]).on("click",function(t){return function(e){t.toggle(this,i,e)}}(this)).attr({"data-readmore-toggle":"","aria-controls":n.attr("id")}))},destroy:function(){t(this.element).each(function(){var e=t(this);e.attr({"data-readmore":null,"aria-expanded":null}).css({maxHeight:"",height:""}).next("[data-readmore-toggle]").remove(),e.removeData()})}},t.fn.readmore=function(e){var i=arguments,a=this.selector;return"object"==typeof(e=e||{})?this.each(function(){if(t.data(this,"plugin_"+o)){var i=t.data(this,"plugin_"+o);i.destroy.apply(i)}e.selector=a,t.data(this,"plugin_"+o,new n(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var a=t.data(this,"plugin_"+o);a instanceof n&&"function"==typeof a[e]&&a[e].apply(a,Array.prototype.slice.call(i,1))}):void 0}});