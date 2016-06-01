const electron = require('electron')
  // Module to control application life.
const app = electron.app
  // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
var psRunner = null;

ipc.on('open-file-dialog', function(event, key) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function(file) {
    if (file) event.sender.send('selected-file-' + key, file)
  })
})

ipc.on('run-powershell', (e, scriptBlock) => {
  console.log("Run powershell");
  if (psRunner) {
    psRunner.close();
    psRunner = null;
  }
  psRunner = new BrowserWindow({ width:500, height:289, autoHideMenuBar: true })
  psRunner.on('closed', () => psRunner = null )
  psRunner.loadURL(`file://${__dirname}/src/screens/powershellrunner/index.html`)
  psRunner.show();
  setTimeout(() => {
    psRunner.webContents.send('run-powershell', scriptBlock);
  },1000);
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 1100,
      height: 700,
      autoHideMenuBar: true,
      // transparent:true,
      // frame:false,
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