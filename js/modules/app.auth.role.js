app.auth.role = (function($, M) {
	
	'use strict';

	var _configMap = {
		templateUrl: 'tmpl/app.auth.role.tmpl',
		mainSelector: '#app-authorization-select-role'
	}

	return {
	 	open  : open,
	 	close : close
	}

	function open() {
		_ini();
		this.open = function() {
			
			app.menu.close();
			
			$(_configMap.mainSelector)
				.fadeIn(200);
			
			$(window)
				.trigger('moduleIsLoad');
		
		};
		this.open();
	}

	function close() {
		
		$(_configMap.mainSelector)
				.fadeOut(0);

	}

	function _ini() {

		$.get(_configMap.templateUrl).done(function(response) {
			
			$(_configMap.mainSelector).html(M.to_html(response, app.data.getByStorage('userInfo')));
			_bindListeners();

		});
		
	}

	function _bindListeners() {
		
		$('.app-authorization-select-role-btn')
			.on('click', _changeRoleButtonCLick);
			
	}

	// event handlers 
		
	function _changeRoleButtonCLick(event) {
		
		var $et = $(event.target);
		
		app.data.setToStorage('selectedRole', $et.val());

		$(window).trigger('roleIsChanged');

	}

})(jQuery, Mustache);