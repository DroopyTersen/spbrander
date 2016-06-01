var React = require("react");
var Designer = require("./Designer.jsx");
var PSViewer = require("../components/PSViewer.jsx");
var ExecuteButton = require("../components/ExecuteButton.jsx");
var commands = require("../utils/commands");
var utils = require("../utils");
var ipc = require('electron').ipcRenderer

module.exports = React.createClass({
	getInitialState: function() {
		var siteCommand = new commands.SiteCommand();
		siteCommand.isActive = true;
		siteCommand.addChild(new commands.UploadCommand())
		return { siteCommand };
	},
	componentWillMount: function() {
	      $(document).on("command-add", this.handleAddCommand);
	      $(document).on("command-select", this.handleCommandSelect);
	      $(document).on("command-change", this.handleCommandChange);
	      $(document).on("command-delete", this.handleDeleteCommand);
	      $(document).on("execute-click", this.handleExecute);
	},
	handleCommandSelect: function(e, commandId) {
		var siteCommand = this.state.siteCommand;
		siteCommand.deactivateAll();
		targetCommand = siteCommand.id === commandId ? siteCommand : siteCommand.commands[commandId];
		targetCommand.isActive = true;
		this.setState({ siteCommand });
	},
	handleAddCommand: function(e, command) {
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
		ipc.send("run-powershell", siteCommand.toPowershell());
	},
    render: function() {
      	setTimeout(() => $('.workspace-tabs ul.tabs').tabs(), 25)
        return (
		<div>
		  	<div className="row workspace-tabs">
		    	<div className="col s4">
		      		<ul className="tabs blue-text text-darken-4">
		        		<li className="tab col s2">
		        			<a href="#designer-tab-content">Designer</a>
	        			</li>
		        		<li className="tab col s2">
		        			<a href="#code-tab-content">Code</a>
	        			</li>
		      		</ul>
		    	</div>
		    	<div id="designer-tab-content" className="col s12 tab-content">
		    		<Designer siteCommand={this.state.siteCommand} />
		    	</div>
		    	<div id="code-tab-content" className="col s12 tab-content">
		    		<PSViewer code={this.state.siteCommand.toPowershell()} />
	    		</div>
		  	</div>
	  		<ExecuteButton />
	  	</div>
        );
    }
});