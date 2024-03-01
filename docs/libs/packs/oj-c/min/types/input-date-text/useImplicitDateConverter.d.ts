import { ComponentProps } from 'preact';
import { InputDateText } from './input-date-text';
type InputDateTextProps = ComponentProps<typeof InputDateText>;
type UseImplicitDateConverterProps = {
    converter?: InputDateTextProps['converter'];
};
export declare function useImplicitDateConverter({ converter }: UseImplicitDateConverterProps): import("@oracle/oraclejet-preact/UNSAFE_IntlFormatParse").FormatObj<string> & import("@oracle/oraclejet-preact/UNSAFE_IntlFormatParse").ParseObj<string>;
export {};
