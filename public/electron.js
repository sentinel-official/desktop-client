const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const menu = require('./electron/menu');
const { spawn } = require('child_process');

const iconPath = path.join(__dirname, 'electron/icon.png');

let mainWindow = null;
let manager = null;

Menu.setApplicationMenu(menu);

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: 'Sentinel',
        height: 720,
        width: 1280,
        minHeight: 720,
        minWidth: 1280,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
        },
        icon: iconPath,
    });

    mainWindow.loadFile('build/index.html').then();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', () => {
    const bin = path.resolve(__dirname, '../../bin/manager');

    manager = spawn(bin, { detached: true });
    manager.stdout.on('data', (data) => {
        if (data.toString() === '..') {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    manager.kill();
    app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
