import { ComponentProps } from 'preact';
import NumberRangeValidator = require('ojs/ojvalidator-numberrange');
import { InputNumber } from './input-number';
type InputNumberProps = ComponentProps<typeof InputNumber>;
import Converter = require('ojs/ojconverter');
type UseImplicitNumberRangeValidatorProps = {
    converter?: Converter<number>;
    min?: Exclude<InputNumberProps['min'], null>;
    max?: Exclude<InputNumberProps['max'], null>;
    numberRangeExactMessageDetail?: string;
    numberRangeOverflowMessageDetail?: string;
    numberRangeUnderflowMessageDetail?: string;
};
export declare function useImplicitNumberRangeValidator({ converter, max, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail }: UseImplicitNumberRangeValidatorProps): NumberRangeValidator | null;
export {};
