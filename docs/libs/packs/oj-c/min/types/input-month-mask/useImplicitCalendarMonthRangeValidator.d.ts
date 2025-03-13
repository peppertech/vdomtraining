import { FormatObj } from '@oracle/oraclejet-preact/UNSAFE_IntlFormatParse';
import type { CalendarMonthRequired } from '@oracle/oraclejet-preact/UNSAFE_InputDateMask';
import { CalendarMonthRangeValidator } from './CalendarMonthRangeValidator';
import type { CalendarMonthRangeValidatorOptions } from './CalendarMonthRangeValidator';
type UseImplicitCalendarMonthRangeValidatorProps = {
    formatObj: FormatObj<CalendarMonthRequired>;
    dateRangeOverflowMessageDetail?: CalendarMonthRangeValidatorOptions['dateRangeOverflowMessageDetail'];
    dateRangeUnderflowMessageDetail?: CalendarMonthRangeValidatorOptions['dateRangeUnderflowMessageDetail'];
    max?: CalendarMonthRangeValidatorOptions['max'];
    min?: CalendarMonthRangeValidatorOptions['min'];
};
export declare function useImplicitCalendarMonthRangeValidator({ formatObj, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, max, min }: UseImplicitCalendarMonthRangeValidatorProps): CalendarMonthRangeValidator | null;
export {};
