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

exports.objValues = function(obj) {
	var values = Object.keys.map(key => obj[k]);
};

var deactivateCommands = exports.deactivateCommands = function(parentCommand) {
	parentCommand.isActive = false;
	Object.keys(parentCommand.commands).forEach(commandId => deactivateCommands(parentCommand.commands[commandId]));
};

