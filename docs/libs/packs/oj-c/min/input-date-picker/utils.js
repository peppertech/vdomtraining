define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils"], function (require, exports, UNSAFE_calendarDateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertCompleteDate = exports.compareCalendarDates = void 0;
    const compareCalendarDates = (val1, val2) => {
        if (val1.year === val2.year && val1.month === val2.month && val1.day === val2.day) {
            return 0;
        }
        if (val1.year === val2.year) {
            if (val1.month === val2.month) {
                return val1.day > val2.day ? 1 : -1;
            }
            return val1.month > val2.month ? 1 : -1;
        }
        return val1.year > val2.year ? 1 : -1;
    };
    exports.compareCalendarDates = compareCalendarDates;
    const assertCompleteDate = (date) => {
        if (!(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarDate)(date))
            throw new Error('DateRestrictionValidator: Expected full date, but received partial date');
    };
    exports.assertCompleteDate = assertCompleteDate;
});
