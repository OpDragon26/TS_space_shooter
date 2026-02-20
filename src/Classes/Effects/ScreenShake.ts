import Random from "../Engine/Utils/Math/Random.ts";
import type IGlobalTransform from "../Engine/General/IGlobalTransform.ts";

export default class ScreenShake implements IGlobalTransform {
    public xOffset: number = 0
    public yOffset: number = 0
    active: boolean = false
    public severity: number = 0
    private readonly diminish: number = 0.25

    stop()
    {
        this.xOffset = 0
        this.yOffset = 0
        this.active = false;
    }

    start() {
        this.severity = 15
        this.active = true
    }

    update()
    {
        if (this.active)
            this.applyShake()

        this.severity = Math.max(0, this.severity - this.diminish)
        if (this.severity < 1)
            stop()
    }

    private applyShake()
    {
        this.xOffset = Random(0, this.severity)
        this.yOffset = Random(0, this.severity)
    }
}