var helpers = require("./helpers");
var open = require('open');

var addStylesheet = exports.addStylesheet = function(opts) {
	console.log(opts)
	if (!opts.file || !opts.url) throw "Invalid options. You need to pass --url and a --file"
	opts.name = opts.name || "droopy-sp"

	helpers.createServer(opts, (url) => {
		var cssUrl = helpers.getFileUrl(url, opts.file);
		var block = helpers.getStylesheetBlock(cssUrl);
		addScriptBlock(opts, block);
	})
};

var addScriptBlock = exports.addScriptBlock = function(opts, block) {
	if (!block || !opts.url) throw "Invalid options. You need to pass --url and a file"
	opts.name = opts.name || "droopy-sp"
	opts.type = "Block";
	helpers.addScriptAction(opts, block)
};


var addScriptLink = exports.addScriptLink = function(opts) {
	console.log(opts)
	if (!opts.file || !opts.url) throw "Invalid options. You need to pass --url and --file"
	opts.name = opts.name || "droopy-sp"
	opts.type = "Link";
	helpers.createServer(opts, function(url) {
		var fileUrl = helpers.getFileUrl(url, opts.file);
		helpers.addScriptAction(opts, fileUrl);
	});
};

var removeScriptLink = exports.removeScriptLink = function(opts, done) {
	if (!opts.url) throw "Invalid options. You need to pass --url and --name"
	helpers.removeScriptAction(opts, done);
}

var exposeFolder = exports.exposeFolder = function(opts) {
	if (!opts.path) throw "Invalid options. You need to pass --path";
	return helpers.createServer(opts, (url) => {
		open(url);
	});
}
//addStylesheet({ url: "https://andrewpetersen.sharepoint.com", file:"test.css" })
//addScriptLink({ url: "https://andrewpetersen.sharepoint.com", file:"test.js" })
//removeScriptLink({ url: "https://andrewpetersen.sharepoint.com", file:"test.js" })