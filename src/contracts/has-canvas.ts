export default interface HasCanvas {
    getWidth(): number;
    setWidth(width: number): this;
    getHeight(): number;
    setHeight(height: number): this;
    getCanvas(): HTMLCanvasElement;
    getContext(): CanvasRenderingContext2D;
    getCanvasTime(): number;
    getCnvasTimeInTicks(): number;
    getCanvasTimeInHoursMinutesAndSeconds(): string;
    canvasIsRunning(): boolean;
    canvasPlay(): this;
    canvasStop(): this;
    getBackgroundColor(): string;
    setBackgroundColor(background_color: string): this;
    getFPS(): number;
    setMaxFPS(fps: number): this;
    drawInformation(draw: boolean): this;
    setFullScreen(): this;
}
