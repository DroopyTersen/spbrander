var React 			= require("react");
var ReactDOM 		= require('react-dom');
var PSRunner		= require("../../components/runners/PSRunner.jsx");
var ipc 			= require('electron').ipcRenderer

var PSRunnerScreen = React.createClass({
	getInitialState: function() {
		return { 
			shouldRun: false, 
			message: "Executing SharePoint Commands",
			scriptBlock: "",  };
	},
	componentWillMount: function() {
		ipc.on('run-powershell', (e, scriptBlock) => {
			this.setState({scriptBlock, shouldRun: true });
		})
	},
    render: function() {
    	var psRunner = this.state.shouldRun 
    		? <PSRunner scriptBlock={this.state.scriptBlock} message={this.state.message} />
    		: "";
        return (
	    	<div>
	    		{psRunner}
	        </div>
        );
    }
});

ReactDOM.render(<PSRunnerScreen/>, document.getElementById('root'));

