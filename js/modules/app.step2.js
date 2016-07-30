app.step2 = (function($) {

	var _configMap = {
		templateUrl : 'tmpl/app.step2.html',
		mainSelector: '#app-shell-step-2'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {
		$(_configMap.mainSelector).load(_configMap.templateUrl, function() {
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step2']);
		});
	}

	function _bindListeners() {
		console.log('2 was binded');
	}

})(jQuery);