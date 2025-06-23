import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { InputSensitiveText as PreactInputSensitiveText } from '@oracle/oraclejet-preact/UNSAFE_InputSensitiveText';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, GlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import 'css!oj-c/input-sensitive-text/input-sensitive-text-styles.css';
type PreactInputSensitiveTextProps = ComponentProps<typeof PreactInputSensitiveText>;
type Length = {
    countBy?: 'codePoint' | 'codeUnit';
    max?: number | null;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type DisplayOptionsProps = Omit<DisplayOptions, 'converterHint'>;
type Props<V> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    autofocus?: GlobalProps['autofocus'];
    clearIcon?: 'always' | 'never' | 'conditional';
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    disabled?: boolean;
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactInputSensitiveTextProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    length?: Length;
    maskIcon?: 'visible' | 'hidden';
    maskIconLabel?: string;
    messagesCustom?: PreactInputSensitiveTextProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactInputSensitiveTextProps['textAlign'];
    userAssistanceDensity?: PreactInputSensitiveTextProps['userAssistanceDensity'];
    validators?: (AsyncValidator<V> | Validator<V>)[] | null;
    value?: V | null;
    virtualKeyboard?: PreactInputSensitiveTextProps['virtualKeyboard'];
    onMessagesCustomChanged?: PropertyChanged<PreactInputSensitiveTextProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<string>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<V | null>;
};
type InputSensitiveTextHandle = {
    blur: () => void;
    focus: () => void;
    showMessages: () => void;
    reset: () => void;
    validate: () => Promise<'valid' | 'invalid'>;
};
declare const FunctionalInputSensitiveText: import("preact").FunctionalComponent<import("preact/compat").PropsWithoutRef<Props<string>> & {
    ref?: import("preact").Ref<InputSensitiveTextHandle> | undefined;
}>;
export declare const InputSensitiveText: ComponentType<ExtendGlobalProps<ComponentProps<typeof FunctionalInputSensitiveText>>>;
export type InputSensitiveTextProps<V extends string = string> = Props<V>;
export {};
export interface CInputSensitiveTextElement<V extends string = string> extends JetElement<CInputSensitiveTextElementSettableProperties<V>>, CInputSensitiveTextElementSettableProperties<V> {
    readonly rawValue?: Parameters<Required<Props<V>>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props<V>>['onValidChanged']>[0];
    addEventListener<T extends keyof CInputSensitiveTextElementEventMap<V>>(type: T, listener: (this: HTMLElement, ev: CInputSensitiveTextElementEventMap<V>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CInputSensitiveTextElementSettableProperties<V>>(property: T): CInputSensitiveTextElement<V>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CInputSensitiveTextElementSettableProperties<V>>(property: T, value: CInputSensitiveTextElementSettableProperties<V>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CInputSensitiveTextElementSettableProperties<V>>): void;
    setProperties(properties: CInputSensitiveTextElementSettablePropertiesLenient<V>): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CInputSensitiveTextElement {
    type clearIconChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['clearIcon']>;
    type columnSpanChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['columnSpan']>;
    type containerReadonlyChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['containerReadonly']>;
    type disabledChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['disabled']>;
    type displayOptionsChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['displayOptions']>;
    type helpChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['help']>;
    type helpHintsChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['helpHints']>;
    type labelEdgeChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelEdge']>;
    type labelHintChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelHint']>;
    type labelStartWidthChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelStartWidth']>;
    type labelWrappingChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelWrapping']>;
    type lengthChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['length']>;
    type maskIconChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['maskIcon']>;
    type maskIconLabelChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['maskIconLabel']>;
    type messagesCustomChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['messagesCustom']>;
    type placeholderChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['placeholder']>;
    type rawValueChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['rawValue']>;
    type readonlyChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['readonly']>;
    type requiredChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['required']>;
    type requiredMessageDetailChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['requiredMessageDetail']>;
    type textAlignChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['textAlign']>;
    type userAssistanceDensityChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['userAssistanceDensity']>;
    type validChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['valid']>;
    type validatorsChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['validators']>;
    type valueChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['value']>;
    type virtualKeyboardChanged<V extends string = string> = JetElementCustomEventStrict<CInputSensitiveTextElement<V>['virtualKeyboard']>;
}
export interface CInputSensitiveTextElementEventMap<V extends string = string> extends HTMLElementEventMap {
    'clearIconChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['clearIcon']>;
    'columnSpanChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['containerReadonly']>;
    'disabledChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['labelWrapping']>;
    'lengthChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['length']>;
    'maskIconChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['maskIcon']>;
    'maskIconLabelChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['maskIconLabel']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['placeholder']>;
    'rawValueChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['validators']>;
    'valueChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['value']>;
    'virtualKeyboardChanged': JetElementCustomEventStrict<CInputSensitiveTextElement<V>['virtualKeyboard']>;
}
export interface CInputSensitiveTextElementSettableProperties<V> extends JetSettableProperties {
    clearIcon?: Props<V>['clearIcon'];
    columnSpan?: Props<V>['columnSpan'];
    containerReadonly?: Props<V>['containerReadonly'];
    disabled?: Props<V>['disabled'];
    displayOptions?: Props<V>['displayOptions'];
    help?: Props<V>['help'];
    helpHints?: Props<V>['helpHints'];
    labelEdge?: Props<V>['labelEdge'];
    labelHint: Props<V>['labelHint'];
    labelStartWidth?: Props<V>['labelStartWidth'];
    labelWrapping?: Props<V>['labelWrapping'];
    length?: Props<V>['length'];
    maskIcon?: Props<V>['maskIcon'];
    maskIconLabel?: Props<V>['maskIconLabel'];
    messagesCustom?: Props<V>['messagesCustom'];
    placeholder?: Props<V>['placeholder'];
    readonly?: Props<V>['readonly'];
    required?: Props<V>['required'];
    requiredMessageDetail?: Props<V>['requiredMessageDetail'];
    textAlign?: Props<V>['textAlign'];
    userAssistanceDensity?: Props<V>['userAssistanceDensity'];
    validators?: Props<V>['validators'];
    value?: Props<V>['value'];
    virtualKeyboard?: Props<V>['virtualKeyboard'];
}
export interface CInputSensitiveTextElementSettablePropertiesLenient<V> extends Partial<CInputSensitiveTextElementSettableProperties<V>> {
    [key: string]: any;
}
export interface InputSensitiveTextIntrinsicProps extends Partial<Readonly<CInputSensitiveTextElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    onclearIconChanged?: (value: CInputSensitiveTextElementEventMap<any>['clearIconChanged']) => void;
    oncolumnSpanChanged?: (value: CInputSensitiveTextElementEventMap<any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CInputSensitiveTextElementEventMap<any>['containerReadonlyChanged']) => void;
    ondisabledChanged?: (value: CInputSensitiveTextElementEventMap<any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CInputSensitiveTextElementEventMap<any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CInputSensitiveTextElementEventMap<any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CInputSensitiveTextElementEventMap<any>['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CInputSensitiveTextElementEventMap<any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CInputSensitiveTextElementEventMap<any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CInputSensitiveTextElementEventMap<any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CInputSensitiveTextElementEventMap<any>['labelWrappingChanged']) => void;
    onlengthChanged?: (value: CInputSensitiveTextElementEventMap<any>['lengthChanged']) => void;
    onmaskIconChanged?: (value: CInputSensitiveTextElementEventMap<any>['maskIconChanged']) => void;
    onmaskIconLabelChanged?: (value: CInputSensitiveTextElementEventMap<any>['maskIconLabelChanged']) => void;
    onmessagesCustomChanged?: (value: CInputSensitiveTextElementEventMap<any>['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CInputSensitiveTextElementEventMap<any>['placeholderChanged']) => void;
    onrawValueChanged?: (value: CInputSensitiveTextElementEventMap<any>['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CInputSensitiveTextElementEventMap<any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CInputSensitiveTextElementEventMap<any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CInputSensitiveTextElementEventMap<any>['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CInputSensitiveTextElementEventMap<any>['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CInputSensitiveTextElementEventMap<any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CInputSensitiveTextElementEventMap<any>['validChanged']) => void;
    onvalidatorsChanged?: (value: CInputSensitiveTextElementEventMap<any>['validatorsChanged']) => void;
    onvalueChanged?: (value: CInputSensitiveTextElementEventMap<any>['valueChanged']) => void;
    onvirtualKeyboardChanged?: (value: CInputSensitiveTextElementEventMap<any>['virtualKeyboardChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-input-sensitive-text': InputSensitiveTextIntrinsicProps;
        }
    }
}
