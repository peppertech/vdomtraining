define(["require", "exports", "preact/hooks", "./converterUtils", "./utils", "oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity", "./reducer", "./validationUtils"], function (require, exports, hooks_1, converterUtils_1, utils_1, useStaleIdentity_1, reducer_1, validationUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValue = useEditableValue;
    function useEditableValue({ addBusyState, ariaDescribedBy, converter, defaultDisplayValue, deferredValidators, disabled, displayOptions, messagesCustom, onDisplayValueChanged, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged: propOnValidChanged, onValueChanged, translateConverterParseError, readonly, validators, value }) {
        const initialRender = (0, hooks_1.useRef)(true);
        const { setStaleIdentity } = (0, useStaleIdentity_1.useStaleIdentity)();
        const [state, dispatch] = (0, hooks_1.useReducer)((reducer_1.reducer), {
            shownMessages: [],
            hiddenMessages: [],
            customMessages: messagesCustom,
            componentMessages: [],
            value: value,
            valid: 'pending'
        }, (args) => {
            const conversion = converter
                ? (0, converterUtils_1.format)(value, defaultDisplayValue, converter)
                : { result: 'success', value: (0, utils_1.treatNull)(value, defaultDisplayValue) };
            return {
                ...args,
                displayValue: conversion.result === 'success' ? conversion.value : defaultDisplayValue
            };
        });
        const currentValidRef = (0, hooks_1.useRef)();
        const onValidChanged = (0, hooks_1.useCallback)((newValid) => {
            if (newValid !== currentValidRef.current) {
                currentValidRef.current = newValid;
                propOnValidChanged?.(newValid);
            }
        }, [propOnValidChanged]);
        const _dispatch = (0, hooks_1.useCallback)((updateFn, payload) => {
            updateFn(dispatch, payload, {
                onMessagesCustomChanged,
                onRawValueChanged,
                onTransientValueChanged,
                onValidChanged,
                onValueChanged
            });
            return true;
        }, [
            dispatch,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged
        ]);
        const validateDeferredSync = (0, hooks_1.useCallback)((value) => {
            const valueToSendToDeferredValidation = typeof value === 'string' ? value.trim() : value;
            const deferredValidate = (0, validationUtils_1.validateSync)({
                validators: deferredValidators ?? [],
                value: valueToSendToDeferredValidation
            });
            return deferredValidate;
        }, [deferredValidators]);
        const setValue = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.updateValue, value);
        }, [_dispatch]);
        const setDisplayValue = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.updateDisplayValue, value);
        }, [_dispatch]);
        const setTransientValue = (0, hooks_1.useCallback)((transientValue) => {
            _dispatch(reducer_1.updateTransientValue, transientValue);
        }, [_dispatch]);
        const formatValue = (0, hooks_1.useCallback)((value) => {
            let newDisplayValue;
            if (!converter) {
                newDisplayValue = (0, utils_1.treatNull)(value, defaultDisplayValue);
            }
            else {
                const conversion = (0, converterUtils_1.format)(value, defaultDisplayValue, converter);
                if (conversion.result === 'failure') {
                    _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                    _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                    newDisplayValue = (0, utils_1.treatNull)(value, defaultDisplayValue);
                }
                else {
                    newDisplayValue = conversion.value;
                }
            }
            return newDisplayValue;
        }, [converter, defaultDisplayValue, _dispatch]);
        const refreshDisplayValue = (0, hooks_1.useCallback)((value) => {
            const newDisplayValue = formatValue(value);
            _dispatch(reducer_1.updateDisplayValue, newDisplayValue);
            onDisplayValueChanged?.();
            return true;
        }, [_dispatch, formatValue, onDisplayValueChanged]);
        const getValueForValidation = (0, hooks_1.useCallback)(() => {
            if (state.valid !== 'invalidShown') {
                return { result: 'success', value: state.value };
            }
            if (!converter) {
                return { result: 'success', value: (0, utils_1.normalizeValue)(state.displayValue) };
            }
            return (0, converterUtils_1.parse)((0, utils_1.normalizeValue)(state.displayValue), converter, translateConverterParseError);
        }, [converter, state.displayValue, state.valid, state.value, translateConverterParseError]);
        const normalizeAndParseValue = (0, hooks_1.useCallback)((value) => {
            if (!converter) {
                return {
                    result: 'success',
                    value: (0, utils_1.normalizeValue)(value)
                };
            }
            return (0, converterUtils_1.parse)((0, utils_1.normalizeValue)(value), converter, translateConverterParseError);
        }, [converter, translateConverterParseError]);
        const parseValue = (0, hooks_1.useCallback)((value) => {
            const conversion = normalizeAndParseValue(value);
            if (conversion.result === 'failure') {
                _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            }
            return conversion;
        }, [_dispatch, normalizeAndParseValue]);
        const fullValidate = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { doNotClearMessagesCustom = false } = options;
            const hasCustomErrorMessages = doNotClearMessagesCustom && (0, utils_1.hasErrorMessages)(messagesCustom);
            if (doNotClearMessagesCustom) {
                _dispatch(reducer_1.updateComponentMessages, []);
                _dispatch(reducer_1.updateHiddenMessages, []);
            }
            else {
                _dispatch(reducer_1.clearAllMessages);
            }
            if ((!validators || validators.length === 0) &&
                (!deferredValidators || deferredValidators.length === 0)) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
                return true;
            }
            const errors = [];
            const deferredValidate = validateDeferredSync(value);
            deferredValidate.result === 'failure' && errors.push(...deferredValidate.errors);
            let nonDeferredValidate = undefined;
            if (value !== null && value !== undefined) {
                nonDeferredValidate = (0, validationUtils_1.validateAsync)({ validators: validators ?? [], value });
            }
            errors.push(...(nonDeferredValidate?.errors ?? []));
            const maybeErrorPromises = nonDeferredValidate?.maybeErrorPromises ?? [];
            if (!errors.length && !maybeErrorPromises.length) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
                return true;
            }
            const hasSyncError = errors.length !== 0;
            hasSyncError &&
                _dispatch(reducer_1.updateComponentMessages, errors) &&
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            if (!maybeErrorPromises.length) {
                return !hasSyncError;
            }
            !hasSyncError && _dispatch(reducer_1.updateValidStatus, 'pending');
            const resolver = addBusyState?.('running asynchronous validation');
            const { isStale } = setStaleIdentity('useEditableValue-full-validate');
            let hasAsyncError = false;
            const asyncValidations = [];
            for (const maybeErrorPromise of maybeErrorPromises) {
                const asyncValidation = maybeErrorPromise.then((maybeValidationError) => {
                    if (maybeValidationError && !isStale()) {
                        _dispatch(reducer_1.addComponentMessage, maybeValidationError);
                        _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                        hasAsyncError = true;
                    }
                });
                asyncValidations.push(asyncValidation);
            }
            await Promise.all(asyncValidations);
            if (!hasSyncError && !hasAsyncError && !isStale()) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
            }
            resolver?.();
            return !hasSyncError && !hasAsyncError;
        }, [
            addBusyState,
            _dispatch,
            deferredValidators,
            messagesCustom,
            setStaleIdentity,
            validateDeferredSync,
            validators
        ]);
        const runFullValidationAndUpdateValue = async () => {
            if (disabled || readonly)
                return;
            const conversion = getValueForValidation();
            if (conversion.result === 'failure') {
                _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                return;
            }
            const newValue = conversion.value;
            const validated = await validateValueOnInternalChange(newValue, {
                doNotClearMessagesCustom: true
            });
            validated && _dispatch(reducer_1.updateValue, newValue) && refreshDisplayValue(newValue);
        };
        const validateValueOnExternalChange = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.clearAllMessages);
            const validated = validateDeferredSync(value);
            validated.result === 'failure' && _dispatch(reducer_1.updateHiddenMessages, validated.errors);
            _dispatch(reducer_1.updateValidStatus, validated.result === 'failure' ? 'invalidHidden' : 'valid');
            return true;
        }, [_dispatch, validateDeferredSync]);
        const validateValueOnInternalChange = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { isStale } = setStaleIdentity('useEditableValue-validateValueOnInternalChange');
            const resolver = addBusyState?.('Running validateValueOnInternalChange');
            const validationResult = await fullValidate(value, options);
            resolver?.();
            if (isStale()) {
                return false;
            }
            return validationResult;
        }, [addBusyState, fullValidate, setStaleIdentity]);
        const onCommitValue = (0, hooks_1.useCallback)(async (value, doCommitOnValid = true) => {
            const validated = await validateValueOnInternalChange(value);
            validated && doCommitOnValid && _dispatch(reducer_1.updateValue, value);
            return validated;
        }, [_dispatch, validateValueOnInternalChange]);
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            const conversion = parseValue(value);
            if (conversion.result === 'failure') {
                return false;
            }
            const parsedValue = conversion.value;
            const succeeded = await onCommitValue(parsedValue);
            succeeded && refreshDisplayValue(parsedValue);
            return succeeded;
        }, [onCommitValue, parseValue, refreshDisplayValue]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            _dispatch(reducer_1.updateDisplayValue, value ?? defaultDisplayValue);
        }, [_dispatch, defaultDisplayValue]);
        const validate = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled) {
                return 'valid';
            }
            const conversion = parseValue(state.displayValue);
            if (conversion.result === 'failure') {
                return 'invalid';
            }
            const newValue = conversion.value;
            const resolver = addBusyState?.('Running component method validate');
            const validated = await fullValidate(newValue);
            resolver?.();
            if (validated) {
                if (newValue !== state.value) {
                    _dispatch(reducer_1.updateValue, newValue);
                    refreshDisplayValue(newValue);
                }
                return 'valid';
            }
            return 'invalid';
        }, [
            addBusyState,
            disabled,
            _dispatch,
            fullValidate,
            parseValue,
            readonly,
            refreshDisplayValue,
            state.displayValue,
            state.value
        ]);
        const reset = (0, hooks_1.useCallback)(() => {
            validateValueOnExternalChange(state.value);
            refreshDisplayValue(state.value);
        }, [refreshDisplayValue, state.value, validateValueOnExternalChange]);
        const showMessages = (0, hooks_1.useCallback)(() => {
            if (state.hiddenMessages && state.hiddenMessages.length > 0) {
                _dispatch(reducer_1.showHiddenMessages);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            }
        }, [_dispatch, state.hiddenMessages]);
        if (!initialRender.current && state.previousValue !== value) {
            _dispatch(reducer_1.updatePreviousValue, value);
            if (value !== state.value) {
                validateValueOnExternalChange(value);
                _dispatch(reducer_1.updateValue, value);
                refreshDisplayValue(value);
            }
        }
        if (!initialRender.current && state.previousConverter !== converter) {
            _dispatch(reducer_1.updatePreviousConverter, converter);
            state.valid !== 'invalidShown' && refreshDisplayValue(value);
            state.valid === 'invalidShown' && runFullValidationAndUpdateValue();
        }
        if (!initialRender.current && state.previousValidators !== validators) {
            _dispatch(reducer_1.updatePreviousValidators, validators);
            state.valid === 'invalidShown' && runFullValidationAndUpdateValue();
        }
        if (!initialRender.current &&
            ((!state.customMessages && messagesCustom) ||
                (state.customMessages && !messagesCustom) ||
                (state.customMessages &&
                    messagesCustom &&
                    !(0, utils_1.isShallowEqual)(state.customMessages, messagesCustom)))) {
            const compMsgs = state.componentMessages ?? [];
            const hiddenMsgs = state.hiddenMessages ?? [];
            const customMsgs = messagesCustom ?? [];
            const hasErrors = (0, utils_1.hasErrorMessages)(customMsgs);
            const hasHiddenMessages = hiddenMsgs.length > 0;
            const hasNoMessages = compMsgs.length === 0 && hiddenMsgs.length === 0 && customMsgs.length === 0;
            _dispatch(reducer_1.updateCustomMessages, customMsgs);
            hasErrors && _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            !hasErrors &&
                state.valid !== 'pending' &&
                ((hasNoMessages && _dispatch(reducer_1.updateValidStatus, 'valid')) ||
                    (hasHiddenMessages && _dispatch(reducer_1.updateValidStatus, 'invalidHidden')));
        }
        if (!initialRender.current &&
            (state.previousDeferredValidators !== deferredValidators ||
                state.previousDisabled !== disabled ||
                state.previousReadonly !== readonly)) {
            const isRequiredToggledToFalse = deferredValidators?.length === 0;
            state.previousDeferredValidators !== deferredValidators &&
                _dispatch(reducer_1.updatePreviousDeferredValidators, deferredValidators);
            state.previousDisabled !== disabled && _dispatch(reducer_1.updatePreviousDisabled, disabled);
            state.previousReadonly !== readonly && _dispatch(reducer_1.updatePreviousReadonly, readonly);
            if (isRequiredToggledToFalse || (!readonly && !disabled)) {
                switch (state.valid) {
                    case 'valid':
                        const conversion = getValueForValidation();
                        if (conversion.result === 'failure') {
                            _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                            _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                        }
                        else {
                            const deferredValidate = validateDeferredSync(conversion.value);
                            deferredValidate.result === 'failure' &&
                                _dispatch(reducer_1.updateHiddenMessages, deferredValidate.errors) &&
                                _dispatch(reducer_1.updateValidStatus, 'invalidHidden');
                        }
                        break;
                    case 'invalidHidden':
                        if (deferredValidators?.length === 0) {
                            _dispatch(reducer_1.updateValidStatus, 'valid');
                            _dispatch(reducer_1.updateHiddenMessages, []);
                        }
                        break;
                    case 'invalidShown':
                        runFullValidationAndUpdateValue();
                        break;
                }
            }
        }
        if (initialRender.current) {
            initialRender.current = false;
        }
        (0, hooks_1.useEffect)(() => {
            _dispatch(reducer_1.updatePreviousValue, value);
            _dispatch(reducer_1.updatePreviousConverter, converter);
            _dispatch(reducer_1.updatePreviousValidators, validators);
            _dispatch(reducer_1.updatePreviousDeferredValidators, deferredValidators);
            _dispatch(reducer_1.updatePreviousDisabled, disabled);
            _dispatch(reducer_1.updatePreviousReadonly, readonly);
            _dispatch(reducer_1.updateCustomMessages, messagesCustom);
            _dispatch(reducer_1.updateTransientValue, value);
            if (!disabled && !readonly) {
                const validated = validateDeferredSync(value);
                validated.result === 'failure' &&
                    _dispatch(reducer_1.updateHiddenMessages, validated.errors) &&
                    _dispatch(reducer_1.updateValidStatus, (0, utils_1.hasErrorMessages)(messagesCustom) ? 'invalidShown' : 'invalidHidden');
                validated.result === 'success' &&
                    _dispatch(reducer_1.updateValidStatus, (0, utils_1.hasErrorMessages)(messagesCustom) ? 'invalidShown' : 'valid') &&
                    refreshDisplayValue(value);
            }
            else {
                _dispatch(reducer_1.updateValidStatus, 'valid');
                refreshDisplayValue(value);
            }
        }, []);
        return {
            value: state.value,
            displayValue: state.displayValue,
            formatValue,
            methods: {
                reset,
                showMessages,
                validate
            },
            onCommitValue,
            parseValue,
            refreshDisplayValue,
            setDisplayValue,
            setTransientValue,
            setValue,
            textFieldProps: {
                'aria-describedby': ariaDescribedBy,
                messages: displayOptions?.messages !== 'none' ? state.shownMessages : undefined,
                onCommit,
                onInput,
                value: state.displayValue
            },
            validateValueOnExternalChange
        };
    }
});
