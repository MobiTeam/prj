app.auth = (function($) {
	
	'use strict';

	var _configMap = {
		 templateUrl: 'tmpl/app.auth.html',
		mainSelector: '#app-auth'
	}

	return {
	 	open  : open,
	 	close : close
	}

	function open() {
		_ini();
		this.open = function() {
			
			app.menu.close();

			$(_configMap.mainSelector)
				.fadeIn(200);

			$(window)
				.trigger('moduleIsLoad');		
		
		};
		this.open();
	}

	function close() {
		$(_configMap.mainSelector)
				.fadeOut(0);
	}

	function _ini() {

		localStorage.clear();

		$(_configMap.mainSelector)
			.load(_configMap.templateUrl, function() {
				_bindListeners();
			})

	}

	function _bindListeners() {
		
		$('#app-authorization-form')
			.on('click', '.submit-button', _submitButtonClick);
			
	}

	// event handlers 

	function _submitButtonClick(event) {
		
		$(window).trigger('startModuleLoad');

		event.preventDefault();

		var $ev = $(event.target);

		$ev
			.attr('disabled', true)
			.attr('title', 'Подождите идет загрузка...');

		$.ajax({
			type: 'POST',
			data: $ev.closest('form').serialize(),
			url: 'php/auth/ldap_authorisation.php',
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			success: function(response) {
				_dropText('#app-authorization-box__message', response.text, response.code == "200" ? 'green' : 'red');
				
				if(response.code == "200") {
					if(response.userinfo.status) {
						_dropText('#app-authorization-box__message', 'Вы не имеете прав, для работы с системой.');
					} else {
						app.data.setToStorage('userInfo', response['userinfo']);
						$(window).trigger('loginSuccess');
					}										
				}
			},
			error: function() {
				_dropText('#app-authorization-box__message', 'Проверьте наличие интернет соединения');
			},
			complete: function() {
				$(window).trigger('moduleIsLoad');
				
				$ev
					.attr('disabled', false)
					.attr('title', '');
			}
		})
	}

	function _dropText(sel, text, color) {
		$(sel)
			.text(text)
			.show(0)
			.css('color', color || 'red');
	}
	
})(jQuery);