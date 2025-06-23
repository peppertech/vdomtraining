define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "ojs/ojcontext", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Checkbox", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useCheckboxPreact", "css!oj-c/checkbox/checkbox-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, Context, ojvcomponent_1, UNSAFE_Checkbox_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useCheckboxPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const FunctionalCheckbox = (0, compat_1.forwardRef)(({ ['aria-describedby']: ariaDescribedBy, children, columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, messagesCustom = messagesCustomDefault, onMessagesCustomChanged, onValidChanged, onValueChanged, readonly: propReadonly, required = false, requiredMessageDetail, userAssistanceDensity: propUserAssistanceDensity, value = false }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const checkboxRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-checkbox id=${id} is ${description}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping: undefined,
            propReadonly,
            propUserAssistanceDensity
        });
        const { checkboxProps, methods } = (0, useCheckboxPreact_1.useCheckboxPreact)({
            ['aria-describedby']: ariaDescribedBy,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly: readonlyValue,
            required,
            requiredMessageDetail,
            userAssistanceDensity: uadValue,
            value
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
            userAssistanceDensity: checkboxProps.userAssistanceDensity
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_Checkbox_1.Checkbox, { ref: checkboxRef, ...assistiveTextProps, ...checkboxProps, children: children }) }) }));
    });
    const Checkbox = (0, ojvcomponent_1.registerCustomElement)('oj-c-checkbox', FunctionalCheckbox, "Checkbox", { "slots": { "": {} }, "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "boolean", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "value": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    exports.Checkbox = Checkbox;
});
