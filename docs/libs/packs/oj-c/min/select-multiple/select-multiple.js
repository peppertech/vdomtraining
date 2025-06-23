define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectMultiple", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useSelectMultiplePreact", "ojs/ojcontext", "css!oj-c/select-multiple/select-multiple-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectMultiple_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, ojvcomponent_1, compat_1, hooks_1, useSelectMultiplePreact_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
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
    function SelectMultipleImpl({ columnSpan = 1, containerReadonly: propContainerReadonly, data = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, matchBy = null, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, value = null, valueItems = null, virtualKeyboard = 'auto', ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const selectMultipleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-select-multiple id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { selectMultipleProps, methods, _selectItemsByValue } = (0, useSelectMultiplePreact_1.useSelectMultiplePreact)({
            data,
            disabled,
            displayOptions,
            matchBy,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            value,
            valueItems,
            virtualKeyboard,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectMultipleRef.current?.blur(),
            focus: () => selectMultipleRef.current?.focus(),
            _selectItemsByValue,
            UNSAFE_focusAndOpenDropdown: () => {
                if (rootRef.current) {
                    const rootElem = rootRef.current;
                    const run = () => rootElem.firstElementChild?.dispatchEvent(new MouseEvent('mousedown'));
                    const busyContext = Context.getContext(rootElem).getBusyContext();
                    busyContext.whenReady().then(run);
                }
            },
            ...methods
        }), [methods, _selectItemsByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectMultipleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectMultiple_1.SelectMultiple, { ref: selectMultipleRef, ...assistiveTextProps, ...selectMultipleProps, variant: variant }) }) }));
    }
    exports.SelectMultiple = (0, ojvcomponent_1.registerCustomElement)('oj-c-select-multiple', (0, compat_1.forwardRef)(SelectMultipleImpl), "SelectMultiple", { "slots": { "collectionTemplate": { "data": {} }, "itemTemplate": { "data": {} } }, "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "matchBy": { "type": "Array<string>|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "object|null", "writeback": true }, "valueItems": { "type": "object|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItems"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {}, "_selectItemsByValue": {}, "UNSAFE_focusAndOpenDropdown": {} } }, { "columnSpan": 1, "data": null, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "matchBy": null, "messagesCustom": [], "required": false, "value": null, "valueItems": null, "virtualKeyboard": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
