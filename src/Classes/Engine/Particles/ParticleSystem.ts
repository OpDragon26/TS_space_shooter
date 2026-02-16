import type Game from "../General/Game.ts";
import type IParticleTemplate from "./IParticleTemplate.ts";

export default class ParticleSystem<GT extends Game<GT>> {
    game: GT;

    get Count() {
        return this.type.length;
    }

    xPos: number[] = []
    yPos: number[] = []
    scale: number[] = []
    rotation: number[] = []
    creationTime: number[] = []
    randomizer: number[] = []
    type: IParticleTemplate<GT>[] = []

    constructor(game: GT) {
        this.game = game;
    }

    update()
    {
        for (let i = 0; i < this.Count; i++) {
            const x = this.xPos[i];
            const y = this.yPos[i];
            const s = this.scale[i]
            const a = this.rotation[i];
            const t = this.game.globalTime - this.creationTime[i]
            const r = this.randomizer[i]
            const type = this.type[i];

            if (type.doRemove(this.game, x, y, s, a, t, r))
                this.removeParticle(i)
            else
                this.updateParticle(this.game, i, x, y, s, a, t, r)
        }
    }

    spawn(type: IParticleTemplate<GT>, x: number, y: number, scale: number, rotation: number)
    {
        this.xPos.push(x)
        this.yPos.push(y)
        this.scale.push(scale)
        this.rotation.push(rotation)
        this.creationTime.push(this.game.globalTime)
        this.randomizer.push(Math.random())
        this.type.push(type)
    }

    draw()
    {
        for (let i = 0; i < this.Count; i++) {
            this.game.ctx.save()
            this.type[i].draw(this.game, this.xPos[i], this.yPos[i], this.scale[i], this.rotation[i], this.game.globalTime - this.creationTime[i], this.randomizer[i])
            this.game.ctx.restore()
        }
    }

    updateParticle(game: GT, i: number, x: number, y: number, s: number, a: number, t: number, r: number)
    {
        this.xPos[i] = this.type[i].updateX(game, x, y, s, a, t, r)
        this.yPos[i] = this.type[i].updateY(game, x, y, s, a, t, r)
        this.rotation[i] = this.type[i].updateRotation(game, x, y, s, a, t, r)
        this.scale[i] = this.type[i].updateScale(game, x, y, s, a, t, r)
    }

    removeParticle(i: number)
    {
        this.xPos.splice(i, 1)
        this.yPos.splice(i, 1)
        this.scale.splice(i, 1)
        this.rotation.splice(i, 1)
        this.creationTime.splice(i, 1)
        this.randomizer.splice(i, 1)
        this.type.splice(i, 1)
    }
}