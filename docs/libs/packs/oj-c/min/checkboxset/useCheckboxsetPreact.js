define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "preact/hooks", "oj-c/editable-value/UNSAFE_useValidators/useValidators"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, hooks_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxsetPreact = void 0;
    function useCheckboxsetPreact({ 'aria-describedby': ariaDescribedBy, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkboxSet_requiredMessageDetail();
        const { methods, onCommitValue, setDisplayValue, displayValue, textFieldProps } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy,
            disabled,
            displayOptions,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const valueAsArray = value ? Array.from(value) : null;
            const validationResult = await onCommitValue(valueAsArray);
            const newValue = validationResult === useValidators_1.ValidationResult.INVALID ? null : valueAsArray;
            setDisplayValue(newValue);
        }, [onCommitValue]);
        return {
            methods,
            checkboxsetProps: {
                'aria-describedby': textFieldProps['aria-describedby'],
                isRequired: required,
                isReadonly: readonly,
                isDisabled: disabled,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages: textFieldProps.messages,
                onCommit: onCommitHandler,
                userAssistanceDensity,
                value: displayValue
            }
        };
    }
    exports.useCheckboxsetPreact = useCheckboxsetPreact;
});
