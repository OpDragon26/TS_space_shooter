import RectParticle from "../Engine/Particles/RectParticle.ts";
import  SpaceShooter from "../SpaceShooter.ts";
import RGBA from "../Engine/General/RGBA.ts";

export default class TrailParticle extends RectParticle<SpaceShooter>
{
    protected lifeTime: number | null = null;

    constructor() {
        super(new RGBA(0x5C, 0xB0, 0xFF), 5, 5);
        this.ySpeed = 2
        this.yAcceleration = 0.15
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number, fixedValue: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer, fixedValue);
        this.lifeTime = this.LifeTime
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

        return p.fractionalY(y)
    }

    override get newOpacity()
    {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const game = this.game!;
        if (game.player.hidden)
            return 0

        return 1 - elapsedTime / lifeTime
    }

    protected get LifeTime(): number {
        const randomizer = this.randomizer!

        return randomizer * 10 + 15
    }

    override get doRemove(): boolean {
        const elapsedTime = this.elapsedTime!;
        const lifeTime = this.lifeTime!;

        return elapsedTime > lifeTime
    }
}