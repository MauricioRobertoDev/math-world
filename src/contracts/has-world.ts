import Paint from "../classes/paint";

export default interface HasWorld {
    getPaint(): Paint;
    getWorldTime(): number;
    getWorldTimeInTicks(): number;
    getWorldInMiniTimes(): number;
    getWorldTimeInHoursMinutesAndSeconds(): string;

    playWorldTime(): this;
    pauseWorldTime(): this;
    resetWorldTime(): this;

    worldTimeIsPaused(): boolean;
    worldTimeInTicksIs(time: number): boolean;

    setWorldTimeScale(scale: number): this;
    setWorldTimeTolerance(time: number): this;

    enableWorldPrecisionTimeMode(): this;
    disableWorldPrecisionTimeMode(): this;

    setWorldPrecisionTimeFrameInFraction(fraction: number): this;
    setWorldPrecisionTimeFrameInMiniTimes(minitimes: number): this;
    setWorldPrecisionTimeFrameDelay(seconds: number): this;
    setWorldPrecisionTimeInMinitimes(minitimes: number): this;
    setWorldPrecisionTimeInSecondsMinutesAndHours(seconds: number, minutes: number, hours: number): this;

    nextWorldTime(): this;
    nextFramwWorldTime(): this;
    backWoldTime(): this;
    backFrameWorldTime(): this;
}
