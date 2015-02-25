/**
 * just.fangdeng.org js
 * @author Edgar
 * @build 09.13.2012
 */


define( 'url', function(){
    
    var loc = window.location,
        isLocal = loc.hostname.indexOf('la') > -1,
        path = loc.pathname + '',
        id = location.pathname + '',
        just, vin, hexjs, src;
    
    if ( isLocal ){
        just = 'http://just.dev.la/';
        vin = 'http://vin.dev.la/';
        hexjs = 'http://hexjs.dev.la/';
    } else {
        just = 'http://just.edgarhoo.org/';
        vin = 'http://vin.edgarhoo.org/';
        hexjs = 'http://hexjs.edgarhoo.org/';
    }
    
    if ( path.indexOf('just') > 0 ){
        //id.replace(/\//,'').replace(/\.html/,'');
        src = just + 'docs/' + path.substring(1).replace(/\//g,'-');
    } else if ( path.indexOf('vin') > 0 ) {
        src = vin + 'docs/' + path.substring(5).replace(/\//,'-');
    } else {
        src = hexjs + 'docs/' + path.substring(7);
    }
    
    return {
        just: just,
        vin: vin,
        hexjs: hexjs,
        src: src
    };
});

define( ['jquery','url'], function( $, url ){
    
    var $iframe = $('iframe');
    
    $iframe.length && $iframe.attr( 'src', url.src );
    
    if ( url.src.indexOf('hexjs') > 0 ){
        $iframe.css( 'height', '4026px' );
    }
    
} ).register();

define( ['jquery','url'], function( $, url ){
    
    var $li = $('nav li');
    
    var getJustDirectory = function( tag ){
        if ( window.justDocsDirectory ){
            renderJust( tag );
        } else {
            $.ajax({
                dataType: 'script',
                url: url.just + '/docs/directory.js',
                scriptCharset: 'utf-8',
                cache: false
            }).done(function(){
                renderJust( tag );
            });
        }
    },
    
    renderJust = function( tag ){
        var ul = '<ul>';
        
        $.each( justDocsDirectory[tag], function( idx, item ){
            ul += '<li><a href="/' + item.title + '.html">' + item.title + '</a></li>';
        } );
        
        ul += '</ul>';
        
        $(ul).appendTo('nav li[data-tag="'+tag+'"]')
    },
    
    getJustOrgDirectory = function( tag ){
        if ( window.justOrgDirectory ){
            renderJustOrg( tag );
        } else {
            $.ajax({
                dataType: 'script',
                url: '/directory.js',
                scriptCharset: 'utf-8',
                cache: false
            }).done(function(){
                renderJustOrg( tag );
            });
        }
    },
    
    renderJustOrg = function( tag ){
        var ul = '<ul>';
        
        $.each( justOrgDirectory[tag], function( idx, item ){
            ul += '<li><a href="' + item.path + '">' + item.title + '</a></li>';
        } );
        
        ul += '</ul>';
        
        $(ul).appendTo('nav li[data-tag="'+tag+'"]')
    },
    
    getVinDirectory = function(){
        $.ajax({
            dataType: 'script',
            url: url.vin + '/docs/directory.js',
            scriptCharset: 'utf-8',
            cache: false
        }).done(function(){
            renderVin();
        });
    },
    
    renderVin = function(){
        var ul = '<ul>';
        
        $.each( vinDocsDirectory, function( idx, item ){
            ul += '<li><a href="' + item.path.replace(/docs/,'vin').replace(/-/,'/') + '">' + item.title + '</a></li>';
        } );
        
        ul += '</ul>';
        
        $(ul).appendTo('nav li[data-tag="vin"]');
    };
    
    $('nav a.dropdown').on( 'click.nav', function(e){
        e.preventDefault();
        
        var $this = $(this),
            $next = $this.next(),
            $parent = $this.parent(),
            tag = $parent.data('tag');
        
        if ( !$next.length ){
            switch ( tag ){
                case 'vin':
                    getVinDirectory();
                    break;
                case 'spec':
                case 'article':
                case 'module':
                    getJustOrgDirectory(tag);
                    break;
                default:
                    getJustDirectory(tag);
                    break;
            }
        }
        
        if ( $parent.hasClass('triggered') ){
            $parent.removeClass('triggered');
        } else {
            $li.removeClass('triggered');
            $parent.addClass('triggered');
        }
        
    } );
    
    var overDelay = null;
    
    $('#site-nav').on( 'mouseenter.nav', function(){
        overDelay && clearTimeout( overDelay );
    } );
    
    $('#site-nav').on( 'mouseleave.nav', function(){
        overDelay = setTimeout( function(){
            $li.removeClass('triggered');
        }, 200 );
    } );
    
} ).register();
