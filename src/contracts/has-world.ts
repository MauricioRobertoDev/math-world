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
}
