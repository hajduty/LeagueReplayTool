export interface Timeline {
	length: number,
	paused: boolean,
	seeking: boolean,
	speed: number,
	time: number,
}

export const defaultState = {
	length: 1000,
	paused: false,
	seeking: false,
	speed: 1.0,
	time: 100,
}

export const defaultSequence = {
	cameraPosition: null,
	cameraRotation: null,
	depthFogColor: null,
	depthFogEnabled: null,
	depthFogEnd: null,
	depthFogIntensity: null,
	depthFogStart: null,
	depthOfFieldCircle: null,
	depthOfFieldEnabled: null,
	depthOfFieldFar: null,
	depthOfFieldMid: null,
	depthOfFieldNear: null,
	depthOfFieldWidth: null,
	farClip: null,
	fieldOfView: null,
	heightFogColor: null,
	heightFogEnabled: null,
	heightFogEnd: null,
	heightFogIntensity: null,
	heightFogStart: null,
	navGridOffset: null,
	nearClip: null,
	playbackSpeed: null,
	selectionName: null,
	selectionOffset: null,
	skyboxOffset: null,
	skyboxRadius: null,
	skyboxRotation: null,
	sunDirection: null
};

//{
//	"length": 847.8130493164063,
//	"paused": true,
//	"seeking": false,
//	"speed": 1.0,
//	"time": 385.5750732421875
//}