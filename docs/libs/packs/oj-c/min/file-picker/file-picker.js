define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_FilePicker", "preact/hooks", "preact/compat", "ojs/ojvcomponent", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_focusTabUtils/focusUtils", "css!oj-c/file-picker/file-picker-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_FilePicker_1, hooks_1, compat_1, ojvcomponent_1, UNSAFE_useTabbableMode_1, focusUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilePicker = void 0;
    const getPrimaryText = (primaryText) => {
        if (typeof primaryText === 'function') {
            return primaryText();
        }
        return primaryText;
    };
    const getSecondaryText = (secondaryText, selectionMode) => {
        if (typeof secondaryText === 'function') {
            return secondaryText({ selectionMode: selectionMode });
        }
        return secondaryText;
    };
    exports.FilePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-file-picker', (0, compat_1.forwardRef)(({ capture = 'none', disabled = false, selectionMode = 'multiple', trigger, accept, primaryText, secondaryText, onOjBeforeSelect, onOjSelect, onOjInvalidSelect, ...otherProps }, ref) => {
        const elementPromiseResolverRef = (0, hooks_1.useRef)(null);
        const resolveTestPromise = (0, hooks_1.useCallback)(() => {
            if (elementPromiseResolverRef.current) {
                elementPromiseResolverRef.current();
                elementPromiseResolverRef.current = null;
            }
        }, []);
        const onCommit = (0, hooks_1.useCallback)((event) => {
            onOjBeforeSelect?.({ files: event.files }).then(() => {
                resolveTestPromise();
                onOjSelect?.({ files: event.files });
            }, (messages) => {
                resolveTestPromise();
                onOjInvalidSelect?.({ messages: messages, until: null });
            });
        }, [onOjBeforeSelect, onOjSelect, onOjInvalidSelect, resolveTestPromise]);
        const onReject = (0, hooks_1.useCallback)((event) => {
            resolveTestPromise();
            onOjInvalidSelect?.(event);
        }, [onOjInvalidSelect, resolveTestPromise]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => (0, focusUtils_1.focusFirstTabStop)(rootRef.current),
            blur: () => {
                const focusElement = document.activeElement;
                if (rootRef.current?.contains(focusElement)) {
                    focusElement.blur();
                }
            },
            _doSelectHelper: (fileList) => {
                const promise = new Promise((resolve) => {
                    elementPromiseResolverRef.current = resolve;
                });
                const ref = preactRef.current;
                ref.onClickSelected(fileList);
                return promise;
            }
        }));
        const rootRef = (0, hooks_1.useRef)(null);
        const preactRef = (0, hooks_1.useRef)(null);
        const BaseFilePicker = UNSAFE_FilePicker_1.FilePicker;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: trigger ? 'oj-c-file-picker-with-trigger' : undefined, children: (0, jsx_runtime_1.jsx)(BaseFilePicker, { __testHandlerSymbol: preactRef, capture: capture, isDisabled: disabled, selectionMode: selectionMode, onCommit: onCommit, onReject: onReject, accept: accept, primaryText: getPrimaryText(primaryText), secondaryText: getSecondaryText(secondaryText, selectionMode), "aria-label": otherProps['aria-label'], width: "100%", children: trigger }) }));
    }), "FilePicker", { "properties": { "accept": { "type": "Array<string>" }, "capture": { "type": "string", "enumValues": ["none", "environment", "user", "implementation"] }, "disabled": { "type": "boolean" }, "primaryText": { "type": "string|function" }, "secondaryText": { "type": "string|function" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "slots": { "trigger": {} }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojInvalidSelect": {}, "ojSelect": {} }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] }, "methods": { "focus": {}, "blur": {}, "_doSelectHelper": {} } }, { "capture": "none", "disabled": false, "selectionMode": "multiple" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
