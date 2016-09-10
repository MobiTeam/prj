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
	 	$child,
	 	template = '';

	// public interface
	this.close 	     = close;
	this.open 	     = open;
	this.getTemplate = getTemplate;
	this.getChild 	 = getChild;

	var _alreadyBinded = false;

	// lazy definition pattern 
	function open() {

		_ini();
		this.open = function() {
			if(par.updateData) {
				par.updateData(null, function() {
					$child.fadeIn(0);
					$(window)
						.trigger('moduleIsLoad');
					
					if(!_alreadyBinded) {
						par.handlers && par.handlers();
						_alreadyBinded = true;
					}
				});
			} else {
				$child.fadeIn(0);
				$(window)
					.trigger('moduleIsLoad');
				if(!_alreadyBinded) {
					par.handlers && par.handlers();
					_alreadyBinded = true;
				}	
			}
		}

		if(par.templateUrl) {
			_loadTemplate(this.open);
		} else {
			this.open();
		}

	}	

	function close() {
		$child.fadeOut(0);
		$(window).trigger('moduleIsLoad');
	}

	function getTemplate() {
		return template;
	}	

	function getChild() {
		return $child;
	}

	// private util funcitons 
	function _loadTemplate(callback) {

		$.get(par.templateUrl)
			.done(function(response) {
				$child.html(response);
				template = response;
				callback();
			})
			.error(function() {
				alert("При загрузке страницы произошла ошибка");
				$(window).trigger('moduleIsLoad');
			})

	}

	function _ini() {
	 	$child = $('<div\>', { 'id': par.childId });
	 	$parent.append($child);
	}

}