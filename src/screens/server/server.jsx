var React 			= require("react");
var ReactDOM 		= require('react-dom');
var Console			= require("../../components/console.jsx");
var DebugServer		= require("../../components/debugServer.jsx");
var droopyServer	= require("droopy-server");

var ServerScreen = React.createClass({
	getInitialState: function() {
		return {
			url: "",
			message: "Launching Server"
		}
	},
	componentDidMount: function() {
		var opts = {
			path: "c:\\gitwip"
		}
		droopyServer.start(3001, opts).then((url) => {
			this.setState({ message: "Server Running", url });
		})
	},
    render: function() {
        return (
	    	<div>
	          <DebugServer message={this.state.message} url={this.state.url} />
	          <Console />
	        </div>
        );
    }
});

ReactDOM.render(<ServerScreen/>, document.getElementById('root'));

