$(document).ready(function(){

    $('body').on('hidden.bs.modal', '.modal', function () {
     $(this).removeData('bs.modal');
     $('body').attr('id','');
     
     $('.modal-backdrop').hide();

        });

// Transition FullModal Create Mission

        $('#newMissionStep1').addClass('show');
        $('.modalFullStep1').addClass('modalFullStepActive');

     $('#newMissionStep1Btn').click(function(){
            var form = $("create_quote_mission");
    
            var validator = form.data("validator");
    
            var section = $(this).closest("div#newMissionStep1");
       
            var fields = section.find(":input");
          
            if (fields.valid())
            {
                var language=$('#language').val();                    
                var languagedest=$('#languagedest').val();                    
                if(languagedest==language && ($('#team').val()!=3 && $('#team').val()!=2 ) )
                    {
                    $('#languagedest-error').remove();
                    $('#languagedest').closest('.form-group').addClass('has-error error');
                    $('.languages_part').append('<div id="languagedest-error" class="col-md-offset-4 col-md-6 has-error error">Please select different language</div>');
                    return false;
                    }
                    else
                    {
                      $('#languagedest-error').remove();  
                    }
                   
                    if(($('#team').val()==2 || $('#team').val()==3 || $('#team').val()==4) || ($('#product').val())=='editorical' )
                    {

                        $('#product_text').text($('#tech_product_chosen a span').text());
                    
                        $('#product_type_text').text($("#tech_title_chosen a span").text());
                        $('#language_text').closest('.material-icons').addClass('hidden');
                        $('#languagedes_text').addClass('hidden');
                        if($('#tech_oneshot').val()=='no')
                           {
                            $('.oneshot-no').removeClass('hidden');
                           $('#volume_max_text').text($('#tech_volume_max').val());
                           $('#tempo_type_text').text($('#tech_tempo_type_chosen a span').text());
                           $('#delivery_tempo_text').text($('#tech_delivery_volume_option_chosen a span').text());
                           $('#tempo_length_text').text($('#tech_tempo_length').val());
                           $('#tempolenght_option_text').text($('#tech_tempo_length_option_chosen a span').text());
                           }
                           else
                           {
                            $('.oneshot-no').addClass('hidden');
                            if($('#volume').attr('rel')=='')
                              $('#volume').val(1);
                           }
                           if( $('#team').val()==3)
                           {
                            $('.tech_working').addClass('hidden');
                            $('#working_days').addClass('hidden');
                            $('#to_perform').closest('div.form-group').addClass('hidden');
                            $('#prod_mission_selected').closest('div.form-group').addClass('hidden');
                           }
                           else
                           {
                            if($('#team').val()==4)
                              $('.tech_working').addClass('hidden');
                            if($("#prod_mission_selected").val()=='Yes')
                            $('#prodMission_details').removeClass('hidden');
                          $('#to_perform').closest('div.form-group').removeClass('hidden');
                          $('#prod_mission_selected').closest('div.form-group').removeClass('hidden');
                          }
                       $('#nbwords_text').closest('td').addClass('hidden');
                     }
                             
                $('#newMissionStep1').removeClass('show');
                $('#newMissionStep2').addClass('show animated bounceInRight');

                $('.modalFullStep2').addClass('modalFullStepActive');
                $('.modalFullStep1').removeClass('modalFullStepActive');
                $('.modalFullStep3').removeClass('modalFullStepActive');
            }
        
    });

    $('#newMissionStep2Btn').click(function(){


        var form = $("create_quote_mission");
    
            var validator = form.data("validator");
    
            var section = $(this).closest("div#newMissionStep2");
       
            var fields = section.find(":input");
          
            if (fields.valid()){
             
              if($(this).attr('disabled')=='disabled')
               {
                

                $('#newMissionStep1').removeClass('show');
                $('#newMissionStep2').addClass('show animated bounceInRight');

                $('.modalFullStep3').removeClass('modalFullStepActive');
                $('.modalFullStep2').addClass('modalFullStepActive');
                $('.modalFullStep1').removeClass('modalFullStepActive');
               }
               else
               {
                
                $('#newMissionStep2').removeClass('show');
                $('#newMissionStep3').addClass('show animated bounceInRight');

                $('.modalFullStep3').addClass('modalFullStepActive');
                $('.modalFullStep2').removeClass('modalFullStepActive');
                $('.modalFullStep1').removeClass('modalFullStepActive');
               }

                $('#mission_name_text').text($("#mission_name").val());
                $('#language_text').text($("#language_chosen a span").text());
                if($("#duration_dont_know").val()=='Yes')
                {
                    $('#mission_length_text').text('Unknown');
                }
                else
                {
                $('#mission_length_text').text($('#mission_length').val());
                }
                $('#volume_text').text($('#volume').val());
                if($('#team').val()==1)
                {
                  $('#editorical_text').text('Editorial');
                   if($('#producttype').val()=='autre')
                   {
                    if($('#otherproducttype').val()==0)
                    {
                        $('#product_type_text').text($("#producttypeother").val());
                    }
                    else
                    {
                    $('#product_type_text').text($("#otherproducttype_chosen a span").text());
                    }
                   }
                   else
                   {
                    $('#product_type_text').text($("#producttype_chosen a span").text()); 
                   }
                   
                   $('#product_text').text($("#product_chosen a span").text());
                  
                       if($("#product").val()=='translation')
                       {
                        $('#language_text').closest('.material-icons').removeClass('hidden');
                        $('#languagedes_text').removeClass('hidden').text($("#languagedest_chosen a span").text());
                        $('#nbwords_text').text($('#nb_words').val());
                           if($('#oneshot').val()=='no')
                           {
                            $('.oneshot-no').removeClass('hidden');
                           $('#volume_max_text').text($('#volume_max').val());
                           $('#tempo_type_text').text($('#tempo_type_chosen a span').text());
                           $('#delivery_tempo_text').text($('#delivery_volume_option_chosen a span').text());
                           $('#tempo_length_text').text($('#tempo_length').val());
                           $('#tempolenght_option_text').text($('#tempo_length_option_chosen a span').text());
                           }
                           else
                           {
                            $('.oneshot-no').addClass('hidden');
                           }

                       }
                       else if($("#product").val()=='editorical')
                       {

                        $('#product_type_text').text($("#tech_title_chosen a span").text());
                        $('#language_text').closest('.material-icons').addClass('hidden');
                        $('#languagedes_text').addClass('hidden');
                        $('#editorical_text').text('Service');
                          if($('#tech_oneshot').val()=='no')
                         {
                          $('.oneshot-no').removeClass('hidden');
                         $('#volume_max_text').text($('#tech_volume_max').val());
                         $('#tempo_type_text').text($('#tech_tempo_type_chosen a span').text());
                         $('#delivery_tempo_text').text($('#tech_delivery_volume_option_chosen a span').text());
                         $('#tempo_length_text').text($('#tech_tempo_length').val());
                         $('#tempolenght_option_text').text($('#tech_tempo_length_option_chosen a span').text());
                         }
                         else
                         {
                          $('.oneshot-no').addClass('hidden');
                         }

                       }
                       else
                       {
                        $('#language_text').closest('.material-icons').addClass('hidden');
                        $('#languagedes_text').addClass('hidden');
                        $('#nbwords_text').text($('#nb_words').val());
                           if($('#oneshot').val()=='no')
                           {
                            $('.oneshot-no').removeClass('hidden');
                           $('#volume_max_text').text($('#volume_max').val());
                           $('#tempo_type_text').text($('#tempo_type_chosen a span').text());
                           $('#delivery_tempo_text').text($('#delivery_volume_option_chosen a span').text());
                           $('#tempo_length_text').text($('#tempo_length').val());
                           $('#tempolenght_option_text').text($('#tempo_length_option_chosen a span').text());
                           }
                           else
                           {
                            $('.oneshot-no').addClass('hidden');
                           }
                       }
                  
                   
                   
               }
               else
               {
                if( $('#team').val()==4)
                {
                  $('#product_text').text($('#cre_product_chosen a span').text());
                  $('#editorical_text').text('Créa');
                }
                else
                {
                   $('#product_text').text($('#tech_product_chosen a span').text());
                   $('#editorical_text').text('Service');
                }

                $('#product_type_text').text($("#tech_title_chosen a span").text());
                $('#language_text').closest('.material-icons').addClass('hidden');
                $('#languagedes_text').addClass('hidden');
                
                if($('#tech_oneshot').val()=='no')
                   {
                    $('.oneshot-no').removeClass('hidden');
                   $('#volume_max_text').text($('#tech_volume_max').val());
                   $('#tempo_type_text').text($('#tech_tempo_type_chosen a span').text());
                   $('#delivery_tempo_text').text($('#tech_delivery_volume_option_chosen a span').text());
                   $('#tempo_length_text').text($('#tech_tempo_length').val());
                   $('#tempolenght_option_text').text($('#tech_tempo_length_option_chosen a span').text());
                   }
                   else
                   {
                    $('.oneshot-no').addClass('hidden');
                   
                   }
                  if($("#prod_mission_selected").val()=='Yes')
                         $('#prodMission_details').removeClass('hidden');
               }
            }
    });

    $('#newMissionStep2BtnPrev').click(function(){
        $('#newMissionStep2').removeClass('show');
        $('#newMissionStep1').addClass('show');

        $('.modalFullStep1').addClass('modalFullStepActive');
        $('.modalFullStep2').removeClass('modalFullStepActive');
        $('.modalFullStep3').removeClass('modalFullStepActive');
    });

    $('#newMissionStep3BtnPrev').click(function(){
        $('#newMissionStep3').removeClass('show');
        $('#newMissionStep2').addClass('show');

        $('.modalFullStep2').addClass('modalFullStepActive');
        $('.modalFullStep3').removeClass('modalFullStepActive');
        $('.modalFullStep1').removeClass('modalFullStepActive');
    });


//Defining chosen js
$("#language").chosen({ allow_single_deselect: false,search_contains: true});



/*on change form display*/
$('#product').on('change',function(){
    var prodval=$(this).val();
    if(prodval=='translation' || prodval=='redaction')
    {
        if(prodval=='translation')
        {
            $('#language').parent('div').removeClass('col-md-6').addClass('col-md-3');
            $("#languagedest").removeClass('hidden');
            $("#languagedest").chosen({ allow_single_deselect: false,search_contains: true});
            $('#languagedest_chosen').removeClass("hidden");
            $('.all_language').removeClass('hidden');

        }
        else
        {
            $('#language').parent('div').removeClass('col-md-3').addClass('col-md-6');
            $('#languagedest_chosen').addClass("hidden");
            $('.all_language').addClass('hidden');
            $("#languagedest").addClass('hidden');
        }
        
        $('#producttype').closest('.edito_product').removeClass('hidden');
         $('#tech_title').closest('.techseo_product').addClass('hidden');
         $('#nb_words').closest('.edito_product').removeClass('hidden');
         $('#tech_oneshot').closest('.techseo_product').addClass('hidden')
         $('#tech_mission_details_first').addClass('hidden');
          $('#mission_duration_details').closest('.form-group').removeClass('hidden') ;
          $('#mission_length').removeClass('hidden');
         $('#nb_words').removeClass('hidden');
          $('#producttype').removeClass('hidden');
          $('#editorical_text').text('Editorial');
          $('.tech_working').addClass('hidden');
              $('#working_days').addClass('hidden');

           $('#tech_mission_details_first').addClass('hidden');
            $('#tech_oneshot_chosen').addClass('hidden');

    }
    else
    {
        $('#languagedest_chosen').addClass("hidden");
        $('#producttype').closest('.edito_product').addClass('hidden');
        $('.edito_product').closest('#product').addClass('hidden');
        $('#oneshot').addClass('hidden');
         $('#oneshot_chosen').addClass('hidden');
         $('#tech_oneshot_chosen').removeClass('hidden');
        $('#tech_oneshot').closest('.techseo_product').removeClass('hidden');
        $('.techseo_product').closest('#product').removeClass('hidden');
        $('#nb_words').closest('.edito_product').addClass('hidden');
         $('#tech_title').closest('.techseo_product').removeClass('hidden');
        $('#tech_mission_details_first').removeClass('hidden');
        $('#nb_words').addClass('hidden');
        $('#producttype').addClass('hidden');
        $('#editorical_text').text('Service');
        if($('#prod_mission_selected').val()=='Yes')
          $('#prodMission_details').removeClass('hidden');

        techtitlelist('edito','');
        $('.tech_working').addClass('hidden');
              $('#working_days').addClass('hidden');
        
    }
});


$('#duration_dont_know').on('change',function(){
    if($(this).is(":checked")==true)
        {
            $("#mission_length").attr('disabled','disabled');
            $("#mission_length").val('0');
             $("#mission_length").attr('min','0');
            $('#duration_dont_know').val('yes');
            
        }   
        else
        {
            $("#mission_length").removeAttr('disabled');
            $('#duration_dont_know').val('');
            var prodval=$('#team').val();
            $("#mission_length").attr('min','1');
            var tech_prodval=$('#product').val();
            if((prodval==2 || tech_prodval=='editorical' ) && tech_prodval!='translation' && tech_prodval!='redaction' )
            {
            
              techoneshotVolume('change');
            }
        }
});


$('#volume').on('change keyup keypress',function()
{
    var editoid=$("#team").val();
    //alert(editoid);
    
    var oneshot=$("#oneshot").val();
    var tech_oneshot=$("#tech_oneshot").val();
    var tech_product=$("#tech_product").val();
    if(editoid==1 && oneshot=='yes')
    {
        calculatedDurationonConfig();
    }
    if(tech_product!='integration' && editoid!='1')
    {

      var volume = this.value;
      var theshold_days=$('#working_days').attr('data-config');
      if(editoid==4)
      {
        var calulateuration= Math.ceil(volume/theshold_days);
       
         var missio_duration=$('#mission_length').attr('data-days');
         var finalduration=calulateuration*missio_duration;
         //alert(finalduration);
         $('#mission_length').val(finalduration);
         var workdays=$('#working_days').attr('data-configwork');
         var final_workdays=workdays*calulateuration;
         $('#working_days').val(final_workdays);
      }
      else
      { 
        var value=volume*theshold_days;
        $('#mission_length').attr('min',value);
            $('#working_days').val(value);
        if(tech_oneshot=='no')
        {
          $('#tech_volume_max').attr('max',volume);
        }
      }
    }
});

$("#working_days").on('change keyup keypress',function(){
     var days = this.value;
     $('#mission_length').attr('min',days);
});

$("#mission_length").on('change keyup keypress',function(){
      
      if($('#oneshot option:selected').val()=='yes')
      {
            $('.alert-danger').remove();
            $("#newMissionStep2Btn").removeAttr('disabled');
         /*if( parseInt($('#mission_length').val())< parseInt($('#mission_length').attr('rel')))
          {
            var configval=$("#producttype option:selected").attr("configwords");
            $('#mission_length').closest('.form-group').after("<div class='alert-danger col-md-7 col-md-offset-3' style='padding:0 5px;'> Massive volume for only one writer ("+configval+" words "+1+" days) </div>");
            $("#newMissionStep2Btn").attr('disabled','disable');
          }*/

      }

});

    $("body").on('change keyup keypress',"#volume,#tempo_type,#volume_max,#tempo_length,#tempo_length_option", function() {
       
            oneshotVolume('change');
            
        });

    $("body").on('change keyup keypress',"[id^=volume],[id^=tech_tempo_type],[id^=tech_volume_max],[id^=tech_tempo_length],[id^=tech_tempo_length_option]", function() {
       
            techoneshotVolume('change');
            
        });

   $("#tech_title").on('change',function(){
            var titleval=$(this).find('option:selected');
            $('#tech_type').val(titleval.text());
            $('#tech_type').attr('rel',titleval.val());
        });


});


function fnCheckProductType(element)
{   
    var productType=element.value;
    
    /*var mission_details=(element.id).split("_");
    var mission_id=mission_details[1];*/
    
    $("#producttypeotherdiv").hide();
    
    if(productType=='autre')
    {
        $("#nb_words").removeAttr("min").removeAttr("max");
        $("#producttypeotherdiv").show();
       
        /*$("#nb_words").removeAttr("class");*/
    }
    else if(productType=='article_de_blog'){
        $("#nb_words").attr("min",'200');
        $("#nb_words").attr("max",'500');
       }
       else if(productType=='news'){
        $("#nb_words").attr("min",'50');
        $("#nb_words").attr("max",'200');
           }
       else if(productType=='descriptif_produit'){
        $("#nb_words").attr("min",'40');
        $("#nb_words").attr("max",'150');
           }
       else if(productType=='guide'){
        $("#nb_words").attr("min",'500');
        $("#nb_words").attr("max",'1500');
           }
       else if(productType=='wordings'){
        $("#nb_words").attr("min",'1');
        $("#nb_words").attr("max",'1');
           }
        else{
            $("#nb_words").removeAttr("min").removeAttr("max");
        }
        
}


function fnOtherProduct(element)
{
    otherid=element.value;
    othertext=$("#otherproducttype_chosen a span").text();
    
    if(otherid=='0')
    {
        $('#otherproductnew').removeClass('hidden');
        $('#producttypeother').val('');
    }
    else
    {
        $('#otherproductnew').addClass('hidden');   
        $('#producttypeother').val(othertext);
    }

}


function fnEditorialtotech(element)
{
   var editoid=element.value;

   if(editoid==1)
   {
    $('#language').removeClass('hidden');
    $('#language_chosen').removeClass('hidden');
    $('.languages_part').removeClass('hidden');
    $('.edito_product').removeClass('hidden');
    $('.techseo_product').addClass('hidden'); 
     $('#tech_product').addClass('hidden');
    $('#tech_mission_details_first').addClass('hidden');   
    $('#tech_title').addClass('hidden');
    $('#nb_words').removeClass('hidden');
     $('#oneshot_chosen').removeClass('hidden');
      $('.tech_working').addClass('hidden');
      $('#working_days').addClass('hidden');
   }
   else
   {
        if(editoid==3)
        {
          $('.languages_part').addClass('hidden');
          $('#language_chosen').addClass('hidden');
          $('#language').addClass('hidden');
          $('#languagedest').addClass('hidden');
          techtitlelist('credit');
          $('#to_perform').parent('div.form-group').addClass('hidden');
                $('#prod_mission_selected').parent('div.form-group').addClass('hidden');
          $('#working_days').addClass('hidden');
          $('#mission_duration_details').closest('.form-group').removeClass('hidden') ;

        }
        else
        {
          if(editoid==4)
          {
            $("#cre_product").chosen({ width: '100%' });
            $("#cre_product").chosen({disable_search_threshold: 10,display_disabled_options:false});
            $("#cre_product").val(''); 
            $('#cre_product_chosen').removeClass('hidden');
            $('#tech_product').addClass('hidden'); 
            $('#tech_product_chosen').addClass('hidden');
            $('#cre_product').trigger("chosen:updated");  
            if($('#volume').attr('data-usertype')=='superadmin')
            {
              $('#mission_length').attr('readonly',false);
              $('#duration_dont_know').attr('readonly',false);
            }
            else 
            {
              $('#mission_length').attr('readonly',true);
              $('#duration_dont_know').attr('readonly',true);
            }

            $("#tech_oneshot option[value='no']").attr('disabled', true);
            $('#tech_oneshot').trigger("chosen:updated"); 
            
          }
          else
          {
            $('#cre_product').addClass('hidden');
            $('#cre_product_chosen').addClass('hidden');
            $('#tech_product').removeClass('hidden'); 
            $('#tech_product_chosen').removeClass('hidden'); 
            $("#tech_product").val(''); 
            $("#tech_product option").removeAttr('disabled');
            $("#tech_product option[value='credit']").attr('disabled', true);
            $('#tech_product').trigger("chosen:updated");
            $("#tech_oneshot option[value='no']").attr('disabled', false);
            $('#tech_oneshot').trigger("chosen:updated");  
          }
          
          $("#tech_title").val('');
          $('#tech_title').trigger("chosen:updated");
          
          $('#language').parent('div').removeClass('col-md-3').addClass('col-md-6');
          $('#language_chosen').removeClass('hidden');
          $('.languages_part').removeClass('hidden');
          $('#language').removeClass('hidden');
          $('#to_perform').parent('div.form-group').removeClass('hidden');
            $('#prod_mission_selected').parent('div.form-group').removeClass('hidden');
        }
     
    $('.edito_product').addClass('hidden');
    $('#product').addClass('hidden');
    $('.techseo_product').removeClass('hidden');
    $('#tech_mission_details_first').removeClass('hidden');
    $('#languagedest_chosen').addClass("hidden");
    $('#producttype').addClass('hidden');
    $('#nb_words').addClass('hidden');
     $('#oneshot_chosen').addClass('hidden');

   }
   

}


/*getting tech titles based on tech type*/
function techtitlelist(title_type,tech_title_id){
    var param="";
    var type=title_type;
    
    var team=$('#team').val();
    var tech_product= $('#tech_product').html();
        $(".seo_product_details").addClass('hidden');
        $("#seo_product").addClass('hidden');
        $('.tech_productdetail').removeClass('hidden'); 
        
        $('#tech_title').val('');
         if(tech_title_id)
            param="&typeid="+tech_title_id;
         var target_page = "/quote-new/tech-title-select?tech_type="+type+param;    

            $.post(target_page, function(data){   

                    var select = $('#tech_title');

                            if(team==3)
                            {
                              $("#tech_product").val('credit');
                              $("#tech_product option").attr('disabled', true);
                              $("#tech_product option[value='credit']").removeAttr('disabled');
                              $('#tech_product').trigger("chosen:updated");
                              
                            } 
                            else
                            {
                              $("#tech_product option").removeAttr('disabled');
                              $("#tech_product option[value='credit']").attr('disabled', true);
                              $('#tech_product').trigger("chosen:updated");
                             
                            }             
                            select.empty().html(data);
                            $('#tech_title').trigger("chosen:updated");
                });

            if(type!='integration' &&  type!='edito' && type!='credit')
            {
              $('.tech_working').removeClass('hidden');
              $('#working_days').removeClass('hidden');
            }
            else
            {
               $('.tech_working').addClass('hidden');
              $('#working_days').addClass('hidden');
            }
   
}

/*getting tech details*/
function techtitleDetails(title_id){
    techval=title_id;
    
     var target_page = "/quote-new/tech-delivery-mission?title_id="+techval;
            $.post(target_page, function(data){                 
                var missionlen=data.split('-');  
               // alert(missionlen);
               if(($('#tech_product').val())=='integration' || ($('#team').val()==1 || $('#team').val()==3))
               {
                  if($("#mission_length").val()=='')
                  $("#mission_length").val(missionlen[0].trim());
               }
               else if($('#team').val()==4)
               {
                if($("#volume").val()=='')
                  $("#volume").val(missionlen[4].trim());
                  if($("#mission_length").val()=='' || $("#mission_length").val()==0)
                   $("#mission_length").val(missionlen[0].trim());
                  $("#mission_length").attr('data-days',missionlen[0].trim());
                  $("#working_days").val(missionlen[3].trim());
                  $('.tech_working').addClass('hidden');
                  $("#working_days").attr('data-config',missionlen[4].trim());
                  $("#working_days").attr('data-configwork',missionlen[3].trim());
               }
               else
               {
                if($('#working_days').val()=="")
                {
                $("#working_days").val(missionlen[0].trim());  
                }
                else
                {
                 $("#working_days").val($("#working_days").val()); 
                }
                
                $("#mission_length").attr('min',missionlen[0].trim());
                 $("#working_days").attr('data-config',missionlen[0].trim());
               }
                techoneshotVolume('change');
            });
        

}


function fnoneshotdetails(oneshotval)
{
    var prodval=$('#team').val();
    var tech_prodval=$('#product').val();
     var technval =$('#tech_product').val();
    if(((prodval==2 || prodval==3 || prodval==4)  || tech_prodval=='editorical' ) && tech_prodval!='translation' && tech_prodval!='redaction' )
    {
         if(oneshotval=='no')
        {
            
            $('#tech_tempo_details').css({'display':'block'});
            if(technval!='integration' && tech_prodval!='editorical')
            {
              var volume=$('#volume').val();
              $('#tech_volume_max').attr('max',volume);
            }
           $('#tech_volume_max').removeClass('hidden');
            $('#tech_tempo_length').removeClass('hidden');
            if(tech_prodval!='editorical' && technval!='integration' && technval!='credit')
            {
              $('#mission_duration_details').closest('.form-group').addClass('hidden') ; 
              $('#mission_length').addClass('hidden') ;
            }
            else
            {
              $('#mission_duration_details').closest('.form-group').removeClass('hidden') ;
              $('#mission_length').removeClass('hidden') ; 
            }
            $('.oneshot-no').removeClass('hidden');
        }
        else
        {
            
            $('#tech_tempo_details').css({'display':'none'});
            $('#tech_volume_max').addClass('hidden');
            $('#tech_tempo_length').addClass('hidden');
             $('#mission_length').removeClass('hidden') ;
           $('#mission_duration_details').closest('.form-group').removeClass('hidden') ;
           
        }
    }
    else
    {
        if(oneshotval=='no')
        {
            $('#tempo_details').css({'display':'block'});
            $('#volume_max').removeClass('hidden');
            $('#tempo_length').removeClass('hidden');
            //oneshotVolume('change');

        }
        else
        {
            $('#tempo_details').css({'display':'none'});
            $('#volume_max').addClass('hidden');
            $('#tempo_length').addClass('hidden');
            //calculatedDurationonConfig();
        }
    }
}


function selectProdMission(prodval)
{
    if(prodval=='Yes')
    {
    $('#prodMission_details').removeClass('hidden');
    }
    else
    {
     $('#prodMission_details').addClass('hidden');   
    }
    
}

function calculatedDurationonConfig()
{
  
                volume=$("#volume").val();
                nbwords=$("#nb_words").val();
                calculatedVal=nbwords*volume;
                prodval=$("#producttype option:selected").val();
                configprod=$("#producttype option:selected").attr("configwords");
                max_writer=$("#nb_words").attr('rel');
                configureval=max_writer*configprod;
                durationVal=Math.ceil(calculatedVal/configureval);
                restrict_min_duration=Math.ceil(calculatedVal/(configprod*10));
               // restrict_max_duration=Math.round(calculatedVal/(configprod));
                if(restrict_min_duration<1)
                  restrict_min_duration=1;
               /* if(restrict_max_duration<1)
                  restrict_max_duration=1;*/
                if(prodval=='autre')
                  $("#mission_length").attr('min','1');
                else
                   $("#mission_length").attr('min',restrict_min_duration);
                //$("#mission_length").attr('max',restrict_max_duration);
                //alert(' calculate '+calculatedVal+' config '+ configureval+' final '+durationVal);
                if(durationVal<=0)
                        durationVal=1;
                /*assign mission length*/
                if(prodval!='autre')
                {
                $("#mission_length").val(durationVal);
                $("#mission_length").attr('rel',durationVal);
                }
      
}


function oneshotVolume(status)
{
    
    $('.oneshotVolume').each(function() {
        
        var oneshotval= $("#oneshot").val();
        
        if(oneshotval=='no' ){
            var nb_words=$("#nb_words").val();
            duration_missionval=$('#mission_length').val();
            totalvolumeval=$('#volume').val();
            volumeMax=$('#volume_max').val();
            tempotype=$('#tempo_type').val();
            tempotypeconfig=$('#tempo_type option:selected').attr('tempoconfig');
            configval=tempotypeconfig.split('-');
            configprod=$("#producttype option:selected").attr("configwords");

            deleveryvolumeoption=$('#delivery_volume_option').val();
            tempoLength=$('#tempo_length').val();
            tempoLengthoption=$('#tempo_length_option').val();
            durationknow=$('#duration_dont_know').is(":checked");
            $(".alert-danger").remove();
            $("#newMissionStep2Btn").removeAttr('disabled');
            if(tempoLengthoption=='days'){
                 tempo_callenth=tempoLength;
            }else if(tempoLengthoption=='week') {
                tempo_callenth=tempoLength*7;
            }
            else if(tempoLengthoption=='month') {
                tempo_callenth=tempoLength*30;
                }
            else if(tempoLengthoption=='year')  {
                tempo_callenth=tempoLength*365;
                }
                calculatedtval=(parseInt(configval[0])/parseInt(configval[1]));
                configcal=(calculatedtval)*tempo_callenth;
                tempocalculated=(nb_words*volumeMax);
              
                
                 if(durationknow==false) caltotval=Math.round((duration_missionval/tempo_callenth)*volumeMax);
                    else  caltotval= volumeMax;

                    duration_missionval=Math.round((totalvolumeval)*tempo_callenth/volumeMax)
                     enteredVal=nb_words*totalvolumeval;
                    restrict_min_duration=Math.ceil(enteredVal/(configprod*10));
                    //restrict_max_duration=Math.round(enteredVal/(configprod));
                    if(restrict_min_duration<1)
                      restrict_min_duration=1;
                    /*if(restrict_max_duration<1)
                      restrict_max_duration=1;*/
                    $("#mission_length").attr('min',restrict_min_duration);
                    //$("#mission_length").attr('max',restrict_max_duration);
                
                    if(volumeMax!="" && deleveryvolumeoption!="")
                    {           
                        if(status=='change' && $.isNumeric(duration_missionval) && duration_missionval!=0)
                        {
                            $('#mission_length').val(duration_missionval);
                            
                            totalvolumeval=caltotval;   
                        }
                        
                        if(caltotval!=totalvolumeval && $.isNumeric(caltotval))
                        {
                               $('#delivery_volume_option').closest('.form-group').after("<div class='alert-danger col-md-7 col-md-offset-3' style='padding:0 5px;'>Le tempo indiqu&#233; ne correspond pas au volume et &#224; la  dur&#233;e de la mission</div>");
                                volume_error = false;
                                $("#newMissionStep2Btn").attr('disabled','disable');
                                return false;                       
                        }
                        else if(configcal<tempocalculated)
                        {
                                $('#delivery_volume_option').closest('.form-group').after("<div class='alert-danger col-md-7 col-md-offset-3' style='padding:0 5px;'> Massive volume for only one writer ("+configval[0]+" words "+configval[1]+" days) </div>");
                                $("#newMissionStep2Btn").attr('disabled','disable');
                                return false;
                        }
                        else
                        { 
                            $("#newMissionStep2Btn").removeAttr('disabled');
                            volume_error = true;
                        }
                    }
                        
                            
            }
    });
    return true;
}


function techoneshotVolume(status)
{

          
        /*var current_id = $(this).attr("id");
        var current_details = (current_id).split("_");*/
        var tech_product = $("#tech_product").val();
        var product = $("#product").val();
        var oneshotval= $("#tech_oneshot").val();
        if(oneshotval=='no')
        {
            duration_missionval=$('#mission_length').val();
            totalvolumeval=$('#volume').val();
            volumeMax=parseInt($('#tech_volume_max').val());
            tempotype=$('#tech_tempo_type').val();
            deleveryvolumeoption=$('#tech_delivery_volume_option').val();
            tempoLength=parseInt($('#tech_tempo_length').val());
            tempoLengthoption=$('#tech_tempo_length_option').val();
            $(".alert-danger").remove();
            
            if(tempoLengthoption=='days'){
                 tempo_callenth=tempoLength;
            }else if(tempoLengthoption=='week') {
                tempo_callenth=tempoLength*7;
            }
            else if(tempoLengthoption=='month') {
                tempo_callenth=tempoLength*30;
                }
            else if(tempoLengthoption=='year')  {
                tempo_callenth=tempoLength*365;
                }
             
                if( ((tech_product=='integration' || tech_product=='credit') && ($('#team').val()==2 || $('#team').val()==3)) || (product=='editorical' && tech_product=='' &&  $('#team').val()==1 ) )
                {
                  
                 caltotval=Math.round((duration_missionval/tempo_callenth)*volumeMax);
                 
                    duration_missionval=Math.round((totalvolumeval)*tempo_callenth/volumeMax)
                    if(status=='change' && $.isNumeric(caltotval) && caltotval!=0)
                    {
                        
                        $('#volume').val(caltotval);
                        totalvolumeval=$('#volume').val();   
                    }
                
                    if(caltotval!=totalvolumeval && $.isNumeric(caltotval))
                    {
                            $('#tech_delivery_volume_option').closest('.form-group').after("<div class='alert-danger col-md-7 col-md-offset-3' style='padding:0 5px;'>Le tempo indiqu&#233; ne correspond pas au volume et &#224; la  dur&#233;e de la mission</div>");
                                    volume_error = false;
                            return false;                       
                    }
                    else volume_error = true;
                }
                else
                {
                  $('#mission_length').addClass('hidden');
                  duration_missionval=Math.round(totalvolumeval*(tempo_callenth/volumeMax));
                  $('#mission_length').val(duration_missionval);

                }  
          }    
          
  return true;
}