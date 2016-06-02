var forms = {};
if (!typeof window === "undefined") {
	forms = {
		Site: require("./SiteForm.jsx"),
		Upload: require("./UploadForm.jsx")
	}
}
module.exports = forms;