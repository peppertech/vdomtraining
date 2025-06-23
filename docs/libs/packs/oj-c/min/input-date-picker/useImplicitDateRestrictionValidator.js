define(["require", "exports", "preact/hooks", "./DateRestrictionValidator"], function (require, exports, hooks_1, DateRestrictionValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRestrictionValidator = void 0;
    const useImplicitDateRestrictionValidator = ({ converter, dateRestrictionMessageDetail, dayFormatter, defaultRestrictionMessageDetail }) => (0, hooks_1.useMemo)(() => {
        if (!dayFormatter)
            return undefined;
        return new DateRestrictionValidator_1.DateRestrictionValidator({
            converter,
            dateRestrictionMessageDetail,
            dayFormatter,
            defaultRestrictionMessageDetail
        });
    }, [converter, dateRestrictionMessageDetail, dayFormatter, defaultRestrictionMessageDetail]);
    exports.useImplicitDateRestrictionValidator = useImplicitDateRestrictionValidator;
});
