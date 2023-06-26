import Paint from "../classes/paint";

export default interface HasWorld {
    getWorldTime(): number;
    getWorldTimeInTicks(): number;
    setWorldTimeScale(scale: number): this;
    pauseWorldTime(): this;
    resetWorldTime(): this;
    playWorldTime(): this;
    getWorldTimeInHoursMinutesAndSeconds(): string;
    getPaint(): Paint;
    worldTimeIsPaused(): boolean;
    worldTimeInTicksIs(time: number): boolean;
    setWorldTimeTolerance(time: number): this;
    enableWorldTimePrecisionMode(): this;
    disableWorldTimePrecisionMode(): this;
    setWorldTimePrecisionFrameInFraction(fraction: number): this;
    setWorldTimePrecisionFrameInMiniTime(minitimes: number): this;
    setWorldTimePrecisionFrameDelay(seconds: number): this;
    nextWorldTime(): this;
    nextFramwWorldTime(): this;
    backWoldTime(): this;
    backFrameWorldTime(): this;
}
