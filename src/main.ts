import Canvas from "./classes/canvas";

const canvas = new Canvas();

import trigonometryTest from "./tests/trigonometry-test";
canvas.loop = trigonometryTest(canvas);

canvas.start();
