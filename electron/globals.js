const { app } = require('electron');

const manager = null;
const listenURL = app.commandLine.getSwitchValue('listen-url') || 'http://127.0.0.1:26667';
const window = null;

module.exports = {
    listenURL,
    manager,
    window,
};
