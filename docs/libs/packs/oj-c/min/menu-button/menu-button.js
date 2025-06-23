define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_MenuButton", "@oracle/oraclejet-preact/UNSAFE_IconMenuButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "@oracle/oraclejet-preact/hooks/UNSAFE_useToggle", "oj-c/utils/PRIVATE_ItemsMenu/items-menu", "preact/hooks", "preact/compat", "css!oj-c/menu-button/menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_MenuButton_1, UNSAFE_IconMenuButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, UNSAFE_useToggle_1, items_menu_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuButton = void 0;
    function MenuButtonImpl({ label = '', chroming = 'outlined', disabled = false, size = 'md', display = 'all', items = [], tooltip, suffix, startIcon, endIcon, selection, onSelectionChanged, onOjMenuAction, onOjMenuSelection, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display !== 'icons' || (startIcon && endIcon);
        const { bool: isOpen, toggle: toggleOpen } = (0, UNSAFE_useToggle_1.useToggle)();
        const widthProps = width ? { style: { width: width } } : {};
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...widthProps, ref: rootRef, children: isLabelButton ? ((0, jsx_runtime_1.jsx)(FunctionalMenuButton, { isMenuOpen: isOpen, onToggleMenu: toggleOpen, label: display === 'icons' ? (!startIcon ? label : '') : label, suffix: display === 'icons' ? (!startIcon ? suffix : '') : suffix, ref: buttonRef, variant: chroming, size: size, tooltip: tooltip, width: '100%', "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, icon: display !== 'label' ? startIcon : null, isDisabled: disabled, children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) })) : ((0, jsx_runtime_1.jsx)(FunctionalIconMenuButton, { isMenuOpen: isOpen, width: '100%', onToggleMenu: toggleOpen, ref: iconButtonRef, variant: chroming, isDisabled: disabled, tooltip: tooltip, accessibleLabel: accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, isIconOnly: (!startIcon && endIcon) || (!startIcon && !endIcon) ? display === 'icons' : false, icon: startIcon ?? (endIcon ? endIcon : (0, jsx_runtime_1.jsx)(OverFlowIcon, {})), children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) })) }));
    }
    const OverFlowIcon = () => {
        return (0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-overflow-h" });
    };
    exports.MenuButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-menu-button', (0, compat_1.forwardRef)(MenuButtonImpl), "MenuButton", { "properties": { "label": { "type": "string" }, "suffix": { "type": "string" }, "tooltip": { "type": "string" }, "items": { "type": "Array<object>" }, "selection": { "type": "object", "writeback": true }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["xs", "sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojMenuAction": { "bubbles": true }, "ojMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "label": "", "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "items": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalMenuButton = (0, compat_1.forwardRef)((props, ref) => {
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
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_MenuButton_1.MenuButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconMenuButton_1.IconMenuButton, { ref: iconButtonRef, ...props });
    });
});
