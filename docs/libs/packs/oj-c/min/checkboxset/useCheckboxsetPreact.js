define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "preact/hooks", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, hooks_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxsetPreact = useCheckboxsetPreact;
    function useCheckboxsetPreact({ 'aria-describedby': ariaDescribedBy, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkboxSet_requiredMessageDetail();
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, displayValue, onCommitValue, refreshDisplayValue, textFieldProps } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy,
            defaultDisplayValue: null,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            value: propValue
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const valueAsArray = value ? Array.from(value) : null;
            const commitSuccessful = await onCommitValue(valueAsArray);
            const newValue = commitSuccessful ? valueAsArray : null;
            refreshDisplayValue(newValue);
        }, [onCommitValue, refreshDisplayValue]);
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
});
