import type IEntity from "../Entities/IEntity.ts";
import InputManager from "./InputManager.ts";
import ParticleSystem from "../Particles/ParticleSystem.ts";

export default class Game<GT extends Game<GT>> {
    public ctx: CanvasRenderingContext2D;
    public background: Set<IEntity<GT>> = new Set<IEntity<GT>>();
    public backgroundParticles: ParticleSystem<GT>;
    public entities: Set<IEntity<GT>> = new Set<IEntity<GT>>();
    public particles: ParticleSystem<GT>;
    public ui: Set<IEntity<GT>> = new Set<IEntity<GT>>();
    protected canvas: HTMLCanvasElement;
    public active: boolean = false;
    public inputManager: InputManager;
    public globalTime: number = 0;
    public gameState: number = 0;

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

        //@ts-ignore
        this.particles = new ParticleSystem<GT>(this)
        //@ts-ignore
        this.backgroundParticles = new ParticleSystem<GT>(this)

        this.inputManager = new InputManager(this.canvas)
    }

    public update() {
        this.background.forEach((entity: IEntity<GT>) => entity.update())
        this.backgroundParticles.update()
        this.entities.forEach((entity: IEntity<GT>) => entity.update())
        this.particles.update()
        this.ui.forEach((entity: IEntity<GT>) => entity.update())
        this.draw()
        this.globalTime++
    }

    protected draw()
    {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.background.forEach((entity: IEntity<GT>) => entity.draw())
        this.backgroundParticles.draw()
        this.entities.forEach((entity: IEntity<GT>) => entity.draw())
        this.particles.draw()
        this.ui.forEach((entity: IEntity<GT>) => entity.draw())
    }

    private loop()
    {
        this.update();
        if (this.active)
        {
            requestAnimationFrame(() => this.loop())
        }
    }

    public start()
    {
        this.active = true;
        this.background.forEach((entity: IEntity<GT>) => entity.start())
        this.entities.forEach((entity: IEntity<GT>) => entity.start());
        this.ui.forEach((entity: IEntity<GT>) => entity.draw())
        this.onStart();
        this.loop();
    }

    public setStage(state: number)
    {
        this.gameState = state
        this.globalTime = 0
        this.stateSet(state)
    }

    protected stateSet(state: number)
    {
        switch (state) {}
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

    public outOfBounds(entity: IEntity<GT>, xLeniency: number, yLeniency: number)
    {
        return entity.x < 0 - xLeniency
            || entity.x > this.canvas.width + xLeniency
            || entity.y < 0 - yLeniency
            || entity.y > this.canvas.height + yLeniency
    }

    public outOfBoundsDefault(entity: IEntity<GT>)
    {
        return this.outOfBounds(entity, entity.Width / 2, entity.Height / 2);
    }

    public outOfBoundsPoint(x: number, y: number, xLeniency: number = 0, yLeniency: number = 0)
    {
        return x < 0 - xLeniency
            || x > this.canvas.width + xLeniency
            || y < 0 - yLeniency
            || y > this.canvas.height + yLeniency
    }
}