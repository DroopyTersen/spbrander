var React = require("react");
var actions = require("../../actions");

module.exports = class BaseInput extends React.Component {
	//Assumes this.props.handleChange and this.props.command
	//Assumes it will be used like onChange={this.handleChange.bind(this, 'url')}
    handleChange(key, event) {
    	var payload = {
    		id: this.props.command.id,
    		key,
    		value: event.currentTarget.value
    	};
        // Hack to get cursor to not jump to end of input
        var { selectionStart:start, selectionEnd:end } = event.currentTarget;
        this.cursor = { start, end, element: event.currentTarget };
        
        actions.commands.update(payload);
    }
    componentWillUpdate(nextProps, nextState) {
        // Hack to get cursor to not jump to end of input
        // setTimeout(() => {
        //     if (this.cursor && this.cursor.element.setSelectionRange) {
        //         this.cursor.element.setSelectionRange(this.cursor.start, this.cursor.end);
        //     }
        // },1)  
    }
    bindChange() {
        return this.handleChange.bind(this, this.props.id);
    }
    bindValue() {
        return this.props.command.params[this.props.id];
    }
}