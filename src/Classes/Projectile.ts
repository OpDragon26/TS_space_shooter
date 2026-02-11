import type SpaceShooter from "./SpaceShooter.ts";
import ProjectedRect from "./Utils/ProjectedRect.ts";
import {Tags} from "./Utils/Tags.ts";
import RectangleHitbox from "./Engine/Hitboxes/RectangleHitbox.ts";
import Meteor from "./Meteor.ts";

export default class Projectile extends ProjectedRect
{
    private subSet: ProjectedRect[]
    private readonly speed: number = 8;
    private readonly hitbox: RectangleHitbox

    constructor(x: number, y: number, game: SpaceShooter, tags: Set<number> = new Set()) {
        super(x, y, 5, 5, 1, 0, game, "#FFFFFF", tags);
        this.tags.add(Tags.PROJECTILE);

        const p1: ProjectedRect = this;
        const p2 = new ProjectedRect(x, y - 2.5, 5, 5, 1, 0,game, this.color, tags);
        const p3 = new ProjectedRect(x, y - 5, 5, 5, 1, 0,game, this.color, tags);
        const p4 = new ProjectedRect(x, y - 7.5, 5, 5, 1, 0,game, this.color, tags);
        const p5 = new ProjectedRect(x, y - 10, 5, 5, 1, 0,game, this.color, tags);

        this.hitbox = new RectangleHitbox(x, y, 5, 5)

        this.subSet = [p1, p2, p3, p4, p5];
        this.subSet.forEach(sub => game.entities.add(sub));
    }

    destroy()
    {
        this.subSet.forEach(sub => this.game.entities.delete(sub));
    }

    override update() {
        this.subSet.forEach(sub => sub.y -= this.speed)
        super.update();

        this.hitbox.update(this)
        this.game.entities.forEach(entity => {
            if (entity.tagged(Tags.METEOR))
            {
                let m: Meteor = entity as Meteor;
                if (m.hitbox.collides(this.hitbox))
                {
                    this.destroy()
                    m.destroy()
                }
            }
        })

        if (this.game.outOfBounds(this, 200, 200))
            this.destroy();
    }
}