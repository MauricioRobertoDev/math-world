import Vector2D from "../classes/vector-2d";

export function linearInterpolation(a: number, b: number, offset: number): number {
    return a * (1 - offset) + b * offset;
}

export function linearInterpolation2D(a: Vector2D, b: Vector2D, percentage: number): Vector2D {
    const result = new Vector2D();

    result.setX(linearInterpolation(a.getX(), b.getX(), percentage));
    result.setY(linearInterpolation(a.getY(), b.getY(), percentage));

    return result;
}

export function getIntersectionBetweenLinesNoLimits(startPointA: Vector2D, endPointA: Vector2D, startPointB: Vector2D, endPointB: Vector2D): Vector2D | null {
    const result = new Vector2D();

    const top = (endPointB.getX() - startPointB.getX()) * (startPointA.getY() - startPointB.getY()) - (endPointB.getY() - startPointB.getY()) * (startPointA.getX() - startPointB.getX());
    const bottom = (endPointB.getY() - startPointB.getY()) * (endPointA.getX() - startPointA.getX()) - (endPointB.getX() - startPointB.getX()) * (endPointA.getY() - startPointA.getY());
    const percentage = top / bottom;

    if (bottom == 0) return null;

    const x = linearInterpolation(startPointA.getX(), endPointA.getX(), percentage);
    const y = linearInterpolation(startPointA.getY(), endPointA.getY(), percentage);

    result.setX(x);
    result.setY(y);

    return result;
}

// retorna um ponto de interseção entre duas linhas caso exista e esteja estritamente entra o ponto inicial e o ponto final das linhas
export function getIntersectionBetweenLines(startPointA: Vector2D, endPointA: Vector2D, startPointB: Vector2D, endPointB: Vector2D): Vector2D | null {
    const result = new Vector2D();

    const tTop = (endPointB.getX() - startPointB.getX()) * (startPointA.getY() - startPointB.getY()) - (endPointB.getY() - startPointB.getY()) * (startPointA.getX() - startPointB.getX());
    const uTop = (startPointB.getY() - startPointA.getY()) * (startPointA.getX() - endPointA.getX()) - (startPointB.getX() - startPointA.getX()) * (startPointA.getY() - endPointA.getY());
    const bottom = (endPointB.getY() - startPointB.getY()) * (endPointA.getX() - startPointA.getX()) - (endPointB.getX() - startPointB.getX()) * (endPointA.getY() - startPointA.getY());

    if (bottom == 0) return null; // caso seja 0 as linhas não se cruzam, são paralelas

    // aqui são dois tops poque são 1 pra cada top das linhas e os dois não podem ultrapassar 0 e 1 que são o começo e final das linhas
    const t = tTop / bottom;
    const u = uTop / bottom;

    if (t < 0 || t > 1 || u < 0 || u > 1) return null; // o ponto de interseção deve estar estritamente entre o começo e final das linhas

    const x = linearInterpolation(startPointA.getX(), endPointA.getX(), t);
    const y = linearInterpolation(startPointA.getY(), endPointA.getY(), t);

    result.setX(x);
    result.setY(y);

    return result;
}

export function getNewPointByDirectionAndDistance(point: Vector2D, direction: Vector2D, distance: number): Vector2D {
    const result = new Vector2D();

    // Normaliza o vetor da direção
    const normalizedDirection = getNormalizedPoint(direction);

    // Calcula o ponto resultante na direção especificada
    result.setX(point.getX() + normalizedDirection.getX() * distance);
    result.setY(point.getY() + normalizedDirection.getY() * distance);

    return result;
}

export function getNormalizedPoint(point: Vector2D): Vector2D {
    const result = new Vector2D();

    // Calcula o comprimento do vetor (magnitude ou mag)
    const magnitude = Math.sqrt(point.getX() * point.getX() + point.getY() * point.getY());

    // Normalizando
    result.setX(point.getX() / magnitude);
    result.setY(point.getY() / magnitude);

    return result;
}

export function getDistanceBetween(a: Vector2D, b: Vector2D): number {
    return Math.hypot(a.getX() - b.getX(), a.getY() - b.getY());
}

export function getPointPositionInFutureTime(startPosition: Vector2D, initialVelocity: Vector2D, friction: number, time: number) {
    const velocidadeFinal = new Vector2D();

    velocidadeFinal.setX(initialVelocity.getX() - friction * time);
    velocidadeFinal.setY(initialVelocity.getY() - friction * time);

    const posicaoFinal = new Vector2D();
    posicaoFinal.setX(startPosition.getX() + initialVelocity.getX() * time - 0.5 * friction * time * time);
    posicaoFinal.setY(startPosition.getY() + initialVelocity.getY() * time - 0.5 * friction * time * time);

    return posicaoFinal;
}

export function calcularPosicaoBola(posicaoAtual: Vector2D, direcao: Vector2D, velocidade: number, desaceleracao: number, tempo: number): Vector2D {
    // Normalizar a direção para obter um vetor unitário
    const direcaoNormalizada = new Vector2D();
    direcaoNormalizada.setX(direcao.getX() / Math.sqrt(direcao.getX() * direcao.getX() + direcao.getY() * direcao.getY()));
    direcaoNormalizada.setY(direcao.getY() / Math.sqrt(direcao.getX() * direcao.getX() + direcao.getY() * direcao.getY()));

    // Calcular a velocidade atualizada considerando a desaceleração
    let velocidadeAtualizada: number = velocidade - desaceleracao * tempo;
    velocidadeAtualizada = Math.max(0, velocidadeAtualizada); // Garante que a velocidade não seja negativa

    const tempoFinal: number = velocidade / desaceleracao; // Tempo necessário para atingir a velocidade zero

    // Calcular a posição final da bola
    const posicaoFinal = new Vector2D();

    posicaoFinal.setX(posicaoAtual.getX() + direcaoNormalizada.getX() * velocidadeAtualizada * Math.min(tempo, tempoFinal));
    posicaoFinal.setY(posicaoAtual.getY() + direcaoNormalizada.getY() * velocidadeAtualizada * Math.min(tempo, tempoFinal));

    return posicaoFinal;
}

export function getNormalizedDirection(direction: Vector2D): Vector2D {
    const magnitude = Math.sqrt(direction.getX() * direction.getX() + direction.getY() * direction.getY());
    const normalizedX = direction.getX() / magnitude;
    const normalizedY = direction.getY() / magnitude;

    return new Vector2D(normalizedX, normalizedY);
}
