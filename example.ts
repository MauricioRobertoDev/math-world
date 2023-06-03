import { MathWorld, Vector2D } from "./src/main";

const world = new MathWorld("app");

world.default();
world.setGridSize(450);
world.setPositiveX(1);
world.setPositiveY(1);
world.setNegativeX(1);
world.setNegativeY(1);
world.isZoomable(false);

let theta = Math.PI / 4;
const c = 1;
const A = new Vector2D(0, 0);
const B = new Vector2D(Math.cos(theta) * c, Math.sin(theta) * c);
const C = new Vector2D(B.getX(), 0);

document.onwheel = (event) => {
    theta -= Math.sign(event.deltaY) * (Math.PI / 180);
    B.setX(Math.cos(theta) * c);
    B.setY(Math.sin(theta) * c);
    C.setX(B.getX());
};

world.loop((world) => {
    const paint = world.getPaint();

    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const tan = Math.tan(theta);
    const T = new Vector2D(Math.sign(cos) * Math.hypot(1, tan) * c, 0);

    paint.cartesian();

    paint.line(A, B).draw();
    paint.text(linearInterpolation2D(A, B, 0.5), "Radius: " + c.toFixed(2)).draw();

    paint.line(B, C, "#22c55e").draw();
    paint.text(linearInterpolation2D(B, C, 0.5), "sin: " + sin.toFixed(2), "#22c55e").draw();

    paint.line(new Vector2D(A.getX(), B.getY()), B, "#0ea5e9").draw();
    paint.text(linearInterpolation2D(new Vector2D(A.getX(), B.getY()), B, 0.5), "cos: " + cos.toFixed(2), "#0ea5e9").draw();

    paint.line(B, T, "#f97316").draw();
    paint.text(linearInterpolation2D(B, T, 0.5), "tan: " + tan.toFixed(2), "#f97316").draw();

    paint
        .circle(new Vector2D(), c)
        .startAngle(0)
        .endAngle(-B.angleInRadians())
        .color("#fde68a")
        .clockwise(theta > 0)
        .draw();

    paint.screen();
    paint
        .text(new Vector2D(20, 40), "sin = a/c = " + sin.toFixed(2), "#22c55e")
        .align("left")
        .draw();

    paint.text(new Vector2D(20, 60), "cos = b/c = " + cos.toFixed(2), "#0ea5e9").draw();
    paint.text(new Vector2D(20, 80), "tan = sin/cos = " + tan.toFixed(2), "#f97316").draw();
    paint.text(new Vector2D(20, 100), "θ = " + theta.toFixed(2) + " (" + B.angleInDegrees().toFixed(2) + "°)").draw();
    paint.text(new Vector2D(20, 120), "X: " + B.getX().toFixed(2) + "    " + "Y: " + B.getY().toFixed(2)).draw();
});

world.start();

function linearInterpolation(a: number, b: number, offset: number): number {
    return a * (1 - offset) + b * offset;
}

function linearInterpolation2D(a: Vector2D, b: Vector2D, percentage: number): Vector2D {
    const result = new Vector2D();

    result.setX(linearInterpolation(a.getX(), b.getX(), percentage));
    result.setY(linearInterpolation(a.getY(), b.getY(), percentage));

    return result;
}
