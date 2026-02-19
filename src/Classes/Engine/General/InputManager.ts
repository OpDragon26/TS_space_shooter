export default class InputManager {
    private inputKeys: Record<string, boolean> = {};
    private mouseButtons: Record<number, boolean> = {};
    public mouseX: number = 0;
    public mouseY: number = 0;

    private readonly canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener("keydown", (e) => this.inputKeys[e.key] = true);
        window.addEventListener("keyup", (e) => this.inputKeys[e.key] = false);

        window.addEventListener("mouseup", (e) => this.mouseButtons[e.button] = true);
        window.addEventListener("mousedown", (e) => this.mouseButtons[e.button] = false);

        window.addEventListener("mousemove", (e) => this.handleMouseMove(e))
        this.canvas = canvas;
    }

    isKeyDown(key: string)
    {
        return this.inputKeys[key];
    }

    isMouseDown(button: number)
    {
        return this.mouseButtons[button];
    }

    private handleMouseMove(event: MouseEvent) {
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
    }
}