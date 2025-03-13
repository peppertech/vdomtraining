define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_CheckboxSet", "@oracle/oraclejet-preact/UNSAFE_CheckboxItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useCheckboxsetPreact", "css!oj-c/checkboxset/checkboxset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, UNSAFE_CheckboxSet_1, UNSAFE_CheckboxItem_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useTabbableMode_1, useAssistiveText_1, useDataProvider_1, useCheckboxsetPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkboxset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
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
    const FunctionalCheckboxset = (0, compat_1.forwardRef)(({ id, options, containerReadonly: propContainerReadonly, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, disabled = false, direction = 'column', labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, columnSpan = 1, readonly: propReadonly, userAssistanceDensity: propUserAssistanceDensity, required = false, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const checkboxsetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'Checkboxset: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const isFromDataProvider = isDataProvider(options);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { checkboxsetProps, methods } = (0, useCheckboxsetPreact_1.useCheckboxsetPreact)({
            displayOptions,
            readonly: readonlyValue,
            required,
            messagesCustom,
            disabled,
            value,
            userAssistanceDensity: uadValue,
            ...otherProps
        }, addBusyState);
        const { value: hookValue, ...checkboxsetRest } = checkboxsetProps;
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? options : undefined,
            addBusyState
        });
        const dataArr = (0, hooks_1.useMemo)(() => {
            const clonedOptions = !isFromDataProvider && options ? [...options] : [];
            return isFromDataProvider
                ? Array.isArray(data)
                    ? data.map((item) => ({ value: item.key, ...item.data }))
                    : []
                : clonedOptions;
        }, [data, isFromDataProvider, options]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => checkboxsetRef.current?.blur(),
            focus: () => checkboxsetRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: uadValue
        });
        const memoizedSetValue = (0, hooks_1.useMemo)(() => (hookValue ? new Set(hookValue) : undefined), [hookValue]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_CheckboxSet_1.CheckboxSet, { ref: checkboxsetRef, direction: direction, ...assistiveTextProps, ...checkboxsetRest, userAssistanceDensity: uadValue, value: memoizedSetValue, children: dataArr.map(({ assistiveText, helpSourceLink, helpSourceText, label, value }) => ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxItem_1.CheckboxItem, { assistiveText: assistiveText, helpSourceLink: helpSourceLink, helpSourceText: helpSourceText, value: value, children: label }, value))) }) }) }));
    });
    const Checkboxset = (0, ojvcomponent_1.registerCustomElement)('oj-c-checkboxset', FunctionalCheckboxset, "Checkboxset", { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "options": { "type": "Array<object>|DataProvider" }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "Array<string|number>|null", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "disabled": false, "direction": "column", "messagesCustom": [], "columnSpan": 1, "required": false, "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    exports.Checkboxset = Checkboxset;
});
