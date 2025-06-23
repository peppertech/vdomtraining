define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_NumberInputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useNumberInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-number/input-number-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_NumberInputText_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useNumberInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    const displayOptionsDefault = {
        converterHint: 'display',
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
    const InputNumberImpl = ({ autocomplete = 'on', columnSpan = 1, converter = null, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, stepperVariant = 'directional', userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, virtualKeyboard = 'auto', value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputNumberRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc = 'InputNumber: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-number id=${id} is ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputNumberProps, methods } = (0, useNumberInputTextPreact_1.useNumberInputTextPreact)({
            autocomplete,
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            stepperVariant,
            userAssistanceDensity: uadValue,
            validators,
            virtualKeyboard,
            value,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputNumberRef.current?.blur(),
            focus: () => inputNumberRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputNumberProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        if (otherProps.step !== undefined && otherProps.step < 0) {
            throw new Error('step must be a positive number');
        }
        if (otherProps.min != null && otherProps.max != null && otherProps.max < otherProps.min) {
            throw new Error('max cannot be less than min');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_NumberInputText_1.NumberInputText, { ref: inputNumberRef, ...assistiveTextProps, ...inputNumberProps, variant: variant }) }) }));
    };
    exports.InputNumber = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-number', (0, compat_1.forwardRef)(InputNumberImpl), "InputNumber", { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "number|null" }, "min": { "type": "number|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "numberRangeExactMessageDetail": { "type": "string" }, "numberRangeOverflowMessageDetail": { "type": "string" }, "numberRangeUnderflowMessageDetail": { "type": "string" }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "step": { "type": "number" }, "stepperVariant": { "type": "string", "enumValues": ["directional", "quantitative"] }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "number|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "auto", "text"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "transientValue": { "type": "number|null", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "transientValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "transientValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "columnSpan": 1, "converter": null, "disabled": false, "displayOptions": { "converterHint": "display", "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "stepperVariant": "directional", "validators": [], "virtualKeyboard": "auto", "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
