import RectParticle from "./Engine/Particles/RectParticle.ts";
import  SpaceShooter from "./SpaceShooter.ts";
import RGBA from "./Engine/General/RGBA.ts";
import flatten from "./Engine/Utils/flatten.ts";
import type GridProjector from "./Engine/Utils/GridProjector.ts";

export default class StarParticle extends RectParticle<SpaceShooter>
{
    colors: string[] = [
        new RGBA(0xFF, 0xFF, 0xFF).getStr(),
        new RGBA(0xAF, 0xAF, 0xAF).getStr(),
        new RGBA(0x64, 0x64, 0x64).getStr(),
    ]

    protected relevantProjector: GridProjector | null = null;
    protected dist:  number | null = null

    constructor() {
        super(new RGBA(0xFF, 0xFF, 0xFF), 2.5, 2.5);
        this.yAcceleration = 0.00005
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer);
        this.dist = this.Dist
        this.relevantProjector = this.RelevantProjector
        this.colorStr = this.DistColor
        this.rotation = randomizer % 0.04 - 0.02
    }

    override get displayX(): number {
        const p = this.relevantProjector!
        const x = this.x!
        const y = this.y!

        return p.plotX(x, y)
    }

    override get displayY(): number {
        const p = this.relevantProjector!
        const x = this.x!
        const y = this.y!

        return p.plotY(x, y)
    }

    override get newScale(): number {
        const y = this.y!

        return flatten(this.RelevantProjector.fractionalY(y), 0.3)
    }

    override get newY(): number {
        const y = this.y!
        const elapsedTime = this.elapsedTime!

        return y + this.calcSpeed + elapsedTime * this.yAcceleration
    }

    override get doRemove(): boolean {
        const game = this.game!
        const x = this.displayX
        const y = this.displayY
        return game.outOfBoundsPoint(x, y, 50, 50)
    }

    protected get calcSpeed(): number {
        const randomizer = this.randomizer!
        const dist = this.dist!
        return randomizer * (this.IsInverted ? 0.15 : 0.3) + 0.255 - dist * 0.04
    }

    protected get Dist() {
        const randomizer = this.randomizer!
        return 3 - Math.round(randomizer * 2)
    }

    protected get DistColor(): string {
        const dist = this.dist!;
        return this.colors[dist - 1]
    }

    protected get RelevantProjector()
    {
        const game = this.game!;
        const dist = this.dist!;

        switch (dist) {
            case 1:
                return this.IsInverted ? game.upperCloseStarProjector : game.lowerCloseStarProjector
            case 2:
                return this.IsInverted ? game.upperMidStarProjector : game.lowerMidStarProjector
            case 3:
                return this.IsInverted ? game.upperFarStarProjector : game.lowerFarStarProjector
            default:
                return this.IsInverted ? game.upperCloseStarProjector : game.lowerCloseStarProjector
        }
    }

    protected get IsInverted(): boolean
    {
        const randomizer = this.randomizer!

        return (randomizer % 0.1 > 0.075)
    }
}