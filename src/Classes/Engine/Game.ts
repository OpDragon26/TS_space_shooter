import type IEntity from "./IEntity.ts";

export default class Game {
    public ctx: CanvasRenderingContext2D;
    public entities: IEntity[] = [];
    protected canvas: HTMLCanvasElement;
    public active: boolean = false;
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
}