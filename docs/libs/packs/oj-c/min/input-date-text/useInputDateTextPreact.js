define(["require", "exports", "preact/hooks", "./useImplicitDateConverter", "./useImplicitDateRangeValidator", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, hooks_1, useImplicitDateConverter_1, useImplicitDateRangeValidator_1, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDateTextPreact = useInputDateTextPreact;
    function useInputDateTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
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
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: combinedValidators,
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
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
});
