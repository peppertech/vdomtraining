define(["require", "exports", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "oj-c/input-date-mask/useInputDateMaskPreact", "preact/hooks", "./useCombinedImplicitValidators", "./useImplicitCalendarDateConverter", "./useImplicitDateRangeValidator", "./useImplicitDateRestrictionValidator", "./utils", "ojs/ojcontext", "ojs/ojconfig"], function (require, exports, UNSAFE_IntlDateTime_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTranslationBundle_1, UNSAFE_calendarDateUtils_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, useInputDateMaskPreact_1, hooks_1, useCombinedImplicitValidators_1, useImplicitCalendarDateConverter_1, useImplicitDateRangeValidator_1, useImplicitDateRestrictionValidator_1, utils_1, Context, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDatePicker = void 0;
    const useInputDatePicker = (props, ref) => {
        assertProps(props);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const rootRef = (0, hooks_1.useRef)(null);
        const inputDatePickerRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'InputDatePicker: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { containerProps: formContextValue, readonlyValue: mergedReadonly, uadValue: mergedUserAssistanceDensity } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly: props.containerReadonly,
            propLabelWrapping: props.labelWrapping,
            propReadonly: props.readonly,
            propUserAssistanceDensity: props.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        const implicitConverter = (0, useImplicitCalendarDateConverter_1.useImplicitCalendarDateConverter)({
            calendarDateConverter_parseErrorFn: translations.calendarDateConverter_parseError
        });
        const { max: maxCalendarDate, min: minCalendarDate } = useMinMax({
            converter: implicitConverter,
            max: props.max,
            min: props.min
        });
        if (maxCalendarDate)
            (0, utils_1.assertCompleteDate)(maxCalendarDate);
        if (minCalendarDate)
            (0, utils_1.assertCompleteDate)(minCalendarDate);
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return (0, useInputDateMaskPreact_1.getMasksFromDatePatternPreferences)();
        }, []);
        const exampleFormatter = (0, hooks_1.useMemo)(() => {
            return {
                format: (value) => {
                    return (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)((0, ojconfig_1.getLocale)(), value, masksFromUserPref);
                }
            };
        }, [masksFromUserPref]);
        const implicitDateRestrictionValidator = (0, useImplicitDateRestrictionValidator_1.useImplicitDateRestrictionValidator)({
            converter: implicitConverter,
            dateRestrictionMessageDetail: props.dateRestrictionMessageDetail,
            dayFormatter: props.dayFormatter,
            defaultRestrictionMessageDetail: translations.inputDatePicker_dateRestrictionMessageDetail
        });
        const implicitDateRangeValidator = (0, useImplicitDateRangeValidator_1.useImplicitDateRangeValidator)({
            converter: implicitConverter,
            dateRangeOverflowMessageDetail: props.dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail: props.dateRangeUnderflowMessageDetail,
            defaultRangeOverflowMessageDetailFn: translations.inputDatePicker_dateRangeOverflowMessageDetail,
            defaultRangeUnderflowMessageDetailFn: translations.inputDatePicker_dateRangeUnderflowMessageDetail,
            formatObj: exampleFormatter,
            max: maxCalendarDate,
            min: minCalendarDate
        });
        const implicitValidator = (0, useCombinedImplicitValidators_1.useCombinedImplicitValidators)(implicitDateRangeValidator, implicitDateRestrictionValidator);
        const mergedValidators = (0, hooks_1.useMemo)(() => [implicitValidator, ...(props.validators ?? [])], [implicitValidator, props.validators]);
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)({
            ...props,
            readonly: mergedReadonly,
            validators: mergedValidators,
            userAssistanceDensity: mergedUserAssistanceDensity,
            dateRangeOverflowMessageDetail: undefined,
            dateRangeUnderflowMessageDetail: undefined,
            max: undefined,
            min: undefined
        }, addBusyState);
        const { assistiveText, helpSourceLink, helpSourceText } = (0, useAssistiveText_1.useAssistiveText)({
            addBusyState,
            displayOptions: props.displayOptions,
            help: props.help,
            helpHints: props.helpHints,
            userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
            validators: props.validators ?? []
        });
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputDatePickerRef.current?.blur(),
            focus: () => inputDatePickerRef.current?.focus(),
            ...methods
        }), [methods]);
        return {
            formContextValue,
            inputDatePickerProps: {
                'aria-describedby': inputDateMaskProps['aria-describedby'],
                assistiveText: assistiveText,
                dayFormatter: props.dayFormatter,
                daysOutsideMonth: props.daysOutsideMonth,
                helpSourceLink: helpSourceLink,
                helpSourceText: helpSourceText,
                isDisabled: inputDateMaskProps.isDisabled,
                isReadonly: inputDateMaskProps.isReadonly,
                isRequired: inputDateMaskProps.isRequired,
                isRequiredShown: inputDateMaskProps.isRequiredShown,
                label: inputDateMaskProps.label,
                labelEdge: inputDateMaskProps.labelEdge,
                labelStartWidth: inputDateMaskProps.labelStartWidth,
                masks: inputDateMaskProps.masks,
                max: maxCalendarDate,
                messages: inputDateMaskProps.messages,
                min: minCalendarDate,
                monthAndYearPicker: props.monthAndYearPicker,
                onCommit: inputDateMaskProps.onCommit,
                onInput: inputDateMaskProps.onInput,
                ref: inputDatePickerRef,
                textAlign: inputDateMaskProps.textAlign,
                todayTimeZone: props.todayTimeZone,
                todayButton: props.todayButton,
                userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
                value: inputDateMaskProps.value,
                variant: variant,
                weekDisplay: props.weekDisplay
            },
            rootProps: {
                id: props.id,
                class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan ?? 1],
                ref: rootRef
            }
        };
    };
    exports.useInputDatePicker = useInputDatePicker;
    const assertProps = (props) => {
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.value)) {
            throw new Error(`InputDatePicker - value must be a date-only ISO string: ${props.value}`);
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.min)) {
            throw new Error(`InputDatePicker - min must be a date-only ISO string: ${props.min}`);
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.max)) {
            throw new Error(`InputDatePicker - max must be a date-only ISO string: ${props.max}`);
        }
    };
    const useMinMax = ({ converter, max, min }) => {
        return (0, hooks_1.useMemo)(() => ({
            max: max ? converter.format(max) : undefined,
            min: min ? converter.format(min) : undefined
        }), [converter, max, min]);
    };
});
