var React = require("react");
var CommandCard = require("../components/CommandCard.jsx")

module.exports = React.createClass({
    render: function() {
        return (
	    	<div>
    			<CommandCard title={this.props.title} params={["https://andrewpetersen.com"]} />

    			<div className='form-panel col z-depth-1'>
	    			{this.props.form}
    			</div>
	        </div>
        );
    }
});