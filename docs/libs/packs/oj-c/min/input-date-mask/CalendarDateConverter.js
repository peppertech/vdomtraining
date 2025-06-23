define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "ojs/ojconfig"], function (require, exports, UNSAFE_calendarDateUtils_1, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarDateConverter = void 0;
    class CalendarDateConverter {
        constructor(options) {
            this.locale = options?.locale ?? (0, ojconfig_1.getLocale)();
            this.calendarDateConverter_parseErrorFn = options?.calendarDateConverter_parseErrorFn;
            this.customMask = options?.customMask;
        }
        format(value) {
            const calendarDate = (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(value);
            if (!calendarDate) {
                throw new Error('value must be a date-only ISO string');
            }
            return calendarDate;
        }
        parse(input) {
            if (input !== undefined && !(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarDate)(input)) {
                const now = new Date();
                const currentYear = now.getFullYear();
                const formattedDateExample = (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)(this.locale, `${currentYear}-11-29`, this.customMask);
                const errorStr = this.calendarDateConverter_parseErrorFn &&
                    this.calendarDateConverter_parseErrorFn({
                        dateExample: formattedDateExample
                    });
                throw new Error(errorStr ?? 'parse failed');
            }
            const completeDate = input;
            return (0, UNSAFE_calendarDateUtils_1.getIsoDateStr)(completeDate.year, completeDate.month, completeDate.day);
        }
    }
    exports.CalendarDateConverter = CalendarDateConverter;
});
