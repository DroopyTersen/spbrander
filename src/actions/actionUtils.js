var Eventer = require("droopy-events");

exports.init = function() {
	var actions = new Eventer();
	actions._keys = {};


	var actionPrototype = {
		trigger(payload) {
			actions.trigger(this.key, payload)
		},
		subscribe(cb) {
			actions.on(this.key, cb);
		},
		unsubscribe(cb) {
			actions.off(this.key, cb);
		},
		error(msg) {
			actions.trigger("error", { key: this.key, message:`ACTION ERROR:\n${this.key} - ${msg}` })
		}
	};

	actions._create = (key) => {
		if (actions._keys.hasOwnProperty(key)) {
			var message = "Action key already exists"
			actions.trigger("error", { key, message })
			throw new Error(message);
		}
		var actionObj = Object.assign({}, actionPrototype, {key});
		var action = (payload) => actions.trigger(key, payload)
		action = Object.assign(action, actionObj);
		return actions._keys[key] = action;
	};

	return actions;
};