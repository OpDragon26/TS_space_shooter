export default class Stopwatch {
    private startTime: number = new Date().getTime();

    public setStart(): void
    {
        this.startTime = new Date().getTime();
    }

    public get elapsed(): number
    {
        const now = new Date().getTime();
        return now - this.startTime;
    }
}