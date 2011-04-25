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
            var container = $('<div class="block"></div>');
            container.append('<h2 class="navigation">Page Navigation</h2>');
            var block = $('<div class="block-in"></div>');
            container.append(block);
            var toc = function(section, container, margin) {
                var ul = $('<ul></ul>');
                section.children('.section[id^="zend."]').each(function(){
                    var child = $(this);
                    var li = $('<li></li>');
                    var link = $('<a></a>');
                    link.attr('href', '#' + child.attr('id'));
                    link.html(child.find('h1.title:eq(0)').html());
                    li.append(link);
                    ul.append(li);
                    toc(child, li, '0 0 0 15px');
                });
                if (ul.length) {
                    ul.css({
                        margin: margin,
                        padding: 0
                    });
                    container.append(ul);
                }
            };
            toc(manual, block, 0);
            $('div.right-nav').append(container);
        });
    };

    // load jQuery and execute the main function
    addJQuery(main);
})();