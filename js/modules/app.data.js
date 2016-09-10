app.data = (function($) {

	'use strict';

	var _buffer = (function(buff) {
					for(var key in localStorage) {
						
						var data = null;
						
						try {
							data = JSON.parse(localStorage[key]);
						} catch(e) { }
						
						buff[key] = data;
					}
					return buff;
				})({});


	var getByStorage = function(that) {

		if(!that || !localStorage[that]) return null;

		if(_buffer[that]) {
			console.log('load data from buffer - [' + that + "]");
			return _buffer[that];
		} else {
			try {
				var data = JSON.parse(localStorage[that]);
				return data;
			} catch(e) {
				return null;
			}
		}

	}

	var setToStorage = function(that, data) {

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

		_buffer[that] = data;

	}

	// @param
	//  url[string]        - request url
	//  type[string]	   - request type [GET, POST, PUT, DELETE, HEAD]
 	//  data[object]      - query data to response
	//	callback[function] - function that should execute after success request

	var execute = function(param) {

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
				param.callback && param.callback(response);			
				// write correct handlers
				// if((response.status >= 200 && response.status < 300) || response.status == 304) {
				// 	param.callback && param.callback(response);
				// 	throw new Error('JSON parse error');
				// } else {
				// 	throw new Error('Server is offline');
				// }
			},
			complete: function() {
				
			},
			cache: false
		})	

	} 
	
	function _isObject(data) {

		return Object.prototype.toString.call(data) === '[object Object]';

	}

	return {
		getByStorage : getByStorage,
		setToStorage : setToStorage,
		execute      : execute
	}
	
})(jQuery);