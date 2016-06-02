var forms 		= require("../../components/forms");
var spbrander 	= require("spbrander");
module.exports = {
	site: {
		title: "SharePoint Site",
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
			this.commandsArray.forEach(c => spBranderSite = c.invoke(spBranderSite));
			return spBranderSite.commands.map(c => c.trim().replace(/\t/g, "")).join("\n\n");
		}
	},
	upload: {
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
	}
};