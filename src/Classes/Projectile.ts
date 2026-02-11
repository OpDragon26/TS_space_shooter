import type SpaceShooter from "./SpaceShooter.ts";
import ProjectedRect from "./Utils/ProjectedRect.ts";
import {Tags} from "./Utils/Tags.ts";

export default class Projectile extends ProjectedRect
{
    private subSet: ProjectedRect[]
    private readonly speed: number = 8;

    constructor(x: number, y: number, game: SpaceShooter, tags: Set<number> = new Set()) {
        super(x, y, 5, 5, 1, 0, game, "#FFFFFF", tags);
        this.tags.add(Tags.PROJECTILE);

        const p1: ProjectedRect = this;
        const p2 = new ProjectedRect(x, y - 2.5, 5, 5, 1, 0,game, this.color, tags);
        const p3 = new ProjectedRect(x, y - 5, 5, 5, 1, 0,game, this.color, tags);
        const p4 = new ProjectedRect(x, y - 7.5, 5, 5, 1, 0,game, this.color, tags);
        const p5 = new ProjectedRect(x, y - 10, 5, 5, 1, 0,game, this.color, tags);

        this.subSet = [p1, p2, p3, p4, p5];
        this.subSet.forEach(sub => game.entities.add(sub));
    }

    delete()
    {
        this.subSet.forEach(sub => this.game.entities.delete(sub));
    }

    override update() {
        this.subSet.forEach(sub => sub.y -= this.speed)
        super.update();

        if (this.game.outOfBounds(this, 200, 200))
            this.delete();
    }
}