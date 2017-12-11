function CanvasRenderer(t,e){Renderer.apply(this,arguments),this.canvas=this.options.canvas||this.document.createElement("canvas"),this.options.canvas||(this.canvas.width=t,this.canvas.height=e),this.ctx=this.canvas.getContext("2d"),this.taintCtx=this.document.createElement("canvas").getContext("2d"),this.ctx.textBaseline="bottom",this.variables={},log("Initialized CanvasRenderer with size",t,"x",e)}function hasEntries(t){return t.length>0}CanvasRenderer.prototype=Object.create(Renderer.prototype),CanvasRenderer.prototype.setFillStyle=function(t){return this.ctx.fillStyle="object"==typeof t&&t.isColor?t.toString():t,this.ctx},CanvasRenderer.prototype.rectangle=function(t,e,i,a,n){this.setFillStyle(n).fillRect(t,e,i,a)},CanvasRenderer.prototype.circle=function(t,e,i,a){this.setFillStyle(a),this.ctx.beginPath(),this.ctx.arc(t+i/2,e+i/2,i/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()},CanvasRenderer.prototype.circleStroke=function(t,e,i,a,n,r){this.circle(t,e,i,a),this.ctx.strokeStyle=r.toString(),this.ctx.stroke()},CanvasRenderer.prototype.drawShape=function(t,e){this.shape(t),this.setFillStyle(e).fill()},CanvasRenderer.prototype.taints=function(t){if(null===t.tainted){this.taintCtx.drawImage(t.image,0,0);try{this.taintCtx.getImageData(0,0,1,1),t.tainted=!1}catch(e){this.taintCtx=document.createElement("canvas").getContext("2d"),t.tainted=!0}}return t.tainted},CanvasRenderer.prototype.drawImage=function(t,e,i,a,n,r,o,s,h){this.taints(t)&&!this.options.allowTaint||this.ctx.drawImage(t.image,e,i,a,n,r,o,s,h)},CanvasRenderer.prototype.clip=function(t,e,i){this.ctx.save(),t.filter(hasEntries).forEach(function(t){this.shape(t).clip()},this),e.call(i),this.ctx.restore()},CanvasRenderer.prototype.shape=function(t){return this.ctx.beginPath(),t.forEach(function(t,e){"rect"===t[0]?this.ctx.rect.apply(this.ctx,t.slice(1)):this.ctx[0===e?"moveTo":t[0]+"To"].apply(this.ctx,t.slice(1))},this),this.ctx.closePath(),this.ctx},CanvasRenderer.prototype.font=function(t,e,i,a,n,r){this.setFillStyle(t).font=[e,i,a,n,r].join(" ").split(",")[0]},CanvasRenderer.prototype.fontShadow=function(t,e,i,a){this.setVariable("shadowColor",t.toString()).setVariable("shadowOffsetY",e).setVariable("shadowOffsetX",i).setVariable("shadowBlur",a)},CanvasRenderer.prototype.clearShadow=function(){this.setVariable("shadowColor","rgba(0,0,0,0)")},CanvasRenderer.prototype.setOpacity=function(t){this.ctx.globalAlpha=t},CanvasRenderer.prototype.setTransform=function(t){this.ctx.translate(t.origin[0],t.origin[1]),this.ctx.transform.apply(this.ctx,t.matrix),this.ctx.translate(-t.origin[0],-t.origin[1])},CanvasRenderer.prototype.setVariable=function(t,e){return this.variables[t]!==e&&(this.variables[t]=this.ctx[t]=e),this},CanvasRenderer.prototype.text=function(t,e,i){this.ctx.fillText(t,e,i)},CanvasRenderer.prototype.backgroundRepeatShape=function(t,e,i,a,n,r,o,s,h){var c=[["line",Math.round(n),Math.round(r)],["line",Math.round(n+o),Math.round(r)],["line",Math.round(n+o),Math.round(s+r)],["line",Math.round(n),Math.round(s+r)]];this.clip([c],function(){this.renderBackgroundRepeat(t,e,i,a,h[3],h[0])},this)},CanvasRenderer.prototype.renderBackgroundRepeat=function(t,e,i,a,n,r){var o=Math.round(a.left+e.left+n),s=Math.round(a.top+e.top+r);this.setFillStyle(this.ctx.createPattern(this.resizeImage(t,i),"repeat")),this.ctx.translate(o,s),this.ctx.fill(),this.ctx.translate(-o,-s)},CanvasRenderer.prototype.renderBackgroundGradient=function(t,e){if(t instanceof LinearGradientContainer){var i=this.ctx.createLinearGradient(e.left+e.width*t.x0,e.top+e.height*t.y0,e.left+e.width*t.x1,e.top+e.height*t.y1);t.colorStops.forEach(function(t){i.addColorStop(t.stop,t.color.toString())}),this.rectangle(e.left,e.top,e.width,e.height,i)}},CanvasRenderer.prototype.resizeImage=function(t,e){var i=t.image;if(i.width===e.width&&i.height===e.height)return i;var a=document.createElement("canvas");return a.width=e.width,a.height=e.height,a.getContext("2d").drawImage(i,0,0,i.width,i.height,0,0,e.width,e.height),a};