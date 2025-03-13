import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
type ValidatorLike<V> = Validator<V> | AsyncValidator<V>;
type UseDeferredValidatorsProps = {
    labelHint?: string;
    required?: boolean;
    requiredMessageDetail?: string;
};
export declare function useDeferredValidators<V>({ labelHint, required, requiredMessageDetail: propRequiredMessageDetail }: UseDeferredValidatorsProps): ValidatorLike<V>[];
export {};
