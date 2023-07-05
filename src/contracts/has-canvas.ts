export default interface HasCanvas {
    /**
     * Retorna a largura do canvas
     *
     * @return {*}  {number}
     * @memberof HasCanvas
     */
    getWidth(): number;

    /**
     * Define a largura do canvas
     *
     * @param {number} width
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    setWidth(width: number): this;

    /**
     * Retorna a altura do canvas
     *
     * @return {*}  {number}
     * @memberof HasCanvas
     */
    getHeight(): number;

    /**
     * Define a altura do canvas
     *
     * @param {number} height
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    setHeight(height: number): this;

    /**
     * Retorna o elemento HTML do canvas
     *
     * @return {*}  {HTMLCanvasElement}
     * @memberof HasCanvas
     */
    getCanvas(): HTMLCanvasElement;

    /**
     * Retorna o contexto 2D do canvas
     *
     * @return {*}  {CanvasRenderingContext2D}
     * @memberof HasCanvas
     */
    getContext(): CanvasRenderingContext2D;

    /**
     * Retorna o tempo do loop canvas
     *
     * @return {*}  {number}
     * @memberof HasCanvas
     */
    getCanvasTime(): number;

    /**
     * Retorna o tempo do loop canvas em ticks (divido por 1000)
     *
     * @return {*}  {number}
     * @memberof HasCanvas
     */
    getCnvasTimeInTicks(): number;

    /**
     * Retorna o tmepo do loop canvas em horas minutos e segundos
     *
     * @return {*}  {string}
     * @memberof HasCanvas
     */
    getCanvasTimeInHoursMinutesAndSeconds(): string;

    /**
     * Retorna se o canvas está rodando ou não
     *
     * @return {*}  {boolean}
     * @memberof HasCanvas
     */
    canvasIsRunning(): boolean;

    /**
     * Inicia o loop do canvas
     *
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    canvasPlay(): this;

    /**
     * Para o loop do canvas
     *
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    canvasStop(): this;

    /**
     * Retorna a cor do background canvas
     *
     * @return {*}  {string}
     * @memberof HasCanvas
     */
    getBackgroundColor(): string;

    /**
     * Define a cor do background canvas
     *
     * @param {string} background_color
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    setBackgroundColor(background_color: string): this;

    /**
     * Retorna o FPS atual do canvas
     *
     * @return {*}  {number}
     * @memberof HasCanvas
     */
    getFPS(): number;

    /**
     * Define o FPS máximo para o canvas
     *
     * @param {number} fps
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    setMaxFPS(fps: number): this;

    /**
     * Define se as informaçãos como FPS, tempo no mundo, tempo no canvas e zoom atual serão exibidas ou não
     *
     * @param {boolean} draw
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    drawInformation(draw: boolean): this;

    /**
     * Define o canvas para ocupar toda a tela disponível
     *
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    setFullScreen(): this;

    /**
     * Retorna o canvas a sua forma inicial
     *
     * @return {*}  {this}
     * @memberof HasCanvas
     */
    resetFullScreen(): this;
}
