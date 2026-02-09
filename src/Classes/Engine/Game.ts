import type IEntity from "./Entities/IEntity.ts";
import InputManager from "./InputManager.ts";

export default class Game {
    public ctx: CanvasRenderingContext2D;
    public entities: Set<IEntity> = new Set<IEntity>();
    protected canvas: HTMLCanvasElement;
    public active: boolean = false;
    public inputManager = new InputManager();

    public get Width()
    {
        return this.canvas.width
    }

    public get Height()
    {
        return this.canvas.height;
    }

    constructor() {
        this.canvas = document.querySelector("#game-canvas")!;
        this.ctx = this.canvas.getContext("2d")!;        

        this.canvas.width = window.innerWidth * 0.8
        this.canvas.height = window.innerHeight * 0.8
    }

    public update() {
        this.entities.forEach((entity: IEntity) => entity.update())
        this.draw()
    }

    protected draw()
    {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.entities.forEach((entity: IEntity) => entity.draw())
    }

    private loop()
    {
        this.update();
        if (this.active)
            requestAnimationFrame(() => this.loop());
    }

    public start()
    {
        this.active = true;
        this.entities.forEach((entity: IEntity) => entity.start());
        this.onStart();
        this.loop();
    }

    public stop()
    {
        this.active = false;
        this.onStop();
    }

    protected onStart()
    {

    }

    protected onStop()
    {

    }

    get xOffsetGlobal(): number
    {
        return 0;
    }

    get yOffsetGlobal(): number
    {
        return 0;
    }

    public outOfBounds(entity: IEntity, xLeniency: number, yLeniency: number)
    {
        return entity.x < 0 - xLeniency
            || entity.x > this.canvas.width + xLeniency
            || entity.y < 0 - yLeniency
            || entity.y > this.canvas.height + yLeniency
    }

    public outOfBoundsDefault(entity: IEntity)
    {
        return this.outOfBounds(entity, entity.Width / 2, entity.Height / 2);
    }
}