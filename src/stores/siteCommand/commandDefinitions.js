var forms 		= require("../../components/forms");
var spbrander 	= require("spbrander");

exports.get = function(type) {
	if (!definitions[type]) 
		throw new Error("Invalid Command type passed to command factory");

	var command = Object.assign({}, definitions[type]);
	// manually do nested properties
	command.params = Object.assign({}, definitions[type].params);
	return command;
};

exports.getOptions = function(type) {
	return Object.keys(definitions)
		.map(key => {
			var { title, parent, type } = definitions[key]
			return { title, parent, type }
		})
		.filter(c => c.parent === type)
		.sort((a,b) => a.title < b.title ? -1 : 1 )
};

var definitions = {
	site: {
		title: "SharePoint Site",
		type: "site",
		form: forms.Site,
		params: {
			url: "https://andrewpetersen.sharepoint.com",
			version: "v16"
		},
		invoke() {
			return spbrander.site(this.params.url, this.params.version)
		},
		toPowershell() {
			var spBranderSite = this.invoke();
			this.children.forEach(c => spBranderSite = c.invoke(spBranderSite));
			return spBranderSite.commands.map(c => c.trim().replace(/\t/g, "")).join("\n\n");
		}
	},
	upload: {
		parent: "site",
		type: "upload",
		title: "Upload File",
		form: forms.Upload,
		params: {
			filepath: "",
			folder: "Style Library"
		},
		invoke(site) {
			if (this.params.filepath && this.params.folder) {
				return site.upload(this.params.filepath, this.params.folder);
			} 
			return site;
		}
	},
	siteCss: {
		parent: "site",
		type: "siteCss",
		title: "Add a CSS Stylesheet",
		form: forms.SiteCss,
		params: {
			url: "https://andrewpetersen.sharepoint.com/Style%20Library/_droopy/droopy.site.css",
			name: "spbrander-css",
			type: "url"
		},
		invoke(site) {
			if (this.params.type === "url" && this.params.name && this.params.url) {
				return site.inject(this.params.url, this.params.name, this.params.scope);
			} 
			if (this.params.type === "file" && this.params.name && this.params.filepath) {
				return site.inject(this.params.filepath, this.params.name, this.params.scope, this.params.folder);
			}
			return site;
		}
	}
};