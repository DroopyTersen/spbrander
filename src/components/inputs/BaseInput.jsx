var React = require("react");


module.exports = class BaseInput extends React.Component {
	//Assumes this.props.handleChange and this.props.command
	//Assumes it will be used like onChange={this.handleChange.bind(this, 'url')}
    handleChange(key, event) {
    	var payload = {
    		id: this.props.command.id,
    		key,
    		value: event.currentTarget.value
    	};
    	$(document).trigger('command-change', payload);
    }
    bindChange() {
        return this.handleChange.bind(this, this.props.id);
    }
    bindValue() {
        return this.props.command.params[this.props.id];
    }
}