import HitParticle from "./HitParticle.ts";

export default class ShootParticle extends HitParticle
{
    protected override get LifeTime(): number {
        const randomizer = this.randomizer!
        return randomizer * 5 + 5
    }

    protected override get YSpeed() {
        const randomizer = this.randomizer!
        return randomizer * -4
    }

    protected override get XSpeed()
    {
        const randomizer = this.randomizer!
        return randomizer % 0.1 * 10 - 0.5
    }
}