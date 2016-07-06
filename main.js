const electron 		= require('electron')
const ipc 			= require('electron').ipcMain
const dialog 		= require('electron').dialog

const BrowserWindow = electron.BrowserWindow
const app = electron.app

//Windows
let mainWindow 	= null;
let psRunner 	= null;


var openFileDialog = function(opts = {}) {
	return new Promise((resolve, reject) => {
		var defaults = { properties: ["openFile"] };
		var options = Object.assign({}, defaults, opts);
		dialog.showOpenDialog(options, resolve);
	});
}

var closePowershellRunner = function() {
	if (psRunner) {
		psRunner.close();
		//psRunner = null;
	}
};

var openPowershellRunner = function(scriptBlock) {
	psRunner = new BrowserWindow({ width:700, height:375, autoHideMenuBar: true, transparent: false, frame:false })
	psRunner.on("closed", () => psRunner = null);
	psRunner.loadURL(`file://${__dirname}/src/screens/powershellrunner/index.html`)
	psRunner.show();
	//psRunner.webContents.openDevTools()

	// HACK
	setTimeout(() => {
		psRunner.webContents.send('run-powershell', scriptBlock);
	},1000);
};

ipc.on('open-file-dialog', (event, payload) => {
		console.log(payload);
	openFileDialog().then((file = "") => {
		payload.file = file;
 		event.sender.send('close-file-dialog-' + payload, file)
	});
})

ipc.on('done-powershell', e => {
	closePowershellRunner();
});

ipc.on('run-powershell', (e, scriptBlock) => openPowershellRunner(scriptBlock));

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
			width: 1100,
			height: 700,
			autoHideMenuBar: true,
			fullscreenable: false,
			maximizable: false,
			resizable: false
		})
		// mainWindow.setMenu(null);
		// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/src/screens/workspace/index.html`)

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.