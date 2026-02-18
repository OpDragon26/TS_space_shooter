import  SpaceShooter from "./SpaceShooter.ts";
import RectParticle from "./Engine/Particles/RectParticle.ts";
import RGBA from "./Engine/General/RGBA.ts";

export default class HitParticle extends RectParticle<SpaceShooter>
{
    protected lifeTime: number | null = null;

    constructor() {
        super(new RGBA(0xFF, 0xFF, 0xFF, 0x99), 10, 10);
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer);
        this.ySpeed = this.YSpeed
        this.xSpeed = this.XSpeed
        this.lifeTime = this.LifeTime;
    }

    protected get LifeTime(): number {
        const randomizer = this.randomizer!
        return randomizer * 10 + 25
    }

    protected get YSpeed(): number {
        const p = this.game!.projector
        const y = this.y!
        const randomizer = this.randomizer!

        return randomizer * 2 + 4 * p.fractionalY(y)
    }

    protected get XSpeed(): number {
        const randomizer = this.randomizer!
        return randomizer % 0.1 * 20 - 1
    }

    protected get ScaleMultiplier(): number {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!

        return elapsedTime / lifeTime
    }

    override get doRemove(): boolean {
        const elapsedTime = this.elapsedTime!;
        const lifeTime = this.lifeTime!;

        return elapsedTime > lifeTime
    }

    override get displayX(): number {
        const p = this.game!.projector
        const x = this.x!
        const y = this.y!

        return p.plotX(x, y)
    }

    override get displayY(): number {
        const p = this.game!.projector
        const x = this.x!
        const y = this.y!

        return p.plotY(x, y)
    }

    override get newScale(): number {
        const p = this.game!.projector
        const y = this.y!

        return p.fractionalY(y)* (1 - this.ScaleMultiplier)
    }
}