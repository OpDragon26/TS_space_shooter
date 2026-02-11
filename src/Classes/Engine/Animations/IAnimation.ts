import type IFrame from "./IFrame.ts";

export default interface IAnimation<F extends IFrame> {
    frames: F[]
    length: number
    currentTick: number
    tick(): void
    reset(): void
    get current(): F
    get finished(): boolean
    get newFrame(): boolean
}