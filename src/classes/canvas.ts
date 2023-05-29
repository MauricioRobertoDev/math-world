import CanvasBase from "./canvas-base";

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
}
