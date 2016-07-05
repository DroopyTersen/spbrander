var React = require("react");
var BaseInput = require("./BaseInput.jsx");
var ipc = require('electron').ipcRenderer
var actions = require("../../actions");

class FileInput extends BaseInput {
	chooseFile(e) {
		ipc.send('open-file-dialog', this.props.command.id );
	}
	handleFileSelected(e, filepath) {
		if (Array.isArray(filepath) && filepath.length) {
			filepath = filepath[0];
		}
		var payload = {
			id: this.props.command.id,
			key: this.props.id,
			value: filepath
		};
		console.log(payload);
		actions.commands.update(payload);
	}
	componentWillMount() {
		this.handleFileSelected = this.handleFileSelected.bind(this);
		this.listenerKey = 'close-file-dialog-' + this.props.command.id
	    ipc.on(this.listenerKey, this.handleFileSelected); 
	}
	componentWillUnmount() {
		ipc.removeListener(this.listenerKey, this.handleFileSelected);
	}
	componentDidMount() {
		// Automatically launch choose file picker dialog
		if (!this.props.command.params[this.props.id]) {
	    	this.chooseFile();  
		}
	}
	render() {
		var command = this.props.command;
        return (
		<div className="file-field input-field col s12">
			<div className="btn">
	        	<span>File</span>
		        <input type="text" id={this.props.id} className='file' onClick={this.chooseFile.bind(this)} value={this.bindValue()} />
			</div>
			<div className="file-path-wrapper">
				<input className="file-path validate" type="text" value={this.bindValue()} />
			</div>
	    </div>
        );		
	}
}

module.exports = FileInput;