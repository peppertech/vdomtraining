define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputDateMaskPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "css!oj-c/input-date-mask/input-date-mask-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputDateMask_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputDateMaskPreact_1, Layout_1, UNSAFE_IntlDateTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
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
    const InputDateMaskImpl = ({ columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputDateMaskRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'InputDateMask: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)({
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
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
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(value)) {
            throw new Error('value must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.min)) {
            throw new Error('min must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.max)) {
            throw new Error('max must be a date-only ISO string');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputDateMask_1.InputDateMask, { ref: inputDateMaskRef, ...assistiveTextProps, ...inputDateMaskProps, variant: variant }) }) }));
    };
    exports.InputDateMask = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-date-mask', (0, compat_1.forwardRef)(InputDateMaskImpl), "InputDateMask", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
