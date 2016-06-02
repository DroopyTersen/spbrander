var guid = require('node-uuid');
var definitions = require("./commandDefinitions");

class BaseCommand {
	constructor() {
		this.id = guid.v4();
		this.commands = {};
		this.isActive = false;
	}
	get children() {
		return Object.keys(this.commands).map(id => this.commands[id]);
	}

	addChild(type, values) {
		var childCommand = create(type, values);
		this.commands[childCommand.id] = childCommand;
		return childCommand;
	}

	deactivateAll() {
		this.isActive = false;
		this.children.forEach(c => c.deactivateAll() );
		return this;
	}

	find(id) {
		if (this.id === id) return this;
		if (this.commands[id]) return this.commands[id];
	}
};

// Merge Command Prototype, with the proper command definition, with any initial values
var create = exports.create = function(type, initialValues = {}) {
	if (!definitions[type]) 
		throw new Error("Invalid Command type passed to command factory");

	var command =  Object.assign(new BaseCommand(), definitions[type], initialValues);
	return command;
}