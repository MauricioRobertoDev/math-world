import Vector2D from "../classes/vector-2d";

//  X = adjacente
// Y = oposto
export function getAngleByXY(point: Vector2D): number {
    const adjacent = point.getX();
    const opposite = point.getY();

    // invertido para que o grau 0 seja no eixo X do lado direito ->
    return radiansToDegrees(Math.atan2(opposite, adjacent));
}

export function radiansToDegrees(rad: number): number {
    if (rad < 0) return 360.0 + rad * (180 / Math.PI);
    return rad * (180 / Math.PI);
}

export function degreesToRadians(deg: number): number {
    return deg * (Math.PI / 180);
}
