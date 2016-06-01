var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
    	 <button type='button' onClick={this.props.handleClick} className="new-command-btn btn-floating btn-flat waves-effect waves-light green">
    	 	<i className="material-icons">add</i>
	 	</button>
        );
    }
});