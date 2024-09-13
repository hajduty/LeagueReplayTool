import { ipcMain } from 'electron';
import { postReq, getReq } from './requests';
import { createVisibilityWindow, visibilityWindow } from './windows/visibilityWindow';
import { createEnvironmentWindow, environmentWindow } from './windows/environmentWindow';
import { createMainWindow, mainWindow } from './windows/mainWindow';
import { createKeybindWindow, keybindWindow } from './windows/keybindWindow';

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

ipcMain.on('open-keybinds', (event, arg) => {
    if (keybindWindow != null) {
        keybindWindow.show();
    } else {
        createKeybindWindow();
    }
});

ipcMain.on('minimize', (event, arg) => {
    environmentWindow?.minimize();
    mainWindow?.minimize();
    visibilityWindow?.minimize();
});

ipcMain.on('close-environment', (event, arg) => {
    environmentWindow?.close();
});

ipcMain.on('close-visibility', (event, arg) => {
    visibilityWindow?.close();
});

ipcMain.on('close-keybinds', (event, arg) => {
    keybindWindow?.close();
});

ipcMain.on('post-render', (event, arg) => {
    postReq("https://127.0.0.1:2999/replay/render", { [arg.key]: arg.value });
});

ipcMain.handle('post-timeline', (event, arg) => {
    console.log('Received arg:', arg);
    postReq("https://127.0.0.1:2999/replay/playback", { [arg.key]: arg.value });
});

ipcMain.on('post-sequence', (event, arg) => {
    postReq("https://127.0.0.1:2999/replay/sequence", arg);
});

ipcMain.handle('get-timeline', async (event, arg) => {
    const data: any = await getReq("https://127.0.0.1:2999/replay/playback");
    return data;
});

ipcMain.on('get-render', async (event, arg) => {
    console.log("get render2 called");
    const data: any = await getReq("https://127.0.0.1:2999/replay/render");
    event.reply('main-get-render', data);
});

ipcMain.handle('get-render', async (event, arg) => {
    console.log("get render 3called");
    const data: any = await getReq("https://127.0.0.1:2999/replay/render");
    return data;
});
