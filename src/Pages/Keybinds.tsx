import { useEffect, useState } from "react";
import hotkeys from "hotkeys-js";
import { Keybind } from "../../electron/keybinds/types";

export const KeybindsForm: React.FC = () => {
  const [keybinds, setKeybinds] = useState<Keybind[]>([]);
  const [editingKeybind, setEditingKeybind] = useState<Keybind | null>(null);
  const [currentKeybind, setCurrentKeybind] = useState<string>("");

  useEffect(() => {
    const fetchKeybinds = async () => {
      try {
        const data = await window.ipcRenderer.invoke("get-keybinds");
        setKeybinds(data);
      } catch (error) {
        console.error("Failed to fetch keybinds:", error);
      }
    };

    fetchKeybinds();
  }, []);

  useEffect(() => {
    const handleKeybindsUpdate = () => {
      keybinds.forEach(kb => hotkeys.unbind(kb.bind));
      keybinds.forEach(kb => hotkeys(kb.bind, () => console.log(`Keybind triggered: ${kb.bind}`)));
    };

    handleKeybindsUpdate();

    return () => {
      keybinds.forEach(kb => hotkeys.unbind(kb.bind));
    };
  }, [keybinds]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (editingKeybind) {
        const modifiers = [
          event.ctrlKey && "Ctrl",
          event.shiftKey && "Shift",
          event.altKey && "Alt",
          event.metaKey && "Meta"
        ].filter(Boolean).join("+");
    
        const key = (event.key.length === 1 && event.key.match(/[a-zA-Z0-9]/))
          ? event.key.toUpperCase()
          : "";
    
        const newBind = key ? `${modifiers}${modifiers ? "+" : ""}${key}` : modifiers;
    
        if (!newBind) {
          console.error("Invalid keybind: No key provided.");
          return;
        }
    
        setCurrentKeybind(newBind);
        event.preventDefault();
      }
    };

    const handleKeyup = () => {
      if (editingKeybind) {
        const isDuplicate = keybinds.some((kb) => kb.bind === currentKeybind && kb.channel !== editingKeybind.channel);
    
        if (isDuplicate) {
          console.error("Duplicate keybinding detected.");
          alert("This keybinding is already in use. Please choose a different one.");
          return;
        }
    
        const updatedKeybinds = keybinds.map((kb) =>
          kb.channel === editingKeybind.channel ? { ...kb, bind: currentKeybind } : kb
        );
    
        hotkeys.unbind(editingKeybind.bind);
        hotkeys(currentKeybind, () => console.log(`New keybind triggered: ${currentKeybind}`));
    
        window.ipcRenderer.invoke("update-keybinds", updatedKeybinds).catch((error) => {
          console.error("Failed to update keybinds:", error);
        });
    
        setKeybinds(updatedKeybinds);
        setEditingKeybind(null);
        setCurrentKeybind("");
      }
    };

    if (editingKeybind) {
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("keyup", handleKeyup);

      return () => {
        document.removeEventListener("keydown", handleKeydown);
        document.removeEventListener("keyup", handleKeyup);
      };
    }
  }, [editingKeybind, currentKeybind, keybinds]);

  const handleEditClick = (keybind: Keybind) => {
    setEditingKeybind(keybind);
    setCurrentKeybind(keybind.bind);
  };

  const closeWindow = () => {
    window.ipcRenderer.send("close-keybinds");
  };

  return (
    <div className="bg-gradient-to-t from-gold6 to-gold5 flex flex-col h-screen w-screen p-1">
      <div className="bg-gold5 flex h-2 drag-area justify-end items-center m-0.5">
        <button
          className="text-sm font-bold focus:outline-none select-none no-drag text-blue6"
          onClick={closeWindow}
        >
          X
        </button>
      </div>
  
      <div className="text-grey2 bg-mainbg flex-1 overflow-auto p-1">
        <div className="text-grey2 bg-mainbg border-2 border-innerborder h-full p-1 no-drag overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-grow space-y-2">
            {keybinds.map((keybind) => (
              <div
                key={keybind.channel}
                className="flex flex-row justify-between items-center p-2 border-b border-innerborder"
              >
                <span>{keybind.action}</span>
                <button
                  onClick={() => handleEditClick(keybind)}
                  className={`w-40 p-2 border border-innerborder rounded-sm transition-colors ${
                    editingKeybind?.channel === keybind.channel
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gold5 text-[#081110]'
                  } hover:bg-cyan-700 hover:border-cyan-800`}
                >
                  {editingKeybind?.channel === keybind.channel
                    ? "Press a key..."
                    : keybind.bind}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};