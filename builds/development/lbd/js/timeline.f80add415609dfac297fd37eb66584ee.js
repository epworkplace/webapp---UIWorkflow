__twttrll([5],{179:function(e,t,i){var r=i(84);e.exports=r.build([i(180),i(184),i(138),i(141),i(143),i(125),i(185),i(186),i(127),i(128),i(121),i(124),i(189),i(190),i(191),i(194),i(196),i(199),i(137),i(200),i(202),i(129),i(130),i(144),i(204)],{pageForAudienceImpression:"timeline",productName:"embeddedtimeline",breakpoints:[330,430,550,660,820,970]})},180:function(e,t,i){function r(e){e.params({dataSource:{required:!0},lang:{required:!0,transform:p.matchLanguage,fallback:"en"},useLegacyDefaults:{required:!0,fallback:!1},width:{validate:m,transform:m},height:{validate:m,transform:m},theme:{fallback:[h(o.val,o,"widgets:theme")],validate:b},tweetLimit:{transform:d.asInt},partner:{fallback:h(o.val,o,"partner")},staticContent:{required:!1,transform:d.asBoolean}}),e.selectors({header:".timeline-Header",footer:".timeline-Footer",viewport:".timeline-Viewport",tweetList:".timeline-TweetList",tweetsInStream:".timeline-Tweet"}),e.around("scribeNamespace",function(e){return c.aug(e(),{page:"timeline"})}),e.around("scribeData",function(e){return c.aug(e(),{widget_id:this.params.dataSource.id,message:this.params.partner,query:this.el&&this.el.getAttribute("data-search-query"),profile_id:this.el&&this.el.getAttribute("data-profile-id")})}),e.around("widgetDataAttributes",function(e){return c.aug({"widget-id":this.params.dataSource.id,"user-id":this.el&&this.el.getAttribute("data-profile-id"),"search-query":this.el&&this.el.getAttribute("data-search-query")},e())}),e.define("updateViewportHeight",function(){var e,t=this.sandbox,i=this.selectOne("header"),r=this.selectOne("footer"),n=this.selectOne("viewport");return a.read(function(){e=t.height-2*S,e-=i?i.offsetHeight:0,e-=r?r.offsetHeight:0}),a.write(function(){n.style.height=e+"px"})}),e.define("adjustWidgetSize",function(){return this.isFullyExpanded?this.sandbox.matchHeightToContent():this.updateViewportHeight()}),e.define("reconfigureWithServerSideParams",function(e){e=e||{},this.params.linkColor=this.params.linkColor||e.linkColor,this.params.theme=this.params.theme||e.theme||"light",this.params.height=m(this.params.height||e.height),this.isFullyExpanded=this.isStaticTimeline||!this.params.useLegacyDefaults&&!this.params.height,this.isFullyExpanded||this.params.height||(this.params.height=I)}),e.define("scribeImpressionsForInitialTweetSet",function(e){var t=f(this.select("tweetsInStream")),i=Object.keys(t),r=i.length?"results":"no_results",n=this.el.getAttribute("data-collection-id");n&&(i.push(n),t[n]={item_type:g.CUSTOM_TIMELINE}),this.scribe({component:"timeline",element:"initial",action:r},{widget_in_viewport:e,item_ids:i,item_details:t})}),e.override("initialize",function(){this.params.width||(this.params.width=this.params.useLegacyDefaults?x:y),this.isStaticTimeline=this.params.staticContent||this.params.tweetLimit>0}),e.override("hydrate",function(){var e=this;return this.params.dataSource.fetch().then(function(t){e.html=t.html,e.reconfigureWithServerSideParams(t.config),v(e,t,w.INITIAL)})}),e.override("render",function(){var e,t=this;return this.el=this.sandbox.htmlToElement(this.html),this.el?(this.el.lang=this.params.lang,this.isFullyExpanded&&this.sandbox.addRootClass("var-fully-expanded"),this.isStaticTimeline&&this.sandbox.addRootClass("var-static"),e=s.timeline(this.params.lang,this.params.theme),n.all([this.sandbox.appendStyleSheet(e),this.sandbox.styleSelf({display:"inline-block",maxWidth:y,width:this.params.width,minWidth:C,marginTop:0,marginBottom:0})]).then(function(){return t.prepForInsertion(t.el),t.sandbox.injectWidgetEl(t.el)})):n.reject(new Error("unable to render"))}),e.override("show",function(){var e=this.sandbox,t=this;return this.sandbox.makeVisible().then(function(){return e.styleSelf({minHeight:t.isStaticTimeline?void 0:T,height:t.params.height})}).then(function(){return t.adjustWidgetSize()}).then(function(){return a.read(function(){var i=l(e.sandboxEl);t.scribeImpressionsForInitialTweetSet(i)})})}),e.last("resize",function(){return this.adjustWidgetSize()})}var n=i(2),s=i(110),a=i(45),o=i(37),l=i(120),d=i(25),c=i(11),u=i(84),h=i(13),f=i(117),m=i(119),p=i(92),b=i(181),v=i(182),g=i(118),w=i(183),C="180px",y="100%",T="200px",x="520px",I="600px",S=1;e.exports=u.couple(i(95),i(96),r)},181:function(e,t){function i(e){return r.test(e)}var r=/^(dark|light)$/;e.exports=i},182:function(e,t,i){function r(e,t,i){switch(e.cursors=e.cursors||{},e.pollInterval=t.pollInterval,i){case n.INITIAL:e.cursors.min=t.minCursorPosition,e.cursors.max=t.maxCursorPosition;break;case n.NEWER:e.cursors.max=t.maxCursorPosition||e.cursors.max;break;case n.OLDER:e.cursors.min=t.minCursorPosition||e.cursors.min}}var n=i(183);e.exports=r},183:function(e,t){e.exports={INITIAL:1,NEWER:2,OLDER:3}},184:function(e,t,i){function r(e){e.params({chrome:{transform:s,fallback:""}}),e.selectors({streamContainer:".timeline-Viewport",tweetStream:".timeline-TweetList"}),e.before("render",function(){this.params.chrome.transparent&&this.sandbox.addRootClass("var-chromeless"),this.params.chrome.hideBorder&&this.sandbox.addRootClass("var-borderless"),this.params.chrome.hideHeader&&this.sandbox.addRootClass("var-headerless"),this.params.chrome.hideFooter&&this.sandbox.addRootClass("var-footerless")}),e.after("render",function(){return this.params.chrome.hideScrollBar?this.hideScrollBar():void 0}),e.after("resize",function(){return this.params.chrome.hideScrollBar?this.hideScrollBar():void 0}),e.define("hideScrollBar",function(){var e=this.selectOne("streamContainer"),t=this.selectOne("tweetStream");return n.defer(function(){var i,r;e.style.width="",i=e.offsetWidth-t.offsetWidth,r=e.offsetWidth+i,e.style.width=r+"px"})})}var n=i(45),s=i(147);e.exports=r},185:function(e,t){function i(e){e.params({ariaLive:{fallback:""}}),e.selectors({newTweetsNotifier:".new-tweets-bar"}),e.after("render",function(){var e=this.selectOne("newTweetsNotifier");"assertive"===this.params.ariaLive&&e&&e.setAttribute("aria-live","assertive")})}e.exports=i},186:function(e,t,i){function r(e){e.selectors({fullTimestampToLocalize:".long-permalink time",relativeTimestampToLocalize:".permalink time"}),e.after("prepForInsertion",function(e){var t=o(this.el);t&&(this.select(e,"fullTimestampToLocalize").forEach(function(e){var i=e.getAttribute("datetime"),r=i&&t.localTimeStamp(i);r&&(e.innerHTML=r)}),this.select(e,"relativeTimestampToLocalize").forEach(function(e){var i=e.getAttribute("datetime"),r=i&&t.timeAgo(i);r&&(e.innerHTML=r)}))}),e.define("updateRelativeTimestamps",function(){var e=o(this.el);if(e){var t=this.select("relativeTimestampToLocalize").reduce(function(t,i){var r=i.getAttribute("datetime"),n=r&&e.timeAgo(r);return n&&t.push(function(){i.innerHTML=n}),t},[]);return n.all(t.map(s.write))}}),e.after("render",function(){var e=this;a.setInterval(function(){e.updateRelativeTimestamps()},l)})}var n=i(2),s=i(45),a=i(7),o=i(187),l=6e4;e.exports=r},187:function(e,t,i){function r(e){return new s(n.compact({months:(e.getAttribute("data-dt-months")||"").split("|"),phrases:{AM:e.getAttribute("data-dt-am"),PM:e.getAttribute("data-dt-pm"),now:e.getAttribute("data-dt-now"),s:e.getAttribute("data-dt-s"),m:e.getAttribute("data-dt-m"),h:e.getAttribute("data-dt-h"),second:e.getAttribute("data-dt-second"),seconds:e.getAttribute("data-dt-seconds"),minute:e.getAttribute("data-dt-minute"),minutes:e.getAttribute("data-dt-minutes"),hour:e.getAttribute("data-dt-hour"),hours:e.getAttribute("data-dt-hours")},formats:{full:e.getAttribute("data-dt-full"),abbr:e.getAttribute("data-dt-abbr"),shortdate:e.getAttribute("data-dt-short"),longdate:e.getAttribute("data-dt-long")}}))}var n=i(11),s=i(188);e.exports=r},188:function(e,t){function i(e){return 10>e?"0"+e:e}function r(e){function t(e,t){return n&&n[e]&&(e=n[e]),e.replace(/%\{([\w_]+)\}/g,function(e,i){return void 0!==t[i]?t[i]:e})}var n=e&&e.phrases,s=e&&e.months||o,a=e&&e.formats||l;this.timeAgo=function(e){var i,n=r.parseDate(e),o=+new Date,l=o-n;return n?isNaN(l)||2*d>l?t("now"):c>l?(i=Math.floor(l/d),t(a.abbr,{number:i,symbol:t(f,{abbr:t("s"),expanded:t(i>1?"seconds":"second")})})):u>l?(i=Math.floor(l/c),t(a.abbr,{number:i,symbol:t(f,{abbr:t("m"),expanded:t(i>1?"minutes":"minute")})})):h>l?(i=Math.floor(l/u),t(a.abbr,{number:i,symbol:t(f,{abbr:t("h"),expanded:t(i>1?"hours":"hour")})})):365*h>l?t(a.shortdate,{day:n.getDate(),month:t(s[n.getMonth()])}):t(a.longdate,{day:n.getDate(),month:t(s[n.getMonth()]),year:n.getFullYear().toString().slice(2)}):""},this.localTimeStamp=function(e){var n=r.parseDate(e),o=n&&n.getHours();return n?t(a.full,{day:n.getDate(),month:t(s[n.getMonth()]),year:n.getFullYear(),hours24:i(o),hours12:13>o?o?o:"12":o-12,minutes:i(n.getMinutes()),seconds:i(n.getSeconds()),amPm:t(12>o?"AM":"PM")}):""}}var n=/(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,s=/[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,a=/^\d+$/,o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],l={abbr:"%{number}%{symbol}",shortdate:"%{day} %{month}",longdate:"%{day} %{month} %{year}",full:"%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"},d=1e3,c=60*d,u=60*c,h=24*u,f='<abbr title="%{expanded}">%{abbr}</abbr>';r.parseDate=function(e){var t,i,r=e||"",l=r.toString();return(t=function(){var e;return a.test(l)?parseInt(l,10):(e=l.match(s))?Date.UTC(e[7],o.indexOf(e[1]),e[2],e[3],e[4],e[5]):(e=l.match(n))?Date.UTC(e[1],e[2]-1,e[3],e[4],e[5],e[6]):void 0}())?(i=new Date(t),!isNaN(i.getTime())&&i):!1},e.exports=r},189:function(e,t,i){function r(e){e.selectors({followButton:".follow-button"}),e.define("handleFollowButtonClick",function(e,t){var i=s.intentForFollowURL(t.href),r=a.asBoolean(t.getAttribute("data-age-gate"));r||n.open(i,this.sandbox.sandboxEl,e)}),e.after("render",function(){this.on("click","followButton",function(e,t){this.handleFollowButtonClick(e,t)})})}var n=i(22),s=i(23),a=i(25);e.exports=r},190:function(e,t,i){function r(e){e.selectors({mediaCard:".MediaCard",mediaCardNsfwDismissalTarget:".MediaCard-dismissNsfw"}),e.define("dismissNsfwWarning",function(e,t){var i=n.closest(this.selectors.mediaCard,t,this.el);i&&s.remove(i,"is-nsfw")}),e.after("render",function(){this.on("click","mediaCardNsfwDismissalTarget",this.dismissNsfwWarning)})}var n=i(21),s=i(20);e.exports=r},191:function(e,t,i){function r(e){function t(e){var t=e.createElement("div");return t.className="MediaCard-mediaAsset",t}function i(e){return u.url(e,m)}e.params({lang:{required:!0,transform:d.matchLanguage,fallback:"en"}}),e.selectors({mediaAsset:".MediaCard-mediaAsset",cardInterstitial:".js-cardPlayerInterstitial",wvpInterstitial:".js-playableMediaInterstitial",tweetIdInfo:".js-tweetIdInfo"}),e.define("replaceInterstitialWithMedia",function(e,t){return f.all([this.restoreLastMediaInterstitial(),c.write(function(){n=e,s=e.parentNode,e.parentNode.replaceChild(t,e)})])}),e.define("restoreLastMediaInterstitial",function(){var e;return n&&s?(e=s.firstElementChild,h.remove(e),c.write(function(){s.replaceChild(n,e)})):f.resolve()}),e.define("displayWebVideoPlayerMediaAsset",function(e,i){var r=l.closest(this.selectors.mediaAsset,i,this.el),n=l.closest(this.selectors.tweetIdInfo,i,this.el),s=n.getAttribute("data-tweet-id"),a=(this.scribeNamespace()||{}).page,o=this.params.lang,d=t(this.sandbox),c=this.sandbox.createElement("div");return s?(e.preventDefault(),c.className="wvp-player-container",d.appendChild(c),this.replaceInterstitialWithMedia(r,d).then(function(){var e=h.insert(d,s,a,o);e&&e.on("ready",e.play)})):f.reject(new Error("No Tweet ID for player"))}),e.define("displayIframeMediaAsset",function(e,r){var n,s,d=l.closest(this.selectors.mediaAsset,r,this.el),u=l.closest(this.selectors.cardInterstitial,r,this.el),h=u.getAttribute("data-player-src"),m=u.getAttribute("data-player-width"),b=u.getAttribute("data-player-height"),v=u.getAttribute("data-player-title");return h?(e.preventDefault(),h=i(h),n=t(this.sandbox),s=o({src:h,allowfullscreen:"true",width:m,height:b,title:v||""}),s.className="FilledIframe",n.appendChild(s),this.replaceInterstitialWithMedia(d,n).then(function(){s.focus(),c.write(function(){a.add(n,p),a.add(s,p)})})):f.reject(new Error("No Player frame source"))}),e.after("render",function(){this.on("click","cardInterstitial",this.displayIframeMediaAsset),this.on("click","wvpInterstitial",this.displayWebVideoPlayerMediaAsset)})}var n,s,a=i(20),o=i(52),l=i(21),d=i(92),c=i(45),u=i(24),h=i(192),f=i(2),m={autoplay:"1"},p="js-forceRedraw";e.exports=r},192:function(e,t,i){function r(e,t,i,r,n){var l;return l=a(e,".wvp-player-container"),l.length>0?(o&&s.setBaseUrl(o),s.createPlayerForTweet(l[0],t,{scribeContext:{client:"tfw",page:i},languageCode:r,addTwitterBranding:n||!1})):void 0}function n(e){var t=e.querySelector(".wvp-player-container"),i=t&&s.findPlayerForElement(t);return i?i.teardown():void 0}var s=i(193),a=i(78),o=null;e.exports={insert:r,remove:n}},193:function(e,t,i){var r;!function(n,s){r=function(){return n.TwitterVideoPlayer=s()}.call(t,i,t,e),!(void 0!==r&&(e.exports=r))}(this,function(){function e(e){if(e&&e.data&&e.data.params&&e.data.params[0]){var t=e.data.params[0],i=e.data.id;if(t&&t.context&&"TwitterVideoPlayer"===t.context){var r=t.playerId;delete t.playerId,delete t.context;var n=o[r];n&&n.processMessage(e.data.method,t,i)}}}function t(e,t,i){var r=Object.keys(i).filter(function(e){return null!=i[e]}).map(function(e){var t=i[e];return encodeURIComponent(e)+"="+encodeURIComponent(t)}).join("&");return r&&(r="?"+r),e+t+r}function i(i,n,s,l,d){var c=i.ownerDocument,u=c.defaultView;u.addEventListener("message",e),this.playerId=a++;var h={embed_source:"clientlib",player_id:this.playerId,rpc_init:1};if(this.scribeParams={},this.scribeParams.suppressScribing=l&&l.suppressScribing,!this.scribeParams.suppressScribing){if(!l.scribeContext)throw"video_player: Missing scribe context";if(!l.scribeContext.client)throw"video_player: Scribe context missing client property";this.scribeParams.client=l.scribeContext.client,this.scribeParams.page=l.scribeContext.page,this.scribeParams.section=l.scribeContext.section,this.scribeParams.component=l.scribeContext.component}this.scribeParams.debugScribe=l&&l.scribeContext&&l.scribeContext.debugScribing,this.scribeParams.scribeUrl=l&&l.scribeContext&&l.scribeContext.scribeUrl,this.promotedLogParams=l.promotedContext,this.adRequestCallback=l.adRequestCallback,l.languageCode&&(h.language_code=l.languageCode);var f=t(r,n,h);return this.videoIframe=document.createElement("iframe"),this.videoIframe.setAttribute("src",f),this.videoIframe.setAttribute("allowfullscreen",""),this.videoIframe.setAttribute("id",s),this.videoIframe.setAttribute("style","width: 100%; height: 100%; position: absolute; top: 0; left: 0;"),this.domElement=i,this.domElement.appendChild(this.videoIframe),o[this.playerId]=this,this.eventCallbacks={},this.emitEvent=function(e,t){var i=this.eventCallbacks[e];"undefined"!=typeof i&&i.forEach(function(e){e.apply(this.playerInterface,[t])}.bind(this))},this.jsonRpc=function(e){var t=this.videoIframe.contentWindow;e.jsonrpc="2.0",t&&t.postMessage&&t.postMessage(JSON.stringify(e),"*")},this.jsonRpcCall=function(e,t){this.jsonRpc({method:e,params:t})},this.jsonRpcResult=function(e,t){this.jsonRpc({result:e,id:t})},this.processMessage=function(e,t,i){switch(e){case"requestPlayerConfig":this.jsonRpcResult({scribeParams:this.scribeParams,promotedLogParams:this.promotedLogParams,squareCorners:l.squareCorners,hideControls:l.hideControls,embedded:l.addTwitterBranding},i);break;case"videoPlayerPlaybackComplete":this.emitEvent("playbackComplete",t);break;case"videoPlayerReady":this.emitEvent("ready",t);break;case"videoView":this.emitEvent("view",t);break;case"debugLoggingEvent":this.emitEvent("logged",t);break;case"requestDynamicAd":"function"==typeof this.adRequestCallback?this.jsonRpcResult(this.adRequestCallback(),i):this.jsonRpcResult({},i)}},this.playerInterface={on:function(e,t){return"undefined"==typeof this.eventCallbacks[e]&&(this.eventCallbacks[e]=[]),this.eventCallbacks[e].push(t),this.playerInterface}.bind(this),off:function(e,t){if("undefined"==typeof t)delete this.eventCallbacks[e];else{var i=this.eventCallbacks[e];if("undefined"!=typeof i){var r=i.indexOf(t);r>-1&&i.splice(r,1)}}return this.playerInterface}.bind(this),play:function(){return this.jsonRpcCall("play"),this.playerInterface}.bind(this),pause:function(){return this.jsonRpcCall("pause"),this.playerInterface}.bind(this),mute:function(){return this.jsonRpcCall("mute"),this.playerInterface}.bind(this),unmute:function(){return this.jsonRpcCall("unmute"),this.playerInterface}.bind(this),playPreview:function(){return this.jsonRpcCall("autoPlayPreview"),this.playerInterface}.bind(this),pausePreview:function(){return this.jsonRpcCall("autoPlayPreviewStop"),this.playerInterface}.bind(this),updatePosition:function(e){return this.jsonRpcCall("updatePosition",[e]),this.playerInterface}.bind(this),teardown:function(){this.eventCallbacks={},i.removeChild(this.videoIframe),this.videoIframe=void 0,delete o[this.playerId]}.bind(this)},this.playerInterface}var r="https://twitter.com",n=/^https?:\/\/([a-zA-Z0-9]+\.)*twitter.com(:\d+)?$/,s={suppressScribing:!1,squareCorners:!1,hideControls:!1,addTwitterBranding:!1},a=0,o={};return{setBaseUrl:function(e){n.test(e)?r=e:void 0},createPlayerForTweet:function(e,t,r){var n="/i/videos/tweet/"+t,a="player_tweet_"+t;return new i(e,n,a,r||s)},createPlayerForDm:function(e,t,r){var n="/i/videos/dm/"+t,a="player_dm_"+t;return new i(e,n,a,r||s)},findPlayerForElement:function(e){for(var t in o)if(o.hasOwnProperty(t)){var i=o[t];if(i&&i.domElement===e)return i.playerInterface}return null}}})},194:function(e,t,i){function r(e){e.override("resizeSandboxDueToCardChange",function(){return this.isFullyExpanded?this.sandbox.matchHeightToContent():n.resolve()})}var n=i(2),s=i(84);e.exports=s.couple(i(195),r)},195:function(e,t,i){function r(e){for(var t="",i=Math.floor(e/h),r=i;r>0;r--)t+="w"+r*h+" ";return t}function n(e){e.selectors({prerenderedCard:".PrerenderedCard",rootCardEl:".TwitterCard .CardContent > *:first-child"}),e.define("scribeCardShown",function(e){var t=2;this.scribe({component:"card",action:"shown"},{items:[{card_name:e.getAttribute("data-card-name")}]},t)}),e.define("resizeSandboxDueToCardChange",function(){return this.sandbox.matchHeightToContent()}),e.define("markCardElAsLoaded",function(e){function t(){r&&i.resizeSandboxDueToCardChange()}var i=this,r=!1;return this.select(e,"img").forEach(function(e){e.addEventListener("load",t,!1)}),this.scribeCardShown(e),a.write(function(){s.add(e,p)}).then(function(){r=!0,i.resizeSandboxDueToCardChange()})}),e.define("updateCardWidthConstraints",function(){var e=this;return d.all(this.select("prerenderedCard").map(function(t){var i=e.selectOne(t,"rootCardEl");return a.defer(function(){var e,n=0;l.ios()?(s.remove(t,b),n=o(t.parentElement).width,t.style.maxWidth=n+"px"):n=o(t.parentElement).width,e=r(n),i.setAttribute(f,e),s.add(t,b)}).then(function(){return e.resizeSandboxDueToCardChange()})}))}),e.define("setCardTheme",function(e){var t=this.selectOne(e,"rootCardEl");this.params.theme&&t.setAttribute(m,this.params.theme)}),e.after("prepForInsertion",function(e){var t=this,i=this.select(e,"prerenderedCard").reduce(function(e,t){var i=t.getAttribute("data-css");return i&&(e[i]=e[i]||[],e[i].push(t)),e},{});c.forIn(i,function(e,i){t.sandbox.prependStyleSheet(e).then(function(){i.forEach(function(e){t.setCardTheme(e),t.markCardElAsLoaded(e)})})})}),e.after("show",function(){return this.updateCardWidthConstraints()}),e.after("resize",function(){return this.updateCardWidthConstraints()})}var s=i(20),a=i(45),o=i(69),l=i(8),d=i(2),c=i(11),u=i(84),h=50,f="data-card-breakpoints",m="data-theme",p="is-loaded",b="is-constrainedByMaxWidth";e.exports=u.couple(i(95),n)},196:function(e,t,i){function r(e,t,i){var r={};return e=e||{},i&&e.max?r.minPosition=e.max:!i&&e.min?r.maxPosition=e.min:i?r.sinceId=t:r.maxId=t,r}function n(e){e.params({dataSource:{required:!0},isPreviewTimeline:{required:!1,fallback:!1}}),e.selectors({timelineTweet:".timeline-Tweet",viewport:".timeline-Viewport",tweetList:".timeline-TweetList",tweetsInStream:".timeline-Tweet",newTweetsNotifier:".new-tweets-bar",loadMore:".timeline-LoadMore",loadMoreButton:".timeline-LoadMore-prompt"}),e.define("gcTweetsSync",function(){var e="custom"===this.el.getAttribute("data-timeline-type"),t=this.selectOne("tweetList");return e?a.resolve():void m(t,w)}),e.define("scribeImpressionsForDynamicTweetSet",function(e,t){var i=u.toRealArray(e.querySelectorAll(this.selectors.timelineTweet)),r=f(i),n=Object.keys(r),s=t?"newer":"older",a=t?v.CLIENT_SIDE_APP:v.CLIENT_SIDE_USER;this.scribe({component:"timeline",element:s,action:"results"},{item_ids:n,item_details:r,event_initiator:a})}),e.define("fetchTweets",function(e,t){function i(e){return"404"===e?s.pollInterval=null:"503"===e&&(s.pollInterval*=1.5),a.reject(e)}function n(i){var r,n,a=s.sandbox.createFragment(),o=s.sandbox.createElement("ol"),l=t?g.NEWER:g.OLDER;return p(s,i,l),o.innerHTML=i.html,r=o.firstElementChild,r&&(n=s.selectOne(r,"timelineTweet")),n&&"LI"===r.tagName?(n.getAttribute("data-tweet-id")===e&&o.removeChild(r),s.scribeImpressionsForDynamicTweetSet(o,t),s.prepForInsertion(o),u.toRealArray(o.children).forEach(function(e){a.appendChild(e)}),a):a}var s=this,o=r(this.cursors,e,t);return this.params.dataSource.poll(o).then(n,i)}),e.define("loadOldTweets",function(){var e=this,t=this.selectLast("tweetsInStream"),i=t&&t.getAttribute("data-tweet-id");return i?this.fetchTweets(i,!1).then(function(t){var i=e.selectOne("tweetList"),r=e.selectOne("loadMore");return l.write(function(){t.childNodes.length>0?i.appendChild(t):o.add(r,T)})}):a.reject(new Error("unable to load more"))}),e.after("loadOldTweets",function(){return b.trigger("timelineUpdated",{target:this.sandbox.sandboxEl,region:"older"}),this.resize()}),e.define("loadNewTweets",function(){var e=this,t=this.selectOne("tweetsInStream"),i=t&&t.getAttribute("data-tweet-id");return i?this.fetchTweets(i,!0).then(function(t){var i,r,n=e.selectOne("viewport"),s=e.selectOne("tweetList");return 0!==t.childNodes.length?(l.read(function(){i=n.scrollTop,r=n.scrollHeight}),l.defer(function(){var a;s.insertBefore(t,s.firstElementChild),a=i+n.scrollHeight-r,i>40||e.mouseIsOverWidget?(n.scrollTop=a,e.showNewTweetsNotifier()):(n.scrollTop=0,e.gcTweetsSync())})):void 0}):a.reject(new Error("unable to load new tweets"))}),e.after("loadNewTweets",function(){return b.trigger("timelineUpdated",{target:this.sandbox.sandboxEl,region:"newer"}),this.resize()}),e.define("showNewTweetsNotifier",function(){var e=this,t=this.selectOne("newTweetsNotifier"),i=t&&t.firstElementChild;return d.setTimeout(function(){e.hideNewTweetsNotifier()},C),l.write(function(){t.removeChild(i),t.appendChild(i),o.add(t,"is-displayed")}),l.defer(function(){o.add(t,"is-opaque")})}),e.define("hideNewTweetsNotifier",function(e){var t=new s,i=this.selectOne("newTweetsNotifier");return e=e||{},!e.force&&this.mouseIsOverNewTweetsNotifier?(t.resolve(),t.promise):(l.write(function(){o.remove(i,"is-opaque")}),d.setTimeout(function(){l.write(function(){o.remove(i,"is-displayed")}).then(t.resolve,t.reject)},y),t.promise)}),e.define("scrollToTopOfViewport",function(){var e=this.selectOne("viewport");return l.write(function(){e.scrollTop=0,e.focus()})}),e.define("schedulePolling",function(){function e(){i.isPollInProgress=!1}function t(){var n=r||i.pollInterval;n&&d.setTimeout(function(){i.isPollInProgress||(i.isPollInProgress=!0,i.loadNewTweets(i.sandbox).then(e,e)),t()},n)}var i=this,r=c.get("timeline.pollInterval");t()}),e.after("initialize",function(){this.isPollInProgress=!1,this.mouseIsOverWidget=!1,this.mouseIsOverNewTweetsNotifier=!1,this.cursors={},this.pollInterval=1e4}),e.after("render",function(){this.isStaticTimeline||this.params.isPreviewTimeline||(this.select("timelineTweet").length>0&&this.schedulePolling(),this.on("mouseover",function(){this.mouseIsOverWidget=!0}),this.on("mouseout",function(){this.mouseIsOverWidget=!1}),this.on("mouseover","newTweetsNotifier",function(){this.mouseIsOverNewTweetsNotifier=!0}),this.on("mouseout","newTweetsNotifier",function(){this.mouseIsOverNewTweetsNotifier=!1}),this.on("click","newTweetsNotifier",function(){this.scrollToTopOfViewport(),this.hideNewTweetsNotifier({force:!0})}),this.on("click","loadMoreButton",function(){this.loadOldTweets()}))})}var s=i(1),a=i(2),o=i(20),l=i(45),d=i(7),c=i(14),u=i(11),h=i(84),f=i(117),m=i(197),p=i(182),b=i(29),v=i(198),g=i(183),w=50,C=5e3,y=500,T="is-atEndOfTimeline";e.exports=h.couple(i(95),n)},197:function(e,t){function i(e,t){var i;if(e)for(;i=e.children[t];)e.removeChild(i)}e.exports=i},198:function(e,t){e.exports={CLIENT_SIDE_USER:0,CLIENT_SIDE_APP:2}},199:function(e,t,i){function r(e){e.selectors({shareMenuOpener:".js-showShareMenu",shareMenu:".timeline-ShareMenu",shareMenuTimelineHeader:".timeline-Header",shareMenuTimelineFooter:".timeline-Footer"}),e.define("getHeaderHeight",function(){var e=this.selectOne("shareMenuTimelineHeader");return e?e.getBoundingClientRect().height:0}),e.define("getFooterHeight",function(){var e=this.selectOne("shareMenuTimelineFooter");return e?e.getBoundingClientRect().height:0}),e.define("getShareMenuPositionClass",function(e){var t=e.getBoundingClientRect(),i=t.top-this.getHeaderHeight(),r=this.sandbox.height-t.bottom-this.getFooterHeight();return i>r?l:d}),e.after("render",function(){this.on("click","shareMenuOpener",function(e,t){function i(){n.remove(d,r),l.el.removeEventListener("click",i,!1),a.removeEventListener("click",i,!1)}var r,l=this,d=s.closest(this.selectors.shareMenu,e.target,this.el);e.preventDefault(),d&&(r=this.getShareMenuPositionClass(t),n.add(d,r),o.async(function(){l.el.addEventListener("click",i,!1),a.addEventListener("click",i,!1)}))})})}var n=i(20),s=i(21),a=i(9),o=i(11),l="is-openedAbove",d="is-openedBelow";e.exports=r},200:function(e,t,i){function r(e){return l+"{border-color:"+e+";}"}function n(e){e.params({borderColor:{fallback:[o(s.val,s,"widgets:border-color")],validate:a}}),e.after("render",function(){var e=this.params.borderColor;e&&this.sandbox.appendCss(r(e))})}var s=i(37),a=i(201),o=i(13),l=".customisable-border";e.exports=n},201:function(e,t){function i(e){return r.test(e)}var r=/^#(?:[a-f\d]{3}){1,2}$/i;e.exports=i},202:function(e,t,i){function r(e){return e.join(",")}function n(e){var t=r(c),i=r(u);return[t+"{color:"+e+";}",i+"{color:"+o.lighten(e,.2)+";}"].join("")}function s(e){e.params({linkColor:{fallback:d(a.val,a,"widgets:link-color"),validate:l}}),e.after("render",function(){var e=this.params.linkColor;e&&this.sandbox.appendCss(n(e))})}var a=i(37),o=i(203),l=i(201),d=i(13),c=[".customisable",".customisable:link",".customisable:visited"],u=[".customisable:hover",".customisable:focus",".customisable:active",".customisable-highlight:hover",".customisable-highlight:focus","a:hover .customisable-highlight","a:focus .customisable-highlight"];e.exports=s},203:function(e,t,i){function r(e){return l.parseInt(e,16)}function n(e){return d.isType("string",e)?(e=e.replace(c,""),e+=3===e.length?e:""):null}function s(e,t){var i,s,a,o;return e=n(e),t=t||0,e?(i=0>t?0:255,t=0>t?-Math.max(t,-1):Math.min(t,1),s=r(e.substring(0,2)),a=r(e.substring(2,4)),o=r(e.substring(4,6)),"#"+(16777216+65536*(Math.round((i-s)*t)+s)+256*(Math.round((i-a)*t)+a)+(Math.round((i-o)*t)+o)).toString(16).slice(1)):void 0}function a(e,t){return s(e,-t)}function o(e,t){return s(e,t)}var l=i(7),d=i(11),c=/^#/;e.exports={darken:a,lighten:o}},204:function(e,t,i){function r(e){e.after("render",function(){var e,t=this.sandbox.sandboxEl,i=t.tagName;return s(t,"td "+i)?(e=n.closest("td",t),this.sandbox.styleSelf({maxWidth:e.clientWidth+"px"})):void 0})}var n=i(21),s=i(79);e.exports=r}});