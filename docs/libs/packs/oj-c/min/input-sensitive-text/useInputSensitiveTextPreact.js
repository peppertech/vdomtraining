define(["require", "exports", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/hooks/UNSAFE_useEditableValue/index"], function (require, exports, useDeferredValidators_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputSensitiveTextPreact = useInputSensitiveTextPreact;
    function useInputSensitiveTextPreact({ autofocus, clearIcon = 'never', disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maskIcon, maskIconLabel, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
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
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        const hasRevealToggle = maskIcon === 'hidden' ? 'never' : 'always';
        return {
            methods,
            inputSensitiveTextProps: {
                ...textFieldProps,
                autoFocus: autofocus,
                hasClearIcon,
                hasRevealToggle,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: (0, index_1.treatNull)(length?.max),
                maxLengthUnit: length?.countBy,
                placeholder,
                revealToggleLabel: maskIconLabel,
                textAlign,
                userAssistanceDensity,
                virtualKeyboard
            }
        };
    }
});
