define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_DatePicker", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, ojvcomponent_1, UNSAFE_DatePicker_1, UNSAFE_IntlDateTime_1, UNSAFE_useTabbableMode_1, UNSAFE_calendarDateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatePicker = void 0;
    exports.DatePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-date-picker', ({ dayFormatter, daysOutsideMonth = 'hidden', monthAndYearPicker = 'on', max = null, maxWidth, min = null, readonly = false, todayButton = 'visible', todayTimeZone, value = null, width, weekDisplay = 'none', onValueChanged, ...otherProps }) => {
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(value)) {
            throw new Error('value must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(min)) {
            throw new Error('min must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(max)) {
            throw new Error('max must be a date-only ISO string');
        }
        if (max && min && max < min) {
            throw new Error('max must be greater than or equal to min');
        }
        const maxCalendarDate = max ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(max) : undefined;
        const minCalendarDate = min ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(min) : undefined;
        const valueCalendarDate = value
            ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(value)
            : undefined;
        const onCommitHandler = (0, hooks_1.useCallback)(({ value, previousValue }) => {
            if (onValueChanged && value !== previousValue) {
                value
                    ? onValueChanged((0, UNSAFE_calendarDateUtils_1.getIsoDateStr)(value.year, value.month, value.day))
                    : onValueChanged(null);
            }
        }, [onValueChanged]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, children: (0, jsx_runtime_1.jsx)(UNSAFE_DatePicker_1.DatePicker, { dayFormatter: dayFormatter ?? undefined, daysOutsideMonth: daysOutsideMonth, monthAndYearPicker: monthAndYearPicker, max: maxCalendarDate, min: minCalendarDate, isReadonly: readonly, todayButton: todayButton, todayTimeZone: todayTimeZone ?? undefined, value: valueCalendarDate, weekDisplay: weekDisplay, width: width, maxWidth: maxWidth, onCommit: onCommitHandler }) }));
    }, "DatePicker", { "properties": { "dayFormatter": { "type": "function" }, "daysOutsideMonth": { "type": "string", "enumValues": ["hidden", "selectable"] }, "monthAndYearPicker": { "type": "string", "enumValues": ["off", "on"] }, "max": { "type": "string|null" }, "maxWidth": { "type": "number|string" }, "min": { "type": "string|null" }, "readonly": { "type": "boolean" }, "todayButton": { "type": "string", "enumValues": ["hidden", "visible"] }, "todayTimeZone": { "type": "string" }, "value": { "type": "string|null", "writeback": true }, "weekDisplay": { "type": "string", "enumValues": ["number", "none"] }, "width": { "type": "number|string" } }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] } }, { "daysOutsideMonth": "hidden", "monthAndYearPicker": "on", "max": null, "min": null, "readonly": false, "todayButton": "visible", "value": null, "weekDisplay": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});
