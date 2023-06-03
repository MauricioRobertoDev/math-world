import MathWorldContract from "../contracts/math-world-base";
import ArcBuilder from "../shapes/arc";
import LineBuilder from "../shapes/line";
import PointBuilder from "../shapes/point";
import RectBuilder from "../shapes/rect";
import TextBuilder from "../shapes/text";
import { PaintDrawMode, Point } from "../types";

export default class Paint {
    private draw_mode: PaintDrawMode = "off";
    private arc_builder: ArcBuilder;
    private line_builder: LineBuilder;
    private text_builder: TextBuilder;
    private point_builder: PointBuilder;
    private rect_builder: RectBuilder;

    constructor(private world_math: MathWorldContract) {
        this.arc_builder = new ArcBuilder(this.world_math.getContext());
        this.line_builder = new LineBuilder(this.world_math.getContext());
        this.text_builder = new TextBuilder(this.world_math.getContext());
        this.point_builder = new PointBuilder(this.world_math.getContext());
        this.rect_builder = new RectBuilder(this.world_math.getContext());
    }

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

    // arc

    public arc(point: Point, radius: number): ArcBuilder {
        return this.arc_builder.center(this.getPointByDrawMode(point)).radius(this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius);
    }

    public circle(point: Point, radius: number): ArcBuilder {
        return this.arc(point, radius);
    }

    public ball(point: Point, radius: number, color: string): ArcBuilder {
        return this.arc(point, radius).fill(color).stroke("transparent", 0);
    }

    // line

    public line(startPoint: Point, endPoint: Point, color = "white"): LineBuilder {
        return this.line_builder.start(this.getPointByDrawMode(startPoint)).end(this.getPointByDrawMode(endPoint)).color(color);
    }

    // text

    public text(point: Point, text: string, color = "white"): TextBuilder {
        return this.text_builder.point(this.getPointByDrawMode(point)).text(text).color(color);
    }

    // point

    public point(point: Point, text = ""): PointBuilder {
        return this.point_builder
            .point(this.getPointByDrawMode(point))
            .text(text)
            .radius(this.world_math.getGridSize() / 2)
            .fill(this.world_math.getBackgroundColor());
    }

    // rect

    public rect(start: Point, end: Point, color = "white"): RectBuilder {
        return this.rect_builder.start(this.getPointByDrawMode(start)).end(this.getPointByDrawMode(end)).stroke(color);
    }

    private getPointByDrawMode(point: Point): Point {
        if (this.draw_mode === "off") return point;
        if (this.draw_mode === "cartesian") return this.world_math.toCartesian(point);
        if (this.draw_mode === "screen") return this.world_math.toScreen(point);
        if (this.draw_mode === "world") return this.world_math.toWorld(point);
        return point;
    }
}
