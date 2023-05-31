import Canvas from "./classes/canvas";

const canvas = new Canvas();

// import trigonometryTest from "./tests/trigonometry-test";
// canvas.loop = trigonometryTest(canvas);

import ballPredictTest from "./tests/ball-predict";
canvas.loop = ballPredictTest(canvas);

canvas.start();
