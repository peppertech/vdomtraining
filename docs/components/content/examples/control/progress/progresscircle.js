define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "ojs/ojprogress-circle"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ProgressCircle = () => {
        const [progressValue, setProgressValue] = (0, hooks_1.useState)(0);
        (0, hooks_1.useEffect)(() => {
            const interval = setInterval(() => {
                setProgressValue((prevValue) => (prevValue >= 100 ? 0 : prevValue + 1));
            }, 30);
            return () => clearInterval(interval);
        }, []);
        return ((0, jsx_runtime_1.jsxs)("div", { id: "progressCircleWrapper", children: [(0, jsx_runtime_1.jsx)("oj-progress-circle", { size: "sm", value: -1 }), (0, jsx_runtime_1.jsx)("oj-progress-circle", { size: "sm", value: progressValue })] }));
    };
    exports.default = ProgressCircle;
});
