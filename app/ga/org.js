/**
 * ga.js for .edgarhoo.org
 * */

if ( location.href.indexOf('la') < 0 ){
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-26013232-3']);
    _gaq.push(['_setDomainName', 'edgarhoo.org']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}
