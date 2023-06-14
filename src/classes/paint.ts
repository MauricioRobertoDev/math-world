import MathWorldContract from "../contracts/math-world-base";
import { ArcDraw, CircleDraw, LineDraw, PaintDrawMode, Point, PointDraw, RectDraw, TextDraw } from "../types";

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

    // arc
    public arc({ point, radius, startAngle = 0, endAngle = Math.PI * 2, startAngleForHumans, endAngleForHumans, lineWidth = 1, strokeColor = "white", fillColor, clockwise = false, lineDash, rotate }: ArcDraw): this {
        const ctx = this.world_math.getContext();

        point = this.getPointByDrawMode(point);
        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        startAngle = startAngleForHumans ? angleInRadians(startAngleForHumans) : startAngle;
        endAngle = endAngleForHumans ? angleInRadians(endAngleForHumans) : endAngle;

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.arc(point.x, point.y, radius, startAngle, endAngle, clockwise);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        if (lineDash) ctx.setLineDash([]);
        ctx.closePath();
        if (rotate) ctx.restore();

        return this;
    }

    public circle({ point, radius, startAngle = 0, endAngle = Math.PI * 2, startAngleForHumans, endAngleForHumans, lineWidth = 1, strokeColor = "white", fillColor, clockwise = false, lineDash, rotate }: CircleDraw): this {
        const ctx = this.world_math.getContext();

        point = this.getPointByDrawMode(point);
        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        startAngle = startAngleForHumans ? angleInRadians(startAngleForHumans) : startAngle;
        endAngle = endAngleForHumans ? angleInRadians(endAngleForHumans) : endAngle;

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.arc(point.x, point.y, radius, startAngle, endAngle, clockwise);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        if (lineDash) ctx.setLineDash([]);
        ctx.closePath();
        if (rotate) ctx.restore();

        return this;
    }

    // line
    public line({ startPoint, endPoint, lineWidth = 1, strokeColor = "white", lineDash, rotate, rotateInCenter }: LineDraw): this {
        const ctx = this.world_math.getContext();

        startPoint = this.getPointByDrawMode(startPoint);
        endPoint = this.getPointByDrawMode(endPoint);

        if (rotateInCenter) {
            const midPoint = {
                x: startPoint.x * 0.5 + endPoint.x * 0.5,
                y: startPoint.y * 0.5 + endPoint.y * 0.5,
            };
            ctx.save();
            ctx.translate(midPoint.x, midPoint.y);
            ctx.rotate(rotateInCenter);
            ctx.translate(-midPoint.x, -midPoint.y);
        }

        if (rotate && !rotateInCenter) {
            ctx.save();
            ctx.rotate(rotate);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
        if (lineDash) ctx.setLineDash([]);
        ctx.closePath();
        if (rotate || rotateInCenter) ctx.restore();

        return this;
    }

    // text
    public text({ point, text, textAlign = "center", strokeWidth = 1, strokeColor, textColor = "white", textBaseline = "middle", textSize = 16, rotate }: TextDraw): this {
        const ctx = this.world_math.getContext();

        point = this.getPointByDrawMode(point);

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        ctx.fillStyle = textColor;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = "bold " + textSize + "px arial";
        if (strokeColor) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.strokeText(text, point.x, point.y);
        }
        ctx.fillText(text, point.x, point.y);
        ctx.closePath();
        if (rotate) ctx.restore();

        return this;
    }

    // point
    public point({ point, radius, text, color = "white", fillColor = this.world_math.getBackgroundColor(), textSize = 16, borderWidth = 4, lineDash, rotate }: PointDraw): this {
        const ctx = this.world_math.getContext();

        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        point = this.getPointByDrawMode(point);

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.strokeStyle = color;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = borderWidth;
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (text) {
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold " + textSize + "px arial";
            ctx.fillText(text, point.x, point.y);
        }
        if (lineDash) ctx.setLineDash([]);
        ctx.closePath();
        if (rotate) ctx.restore();

        return this;
    }

    // rect
    public rect({ point, width, height, lineWidth = 1, strokeColor = "white", lineDash, fillColor, rotate, rotateInCenter }: RectDraw): this {
        const ctx = this.world_math.getContext();

        point = this.getPointByDrawMode(point);
        width = this.draw_mode === "cartesian" ? width * this.world_math.getGridSize() : width;
        height = this.draw_mode === "cartesian" ? height * this.world_math.getGridSize() : height;

        if (rotateInCenter) {
            ctx.save();
            ctx.translate(point.x + width / 2, point.y + height / 2);
            ctx.rotate(rotateInCenter);
            ctx.translate(-(point.x + width / 2), -(point.y + height / 2));
        }

        if (rotate && !rotateInCenter) {
            ctx.save();
            ctx.rotate(rotate);
        }

        ctx.beginPath();
        ctx.rect(point.x, point.y, width, height);
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        if (lineDash) ctx.setLineDash([]);
        ctx.closePath();
        if (rotate || rotateInCenter) ctx.restore();

        return this;
    }

    public getPointByDrawMode(point: Point): Point {
        if (this.draw_mode === "off") return point;
        if (this.draw_mode === "cartesian") return this.world_math.toCartesian(point);
        if (this.draw_mode === "screen") return this.world_math.toScreen(point);
        if (this.draw_mode === "world") return this.world_math.toWorld(point);
        return point;
    }
}

function angleInRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}
