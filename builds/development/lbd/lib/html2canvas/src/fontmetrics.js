function FontMetrics(){this.data={}}FontMetrics.prototype.getMetrics=function(t,i){return void 0===this.data[t+"-"+i]&&(this.data[t+"-"+i]=new Font(t,i)),this.data[t+"-"+i]};