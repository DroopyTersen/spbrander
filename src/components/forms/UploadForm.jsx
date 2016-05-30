var React = require("react");
var inputs = require("../inputs");
var FormButton = require("./FormButton.jsx")

module.exports = React.createClass({
		render: function() {
			var command = this.props.command;
			var params = command.params;
				return (
						<div>
							<inputs.FileInput command={command} id='filepath' />

							<inputs.TextInput
								id='folder'
								label='SharePoint Folder'
								command={command} />

							<FormButton text='Check Folder' />
						</div>
				)
		}
});