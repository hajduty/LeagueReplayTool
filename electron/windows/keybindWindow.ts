import { BrowserWindow } from "electron";
import { RENDERER_DIST, VITE_DEV_SERVER_URL } from '../main';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export let keybindWindow: BrowserWindow | null;

export function createKeybindWindow() {
	if (keybindWindow) return;

	keybindWindow = new BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		backgroundColor: "#081110",
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
	});

	keybindWindow.setAlwaysOnTop(true, "screen-saver", 1);

	if (VITE_DEV_SERVER_URL) {
		keybindWindow.loadURL(VITE_DEV_SERVER_URL)
	} else {
		keybindWindow.loadFile(path.join(RENDERER_DIST, 'index.html/#/keybind'))
	}

	keybindWindow.webContents.on('did-finish-load', () => {
		keybindWindow?.webContents.executeJavaScript(`
			window.location.hash = '#/keybind';
		`);
	});
	keybindWindow.on('closed', () => {
		keybindWindow = null;
	});
}