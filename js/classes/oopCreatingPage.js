function OopCreatingPage(parameters) {

	var defaultHandlers = parameters.handlers;

	parameters.handlers = function() {



		defaultHandlers();
	}

	Page.apply(this, arguments);

}