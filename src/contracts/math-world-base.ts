import Vector2D from "../classes/vector-2d";
import { Point } from "../types";
import HasCamera from "./has-camera";
import HasCanvas from "./has-canvas";
import HasCartesianPlane from "./has-cartesian-plane";
import HasEvents from "./has-events";
import HasMouseAndKeyboard from "./has-mouse-and-keyboard";
import HasPointer from "./has-pointer";
import HasWorld from "./has-world";

export default interface MathWorldContract extends HasCamera, HasCanvas, HasPointer, HasWorld, HasCartesianPlane, HasEvents, HasMouseAndKeyboard {
    /**
     * Inicia o loop canvas e todo o mundo
     *
     * @memberof MathWorldContract
     */
    start(): void;

    /**
     * Da play no mundo
     *
     * @memberof MathWorldContract
     */
    play(): void;

    /**
     * Da pause no mundo
     *
     * @memberof MathWorldContract
     */
    pause(): void;

    /**
     * Para a execução do canvas, só retomado ao usar start()
     *
     * @memberof MathWorldContract
     */
    stop(): void;

    /**
     * Básicamente reseta o tempo
     *
     * @memberof MathWorldContract
     */
    reset(): void;

    /**
     * Loop que é sempre chamado no canvas
     *
     * @param {(world: this) => void} loop
     * @memberof MathWorldContract
     */
    loop(loop: (world: this) => void): void;

    /**
     * Uma pré configuração básica do mundo
     *
     * @return {*}  {this}
     * @memberof MathWorldContract
     */
    default(): this;

    /**
     * Retorna o ponto real equivalente ao ponto passado do mundo
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {(Vector2D | Point)}
     * @memberof MathWorldContract
     */
    toWorld(point: Vector2D | Point): Vector2D | Point;

    /**
     * Retorna o ponto real equivalente ao ponto passado da tela
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {(Vector2D | Point)}
     * @memberof MathWorldContract
     */
    toScreen(point: Vector2D | Point): Vector2D | Point;

    /**
     * Retorna o ponto real equivalente ao ponto passado do plano cartesiano
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {(Vector2D | Point)}
     * @memberof MathWorldContract
     */
    toCartesian(point: Vector2D | Point): Vector2D | Point;

    /**
     * Retorna se o mundo está pausado ou não
     *
     * @return {*}  {boolean}
     * @memberof MathWorldContract
     */
    isPaused(): boolean;

    /**
     * Define a tecla mestre para arrastar e dar zoom, padrão 'Alt'
     *
     * @param {string} key
     * @return {*}  {this}
     * @memberof MathWorldContract
     */
    setMasterKey(key: string): this;
}
