export default interface IGlobalTransform {
    xOffset: number;
    yOffset: number;
    active: boolean;
    stop(): void;
    start(): void;
    update(): void;
}