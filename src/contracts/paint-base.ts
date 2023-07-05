import { Vector2D } from "../main";
import { ArcDraw, CapsuleDraw, CircleDraw, LineDraw, PaintDrawMode, Point, PointDraw, RectDraw, TailwindColorName, TailwindColorValue, TextDraw } from "../types";

export default interface PaintContract {
    /**
     * Define o modo de desenho
     *
     * @param {PaintDrawMode} draw_mode
     * @memberof PaintContract
     */
    mode(draw_mode: PaintDrawMode): void;

    /**
     * Define o modo de desenho para off, Paint não fará nenhuma interferência
     *
     * @memberof PaintContract
     */
    off(): void;

    /**
     * Define o modo de desenho para screen (tela)
     *
     * @memberof PaintContract
     */
    screen(): void;

    /**
     * Define o modo de desenho para world (mundo)
     *
     * @memberof PaintContract
     */
    world(): void;

    /**
     * Define o modo de desenho para cartesian (plano cartesiano)
     *
     * @memberof PaintContract
     */
    cartesian(): void;

    /**
     * Desenha um arco
     *
     * @param {ArcDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    arc(draw: ArcDraw): this;

    /**
     * Desenha um círculo
     *
     * @param {CircleDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    circle(draw: CircleDraw): this;

    /**
     * Desenha uma cápsula
     *
     * @param {CapsuleDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    capsule(draw: CapsuleDraw): this;

    /**
     * Desenha uma linha
     *
     * @param {LineDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    line(draw: LineDraw): this;

    /**
     * Desenha um texto
     *
     * @param {TextDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    text(draw: TextDraw): this;

    /**
     * Desenha um ponto
     *
     * @param {PointDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    point(draw: PointDraw): this;

    /**
     * Desenha um retângulo
     *
     * @param {RectDraw} draw
     * @return {*}  {this}
     * @memberof PaintContract
     */
    rect(draw: RectDraw): this;

    /**
     * Retorna o ponto passado, transformado para o modo de desenho atual
     *
     * @param {(Vector2D | Point)} point
     * @return {*}  {(Vector2D | Point)}
     * @memberof PaintContract
     */
    getPointByDrawMode(point: Vector2D | Point): Vector2D | Point;

    /**
     *  Retorna uma cor do TailwindCss
     *
     * https://tailwindcss.com/docs/customizing-colors
     *
     * @param {TailwindColorName} name
     * @param {TailwindColorValue} value
     * @param {number} opacity
     * @return {*}  {string}
     * @memberof PaintContract
     */
    getTailwindColor(name: TailwindColorName, value: TailwindColorValue, opacity: number): string;

    /**
     * Retorna o grau passado em radiano o grau deve ser entre 0 - 180
     *
     * @param {number} degrees
     * @return {*}  {number}
     * @memberof PaintContract
     */
    angleInRadians(degrees: number): number;

    /**
     * Retorna o grau passado em radiano o grau deve ser entre 0 - 360
     *
     * @param {number} degrees
     * @return {*}  {number}
     * @memberof PaintContract
     */
    angleInRadians360(degrees: number): number;
}
