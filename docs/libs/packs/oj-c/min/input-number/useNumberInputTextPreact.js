define(["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "./useImplicitNumberConverter", "./useImplicitNumberRangeValidator", "preact/hooks", "oj-c/editable-value/utils/utils", "./stepBasisUtils"], function (require, exports, useEditableValue_1, useValidators_1, useImplicitNumberConverter_1, useImplicitNumberRangeValidator_1, hooks_1, utils_1, stepBasisUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNumberInputTextPreact = void 0;
    function useNumberInputTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, disabled, displayOptions, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail, placeholder, readonly, required, requiredMessageDetail, step, stepperVariant, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, utils_1.treatNull)(min);
        const maxTreatNull = (0, utils_1.treatNull)(max);
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
        const { onCommitValue, format, normalizeAndParseValue, methods, textFieldProps, value, setValue, displayValue, setDisplayValue, setTransientValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            implicitComponentValidator,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasMin = minTreatNull !== undefined;
        const hasMax = maxTreatNull !== undefined;
        const isValidating = (0, hooks_1.useRef)(false);
        const stepQueue = (0, hooks_1.useRef)(new Array());
        const currentDisplayValueInStep = (0, hooks_1.useRef)(displayValue);
        const initialValue = (0, hooks_1.useRef)((0, utils_1.treatNull)(propValue));
        if (propValue !== value) {
            initialValue.current = (0, utils_1.treatNull)(propValue);
        }
        const [valueNow, setValueNow] = (0, hooks_1.useState)((0, utils_1.treatNull)(value));
        const [prevValue, setPrevValue] = (0, hooks_1.useState)(value);
        if (value !== prevValue) {
            setPrevValue(value);
            setValueNow((0, utils_1.treatNull)(value));
            setTransientValue(value);
        }
        const [hasUncommittedDisplayValue, setHasUncommittedDisplayValue] = (0, hooks_1.useState)(false);
        currentDisplayValueInStep.current = displayValue;
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            setHasUncommittedDisplayValue(false);
            const parsedValueOrSymbol = normalizeAndParseValue(value);
            const parsedValue = parsedValueOrSymbol;
            if (typeof parsedValueOrSymbol === 'symbol') {
                setValueNow(undefined);
                return;
            }
            const validationResult = await onCommitValue(parsedValue);
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                const formattedValue = format(parsedValue);
                setDisplayValue(formattedValue);
            }
            else {
                setValueNow(parsedValue);
            }
        }, [format, normalizeAndParseValue, onCommitValue]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            setDisplayValue(value ?? '');
            setHasUncommittedDisplayValue(true);
        }, []);
        const textFieldPropsWithOverride = { ...textFieldProps, onCommit, onInput };
        const doStep = (0, hooks_1.useCallback)(async (direction, doCommit) => {
            if (step === undefined || isValidating.current) {
                return;
            }
            const displayValueToStep = currentDisplayValueInStep.current || '0';
            const parsedValueOrSymbol = normalizeAndParseValue(displayValueToStep);
            if (typeof parsedValueOrSymbol === 'symbol') {
                return;
            }
            const parsedValue = parsedValueOrSymbol;
            let newSteppedValue;
            if (direction !== undefined) {
                const stepValue = direction === 'increase' ? step : -1 * step;
                newSteppedValue = (0, stepBasisUtils_1.determineSteppedValue)(stepValue, step, parsedValue, initialValue.current, maxTreatNull, minTreatNull);
            }
            else {
                newSteppedValue = parsedValue;
            }
            isValidating.current = true;
            const formattedValue = format(newSteppedValue);
            setDisplayValue(formattedValue);
            currentDisplayValueInStep.current = formattedValue;
            const validationResult = await onCommitValue(newSteppedValue, doCommit);
            const isSpinning = doCommit === false;
            const valueCommitted = doCommit && validationResult === useValidators_1.ValidationResult.VALID;
            if (isSpinning && validationResult === useValidators_1.ValidationResult.VALID) {
                setTransientValue(newSteppedValue);
            }
            if (!valueCommitted) {
                setValueNow(newSteppedValue);
            }
            isValidating.current = false;
        }, [value, displayValue, format, normalizeAndParseValue, onCommitValue]);
        const processStepQueue = (0, hooks_1.useCallback)(async (direction) => {
            await doStep(direction, true);
            if (stepQueue.current.length > 0) {
                const direction = stepQueue.current.shift();
                processStepQueue(direction);
            }
        }, [doStep]);
        const handleStep = (0, hooks_1.useCallback)(async ({ direction }) => {
            if (isValidating.current) {
                stepQueue.current.push(direction);
            }
            else {
                processStepQueue(direction);
            }
        }, [processStepQueue]);
        const handleSpin = (0, hooks_1.useCallback)(async ({ direction }) => {
            const doCommit = false;
            stepQueue.current = [];
            doStep(direction, doCommit);
        }, [doStep]);
        const handleSpinComplete = (0, hooks_1.useCallback)(async () => {
            const parsedValueOrSymbol = normalizeAndParseValue(currentDisplayValueInStep.current);
            const parsedValue = parsedValueOrSymbol;
            if (typeof parsedValueOrSymbol === 'symbol') {
                return;
            }
            await onCommitValue(parsedValue);
        }, [onCommitValue, normalizeAndParseValue]);
        const valueText = calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, format);
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
                isRequiredShown: required && (userAssistanceDensity === 'compact' || (0, utils_1.treatNull)(value) === undefined),
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
                virtualKeyboard,
                ...textFieldPropsWithOverride
            }
        };
    }
    exports.useNumberInputTextPreact = useNumberInputTextPreact;
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
