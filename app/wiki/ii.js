/**
 * Edgar's Wiki JavaScript v2
 * @author Edgar
 * @build 08.25.2012
 * */


/* when self !== top */
hexjs.define(function(){
    
    var doc = document,
        setHeight,
        height,
        iframe,
        title,
        poll,
        forJust;
    
    if ( self !== top ){
        
        forJust = doc.querySelectorAll('.for-just');
        
        if ( forJust.length > 0 ){
            for ( var i = 0; i < forJust.length; i++ ){
                forJust[i].style.display = 'block';
            }
        }
        
        title = doc.querySelectorAll('header h1')[0].innerHTML;
        
        setHeight = function(){
            iframe.src = ( doc.location.hostname.indexOf('la') > -1 ? 'http://la.just.fangdeng.org/' : 'http://just.fangdeng.org/' ) + 'proxy.html?' + height + 'px#' + title;
        };
        
        poll = function(){
            if ( height !== doc.documentElement.scrollHeight ){
                height = doc.documentElement.scrollHeight;
                setHeight();
                
                setTimeout( poll, 500 );
            }
        };
        
        window.onload = function(){
            height = doc.documentElement.scrollHeight;
            iframe = doc.createElement('iframe');
            
            setHeight();
            iframe.style.display = 'none';
            
            doc.querySelectorAll('article')[0].appendChild(iframe);
            
            setTimeout( poll, 1000 );
        };
        
        doc.documentElement.style.overflowY = 'hidden';
        doc.querySelectorAll('aside nav:first-child')[0].style.display = 'none';
    }
    
}).register('~');

/* display demo */
hexjs.define(function(){
    
    var doc = document,
        public = doc.querySelectorAll('article > script[type="text/template"]')[0],
        demos = doc.querySelectorAll('div.demo script');
        
    public = public ? public.innerHTML : '';
    
    var render = function( demo ){
        var parent = demo.parentNode,
            iframe = doc.createElement('iframe');
            
        iframe.src = '/blank.html';
        
        parent.removeChild(parent.lastElementChild);
        parent.appendChild(iframe);
        
        //iframe.style.height = '0px';
        
        var iframeDoc = iframe.contentWindow.document;
        
        iframeDoc.open();
        iframeDoc.write( '<!DOCTYPE html>' + public + '<div id="im-edgar-wiki-demo" style="overflow:hidden;">' + demo.innerHTML + '</div>' );
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
    
}).register();


/* create page nav */
hexjs.define(function(){
    
    var doc = document,
        aside = doc.getElementsByTagName('aside')[0],
        nav = doc.createElement('nav'),
        selector = self === top ? 'article > h1' : 'article h1',
        h1 = doc.querySelectorAll( selector ),
        h2 = {},
        ol = '<ol>',
        h;
    
    var getNext = function( el ){
        var next = el.nextElementSibling,
            pre = el.id,
            i = 1;
        
        h2[pre] = [];
        
        while( next ){
            if ( next.tagName.toLowerCase() === 'h2' ){
                h2[pre].push(next);
                next.id = pre + '-' + i++;
            }
            if ( next.tagName.toLowerCase() === 'h1' ){
                return;
            }
            next = next.nextElementSibling;
        }
    },
    
    getSubOl = function( pre ){
        var ol = '<ol>';
        for ( var i = 0, l = h2[pre].length; i < l; i++ ){
            var h = h2[pre][i];
            ol += '<li><a href="#'+h.id+'">'+h.innerHTML+'</a></li>';
        }
        ol += '</ol>';
        return ol;
    };
    
    if ( h1.length < 2 ){
        return;
    }
    
    for ( var i = 0, l = h1.length; i < l; ){
        h = h1[i];
        i++;
        h.id = 'section-' + i;
        getNext(h);
    }
    
    for ( i = 0; i < l; i++ ){
        h = h1[i],
        pre = h.id;
        ol += '<li><a href="#'+pre+'">'+h.innerHTML+'</a>'+getSubOl(pre)+'</li>';
    }
    
    ol += '</ol>';
    nav.innerHTML = ol;
    aside.appendChild(nav);
    
}).register();


/* directory dropdown */
hexjs.define(function(){
    
    var doc = document,
        dropdown = doc.querySelectorAll('aside nav a.dropdown')[0],
        directory = doc.getElementById('directory');
        
    dropdown.addEventListener( 'click', function(e){
        e.preventDefault();
        if ( directory.className.indexOf('triggered') > -1 ){
            directory.classList.remove('triggered');
            dropdown.classList.remove('triggered')
        } else {
            directory.classList.add('triggered');
            dropdown.classList.add('triggered');
        }
    }, false );
    
}).register();
