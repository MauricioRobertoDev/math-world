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
};

export type RectDraw = {
    startPoint: Vector2D | Point;
    endPoint: Vector2D | Point;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    fillColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
};

export type LineDraw = {
    startPoint: Vector2D | Point;
    endPoint: Vector2D | Point;
    lineWidth?: number;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    lineDash?: number[];
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
};
