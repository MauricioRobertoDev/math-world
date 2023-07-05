export default interface HasCartesianPlane {
    /**
     * Retorna o tamanho de cada quadradinho do plano cartesiano
     *
     * @return {*}  {number}
     * @memberof HasCartesianPlane
     */
    getGridSize(): number;

    /**
     * Define o tamanho de cada quadradinho do plano cartesiano
     *
     * @param {number} grid_size
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setGridSize(grid_size: number): this;

    /**
     * Define o menor número visível no eixo X ao desenhar o plano cartesiano
     *
     * @param {number} x
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setNegativeX(x: number): this;

    /**
     * Retorna o menor número visível no eixo X ao desenhar o plano cartesiano
     *
     * @return {*}  {number}
     * @memberof HasCartesianPlane
     */
    getNegativeX(): number;

    /**
     * Define o maior número visível no eixo X ao desenhar o plano cartesiano
     *
     * @param {number} x
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setPositiveX(x: number): this;

    /**
     * Retorna o maior número visível no eixo X ao desenhar o plano cartesiano
     *
     * @return {*}  {number}
     * @memberof HasCartesianPlane
     */
    getPositiveX(): number;

    /**
     * Define o menor número visível no eixo Y ao desenhar o plano cartesiano
     *
     * @param {number} y
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setNegativeY(y: number): this;

    /**
     * Retorna o menor número visível no eixo Y ao desenhar o plano cartesiano
     *
     * @return {*}  {number}
     * @memberof HasCartesianPlane
     */
    getNegativeY(): number;

    /**
     * Define o maior número visível no eixo Y ao desenhar o plano cartesiano
     *
     * @param {number} y
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setPositiveY(y: number): this;

    /**
     * Retorna o maior número visível no eixo Y ao desenhar o plano cartesiano
     *
     * @return {*}  {number}
     * @memberof HasCartesianPlane
     */
    getPositiveY(): number;

    /**
     * Define de forma mais conveniente os limitis visíveis ao desenhar o plano cartesiano
     *
     * @param {number} minX
     * @param {number} maxX
     * @param {number} minY
     * @param {number} maxY
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setAxisLimits(minX: number, maxX: number, minY: number, maxY: number): this;

    /**
     * Define se os quadradinhos do plano cartesiano serão desenhados
     *
     * @param {boolean} draw
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    drawGrid(draw: boolean): this;

    /**
     * Define se os eixos X e Y do plano cartesiano serão desenhados
     *
     * @param {boolean} draw
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    drawAxis(draw: boolean): this;

    /**
     * Calcula automáticamente o menor e maior número visível de cada eixo ao desenhar o plano cartesiano
     *
     * @return {*}  {this}
     * @memberof HasCartesianPlane
     */
    setCartesianPlaneToFullScreen(): this;
}
