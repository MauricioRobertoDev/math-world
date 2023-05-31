import Vector2D from "../classes/vector-2d";

/**
 * @param {Vector2D} position posição atual do jogador
 * @returns {Vector2D} retorna a posição do jogador no tempo especificado caso ele continue sempre na mesma direção e velocidade
 *
 */
export function getPositionByDirectionAndSpeed(position: Vector2D, direction: Vector2D, speed: number, time = 1): Vector2D {
    const directionMagnitude = Math.sqrt(direction.getX() * direction.getX() + direction.getY() * direction.getY());
    const directionNormalized: Vector2D = new Vector2D(direction.getX() / directionMagnitude, direction.getY() / directionMagnitude);
    const displacement: Vector2D = new Vector2D(directionNormalized.getX() * speed * time, directionNormalized.getY() * speed * time);
    const newPosition: Vector2D = new Vector2D(position.getX() + displacement.getX(), position.getY() + displacement.getY());

    return newPosition;
}

export function getPlayerPositionByTargetAndSpeed(position: Vector2D, target: Vector2D, speed: number, time = 1): Vector2D {
    const direction = getDirection(position, target);
    const normalizedDirection = getNormalizedDirection(direction);
    const newPositionX = position.getX() + normalizedDirection.getX() * speed * time;
    const newPositionY = position.getY() + normalizedDirection.getY() * speed * time;

    return new Vector2D(newPositionX, newPositionY);
}

export function getNormalizedDirection(direction: Vector2D): Vector2D {
    const magnitude = Math.sqrt(direction.getX() * direction.getX() + direction.getY() * direction.getY());
    const normalizedX = direction.getX() / magnitude;
    const normalizedY = direction.getY() / magnitude;

    return new Vector2D(normalizedX, normalizedY);
}

export function getDirection(start: Vector2D, end: Vector2D): Vector2D {
    const directionX = end.getX() - start.getX();
    const directionY = end.getY() - start.getY();

    return new Vector2D(directionX, directionY);
}
