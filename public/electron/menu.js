const { Menu } = require('electron');

const template = [{
    label: 'View',
    submenu: [{
        role: 'reload',
    }, {
        role: 'toggleDevTools',
    }, {
        type: 'separator',
    }, {
        role: 'resetZoom',
    }, {
        role: 'zoomIn',
    }, {
        role: 'zoomOut',
    }, {
        type: 'separator',
    }, {
        role: 'toggleFullScreen',
    }],
}, {
    role: 'Window',
    submenu: [{
        role: 'minimize',
    }, {
        role: 'close',
    }],
}];

module.exports = Menu.buildFromTemplate(template);
