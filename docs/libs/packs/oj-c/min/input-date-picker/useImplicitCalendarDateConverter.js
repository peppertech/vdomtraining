define(["require", "exports", "oj-c/input-date-mask/CalendarDateConverter", "oj-c/input-date-mask/useInputDateMaskPreact", "preact/hooks"], function (require, exports, CalendarDateConverter_1, useInputDateMaskPreact_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitCalendarDateConverter = void 0;
    const useImplicitCalendarDateConverter = ({ calendarDateConverter_parseErrorFn }) => {
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return (0, useInputDateMaskPreact_1.getMasksFromDatePatternPreferences)();
        }, []);
        return (0, hooks_1.useMemo)(() => {
            return new CalendarDateConverter_1.CalendarDateConverter({
                calendarDateConverter_parseErrorFn,
                customMask: masksFromUserPref
            });
        }, [calendarDateConverter_parseErrorFn, masksFromUserPref]);
    };
    exports.useImplicitCalendarDateConverter = useImplicitCalendarDateConverter;
});
