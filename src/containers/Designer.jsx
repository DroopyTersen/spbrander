var React = require("react");
var Command = require("../components/command/Command.jsx");
var utils = require("../utils");
var SiteCommandAdder = require("../components/SiteCommandAdder.jsx");
var commands = require("../utils/commands");
var ExecuteButton = require("../components/ExecuteButton.jsx");

module.exports = React.createClass({
	getInitialState: function() {
		console.log(commands);
		var siteCommand = new commands.SiteCommand();
		siteCommand.isActive = true;
		siteCommand.addChild(new commands.UploadCommand())
		return { siteCommand };
	},
	componentWillMount: function() {
	      $(document).on("command-change", this.handleCommandChange);
	      $(document).on("command-delete", this.handleDeleteCommand);
	},
	handleCommandSelect: function(command) {
		var siteCommand = this.state.siteCommand;
		siteCommand.deactivateAll();
		command.isActive = true;
		this.setState({ siteCommand });
	},
	addCommand: function(e, command) {
		command = command || new commands.UploadCommand();
		var siteCommand = this.state.siteCommand;
		siteCommand.deactivateAll();
		command.isActive = true;
		siteCommand.addChild(command);

		this.setState({ siteCommand });
	},
	handleDeleteCommand: function(e, payload) {
		var siteCommand = this.state.siteCommand;
		siteCommand.deactivateAll();
		delete siteCommand.commands[payload.id];
		siteCommand.isActive = true;
		this.setState({ siteCommand });
	},
	handleCommandChange: function(event, payload) {
		var siteCommand = this.state.siteCommand;
		var targetCommand = siteCommand.id === payload.id ? siteCommand : siteCommand.commands[payload.id];
		targetCommand.params[payload.key] = payload.value;
		this.setState({ siteCommand });
	},
	handleExecute: function(e) {
		var siteCommand = this.state.siteCommand;
		alert(siteCommand.toPowershell());
	},
    render: function() {
        return (
	    	<div className='col s7' style={{marginTop:"15px", position:"relative"}}>
	          	<Command 
	          		command={this.state.siteCommand} 
	          		onSelect={this.handleCommandSelect} />

          		<SiteCommandAdder handleClick={this.addCommand} />
		  		<ExecuteButton onClick={this.handleExecute} />
	        </div>
        );
    }
});