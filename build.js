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
            artifactName: 'sentinel-linux-${version}.${ext}',
            category: 'Utility',
            executableName: 'sentinel',
            icon: './electron/',
            target: [
                'AppImage',
                'deb',
                'dir',
                'zip',
            ],
        },
        mac: {
            artifactName: 'sentinel-darwin-${version}.${ext}',
            category: 'public.app-category.utilities',
            icon: './electron/icon.icns',
            hardenedRuntime: true,
            gatekeeperAssess: false,
            minimumSystemVersion: '10.12.0',
            forceCodeSigning: true,
            entitlements: './electron/entitlements.mac.plist',
            entitlementsInherit: './electron/entitlements.mac.plist',
        },
        win: {
            artifactName: 'sentinel-windows-${version}.${ext}',
            icon: './electron/icon.ico',
            target: [
                'nsis',
                'zip',
            ],
        },
        publish: {
            provider: 'github',
            owner: 'sentinel-official',
            repo: 'desktop-client',
            releaseType: 'release',
        },
    },
}).then(() => {
    console.log('Build OK!');
}).catch(console.error);
