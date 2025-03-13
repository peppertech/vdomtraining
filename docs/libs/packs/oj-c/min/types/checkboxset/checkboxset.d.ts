import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps } from 'preact';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged } from 'ojs/ojvcomponent';
import { DataProvider } from 'ojs/ojdataprovider';
import { CheckboxSet as PreactCheckboxSet } from '@oracle/oraclejet-preact/UNSAFE_CheckboxSet';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import 'css!oj-c/checkboxset/checkboxset-styles.css';
import { ComponentType } from 'preact';
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type PreactCheckboxSetProps = ComponentProps<typeof PreactCheckboxSet>;
type DisplayOptionsProps = Pick<DisplayOptions, 'messages'>;
type CheckboxsetArrayDataItem<V extends string | number> = CheckboxsetDataItem & {
    value: V;
};
type CheckboxsetDataItem = {
    label: string;
    assistiveText?: string;
    helpSourceLink?: string;
    helpSourceText?: string;
};
type CheckboxsetProps<V extends string | number, D extends CheckboxsetDataItem> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    containerReadonly?: boolean;
    columnSpan?: LayoutColumnSpan;
    disabled?: boolean;
    direction?: PreactCheckboxSetProps['direction'];
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    labelEdge?: PreactCheckboxSetProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    messagesCustom?: PreactCheckboxSetProps['messages'];
    readonly?: boolean;
    required?: boolean;
    userAssistanceDensity?: PreactCheckboxSetProps['userAssistanceDensity'];
    options: Array<CheckboxsetArrayDataItem<V>> | DataProvider<V, D>;
    labelWrapping?: 'truncate' | 'wrap';
    requiredMessageDetail?: string;
    onMessagesCustomChanged?: PropertyChanged<PreactCheckboxSetProps['messages']>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<Array<V> | null | undefined>;
    value?: Array<V> | null;
};
declare const Checkboxset: ComponentType<ExtendGlobalProps<CheckboxsetProps<string | number, CheckboxsetDataItem>>>;
export { Checkboxset };
export type { CheckboxsetDataItem, CheckboxsetArrayDataItem, CheckboxsetProps };
export interface CCheckboxsetElement<V extends string | number, D extends CheckboxsetDataItem> extends JetElement<CCheckboxsetElementSettableProperties<V, D>>, CCheckboxsetElementSettableProperties<V, D> {
    readonly valid?: Parameters<Required<CheckboxsetProps<V, D>>['onValidChanged']>[0];
    addEventListener<T extends keyof CCheckboxsetElementEventMap<V, D>>(type: T, listener: (this: HTMLElement, ev: CCheckboxsetElementEventMap<V, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CCheckboxsetElementSettableProperties<V, D>>(property: T): CCheckboxsetElement<V, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CCheckboxsetElementSettableProperties<V, D>>(property: T, value: CCheckboxsetElementSettableProperties<V, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CCheckboxsetElementSettableProperties<V, D>>): void;
    setProperties(properties: CCheckboxsetElementSettablePropertiesLenient<V, D>): void;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CCheckboxsetElement {
    type columnSpanChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['columnSpan']>;
    type containerReadonlyChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['containerReadonly']>;
    type directionChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['direction']>;
    type disabledChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['disabled']>;
    type displayOptionsChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['displayOptions']>;
    type helpChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['help']>;
    type helpHintsChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['helpHints']>;
    type labelEdgeChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelEdge']>;
    type labelHintChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelHint']>;
    type labelStartWidthChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelStartWidth']>;
    type labelWrappingChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelWrapping']>;
    type messagesCustomChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['messagesCustom']>;
    type optionsChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['options']>;
    type readonlyChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['readonly']>;
    type requiredChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['required']>;
    type requiredMessageDetailChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['requiredMessageDetail']>;
    type userAssistanceDensityChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['userAssistanceDensity']>;
    type validChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['valid']>;
    type valueChanged<V extends string | number, D extends CheckboxsetDataItem> = JetElementCustomEventStrict<CCheckboxsetElement<V, D>['value']>;
}
export interface CCheckboxsetElementEventMap<V extends string | number, D extends CheckboxsetDataItem> extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['containerReadonly']>;
    'directionChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['direction']>;
    'disabledChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['helpHints']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['labelWrapping']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['messagesCustom']>;
    'optionsChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['options']>;
    'readonlyChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['requiredMessageDetail']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['valid']>;
    'valueChanged': JetElementCustomEventStrict<CCheckboxsetElement<V, D>['value']>;
}
export interface CCheckboxsetElementSettableProperties<V extends string | number, D extends CheckboxsetDataItem> extends JetSettableProperties {
    columnSpan?: CheckboxsetProps<V, D>['columnSpan'];
    containerReadonly?: CheckboxsetProps<V, D>['containerReadonly'];
    direction?: CheckboxsetProps<V, D>['direction'];
    disabled?: CheckboxsetProps<V, D>['disabled'];
    displayOptions?: CheckboxsetProps<V, D>['displayOptions'];
    help?: CheckboxsetProps<V, D>['help'];
    helpHints?: CheckboxsetProps<V, D>['helpHints'];
    labelEdge?: CheckboxsetProps<V, D>['labelEdge'];
    labelHint: CheckboxsetProps<V, D>['labelHint'];
    labelStartWidth?: CheckboxsetProps<V, D>['labelStartWidth'];
    labelWrapping?: CheckboxsetProps<V, D>['labelWrapping'];
    messagesCustom?: CheckboxsetProps<V, D>['messagesCustom'];
    options: CheckboxsetProps<V, D>['options'];
    readonly?: CheckboxsetProps<V, D>['readonly'];
    required?: CheckboxsetProps<V, D>['required'];
    requiredMessageDetail?: CheckboxsetProps<V, D>['requiredMessageDetail'];
    userAssistanceDensity?: CheckboxsetProps<V, D>['userAssistanceDensity'];
    value?: CheckboxsetProps<V, D>['value'];
}
export interface CCheckboxsetElementSettablePropertiesLenient<V extends string | number, D extends CheckboxsetDataItem> extends Partial<CCheckboxsetElementSettableProperties<V, D>> {
    [key: string]: any;
}
export interface CheckboxsetIntrinsicProps extends Partial<Readonly<CCheckboxsetElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    valid?: never;
    oncolumnSpanChanged?: (value: CCheckboxsetElementEventMap<any, any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CCheckboxsetElementEventMap<any, any>['containerReadonlyChanged']) => void;
    ondirectionChanged?: (value: CCheckboxsetElementEventMap<any, any>['directionChanged']) => void;
    ondisabledChanged?: (value: CCheckboxsetElementEventMap<any, any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CCheckboxsetElementEventMap<any, any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CCheckboxsetElementEventMap<any, any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CCheckboxsetElementEventMap<any, any>['helpHintsChanged']) => void;
    onlabelEdgeChanged?: (value: CCheckboxsetElementEventMap<any, any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CCheckboxsetElementEventMap<any, any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CCheckboxsetElementEventMap<any, any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CCheckboxsetElementEventMap<any, any>['labelWrappingChanged']) => void;
    onmessagesCustomChanged?: (value: CCheckboxsetElementEventMap<any, any>['messagesCustomChanged']) => void;
    onoptionsChanged?: (value: CCheckboxsetElementEventMap<any, any>['optionsChanged']) => void;
    onreadonlyChanged?: (value: CCheckboxsetElementEventMap<any, any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CCheckboxsetElementEventMap<any, any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CCheckboxsetElementEventMap<any, any>['requiredMessageDetailChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CCheckboxsetElementEventMap<any, any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CCheckboxsetElementEventMap<any, any>['validChanged']) => void;
    onvalueChanged?: (value: CCheckboxsetElementEventMap<any, any>['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-checkboxset': CheckboxsetIntrinsicProps;
        }
    }
}
