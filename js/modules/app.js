var app = (function($) {

	'use strict';

	var _state = {

		// cached jquery dom collection
		jQmap : {
			ov       : $('.on-loading'),
			container: $('#app-shell'),
			mainBlock: $('#app-shell-content'),
		},

		// current anchor
		currentAnchor : {

		},

		moduleHistory : [],

		actionList: {
			'page': _openPage
		}, 

		// information about auth user
		currentUserInfo: {
			// TO-DO my be array
			// foreach, extends roles, after that append
			roles: [{"id":1, "name":"ADMIN", "desc": "Администратор"}]
		},

		selectedRole: null,

		// roles ACL
		// describes what pages avail to open		

		// TO-DO remove from app.menu.json
		acl : {
			// dislogin
			'0': {
				'auth': true,
				'auth.role': true
			},
			// admin
			'1': {
				'auth': true,
				'auth.role': true,
				'shell': true
			},
			// head department
			'2': {
				'auth': true,
				'auth.role': true,
				'shell': true,
				'shell.oop': true,
				'shell.oop.create': true,
				'shell.oop.create.step1': true,
				'shell.oop.create.step2': true,
				'shell.oop.create.step3': true,
				'shell.oop.create.step4': true,
				'shell.oop.create.step5': true,
				'shell.oop.create.step6': true,
				'shell.oop.create.step7': true,
				'shell.oop.create.step8': true,
				'shell.oop.create.step9': true,
				'shell.oop.create.step10': true,
				'shell.oop.create.step11': true
			},
			// director
			'3': {
				'auth': true,
				'auth.role': true,
				'shell': true,
				'shell.oop.institute': true,
			},
			// teach department
			'4': {
				'shell': true
			},
			// teacher
			'5': {
				'shell': true
			}
		}
	
	}

	return {
		start: start,
		changePage: changePage
	}

	// start application point

	function start() {

		this.start = function() {
			// get saved user info
			_updateUserInfo();
			
			// configure application routes
			_configApp(_state.acl[_state.selectedRole]);

			// observe main app events
			_bindListeners();

			// auth check
			if(!_state.currentUserInfo) {
				changePage('auth');
			} else {
				
				if(!_state.selectedRole) {
					_changeUserRole();
				} else {
					changePage($.uriAnchor.makeAnchorMap().page || 'shell');
				}					
			}
		}

		_loadRoutes(this.start);
		
	}


	function changePage(newPage, query, saveQuery) {

		if(!newPage) return null;

		var anchor   	 = $.uriAnchor.makeAnchorMap(),
			currPage 	 = anchor.page;

		if(query || saveQuery == "true") {
			if(query) {
				anchor.query = query;
			}			
		} else {
			delete anchor.query;
		}
	
		if(currPage === newPage) {
			$(window).trigger('hashchange');
		} else {
			anchor.page = newPage;
			$.uriAnchor.setAnchor(anchor);
		}

	}


	// configure app 
	// set avail pages

	function _configApp(acl) {
		$.uriAnchor.configModule({
			schema_map : {
				page: acl,
				query: true
			}
		});
	}

	// observe main app events
	function _bindListeners() {

		$(window)
			.on('hashchange', 	          _onHashChange)
			.on('startModuleLoad',        _onStartModuleLoad)
			.on('moduleIsLoad',           _onModuleIsLoad)
			.on('loginSuccess',           _onLoginSuccess)
			.on('dislogin', 	          _onDislogin)
			.on('roleIsChanged',          _onRoleIsChanged);		

		// firefox don't support focusin/focusout events;
		$(document)
			.on('click', '.tooltip', _onInputClick)
			.on('click', _onDocumentClick)
			.on('click', '.next-btn, .prev-btn', _onNextButtonClick);
	
	}

	// event handlers block

	function _onNextButtonClick(event) {
		var $et = $(event.target);
		app.changePage($et.attr('data-page'), null, $et.attr('data-save-query'));
	}	

	function _onRoleIsChanged(event) {

		_updateUserInfo();
		_configApp(_state.acl[_state.selectedRole]);
		changePage('shell');

	}	

	function _onHashChange(event) {

		var newAnchor = $.uriAnchor.makeAnchorMap(),
			oldAnchor = _state.currentAnchor;

		if(_updateAnchor(newAnchor)) _applyChanges(newAnchor, oldAnchor);
	
	}

	function _onStartModuleLoad(event, data) {
		
		// TO-DO save new module
		_state.jQmap.ov.stop().fadeIn(250);
		if(data) _state.moduleHistory.push(data);
		
	}

	function _onModuleIsLoad(event) {

		// TO-DO
		// on error try load module
		// on double error history back and toogle message
		_state.jQmap.ov.stop().fadeOut(50);
		_animatePage(300);
	}

	function _onLoginSuccess(event) {
		
		_updateUserInfo();
		_changeUserRole();		
		
	}

	function _onDislogin() {
		localStorage.clear();
		_state.selectedRole = null;
		_state.currentUserInfo = {};
	}

	function _onInputClick(event) {

		event.stopPropagation();
		
		var $ev = $(event.target).attr('data-target'),
			$span = $('span.' + $ev);

		$('.showed_tooltip')
			.removeClass('showed_tooltip')
			.fadeOut(0);

		$span
			.addClass('showed_tooltip')
			.stop()
			.fadeIn(200)
			.css('display', 'inline-block');	

	}

	function _onDocumentClick() {

		$('.showed_tooltip')
			.removeClass('showed_tooltip')
			.fadeOut(0);
			
	}

	// util functions 

	function _loadRoutes(callback) {

		$.get('tmpl/app.menu.json')
			.done(function(response) {
				app.data.setToStorage('routeMap', response);
				callback();
			});

	}


	function _changeUserRole() {
		if(_state.currentUserInfo.roles.length > 1) {
			changePage('auth.role');
		} else {
			_state.selectedRole = _state.currentUserInfo.roles[0].id;
			app.data.setToStorage('selectedRole', _state.selectedRole);
			_configApp(_state.acl[_state.selectedRole]);
			changePage('shell');
		}
	}

	function _animatePage(duration) {
		_state.jQmap.mainBlock
						.css({
								'opacity'  : '0.8',
								'marginTop': '-10px'
							})
						.animate({ 
									'opacity'  : '1',
									'marginTop': '0px' }, duration || 300);
	}

	function _updateAnchor(newAnchor) {

		try {
			$.uriAnchor.setAnchor(newAnchor);
			_state.currentAnchor = newAnchor;
		} catch(e) {
			$.uriAnchor.setAnchor(_state.currentAnchor);
			return false;
		}
		return true;
	}

	function _applyChanges(newObj, oldObj) {

		for(var key in newObj) {
			if(!~key.indexOf('_s_')) {
				if(!oldObj[key] || newObj[key] != oldObj[key]) {
					if(_state.actionList[key]) {
						_state.actionList[key](newObj[key]);	
					}					
				}	
			}
		}
	
	}

	function _openPage(moduleName) {

		var withOutMenu = ['auth', 'auth.role'];
		
		if(withOutMenu.indexOf(moduleName) == -1) {
			app.menu.open(moduleName);
			_state.jQmap.container.fadeIn(0);
		} else {
			_state.jQmap.container.fadeOut(0);
		}

		var histLen = _state.moduleHistory.length - 1,
			moduleInstance = _namespace(_state.moduleHistory[histLen]);

		if(moduleInstance) {
			moduleInstance.close();
		}
	
		$(window).trigger('startModuleLoad', [moduleName]);
		_namespace(moduleName).open();

	}

	function _updateUserInfo() {
		_state.currentUserInfo = app.data.getByStorage('userInfo');
		_state.selectedRole    = app.data.getByStorage('selectedRole') || 0;
	}

	function _namespace(str) {

		if(!str) return null;

		var parentName = 'app',
				parent = app,
			    chunks = str.split('.');

		if(chunks[0].toLowerCase() == parentName) chunks = chunks.slice(1);

		for(var i = 0; i < chunks.length; i++) {
			if(parent[chunks[i]]) {
				parent = parent[chunks[i]];
			} else {
				return null;
			}
		}

		return parent;

	}


})(jQuery);