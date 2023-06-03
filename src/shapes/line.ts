import IsShapeBuilder from "../contracts/is-shape-builder";
import { Point } from "../types";

export default class LineBuilder implements IsShapeBuilder {
    private line_start_point: Point = { x: 0, y: 0 };
    private line_end_point: Point = { x: 0, y: 0 };
    private line_weight = 1;
    private line_color = "white";

    public constructor(private ctx: CanvasRenderingContext2D) {}

    public start(point: Point): this {
        this.line_start_point = point;
        return this;
    }

    public end(point: Point): this {
        this.line_end_point = point;
        return this;
    }

    public weight(weight: number): this {
        this.line_weight = weight;
        return this;
    }

    public color(color: string): this {
        this.line_color = color;
        return this;
    }

    public reset(): this {
        this.line_start_point = { x: 0, y: 0 };
        this.line_end_point = { x: 0, y: 0 };
        this.line_weight = 1;
        return this;
    }

    public draw(): this {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.line_weight;
        this.ctx.strokeStyle = this.line_color;
        this.ctx.moveTo(this.line_start_point.x, this.line_start_point.y);
        this.ctx.lineTo(this.line_end_point.x, this.line_end_point.y);
        this.ctx.stroke();
        this.ctx.closePath();
        return this;
    }
}
