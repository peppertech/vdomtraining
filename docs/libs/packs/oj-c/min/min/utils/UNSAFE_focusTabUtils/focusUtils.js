define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFirstTabStop = exports.focusFirstTabStop = void 0;
    const focusFirstTabStop = (element) => {
        if (!element)
            return;
        const focusElement = (0, exports.getFirstTabStop)(element);
        if (focusElement) {
            focusElement.focus();
        }
        return focusElement;
    };
    exports.focusFirstTabStop = focusFirstTabStop;
    const getFirstTabStop = (element) => {
        const tabbable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (tabbable && tabbable.length > 0) {
            return tabbable[0];
        }
        return null;
    };
    exports.getFirstTabStop = getFirstTabStop;
});
