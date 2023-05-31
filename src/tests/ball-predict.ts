import Canvas from "../classes/canvas";
import Paint from "../classes/paint";
import Vector2D from "../classes/vector-2d";
import { getPlayerPositionByTargetAndSpeed } from "../hepers/bot-helper";
import { getIntersectionBetweenLineAndCircle, getIntersectionBetweenLineAndGoalArea } from "../hepers/colission-helper";
import { getDistanceBetween, getNormalizedDirection, linearInterpolation2D } from "../hepers/math-helper";
import { degreesToRadians, getAngleByXY } from "../hepers/trigonometry-helper";

// START FIELD
const FIELD_WIDTH = 20000;
const FIELD_HEIGHT = 10000;

const MY_GOAL_TOP = new Vector2D(0, 6500);
const MY_GOAL_CENTER = new Vector2D(0, 5000);
const MY_GOAL_BOTTOM = new Vector2D(0, 3500);
const OP_GOAL_TOP = new Vector2D(20000, 6500);
const OP_GOAL_CENTER = new Vector2D(20000, 5000);
const OP_GOAL_BOTTOM = new Vector2D(20000, 3500);

const F1 = new Vector2D(0, 0);
const F2 = new Vector2D(FIELD_WIDTH, 0);
const F3 = new Vector2D(FIELD_WIDTH, FIELD_HEIGHT);
const F4 = new Vector2D(0, FIELD_HEIGHT);

let P10 = new Vector2D(9375, 4583);
const P10_INITIAL_POSITION = new Vector2D(9375, 4583);

const GOAL = OP_GOAL_CENTER;

const PLAYER_SPEED = 100;

export default function ballPredictTest(canvas: Canvas): (canvas: Canvas) => void {
    // P10 = getPlayerPositionByDirectionAndSpeed(P10, GOAL, 100, canvas.getTime());
    setupCanvas(canvas);

    const paint = canvas.getPaint();

    return (canvas: Canvas) => {
        paint.cartesian();

        drawField(paint);

        P10 = getPlayerPositionByTargetAndSpeed(P10_INITIAL_POSITION, GOAL, PLAYER_SPEED, canvas.getWorldTimeInTicks());

        const PREDICT = getPlayerPositionByTargetAndSpeed(P10_INITIAL_POSITION, GOAL, PLAYER_SPEED, 40);

        paint.drawLine(P10, GOAL, "#f43f5e", 15);
        paint.drawText(getDistanceBetween(P10, GOAL).toFixed(2), linearInterpolation2D(P10, GOAL, 0.5), "#f43f5e", 200);

        paint.drawBall(P10, 200, 0, Math.PI * 2, "#2563eb");
        paint.drawText("10", P10, "white", 256, "center");
        paint.drawText(PLAYER_SPEED + "/t", new Vector2D(P10.getX(), P10.getY() + 700), "white", 200, "center");
        paint.drawText("X: " + P10.getX().toFixed(2) + " Y: " + P10.getY().toFixed(2), new Vector2D(P10.getX(), P10.getY() + 500), "white", 200, "center");

        // paint.drawPoint(canvas.getMousePositionInCartesian(), "M", 100, "white", 100);
        // paint.drawLine(ORIGIN, canvas.getMousePositionInCartesian(), "white", 15);

        const intersection = getIntersectionBetweenLineAndGoalArea(P10, GOAL, OP_GOAL_TOP, OP_GOAL_BOTTOM);

        if (intersection) paint.drawPoint(intersection, "", 100, "#fde047", 100, "#fde047");

        paint.drawPoint(GOAL, "O", 200, "#2563eb", 256, "white");

        paint.drawPoint(PREDICT, "P", 200, "#2563eb", 256, "white");
        paint.drawText("40t", new Vector2D(PREDICT.getX(), PREDICT.getY() + 1200), "white", 200, "center");
        paint.drawText("X: " + PREDICT.getX().toFixed(2) + " Y: " + PREDICT.getY().toFixed(2), new Vector2D(PREDICT.getX(), PREDICT.getY() + 1000), "white", 200, "center");

        if (canvas.getWorldTimeInTicks() >= 40) canvas.pause();
    };
}

function drawField(paint: Paint) {
    paint.drawLine(F1, F2, "white", 10);
    paint.drawLine(F2, F3, "white", 10);
    paint.drawLine(F3, F4, "white", 10);
    paint.drawLine(F4, F1, "white", 10);

    paint.drawLine(new Vector2D(FIELD_WIDTH / 2, 0), new Vector2D(FIELD_WIDTH / 2, FIELD_HEIGHT), "white", 10);
    paint.drawBall(new Vector2D(FIELD_WIDTH / 2, FIELD_HEIGHT / 2), 50, 0, Math.PI * 2);

    paint.drawLine(new Vector2D(MY_GOAL_TOP.getX() - 70, MY_GOAL_TOP.getY()), new Vector2D(MY_GOAL_TOP.getX() + 70, MY_GOAL_TOP.getY()), "white", 20);
    paint.drawLine(new Vector2D(MY_GOAL_CENTER.getX() - 70, MY_GOAL_CENTER.getY()), new Vector2D(MY_GOAL_CENTER.getX() + 70, MY_GOAL_CENTER.getY()), "white", 20);
    paint.drawLine(new Vector2D(MY_GOAL_BOTTOM.getX() - 70, MY_GOAL_BOTTOM.getY()), new Vector2D(MY_GOAL_BOTTOM.getX() + 70, MY_GOAL_BOTTOM.getY()), "white", 20);

    paint.drawLine(new Vector2D(OP_GOAL_TOP.getX() - 70, OP_GOAL_TOP.getY()), new Vector2D(OP_GOAL_TOP.getX() + 70, OP_GOAL_TOP.getY()), "white", 20);
    paint.drawLine(new Vector2D(OP_GOAL_CENTER.getX() - 70, OP_GOAL_CENTER.getY()), new Vector2D(OP_GOAL_CENTER.getX() + 70, OP_GOAL_CENTER.getY()), "white", 20);
    paint.drawLine(new Vector2D(OP_GOAL_BOTTOM.getX() - 70, OP_GOAL_BOTTOM.getY()), new Vector2D(OP_GOAL_BOTTOM.getX() + 70, OP_GOAL_BOTTOM.getY()), "white", 20);

    paint.drawLine(new Vector2D(1400, MY_GOAL_TOP.getY()), new Vector2D(1400, MY_GOAL_BOTTOM.getY()), "white", 15);
    paint.drawLine(new Vector2D(FIELD_WIDTH - 1400, OP_GOAL_TOP.getY()), new Vector2D(FIELD_WIDTH - 1400, OP_GOAL_BOTTOM.getY()), "white", 15);

    paint.drawCircle(MY_GOAL_TOP, 1400, Math.PI * 1.5, 0, "white", 15);
    paint.drawCircle(MY_GOAL_BOTTOM, 1400, 0, Math.PI * 0.5, "white", 15);

    paint.drawCircle(OP_GOAL_TOP, 1400, Math.PI, Math.PI * 1.5, "white", 15);
    paint.drawCircle(OP_GOAL_BOTTOM, 1400, Math.PI * 0.5, Math.PI, "white", 15);
}

function setupCanvas(canvas: Canvas) {
    canvas.setGridSize(1);
    canvas.setPositiveX(20001);
    canvas.setPositiveY(10001);
    canvas.setNegativeX(0);
    canvas.setNegativeY(0);
    canvas.setDrawGrid(false);
    canvas.setDrawAxis(false);
    canvas.setCameraMinZoom(1);

    canvas.setMouseDebugMode("point");
    canvas.setCameraZoom(9);
    canvas.setCameraOffsetTo(54.5, 948.5);
    canvas.setDrawInfo(true);
}
