define(["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTextAreaAutosizePreact = void 0;
    function useTextAreaAutosizePreact({ autocomplete = 'on', autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maxRows, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
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
        return {
            value,
            setValue,
            methods,
            textAreaProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: length?.max ? length.max : undefined,
                maxLengthCounter: length?.counter,
                maxLengthUnit: length?.countBy,
                maxRows: maxRows === -1 ? undefined : maxRows,
                minRows: rows,
                placeholder,
                resize: resizeBehavior,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useTextAreaAutosizePreact = useTextAreaAutosizePreact;
});
