import { DateRangeValidator, DateRangeValidatorOptions } from './DateRangeValidator';
type UseImplicitDateRangeValidatorProps = DateRangeValidatorOptions;
export declare const useImplicitDateRangeValidator: ({ converter, defaultRangeOverflowMessageDetailFn, defaultRangeUnderflowMessageDetailFn, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, formatObj, max, min }: UseImplicitDateRangeValidatorProps) => DateRangeValidator<string | null> | undefined;
export {};
