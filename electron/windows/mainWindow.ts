import { BrowserWindow } from 'electron';
import { RENDERER_DIST } from '../main';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { registerKeybinds } from '../keybinds/store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export let mainWindow: BrowserWindow;

export function createMainWindow() {
	if (mainWindow) return;

	mainWindow = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC || '', 'electron-vite.svg'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
			nodeIntegration: true,
		},
		frame: false,
		width: 900,
		height: 500,
		minHeight: 500,
		maxHeight: 500,
		resizable: true,
		backgroundColor: "#081110",
		thickFrame: false,
	});

	mainWindow.setAlwaysOnTop(true, "screen-saver", 1);

	mainWindow.webContents.on('did-finish-load', () => {
		mainWindow?.webContents.send('main-process-message', new Date().toLocaleString());
	});

	const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

	if (VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(VITE_DEV_SERVER_URL);
	} else if (RENDERER_DIST) {
		mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'));
	} else {
		console.error("Error: VITE_DEV_SERVER_URL and RENDERER_DIST are undefined");
	}

	registerKeybinds(mainWindow);

	// devtools
	mainWindow.webContents.openDevTools();

}
