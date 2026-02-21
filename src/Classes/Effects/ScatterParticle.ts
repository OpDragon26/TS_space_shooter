import RectParticle from "../Engine/Particles/RectParticle.ts";
import  SpaceShooter from "../SpaceShooter.ts";
import RGBA from "../Engine/General/RGBA.ts";
import clamp from "../Engine/Utils/Math/clamp.ts";

export default class ScatterParticle extends RectParticle<SpaceShooter>
{
    protected lifeTime: number | null = null;
    protected speed: number | null = null;
    protected size: number | null = null;
    protected sector: number | null = null;

    constructor() {
        super(new RGBA(0xED, 0xAA, 0x1A), 1, 10);
        this.yAcceleration = 0.15
        this.xAcceleration = 0.15
    }

    override load(game: SpaceShooter, x: number, y: number, scale: number, rotation: number, elapsedTime: number, randomizer: number, fixedValue: number) {
        super.load(game, x, y, scale, rotation, elapsedTime, randomizer, fixedValue);
        this.lifeTime = this.LifeTime
        this.speed = this.Speed
        this.ySpeed = this.YSpeed
        this.xSpeed = this.XSpeed

        this.size = Math.floor(fixedValue / 10)
        this.sector = fixedValue % 10

        this.yAcceleration = -Math.abs(this.yAcceleration) * Math.sign(this.ySpeed)
        this.xAcceleration = -Math.abs(this.xAcceleration) * Math.sign(this.xSpeed)
    }

    override get newRotation(): number
    {
        const randomizer = this.randomizer!
        const sector = this.sector!

        return (randomizer * 0.33 + sector * 0.33) * Math.PI * 2
    }

    protected get YSpeed(): number {
        const speed = this.speed!;
        const rotation = this.rotation!;
        const p = this.game!.projector
        const y = this.y!
        const elapsedTime = this.elapsedTime!;
        const size = this.size!;
        const dir = Math.sin(rotation - 0.5 * Math.PI)

        if (elapsedTime == 1)
            return size * 3 * dir

        const ns = speed * dir
        return size == 4 ? ns : ns + 4 * p.fractionalY(y);
    }

    protected get XSpeed(): number {
        const speed = this.speed!;
        const rotation = this.rotation!;
        const elapsedTime = this.elapsedTime!;
        const size = this.size!;
        const dir = Math.cos(rotation - 0.5 * Math.PI)

        if (elapsedTime == 1)
            return size * 3 * dir

        return speed * dir;
    }

    protected get Speed(): number {
        const randomizer = this.randomizer!
        const size = this.size!;
        const s = size + 2.5 + randomizer % 0.1 * 5
        return size == 4 ? s * 0.75 : s
    }

    protected get LifeTime(): number {
        const randomizer = this.randomizer!
        const size = this.size!;
        const lt = randomizer * 10 + 15

        return size == 4 ? lt * 1.5 : lt
    }

    protected get ScaleMultiplier(): number {
        const elapsedTime = this.elapsedTime!
        const lifeTime = this.lifeTime!
        const v = elapsedTime / lifeTime

        return 1 - clamp(v, 0, 1)
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
        const size = this.size!

        return p.fractionalY(y) * size
    }

    override get doRemove(): boolean {
        const elapsedTime = this.elapsedTime!;
        const lifeTime = this.lifeTime!;

        return elapsedTime > lifeTime
    }

    //@ts-ignore
    protected override Height(scale: number): number {
        return super.Height(scale) * this.ScaleMultiplier;
    }
}