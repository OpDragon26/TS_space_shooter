import Game from "./Engine/Game.ts";
import Meteor from "./Meteor.ts";
import GridProjector from "./Utils/GridProjector.ts";
import type IEntity from "./Engine/IEntity.ts";
import {tags} from "./Tags.ts";
import Easing from "./Utils/easing.ts";
//import Easing from "./Utils/easing.ts";

export default class SpaceShooter extends Game
{
    public projector: GridProjector

    constructor() {
        super();

        this.projector = new GridProjector(this.canvas.width, this.canvas.height, this.canvas.width * 0.5, this.canvas.width * 0.025, this.canvas.height * 0.65, this.canvas.width * 0.25, this.canvas.height * 0.3);
    }

    override onStart()
    {
        this.entities.add(new Meteor(50, 50, 1, this))
        this.entities.add(new Meteor(this.canvas.width - 50, 50, 1, this))
    }

    override update() {
        super.update();

        this.entities.forEach((entity) => {entity.scale = Easing(this.projector.fractionalY(entity.y))})
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