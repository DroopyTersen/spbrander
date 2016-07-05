var React = require("react");
var actions = require("../../actions");

module.exports = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		actions.commands.execute();
	},
	componentWillMount: function() {
		$(document).on("done-executing-script", () => {
			$("#execute-btn").attr("disabled", false);
		});
	},
    render: function() {
        return (
	    	<button 
	    		onClick={this.handleClick}
	    		type='button'
	    		id="execute-btn"
	    		className="btn z-depth-0 waves-effect waves-red red darken-1">
	    		Execute
		  	</button>
        );
    }
});