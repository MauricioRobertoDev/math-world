import Canvas from "../classes/canvas";
import Vector2D from "../classes/vector-2d";
import { linearInterpolation2D } from "../hepers/math-helper";
import { degreesToRadians, getAngleByXY } from "../hepers/trigonometry-helper";

export default function trigonometryTest(canvas: Canvas): (canvas: Canvas) => void {
    setupCanvas(canvas);

    let theta = Math.PI / 4;
    const c = 1;
    const A = new Vector2D(0, 0);
    const B = new Vector2D(Math.cos(theta) * c, Math.sin(theta) * c);
    const C = new Vector2D(B.getX(), 0);

    document.onwheel = (event) => {
        theta -= degreesToRadians(Math.sign(event.deltaY));
        B.setX(Math.cos(theta) * c);
        B.setY(Math.sin(theta) * c);
        C.setX(B.getX());
    };

    return (canvas: Canvas) => {
        const paint = canvas.getPaint();

        const angleOfMouseDegrees = getAngleByXY(B);

        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        const tan = Math.tan(theta);
        const T = new Vector2D(Math.sign(cos) * Math.hypot(1, tan) * c, 0);

        paint.cartesian();

        paint.drawLine(A, B);
        paint.drawText("Raio: " + c.toFixed(2), linearInterpolation2D(A, B, 0.5));

        paint.drawLine(B, C, "#22c55e");
        paint.drawText("sin: " + sin.toFixed(2), linearInterpolation2D(B, C, 0.5), "#22c55e");

        paint.drawLine(new Vector2D(A.getX(), B.getY()), B, "#0ea5e9");
        paint.drawText("cos: " + cos.toFixed(2), linearInterpolation2D(new Vector2D(A.getX(), B.getY()), B, 0.5), "#0ea5e9");

        // paint.drawText("X: " + A.getX() + "    " + "Y: " + A.getY(), new Vector2D(A.getX() + 1, A.getY() + 1));

        paint.drawLine(B, T, "#f97316");
        paint.drawText("tan: " + tan.toFixed(2), linearInterpolation2D(B, T, 0.5), "#f97316");

        paint.drawCircle(new Vector2D(), c, 0, -degreesToRadians(angleOfMouseDegrees), "#fde68a", 1, theta > 0);

        paint.screen();
        paint.drawText("sin = a/c = " + sin, new Vector2D(20, 40), "#22c55e");
        paint.drawText("cos = b/c = " + cos, new Vector2D(20, 60), "#0ea5e9");
        paint.drawText("tan = sin/cos = " + tan, new Vector2D(20, 80), "#f97316");
        paint.drawText("θ = " + theta + " (" + angleOfMouseDegrees + "°)", new Vector2D(20, 100));
        paint.drawText("X: " + B.getX() + "    " + "Y: " + B.getY(), new Vector2D(20, 120));
    };
}

function setupCanvas(canvas: Canvas) {
    canvas.setGridSize(450);
    canvas.setLimitsFullScreen();
    canvas.setPositiveX(1);
    canvas.setPositiveY(1);
    canvas.setNegativeX(1);
    canvas.setNegativeY(1);
    canvas.setIsZoomable(false);
    canvas.setMouseDebugMode("point");
}
