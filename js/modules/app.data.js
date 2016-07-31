app.data = (function($) {

	'use strict';

	var _devMode = true;

	if(_devMode) {

		var _ROUTES = {
			'specialities':  {
				url 			: 'fake/specialities.json',
				type		    : 'GET',
				defaultCallback : null	
			}
		}

	} else {

		var _ROUTES = {

		}

	}

	return {
		get: get
	}

	// @param
	//  that[string]       - the data to be loaded
 	//  query[object]      - query to response
	//	callback[function] - function that should execute
	

	function get(param) {

		if(!param.that) return false;

		if(_ROUTES[param.that]) {

			var route = _ROUTES[param.that];

			$.ajax({
				url     : route.url,
				type    : route.type,
				data    : param.query, 
				dataType: 'json',
				success: function(response) {
					param.callback && param.callback(resposne);	
				},
				error: function() {
					throw new Error('Server is offline');
				}
			})

		} else {
			throw new Error('The data that you are requesting does not exist');
		}

	} 	

})(jQuery);