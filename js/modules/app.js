// main app module

var app = (function($) {

	'use strict';

	// current app state
	// icluded information about current URL, cached jQuery DOM elements and action list

	var state = {
		currentAnchor: {
			page: 'step1'
		},
		jqueryMap: {
			$preloader: $('.screen-center'),
			$mainBlock: $('#app-shell-content')
		},
		actionList: {
			'page': _showPage
		}
	}
	
	return {
		start: start
	}

	// start application function
	// inclided initialisation, configuration and binding events listeners

	function start() {
		app.shell.ini();
		_configApp();
		_bindListeners();
		_markMenuItem(state.currentAnchor.page);
	}

	function _configApp() {

		$.uriAnchor.configModule({
			schema_map : {
				page: { step1: true, step2: true, step3: true, step4: true, step5: true }
			}
		});

        new $.Zebra_Tooltips($('.app-shell-progress-step-information'), {
        	'background_color': '#26C6DA',
        	'color':            '#FFF',
    		'position':         'center',
    		'animation_speed':   180,
    		'animation_offset':  10,
    		'default_position':  'below'});


        // Доделать (перебрасывает на page=step1)
        // var newAnchor = $.uriAnchor.makeAnchorMap();

        // if(newAnchor.page) {
        // 	_updateAnchor(newAnchor);
        // } else {
       	// 	_updateAnchor(state.currentAnchor);
        // }

        _updateAnchor(state.currentAnchor);


	}

	function _bindListeners() {

		$(window).bind('hashchange',   _onHashChange)
				 .bind('moduleLoaded', _onModuleLoad);

	}

	// events handlers

	function _onHashChange() {

		var newAnchor = $.uriAnchor.makeAnchorMap(),
			oldAnchor = state.currentAnchor;

		if(_updateAnchor(newAnchor)) {
			
			_applyChanges(newAnchor, oldAnchor);
			_markMenuItem();

		}
	
	}

	function _onModuleLoad(event, moduleId) {
		
	 	var currentModule = $.uriAnchor.makeAnchorMap().page;
	 	
	 	if(moduleId == currentModule) {
	 		_hidePreloader();
	 		_animateMainBlock();
	 	}

	}

	//  some functions

	function _applyChanges(newObj, oldObj) {

		for(var key in newObj) {
			if(!~key.indexOf('_s_')) {
				if(!oldObj[key] || newObj[key] != oldObj[key]) {
					state.actionList[key](newObj[key]);
				}	
			}
		}
	
	}

	function _updateAnchor(newAnchor) {
		try {
			$.uriAnchor.setAnchor(newAnchor);
			state.currentAnchor = newAnchor;
		} catch(e) {
			$.uriAnchor.setAnchor(state.currentAnchor);
			return false;
		}
		return true;
	}

	function _hidePreloader() {
		state.jqueryMap.$preloader.hide(0);
	}

	function _animateMainBlock() {
		state.jqueryMap.$mainBlock
						.css({'opacity'  : '0.8',
							  'marginTop': '-10px'})
						.animate({ 'opacity'  : '1',
								   'marginTop': '0px' }, 300);
	}

	function _showPage(page) {

		state.jqueryMap.$mainBlock.children().hide();
		
		try {
			$(app[page].mainSelector).show();
			_animateMainBlock();
		} catch(e) {

		}

	}

	// переписать
	function _markMenuItem(item) {
		
		var numberStep = +(state.currentAnchor.page.replace(/\D/g, '')) - 1;

		$(".app-shell-progress-ul li").removeClass("selected-step");
		$(".app-shell-progress-ul li:eq("+numberStep+")").addClass("selected-step");
	
	}

})(jQuery);