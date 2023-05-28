import Vector2D from "./vector-2d";

export default class CanvasBase {
    private running = false;
    private canvas = document.getElementById("app") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    private cartesianCanvas = document.getElementById("cartesian") as HTMLCanvasElement;
    private cartesianContext = this.cartesianCanvas.getContext("2d") as CanvasRenderingContext2D;
    private width = (this.canvas.width = this.cartesianCanvas.width = window.innerWidth);
    private height = (this.canvas.height = this.cartesianCanvas.height = window.innerHeight);
    private background_color = "#292D3E";
    private grid_size = 32;
    private rows = 10;
    private cols = 10;
    private mouse = new Vector2D();

    // camera
    private cameraOffset = new Vector2D(this.width / 2, this.height / 2); // meio da tela
    private cameraZoom = 100;
    private max_zoom = 500;
    private min_zoom = 50;

    private isDragging = false;
    public dragStart = new Vector2D();
    private scale_factor = 10;

    /**
     * CANVAS HTML ELEMENT AND CONTEXT
     */
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getCartesianCanvas(): HTMLCanvasElement {
        return this.cartesianCanvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    public getCartesianContext(): CanvasRenderingContext2D {
        return this.cartesianContext;
    }

    /**
     * RUNNING
     */
    public isRunning(): boolean {
        return this.running;
    }

    public setRunning(running: boolean) {
        this.running = running;
    }

    /**
     * WIDTH
     */
    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): this {
        this.width = this.canvas.width = this.cartesianCanvas.width = width;
        return this;
    }

    /**
     * HEIGHT
     */
    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): this {
        this.height = this.canvas.height = this.cartesianCanvas.height = height;
        return this;
    }

    /**
     * BACKGROUND COLOR
     */
    public getBackgroundColor(): string {
        return this.background_color;
    }

    public setBackgroundColor(background_color: string): this {
        this.background_color = background_color;
        return this;
    }

    /**
     * GRID SIZE
     */
    public getGridSize(): number {
        return this.grid_size;
    }

    public setGridSize(grid_size: number): this {
        this.grid_size = grid_size;
        return this;
    }

    /**
     * MOUSE
     */
    public getMousePosition(): Vector2D {
        return this.mouse;
    }

    protected setMousePosition(event: MouseEvent): void {
        this.mouse.setX(event.x).setY(event.y);
    }

    // TODO: criar métodos que retornam a posição do mouse no plano cartesiano e escalonado.

    /**
     * LINES
     */
    public getNumRows(): number {
        return this.rows;
    }

    public setNumRows(rows: number): this {
        const roundedRows = Math.round(rows);
        this.rows = roundedRows % 2 == 0 ? roundedRows : roundedRows + 1;
        return this;
    }

    public getNumCols(): number {
        return this.cols;
    }

    public setNumCols(cols: number): this {
        const roundedCols = Math.round(cols);
        this.rows = roundedCols % 2 == 0 ? roundedCols : roundedCols + 1;
        return this;
    }

    /**
     * ############################################
     * #                 ZOOMABLE                 #
     * ############################################
     */

    /**
     * CAMERA
     */
    public getCameraOffset(): Vector2D {
        return this.cameraOffset;
    }

    public getCameraZoom(): number {
        return parseInt(this.cameraZoom.toString());
    }

    protected getCameraZoomInDecimal(): number {
        return this.cameraZoom / 100;
    }

    public getCameraMaxZoom(): number {
        return this.max_zoom;
    }

    public setCameraMaxZoom(zoom: number): this {
        if (zoom < this.min_zoom) throw new Error("O zoom máximo deve ser maior que o zoom minímo");
        this.max_zoom = zoom;
        return this;
    }

    public getCameraMinZoom(): number {
        return this.min_zoom;
    }

    public setCameraMinZoom(zoom: number): this {
        if (zoom > this.max_zoom) throw new Error("O zoom minímo deve ser menor que o zoom máximo");
        this.min_zoom = zoom;
        return this;
    }

    public getCameraScaleFactor(): number {
        return this.scale_factor;
    }

    public setCameraScaleFactor(factor: number): this {
        if (factor > 100 || factor < 0) throw new Error("O fator de escalonagem é uma porcentagem e deve ser um número entre 0 e 100");
        this.scale_factor = factor;
        return this;
    }

    public zoomAt(amount: number, point: Vector2D) {
        this.zoomAtWithDecimal(amount / 100, point);
    }

    public zoomAtWithDecimal(decimalAmount: number, point: Vector2D) {
        if (!this.isDragging) {
            const newZoom = this.getCameraZoomInDecimal() * decimalAmount;

            if (newZoom > this.max_zoom / 100 || newZoom < this.min_zoom / 100) return;

            this.cameraZoom = newZoom * 100;
            this.getCameraOffset().setX(point.getX() - (point.getX() - this.getCameraOffset().getX()) * decimalAmount);
            this.getCameraOffset().setY(point.getY() - (point.getY() - this.getCameraOffset().getY()) * decimalAmount);
        }
    }

    /**
     * ############################################
     * #                 EVENTS                   #
     * ############################################
     */

    private onPointerDown(e: MouseEvent) {
        this.isDragging = true;
        this.dragStart.setX(e.x);
        this.dragStart.setY(e.y);
    }

    private onPointerUp() {
        this.isDragging = false;
    }

    private onPointerMove(e: MouseEvent) {
        if (this.isDragging) {
            this.getCameraOffset().setX(this.getCameraOffset().getX() + e.clientX - this.dragStart.getX());
            this.getCameraOffset().setY(this.getCameraOffset().getY() + e.clientY - this.dragStart.getY());

            this.dragStart.setX(e.clientX);
            this.dragStart.setY(e.clientY);
        }
    }

    private adjustZoomAtMousePoint(e: WheelEvent) {
        e.preventDefault();
        const scale_factor = this.scale_factor / 100 + 1;
        if (-e.deltaY > 0) this.zoomAtWithDecimal(scale_factor, this.getMousePosition());
        else this.zoomAtWithDecimal(1 / scale_factor, this.getMousePosition());
    }

    protected setupEvents(): void {
        this.getCanvas().addEventListener("mousedown", (e) => this.onPointerDown(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.onPointerMove(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.setMousePosition(e));
        this.getCanvas().addEventListener("mouseup", () => this.onPointerUp());
        this.getCanvas().addEventListener("wheel", (e) => this.adjustZoomAtMousePoint(e));
    }
}
