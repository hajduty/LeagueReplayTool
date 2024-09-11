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