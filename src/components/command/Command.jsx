var React = require("react");
var CommandCard = require("./CommandCard.jsx")
var CommandForm = require("./CommandForm.jsx")
var CommandPicker   = require("./CommandPicker.jsx")

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
        return command.children
                        .map(c => <Command command={c} />);
    },
    renderCommandPicker: function(c) {
        return (c.childOptions && c.childOptions.length) 
            ? <CommandPicker command={c} />
            : "";
    },
    render: function() {
        var command = this.props.command;
        return (
	    	<div>
    			<CommandCard command={command} />
                {this.renderForm(command)}
                <div className='col s12 child-commands'>
                {this.renderChildren(command)}
                </div>
                {this.renderCommandPicker(command)}
	        </div>
        );
    }
});