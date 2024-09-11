import { BrowserWindow } from 'electron';
import path from 'node:path';
import { RENDERER_DIST, VITE_DEV_SERVER_URL } from '../main';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export let visibilityWindow: BrowserWindow | null;

export function createVisibilityWindow() {
	if (visibilityWindow) return;

	visibilityWindow = new BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		backgroundColor: "#081110",
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
	});

	visibilityWindow.setAlwaysOnTop(true, "screen-saver", 1);

	if (VITE_DEV_SERVER_URL) {
		visibilityWindow.loadURL(VITE_DEV_SERVER_URL)
	} else {
		visibilityWindow.loadFile(path.join(RENDERER_DIST, 'index.html/#/visibility'))
	}

	visibilityWindow.webContents.on('did-finish-load', () => {
		visibilityWindow?.webContents.executeJavaScript(`
            window.location.hash = '#/visibility';
        `);
	});

	visibilityWindow.on('closed', () => {
		visibilityWindow = null;
	});
}
