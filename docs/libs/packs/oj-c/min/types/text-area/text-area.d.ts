import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import 'ojs/oj-jsx-interfaces';
import { TextArea as PreactTextArea } from '@oracle/oraclejet-preact/UNSAFE_TextArea';
import { Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Converter = require('ojs/ojconverter');
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, GlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { Component, ComponentProps } from 'preact';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import 'css!oj-c/text-area/text-area-styles.css';
type PreactTextAreaProps = ComponentProps<typeof PreactTextArea>;
type DisplayOptions = {
    converterHint?: 'display' | 'none';
    messages?: 'display' | 'none';
    validatorHint?: 'display' | 'none';
};
type Length = {
    countBy?: 'codePoint' | 'codeUnit';
    counter?: 'none' | 'remaining';
    max?: number | null;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type Props<V> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    autocomplete?: 'on' | 'off' | string;
    autofocus?: GlobalProps['autofocus'];
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    converter?: Converter<V> | null;
    disabled?: boolean;
    displayOptions?: DisplayOptions;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactTextAreaProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    length?: Length;
    maxRows?: number;
    messagesCustom?: PreactTextAreaProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    resizeBehavior?: PreactTextAreaProps['resize'] | 'none';
    rows?: number;
    textAlign?: PreactTextAreaProps['textAlign'];
    unsafe_labelledBy?: string;
    userAssistanceDensity?: PreactTextAreaProps['userAssistanceDensity'];
    validators?: (AsyncValidator<V> | Validator<V>)[] | null;
    value?: V | null;
    onMessagesCustomChanged?: PropertyChanged<PreactTextAreaProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<string>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<V>;
};
export declare class TextArea<V> extends Component<ExtendGlobalProps<Props<V>>> {
    static defaultProps: Partial<Props<any>>;
    private busyContextRef;
    private textAreaRef;
    private rootRef;
    componentDidMount(): void;
    render({ columnSpan, ...props }: ExtendGlobalProps<Props<V>>): import("preact").JSX.Element;
    componentWillUnmount(): void;
    reset(): void;
    showMessages(): void;
    validate(): Promise<'valid' | 'invalid'>;
    blur(): void;
    focus(): void;
}
export {};
export interface CTextAreaElement<V> extends JetElement<CTextAreaElementSettableProperties<V>>, CTextAreaElementSettableProperties<V> {
    readonly rawValue?: Parameters<Required<Props<V>>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props<V>>['onValidChanged']>[0];
    addEventListener<T extends keyof CTextAreaElementEventMap<V>>(type: T, listener: (this: HTMLElement, ev: CTextAreaElementEventMap<V>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTextAreaElementSettableProperties<V>>(property: T): CTextAreaElement<V>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTextAreaElementSettableProperties<V>>(property: T, value: CTextAreaElementSettableProperties<V>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTextAreaElementSettableProperties<V>>): void;
    setProperties(properties: CTextAreaElementSettablePropertiesLenient<V>): void;
    blur: TextArea<V>['blur'];
    focus: TextArea<V>['focus'];
    reset: TextArea<V>['reset'];
    showMessages: TextArea<V>['showMessages'];
    validate: TextArea<V>['validate'];
}
export namespace CTextAreaElement {
    type autocompleteChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['autocomplete']>;
    type columnSpanChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['columnSpan']>;
    type containerReadonlyChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['containerReadonly']>;
    type converterChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['converter']>;
    type disabledChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['disabled']>;
    type displayOptionsChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['displayOptions']>;
    type helpChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['help']>;
    type helpHintsChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['helpHints']>;
    type labelEdgeChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['labelEdge']>;
    type labelHintChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['labelHint']>;
    type labelStartWidthChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['labelStartWidth']>;
    type labelWrappingChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['labelWrapping']>;
    type lengthChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['length']>;
    type maxRowsChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['maxRows']>;
    type messagesCustomChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['messagesCustom']>;
    type placeholderChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['placeholder']>;
    type rawValueChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['rawValue']>;
    type readonlyChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['readonly']>;
    type requiredChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['required']>;
    type requiredMessageDetailChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['requiredMessageDetail']>;
    type resizeBehaviorChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['resizeBehavior']>;
    type rowsChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['rows']>;
    type textAlignChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['textAlign']>;
    type unsafe_labelledByChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['unsafe_labelledBy']>;
    type userAssistanceDensityChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['userAssistanceDensity']>;
    type validChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['valid']>;
    type validatorsChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['validators']>;
    type valueChanged<V> = JetElementCustomEventStrict<CTextAreaElement<V>['value']>;
}
export interface CTextAreaElementEventMap<V> extends HTMLElementEventMap {
    'autocompleteChanged': JetElementCustomEventStrict<CTextAreaElement<V>['autocomplete']>;
    'columnSpanChanged': JetElementCustomEventStrict<CTextAreaElement<V>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CTextAreaElement<V>['containerReadonly']>;
    'converterChanged': JetElementCustomEventStrict<CTextAreaElement<V>['converter']>;
    'disabledChanged': JetElementCustomEventStrict<CTextAreaElement<V>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CTextAreaElement<V>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CTextAreaElement<V>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CTextAreaElement<V>['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CTextAreaElement<V>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CTextAreaElement<V>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CTextAreaElement<V>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CTextAreaElement<V>['labelWrapping']>;
    'lengthChanged': JetElementCustomEventStrict<CTextAreaElement<V>['length']>;
    'maxRowsChanged': JetElementCustomEventStrict<CTextAreaElement<V>['maxRows']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CTextAreaElement<V>['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CTextAreaElement<V>['placeholder']>;
    'rawValueChanged': JetElementCustomEventStrict<CTextAreaElement<V>['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CTextAreaElement<V>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CTextAreaElement<V>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CTextAreaElement<V>['requiredMessageDetail']>;
    'resizeBehaviorChanged': JetElementCustomEventStrict<CTextAreaElement<V>['resizeBehavior']>;
    'rowsChanged': JetElementCustomEventStrict<CTextAreaElement<V>['rows']>;
    'textAlignChanged': JetElementCustomEventStrict<CTextAreaElement<V>['textAlign']>;
    'unsafe_labelledByChanged': JetElementCustomEventStrict<CTextAreaElement<V>['unsafe_labelledBy']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CTextAreaElement<V>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CTextAreaElement<V>['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CTextAreaElement<V>['validators']>;
    'valueChanged': JetElementCustomEventStrict<CTextAreaElement<V>['value']>;
}
export interface CTextAreaElementSettableProperties<V> extends JetSettableProperties {
    autocomplete?: Props<V>['autocomplete'];
    columnSpan?: Props<V>['columnSpan'];
    containerReadonly?: Props<V>['containerReadonly'];
    converter?: Props<V>['converter'];
    disabled?: Props<V>['disabled'];
    displayOptions?: Props<V>['displayOptions'];
    help?: Props<V>['help'];
    helpHints?: Props<V>['helpHints'];
    labelEdge?: Props<V>['labelEdge'];
    labelHint: Props<V>['labelHint'];
    labelStartWidth?: Props<V>['labelStartWidth'];
    labelWrapping?: Props<V>['labelWrapping'];
    length?: Props<V>['length'];
    maxRows?: Props<V>['maxRows'];
    messagesCustom?: Props<V>['messagesCustom'];
    placeholder?: Props<V>['placeholder'];
    readonly?: Props<V>['readonly'];
    required?: Props<V>['required'];
    requiredMessageDetail?: Props<V>['requiredMessageDetail'];
    resizeBehavior?: Props<V>['resizeBehavior'];
    rows?: Props<V>['rows'];
    textAlign?: Props<V>['textAlign'];
    unsafe_labelledBy?: Props<V>['unsafe_labelledBy'];
    userAssistanceDensity?: Props<V>['userAssistanceDensity'];
    validators?: Props<V>['validators'];
    value?: Props<V>['value'];
}
export interface CTextAreaElementSettablePropertiesLenient<V> extends Partial<CTextAreaElementSettableProperties<V>> {
    [key: string]: any;
}
export interface TextAreaIntrinsicProps extends Partial<Readonly<CTextAreaElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    onautocompleteChanged?: (value: CTextAreaElementEventMap<any>['autocompleteChanged']) => void;
    oncolumnSpanChanged?: (value: CTextAreaElementEventMap<any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CTextAreaElementEventMap<any>['containerReadonlyChanged']) => void;
    onconverterChanged?: (value: CTextAreaElementEventMap<any>['converterChanged']) => void;
    ondisabledChanged?: (value: CTextAreaElementEventMap<any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CTextAreaElementEventMap<any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CTextAreaElementEventMap<any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CTextAreaElementEventMap<any>['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CTextAreaElementEventMap<any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CTextAreaElementEventMap<any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CTextAreaElementEventMap<any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CTextAreaElementEventMap<any>['labelWrappingChanged']) => void;
    onlengthChanged?: (value: CTextAreaElementEventMap<any>['lengthChanged']) => void;
    onmaxRowsChanged?: (value: CTextAreaElementEventMap<any>['maxRowsChanged']) => void;
    onmessagesCustomChanged?: (value: CTextAreaElementEventMap<any>['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CTextAreaElementEventMap<any>['placeholderChanged']) => void;
    onrawValueChanged?: (value: CTextAreaElementEventMap<any>['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CTextAreaElementEventMap<any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CTextAreaElementEventMap<any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CTextAreaElementEventMap<any>['requiredMessageDetailChanged']) => void;
    onresizeBehaviorChanged?: (value: CTextAreaElementEventMap<any>['resizeBehaviorChanged']) => void;
    onrowsChanged?: (value: CTextAreaElementEventMap<any>['rowsChanged']) => void;
    ontextAlignChanged?: (value: CTextAreaElementEventMap<any>['textAlignChanged']) => void;
    onunsafe_labelledByChanged?: (value: CTextAreaElementEventMap<any>['unsafe_labelledByChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CTextAreaElementEventMap<any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CTextAreaElementEventMap<any>['validChanged']) => void;
    onvalidatorsChanged?: (value: CTextAreaElementEventMap<any>['validatorsChanged']) => void;
    onvalueChanged?: (value: CTextAreaElementEventMap<any>['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-text-area': TextAreaIntrinsicProps;
        }
    }
}
