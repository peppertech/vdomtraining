import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import 'ojs/oj-jsx-interfaces';
import { InputPassword as PreactInputPassword } from '@oracle/oraclejet-preact/UNSAFE_InputPassword';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import Validator = require('ojs/ojvalidator');
import AsyncValidator = require('ojs/ojvalidator-async');
import { ExtendGlobalProps, GlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType, Ref } from 'preact';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import 'css!oj-c/input-password/input-password-styles.css';
type PreactInputPasswordProps = ComponentProps<typeof PreactInputPassword>;
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type Props = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    autocomplete?: 'on' | 'off' | string;
    autofocus?: GlobalProps['autofocus'];
    clearIcon?: 'always' | 'never' | 'conditional';
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    disabled?: boolean;
    displayOptions?: DisplayOptions;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactInputPasswordProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    maskIcon?: 'visible' | 'hidden';
    messagesCustom?: PreactInputPasswordProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactInputPasswordProps['textAlign'];
    userAssistanceDensity?: PreactInputPasswordProps['userAssistanceDensity'];
    validators?: (AsyncValidator<string> | Validator<string>)[] | null;
    value?: string | null;
    onMessagesCustomChanged?: PropertyChanged<PreactInputPasswordProps['messages']>;
    onRawValueChanged?: ReadOnlyPropertyChanged<string>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<string | null>;
};
type InputPasswordHandle = {
    blur: () => void;
    focus: () => void;
    showMessages: () => void;
    reset: () => void;
    validate: () => Promise<'valid' | 'invalid'>;
};
declare function InputPasswordImpl({ autocomplete, clearIcon, columnSpan, containerReadonly: propContainerReadonly, disabled, displayOptions, help, helpHints, id, labelWrapping: propLabelWrapping, maskIcon, messagesCustom, readonly: propReadonly, required, userAssistanceDensity: propUserAssistanceDensity, validators, value, ...otherProps }: Props, ref: Ref<InputPasswordHandle>): import("preact").JSX.Element;
export declare const InputPassword: ComponentType<ExtendGlobalProps<ComponentProps<typeof InputPasswordImpl>>>;
export type InputPasswordProps = Props;
export {};
export interface CInputPasswordElement extends JetElement<CInputPasswordElementSettableProperties>, CInputPasswordElementSettableProperties {
    readonly rawValue?: Parameters<Required<Props>['onRawValueChanged']>[0];
    readonly valid?: Parameters<Required<Props>['onValidChanged']>[0];
    addEventListener<T extends keyof CInputPasswordElementEventMap>(type: T, listener: (this: HTMLElement, ev: CInputPasswordElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CInputPasswordElementSettableProperties>(property: T): CInputPasswordElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CInputPasswordElementSettableProperties>(property: T, value: CInputPasswordElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CInputPasswordElementSettableProperties>): void;
    setProperties(properties: CInputPasswordElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CInputPasswordElement {
    type autocompleteChanged = JetElementCustomEventStrict<CInputPasswordElement['autocomplete']>;
    type clearIconChanged = JetElementCustomEventStrict<CInputPasswordElement['clearIcon']>;
    type columnSpanChanged = JetElementCustomEventStrict<CInputPasswordElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CInputPasswordElement['containerReadonly']>;
    type disabledChanged = JetElementCustomEventStrict<CInputPasswordElement['disabled']>;
    type displayOptionsChanged = JetElementCustomEventStrict<CInputPasswordElement['displayOptions']>;
    type helpChanged = JetElementCustomEventStrict<CInputPasswordElement['help']>;
    type helpHintsChanged = JetElementCustomEventStrict<CInputPasswordElement['helpHints']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CInputPasswordElement['labelEdge']>;
    type labelHintChanged = JetElementCustomEventStrict<CInputPasswordElement['labelHint']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CInputPasswordElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CInputPasswordElement['labelWrapping']>;
    type maskIconChanged = JetElementCustomEventStrict<CInputPasswordElement['maskIcon']>;
    type messagesCustomChanged = JetElementCustomEventStrict<CInputPasswordElement['messagesCustom']>;
    type placeholderChanged = JetElementCustomEventStrict<CInputPasswordElement['placeholder']>;
    type rawValueChanged = JetElementCustomEventStrict<CInputPasswordElement['rawValue']>;
    type readonlyChanged = JetElementCustomEventStrict<CInputPasswordElement['readonly']>;
    type requiredChanged = JetElementCustomEventStrict<CInputPasswordElement['required']>;
    type requiredMessageDetailChanged = JetElementCustomEventStrict<CInputPasswordElement['requiredMessageDetail']>;
    type textAlignChanged = JetElementCustomEventStrict<CInputPasswordElement['textAlign']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CInputPasswordElement['userAssistanceDensity']>;
    type validChanged = JetElementCustomEventStrict<CInputPasswordElement['valid']>;
    type validatorsChanged = JetElementCustomEventStrict<CInputPasswordElement['validators']>;
    type valueChanged = JetElementCustomEventStrict<CInputPasswordElement['value']>;
}
export interface CInputPasswordElementEventMap extends HTMLElementEventMap {
    'autocompleteChanged': JetElementCustomEventStrict<CInputPasswordElement['autocomplete']>;
    'clearIconChanged': JetElementCustomEventStrict<CInputPasswordElement['clearIcon']>;
    'columnSpanChanged': JetElementCustomEventStrict<CInputPasswordElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CInputPasswordElement['containerReadonly']>;
    'disabledChanged': JetElementCustomEventStrict<CInputPasswordElement['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CInputPasswordElement['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CInputPasswordElement['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CInputPasswordElement['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CInputPasswordElement['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CInputPasswordElement['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CInputPasswordElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CInputPasswordElement['labelWrapping']>;
    'maskIconChanged': JetElementCustomEventStrict<CInputPasswordElement['maskIcon']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CInputPasswordElement['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CInputPasswordElement['placeholder']>;
    'rawValueChanged': JetElementCustomEventStrict<CInputPasswordElement['rawValue']>;
    'readonlyChanged': JetElementCustomEventStrict<CInputPasswordElement['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CInputPasswordElement['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CInputPasswordElement['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CInputPasswordElement['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CInputPasswordElement['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CInputPasswordElement['valid']>;
    'validatorsChanged': JetElementCustomEventStrict<CInputPasswordElement['validators']>;
    'valueChanged': JetElementCustomEventStrict<CInputPasswordElement['value']>;
}
export interface CInputPasswordElementSettableProperties extends JetSettableProperties {
    autocomplete?: Props['autocomplete'];
    clearIcon?: Props['clearIcon'];
    columnSpan?: Props['columnSpan'];
    containerReadonly?: Props['containerReadonly'];
    disabled?: Props['disabled'];
    displayOptions?: Props['displayOptions'];
    help?: Props['help'];
    helpHints?: Props['helpHints'];
    labelEdge?: Props['labelEdge'];
    labelHint: Props['labelHint'];
    labelStartWidth?: Props['labelStartWidth'];
    labelWrapping?: Props['labelWrapping'];
    maskIcon?: Props['maskIcon'];
    messagesCustom?: Props['messagesCustom'];
    placeholder?: Props['placeholder'];
    readonly?: Props['readonly'];
    required?: Props['required'];
    requiredMessageDetail?: Props['requiredMessageDetail'];
    textAlign?: Props['textAlign'];
    userAssistanceDensity?: Props['userAssistanceDensity'];
    validators?: Props['validators'];
    value?: Props['value'];
}
export interface CInputPasswordElementSettablePropertiesLenient extends Partial<CInputPasswordElementSettableProperties> {
    [key: string]: any;
}
export interface InputPasswordIntrinsicProps extends Partial<Readonly<CInputPasswordElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    rawValue?: never;
    valid?: never;
    onautocompleteChanged?: (value: CInputPasswordElementEventMap['autocompleteChanged']) => void;
    onclearIconChanged?: (value: CInputPasswordElementEventMap['clearIconChanged']) => void;
    oncolumnSpanChanged?: (value: CInputPasswordElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CInputPasswordElementEventMap['containerReadonlyChanged']) => void;
    ondisabledChanged?: (value: CInputPasswordElementEventMap['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CInputPasswordElementEventMap['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CInputPasswordElementEventMap['helpChanged']) => void;
    onhelpHintsChanged?: (value: CInputPasswordElementEventMap['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CInputPasswordElementEventMap['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CInputPasswordElementEventMap['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CInputPasswordElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CInputPasswordElementEventMap['labelWrappingChanged']) => void;
    onmaskIconChanged?: (value: CInputPasswordElementEventMap['maskIconChanged']) => void;
    onmessagesCustomChanged?: (value: CInputPasswordElementEventMap['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CInputPasswordElementEventMap['placeholderChanged']) => void;
    onrawValueChanged?: (value: CInputPasswordElementEventMap['rawValueChanged']) => void;
    onreadonlyChanged?: (value: CInputPasswordElementEventMap['readonlyChanged']) => void;
    onrequiredChanged?: (value: CInputPasswordElementEventMap['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CInputPasswordElementEventMap['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CInputPasswordElementEventMap['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CInputPasswordElementEventMap['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CInputPasswordElementEventMap['validChanged']) => void;
    onvalidatorsChanged?: (value: CInputPasswordElementEventMap['validatorsChanged']) => void;
    onvalueChanged?: (value: CInputPasswordElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-input-password': InputPasswordIntrinsicProps;
        }
    }
}
