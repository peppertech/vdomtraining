var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var _DateRestrictionValidator_instances, _DateRestrictionValidator_getErrorDetail, _DateRestrictionValidator_getDayState;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateRestrictionValidator = void 0;
    class DateRestrictionValidator {
        constructor(options) {
            _DateRestrictionValidator_instances.add(this);
            this.options = options;
        }
        validate(value) {
            if (value == null)
                return;
            const valueCalendarDate = this.options.converter.format(value);
            const { state } = __classPrivateFieldGet(this, _DateRestrictionValidator_instances, "m", _DateRestrictionValidator_getDayState).call(this, valueCalendarDate);
            if (state === 'enabled')
                return;
            throw new Error(__classPrivateFieldGet(this, _DateRestrictionValidator_instances, "m", _DateRestrictionValidator_getErrorDetail).call(this, value, state));
        }
    }
    exports.DateRestrictionValidator = DateRestrictionValidator;
    _DateRestrictionValidator_instances = new WeakSet(), _DateRestrictionValidator_getErrorDetail = function _DateRestrictionValidator_getErrorDetail(value, state) {
        if (this.options.dateRestrictionMessageDetail)
            return this.options.dateRestrictionMessageDetail({ state, value });
        return this.options.defaultRestrictionMessageDetail();
    }, _DateRestrictionValidator_getDayState = function _DateRestrictionValidator_getDayState(date) {
        (0, utils_1.assertCompleteDate)(date);
        return this.options.dayFormatter(date);
    };
});
