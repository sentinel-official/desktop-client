const {
    app,
    Menu,
} = require('electron');
const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');

const template = [
    {
        label: 'Sentinel',
        submenu: [
            {
                label: 'About',
            },
            {
                label: 'Check for Updates...',
                click: async () => {
                    logger.transports.file.level = 'debug';
                    autoUpdater.logger = logger;
                    await autoUpdater.checkForUpdates();
                },
            },
            {
                type: 'separator',
            },
            {
                label: `Quit Sentinel v${app.getVersion()}`,
                role: 'quit',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
            {
                type: 'separator',
            },
            {
                role: 'cut',
            },
            {
                role: 'copy',
            },
            {
                role: 'paste',
            },
            {
                role: 'selectAll',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'toggleDevTools',
            },
            {
                type: 'separator',
            },
            {
                role: 'resetZoom',
            },
            {
                role: 'zoomIn',
            },
            {
                role: 'zoomOut',
            },
            {
                type: 'separator',
            },
            {
                role: 'toggleFullScreen',
            },
        ],
    },
];

module.exports = Menu.buildFromTemplate(template);
