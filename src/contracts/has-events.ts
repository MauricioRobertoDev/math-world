import MathWorldContract from "./math-world-base";

export default interface HasEvents {
    /**
     * Adiciona uma ou mais funções a serem executadas quando o método start() for adicionado
     *
     * @param {...((world: MathWorldContract) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasEvents
     */
    onStart(...callback: ((world: MathWorldContract) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o método play() for adicionado
     *
     * @param {...((world: MathWorldContract) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasEvents
     */
    onPlay(...callback: ((world: MathWorldContract) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o método pause() for adicionado
     *
     * @param {...((world: MathWorldContract) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasEvents
     */
    onPause(...callback: ((world: MathWorldContract) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o método reset() for adicionado
     *
     * @param {...((world: MathWorldContract) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasEvents
     */
    onReset(...callback: ((world: MathWorldContract) => void)[]): this;

    /**
     * Adiciona uma ou mais funções a serem executadas quando o método stop() for adicionado
     *
     * @param {...((world: MathWorldContract) => void)[]} callback
     * @return {*}  {this}
     * @memberof HasEvents
     */
    onStop(...callback: ((world: MathWorldContract) => void)[]): this;
}
