export interface Render {
	banners: boolean;
	cameraAttached: boolean;
	cameraLookSpeed: number;
	cameraMode: string;
	cameraMoveSpeed: number;
	cameraPosition: {
		x: number;
		y: number;
		z: number;
	};
	cameraRotation: {
		x: number;
		y: number;
		z: number;
	};
	characters: boolean;
	depthFogColor: {
		a: number;
		b: number;
		g: number;
		r: number;
	};
	depthFogEnabled: boolean;
	depthFogEnd: number;
	depthFogIntensity: number;
	depthFogStart: number;
	depthOfFieldCircle: number;
	depthOfFieldDebug: boolean;
	depthOfFieldEnabled: boolean;
	depthOfFieldFar: number;
	depthOfFieldMid: number;
	depthOfFieldNear: number;
	depthOfFieldWidth: number;
	environment: boolean;
	farClip: number;
	fieldOfView: number;
	floatingText: boolean;
	fogOfWar: boolean;
	healthBarChampions: boolean;
	healthBarMinions: boolean;
	healthBarPets: boolean;
	healthBarStructures: boolean;
	healthBarWards: boolean;
	heightFogColor: {
		a: number;
		b: number;
		g: number;
		r: number;
	};
	heightFogEnabled: boolean;
	heightFogEnd: number;
	heightFogIntensity: number;
	heightFogStart: number;
	interfaceAll: boolean;
	interfaceAnnounce: boolean;
	interfaceChat: boolean;
	interfaceFrames: boolean;
	interfaceKillCallouts: boolean;
	interfaceMinimap: boolean;
	interfaceNeutralTimers: boolean;
	interfaceQuests: any; // null or other type based on actual usage
	interfaceReplay: boolean;
	interfaceScore: boolean;
	interfaceScoreboard: boolean;
	interfaceTarget: boolean;
	interfaceTimeline: boolean;
	navGridOffset: number;
	nearClip: number;
	outlineHover: boolean;
	outlineSelect: boolean;
	particles: boolean;
	selectionName: string;
	selectionOffset: {
		x: number;
		y: number;
		z: number;
	};
	skyboxOffset: number;
	skyboxPath: string;
	skyboxRadius: number;
	skyboxRotation: number;
	sunDirection: {
		x: number;
		y: number;
		z: number;
	};
}

export const initialRenderState: Render = {
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