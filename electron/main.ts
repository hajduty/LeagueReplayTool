import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMainWindow } from './windows/mainWindow';
import './ipcHandlers';

// Ensure __dirname is defined before using it
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set environment variables first
process.env.APP_ROOT = path.join(__dirname, '..');

// Export constants after setting process.env.APP_ROOT
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

// Define VITE_PUBLIC based on VITE_DEV_SERVER_URL
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});

app.whenReady().then(createMainWindow);
