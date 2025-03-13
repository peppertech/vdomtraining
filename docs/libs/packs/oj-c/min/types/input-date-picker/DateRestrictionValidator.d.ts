import type { BundleType } from '@oracle/oraclejet-preact/resources/nls/bundle';
import type { CalendarDateConverter } from 'oj-c/input-date-mask/CalendarDateConverter';
import type { ComponentProps } from 'preact';
import type { InputDatePicker } from './input-date-picker';
import type Validator = require('ojs/ojvalidator');
type InputDatePickerProps = ComponentProps<typeof InputDatePicker>;
type DayFormatterOutput = NonNullable<ReturnType<NonNullable<InputDatePickerProps['dayFormatter']>>>;
type InvalidSelectionStates = Exclude<DayFormatterOutput['state'], 'enabled'>;
export type RestrictionMessageDetailParameters = {
    state: InvalidSelectionStates;
    value: string;
};
export type DateRestrictionValidatorOptions = {
    dayFormatter: NonNullable<InputDatePickerProps['dayFormatter']>;
    dateRestrictionMessageDetail?: InputDatePickerProps['dateRestrictionMessageDetail'];
    defaultRestrictionMessageDetail: BundleType['inputDatePicker_dateRestrictionMessageDetail'];
    converter: CalendarDateConverter;
};
export declare class DateRestrictionValidator<V extends string | null = string | null> implements Validator<V> {
    #private;
    private options;
    constructor(options: DateRestrictionValidatorOptions);
    validate(value: V): void;
}
export {};
