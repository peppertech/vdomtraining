import type { BundleType } from '@oracle/oraclejet-preact/resources/nls/bundle';
import type { CalendarDateRequired } from '@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils';
import { FormatObj } from '@oracle/oraclejet-preact/UNSAFE_IntlFormatParse';
import type { CalendarDateConverter } from 'oj-c/input-date-mask/CalendarDateConverter';
import type Validator = require('ojs/ojvalidator');
export type OverflowMessageDetailParameters = {
    value: string;
    max: string;
};
export type UnderflowMessageDetailParameters = {
    value: string;
    min: string;
};
type MessageDetailFn<T> = (p: T) => string;
export type DateRangeValidatorOptions = {
    converter: CalendarDateConverter;
    dateRangeOverflowMessageDetail?: MessageDetailFn<OverflowMessageDetailParameters>;
    dateRangeUnderflowMessageDetail?: MessageDetailFn<UnderflowMessageDetailParameters>;
    defaultRangeOverflowMessageDetailFn: BundleType['inputDatePicker_dateRangeOverflowMessageDetail'];
    defaultRangeUnderflowMessageDetailFn: BundleType['inputDatePicker_dateRangeUnderflowMessageDetail'];
    formatObj: FormatObj<string>;
    max?: CalendarDateRequired;
    min?: CalendarDateRequired;
};
export declare class DateRangeValidator<V extends string | null = string | null> implements Validator<V> {
    #private;
    private options;
    constructor(options: DateRangeValidatorOptions);
    validate(value: V): void;
}
export {};
