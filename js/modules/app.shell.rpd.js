app.shell.rpd = (function($) {

	'use strict';

	var _mainTemplate = '<div id="app-shell-rpd-step-1">\
						 </div>\
						 <div id="app-shell-rpd-step-2">Загрузка...\
						 </div>\
						 <div id="app-shell-rpd-step-3">Загрузка...\
						 </div>\
						 <div id="app-shell-rpd-step-4">Загрузка...\
						 </div>\
						 <div id="app-shell-rpd-step-5">Загрузка...\
						 </div>';

	var $container = $('#app-shell-rpd');					 

	return {
		ini: ini
	}

	function ini() {

		$container.html(_mainTemplate);

		for(var key in app.shell.rpd) {
			key != 'ini' && app[key].ini && app[key].ini();
		}
		
	}


})(jQuery);