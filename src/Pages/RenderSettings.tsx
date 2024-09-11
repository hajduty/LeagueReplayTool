import React, { useEffect, useState } from 'react';
import { Switch, TextField, Divider, Button, Modal } from '@mui/material';
import { SketchPicker } from 'react-color';
import { Render } from '../Models/Render';
import { initialRenderState } from './Render';
import { decimalToRgb, rgbToDecimal } from '../Utils/utils';

export const RenderSettings = () => {
	const [render, setRender] = useState<Render>(initialRenderState);
	const [depthFogColor, setDepthFogColor] = useState(render.depthFogColor);
	const [heightFogColor, setHeightFogColor] = useState(render.heightFogColor);
	const [depthModal, setDepthModal] = useState(false);
	const [heightModal, setHeightModal] = useState(false);

	useEffect(() => {
		const fetchData = () => {
			window.ipcRenderer.invoke('get-render').then((newData) => {
				setRender(newData);
			});
		};

		fetchData();
	}, []);

	const sendUpdate = <K extends keyof Render>(key: string, value: Render[K]) => {
		setRender(() => ({
			...render,
			[key]: value,
		}));

		window.ipcRenderer.send('post-render', { key, value });  // Send the updated value
		console.log({ key, value });
	};

	const handleSwitchChange = (key: keyof Render) => (event: React.ChangeEvent<HTMLInputElement>) => {
		sendUpdate(key, event.target.checked);
	};

	const handleNumberChange = (key: keyof Render) => (event: React.ChangeEvent<HTMLInputElement>) => {
		sendUpdate(key, Number(event.target.value));
	};

	const handleDepthFogColorChange = (color: any) => {
		const decimalColor = rgbToDecimal(color.rgb);
		setDepthFogColor(decimalColor);
		sendUpdate('depthFogColor', decimalColor);
	};

	const handleHeightFogColorChange = (color: any) => {
		const decimalColor = rgbToDecimal(color.rgb);
		setHeightFogColor(decimalColor);
		sendUpdate('heightFogColor', decimalColor);
	};


	return (
		<div className="grid gap-2 p-2 text-xs">
			{/* Number Inputs */}
			<span className='flex gap-2'>
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
			<span />
			<Divider />
			<div className="flex items-center space-x-4">
				<h1 className='text-lg'>Depth of Field</h1>
				<Switch
					checked={render.depthOfFieldEnabled}
					onChange={handleSwitchChange('depthOfFieldEnabled')}
					color="primary"
					size='small'
				/>

				<h1 className='text-sm'>Debug</h1>
				<Switch
					checked={render.depthOfFieldDebug}
					onChange={handleSwitchChange('depthOfFieldDebug')}
					color="primary"
					size='small'
				/>
			</div>

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
			</span>
			<span />
			<Divider />

			{/* Depth Fog Section */}
			<div className="flex items-center space-x-4">
				<h1 className='text-lg'>Depth Fog</h1>
				<Switch
					checked={render.depthFogEnabled}
					onChange={handleSwitchChange('depthFogEnabled')}
					color="primary"
					size='small'
				/>
			</div>

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

			<div className="flex items-center">
				<Button
					style={{ backgroundColor: `rgba(${decimalToRgb(depthFogColor).r}, ${decimalToRgb(depthFogColor).g}, ${decimalToRgb(depthFogColor).b}, ${depthFogColor.a})` }}
					onClick={() => setDepthModal(true)}
				>
					Depth Fog Color
				</Button>
				<Modal open={depthModal} onClose={() => setDepthModal(false)}>
					<div className="h-screen flex flex-col align-middle justify-center items-center">
						<SketchPicker color={depthFogColor} onChange={handleDepthFogColorChange} />
						<Button onClick={() => setDepthModal(false)} >Close</Button>
					</div>
				</Modal>
			</div>

			<Divider />

			{/* Height Fog Section */}
			<div className="flex items-center space-x-4">
				<h1 className='text-lg'>Height Fog</h1>
				<Switch
					checked={render.heightFogEnabled}
					onChange={handleSwitchChange('heightFogEnabled')}
					color="primary"
					size='small'
				/>
			</div>

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

			<div className="flex items-center">
				<Button
					style={{ backgroundColor: `rgba(${decimalToRgb(heightFogColor).r}, ${decimalToRgb(heightFogColor).g}, ${decimalToRgb(heightFogColor).b}, ${heightFogColor.a})` }}
					onClick={() => setHeightModal(true)}
				>
					Height Fog Color
				</Button>
				<Modal open={heightModal} onClose={() => setHeightModal(false)}>
					<div className="h-screen flex flex-col align-middle justify-center items-center">
						<SketchPicker color={heightFogColor} onChange={handleHeightFogColorChange} />
						<Button onClick={() => setHeightModal(false)} >Close</Button>
					</div>
				</Modal>
			</div>
		</div>
	);
};
