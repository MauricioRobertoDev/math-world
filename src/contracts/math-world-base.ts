import Vector2D from "../classes/vector-2d";
import { Point } from "../types";
import HasCamera from "./has-camera";
import HasCanvas from "./has-canvas";
import HasCartesianPlane from "./has-cartesian-plane";
import HasPointer from "./has-pointer";
import HasWorld from "./has-world";

export default interface MathWorldContract extends HasCamera, HasCanvas, HasPointer, HasWorld, HasCartesianPlane {
    start(): void;
    play(): void;
    pause(): void;
    stop(): void;
    reset(): void;
    loop(loop: (world: this) => void): void;
    default(): this;
    toWorld(point: Vector2D | Point): Vector2D | Point;
    toScreen(point: Vector2D | Point): Vector2D | Point;
    toCartesian(point: Vector2D | Point): Vector2D | Point;
}
