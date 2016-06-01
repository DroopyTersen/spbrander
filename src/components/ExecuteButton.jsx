var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
	    	<button 
	    		onClick={this.props.onClick}
	    		type='button'
	    		id="execute-btn"
	    		className="btn z-depth-0 waves-effect waves-red red darken-1">
	    		Execute
		  	</button>
        );
    }
});