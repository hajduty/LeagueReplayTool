import { FormControlLabel, Grid, Switch } from "@mui/material"
import { initialRenderState } from "./Render";
import { useEffect, useState } from "react";
import { Render } from "../Models/Render";


export const VisibilityForm = () => {
    const [visibility, setVisibility] = useState<Render>(initialRenderState);

    useEffect(() => {
        window.ipcRenderer.send('get-render');
    },[])

    const handleToggleChange = async (key: keyof Render) => {
        setVisibility({
            ...visibility,
            [key]: !visibility[key],
        });
        
        window.ipcRenderer.send('post-render', { key, value: !visibility[key] });
    };

    const booleanKeys = Object.keys(visibility).filter(
        (key) =>
            typeof visibility[key as keyof Render] === 'boolean' &&
            !key.toLowerCase().includes('fog') &&
            !key.toLowerCase().includes('depth')
    ) as (keyof Render)[];

    const closeWindow = () => {
        window.ipcRenderer.send('close-visibility');
    };

    window.ipcRenderer.on('main-get-render', (event, data) => {
        //console.log('Message received from main process:', data);
        setVisibility(data);
    });
    
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
                        <span className="flex flex-col px-2">
                            {booleanKeys.map((key) => (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Switch
                                            checked={visibility[key]}
                                            onChange={() => handleToggleChange(key)}
                                            color="primary"
                                            size="small"
                                            className="no-drag"
                                        />
                                    }
                                    label={key}
                                    className="select-none"
                                />
                            ))}
                        </span>
                        <span className="flex-grow"></span>
                    </div>
                </div>
            </div>
        </>
    )
}