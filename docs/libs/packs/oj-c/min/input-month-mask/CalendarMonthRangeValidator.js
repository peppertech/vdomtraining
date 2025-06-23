define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarMonthRangeValidator = void 0;
    class CalendarMonthRangeValidator {
        constructor(options) {
            if (options.min &&
                options.max &&
                CalendarMonthRangeValidator._compareCalendarMonths(options.min, options.max) > 0) {
                throw new Error('min must be less than max');
            }
            this.defaultRangeOverflowMessageDetailFn = options.defaultRangeOverflowMessageDetailFn;
            this.defaultRangeUnderflowMessageDetailFn = options.defaultRangeUnderflowMessageDetailFn;
            this.min = options.min;
            this.max = options.max;
            this.dateRangeOverflowMessageDetail = options.dateRangeOverflowMessageDetail;
            this.dateRangeUnderflowMessageDetail = options.dateRangeUnderflowMessageDetail;
            this.formatObj = options.formatObj;
        }
        validate(value) {
            const messageDetailRangeOverflow = this.dateRangeOverflowMessageDetail;
            const messageDetailRangeUnderflow = this.dateRangeUnderflowMessageDetail;
            const min = this.min;
            const max = this.max;
            if (value === null) {
                return;
            }
            const valStr = value ? this.formatObj.format(value) : value;
            if (max && CalendarMonthRangeValidator._compareCalendarMonths(value, max) > 0) {
                const maxStr = this.formatObj.format(max);
                const detail = messageDetailRangeOverflow
                    ? messageDetailRangeOverflow({ max: maxStr, value: valStr })
                    : this.defaultRangeOverflowMessageDetailFn({ max: maxStr });
                throw new Error(detail);
            }
            if (min && CalendarMonthRangeValidator._compareCalendarMonths(value, min) < 0) {
                const minStr = this.formatObj.format(min);
                const detail = messageDetailRangeUnderflow
                    ? messageDetailRangeUnderflow({ min: minStr, value: valStr })
                    : this.defaultRangeUnderflowMessageDetailFn({ min: minStr });
                throw new Error(detail);
            }
            return value;
        }
        static _compareCalendarMonths(val1, val2) {
            if (val1.year === val2.year && val1.month === val2.month) {
                return 0;
            }
            if (val1.year === val2.year) {
                return val1.month > val2.month ? 1 : -1;
            }
            return val1.year > val2.year ? 1 : -1;
        }
    }
    exports.CalendarMonthRangeValidator = CalendarMonthRangeValidator;
});
