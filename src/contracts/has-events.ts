import MathWorldContract from "./math-world-base";

export default interface HasEvents {
    onStart(callback: (world: MathWorldContract) => void): this;
    onPlay(callback: (world: MathWorldContract) => void): this;
    onPause(callback: (world: MathWorldContract) => void): this;
    onReset(callback: (world: MathWorldContract) => void): this;
    onStop(callback: (world: MathWorldContract) => void): this;
}
