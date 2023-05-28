import CanvasBase from "./canvas-base";

export default class Canvas extends CanvasBase {
    public loop: ((canvas: Canvas) => void) | null = null;

    constructor() {
        super();
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

        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.resetTransform();
        ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

        // ctx.transform(zoomfactor, 0, 0, zoomfactor, (-(zoomfactor - 1) * canvas.getWidth()) / 2, (-(zoomfactor - 1) * canvas.getHeight()) / 2);
        // ctx.translate(this.getOrigin().getX(), this.getOrigin().getY());
        ctx.translate(this.getCameraOffset().getX(), this.getCameraOffset().getY());

        ctx.setTransform(this.getCameraZoomInDecimal(), 0, 0, this.getCameraZoomInDecimal(), this.getCameraOffset().getX(), this.getCameraOffset().getY());

        if (this.loop) this.loop(this);
    }
}
