// main app module

var app = (function($) {

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

	function start() {
		app.shell.ini();
		_configApp();
		_bindListeners();
	}

	function _configApp() {

		$.uriAnchor.configModule({
			schema_map : {
				page: { step1: true, step2: true }
			}
		});

		$.uriAnchor.setAnchor(state.currentAnchor);

	}

	function _bindListeners() {

		$(window).bind('hashchange', _onHashChange)
				 .bind('moduleLoaded', function(event, moduleId) {

				 	var currentModule = $.uriAnchor.makeAnchorMap().page;
				 	if(moduleId == currentModule) {
				 		_hidePreloader();
				 		_animateMainBlock();
				 	}
				 	
				 });

	}

	function _onHashChange() {

		var newAnchor = $.uriAnchor.makeAnchorMap(),
			oldAnchor = state.currentAnchor;

		if(_updateAnchor(newAnchor)) {
			_applyChances(newAnchor, oldAnchor);
		}
	
	}

	function _applyChances(newObj, oldObj) {

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
						.css({'opacity': '0.8',
							  'marginTop': '-10px'})
						.animate({ 'opacity': '1',
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

})(jQuery);