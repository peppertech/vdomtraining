var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "@oracle/oraclejet-preact/UNSAFE_CheckboxSet", "@oracle/oraclejet-preact/UNSAFE_CheckboxItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useCheckboxsetPreact", "css!oj-c/checkboxset/checkboxset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, ojvcomponent_binding_1, UNSAFE_CheckboxSet_1, UNSAFE_CheckboxItem_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, useAssistiveText_1, useDataProvider_1, useCheckboxsetPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkboxset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const FunctionalCheckboxset = (0, compat_1.forwardRef)(({ busyContextRef, displayOptions, help, helpHints, id, direction, options, ...otherProps }, ref) => {
        const checkboxsetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-checkboxset id=${id} is ${desc}`
            });
        }, [busyContextRef, id]);
        const isFromDataProvider = isDataProvider(options);
        const { checkboxsetProps, methods } = (0, useCheckboxsetPreact_1.useCheckboxsetPreact)({
            displayOptions,
            ...otherProps
        }, addBusyState);
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? options : undefined,
            addBusyState
        });
        const { value, userAssistanceDensity, ...checkboxsetRest } = checkboxsetProps;
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
            userAssistanceDensity
        });
        const memoizedSetValue = (0, hooks_1.useMemo)(() => (value ? new Set(value) : undefined), [value]);
        return ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxSet_1.CheckboxSet, { ref: checkboxsetRef, direction: direction, ...assistiveTextProps, ...checkboxsetRest, userAssistanceDensity: userAssistanceDensity, value: memoizedSetValue, children: dataArr.map(({ assistiveText, helpSourceLink, helpSourceText, label, value }) => ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxItem_1.CheckboxItem, { assistiveText: assistiveText, helpSourceLink: helpSourceLink, helpSourceText: helpSourceText, value: value, children: label }, value))) }));
    });
    let Checkboxset = class Checkboxset extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.checkboxSetRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render(props) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan || 1], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalCheckboxset, { ...props, busyContextRef: this.busyContextRef, ref: this.checkboxSetRef }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.checkboxSetRef.current?.reset();
        }
        showMessages() {
            this.checkboxSetRef.current?.showMessages();
        }
        validate() {
            return this.checkboxSetRef.current?.validate();
        }
        blur() {
            this.checkboxSetRef.current?.blur();
        }
        focus() {
            this.checkboxSetRef.current?.focus();
        }
    };
    exports.Checkboxset = Checkboxset;
    Checkboxset.defaultProps = {
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
        value: null
    };
    Checkboxset._metadata = { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "options": { "type": "Array<object>|DataProvider" }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "Array<any>|null", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    Checkboxset._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Checkboxset._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Checkboxset = Checkboxset = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-checkboxset')
    ], Checkboxset);
});
