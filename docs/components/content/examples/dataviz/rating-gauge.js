define(["require", "exports", "preact/jsx-runtime", "ojs/ojgauge", "oj-c/rating-gauge"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RatingGaugeComp = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-md-margin-4x-horizontal", children: [(0, jsx_runtime_1.jsx)("oj-rating-gauge", { size: "lg", value: 3, "aria-labelledby": "large", labelledBy: "thresholds" }), (0, jsx_runtime_1.jsx)("oj-c-rating-gauge", { size: "lg", value: 3, labelledBy: "large thresholds" })] }));
    };
    exports.default = RatingGaugeComp;
});
