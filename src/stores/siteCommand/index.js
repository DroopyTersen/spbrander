var ipc 			= require('electron').ipcRenderer

var actions 		= require("../../actions");
var storeUtils	 	= require("../storeUtils");
var commandFactory 	= require("./commandFactory");
var defs 	= require("./commandDefinitions");

var store = storeUtils.createStore();
store.getValue = () => siteCommand

var siteCommand = commandFactory.create("site", { isActive: true});

// Action handlers modify the private siteCommand object 
// then emit an event to any components subscribing to the store.
// When a component receivers that event it will call store.get() 
var handlers = {
	checkConnection() {
		var spBranderSite = siteCommand.invoke();
		var psBlock = spBranderSite.commands[0];
		ipc.send("run-powershell", psBlock);
	},
	handleSelect(payload) {
		siteCommand.deactivateAll();
		siteCommand.find(payload.id).isActive = true;
	},
	handleDelete(payload) {
		siteCommand.deactivateAll();
		delete siteCommand.commands[payload.id];
		siteCommand.isActive = true;
	},
	handleAdd(payload) {
		siteCommand.deactivateAll();
		siteCommand.addChild(payload.type, payload.initialValues)
	},
	handleUpdate(payload) {
		var target = siteCommand.find(payload.id);
		target.params[payload.key] = payload.value;
	}, 
	handleExecute() {
		ipc.send("run-powershell", siteCommand.toPowershell());
	}
}; 

store.createActionHandler(actions.commands.select, handlers.handleSelect, ["id"]);
store.createActionHandler(actions.commands.delete, handlers.handleDelete, ["id"]);
store.createActionHandler(actions.commands.add, handlers.handleAdd, ["type"]);
store.createActionHandler(actions.commands.update, handlers.handleUpdate, ["id", "key", "value"]);
store.createActionHandler(actions.commands.execute, handlers.handleExecute);
store.createActionHandler(actions.checkConnection, handlers.checkConnection);

//expose handlers for testing, this can be removed in the future
store._handlers = handlers;
store._reset = function() {
	siteCommand = commandFactory.create("site");
};
module.exports = store;