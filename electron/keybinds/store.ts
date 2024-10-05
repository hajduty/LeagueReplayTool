import { BrowserWindow, globalShortcut } from "electron";
import { defaultKeybindMap, Keybind, KeybindMap } from "./types";
import Store from 'electron-store';

export const store = new Store();

export const getKeybindMap = (): KeybindMap => {
  const keybinds = store.get("keybinds", Array.from(defaultKeybindMap.values())) as Keybind[];
  return new Map(keybinds.map((keybind) => [keybind.channel, keybind]));
}

export const updateKeybinds = (newKeybinds: Keybind[]) => {
  store.set("keybinds", newKeybinds);
}

export function registerKeybinds(mainWindow: BrowserWindow) {
  const keybindMap = getKeybindMap();

  keybindMap.forEach((keybind) => {
    if (keybind.bind) {
      globalShortcut.register(keybind.bind, () => {
        console.log("Keybind pressed:", keybind.channel);
        mainWindow.webContents.send(keybind.channel);
      });
    }
  });
}

export const reloadKeybinds = () => {
  globalShortcut.unregisterAll();
  BrowserWindow.getAllWindows().forEach((window) => {
    registerKeybinds(window);
  });
}
