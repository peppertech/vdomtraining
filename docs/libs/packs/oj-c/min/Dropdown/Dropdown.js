define(["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/UNSAFE_Dropdown"], function (require, exports, jsx_runtime_1, UNSAFE_Dropdown_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dropdown = Dropdown;
    function Dropdown({ anchorRef, isOpen, children, onClose, initialFocus }) {
        return ((0, jsx_runtime_1.jsx)(UNSAFE_Dropdown_1.Dropdown, { anchorRef: anchorRef, isOpen: isOpen, onClose: onClose, initialFocus: initialFocus, children: children }));
    }
});
