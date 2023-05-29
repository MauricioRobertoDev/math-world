import Canvas from "./classes/canvas";
import Vector2D from "./classes/vector-2d";

const canvas = new Canvas();

canvas.setGridSize(64);
canvas.setPositiveX(10);
canvas.setNegativeX(10);
canvas.setPositiveY(10);
canvas.setNegativeY(10);

canvas.loop = (() => {
    return (canvas: Canvas) => {
        const paint = canvas.getPaint();

        // paint.screen();
        // const S = new Vector2D(100, 100);
        // paint.drawPoint(S, "S");

        // paint.world();
        // const W = new Vector2D(32, 64);
        // paint.drawPoint(W, "W");

        paint.cartesian();

        const C = canvas.getMousePositionInCartesian();
        C.log();

        paint.drawLine(new Vector2D(), C);
        // paint.drawPoint(C, "C");

        paint.screen();
        paint.drawMouseDebug();
    };
})();

canvas.start();
