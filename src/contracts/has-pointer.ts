import Vector2D from "../classes/vector-2d";
import { DebugMouseMode } from "../types";

export default interface HasPointer {
    getMousePosition(): Vector2D;
    getMousePositionInWorld(): Vector2D;
    getMousePositionInScreen(): Vector2D;
    getMousePositionInCartesian(): Vector2D;
    setDebugMouseMode(mode: DebugMouseMode): this;
    getMoudeDebugMode(): DebugMouseMode;
}
