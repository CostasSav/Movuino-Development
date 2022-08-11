const { BrowserWindow, app, ipcMain, Notification } = require('electron')
const path = require('path')

const isDev = !app.isPackaged

function createWindow() {
    // Create new window with options (initial window size, etc...)
    // See also : webPreferences options
    // https://www.electronjs.org/docs/latest/api/browser-window
    const win = new BrowserWindow({
        width: 1080,
        height: 680,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true, // avoid access to lower level of your computer
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show()
})

app.whenReady().then(createWindow)