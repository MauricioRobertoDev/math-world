import CanvasBase from "./canvas-base";
import Vector2D from "./vector-2d";

type DrawMode = "screen" | "world" | "cartesian";

export default class Paint {
    private draw_mode: DrawMode = "screen";

    constructor(private canvas: CanvasBase) {}

    public screen(): void {
        this.draw_mode = "screen";
    }

    public world(): void {
        this.draw_mode = "world";
    }

    public cartesian(): void {
        this.draw_mode = "cartesian";
    }

    public getPointInCartesian(point: Vector2D) {
        const pointCartesian = new Vector2D();
        pointCartesian.setX(point.getX() * this.canvas.getGridSize());
        pointCartesian.setY(point.getY() * -this.canvas.getGridSize());
        return pointCartesian;
    }

    public drawCircle(point: Vector2D, radius: number, startAngle = 0, endAngle = Math.PI * 2, color = "white", width = 1, clockwise = false) {
        point = this.getPointByDrawMode(point);
        const ctx = this.canvas.getContext();
        // ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.arc(point.getX(), point.getY(), radius, startAngle, endAngle, clockwise);
        ctx.stroke();
        // ctx.restore();
    }

    public drawPoint(point: Vector2D, text = "", color = "white") {
        point = this.getPointByDrawMode(point);
        const ctx = this.canvas.getContext();
        // ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = this.canvas.getBackgroundColor();
        ctx.arc(point.getX(), point.getY(), 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px arial";
        ctx.fillText(text, point.getX(), point.getY());
        ctx.closePath();
        // ctx.restore();
    }

    private getPointByDrawMode(point: Vector2D): Vector2D {
        const realPoint = new Vector2D();

        if (this.draw_mode === "cartesian") {
            realPoint.setX(point.getX() * this.canvas.getGridSize());
            realPoint.setY(point.getY() * -this.canvas.getGridSize());
        }

        if (this.draw_mode === "screen") {
            realPoint.setX((point.getX() - this.canvas.getCameraOffset().getX()) / this.canvas.getCameraZoomInDecimal());
            realPoint.setY((point.getY() - this.canvas.getCameraOffset().getY()) / this.canvas.getCameraZoomInDecimal());
        }

        if (this.draw_mode === "world") {
            realPoint.setX(point.getX());
            realPoint.setY(-point.getY());
        }

        return realPoint;
    }

    public drawText(text: string, point: Vector2D, color = "white", align: CanvasTextAlign = "left") {
        point = this.getPointByDrawMode(point);
        const ctx = this.canvas.getContext();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = this.canvas.getBackgroundColor();
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px arial";
        ctx.lineWidth = 7;
        ctx.fillText(text, point.getX(), point.getY());
        ctx.closePath();
    }

    public drawMouseDebug() {
        const ctx = this.canvas.getContext();
        const mouse = this.canvas.getMousePosition();
        const mouseInWorld = this.canvas.getMousePositionInWord();
        const mouseInCartesian = this.canvas.getMousePositionInCartesian();
        const point = this.getPointByDrawMode(mouse);

        const textMousePosition = "(" + mouse.getX() + ", " + mouse.getY() + ")";
        const textMouseInWorldPosition = "(" + mouseInWorld.getX().toFixed(2) + ", " + mouseInWorld.getY().toFixed(2) + ")";
        const textMouseInCartesianPosition = "(" + mouseInCartesian.getX().toFixed(2) + ", " + mouseInCartesian.getY().toFixed(2) + ")";

        ctx.beginPath();
        ctx.strokeStyle = this.canvas.getBackgroundColor();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px arial";
        ctx.lineWidth = 7;
        ctx.fillStyle = "#5eead4";
        ctx.fillText(textMousePosition, point.getX(), point.getY() - 48);
        ctx.fillStyle = "#a5b4fc";
        ctx.fillText(textMouseInCartesianPosition, point.getX(), point.getY() - 32);
        ctx.fillStyle = "#f0abfc";
        ctx.fillText(textMouseInWorldPosition, point.getX(), point.getY() - 16);
        ctx.closePath();
    }
}
