var React = require("react");
const shell = require('electron').shell

module.exports = React.createClass({
	openUrl: function() {
		console.log(this);
		shell.openExternal(this.props.url)
	},
    render: function() {
        return (
	    	<div className='debug-server'>
	          <h2>{this.props.message}</h2>
	          <a href='#' onClick={this.openUrl}>{this.props.url}</a>
	        </div>
        );
    }
});