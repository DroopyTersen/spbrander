var PowerShell = require('node-powershell');
const shell = require('electron').shell

exports.consoleOverride = function(component) {
  	(function () {
	  var log = console.log;
	  console.log = function () {
	  	var args = [].slice.call(arguments);
	  	if (args[0] != "%s - %s") {
		    component.state.console.push(args[0]);
		    component.setState({ console: component.state.console });		  		
	  	}
	    log.apply(this, args);
	  };
	}());
};

exports.openExternalLink = function(url) {
	if (url) shell.openExternal(url);
};

exports.runPowershellBlock = function(scriptBlock, done) {
	return new Promise((resolve, reject) => {
		var psCommand = new PowerShell(scriptBlock);
		psCommand.on('output', data => console.log(data));
		psCommand.on('end', resolve);
		psCommand.on('error', reject);
	});
};
