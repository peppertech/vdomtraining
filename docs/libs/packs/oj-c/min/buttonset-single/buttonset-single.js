define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ButtonSetSingle", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/utils/PRIVATE_toggleUtils/index", "@oracle/oraclejet-preact/UNSAFE_ButtonSetItem", "preact/compat", "preact/hooks", "css!oj-c/buttonset-single/buttonset-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ButtonSetSingle_1, UNSAFE_useTabbableMode_1, index_1, UNSAFE_ButtonSetItem_1, compat_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtonsetSingle = void 0;
    function ButtonsetSingleImpl({ chroming = 'outlined', disabled = false, value, onValueChanged, size = 'md', width, maxWidth, layoutWidth, items = [], display = 'all', 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonsetRef = (0, hooks_1.useRef)();
        const widthProps = (0, index_1.widthStyle)(layoutWidth, width, maxWidth);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => buttonsetRef.current?.blur(),
            focus: () => buttonsetRef.current?.focus()
        }), [buttonsetRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...widthProps, ref: rootRef, children: (0, jsx_runtime_1.jsx)(FunctionalButtonSetSingle, { value: value, onCommit: (detail) => {
                    onValueChanged?.(detail.value);
                }, ref: buttonsetRef, display: display, variant: chroming, layoutWidth: layoutWidth, size: size, width: widthProps.style ? (widthProps.style.width ? '100%' : undefined) : undefined, "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, isDisabled: disabled, ...otherProps, children: items?.map((item) => {
                    return ((0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetItem_1.ButtonSetItem, { label: item.label, value: item.value, isDisabled: item.disabled, startIcon: item.startIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.startIcon }), endIcon: item.endIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.endIcon }) }));
                }) }) }));
    }
    exports.ButtonsetSingle = (0, ojvcomponent_1.registerCustomElement)('oj-c-buttonset-single', (0, compat_1.forwardRef)(ButtonsetSingleImpl), "ButtonsetSingle", { "properties": { "value": { "type": "string", "writeback": true }, "items": { "type": "Array<object>" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } }, "layoutWidth": { "type": "string", "enumValues": ["auto", "equal"] } }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "items": [], "display": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalButtonSetSingle = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetSingle_1.ButtonSetSingle, { ref: buttonRef, ...props });
    });
});
