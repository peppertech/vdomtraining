var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_NumberInputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useNumberInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-number/input-number-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_NumberInputText_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useNumberInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    const FunctionalInputNumber = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, displayOptions, help, helpHints, validators } = props;
        const inputNumberRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-number id=${props.id} is ${desc}`
            });
        }, []);
        const { inputNumberProps, methods } = (0, useNumberInputTextPreact_1.useNumberInputTextPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputNumberRef.current?.blur(),
            focus: () => inputNumberRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputNumberProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_NumberInputText_1.NumberInputText, { ref: inputNumberRef, ...assistiveTextProps, ...inputNumberProps, variant: variant }));
    });
    let InputNumber = class InputNumber extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputNumberRef = (0, preact_1.createRef)();
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
            if (props.step !== undefined && props.step < 0) {
                throw new Error('step must be a positive number');
            }
            if (props.min != null && props.max != null && props.max < props.min) {
                throw new Error('max cannot be less than min');
            }
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputNumber, { busyContextRef: this.busyContextRef, ref: this.inputNumberRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputNumberRef.current?.reset();
        }
        showMessages() {
            this.inputNumberRef.current?.showMessages();
        }
        validate() {
            return this.inputNumberRef.current?.validate();
        }
        blur() {
            this.inputNumberRef.current?.blur();
        }
        focus() {
            this.inputNumberRef.current?.focus();
        }
    };
    exports.InputNumber = InputNumber;
    InputNumber.defaultProps = {
        autocomplete: 'on',
        columnSpan: 1,
        converter: null,
        disabled: false,
        displayOptions: {
            converterHint: 'display',
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
        value: null,
        virtualKeyboard: 'auto',
        stepperVariant: 'directional'
    };
    InputNumber._metadata = { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "number|null" }, "min": { "type": "number|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "numberRangeExactMessageDetail": { "type": "string" }, "numberRangeOverflowMessageDetail": { "type": "string" }, "numberRangeUnderflowMessageDetail": { "type": "string" }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "step": { "type": "number" }, "stepperVariant": { "type": "string", "enumValues": ["directional", "quantitative"] }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "number|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "auto", "text"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "transientValue": { "type": "number", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "transientValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "transientValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputNumber._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputNumber._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputNumber = InputNumber = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-number')
    ], InputNumber);
});
