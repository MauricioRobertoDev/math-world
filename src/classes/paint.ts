import { TAILWIND_COLORS } from "../constants/tailwindcss";
import MathWorldContract from "../contracts/math-world-base";
import { ArcDraw, CapsuleDraw, CircleDraw, LineDraw, PaintDrawMode, Point, PointDraw, RectDraw, TailwindColorName, TailwindColorValue, TextDraw } from "../types";
import Vector2D from "./vector-2d";

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
        startAngle = startAngleForHumans ? -angleInRadians(startAngleForHumans) : startAngle;
        endAngle = endAngleForHumans ? -angleInRadians(endAngleForHumans) : endAngle;

        if (this.draw_mode === "screen") ctx.resetTransform();

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.arc(point.x, point.y, radius, startAngle, endAngle, endAngleForHumans ? true : clockwise);
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

    // circle
    public circle({ point, radius, startAngle = 0, endAngle = Math.PI * 2, startAngleForHumans, endAngleForHumans, lineWidth = 1, strokeColor = "white", fillColor, clockwise = false, lineDash, rotate }: CircleDraw): this {
        const ctx = this.world_math.getContext();

        point = this.getPointByDrawMode(point);
        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        startAngle = startAngleForHumans ? -angleInRadians(startAngleForHumans) : startAngle;
        endAngle = endAngleForHumans ? -angleInRadians(endAngleForHumans) : endAngle;

        if (this.draw_mode === "screen") ctx.resetTransform();

        if (rotate) {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(rotate);
            ctx.translate(-point.x, -point.y);
        }

        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);
        ctx.arc(point.x, point.y, radius, startAngle, endAngle, endAngleForHumans ? true : clockwise);
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

    // capsule
    public capsule({ start, end, radius, lineWidth = 1, strokeColor = "white", fillColor, lineDash, rotate }: CapsuleDraw): this {
        start = this.getPointByDrawMode(start);
        end = this.getPointByDrawMode(end);
        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        const center = new Vector2D((Math.min(start.x, end.x) + Math.max(start.x, end.x)) / 2, (Math.min(start.y, end.y) + Math.max(start.y, end.y)) / 2);
        const angleRadians = Math.atan2(end.y - start.y, end.x - start.x);
        const ctx = this.world_math.getContext();

        if (this.draw_mode === "screen") ctx.resetTransform();

        if (rotate) {
            ctx.save();
            ctx.translate(center.x, center.y);
            ctx.rotate(rotate);
            ctx.translate(-center.x, -center.y);
        }
        ctx.beginPath();
        if (lineDash) ctx.setLineDash(lineDash);

        ctx.arc(start.x, start.y, radius, angleRadians + Math.PI / 2, angleRadians - Math.PI / 2);
        ctx.arc(end.x, end.y, radius, angleRadians - Math.PI / 2, angleRadians + Math.PI / 2);

        const cos = Math.cos(angleRadians + Math.PI / 2);
        const sin = Math.sin(angleRadians + Math.PI / 2);
        const A = { x: start.x + cos * radius, y: start.y + sin * radius };
        const B = { x: end.x + cos * radius, y: end.y + sin * radius };

        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);

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

        if (this.draw_mode === "screen") ctx.resetTransform();

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

        if (this.draw_mode === "screen") ctx.resetTransform();

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

        if (rotate) {
            ctx.restore();
        }

        return this;
    }

    // point
    public point({ point, radius, text, color = "white", fillColor = this.world_math.getBackgroundColor(), textSize = 16, borderWidth = 4, lineDash, rotate }: PointDraw): this {
        const ctx = this.world_math.getContext();

        radius = this.draw_mode === "cartesian" ? radius * this.world_math.getGridSize() : radius;
        point = this.getPointByDrawMode(point);

        if (this.draw_mode === "screen") ctx.resetTransform();

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

        if (this.draw_mode === "screen") ctx.resetTransform();

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
        if (this.draw_mode === "off" || this.draw_mode === "screen") return point;
        if (this.draw_mode === "cartesian") return this.world_math.toCartesian(point);
        if (this.draw_mode === "world") return this.world_math.toWorld(point);
        return point;
    }

    public getTailwindColor(name: TailwindColorName, value: TailwindColorValue = "500", opacity = 100): string {
        if (opacity < 0 || opacity > 100) throw new Error("Opacidade é um valor de porcentagem portando deve estar entre 0% e 100%");
        opacity = opacity / 100;

        const color = TAILWIND_COLORS[name][value];

        return `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
    }
}

function angleInRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}
