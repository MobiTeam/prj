function Oop(parameters) {
	'use strict';
	Model.apply(this, arguments);
	this.basic = "Oop";
}

Object.setPrototypeOf(Oop, Model);
// write behaviour

