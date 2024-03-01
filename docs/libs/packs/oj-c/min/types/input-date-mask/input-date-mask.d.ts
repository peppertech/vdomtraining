import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { CalendarDate, InputDateMask as PreactInputDateMask } from '@oracle/oraclejet-preact/UNSAFE_InputDateMask';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { Component, ComponentProps } from 'preact';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import 'css!oj-c/input-date-mask/input-date-mask-styles.css';
import { DateISOStr } from '@oracle/oraclejet-preact/UNSAFE_IntlDateTime';
type PreactInputDateMaskProps = ComponentProps<typeof PreactInputDateMask>;
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type Props = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    dateRangeOverflowMessageDetail?: string;
    dateRangeUnderflowMessageDetail?: string;
    disabled?: boolean;
    displayOptions?: Omit<DisplayOptions, 'converterHint'>;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactInputDateMaskProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    max?: DateISOStr | null;
    messagesCustom?: PreactInputDateMaskProps['messages'];
    min?: DateISOStr | null;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactInputDateMaskProps['textAlign'];
    userAssistanceDensity?: PreactInputDateMaskProps['userAssistanceDensity'];
    validators?: (AsyncValidator<DateISOStr> | Validator<DateISOStr>)[] | null;
    value?: DateISOStr | null;
    onMessagesCustomChanged?: PropertyChanged<PreactInputDateMaskProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<CalendarDate>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<string>;
};
export declare class InputDateMask extends Component<ExtendGlobalProps<Props>> {
    static defaultProps: Partial<Props>;
    private busyContextRef;
    private inputDateMaskRef;
    private rootRef;
    componentDidMount(): void;
    render({ columnSpan, ...props }: ExtendGlobalProps<Props>): import("preact").JSX.Element;
    componentWillUnmount(): void;
    reset(): void;
    showMessages(): void;
    validate(): Promise<'valid' | 'invalid'>;
    blur(): void;
    focus(): void;
}
export type InputDateMaskProps = Props;
export {};
export interface CInputDateMaskElement extends JetElement<CInputDateMaskElementSettableProperties>, CInputDateMaskElementSettableProperties {
    readonly rawValue?: Parameters<Required<Props>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props>['onValidChanged']>[0];
    addEventListener<T extends keyof CInputDateMaskElementEventMap>(type: T, listener: (this: HTMLElement, ev: CInputDateMaskElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CInputDateMaskElementSettableProperties>(property: T): CInputDateMaskElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CInputDateMaskElementSettableProperties>(property: T, value: CInputDateMaskElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CInputDateMaskElementSettableProperties>): void;
    setProperties(properties: CInputDateMaskElementSettablePropertiesLenient): void;
    blur: InputDateMask['blur'];
    focus: InputDateMask['focus'];
    reset: InputDateMask['reset'];
    showMessages: InputDateMask['showMessages'];
    validate: InputDateMask['validate'];
}
export namespace CInputDateMaskElement {
    type columnSpanChanged = JetElementCustomEventStrict<CInputDateMaskElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CInputDateMaskElement['containerReadonly']>;
    type dateRangeOverflowMessageDetailChanged = JetElementCustomEventStrict<CInputDateMaskElement['dateRangeOverflowMessageDetail']>;
    type dateRangeUnderflowMessageDetailChanged = JetElementCustomEventStrict<CInputDateMaskElement['dateRangeUnderflowMessageDetail']>;
    type disabledChanged = JetElementCustomEventStrict<CInputDateMaskElement['disabled']>;
    type displayOptionsChanged = JetElementCustomEventStrict<CInputDateMaskElement['displayOptions']>;
    type helpChanged = JetElementCustomEventStrict<CInputDateMaskElement['help']>;
    type helpHintsChanged = JetElementCustomEventStrict<CInputDateMaskElement['helpHints']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CInputDateMaskElement['labelEdge']>;
    type labelHintChanged = JetElementCustomEventStrict<CInputDateMaskElement['labelHint']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CInputDateMaskElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CInputDateMaskElement['labelWrapping']>;
    type maxChanged = JetElementCustomEventStrict<CInputDateMaskElement['max']>;
    type messagesCustomChanged = JetElementCustomEventStrict<CInputDateMaskElement['messagesCustom']>;
    type minChanged = JetElementCustomEventStrict<CInputDateMaskElement['min']>;
    type rawValueChanged = JetElementCustomEventStrict<CInputDateMaskElement['rawValue']>;
    type readonlyChanged = JetElementCustomEventStrict<CInputDateMaskElement['readonly']>;
    type requiredChanged = JetElementCustomEventStrict<CInputDateMaskElement['required']>;
    type requiredMessageDetailChanged = JetElementCustomEventStrict<CInputDateMaskElement['requiredMessageDetail']>;
    type textAlignChanged = JetElementCustomEventStrict<CInputDateMaskElement['textAlign']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CInputDateMaskElement['userAssistanceDensity']>;
    type validChanged = JetElementCustomEventStrict<CInputDateMaskElement['valid']>;
    type validatorsChanged = JetElementCustomEventStrict<CInputDateMaskElement['validators']>;
    type valueChanged = JetElementCustomEventStrict<CInputDateMaskElement['value']>;
}
export interface CInputDateMaskElementEventMap extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CInputDateMaskElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CInputDateMaskElement['containerReadonly']>;
    'dateRangeOverflowMessageDetailChanged': JetElementCustomEventStrict<CInputDateMaskElement['dateRangeOverflowMessageDetail']>;
    'dateRangeUnderflowMessageDetailChanged': JetElementCustomEventStrict<CInputDateMaskElement['dateRangeUnderflowMessageDetail']>;
    'disabledChanged': JetElementCustomEventStrict<CInputDateMaskElement['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CInputDateMaskElement['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CInputDateMaskElement['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CInputDateMaskElement['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CInputDateMaskElement['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CInputDateMaskElement['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CInputDateMaskElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CInputDateMaskElement['labelWrapping']>;
    'maxChanged': JetElementCustomEventStrict<CInputDateMaskElement['max']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CInputDateMaskElement['messagesCustom']>;
    'minChanged': JetElementCustomEventStrict<CInputDateMaskElement['min']>;
    'rawValueChanged': JetElementCustomEventStrict<CInputDateMaskElement['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CInputDateMaskElement['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CInputDateMaskElement['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CInputDateMaskElement['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CInputDateMaskElement['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CInputDateMaskElement['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CInputDateMaskElement['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CInputDateMaskElement['validators']>;
    'valueChanged': JetElementCustomEventStrict<CInputDateMaskElement['value']>;
}
export interface CInputDateMaskElementSettableProperties extends JetSettableProperties {
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
export interface CInputDateMaskElementSettablePropertiesLenient extends Partial<CInputDateMaskElementSettableProperties> {
    [key: string]: any;
}
export interface InputDateMaskIntrinsicProps extends Partial<Readonly<CInputDateMaskElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    oncolumnSpanChanged?: (value: CInputDateMaskElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CInputDateMaskElementEventMap['containerReadonlyChanged']) => void;
    ondateRangeOverflowMessageDetailChanged?: (value: CInputDateMaskElementEventMap['dateRangeOverflowMessageDetailChanged']) => void;
    ondateRangeUnderflowMessageDetailChanged?: (value: CInputDateMaskElementEventMap['dateRangeUnderflowMessageDetailChanged']) => void;
    ondisabledChanged?: (value: CInputDateMaskElementEventMap['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CInputDateMaskElementEventMap['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CInputDateMaskElementEventMap['helpChanged']) => void;
    onhelpHintsChanged?: (value: CInputDateMaskElementEventMap['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CInputDateMaskElementEventMap['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CInputDateMaskElementEventMap['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CInputDateMaskElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CInputDateMaskElementEventMap['labelWrappingChanged']) => void;
    onmaxChanged?: (value: CInputDateMaskElementEventMap['maxChanged']) => void;
    onmessagesCustomChanged?: (value: CInputDateMaskElementEventMap['messagesCustomChanged']) => void;
    onminChanged?: (value: CInputDateMaskElementEventMap['minChanged']) => void;
    onrawValueChanged?: (value: CInputDateMaskElementEventMap['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CInputDateMaskElementEventMap['readonlyChanged']) => void;
    onrequiredChanged?: (value: CInputDateMaskElementEventMap['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CInputDateMaskElementEventMap['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CInputDateMaskElementEventMap['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CInputDateMaskElementEventMap['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CInputDateMaskElementEventMap['validChanged']) => void;
    onvalidatorsChanged?: (value: CInputDateMaskElementEventMap['validatorsChanged']) => void;
    onvalueChanged?: (value: CInputDateMaskElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-input-date-mask': InputDateMaskIntrinsicProps;
        }
    }
}
