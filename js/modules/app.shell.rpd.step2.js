app.shell.rpd.step2 = (function($) {

	'use strict';

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
			_configModule();
			_bindListeners();
			$(window).trigger('moduleLoaded', ['step2']);
		});

	}

	function _configModule() {

		 new $.Zebra_Tooltips($('.app-shell-img-question'), {
	        'background_color': '#26C6DA',
	        'color':            '#FFF',
	    	'position':         'right',
	    	'animation_speed':   250,
	    	'animation_offset':  10,
	    	'close_on_click':    false,
	    	'default_position':  'above'});
	}

	function _bindListeners() {


		var trN = 1;
		$(_configMap.mainSelector)
			.on('click', '.task-btn-add', function() {
				++trN;
				$("#app-shell-step2-task-table").append("<tr class='app-shell-step2-task-table-tr-"+ trN +"'></tr>");
				$('.app-shell-step2-task-table-tr-'+ trN).html("<td><input class='app-shell-step2-task-text app-shell-step2-task-text-"+ trN +"' type='text' /></td>\
					<td><input class='task-btn-del' type='button' value='- Удалить'  id='app-shell-step2-task-del'  \
					name='app-shell-step2-task-table-tr-"+ trN +"' /></td>");
						})
			.on('click', '.task-btn-del', function(event) {
					$("."+event.currentTarget.name).remove();
			})
		   
		

		console.log('2 was binded');

	}

})(jQuery);
