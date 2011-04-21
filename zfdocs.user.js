// ==UserScript==
// @name         Zend Framework Manual Improver
// @namespace    ZendFrameworkManualImprover
// @include      *
// @author       Hector Virgen
// @description  Improves the documentation for Zend Framework
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	jQuery(function($){
		var manual = $('#manual-container');
		var sections = manual.find('.section[id^="zend."]');
		
		if (0 == sections.length) {
			return;
		}
		
		var contents = $('<ul></ul>');
		var container = $('<div class="section"></div>');
		
		container.append('<div class="info"><h1 class="title" id="table-of-contents">Table of Contents</h1></div>');
		
		sections.each(function() {
			var section = $(this);
			var id = section.attr('id');
			contents.append('<li><a href="#' + id + '">' + id + '</a></li>');
		});
		
		container.append(contents);
		manual.find('hr:eq(0)').after(container);
	});
}

// load jQuery and execute the main function
addJQuery(main);