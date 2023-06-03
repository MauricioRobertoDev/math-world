import IsShapeBuilder from "../contracts/is-shape-builder";
import { Point } from "../types";

export default class PointBuilder implements IsShapeBuilder {
    private point_cord: Point = { x: 0, y: 0 };
    private point_text = "";
    private point_radius = 10;
    private point_color = "white";
    private point_fill_color = "transparent";
    private point_text_size = 16;

    public constructor(private ctx: CanvasRenderingContext2D) {}

    public point(point: Point): this {
        this.point_cord = point;
        return this;
    }

    public text(text: string): this {
        this.point_text = text;
        return this;
    }

    public radius(radius: number): this {
        this.point_radius = radius;
        return this;
    }

    public color(color: string): this {
        this.point_color = color;
        return this;
    }

    public fill(color: string): this {
        this.point_fill_color = color;
        return this;
    }

    public textSize(size: number): this {
        this.point_text_size = size;
        return this;
    }

    public draw(): this {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.point_color;
        this.ctx.fillStyle = this.point_fill_color;
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.point_cord.x, this.point_cord.y, this.point_radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = this.point_color;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "bold " + this.point_text_size + "px arial";
        this.ctx.fillText(this.point_text, this.point_cord.x, this.point_cord.y);
        this.ctx.closePath();

        return this;
    }

    public reset(): this {
        this.point_cord = { x: 0, y: 0 };
        this.point_text = "";
        this.point_radius = 10;
        this.point_color = "white";
        this.point_fill_color = "transparent";
        return this;
    }
}
