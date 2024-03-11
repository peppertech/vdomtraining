define(["require", "exports", "preact/jsx-runtime", "oj-c/input-text", "ojs/ojinputtext", "oj-c/button", "ojs/ojactioncard"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function TestButtonBar(props) {
        let myLabel = props.language;
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("oj-button", { id: "refresh_button", label: myLabel, onojAction: () => console.log(myLabel) }), (0, jsx_runtime_1.jsx)("oj-c-button", { id: "refresh_button", label: myLabel, onojAction: () => console.log(myLabel) }), (0, jsx_runtime_1.jsx)("oj-input-text", { labelHint: myLabel }), (0, jsx_runtime_1.jsx)("oj-c-input-text", { labelHint: myLabel }), (0, jsx_runtime_1.jsx)("oj-action-card", { children: myLabel })] }));
    }
    exports.default = TestButtonBar;
});
