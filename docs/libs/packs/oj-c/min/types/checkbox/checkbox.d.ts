import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentType, ComponentProps, ComponentChildren } from 'preact';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { Checkbox as PreactCheckbox } from '@oracle/oraclejet-preact/UNSAFE_Checkbox';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import 'css!oj-c/checkbox/checkbox-styles.css';
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type PreactCheckboxProps = ComponentProps<typeof PreactCheckbox>;
type DisplayOptionsProps = Pick<DisplayOptions, 'messages'>;
type CheckboxProps = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    children: ComponentChildren;
    containerReadonly?: boolean;
    columnSpan?: LayoutColumnSpan;
    disabled?: boolean;
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    messagesCustom?: PreactCheckboxProps['messages'];
    readonly?: boolean;
    required?: boolean;
    userAssistanceDensity?: PreactCheckboxProps['userAssistanceDensity'];
    requiredMessageDetail?: string;
    onMessagesCustomChanged?: PropertyChanged<PreactCheckboxProps['messages']>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<boolean | undefined>;
    value?: boolean;
};
declare const Checkbox: ComponentType<ExtendGlobalProps<CheckboxProps>>;
export { Checkbox };
export interface CCheckboxElement extends JetElement<CCheckboxElementSettableProperties>, CCheckboxElementSettableProperties {
    readonly valid?: Parameters<Required<CheckboxProps>['onValidChanged']>[0];
    addEventListener<T extends keyof CCheckboxElementEventMap>(type: T, listener: (this: HTMLElement, ev: CCheckboxElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CCheckboxElementSettableProperties>(property: T): CCheckboxElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CCheckboxElementSettableProperties>(property: T, value: CCheckboxElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CCheckboxElementSettableProperties>): void;
    setProperties(properties: CCheckboxElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CCheckboxElement {
    type columnSpanChanged = JetElementCustomEventStrict<CCheckboxElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CCheckboxElement['containerReadonly']>;
    type disabledChanged = JetElementCustomEventStrict<CCheckboxElement['disabled']>;
    type displayOptionsChanged = JetElementCustomEventStrict<CCheckboxElement['displayOptions']>;
    type helpChanged = JetElementCustomEventStrict<CCheckboxElement['help']>;
    type helpHintsChanged = JetElementCustomEventStrict<CCheckboxElement['helpHints']>;
    type messagesCustomChanged = JetElementCustomEventStrict<CCheckboxElement['messagesCustom']>;
    type readonlyChanged = JetElementCustomEventStrict<CCheckboxElement['readonly']>;
    type requiredChanged = JetElementCustomEventStrict<CCheckboxElement['required']>;
    type requiredMessageDetailChanged = JetElementCustomEventStrict<CCheckboxElement['requiredMessageDetail']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CCheckboxElement['userAssistanceDensity']>;
    type validChanged = JetElementCustomEventStrict<CCheckboxElement['valid']>;
    type valueChanged = JetElementCustomEventStrict<CCheckboxElement['value']>;
}
export interface CCheckboxElementEventMap extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CCheckboxElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CCheckboxElement['containerReadonly']>;
    'disabledChanged': JetElementCustomEventStrict<CCheckboxElement['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CCheckboxElement['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CCheckboxElement['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CCheckboxElement['helpHints']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CCheckboxElement['messagesCustom']>;
    'readonlyChanged': JetElementCustomEventStrict<CCheckboxElement['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CCheckboxElement['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CCheckboxElement['requiredMessageDetail']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CCheckboxElement['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CCheckboxElement['valid']>;
    'valueChanged': JetElementCustomEventStrict<CCheckboxElement['value']>;
}
export interface CCheckboxElementSettableProperties extends JetSettableProperties {
    columnSpan?: CheckboxProps['columnSpan'];
    containerReadonly?: CheckboxProps['containerReadonly'];
    disabled?: CheckboxProps['disabled'];
    displayOptions?: CheckboxProps['displayOptions'];
    help?: CheckboxProps['help'];
    helpHints?: CheckboxProps['helpHints'];
    messagesCustom?: CheckboxProps['messagesCustom'];
    readonly?: CheckboxProps['readonly'];
    required?: CheckboxProps['required'];
    requiredMessageDetail?: CheckboxProps['requiredMessageDetail'];
    userAssistanceDensity?: CheckboxProps['userAssistanceDensity'];
    value?: CheckboxProps['value'];
}
export interface CCheckboxElementSettablePropertiesLenient extends Partial<CCheckboxElementSettableProperties> {
    [key: string]: any;
}
export interface CheckboxIntrinsicProps extends Partial<Readonly<CCheckboxElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    valid?: never;
    children?: import('preact').ComponentChildren;
    oncolumnSpanChanged?: (value: CCheckboxElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CCheckboxElementEventMap['containerReadonlyChanged']) => void;
    ondisabledChanged?: (value: CCheckboxElementEventMap['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CCheckboxElementEventMap['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CCheckboxElementEventMap['helpChanged']) => void;
    onhelpHintsChanged?: (value: CCheckboxElementEventMap['helpHintsChanged']) => void;
    onmessagesCustomChanged?: (value: CCheckboxElementEventMap['messagesCustomChanged']) => void;
    onreadonlyChanged?: (value: CCheckboxElementEventMap['readonlyChanged']) => void;
    onrequiredChanged?: (value: CCheckboxElementEventMap['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CCheckboxElementEventMap['requiredMessageDetailChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CCheckboxElementEventMap['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CCheckboxElementEventMap['validChanged']) => void;
    onvalueChanged?: (value: CCheckboxElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-checkbox': CheckboxIntrinsicProps;
        }
    }
}
