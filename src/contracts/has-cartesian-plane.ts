export default interface HasCartesianPlane {
    getGridSize(): number;
    setGridSize(grid_size: number): this;
    setNegativeX(x: number): this;
    getNegativeX(): number;
    setPositiveX(x: number): this;
    getPositiveX(): number;
    setNegativeY(y: number): this;
    getNegativeY(): number;
    setPositiveY(y: number): this;
    getPositiveY(): number;
    setAxisLimits(minX: number, maxX: number, minY: number, maxY: number): this;
    drawGrid(draw: boolean): this;
    drawAxis(draw: boolean): this;
    setCartesianPlaneToFullScreen(): this;
}
