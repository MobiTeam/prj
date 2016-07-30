app.shell = (function() {

	var _mainTemplate = '<div id="app-shell-step-1">\
						 </div>\
						 <div id="app-shell-step-2">Загрузка...\
						 </div>\
						 <div id="app-shell-step-3">Загрузка...\
						 </div>\
						 <div id="app-shell-step-4">Загрузка...\
						 </div>\
						 <div id="app-shell-step-5">Загрузка...\
						 </div>';

	var $container = $('#app-shell-content');

	return {
		ini: ini
	} 

	function ini() {

		$container.html(_mainTemplate);
		for(var key in app) {
			key != 'shell' && app[key].ini && app[key].ini();
		}
		
	}

})();