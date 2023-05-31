import Vector2D from "../classes/vector-2d";
import { getDistanceBetween, getIntersectionBetweenLines } from "./math-helper";

export function getIntersectionBetweenLineAndCircle(lineStart: Vector2D, lineEnd: Vector2D, circlePoint: Vector2D, circleRadius: number): Vector2D[] | null {
    const v1 = new Vector2D();
    const v2 = new Vector2D();
    v1.setX(lineEnd.getX() - lineStart.getX());
    v1.setY(lineEnd.getY() - lineStart.getY());
    v2.setX(lineStart.getX() - circlePoint.getX());
    v2.setY(lineStart.getY() - circlePoint.getY());
    let b = v1.getX() * v2.getX() + v1.getY() * v2.getY();
    const c = 2 * (v1.getX() * v1.getX() + v1.getY() * v1.getY());
    b *= -2;
    const d = Math.sqrt(b * b - 2 * c * (v2.getX() * v2.getX() + v2.getY() * v2.getY() - circleRadius * circleRadius));
    if (isNaN(d)) {
        // no intercept
        return null;
    }
    const u1 = (b - d) / c; // these represent the unit distance of point one and two on the line
    const u2 = (b + d) / c;
    const retP1 = new Vector2D(); // return points
    const retP2 = new Vector2D();
    const ret = []; // return array
    if (u1 <= 1 && u1 >= 0) {
        // add point if on the line segment
        retP1.setX(lineStart.getX() + v1.getX() * u1);
        retP1.setY(lineStart.getY() + v1.getY() * u1);
        ret[0] = retP1;
    }
    if (u2 <= 1 && u2 >= 0) {
        // second add point if on the line segment
        retP2.setX(lineStart.getX() + v1.getX() * u2);
        retP2.setY(lineStart.getY() + v1.getY() * u2);
        ret[ret.length] = retP2;
    }
    return ret;
    // return null;
}

export function getIntersectionBetweenLineAndGoalArea(startLine: Vector2D, endLine: Vector2D, poloTop: Vector2D, poloBottom: Vector2D): Vector2D | null {
    const lineAIntersection = getIntersectionBetweenLines(startLine, endLine, new Vector2D(poloTop.getX() - 1400, poloTop.getY()), new Vector2D(poloBottom.getX() - 1400, poloBottom.getY()));
    const lineBIntersection = getIntersectionBetweenLines(startLine, endLine, new Vector2D(poloTop.getX() + 1400, poloTop.getY()), new Vector2D(poloBottom.getX() + 1400, poloBottom.getY()));

    const topGoalCircleIntersections = getIntersectionBetweenLineAndCircle(startLine, endLine, poloTop, 1400);
    const bottomGoalCircleIntersections = getIntersectionBetweenLineAndCircle(startLine, endLine, poloBottom, 1400);

    const intersections = [];

    if (lineAIntersection) intersections.push(lineAIntersection);
    if (lineBIntersection) intersections.push(lineBIntersection);
    if (topGoalCircleIntersections) intersections.push(...topGoalCircleIntersections);
    if (bottomGoalCircleIntersections) intersections.push(...bottomGoalCircleIntersections);

    if (intersections.length > 0) {
        intersections.sort((a, b) => {
            const distanceBetweenAandStartLine = getDistanceBetween(a, startLine);
            const distanceBetweenBandStartLine = getDistanceBetween(b, startLine);

            if (distanceBetweenAandStartLine < distanceBetweenBandStartLine) return -1;
            if (distanceBetweenAandStartLine > distanceBetweenBandStartLine) return 1;

            return 0;
        });
        return intersections[0];
    }

    return null;
}
