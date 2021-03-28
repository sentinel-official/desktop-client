const path = require('path');
const { spawn } = require('child_process');
const { ipcMain } = require('electron');
const {
    MANAGER_LISTEN_URL_GET_REQUEST,
    MANAGER_START_REQUEST,
    MANAGER_START_RESPONSE,
} = require('./channels');
const globals = require('./globals');

ipcMain.on(MANAGER_LISTEN_URL_GET_REQUEST, (event, args) => {
    console.log('EVENT:', event, 'ARGS:', args);

    event.returnValue = globals.listenURL;
});

ipcMain.on(MANAGER_START_REQUEST, (event, args) => {
    console.log('EVENT:', event, 'ARGS:', args);

    const manager = spawn(
        path.join(__dirname, '../bin/manager'),
        ['server', '--listen-url', globals.listenURL],
        { detached: false },
    );

    let error = false;
    let success = false;

    manager.stderr.on('data', (data) => {
        data = data.toString().trim();
        console.error(data);

        if (error) {
            return;
        }

        error = true;
        globals.window.webContents.send(MANAGER_START_RESPONSE, {
            success: false,
            data,
        });
    });
    manager.stdout.on('data', (data) => {
        data = data.toString().trim();
        console.log(data);

        if (success) {
            return;
        }

        success = true;
        globals.window.webContents.send(MANAGER_START_RESPONSE, {
            success: true,
            data,
        });
    });

    globals.manager = manager;
});
