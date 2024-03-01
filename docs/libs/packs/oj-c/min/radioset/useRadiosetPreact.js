define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRadiosetPreact = void 0;
    function useRadiosetPreact({ direction, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.radio_requiredMessageDetail();
        const { value, methods, textFieldProps } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
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
        return {
            methods,
            radiosetProps: {
                'aria-describedby': textFieldProps['aria-describedby'],
                isRequired: required,
                isReadonly: readonly,
                isDisabled: disabled,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages: textFieldProps['messages'],
                onCommit: textFieldProps['onCommit'],
                userAssistanceDensity,
                value
            }
        };
    }
    exports.useRadiosetPreact = useRadiosetPreact;
});
