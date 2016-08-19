/**
 * Creates instance of class Page
 *
 * @param {String}   par.parentId 	 	- element selector which will wrap page
 * @param {String}   par.childId 	    - element selector which will contain page
 * @param {String}   par.tempalateUrl   - a link to the basic template
 * @param {Function} par.handlers       - function to bind events handlers
 * @this {Page}
 * @constructor
 */

var Page = function(par) {

	'use strict';
	
	if(!par || !par.parentId || !par.childId) 
			throw new Error('missing necessary arguments on Page constructor'); 

	var $parent = $('#' + par.parentId),
	 	$child; 
	
	// public interface
	this.close 	= close;
	this.open 	= open;

	// lazy definition pattern 
	function open() {

		_ini();
		this.open = function() {
			$child.fadeIn(0);
			$(window).trigger('moduleIsLoad');
		}

		if(par.templateUrl) {
			_loadTemplate(this.open);
		} else {
			par.handlers && par.handlers();
			this.open();
		}

	}	

	function close() {
		$child.fadeOut(0);
		$(window).trigger('moduleIsLoad');
	}

	// private util funcitons 
	function _loadTemplate(callback) {

		$.get(par.templateUrl)
			.done(function(response) {
				$child.html(response);
				par.handlers && par.handlers();				
				callback();
			})

	}

	function _ini() {
	 	$child = $('<div\>', { 'id': par.childId });
	 	$parent.append($child);
	}

}