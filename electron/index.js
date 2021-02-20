const {
    app,
    BrowserWindow,
    Menu,
} = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const menu = require('./menu');
const { isPortFree } = require('./utils/net');

Menu.setApplicationMenu(menu);
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const listenURL = app.commandLine.getSwitchValue('listen-url') || 'http://localhost:8080';
let manager = null;

const createWindow = () => {
    const window = new BrowserWindow({
        show: false,
        height: 480,
        icon: path.join(__dirname, 'icon.png'),
        title: 'Sentinel',
        width: 852,
    });

    window.loadFile(path.join(__dirname, '../build/index.html'))
        .then(() => {
            window.show();
        })
        .catch(console.error);
};

app.on('ready', () => {
    const url = new URL(listenURL);
    isPortFree(url.port, url.hostname, (error) => {
        if (error) {
            console.error(error);
            app.quit();
        } else {
            manager = spawn(
                path.join(__dirname, '../bin/manager'),
                [
                    'server',
                    '--listen-url',
                    listenURL,
                ],
                {
                    detached: false,
                },
            );
            manager.stdout.on('data', (data) => {
                data = data.toString().trim();
                console.log(data);
            });
            manager.stderr.on('data', (data) => {
                data = data.toString().trim();
                console.error(data);
            });

            let created = false;
            manager.stdout.on('data', (data) => {
                if (created) {
                    return;
                }

                data = data.toString().trim();
                if (data.indexOf('Listening on URL') === -1) {
                    app.quit();
                }

                created = true;
                createWindow();
            });
            manager.stderr.on('data', () => {
                app.quit();
            });
        }
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('will-quit', () => {
    manager.kill();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
