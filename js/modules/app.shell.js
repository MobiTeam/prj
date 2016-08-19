app.shell = (function($) {

	'use strict';
	// var _configMap = {
 //            templateUrl: 'tmpl/app.auth.html',
	// 		mainSelector: '#app-auth'
	// 	}

	// var $container = $('#app-shell-content');

	return {
		open : open,
		close: close,
	} 

	function open() {
		$(window).trigger('moduleIsLoad');
	}

	function close() {
		// alert('типо закрылся');
	}

	// function ini() {
	// 	$container.load('tmpl/app.shell.html', _iniChildModules);
	// }

	// function _iniChildModules() {
	// 	for(var key in app.shell) {
	// 		key != 'ini' && app[key].ini && app[key].ini();
	// 	}
	// }

})(jQuery);