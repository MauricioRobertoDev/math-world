import Vector2D from "../classes/vector-2d";
import { Point } from "../types";

export default interface HasCamera {
    /**
     * Retorna o valor atual do zoom
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraZoom(): number;

    /**
     * Retorna o zoom máximo que o usuário pode usar
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraMaxZoom(): number;

    /**
     * Define o zoom máximo que o usuário pode usar, deve ser maior que o zoom mínimo
     *
     * @param {number} zoom
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraMaxZoom(zoom: number): this;

    /**
     * Retorna o zoom mínimo que o usuário pode usar
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraMinZoom(): number;

    /**
     *Define o zoom mínimo que o usuário pode usar, deve ser menor que o zoom máximo
     *
     * @param {number} zoom
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraMinZoom(zoom: number): this;

    /**
     * Retorna o fator do zoom, é uma porcentagem de zoom para cada vez que scroll do mouse é usado
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraZoomFactor(): number;

    /**
     * Retorna o fator do zoom em decimal, é uma porcentagem de zoom para cada vez que scroll do mouse é usado
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraZoomFactorInDecimal(): number;

    /**
     * Define o fator do zoom, deve ser um número entre 0 e 100%, padrão 10%
     *
     * @param {number} factor
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraZoomFactor(factor: number): this;

    /**
     * Define o valor atual do zoom, deve estar entre o zoom mínimo e máximo
     *
     * @param {number} amount
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraZoom(amount: number): this;

    /**
     * Define o valor do zoom no ponto passado
     *
     * @param {number} amount
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraZoomAt(amount: number, point: Vector2D | Point): this;

    /**
     *  Define o valor atual do zoom, deve estar entre o zoom mínimo e máximo
     *
     * @param {number} amount
     * @return {*}  {this}
     * @memberof HasCamera
     */
    zoom(amount: number): this;

    /**
     * Define o valor do zoom no ponto passado
     *
     * @param {number} amount
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    zoomAt(amount: number, point: Vector2D | Point): this;

    /**
     * Move a câmera para o ponto referido
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraOffsetTo(point: Vector2D | Point): this;

    /**
     * Move a câmera para o ponto referido
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    moveCameraTo(point: Vector2D | Point): this;

    /**
     * Move a câmera para o centro
     *
     * @return {*}  {this}
     * @memberof HasCamera
     */
    setCameraOffsetToCenter(): this;

    /**
     * Move a câmera para o centro
     *
     * @return {*}  {this}
     * @memberof HasCamera
     */
    moveCameraOffsetToCenter(): this;

    /**
     * Define se o mundo atual é pode ser arrastado
     *
     * @param {boolean} is
     * @return {*}  {this}
     * @memberof HasCamera
     */
    isDraggable(is: boolean): this;

    /**
     * Define se o mundo atual pode ser zoomado
     *
     * @param {boolean} is
     * @return {*}  {this}
     * @memberof HasCamera
     */
    isZoomable(is: boolean): this;

    /**
     * Retorna a origem da tela
     *
     * @return {*}  {Vector2D}
     * @memberof HasCamera
     */
    getScreenOrigin(): Vector2D;

    /**
     * Move a câmera para um ponto no plano cartesiano
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    moveCameraToCartesianPlane(point: Vector2D | Point): this;

    /**
     * Move a câmera para um ponto no mundo
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {this}
     * @memberof HasCamera
     */
    moveCameraToWorld(point: Vector2D | Point): this;

    /**
     * Retorna o meio da tela
     *
     * @return {*}  {Vector2D}
     * @memberof HasCamera
     */
    getMiddleScreen(): Vector2D;

    /**
     * Retorna o deslocamento da câmera
     *
     * @return {*}  {Vector2D}
     * @memberof HasCamera
     */
    getCameraOffset(): Vector2D;

    /**
     * Retorna o zoom atual em decimal
     *
     * @return {*}  {number}
     * @memberof HasCamera
     */
    getCameraZoomInDecimal(): number;
}
