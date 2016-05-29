var React 			= require("react");
var ReactDOM 		= require('react-dom');
var WorkspaceTabs	= require("../../containers/WorkspaceTabs.jsx");
var Console			= require("../../components/console.jsx");
var spbrander		= require("spbrander");
var BrowserWindow 	= require('electron').remote.BrowserWindow
var path 			= require("path");

var WorkspaceScreen = React.createClass({

	componentDidMount: function() {
		var siteUrl = "https://andrewpetersen.sharepoint.com";
		spbrander.site(siteUrl)
				.remove("debug-css")
				.remove("droopy-css")
				.page("/SitePages/DevHome.aspx")
					.remove("test2-webpart")
					.remove("test-webpart")
				.execute()
				.then(() => console.log("All Done!"));
	},
	launchServer: function() {
		var modalPath = path.join('file://', __dirname, '../server/index.html')
		var win = new BrowserWindow({ frame: false })
		win.on('closed', function () { win = null })
		win.loadURL(modalPath)
		win.webContents.openDevTools()
		win.show()
	},
    render: function() {
        return (
	    	<div>
	          <h1>Hey there you</h1>
	          <button type='button' onClick={this.launchServer}>Launch Server</button>
	          <Console />
	        </div>
        );
    }
});

ReactDOM.render(<WorkspaceScreen />, document.getElementById('root'));

