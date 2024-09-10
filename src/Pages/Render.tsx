import { useEffect, useState } from "react";
import { RenderSettings } from "./RenderSettings"
import { Render } from "../Models/Render";

export const initialRenderState = {
    banners: false,
    cameraAttached: false,
    cameraLookSpeed: 1,
    cameraMode: 'perspective',
    cameraMoveSpeed: 5,
    cameraPosition: { x: 0, y: 0, z: 0 },
    cameraRotation: { x: 0, y: 0, z: 0 },
    characters: false,
    depthFogColor: { r: 255, g: 255, b: 255, a: 1 },
    depthFogEnabled: false,
    depthFogEnd: 1000,
    depthFogIntensity: 0.5,
    depthFogStart: 100,
    depthOfFieldCircle: 2,
    depthOfFieldDebug: false,
    depthOfFieldEnabled: false,
    depthOfFieldFar: 100,
    depthOfFieldMid: 50,
    depthOfFieldNear: 10,
    depthOfFieldWidth: 500,
    environment: false,
    farClip: 2000,
    fieldOfView: 75,
    floatingText: false,
    fogOfWar: false,
    healthBarChampions: false,
    healthBarMinions: false,
    healthBarPets: false,
    healthBarStructures: false,
    healthBarWards: false,
    heightFogColor: { r: 255, g: 255, b: 255, a: 1 },
    heightFogEnabled: false,
    heightFogEnd: 1000,
    heightFogIntensity: 0.5,
    heightFogStart: 100,
    interfaceAll: false,
    interfaceAnnounce: false,
    interfaceChat: false,
    interfaceFrames: false,
    interfaceKillCallouts: false,
    interfaceMinimap: false,
    interfaceNeutralTimers: false,
    interfaceQuests: null,
    interfaceReplay: false,
    interfaceScore: false,
    interfaceScoreboard: false,
    interfaceTarget: false,
    interfaceTimeline: false,
    navGridOffset: 10,
    nearClip: 0.1,
    outlineHover: false,
    outlineSelect: false,
    particles: false,
    selectionName: 'Player1',
    selectionOffset: { x: 0, y: 0, z: 0 },
    skyboxOffset: 0,
    skyboxPath: '/path/to/skybox',
    skyboxRadius: 1000,
    skyboxRotation: 0,
    sunDirection: { x: 1, y: 1, z: 0 },
};

export const RenderForm = () => {
    const closeWindow = () => {
        window.ipcRenderer.send('close-environment');
    };

    return (
        <>
            <div className="bg-gradient-to-t from-gold6 to-gold5 flex flex-col h-screen w-screen p-1">
                <div className="bg-gold5 flex h-2 drag-area justify-end items-center m-0.5">
                    <button className="text-sm font-bold focus:outline-none select-none no-drag text-blue6" onClick={() => closeWindow()}>
                        X
                    </button>
                </div>

                <div className="text-grey2 bg-mainbg flex-1 overflow-auto p-1">
                    <div className="text-grey2 bg-mainbg border-2 border-innerborder h-full p-1 no-drag overflow-x-hidden overflow-y-auto custom-scrollbar flex flex-row">
                        <RenderSettings/>
                    </div>
                </div>
            </div>
        </>
    )
}