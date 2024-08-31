export interface vec3 {
    x: number,
    y: number,
    z: number
}

export interface Keyframe {
    blend: string,
    time: number,
    value: vec3
    clicked?: boolean
    id?: string
}