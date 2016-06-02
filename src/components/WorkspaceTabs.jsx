var React = require("react");
var ipc = require('electron').ipcRenderer

var CodeViewer 		= require("../components/CodeViewer.jsx");
var ExecuteButton 	= require("../components/buttons/ExecuteButton.jsx");
var CommandPicker 	= require("../components/command/CommandPicker.jsx")
var Command 		= require("../components/command/Command.jsx")
var store 			= require("../stores").siteCommand;

module.exports = React.createClass({
	getInitialState:() => { siteCommand: store.getValue() },
	componentWillMount: function() {
		store.on("update", () => {
			this.setState({ siteCommand: store.getValue() })
		})
		$(document).on("execute-click", this.handleExecute);
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

			    	<div className="col s4 tab-headers">
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
				    	<div className='col s7' style={{marginTop:"15px", position:"relative"}}>
		          			<Command command={this.state.siteCommand} />
	          				<CommandPicker />
		        		</div>
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