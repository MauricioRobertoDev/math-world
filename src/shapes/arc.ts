import IsShapeBuilder from "../contracts/is-shape-builder";
import { Point } from "../types";

export default class ArcBuilder implements IsShapeBuilder {
    private arc_center_point = { x: 0, y: 0 };
    private arc_start_angle = 0;
    private arc_end_angle = Math.PI * 2;
    private arc_stroke_color = "white";
    private arc_stroke_width = 1;
    private arc_clockwise = false;
    private arc_fill_color: string | null = null;
    private arc_radius = 10;

    public constructor(private ctx: CanvasRenderingContext2D) {}

    public startAngle(angle: number): this {
        this.arc_start_angle = angle;
        return this;
    }

    public startAngleForHumans(): this {
        return this;
    }

    public endAngle(angle: number): this {
        this.arc_end_angle = angle;
        return this;
    }

    public endAngleForHumans(): this {
        return this;
    }

    public center(point: Point): this {
        this.arc_center_point = point;
        return this;
    }

    public radius(radius: number): this {
        this.arc_radius = radius;
        return this;
    }

    public fill(color: string): this {
        this.arc_fill_color = color;
        return this;
    }

    public stroke(color: string, width: number): this {
        this.arc_stroke_color = color;
        this.arc_stroke_width = width;
        return this;
    }

    public clockwise(clockwise: boolean): this {
        this.arc_clockwise = clockwise;
        return this;
    }

    public color(color: string): this {
        this.arc_stroke_color = color;
        return this;
    }

    public draw(): this {
        this.ctx.beginPath();
        this.ctx.arc(this.arc_center_point.x, this.arc_center_point.y, this.arc_radius, this.arc_start_angle, this.arc_end_angle, this.arc_clockwise);

        this.ctx.strokeStyle = this.arc_stroke_color;
        this.ctx.lineWidth = this.arc_stroke_width;
        this.ctx.stroke();

        if (this.arc_fill_color) {
            this.ctx.fillStyle = this.arc_fill_color;
            this.ctx.fill();
        }

        this.ctx.closePath();
        return this;
    }

    public reset() {
        this.arc_center_point = { x: 0, y: 0 };
        this.arc_start_angle = 0;
        this.arc_end_angle = Math.PI * 2;
        this.arc_stroke_color = "white";
        this.arc_stroke_width = 1;
        this.arc_clockwise = false;
        this.arc_fill_color = null;
        this.arc_radius = 10;
        return this;
    }
}
