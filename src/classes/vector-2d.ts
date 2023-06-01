export type Point = { x: number; y: number };

export default class Vector2D {
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

    public setX(x: number): Vector2D {
        this._x = x;
        return this;
    }

    public setY(y: number): Vector2D {
        this._y = y;
        return this;
    }

    public magnitude(): number {
        return Math.hypot(this._x, this._y);
    }

    public direction(): number {
        return Math.atan2(this._y, this._x);
    }

    public angle(): number {
        return Math.atan2(this._y, this._x);
    }

    public normalize(): this {
        this.div(this.magnitude());
        return this;
    }

    public add(value: Vector2D | Point): this {
        this._x += value.x;
        this._y += value.y;
        return this;
    }

    public sub(value: Vector2D | Point): this {
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

    public scaled(scalar: number): Vector2D {
        return this.clone().scale(scalar);
    }

    public div(value: number): this {
        this._x /= value;
        this._y /= value;
        return this;
    }

    public dot(value: Vector2D | Point): number {
        return this._x * value.x + this._y * value.y;
    }

    public normalized(): Vector2D {
        return this.clone().normalize();
    }

    public clone(): Vector2D {
        return new Vector2D(this._x, this._y);
    }

    public round(): this {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);
        return this;
    }

    public rounded(): Vector2D {
        return this.clone().round();
    }

    public fix(fractionDigits?: number | undefined): this {
        this._x = parseFloat(this._x.toFixed(fractionDigits));
        this._y = parseFloat(this._y.toFixed(fractionDigits));
        return this;
    }

    public fixed(fractionDigits?: number | undefined): Vector2D {
        return this.clone().fix(fractionDigits);
    }

    public isEqual(value: Vector2D | Point): boolean {
        return this._x === value.x && this._y === value.y;
    }

    public set(x: number, y: number): this {
        this._x = x;
        this._y = y;
        return this;
    }

    public log() {
        console.log("X -> " + this._x + "\n Y -> " + this._y);
    }

    public toPoint(): Point {
        return { x: this._x, y: this._y };
    }

    public static fromPoint(point: Point): Vector2D {
        return new Vector2D(point.x, point.y);
    }
}
