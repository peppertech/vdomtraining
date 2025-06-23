import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import 'ojs/oj-jsx-interfaces';
import { InputText as PreactInputText } from '@oracle/oraclejet-preact/UNSAFE_InputText';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, GlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType, Ref } from 'preact';
import { FormatObj, ParseObj } from '@oracle/oraclejet-preact/UNSAFE_IntlFormatParse';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { DateISOStr } from '@oracle/oraclejet-preact/UNSAFE_IntlDateTime';
import 'css!oj-c/input-date-text/input-date-text-styles.css';
type PreactInputTextProps = ComponentProps<typeof PreactInputText>;
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type DateConverter = FormatObj<string> & ParseObj<string>;
type Props = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    autocomplete?: 'on' | 'off' | string;
    autofocus?: GlobalProps['autofocus'];
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    converter?: DateConverter | null;
    dateRangeOverflowMessageDetail?: string;
    dateRangeUnderflowMessageDetail?: string;
    disabled?: boolean;
    displayOptions?: DisplayOptions;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactInputTextProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    max?: DateISOStr | null;
    messagesCustom?: PreactInputTextProps['messages'];
    min?: DateISOStr | null;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactInputTextProps['textAlign'];
    userAssistanceDensity?: PreactInputTextProps['userAssistanceDensity'];
    validators?: (AsyncValidator<DateISOStr> | Validator<DateISOStr>)[] | null;
    value?: DateISOStr | null;
    onMessagesCustomChanged?: PropertyChanged<PreactInputTextProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<string>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<string | null>;
};
type InputDateTextHandle = {
    blur: () => void;
    focus: () => void;
    showMessages: () => void;
    reset: () => void;
    validate: () => Promise<'valid' | 'invalid'>;
};
declare const InputDateTextImpl: ({ autocomplete, columnSpan, containerReadonly: propContainerReadonly, converter, disabled, displayOptions, help, helpHints, id, labelWrapping: propLabelWrapping, messagesCustom, readonly: propReadonly, required, userAssistanceDensity: propUserAssistanceDensity, validators, value, ...otherProps }: Props, ref: Ref<InputDateTextHandle>) => import("preact").JSX.Element;
export declare const InputDateText: ComponentType<ExtendGlobalProps<ComponentProps<typeof InputDateTextImpl>>>;
export type InputDateTextProps = Props;
export {};
export interface CInputDateTextElement extends JetElement<CInputDateTextElementSettableProperties>, CInputDateTextElementSettableProperties {
    readonly rawValue?: Parameters<Required<Props>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props>['onValidChanged']>[0];
    addEventListener<T extends keyof CInputDateTextElementEventMap>(type: T, listener: (this: HTMLElement, ev: CInputDateTextElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CInputDateTextElementSettableProperties>(property: T): CInputDateTextElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CInputDateTextElementSettableProperties>(property: T, value: CInputDateTextElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CInputDateTextElementSettableProperties>): void;
    setProperties(properties: CInputDateTextElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CInputDateTextElement {
    type autocompleteChanged = JetElementCustomEventStrict<CInputDateTextElement['autocomplete']>;
    type columnSpanChanged = JetElementCustomEventStrict<CInputDateTextElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CInputDateTextElement['containerReadonly']>;
    type converterChanged = JetElementCustomEventStrict<CInputDateTextElement['converter']>;
    type dateRangeOverflowMessageDetailChanged = JetElementCustomEventStrict<CInputDateTextElement['dateRangeOverflowMessageDetail']>;
    type dateRangeUnderflowMessageDetailChanged = JetElementCustomEventStrict<CInputDateTextElement['dateRangeUnderflowMessageDetail']>;
    type disabledChanged = JetElementCustomEventStrict<CInputDateTextElement['disabled']>;
    type displayOptionsChanged = JetElementCustomEventStrict<CInputDateTextElement['displayOptions']>;
    type helpChanged = JetElementCustomEventStrict<CInputDateTextElement['help']>;
    type helpHintsChanged = JetElementCustomEventStrict<CInputDateTextElement['helpHints']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CInputDateTextElement['labelEdge']>;
    type labelHintChanged = JetElementCustomEventStrict<CInputDateTextElement['labelHint']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CInputDateTextElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CInputDateTextElement['labelWrapping']>;
    type maxChanged = JetElementCustomEventStrict<CInputDateTextElement['max']>;
    type messagesCustomChanged = JetElementCustomEventStrict<CInputDateTextElement['messagesCustom']>;
    type minChanged = JetElementCustomEventStrict<CInputDateTextElement['min']>;
    type rawValueChanged = JetElementCustomEventStrict<CInputDateTextElement['rawValue']>;
    type readonlyChanged = JetElementCustomEventStrict<CInputDateTextElement['readonly']>;
    type requiredChanged = JetElementCustomEventStrict<CInputDateTextElement['required']>;
    type requiredMessageDetailChanged = JetElementCustomEventStrict<CInputDateTextElement['requiredMessageDetail']>;
    type textAlignChanged = JetElementCustomEventStrict<CInputDateTextElement['textAlign']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CInputDateTextElement['userAssistanceDensity']>;
    type validChanged = JetElementCustomEventStrict<CInputDateTextElement['valid']>;
    type validatorsChanged = JetElementCustomEventStrict<CInputDateTextElement['validators']>;
    type valueChanged = JetElementCustomEventStrict<CInputDateTextElement['value']>;
}
export interface CInputDateTextElementEventMap extends HTMLElementEventMap {
    'autocompleteChanged': JetElementCustomEventStrict<CInputDateTextElement['autocomplete']>;
    'columnSpanChanged': JetElementCustomEventStrict<CInputDateTextElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CInputDateTextElement['containerReadonly']>;
    'converterChanged': JetElementCustomEventStrict<CInputDateTextElement['converter']>;
    'dateRangeOverflowMessageDetailChanged': JetElementCustomEventStrict<CInputDateTextElement['dateRangeOverflowMessageDetail']>;
    'dateRangeUnderflowMessageDetailChanged': JetElementCustomEventStrict<CInputDateTextElement['dateRangeUnderflowMessageDetail']>;
    'disabledChanged': JetElementCustomEventStrict<CInputDateTextElement['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CInputDateTextElement['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CInputDateTextElement['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CInputDateTextElement['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CInputDateTextElement['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CInputDateTextElement['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CInputDateTextElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CInputDateTextElement['labelWrapping']>;
    'maxChanged': JetElementCustomEventStrict<CInputDateTextElement['max']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CInputDateTextElement['messagesCustom']>;
    'minChanged': JetElementCustomEventStrict<CInputDateTextElement['min']>;
    'rawValueChanged': JetElementCustomEventStrict<CInputDateTextElement['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CInputDateTextElement['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CInputDateTextElement['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CInputDateTextElement['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CInputDateTextElement['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CInputDateTextElement['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CInputDateTextElement['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CInputDateTextElement['validators']>;
    'valueChanged': JetElementCustomEventStrict<CInputDateTextElement['value']>;
}
export interface CInputDateTextElementSettableProperties extends JetSettableProperties {
    autocomplete?: Props['autocomplete'];
    columnSpan?: Props['columnSpan'];
    containerReadonly?: Props['containerReadonly'];
    converter?: Props['converter'];
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
export interface CInputDateTextElementSettablePropertiesLenient extends Partial<CInputDateTextElementSettableProperties> {
    [key: string]: any;
}
export interface InputDateTextIntrinsicProps extends Partial<Readonly<CInputDateTextElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    onautocompleteChanged?: (value: CInputDateTextElementEventMap['autocompleteChanged']) => void;
    oncolumnSpanChanged?: (value: CInputDateTextElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CInputDateTextElementEventMap['containerReadonlyChanged']) => void;
    onconverterChanged?: (value: CInputDateTextElementEventMap['converterChanged']) => void;
    ondateRangeOverflowMessageDetailChanged?: (value: CInputDateTextElementEventMap['dateRangeOverflowMessageDetailChanged']) => void;
    ondateRangeUnderflowMessageDetailChanged?: (value: CInputDateTextElementEventMap['dateRangeUnderflowMessageDetailChanged']) => void;
    ondisabledChanged?: (value: CInputDateTextElementEventMap['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CInputDateTextElementEventMap['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CInputDateTextElementEventMap['helpChanged']) => void;
    onhelpHintsChanged?: (value: CInputDateTextElementEventMap['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CInputDateTextElementEventMap['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CInputDateTextElementEventMap['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CInputDateTextElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CInputDateTextElementEventMap['labelWrappingChanged']) => void;
    onmaxChanged?: (value: CInputDateTextElementEventMap['maxChanged']) => void;
    onmessagesCustomChanged?: (value: CInputDateTextElementEventMap['messagesCustomChanged']) => void;
    onminChanged?: (value: CInputDateTextElementEventMap['minChanged']) => void;
    onrawValueChanged?: (value: CInputDateTextElementEventMap['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CInputDateTextElementEventMap['readonlyChanged']) => void;
    onrequiredChanged?: (value: CInputDateTextElementEventMap['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CInputDateTextElementEventMap['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CInputDateTextElementEventMap['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CInputDateTextElementEventMap['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CInputDateTextElementEventMap['validChanged']) => void;
    onvalidatorsChanged?: (value: CInputDateTextElementEventMap['validatorsChanged']) => void;
    onvalueChanged?: (value: CInputDateTextElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-input-date-text': InputDateTextIntrinsicProps;
        }
    }
}
