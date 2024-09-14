import { useEffect, useState } from "react";

type Props = {}

export const KeybindsForm = (props: Props) => {

  const closeWindow = () => {
    window.ipcRenderer.send("close-keybinds");
  }

  return (
    <>
    <div className="bg-gradient-to-t from-gold6 to-gold5 flex flex-col h-screen w-screen p-1">
      <div className="bg-gold5 flex h-2 drag-area justify-end items-center m-0.5">
        <button className="text-sm font-bold focus:outline-none select-none no-drag text-blue6" onClick={closeWindow}>
          X
        </button>
      </div>

      <div className="text-grey2 bg-mainbg flex-1 overflow-auto p-1">
        <div className="text-grey2 bg-mainbg border-2 border-innerborder h-full p-1 no-drag overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-row">
          <span className="flex-grow">
            Keybinds
          </span>
        </div>
      </div>
    </div>
  </>
  )
}