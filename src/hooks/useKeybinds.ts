import { useEffect, useState } from "react";
import { Keybind, KeybindChannels } from "../../electron/keybinds/types";

const useKeybinds = (keybindActions?: Partial<{ [channel in KeybindChannels]: () => void }>) => {
  
  const [keybinds, setKeybinds] = useState<Keybind[]>([]);

  useEffect(() => {
    const fetchKeybinds = async () => {
      try {
        const data = await window.ipcRenderer.invoke("get-keybinds");
        setKeybinds(data);
        console.log("Keybinds fetched:", data);
      } catch (error) {
        console.error("Failed to fetch keybinds:", error);
      }
    };

    fetchKeybinds();
  }, []);

  useEffect(() => {
    if (keybindActions) { 
      Object.keys(keybindActions).forEach((channel) => {
        window.ipcRenderer.on(channel, keybindActions[channel as KeybindChannels]!);
      });

      return () => {
        Object.keys(keybindActions).forEach((event) => {
          window.ipcRenderer.removeAllListeners(event);
        });
      };
    }
  }, [keybindActions]);

  const updateKeybinds = async (updatedKeybinds: Keybind[]) => {
    try {
      await window.ipcRenderer.invoke("update-keybinds", updatedKeybinds);
      console.log("keybinds updated", updatedKeybinds);
      setKeybinds(updatedKeybinds);
    } catch (error) {
      console.error("Failed to update keybinds:", error);
    }
  };

  return { keybinds, updateKeybinds };
};

export default useKeybinds;
