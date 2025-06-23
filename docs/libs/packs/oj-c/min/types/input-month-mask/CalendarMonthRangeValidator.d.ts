import type { FormatObj } from '@oracle/oraclejet-preact/UNSAFE_IntlFormatParse';
import type { CalendarMonthRequired } from '@oracle/oraclejet-preact/UNSAFE_InputDateMask';
import type { BundleType } from '@oracle/oraclejet-preact/resources/nls/bundle';
type OverflowMessageDetailParameters = {
    value: string;
    max: string;
};
type UnderflowMessageDetailParameters = {
    value: string;
    min: string;
};
type MessageDetailFn<T> = (p: T) => string;
type CalendarMonthRangeValidatorOptions = {
    defaultRangeOverflowMessageDetailFn: BundleType['inputMonthMask_dateRangeOverflowMessageDetail'];
    defaultRangeUnderflowMessageDetailFn: BundleType['inputMonthMask_dateRangeUnderflowMessageDetail'];
    max?: CalendarMonthRequired;
    min?: CalendarMonthRequired;
    dateRangeOverflowMessageDetail?: MessageDetailFn<OverflowMessageDetailParameters>;
    dateRangeUnderflowMessageDetail?: MessageDetailFn<UnderflowMessageDetailParameters>;
    formatObj: FormatObj<CalendarMonthRequired>;
};
declare class CalendarMonthRangeValidator {
    private defaultRangeOverflowMessageDetailFn;
    private defaultRangeUnderflowMessageDetailFn;
    private min;
    private max;
    private dateRangeOverflowMessageDetail;
    private dateRangeUnderflowMessageDetail;
    private formatObj;
    constructor(options: CalendarMonthRangeValidatorOptions);
    validate(value: CalendarMonthRequired | null): Required<import("@oracle/oraclejet-preact/UNSAFE_InputDateMask").CalendarMonth> | undefined;
    private static _compareCalendarMonths;
}
export { CalendarMonthRangeValidator, CalendarMonthRangeValidatorOptions, OverflowMessageDetailParameters, UnderflowMessageDetailParameters };
