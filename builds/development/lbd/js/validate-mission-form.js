searchVisible = 0;
transparent = true;

$(document).ready(function(){
	
	$.validator.setDefaults({ignore: ".hidden:not(.chosen-select)" });

			$validator= $("#create_quote_mission").validate({
				
				submitHandler : function(form) {
		        form.submit();
				},
				
				rules: {
					team:  { required:function () {
							      if (($("#team").val())=='') {
				                       return true;
				                   }
				               }  
				               },
					language:  { required:function () {
				                   if (($("#language").val())=='') {
				                       return true;
				                   }
				               }  
				               },
					product:  { required:function(element) {
										if (($("#product").val())=='') {
				                       return true;
				                   } 
										}   },
					languagedest:  { required:function(element) {
											if((($("#languagedest").val())==($("#language").val())) || ($("#languagedest").val())=='' )
													return true;
										} 
									},
					producttype:  { required:function(element) {
										if (($("#producttype").val())=='') {
				                       return true;
				                   } 
										}  },
					otherproducttype:{ required:function(element) {
										return $('#producttype').val()=='autre';
									} }	,
					producttypeother:  { required:function(element) {
										return $('#otherproducttype').val()=='0';
									} },			
		          	nb_words: 
		          	{
							required : true,
							number: true,
							min: $('#nb_words').attr('min'),
							max: $('#nb_words').attr('max')
					},
					mission_length:{
							required : true,
							number: true
						},
					tech_mission_length:{
							required : true,
							number: true
						},
					
					volume:{
							required : true,
							number: true
						},
					
					tempo_length:{
							required : true,
							number: true
						},
					tech_tempo_length:{
							required : true,
							number: true
						},
					volume_max:{
							required : true,
							number: true
						},
					tech_volume_max:{
							required : true,
							number: true
						},
					prodmissionslist:{
							required:function(element) {
										return $('#prod_mission_selected').val()=='Yes';
									} 
							},
					strategy_mission_cost:{
							required:function(element) {
										return $('#product:checked').val()=='content_strategy';
									} ,
							number: function(element) {
										return $('#product:checked').val()=='content_strategy';
									}
							}
					
							
				},
				messages: {
					team:{ required: "Please select the team" },
					language: { required: "Please select the language" },
					product: { required: "Please select the type" },
					languagedest: { required: "Please select the language2" },
					producttype: { required : "Please select the Product" },
					nb_words: {
						required: "Please enter the words"
						},
					tech_mission_length:{
						required:  "Please enter the duration"},
					mission_length: {
						required:  "Please enter the duration"},
					mission_cost: {
						required:  "Please enter the Cost"},
					volume: {
						required:  "Please enter the volume"
						},
					tempo_length:{
						required:  "Please enter the tempo length"
						},
					tech_tempo_length:{
						required:  "Please enter the tempo length"
						},
					volume_max:{
						required: "Please enter the Volume max"
						},
					tech_volume_max:{
						required: "Please enter the Volume max"
						},
					prodmissionslist:{
						required: "Please select a prod mission"
						},
					strategy_mission_cost:{
						required: "Enter the mission cost"
					},
					otherproducttype:{
						required: "Please select the other product"	
					},
					producttypeother:{
						required: "Please enter the text"
					}
				},		
				  debug: true,
				  errorClass:'has-error error',
				  validClass:'success',
				  errorElement:'div',
				  errorPlacement: function (error, element) {
    		        var name = $(element).attr("name");
	        	    var $obj = $("#" + name + "_validate");
	        	    if($obj.length){
           			 error.appendTo($obj);
		       		}
		        	else {
		            error.insertAfter(element);
		       		 }
        		  },
				  highlight: function (element, errorClass, validClass) { 
					$(element).parents("div.form-group").addClass(errorClass).removeClass(validClass); 

				  }, 
				  unhighlight: function (element, errorClass, validClass) { 
						  $(element).parents(".error").removeClass(errorClass).addClass(validClass); 
				  },
				 
				  
				  //validate choosen select (select with search)
		           //ignore: ":hidden:not(select)" 
		           //ignore: ':hidden:not(.chzn-done)'
		           //  ignore: '*:not([name])'		
			     
			});
				

});

