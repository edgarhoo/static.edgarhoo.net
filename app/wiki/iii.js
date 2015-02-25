
//demo
define(function(){
    
    var doc = document,
        article = doc.querySelector('article'),
        public = article.querySelectorAll('script[type="text/style"]')[0],
        demos = article.querySelectorAll('script[type="text/demo"]');
        
    public = public ? public.innerHTML : '';
    
    var render = function( demo ){
        var demoRender = doc.createElement('div'),
            iframe = doc.createElement('iframe');
            
        demoRender.classList.add('demo');
        article.replaceChild( demoRender, demo );
            
        iframe.src = 'http://assets.edgarhoo.net/blank.html';
        
        demoRender.appendChild(iframe);
        
        //iframe.style.height = '0px';
        
        var iframeDoc = iframe.contentWindow.document;
        
        iframeDoc.open();
        iframeDoc.write( '<!DOCTYPE html>' + public + '<div id="im-justkit-demo" style="overflow:hidden;">' + demo.innerHTML + '</div>' );
        iframeDoc.close();
        
        var iframeHtml = iframeDoc.documentElement;
        iframeHtml.style.overflowY = 'hidden';
        
        iframe.style.height = demo.getAttribute('data-height');
        //setTimeout( function(){
        //    iframe.style.height //= iframeHtml.style.height
                          //= iframeDoc.body.style.height
        //                  = iframeDoc.getElementById('im-edgar-wiki-demo').scrollHeight + 'px';
        //}, 200 );
        
    };
    
    for ( var i = 0, l = demos.length; i < l; i++ ){
        render( demos[i] );
    }
    
});

