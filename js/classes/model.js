/**
 * Creates instance of class Model
 *
 * @param {Object}   par.data 	 	- element selector which will wrap page
 * @param {String}   par.url 	    - a url to server handler
 * @param {Object}   par.behaviour  - functions extends basic model behaviour
 * @param {String}   par.basic  	- model type
  * @this {Model}
 * @constructor
 */

function Model(par) {	
	if(!par) throw new Error('missing necessary arguments on Model constructor');
	
	this.data 	   = par.data || {};	
	this.url       = par.url || 'php/repeater.php';
 	this.behaviour = par.behaviour || null;
 	this.basic 	   = par.basic || null;
	this.isPersist = false;		
}

Model.prototype.do = function(query, callback) {
	if(!this.isPersist) {
		app.data.execute({
			type    : 'POST',
			data    : $.extend({type: this.basic + query}, this.data),
			callback: function() {
				this.isPersist = true;
				callback && callback();
			}
		});
	} 
}

Model.prototype.get = function() {
	return this.data;	
}

Model.prototype.getValue = function(param) {
	if(!param || !this.data[param]) throw new Error("Param don't isset");
	return this.data[param];
}

Model.prototype.set = function(dataObj) {
	this.isPersist = false;
	this.data = dataObj;
}

Model.prototype.setValue = function(param, value) {
	this.isPersist = false;
	this.data[param] = value;	
}