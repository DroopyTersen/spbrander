var React = require("react");

module.exports = React.createClass({
	renderParams: function(params) {
		if (!params) return "";
		var params = Object.keys(params).map(key => <div className='command-param'>{params[key]}</div>);
		return <div className='command-params'>{params}</div>;
	},
	handleClick: function() {
		this.props.onSelect(this.props.command);
	},
    render: function() {
    	var command = this.props.command;
        return (
			<div className='col s10 card command-card waves-effect waves-light-teal' onClick={this.handleClick}>
				<div className='card-content'>
    				<div className='teal-text card-title'>{command.title}</div>
    				{this.renderParams(command.params)}
				</div>
			</div>
        );
    }
});