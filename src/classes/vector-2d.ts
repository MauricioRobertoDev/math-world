export default class Vector2D {
    public constructor(private x = 0, private y = 0) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): Vector2D {
        this.x = x;
        return this;
    }

    public setY(y: number): Vector2D {
        this.y = y;
        return this;
    }

    public log() {
        console.log("X -> " + this.x + "\n Y -> " + this.y);
    }
}
