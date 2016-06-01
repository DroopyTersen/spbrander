var React = require("react");
var CommandCard = require("./CommandCard.jsx")
var CommandForm = require("./CommandForm.jsx")

var Command = module.exports = React.createClass({
    renderForm: function(command) {
        if (command.isActive) {
            return <CommandForm title={command.title}>
                    { React.createElement(command.form, { command }) }
                </CommandForm>
        } 
        return "";
    },
    renderChildren: function(command) {
        return command.commandsArray
                        .map(c => <Command command={c} onSelect={this.props.onSelect} />);
    },
    render: function() {
        var command = this.props.command;
        return (
	    	<div>
    			<CommandCard command={command} onSelect={this.props.onSelect} />
                {this.renderForm(command)}
                <div className='col s12 child-commands'>
                {this.renderChildren(command)}
                </div>
	        </div>
        );
    }
});