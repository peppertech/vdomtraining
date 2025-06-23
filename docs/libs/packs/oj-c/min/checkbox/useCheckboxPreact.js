define(["require", "exports", "preact/hooks", "oj-c/hooks/UNSAFE_useEditableValue/index", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, hooks_1, index_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxPreact = useCheckboxPreact;
    function useCheckboxPreact({ ['aria-describedby']: ariaDescribedBy, disabled, displayOptions, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkbox_requiredMessageDetail();
        const deferredValidators = (0, hooks_1.useMemo)(() => {
            return [
                {
                    validate: (value) => {
                        if (required && value !== true) {
                            throw new Error(requiredMessageDetail);
                        }
                        return;
                    }
                }
            ];
        }, [requiredMessageDetail, required]);
        const { methods, onCommitValue, displayValue, refreshDisplayValue, textFieldProps } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy,
            defaultDisplayValue: false,
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
            const commitSucceeded = await onCommitValue(value);
            const newValue = commitSucceeded ? value : false;
            refreshDisplayValue(newValue);
        }, [onCommitValue, refreshDisplayValue]);
        const checkboxProps = {
            'aria-describedby': textFieldProps['aria-describedby'],
            isRequired: required,
            isReadonly: readonly,
            isDisabled: disabled,
            messages: textFieldProps.messages,
            onCommit: onCommitHandler,
            userAssistanceDensity,
            value: displayValue
        };
        return {
            methods,
            checkboxProps
        };
    }
});
