!function(e,t,i){var n=["p","div","pre","form"],a=[8,9,17,18,37,38,39,40,91,46];e.emojiarea={assetsPath:"",spriteSheetPath:"",blankGifPath:"",iconSize:25,icons:{}};var o=":joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:".split(",");e.fn.emojiarea=function(t){return t=e.extend({},t),this.each(function(){var n=e(this);if("contentEditable"in i.body&&!1!==t.wysiwyg){a=getGuid();new l(n,a,e.extend({},t))}else{var a=getGuid();new c(n,a,t)}n.attr({"data-emojiable":"converted","data-id":a,"data-type":"original-input"})})};var s={};s.restoreSelection=t.getSelection?function(e){var i=t.getSelection();i.removeAllRanges();for(var n=0,a=e.length;n<a;++n)i.addRange(e[n])}:i.selection&&i.selection.createRange?function(e){e&&e.select()}:void 0,s.saveSelection=t.getSelection?function(){var e=t.getSelection(),i=[];if(e.rangeCount)for(var n=0,a=e.rangeCount;n<a;++n)i.push(e.getRangeAt(n));return i}:i.selection&&i.selection.createRange?function(){var e=i.selection;return"none"!==e.type.toLowerCase()?e.createRange():null}:void 0,s.replaceSelection=t.getSelection?function(e){var n,a=t.getSelection(),o="string"==typeof e?i.createTextNode(e):e;a.getRangeAt&&a.rangeCount&&((n=a.getRangeAt(0)).deleteContents(),n.insertNode(o),n.setStart(o,0),t.setTimeout(function(){(n=i.createRange()).setStartAfter(o),n.collapse(!0),a.removeAllRanges(),a.addRange(n)},0))}:i.selection&&i.selection.createRange?function(e){var t=i.selection.createRange();"string"==typeof e?t.text=e:t.pasteHTML(e.outerHTML)}:void 0,s.insertAtCursor=function(e,t){e=" "+e;var n,a,o=t.value;void 0!==t.selectionStart&&void 0!==t.selectionEnd?(n=t.selectionStart,t.selectionEnd,t.value=o.substring(0,n)+e+o.substring(t.selectionEnd),t.selectionStart=t.selectionEnd=n+e.length):void 0!==i.selection&&void 0!==i.selection.createRange&&(t.focus(),(a=i.selection.createRange()).text=e,a.select())},s.extend=function(e,t){if(void 0!==e&&e||(e={}),"object"==typeof t)for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},s.escapeRegex=function(e){return(e+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},s.htmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},s.emojiInserted=function(e,t){ConfigStorage.get("emojis_recent",function(t){var i=(t=t||o||[]).indexOf(e);if(!i)return!1;-1!=i&&t.splice(i,1),t.unshift(e),t.length>42&&(t=t.slice(42)),ConfigStorage.set({emojis_recent:t})})};var r=function(){};r.prototype.setup=function(){var e=this;this.$editor.on("focus",function(){e.hasFocus=!0}),this.$editor.on("blur",function(){e.hasFocus=!1}),e.emojiMenu=new h(e),this.setupButton()},r.prototype.setupButton=function(){var t=this,i=e("[data-id="+this.id+"][data-type=picker]");i.on("click",function(e){t.emojiMenu.show(t)}),this.$button=i,this.$dontHideOnClick="emoji-picker"},r.createIcon=function(t,i){var n=t[0],a=t[1],o=t[2],r=t[3],c=e.emojiarea.spriteSheetPath?e.emojiarea.spriteSheetPath:e.emojiarea.assetsPath+"/emoji_spritesheet_!.webp",l=e.emojiarea.blankGifPath?e.emojiarea.blankGifPath:e.emojiarea.assetsPath+"/blank.gif",h=i&&Config.Mobile?26:e.emojiarea.iconSize,d=-h*o,u=-h*a,p=Config.EmojiCategorySpritesheetDimens[n][1]*h,m=Config.EmojiCategorySpritesheetDimens[n][0]*h,g="display:inline-block;";return g+="width:"+h+"px;",g+="height:"+h+"px;",g+="background:url('"+c.replace("!",n)+"') "+d+"px "+u+"px no-repeat;",g+="background-size:"+p+"px "+m+"px;",'<img src="'+l+'" class="img" style="'+g+'" alt="'+s.htmlEntities(r)+'">'},e.emojiarea.createIcon=r.createIcon;var c=function(e,t,i){this.options=i,this.$textarea=e,this.$editor=e,this.id=t,this.setup()};c.prototype.insert=function(t){e.emojiarea.icons.hasOwnProperty(t)&&(s.insertAtCursor(t,this.$textarea[0]),s.emojiInserted(t,this.menu),this.$textarea.trigger("change"))},c.prototype.val=function(){return"\n"==this.$textarea?"":this.$textarea.val()},s.extend(c.prototype,r.prototype);var l=function(n,o,r){var c=this;this.options=r||{},"unicode"===e(n).attr("data-emoji-input")?this.options.inputMethod="unicode":this.options.inputMethod="image",this.id=o,this.$textarea=n,this.emojiPopup=r.emojiPopup,this.$editor=e("<div>").addClass("emoji-wysiwyg-editor").addClass(e(n)[0].className),this.$editor.data("self",this),n.attr("maxlength")&&this.$editor.attr("maxlength",n.attr("maxlength")),this.$editor.height(n.outerHeight()),this.emojiPopup.appendUnicodeAsImageToElement(this.$editor,n.val()),this.$editor.attr({"data-id":o,"data-type":"input",placeholder:n.attr("placeholder"),contenteditable:"true"});var l="blur change";this.options.norealTime||(l+=" keyup"),this.$editor.on(l,function(e){return c.onChange.apply(c,[e])}),this.$editor.on("mousedown focus",function(){i.execCommand("enableObjectResizing",!1,!1)}),this.$editor.on("blur",function(){i.execCommand("enableObjectResizing",!0,!0)});var h=this.$editor;this.$editor.on("change keydown keyup resize scroll",function(e){-1!=a.indexOf(e.which)||(e.ctrlKey||e.metaKey)&&65==e.which||(e.ctrlKey||e.metaKey)&&67==e.which||!(h.text().length+h.find("img").length>=h.attr("maxlength"))||e.preventDefault(),c.updateBodyPadding(h)}),this.$editor.on("paste",function(e){e.preventDefault();var n,a=h.attr("maxlength")-(h.text().length+h.find("img").length);(e.originalEvent||e).clipboardData?(n=(e.originalEvent||e).clipboardData.getData("text/plain"),c.options.onPaste&&(n=c.options.onPaste(n)),a<n.length&&(n=n.substring(0,a)),i.execCommand("insertText",!1,n)):t.clipboardData&&(n=t.clipboardData.getData("Text"),c.options.onPaste&&(n=c.options.onPaste(n)),a<n.length&&(n=n.substring(0,a)),i.selection.createRange().pasteHTML(n)),h.scrollTop(h[0].scrollHeight)}),n.after("<i class='emoji-picker-icon emoji-picker "+this.options.popupButtonClasses+"' data-id='"+o+"' data-type='picker'></i>"),n.hide().after(this.$editor),this.setup(),e(i.body).on("mousedown",function(){c.hasFocus&&(c.selection=s.saveSelection())})};l.prototype.updateBodyPadding=function(t){var i=e("[data-id="+this.id+"][data-type=picker]");e(t).hasScrollbar()?(i.hasClass("parent-has-scroll")||i.addClass("parent-has-scroll"),e(t).hasClass("parent-has-scroll")||e(t).addClass("parent-has-scroll")):(i.hasClass("parent-has-scroll")&&i.removeClass("parent-has-scroll"),e(t).hasClass("parent-has-scroll")&&e(t).removeClass("parent-has-scroll"))},l.prototype.onChange=function(e){var t=new CustomEvent("input",{bubbles:!0});this.$textarea.val(this.val())[0].dispatchEvent(t)},l.prototype.insert=function(t){var i="";if("unicode"==this.options.inputMethod)i=this.emojiPopup.colonToUnicode(t);else{var n=e(r.createIcon(e.emojiarea.icons[t]));n[0].attachEvent&&n[0].attachEvent("onresizestart",function(e){e.returnValue=!1},!1),i=n[0]}this.$editor.trigger("focus"),this.selection&&s.restoreSelection(this.selection);try{s.replaceSelection(i)}catch(e){}s.emojiInserted(t,this.menu),this.onChange()},l.prototype.val=function(){for(var e=[],t=[],i=this.emojiPopup,a=function(){e.push(t.join("")),t=[]},o=function(e){if(3===e.nodeType)t.push(e.nodeValue);else if(1===e.nodeType){var i=e.tagName.toLowerCase(),s=-1!==n.indexOf(i);if(s&&t.length&&a(),"img"===i){var r=e.getAttribute("alt")||"";return void(r&&t.push(r))}"br"===i&&a();for(var c=e.childNodes,l=0;l<c.length;l++)o(c[l]);s&&t.length&&a()}},s=this.$editor[0].childNodes,r=0;r<s.length;r++)o(s[r]);t.length&&a();var c=e.join("\n");return i.colonToUnicode(c)},s.extend(l.prototype,r.prototype),jQuery.fn.hasScrollbar=function(){var e=this.get(0).scrollHeight;return this.outerHeight()<e};var h=function(n){var a=this;a.id=n.id;var o=e(i.body);e(t);this.visible=!1,this.emojiarea=n,h.menuZIndex=5e3,this.$menu=e("<div>"),this.$menu.addClass("emoji-menu"),this.$menu.attr("data-id",a.id),this.$menu.attr("data-type","menu"),this.$menu.hide(),this.$itemsTailWrap=e('<div class="emoji-items-wrap1"></div>').appendTo(this.$menu),this.$categoryTabs=e('<table class="emoji-menu-tabs"><tr><td><a class="emoji-menu-tab icon-recent" ></a></td><td><a class="emoji-menu-tab icon-smile" ></a></td><td><a class="emoji-menu-tab icon-flower"></a></td><td><a class="emoji-menu-tab icon-bell"></a></td><td><a class="emoji-menu-tab icon-car"></a></td><td><a class="emoji-menu-tab icon-grid"></a></td></tr></table>').appendTo(this.$itemsTailWrap),this.$itemsWrap=e('<div class="emoji-items-wrap mobile_scrollable_wrap"></div>').appendTo(this.$itemsTailWrap),this.$items=e('<div class="emoji-items">').appendTo(this.$itemsWrap),this.emojiarea.$editor.after(this.$menu),o.on("keydown",function(e){27!==e.keyCode&&9!==e.keyCode||a.hide()}),o.on("message_send",function(e){a.hide()}),o.on("mouseup",function(i){var n=(i=i.originalEvent||i).target||t;if(!e(n).hasClass(a.emojiarea.$dontHideOnClick)){for(;n&&n!=t;)if((n=n.parentNode)==a.$menu[0]||a.emojiarea&&n==a.emojiarea.$button[0])return;a.hide()}}),this.$menu.on("mouseup","a",function(e){return e.stopPropagation(),!1}),this.$menu.on("click","a",function(i){if(a.emojiarea.updateBodyPadding(a.emojiarea.$editor),e(this).hasClass("emoji-menu-tab"))return a.getTabIndex(this)!==a.currentCategory&&a.selectCategory(a.getTabIndex(this)),!1;var n=e(".label",e(this)).text();return t.setTimeout(function(){a.onItemSelected(n),(i.ctrlKey||i.metaKey)&&a.hide()},0),i.stopPropagation(),!1}),this.selectCategory(0)};h.prototype.getTabIndex=function(e){return this.$categoryTabs.find(".emoji-menu-tab").index(e)},h.prototype.selectCategory=function(e){this.$categoryTabs.find(".emoji-menu-tab").each(function(t){t===e?this.className+="-selected":this.className=this.className.replace("-selected","")}),this.currentCategory=e,this.load(e)},h.prototype.onItemSelected=function(e){this.emojiarea.$editor.text().length+this.emojiarea.$editor.find("img").length>=this.emojiarea.$editor.attr("maxlength")||this.emojiarea.insert(e)},h.prototype.load=function(t){var i=[],n=e.emojiarea.icons,a=e.emojiarea.assetsPath,c=this;a.length&&"/"!==a.charAt(a.length-1)&&(a+="/");var l=function(){c.$items.html(i.join(""))};if(t>0){for(var h in n)n.hasOwnProperty(h)&&n[h][0]===t-1&&i.push('<a href="javascript:void(0)" title="'+s.htmlEntities(h)+'">'+r.createIcon(n[h],!0)+'<span class="label">'+s.htmlEntities(h)+"</span></a>");l()}else ConfigStorage.get("emojis_recent",function(e){e=e||o||[];var t,a;for(a=0;a<e.length;a++)t=e[a],n[t]&&i.push('<a href="javascript:void(0)" title="'+s.htmlEntities(t)+'">'+r.createIcon(n[t],!0)+'<span class="label">'+s.htmlEntities(t)+"</span></a>");l()})},h.prototype.hide=function(e){this.visible=!1,this.$menu.hide("fast")},h.prototype.show=function(t){if(this.visible)return this.hide();e(this.$menu).css("z-index",++h.menuZIndex),this.$menu.show("fast"),this.currentCategory||this.load(0),this.visible=!0}}(jQuery,window,document);