var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useInputDateMaskPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "css!oj-c/input-date-mask/input-date-mask-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputDateMask_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useInputDateMaskPreact_1, Layout_1, UNSAFE_IntlDateTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
    const FunctionalInputDateMask = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints, validators } = props;
        const inputDateMaskRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-date-mask id=${props.id} is ${desc}`
            });
        }, []);
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputDateMaskRef.current?.blur(),
            focus: () => inputDateMaskRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_InputDateMask_1.InputDateMask, { ref: inputDateMaskRef, ...assistiveTextProps, ...inputDateMaskProps, variant: variant }));
    });
    let InputDateMask = class InputDateMask extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputDateMaskRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.value)) {
                throw new Error('value must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.min)) {
                throw new Error('min must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.max)) {
                throw new Error('max must be a date-only ISO string');
            }
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputDateMask, { busyContextRef: this.busyContextRef, ref: this.inputDateMaskRef, ...props }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputDateMaskRef.current?.reset();
        }
        showMessages() {
            this.inputDateMaskRef.current?.showMessages();
        }
        validate() {
            return this.inputDateMaskRef.current?.validate();
        }
        blur() {
            this.inputDateMaskRef.current?.blur();
        }
        focus() {
            this.inputDateMaskRef.current?.focus();
        }
    };
    exports.InputDateMask = InputDateMask;
    InputDateMask.defaultProps = {
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null
    };
    InputDateMask._metadata = { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputDateMask._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputDateMask._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputDateMask = InputDateMask = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-date-mask')
    ], InputDateMask);
});
