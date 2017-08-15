$(document).ready(function(){

			var quote_id=$('#quote_id').val();
			var porduct_length=$('#product_1 option').length;
					
						$('#newMissionStep0Btn').on('click',function(){

							$(this).html('Please wait..');

							

							if(quote_id)
							{
								mentionComments.bousersInmention();
								mentionComments.mentionhashtag(quote_id);
								$("textarea").hashtags();
							}

							$('.fulltoptitle').removeClass('hidden');
							$('.modal-title').html('Edit Mission');

										$('#newMissionStep2').removeClass('show');
						 	 			$('#newMissionStep0').removeClass('show');
						 	 			$(this).html('Edit');
						                $('#newMissionStep1').addClass('show animated bounceInRight');
						                $('#edit_details').removeClass('hidden');
						                $('.modalFullStep1').addClass('modalFullStepActive');
						                $('.modalFullStep2').removeClass('modalFullStepActive');
						                $('.modalFullStep3').removeClass('modalFullStepActive');
						                $('.modalFullStep4').removeClass('modalFullStepActive');
						                $('.modalFullStep5').removeClass('modalFullStepActive');

						});

					 $('#newMissionStep1Btn').on('click',function(){

					 			$('.has-error').remove();

					 			if($('#team option:selected').val()=='editorial')
					 			{
						 			var language_1_new=$('#language_1 option:selected').val();
						 			if(language_1_new=='')
						 			{
						 				$('#language_1').parent('div').append('<div id="languange-error" class="has-error error">Please select the languange </div>');
						 			}

						 			var product_new=$('#product_1 option:selected').val();
						 			if(product_new=='')
						 			{
						 				$('#product_1').parent('div').append('<div id="product-error" class="has-error error">Please select the type</div>');
						 			}
						 			else if(product_new=='translation')
						 			{
						 				var languagedest_1_new=$('#languagedest_1 option:selected').val();

						 				if(languagedest_1_new=='')
						 				{
						 					$('#languagedest_1').parent('div').append('<div id="languagedest_1-error" class="has-error error">Please select the languange2 </div>');
						 				}
						 				else if(language_1_new==languagedest_1_new)
						 				{
						 					$('#languagedest_1').parent('div').append('<div id="languagedest_1-error" class="has-error error">Please select the different languange </div>');	
						 					return false;					 				}
						 			}
						 			else if(product_new=='editorical')
						 			{
						 				$('#working_days').closest('.form-group').addClass('hidden');
						 			}

						 			var producttype_1_new=$('#producttype_1 option:selected').val();
						 			if(producttype_1_new=='')
						 			{
						 				$('#producttype_1').parent('div').append('<div id="producttype-error" class="has-error error">Please select the product type</div>');
						 			}

						 			

					 			}
					 			else if($('#team option:selected').val()=='services' || $('#team option:selected').val()=='crea')
					 			{
					 				var producttype_1_new=$('#tech_title option:selected').val();
						 			if(producttype_1_new=='')
						 			{
						 				$('#tech_title_1').parent('div').append('<div id="tech_title-error" class="has-error error">Please select the product type</div>');
						 			}
						 			

						 			var language_1_new=$('#language_1 option:selected').val();
						 			if(language_1_new=='')
						 			{
						 				$('#language_1').parent('div').append('<div id="languange-error" class="has-error error">Please select the languange </div>');
						 			}

						 			
					 			}


					 			var valid = $("#addmission").validationEngine('validate');	

					 				if(valid == true)
					 				{
					 					if($('#reqaction').val()=='add')
						 				{
							 				$('#add_details').removeClass('hidden');
							 				addmissiontitleupdate();
							 				$('#mission_duration').addClass('hidden');
						 				}

						 				$('#newMissionStep3').removeClass('show');
						 	 			$('#newMissionStep1').removeClass('show');
						                $('#newMissionStep2').addClass('show animated bounceInRight');

						                $('.modalFullStep2').addClass('modalFullStepActive');
						                $('.modalFullStep1').removeClass('modalFullStepActive');
						                $('.modalFullStep3').removeClass('modalFullStepActive');
						                $('.modalFullStep4').removeClass('modalFullStepActive');
						                $('.modalFullStep5').removeClass('modalFullStepActive');
						            }
					 });

					 $('#newMissionStep2Btn').on('click',function(){

					 			var valid = $("#addmission").validationEngine('validate');

					 				if($(this).attr('disabled')=='disabled')
					               {
					                
					                	$('#newMissionStep3').removeClass('show');
						 	 			$('#newMissionStep1').removeClass('show');
						                $('#newMissionStep2').addClass('show animated bounceInRight');

						                $('.modalFullStep2').addClass('modalFullStepActive');
						                $('.modalFullStep1').removeClass('modalFullStepActive');
						                $('.modalFullStep3').removeClass('modalFullStepActive');
						                $('.modalFullStep4').removeClass('modalFullStepActive');
						                $('.modalFullStep5').removeClass('modalFullStepActive');
					               }
					               else
					               {			 			

					 				if(valid == true)
					 				{
					 					if($('#reqaction').val()=='add')
						 					{
								 				$('#add_details').removeClass('hidden');
								 				addmissiontitleupdate();
								 				$('#mission_duration').removeClass('hidden');
						 					}

					 					if($('#team option:selected').val()=='editorial' && $('#producttype_1').val())
					 					{

					 						var product_new=$('#product_1 option:selected').val();
					 						var language_1_new=$('#language_1 option:selected').val();
					 						var languagedest_1_new=$('#languagedest_1 option:selected').val();
					 						var producttype_1_new=$('#producttype_1 option:selected').val();
					 						var nb_words=$('#nb_words_1').val();
					 						var volume=$('#volume').val();
					 						var client_id=$('#mclient_id').val();
					 						var mcurrency=$('#mcurrency').val();
					 						var conversion=$('#conversion').val();
					 						var selected_mission=$('#sales_suggested_missions').val();
					 						var showtheorical=$('#showtheorical_val').val();
					 						

					 						 $.get('/contractmission/get-hoq-prices',
					 						 	{"product":product_new,'showtheorical':showtheorical,'selected_mission':selected_mission,'language':language_1_new,'volume':volume,'conversion':conversion,'client_id':client_id,'currency':mcurrency,'languagedest':languagedest_1_new,'producttype':producttype_1_new,'nb_words':nb_words},
					 						 	function(data)
					 						 {
					 						 	if(data=='')
					 						 	{
					 						 		$('#history_deals').html("<h3>No History Deals</h3>");
					 						 	}
					 						 	else
					 						 	{
					 						 		$('#history_deals').html(data);
					 						 	}
							                   
							                });

					 						 $('#newMissionStep4').removeClass('show');
							 	 			$('#newMissionStep2').removeClass('show');
							                $('#newMissionStep3').addClass('show animated bounceInRight');

							                $('.modalFullStep3').addClass('modalFullStepActive');
							                $('.modalFullStep1').removeClass('modalFullStepActive');
							                $('.modalFullStep2').removeClass('modalFullStepActive');
							                $('.modalFullStep4').removeClass('modalFullStepActive');
							                $('.modalFullStep5').removeClass('modalFullStepActive');
					 					}
					 					else if(($("#reqaction").val()=='edit' || porduct_length=='6') && $('#team option:selected').val()=='services' )
					 					{
					 						//alert(2);
					 						 $('#newMissionStep4').removeClass('show');
							 	 			$('#newMissionStep2').removeClass('show');
							                $('#newMissionStep3').addClass('show animated bounceInRight');

							                $('.modalFullStep3').addClass('modalFullStepActive');
							                $('.modalFullStep1').removeClass('modalFullStepActive');
							                $('.modalFullStep2').removeClass('modalFullStepActive');
							                $('.modalFullStep4').removeClass('modalFullStepActive');
							                $('.modalFullStep5').removeClass('modalFullStepActive');
					 					}
					 					else
					 					{
					 						//alert(3);
					 						$('#newMissionStep3').removeClass('show');
							 	 			$('#newMissionStep2').removeClass('show');
							                $('#newMissionStep4').addClass('show animated bounceInRight');

							                $('.modalFullStep4').addClass('modalFullStepActive');
							                $('.modalFullStep1').removeClass('modalFullStepActive');
							                $('.modalFullStep3').removeClass('modalFullStepActive');
							                $('.modalFullStep2').removeClass('modalFullStepActive');
							                $('.modalFullStep5').removeClass('modalFullStepActive');
					 					}
						 				
						            } 
						         }   
					 });

					 $('#newMissionSte3Btn').on('click',function(){


					 			var valid = $("#addmission").validationEngine('validate');

					 				if(valid == true)
					 				{
					 					if($('#reqaction').val()=='add' && porduct_length=='6')
				 						{
				 							$(this).html('Please wait..');
											mentionComments.bousersInmention();
											mentionComments.mentionhashtag(quote_id);
											$("textarea").hashtags();
				 						}

						 				$('#newMissionStep5').removeClass('show');
						 	 			$('#newMissionStep3').removeClass('show');
						                $('#newMissionStep4').addClass('show animated bounceInRight');
						                $(this).html('Next')
						                $('.modalFullStep4').addClass('modalFullStepActive');
						                $('.modalFullStep1').removeClass('modalFullStepActive');
						                $('.modalFullStep3').removeClass('modalFullStepActive');
						                $('.modalFullStep2').removeClass('modalFullStepActive');
						                $('.modalFullStep5').removeClass('modalFullStepActive');
						            }    
					 });

					 $('#newMissionSte4Btn').on('click',function(){

					 			var valid = $("#addmission").validationEngine('validate');

					 				if($('#reqaction').val()=='add')
				 					{
						 				$('#add_details').removeClass('hidden');
						 				
						 				addmissiontitleupdate();
						 				$(this).html('Please wait..');
										mentionComments.bousersInmention();
										mentionComments.mentionhashtag(quote_id);
										$("textarea").hashtags();
							
				 					}

					 				if(valid == true)
					 				{
					 					

						 	 			$('#newMissionStep4').removeClass('show');
						                $('#newMissionStep5').addClass('show animated bounceInRight');
						                $(this).html('Next');
						                $('.modalFullStep5').addClass('modalFullStepActive');
						                $('.modalFullStep4').removeClass('modalFullStepActive');
						                $('.modalFullStep1').removeClass('modalFullStepActive');
						                $('.modalFullStep3').removeClass('modalFullStepActive');
						                $('.modalFullStep2').removeClass('modalFullStepActive');
						             }
					 });


					 $('#newMissionStep1BtnPrev').on('click',function(){

					 				if($('#reqaction').val()=='add')
						 			{
						 				$('#add_details').removeClass('hidden');
						 				addmissiontitleupdate();
						 			}

					 				$('#newMissionStep1').addClass('show animated bounceInRight');
					                $('#newMissionStep2').removeClass('show');

					                $('.modalFullStep2').removeClass('modalFullStepActive');
					                $('.modalFullStep1').addClass('modalFullStepActive');
					                $('.modalFullStep3').removeClass('modalFullStepActive');
					                $('.modalFullStep4').removeClass('modalFullStepActive');
					                $('.modalFullStep5').removeClass('modalFullStepActive');

					 });

					 $('#newMissionStep4BtnPrev').on('click',function(){

			 					$('#newMissionStep5').removeClass('show');
				 	 			$('#newMissionStep3').removeClass('show');
				                $('#newMissionStep4').addClass('show animated bounceInRight');

				                $('.modalFullStep4').addClass('modalFullStepActive');
				                $('.modalFullStep1').removeClass('modalFullStepActive');
				                $('.modalFullStep3').removeClass('modalFullStepActive');
				                $('.modalFullStep2').removeClass('modalFullStepActive');
				                $('.modalFullStep5').removeClass('modalFullStepActive');
						           
					 });

					 $('#newMissionStep3BtnPrev').on('click',function(){

					 		if(($('#team option:selected').val()=='editorial' && $('#producttype_1').val()) || $("#reqaction").val()=='edit')
					 		{		
				 				$('#newMissionStep4').removeClass('show');
				 	 			$('#newMissionStep2').removeClass('show');
				                $('#newMissionStep3').addClass('show animated bounceInRight');

				                $('.modalFullStep3').addClass('modalFullStepActive');
				                $('.modalFullStep1').removeClass('modalFullStepActive');
				                $('.modalFullStep2').removeClass('modalFullStepActive');
				                $('.modalFullStep4').removeClass('modalFullStepActive');
				                $('.modalFullStep5').removeClass('modalFullStepActive');
				            }
				            else
				            {
				            	$('#newMissionStep4').removeClass('show');
				 	 			$('#newMissionStep3').removeClass('show');
				                $('#newMissionStep2').addClass('show animated bounceInRight');

				                $('.modalFullStep2').addClass('modalFullStepActive');
				                $('.modalFullStep1').removeClass('modalFullStepActive');
				                $('.modalFullStep3').removeClass('modalFullStepActive');
				                $('.modalFullStep4').removeClass('modalFullStepActive');
				                $('.modalFullStep5').removeClass('modalFullStepActive');
				            }
						                
					 });

					 $('#newMissionStep2BtnPrev').on('click',function(){

			 				$('#newMissionStep3').removeClass('show');
			 	 			$('#newMissionStep1').removeClass('show');
			                $('#newMissionStep2').addClass('show animated bounceInRight');

			                $('.modalFullStep2').addClass('modalFullStepActive');
			                $('.modalFullStep1').removeClass('modalFullStepActive');
			                $('.modalFullStep3').removeClass('modalFullStepActive');
			                $('.modalFullStep4').removeClass('modalFullStepActive');
			                $('.modalFullStep5').removeClass('modalFullStepActive');
			           
					 });


					 $('#newMissionStep0BtnPrev').on('click',function(){

					 	$('.fulltoptitle').addClass('hidden');
					 	$('.modal-title').html($('#Mission_name').text());
					 	

			 				$('#newMissionStep3').removeClass('show');
			 	 			$('#newMissionStep1').removeClass('show');
			                $('#newMissionStep0').addClass('show animated bounceInRight');
			                $('#edit_details').addClass('hidden');
			                $('.modalFullStep1').addClass('modalFullStepActive');
			                $('.modalFullStep2').removeClass('modalFullStepActive');
			                $('.modalFullStep3').removeClass('modalFullStepActive');
			                $('.modalFullStep4').removeClass('modalFullStepActive');
			                $('.modalFullStep5').removeClass('modalFullStepActive');
			           
					 });




	 $(document).on('change','.prod_mission_selected', function (event) {	
		var value=this.value;
		if(value=='no')
		{
			$(".prod_mission_linked").addClass('hidden');
		}
		else
		{	
			$('.prod_mission_linked').removeClass('hidden');
			$("#prodmissionslist").chosen({ allow_single_deselect: false,search_contains: true});
			$("#prodmissionslist").removeClass('hidden');
			$("#prodmissionslist_chosen").css("width","267px");
		}
	});

	 /*language Staff calculation*/
	$(document).on('change','#language_1,#languagedest_1',function()
	 {
	 	var team= $('#team').val();
	 	var langval=$(this).val();
	 	if(langval && team=='editorial')
	 	{
	 		$.get('/contractmission/get-staff-details',
				{"language":langval},
				function(data){
					if(data)
					$('#staff_time').val(data.trim());

				});
		}
	
	 });


	 /*change missin turnover update other field*/
		$(document).on('change keyup keypress',"#mission_turnover",function(){

			var turnover=parseFloat($(this).val().replace(",","."));

			var free_mission_val=$("input[type='radio'][name='free_mission']:checked").val();


				if(free_mission_val=='yes')
				{
					$(this).val('0');
					turnover=0;
				}

			if($.isNumeric(turnover) && $("#producttype_1 option:selected").val() && $('#team option:selected').val()=='editorial' && free_mission_val!='yes')
			{
				

				var volume=$("#volume").val();
				var internalcost=$('#internalcost').val();

				var price_per_article=round5num(turnover/volume);

				//alert(price_per_article);
				if($.isNumeric(price_per_article))
				{	
					if(Math.floor(price_per_article) == price_per_article)
						$("#unit_price").val(price_per_article);
					else
						$("#unit_price").val(price_per_article);
				}
				
				/*var price_per_word=(price_per_article/nb_words).toFixed(4);
				$("#price_per_word").val(price_per_word);*/
				
				var margin=(internalcost * 100)/(price_per_article);
				var marginval=100-margin;
				if($.isNumeric(marginval))
				{
					if(Math.floor(marginval) == marginval)
						$("#margin_percentage").val(marginval);
					else
						$("#margin_percentage").val(marginval);
				}


				setTimeout(function(){ fnCalTotalCosts('total'); }, 800);

			}
			
		});

		
		$(document).on('change keyup keypress',"#unit_price",function(){

			unitprice=parseFloat($(this).val().replace(",","."));
			if($.isNumeric(unitprice) && $("#producttype_1 option:selected").val() && $('#team option:selected').val()=='editorial')
			{
								
				var volume=$("#volume").val();
				var nb_wrods=$('#nb_words_1').val();
				var internalcost=$('#internalcost').val();

				var price_per_article=unitprice;
				/*var price_per_word=(price_per_article/nb_words).toFixed(4);
				$("#price_per_word").val(price_per_word);*/
				var margin=(internalcost * 100)/(price_per_article);
				var marginval=100-margin;


				if($.isNumeric(marginval))
				{
					if(Math.floor(marginval) == marginval)
						$("#margin_percentage").val(marginval);
					else
						$("#margin_percentage").val(marginval);	
				}

				/*var price_info=(volume*price_per_article).toFixed(2);
				$("#mission_turnover").val(price_info);*/

				setTimeout(function(){ fnCalTotalCosts('unit'); }, 800);
				
			}
			
		});

		$(document).on('change keyup keypress',"#working_days",function()
		{
			
			tech_product=$('#tech_product option:selected').val();
			if(!tech_product)
				tech_product=$('#product_1 option:selected').val();
				
				//alert(tech_product);

			if(tech_product=='sales' || tech_product=='seo' || tech_product=='superadmin')
			{
				var working_days=parseInt($(this).val());
				var minval=$('#working_days').attr('data-config');
				var internalcost=parseFloat($("#working_days").attr('data-default-cost'));

				$('#mission_length_1').removeClass();
				$('#mission_length_1').attr('class',"form-control validate[required,minWriters["+working_days+"]]");
				
				var internalvaluate=internalcost/parseFloat(minval);
				internal_val=internalvaluate*working_days;

				$("#internalcost").val(internal_val);

				if($('#tech_product option:selected').val())
					technewcaltotal('');
				else	
					techtotalcal('');
			}

		});


		$(document).on('change keyup keypress',"#price_per_word",function(){

			price_per_word=parseFloat($(this).val().replace(",","."));
			if($.isNumeric(price_per_word) && $("#producttype_1 option:selected").val() && $('#team option:selected').val()=='editorial')
			{
								
				var volume=$("#volume").val();
				var nb_wrods=$('#nb_words_1').val();
				var internalcost=$('#internalcost').val();

				var price_per_article=round5num(nb_wrods*price_per_word);
				
				if($.isNumeric(price_per_article))
				{
					if(Math.floor(price_per_article) == price_per_article)
						$("#unit_price").val(price_per_article);
					else
						$("#unit_price").val(price_per_article);
				}

				var margin=(internalcost * 100)/(price_per_article);
				var marginval=100-margin;

				if($.isNumeric(marginval))
				{
					if(Math.floor(marginval) == marginval)
						$("#margin_percentage").val(marginval);
					else
						$("#margin_percentage").val(marginval);
				}	

				/*var price_info=(volume*price_per_article).toFixed(2);
				$("#mission_turnover").val(price_info);*/

				setTimeout(function(){ fnCalTotalCosts('word'); }, 800);
				
			}
			
		});

		$(document).on('change keyup keypress',"#prod_mission_writing_staff",function(){

			var requied_writer=$(this).val();
			volume=$("#volume").val();
			nbwords=$("#nb_words_1").val();

			configprod=$("#producttype_1 option:selected").attr("configwords");

			prodval=$("#producttype_1 option:selected").val();

			durationVal=Math.ceil((nbwords*volume)/(requied_writer*configprod));

			if(durationVal<0)
				durationVal=1

			if(prodval!='autre')
			$('#mission_length_1').val(durationVal);

				change_enddate();

		});


		$('#mission_length_1').on('change keyup keypress',function(){

			var oneshot=$("input:radio[name=oneshot]:checked").val();

			if(oneshot=='no')
				{
					$('#volume_max_1').val('');
					$('#tempo_length_1').val('');
					$('#tempo_type_1').val('fix');
					$('#delivery_volume_option_1').val('every');
					
					$("#tempo_type_1,#delivery_volume_option_1").trigger("chosen:updated");
				}
		
		});
		


});


function fnEditorialtotech(element)
{
	var team=element.value;

	if(team=='services')
	{
		$('.prod_mission_deatils').addClass('hidden');
		$('.tech_mission').removeClass('hidden');
		$("#tech_product option[value='superadmin']").attr('disabled', false);
		$("#tech_product option[value='sales']").attr('disabled', false);
		$("#tech_product option[value='seo']").attr('disabled', false);
		$("#tech_product option[value='multimedia']").attr('disabled', true);
		$('#tech_product').val('');
		$('#tech_product').trigger("chosen:updated");
		$("#tech_product_chosen").removeClass('hidden');
	}
	else if(team=='crea')
	{
		$('.prod_mission_deatils').addClass('hidden');
		$('.tech_mission').removeClass('hidden');
		$('#tech_product').val('');
		$("#tech_product option[value='superadmin']").attr('disabled', true);
		$("#tech_product option[value='sales']").attr('disabled', true);
		$("#tech_product option[value='seo']").attr('disabled', true);
		$("#tech_product option[value='multimedia']").attr('disabled', false);	
          $('#tech_product').trigger("chosen:updated");
		$("#tech_product_chosen").removeClass('hidden');
	}
	else
	{
		$('.prod_mission_deatils').removeClass('hidden');
		$('.tech_mission').addClass('hidden');
	}
}

/*getting tech titles based on tech type*/
function techtitlelist(title_type,tech_title_id)
{
    var param="";
    var type=title_type;
    
    var team=$('#team').val();
    var tech_product= $('#tech_product').html();
       
        $('#tech_title').val('');
         if(tech_title_id)
            param="&typeid="+tech_title_id;

         var target_page = "/quote-new/tech-title-select?tech_type="+type+param;    

            $.post(target_page, function(data){   

                    var select = $('#tech_title');

                                         
                            select.empty().html(data);
                            $('#tech_title').trigger("chosen:updated");

                            if($('#tech_product option:selected').val()=='integration')
						 				$('#working_days').closest('div.form-group').addClass('hidden');
						 			else
						 				$('#working_days').closest('div.form-group').removeClass('hidden');
                });

            
   
}

/*getting tech details*/
function techtitleDetails(tech,from)
	{


		 $('#addmission').attr('action', '/contractmission/save-tech-mission');
		
		techval=tech;
		title=$('#tech_title option:selected').text();
		if(title)
		{
			$("#tech_type").val(title);
		}
		else
		{
			$("#tech_type").val($('#producttype_1_chosen').find('a span').text());
		}
		
		
		
		$("#tech_type").attr('rel',techval);

			var target_page = "/contractmission/tech-delivery-mission?title_id="+techval;
			 
		$.post(target_page, function(data){	

			//alert(data);
			
				var missionlen=data.split('-');	
				type=missionlen[3].trim();
				if(type=='multimedia')
				{
					$("input[type='radio'][name='oneshot']").each(function(){
			        if($(this).val() == 'no')
			        {
			        	$(this).attr("disabled", true);	
			        }
		   		 });
					if(from=="")
					{
						$("#volume").val(missionlen[5].trim());
						$("#mission_length_1").val(parseInt(missionlen[0].trim()));
						$("#working_days").val(missionlen[4].trim()); 
						$("#internalcost").val(missionlen[2].trim()); 
					}

					$("#volume").attr('data-thesholdvolume',missionlen[5].trim());  	

					if($("#mission_length_1").attr('data-usertype')!='superadmin')
						$("#mission_length_1").attr('readonly',true);

					

					$("#mission_length_1").attr('data-days',missionlen[0].trim());

					$("#working_days").closest('.form-group').addClass('hidden');
	                $("#working_days").attr('data-work',missionlen[4].trim());  
				}
				else
				{
					if($("#mission_length_1").val()=='')
					$("#mission_length_1").val(parseInt(missionlen[0].trim()));

					$("#mission_length_option_1").val(missionlen[1].trim());

					if(from=="")
					{
						

						$("#internalcost").val(missionlen[2].trim());
					}

					if($('#working_days').val()=="")
	                {
	               	 $("#working_days").val(missionlen[0].trim());  
	                }
	               

	                
	                $("#working_days").attr('data-default-cost',missionlen[2].trim());
	                $("#working_days").attr('data-config',missionlen[0].trim());

	                if(type!='edito' && type!='integration' && $('#working_days').val()=="")
	                {
	                	
	                	$("#mission_length_1").attr('min',missionlen[0].trim());
	                 	
	                }
	                else if(type=='edito' || type=='integration')
	                {
	                	$("#mission_length_1").attr('min','1');
	                	$("#working_days").closest('div.form-group').addClass('hidden');
	                }
	            }
	                
					
				if(from=="")
				{	
					if(type=='sales' || type=='multimedia')
					{
						$("#margin_percentage").val(0.00);
					}
					else
					{
						$("#margin_percentage").val(60.00000);			
					}
				

					volume=parseInt($('#volume').val());
					internalcost=parseFloat($("#internalcost").val());
					//alert(internalcost);
					margin_percentage=parseFloat($("#margin_percentage").val());

					var unit_price=(internalcost/(1-margin_percentage/100)).toFixed(5);

					

					$("#unit_price").val(unit_price);
					var free_mission =$('input[name=free_mission]:checked').val();
								
					if(free_mission=='yes')
					{
						var turnover =0;
					}	
					else
					{
						if(type=='multimedia')
						{
							theshold=parseInt($("#volume").attr('data-thesholdvolume'));  
							range=Math.ceil(volume/theshold);
							var turnover =(range*unit_price).toFixed(2)
						}
						else
							var turnover =(volume*unit_price).toFixed(2);
					}
					
					var turnover_text=turnover.replace(".",",");
					$("#mission_turnover").val(turnover);
					$("#mission_turnover_text").html("<b>"+turnover_text+"</b>");
					total_turnover_org=$("#total_turnover_org").val();
					total_turnover=parseFloat(total_turnover_org)+parseFloat(turnover);
					$("#total_turnover").val(total_turnover);
					var total_turnover_text =total_turnover.toFixed(2)
					$('#total_turnover_text').text(total_turnover_text);
				}

				if(type!='multimedia')
					techoneshotVolume('change');
		});
	}	




function techoneshotVolume(status)
{		
		/*var current_id = $(this).attr("id");
		var current_details = (current_id).split("_");*/

		var oneshotval= $("input:radio[name=oneshot]:checked").val();
		var producttype=$('#producttype_1').find(":selected").attr('assign');
		if(oneshotval=='no')
		{
			if(producttype!='integration')
				//$('.moverightduration').addClass('hidden');		

			duration_missionval=parseInt($('#mission_length_1').val());
			totalvolumeval=$('#volume').val();
			volumeMax=$('#volume_max_1').val();
			tempotype=$('#tempo_type_1').val();
			deleveryvolumeoption=$('#delivery_volume_option_1').val();
			tempoLength=$('#tempo_length_1').val();
			tempoLengthoption=$('#tempo_length_option_1').val();
			$("body").find(".alert-danger").remove();
			
			if(tempoLengthoption=='days'){
				 tempo_callenth=tempoLength;
			}else if(tempoLengthoption=='week')	{
				tempo_callenth=tempoLength*7;
			}
			else if(tempoLengthoption=='month')	{
				tempo_callenth=tempoLength*30;
				}
			else if(tempoLengthoption=='year')	{
				tempo_callenth=tempoLength*365;
				}
				
			caltotval=Math.round((duration_missionval/tempo_callenth)*volumeMax);
			duration_missionval=Math.round((totalvolumeval)*tempo_callenth/volumeMax)

			if( producttype=='integration' )
			{
				
				if(status=='change' && $.isNumeric(caltotval) && caltotval!=0)
				{
					
					$('#volume').val(caltotval);
					totalvolumeval=$('#volume').val();	
				}
			
				if(caltotval!=totalvolumeval && $.isNumeric(caltotval))
				{
						$(document).find('#tempo_details').after("<div class='alert-danger span10' style='padding:0 5px;float:right;'>Le tempo indiqu&#233; ne correspond pas au volume et &#224; la  dur&#233;e de la mission</div>");
								volume_error = false;
						return false;						
				}
				else volume_error = true;

			}
			else
			{
				if($.isNumeric(duration_missionval))
                  $('#mission_length_1').val(duration_missionval);
			}
						
							
		}
		else
		{
			$('.moverightduration').removeClass('hidden');	
		}

		return true;
	}


function round5num(number)
{
	return Math.round(number*100000)/100000;
}


function technewcaltotal(type)
{
	//alert(type)
	var volume=parseInt($('#volume').val());
	var tech_product=$('#tech_product option:selected').val();

			

		if(tech_product=='sales' || tech_product=='seo' || tech_product=='superadmin' )
		{
			if($('#working_days').val())
				var working=$('#working_days').val();
			

			var working_days=parseFloat($("#working_days").attr('data-config'));
			var default_cost=parseFloat($("#working_days").attr('data-default-cost'));
			var internal_cost=default_cost/working_days;
			var cost=parseInt(working)*parseFloat(internal_cost);
			//alert(type+'  '+working+ ' '+working_days+" "+default_cost+' '+internal_cost +' cost'+ cost);
			if($.isNumeric(cost))
				$("#internalcost").val(cost);
			
		}
				
			var internalcost=parseFloat($("#internalcost").val());
		
			//alert(internalcost);
			var margin_percentage=parseFloat($("#margin_percentage").val());
				
					
					
						var unit_price=(internalcost/(1-margin_percentage/100)).toFixed(5);

						//alert(internalcost+' technewcaltotal '+ margin_percentage+' unit '+unit_price);	
						//alert(unit_price);
						if((type!='unit' || type=='')  && !isNaN(unit_price))
							$("#unit_price").val(unit_price);
					
					//$("#unit_price_text").text(unit_price)
					var free_mission=$('[name=free_mission]:checked').val();
					if(free_mission=='yes')
					{
						var turnover =0;
						var turnover_text=0.00;	
					}
					else
					{
						if(tech_product=='multimedia')
						{
							var thesholdvolume=parseInt($("#volume").attr('data-thesholdvolume'));
							var range=Math.ceil(volume/thesholdvolume);
							var turnover =(range*unit_price).toFixed(2);
						}
						else
							var turnover =(volume*unit_price).toFixed(2);

						var turnover_text=turnover.replace(".",",");
					}
					//alert(turnover);
					if(!isNaN(turnover) && (type!='total' || type=='' ) )	
					{
					$("#mission_turnover").val(turnover);
					$("#mission_turnover_text").html("<b>"+turnover_text+"</b>");
					}

					var total_turnover_org=parseFloat($("#total_turnover_org").val());
					//alert(total_turnover_org);
							if($("#reqaction").val()=="add")
							{
								total_turnover_org += parseFloat(turnover);

							}
							
						
					//alert(total_turnover_org)
					$("#total_turnover").val(total_turnover_org);
					var total_turnover_text =total_turnover_org;
					if($.isNumeric(total_turnover_org))
					$('#total_turnover_text').text(total_turnover_text);
}


function addmissiontitleupdate()
{

	var techprod=$('#tech_product').val();
	if($('#tech_title').val())
	{
		$('#margin_percentage').removeClass('validate[required,minWriters[0.01],maxWriters[99.99]]')
		$('#margin_percentage').addClass('validate[required,minWriters[0.00],maxWriters[99.99]]')
	}

	var mision_name=$('#mission_name').val();
	var mission_turnover=$('#mission_turnover').val();
	var volume=$('#volume').val();
	var mission_length=$('#mission_length_1').val();
	var languange=$('#language_1_chosen a span').text();
	if($.isNumeric(mission_turnover) && (mission_turnover!='0.00' || $('input[name=free_mission]:checked').val()=='yes'))
	{
		if($('input[name=free_mission]:checked').val()=='yes')
			mission_turnover=0;

		$('#mission_turnover_details').html(mission_turnover+ '&'+$('#mcurrency').val()+';' );
	}

	$('#custom_name').html(mision_name);

	if( ($('#product_1').val()=='redaction' || $('#product_1').val()=='translation') && ($('#tech_title').val()=='' || $('#team').val()=='editorial'))
	{
		$('#price_label').text('Price/art');
		$('#step4label').text('Prices');

			var prod_details=$('#product_1_chosen a span').text();
			var prod_type_details=$('#producttype_1_chosen a span').text();
			var languange=$('#language_1_chosen a span').text();
			var nb_words=$('#nb_words_1').val();
			

			if(prod_details=='Traduction')
				var langdest=$('#languagedest_1_chosen a span').text();
			else
				var langdest='';

			if(volume)
				val_mission= prod_details+' '+volume+' / '+prod_type_details+' / '+languange+' '+langdest+' '+nb_words+' words';
			else	
				val_mission= prod_details+' / '+prod_type_details+' / '+languange+' '+langdest+' '+nb_words+' words';
								 				
			$('#add_mission_details').html(val_mission);
	}
	else if($('#team').val()!='services' ||$('#tech_title').val()!='')
	{	
		$('#price_label').text('Selling price');

		$('#step4label').text('Prices')

		if($('#tech_product').val() && $('#team').val()=='services')
			var product_type=$('#tech_product_chosen a span').text();
		else
			var product_type=$('#product_1_chosen a span').text();

		var title_tech=$('#tech_title_chosen a span').text();

		if(volume)
				val_mission= product_type+' / '+volume+' '+title_tech+' / '+languange;
			else	
				val_mission= product_type+' / '+title_tech+' / '+languange;
								 				
			$('#add_mission_details').html(val_mission);

	}
	if(mission_length)
		$('#mission_duration').html(mission_length+' days mission');

}


function addWeekdays(date, days) 
{
	var days=parseInt(days);
	var timestamp = new Date(date); // clone
	var totaldays=days;
	var day = 3600 * 24 * 1000;
	
	   i = 1;

        while (days >= i) 
        {
        	timestamp =new Date(timestamp.getTime() + day);
        	        	
		    if (timestamp.getDay()=== 0 || timestamp.getDay()===6 ) 
		    {
		      days=days+1;
		    }
		    
	   	  i++;
		}

	 	var date1 = new Date(date);
		var date2 = new Date(timestamp);
		
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());

		var diffDays = Math.ceil(timeDiff / (day)); 

		//alert(diffDays+' '+totaldays);
		  	var days_diff=Math.abs(diffDays-totaldays);
	  	
	return days_diff;
}

function betweendateweekday(date1, date2) 
{
	 var date1 = new Date(date1); 
	 var date2 = new Date(date2);
	 var day = 3600 * 24 * 1000;
	 var timeDiff = Math.abs(date2.getTime() - date1.getTime());

	 var days =Math.ceil(timeDiff / (day)); 
	  
	 var timestamp=date1;

	 	leavedays=0;
        for(i = 1;i<=days;i++) 
        {
        	timestamp =new Date(timestamp.getTime() + day);
        	        	
		    if (timestamp.getDay()=== 0 || timestamp.getDay()===6 ) 
		    {
		      leavedays++;
		    }
		    
	   	}

	  var remaining_days= days-leavedays;
	return remaining_days;
}

function mission_lenth_change()
{
		volume=$("#volume").val();

		nbwords=$("#nb_words_1").val();
		configprod=$("#producttype_1 option:selected").attr("configwords");
		prodval=$("#producttype_1 option:selected").val();
		durationVal=$('#mission_length_1').val();

		required_writer=Math.ceil((nbwords*volume)/(durationVal*configprod));

		if(required_writer<=0 || isNaN(required_writer))
					required_writer=1;

				
			if(prodval!='autre')
			{
				var new_val =$('#prod_mission_writing_staff').val();
				$('#mission_writers').val(required_writer);

				$('#prod_mission_writing_staff').val(required_writer);

				$("#prod_mission_writing_staff").removeClass();
				$("#prod_mission_writing_staff").attr('class',' validate[required,custom[number],minWriters['+required_writer+']] form-control');

				
			}



}