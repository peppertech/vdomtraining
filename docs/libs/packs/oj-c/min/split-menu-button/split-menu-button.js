define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_SplitMenuButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "../utils/PRIVATE_ItemsMenu/items-menu", "preact/hooks", "preact/compat", "css!oj-c/split-menu-button/split-menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_SplitMenuButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, items_menu_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitMenuButton = void 0;
    function SplitMenuButtonImpl({ label, chroming = 'outlined', disabled = false, size = 'md', items = [], width, tooltip, onOjMenuAction, onOjAction, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const widthSize = width ? { width: width } : {};
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => buttonRef.current?.blur(),
            focus: () => buttonRef.current?.focus(),
            click: () => buttonRef.current?.click()
        }), [buttonRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { style: widthSize, ref: rootRef, children: (0, jsx_runtime_1.jsx)(FunctionalSplitMenuButton, { tooltip: tooltip, label: label, ref: buttonRef, variant: chroming, size: size, width: '100%', "aria-describedby": ariaDescribedBy, isDisabled: disabled, onAction: onOjAction, ...otherProps, children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { isSplitMenu: true, items: items, onOjMenuAction: onOjMenuAction }) }) }));
    }
    exports.SplitMenuButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-split-menu-button', (0, compat_1.forwardRef)(SplitMenuButtonImpl), "SplitMenuButton", { "properties": { "label": { "type": "string" }, "items": { "type": "Array<object>" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "outlined", "callToAction"], "binding": { "consume": { "name": "containerChroming" } } } }, "events": { "ojMenuAction": { "bubbles": true }, "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "items": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalSplitMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.dispatchEvent(new Event('ojAction', { bubbles: true }))
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_SplitMenuButton_1.SplitMenuButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
});
