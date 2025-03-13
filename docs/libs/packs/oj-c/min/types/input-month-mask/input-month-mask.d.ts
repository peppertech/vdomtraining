import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { CalendarMonth, CalendarMonthRequired, InputDateMask as PreactInputDateMask } from '@oracle/oraclejet-preact/UNSAFE_InputDateMask';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType, Ref } from 'preact';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import 'css!oj-c/input-month-mask/input-month-mask-styles.css';
import type { OverflowMessageDetailParameters, UnderflowMessageDetailParameters } from './CalendarMonthRangeValidator';
type PreactInputDateMaskProps = ComponentProps<typeof PreactInputDateMask>;
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type DisplayOptionsProps = Omit<DisplayOptions, 'converterHint'>;
type Props = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    dateRangeOverflowMessageDetail?: (p: OverflowMessageDetailParameters) => string;
    dateRangeUnderflowMessageDetail?: (p: UnderflowMessageDetailParameters) => string;
    disabled?: boolean;
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactInputDateMaskProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    max?: CalendarMonthRequired | null;
    messagesCustom?: PreactInputDateMaskProps['messages'];
    min?: CalendarMonthRequired | null;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactInputDateMaskProps['textAlign'];
    userAssistanceDensity?: PreactInputDateMaskProps['userAssistanceDensity'];
    validators?: (AsyncValidator<CalendarMonthRequired> | Validator<CalendarMonthRequired>)[] | null;
    value?: CalendarMonthRequired | null;
    onMessagesCustomChanged?: PropertyChanged<PreactInputDateMaskProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<CalendarMonth | undefined>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<CalendarMonthRequired | null>;
};
type InputMonthMaskHandle = {
    blur: () => void;
    focus: () => void;
    showMessages: () => void;
    reset: () => void;
    validate: () => Promise<'valid' | 'invalid'>;
};
declare const InputMonthMaskImpl: ({ columnSpan, containerReadonly: propContainerReadonly, disabled, displayOptions, help, helpHints, labelWrapping: propLabelWrapping, messagesCustom, readonly: propReadonly, required, userAssistanceDensity: propUserAssistanceDensity, validators, value, ...otherProps }: Props, ref: Ref<InputMonthMaskHandle>) => import("preact").JSX.Element;
export declare const InputMonthMask: ComponentType<ExtendGlobalProps<ComponentProps<typeof InputMonthMaskImpl>>>;
export type InputMonthMaskProps = Props;
export {};
export interface CInputMonthMaskElement extends JetElement<CInputMonthMaskElementSettableProperties>, CInputMonthMaskElementSettableProperties {
    readonly rawValue?: Parameters<Required<Props>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props>['onValidChanged']>[0];
    addEventListener<T extends keyof CInputMonthMaskElementEventMap>(type: T, listener: (this: HTMLElement, ev: CInputMonthMaskElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CInputMonthMaskElementSettableProperties>(property: T): CInputMonthMaskElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CInputMonthMaskElementSettableProperties>(property: T, value: CInputMonthMaskElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CInputMonthMaskElementSettableProperties>): void;
    setProperties(properties: CInputMonthMaskElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CInputMonthMaskElement {
    type columnSpanChanged = JetElementCustomEventStrict<CInputMonthMaskElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CInputMonthMaskElement['containerReadonly']>;
    type dateRangeOverflowMessageDetailChanged = JetElementCustomEventStrict<CInputMonthMaskElement['dateRangeOverflowMessageDetail']>;
    type dateRangeUnderflowMessageDetailChanged = JetElementCustomEventStrict<CInputMonthMaskElement['dateRangeUnderflowMessageDetail']>;
    type disabledChanged = JetElementCustomEventStrict<CInputMonthMaskElement['disabled']>;
    type displayOptionsChanged = JetElementCustomEventStrict<CInputMonthMaskElement['displayOptions']>;
    type helpChanged = JetElementCustomEventStrict<CInputMonthMaskElement['help']>;
    type helpHintsChanged = JetElementCustomEventStrict<CInputMonthMaskElement['helpHints']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CInputMonthMaskElement['labelEdge']>;
    type labelHintChanged = JetElementCustomEventStrict<CInputMonthMaskElement['labelHint']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CInputMonthMaskElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CInputMonthMaskElement['labelWrapping']>;
    type maxChanged = JetElementCustomEventStrict<CInputMonthMaskElement['max']>;
    type messagesCustomChanged = JetElementCustomEventStrict<CInputMonthMaskElement['messagesCustom']>;
    type minChanged = JetElementCustomEventStrict<CInputMonthMaskElement['min']>;
    type rawValueChanged = JetElementCustomEventStrict<CInputMonthMaskElement['rawValue']>;
    type readonlyChanged = JetElementCustomEventStrict<CInputMonthMaskElement['readonly']>;
    type requiredChanged = JetElementCustomEventStrict<CInputMonthMaskElement['required']>;
    type requiredMessageDetailChanged = JetElementCustomEventStrict<CInputMonthMaskElement['requiredMessageDetail']>;
    type textAlignChanged = JetElementCustomEventStrict<CInputMonthMaskElement['textAlign']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CInputMonthMaskElement['userAssistanceDensity']>;
    type validChanged = JetElementCustomEventStrict<CInputMonthMaskElement['valid']>;
    type validatorsChanged = JetElementCustomEventStrict<CInputMonthMaskElement['validators']>;
    type valueChanged = JetElementCustomEventStrict<CInputMonthMaskElement['value']>;
}
export interface CInputMonthMaskElementEventMap extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CInputMonthMaskElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CInputMonthMaskElement['containerReadonly']>;
    'dateRangeOverflowMessageDetailChanged': JetElementCustomEventStrict<CInputMonthMaskElement['dateRangeOverflowMessageDetail']>;
    'dateRangeUnderflowMessageDetailChanged': JetElementCustomEventStrict<CInputMonthMaskElement['dateRangeUnderflowMessageDetail']>;
    'disabledChanged': JetElementCustomEventStrict<CInputMonthMaskElement['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CInputMonthMaskElement['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CInputMonthMaskElement['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CInputMonthMaskElement['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CInputMonthMaskElement['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CInputMonthMaskElement['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CInputMonthMaskElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CInputMonthMaskElement['labelWrapping']>;
    'maxChanged': JetElementCustomEventStrict<CInputMonthMaskElement['max']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CInputMonthMaskElement['messagesCustom']>;
    'minChanged': JetElementCustomEventStrict<CInputMonthMaskElement['min']>;
    'rawValueChanged': JetElementCustomEventStrict<CInputMonthMaskElement['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CInputMonthMaskElement['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CInputMonthMaskElement['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CInputMonthMaskElement['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CInputMonthMaskElement['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CInputMonthMaskElement['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CInputMonthMaskElement['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CInputMonthMaskElement['validators']>;
    'valueChanged': JetElementCustomEventStrict<CInputMonthMaskElement['value']>;
}
export interface CInputMonthMaskElementSettableProperties extends JetSettableProperties {
    columnSpan?: Props['columnSpan'];
    containerReadonly?: Props['containerReadonly'];
    dateRangeOverflowMessageDetail?: Props['dateRangeOverflowMessageDetail'];
    dateRangeUnderflowMessageDetail?: Props['dateRangeUnderflowMessageDetail'];
    disabled?: Props['disabled'];
    displayOptions?: Props['displayOptions'];
    help?: Props['help'];
    helpHints?: Props['helpHints'];
    labelEdge?: Props['labelEdge'];
    labelHint: Props['labelHint'];
    labelStartWidth?: Props['labelStartWidth'];
    labelWrapping?: Props['labelWrapping'];
    max?: Props['max'];
    messagesCustom?: Props['messagesCustom'];
    min?: Props['min'];
    readonly?: Props['readonly'];
    required?: Props['required'];
    requiredMessageDetail?: Props['requiredMessageDetail'];
    textAlign?: Props['textAlign'];
    userAssistanceDensity?: Props['userAssistanceDensity'];
    validators?: Props['validators'];
    value?: Props['value'];
}
export interface CInputMonthMaskElementSettablePropertiesLenient extends Partial<CInputMonthMaskElementSettableProperties> {
    [key: string]: any;
}
export interface InputMonthMaskIntrinsicProps extends Partial<Readonly<CInputMonthMaskElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    oncolumnSpanChanged?: (value: CInputMonthMaskElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CInputMonthMaskElementEventMap['containerReadonlyChanged']) => void;
    ondateRangeOverflowMessageDetailChanged?: (value: CInputMonthMaskElementEventMap['dateRangeOverflowMessageDetailChanged']) => void;
    ondateRangeUnderflowMessageDetailChanged?: (value: CInputMonthMaskElementEventMap['dateRangeUnderflowMessageDetailChanged']) => void;
    ondisabledChanged?: (value: CInputMonthMaskElementEventMap['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CInputMonthMaskElementEventMap['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CInputMonthMaskElementEventMap['helpChanged']) => void;
    onhelpHintsChanged?: (value: CInputMonthMaskElementEventMap['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CInputMonthMaskElementEventMap['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CInputMonthMaskElementEventMap['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CInputMonthMaskElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CInputMonthMaskElementEventMap['labelWrappingChanged']) => void;
    onmaxChanged?: (value: CInputMonthMaskElementEventMap['maxChanged']) => void;
    onmessagesCustomChanged?: (value: CInputMonthMaskElementEventMap['messagesCustomChanged']) => void;
    onminChanged?: (value: CInputMonthMaskElementEventMap['minChanged']) => void;
    onrawValueChanged?: (value: CInputMonthMaskElementEventMap['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CInputMonthMaskElementEventMap['readonlyChanged']) => void;
    onrequiredChanged?: (value: CInputMonthMaskElementEventMap['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CInputMonthMaskElementEventMap['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CInputMonthMaskElementEventMap['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CInputMonthMaskElementEventMap['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CInputMonthMaskElementEventMap['validChanged']) => void;
    onvalidatorsChanged?: (value: CInputMonthMaskElementEventMap['validatorsChanged']) => void;
    onvalueChanged?: (value: CInputMonthMaskElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-input-month-mask': InputMonthMaskIntrinsicProps;
        }
    }
}
