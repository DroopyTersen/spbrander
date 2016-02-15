var droopyServer = require("./droopyServer");
var path = require("path");
var PowerShell = require('node-powershell');
var open = require('open');


var getStylesheetBlock = exports.getStylesheetBlock = function(cssUrl) {
	var block = `
			var linkElem = document.createElement('link'); 
			linkElem.setAttribute('rel', 'stylesheet'); 
			linkElem.setAttribute('type', 'text/css'); 
			linkElem.setAttribute('href', '${cssUrl}'); 
			var head = document.querySelector('head');
			console.log('SPBRANDER INJECTING CSS');
			console.log(head);
			head.appendChild(linkElem);
	`;
	var block = block.replace(/\n/g, " ").replace(/\t/g, " ");
	return "\"" + block + "\"";
};

var getFileUrl = exports.getFileUrl = function(url, file) {
	var fileUrl = "";
	var fileInfo = path.parse(file);
	if (path.isAbsolute(file) ){
		fileUrl = "/" + fileInfo.base;
	} else {
		fileUrl = 	fileInfo.dir && fileInfo.dir !== "."
						? fileInfo.dir + fileInfo.base
						: "/" + fileInfo.base
	}

	console.log(fileInfo);
	return url.replace("http:/", "https:/") + fileUrl;
};

var createServer = exports.createServer = function(opts, done) {
	
	if (opts.file && path.isAbsolute(opts.file)) {
		opts.path = path.dirname(opts.file)
	}
	var serverOptions = {
		server: true,
		open: false,
		path: opts.path
	}
	return droopyServer.start(opts.port || 3002, serverOptions, done);
};

var runPowershellScript = exports.runPowershellScript = function(ps1Name, args, done) {
	var argString = args.join(" ");
	var psCommand = new PowerShell(`${__dirname}\\powershell\\${ps1Name} ${argString}`);
	psCommand.on('output', data => console.log(data));
	psCommand.on('end', () => {
		if(done) done()
	});
}


var removeScriptAction = exports.removeScriptAction = function(opts, done) {
	if (opts.exit) outputCleanup();
	
	// Handle defaults
	opts.name = opts.name || "droopy-sp";
	runPowershellScript(`removeScriptLink.ps1`, [opts.url, opts.name, opts.user, opts.pwd], () => {
		if (opts.exit) process.exit();
		if (done) done()
	});
};

var addScriptAction = exports.addScriptAction = function(opts, script) {
	// Handle defaults
	opts.type = opts.type || "Link";
	if (opts.cleanup !== false) opts.cleanup = true;
	if (opts.open !== false) opts.open = true;

	console.log("Adding Custom Action named: " + opts.name);
	runPowershellScript(`addScript${opts.type}.ps1`, [opts.url, opts.name, script, opts.user, opts.pwd], () =>{
		if (opts.open) open(opts.url);
	});

	if (opts.cleanup) {
		var removeOpts = { url: opts.url, exit: true, type: opts.type, user: opts.user, pwd: opts.pwd }
		process.on('SIGINT', removeScriptAction.bind(null, removeOpts));
	}
};

var outputCleanup = exports.outputCleanup = function() {
	console.log("")
	console.log("---------")
	console.log("Cleaning up script link...");
	console.log("---------")
	console.log("")
};