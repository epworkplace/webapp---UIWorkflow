/* require
  jquery.min.js
*/

$(document).ready(function(){

  //Floating Module
	$('.floating-module').click(function(e) {
	e.preventDefault();
	    if ($('.floating-icon').hasClass('floating-close')) {
	        $('.floating-icon').removeClass('floating-close');
	        $('.floating-module').removeClass('open');
	        $('.comments-module').removeClass('icon-0 icon-1 icon-2');
	        $('.task-note-module').removeClass('icon-0 icon-1 icon-2');
	        $('.agenda-module').removeClass('icon-0 icon-1 icon-2');
	        $('.comment-chat').removeClass('floating-box-display');
	        $('.agenda-list').removeClass('floating-box-display');
	        $('.task-note-list').removeClass('floating-box-display');
	    }else {
	        $('.floating-icon').addClass('floating-close');
	        $('.floating-module').addClass('open');
	        $('.comments-module').addClass('icon-0');
	        $('.task-note-module').addClass('icon-1');
	        $('.agenda-module').addClass('icon-2');
	        $('.comment-chat').addClass('floating-box-display');
	        $('.agenda-list').removeClass('floating-box-display');
	        $('.task-note-list').removeClass('floating-box-display');
	    }
	    $('.task-note-module').click(function() {
	        $('.task-note-module').addClass('icon-0').removeClass('icon-1 icon-2');
	        $('.comments-module').addClass('icon-1').removeClass('icon-0 icon-2');
	        $('.agenda-module').addClass('icon-2').removeClass('icon-0 icon-1');
	        $('.comment-chat').removeClass('floating-box-display');
	        $('.agenda-list').removeClass('floating-box-display');
	        $('.task-note-list').addClass('floating-box-display');
	    });
	    $('.agenda-module').click(function() {
	        $('.agenda-module').addClass('icon-0').removeClass('icon-1 icon-2');
	        $('.comments-module').addClass('icon-1').removeClass('icon-0 icon-2');
	        $('.task-note-module').addClass('icon-2').removeClass('icon-0 icon-1');
	        $('.comment-chat').removeClass('floating-box-display');
	        $('.agenda-list').addClass('floating-box-display');
	        $('.task-note-list').removeClass('floating-box-display');
	    });
	    $('.comments-module').click(function() {
	        $('.comments-module').addClass('icon-0').removeClass('icon-1 icon-2');
	        $('.task-note-module').addClass('icon-1').removeClass('icon-0 icon-2');
	        $('.agenda-module').addClass('icon-2').removeClass('icon-0 icon-1');
	        $('.comment-chat').addClass('floating-box-display');
	        $('.agenda-list').removeClass('floating-box-display');
	        $('.task-note-list').removeClass('floating-box-display');
	    });
	});

	//Onclick link to upload files
	$("#upload_link").on('click', function(e){
	    e.preventDefault();
	    $("#upload:hidden").trigger('click');
	});


	//Custom Scrollbar
	$(".floating-box-body .panel #panel-body, .month-values-panel, .reviews, .recommended-reviews, .leftside-column").mCustomScrollbar({
		autoDraggerLength: false,
	    mouseWheel:{
	    	preventDefault: true
	    },
	    mouseWheelPixels: 500,
	    autoHideScrollbar: true
	 });
	// Common custom scrollbar
	$('.tab-panel').mCustomScrollbar({
		// mouseWheel:{ deltaFactor: 50 }
		// scrollInertia: 1000
		autoHideScrollbar: true
	});
// custom scrollbar outside positioned
	$('.tab-panel.outside').mCustomScrollbar({
		scrollbarPosition: "outside",
		autoHideScrollbar: true
	});
/*	$('ul#card-container').mCustomScrollbar(
        {
            mouseWheel:{
                preventDefault: true,
                enable: false,
                axis: "x"
            },
            axis: "x",
            scrollbarPosition: "outside",
            contentTouchScroll: 25,
            documentTouchScroll: true,
            autoHideScrollbar: true
        }
    );*/

// $('ul#card-container').lionbars();



	//Chosen Select Dropdown
	var config = {
		'.chosen-select'           : {},
		'.chosen-select-deselect'  : {allow_single_deselect:true},
		'.chosen-select-no-single' : {disable_search_threshold:10},
		'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
		'.chosen-select-width'     : {width:"95%"}
	}
		for (var selector in config) {
		$(selector).chosen(config[selector]);
	}
	//Layout-3 Tab
	$('.status-list a').click(function(event) {
		event.preventDefault();
		$(this).addClass('active');
		$(this).parent().siblings().children().removeClass('active');
		var tab = $(this).attr("href");
		$(".content > .tab-content").not(tab).css('display', 'none');
		$(tab).fadeIn();
		$('.no-data-container').css('position', 'absolute');
	});
	/*$(".select-all").click(function(event) {
		event.preventDefault();
	    if ($ (this).children ("#fold_p").text() == "Select All") {
            $ (this).text("Select None");
            $(".check input").prop('checked', true);
        }
        else {
             $ (this).text("Select None");
             $(".check input").prop('checked', false);
        }
	});*/
	//Data Table Fixed Header
	$(".data-table.table-fixed tbody").on("scroll touchmove", function () {
	    $('.data-table.table-fixed thead').toggleClass('top', $(".data-table.table-fixed tbody").scrollTop() > 0);
	});
	//Data Table Quick View
	$(function(){
	    $('.open-modal').click(function(e){
	    	e.preventDefault();
			$('.table-modal').animate({
				width: '+=500px'
			}).css({
				display: 'block'
			});
			$('.overlay').css({
				visibility: 'visible',
				opacity: '1'
			});
	    });
	    $('.close-modal').click(function(e){
	    	e.preventDefault();
			$('.table-modal').animate({
				width: '-=500px'
			});
			$('.table-modal').delay().queue(function(next){
				$(this).css('display', 'none');
				next();
			});
			$('.overlay').css({
				visibility: 'hidden',
				opacity: '0'
			});
	    });
	});

	$('[id*="imgCirclePB"], [id^="missionImage"], [id^="contractImage"], [id^="quoteImage"]').each(function(i)
	{
		var image = $(this).attr('id');
		var bar = new ProgressBar.Circle('#' + image, {
			strokeWidth: 6,
			easing: 'easeInOut',
			duration: 1400,
			color: '#00BCD8',
			trailColor: '#D7D9DC',
			trailWidth: 6,
			svgStyle: null
		});
		var value = ($(this).attr('data-value') / 100);
		bar.animate(value);

	});

	/*$('.contract-section-list ul li:nth-child(6n)').append('<a href="#" class="jscroll-next">NEXT</a>');

	//JScroll infinite scroll
	$('.contract-section-list ul li').jscroll({
		loadingHtml: '<img src="lbd/img/ajax_loader.gif" alt="Loading" />',
		padding: 20,
		autoTriggerUntil: 3,
		nextSelector: 'a.jscroll-next',
		contentSelector: 'li'
	});*/

	//Billing Modal Disabled Month List
	$('.billing-month-values .month-values-panel ul li.disabled a').click(function() {
		return false;
	});

	//Placeholders for Bootstrap Select
	$(".clients .bs-searchbox input").attr("placeholder", "Search name of Client");
	$(".owners .bs-searchbox input").attr("placeholder", "Search name of Owner");
	$(".contracts .bs-searchbox input").attr("placeholder", "Search Contracts");

	//Select All Fuctions
    var showValid = function() {
		$('.main-panel-header .page-status, .main-panel-header .project-planner, .main-panel-header .search-action').hide();
		$('.main-panel-header .validate').show();
	};

	var notShowValid = function() {
		$('.main-panel-header .page-status, .main-panel-header .project-planner, .main-panel-header .search-action').show();
		$('.main-panel-header .validate').hide();
	};

	$('.select-all .checkbox').click(function(){
		if ($(this).hasClass('checked')) {
			$('.check .checkbox').removeClass('checked');
			$('.card-section-list ul li .card').removeClass('card-select');
			notShowValid();
		}else{
			$('.check .checkbox').addClass('checked');
			$('.card-section-list ul li .card').addClass('card-select');
			showValid();
		}
	});

	$('.check .checkbox').click(function() {
		if ($(this).hasClass('checked')) {
			$(this).removeClass('checked');
			$(this).parents('.card').removeClass('card-select');
			notShowValid();
		}else{
			$(this).addClass('checked');
			$(this).parents('.card').addClass('card-select');
			showValid();
		}
	});

	$('.select-all .checkbox, .check .checkbox').change(function(){
		if($('.select-all .checkbox, .check .checkbox').hasClass('checked')){
			var numberOfChecked = $('.check .checkbox.checked').length;
			if(numberOfChecked > 0){
				$('.select-all .select').text(numberOfChecked + ' Selected');
				showValid();
			}
			else{
				$('.select-all .select').text('Select all');
				notShowValid();
			}
		}
		else{
			$('.select-all .select').text('Select all');
			notShowValid();
		}
	});


	// Main panel Header Width Fix
	/*$(".layout-3 .main-panel-header").css({
		width: ($(".layout-3 .content").width() + 'px'),
		margin: '0 auto'
	});*/


	//Search box Search Icon
	$('.search-icon').addClass('search-icon-none');
	$('.search-input .form-control').keyup(function(){
		if($(this).val() == ''){
			$('.search-icon').removeClass('search-icon-display').addClass('search-icon-none');
		}else{
			$('.search-icon').addClass('search-icon-display').removeClass('search-icon-none');
		}
	});

	//Mission page card hover
	$('.client-content-container .card .list-head-container a').mouseover(function() {
		$(this).closest('.card').css('border', '1px solid #448AFF');
	});
	$('.client-content-container .card .list-head-container a').mouseout(function() {
		$(this).closest('.card').css('border', '1px solid #FFFFFF');
	});


	//Tab Edit content toggle
	/*$('.tab-content .edit-content').hide();
	$('.tab-content .edit').click(function() {
		$('.tab-content .edit-content').show();
		$('.tab-content .display-content').hide();
	});
	$('.tab-content .close').click(function() {
		$('.tab-content .edit-content').hide();
		$('.tab-content .display-content').show();
	});*/



    // Init DatetimePicker
    $('.datepicker').datetimepicker({
    	format: 'DD/MM/YYYY'
    });
    $('.timepicker').datetimepicker({
    	format: 'h:mm A'
    });

	$('.datepicker-start').datetimepicker({
		format: 'DD/MM/YYYY',
		widgetPositioning: {
            horizontal: 'left',
            vertical: 'bottom'
        }
	});
	$('.datepicker-end').datetimepicker({
		format: 'DD/MM/YYYY',
		widgetPositioning: {
            horizontal: 'right',
            vertical: 'bottom'
        }
	});
	$('.datepicker-start-date-up').datetimepicker({
		format: 'DD/MM/YYYY',
		widgetPositioning: {
            horizontal: 'auto',
            vertical: 'top'
        }
	});
	$('.datepicker-end-date-up').datetimepicker({
		format: 'DD/MM/YYYY',
		widgetPositioning: {
            horizontal: 'auto',
            vertical: 'top'
        }
	});
	$('.datepicker-jobstart-date-up').datetimepicker({
		format: 'MM/YYYY',
		widgetPositioning: {
            horizontal: 'auto',
            vertical: 'top'
        }
	});
	$('.datepicker-jobend-date-up').datetimepicker({
		format: 'MM/YYYY',
		widgetPositioning: {
            horizontal: 'auto',
            vertical: 'top'
        }
	});
	$('.datepicker-start-up').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		widgetPositioning: {
            horizontal: 'left',
            vertical: 'top'
        }
	});
	$('.datepicker-end-up').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		widgetPositioning: {
            horizontal: 'right',
            vertical: 'top'
        }
	});
	$('.datepicker-start-down').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		widgetPositioning: {
            horizontal: 'left',
            vertical: 'bottom'
        }
	});
	$('.datepicker-end-down').datetimepicker({
		format: 'DD/MM/YYYY h:mm A',
		widgetPositioning: {
            horizontal: 'right',
            vertical: 'bottom'
        }
	});

	// Datepicker only year
    $('.datepicker-year').datetimepicker({
    	format: 'YYYY'
    });
	// Datepicker only month
    $('.datepicker-month').datetimepicker({
    	format: 'MM'
    });
	// Datepicker only date
    $('.datepicker-date').datetimepicker({
    	format: 'DD'
    });




    //Tab Wizard
    $('#wizardCard, #wizardCard-testArticle').bootstrapWizard({
    	tabClass: 'nav nav-pills',
    	nextSelector: '.btn-next',
        previousSelector: '.btn-back',
    	onNext: function(tab, navigation, index) {
    		var $valid = $('#wizardForm').valid();
    		if(!$valid) {
    			$validator.focusInvalid();
    			return false;
    		}
    	},/*
        onInit : function(tab, navigation, index){
            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            $width = 100/$total;
            $display_width = $(document).width();
            if($display_width < 600 && $total > 3){
               $width = 50;
            }
            navigation.find('li').css('width',$width + '%');
        },*/
        onTabClick : function(tab, navigation, index){
            // Disable the posibility to click on tabs
            return false;
        },
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var wizard = navigation.closest('.card-wizard');
            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $(wizard).find('.btn-next').hide();
                $(wizard).find('.btn-finish').show();
            } else if($current == 1){
                $(wizard).find('.btn-back').hide();
            } else {
                $(wizard).find('.btn-back').show();
                $(wizard).find('.btn-next').show();
                $(wizard).find('.btn-finish').hide();
            }
        }
    });


    //contract Tag
	$('#contract-tags').tagEditor({
        placeholder: '+ Add a tag',
        autocomplete: { minLength: 3, delay: 250, html: true, position: { collision: 'flip' } }
    });


	//Tab Edit content toggle
	$('.contract .nav-button').click(function(e) {
		e.stopPropagation();
		$('.contract .tooltip').hide();
		$('.open-menu-top-bar').fadeIn('400', function() {
			$('.open-menu-top-bar').show();
		});
	});
	$('.open-menu-top-bar .close-nav').click(function(e) {
		e.stopPropagation();
		$('.open-menu-top-bar').fadeOut('400', function() {
			$('.open-menu-top-bar').hide();
		});
	});

	$(document).click(function(e) {
		if(e.target.id == '.open-menu-top-bar')
          return;
       //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
       if($(e.target).closest('.open-menu-top-bar').length)
          return;

		$('.open-menu-top-bar').fadeOut('400', function() {
			$('.open-menu-top-bar').hide();
		});
	});

	//tinyMCE integartion
	tinymce.init({
	    selector: '#edit-textarea',
	    statusbar: false,
  		menubar : false,
		height: "500",
		plugins: "autoresize",
		autoresize_min_height: "400",
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE intregation
	tinymce.init({
	    selector: '#edit-textarea-normal, #edit-textarea-normal-02',
	    statusbar: false,
  		menubar : false,
		height: "230",
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Send Message intregation
	tinymce.init({
	    selector: '#editSendTestMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Fire Message intregation
	tinymce.init({
	    selector: '#editFireMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Send Job Confirm Message intregation
	tinymce.init({
	    selector: '#editSendJobConfirmMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Send Job Cancel Message intregation
	tinymce.init({
	    selector: '#editSendJobCancelMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Send Report File Message intregation
	tinymce.init({
	    selector: '#editReportFileMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//tinyMCE Send Announce Message intregation
	tinymce.init({
	    selector: '#editSendAnnounceMessage',
	    statusbar: false,
  		menubar : false,
  		content_css : "http://admin-test.edit-place.com/webapp-theme/lbd/css/tinymce.css",
  		allow_html_in_named_anchor: true,
  		force_p_newlines : true,
  		invalid_elements : 'div,span'
	  });

	//Chosen Dropdown with Image
	$(".mission-assignee, .chosen-default").chosen({width:"100%"});

	//Settings popup
	$('.show-reassign, .btn-mission-overview-reassign').click(function() {
		$('.overlay-main-container, .settings-wrap').fadeIn(function(){
			$('.overlay-main-container, .reassignment-container, .mission-overview-reassign').css({
				display: 'block'
			});
			$('.wp-app').css({
				overflow: 'hidden'
			});
			/*$('.layout-5.wp-app .tab-panel-container').addClass('left');*/
		})
	});
	$('.settings-wrap .close a, .settings-wrap .tab-navigation button.btn-cancel-settings').click(function() {
		$('.overlay-main-container, .settings-wrap').fadeOut(function(){
			$('.overlay-main-container, .reassignment-container, .mission-overview-reassign').css({
				display: 'none'
			});
			$('.wp-app').css({
				overflow: 'auto'
			});
			/*$('.layout-5.wp-app .tab-panel-container').removeClass('left');*/
		})
	});


	//Turover Graph
	    /*google.charts.load('current', {'packages':['corechart']});
	    google.charts.setOnLoadCallback(drawVisualization);

	    function drawVisualization() {
			// Some raw data (not necessarily accurate)
			var data = google.visualization.arrayToDataTable([
				 ['Month', 'Theory', 'Agreed', 'Billable', 'invoiced'],
				 ['MAR 2019',  165, 938, 522, 998],
				 ['APR 2019',  235, 1120, 599, 1268],
				 ['MAY 2019',  557, 1167, 587, 807],
				 ['JUN 2019',  339, 1110, 615, 0],
				 ['JUL 2019',  136, 691, 629, 100]
			]);
			var options = {
				title : '',
				width: '867',
				height: '480',
				animation:{
		        	duration: '1000',
					easing: 'out',
					startup: true
				},
				backgroundColor: '#EFF1F4',
				vAxis: {title: 'Turnover'},
				hAxis: {title: 'Month'},
				colors: ['#00bcd8', '#ee0a5f', '#353f53'],
				seriesType: 'bars',
				pointSize: 14,
				series: {
					0: {
						pointShape: 'circle',
						color: 'white'
					}
				},
				lineWidth: 2,
				series: {
					3: {
						type: 'line',
						color: '#9a9fa9'
					}
				}
			};
			var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
			chart.draw(data, options);
	  }	*/




	//Readmore/less Code
	// Configure/customize these variables.
    var showChar = 250;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "See more";
    var lesstext = "See less";


     $('.more').each(function() {
        var content = $(this).html(),
        		textContent = $(this).text();
        // console.log(content);
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            // console.log(c);
            var h = content.substr(showChar, content.length - showChar);
            // console.log(h);
            var html = c + '<span class="moreellipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span><a href="" class="morelink">' + moretext + '</a></span>';
            // console.log(html);
            $(this).html(html);
        }
    });

/*$(".morelink").click(function(){
    if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
    } else {
        $(this).addClass("less");
        $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    return false;
});*/
    $(".morelink").click(function(e){
        e.stopPropagation();
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });



    //Full Calendar
    $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'year,month,agendaWeek,listWeek,listDay',
            },
            locale: 'en',
            buttonText: {
		        today: 'Today',
		        year: 'Year',
				month: 'Month',
				agendaWeek: 'Week',
				listDay: 'List Day',
				listWeek: 'List Week',
		    },
            defaultDate: '2017-06-30',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                    title: 'All Day Event',

                    start: '2017-06-30'
                },
                {
                    title: 'Long Event',
                    start: '2016-09-07',
                    end: '2017-06-30'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-06-30T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-06-30T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2017-06-30',
                    end: '2018-06-30'
                },
                {
                    title: 'Meeting',
                    start: '2017-06-30T10:30:00',
                    end: '2017-07-30T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2017-06-30T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2016-06-30T14:30:00'
                },
                {
                    title: 'Happy Hour',
                    start: '2016-09-12T17:30:00'
                },
                {
                    title: 'Dinner',
                    start: '2016-09-12T20:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2016-09-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2016-09-28'
                }
            ]
        });

		$('.tab-step .tab-pane .related-files .related-files-stack ul').each(function () {
			if ($(this).children().length < 4)
			$('.droppable-tagline').addClass('small');
		});


    //Scrolling for Layout 5
    /*$('.layout-5.wp-app .tab-panel-container').mouseover(function() {
    		if ($(this).hasClass('left')) {
    			$(this).removeClass('left');
    		}
    });
    $('.layout-5.wp-app .content').mouseover(function() {
    	if ($('.layout-5.wp-app .tab-panel-container').hasClass('left')) {
    			return false;
    		}
    		else{
    			$('.layout-5.wp-app .tab-panel-container').addClass('left');
    		}
    });*/

	// $('#card-container').on('scroll', function () {
	// 	var cur = $(this).scrollLeft();
	// 	if (cur == 0) {
	// 		$('.tab-panel-container').removeClass('left');
	// 	}
	// 	else if (cur > 0){
	// 		$('.tab-panel-container').addClass('left');
	// 	}
	// });
	// $('#card-container').trigger('scroll');
 //    $('#card-container').mousewheel(function(e, delta) {
	//      this.scrollLeft -= (delta * 40);
	//      e.preventDefault();
	//  });
	// $('.card-wrap').children().mouseenter(function(){
	// 	$('#card-container').unmousewheel();
	// });
	// $('.card-wrap').children().mouseleave(function(){
	// 	$('#card-container').mousewheel(function(e, delta) {
	// 		this.scrollLeft -= (delta * 40);
	// 		e.preventDefault();
	// 	});
	// });



	//Mission Overview Track progressbar
	/*var bar = new ProgressBar.Line(trackProgressBar, {
		strokeWidth: 10,
		easing: 'easeInOut',
		duration: 1400,
		color: '#448AFF',
		trailColor: '#dfe2e5',
		trailWidth: 10,
		svgStyle: {width: '100%', height: '100%'}
	});
	bar.animate(0.6);*/ // Number from 0.0 to 1.0



	//Onclick link to upload images
	$(".create-announce-image a").on('click', function(e){
	    e.preventDefault();
	    $("#upload-announce-image:hidden").trigger('click');
	});

	$(".add-announce-files").on('click', function(e){
	    e.preventDefault();
	    $("#upload-announce-startingfiles:hidden").trigger('click');
	});


	//Send message Edit
	$('.send-message-container .message-container a.edit-message').click(function(e) {
		e.preventDefault();
		$('.send-message-container .send-message-display').hide();
		$('.send-message-container .send-message-edit').show();

	});
	$('.send-message-container .send-message-edit a.save-edit').click(function(e) {
		e.preventDefault();
		$('.send-message-container .send-message-display').show();
		$('.send-message-container .send-message-edit').hide();
	});


	//Slide Review Candidate Task Test Article
	$('.candidate-action-container .reviews').hide();
	$('.candidate-action-container .review-show').hide();
	$('.candidate-action-container .review-link a').click(function(){
		$('.candidate-action-container .reviews').slideToggle(400);
		$('.candidate-action-container .review-link').find(".review-show, .review-hide").toggle();
	});

	//Slide Review Job Task Review
	$('.job-list-card .reviews').hide();
	$('.job-list-cardr .review-show').hide();
	$('.job-list-card .review-link a').click(function(){
		$(this).parents('.plagiarism-rating-container').find('.reviews').slideToggle(400);
		$(this).parents('.review-link').find(".review-show, .review-hide").toggle();
	});

	//Plagiarism content Candidate Task Test Article
	$('.results-container').hide();
	$('.hide-show .content-show').hide();
	$('a.expand-content').click(function(){
		$(this).parents('.expanding-card').find('.results-container').slideToggle(400);
		$(this).find('.hide-show').find(".content-show, .content-hide").toggle();
	});

	/*Flags Dropdown */
    $('.flags').next('.chosen-container').addClass('flag-dropdown');

    /*Note check strike*/
    $('.note-check .checkbox').click(function() {
        if ($(this).hasClass('checked')) {
            $(this).parents('.note-list').find('.note-subject').removeClass('striked');
        } else {
            $(this).parents('.note-list').find('.note-subject').addClass('striked');
        }
    });

/*// Card-mission click to open Specific mission
$('div').delegate('.card-section-list ul li .card', 'click', function(e){
   if($(e.target).closest('.checkbox, a, button, .card-user, .quote-mission-creation, .card-draft').length === 0) {
      // code placed inside this condition is not executed on clicking the element #test
e.stopPropagation();
// console.log('Clicked on card-box');
    window.open('contract-overview.html','_blank');
   }
// console.log('Clicked on card-box 02');
});*/

$('div').delegate('.card-section-list ul li .card', 'mouseover', function(e){
   if($(e.target).closest('.checkbox, a, button, .card-user, .quote-mission-creation').length === 0) {
      // code placed inside this condition is not executed on clicking the element #test
      $(this).closest('.card').css({'cursor':'pointer', 'box-shadow':'0px 0px 1px 1px rgba(68,138,255,1)'});
   }
});
$('div').delegate('.card-section-list ul li .card', 'mouseout', function(e){
   if($(e.target).closest('.checkbox, a, button, .card-user, .quote-mission-creation').length === 0) {
      // code placed inside this condition is not executed on clicking the element #test
      $(this).closest('.card').css({'cursor':'auto', 'box-shadow':'0px 0px 5px 0px rgba(50,50,50,0.1)'});
   }
});

/*pop over*/
$('[data-toggle="popover"]').popover({
    container: 'body'
});


});





