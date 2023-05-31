import Paint from "./paint";
import Vector2D from "./vector-2d";

type MouseDebugMode = "off" | "screen" | "point";

export default class CanvasBase {
    protected draw_info = true;
    protected running = false;
    protected canvas = document.getElementById("app") as HTMLCanvasElement;
    protected context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    protected width = (this.canvas.width = window.innerWidth);
    protected height = (this.canvas.height = window.innerHeight);
    protected background_color = "#111827";
    protected grid_size = 32;
    protected rows = 10;
    protected cols = 10;
    protected mouse = new Vector2D();
    protected negativeX = 0;
    protected positiveX = 0;
    protected negativeY = 0;
    protected positiveY = 0;
    protected origin = new Vector2D(0, 0);
    protected cameraOffset = new Vector2D(this.width / 2, this.height / 2);
    protected cameraZoom = 100;
    protected max_zoom = 500;
    protected min_zoom = 50;
    protected isDragging = false;
    protected dragStart = new Vector2D();
    protected scale_factor = 10;
    protected draw_grid = true;
    protected is_draggable = true;
    protected is_zoomable = true;
    protected edgeMaxX = this.getOrigin().getX() + this.positiveX * this.getGridSize();
    protected edgeMinX = this.getOrigin().getX() - this.negativeX * this.getGridSize();
    protected edgeMaxY = this.getOrigin().getY() + this.negativeY * this.getGridSize();
    protected edgeMinY = this.getOrigin().getY() - this.positiveY * this.getGridSize();
    protected paint = new Paint(this);
    protected mouse_debug_mode: MouseDebugMode = "off";
    protected prevFrameTime = performance.now();
    protected fpsInterval = 0;
    protected time = 0;
    protected fps = 0;
    protected max_fps: number | null = null;
    protected canvas_time = 0;
    protected draw_axis = true;

    protected paused = false;
    protected world_time_scale = 4;
    protected world_last_timestamp = 0;
    protected world_time_start = 0;
    protected world_time = 0;
    protected world_paused_time = 0; // Armazena o tempo fictício quando ocorre a pausa

    public getWorldTime() {
        return this.world_time;
    }

    public getWorldTimeInTicks() {
        return this.world_time / 1000;
    }

    public getPaint(): Paint {
        return this.paint;
    }

    public setDrawAxis(draw: boolean) {
        this.draw_axis = draw;
    }

    public setDrawInfo(draw: boolean) {
        this.draw_info = draw;
        return this;
    }

    public setMouseDebugMode(mode: MouseDebugMode): this {
        this.mouse_debug_mode = mode;
        return this;
    }

    public getMaxFPS(): number | null {
        return this.max_fps;
    }

    public setMaxFPS(fps: number): this {
        this.max_fps = fps;
        this.fpsInterval = this.max_fps == null ? 1 : 1000 / this.max_fps;
        return this;
    }

    public getTime(): number {
        return this.time;
    }

    public getCanvasTime(): number {
        return this.canvas_time;
    }

    public getFps(): number {
        return this.fps;
    }

    /**
     * CANVAS HTML ELEMENT AND CONTEXT
     */
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
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
        this.width = this.width = width;
        return this;
    }

    /**
     * HEIGHT
     */
    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): this {
        this.height = this.height = height;
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

    public getMousePositionInCartesian(): Vector2D {
        const mouse = new Vector2D();
        mouse.setX((this.mouse.getX() - this.getCameraOffset().getX()) / this.getCameraZoomInDecimal() / this.getGridSize());
        mouse.setY(-(this.mouse.getY() - this.getCameraOffset().getY()) / this.getCameraZoomInDecimal() / this.getGridSize());
        return mouse;
    }

    public getMousePositionInWord(): Vector2D {
        const mouse = new Vector2D();
        mouse.setX((this.mouse.getX() - this.getCameraOffset().getX()) / this.getCameraZoomInDecimal());
        mouse.setY(-(this.mouse.getY() - this.getCameraOffset().getY()) / this.getCameraZoomInDecimal());
        return mouse;
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

    public getOrigin(): Vector2D {
        return this.origin;
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

    public getCameraZoomInDecimal(): number {
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

    public setCameraZoom(amount: number, point: Vector2D | null = null): this {
        this.zoomAt(amount, point ? point : this.cameraOffset);
        return this;
    }

    public setCameraOffsetTo(x: number, y: number): this {
        this.cameraOffset.setX(x).setY(y);
        return this;
    }
    public setCameraOffsetToCenter(): this {
        this.cameraOffset.setX(this.width / 2).setY(this.height / 2);
        return this;
    }

    private zoomAt(amount: number, point: Vector2D) {
        this.zoomAtWithDecimal(amount / 100, point);
    }

    private zoomAtWithDecimal(decimalAmount: number, point: Vector2D) {
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
        if (this.is_draggable) {
            this.isDragging = true;
            this.dragStart.setX(e.x);
            this.dragStart.setY(e.y);
        }
    }

    private onPointerUp() {
        if (this.is_draggable) {
            this.isDragging = false;
        }
    }

    private onPointerMove(e: MouseEvent) {
        if (this.is_draggable) {
            if (this.isDragging) {
                this.getCameraOffset().setX(this.getCameraOffset().getX() + e.clientX - this.dragStart.getX());
                this.getCameraOffset().setY(this.getCameraOffset().getY() + e.clientY - this.dragStart.getY());

                this.dragStart.setX(e.clientX);
                this.dragStart.setY(e.clientY);
            }
        }
    }

    private adjustZoomAtMousePoint(e: WheelEvent) {
        if (this.is_zoomable) {
            e.preventDefault();
            const scale_factor = this.scale_factor / 100 + 1; // 10 / 100 + 1 = 1.1 = 110%
            if (-e.deltaY > 0) this.zoomAtWithDecimal(scale_factor, this.getMousePosition());
            else this.zoomAtWithDecimal(1 / scale_factor, this.getMousePosition());
        }
    }

    protected setupEvents(): void {
        this.getCanvas().addEventListener("mousedown", (e) => this.onPointerDown(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.onPointerMove(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.setMousePosition(e));
        this.getCanvas().addEventListener("mouseup", () => this.onPointerUp());
        this.getCanvas().addEventListener("wheel", (e) => this.adjustZoomAtMousePoint(e));
    }

    /**
     * GRID
     */
    public drawGrid(): boolean {
        return this.draw_grid;
    }

    public setDrawGrid(draw: boolean) {
        this.draw_grid = draw;
    }

    /**
     * LIMITS
     * ! problema conhecido: desta maneira não será possivel setar os ambos os valores como negativo por exemplo -100 e -50
     */
    public setNegativeX(x: number): this {
        this.negativeX = Math.round(Math.abs(x));
        this.edgeMinX = this.getOrigin().getX() - this.negativeX * this.getGridSize();
        return this;
    }

    public getNegativeX(): number {
        return this.negativeX;
    }

    public setPositiveX(x: number): this {
        this.positiveX = Math.round(Math.abs(x));
        this.edgeMaxX = this.getOrigin().getX() + this.positiveX * this.getGridSize();
        return this;
    }

    public getPositiveX(): number {
        return this.positiveX;
    }

    public setNegativeY(y: number): this {
        this.negativeY = Math.round(Math.abs(y));
        this.edgeMaxY = this.getOrigin().getY() + this.negativeY * this.getGridSize();
        return this;
    }

    public getNegativeY(): number {
        return this.negativeY;
    }

    public setPositiveY(y: number): this {
        this.positiveY = Math.round(Math.abs(y));
        this.edgeMinY = this.getOrigin().getY() - this.positiveY * this.getGridSize();
        return this;
    }

    public getPositiveY(): number {
        return this.positiveY;
    }

    public setLimitsFullScreen(): this {
        let maxXLines = Math.floor(this.width / this.grid_size);
        let maxYLines = Math.floor(this.height / this.grid_size);

        maxXLines = maxXLines % 2 === 0 ? maxXLines : maxXLines + 1;
        maxYLines = maxYLines % 2 === 0 ? maxYLines : maxYLines + 1;

        this.setNegativeX(maxXLines / 2).setPositiveX(maxXLines / 2);
        this.setNegativeY(maxYLines / 2).setPositiveY(maxYLines / 2);

        return this;
    }

    public setIsDraggable(is: boolean): this {
        this.is_draggable = is;
        return this;
    }

    public isDraggable(): boolean {
        return this.is_draggable;
    }

    public setIsZoomable(is: boolean): this {
        this.is_zoomable = is;
        return this;
    }

    public isZoomable(): boolean {
        return this.is_zoomable;
    }

    protected drawCartesianPlan() {
        // número de linhas horizontais e verticais que o espaço terá
        const numLinesHorizontal = this.negativeY + this.positiveY;
        const numLinesVertical = this.negativeX + this.positiveX;

        const ctx = this.getContext();

        if (this.drawGrid()) {
            for (let i = 0; i <= numLinesHorizontal; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

                if (i == numLinesHorizontal) {
                    ctx.moveTo(this.edgeMinX, this.edgeMinY + this.getGridSize() * i);
                    ctx.lineTo(this.edgeMaxX, this.edgeMinY + this.getGridSize() * i);
                } else {
                    ctx.moveTo(this.edgeMinX, this.edgeMinY + this.getGridSize() * i + 0.5);
                    ctx.lineTo(this.edgeMaxX, this.edgeMinY + this.getGridSize() * i + 0.5);
                }
                ctx.stroke();
            }

            for (let i = 0; i <= numLinesVertical; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

                if (i == numLinesVertical) {
                    ctx.moveTo(this.edgeMinX + this.getGridSize() * i, this.edgeMinY);
                    ctx.lineTo(this.edgeMinX + this.getGridSize() * i, this.edgeMaxY);
                } else {
                    ctx.moveTo(this.edgeMinX + this.getGridSize() * i + 0.5, this.edgeMinY);
                    ctx.lineTo(this.edgeMinX + this.getGridSize() * i + 0.5, this.edgeMaxY);
                }

                ctx.stroke();
            }
        }

        if (this.draw_axis) {
            // desenho das linhas que cruzam o x0, y0
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.moveTo(this.edgeMinX, this.getOrigin().getY());
            ctx.lineTo(this.edgeMaxX, this.getOrigin().getY());
            ctx.moveTo(this.getOrigin().getX(), this.edgeMinY);
            ctx.lineTo(this.getOrigin().getX(), this.edgeMaxY);
            ctx.stroke();

            let index = 0;

            // Marcas de tiques ao longo do eixo X
            for (let i = -this.negativeX; i <= this.positiveX; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

                // Desenhe uma marca de 6px de comprimento (-3 a 3)
                ctx.moveTo(this.edgeMinX + this.getGridSize() * index + 0.5, this.getOrigin().getY() - 3);
                ctx.lineTo(this.edgeMinX + this.getGridSize() * index + 0.5, this.getOrigin().getY() + 3);
                ctx.stroke();

                // Valor do texto naquele ponto
                if (i != 0) {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.textAlign = "start";
                    ctx.fillText(i.toString(), this.edgeMinX + this.getGridSize() * index - 2, this.getOrigin().getY() + 15);
                }

                index++;
            }

            index = 0;
            // Marcas de tiques ao longo do eixo y
            for (let i = this.positiveY; i >= -this.negativeY; i--) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

                // Desenhe uma marca de 6px de comprimento (-3 a 3)
                ctx.moveTo(this.getOrigin().getX() - 3, this.edgeMinY + this.getGridSize() * index + 0.5);
                ctx.lineTo(this.getOrigin().getX() + 3, this.edgeMinY + this.getGridSize() * index + 0.5);
                ctx.stroke();

                // Valor do texto naquele ponto
                if (i != 0) {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.textAlign = "start";
                    ctx.fillText(i.toString(), this.getOrigin().getX() + 15, this.edgeMinY + this.getGridSize() * index + 3);
                }

                index++;
            }
        }
        // bolinha marcando o ponto 0,0
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    protected drawMouseDebug() {
        if (this.mouse_debug_mode === "off") return;
        const ctx = this.getContext();
        const mouse = this.getMousePosition();
        const mouseInWorld = this.getMousePositionInWord();
        const mouseInCartesian = this.getMousePositionInCartesian();
        const point = this.mouse_debug_mode === "point" ? mouse : new Vector2D(this.width - 200, this.height);

        const textMousePosition = "Screen (" + mouse.getX() + ", " + mouse.getY() + ")";
        const textMouseInWorldPosition = "World (" + mouseInWorld.getX().toFixed(2) + ", " + mouseInWorld.getY().toFixed(2) + ")";
        const textMouseInCartesianPosition = "Cartesian (" + mouseInCartesian.getX().toFixed(2) + ", " + mouseInCartesian.getY().toFixed(2) + ")";

        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.strokeStyle = this.getBackgroundColor();
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px arial";
        ctx.lineWidth = 7;
        ctx.fillStyle = "#5eead4";
        ctx.fillText(textMousePosition, point.getX(), point.getY() - 60);
        ctx.fillStyle = "#a5b4fc";
        ctx.fillText(textMouseInCartesianPosition, point.getX(), point.getY() - 40);
        ctx.fillStyle = "#f0abfc";
        ctx.fillText(textMouseInWorldPosition, point.getX(), point.getY() - 20);
        ctx.closePath();
        ctx.restore();
    }

    protected drawInfo() {
        if (!this.draw_info) return;
        const ctx = this.getContext();

        const sec = Math.floor(this.world_time / 1000) % 60;
        const min = Math.floor(this.world_time / 60000) % 60;
        const hour = Math.floor(this.world_time / 3600000) % 24;

        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.strokeStyle = this.getBackgroundColor();
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px arial";

        ctx.lineWidth = 7;
        ctx.fillStyle = "white";
        ctx.fillText("FPS: " + this.fps, 24, 16);
        // ctx.fillText("Tempo: " + this.time.toFixed(1), 100, 16);
        ctx.fillText(`World: ${hour}:${min}:${sec}`.replace(/\b\d\b/g, "0$&"), 100, 16);
        ctx.fillText(`Canvas: ${Math.floor(this.canvas_time / 3600000) % 24}:${Math.floor(this.canvas_time / 60000) % 60}:${Math.floor(this.canvas_time / 1000) % 60}`.replace(/\b\d\b/g, "0$&"), 230, 16);
        ctx.fillStyle = this.isRunning() ? "green" : "red";
        ctx.arc(8, 14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    public toWorld(point: Vector2D): Vector2D {
        const realPoint = new Vector2D();
        realPoint.setX(point.getX());
        realPoint.setY(-point.getY());
        return realPoint;
    }

    public toScreen(point: Vector2D): Vector2D {
        const realPoint = new Vector2D();
        realPoint.setX((point.getX() - this.getCameraOffset().getX()) / this.getCameraZoomInDecimal());
        realPoint.setY((point.getY() - this.getCameraOffset().getY()) / this.getCameraZoomInDecimal());
        return realPoint;
    }

    public toCartesian(point: Vector2D): Vector2D {
        const realPoint = new Vector2D();
        realPoint.setX(point.getX() * this.getGridSize());
        realPoint.setY(point.getY() * -this.getGridSize());
        return realPoint;
    }
}
