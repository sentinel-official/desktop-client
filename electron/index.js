require('./ipc');
const {
    app,
    BrowserWindow,
    Menu,
} = require('electron');
const path = require('path');
const menu = require('./menu');
const globals = require('./globals');

Menu.setApplicationMenu(menu);
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const createMainWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        height: 720,
        icon: path.join(__dirname, 'icon.png'),
        title: 'Sentinel',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 1280,
    });

    const indexFile = path.join(__dirname, '../build/index.html');
    window.loadFile(indexFile).then().catch(console.error);

    globals.window = window;
};

app.on('ready', () => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('will-quit', () => {
    globals.manager.kill();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
