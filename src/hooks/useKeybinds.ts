import { useEffect } from "react";

const useKeybinds = (keybinds: { [event: string]: (e: any) => void }) => {
  
  useEffect(() => {
    Object.keys(keybinds).forEach((event) => {
      window.ipcRenderer.on(event, keybinds[event]);
    });

    return () => {
      Object.keys(keybinds).forEach((event) => {
        window.ipcRenderer.removeAllListeners(event);
      });
    };
  }, [keybinds]);
};

export default useKeybinds;