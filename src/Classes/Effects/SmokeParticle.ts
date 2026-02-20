import HitParticle from "./HitParticle.ts";
import clamp from "../Engine/Utils/Math/clamp.ts";
import easing from "../Engine/Utils/Math/easeIn.ts";
import RGBA from "../Engine/General/RGBA.ts";
import type SpaceShooter from "../SpaceShooter.ts";
import flatten from "../Engine/Utils/Math/flatten.ts";

export default class SmokeParticle extends HitParticle
{
    constructor() {
        super();
        this.Color = new RGBA(0x80, 0x80, 0x80, 0x90)
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number, fixedValue: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer, fixedValue);
        this.radius = this.RandRadius
    }

    protected override get LifeTime()
    {
        const randomizer = this.randomizer!
        return randomizer * 10 + 12
    }

    protected override get ScaleMultiplier()
    {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const v = elapsedTime / lifeTime

        return clamp(v, 0, 1)
    }

    override get newOpacity() {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const v = elapsedTime / lifeTime

        return 1 - easing(clamp(v, 0, 1))
    }

    protected override get YSpeed(): number {
        const p = this.game!.projector
        const y = this.y!
        const randomizer = this.randomizer!

        const s = Math.sign(randomizer - 0.5)
        return (randomizer * 1.5 + 1) * s + p.fractionalY(y)
    }

    protected override get XSpeed(): number {
        const randomizer = this.randomizer!
        const s = Math.sign(randomizer % 0.2 - 0.1)
        return (randomizer % 0.1 * 15 + 2) * s
    }

    override get newScale(): number {
        const p = this.game!.projector
        const y = this.y!

        return p.fractionalY(y) * flatten(1 - this.ScaleMultiplier, 0.5)
    }

    protected get RandRadius(): number {
        const randomizer = this.randomizer!
        const fixed = this.fixed!

        return (randomizer % 0.17 * 40 + 7) * fixed
    }
}