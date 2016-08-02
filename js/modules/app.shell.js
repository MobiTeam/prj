app.shell = (function($) {

	'use strict';

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

/*	var _navigation = '<div id="app-shell-progress">\
						<ul class="app-shell-progress-ul">\
						  <li>\
						  	 <a class="app-shell-progress-step-information" title="На данном шаге содержится справочная информация1"  href="#!page=step1">Шаг 1</a>\
					  	  </li>\
						  <li>\
						 	 <a class="app-shell-progress-step-information" title="На данном шаге содержится справочная информация2"  href="#!page=step2">Шаг 2</a>\
						  </li>\
						  <li>\
						  	 <a class="app-shell-progress-step-information" title="На данном шаге содержится справочная информация3"  href="#!page=step3">Шаг 3</a>\
					  	  </li>\
						  <li>\
						  	 <a class="app-shell-progress-step-information" title="На данном шаге содержится справочная информация4"  href="#!page=step4">Шаг 4</a>\
					  	  </li>\
						  <li>\
						  	 <a class="app-shell-progress-step-information" title="На данном шаге содержится справочная информация5"  href="#!page=step5">Шаг 5</a>\
						  </li>\
						</ul>\
					</div>';*/					 

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

})(jQuery);