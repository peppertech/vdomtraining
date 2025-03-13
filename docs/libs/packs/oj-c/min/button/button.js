define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Button", "@oracle/oraclejet-preact/UNSAFE_IconButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_Button_1, UNSAFE_IconButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    function ButtonImpl({ chroming = 'outlined', disabled = false, size = 'md', display = 'all', endIcon, startIcon, edge = 'none', tooltip, width, label, onOjAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' ||
            (startIcon && endIcon && display == 'icons') ||
            (!startIcon && !endIcon && display == 'icons');
        const widthSize = { width: edge === 'bottom' ? '100%' : width };
        const widthProps = width || edge !== 'none' ? { style: widthSize } : {};
        const ariaProps = { 'aria-describedby': ariaDescribedBy, 'aria-label': accessibleLabel };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalButton, { ref: buttonRef, type: "submit", variant: chroming, tooltip: tooltip, isDisabled: disabled, width: '100%', onAction: onOjAction, startIcon: startIcon, endIcon: endIcon, size: size, label: display == 'icons' ? (!startIcon && !endIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...ariaProps, ...otherProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalIconButton, { width: '100%', ref: iconButtonRef, type: "submit", variant: chroming, isDisabled: disabled, tooltip: tooltip && tooltip !== '' ? tooltip : label, onAction: onOjAction, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, ...otherProps, children: startIcon ?? endIcon }) }));
        }
    }
    exports.Button = (0, ojvcomponent_1.registerCustomElement)('oj-c-button', (0, compat_1.forwardRef)(ButtonImpl), "Button", { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["xs", "sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined", "callToAction", "danger"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalButton = (0, compat_1.forwardRef)((props, ref) => {
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
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_Button_1.Button, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconButton_1.IconButton, { ref: iconButtonRef, ...props });
    });
});
