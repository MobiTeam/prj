app.menu = (function($, M) {

	'use strict';

	var _configMap = {
		 templateUrl: 'tmpl/app.menu.tmpl',
		 	   templ: '',
		 	dataLink: 'tmpl/app.menu.json', 	
		 	 dataObj: {},  
		mainSelector: '#app_vertical',
		   container: '#app_vertical_menu'
	}

	return {
		open : open,
		close: close,
	} 

	function open(page) {
		
		this.open = function(page) {

			$(window).trigger('startModuleLoad');

			var selectedRole = app.data.getByStorage('selectedRole');	
			var pageChunks = [];
			var openedPage = page;

			while(!_configMap.dataObj[selectedRole][page] && page != '') {
				pageChunks = page.split('.');
				pageChunks.pop();

				page = pageChunks.join('.'); 
			}

			if(_configMap.dataObj[selectedRole][page]) {
				
				$(_configMap.container)
					.html(M.to_html(_configMap.templ, {items: _configMap.dataObj[selectedRole][page]}))
			
			}

			var $menu = $(_configMap.mainSelector);
			
			$menu
				.fadeIn(150)
				.find('.current_menu_item')
				.removeClass('current_menu_item');

			$menu
				.find('.menu_item[href="' + openedPage + '"]')
				.addClass('current_menu_item');

			$(window).trigger('moduleIsLoad');
			
		}

		_ini(this.open, page);
	
	}

	function close() {
		$(_configMap.mainSelector)
				.hide(0);
	}

	function _ini(callback, data) {

		$(window).trigger('startModuleLoad');
	
		$.get(_configMap.templateUrl)
			.done(function(response) {
				_configMap.templ = response;

				$.get(_configMap.dataLink)
					.done(function(response) {
						_configMap.dataObj = response;
						callback(data);
					})

			})

		_bindListeners();	

	}

	function _bindListeners() {

		$(_configMap.mainSelector)
			.on('click', 'a.menu_item', _onMenuItemClick)

	}

	// event listeners

	function _onMenuItemClick(event) {
		
		event.preventDefault();
		
		var $et = $(event.target);
		var $link = $et.closest('a');

		app.changePage($link.attr('href'), null, $link.attr('data-save-query'));
	}

})(jQuery, Mustache);