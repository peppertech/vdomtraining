define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/compat", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputSensitiveText", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojvcomponent", "ojs/ojcontext", "./useInputSensitiveTextPreact", "css!oj-c/input-sensitive-text/input-sensitive-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, compat_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputSensitiveText_1, Layout_1, useAssistiveText_1, ojvcomponent_1, Context, useInputSensitiveTextPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputSensitiveText = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const lengthDefault = {
        countBy: 'codePoint',
        max: null
    };
    const FunctionalInputSensitiveText = (0, compat_1.forwardRef)(({ clearIcon = 'never', columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, length = lengthDefault, maskIcon = 'visible', messagesCustom = messagesCustomDefault, maskIconLabel, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, compat_1.useRef)();
        const inputSensitiveTextRef = (0, compat_1.useRef)();
        const addBusyState = (0, compat_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-sensitive-text id=${id} is ${description}` })
                : () => { };
        }, []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputSensitiveTextProps, methods } = (0, useInputSensitiveTextPreact_1.useInputSensitiveTextPreact)({
            clearIcon,
            columnSpan,
            disabled,
            displayOptions,
            help,
            helpHints,
            id,
            length,
            maskIcon,
            maskIconLabel,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
        (0, compat_1.useImperativeHandle)(ref, () => ({
            blur: () => inputSensitiveTextRef.current?.blur(),
            focus: () => inputSensitiveTextRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputSensitiveTextProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputSensitiveText_1.InputSensitiveText, { ref: inputSensitiveTextRef, ...assistiveTextProps, ...inputSensitiveTextProps, variant: variant }) }) }));
    });
    exports.InputSensitiveText = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-sensitive-text', FunctionalInputSensitiveText, "InputSensitiveText", { "properties": { "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "max": { "type": "number|null" } } }, "maskIcon": { "type": "string", "enumValues": ["hidden", "visible"] }, "maskIconLabel": { "type": "string" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "clearIcon": "never", "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "length": { "countBy": "codePoint", "max": null }, "maskIcon": "visible", "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
