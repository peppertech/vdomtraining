import { NumberConverter } from 'ojs/ojconverter-nativenumber';
import { ComponentProps } from 'preact';
import { InputNumber } from './input-number';
type InputNumberProps = ComponentProps<typeof InputNumber>;
type UseImplicitNumberConverterProps = {
    converter?: InputNumberProps['converter'];
};
export declare function useImplicitNumberConverter({ converter }: UseImplicitNumberConverterProps): NumberConverter | import("@oracle/oraclejet/ojconverter")<number>;
export {};
