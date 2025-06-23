import { ComponentMessageItem } from '@oracle/oraclejet-preact/UNSAFE_ComponentMessage';
import type AsyncValidator = require('ojs/ojvalidator-async');
import type Validator = require('ojs/ojvalidator');
type ValidationSuccess = {
    result: 'success';
};
type ValidationFailure = {
    result: 'failure';
    errors: ComponentMessageItem[];
};
type ValidationResult = ValidationFailure | ValidationSuccess;
type ValidatorLike<V> = Validator<V> | AsyncValidator<V>;
type AsyncValidationResult = {
    errors: ComponentMessageItem[];
    maybeErrorPromises: Promise<void | ComponentMessageItem>[];
};
type ValidateSyncParams<V> = {
    value: V;
    validators: Validator<V>[];
};
type ValidateAsyncParams<V> = {
    value: V;
    validators: ValidatorLike<V>[];
};
declare function validateSync<V>({ validators, value }: ValidateSyncParams<V>): ValidationResult;
declare function validateAsync<V>({ validators, value }: ValidateAsyncParams<V>): AsyncValidationResult;
export { validateAsync, validateSync };
