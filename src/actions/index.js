var actionUtils = require("./actionUtils");

var actions = actionUtils.init();

// COMMAND ACTIONS
actions.commands = {
	add: actions._create("commands-add"),
	select: actions._create("commands-select"),
	delete: actions._create("commands-delete"),
	update: actions._create("commands-update"),
	execute: actions._create("commands-execute")
};

actions.debugServer = {
	start: actions._create("server-start"),
	update: actions._create("server-update"),
	stop: actions._create("server-stop")
}

actions.powershell = {
	run: actions._create("powershell-run")
}

actions.mainProcess = {
	openFileDialog: actions._create("file-dialog-open"),
}

actions.checkConnection = actions._create("check-connection");
module.exports = actions;