const builder = require('electron-builder');

const compression = process.env.NODE_ENV === 'production' ? 'maximum' : 'store';

builder.build({
    targets: builder.Platform.current().createTarget(),
    config: {
        files: [
            './bin/**/*',
            './build/**/*',
            './electron/**/*',
        ],
        extends: null,
        asar: false,
        appId: 'co.sentinel.desktop',
        productName: 'Sentinel',
        compression: compression,
        linux: {
            category: 'Utility',
            executableName: 'sentinel',
            icon: './electron/',
            target: [
                'AppImage',
                'deb',
                'dir',
                'tar.gz',
            ],
        },
        mac: {
            category: 'public.app-category.utilities',
            icon: './electron/icon.icns',
        },
        win: {
            icon: './electron/icon.ico',
        },
    },
}).then(() => {
    console.log('Build OK!');
}).catch(console.error);
