app.data = (function($) {

	'use strict';

	return {

		getByStorage: getByStorage,
		setToStorage: setToStorage,
		execute: execute

	}

	function getByStorage(that) {

		if(!that || !localStorage[that]) return null;

		try {
			var data = JSON.parse(localStorage[that]);
			return data;
		} catch(e) {
			return null;
		}

	}

	function setToStorage(that, data) {

		if(!that || !data) return false;

		try {

			if(_isObject(data)) {
				localStorage[that] = JSON.stringify(data);
			} else {
				localStorage[that] = data;
			}

		} catch(e) {
			return false;
		}

	}

	// @param
	//  url[string]        - request url
	//  type[string]	   - request type [GET, POST, PUT, DELETE, HEAD]
 	//  data[object]      - query data to response
	//	callback[function] - function that should execute after success request

	function execute(param) {

		if(!param) return false;

		$.ajax({
			url     : param.url || 'php/repeater.php',
			type    : param.type || "GET",
			data    : param.data || null, 
			dataType: 'json',
			success: function(response) {
				param.callback && param.callback(response);	
			},
			error: function(response) {					
				if((response.status >= 200 && response.status < 300) || response.status == 304) {
					throw new Error('JSON parse error');
				} else {
					throw new Error('Server is offline');
				}
			},
			cache: false
		})
	
	} 
	
	function _isObject(data) {

		return Object.prototype.toString.call(data) === '[object Object]';

	}
	
})(jQuery);