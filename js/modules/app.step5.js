app.step5 = (function($) {
	
	'use strict';

	var _configMap = {
		templateUrl : 'tmpl/app.step5.html',
		mainSelector: '#app-shell-step-5'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {
		$(_configMap.mainSelector).load(_configMap.templateUrl, function() {
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step5']);
		});
	}

	function _bindListeners() {
		console.log('5 was binded');
	}

})(jQuery);