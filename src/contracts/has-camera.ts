import Vector2D from "../classes/vector-2d";
import { Point } from "../types";

export default interface HasCamera {
    getCameraZoom(): number;
    getCameraMaxZoom(): number;
    setCameraMaxZoom(zoom: number): this;
    getCameraMinZoom(): number;
    setCameraMinZoom(zoom: number): this;
    getCameraZoomFactor(): number;
    setCameraZoomFactor(factor: number): this;
    setCameraZoom(amount: number): this;
    setCameraZoomAt(amount: number, point: Vector2D | Point): this;
    zoom(amount: number): this;
    zoomAt(amount: number, point: Vector2D | Point): this;
    setCameraOffsetTo(point: Vector2D | Point): this;
    moveCameraTo(point: Vector2D | Point): this;
    setCameraOffsetToCenter(): this;
    moveCameraOffsetToCenter(): this;
    isDraggable(is: boolean): this;
    isZoomable(is: boolean): this;
    getScreenOrigin(): Vector2D;
    moveCameraToCartesianPlane(point: Vector2D | Point): this;
    moveCameraToWorld(point: Vector2D | Point): this;
    getMiddleScreen(): Vector2D;
}
