import type { InputDatePicker as PreactInputDatePicker } from '@oracle/oraclejet-preact/UNSAFE_InputDatePicker';
import type { Root } from '@oracle/oraclejet/ojvcomponent';
import type { ComponentProps } from 'preact';
import type { InputDatePickerProps, InputDatePickerRef } from './input-date-picker';
type PreactInputDatePickerProps = ComponentProps<typeof PreactInputDatePicker>;
type RootProps = ComponentProps<typeof Root>;
export declare const useInputDatePicker: (props: InputDatePickerProps, ref: InputDatePickerRef) => {
    formContextValue: import("@oracle/oraclejet-preact/dist/types/hooks/UNSAFE_useFormContext").FormContextProps;
    inputDatePickerProps: PreactInputDatePickerProps;
    rootProps: RootProps;
};
export {};
