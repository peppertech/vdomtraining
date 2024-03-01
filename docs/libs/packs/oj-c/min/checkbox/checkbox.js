var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "@oracle/oraclejet-preact/UNSAFE_Checkbox", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_Environment", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useCheckboxPreact", "css!oj-c/checkbox/checkbox-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, ojvcomponent_binding_1, UNSAFE_Checkbox_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, UNSAFE_Environment_1, useAssistiveText_1, useCheckboxPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    const FunctionalCheckbox = (0, compat_1.forwardRef)(({ ['aria-describedby']: ariaDescribedBy, busyContextRef, displayOptions, disabled, required, help, helpHints, id, children, value, messagesCustom, readonly, requiredMessageDetail, userAssistanceDensity, onMessagesCustomChanged, onValidChanged, onValueChanged, validators }, ref) => {
        const checkboxRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-checkbox id=${id} is ${desc}`
            });
        }, [busyContextRef, id]);
        const { checkboxProps, methods } = (0, useCheckboxPreact_1.useCheckboxPreact)({
            ['aria-describedby']: ariaDescribedBy,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            requiredMessageDetail,
            required,
            userAssistanceDensity,
            value,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            validators
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => checkboxRef.current?.blur(),
            focus: () => checkboxRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            validators,
            userAssistanceDensity: checkboxProps.userAssistanceDensity
        });
        return ((0, jsx_runtime_1.jsx)(UNSAFE_Checkbox_1.Checkbox, { ref: checkboxRef, ...assistiveTextProps, ...checkboxProps, children: children }));
    });
    FunctionalCheckbox.displayName = 'FunctionalCheckbox';
    let Checkbox = class Checkbox extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.checkboxRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render(props) {
            const { translations } = this.context;
            const bundle = translations?.['@oracle/oraclejet-preact'];
            const requiredValidator = {
                validate: (value) => {
                    if (props.required && value !== true) {
                        throw new Error(props.requiredMessageDetail || bundle?.checkbox_requiredMessageDetail());
                    }
                    return;
                }
            };
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan || 1], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalCheckbox, { ...props, validators: [requiredValidator], busyContextRef: this.busyContextRef, ref: this.checkboxRef }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.checkboxRef.current?.reset();
        }
        showMessages() {
            this.checkboxRef.current?.showMessages();
        }
        validate() {
            return this.checkboxRef.current?.validate();
        }
        blur() {
            this.checkboxRef.current?.blur();
        }
        focus() {
            this.checkboxRef.current?.focus();
        }
    };
    exports.Checkbox = Checkbox;
    Checkbox.defaultProps = {
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: false
    };
    Checkbox._metadata = { "slots": { "": {} }, "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "boolean", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    Checkbox._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Checkbox._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Checkbox = Checkbox = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-checkbox')
    ], Checkbox);
    Checkbox.contextType = UNSAFE_Environment_1.EnvironmentContext;
});
