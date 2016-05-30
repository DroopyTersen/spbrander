var React = require("react");
var BaseInput = require("./BaseInput.jsx");
var ipc = require('electron').ipcRenderer

module.exports = class FileInput extends BaseInput {
	chooseFile(e) {
		console.log("emitting event");
		ipc.send('open-file-dialog', this.props.id);
	}
	componentWillMount() {
	    ipc.on('selected-file-' + this.props.id, (event, filepath) => {
    		var payload = {
    			id: this.props.command.id,
    			key: this.props.id,
    			value: filepath
    		};
    		$(document).trigger('command-change', payload);
	    }); 
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