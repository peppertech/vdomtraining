define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "preact", "oj-c/checkbox"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Counter = void 0;
    function Counter({ initialCount }) {
        const [count, setCount] = (0, hooks_1.useState)(initialCount);
        const increment = () => setCount(count + 1);
        return ((0, jsx_runtime_1.jsxs)("div", { children: ["Current value: ", count, (0, jsx_runtime_1.jsx)("button", { onClick: increment, children: "Increment" }), (0, jsx_runtime_1.jsx)("oj-c-checkbox", { value: true, onvalidChanged: increment })] }));
    }
    exports.Counter = Counter;
});
