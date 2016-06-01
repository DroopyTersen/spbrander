var forms = require("../components/forms");
var guid = require('node-uuid');
var spbrander = require("spbrander");

var defaults = {
	site: {
		url: "https://andrewpetersen.sharepoint.com",
		version: "v16"
	},
	upload: {
		filepath: "",
		folder: "Style Library"
	}
};

class Command {
	constructor(title) {
		this.title = title;
		this.id = guid.v4();
		this.commands = {};
		this.isActive = false;
	}
	get commandsArray() {
		return Object.keys(this.commands).map(id => this.commands[id]);
	}
	addChild(childCommand) {
		this.commands[childCommand.id] = childCommand;
	}
	deactivateAll() {
		this.isActive = false;
		this.commandsArray.forEach(c => c.deactivateAll() );
	}
}

exports.SiteCommand = class SiteCommand extends Command {
	constructor(url = defaults.site.url, version = defaults.site.version) {
		super("SharePoint Site")
		this.form = forms.Site;
		this.params = { url, version };
	}
	invoke() {
		return spbrander.site(this.params.url, this.params.version);
	}
	toPowershell() {
		var spBranderSite = this.invoke();
		this.commandsArray.forEach(c => spBranderSite = c.invoke(spBranderSite));
		return spBranderSite.commands.map(c => c.trim().replace(/\t/g, "")).join("\n\n");
	}
}

exports.UploadCommand = class UploadCommand extends Command {
	constructor(filepath = defaults.upload.filepath, folder = defaults.upload.folder) {
		super("Upload File")
		this.form = forms.Upload;
		this.params = { filepath, folder };
	}
	invoke(spBranderSite) {
		return spBranderSite.upload(this.params.filepath, this.params.folder);
	}
}

