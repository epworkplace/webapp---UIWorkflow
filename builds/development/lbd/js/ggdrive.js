			 /* ..For test.. */
			var developerKey = 'AIzaSyCEJM-RUGvMK91x51F4lgXfbgJ1G6c7Adg';
			var clientId = "942505068713-dl6vtmtpcrk36i54c1b2ruijt0a6jcr3.apps.googleusercontent.com"
			/* ..for live.. */
			/* var developerKey = 'AIzaSyDLKvAtveYsVT-AZpPp5GdzKtiRghA5Jpk';
			var clientId = "676019975691-g1r1e4qsidfik97i623rg98i4700mo03.apps.googleusercontent.com" */
			var scope = ['https://www.googleapis.com/auth/drive'];
			
			var pickerApiLoaded = false;
			var oauthToken;	
				
		function onApiLoad() {
			
			gapi.load('auth', {'callback': onAuthApiLoad});
			gapi.load('picker', {'callback': onPickerApiLoad});
		}

		function onAuthApiLoad() {
			window.gapi.auth.authorize(
			{
				'client_id': clientId,
				'scope': scope,
				'immediate': false
			},
				handleAuthResult);
		}

		function onPickerApiLoad() {
			pickerApiLoaded = true;
			//createPicker();
		}

		function handleAuthResult(authResult) {
			if (authResult && !authResult.error) {
				oauthToken = authResult.access_token;
				createPicker();
			}
		}

		function createPicker() {
			if (pickerApiLoaded && oauthToken) {
				var picker = new google.picker.PickerBuilder().			  	
				addView(google.picker.ViewId.DOCS).
				addView(new google.picker.DocsUploadView()).
				addView(google.picker.ViewId.FOLDERS).
				setOAuthToken(oauthToken).
				setDeveloperKey(developerKey).
				setCallback(pickerCallback).
				build();
				picker.setVisible(true);
				
				 var elements= document.getElementsByClassName('picker-dialog');
					for(var i=0;i<elements.length;i++)
					{
						elements[i].style.zIndex = "2000";
					} 
						
			}
					
		}

		function pickerCallback(data) {
			
			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
				var doc = data[google.picker.Response.DOCUMENTS][0];		  
				//doc.forEach(function(element,index) {
					title=doc[google.picker.Document.NAME];
					viewurl=doc[google.picker.Document.URL];
					
				//});
				
				 if(title || viewurl){		
						$("#doc_ggdrive").show();
						$('#drive_filename').val(title);
						$('#drive_filelink').val(viewurl);	
				}  
			
			}
			
		}