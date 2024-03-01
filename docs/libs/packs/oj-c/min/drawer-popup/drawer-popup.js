define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerPopup", "ojs/ojvcomponent", "preact/hooks", "css!oj-c/drawer-popup/drawer-popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerPopup_1, ojvcomponent_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    exports.DrawerPopup = (0, ojvcomponent_1.registerCustomElement)('oj-c-drawer-popup', ({ children, opened = false, edge = 'start', modality = 'modal', autoDismiss = 'focus-loss', closeGesture = 'swipe', onOjBeforeClose, onOpenedChanged, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const onCloseHandler = async (detail) => {
            if ((detail.reason === 'outsideClick' && autoDismiss === 'focus-loss') ||
                (detail.reason === 'swipe' && closeGesture === 'swipe') ||
                detail.reason === 'escapeKey') {
                try {
                    await onOjBeforeClose?.({});
                    onOpenedChanged?.(false);
                }
                catch (_) {
                }
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_DrawerPopup_1.DrawerPopup, { isOpen: opened, placement: edge, modality: modality, onClose: onCloseHandler, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: (0, jsx_runtime_1.jsx)("div", { ref: rootRef, children: children }) }) }));
    }, "DrawerPopup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "edge": { "type": "string", "enumValues": ["end", "start", "bottom"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focus-loss"] }, "closeGesture": { "type": "string", "enumValues": ["none", "swipe"] } }, "events": { "ojBeforeClose": { "cancelable": true } }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby"] } }, { "opened": false, "edge": "start", "modality": "modal", "autoDismiss": "focus-loss", "closeGesture": "swipe" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
