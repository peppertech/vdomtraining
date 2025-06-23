define(["require", "exports", "preact/hooks", "../UNSAFE_useComponentMessaging/useComponentMessaging", "../UNSAFE_useDeferredValidators/useDeferredValidators", "../UNSAFE_useValidationLifecycle/useValidationLifecycle", "../UNSAFE_useValidators/useValidators", "../UNSAFE_useValueRawValueObject/useValueRawValueObject", "../UNSAFE_useValueRawValueObjectLifecycle/useValueRawValueObjectLifecycle", "../UNSAFE_useConverterObject/useConverterObject"], function (require, exports, hooks_1, useComponentMessaging_1, useDeferredValidators_1, useValidationLifecycle_1, useValidators_1, useValueRawValueObject_1, useValueRawValueObjectLifecycle_1, useConverterObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValueRawValueObject = void 0;
    function useEditableValueRawValueObject({ ariaDescribedBy, converter, disabled, displayOptions, implicitComponentValidator, labelHint, messagesCustom, readonly, required, requiredMessageDetail, validators, value: valueProp, addBusyState, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, onTransientValueChanged, wrapValueState }) {
        const componentMessagingState = (0, useComponentMessaging_1.useComponentMessaging)({
            messagesCustom,
            onMessagesCustomChanged
        });
        const { clearAllMessages, visibleMessages } = componentMessagingState;
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const combinedValidators = !implicitComponentValidator
            ? validators
            : validators
                ? [implicitComponentValidator, ...validators]
                : [implicitComponentValidator];
        const validationState = (0, useValidators_1.useValidators)({
            componentMessagingState,
            defaultValidState: 'valid',
            deferredValidators,
            validators: combinedValidators,
            addBusyState,
            onValidChanged
        });
        const { validateValueOnExternalChange, validateValueOnInternalChange } = validationState;
        const { format, parse } = (0, useConverterObject_1.useConverterObject)({
            componentMessagingState,
            converter,
            validationState
        });
        const defaultValueState = (0, useValueRawValueObject_1.useValueRawValueObject)({
            value: valueProp,
            format,
            parse,
            onRawValueChanged,
            onTransientValueChanged,
            onValueChanged
        });
        const valueState = wrapValueState ? wrapValueState(defaultValueState) : defaultValueState;
        const { displayValue, value, getValueForValidation, setValueAfterValidation, refreshDisplayValue, setDisplayValue, setTransientValue, setValue } = valueState;
        (0, useValidationLifecycle_1.useValidationLifecycle)({
            componentMessagingState,
            validationState,
            deferredValidators,
            validators,
            getValueForValidation,
            setValueAfterValidation,
            readonly,
            disabled
        });
        (0, useValueRawValueObjectLifecycle_1.useValueRawValueObjectLifecycle)({
            value: valueProp,
            format,
            parse,
            valueState,
            validateValueOnExternalChange
        });
        const onCommitValue = (0, hooks_1.useCallback)(async (value, doCommitOnValid = true) => {
            const validationResult = await validateValueOnInternalChange(value);
            if (validationResult === useValidators_1.ValidationResult.VALID && doCommitOnValid) {
                setValue(value);
            }
            return validationResult;
        }, [validateValueOnInternalChange]);
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            if (value === '' || value === null) {
                throw new Error('cannot commit an empty string or null');
            }
            const parsedValueOrSymbol = parse(value);
            if (parsedValueOrSymbol === useConverterObject_1.ConverterErrorSymbol) {
                return;
            }
            const parsedValue = parsedValueOrSymbol;
            const validationResult = await onCommitValue(parsedValue);
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                const formatted = format(parsedValue);
                setDisplayValue(formatted);
            }
        }, [onCommitValue, format, parse]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            if (value === '' || value === null) {
                throw new Error('cannot get an empty string or null in onInput');
            }
            setDisplayValue(value);
        }, []);
        const reset = (0, hooks_1.useCallback)(() => {
            clearAllMessages();
            validateValueOnExternalChange(value);
            refreshDisplayValue();
        }, [value, clearAllMessages, refreshDisplayValue, validateValueOnExternalChange]);
        const validate = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled) {
                return 'valid';
            }
            const { fullValidate } = validationState;
            const { displayValue, value, setValueAfterValidation } = valueState;
            const newValueOrSymbol = parse(displayValue);
            if (newValueOrSymbol === useConverterObject_1.ConverterErrorSymbol) {
                return 'invalid';
            }
            const newValue = newValueOrSymbol;
            const resolver = addBusyState?.('running component method validate');
            const validateResult = await fullValidate(newValue);
            resolver?.();
            if (validateResult) {
                if (newValue !== value) {
                    setValueAfterValidation(newValue);
                }
                return 'valid';
            }
            return 'invalid';
        }, [parse, validationState, valueState, addBusyState, readonly, disabled]);
        const showMessages = (0, hooks_1.useCallback)(() => {
            const { hasHiddenMessages, showHiddenMessages } = componentMessagingState;
            const { setValid } = validationState;
            if (hasHiddenMessages()) {
                showHiddenMessages();
                setValid('invalidShown');
            }
        }, [componentMessagingState, validationState]);
        return {
            value,
            setValue,
            displayValue,
            setDisplayValue,
            setTransientValue,
            methods: {
                reset,
                validate,
                showMessages
            },
            textFieldProps: {
                messages: displayOptions?.messages !== 'none' ? visibleMessages : undefined,
                value: displayValue,
                'aria-describedby': ariaDescribedBy,
                onCommit,
                onInput
            },
            onCommitValue
        };
    }
    exports.useEditableValueRawValueObject = useEditableValueRawValueObject;
});
