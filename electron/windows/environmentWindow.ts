import { BrowserWindow } from 'electron';
import path from 'node:path';
import { RENDERER_DIST, VITE_DEV_SERVER_URL } from '../main';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export let environmentWindow: BrowserWindow | null;

export function createEnvironmentWindow() {
	if (environmentWindow) return;

	environmentWindow = new BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		backgroundColor: "#081110",
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
	});

	environmentWindow.setAlwaysOnTop(true, "screen-saver", 1);

	if (VITE_DEV_SERVER_URL) {
		environmentWindow.loadURL(VITE_DEV_SERVER_URL)
	} else {
		environmentWindow.loadFile(path.join(RENDERER_DIST, 'index.html/#/render'))
	}

	environmentWindow.webContents.on('did-finish-load', () => {
		environmentWindow?.webContents.executeJavaScript(`
			window.location.hash = '#/render';
		`);
	});
	environmentWindow.on('closed', () => {
		environmentWindow = null;
	});
}
