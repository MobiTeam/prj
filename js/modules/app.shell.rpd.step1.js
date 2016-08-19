app.shell.rpd.step1 = (function($) {

	'use strict';

	var _configMap = {
		templateUrl : 'tmpl/app.step1.tmpl',
		mainSelector: '#app-shell-step-1'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {

		$.get(_configMap.templateUrl).done(function(response) {
			
			app.data.get({that: 'speciality', callback: function(data) {
				$(_configMap.mainSelector).html(Mustache.to_html(response, data));
			}});

			_bindListeners();

			$(window).trigger('moduleLoaded', ['step1']);
		
		});
		
	}

	function _bindListeners() {
		console.log('1 was binded');
	}

})(jQuery);