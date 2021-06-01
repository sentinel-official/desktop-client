require('./ipc');
const {
    app,
    BrowserWindow,
    Menu,
} = require('electron');
const path = require('path');
const menu = require('./menu');
const globals = require('./globals');
const { autoUpdater } = require('electron-updater');

Menu.setApplicationMenu(menu);
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const createMainWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        height: 720,
        icon: path.join(__dirname, 'icon.png'),
        minHeight: 480,
        minWidth: 852,
        show: false,
        title: 'Sentinel',
        webPreferences: {
            enableWebSQL: false,
            preload: path.join(__dirname, 'preload.js'),
            webgl: false,
        },
        width: 1280,
    });

    const indexFile = path.join(__dirname, '../build/index.html');
    window.loadFile(indexFile).then(() => {
        window.show();
    }).catch(console.error);
    globals.window = window;
};

app.on('ready', () => {
    autoUpdater.checkForUpdates().catch(console.error);
    createMainWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('will-quit', () => {
    if (globals.manager) {
        globals.manager.kill();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
