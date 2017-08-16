project = {
	initFullCalendar: function(){
        $calendar = $('#fullCalendar');

        today = new Date();
        y = today.getFullYear();
        m = today.getMonth();
        d = today.getDate();

        $calendar.fullCalendar({
			header: {
				left: 'title',
				center: 'year,month,agendaWeek,listWeek,listDay',
				right: 'prev,next today'
			},
			locale: 'en',
			views: {
				listDay: { buttonText: 'List day' },
				listWeek: { buttonText: 'List week' },
				/* year: {
					type: 'basic',
					duration: { months: 12 },
					buttonText: 'YEAR'
				} */
				
			},
			defaultDate: today,	
			businessHours:true,
			editable: false,
			eventLimit: true,
			events: '/project-plan/contract-events?contract_id='+contract_id,
			eventAfterRender:function( event, element, view ) { //function to render the id
				$(element).attr("id","event_"+event._id);
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end) {
                var startDate=moment(start).format('YYYY-MM-DD HH:mm:ss');
				var endDate=moment(end).format('YYYY-MM-DD HH:mm:ss');
				$('#create_project_event').modal('show');
				$('#create_project_event .modal-header h2').html('Create Event');
				$('#create_project_event .modal-body').html('Please wait loading...');				
				$.get('/project-plan/create-project-event?start='+startDate+'&end='+endDate,{quote_id:quote_id,contract_id: contract_id},function(data){
					$("#create_project_event .modal-body").html(data);
				});
			},
			eventClick: function(event) { //to open event modal					
				if (event.url) {
					var eve_url=event.url;
					
					$('#create_project_event').modal('show');
					$('#create_project_event .modal-header h2').html('Edit Event');					
					$('#create_project_event .modal-body').html('Please wait loading...');		
					$.get(eve_url,function(data){
						$("#create_project_event .modal-body").html(data);
					});
					return false;
				}
			},	
		});
    },
	initMissionFullCalendar: function(){
        $calendar = $('#missionCalendar');

        today = new Date();
        y = today.getFullYear();
        m = today.getMonth();
        d = today.getDate();

        $calendar.fullCalendar({
			header: {
				left: 'title',
				center: 'year,month,agendaWeek,listWeek,listDay',
				right: 'prev,next today'
			},
			locale: 'en',
			views: {
				listDay: { buttonText: 'List day' },
				listWeek: { buttonText: 'List week' }
				
			},
			defaultDate: today,//startDate,	
			businessHours:true,			
			editable: false,
			eventLimit: true,
			events: '/project-plan/mission-events?contract_id='+contract_id+'&mission_id='+mission_id+'&cmid='+cmid+'&type='+type,
			eventAfterRender:function( event, element, view ) { //function to render the id
				$(element).attr("id","event_"+event._id);
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end) {
                var startDate=moment(start).format('YYYY-MM-DD HH:mm:ss');
				var endDate=moment(end).format('YYYY-MM-DD HH:mm:ss');
				$('#create_project_event').modal('show');
				$('#create_project_event .modal-header h2').html('Create Event');
				$('#create_project_event .modal-body').html('Please wait loading...');				
				$.get('/project-plan/create-project-event?start='+startDate+'&end='+endDate,{quote_id:quote_id,contract_id: contract_id,mission_id:mission_id},function(data){
					$("#create_project_event .modal-body").html(data);
				});
			},
			eventClick: function(event) { //to open in new tab					
				if (event.url) {
					var eve_url=event.url;
					
					if(event.type=='custom')
					{
						$('#create_project_event').modal('show');
						$('#create_project_event .modal-header h2').html('Edit Event');					
						$('#create_project_event .modal-body').html('Please wait loading...');		
						$.get(eve_url,function(data){
							$("#create_project_event .modal-body").html(data);
						});
					}
					else if(event.type=='pause')
					{
						$('#create_project_event').modal('show');
						$('#create_project_event .modal-header h2').html('Pause Mission');					
						$('#create_project_event .modal-body').html('Please wait loading...');		
						$.get(eve_url,function(data){
							$("#create_project_event .modal-body").html(data);
						});
					}
					else
					{
						window.open(eve_url,'taskview');
					}
					return false;
				}
			},	
		});
    },
	destroyCalendar: function(){
        $calendar = $('#fullCalendar');
		$calendar.fullCalendar('destroy');	
	},
	/*share calendar to google*/
	shareCalendar:function(contract_id,share_event_id){
		var missionType='';
		var contractMissionId='';
		
		$('#create_project_event .modal-body').html('');
        $('#create_project_event .modal-title').html('');
		if (typeof(type) != 'undefined') {
			missionType=type
		}
		if (typeof(cmid) != 'undefined') {
			contractMissionId=cmid
		}
		
		$('#create_project_event').modal('show');
		$('#create_project_event .modal-header h2').html('Share Calendar');
		$('#create_project_event .modal-body').html('<div class="text-center"><img src="/BO/theme/lbd/img/googlecalendar.gif"></div>');
		$.get('/project-plan/share-calendar',{'calendar':'google',contract_id:contract_id,share_event_id:share_event_id,mission_id:share_event_id,type:missionType,cmid:contractMissionId },function(data){
			 setTimeout(function (){

             $("#create_project_event .modal-body").html(data);

			}, 5000); 
			
		});
	},
	/*create new event*/
	createProjectEvent:function(contract_id,mission_id){
		$('#create_project_event').modal('show');
		$('#create_project_event .modal-header h2').html('Create Event');
		$('#create_project_event .modal-body').html('Please wait loading...');				
		$.get('/project-plan/create-project-event',{quote_id:quote_id,contract_id: contract_id,mission_id:mission_id},function(data){
			$("#create_project_event .modal-body").html(data);
		});		
	},
	/*Delete event*/
	deleteProjectEvent:function(event_id){
		swal({
			  title: 'Are you sure?',
			  text: "Do you want to delete this event ?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: false
			},function(){
				$.post("/project-plan/delete-project-event",{'event_id':event_id},function(result){
				});
				swal({
					title: "Deleted!",
					text: "Event has been deleted.",
					type:  "success"
				},function(){
					 location.reload();
				})				  
			});
		
	}	

}	

function mission_action(val,cmid,mid,type)
{
	var option = val;
	var cmid = cmid;//$(this).closest("select").attr("rel");
	var mid = mid;//$(this).closest("select").attr("id");
	var cid=contract_id;
	if(option=="delete")
	{
		
		swal({
			  title: 'Are you sure?',
			  text: "Do you want to delete this mission ?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, delete it!",
			  closeOnConfirm: false
			},function(){
				$.post("/contractmission/delete-mission",{'mission_id':mid,'cmid':cmid, 'cid':cid, 'maction':"delete",'type':type},function(result){
				});
				swal({
					title: "Deleted!",
					text: "Mission has been deleted.",
					type:  "success"
				},function(){
					 location.reload();
				})				  
			});
		
	}
	else if(option=="close")
	{
		
		swal({
			  title: 'Are you sure?',
			  text: "Do you want to close this mission ?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Yes, close it!",
			  closeOnConfirm: false
			},function(){
				$.post("/contractmission/close-mission",{'mission_id':mid,'cmid':cmid, 'contract_id':cid, 'maction':"close",'type':type},function(result){
				});
				swal({
					title: "Closed!",
					text: "Mission has been closed.",
					type:  "success"
				},function(){
					 location.reload();
				})				  
			});
		
	}
	else if(option=="freeze")
	{
		$('#freeze_mission').modal('show');
		$('#freeze_mission .modal-header h3').html('Freeze Mission');
		$('#freeze_mission .modal-body').html('Please wait loading...');
		$.post('/contractmission/freeze-mission',{'mid':mid,"cmid":cmid,'type':type,'cid':cid },function(data){
			$("#freeze_mission .modal-body").html(data);
		});
	}
	else if(option=="resume")
	{
		$('#edit_mission').modal('hide');
		$('#edit_mission .modal-body').html('');
		setTimeout(function()
		{
			$('#pause_mission').modal('show');
			$('#pause_mission .modal-title').html('Resume Mission');
			$('#pause_mission .modal-body').html('Please wait loading...');
			$.post('/contractmission/pause-mission',{'mid':mid,"cmid":cmid,'type':type,'cid':cid,'resume':'yes'},function(data){
				$("#pause_mission .modal-body").html(data);
			});
			
		},300);
	}
	else if(option=="pause" || option=="pausecomment" || option=="delay")
	{

		$('#edit_mission').modal('hide');				
		$('#edit_mission .modal-body').html('');
		
		$('#create_project_event').modal('hide');				
		$('#create_project_event .modal-body').html('');
		
		setTimeout(function()
		{
			$('#pause_mission').modal('show');
			$('#pause_mission .modal-title').html('Pause Mission');
			$('#pause_mission .modal-body').html('Please wait loading...');
			if(option=="pausecomment")
			{
				$.post('/contractmission/pause-mission',{'mid':mid,"cmid":cmid,'type':type,'cid':cid,'pausecomment':'yes' },function(data){
					$("#pause_mission .modal-body").html(data);
				});
			}
			else if(option=="delay")
			{
				 $('#pause_mission .modal-title').html('Delay Mission');
				 $('#pause_mission .modal-body').html('Please wait loading...');
				$.post('/contractmission/pause-mission',{'mid':mid,"cmid":cmid,'type':type,'cid':cid,'delay':'yes' },function(data){
					$("#pause_mission .modal-body").html(data);
				});
			}
			else
			{
				$.post('/contractmission/pause-mission',{'mid':mid,"cmid":cmid,'type':type,'cid':cid },function(data){
					$("#pause_mission .modal-body").html(data);
				});
			}
		},500);
	}
	else if(option=="add")
	{
		$('#edit_mission .modal-body').html('');
		$('#edit_mission .modal-title').html('');
		$('#create_project_event').modal('hide');				
		$('#create_project_event .modal-body').html('');
		
		
			$('#edit_mission').modal('show');
			$('#edit_mission .modal-body').html('Please wait loading...');

			$.get('/contractmission/add-mission',{"reqaction":"add","cmid":cmid,'mid':mid,'contract_id':contract_id,'type':type},function(data){

				$("#edit_mission .modal-body").html(data);
				$('#edit_mission .modal-title').html('Add Mission');
			});
			
		 
	}
	else if(option=="edit" || option=="edit_delivery")
	{
		$('#edit_mission .modal-body').html('');
		$('#edit_mission .modal-title').html('');
		$('#create_project_event .modal-body').html('');		
		$('#create_project_event .modal-body').html('');

		if(option=="edit_delivery")
			delivery="?delivery=1";
		else
			delivery='';
		//alert(delivery);
		$('#edit_mission').modal('show');
		$('#edit_mission .modal-body').html('Please wait loading...');

		
		$.post('/contractmission/add-mission'+delivery,{"reqaction":"edit","cmid":cmid,'mid':mid,'contract_id':contract_id,'type':type},function(data){
			 $("#edit_mission .modal-body").html(data);
		});
	}
}
//calculate total internal cost and total delivery
function fnCalTotalCosts(type)
{
	if(type=='')
		type='';

	var total_price_contract = 7950;
	var total_internalcost=0;
	var total_unitprice=0;
	var total_price = parseFloat(total_price_contract);
	var actual_turnover = parseFloat($("#actual_mission_turnover").val());
	var volume= parseFloat($("#volume").val().replace(",","."));
	var nb_words=$("#nb_words_1").val();
	if(isNaN(volume))
		volume=1;
	var internalcost=parseFloat($("#writer_cost").val().replace(",","."))+parseFloat($("#corrector_cost").val().replace(",","."));

	if(isNaN(internalcost))
		internalcost=0.00;

	margin_percentage = parseFloat($("#margin_percentage").val().replace(",","."));

	
		var unit_price=(internalcost/(1-margin_percentage/100));
		unit_price=unit_price.toFixed(5);	
	
	var packageval = $("#package").val();
	//alert(volume+'=='+internalcost+'--'+margin_percentage)
	if($.isNumeric(unit_price))
	{
		if(packageval=="team")
		{
			$(".fpack").hide();
			$(".fpackteam").show();
			var team_ca = parseFloat($("#team_packs").val())*parseFloat($("#team_fee").val());
			var turnover =(volume*unit_price+team_ca).toFixed(2);
		}
		else if(packageval=="user")
		{
			$(".fpack").hide();
			$(".fpackuser").show();
			var turnover =(parseFloat($("#user_fee").val())).toFixed(2);
		}
		else
		{
			$(".fpack").hide();
			var turnover =(volume*unit_price).toFixed(2);
		}
	
	//added w.r.t price diminish
	/* $("#cost_diminish_"+mission_id).attr('data-price',unit_price);
	$("#cost_diminish_"+mission_id).val(0); */
	
		
		if($("[name='free_mission']:checked").val()=="yes")
		{
			turnover = 0;
			var turnover_text= 0;
		}
		else
		{
			var turnover_text=turnover.replace(".",",");
		}
		//var unit_price_text=unit_price.replace(".",",");
		
			if(type!='total' || $("[name='free_mission']:checked").val()=="yes" )
			$("#mission_turnover").val(turnover);
			//$("#mission_turnover_text").html("<b>"+turnover_text+"</b>");
			if(type!='unit')
				$("#unit_price").val(unit_price);
			
			var price_per_word=(unit_price/nb_words).toFixed(4);
			if(type!='word')
				$("#price_per_word").val(price_per_word);

			$("#internalcost").val(internalcost);
			//$("#unit_price_text").html("<b>"+unit_price_text+"</b>");
		
		if($("#reqaction").val()=="add")
		{
			total_price += parseFloat(turnover);
		}
		else
		{
			//console.log(total_price);
			//console.log(actual_turnover);
			//console.log(turnover);
			total_price = total_price - actual_turnover;
			total_price += parseFloat(turnover); 
		}
		//console.log(total_price);
		var total_price_text=total_price.toFixed(2);	
		total_price_text=total_price_text.replace(".",",");
		if($.isNumeric(total_price))
		{
			$("#total_turnover").val(total_price);
			$("#total_turnover_text").html("<b>"+total_price_text+"</b>");	
		}

	}
		
}