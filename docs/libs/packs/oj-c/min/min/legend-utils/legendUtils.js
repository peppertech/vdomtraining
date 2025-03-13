define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPreferredSize = void 0;
    const getPreferredSize = function (element, width, height) {
        return element._getPreferredSize(width, height);
    };
    exports.getPreferredSize = getPreferredSize;
});
