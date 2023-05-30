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
        ctx.arc(point.getX(), point.getY(), this.draw_mode === "cartesian" ? radius * this.canvas.getGridSize() : radius, startAngle, endAngle, clockwise);
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
        if (this.draw_mode === "cartesian") return this.canvas.toCartesian(point);
        if (this.draw_mode === "screen") return this.canvas.toScreen(point);
        if (this.draw_mode === "world") return this.canvas.toWorld(point);
        return point;
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

    public drawLine(A: Vector2D, B: Vector2D, color = "white") {
        A = this.getPointByDrawMode(A);
        B = this.getPointByDrawMode(B);
        const ctx = this.canvas.getContext();
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.moveTo(A.getX(), A.getY());
        ctx.lineTo(B.getX(), B.getY());
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
