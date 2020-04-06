const builder = require('electron-builder');

builder.build({
    targets: builder.Platform.current().createTarget(),
    config: {
        productName: 'Sentinel Desktop',
        compression: process.env.NODE_ENV === 'production' ? 'maximum' : 'store',
        extraResources: [
            'bin/manager',
        ],
        linux: {
            category: 'Utility',
            executableName: 'sentinel-desktop',
            icon: 'build/electron/',
            target: process.env.NODE_ENV === 'production' ? [
                'AppImage',
                'deb',
            ] : [
                'dir',
            ],
        },
        mac: {
            category: 'public.app-category.utilities',
            icon: 'build/electron/icon.icns',
        },
        win: {
            icon: 'build/electron/icon.ico',
        },
    },
}).then(() => {
    console.log('Build OK!');
}).catch(console.error);
