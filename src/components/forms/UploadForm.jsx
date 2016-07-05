var React = require("react");
var inputs = require("../inputs");
var FormButton = require("../buttons/FormButton.jsx")
var utils = require("../../utils");

module.exports = React.createClass({
	checkFolder: function() {
		var url = this.props.command.siteUrl + "/" + this.props.command.params.folder;
		utils.openExternalLink(url);
	},
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

					<FormButton text='Check Folder' onClick={this.checkFolder} />
				</div>
			)
	}
});