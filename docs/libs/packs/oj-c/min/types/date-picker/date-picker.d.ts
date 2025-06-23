import { ComponentProps } from 'preact';
import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { DateISOStr } from '@oracle/oraclejet-preact/UNSAFE_IntlDateTime';
import { CalendarDateRequired } from '@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
type Props = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    dayFormatter?: (date: CalendarDateRequired) => {
        state: 'disabled' | 'enabled' | 'restricted';
    };
    daysOutsideMonth?: 'hidden' | 'selectable';
    monthAndYearPicker?: 'on' | 'off';
    max?: DateISOStr | null;
    maxWidth?: Size;
    min?: DateISOStr | null;
    readonly?: boolean;
    todayButton?: 'visible' | 'hidden';
    todayTimeZone?: Intl.DateTimeFormatOptions['timeZone'];
    value?: DateISOStr | null;
    weekDisplay?: 'none' | 'number';
    width?: Size;
    onValueChanged?: PropertyChanged<DateISOStr | null>;
};
export declare const DatePicker: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"id" | "aria-describedby"> & {
    dayFormatter?: (date: CalendarDateRequired) => {
        state: "disabled" | "enabled" | "restricted";
    };
    daysOutsideMonth?: "hidden" | "selectable";
    monthAndYearPicker?: "on" | "off";
    max?: DateISOStr | null;
    maxWidth?: Size;
    min?: DateISOStr | null;
    readonly?: boolean;
    todayButton?: "visible" | "hidden";
    todayTimeZone?: Intl.DateTimeFormatOptions["timeZone"];
    value?: DateISOStr | null;
    weekDisplay?: "none" | "number";
    width?: Size;
    onValueChanged?: PropertyChanged<DateISOStr | null>;
}>>;
export type DatePickerProps = Props;
export {};
export interface CDatePickerElement extends JetElement<CDatePickerElementSettableProperties>, CDatePickerElementSettableProperties {
    addEventListener<T extends keyof CDatePickerElementEventMap>(type: T, listener: (this: HTMLElement, ev: CDatePickerElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CDatePickerElementSettableProperties>(property: T): CDatePickerElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CDatePickerElementSettableProperties>(property: T, value: CDatePickerElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CDatePickerElementSettableProperties>): void;
    setProperties(properties: CDatePickerElementSettablePropertiesLenient): void;
}
export namespace CDatePickerElement {
    type dayFormatterChanged = JetElementCustomEventStrict<CDatePickerElement['dayFormatter']>;
    type daysOutsideMonthChanged = JetElementCustomEventStrict<CDatePickerElement['daysOutsideMonth']>;
    type maxChanged = JetElementCustomEventStrict<CDatePickerElement['max']>;
    type maxWidthChanged = JetElementCustomEventStrict<CDatePickerElement['maxWidth']>;
    type minChanged = JetElementCustomEventStrict<CDatePickerElement['min']>;
    type monthAndYearPickerChanged = JetElementCustomEventStrict<CDatePickerElement['monthAndYearPicker']>;
    type readonlyChanged = JetElementCustomEventStrict<CDatePickerElement['readonly']>;
    type todayButtonChanged = JetElementCustomEventStrict<CDatePickerElement['todayButton']>;
    type todayTimeZoneChanged = JetElementCustomEventStrict<CDatePickerElement['todayTimeZone']>;
    type valueChanged = JetElementCustomEventStrict<CDatePickerElement['value']>;
    type weekDisplayChanged = JetElementCustomEventStrict<CDatePickerElement['weekDisplay']>;
    type widthChanged = JetElementCustomEventStrict<CDatePickerElement['width']>;
}
export interface CDatePickerElementEventMap extends HTMLElementEventMap {
    'dayFormatterChanged': JetElementCustomEventStrict<CDatePickerElement['dayFormatter']>;
    'daysOutsideMonthChanged': JetElementCustomEventStrict<CDatePickerElement['daysOutsideMonth']>;
    'maxChanged': JetElementCustomEventStrict<CDatePickerElement['max']>;
    'maxWidthChanged': JetElementCustomEventStrict<CDatePickerElement['maxWidth']>;
    'minChanged': JetElementCustomEventStrict<CDatePickerElement['min']>;
    'monthAndYearPickerChanged': JetElementCustomEventStrict<CDatePickerElement['monthAndYearPicker']>;
    'readonlyChanged': JetElementCustomEventStrict<CDatePickerElement['readonly']>;
    'todayButtonChanged': JetElementCustomEventStrict<CDatePickerElement['todayButton']>;
    'todayTimeZoneChanged': JetElementCustomEventStrict<CDatePickerElement['todayTimeZone']>;
    'valueChanged': JetElementCustomEventStrict<CDatePickerElement['value']>;
    'weekDisplayChanged': JetElementCustomEventStrict<CDatePickerElement['weekDisplay']>;
    'widthChanged': JetElementCustomEventStrict<CDatePickerElement['width']>;
}
export interface CDatePickerElementSettableProperties extends JetSettableProperties {
    dayFormatter?: ComponentProps<typeof DatePicker>['dayFormatter'];
    daysOutsideMonth?: ComponentProps<typeof DatePicker>['daysOutsideMonth'];
    max?: ComponentProps<typeof DatePicker>['max'];
    maxWidth?: ComponentProps<typeof DatePicker>['maxWidth'];
    min?: ComponentProps<typeof DatePicker>['min'];
    monthAndYearPicker?: ComponentProps<typeof DatePicker>['monthAndYearPicker'];
    readonly?: ComponentProps<typeof DatePicker>['readonly'];
    todayButton?: ComponentProps<typeof DatePicker>['todayButton'];
    todayTimeZone?: ComponentProps<typeof DatePicker>['todayTimeZone'];
    value?: ComponentProps<typeof DatePicker>['value'];
    weekDisplay?: ComponentProps<typeof DatePicker>['weekDisplay'];
    width?: ComponentProps<typeof DatePicker>['width'];
}
export interface CDatePickerElementSettablePropertiesLenient extends Partial<CDatePickerElementSettableProperties> {
    [key: string]: any;
}
export interface DatePickerIntrinsicProps extends Partial<Readonly<CDatePickerElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    ondayFormatterChanged?: (value: CDatePickerElementEventMap['dayFormatterChanged']) => void;
    ondaysOutsideMonthChanged?: (value: CDatePickerElementEventMap['daysOutsideMonthChanged']) => void;
    onmaxChanged?: (value: CDatePickerElementEventMap['maxChanged']) => void;
    onmaxWidthChanged?: (value: CDatePickerElementEventMap['maxWidthChanged']) => void;
    onminChanged?: (value: CDatePickerElementEventMap['minChanged']) => void;
    onmonthAndYearPickerChanged?: (value: CDatePickerElementEventMap['monthAndYearPickerChanged']) => void;
    onreadonlyChanged?: (value: CDatePickerElementEventMap['readonlyChanged']) => void;
    ontodayButtonChanged?: (value: CDatePickerElementEventMap['todayButtonChanged']) => void;
    ontodayTimeZoneChanged?: (value: CDatePickerElementEventMap['todayTimeZoneChanged']) => void;
    onvalueChanged?: (value: CDatePickerElementEventMap['valueChanged']) => void;
    onweekDisplayChanged?: (value: CDatePickerElementEventMap['weekDisplayChanged']) => void;
    onwidthChanged?: (value: CDatePickerElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-date-picker': DatePickerIntrinsicProps;
        }
    }
}
