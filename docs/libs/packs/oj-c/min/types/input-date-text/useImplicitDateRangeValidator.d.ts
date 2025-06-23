import { ComponentProps } from 'preact';
import { LocalDateRangeValidator } from 'ojs/ojvalidator-localdaterange';
import { InputDateText } from './input-date-text';
import { FormatObj } from '@oracle/oraclejet-preact/UNSAFE_IntlFormatParse';
type InputDateTextProps = ComponentProps<typeof InputDateText>;
type UseImplicitDateRangeValidatorProps = {
    formatObj: FormatObj<string>;
    dateRangeOverflowMessageDetail?: string;
    dateRangeUnderflowMessageDetail?: string;
    max?: Exclude<InputDateTextProps['max'], null>;
    min?: Exclude<InputDateTextProps['min'], null>;
};
export declare function useImplicitDateRangeValidator({ formatObj, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, max, min }: UseImplicitDateRangeValidatorProps): LocalDateRangeValidator | null;
export {};
