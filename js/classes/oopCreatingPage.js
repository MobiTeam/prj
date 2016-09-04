function OopCreatingPage(parameters) {

	var defaultHandlers = parameters.handlers;

	parameters.handlers = function() {

		var par = $.getQueryParameters($.uriAnchor.makeAnchorMap().query);

		if(!app.buffer['Oop_' + par.id]) {

			var uId  = app.data.getByStorage('userInfo').id;

			// app.data.execute({
			// 	type     : 'POST',
			// 	data     : {that: 'OopCreate', ownerId: uId, id: 310},
			// 	callback : function(response) {
			// 						if(response.errCode) {
			// 							throw new Error('Oop creation error');
			// 						} else {
			// 							app.data.setToStorage('Oop_' + response.id, response);
			// 							app.changePage('shell.oop.create', 'year=' + year + '&id=' + response.id);
			// 						}	
			// 		console.log(response);
			// 		defaultHandlers();
			// app.buffer['Oop_' + par.id] = new Model({
			// 	basic: 'Oop',
			// 	data : {}
			// })
			// 	}
			// }) 
			
		}

		defaultHandlers();

	}

	Page.apply(this, arguments);

}