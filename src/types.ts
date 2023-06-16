import { Vector2D } from "./main";

export type DebugMouseMode = "off" | "point" | "screen";

export type Point = { x: number; y: number };

export type PaintDrawMode = "off" | "screen" | "world" | "cartesian";

export type ArcDraw = {
    point: Vector2D | Point;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    clockwise?: boolean;
    startAngleForHumans?: number;
    endAngleForHumans?: number;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
    rotate?: number;
};

export type CircleDraw = {
    point: Vector2D | Point;
    radius: number;
    startAngle?: number;
    endAngle?: number;
    clockwise?: boolean;
    startAngleForHumans?: number;
    endAngleForHumans?: number;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
    rotate?: number;
};

export type CapsuleDraw = {
    start: Vector2D | Point;
    end: Vector2D | Point;
    radius: number;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
    rotate?: number;
};

export type RectDraw = {
    point: Vector2D | Point;
    width: number;
    height: number;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
    rotate?: number;
    rotateInCenter?: number;
};

export type LineDraw = {
    startPoint: Vector2D | Point;
    endPoint: Vector2D | Point;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
    rotate?: number;
    rotateInCenter?: number;
};

export type TextDraw = {
    point: Vector2D | Point;
    text: string;
    textAlign?: CanvasTextAlign;
    strokeWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    textColor?: string | CanvasGradient | CanvasPattern;
    textBaseline?: CanvasTextBaseline;
    textSize?: number;
    rotate?: number;
};

export type PointDraw = {
    point: Vector2D | Point;
    radius: number;
    text?: string;
    borderWidth?: number;
    color?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    textSize?: number;
    lineDash?: number[];
    rotate?: number;
};
