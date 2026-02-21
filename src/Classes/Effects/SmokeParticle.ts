import HitParticle from "./HitParticle.ts";
import clamp from "../Engine/Utils/Math/clamp.ts";
import easing from "../Engine/Utils/Math/easeIn.ts";
import RGBA from "../Engine/General/RGBA.ts";
import type SpaceShooter from "../SpaceShooter.ts";
import flatten from "../Engine/Utils/Math/flatten.ts";

export default class SmokeParticle extends HitParticle
{
    colors = ["#80808090","#A0A0A090","#C0C0C090"]

    constructor() {
        super();
        this.Color = new RGBA(0x80, 0x80, 0x80, 0x90)
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number, fixedValue: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer, fixedValue);
        this.radius = this.RandRadius
    }

    protected override get ColorStr(): string
    {
        const randomizer = this.randomizer!
        const i = Math.round(randomizer % 0.33 * 7)
        return this.colors[i]
    }

    protected override get LifeTime()
    {
        const randomizer = this.randomizer!
        const size = this.fixed!;
        const lt = randomizer * 10 + 15

        return size == 4 ? lt * 10 : lt
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
        const fixed = this.fixed!;

        const s = Math.sign(randomizer - 0.5)
        const ns = (randomizer + 0.5) * s
        return fixed == 4 ? ns : ns + p.fractionalY(y)
    }

    protected override get XSpeed(): number {
        const randomizer = this.randomizer!
        const s = Math.sign(randomizer % 0.2 - 0.1)
        return (randomizer % 0.1 * 10 + 1.5) * s
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