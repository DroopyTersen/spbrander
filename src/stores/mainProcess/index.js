var ipc 			= require('electron').ipcRenderer
var actions 		= require("../../actions");
var storeUtils	 	= require("../storeUtils");

var store = storeUtils.createStore();

var handlers = {
	openFileDialog: function(payload) {
		ipc.send('file-dialog-open', payload);
	},
	fileSelected: function(e, filepath) {
		if (Array.isArray(filepath) && filepath.length) {
			filepath = filepath[0];
		}
		var payload = {
			id: this.props.command.id,
			key: this.props.id,
			value: filepath
		};
		actions.commands.update(payload);
	}
}

ipc.on('file-dialog-close', handlers.fileSelected);
store.createActionHandler(actions.mainProcess.openFileDialog, handlers.openFileDialog, ["commandId", "paramKey", "filter"]);