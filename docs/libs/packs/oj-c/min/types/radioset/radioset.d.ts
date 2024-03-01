import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { RadioSet as PreactRadioSet } from '@oracle/oraclejet-preact/UNSAFE_RadioSet';
import 'css!oj-c/radioset/radioset-styles.css';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import { DataProvider } from 'ojs/ojdataprovider';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
type RadiosetArrayDataItem<V extends string | number> = RadiosetDataItem & {
    value: V;
};
type RadiosetDataItem = {
    label: string;
    assistiveText?: string;
    helpSourceLink?: string;
    helpSourceText?: string;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type PreactRadioSetProps = ComponentProps<typeof PreactRadioSet>;
type RadiosetProps<V extends string | number, D extends RadiosetDataItem> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    containerReadonly?: boolean;
    columnSpan?: LayoutColumnSpan;
    direction?: PreactRadioSetProps['direction'];
    disabled?: boolean;
    displayOptions?: Pick<DisplayOptions, 'messages'>;
    help?: Help;
    helpHints?: HelpHints;
    labelHint: string;
    labelEdge?: PreactRadioSetProps['labelEdge'];
    labelStartWidth?: PreactRadioSetProps['labelStartWidth'];
    labelWrapping?: 'truncate' | 'wrap';
    messagesCustom?: PreactRadioSetProps['messages'];
    options: Array<RadiosetArrayDataItem<V>> | DataProvider<V, D>;
    onMessagesCustomChanged?: PropertyChanged<PreactRadioSetProps['messages']>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<V | null | undefined>;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    userAssistanceDensity?: PreactRadioSetProps['userAssistanceDensity'];
    value?: V | null;
};
export declare const Radioset: ComponentType<ExtendGlobalProps<RadiosetProps<string | number, RadiosetDataItem>>>;
export {};
export interface CRadiosetElement<V extends string | number, D extends RadiosetDataItem> extends JetElement<CRadiosetElementSettableProperties<V, D>>, CRadiosetElementSettableProperties<V, D> {
    readonly valid?: Parameters<Required<RadiosetProps<V, D>>['onValidChanged']>[0];
    addEventListener<T extends keyof CRadiosetElementEventMap<V, D>>(type: T, listener: (this: HTMLElement, ev: CRadiosetElementEventMap<V, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CRadiosetElementSettableProperties<V, D>>(property: T): CRadiosetElement<V, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CRadiosetElementSettableProperties<V, D>>(property: T, value: CRadiosetElementSettableProperties<V, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CRadiosetElementSettableProperties<V, D>>): void;
    setProperties(properties: CRadiosetElementSettablePropertiesLenient<V, D>): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CRadiosetElement {
    type columnSpanChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['columnSpan']>;
    type containerReadonlyChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['containerReadonly']>;
    type directionChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['direction']>;
    type disabledChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['disabled']>;
    type displayOptionsChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['displayOptions']>;
    type helpChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['help']>;
    type helpHintsChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['helpHints']>;
    type labelEdgeChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['labelEdge']>;
    type labelHintChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['labelHint']>;
    type labelStartWidthChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['labelStartWidth']>;
    type labelWrappingChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['labelWrapping']>;
    type messagesCustomChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['messagesCustom']>;
    type optionsChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['options']>;
    type readonlyChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['readonly']>;
    type requiredChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['required']>;
    type requiredMessageDetailChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['requiredMessageDetail']>;
    type userAssistanceDensityChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['userAssistanceDensity']>;
    type validChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['valid']>;
    type valueChanged<V extends string | number, D extends RadiosetDataItem> = JetElementCustomEventStrict<CRadiosetElement<V, D>['value']>;
}
export interface CRadiosetElementEventMap<V extends string | number, D extends RadiosetDataItem> extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['containerReadonly']>;
    'directionChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['direction']>;
    'disabledChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['labelWrapping']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['messagesCustom']>;
    'optionsChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['options']>;
    'readonlyChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['requiredMessageDetail']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['valid']>;
    'valueChanged': JetElementCustomEventStrict<CRadiosetElement<V, D>['value']>;
}
export interface CRadiosetElementSettableProperties<V extends string | number, D extends RadiosetDataItem> extends JetSettableProperties {
    columnSpan?: RadiosetProps<V, D>['columnSpan'];
    containerReadonly?: RadiosetProps<V, D>['containerReadonly'];
    direction?: RadiosetProps<V, D>['direction'];
    disabled?: RadiosetProps<V, D>['disabled'];
    displayOptions?: RadiosetProps<V, D>['displayOptions'];
    help?: RadiosetProps<V, D>['help'];
    helpHints?: RadiosetProps<V, D>['helpHints'];
    labelEdge?: RadiosetProps<V, D>['labelEdge'];
    labelHint: RadiosetProps<V, D>['labelHint'];
    labelStartWidth?: RadiosetProps<V, D>['labelStartWidth'];
    labelWrapping?: RadiosetProps<V, D>['labelWrapping'];
    messagesCustom?: RadiosetProps<V, D>['messagesCustom'];
    options: RadiosetProps<V, D>['options'];
    readonly?: RadiosetProps<V, D>['readonly'];
    required?: RadiosetProps<V, D>['required'];
    requiredMessageDetail?: RadiosetProps<V, D>['requiredMessageDetail'];
    userAssistanceDensity?: RadiosetProps<V, D>['userAssistanceDensity'];
    value?: RadiosetProps<V, D>['value'];
}
export interface CRadiosetElementSettablePropertiesLenient<V extends string | number, D extends RadiosetDataItem> extends Partial<CRadiosetElementSettableProperties<V, D>> {
    [key: string]: any;
}
export interface RadiosetIntrinsicProps extends Partial<Readonly<CRadiosetElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    valid?: never;
    oncolumnSpanChanged?: (value: CRadiosetElementEventMap<any, any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CRadiosetElementEventMap<any, any>['containerReadonlyChanged']) => void;
    ondirectionChanged?: (value: CRadiosetElementEventMap<any, any>['directionChanged']) => void;
    ondisabledChanged?: (value: CRadiosetElementEventMap<any, any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CRadiosetElementEventMap<any, any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CRadiosetElementEventMap<any, any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CRadiosetElementEventMap<any, any>['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CRadiosetElementEventMap<any, any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CRadiosetElementEventMap<any, any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CRadiosetElementEventMap<any, any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CRadiosetElementEventMap<any, any>['labelWrappingChanged']) => void;
    onmessagesCustomChanged?: (value: CRadiosetElementEventMap<any, any>['messagesCustomChanged']) => void;
    onoptionsChanged?: (value: CRadiosetElementEventMap<any, any>['optionsChanged']) => void;
    onreadonlyChanged?: (value: CRadiosetElementEventMap<any, any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CRadiosetElementEventMap<any, any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CRadiosetElementEventMap<any, any>['requiredMessageDetailChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CRadiosetElementEventMap<any, any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CRadiosetElementEventMap<any, any>['validChanged']) => void;
    onvalueChanged?: (value: CRadiosetElementEventMap<any, any>['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-radioset': RadiosetIntrinsicProps;
        }
    }
}
