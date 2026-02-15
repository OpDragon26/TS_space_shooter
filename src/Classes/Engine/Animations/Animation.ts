import type IAnimation from "./IAnimation.ts";
import type Frame from "./Frame.ts";

export default class Animation implements IAnimation<Frame> {
    frames: Frame[];
    length: number
    currentTick: number = 0

    private lastFrame: number = -1;
    newFrame: boolean = false;

    constructor(frames: Frame[], length: number) {
        this.frames = frames;
        this.length = length
    }

    get currentIndex()
    {
        return Math.round(this.currentTick / this.frameLength)
    }

    get current(): Frame
    {
        const i = this.currentIndex
        this.newFrame = i != this.lastFrame
        this.lastFrame = i

        return this.frames[i];
    }

    get frameLength()
    {
        return this.length / (this.frames.length - 1);
    }

    get finished()
    {
        return this.currentTick >= this.length
    }

    tick(): void
    {
        this.currentTick++;
    }

    reset(): void
    {
        this.currentTick = 0;
    }
}