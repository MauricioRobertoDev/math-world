import IsShapeBuilder from "../contracts/is-shape-builder";
import { Point } from "../types";

export default class TextBuilder implements IsShapeBuilder {
    private text_string = "";
    private text_point: Point = { x: 0, y: 0 };
    private text_color = "white";
    private text_stroke_color: string | null = null;
    private text_align: CanvasTextAlign = "center";
    private text_size = 16;
    private text_base_line: CanvasTextBaseline = "middle";
    private text_stroke_width = 5;

    public constructor(private ctx: CanvasRenderingContext2D) {}

    public text(text: string): this {
        this.text_string = text;
        return this;
    }

    public align(align: CanvasTextAlign): this {
        this.text_align = align;
        return this;
    }

    public point(point: Point): this {
        this.text_point = point;
        return this;
    }

    public color(color: string): this {
        this.text_color = color;
        return this;
    }

    public size(size: number): this {
        this.text_size = size;
        return this;
    }

    public baseline(baseline: CanvasTextBaseline): this {
        this.text_base_line = baseline;
        return this;
    }

    public stroke(color: string, width = 1): this {
        this.text_stroke_color = color;
        this.text_stroke_width = width;
        return this;
    }

    public draw(): this {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.text_color;
        this.ctx.textAlign = this.text_align;
        this.ctx.textBaseline = this.text_base_line;
        this.ctx.font = "bold " + this.text_size + "px arial";
        if (this.text_stroke_color) {
            this.ctx.strokeStyle = this.text_stroke_color;
            this.ctx.lineWidth = this.text_stroke_width;
            this.ctx.strokeText(this.text_string, this.text_point.x, this.text_point.y);
        }
        this.ctx.fillText(this.text_string, this.text_point.x, this.text_point.y);
        this.ctx.closePath();
        return this;
    }

    public reset(): this {
        this.text_string = "";
        this.text_point = { x: 0, y: 0 };
        this.text_color = "white";
        this.text_stroke_color = null;
        this.text_align = "center";
        this.text_size = 16;
        this.text_base_line = "middle";
        this.text_stroke_width = 5;
        return this;
    }
}
