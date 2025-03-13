var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var _DateRangeValidator_instances, _DateRangeValidator_getOverflowErrorDetail, _DateRangeValidator_getUnderflowErrorDetail;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateRangeValidator = void 0;
    class DateRangeValidator {
        constructor(options) {
            _DateRangeValidator_instances.add(this);
            if (options.min && options.max && (0, utils_1.compareCalendarDates)(options.min, options.max) > 0) {
                throw new Error('min must be less than max');
            }
            this.options = options;
        }
        validate(value) {
            if (value === null)
                return;
            const { converter, max, min } = this.options;
            const valueCalendarDate = converter.format(value);
            (0, utils_1.assertCompleteDate)(valueCalendarDate);
            if (max && (0, utils_1.compareCalendarDates)(valueCalendarDate, max) > 0) {
                throw new Error(__classPrivateFieldGet(this, _DateRangeValidator_instances, "m", _DateRangeValidator_getOverflowErrorDetail).call(this, value, max));
            }
            if (min && (0, utils_1.compareCalendarDates)(valueCalendarDate, min) < 0) {
                throw new Error(__classPrivateFieldGet(this, _DateRangeValidator_instances, "m", _DateRangeValidator_getUnderflowErrorDetail).call(this, value, min));
            }
        }
    }
    exports.DateRangeValidator = DateRangeValidator;
    _DateRangeValidator_instances = new WeakSet(), _DateRangeValidator_getOverflowErrorDetail = function _DateRangeValidator_getOverflowErrorDetail(value, max) {
        const { converter, dateRangeOverflowMessageDetail, defaultRangeOverflowMessageDetailFn, formatObj } = this.options;
        const isoMax = converter.parse(max);
        const maxString = formatObj.format(isoMax);
        if (dateRangeOverflowMessageDetail) {
            const valueString = formatObj.format(value);
            return dateRangeOverflowMessageDetail({ value: valueString, max: maxString });
        }
        return defaultRangeOverflowMessageDetailFn({ max: maxString });
    }, _DateRangeValidator_getUnderflowErrorDetail = function _DateRangeValidator_getUnderflowErrorDetail(value, min) {
        const { converter, dateRangeUnderflowMessageDetail, defaultRangeUnderflowMessageDetailFn, formatObj } = this.options;
        const isoMin = converter.parse(min);
        const minString = formatObj.format(isoMin);
        if (dateRangeUnderflowMessageDetail) {
            const valueString = formatObj.format(value);
            return dateRangeUnderflowMessageDetail({ value: valueString, min: minString });
        }
        return defaultRangeUnderflowMessageDetailFn({ min: minString });
    };
});
