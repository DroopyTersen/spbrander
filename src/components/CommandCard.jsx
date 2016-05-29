var React = require("react");

module.exports = React.createClass({
	renderParams: function() {
		if (!this.props.params) return "";
		var params = this.props.params.map(p => <div className='command-param'>{p}</div>);
		return <div className='command-params'>{params}</div>;
	},
    render: function() {
    	var params = "";
    	if (this.props.params) {

    	}
        return (
			<div className='col s4 card command-card waves-effect waves-light-teal'>
				<div className='card-content'>
    				<div className='teal-text card-title'>{this.props.title}</div>
    				{this.renderParams()}
				</div>
			</div>
        );
    }
});