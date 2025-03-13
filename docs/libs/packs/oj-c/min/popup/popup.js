define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_Popup", "ojs/ojcontext", "css!oj-c/popup/popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, hooks_1, UNSAFE_Popup_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.Popup = (0, ojvcomponent_1.registerCustomElement)('oj-c-popup', ({ id, opened = false, children, anchor, launcher, placement, collision = 'fit', modality = 'modeless', offset, initialFocus = 'auto', autoDismiss = 'focusLoss', tail = 'none', onOpenedChanged, onOjOpen, onOjBeforeClose, onOjClose, onOjFocus, width, minWidth, maxWidth = 'calc(100vw - 3rem)', height, minHeight, maxHeight = 'calc(100vw - 3rem)', ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        let defaultPlacement = placement;
        const anchorRef = (0, hooks_1.useRef)(null);
        const launcherRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-popup id='${id}' is ${desc}` })
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
        let localLauncher;
        if (typeof launcher === 'string') {
            const launcherEl = document.querySelector(launcher);
            if (launcherEl) {
                localLauncher = launcherEl;
            }
        }
        else if (launcher instanceof HTMLElement) {
            if (document.body.contains(launcher)) {
                localLauncher = launcher;
            }
        }
        else {
            localLauncher = document.activeElement;
        }
        const isObject = (value) => {
            return typeof value === 'object' && !Array.isArray(value) && value !== null;
        };
        let localAnchor;
        if (!anchor) {
            localAnchor = localLauncher;
        }
        else if (anchor instanceof Window || anchor === 'window') {
            localAnchor = 'window';
        }
        else if (typeof anchor === 'string') {
            const queriedAnchor = document.querySelector(anchor);
            localAnchor = queriedAnchor || localLauncher;
        }
        else if (anchor instanceof Element) {
            localAnchor = document.body.contains(anchor) ? anchor : localLauncher;
        }
        else if (isObject(anchor)) {
            if (typeof anchor.x === 'number' && typeof anchor.y === 'number') {
                localAnchor = anchor;
            }
            else {
                localAnchor = localLauncher;
            }
        }
        if (!placement) {
            if (localAnchor === 'window') {
                defaultPlacement = 'center';
            }
            else {
                defaultPlacement = 'bottom-start';
            }
        }
        const flipOptions = { mainAxis: true, crossAxis: true };
        const shiftOptions = { mainAxis: false, crossAxis: false };
        switch (collision) {
            case 'none': {
                flipOptions.mainAxis = false;
                flipOptions.crossAxis = false;
                break;
            }
            case 'fit': {
                flipOptions.mainAxis = false;
                flipOptions.crossAxis = false;
                shiftOptions.mainAxis = true;
                shiftOptions.crossAxis = true;
                break;
            }
            case 'flipcenter':
            case 'flipfit': {
                shiftOptions.mainAxis = true;
                shiftOptions.crossAxis = true;
                break;
            }
            default:
            case 'flip': {
                break;
            }
        }
        const isMainAxisVertical = (placement) => {
            return ['top', 'bottom'].indexOf(placement.split('-')[0]) > -1;
        };
        const verticalMainAxis = placement ? isMainAxisVertical(placement) : true;
        const derivedOffset = {
            mainAxis: verticalMainAxis ? offset?.y : offset?.x,
            crossAxis: verticalMainAxis ? offset?.x : offset?.y
        };
        const handleOnClickOutside = async () => {
            if (autoDismiss === 'focusLoss') {
                return dispatchBeforeClose({ reason: 'outsideClick' });
            }
        };
        const handleOnClose = async (detail) => {
            if (detail.reason === 'escapeKey') {
                return dispatchBeforeClose(detail);
            }
        };
        const dispatchBeforeClose = async (detail) => {
            try {
                await onOjBeforeClose?.({ detail });
                onOpenedChanged?.(false);
            }
            catch (_) {
            }
        };
        const handleOnTransitionEnd = async (value) => {
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
            if (value) {
                onOjOpen?.();
            }
            else {
                onOjClose?.();
            }
        };
        const handleOnFocus = () => {
            onOjFocus?.();
        };
        anchorRef.current = localAnchor;
        launcherRef.current = localLauncher;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_Popup_1.Popup, { ref: preactRef, isOpen: opened, anchorRef: anchorRef.current === 'window' ? undefined : anchorRef, launcherRef: launcherRef, placement: placement ?? defaultPlacement, offset: derivedOffset, flipOptions: flipOptions, shiftOptions: shiftOptions, modality: modality, initialFocus: initialFocus, tail: tail, onClose: handleOnClose, onClickOutside: handleOnClickOutside, onTransitionEnd: handleOnTransitionEnd, onFocusSet: handleOnFocus, width: width, minWidth: minWidth, maxWidth: maxWidth, height: height, minHeight: minHeight, maxHeight: maxHeight, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: children }) }));
    }, "Popup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "launcher": { "type": "string|Element" }, "anchor": { "type": "string|Element|object" }, "placement": { "type": "string", "enumValues": ["center", "end", "start", "top", "bottom", "top-start", "top-end", "top-start-corner", "top-end-corner", "start-top", "start-bottom", "start-top-corner", "start-bottom-corner", "bottom-start", "bottom-end", "bottom-start-corner", "bottom-end-corner", "end-top", "end-bottom", "end-top-corner", "end-bottom-corner"] }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focusLoss"] }, "tail": { "type": "string", "enumValues": ["none", "simple"] }, "initialFocus": { "type": "string", "enumValues": ["auto", "none", "popup", "firstFocusable"] }, "offset": { "type": "number|object" }, "collision": { "type": "string", "enumValues": ["none", "flip", "fit", "flipfit", "flipcenter"] }, "width": { "type": "number|string" }, "minWidth": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "height": { "type": "number|string" }, "minHeight": { "type": "number|string" }, "maxHeight": { "type": "number|string" } }, "events": { "ojOpen": {}, "ojBeforeClose": { "cancelable": true }, "ojClose": {}, "ojFocus": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "id"] } }, { "opened": false, "collision": "fit", "modality": "modeless", "initialFocus": "auto", "autoDismiss": "focusLoss", "tail": "none", "maxWidth": "calc(100vw - 3rem)", "maxHeight": "calc(100vw - 3rem)" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
