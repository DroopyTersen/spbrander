var React = require("react");

module.exports = React.createClass({
	renderParams: function(params) {
		if (!params) return "";
		var params = Object.keys(params).map(key => {
			return (
			<div className='command-param'>
				<span className='param-key'>{key}</span>
				<span className='param-value'>{params[key]}</span>
			</div>
			)
		});
		return <div className='command-params'>{params}</div>;
	},
	handleClick: function(e) {
		this.props.onSelect(this.props.command);
	},
	handleDelete: function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(document).trigger("command-delete", { id: this.props.command.id });

	},
	getClasses: function(command) {
		var classes = 'col s10 card command-card waves-effect waves-light-teal'
		if (command.isActive) {
			classes += " active";
		}
		return classes;
	},
    render: function() {
    	var command = this.props.command;
        return (
			<div className={this.getClasses(command)} onClick={this.handleClick}>
				<span className="delete-btn btn-flat red-text text-darken-2" onClick={this.handleDelete}>
					<i className="material-icons">delete_forever</i>
				</span>
				<div className='card-content'>
    				<div className='teal-text card-title'>{command.title}</div>
    				{this.renderParams(command.params)}
				</div>
			</div>
        );
    }
});