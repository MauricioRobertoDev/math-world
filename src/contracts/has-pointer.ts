import Vector2D from "../classes/vector-2d";
import { DebugMouseMode } from "../types";

export default interface HasPointer {
    /**
     * Retorna a posição do mouse
     *
     * @return {*}  {Vector2D}
     * @memberof HasPointer
     */
    getMousePosition(): Vector2D;

    /**
     * Retorna a posição do mouse com coodernadas do mundo
     *
     * @return {*}  {Vector2D}
     * @memberof HasPointer
     */
    getMousePositionInWorld(): Vector2D;

    /**
     * Retorna a posição do mouse com coodernadas da tela
     *
     * @return {*}  {Vector2D}
     * @memberof HasPointer
     */
    getMousePositionInScreen(): Vector2D;

    /**
     * Retorna a posição do mouse com coodernadas do plano cartesiano
     *
     * @return {*}  {Vector2D}
     * @memberof HasPointer
     */
    getMousePositionInCartesian(): Vector2D;

    /**
     *Define o modo de debug da posição do mouse
     *
     * @param {DebugMouseMode} mode
     * @return {*}  {this}
     * @memberof HasPointer
     */
    setDebugMouseMode(mode: DebugMouseMode): this;

    /**
     * Retorna o mode de debug da posição do mouse
     *
     * @return {*}  {DebugMouseMode}
     * @memberof HasPointer
     */
    getMoudeDebugMode(): DebugMouseMode;
}
