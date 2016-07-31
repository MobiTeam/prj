app.step3 = (function($) {

	'use strict';

	var _configMap = {
		templateUrl : 'tmpl/app.step3.html',
		mainSelector: '#app-shell-step-3'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {
		$(_configMap.mainSelector).load(_configMap.templateUrl, function() {
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step3']);
		});
	}

	function _bindListeners() {
		console.log('3 was binded');
	}

})(jQuery);