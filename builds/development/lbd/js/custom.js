$(document).ready(function(){$(".floating-module").click(function(e){e.preventDefault(),$(".floating-icon").hasClass("floating-close")?($(".floating-icon").removeClass("floating-close"),$(".floating-module").removeClass("open"),$(".comments-module").removeClass("icon-0 icon-1 icon-2"),$(".task-note-module").removeClass("icon-0 icon-1 icon-2"),$(".agenda-module").removeClass("icon-0 icon-1 icon-2"),$(".comment-chat").removeClass("floating-box-display"),$(".agenda-list").removeClass("floating-box-display"),$(".task-note-list").removeClass("floating-box-display")):($(".floating-icon").addClass("floating-close"),$(".floating-module").addClass("open"),$(".comments-module").addClass("icon-0"),$(".task-note-module").addClass("icon-1"),$(".agenda-module").addClass("icon-2"),$(".comment-chat").addClass("floating-box-display"),$(".agenda-list").removeClass("floating-box-display"),$(".task-note-list").removeClass("floating-box-display")),$(".task-note-module").click(function(){$(".task-note-module").addClass("icon-0").removeClass("icon-1 icon-2"),$(".comments-module").addClass("icon-1").removeClass("icon-0 icon-2"),$(".agenda-module").addClass("icon-2").removeClass("icon-0 icon-1"),$(".comment-chat").removeClass("floating-box-display"),$(".agenda-list").removeClass("floating-box-display"),$(".task-note-list").addClass("floating-box-display")}),$(".agenda-module").click(function(){$(".agenda-module").addClass("icon-0").removeClass("icon-1 icon-2"),$(".comments-module").addClass("icon-1").removeClass("icon-0 icon-2"),$(".task-note-module").addClass("icon-2").removeClass("icon-0 icon-1"),$(".comment-chat").removeClass("floating-box-display"),$(".agenda-list").addClass("floating-box-display"),$(".task-note-list").removeClass("floating-box-display")}),$(".comments-module").click(function(){$(".comments-module").addClass("icon-0").removeClass("icon-1 icon-2"),$(".task-note-module").addClass("icon-1").removeClass("icon-0 icon-2"),$(".agenda-module").addClass("icon-2").removeClass("icon-0 icon-1"),$(".comment-chat").addClass("floating-box-display"),$(".agenda-list").removeClass("floating-box-display"),$(".task-note-list").removeClass("floating-box-display")})}),$("#upload_link").on("click",function(e){e.preventDefault(),$("#upload:hidden").trigger("click")}),$(".floating-box-body .panel #panel-body, .month-values-panel, .reviews, .recommended-reviews, .leftside-column").mCustomScrollbar({autoDraggerLength:!1,mouseWheel:{preventDefault:!0},mouseWheelPixels:500,autoHideScrollbar:!0}),$(".tab-panel, .decks-wrap").mCustomScrollbar({autoHideScrollbar:!0}),$(".tab-panel.outside").mCustomScrollbar({scrollbarPosition:"outside",autoHideScrollbar:!0});var e={".chosen-select":{},".chosen-select-deselect":{allow_single_deselect:!0},".chosen-select-no-single":{disable_search_threshold:10},".chosen-select-no-results":{no_results_text:"Oops, nothing found!"},".chosen-select-width":{width:"95%"}};for(var t in e)$(t).chosen(e[t]);$(".status-list a").click(function(e){e.preventDefault(),$(this).addClass("active"),$(this).parent().siblings().children().removeClass("active");var t=$(this).attr("href");$(".content > .tab-content").not(t).css("display","none"),$(t).fadeIn(),$(".no-data-container").css("position","absolute")}),$(".data-table.table-fixed tbody").on("scroll touchmove",function(){$(".data-table.table-fixed thead").toggleClass("top",$(".data-table.table-fixed tbody").scrollTop()>0)}),$(function(){$(".open-modal").click(function(e){e.preventDefault(),$(".table-modal").animate({width:"+=500px"}).css({display:"block"}),$(".overlay").css({visibility:"visible",opacity:"1"})}),$(".close-modal").click(function(e){e.preventDefault(),$(".table-modal").animate({width:"-=500px"}),$(".table-modal").delay().queue(function(e){$(this).css("display","none"),e()}),$(".overlay").css({visibility:"hidden",opacity:"0"})})}),$('[id*="imgCirclePB"], [id^="missionImage"], [id^="contractImage"], [id^="quoteImage"]').each(function(e){var t=$(this).attr("id"),a=new ProgressBar.Circle("#"+t,{strokeWidth:6,easing:"easeInOut",duration:1400,color:"#00BCD8",trailColor:"#D7D9DC",trailWidth:6,svgStyle:null}),i=$(this).attr("data-value")/100;a.animate(i)}),$(".billing-month-values .month-values-panel ul li.disabled a").click(function(){return!1}),$(".clients .bs-searchbox input").attr("placeholder","Search name of Client"),$(".owners .bs-searchbox input").attr("placeholder","Search name of Owner"),$(".contracts .bs-searchbox input").attr("placeholder","Search Contracts");var a=function(){$(".main-panel-header .page-status, .main-panel-header .sort-contracts, .main-panel-header .search-action").hide(),$(".main-panel-header .validate").show()},i=function(){$(".main-panel-header .page-status, .main-panel-header .sort-contracts, .main-panel-header .search-action").show(),$(".main-panel-header .validate").hide()};$(".select-all .checkbox").click(function(){$(this).hasClass("checked")?($(".check .checkbox").removeClass("checked"),$(".card-section-list ul li .card").removeClass("card-select"),i()):($(".check .checkbox").addClass("checked"),$(".card-section-list ul li .card").addClass("card-select"),a())}),$(".check .checkbox").click(function(){$(this).hasClass("checked")?($(this).removeClass("checked"),$(this).parents(".card").removeClass("card-select"),i()):($(this).addClass("checked"),$(this).parents(".card").addClass("card-select"),a())}),$(".select-all .checkbox, .check .checkbox").change(function(){if($(".select-all .checkbox, .check .checkbox").hasClass("checked")){var e=$(".check .checkbox.checked").length;e>0?($(".select-all .select").text(e+" Selected"),a()):($(".select-all .select").text("Select all"),i())}else $(".select-all .select").text("Select all"),i()}),$(".search-icon").addClass("search-icon-none"),$(".search-input .form-control").keyup(function(){""==$(this).val()?$(".search-icon").removeClass("search-icon-display").addClass("search-icon-none"):$(".search-icon").addClass("search-icon-display").removeClass("search-icon-none")}),$(".client-content-container .card .list-head-container a").mouseover(function(){$(this).closest(".card").css("border","1px solid #448AFF")}),$(".client-content-container .card .list-head-container a").mouseout(function(){$(this).closest(".card").css("border","1px solid #FFFFFF")}),$(".datepicker").datetimepicker({format:"DD/MM/YYYY"}),$(".timepicker").datetimepicker({format:"h:mm A"}),$(".datepicker-start").datetimepicker({format:"DD/MM/YYYY",widgetPositioning:{horizontal:"left",vertical:"bottom"}}),$(".datepicker-end").datetimepicker({format:"DD/MM/YYYY",widgetPositioning:{horizontal:"right",vertical:"bottom"}}),$(".datepicker-start-date-up").datetimepicker({format:"DD/MM/YYYY",widgetPositioning:{horizontal:"auto",vertical:"top"}}),$(".datepicker-end-date-up").datetimepicker({format:"DD/MM/YYYY",widgetPositioning:{horizontal:"auto",vertical:"top"}}),$(".datepicker-jobstart-date-up").datetimepicker({format:"MM/YYYY",widgetPositioning:{horizontal:"auto",vertical:"top"}}),$(".datepicker-jobend-date-up").datetimepicker({format:"MM/YYYY",widgetPositioning:{horizontal:"auto",vertical:"top"}}),$(".datepicker-start-up").datetimepicker({format:"DD/MM/YYYY h:mm A",widgetPositioning:{horizontal:"left",vertical:"top"}}),$(".datepicker-end-up").datetimepicker({format:"DD/MM/YYYY h:mm A",widgetPositioning:{horizontal:"right",vertical:"top"}}),$(".datepicker-start-down").datetimepicker({format:"DD/MM/YYYY h:mm A",widgetPositioning:{horizontal:"left",vertical:"bottom"}}),$(".datepicker-end-down").datetimepicker({format:"DD/MM/YYYY h:mm A",widgetPositioning:{horizontal:"right",vertical:"bottom"}}),$(".datepicker-year").datetimepicker({format:"YYYY"}),$(".datepicker-month").datetimepicker({format:"MM"}),$(".datepicker-date").datetimepicker({format:"DD"}),$("#wizardCard, #wizardCard-testArticle").bootstrapWizard({tabClass:"nav nav-pills",nextSelector:".btn-next",previousSelector:".btn-back",onNext:function(e,t,a){if(!$("#wizardForm").valid())return $validator.focusInvalid(),!1},onTabClick:function(e,t,a){return!1},onTabShow:function(e,t,a){var i=t.find("li").length,n=a+1,s=t.closest(".card-wizard");n>=i?($(s).find(".btn-next").hide(),$(s).find(".btn-finish").show()):1==n?$(s).find(".btn-back").hide():($(s).find(".btn-back").show(),$(s).find(".btn-next").show(),$(s).find(".btn-finish").hide())}}),$("#contract-tags").tagEditor({placeholder:"+ Add a tag",autocomplete:{minLength:3,delay:250,html:!0,position:{collision:"flip"}}}),$(".contract .nav-button").click(function(e){e.stopPropagation(),$(".contract .tooltip").hide(),$(".open-menu-top-bar").fadeIn("400",function(){$(".open-menu-top-bar").show()})}),$(".open-menu-top-bar .close-nav").click(function(e){e.stopPropagation(),$(".open-menu-top-bar").fadeOut("400",function(){$(".open-menu-top-bar").hide()})}),$(document).click(function(e){".open-menu-top-bar"!=e.target.id&&($(e.target).closest(".open-menu-top-bar").length||$(".open-menu-top-bar").fadeOut("400",function(){$(".open-menu-top-bar").hide()}))}),tinymce.init({selector:"#edit-textarea",statusbar:!1,menubar:!1,height:"500",plugins:"autoresize",autoresize_min_height:"400",content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#edit-textarea-normal",statusbar:!1,menubar:!1,height:"230",content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editSendTestMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editFireMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editSendJobConfirmMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editSendJobCancelMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editReportFileMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),tinymce.init({selector:"#editSendAnnounceMessage",statusbar:!1,menubar:!1,content_css:"http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css"}),$(".mission-assignee, .chosen-default").chosen({width:"100%"}),$(".show-reassign, .btn-mission-overview-reassign").click(function(){$(".overlay-main-container, .settings-wrap").fadeIn(function(){$(".overlay-main-container, .reassignment-container, .mission-overview-reassign").css({display:"block"}),$(".wp-app").css({overflow:"hidden"})})}),$(".settings-wrap .close a, .settings-wrap .tab-navigation button.btn-cancel-settings").click(function(){$(".overlay-main-container, .settings-wrap").fadeOut(function(){$(".overlay-main-container, .reassignment-container, .mission-overview-reassign").css({display:"none"}),$(".wp-app").css({overflow:"auto"})})});$(".more").each(function(){var e=$(this).html();$(this).text();if(e.length>200){var t=e.substr(0,200)+'<span class="moreellipses">...</span><span class="morecontent"><span>'+e.substr(200,e.length-200)+'</span><a href="" class="morelink">See more</a></span>';$(this).html(t)}}),$(".morelink").click(function(e){return e.stopPropagation(),$(this).hasClass("less")?($(this).removeClass("less"),$(this).html("See more")):($(this).addClass("less"),$(this).html("See less")),$(this).parent().prev().toggle(),$(this).prev().toggle(),!1}),$("#calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:"year,month,agendaWeek,listWeek,listDay"},locale:"en",buttonText:{today:"Today",year:"Year",month:"Month",agendaWeek:"Week",listDay:"List Day",listWeek:"List Week"},defaultDate:"2017-06-30",navLinks:!0,editable:!0,eventLimit:!0,events:[{title:"All Day Event",start:"2017-06-30"},{title:"Long Event",start:"2016-09-07",end:"2017-06-30"},{id:999,title:"Repeating Event",start:"2017-06-30T16:00:00"},{id:999,title:"Repeating Event",start:"2017-06-30T16:00:00"},{title:"Conference",start:"2017-06-30",end:"2018-06-30"},{title:"Meeting",start:"2017-06-30T10:30:00",end:"2017-07-30T12:30:00"},{title:"Lunch",start:"2017-06-30T12:00:00"},{title:"Meeting",start:"2016-06-30T14:30:00"},{title:"Happy Hour",start:"2016-09-12T17:30:00"},{title:"Dinner",start:"2016-09-12T20:00:00"},{title:"Birthday Party",start:"2016-09-13T07:00:00"},{title:"Click for Google",url:"http://google.com/",start:"2016-09-28"}]}),$(".tab-step .tab-pane .related-files .related-files-stack ul").each(function(){$(this).children().length<4&&$(".droppable-tagline").addClass("small")}),$(".create-announce-image a").on("click",function(e){e.preventDefault(),$("#upload-announce-image:hidden").trigger("click")}),$(".add-announce-files").on("click",function(e){e.preventDefault(),$("#upload-announce-startingfiles:hidden").trigger("click")}),$(".send-message-container .message-container a.edit-message").click(function(e){e.preventDefault(),$(".send-message-container .send-message-display").hide(),$(".send-message-container .send-message-edit").show()}),$(".send-message-container .send-message-edit a.save-edit").click(function(e){e.preventDefault(),$(".send-message-container .send-message-display").show(),$(".send-message-container .send-message-edit").hide()}),$(".candidate-action-container .reviews").hide(),$(".candidate-action-container .review-show").hide(),$(".candidate-action-container .review-link a").click(function(){$(".candidate-action-container .reviews").slideToggle(400),$(".candidate-action-container .review-link").find(".review-show, .review-hide").toggle()}),$(".job-list-card .reviews").hide(),$(".job-list-cardr .review-show").hide(),$(".job-list-card .review-link a").click(function(){$(this).parents(".plagiarism-rating-container").find(".reviews").slideToggle(400),$(this).parents(".review-link").find(".review-show, .review-hide").toggle()}),$(".results-container").hide(),$(".hide-show .content-show").hide(),$("a.expand-content").click(function(){$(this).parents(".expanding-card").find(".results-container").slideToggle(400),$(this).find(".hide-show").find(".content-show, .content-hide").toggle()}),$(".flags").next(".chosen-container").addClass("flag-dropdown"),$(".note-check .checkbox").click(function(){$(this).hasClass("checked")?$(this).parents(".note-list").find(".note-subject").removeClass("striked"):$(this).parents(".note-list").find(".note-subject").addClass("striked")}),$("div").delegate(".card-section-list ul li .card","click",function(e){0===$(e.target).closest(".checkbox, a, button, .card-user, .quote-mission-creation").length&&(e.stopPropagation(),window.open("contract-overview.html","_blank"))}),$("div").delegate(".card-section-list ul li .card","mouseover",function(e){0===$(e.target).closest(".checkbox, a, button, .card-user, .quote-mission-creation").length&&$(this).closest(".card").css({cursor:"pointer","box-shadow":"0px 0px 1px 1px rgba(68,138,255,1)"})}),$("div").delegate(".card-section-list ul li .card","mouseout",function(e){0===$(e.target).closest(".checkbox, a, button, .card-user, .quote-mission-creation").length&&$(this).closest(".card").css({cursor:"auto","box-shadow":"0px 0px 5px 0px rgba(50,50,50,0.1)"})})});