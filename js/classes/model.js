/**
 * Creates instance of class Model
 *
 * @param {String}   par.parentId 	 	- element selector which will wrap page
 * @param {String}   par.childId 	    - element selector which will contain page
 * @param {String}   par.tempalateUrl   - a link to the basic template
 * @param {Function} par.handlers       - function to bind events handlers
 * @this {Model}
 * @constructor
 */

function Model(par) {	
	if(!par) throw new Error('missing necessary arguments on Model constructor');
	
	this.data 	   = par.data || {};	
	this.that 	   = par.that || throw new Error("Fabrics constructor requires determining the type");
	this.url       = par.url || 'php/repeater.php';
 	this.behaviour = par.behaviour || null;
	this.isPersist = false;		
}

Model.prototype.save = function(callback) {
	if(!this.isPersist) {
		app.data.execute({
			type    : 'POST',
			data    : this.data,
			callback: function() {
				this.isPersist = true;
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