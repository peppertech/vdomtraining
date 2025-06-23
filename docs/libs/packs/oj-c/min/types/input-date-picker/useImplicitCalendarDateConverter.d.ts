import { BundleType } from '@oracle/oraclejet-preact/resources/nls/bundle';
import { CalendarDateConverter } from 'oj-c/input-date-mask/CalendarDateConverter';
type UseImplicitCalendarDateConverterProps = {
    calendarDateConverter_parseErrorFn: BundleType['calendarDateConverter_parseError'];
};
export declare const useImplicitCalendarDateConverter: ({ calendarDateConverter_parseErrorFn }: UseImplicitCalendarDateConverterProps) => CalendarDateConverter;
export {};
