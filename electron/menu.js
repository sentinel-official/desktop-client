const { Menu } = require('electron');

const template = [
    {
        label: 'Sentinel',
        submenu: [
            {
                label: 'About',
            },
            {
                type: 'separator',
            },
            {
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
