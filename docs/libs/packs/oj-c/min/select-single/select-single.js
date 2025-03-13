define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectSingle", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useSelectSinglePreact", "ojs/ojcontext", "css!oj-c/select-single/select-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectSingle_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, ojvcomponent_1, compat_1, hooks_1, useSelectSinglePreact_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
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
    function SelectSingleImpl({ advancedSearch = 'off', columnSpan = 1, containerReadonly: propContainerReadonly, data = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, matchBy = null, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, value = null, valueItem = null, virtualKeyboard = 'auto', ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const selectSingleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-select-single id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { selectSingleProps, methods, _doAdvancedSearchAction, _selectItemByValue } = (0, useSelectSinglePreact_1.useSelectSinglePreact)({
            advancedSearch,
            data,
            disabled,
            displayOptions,
            matchBy,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            value,
            valueItem,
            virtualKeyboard,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectSingleRef.current?.blur(),
            focus: () => selectSingleRef.current?.focus(),
            _doAdvancedSearchAction,
            _selectItemByValue,
            UNSAFE_focusAndOpenDropdown: () => {
                if (rootRef.current) {
                    const rootElem = rootRef.current;
                    const run = () => rootElem.firstElementChild?.dispatchEvent(new MouseEvent('mousedown'));
                    const busyContext = Context.getContext(rootElem).getBusyContext();
                    busyContext.whenReady().then(run);
                }
            },
            ...methods
        }), [methods, _doAdvancedSearchAction, _selectItemByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectSingleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectSingle_1.SelectSingle, { ref: selectSingleRef, ...assistiveTextProps, ...selectSingleProps, variant: variant }) }) }));
    }
    exports.SelectSingle = (0, ojvcomponent_1.registerCustomElement)('oj-c-select-single', (0, compat_1.forwardRef)(SelectSingleImpl), "SelectSingle", { "properties": { "advancedSearch": { "type": "string", "enumValues": ["off", "on"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "matchBy": { "type": "Array<string>|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "string|number|null", "writeback": true }, "valueItem": { "type": "object|null", "properties": { "data": { "type": "any" }, "key": { "type": "any" }, "metadata": { "type": "object", "properties": { "indexFromParent": { "type": "number" }, "isLeaf": { "type": "boolean" }, "key": { "type": "any" }, "message": { "type": "object", "properties": { "detail": { "type": "string" }, "severity": { "type": "string|number" }, "summary": { "type": "string" } } }, "parentKey": { "type": "any" }, "suggestion": { "type": "object" }, "treeDepth": { "type": "number" } } } }, "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "collectionTemplate": { "data": {} }, "itemTemplate": { "data": {} } }, "events": { "ojAdvancedSearchAction": {}, "ojValueAction": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItem"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {}, "_doAdvancedSearchAction": {}, "_selectItemByValue": {}, "UNSAFE_focusAndOpenDropdown": {} } }, { "advancedSearch": "off", "columnSpan": 1, "data": null, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "matchBy": null, "messagesCustom": [], "required": false, "value": null, "valueItem": null, "virtualKeyboard": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
