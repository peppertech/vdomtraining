define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerPopup", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcontext", "css!oj-c/drawer-popup/drawer-popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerPopup_1, ojvcomponent_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.DrawerPopup = (0, ojvcomponent_1.registerCustomElement)('oj-c-drawer-popup', ({ id, children, opened = false, edge = 'start', modality = 'modal', autoDismiss = 'focus-loss', closeGesture = 'swipe', onOjBeforeClose, onOjClose, onOpenedChanged, backgroundColor, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-drawer-popup id='${id}' is ${desc}` })
                : () => { };
        }, [id]);
        const preactRef = (0, hooks_1.useCallback)((elem) => {
            if (rootRef.current) {
                if (elem) {
                    rootRef.current[LAYER_CONTENT] = elem;
                }
                else {
                    delete rootRef.current[LAYER_CONTENT];
                }
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            return () => {
                if (resolveBusyState.current) {
                    resolveBusyState.current();
                }
            };
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (resolveBusyState.current) {
                resolveBusyState.current();
            }
            resolveBusyState.current = addBusyState('animating');
        }, [opened, addBusyState]);
        const onOjBeforeCloseHandler = async (detail) => {
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
        const transitionEndHandler = async (value) => {
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
            if (value === false) {
                onOjClose?.();
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_DrawerPopup_1.DrawerPopup, { ref: preactRef, isOpen: opened, placement: edge, modality: modality, onClose: onOjBeforeCloseHandler, onTransitionEnd: transitionEndHandler, backgroundColor: backgroundColor, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: children }) }));
    }, "DrawerPopup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "edge": { "type": "string", "enumValues": ["end", "start", "bottom"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focus-loss"] }, "closeGesture": { "type": "string", "enumValues": ["none", "swipe"] }, "backgroundColor": { "type": "string" } }, "events": { "ojBeforeClose": { "cancelable": true }, "ojClose": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "id"] } }, { "opened": false, "edge": "start", "modality": "modal", "autoDismiss": "focus-loss", "closeGesture": "swipe" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
