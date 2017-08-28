$(function(){

		$.ajaxSetup({
			data: {},
			type: "POST",
		    async: true,
		    url : '/index/index?ajax=session', // before making the request, change url location to ajax folder
    		success:function(result){
    			//alert(result);
    			if(result=='failed')
    			{
						window.location =window.location.href;
    			}
			}
		});
		
	
});	
