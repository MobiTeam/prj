app.step1 = (function($) {

	var _configMap = {
		templateUrl : 'tmpl/app.step1.html',
		mainSelector: '#app-shell-step-1'
	}

	return {
		ini: ini,
		mainSelector: _configMap.mainSelector
	}

	function ini() {
		$(_configMap.mainSelector).load(_configMap.templateUrl, function() {
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step1']);
		});
	}

	function _bindListeners() {
		console.log('1 was binded');
	}

})(jQuery);