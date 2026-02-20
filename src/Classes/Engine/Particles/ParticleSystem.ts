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
    fixedValue: number[] = []
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
            const f = this.fixedValue[i]

            const type = this.type[i];
            type.load(this.game, x, y, s, a, t, r, f);
            type.update()

            if (type.deleted)
                this.removeParticle(i)
            else
                this.saveParticle(i, type)
        }
    }

    spawn(type: IParticleTemplate<GT>, x: number, y: number, scale: number = 1, rotation: number = 0, fixedValue: number = 0)
    {
        this.xPos.push(x)
        this.yPos.push(y)
        this.scale.push(scale)
        this.rotation.push(rotation)
        this.creationTime.push(this.game.globalTime)
        this.randomizer.push(Math.random())
        this.fixedValue.push(fixedValue)
        this.type.push(type)
    }

    draw()
    {
        for (let i = 0; i < this.Count; i++) {
            this.game.ctx.save()
            this.type[i].load(this.game, this.xPos[i], this.yPos[i], this.scale[i], this.rotation[i], this.game.globalTime - this.creationTime[i], this.randomizer[i], this.fixedValue[i])
            this.type[i].draw()
            this.game.ctx.restore()
        }
    }

    saveParticle(i: number, type: IParticleTemplate<GT>)
    {
        this.xPos[i] = type.x!
        this.yPos[i] = type.y!
        this.scale[i] = type.scale!
        this.rotation[i] = type.rotation!
        this.fixedValue[i] = type.fixed!
    }

    removeParticle(i: number)
    {
        this.xPos.splice(i, 1)
        this.yPos.splice(i, 1)
        this.scale.splice(i, 1)
        this.rotation.splice(i, 1)
        this.creationTime.splice(i, 1)
        this.randomizer.splice(i, 1)
        this.fixedValue.splice(i, 1)
        this.type.splice(i, 1)
    }

    clear(): void
    {
        this.xPos = []
        this.yPos = []
        this.scale = []
        this.rotation = []
        this.creationTime = []
        this.randomizer = []
        this.fixedValue = []
        this.type = []
    }
}