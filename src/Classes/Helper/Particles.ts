import StarParticle from "../Effects/StarParticle.ts";
import HitParticle from "../Effects/HitParticle.ts";
import SmokeParticle from "../Effects/SmokeParticle.ts";
import ScatterParticle from "../Effects/ScatterParticle.ts";
import TrailParticle from "../Effects/TrailParticle.ts";

export const Particles = {
    STAR: new StarParticle(),
    HIT: new HitParticle(),
    SMOKE: new SmokeParticle(),
    SCATTER: new ScatterParticle(),
    TRAIL: new TrailParticle(),
}