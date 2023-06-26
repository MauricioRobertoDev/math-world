import { MathWorld, Vector2D } from "./src/main";

const world = new MathWorld("app");

world.default();
world.setGridSize(540);
world.setPositiveX(1);
world.setPositiveY(1);
world.setNegativeX(1);
world.setNegativeY(1);
world.enableWorldPrecisionTimeMode();
world.pause();
// world.setWorldPrecisionTimeFrameInFraction(0.5);

// world.setWorldPrecisionTimeFrameInMiniTime(2000);
// world.setWorldTimeScale(1);

let theta = Math.PI / 4;
const c = 1;
const A = new Vector2D(0, 0);
const B = new Vector2D(Math.cos(theta) * c, Math.sin(theta) * c);
const C = new Vector2D(B.getX(), 0);

world.loop((world) => {
    const paint = world.getPaint();

    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const tan = Math.tan(theta);
    const T = new Vector2D(Math.sign(cos) * Math.hypot(1, tan) * c, 0);

    paint.cartesian();

    paint.line({ startPoint: A, endPoint: B });
    paint.text({ point: linearInterpolation2D(A, B, 0.5), text: "Radius: " + c.toFixed(2) });

    paint.line({ startPoint: B, endPoint: C, strokeColor: "#22c55e" });
    paint.text({ point: linearInterpolation2D(B, C, 0.5), text: "sin: " + sin.toFixed(2), textColor: "#22c55e" });

    paint.line({ startPoint: new Vector2D(A.getX(), B.getY()), endPoint: B, strokeColor: "#0ea5e9" });
    paint.text({ point: linearInterpolation2D(new Vector2D(A.getX(), B.getY()), B, 0.5), text: "cos: " + cos.toFixed(2), textColor: "#0ea5e9" });

    paint.line({ startPoint: B, endPoint: T, strokeColor: "#f97316" });
    paint.text({ point: linearInterpolation2D(B, T, 0.5), text: "tan: " + tan.toFixed(2), textColor: "#f97316" });

    paint.circle({ point: new Vector2D(), radius: c, startAngle: 0, endAngle: -B.angleInRadians(), strokeColor: "#fde68a", clockwise: theta > 0 });

    paint.screen();
    paint.text({ point: new Vector2D(20, 40), textAlign: "left", text: "sin = a/c = " + sin.toFixed(2), textColor: "#22c55e" });
    paint.text({ point: new Vector2D(20, 60), textAlign: "left", text: "cos = b/c = " + cos.toFixed(2), textColor: "#0ea5e9" });
    paint.text({ point: new Vector2D(20, 80), textAlign: "left", text: "tan = sin/cos = " + tan.toFixed(2), textColor: "#f97316" });
    paint.text({ point: new Vector2D(20, 100), textAlign: "left", text: "θ = " + theta.toFixed(2) + " (" + B.angleInDegrees().toFixed(2) + "°)" });
    paint.text({ point: new Vector2D(20, 120), textAlign: "left", text: "X: " + B.getX().toFixed(2) + "    " + "Y: " + B.getY().toFixed(2) });
});

world.start();

world.onMouseWheel((event) => {
    theta -= Math.sign(event.deltaY) * (Math.PI / 180);
    B.setX(Math.cos(theta) * c);
    B.setY(Math.sin(theta) * c);
    C.setX(B.getX());
});

function linearInterpolation(a: number, b: number, offset: number): number {
    return a * (1 - offset) + b * offset;
}

function linearInterpolation2D(a: Vector2D, b: Vector2D, percentage: number): Vector2D {
    const result = new Vector2D();

    result.setX(linearInterpolation(a.getX(), b.getX(), percentage));
    result.setY(linearInterpolation(a.getY(), b.getY(), percentage));

    return result;
}

(() => {
    (document.getElementById("play") as HTMLButtonElement).addEventListener("click", () => world.play());
    (document.getElementById("pause") as HTMLButtonElement).addEventListener("click", () => world.pause());
    (document.getElementById("reset") as HTMLButtonElement).addEventListener("click", () => world.reset());

    (document.getElementById("back-time") as HTMLButtonElement).addEventListener("click", () => world.backWoldTime());
    (document.getElementById("back-frame") as HTMLButtonElement).addEventListener("click", () => world.backFrameWorldTime());
    (document.getElementById("next-frame") as HTMLButtonElement).addEventListener("click", () => world.nextFramwWorldTime());
    (document.getElementById("next-time") as HTMLButtonElement).addEventListener("click", () => world.nextWorldTime());

    (document.getElementById("set-fullscreen") as HTMLButtonElement).addEventListener("click", () => world.setFullScreen());
    (document.getElementById("reset-fullscreen") as HTMLButtonElement).addEventListener("click", () => world.resetFullScreen());
})();

// console.log(1000 % 2500);
