define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ProgressButton", "@oracle/oraclejet-preact/UNSAFE_IconProgressButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/progress-button/progress-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ProgressButton_1, UNSAFE_IconProgressButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressButton = void 0;
    function ProgressButtonImpl({ chroming = 'outlined', disabled = false, size = 'md', display = 'all', startIcon, edge = 'none', tooltip, isLoading, width, label, onOjAction, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' || (!startIcon && display == 'icons');
        const widthSize = { width: edge === 'bottom' ? '100%' : width };
        const widthProps = width || edge !== 'none' ? { style: widthSize } : {};
        const ariaProps = { 'aria-label': label };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, children: (0, jsx_runtime_1.jsx)(FunctionalProgressButton, { ref: buttonRef, type: "submit", variant: chroming, isDisabled: disabled, width: '100%', onAction: onOjAction, startIcon: startIcon, isLoading: isLoading, size: size, label: display == 'icons' ? (!startIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...otherProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, children: (0, jsx_runtime_1.jsx)(FunctionalIconProgressButton, { width: '100%', ref: iconButtonRef, type: "submit", variant: chroming, isDisabled: disabled, isLoading: isLoading, tooltip: label, onAction: onOjAction, size: size, ...ariaProps, ...otherProps, children: startIcon }) }));
        }
    }
    exports.ProgressButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-button', (0, compat_1.forwardRef)(ProgressButtonImpl), "ProgressButton", { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "isLoading": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "borderless", "outlined", "callToAction"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalProgressButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.click()
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_ProgressButton_1.ProgressButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconProgressButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconProgressButton_1.IconProgressButton, { ref: iconButtonRef, ...props });
    });
});
