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