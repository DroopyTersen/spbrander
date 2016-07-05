var React = require("react");

var CodeViewer 		= require("../components/CodeViewer.jsx");
var ExecuteButton 	= require("../components/buttons/ExecuteButton.jsx");
var Command 		= require("../components/command/Command.jsx")
var store 			= require("../stores").siteCommand;

module.exports = React.createClass({
	getInitialState: function() {
		return { siteCommand: store.getValue() }
	},
	componentWillMount: function() {
		store.on("update", () => {
			this.setState({ siteCommand: store.getValue() })
		})
	},
    render: function() {
      	setTimeout(() => $('.workspace-tabs ul.tabs').tabs(), 25)
        return (
			<div>
			  	<div className="row workspace-tabs">
			  		<div className="tab-headers">
				    	<div className="col s4 ">
				      		<ul className="tabs blue-text text-darken-4">
				        		<li className="tab col s2">
				        			<a className='active' href="#designer-tab-content">Designer</a>
			        			</li>
				        		<li className="tab col s2">
				        			<a href="#code-tab-content">Code</a>
			        			</li>
				      		</ul>
				    	</div>
			    	</div>

			    	<div id="designer-tab-content" className="col s12 tab-content">
				    	<div className='col s7' style={{marginTop:"15px", position:"relative"}}>
		          			<Command command={this.state.siteCommand} />
		        		</div>
			    	</div>

			    	<div id="code-tab-content" className="col s12 tab-content">
			    		<CodeViewer language="powershell" code={this.state.siteCommand.toPowershell()} />
		    		</div>

			  	</div>
		  		<ExecuteButton />
		  	</div>
        );
    }
});