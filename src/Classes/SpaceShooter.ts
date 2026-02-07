import Game from "./Engine/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Utils/GridProjector.ts";
import type IEntity from "./Engine/IEntity.ts";
import {tags} from "./Tags.ts";

export default class SpaceShooter extends Game
{
    public projector: GridProjector

    constructor() {
        super();

        this.projector = new GridProjector(this.canvas.width, this.canvas.height, this.canvas.width * 0.6, this.canvas.width * 0.025, this.canvas.height * 0.45, this.canvas.width * 0.2, this.canvas.height * 0.4);
    }

    override onStart()
    {
        this.entities.push(new Meteor(50, 50, 20, 20, this, "#ff004f"))
        this.entities.push(new Meteor(this.canvas.width - 50, 50, 20, 20, this, "#ff004f"))
    }

    override draw()
    {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.entities.forEach((entity: IEntity) => this.drawEntity(entity))
    }

    private drawEntity(entity: IEntity)
    {
        if (entity.tagged(tags.PROJECTED))
        {
            let entityPos: [x: number, y: number] = [entity.x, entity.y]
            let projectedPos: [x: number, y: number] = this.projector.plot(entityPos)
            //console.log(`from: ${entityPos} to ${projectedPos}`)
            entity.drawAt(projectedPos)
        }
        else
            entity.draw()
    }
}