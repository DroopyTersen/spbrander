var React = require("react");

module.exports = React.createClass({
	handleClick: function(e){
		e.preventDefault();
		$(document).trigger("command-add");
	},
    render: function() {
        return (
    	 <button type='button' onClick={this.handleClick} className="new-command-btn btn-floating btn-flat waves-effect waves-light green">
    	 	<i className="material-icons">add</i>
	 	</button>
        );
    }
});