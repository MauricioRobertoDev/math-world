import MathWorldContract from "../contracts/math-world-base";
import { PaintDrawMode, Point } from "../types";

export default class Paint {
    private draw_mode: PaintDrawMode = "off";

    constructor(private world_math: MathWorldContract) {}

    public mode(draw_mode: PaintDrawMode) {
        this.draw_mode = draw_mode;
    }

    public off(): void {
        this.draw_mode = "off";
    }

    public screen(): void {
        this.draw_mode = "screen";
    }

    public world(): void {
        this.draw_mode = "world";
    }

    public cartesian(): void {
        this.draw_mode = "cartesian";
    }

    public drawCircle(point: Point, radius: number, startAngle = 0, endAngle = Math.PI * 2, color = "white", width = 1, clockwise = false) {
        point = this.getPointByDrawMode(point);
        const ctx = this.world_math.getContext();

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.arc(point.x, point.y, this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius, startAngle, endAngle, clockwise);
        ctx.stroke();
        ctx.closePath();
    }

    public drawBall(point: Point, radius: number, startAngle = 0, endAngle = Math.PI * 2, color = "white", clockwise = false) {
        point = this.getPointByDrawMode(point);
        const ctx = this.world_math.getContext();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(point.x, point.y, this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius, startAngle, endAngle, clockwise);
        ctx.fill();
        ctx.closePath();
    }

    public drawPoint(point: Point, text = "", radius = 10, color = "white", textSize = 14, fill = this.world_math.getBackgroundColor()) {
        point = this.getPointByDrawMode(point);
        const ctx = this.world_math.getContext();

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = fill;
        ctx.arc(point.x, point.y, this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold " + textSize + "px arial";
        ctx.fillText(text, point.x, point.y);
        ctx.closePath();
    }

    private getPointByDrawMode(point: Point): Point {
        if (this.draw_mode === "off") return point;
        if (this.draw_mode === "cartesian") return this.world_math.toCartesian(point);
        if (this.draw_mode === "screen") return this.world_math.toScreen(point);
        if (this.draw_mode === "world") return this.world_math.toWorld(point);
        return point;
    }

    public drawText(text: string, point: Point, color = "white", size = 14, align: CanvasTextAlign = "left") {
        point = this.getPointByDrawMode(point);
        const ctx = this.world_math.getContext();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = this.world_math.getBackgroundColor();
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        ctx.font = "bold " + size + "px arial";
        ctx.lineWidth = 7;
        ctx.fillText(text, point.x, point.y);
        ctx.closePath();
    }

    public drawLine(A: Point, B: Point, color = "white", width = 1) {
        A = this.getPointByDrawMode(A);
        B = this.getPointByDrawMode(B);
        const ctx = this.world_math.getContext();

        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
        ctx.closePath();
    }
}
