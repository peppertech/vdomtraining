var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectMultiple", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useSelectMultiplePreact", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/select-multiple/select-multiple-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectMultiple_1, UNSAFE_useTabbableMode_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useAssistiveText_1, useSelectMultiplePreact_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useAccessibleContext_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
    const FunctionalSelectMultiple = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints } = props;
        const selectMultipleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-select-multiple id=${props.id}: ${desc}`
            });
        }, [busyContextRef, props.id]);
        const { selectMultipleProps, methods, _selectItemsByValue } = (0, useSelectMultiplePreact_1.useSelectMultiplePreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectMultipleRef.current?.blur(),
            focus: () => selectMultipleRef.current?.focus(),
            _selectItemsByValue,
            ...methods
        }), [methods, _selectItemsByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectMultipleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_SelectMultiple_1.SelectMultiple, { ref: selectMultipleRef, ...assistiveTextProps, ...selectMultipleProps, variant: variant }));
    });
    FunctionalSelectMultiple.displayName = 'Forwarded<FunctionalSelectMultiple>';
    let SelectMultiple = class SelectMultiple extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.selectMultipleRef = (0, preact_1.createRef)();
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
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalSelectMultiple, { busyContextRef: this.busyContextRef, ref: this.selectMultipleRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.selectMultipleRef.current?.reset();
        }
        showMessages() {
            this.selectMultipleRef.current?.showMessages();
        }
        validate() {
            return this.selectMultipleRef.current?.validate();
        }
        blur() {
            this.selectMultipleRef.current?.blur();
        }
        focus() {
            this.selectMultipleRef.current?.focus();
        }
        _selectItemsByValue(value) {
            return this.selectMultipleRef.current?._selectItemsByValue(value);
        }
    };
    exports.SelectMultiple = SelectMultiple;
    SelectMultiple.defaultProps = {
        columnSpan: 1,
        data: null,
        disabled: false,
        displayOptions: {
            messages: 'display'
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
        value: null,
        valueItems: null,
        virtualKeyboard: 'auto'
    };
    SelectMultiple._metadata = { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "object|null", "writeback": true }, "valueItems": { "type": "object|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItems"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {}, "_selectItemsByValue": {} } };
    SelectMultiple._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    SelectMultiple._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.SelectMultiple = SelectMultiple = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-select-multiple')
    ], SelectMultiple);
});
