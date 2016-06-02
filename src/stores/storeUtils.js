var Eventer 	= require("droopy-events");

// needs be bound to a store see usage in 'createStore'
var createActionHandler = function(action, handler, expectedPayload = [], eventKey = "update") {
	function validatePayload(payload = {}) {
		var missing = expectedPayload.filter(prop => !payload.hasOwnProperty(prop))
		return !missing.length;
	};
	action.subscribe((payload) => {
		// Ensure the payload is properly formed based on what the handler expects
		if(!validatePayload(payload)) 
			return action.error(`Invalid Action Payload - Expecting ${expectedPayload.join(", ")}`);

		// Call the action handler to do the work
		handler(payload);
		// Notify store subscribers there is an update
		this.trigger(eventKey);
	})
};

exports.createStore = function() {
	var store = new Eventer();
	store.subscribe = store.on
	store.unsubscribe = store.off
	store.emit = store.trigger
	store.createActionHandler = createActionHandler.bind(store);
	return store;
}