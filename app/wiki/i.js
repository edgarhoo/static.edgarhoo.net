/**
 * wiki i js
 * @author Edgar
 * @build 11.20.2011
 * */

hexjs.define(function(){
    
    var doc = document,
        article = doc.getElementsByTagName('article')[0],
        aside = doc.getElementsByTagName('aside')[0],
        nav = doc.createElement('nav'),
        h1 = article.querySelectorAll('h1'),
        h2 = {},
        ol = '<ol>';
    
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
        var h = h1[i];
        i++;
        h.id = 'section-' + i;
        getNext(h);
    }
    
    for ( i = 0; i < l; i++ ){
        var h = h1[i],
            pre = h.id;
        ol += '<li><a href="#'+pre+'">'+h.innerHTML+'</a>'+getSubOl(pre)+'</li>';
    }
    
    ol += '</ol>';
    nav.innerHTML = ol;
    aside.appendChild(nav);
    
}).register();
