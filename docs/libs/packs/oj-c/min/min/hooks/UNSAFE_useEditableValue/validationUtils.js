define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAsync = validateAsync;
    exports.validateSync = validateSync;
    function validateSync({ validators, value }) {
        const errors = [];
        for (const validator of validators) {
            try {
                validator.validate(value);
            }
            catch (error) {
                errors.push((0, utils_1.createMessageFromError)(error));
            }
        }
        if (errors.length) {
            return { result: 'failure', errors };
        }
        return { result: 'success' };
    }
    function validateAsync({ validators, value }) {
        const doValidate = (validator, value) => {
            try {
                const validateResult = validator.validate(value);
                if (validateResult instanceof Promise) {
                    return validateResult.then(() => { }, (error) => (0, utils_1.createMessageFromError)(error));
                }
            }
            catch (error) {
                return (0, utils_1.createMessageFromError)(error);
            }
            return;
        };
        const errors = [];
        const maybeErrorPromises = [];
        for (const validator of validators) {
            const maybeComponentMessageItem = doValidate(validator, value);
            if (maybeComponentMessageItem !== undefined) {
                if (maybeComponentMessageItem instanceof Promise) {
                    maybeErrorPromises.push(maybeComponentMessageItem);
                }
                else {
                    errors.push(maybeComponentMessageItem);
                }
            }
        }
        return {
            errors,
            maybeErrorPromises
        };
    }
});
