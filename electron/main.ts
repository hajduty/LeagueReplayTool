import { app, BrowserWindow, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

import path from 'node:path'
import { getReq, postReq } from './requests';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            nodeIntegration:  true,
        },
        frame: false,
        width: 900,
        height: 110,
        //maxHeight: 110,
        minHeight: 110,
        resizable: true,
        roundedCorners: false,
        backgroundColor: "#081110",
        thickFrame: false,
    })

    win.setAlwaysOnTop(true, "screen-saver",1);

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

let environmentWindow: BrowserWindow | null;

function createEnvironmentWindow() {
    if (environmentWindow) {
        return;
    }

    environmentWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        resizable: true,
        roundedCorners: false,
        backgroundColor: "#081110",
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        }
    });

    environmentWindow.setAlwaysOnTop(true, "screen-saver",1);

    if (VITE_DEV_SERVER_URL) {
        environmentWindow.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        environmentWindow.loadFile(path.join(RENDERER_DIST, 'index.html/#/render'))
    }

    environmentWindow.on('closed', () => {
        environmentWindow = null;
    });

    environmentWindow.webContents.on('did-finish-load', () => {
        environmentWindow?.webContents.executeJavaScript(`
            window.location.hash = '#/render';
        `);
    });
}

let visibilityWindow: BrowserWindow | null;

function createVisibilityWindow() {
    if (visibilityWindow) {
        return;
    }

    visibilityWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        resizable: true,
        roundedCorners: false,
        thickFrame: false,
        backgroundColor: "#081110",
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        }
    });

    visibilityWindow.setAlwaysOnTop(true, "screen-saver",1);

    if (VITE_DEV_SERVER_URL) {
        visibilityWindow.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        visibilityWindow.loadFile(path.join(RENDERER_DIST, 'index.html/#/visibility'))
    }

    visibilityWindow.on('closed', () => {
        visibilityWindow = null;
    });

    visibilityWindow.webContents.on('did-finish-load', () => {
        visibilityWindow?.webContents.executeJavaScript(`
            window.location.hash = '#/visibility';
        `);
    });
}

ipcMain.on('open-visibility', (event, arg) => {
    if (visibilityWindow != null) {
        visibilityWindow.show();
    } else {
        createVisibilityWindow();
    }
});

ipcMain.on('open-environment', (event, arg) => {
    if (environmentWindow != null) {
        environmentWindow.show();
    } else {
        createEnvironmentWindow();
    }
});

ipcMain.on('close-environment', (event, arg) => {
    environmentWindow?.close();
});

ipcMain.on('close-visibility', (event, arg) => {
    visibilityWindow?.close();
});

ipcMain.on('minimize', (event, arg) => {
    win?.minimize();
    environmentWindow?.minimize();
    visibilityWindow?.minimize();
});

ipcMain.on('post-render', (event, arg) => {
    //console.log(arg);
    postReq("https://127.0.0.1:2999/replay/render", { [arg.key]: arg.value });
});

ipcMain.handle('post-timeline', (event, arg) => {
    console.log('Received arg:', arg);
    postReq("https://127.0.0.1:2999/replay/playback", { [arg.key]: arg.value });
});

ipcMain.on('post-sequence', (event, arg) => {
    //console.log('Received arg:', JSON.stringify(arg, null, 2));
    postReq("https://127.0.0.1:2999/replay/sequence", arg);
});

ipcMain.handle('get-timeline', async (event, arg) => {
    const data: any = await getReq("https://127.0.0.1:2999/replay/playback");
    return data;
});

ipcMain.on('get-render', async (event, arg) => {
    console.log("get render2 called");
    const data: any = await getReq("https://127.0.0.1:2999/replay/render");
    //console.log(data);
    event.reply('main-get-render', data);
});

ipcMain.handle('get-render', async (event, arg) => {
    console.log("get render 3called");
    const data: any = await getReq("https://127.0.0.1:2999/replay/render");
    //console.log(data);
    return data;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)