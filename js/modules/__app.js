// main app module

var app = (function($) {

	'use strict';

	// current app state
	// icluded information about current URL, cached jQuery DOM elements and action list

	var state = {
		currentAnchor: {
			page: 'auth'
		},
		currentOpenBlock: '',
		jqueryMap: {
			$preloader:    $('.screen-center'),
			$overlay:      $('.overlay'),
			$mainBlock:    $('#app-shell-content'),
			$verticalMenu: $('#app_vertical'),
			$shell:        $('#app-shell')
		},
		actionList: {
			'page': _showPage
		}, 
		isAuth: localStorage.isAuth
	}
	
	return {
		start: start
	}

	// start application function
	// inclided initialisation, configuration and binding events listeners

	function start() {
		
		_configApp();
		_bindListeners();
	
		if(state.isAuth) {
			$(window).trigger('userLogin');
		} else {
			$(window).trigger('userLogout');
		}	
				
	}

	function _configApp() {

		$.uriAnchor.configModule({
			schema_map : {
				page: { step1: true, step2: true, step3: true, step4: true, step5: true, auth: true }
			}
		});

    }

	function _bindListeners() {

		$(window)
			.bind('hashchange',   _onHashChange)
			.bind('moduleLoaded', _onModuleLoad)
			.bind('userLogin',    _onUserLogin)
			.bind('userLogout',   _onUserLogout);

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

	function _onModuleLoad(event, moduleId, moduleSel) {
		
		state.currentOpenBlock = moduleSel;

	 	var currentModule = $.uriAnchor.makeAnchorMap().page;
	 	
	 	if(moduleId == currentModule) {
	 		_hidePreloader();
	 		_animateMainBlock();
	 	}

	}

	function _onUserLogin(event) {
		
		// if() {
		// 	var newAnchor = $.uriAnchor.makeAnchorMap();
  //       	_updateAnchor(newAnchor);
		// }	

		state.isAuth = true; 
		state.jqueryMap.$verticalMenu.show();
		state.jqueryMap.$shell.show();	
		
		

		_showPage();	
		// app.shell.ini();
	}

	function _onUserLogout(event) {

		localStorage.isAuth = state.isAuth = false; 

		state.jqueryMap.$verticalMenu.hide();
		state.jqueryMap.$shell.hide();
		
		_openPreloader()
		app.auth.open();

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

	function _openPreloader() {
		state.jqueryMap.$preloader.show(0);
		state.jqueryMap.$overlay.show(0);
	}

	function _hidePreloader() {
		state.jqueryMap.$preloader.hide(0);
		state.jqueryMap.$overlay.hide(0);
	}

	function _animateMainBlock() {
		state.jqueryMap.$mainBlock
						.css({'opacity'  : '0.8',
							  'marginTop': '-10px'})
						.animate({ 'opacity'  : '1',
								   'marginTop': '0px' }, 300);
	}

	function _showPage(page) {

		$(state.currentOpenBlock).hide(0);

	}
	

})(jQuery);