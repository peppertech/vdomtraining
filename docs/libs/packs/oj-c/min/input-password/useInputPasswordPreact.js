define(["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputPasswordPreact = void 0;
    function useInputPasswordPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', disabled, displayOptions, labelEdge, labelHint, labelStartWidth, maskIcon, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
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
        const hasRevealToggle = maskIcon === 'hidden' ? 'never' : 'always';
        return {
            value,
            setValue,
            methods,
            inputPasswordProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasClearIcon: hasClearIcon,
                hasRevealToggle,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge: labelEdge,
                labelStartWidth,
                placeholder,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useInputPasswordPreact = useInputPasswordPreact;
});
