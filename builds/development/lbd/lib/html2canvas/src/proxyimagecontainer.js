function ProxyImageContainer(e,n){document.createElement("script");var r=document.createElement("a");r.href=e,e=r.href,this.src=e,this.image=new Image;var i=this;this.promise=new Promise(function(r,o){i.image.crossOrigin="Anonymous",i.image.onload=r,i.image.onerror=o,new ProxyURL(e,n,document).then(function(e){i.image.src=e}).catch(o)})}