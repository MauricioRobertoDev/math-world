import Canvas from "./classes/canvas";

const canvas = new Canvas();

canvas.loop = (() => {
    return (canvas: Canvas) => {
        console.log(canvas.getCameraZoom());
        const ctx = canvas.getContext();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.moveTo(0, -100);
        ctx.lineTo(0, 100);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.moveTo(-100, 0);
        ctx.lineTo(100, 0);
        ctx.stroke();
        ctx.closePath();
    };
})();

// document.onwheel = (e: WheelEvent) => {
//     e.preventDefault();
//     if (-e.deltaY > 0) scaleAt(SCALE_FACTOR, canvas.getMousePosition());
//     else scaleAt(1 / SCALE_FACTOR, canvas.getMousePosition());
// };

// function scaleAt(amount: number, point: Vector2D) {
//     // at pixel coords x, y scale by scaleBy
//     zoomfactor *= amount;
//     canvas.getOrigin().setX(point.getX() - (point.getX() - canvas.getOrigin().getX()) * amount);
//     canvas.getOrigin().setY(point.getY() - (point.getY() - canvas.getOrigin().getY()) * amount);
// }

// function toWorld(x, y) {
//     // convert to world coordinates
//     x = (x - canvas.getOrigin().getX()) / zoomfactor;
//     y = (y - canvas.getOrigin().getY()) / zoomfactor;
//     return { x, y };
// }

// function toScreen(x, y) {
//     x = x * zoomfactor + canvas.getOrigin().getX();
//     y = y * zoomfactor + canvas.getOrigin().getY();
//     return { x, y };
// }

// function keyDown(evt: KeyboardEvent) {
//     if (evt.key === "p") {
//         scaleAt(SCALE_FACTOR, canvas.getMousePosition());
//     }
//     if (evt.key === "m") {
//         scaleAt(1 / SCALE_FACTOR, canvas.getMousePosition());
//     }
// }
// function zoomAt(amount: number, point: Vector2D) {
//     zoomfactor *= amount;
//     transform[0] = zoomfactor; // scale x
//     transform[3] = zoomfactor; // scale y
//     transform[4] = point.getX() - (point.getX() - transform[4]) * amount;
//     transform[5] = point.getY() - (point.getY() - transform[5]) * amount;
// }

canvas.start();
