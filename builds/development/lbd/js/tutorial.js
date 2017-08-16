$(document).ready(function() 
{
			$('#tutorial_demo').on('click',function(){
			
					if($(this).hasClass('change-color'))
					{
						tutorialpageActive('deactive');
						$(this).removeClass('change-color');
						$(this).find('span').removeClass('glyphicon glyphicon-check').addClass('glyphicon glyphicon-unchecked');
						$('ul.nav li#tutorialnotify').css('color','#000');
						
						

					}
					else 
					{
						tutorialpageActive('active');
						$(this).addClass('change-color');
						$(this).find('span').removeClass('glyphicon glyphicon-unchecked').addClass('glyphicon glyphicon-check');
						$('ul.nav li#tutorialnotify').css('color','#337ab7');
						

					}
				//window.location.reload();
			  });


			$( document ).on( "click", 'a.introjs-skipbutton', function()
			{
				
				tutorialpageActive('deactive');
				
				setTimeout(function(){window.close();},300);
			});
			
});

function tutorialpageActive(val)
{
	var remote='/quote-new/tutorial-mission?tutor='+val;
	
	$.ajax({
			type: 'GET',
			url: remote,
			success: function(data)
			{
				//alert(data);
			}
		});
}