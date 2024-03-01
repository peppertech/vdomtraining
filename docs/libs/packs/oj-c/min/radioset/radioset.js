define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_RadioItem", "@oracle/oraclejet-preact/UNSAFE_RadioSet", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojvcomponent", "preact/hooks", "preact/compat", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useRadiosetPreact", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/radioset/radioset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_RadioItem_1, UNSAFE_RadioSet_1, UNSAFE_useTabbableMode_1, UNSAFE_useFormContext_1, useAssistiveText_1, ojvcomponent_1, hooks_1, compat_1, useDataProvider_1, useRadiosetPreact_1, Context, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radioset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const FunctionalRadioset = (0, compat_1.forwardRef)(({ columnSpan = 1, disabled = false, direction = 'column', displayOptions = {
        messages: 'display'
    }, help = {
        instruction: ''
    }, helpHints = {
        definition: '',
        source: ''
    }, messagesCustom = [], readonly = false, required = false, userAssistanceDensity = 'reflow', value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const radiosetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'Radioset: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { options, containerReadonly, labelWrapping } = otherProps;
        const { radiosetProps, methods } = (0, useRadiosetPreact_1.useRadiosetPreact)({
            direction,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            userAssistanceDensity,
            value,
            ...otherProps
        }, addBusyState);
        let dataArr = [];
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isDataProvider(options) ? options : undefined,
            addBusyState
        });
        dataArr = (0, hooks_1.useMemo)(() => {
            let retDataArr = [];
            if (isDataProvider(options)) {
                if (Array.isArray(data)) {
                    retDataArr = data.map((item) => {
                        return { value: item.key, ...item.data };
                    });
                }
            }
            else if (options) {
                retDataArr = [...options];
            }
            return retDataArr;
        }, [options, data]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => radiosetRef.current?.blur(),
            focus: () => radiosetRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: radiosetProps.userAssistanceDensity
        });
        const containerProps = {
            isFormLayout: containerReadonly !== undefined,
            isReadonly: containerReadonly,
            labelWrapping: labelWrapping
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_RadioSet_1.RadioSet, { ref: radiosetRef, direction: direction, ...assistiveTextProps, ...radiosetProps, children: dataArr.map((radioItem) => ((0, jsx_runtime_1.jsx)(UNSAFE_RadioItem_1.RadioItem, { assistiveText: radioItem.assistiveText, helpSourceLink: radioItem.helpSourceLink, helpSourceText: radioItem.helpSourceText, value: radioItem.value, children: radioItem.label }, radioItem.value))) }) }) }));
    });
    exports.Radioset = (0, ojvcomponent_1.registerCustomElement)('oj-c-radioset', FunctionalRadioset, "Radioset", { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelHint": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "options": { "type": "Array<object>|DataProvider" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "any", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "direction": "column", "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "readonly": false, "required": false, "userAssistanceDensity": "reflow", "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
