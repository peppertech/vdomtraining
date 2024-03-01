var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Button", "@oracle/oraclejet-preact/UNSAFE_IconButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "preact", "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "ojs/ojvcomponent-binding", "ojs/ojvcomponent", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Button_1, UNSAFE_IconButton_1, UNSAFE_useTabbableMode_1, preact_1, hooks_1, compat_1, UNSAFE_useTooltip_1, ojvcomponent_binding_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    const FunctionalButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_Button_1.Button, { ref: buttonRef, ...props });
    });
    const FunctionalIconButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconButton_1.IconButton, { ref: iconButtonRef, ...props });
    });
    let Button = class Button extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.buttonRef = (0, preact_1.createRef)();
        }
        render(props) {
            const widthSize = { width: props.edge === 'bottom' ? '100%' : props.width };
            const { chroming: variant, disabled: isDisabled, onOjAction: onAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width: throwAwayWidth, display: display, label: label, ...otherProps } = { ...props };
            const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
                text: props.tooltip,
                isDisabled
            });
            if (props.display != 'icons' ||
                (props.startIcon && props.endIcon && props.display == 'icons') ||
                (!props.startIcon && !props.endIcon && props.display == 'icons')) {
                const buttonContent = () => ((0, jsx_runtime_1.jsx)(FunctionalButton, { ref: this.buttonRef, type: "submit", variant: variant, isDisabled: isDisabled, width: '100%', onAction: onAction, "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, startIcon: props.startIcon, endIcon: props.endIcon, size: props.size, label: props.display == 'icons'
                        ? !props.startIcon && !props.endIcon
                            ? props.label
                            : ''
                        : props.label, display: props.display != 'icons' ? props.display : 'all', ...tooltipProps, ...otherProps }));
                return props.width || props.edge !== 'none' ? ((0, jsx_runtime_1.jsxs)(ojvcomponent_1.Root, { style: widthSize, children: [buttonContent(), tooltipContent] })) : ((0, jsx_runtime_1.jsxs)(ojvcomponent_1.Root, { children: [buttonContent(), tooltipContent] }));
            }
            else {
                return ((0, jsx_runtime_1.jsx)(FunctionalIconButton, { ref: this.buttonRef, type: "submit", variant: variant, isDisabled: isDisabled, tooltip: props.tooltip && props.tooltip !== '' ? props.tooltip : props.label, onAction: onAction, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : props.label, "aria-describedby": ariaDescribedBy, size: props.size, ...otherProps, children: props.startIcon ?? props.endIcon }));
            }
        }
        blur() {
            this.buttonRef.current?.blur();
        }
        focus() {
            this.buttonRef.current?.focus();
        }
    };
    exports.Button = Button;
    Button.defaultProps = {
        chroming: 'outlined',
        disabled: false,
        size: 'md',
        display: 'all',
        endIcon: null,
        startIcon: null,
        edge: 'none',
        tooltip: ''
    };
    Button._metadata = { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined", "callToAction", "danger"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "blur": {}, "focus": {} } };
    Button._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Button._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Button = Button = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-button')
    ], Button);
});
