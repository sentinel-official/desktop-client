const { app } = require('electron');

const manager = null;
const listenURL = app.commandLine.getSwitchValue('listen-url') || 'http://127.0.0.1:8080';
const window = null;

module.exports = {
    listenURL,
    manager,
    window,
};
