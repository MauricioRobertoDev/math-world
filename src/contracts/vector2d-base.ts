import { Point } from "../types";

export default interface Vector2DContract extends Point {
    /**
     * Retorna o X do vetor
     *
     * @readonly
     * @type {number}
     * @memberof Vector2D
     */
    get x(): number;

    /**
     * Retorna o Y do vetor
     *
     * @readonly
     * @type {number}
     * @memberof Vector2D
     */
    get y(): number;

    /**
     * Retorna o X do vetor
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    getX(): number;

    /**
     * Retorna o Y do vetor
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    getY(): number;

    /**
     * Define o X do vetor
     *
     * @param {number} x
     * @return {*}  {this}
     * @memberof Vector2D
     */
    setX(x: number): this;

    /**
     * Define o Y do vetor
     *
     * @param {number} y
     * @return {*}  {this}
     * @memberof Vector2D
     */
    setY(y: number): this;

    /**
     * Retorna a magnitude do vetor
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    magnitude(): number;

    /**
     * Retorna a direção do vetor, um angulo
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    direction(): number;

    /**
     * Retorna o angulo do vetor em radianos
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    angleInRadians(): number;

    /**
     * Retorna o angulo do vetor em graus
     *
     * @return {*}  {number}
     * @memberof Vector2D
     */
    angleInDegrees(): number;

    /**
     * Normaliza o vetor
     *
     * @return {*}  {this}
     * @memberof Vector2D
     */
    normalize(): this;

    /**
     * Soma o vetor passado ao atual
     *
     * @param {(Vector2DContract | Point)} value
     * @return {*}  {this}
     * @memberof Vector2D
     */
    add(value: Vector2DContract | Point): this;

    /**
     * Subtrai o vetor passado ao atual
     *
     * @param {(Vector2DContract | Point)} value
     * @return {*}  {this}
     * @memberof Vector2D
     */
    sub(value: Vector2DContract | Point): this;

    /**
     * Multiplica o vetor pelo valor passado
     *
     * @param {number} value
     * @return {*}  {this}
     * @memberof Vector2D
     */
    mult(value: number): this;

    /**
     * Escala o vetor pelo valor passado
     *
     * @param {number} scalar
     * @return {*}  {this}
     * @memberof Vector2D
     */
    scale(scalar: number): this;

    /**
     * Retorna um novo vetor igual ao atual porem escalado
     *
     * @param {number} scalar
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    scaled(scalar: number): Vector2DContract;

    /**
     * Divide o vetor atual pelo valor passado
     *
     * @param {number} value
     * @return {*}  {this}
     * @memberof Vector2D
     */
    div(value: number): this;

    /**
     * Retorna o produto dot do vetor atual com outro
     *
     * @param {(Vector2DContract | Point)} value
     * @return {*}  {number}
     * @memberof Vector2D
     */
    dot(value: Vector2DContract | Point): number;

    /**
     * Retorna um novo vetor igual ao atual porem normalizado
     *
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    normalized(): Vector2DContract;

    /**
     * Retorna um novo vetor igual ao atual
     *
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    clone(): Vector2DContract;

    /**
     * Aredonda os valores X e Y do vetor atual
     *
     * @return {*}  {this}
     * @memberof Vector2D
     */
    round(): this;

    /**
     * Retorna um novo vetor igual ao atual porem com seus valores X e Y arredondados
     *
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    rounded(): Vector2DContract;

    /**
     * Fixa os valores X e Y do vetor atual
     *
     * @param {(number | undefined)} [fractionDigits]
     * @return {*}  {this}
     * @memberof Vector2D
     */
    fix(fractionDigits?: number | undefined): this;

    /**
     * Retorna um novo vetor igual ao atual porem com seus valores X e Y fixados
     *
     * @param {(number | undefined)} [fractionDigits]
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    fixed(fractionDigits?: number | undefined): Vector2DContract;

    /**
     * Retorna se o vetor atual é igual ao vetor passado
     *
     * @param {(Vector2DContract | Point)} value
     * @return {*}  {boolean}
     * @memberof Vector2D
     */
    isEqual(value: Vector2DContract | Point): boolean;

    /**
     * Define os valores de X e Y do vetor atual
     *
     * @param {number} x
     * @param {number} y
     * @return {*}  {this}
     * @memberof Vector2D
     */
    set(x: number, y: number): this;

    /**
     * Retorna uma string com os valores X e Y do vetor atual
     *
     * @param {(number | undefined)} [fractionDigits]
     * @return {*}  {string}
     * @memberof Vector2D
     */
    toString(fractionDigits?: number | undefined): string;

    /**
     * Retorna um ponto simples com os valores de X e Y iguais ao do vetor atual
     *
     * @return {*}  {Point}
     * @memberof Vector2D
     */
    toPoint(): Point;

    /**
     * Retorna uma novo vetor com os valores de X e Y iguais ao do ponto passado
     *
     * @param {Point} point
     * @return {*}  {Vector2DContract}
     * @memberof Vector2D
     */
    fromPoint(point: Point): Vector2DContract;
}
