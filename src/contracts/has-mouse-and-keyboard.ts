import { Key } from "../types";

export default interface HasMouseAndKeyboard {
    /**
     * Adiciona uma ou mais funções a serem executadas quando a tecla específica for soltada
     *
     * @param {string} key
     * @param {...((e: KeyboardEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onKeyUp(key: string, ...callback: ((e: KeyboardEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando a tecla específica for acionada
     *
     * @param {string} key
     * @param {...((e: KeyboardEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onKeyDown(key: string, ...callback: ((e: KeyboardEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o botão esquerdo do mouse for acionado
     *
     * @param {...((e: MouseEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onLeftCLick(...callback: ((e: MouseEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o botão direito do mouse for acionado
     *
     * @param {...((e: MouseEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onRightClick(...callback: ((e: MouseEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o mouse for movimentado
     *
     * @param {...((e: MouseEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onMouseMove(...callback: ((e: MouseEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando uma tecla do mouse for solta
     *
     * @param {...((e: MouseEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onMouseUp(...callback: ((e: MouseEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando uma tecla do mouse for acionada
     *
     * @param {...((e: MouseEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onMouseDown(...callback: ((e: MouseEvent) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o scroll do mouse for acionado
     *
     * @param {...((e: WheelEvent) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasMouseAndKeyboard
     */
    onMouseWheel(...callback: ((e: WheelEvent) => void)[]): this;

    /**
     * Retornas as teclas que estão sendo pressionadas no momento
     *
     * @return {*}  {Key[]}
     * @memberof HasMouseAndKeyboard
     */
    getPressedKeys(): Key[];

    /**
     * Retorna se a tecla específica está sendo pressionada
     *
     * @param {string} key
     * @return {*}  {boolean}
     * @memberof HasMouseAndKeyboard
     */
    keyIsPressed(key: string): boolean;
}
