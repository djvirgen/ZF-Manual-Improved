// ==UserScript==
// @name         Zend Framework Manual Improver
// @namespace    ZendFrameworkManualImprover
// @include      *
// @author       Hector Virgen
// @description  Improves the documentation for Zend Framework
// ==/UserScript==

(function(){
    // Return early if not on Zend Framework's website.
    if (!/framework.zend.com/.test(document.location)) {
        return;
    }
    
    // a function that loads jQuery and calls a callback function when jQuery has finished loading
    var addJQuery = function(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    };

    // the guts of this userscript
    var main = function() {
        jQuery(function($){
            var manual = $('#manual-container');
            var container = $('<div class="section"></div>');
            container.append('<div class="info"><h1 class="title"><strong>Table of Contents</strong></h1></div>');
            var toc = function(section, container) {
                var ul = $('<ul></ul>');
                section.children('.section[id^="zend."]').each(function(){
                    var child = $(this);
                    var li = $('<li></li>');
                    var link = $('<a></a>');
                    link.attr('href', '#' + child.attr('id'));
                    link.html(child.find('h1.title:eq(0)').html());
                    li.append(link);
                    ul.append(li);
                    toc(child, li);
                });
                if (ul.length) {
                    ul.css({
                        margin: '0 0 0 20px',
                        padding: 0
                    });
                    container.append(ul);
                }
            };
            toc(manual, container);
            manual.find('hr:eq(0)').after(container);
        });
    };

    // load jQuery and execute the main function
    addJQuery(main);
})();