import Vector2DContract from "../contracts/vector2d-base";
import { Point } from "../types";

export default class Vector2D implements Vector2DContract {
    private _x: number;
    private _y: number;

    public constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }

    public setX(x: number): this {
        this._x = x;
        return this;
    }

    public setY(y: number): this {
        this._y = y;
        return this;
    }

    public magnitude(): number {
        return Math.hypot(this._x, this._y);
    }

    public direction(): number {
        return Math.atan2(this._y, this._x);
    }

    public angleInRadians(): number {
        return Math.atan2(this._y, this._x);
    }

    public angleInDegrees(): number {
        const rad = Math.atan2(this._y, this._x);
        if (rad < 0) return 360.0 + rad * (180 / Math.PI);
        return rad * (180 / Math.PI);
    }

    public normalize(): this {
        this.div(this.magnitude());
        return this;
    }

    public add(value: Vector2DContract | Point): this {
        this._x += value.x;
        this._y += value.y;
        return this;
    }

    public sub(value: Vector2DContract | Point): this {
        this._x -= value.x;
        this._y -= value.y;
        return this;
    }

    public mult(value: number): this {
        this._x *= value;
        this._y *= value;
        return this;
    }

    public scale(scalar: number): this {
        return this.mult(scalar);
    }

    public scaled(scalar: number): Vector2DContract {
        return this.clone().scale(scalar);
    }

    public div(value: number): this {
        this._x /= value;
        this._y /= value;
        return this;
    }

    public dot(value: Vector2DContract | Point): number {
        return this._x * value.x + this._y * value.y;
    }

    public normalized(): Vector2DContract {
        return this.clone().normalize();
    }

    public clone(): Vector2DContract {
        return new Vector2D(this._x, this._y);
    }

    public round(): this {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        return this;
    }

    public rounded(): Vector2DContract {
        return this.clone().round();
    }

    public fix(fractionDigits?: number | undefined): this {
        this._x = parseFloat(this._x.toFixed(fractionDigits));
        this._y = parseFloat(this._y.toFixed(fractionDigits));
        return this;
    }

    public fixed(fractionDigits?: number | undefined): Vector2DContract {
        return this.clone().fix(fractionDigits);
    }

    public isEqual(value: Vector2DContract | Point): boolean {
        return this._x === value.x && this._y === value.y;
    }

    public set(x: number, y: number): this {
        this._x = x;
        this._y = y;
        return this;
    }

    public toString(fractionDigits?: number | undefined): string {
        return `(${this._x.toFixed(fractionDigits)},${this._y.toFixed(fractionDigits)})`;
    }

    public log() {
        console.log("X -> " + this._x + "\n Y -> " + this._y);
    }

    public toPoint(): Point {
        return { x: this._x, y: this._y };
    }

    public fromPoint(point: Point): Vector2DContract {
        return new Vector2D(point.x, point.y);
    }

    public static fromPoint(point: Point): Vector2DContract {
        return new Vector2D(point.x, point.y);
    }
}
