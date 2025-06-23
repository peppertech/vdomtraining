define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ToggleButton", "@oracle/oraclejet-preact/UNSAFE_IconToggleButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ToggleButton_1, UNSAFE_IconToggleButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleButton = void 0;
    function ToggleButtonImpl({ chroming = 'outlined', disabled = false, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width, display = 'all', value = false, label, tooltip, startIcon, endIcon, size = 'md', onValueChanged }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' ||
            (startIcon && endIcon && display == 'icons') ||
            (!startIcon && !endIcon && display == 'icons');
        const widthProps = width ? { style: { width } } : {};
        const ariaProps = { 'aria-describedby': ariaDescribedBy, 'aria-label': accessibleLabel };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalToggleButton, { ref: buttonRef, isSelected: value, tooltip: tooltip, onToggle: () => {
                        onValueChanged?.(!value);
                    }, variant: chroming, isDisabled: disabled, width: width ? '100%' : undefined, startIcon: startIcon, endIcon: endIcon, size: size, label: display == 'icons' ? (!startIcon && !endIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...ariaProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalIconToggleButton, { isSelected: value, onToggle: () => {
                        onValueChanged?.(!value);
                    }, width: width ? '100%' : undefined, ref: iconButtonRef, variant: chroming, isDisabled: disabled, tooltip: tooltip && tooltip !== '' ? tooltip : label, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, children: startIcon ?? endIcon }) }));
        }
    }
    exports.ToggleButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-toggle-button', (0, compat_1.forwardRef)(ToggleButtonImpl), "ToggleButton", { "properties": { "label": { "type": "string" }, "value": { "type": "boolean", "writeback": true }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "display": "all", "value": false, "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalToggleButton = (0, compat_1.forwardRef)((props, ref) => {
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
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_ToggleButton_1.ToggleButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconToggleButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconToggleButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconToggleButtonRef.current?.focus(),
            blur: () => iconToggleButtonRef.current?.blur(),
            click: () => iconToggleButtonRef.current?.click()
        }), []);
        return ((0, jsx_runtime_1.jsx)(UNSAFE_IconToggleButton_1.IconToggleButton, { ref: iconToggleButtonRef, ...props }));
    });
});
