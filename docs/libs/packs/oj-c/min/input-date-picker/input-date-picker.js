define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_InputDatePicker", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojvcomponent", "preact/compat", "./useInputDatePicker", "css!oj-c/input-date-picker/input-date-picker-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_InputDatePicker_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, ojvcomponent_1, compat_1, useInputDatePicker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDatePicker = void 0;
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
    function InputDatePickerImpl({ columnSpan = 1, daysOutsideMonth = 'hidden', disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, messagesCustom = messagesCustomDefault, monthAndYearPicker = 'on', required = false, todayButton = 'visible', validators = validatorsDefault, value = null, weekDisplay = 'none', ...otherProps }, ref) {
        const { formContextValue, inputDatePickerProps, rootProps } = (0, useInputDatePicker_1.useInputDatePicker)({
            columnSpan,
            daysOutsideMonth,
            disabled,
            displayOptions,
            help,
            helpHints,
            messagesCustom,
            monthAndYearPicker,
            required,
            todayButton,
            validators,
            value,
            weekDisplay,
            ...otherProps
        }, ref);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...rootProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: formContextValue, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputDatePicker_1.InputDatePicker, { ...inputDatePickerProps }) }) }));
    }
    exports.InputDatePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-date-picker', (0, compat_1.forwardRef)(InputDatePickerImpl), "InputDatePicker", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "function" }, "dateRangeUnderflowMessageDetail": { "type": "function" }, "dateRestrictionMessageDetail": { "type": "function" }, "dayFormatter": { "type": "function" }, "daysOutsideMonth": { "type": "string", "enumValues": ["hidden", "selectable"] }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "monthAndYearPicker": { "type": "string", "enumValues": ["off", "on"] }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "todayTimeZone": { "type": "string" }, "todayButton": { "type": "string", "enumValues": ["hidden", "visible"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "weekDisplay": { "type": "string", "enumValues": ["number", "none"] }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "daysOutsideMonth": "hidden", "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "monthAndYearPicker": "on", "required": false, "todayButton": "visible", "validators": [], "value": null, "weekDisplay": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
