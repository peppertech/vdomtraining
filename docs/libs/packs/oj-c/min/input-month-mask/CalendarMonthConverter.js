define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "ojs/ojconfig"], function (require, exports, UNSAFE_calendarDateUtils_1, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarMonthConverter = void 0;
    class CalendarMonthConverter {
        constructor(options) {
            this.locale = options?.locale ?? (0, ojconfig_1.getLocale)();
            this.calendarMonthConverter_parseErrorFn = options?.calendarMonthConverter_parseErrorFn;
            this.customMask = options?.customMask;
        }
        format(value) {
            if (!(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarMonth)(value)) {
                throw new Error('value must have year and month');
            }
            return value;
        }
        parse(input) {
            if (input !== undefined && !(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarMonth)(input)) {
                const now = new Date();
                const currentYear = now.getFullYear();
                const formattedDateExample = (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)(this.locale, `${currentYear}-11-29`, this.customMask, 'month');
                const errorStr = this.calendarMonthConverter_parseErrorFn &&
                    this.calendarMonthConverter_parseErrorFn({
                        dateExample: formattedDateExample
                    });
                throw new Error(errorStr ?? 'parse failed');
            }
            return input;
        }
    }
    exports.CalendarMonthConverter = CalendarMonthConverter;
});
