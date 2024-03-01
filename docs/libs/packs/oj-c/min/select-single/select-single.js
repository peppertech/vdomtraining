var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_SelectSingle", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useSelectSinglePreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/select-single/select-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_SelectSingle_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useSelectSinglePreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
    const FunctionalSelectSingle = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints } = props;
        const selectSingleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-select-single id=${props.id}: ${desc}`
            });
        }, [busyContextRef, props.id]);
        const { selectSingleProps, methods, _doAdvancedSearchAction, _selectItemByValue } = (0, useSelectSinglePreact_1.useSelectSinglePreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectSingleRef.current?.blur(),
            focus: () => selectSingleRef.current?.focus(),
            _doAdvancedSearchAction,
            _selectItemByValue,
            ...methods
        }), [methods, _doAdvancedSearchAction, _selectItemByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectSingleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_SelectSingle_1.SelectSingle, { ref: selectSingleRef, ...assistiveTextProps, ...selectSingleProps, variant: variant }));
    });
    let SelectSingle = class SelectSingle extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.selectSingleRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalSelectSingle, { busyContextRef: this.busyContextRef, ref: this.selectSingleRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.selectSingleRef.current?.reset();
        }
        showMessages() {
            this.selectSingleRef.current?.showMessages();
        }
        validate() {
            return this.selectSingleRef.current?.validate();
        }
        blur() {
            this.selectSingleRef.current?.blur();
        }
        focus() {
            this.selectSingleRef.current?.focus();
        }
        _doAdvancedSearchAction(searchText) {
            return this.selectSingleRef.current?._doAdvancedSearchAction(searchText);
        }
        _selectItemByValue(value) {
            return this.selectSingleRef.current?._selectItemByValue(value);
        }
    };
    exports.SelectSingle = SelectSingle;
    SelectSingle.defaultProps = {
        advancedSearch: 'off',
        columnSpan: 1,
        data: null,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: null,
        valueItem: null,
        virtualKeyboard: 'auto'
    };
    SelectSingle._metadata = { "properties": { "advancedSearch": { "type": "string", "enumValues": ["off", "on"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "any", "writeback": true }, "valueItem": { "type": "object|null", "properties": { "data": { "type": "any" }, "key": { "type": "any" }, "metadata": { "type": "object", "properties": { "indexFromParent": { "type": "number" }, "isLeaf": { "type": "boolean" }, "key": { "type": "any" }, "message": { "type": "object", "properties": { "detail": { "type": "string" }, "severity": { "type": "string|number" }, "summary": { "type": "string" } } }, "parentKey": { "type": "any" }, "suggestion": { "type": "object" }, "treeDepth": { "type": "number" } } } }, "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "events": { "ojAdvancedSearchAction": {}, "ojValueAction": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItem"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {}, "_doAdvancedSearchAction": {}, "_selectItemByValue": {} } };
    SelectSingle._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    SelectSingle._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.SelectSingle = SelectSingle = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-select-single')
    ], SelectSingle);
});
