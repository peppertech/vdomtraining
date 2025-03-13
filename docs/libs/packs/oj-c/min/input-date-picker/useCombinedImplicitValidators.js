define(["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCombinedImplicitValidators = void 0;
    const useCombinedImplicitValidators = (...validators) => (0, hooks_1.useMemo)(() => ({
        validate(value) {
            for (const validator of validators) {
                validator?.validate(value);
            }
        }
    }), [...validators]);
    exports.useCombinedImplicitValidators = useCombinedImplicitValidators;
});
