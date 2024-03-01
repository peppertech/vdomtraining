define(["require", "exports", "oj-c/editable-value/utils/utils", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, utils_1, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputTextPreact = void 0;
    function useInputTextPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', converter, disabled, displayOptions, end, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, start, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
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
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        return {
            value,
            setValue,
            methods,
            inputTextProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasClearIcon,
                endContent: end,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: (0, utils_1.treatNull)(length?.max),
                maxLengthUnit: length?.countBy,
                placeholder,
                prefix: inputPrefix,
                startContent: start,
                suffix: inputSuffix,
                textAlign,
                userAssistanceDensity,
                virtualKeyboard,
                ...textFieldProps
            }
        };
    }
    exports.useInputTextPreact = useInputTextPreact;
});
