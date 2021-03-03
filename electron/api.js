const { ipcRenderer } = require('electron');
const {
    MANAGER_START_REQUEST,
    MANAGER_START_RESPONSE,
    MANAGER_LISTEN_URL_GET_REQUEST,
} = require('./channels');

module.exports = {
    sendSync: {
        manager: {
            listenURL: () => ipcRenderer.sendSync(MANAGER_LISTEN_URL_GET_REQUEST),
        },
    },
    send: {
        manager: {
            startRequest: () => ipcRenderer.send(MANAGER_START_REQUEST),
        },
    },
    on: {
        manager: {
            startResponse: (func) => ipcRenderer.on(MANAGER_START_RESPONSE, func),
        },
    },
    removeAllListeners: {
        manager: {
            startResponse: () => ipcRenderer.removeAllListeners(MANAGER_START_RESPONSE),
        },
    },
};
