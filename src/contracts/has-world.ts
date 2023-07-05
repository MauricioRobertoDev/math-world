import Paint from "../classes/paint";

export default interface HasWorld {
    /**
     * Retonra a classe paint
     *
     * @return {*}  {Paint}
     * @memberof HasWorld
     */
    getPaint(): Paint;

    /**
     * Retorna o tempo do mundo em ticks/unidades
     *
     * @return {*}  {number}
     * @memberof HasWorld
     */
    getWorldTime(): number;

    /**
     * Retorna o tempo do mundo em ticks
     *
     * @return {*}  {number}
     * @memberof HasWorld
     */
    getWorldTimeInTicks(): number;

    /**
     * Retorna o tempo do mundo em minitimes, cada unidade de tempo são 1000 minitimes
     *
     * @return {*}  {number}
     * @memberof HasWorld
     */
    getWorldInMiniTimes(): number;

    /**
     * Retorna o tempo do mundo em horas, minutos e segundos, cada segundo é um tempo
     *
     * @return {*}  {string}
     * @memberof HasWorld
     */
    getWorldTimeInHoursMinutesAndSeconds(): string;

    /**
     * Da continuação ou inicia o tempo do mundo
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    playWorldTime(): this;

    /**
     * Pausa o tempo do mundo
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    pauseWorldTime(): this;

    /**
     * Reseta o tempo do mundo para 0
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    resetWorldTime(): this;

    /**
     * Retorna se o tempo do mundo está pausado ou não
     *
     * @return {*}  {boolean}
     * @memberof HasWorld
     */
    worldTimeIsPaused(): boolean;

    /**
     * Retorna se o tempo do mundo em ticks/unidades é igual ao valor passado, com certa tolerância
     *
     * @param {number} time
     * @return {*}  {boolean}
     * @memberof HasWorld
     */
    worldTimeInTicksIs(time: number): boolean;

    /**
     * Retorna se o tempo do mundo é igual ao valor passado com tolerância nula, (preferível no modo de tempo preciso)
     *
     * @param {number} time
     * @param {boolean} [tolerance=false]
     * @return {*}  {boolean}
     * @memberof HasWorld
     */
    worldTimeIs(time: number, tolerance: boolean): boolean;

    /**
     * Retorna se o tempo do mundo em minitimes é igual ao valor passado, com certa tolerância
     *
     * @param {number} time
     * @return {*}  {boolean}
     * @memberof HasWorld
     */
    worldTimeInMiniTimesIs(time: number): boolean;

    /**
     * Define quantas vezes o tempo do mundo será mais rápido que o tempo normal - (modo não preciso)
     *
     * @param {number} scale
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldTimeScale(scale: number): this;

    /**
     * Define quanto de tolerância um tempo pode ter para ser equivalente a outro
     *
     * @param {number} time
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldTimeTolerance(time: number): this;

    /**
     * Ativa o modo de tempo preciso
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    enableWorldPrecisionTimeMode(): this;

    /**
     * Desativa o modo de tempo preciso
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    disableWorldPrecisionTimeMode(): this;

    /**
     * MODO DE PRECISÃO
     *
     * Define uma fração de tempo a ser adicionada a cada frame de canvas
     * A fração é deve ser um número represantando uma porcentagem onde 1 equivale a 1 tempo por frame.
     *
     * @param {number} fraction
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldPrecisionTimeFrameInFraction(fraction: number): this;

    /**
     * MODO DE PRECISÃO
     *
     * Retorna o tempo que é adicionado a cada frame em forma de fração, ou seja esse número vezes 1 é a quantidade de tempo adicionado a cada frame
     *
     * @return {*}  {number}
     * @memberof HasWorld
     */
    getWorldPrecisionTimeFrameInFraction(): number;

    /**
     * MODO DE PRECISÃO
     *
     * Retorna o tempo que é adicionado a cada frame em forma de minitimes, onde cada tempo é equivalente a 1000 minitimes
     *
     * @return {*}  {number}
     * @memberof HasWorld
     */
    getWorldPrecisionTimeFrameInMiniTime(): number;

    /**
     * MODO DE PRECISÃO
     *
     * Define uma quantidade de minitimes de tempo a serem adicionados a cada frame de canvas
     * 1 tempo é igual a 1000 minitimes
     *
     * Você pode setar livremente a quantidade porèm lembre-se que a cada loop será adicionado esse número ao tempo então dê preferências a números divisores perfeitos de 1000, para facilitar as suas contas
     *
     * @param {number} minitimes
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldPrecisionTimeFrameInMiniTimes(minitimes: number): this;

    /**
     * MODO DE PRECISÃO
     *
     * Seta um delay para cada adição de tempo, ou seja só será adicionado mais tempos após esse delay
     *
     * @param {number} seconds
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldPrecisionTimeFrameDelay(seconds: number): this;

    /**
     * MODO DE PRECISÃO
     *
     * Define o tempo atual em minitimes
     *
     * @param {number} minitimes
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldPrecisionTimeInMinitimes(minitimes: number): this;

    /**
     * MODO DE PRECISÃO
     *
     * Define o tempo atual usando segundos, minutos e horas
     *
     * @param {number} seconds
     * @param {number} minutes
     * @param {number} hours
     * @return {*}  {this}
     * @memberof HasWorld
     */
    setWorldPrecisionTimeInSecondsMinutesAndHours(seconds: number, minutes: number, hours: number): this;

    /**
     * MODO DE PRECISÃO
     *
     * Pula o tempo para o próximo tempo inteiro, sem ser fracionado
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    nextWorldTime(): this;

    /**
     * MODO DE PRECISÃO
     *
     * Pula o tempo para o próximo tempo adicionando uma fração de tempo definida - padrão 1
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    nextFrameWorldTime(): this;

    /**
     * MODO DE PRECISÃO
     *
     * Volta o tempo para o tempo anterior inteiro, sem ser fracionado
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    backWoldTime(): this;

    /**
     * MODO DE PRECISÃO
     *
     * Volta o tempo para o tempo anterior removendo uma fração de tempo definida - padrão 1
     *
     * @return {*}  {this}
     * @memberof HasWorld
     */
    backFrameWorldTime(): this;
}
