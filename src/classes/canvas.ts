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
        this.fpsInterval = this.max_fps == null ? 1 : 1000 / this.max_fps;
        this.update();
    }

    public play(): void {
        this.setRunning(true);
    }

    public pause(): void {
        this.setRunning(false);
    }

    private update(timestamp = 0): void {
        this.canvas_time = timestamp;

        if (this.isRunning()) requestAnimationFrame(this.update.bind(this));

        const currentFrameTime = performance.now();
        const elapsed = currentFrameTime - this.prevFrameTime;

        if (elapsed > this.fpsInterval) {
            this.prevFrameTime = currentFrameTime - (elapsed % this.fpsInterval);

            const ctx = this.getContext();

            ctx.resetTransform();

            ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

            ctx.translate(this.getCameraOffset().getX(), this.getCameraOffset().getY());

            ctx.setTransform(this.getCameraZoomInDecimal(), 0, 0, this.getCameraZoomInDecimal(), this.getCameraOffset().getX(), this.getCameraOffset().getY());

            this.drawCartesianPlan();

            this.time = Math.round((currentFrameTime / 1000) * 100) / 100;

            if (this.loop) this.loop(this);

            this.drawMouseDebug();

            this.drawInfo();

            if (currentFrameTime > 0) this.fps = Math.round(1000 / elapsed);

            this.prevFrameTime = currentFrameTime;
        }
    }
}
