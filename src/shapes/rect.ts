import IsShapeBuilder from "../contracts/is-shape-builder";
import { Point } from "../types";

export default class RectBuilder implements IsShapeBuilder {
    private rect_start_point: Point = { x: 0, y: 0 };
    private rect_end_point: Point = { x: 0, y: 0 };
    private rect_stroke_color = "white";
    private rect_stroke_weight = 1;
    private rect_fill_color = "transparent";

    public constructor(private ctx: CanvasRenderingContext2D) {}

    public stroke(color: string, width = 1): this {
        this.rect_stroke_color = color;
        this.rect_stroke_weight = width;
        return this;
    }

    public fill(color: string): this {
        this.rect_fill_color = color;
        return this;
    }

    public start(point: Point): this {
        this.rect_start_point = point;
        return this;
    }

    public end(point: Point): this {
        this.rect_end_point = point;
        return this;
    }

    public draw(): this {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.rect_stroke_weight;
        this.ctx.strokeStyle = this.rect_stroke_color;
        this.ctx.moveTo(this.rect_start_point.x, this.rect_start_point.y);
        this.ctx.lineTo(this.rect_end_point.x, this.rect_start_point.y);
        this.ctx.lineTo(this.rect_end_point.x, this.rect_end_point.y);
        this.ctx.lineTo(this.rect_start_point.x, this.rect_end_point.y);
        this.ctx.lineTo(this.rect_start_point.x, this.rect_start_point.y);
        this.ctx.fillStyle = this.rect_fill_color;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }

    public reset(): this {
        this.rect_start_point = { x: 0, y: 0 };
        this.rect_end_point = { x: 0, y: 0 };
        this.rect_stroke_color = "white";
        this.rect_stroke_weight = 1;
        this.rect_fill_color = "transparent";
        return this;
    }
}
