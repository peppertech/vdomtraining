define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../UNSAFE_useStaleIdentity/useStaleIdentity", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, useStaleIdentity_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValidators = exports.ValidationResult = void 0;
    exports.ValidationResult = {
        VALID: 'VALID',
        INVALID: 'INVALID',
        STALE: 'STALE'
    };
    function useValidators({ componentMessagingState, defaultValidState, deferredValidators = [], validators = [], addBusyState, onValidChanged }) {
        const [valid, setValid] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(defaultValidState, onValidChanged);
        const { setStaleIdentity } = (0, useStaleIdentity_1.useStaleIdentity)();
        (0, hooks_1.useLayoutEffect)(() => {
            if (defaultValidState !== undefined) {
                onValidChanged?.(defaultValidState);
            }
        }, []);
        const { addComponentMessage, clearAllComponentMessages, clearAllMessages, hasCustomErrorMessages, setComponentMessages } = componentMessagingState;
        const fullValidate = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { doNotClearMessagesCustom = false } = options;
            const hadCustomErrorMessages = hasCustomErrorMessages();
            setValid('pending');
            if (doNotClearMessagesCustom) {
                clearAllComponentMessages();
            }
            else {
                clearAllMessages();
            }
            if (validators.length === 0 && deferredValidators.length === 0) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
                return true;
            }
            function nonDeferredValidate(validator, value) {
                try {
                    const validateResult = validator.validate(value);
                    if (validateResult instanceof Promise) {
                        return validateResult.then(() => { }, (error) => (0, utils_1.createMessageFromError)(error));
                    }
                }
                catch (error) {
                    return (0, utils_1.createMessageFromError)(error);
                }
                return;
            }
            const errors = [];
            const maybeErrorsPromise = [];
            const deferredErrors = deferredValidate(value);
            if (deferredErrors !== undefined) {
                errors.push(...deferredErrors);
            }
            if (value !== null && value !== undefined) {
                for (const validator of validators) {
                    const maybeComponentMessageItem = nonDeferredValidate(validator, value);
                    if (maybeComponentMessageItem !== undefined) {
                        if (maybeComponentMessageItem instanceof Promise) {
                            maybeErrorsPromise.push(maybeComponentMessageItem);
                        }
                        else {
                            errors.push(maybeComponentMessageItem);
                        }
                    }
                }
            }
            if (!errors.length && !maybeErrorsPromise.length) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
                return true;
            }
            const hasSyncError = errors.length !== 0;
            if (hasSyncError) {
                setComponentMessages(errors);
                setValid('invalidShown');
            }
            if (!maybeErrorsPromise.length) {
                return !hasSyncError;
            }
            const resolver = addBusyState?.('running validation');
            const { isStale } = setStaleIdentity('useValidators-validate');
            let hasAsyncError = false;
            for (const asyncValidationResult of maybeErrorsPromise) {
                const maybeValidationError = await asyncValidationResult;
                if (maybeValidationError && !isStale()) {
                    addComponentMessage(maybeValidationError);
                    setValid('invalidShown');
                    hasAsyncError = true;
                }
            }
            if (!hasSyncError && !hasAsyncError && !isStale()) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
            }
            resolver?.();
            return !hasSyncError && !hasAsyncError;
        }, [
            addComponentMessage,
            clearAllComponentMessages,
            clearAllMessages,
            deferredValidators,
            validators
        ]);
        const deferredValidate = (0, hooks_1.useCallback)((value) => {
            const errors = [];
            for (const validator of deferredValidators) {
                try {
                    validator.validate(value);
                }
                catch (error) {
                    errors.push((0, utils_1.createMessageFromError)(error));
                }
            }
            if (errors.length) {
                return errors;
            }
            return undefined;
        }, [deferredValidators]);
        const validateValueOnInternalChange = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { isStale } = setStaleIdentity('useValidationLifeCycle-validateValueOnInternalChange');
            const resolver = addBusyState?.('running validateValueOnInternalChange');
            const validationResult = await fullValidate(value, options);
            resolver?.();
            if (isStale()) {
                return exports.ValidationResult.STALE;
            }
            return validationResult ? exports.ValidationResult.VALID : exports.ValidationResult.INVALID;
        }, [addBusyState, fullValidate]);
        const validateValueOnExternalChange = (0, hooks_1.useCallback)((value) => {
            const { clearAllMessages, setDeferredComponentMessages } = componentMessagingState;
            clearAllMessages();
            const maybeErrors = deferredValidate(value);
            if (maybeErrors) {
                setDeferredComponentMessages(maybeErrors);
                setValid('invalidHidden');
            }
            else {
                setValid('valid');
            }
            return exports.ValidationResult.VALID;
        }, [componentMessagingState, deferredValidate]);
        return (0, hooks_1.useMemo)(() => ({
            valid,
            setValid,
            deferredValidate,
            fullValidate,
            validateValueOnExternalChange,
            validateValueOnInternalChange
        }), [
            valid,
            deferredValidate,
            fullValidate,
            validateValueOnExternalChange,
            validateValueOnInternalChange
        ]);
    }
    exports.useValidators = useValidators;
});
