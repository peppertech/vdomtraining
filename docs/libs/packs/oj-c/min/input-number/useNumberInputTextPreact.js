define(["require", "exports", "preact/hooks", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "./useImplicitNumberConverter", "./useImplicitNumberRangeValidator", "preact/hooks", "./stepBasisUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "ojs/ojconverter-nativenumber"], function (require, exports, hooks_1, index_1, useDeferredValidators_1, useImplicitNumberConverter_1, useImplicitNumberRangeValidator_1, hooks_2, stepBasisUtils_1, UNSAFE_useTranslationBundle_1, ojconverter_nativenumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNumberInputTextPreact = useNumberInputTextPreact;
    function useNumberInputTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, disabled, displayOptions, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail, placeholder, readonly, required, requiredMessageDetail, step, stepperVariant, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
        const converter = (0, useImplicitNumberConverter_1.useImplicitNumberConverter)({
            converter: propConverter
        });
        const implicitComponentValidator = (0, useImplicitNumberRangeValidator_1.useImplicitNumberRangeValidator)({
            converter,
            max: maxTreatNull,
            min: minTreatNull,
            numberRangeExactMessageDetail,
            numberRangeOverflowMessageDetail,
            numberRangeUnderflowMessageDetail
        });
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const converterParseError = translations.inputNumber_converterParseError();
        const translateConverterParseError = (0, hooks_2.useCallback)((error) => {
            return error?.cause === ojconverter_nativenumber_1.USER_INPUT_ERROR
                ? { severity: 'error', detail: converterParseError }
                : undefined;
        }, [converterParseError]);
        const { onCommitValue, formatValue, parseValue, methods, textFieldProps, value, setValue, displayValue, setDisplayValue, setTransientValue } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            translateConverterParseError,
            validators: combinedValidators,
            value: propValue
        });
        const hasMin = minTreatNull !== undefined;
        const hasMax = maxTreatNull !== undefined;
        const isValidating = (0, hooks_2.useRef)(false);
        const stepQueue = (0, hooks_2.useRef)(new Array());
        const currentDisplayValueInStep = (0, hooks_2.useRef)(displayValue);
        const initialValue = (0, hooks_2.useRef)((0, index_1.treatNull)(propValue));
        if (propValue !== value) {
            initialValue.current = (0, index_1.treatNull)(propValue);
        }
        const [valueNow, setValueNow] = (0, hooks_2.useState)((0, index_1.treatNull)(value));
        const [prevValue, setPrevValue] = (0, hooks_2.useState)(value);
        if (value !== prevValue) {
            setPrevValue(value);
            setValueNow((0, index_1.treatNull)(value));
            setTransientValue(value);
        }
        const [hasUncommittedDisplayValue, setHasUncommittedDisplayValue] = (0, hooks_2.useState)(false);
        currentDisplayValueInStep.current = displayValue;
        const onCommit = (0, hooks_2.useCallback)(async ({ value }) => {
            setHasUncommittedDisplayValue(false);
            const conversion = parseValue(value);
            if (conversion.result === 'failure') {
                setValueNow(undefined);
                return;
            }
            const parsedValue = conversion.value;
            const commitSucceeded = await onCommitValue(parsedValue);
            if (commitSucceeded) {
                const formattedValue = formatValue(parsedValue);
                setDisplayValue(formattedValue);
            }
            else {
                setValueNow(parsedValue ?? undefined);
            }
        }, [formatValue, parseValue, onCommitValue, setDisplayValue]);
        const onInput = (0, hooks_2.useCallback)(({ value }) => {
            setDisplayValue(value ?? '');
            setHasUncommittedDisplayValue(true);
        }, [setDisplayValue]);
        const textFieldPropsWithOverride = { ...textFieldProps, onCommit, onInput };
        const doStep = (0, hooks_2.useCallback)(async (direction, doCommit) => {
            if (step === undefined || isValidating.current) {
                return;
            }
            const displayValueToStep = currentDisplayValueInStep.current || '0';
            const conversion = parseValue(displayValueToStep);
            if (conversion.result === 'failure') {
                return;
            }
            const parsedValue = conversion.value;
            let newSteppedValue;
            if (direction !== undefined) {
                const stepValue = direction === 'increase' ? step : -1 * step;
                newSteppedValue = (0, stepBasisUtils_1.determineSteppedValue)(stepValue, step, parsedValue, initialValue.current, maxTreatNull, minTreatNull);
            }
            else {
                newSteppedValue = parsedValue;
            }
            isValidating.current = true;
            const formattedValue = formatValue(newSteppedValue);
            setDisplayValue(formattedValue);
            currentDisplayValueInStep.current = formattedValue;
            const commitSucceeded = await onCommitValue(newSteppedValue, doCommit);
            const isSpinning = doCommit === false;
            const valueCommitted = doCommit && commitSucceeded;
            if (isSpinning && commitSucceeded) {
                setTransientValue(newSteppedValue);
            }
            if (!valueCommitted) {
                setValueNow(newSteppedValue);
            }
            isValidating.current = false;
        }, [
            formatValue,
            maxTreatNull,
            minTreatNull,
            parseValue,
            onCommitValue,
            setDisplayValue,
            setTransientValue,
            step
        ]);
        const processStepQueue = (0, hooks_2.useCallback)(async (direction) => {
            await doStep(direction, true);
            if (stepQueue.current.length > 0) {
                const direction = stepQueue.current.shift();
                processStepQueue(direction);
            }
        }, [doStep]);
        const handleStep = (0, hooks_2.useCallback)(async ({ direction }) => {
            if (isValidating.current) {
                stepQueue.current.push(direction);
            }
            else {
                processStepQueue(direction);
            }
        }, [processStepQueue]);
        const handleSpin = (0, hooks_2.useCallback)(async ({ direction }) => {
            const doCommit = false;
            stepQueue.current = [];
            doStep(direction, doCommit);
        }, [doStep]);
        const handleSpinComplete = (0, hooks_2.useCallback)(async () => {
            const conversion = parseValue(currentDisplayValueInStep.current);
            if (conversion.result === 'failure') {
                return;
            }
            await onCommitValue(conversion.value);
        }, [onCommitValue, parseValue]);
        const lastValueNow = (0, hooks_2.useRef)();
        const lastDisplayValue = (0, hooks_2.useRef)();
        const lastHasUncommittedDisplayValue = (0, hooks_2.useRef)();
        const lastValueText = (0, hooks_2.useRef)();
        let valueText;
        if (hasUncommittedDisplayValue !== lastHasUncommittedDisplayValue.current ||
            displayValue !== lastDisplayValue.current ||
            valueNow !== lastValueNow.current) {
            valueText = calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, formatValue);
            lastHasUncommittedDisplayValue.current = hasUncommittedDisplayValue;
            lastDisplayValue.current = displayValue;
            lastValueNow.current = valueNow;
            lastValueText.current = valueText;
        }
        else {
            valueText = lastValueText.current;
        }
        const normalizedVirtualKeyboard = virtualKeyboard === 'auto' ? (0, index_1.getVirtualKeyboardHintFromConverter)(converter) : virtualKeyboard;
        return {
            value,
            setValue,
            methods,
            inputNumberProps: {
                'aria-valuemax': maxTreatNull,
                'aria-valuemin': minTreatNull,
                'aria-valuenow': valueNow ?? undefined,
                'aria-valuetext': valueText,
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasSteppers: step !== undefined && step > 0,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || (0, index_1.treatNull)(value) === undefined),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                stepperVariant,
                onSpin: step ? handleSpin : undefined,
                onSpinComplete: step ? handleSpinComplete : undefined,
                onStep: step ? handleStep : undefined,
                placeholder,
                prefix: inputPrefix,
                suffix: inputSuffix,
                isStepDownDisabled: disabled ||
                    (hasMin &&
                        ((valueNow !== undefined && valueNow <= minTreatNull) ||
                            (displayValue === '' && minTreatNull === 0))),
                isStepUpDisabled: disabled ||
                    (hasMax &&
                        ((valueNow !== undefined && valueNow >= maxTreatNull) ||
                            (displayValue === '' && maxTreatNull === 0))),
                textAlign,
                userAssistanceDensity,
                virtualKeyboard: normalizedVirtualKeyboard,
                ...textFieldPropsWithOverride
            }
        };
    }
    function calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, format) {
        if (!hasUncommittedDisplayValue) {
            return displayValue !== '' ? displayValue : undefined;
        }
        let valueText;
        if (valueNow) {
            valueText = format(valueNow);
        }
        return valueText === '' || valueText === null ? undefined : valueText;
    }
});
