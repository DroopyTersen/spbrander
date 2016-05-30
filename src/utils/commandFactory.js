var React = require("react");
var forms = require("../components/forms");
var guid = require('node-uuid');

var createCommand = exports.createCommand = function(title, form, params = {}, commands = {}) {
	var command = {
		id: guid.v4(),
		title,
		form,
		commands,
		params,
		isActive: false,
	};
	command.addChild = function(childCommand) {
		command.commands[childCommand.id] = childCommand;
	};

	return command;
};

var createSiteCommand = exports.createSiteCommand = function(url = "https://andrewpetersen.sharepoint.com", version = "v16") {
	var params = { url, version };
	return createCommand("SharePoint Site", forms.Site, params);
	siteCommand.addCommand
};

var createUploadCommand = exports.createUploadCommand = function(filepath = "", folder = "Style Library") {
	var params = { filepath, folder };
	return createCommand("Upload File", forms.Upload, params);
}