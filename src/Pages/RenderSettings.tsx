import React, { useState } from 'react';
import { Switch, TextField, Divider } from '@mui/material';
import { SketchPicker } from 'react-color';
import { Render } from '../Models/Render';

export const RenderSettings: React.FC<{render: Render, onUpdate: (newRender: Render) => void}> = ({ render, onUpdate }) => {
  const [depthFogColor, setDepthFogColor] = useState(render.depthFogColor);
  const [heightFogColor, setHeightFogColor] = useState(render.heightFogColor);

  const handleSwitchChange = (key: keyof Render) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...render, [key]: event.target.checked });
  };
  
  const handleTextChange = (key: keyof Render) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...render, [key]: event.target.value });
  };

  const handleNumberChange = (key: keyof Render) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...render, [key]: Number(event.target.value) });
  };

  const handleSliderChange = (key: keyof Render) => (_: Event, value: number | number[]) => {
    onUpdate({ ...render, [key]: value as number });
  };

  const handleDepthFogColorChange = (color: any) => {
    setDepthFogColor(color.rgb);
    onUpdate({ ...render, depthFogColor: color.rgb });
  };

  const handleHeightFogColorChange = (color: any) => {
    setHeightFogColor(color.rgb);
    onUpdate({ ...render, heightFogColor: color.rgb });
  };

  return (
    <div className="grid gap-2 p-2 text-xs">
      {/* Switches for booleans */}
      <div className="flex items-center">
        <Switch
          checked={render.banners}
          onChange={handleSwitchChange('banners')}
          color="primary"
        />
        <span className="ml-2">Banners</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.cameraAttached}
          onChange={handleSwitchChange('cameraAttached')}
          color="primary"
        />
        <span className="ml-2">Camera Attached</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.characters}
          onChange={handleSwitchChange('characters')}
          color="primary"
        />
        <span className="ml-2">Characters</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.depthFogEnabled}
          onChange={handleSwitchChange('depthFogEnabled')}
          color="primary"
        />
        <span className="ml-2">Depth Fog Enabled</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.depthOfFieldEnabled}
          onChange={handleSwitchChange('depthOfFieldEnabled')}
          color="primary"
        />
        <span className="ml-2">Depth Of Field Enabled</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.environment}
          onChange={handleSwitchChange('environment')}
          color="primary"
        />
        <span className="ml-2">Environment</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.floatingText}
          onChange={handleSwitchChange('floatingText')}
          color="primary"
        />
        <span className="ml-2">Floating Text</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.fogOfWar}
          onChange={handleSwitchChange('fogOfWar')}
          color="primary"
        />
        <span className="ml-2">Fog of War</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.healthBarChampions}
          onChange={handleSwitchChange('healthBarChampions')}
          color="primary"
        />
        <span className="ml-2">Health Bar Champions</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.healthBarMinions}
          onChange={handleSwitchChange('healthBarMinions')}
          color="primary"
        />
        <span className="ml-2">Health Bar Minions</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.healthBarPets}
          onChange={handleSwitchChange('healthBarPets')}
          color="primary"
        />
        <span className="ml-2">Health Bar Pets</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.healthBarStructures}
          onChange={handleSwitchChange('healthBarStructures')}
          color="primary"
        />
        <span className="ml-2">Health Bar Structures</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.healthBarWards}
          onChange={handleSwitchChange('healthBarWards')}
          color="primary"
        />
        <span className="ml-2">Health Bar Wards</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.heightFogEnabled}
          onChange={handleSwitchChange('heightFogEnabled')}
          color="primary"
        />
        <span className="ml-2">Height Fog Enabled</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceAll}
          onChange={handleSwitchChange('interfaceAll')}
          color="primary"
        />
        <span className="ml-2">Interface All</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceAnnounce}
          onChange={handleSwitchChange('interfaceAnnounce')}
          color="primary"
        />
        <span className="ml-2">Interface Announce</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceChat}
          onChange={handleSwitchChange('interfaceChat')}
          color="primary"
        />
        <span className="ml-2">Interface Chat</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceFrames}
          onChange={handleSwitchChange('interfaceFrames')}
          color="primary"
        />
        <span className="ml-2">Interface Frames</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceKillCallouts}
          onChange={handleSwitchChange('interfaceKillCallouts')}
          color="primary"
        />
        <span className="ml-2">Interface Kill Callouts</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceMinimap}
          onChange={handleSwitchChange('interfaceMinimap')}
          color="primary"
        />
        <span className="ml-2">Interface Minimap</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceNeutralTimers}
          onChange={handleSwitchChange('interfaceNeutralTimers')}
          color="primary"
        />
        <span className="ml-2">Interface Neutral Timers</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceReplay}
          onChange={handleSwitchChange('interfaceReplay')}
          color="primary"
        />
        <span className="ml-2">Interface Replay</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceScore}
          onChange={handleSwitchChange('interfaceScore')}
          color="primary"
        />
        <span className="ml-2">Interface Score</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceScoreboard}
          onChange={handleSwitchChange('interfaceScoreboard')}
          color="primary"
        />
        <span className="ml-2">Interface Scoreboard</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceTarget}
          onChange={handleSwitchChange('interfaceTarget')}
          color="primary"
        />
        <span className="ml-2">Interface Target</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.interfaceTimeline}
          onChange={handleSwitchChange('interfaceTimeline')}
          color="primary"
        />
        <span className="ml-2">Interface Timeline</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.outlineHover}
          onChange={handleSwitchChange('outlineHover')}
          color="primary"
        />
        <span className="ml-2">Outline Hover</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.outlineSelect}
          onChange={handleSwitchChange('outlineSelect')}
          color="primary"
        />
        <span className="ml-2">Outline Select</span>
      </div>

      <div className="flex items-center">
        <Switch
          checked={render.particles}
          onChange={handleSwitchChange('particles')}
          color="primary"
        />
        <span className="ml-2">Particles</span>
      </div>

      {/* Text Fields for strings */}
      <TextField
        label="Camera Mode"
        value={render.cameraMode}
        onChange={handleTextChange('cameraMode')}
        fullWidth
      />

      <TextField
        label="Selection Name"
        value={render.selectionName}
        onChange={handleTextChange('selectionName')}
        fullWidth
      />

      <TextField
        label="Skybox Path"
        value={render.skyboxPath}
        onChange={handleTextChange('skyboxPath')}
        fullWidth
      />

      <span className='flex gap-2'>
        {/* Number Inputs */}
        <TextField
          label="Camera Look Speed"
          type="number"
          value={render.cameraLookSpeed}
          onChange={handleNumberChange('cameraLookSpeed')}
          fullWidth
        />

        <TextField
          label="Camera Move Speed"
          type="number"
          value={render.cameraMoveSpeed}
          onChange={handleNumberChange('cameraMoveSpeed')}
          fullWidth
        />
      </span>
      <h1>Depth of Field</h1>
      <span className='flex gap-2'>
        <TextField
          label="Fog Start"
          type="number"
          value={render.depthFogStart}
          onChange={handleNumberChange('depthFogStart')}
          fullWidth
        />
        <TextField
          label="Fog End"
          type="number"
          value={render.depthFogEnd}
          onChange={handleNumberChange('depthFogEnd')}
          fullWidth
        />

        <TextField
          label="Fog Intensity"
          type="number"
          value={render.depthFogIntensity}
          onChange={handleNumberChange('depthFogIntensity')}
          fullWidth
        />
      </span>
      <span className='flex gap-2'>

        <TextField
          label="DOF Circle"
          type="number"
          value={render.depthOfFieldCircle}
          onChange={handleNumberChange('depthOfFieldCircle')}
          fullWidth
        />

        <TextField
          label="DOF Far"
          type="number"
          value={render.depthOfFieldFar}
          onChange={handleNumberChange('depthOfFieldFar')}
          fullWidth
        />

        <TextField
          label="DOF Mid"
          type="number"
          value={render.depthOfFieldMid}
          onChange={handleNumberChange('depthOfFieldMid')}
          fullWidth
        />

        <TextField
          label="DOF Near"
          type="number"
          value={render.depthOfFieldNear}
          onChange={handleNumberChange('depthOfFieldNear')}
          fullWidth
        />

        <TextField
          label="DOF Width"
          type="number"
          value={render.depthOfFieldWidth}
          onChange={handleNumberChange('depthOfFieldWidth')}
          fullWidth
        />

        <TextField
          label="Far Clip"
          type="number"
          value={render.farClip}
          onChange={handleNumberChange('farClip')}
          fullWidth
        />
      </span>

      <TextField
        label="Field Of View"
        type="number"
        value={render.fieldOfView}
        onChange={handleNumberChange('fieldOfView')}
        fullWidth
      />
      <span></span>
      <Divider></Divider>
      <span></span>
      <span className='flex gap-2'>
        <TextField
          label="Height Fog End"
          type="number"
          value={render.heightFogEnd}
          onChange={handleNumberChange('heightFogEnd')}
          fullWidth
        />

        <TextField
          label="Height Fog Intensity"
          type="number"
          value={render.heightFogIntensity}
          onChange={handleNumberChange('heightFogIntensity')}
          fullWidth
        />

        <TextField
          label="Height Fog Start"
          type="number"
          value={render.heightFogStart}
          onChange={handleNumberChange('heightFogStart')}
          fullWidth
        />
      </span>
      <span></span>
      <Divider></Divider>
      <span></span>
      <TextField
        label="Nav Grid Offset"
        type="number"
        value={render.navGridOffset}
        onChange={handleNumberChange('navGridOffset')}
        fullWidth
      />

      <TextField
        label="Near Clip"
        type="number"
        value={render.nearClip}
        onChange={handleNumberChange('nearClip')}
        fullWidth
      />

      <TextField
        label="Skybox Offset"
        type="number"
        value={render.skyboxOffset}
        onChange={handleNumberChange('skyboxOffset')}
        fullWidth
      />

      <TextField
        label="Skybox Radius"
        type="number"
        value={render.skyboxRadius}
        onChange={handleNumberChange('skyboxRadius')}
        fullWidth
      />

      <TextField
        label="Skybox Rotation"
        type="number"
        value={render.skyboxRotation}
        onChange={handleNumberChange('skyboxRotation')}
        fullWidth
      />

      {/* Vector Inputs */}
      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Camera Position X"
          type="number"
          value={render.cameraPosition.x}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraPosition: { ...render.cameraPosition, x: Number(e.target.value) } })
          }
        />
        <TextField
          label="Camera Position Y"
          type="number"
          value={render.cameraPosition.y}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraPosition: { ...render.cameraPosition, y: Number(e.target.value) } })
          }
        />
        <TextField
          label="Camera Position Z"
          type="number"
          value={render.cameraPosition.z}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraPosition: { ...render.cameraPosition, z: Number(e.target.value) } })
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Camera Rotation X"
          type="number"
          value={render.cameraRotation.x}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraRotation: { ...render.cameraRotation, x: Number(e.target.value) } })
          }
        />
        <TextField
          label="Camera Rotation Y"
          type="number"
          value={render.cameraRotation.y}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraRotation: { ...render.cameraRotation, y: Number(e.target.value) } })
          }
        />
        <TextField
          label="Camera Rotation Z"
          type="number"
          value={render.cameraRotation.z}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, cameraRotation: { ...render.cameraRotation, z: Number(e.target.value) } })
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Selection Offset X"
          type="number"
          value={render.selectionOffset.x}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, selectionOffset: { ...render.selectionOffset, x: Number(e.target.value) } })
          }
        />
        <TextField
          label="Selection Offset Y"
          type="number"
          value={render.selectionOffset.y}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, selectionOffset: { ...render.selectionOffset, y: Number(e.target.value) } })
          }
        />
        <TextField
          label="Selection Offset Z"
          type="number"
          value={render.selectionOffset.z}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, selectionOffset: { ...render.selectionOffset, z: Number(e.target.value) } })
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          label="Sun Direction X"
          type="number"
          value={render.sunDirection.x}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, sunDirection: { ...render.sunDirection, x: Number(e.target.value) } })
          }
        />
        <TextField
          label="Sun Direction Y"
          type="number"
          value={render.sunDirection.y}
          onChange={(e: { target: { value: any; }; }) =>
            onUpdate({ ...render, sunDirection: { ...render.sunDirection, y: Number(e.target.value) } })
          }
        />
        <TextField
          label="Sun Direction Z"
          type="number"
          value={render.sunDirection.z}
          onChange={(e: { target: { value: any; }; }) => onUpdate({ ...render, sunDirection: { ...render.sunDirection, z: Number(e.target.value) } })
          }
        />
      </div>

      {/* Color Pickers */}
      <div className="my-4">
        <label>Depth Fog Color</label>
        <SketchPicker
          color={depthFogColor}
          onChangeComplete={handleDepthFogColorChange}
        />
      </div>

      <div className="my-4">
        <label>Height Fog Color</label>
        <SketchPicker
          color={heightFogColor}
          onChangeComplete={handleHeightFogColorChange}
        />
      </div>
    </div>
  );
};