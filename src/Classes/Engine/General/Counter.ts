export default class Counter {
    private readonly startTime: number
    private value: number;

    constructor(startTime: number, value: number = 0) {
        this.startTime = startTime
        this.value = value
    }

    reset() {
        this.value = this.startTime
    }

    tick() {
        this.value -= 1;
    }

    passed() {
        return this.value <= 0;
    }
}