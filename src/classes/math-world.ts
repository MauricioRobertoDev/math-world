import MathWorldContract from "../contracts/math-world-base";
import { DebugMouseMode, Key, Point } from "../types";
import Paint from "./paint";
import Vector2D from "./vector-2d";

export default class MathWorld implements MathWorldContract {
    private camera_is_zoomable = true;
    private camera_is_draggable = true;
    private camera_zoom_max = 500; // 500%
    private camera_zoom_min = 25; // 25%
    private camera_zoom_current = 100; // 100% - sem zoom
    private camera_zoom_factor = 10; //10%
    private camera_is_dragging = false;
    private camera_dragging_point = new Vector2D();
    private camera_offset = new Vector2D();
    private camera_screen_origin = new Vector2D();
    private camera_middle_screen = new Vector2D();

    private mouse_current_point = new Vector2D();
    private mouse_current_point_in_world = new Vector2D();
    private mouse_current_point_in_cartesian_plane = new Vector2D();
    private mouse_current_point_in_screen = new Vector2D();
    private mouse_debug_mode: DebugMouseMode = "screen";

    private world_time_is_paused = false;
    private world_time_scale = 4;
    private world_last_timestamp = 0;
    private world_time = 0;
    private world_time_tolerance = 0.015;
    private world_time_precision_mode = false;
    private world_time_precision_frame = 1000;
    private world_time_precision_frame_delay = 1000;

    private canvas_id: string;
    private canvas_element: HTMLCanvasElement;
    private canvas_element_original: Node;
    private canvas_context: CanvasRenderingContext2D;
    private canvas_time = 0;
    private canvas_is_running = true;
    private canvas_background = "#111827";
    private canvas_width;
    private canvas_height;
    private canvas_fps = 0;
    private canvas_max_fps: number | null = null;
    private canvas_fps_interval = 1;
    private canvas_last_frame_time = 0;
    private canvas_draw_info = true;
    private canvas_paint: Paint;
    private canvas_fullscreen = false;

    private cartesian_plane_grid_size = 32;
    private cartesian_plane_negativeX = 0;
    private cartesian_plane_positiveX = 0;
    private cartesian_plane_negativeY = 0;
    private cartesian_plane_positiveY = 0;
    private cartesian_plane_edgeMaxX = 0 + this.cartesian_plane_positiveX * this.getGridSize();
    private cartesian_plane_edgeMinX = 0 - this.cartesian_plane_negativeX * this.getGridSize();
    private cartesian_plane_edgeMaxY = 0 + this.cartesian_plane_negativeY * this.getGridSize();
    private cartesian_plane_edgeMinY = 0 - this.cartesian_plane_positiveY * this.getGridSize();
    private cartesian_plane_draw_grid = true;
    private cartesian_plane_draw_axis = true;

    private math_world_loop: ((world: this) => void) | null = null;

    private on_start: ((world: this) => void)[] = [];
    private on_play: ((world: this) => void)[] = [];
    private on_pause: ((world: this) => void)[] = [];
    private on_reset: ((world: this) => void)[] = [];
    private on_stop: ((world: this) => void)[] = [];

    private on_key_down: { key: string; callbacks: ((e: KeyboardEvent) => void)[] }[] = [];
    private on_key_up: { key: string; callbacks: ((e: KeyboardEvent) => void)[] }[] = [];

    private on_left_click: ((e: MouseEvent) => void)[] = [];
    private on_right_click: ((e: MouseEvent) => void)[] = [];
    private on_mouse_move: ((e: MouseEvent) => void)[] = [];
    private on_mouse_down: ((e: MouseEvent) => void)[] = [];
    private on_mouse_up: ((e: MouseEvent) => void)[] = [];
    private on_mouse_wheel: ((e: WheelEvent) => void)[] = [];

    private pressed_keys: Key[] = [];

    private master_key = "Alt";

    public constructor(canvasId: string) {
        const canvasElement = document.querySelector<HTMLCanvasElement>("#" + canvasId);
        if (!canvasElement) throw new Error("Não existe nenhum canvas com o id: " + canvasId);
        this.canvas_id = canvasId;
        this.canvas_element = canvasElement;
        this.canvas_element_original = canvasElement.cloneNode(true);
        this.canvas_context = this.canvas_element.getContext("2d") as CanvasRenderingContext2D;
        this.canvas_width = this.canvas_element.width;
        this.canvas_height = this.canvas_element.height;
        this.camera_middle_screen.set(this.canvas_width / 2, this.canvas_height / 2);
        this.canvas_element.style.backgroundColor = this.canvas_background;
        this.moveCameraOffsetToCenter();
        this.setCartesianPlaneToFullScreen();
        this.canvas_paint = new Paint(this);
        this.calculateScreenOrigin();
        this.setupEvents();
    }

    // Math World

    public start(): void {
        this.canvasPlay();
        this.update();
        this.on_start.map((callback) => callback(this));
    }

    public play(): void {
        this.playWorldTime();
        this.on_play.map((callback) => callback(this));
    }

    public pause(): void {
        this.pauseWorldTime();
        this.on_pause.map((callback) => callback(this));
    }

    public stop(): void {
        this.pauseWorldTime();
        this.canvasStop();
        this.on_stop.map((callback) => callback(this));
    }

    public reset(): void {
        this.resetWorldTime();
        this.on_reset.map((callback) => callback(this));
    }

    public loop(loop: (world: this) => void): void {
        this.math_world_loop = loop;
    }

    public default(): this {
        this.setFullScreen();
        this.moveCameraOffsetToCenter();
        this.setDebugMouseMode("screen");
        this.drawAxis(true);
        this.drawGrid(true);
        this.drawInformation(true);
        this.setGridSize(32);
        this.setCartesianPlaneToFullScreen();
        this.setCameraMinZoom(25);
        this.setCameraMaxZoom(500);
        this.setWorldTimeScale(4);
        return this;
    }

    public setMasterKey(key: string): this {
        this.master_key = key;
        return this;
    }

    public isPaused(): boolean {
        return this.world_time_is_paused;
    }

    public toScreen(point: Vector2D | Point): Vector2D | Point {
        const realPoint = { x: (point.x - this.getCameraOffset().getX()) / this.getCameraZoomInDecimal(), y: (point.y - this.getCameraOffset().getY()) / this.getCameraZoomInDecimal() };
        if (point instanceof Vector2D) return Vector2D.fromPoint(realPoint);
        return realPoint;
    }

    public toWorld(point: Vector2D | Point): Vector2D | Point {
        const realPoint = { x: point.x, y: -point.y };
        if (point instanceof Vector2D) return Vector2D.fromPoint(realPoint);
        return realPoint;
    }

    public toCartesian(point: Vector2D | Point): Vector2D | Point {
        const realPoint = { x: point.x * this.getGridSize(), y: point.y * -this.getGridSize() };
        if (point instanceof Vector2D) return Vector2D.fromPoint(realPoint);
        return realPoint;
    }

    // * CAMERA

    public isDraggable(is = true): this {
        this.camera_is_draggable = is;
        return this;
    }

    public isZoomable(is = true): this {
        this.camera_is_zoomable = is;
        return this;
    }

    public getScreenOrigin(): Vector2D {
        return this.camera_screen_origin;
    }

    public getCameraOffset(): Vector2D {
        return this.camera_offset;
    }

    public setCameraOffsetToCenter(): this {
        this.setCameraOffsetTo({ x: this.canvas_width / 2, y: this.canvas_height / 2 });
        return this;
    }

    public moveCameraOffsetToCenter(): this {
        this.setCameraOffsetTo({ x: this.canvas_width / 2, y: this.canvas_height / 2 });
        return this;
    }

    public getCameraZoom(): number {
        return this.camera_zoom_current;
    }

    public getCameraMaxZoom(): number {
        return this.camera_zoom_max;
    }

    public setCameraMaxZoom(zoom: number): this {
        if (zoom < this.camera_zoom_min) throw new Error("O zoom máximo deve ser maior que o zoom minímo");
        this.camera_zoom_max = zoom;
        return this;
    }

    public getCameraMinZoom(): number {
        return this.camera_zoom_min;
    }

    public setCameraMinZoom(zoom: number): this {
        if (zoom > this.camera_zoom_max) throw new Error("O zoom minímo deve ser menor que o zoom máximo");
        this.camera_zoom_min = zoom;
        return this;
    }

    public getCameraZoomFactor(): number {
        return this.camera_zoom_factor;
    }

    public getCameraZoomFactorInDecimal(): number {
        return this.camera_zoom_current / 100;
    }

    public setCameraZoomFactor(factor: number): this {
        if (factor > 100 || factor < 0) throw new Error("O fator de zoom é uma porcentagem e deve ser um número entre 0 e 100");
        this.camera_zoom_factor = factor;
        return this;
    }

    public setCameraZoomAt(amount: number, point: Vector2D | Point): this {
        return this.zoomAt(amount, point);
    }

    public zoom(amount: number): this {
        this.zoomAt(amount, this.camera_offset);
        return this;
    }

    public zoomAt(amount: number, point: Vector2D | Point): this {
        this.zoomAtWithDecimal(amount / 100, point);
        return this;
    }

    public setCameraOffsetTo(point: Vector2D | Point): this {
        this.camera_offset.setX(point.x).setY(point.y);
        return this;
    }

    public moveCameraToCartesianPlane(point: Vector2D | Point): this {
        this.camera_offset.setX(-point.x * this.getGridSize() * this.getCameraZoomInDecimal() + this.getMiddleScreen().getX());
        this.camera_offset.setY(point.y * this.getGridSize() * this.getCameraZoomInDecimal() + this.getMiddleScreen().getY());

        return this;
    }

    public moveCameraToWorld(point: Vector2D | Point): this {
        this.camera_offset.setX(-point.x * this.getCameraZoomInDecimal() + this.getMiddleScreen().getX());
        this.camera_offset.setY(point.y * this.getCameraZoomInDecimal() + this.getMiddleScreen().getY());

        return this;
    }

    public getMiddleScreen(): Vector2D {
        return this.camera_middle_screen;
    }

    public moveCameraTo(point: Vector2D | Point): this {
        this.setCameraOffsetTo(point);
        return this;
    }

    public getCameraZoomInDecimal(): number {
        return this.camera_zoom_current / 100;
    }

    public setCameraZoom(amount: number): this {
        if (!this.camera_is_dragging) {
            if (amount < this.camera_zoom_min || amount > this.camera_zoom_max) {
                throw new Error(`O zoom deve estar entre o mínimo: ${this.camera_zoom_min}% e o máximo: ${this.camera_zoom_max}%.`);
            }

            this.camera_zoom_current = amount;
            this.getCameraOffset().setX(this.getCameraOffset().getX());
            this.getCameraOffset().setY(this.getCameraOffset().getY());
        }

        return this;
    }

    private zoomAtWithDecimal(decimalAmount: number, point: Vector2D | Point) {
        if (!this.camera_is_dragging) {
            let newZoom = this.camera_zoom_current * decimalAmount;

            if (newZoom > this.camera_zoom_max) {
                decimalAmount = this.camera_zoom_max / this.camera_zoom_current;
                newZoom = this.camera_zoom_current * decimalAmount;
            }

            if (newZoom < this.camera_zoom_min) {
                decimalAmount = this.camera_zoom_min / this.camera_zoom_current;
                newZoom = this.camera_zoom_current * decimalAmount;
            }

            this.camera_zoom_current = newZoom;
            this.getCameraOffset().setX(point.x - (point.x - this.getCameraOffset().getX()) * decimalAmount);
            this.getCameraOffset().setY(point.y - (point.y - this.getCameraOffset().getY()) * decimalAmount);
        }
    }

    // * HAS POINTER
    public getMousePosition(): Vector2D {
        return this.mouse_current_point;
    }

    public getMousePositionInCartesian(): Vector2D {
        return this.mouse_current_point_in_cartesian_plane;
    }

    public getMousePositionInScreen(): Vector2D {
        return this.mouse_current_point_in_screen;
    }

    public getMousePositionInWorld(): Vector2D {
        return this.mouse_current_point_in_world;
    }

    public setDebugMouseMode(mode: DebugMouseMode): this {
        this.mouse_debug_mode = mode;
        return this;
    }

    public getMoudeDebugMode(): DebugMouseMode {
        return this.mouse_debug_mode;
    }

    // * WORLD

    public getWorldTime(): number {
        return this.getWorldTimeInTicks();
    }

    public getWorldTimeInTicks(): number {
        return this.world_time / 1000;
    }

    public getWorldTimeInHoursMinutesAndSeconds(): string {
        const sec = Math.floor(this.world_time / 1000) % 60;
        const min = Math.floor(this.world_time / 60000) % 60;
        const hour = Math.floor(this.world_time / 3600000) % 24;
        return `${hour}:${min}:${sec}`.replace(/\b\d\b/g, "0$&");
    }

    public getPaint(): Paint {
        return this.canvas_paint;
    }

    public worldTimeIsPaused(): boolean {
        return this.world_time_is_paused;
    }

    public setWorldTimeScale(scale: number): this {
        this.world_time_scale = scale;
        return this;
    }

    public pauseWorldTime(): this {
        this.world_time_is_paused = true;
        return this;
    }

    public resetWorldTime(): this {
        this.world_time = 0;
        return this;
    }

    public playWorldTime(): this {
        this.world_time_is_paused = false;
        this.world_last_timestamp = performance.now();
        return this;
    }

    public worldTimeInMiniTimesIs(time: number): boolean {
        return this.getWorldInMiniTimes() >= time && this.getWorldInMiniTimes() < time + this.world_time_tolerance;
    }

    public worldTimeInTicksIs(time: number): boolean {
        return this.getWorldTimeInTicks() >= time && this.getWorldTimeInTicks() < time + this.world_time_tolerance;
    }

    public worldTimeIs(time: number, tolerance = false): boolean {
        if (tolerance) return this.getWorldTime() >= time && this.getWorldTime() < time + this.world_time_tolerance;
        return this.getWorldTime() === time;
    }

    public setWorldTimeTolerance(time: number): this {
        this.world_time_tolerance = time;
        return this;
    }

    public enableWorldPrecisionTimeMode(): this {
        this.world_time_precision_mode = true;
        this.world_time = 0;
        return this;
    }

    public disableWorldPrecisionTimeMode(): this {
        this.world_time_precision_mode = false;
        this.world_time = 0;
        return this;
    }

    public setWorldPrecisionTimeFrameInFraction(fraction: number): this {
        if (this.world_time_precision_mode) {
            if (100 % fraction > 0) throw new Error("A fração de tempo deve ser um número que seja divisor perfeito de 100");
            this.world_time_precision_frame = 1000 * fraction;
        }

        return this;
    }

    public getWorldPrecisionTimeFrameInFraction(): number {
        return 1000 / this.world_time_precision_frame;
    }

    public getWorldPrecisionTimeFrameInMiniTime(): number {
        return this.world_time_precision_frame;
    }

    public setWorldPrecisionTimeFrameInMiniTimes(minitimes: number): this {
        this.world_time_precision_frame = minitimes;
        return this;
    }

    public setWorldPrecisionTimeFrameDelay(seconds: number): this {
        this.world_time_precision_frame_delay = seconds * 1000;
        return this;
    }

    public nextWorldTime(): this {
        this.world_time = (Math.floor(this.world_time / 1000) + 1) * 1000;
        return this;
    }

    public nextFrameWorldTime(): this {
        this.world_time += this.world_time_precision_frame;
        return this;
    }

    public backWoldTime(): this {
        const newTime = (this.world_time = (Math.ceil(this.world_time / 1000) - 1) * 1000);
        this.world_time = newTime > 0 ? newTime : 0;
        return this;
    }

    public backFrameWorldTime(): this {
        const newTime = this.world_time - this.world_time_precision_frame;
        this.world_time = newTime > 0 ? newTime : 0;
        return this;
    }

    public setWorldPrecisionTimeInMinitimes(minitimes: number): this {
        this.world_time = minitimes;
        return this;
    }

    public setWorldPrecisionTimeInSecondsMinutesAndHours(seconds: number, minutes = 0, hours = 0): this {
        let minitimes = 0;

        minitimes += seconds * 1000;
        minitimes += minutes * 60 * 1000;
        minitimes += hours * 60 * 60 * 1000;

        this.world_time = minitimes;
        return this;
    }

    public getWorldInMiniTimes(): number {
        return this.world_time;
    }

    // * CANVAS

    public getWidth(): number {
        return this.canvas_width;
    }

    public setWidth(width: number): this {
        this.canvas_width = this.canvas_element.width = width;
        this.camera_middle_screen.set(this.canvas_width / 2, this.canvas_height / 2);
        return this;
    }

    public getHeight(): number {
        return this.canvas_height;
    }

    public setHeight(height: number): this {
        this.canvas_height = this.canvas_element.height = height;
        this.camera_middle_screen.set(this.canvas_width / 2, this.canvas_height / 2);
        return this;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas_element;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.canvas_context;
    }

    public getCanvasTime(): number {
        return this.canvas_time;
    }

    public getCnvasTimeInTicks(): number {
        return this.canvas_time / 1000;
    }

    public getCanvasTimeInHoursMinutesAndSeconds(): string {
        const sec = Math.floor(this.canvas_time / 1000) % 60;
        const min = Math.floor(this.canvas_time / 60000) % 60;
        const hour = Math.floor(this.canvas_time / 3600000) % 24;
        return `${hour}:${min}:${sec}`.replace(/\b\d\b/g, "0$&");
    }

    public canvasIsRunning(): boolean {
        return this.canvas_is_running;
    }

    public canvasPlay(): this {
        this.canvas_is_running = true;
        return this;
    }

    public canvasStop(): this {
        this.canvas_is_running = false;
        return this;
    }

    public getBackgroundColor(): string {
        return this.canvas_background;
    }

    public setBackgroundColor(background_color: string): this {
        this.canvas_background = this.canvas_element.style.backgroundColor = background_color;
        return this;
    }

    public getFPS(): number {
        return this.canvas_fps;
    }

    public setMaxFPS(fps: number): this {
        this.canvas_max_fps = fps;
        this.canvas_fps_interval = 1000 / this.canvas_max_fps;
        return this;
    }

    public drawInformation(draw = true): this {
        this.canvas_draw_info = draw;
        return this;
    }

    public setFullScreen(): this {
        this.canvas_element.style.position = "fixed";
        this.canvas_element.style.top = "0px";
        this.canvas_element.style.left = "0px";
        this.canvas_element.style.padding = "0px";
        this.canvas_element.style.margin = "0px";

        this.setWidth(window.innerWidth).setHeight(window.innerHeight);

        this.canvas_fullscreen = true;

        return this;
    }

    public resetFullScreen(): this {
        const parent = this.canvas_element.parentNode;

        if (parent) {
            this.canvas_element.remove();
            // this.canvas_element = this.canvas_element_original.cloneNode();
            const clone = this.canvas_element_original.cloneNode(true);

            parent?.append(clone);
            this.canvas_element = document.getElementById(this.canvas_id) as HTMLCanvasElement;

            this.canvas_context = this.canvas_element.getContext("2d") as CanvasRenderingContext2D;
            this.canvas_width = this.canvas_element.width;
            this.canvas_height = this.canvas_element.height;
            this.camera_middle_screen.set(this.canvas_width / 2, this.canvas_height / 2);
            this.canvas_element.style.backgroundColor = this.canvas_background;
            // this.moveCameraOffsetToCenter();
            this.setCartesianPlaneToFullScreen();
            this.canvas_paint = new Paint(this);
            this.setupEvents();
        }
        return this;
    }

    // * CARTESIAN PLANE

    public getGridSize(): number {
        return this.cartesian_plane_grid_size;
    }

    public setGridSize(grid_size: number): this {
        this.cartesian_plane_grid_size = grid_size;
        return this;
    }

    public setNegativeX(x: number): this {
        this.cartesian_plane_negativeX = Math.round(Math.abs(x));
        this.cartesian_plane_edgeMinX = 0 - this.cartesian_plane_negativeX * this.getGridSize();
        return this;
    }

    public getNegativeX(): number {
        return this.cartesian_plane_negativeX;
    }

    public setPositiveX(x: number): this {
        this.cartesian_plane_positiveX = Math.round(Math.abs(x));
        this.cartesian_plane_edgeMaxX = 0 + this.cartesian_plane_positiveX * this.getGridSize();
        return this;
    }

    public getPositiveX(): number {
        return this.cartesian_plane_positiveX;
    }

    public setNegativeY(y: number): this {
        this.cartesian_plane_negativeY = Math.round(Math.abs(y));
        this.cartesian_plane_edgeMaxY = 0 + this.cartesian_plane_negativeY * this.getGridSize();
        return this;
    }

    public getNegativeY(): number {
        return this.cartesian_plane_negativeY;
    }

    public setPositiveY(y: number): this {
        this.cartesian_plane_positiveY = Math.round(Math.abs(y));
        this.cartesian_plane_edgeMinY = 0 - this.cartesian_plane_positiveY * this.getGridSize();
        return this;
    }

    public getPositiveY(): number {
        return this.cartesian_plane_positiveY;
    }

    public setAxisLimits(minX: number, maxX: number, minY: number, maxY: number): this {
        this.setNegativeX(minX);
        this.setPositiveX(maxX);
        this.setNegativeY(minY);
        this.setPositiveY(maxY);
        return this;
    }

    public setCartesianPlaneToFullScreen(): this {
        let maxXLines = Math.floor(this.canvas_width / this.cartesian_plane_grid_size);
        let maxYLines = Math.floor(this.canvas_height / this.cartesian_plane_grid_size);

        maxXLines = maxXLines % 2 === 0 && maxXLines * this.cartesian_plane_grid_size >= this.canvas_width ? maxXLines : maxXLines + 1;
        maxYLines = maxYLines % 2 === 0 && maxYLines * this.cartesian_plane_grid_size >= this.canvas_height ? maxYLines : maxYLines + 1;

        this.setNegativeX(maxXLines / 2).setPositiveX(maxXLines / 2);
        this.setNegativeY(maxYLines / 2).setPositiveY(maxYLines / 2);

        return this;
    }

    public drawGrid(draw: boolean): this {
        this.cartesian_plane_draw_grid = draw;
        return this;
    }

    public drawAxis(draw: boolean): this {
        this.cartesian_plane_draw_axis = draw;
        return this;
    }

    // * Has Events

    public onStart(...callback: ((world: MathWorldContract) => void)[]): this {
        this.on_start.push(...callback);
        return this;
    }

    public onPlay(...callback: ((world: MathWorldContract) => void)[]): this {
        this.on_play.push(...callback);
        return this;
    }

    public onPause(...callback: ((world: MathWorldContract) => void)[]): this {
        this.on_pause.push(...callback);
        return this;
    }

    public onReset(...callback: ((world: MathWorldContract) => void)[]): this {
        this.resetWorldTime();
        this.on_reset.push(...callback);
        return this;
    }

    public onStop(...callback: ((world: MathWorldContract) => void)[]): this {
        this.on_stop.push(...callback);
        return this;
    }

    // * Has Mouse And Keyboard

    public onKeyUp(key: string, ...callback: ((e: KeyboardEvent) => void)[]): this {
        const keyAndCallbacks = this.on_key_up.find((k) => k.key === key);
        if (keyAndCallbacks) keyAndCallbacks.callbacks.push(...callback);
        if (!keyAndCallbacks) this.on_key_up.push({ key, callbacks: callback });
        return this;
    }

    public onKeyDown(key: string, ...callback: ((e: KeyboardEvent) => void)[]): this {
        const keyAndCallbacks = this.on_key_down.find((k) => k.key === key);
        if (keyAndCallbacks) keyAndCallbacks.callbacks.push(...callback);
        if (!keyAndCallbacks) this.on_key_down.push({ key, callbacks: callback });
        return this;
    }

    public onLeftCLick(...callback: ((e: MouseEvent) => void)[]): this {
        this.on_left_click.push(...callback);
        return this;
    }

    public onRightClick(...callback: ((e: MouseEvent) => void)[]): this {
        this.on_right_click.push(...callback);
        return this;
    }

    public onMouseMove(...callback: ((e: MouseEvent) => void)[]): this {
        this.on_mouse_move.push(...callback);
        return this;
    }

    public onMouseUp(...callback: ((e: MouseEvent) => void)[]): this {
        this.on_mouse_up.push(...callback);
        return this;
    }

    public onMouseDown(...callback: ((e: MouseEvent) => void)[]): this {
        this.on_mouse_down.push(...callback);
        return this;
    }

    public onMouseWheel(...callback: ((e: WheelEvent) => void)[]): this {
        this.on_mouse_wheel.push(...callback);
        return this;
    }

    public getPressedKeys(): Key[] {
        return this.pressed_keys;
    }

    public keyIsPressed(key: string): boolean {
        return this.pressed_keys.find((k) => k.key === key || k.code === key) ? true : false;
    }

    // PRIVATE

    private drawCartesianPlan() {
        // número de linhas horizontais e verticais que o espaço terá
        const numLinesHorizontal = this.cartesian_plane_negativeY + this.cartesian_plane_positiveY;
        const numLinesVertical = this.cartesian_plane_negativeX + this.cartesian_plane_positiveX;

        const ctx = this.getContext();

        if (this.cartesian_plane_draw_grid) {
            for (let i = 0; i <= numLinesHorizontal; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

                if (i == numLinesHorizontal) {
                    ctx.moveTo(this.cartesian_plane_edgeMinX, this.cartesian_plane_edgeMinY + this.getGridSize() * i);
                    ctx.lineTo(this.cartesian_plane_edgeMaxX, this.cartesian_plane_edgeMinY + this.getGridSize() * i);
                } else {
                    ctx.moveTo(this.cartesian_plane_edgeMinX, this.cartesian_plane_edgeMinY + this.getGridSize() * i + 0.5);
                    ctx.lineTo(this.cartesian_plane_edgeMaxX, this.cartesian_plane_edgeMinY + this.getGridSize() * i + 0.5);
                }
                ctx.stroke();
            }

            for (let i = 0; i <= numLinesVertical; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";

                if (i == numLinesVertical) {
                    ctx.moveTo(this.cartesian_plane_edgeMinX + this.getGridSize() * i, this.cartesian_plane_edgeMinY);
                    ctx.lineTo(this.cartesian_plane_edgeMinX + this.getGridSize() * i, this.cartesian_plane_edgeMaxY);
                } else {
                    ctx.moveTo(this.cartesian_plane_edgeMinX + this.getGridSize() * i + 0.5, this.cartesian_plane_edgeMinY);
                    ctx.lineTo(this.cartesian_plane_edgeMinX + this.getGridSize() * i + 0.5, this.cartesian_plane_edgeMaxY);
                }

                ctx.stroke();
            }
        }

        if (this.cartesian_plane_draw_axis) {
            // desenho das linhas que cruzam o x0, y0
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.moveTo(this.cartesian_plane_edgeMinX, 0);
            ctx.lineTo(this.cartesian_plane_edgeMaxX, 0);
            ctx.moveTo(0, this.cartesian_plane_edgeMinY);
            ctx.lineTo(0, this.cartesian_plane_edgeMaxY);
            ctx.stroke();

            let index = 0;

            // Marcas de tiques ao longo do eixo X
            for (let i = -this.cartesian_plane_negativeX; i <= this.cartesian_plane_positiveX; i++) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

                // Desenhe uma marca de 6px de comprimento (-3 a 3)
                ctx.moveTo(this.cartesian_plane_edgeMinX + this.getGridSize() * index + 0.5, 0 - 3);
                ctx.lineTo(this.cartesian_plane_edgeMinX + this.getGridSize() * index + 0.5, 0 + 3);
                ctx.stroke();

                // Valor do texto naquele ponto
                if (i != 0) {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.textAlign = "start";
                    ctx.fillText(i.toString(), this.cartesian_plane_edgeMinX + this.getGridSize() * index - 2, 0 + 15);
                }

                index++;
            }

            index = 0;
            // Marcas de tiques ao longo do eixo y
            for (let i = this.cartesian_plane_positiveY; i >= -this.cartesian_plane_negativeY; i--) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";

                // Desenhe uma marca de 6px de comprimento (-3 a 3)
                ctx.moveTo(0 - 3, this.cartesian_plane_edgeMinY + this.getGridSize() * index + 0.5);
                ctx.lineTo(0 + 3, this.cartesian_plane_edgeMinY + this.getGridSize() * index + 0.5);
                ctx.stroke();

                // Valor do texto naquele ponto
                if (i != 0) {
                    ctx.font = "16px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.textAlign = "start";
                    ctx.fillText(i.toString(), 0 + 15, this.cartesian_plane_edgeMinY + this.getGridSize() * index + 3);
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

    private drawMouseDebug() {
        if (this.mouse_debug_mode === "off") return;
        const ctx = this.getContext();
        const mouseinScreen = this.getMousePositionInScreen();
        const mouseInWorld = this.getMousePositionInWorld();
        const mouseInCartesian = this.getMousePositionInCartesian();
        const point = this.mouse_debug_mode === "point" ? this.getMousePositionInScreen() : new Vector2D(this.canvas_width - 200, this.canvas_height);

        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.strokeStyle = this.getBackgroundColor();
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px arial";
        ctx.lineWidth = 7;
        ctx.fillStyle = "#5eead4";
        ctx.fillText("Screen " + mouseinScreen.toString(1), point.getX(), point.getY() - 60);
        ctx.fillStyle = "#a5b4fc";
        ctx.fillText("Cartesian " + mouseInCartesian.toString(1), point.getX(), point.getY() - 40);
        ctx.fillStyle = "#f0abfc";
        ctx.fillText("World " + mouseInWorld.toString(1), point.getX(), point.getY() - 20);
        ctx.closePath();
        ctx.restore();
    }

    private drawInfo() {
        if (!this.canvas_draw_info) return;
        const ctx = this.getContext();

        ctx.save();
        ctx.resetTransform();
        ctx.beginPath();
        ctx.strokeStyle = this.getBackgroundColor();
        ctx.textAlign = "start";
        ctx.textBaseline = "middle";
        ctx.font = "bold 16px arial";
        ctx.lineWidth = 7;
        ctx.fillStyle = "white";
        ctx.fillText("FPS: " + this.canvas_fps, 24, 16);
        ctx.fillText(`World: ${this.getWorldTimeInHoursMinutesAndSeconds()}`, 100, 16);
        ctx.fillText(`Canvas: ${this.getCanvasTimeInHoursMinutesAndSeconds()}`, 230, 16);
        ctx.fillText(`Zoom: ${this.getCameraZoom().toFixed()}%`, 370, 16);
        ctx.fillStyle = this.canvas_is_running ? "green" : "red";
        ctx.arc(8, 14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    private keyUpHandler(e: KeyboardEvent) {
        const index = this.pressed_keys.indexOf({ key: e.key, code: e.code });
        if (index) this.pressed_keys.splice(index, 1);
        const keyAndCallbacks = this.on_key_up.find((k) => k.key === e.key || k.key === e.code);
        if (keyAndCallbacks) keyAndCallbacks.callbacks.map((callback) => callback(e));
    }

    private keyDownHandler(e: KeyboardEvent) {
        if (!e.repeat) {
            this.pressed_keys.push({ key: e.key, code: e.code });
            const keyAndCallbacks = this.on_key_down.find((k) => k.key === e.key || k.key === e.code);
            if (keyAndCallbacks) keyAndCallbacks.callbacks.map((callback) => callback(e));
        }
    }

    private mouseWheelHandler(e: WheelEvent) {
        if (this.camera_is_zoomable && this.keyIsPressed(this.master_key)) {
            this.adjustZoomAtMousePoint(e);
        } else {
            this.on_mouse_wheel.map((callback) => callback(e));
        }
    }

    private mouseDownHandler(e: MouseEvent) {
        e.stopImmediatePropagation();
        e.preventDefault();

        if (this.camera_is_draggable && this.keyIsPressed(this.master_key)) {
            this.camera_is_dragging = true;
            this.camera_dragging_point.setX(e.x).setY(e.y);
        } else {
            if (e.button == 0 && this.on_left_click) this.on_left_click.map((callback) => callback(e));
            if (e.button === 2 && this.on_right_click) this.on_right_click.map((callback) => callback(e));

            this.on_mouse_down.map((callback) => callback(e));
        }

        return false;
    }

    private mouseUpHandler(e: MouseEvent) {
        if (this.camera_is_draggable && this.camera_is_dragging) {
            this.camera_is_dragging = false;
        } else {
            this.on_mouse_up.map((callback) => callback(e));
        }
    }

    private mouseMoveHandler(e: MouseEvent) {
        if (this.camera_is_draggable && this.camera_is_dragging) {
            this.getCameraOffset().setX(this.getCameraOffset().getX() + e.clientX - this.camera_dragging_point.getX());
            this.getCameraOffset().setY(this.getCameraOffset().getY() + e.clientY - this.camera_dragging_point.getY());
            this.camera_dragging_point.setX(e.clientX).setY(e.clientY);
        } else {
            this.on_mouse_move.map((callback) => callback(e));
        }
    }

    private adjustZoomAtMousePoint(e: WheelEvent) {
        e.preventDefault();
        const scale_factor = this.camera_zoom_factor / 100 + 1; // 10 / 100 + 1 = 1.1 = 110%
        if (-e.deltaY > 0) this.zoomAtWithDecimal(scale_factor, this.getMousePositionInScreen());
        else this.zoomAtWithDecimal(1 / scale_factor, this.getMousePositionInScreen());
    }

    private calculateScreenOrigin(): void {
        const canvas_rect = this.canvas_element.getBoundingClientRect();
        this.camera_screen_origin.set(canvas_rect.left + window.scrollX, canvas_rect.top + window.scrollY);
    }

    private setMousePosition(event: MouseEvent): void {
        this.mouse_current_point.setX(event.x);
        this.mouse_current_point.setY(event.y);

        this.mouse_current_point_in_screen.setX(this.mouse_current_point.getX() - this.camera_screen_origin.getX());
        this.mouse_current_point_in_screen.setY(this.mouse_current_point.getY() - this.camera_screen_origin.getY());

        this.mouse_current_point_in_world.setX((this.mouse_current_point_in_screen.getX() - this.getCameraOffset().getX()) / this.getCameraZoomInDecimal());
        this.mouse_current_point_in_world.setY(-(this.mouse_current_point_in_screen.getY() - this.getCameraOffset().getY()) / this.getCameraZoomInDecimal());

        this.mouse_current_point_in_cartesian_plane.setX(this.mouse_current_point_in_world.getX() / this.getGridSize());
        this.mouse_current_point_in_cartesian_plane.setY(this.mouse_current_point_in_world.getY() / this.getGridSize());
    }

    private resizeScreen() {
        if (this.canvas_fullscreen) {
            this.setWidth(window.innerWidth).setHeight(window.innerHeight);
            this.calculateScreenOrigin();
        }
    }

    private hiddenScreen() {
        if (document.hidden) {
            this.pauseWorldTime();
            this.pressed_keys = [];
        } else {
            this.playWorldTime();
            this.pressed_keys = [];
        }
    }

    private setupEvents(): void {
        this.getCanvas().addEventListener("mousedown", (e) => this.mouseDownHandler(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.mouseMoveHandler(e));
        this.getCanvas().addEventListener("mousemove", (e) => this.setMousePosition(e));
        this.getCanvas().addEventListener("mouseup", (e) => this.mouseUpHandler(e));
        this.getCanvas().addEventListener("wheel", (e) => this.mouseWheelHandler(e));
        document.addEventListener("keyup", (e) => this.keyUpHandler(e));
        document.addEventListener("keydown", (e) => this.keyDownHandler(e));
        document.addEventListener("visibilitychange", () => this.hiddenScreen());
        window.addEventListener("resize", () => this.resizeScreen());
    }

    private update(timestamp = 0): void {
        this.canvas_time = timestamp;
        const current_time = performance.now();

        if (!this.canvasIsRunning()) return;

        if (!this.world_time_is_paused) {
            if (this.world_time_precision_mode) {
                if (current_time - this.world_last_timestamp >= this.world_time_precision_frame_delay) {
                    this.world_time += this.world_time_precision_frame;
                }
            } else {
                this.world_time += (current_time - this.world_last_timestamp) * this.world_time_scale;
            }
        }

        this.world_last_timestamp = current_time;

        const elapsed = current_time - this.canvas_last_frame_time;

        if (elapsed > this.canvas_fps_interval) {
            this.canvas_fps = Math.round(1000 / elapsed);

            this.canvas_last_frame_time = current_time;

            const ctx = this.getContext();

            ctx.resetTransform();

            ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

            ctx.translate(this.getCameraOffset().getX(), this.getCameraOffset().getY());

            ctx.setTransform(this.getCameraZoomInDecimal(), 0, 0, this.getCameraZoomInDecimal(), this.getCameraOffset().getX(), this.getCameraOffset().getY());

            this.drawCartesianPlan();

            if (this.math_world_loop) this.math_world_loop(this);

            this.drawMouseDebug();

            this.drawInfo();
        }

        requestAnimationFrame(this.update.bind(this));
    }
}
