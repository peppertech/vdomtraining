define(["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConveyorBelt = ConveyorBelt;
    function ConveyorBelt(props) {
        const { children } = props;
        return (0, jsx_runtime_1.jsx)("div", { "data-testid": "conveyor", children: children });
    }
});
