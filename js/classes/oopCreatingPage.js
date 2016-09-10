function OopCreatingPage(parameters) {

	var defaultHandlers = parameters.handlers,
		self = this;

	parameters.updateData = function(template, cb) {

		function _insertData() {
			var $baseEl  = self.getChild(),
				template = self.getTemplate();

			$baseEl.html(Mustache.to_html(template, app.buffer['Oop_' + par.id].get()));
		}	

		var par = $.getQueryParameters($.uriAnchor.makeAnchorMap().query);

		if(!app.buffer['Oop_' + par.id]) {
			// если ООП не сохранено в buffer, то загружать с сервера по ID
			app.data.execute({
				type     : 'POST',
				data     : {that: 'OopGet', oopId: par.id},
				callback : function(response) {
					if(response.errCode) {
						throw new Error('Oop creation error');
					} else {
						app.data.setToStorage('Oop_' + response.id, response);
					}	
					
					app.buffer['Oop_' + par.id] = new Model({
						basic: 'Oop',
						data : response
					})

					_insertData();	
					cb && cb();				
				}
			}) 
			
		} else {
			_insertData();
			cb && cb();						
		}
	}

	Page.apply(this, arguments);

}

OopCreatingPage = Object.setPrototypeOf(OopCreatingPage, Page);