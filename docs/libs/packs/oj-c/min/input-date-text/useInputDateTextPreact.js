define(["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/utils/utils", "./useImplicitDateConverter", "./useImplicitDateRangeValidator"], function (require, exports, useEditableValue_1, utils_1, useImplicitDateConverter_1, useImplicitDateRangeValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDateTextPreact = void 0;
    function useInputDateTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, utils_1.treatNull)(min);
        const maxTreatNull = (0, utils_1.treatNull)(max);
        const converter = (0, useImplicitDateConverter_1.useImplicitDateConverter)({
            converter: propConverter
        });
        const implicitComponentValidator = (0, useImplicitDateRangeValidator_1.useImplicitDateRangeValidator)({
            formatObj: converter,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            max: maxTreatNull,
            min: minTreatNull
        });
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            implicitComponentValidator,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
            value,
            setValue,
            methods,
            inputTextProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useInputDateTextPreact = useInputDateTextPreact;
});
