function PseudoElementContainer(e,t,o){NodeContainer.call(this,e,t),this.isPseudoElement=!0,this.before=":before"===o}PseudoElementContainer.prototype.cloneTo=function(e){PseudoElementContainer.prototype.cloneTo.call(this,e),e.isPseudoElement=!0,e.before=this.before},PseudoElementContainer.prototype=Object.create(NodeContainer.prototype),PseudoElementContainer.prototype.appendToDOM=function(){this.before?this.parent.node.insertBefore(this.node,this.parent.node.firstChild):this.parent.node.appendChild(this.node),this.parent.node.className+=" "+this.getHideClass()},PseudoElementContainer.prototype.cleanDOM=function(){this.node.parentNode.removeChild(this.node),this.parent.node.className=this.parent.node.className.replace(this.getHideClass(),"")},PseudoElementContainer.prototype.getHideClass=function(){return this["PSEUDO_HIDE_ELEMENT_CLASS_"+(this.before?"BEFORE":"AFTER")]},PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE="___html2canvas___pseudoelement_before",PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER="___html2canvas___pseudoelement_after";