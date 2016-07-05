var React = require("react");
var Console = require("./Console.jsx");
var utils = require("../../utils");
var ipc = require('electron').ipcRenderer

module.exports = React.createClass({
	componentDidMount() {
		utils.runPowershellBlock(this.props.scriptBlock).then(() => {
			console.log("SUCCESS!!");
		});
	},
	closeWindow() {
		ipc.send("done-powershell");
	},
	render() {
		return (
			<div className='powershell-runner'>
				<h2>{this.props.message}</h2>
				<div className='btn-flat close-btn' onClick={this.closeWindow}>
					Close
				</div>
				<Console />
			</div>
		);
	}
});