!function(t){var a=86400,o=3600,e=60;t.fn.countdown=function(i){var n,f,r,c,l,u,h=t.extend({callback:function(){},timestamp:0,diff_date:125},i);return u=this.find(".position"),function s(){n=Math.floor(h.timestamp-(new Date).getTime()/1e3+h.diff_date),n<0&&(n=0),f=Math.floor(n/a),n-=f*a,r=Math.floor(n/o),n-=r*o,c=Math.floor(n/e),n-=c*e;var t=c;t<10&&(t="0"+t),l=n;var i=l;i<10&&(i="0"+i),h.callback(f,r,t,i),this.setTimeout(s,1e3)}(),this},t.fn.countup=function(i){var n,f,r,c,l,u,h=t.extend({callback:function(){},timestamp:0,diff_date:125},i);return u=this.find(".position"),function s(){n=Math.floor((new Date).getTime()/1e3-h.timestamp+h.diff_date),n<0&&(n=0),f=Math.floor(n/a),n-=f*a,r=Math.floor(n/o),n-=r*o,c=Math.floor(n/e),n-=c*e;var t=c;t<10&&(t="0"+t),l=n;var i=l;i<10&&(i="0"+i),h.callback(f,r,t,i),this.setTimeout(s,1e3)}(),this}}(jQuery);