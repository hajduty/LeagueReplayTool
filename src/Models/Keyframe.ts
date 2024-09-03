export interface vec3 {
    x: number
    y: number
    z: number
}

export interface Keyframe {
    time: number
    cameraPosition: vec3
    cameraRotation: vec3
    clicked?: boolean
    id?: string
    show?: boolean
}

export interface cameraPosition {
    blend: string
    time: number
    value: vec3
}

export interface cameraRotation {
    blend: string
    time: number
    value: vec3
}