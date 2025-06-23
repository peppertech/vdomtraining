import type Validator = require('ojs/ojvalidator');
export declare const useCombinedImplicitValidators: <V>(...validators: (Validator<V> | undefined)[]) => Validator<V>;
