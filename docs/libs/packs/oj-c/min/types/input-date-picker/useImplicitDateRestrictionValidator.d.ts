import { DateRestrictionValidator, DateRestrictionValidatorOptions } from './DateRestrictionValidator';
type UseImplicitDateRestrictionValidatorProps = Pick<DateRestrictionValidatorOptions, 'converter' | 'dateRestrictionMessageDetail' | 'defaultRestrictionMessageDetail'> & {
    dayFormatter?: DateRestrictionValidatorOptions['dayFormatter'];
};
export declare const useImplicitDateRestrictionValidator: ({ converter, dateRestrictionMessageDetail, dayFormatter, defaultRestrictionMessageDetail }: UseImplicitDateRestrictionValidatorProps) => DateRestrictionValidator<string | null> | undefined;
export {};
