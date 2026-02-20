import HitParticle from "./HitParticle.ts";
import clamp from "../Engine/Utils/clamp.ts";
import flatten from "../Engine/Utils/flatten.ts";
import easing from "../Engine/Utils/easing.ts";
import RGBA from "../Engine/General/RGBA.ts";
import type SpaceShooter from "../SpaceShooter.ts";

export default class SmokeParticle extends HitParticle
{
    constructor() {
        super();
        this.Color = new RGBA(0x80, 0x80, 0x80)
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer);
        this.radius = this.RandRadius
    }

    protected override get LifeTime()
    {
        const randomizer = this.randomizer!
        return randomizer * 15 + 15
    }

    protected override get ScaleMultiplier()
    {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const v = elapsedTime / lifeTime

        return flatten(clamp(v, 0, 1), 0.5)
    }

    override get newOpacity() {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const v = elapsedTime / lifeTime

        return easing(clamp(v, 0, 1))
    }

    protected override get YSpeed(): number {
        const p = this.game!.projector
        const y = this.y!
        const randomizer = this.randomizer!

        return randomizer + 3.5 * p.fractionalY(y)
    }

    protected override get XSpeed(): number {
        const randomizer = this.randomizer!
        return randomizer % 0.1 * 15 - 1
    }

    override get newScale(): number {
        const p = this.game!.projector
        const y = this.y!

        return p.fractionalY(y) * (1 - this.ScaleMultiplier)
    }

    protected get RandRadius(): number {
        const randomizer = this.randomizer!
        return randomizer % 0.17 * 52 + 10
    }
}