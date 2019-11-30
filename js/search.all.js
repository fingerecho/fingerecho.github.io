/*


    jQuery.extend(
        {
            highlight:function(e,t,n,r){
                if(3===e.nodeType){
                    var i=e.data.match(t);
                    if(i){
                        var o=document.createElement(n||"span");
                        o.className=r||"highlight";
                        var s=e.splitText(i.index);
                        s.splitText(i[0].length);
                        var a=s.cloneNode(!0);
                        return o.appendChild(a),s.parentNode.replaceChild(o,s),1}
                }else if(1===e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName)&&(e.tagName!==n.toUpperCase()||e.className!==r))for(var u=0;u<e.childNodes.length;u++)u+=jQuery.highlight(e.childNodes[u],t,n,r);return 0}
        }),
        jQuery.fn.unhighlight=function(e){var t={className:"highlight",element:"span"};
        return jQuery.extend(t,e),this.find(t.element+"."+t.className).each(function(){
            var e=this.parentNode;e.replaceChild(this.firstChild,this),e.normalize()}).end()},
        jQuery.fn.highlight=function(e,t){var n={
            className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1};
        if(jQuery.extend(n,t),e.constructor===String&&(e=[e]),e=jQuery.grep(e,function(e){return""!=e}),e=jQuery.map(e,function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}),0==e.length)
            return this;var r=n.caseSensitive?"":"i",i="("+e.join("|")+")";n.wordsOnly&&(i="\\b"+i+"\\b");var o=new RegExp(i,r);return this.each(function(){jQuery.highlight(this,o,n.element,n.className)})},function(){"use strict";function e(){$("h1, h2").each(function(){var e=$(this),t=e.nextUntil("h1, h2");f.add({id:e.prop("id"),title:e.text(),body:t.text()})}),t()}function t(){f.tokenStore.length>5e3&&(c=300)}function n(){s=$(".content"),a=$(".search-results"),$("#input-search").on("keyup",function(e){var t=function(){return function(e,t){clearTimeout(l),l=setTimeout(e,t)}}();t(function(){r(e)},c)})}function r(e){var t=$("#input-search")[0];if(o(),a.addClass("visible"),27===e.keyCode&&(t.value=""),t.value){var n=f.search(t.value).filter(function(e){return e.score>1e-4});n.length?(a.empty(),$.each(n,function(e,t){var n=document.getElementById(t.ref);a.append("<li><a href='#"+t.ref+"'>"+$(n).text()+"</a></li>")}),i.call(t)):(a.html("<li></li>"),$(".search-results li").text('No Results Found for "'+t.value+'"'))}else o(),a.removeClass("visible")}function i(){this.value&&s.highlight(this.value,u)}function o(){s.unhighlight(u)}var s,a,u={element:"span",className:"search-highlight"},c=0,l=0,f=new lunr.Index;f.ref("id"),f.field("title",{boost:10}),f.field("body"),f.pipeline.add(lunr.trimmer,lunr.stopWordFilter),$(e),$(n)}();*/
