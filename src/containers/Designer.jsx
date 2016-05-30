var React = require("react");
var Command = require("../components/command/Command.jsx");
var utils = require("../utils");

module.exports = React.createClass({
	getInitialState: function() {
		var siteCommand = utils.commandFactory.createSiteCommand();
		siteCommand.isActive = true;
		siteCommand.addChild(utils.commandFactory.createUploadCommand())
		return { siteCommand };
	},
	handleCommandSelect: function(command) {
		var siteCommand = this.state.siteCommand;
		utils.deactivateCommands(siteCommand);
		command.isActive = true;
		this.setState({ siteCommand });
	},
	componentWillMount: function() {
	      $(document).on("command-change", this.handleCommandChange);
	},
	handleCommandChange: function(event, payload) {
		var siteCommand = this.state.siteCommand;
		var targetCommand = siteCommand.id === payload.id ? siteCommand : siteCommand.commands[payload.id];
		targetCommand.params[payload.key] = payload.value;
		this.setState({ siteCommand });
	},
    render: function() {
        return (
	    	<div className='col s7' style={{marginTop:"15px"}}>
	          	<Command 
	          		command={this.state.siteCommand} 
	          		onSelect={this.handleCommandSelect} />
	        </div>
        );
    }
});