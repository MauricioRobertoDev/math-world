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
        if (this.paused) {
            this.paused = false;
            this.world_last_timestamp = Date.now();
        }
    }

    public pause(): void {
        if (!this.paused) {
            this.paused = true;
            this.world_paused_time = this.world_time;
        }
    }

    public reset() {
        this.world_time = 0;
        this.world_paused_time = 0;
    }

    private update(timestamp = 0): void {
        this.canvas_time = timestamp;

        if (this.isRunning()) requestAnimationFrame(this.update.bind(this));

        const currentFrameTime = performance.now();
        const elapsed = currentFrameTime - this.prevFrameTime;

        if (!this.paused) {
            // let gameTime = this.world_time_start + (timestamp - this.world_last_timestamp) * this.world_time_scale;

            const deltaTime = (timestamp - this.world_last_timestamp) * this.world_time_scale;

            this.world_time += deltaTime;

            // console.log(Math.round((this.world_time / 1000) * 100) / 100);

            // Atualize o estado do seu mundo fictício com base no deltaTime
        }

        this.world_last_timestamp = timestamp;

        if (elapsed > this.fpsInterval) {
            this.prevFrameTime = currentFrameTime - (elapsed % this.fpsInterval);

            this.fps = Math.round(1000 / elapsed);

            this.prevFrameTime = currentFrameTime;

            const ctx = this.getContext();

            ctx.resetTransform();

            ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

            ctx.translate(this.getCameraOffset().getX(), this.getCameraOffset().getY());

            ctx.setTransform(this.getCameraZoomInDecimal(), 0, 0, this.getCameraZoomInDecimal(), this.getCameraOffset().getX(), this.getCameraOffset().getY());

            this.drawCartesianPlan();

            this.time = Math.round((currentFrameTime / 1000) * 100) / 100;

            // console.log(this.time);

            if (this.loop) this.loop(this);

            this.drawMouseDebug();

            this.drawInfo();
        }
    }
}
