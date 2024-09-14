import { BrowserWindow, globalShortcut, ipcMain } from 'electron';
import Store from 'electron-store';

Store.initRenderer();

const store = new Store();

export interface Keybind {
  key: string;
  action: string;
  bind: string;
}

export const defaultKeybinds: Keybind[] = [
  { key: "minimize", action: "Minimize Windows", bind: "Ctrl+Shift+M" },
  { key: "open-visibility", action: "Open Visibility Window", bind: "Ctrl+Shift+V" },
  { key: "open-environment", action: "Open Environment Window", bind: "Ctrl+Shift+E" },
  { key: "open-keybinds", action: "Open Keybinds Window", bind: "Ctrl+Shift+K" },
];

export function registerKeybinds(mainWindow: BrowserWindow) {
  const keybinds = store.get("keybinds", defaultKeybinds) as Keybind[];

  keybinds.forEach((keybind) => {
    if (keybind.bind) {
      globalShortcut.register(keybind.bind, () => {
        console.log(`Keybind pressed: ${keybind.bind}`);
        mainWindow.webContents.send(keybind.key);
      });
    }
  });
}

ipcMain.handle("update-keybinds", (event, newKeybinds) => {
  store.set("keybinds", newKeybinds);
  globalShortcut.unregisterAll();
  BrowserWindow.getAllWindows().forEach((window) => {
    registerKeybinds(window);
  });
})

ipcMain.handle("get-keybinds", () => {
  return store.get("keybinds", defaultKeybinds);
});