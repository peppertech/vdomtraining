define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Dialog", "preact/hooks", "ojs/ojcontext", "css!oj-c/dialog/dialog-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_Dialog_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dialog = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.Dialog = (0, ojvcomponent_1.registerCustomElement)('oj-c-dialog', ({ id, header, body, footer, cancelBehavior = 'none', dialogTitle, dragAffordance = 'none', headerDecoration = 'on', launcher, modality = 'modal', opened = false, resizeBehavior = 'none', anchor, placement, offset, onOjOpen, onOjBeforeClose, onOjClose, onOjFocus, onOjDragStart, onOjDragMove, onOjDragEnd, onOjResizeStart, onOjResize, onOjResizeEnd, onOpenedChanged, width, minWidth, maxWidth, height, minHeight, maxHeight, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const anchorRef = (0, hooks_1.useRef)(null);
        const launcherRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-dialog id='${id}' is ${desc}` })
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
        let defaultPlacement = placement;
        const isObject = (value) => {
            return typeof value === 'object' && !Array.isArray(value) && value !== null;
        };
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
        if (!placement) {
            if (!anchor || anchor instanceof Window || anchor === 'window') {
                defaultPlacement = 'center';
            }
            else {
                defaultPlacement = 'bottom-start';
            }
        }
        let localAnchor;
        if (anchor instanceof Window || anchor === 'window') {
            localAnchor = undefined;
        }
        else if (typeof anchor === 'string') {
            const queriedAnchor = document.querySelector(anchor);
            localAnchor = queriedAnchor;
        }
        else if (anchor instanceof Element) {
            localAnchor = document.body.contains(anchor) ? anchor : undefined;
        }
        else if (isObject(anchor)) {
            if (typeof anchor?.x === 'number' && typeof anchor?.y === 'number') {
                localAnchor = anchor;
            }
        }
        const handleOnClose = async (detail) => {
            if (cancelBehavior != 'none') {
                try {
                    await onOjBeforeClose?.({ detail });
                    onOpenedChanged?.(false);
                }
                catch (_) {
                }
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
        const handleOnDragStart = (detail) => {
            onOjResizeStart?.(detail);
        };
        const handleOnDragMove = (detail) => {
            onOjResize?.(detail);
        };
        const handleOnDragEnd = (detail) => {
            onOjResizeEnd?.(detail);
        };
        const handleOnResizeStart = (detail) => {
            onOjResizeStart?.(detail);
        };
        const handleOnResize = (detail) => {
            onOjResize?.(detail);
        };
        const handleOnResizeEnd = (detail) => {
            onOjResizeEnd?.(detail);
        };
        const { width: flexibleCompWidth, height: flexibleCompHeight, anchorRef: flexibleCompAnchorRef, ...flexibleCompProps } = (0, UNSAFE_Dialog_1.useFlexibleComponent)({
            isDraggable: dragAffordance === 'header',
            isResizable: resizeBehavior === 'resizable',
            onDragStart: handleOnDragStart,
            onDragMove: handleOnDragMove,
            onDragEnd: handleOnDragEnd,
            onResizeStart: handleOnResizeStart,
            onResize: handleOnResize,
            onResizeEnd: handleOnResizeEnd
        });
        anchorRef.current = localAnchor;
        launcherRef.current = localLauncher;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_Dialog_1.Dialog, { ref: preactRef, header: header || dialogTitle, launcherRef: launcherRef, footer: footer, modality: modality, isOpen: opened, cancelBehavior: cancelBehavior, resizeBehavior: resizeBehavior, dragAffordance: dragAffordance, headerDecoration: headerDecoration, ...flexibleCompProps, anchorRef: flexibleCompAnchorRef || anchorRef, placement: flexibleCompAnchorRef ? defaultPlacement : placement, offset: flexibleCompAnchorRef ? 0 : offset, onClose: handleOnClose, onTransitionEnd: handleOnTransitionEnd, onFocusSet: handleOnFocus, width: flexibleCompWidth || width, minWidth: minWidth, maxWidth: maxWidth, height: flexibleCompHeight || height, minHeight: minHeight, maxHeight: maxHeight, role: otherProps['role'], "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: body }) }));
    }, "Dialog", { "slots": { "header": {}, "body": {}, "footer": {} }, "properties": { "cancelBehavior": { "type": "string", "enumValues": ["none", "icon", "escape"] }, "dialogTitle": { "type": "string" }, "dragAffordance": { "type": "string", "enumValues": ["none", "header"] }, "headerDecoration": { "type": "string", "enumValues": ["off", "on"] }, "launcher": { "type": "string|Element" }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "opened": { "type": "boolean", "writeback": true }, "resizeBehavior": { "type": "string", "enumValues": ["none", "resizable"] }, "anchor": { "type": "string|Element|object" }, "placement": { "type": "string", "enumValues": ["center", "end", "start", "top", "bottom", "top-start", "top-end", "start-top", "start-bottom", "bottom-start", "bottom-end", "end-top", "end-bottom"] }, "offset": { "type": "number|object" }, "width": { "type": "number|string" }, "minWidth": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "height": { "type": "number|string" }, "minHeight": { "type": "number|string" }, "maxHeight": { "type": "number|string" } }, "events": { "ojOpen": {}, "ojBeforeClose": { "cancelable": true }, "ojClose": {}, "ojFocus": {}, "ojDragStart": {}, "ojDragMove": {}, "ojDragEnd": {}, "ojResizeStart": {}, "ojResize": {}, "ojResizeEnd": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "role", "id"] } }, { "cancelBehavior": "none", "dragAffordance": "none", "headerDecoration": "on", "modality": "modal", "opened": false, "resizeBehavior": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
