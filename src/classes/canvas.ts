import CanvasBase from "./canvas-base";
import Vector2D from "./vector-2d";

export default class Canvas extends CanvasBase {
    public loop: ((canvas: Canvas) => void) | null = null;

    constructor() {
        super();
        this.setLimitsFullScreen();
    }

    public start(): void {
        this.setRunning(true);
        this.setupEvents();
        this.update();
    }

    public play(): void {
        this.setRunning(true);
    }

    public pause(): void {
        this.setRunning(false);
    }

    private update(timestamp = 0): void {
        if (this.isRunning()) requestAnimationFrame(this.update.bind(this));

        const ctx = this.getContext();

        ctx.resetTransform();

        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

        ctx.translate(this.getCameraOffset().getX(), this.getCameraOffset().getY());

        ctx.setTransform(this.getCameraZoomInDecimal(), 0, 0, this.getCameraZoomInDecimal(), this.getCameraOffset().getX(), this.getCameraOffset().getY());

        this.drawCartesianPlan();

        if (this.loop) this.loop(this);
    }

    // function scaleAt(amount: number, point: Vector2D) {
    //     // at pixel coords x, y scale by scaleBy
    //     zoomfactor *= amount;
    //     canvas.getOrigin().setX(point.getX() - (point.getX() - canvas.getOrigin().getX()) * amount);
    //     canvas.getOrigin().setY(point.getY() - (point.getY() - canvas.getOrigin().getY()) * amount);
    // }

    // function toWorld(x, y) {
    //     // convert to world coordinates
    //     x = (x - canvas.getOrigin().getX()) / zoomfactor;
    //     y = (y - canvas.getOrigin().getY()) / zoomfactor;
    //     return { x, y };
    // }

    // function toScreen(x, y) {
    //     x = x * zoomfactor + canvas.getOrigin().getX();
    //     y = y * zoomfactor + canvas.getOrigin().getY();
    //     return { x, y };
    // }
}
