export default class GridProjector {
    innerWidth: number; // width of the inner canvas
    innerHeight: number;
    bottomWidth: number;
    topWidth: number;
    height: number;
    xOffset: number
    yOffset: number;

    constructor(innerWidth: number, innerHeight: number, bottomWidth: number, topWidth: number, height: number, xOffset: number = 0, yOffset: number = 0) {
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;

        this.bottomWidth = bottomWidth;
        this.topWidth = topWidth;
        this.height = height;

        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    public plot(point: [x: number, y: number]): [x: number, y: number] {
        let fy = point[1] / this.innerHeight;
        let y = fy * this.height;

        let bottomPortion = fy;
        let topPortion = 1 - fy
        let widthAtPoint = bottomPortion * this.bottomWidth + topPortion * this.topWidth

        let difference = (this.bottomWidth - this.topWidth) / 2;

        let fx = point[0] / this.innerWidth;
        let x = fx * widthAtPoint + difference * topPortion;

        return [x + this.xOffset, y + this.yOffset];
    }
}