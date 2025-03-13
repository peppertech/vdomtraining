define(["require", "exports", "preact/hooks", "./DateRangeValidator"], function (require, exports, hooks_1, DateRangeValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRangeValidator = void 0;
    const useImplicitDateRangeValidator = ({ converter, defaultRangeOverflowMessageDetailFn, defaultRangeUnderflowMessageDetailFn, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, formatObj, max, min }) => (0, hooks_1.useMemo)(() => {
        if (!min && !max)
            return undefined;
        return new DateRangeValidator_1.DateRangeValidator({
            converter,
            defaultRangeOverflowMessageDetailFn,
            defaultRangeUnderflowMessageDetailFn,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            formatObj,
            max,
            min
        });
    }, [
        converter,
        defaultRangeOverflowMessageDetailFn,
        defaultRangeUnderflowMessageDetailFn,
        dateRangeOverflowMessageDetail,
        dateRangeUnderflowMessageDetail,
        formatObj,
        max,
        min
    ]);
    exports.useImplicitDateRangeValidator = useImplicitDateRangeValidator;
});
