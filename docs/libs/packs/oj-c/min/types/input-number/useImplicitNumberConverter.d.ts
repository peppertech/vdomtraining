import { NumberConverter } from 'ojs/ojconverter-nativenumber';
import { ComponentProps } from 'preact';
import { InputNumber } from './input-number';
type InputNumberProps = ComponentProps<typeof InputNumber>;
type UseImplicitNumberConverterProps = {
    converter?: InputNumberProps['converter'];
};
export declare function useImplicitNumberConverter({ converter }: UseImplicitNumberConverterProps): import("ojs/ojconverter")<number> | NumberConverter;
export {};
