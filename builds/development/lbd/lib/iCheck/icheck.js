!function(e){function t(e,t,s){var n=e[0],o=/er/.test(s)?b:/bl/.test(s)?h:u,r=s==v?{checked:n[u],disabled:n[h],indeterminate:"true"==e.attr(b)||"false"==e.attr(p)}:n[o];if(/^(ch|di|in)/.test(s)&&!r)i(e,o);else if(/^(un|en|de)/.test(s)&&r)a(e,o);else if(s==v)for(var c in r)r[c]?i(e,c,!0):a(e,c,!0);else t&&"toggle"!=s||(t||e[C]("ifClicked"),r?n[k]!==l&&a(e,o):i(e,o))}function i(t,i,s){var v=t[0],g=t.parent(),C=i==u,w=i==b,A=i==h,H=w?p:C?f:"enabled",j=n(t,H+o(v[k])),D=n(t,i+o(v[k]));if(!0!==v[i]){if(!s&&i==u&&v[k]==l&&v.name){var P=t.closest("form"),T='input[name="'+v.name+'"]';(T=P.length?P.find(T):e(T)).each(function(){this!==v&&e(this).data(c)&&a(e(this),i)})}w?(v[i]=!0,v[u]&&a(t,u,"force")):(s||(v[i]=!0),C&&v[b]&&a(t,b,!1)),r(t,C,i,s)}v[h]&&n(t,x,!0)&&g.find("."+d).css(x,"default"),g[y](D||n(t,i)||""),g.attr("role")&&!w&&g.attr("aria-"+(A?h:u),"true"),g[m](j||n(t,H)||"")}function a(e,t,i){var a=e[0],s=e.parent(),c=t==u,l=t==b,v=t==h,g=l?p:c?f:"enabled",C=n(e,g+o(a[k])),w=n(e,t+o(a[k]));!1!==a[t]&&(!l&&i&&"force"!=i||(a[t]=!1),r(e,c,g,i)),!a[h]&&n(e,x,!0)&&s.find("."+d).css(x,"pointer"),s[m](w||n(e,t)||""),s.attr("role")&&!l&&s.attr("aria-"+(v?h:u),"false"),s[y](C||n(e,g)||"")}function s(t,i){t.data(c)&&(t.parent().html(t.attr("style",t.data(c).s||"")),i&&t[C](i),t.off(".i").unwrap(),e(w+'[for="'+t[0].id+'"]').add(t.closest(w)).off(".i"))}function n(e,t,i){if(e.data(c))return e.data(c).o[t+(i?"":"Class")]}function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}function r(e,t,i,a){a||(t&&e[C]("ifToggled"),e[C]("ifChanged")[C]("if"+o(i)))}var c="iCheck",d=c+"-helper",l="radio",u="checked",f="un"+u,h="disabled",p="determinate",b="in"+p,v="update",k="type",g="touchbegin.i touchend.i",y="addClass",m="removeClass",C="trigger",w="label",x="cursor",A=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);e.fn[c]=function(n,o){var r='input[type="checkbox"], input[type="'+l+'"]',f=e(),p=function(t){t.each(function(){var t=e(this);f=t.is(r)?f.add(t):f.add(t.find(r))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(n))return n=n.toLowerCase(),p(this),f.each(function(){var i=e(this);"destroy"==n?s(i,"ifDestroyed"):t(i,!0,n),e.isFunction(o)&&o()});if("object"!=typeof n&&n)return this;var x=e.extend({checkedClass:u,disabledClass:h,indeterminateClass:b,labelHover:!0},n),H=x.handle,j=x.hoverClass||"hover",D=x.focusClass||"focus",P=x.activeClass||"active",T=!!x.labelHover,F=x.labelHoverClass||"hover",I=0|(""+x.increaseArea).replace("%","");return"checkbox"!=H&&H!=l||(r='input[type="'+H+'"]'),I<-50&&(I=-50),p(this),f.each(function(){var n=e(this);s(n);var o,r=this,f=r.id,p=-I+"%",b=100+2*I+"%",H={position:"absolute",top:p,left:p,display:"block",width:b,height:b,margin:0,padding:0,background:"#fff",border:0,opacity:0},L=A?{position:"absolute",visibility:"hidden"}:I?H:{position:"absolute",opacity:0},M="checkbox"==r[k]?x.checkboxClass||"icheckbox":x.radioClass||"i"+l,N=e(w+'[for="'+f+'"]').add(n.closest(w)),Q=!!x.aria,S=c+"-"+Math.random().toString(36).substr(2,6),U='<div class="'+M+'" '+(Q?'role="'+r[k]+'" ':"");Q&&N.each(function(){U+='aria-labelledby="',this.id?U+=this.id:(this.id=S,U+=S),U+='"'}),U=n.wrap(U+"/>")[C]("ifCreated").parent().append(x.insert),o=e('<ins class="'+d+'"/>').css(H).appendTo(U),n.data(c,{o:x,s:n.attr("style")}).css(L),!!x.inheritClass&&U[y](r.className||""),!!x.inheritID&&f&&U.attr("id",c+"-"+f),"static"==U.css("position")&&U.css("position","relative"),t(n,!0,v),N.length&&N.on("click.i mouseover.i mouseout.i "+g,function(i){var a=i[k],s=e(this);if(!r[h]){if("click"==a){if(e(i.target).is("a"))return;t(n,!1,!0)}else T&&(/ut|nd/.test(a)?(U[m](j),s[m](F)):(U[y](j),s[y](F)));if(!A)return!1;i.stopPropagation()}}),n.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[k],s=e.keyCode;return"click"!=t&&("keydown"==t&&32==s?(r[k]==l&&r[u]||(r[u]?a(n,u):i(n,u)),!1):void("keyup"==t&&r[k]==l?!r[u]&&i(n,u):/us|ur/.test(t)&&U["blur"==t?m:y](D)))}),o.on("click mousedown mouseup mouseover mouseout "+g,function(e){var i=e[k],a=/wn|up/.test(i)?P:j;if(!r[h]){if("click"==i?t(n,!1,!0):(/wn|er|in/.test(i)?U[y](a):U[m](a+" "+P),N.length&&T&&a==j&&N[/ut|nd/.test(i)?m:y](F)),!A)return!1;e.stopPropagation()}})})}}(window.jQuery||window.Zepto);