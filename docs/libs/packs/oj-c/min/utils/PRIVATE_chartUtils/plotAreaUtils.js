define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPlotArea = void 0;
    function getPlotArea(plotArea, yMajorTick, yMinorTick, xMajorTick) {
        return {
            color: plotArea?.backgroundColor,
            yMajorTick: yMajorTick?.rendered
                ? { isRendered: yMajorTick?.rendered !== 'off', ...yMajorTick }
                : yMajorTick,
            yMinorTick: yMinorTick?.rendered
                ? { isRendered: yMinorTick?.rendered && yMinorTick?.rendered !== 'off', ...yMinorTick }
                : yMinorTick,
            xMajorTick: xMajorTick?.rendered
                ? { isRendered: xMajorTick?.rendered && xMajorTick?.rendered !== 'off', ...xMajorTick }
                : xMajorTick
        };
    }
    exports.getPlotArea = getPlotArea;
});
