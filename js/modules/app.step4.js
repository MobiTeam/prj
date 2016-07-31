app.step4 = (function($) {

	'use strict';
	
	var _configMap = {
		templateUrl : 'tmpl/app.step4.html',
		mainSelector: '#app-shell-step-4'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {
		$(_configMap.mainSelector).load(_configMap.templateUrl, function() {
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step4']);
		});
	}

	function _bindListeners() {
		console.log('4 was binded');
	}

})(jQuery);