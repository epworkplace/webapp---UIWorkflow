mentionComments = {
	/*getting all users data for @ mention*/
	getmentionUserData : function () {
		var tmp = null;
		$.ajax({
			'async': false,
			url: "/sidebar/get-bo-users-mention",
			type: 'GET',
			'success': function (data) {
				tmp = $.parseJSON(data);
			}
		});
		return tmp;
	},
	/*END*/
	
	/*getting all mission names for # tagging  */
	getmissionTags : function (quote_id) {
		var missionname_tags = null;
		$.ajax({
			'async': false,
			url: "/sidebar/get-mission-name-tags?quoteId="+quote_id,
			type: 'GET',
			'success': function (data) {
				missionname_tags = $.parseJSON(data);
			}
		});
		return missionname_tags;
	},
	/*END*/
	
	/*@ mention*/
	bousersInmention : function(){
	
		var mentionUserData=this.getmentionUserData();
	
		$('textarea.mention').each(function (){ 
		defaultValue =$(this).text();
		
		$(this).mentionsInput({ 
		
			minChars : 1,
			elastic  : false,
			defaultValue :defaultValue,	
        
			onDataRequest:function (mode, query, callback) {    	
				var data =mentionUserData;
				data = _.filter(data, function(item) {return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
				callback.call(this,data);
				},
				onCaret: true
			}); 
		});
	},

	/*# mention*/
	mentionhashtag : function(quote_id){		 
		//alert(quote_id);
		var missionTags=this.getmissionTags(quote_id);
		$('textarea.mention').each(function (){
			defaultValue =$(this).text();
			
			$(this).hashInput({ 
			
				minChars : 3,
				elastic  : false,
				defaultValue :defaultValue,
			
			onDataRequest:function (mode, query, callback) {    	
						var datas = missionTags;
						datas = _.filter(datas, function(item) {return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
						callback.call(this,datas);
					},
					onCaret: true
				}); 
		});
	}
}	