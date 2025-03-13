import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { SelectMultiple as PreactSelectMultiple } from '@oracle/oraclejet-preact/UNSAFE_SelectMultiple';
import type { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { type LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { type DisplayOptions, type Help, type HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import type { ItemContext } from 'ojs/ojcommontypes';
import type { DataProvider, Item, TextFilter } from 'ojs/ojdataprovider';
import type { ImmutableKeySet } from 'ojs/ojkeyset';
import { type ExtendGlobalProps, type ObservedGlobalProps, type PropertyChanged, type ReadOnlyPropertyChanged, type TemplateSlot } from 'ojs/ojvcomponent';
import type { ComponentProps, ComponentType } from 'preact';
import 'css!oj-c/select-multiple/select-multiple-styles.css';
type PreactSelectMultipleProps = ComponentProps<typeof PreactSelectMultiple>;
type DisplayOptionsProps = Omit<DisplayOptions, 'converterHint' | 'validatorHint'>;
type ItemTemplateContext<K extends string | number, D extends Record<string, any>> = Pick<Parameters<NonNullable<PreactSelectMultipleProps['itemRenderer']>>[0], 'searchText'> & {
    item: Item<K, D>;
    selectedKeys: ImmutableKeySet<K>;
    onSelectedKeysChanged: PropertyChanged<ImmutableKeySet<K>> | ((event: CustomEvent<{
        value: ImmutableKeySet<K>;
    }>) => void);
};
export type CollectionTemplateContext<K extends string | number, D extends Record<string, any>> = {
    data?: DataProvider<K, D> | null;
    searchText?: string;
    currentRowOverride?: {
        rowKey: K;
    };
    onCurrentRowChanged: (detail: {
        rowKey?: K;
    }) => void;
    selected: ImmutableKeySet<K>;
    onSelectedChanged: (detail: {
        value?: ImmutableKeySet<K>;
    }) => void;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type Props<K extends string | number, D extends Record<string, any>> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    collectionTemplate?: TemplateSlot<CollectionTemplateContext<K, D>>;
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    data?: DataProvider<K, D> | null;
    disabled?: boolean;
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    itemTemplate?: TemplateSlot<ItemTemplateContext<K, D>>;
    itemText: keyof D | ((itemContext: ItemContext<K, D>) => string);
    labelEdge?: PreactSelectMultipleProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    matchBy?: Array<TextFilter<D>['matchBy']> | null;
    messagesCustom?: PreactSelectMultipleProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactSelectMultipleProps['textAlign'];
    userAssistanceDensity?: PreactSelectMultipleProps['userAssistanceDensity'];
    value?: Set<K> | null;
    valueItems?: Map<K, ItemContext<K, D>> | null;
    virtualKeyboard?: PreactSelectMultipleProps['virtualKeyboard'];
    onMessagesCustomChanged?: PropertyChanged<PreactSelectMultipleProps['messages']>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<Set<K> | null | undefined>;
    onValueItemsChanged?: PropertyChanged<Map<K, ItemContext<K, D>> | null | undefined>;
};
export declare const SelectMultiple: ComponentType<ExtendGlobalProps<Props<string | number, Record<string, any>>>>;
export type SelectMultipleProps<K extends string | number, D extends Record<string, any>> = Props<K, D>;
export {};
export interface CSelectMultipleElement<K extends string | number, D extends Record<string, any>> extends JetElement<CSelectMultipleElementSettableProperties<K, D>>, CSelectMultipleElementSettableProperties<K, D> {
    readonly valid?: Parameters<Required<Props<K, D>>['onValidChanged']>[0];
    addEventListener<T extends keyof CSelectMultipleElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CSelectMultipleElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSelectMultipleElementSettableProperties<K, D>>(property: T): CSelectMultipleElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSelectMultipleElementSettableProperties<K, D>>(property: T, value: CSelectMultipleElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSelectMultipleElementSettableProperties<K, D>>): void;
    setProperties(properties: CSelectMultipleElementSettablePropertiesLenient<K, D>): void;
    UNSAFE_focusAndOpenDropdown: () => void;
    _selectItemsByValue: (value: Set<K> | null) => Promise<void>;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CSelectMultipleElement {
    type columnSpanChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['columnSpan']>;
    type containerReadonlyChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['containerReadonly']>;
    type dataChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['data']>;
    type disabledChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['disabled']>;
    type displayOptionsChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['displayOptions']>;
    type helpChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['help']>;
    type helpHintsChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['helpHints']>;
    type itemTextChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['itemText']>;
    type labelEdgeChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelEdge']>;
    type labelHintChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelHint']>;
    type labelStartWidthChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelStartWidth']>;
    type labelWrappingChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelWrapping']>;
    type matchByChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['matchBy']>;
    type messagesCustomChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['messagesCustom']>;
    type placeholderChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['placeholder']>;
    type readonlyChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['readonly']>;
    type requiredChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['required']>;
    type requiredMessageDetailChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['requiredMessageDetail']>;
    type textAlignChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['textAlign']>;
    type userAssistanceDensityChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['userAssistanceDensity']>;
    type validChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['valid']>;
    type valueChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['value']>;
    type valueItemsChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['valueItems']>;
    type virtualKeyboardChanged<K extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectMultipleElement<K, D>['virtualKeyboard']>;
    type RenderCollectionTemplate<K extends string | number, D extends Record<string, any>> = import('ojs/ojvcomponent').TemplateSlot<CollectionTemplateContext<K, D>>;
    type RenderItemTemplate<K extends string | number, D extends Record<string, any>> = import('ojs/ojvcomponent').TemplateSlot<ItemTemplateContext<K, D>>;
}
export interface CSelectMultipleElementEventMap<K extends string | number, D extends Record<string, any>> extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['containerReadonly']>;
    'dataChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['data']>;
    'disabledChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['helpHints']>;
    'itemTextChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['itemText']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['labelWrapping']>;
    'matchByChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['matchBy']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['placeholder']>;
    'readonlyChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['valid']>;
    'valueChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['value']>;
    'valueItemsChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['valueItems']>;
    'virtualKeyboardChanged': JetElementCustomEventStrict<CSelectMultipleElement<K, D>['virtualKeyboard']>;
}
export interface CSelectMultipleElementSettableProperties<K extends string | number, D extends Record<string, any>> extends JetSettableProperties {
    columnSpan?: Props<K, D>['columnSpan'];
    containerReadonly?: Props<K, D>['containerReadonly'];
    data?: Props<K, D>['data'];
    disabled?: Props<K, D>['disabled'];
    displayOptions?: Props<K, D>['displayOptions'];
    help?: Props<K, D>['help'];
    helpHints?: Props<K, D>['helpHints'];
    itemText: Props<K, D>['itemText'];
    labelEdge?: Props<K, D>['labelEdge'];
    labelHint: Props<K, D>['labelHint'];
    labelStartWidth?: Props<K, D>['labelStartWidth'];
    labelWrapping?: Props<K, D>['labelWrapping'];
    matchBy?: Props<K, D>['matchBy'];
    messagesCustom?: Props<K, D>['messagesCustom'];
    placeholder?: Props<K, D>['placeholder'];
    readonly?: Props<K, D>['readonly'];
    required?: Props<K, D>['required'];
    requiredMessageDetail?: Props<K, D>['requiredMessageDetail'];
    textAlign?: Props<K, D>['textAlign'];
    userAssistanceDensity?: Props<K, D>['userAssistanceDensity'];
    value?: Props<K, D>['value'];
    valueItems?: Props<K, D>['valueItems'];
    virtualKeyboard?: Props<K, D>['virtualKeyboard'];
}
export interface CSelectMultipleElementSettablePropertiesLenient<K extends string | number, D extends Record<string, any>> extends Partial<CSelectMultipleElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface SelectMultipleIntrinsicProps extends Partial<Readonly<CSelectMultipleElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    valid?: never;
    children?: import('preact').ComponentChildren;
    oncolumnSpanChanged?: (value: CSelectMultipleElementEventMap<any, any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CSelectMultipleElementEventMap<any, any>['containerReadonlyChanged']) => void;
    ondataChanged?: (value: CSelectMultipleElementEventMap<any, any>['dataChanged']) => void;
    ondisabledChanged?: (value: CSelectMultipleElementEventMap<any, any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CSelectMultipleElementEventMap<any, any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CSelectMultipleElementEventMap<any, any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CSelectMultipleElementEventMap<any, any>['helpHintsChanged']) => void;
    onitemTextChanged?: (value: CSelectMultipleElementEventMap<any, any>['itemTextChanged']) => void;
    onlabelEdgeChanged?: (value: CSelectMultipleElementEventMap<any, any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CSelectMultipleElementEventMap<any, any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CSelectMultipleElementEventMap<any, any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CSelectMultipleElementEventMap<any, any>['labelWrappingChanged']) => void;
    onmatchByChanged?: (value: CSelectMultipleElementEventMap<any, any>['matchByChanged']) => void;
    onmessagesCustomChanged?: (value: CSelectMultipleElementEventMap<any, any>['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CSelectMultipleElementEventMap<any, any>['placeholderChanged']) => void;
    onreadonlyChanged?: (value: CSelectMultipleElementEventMap<any, any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CSelectMultipleElementEventMap<any, any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CSelectMultipleElementEventMap<any, any>['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CSelectMultipleElementEventMap<any, any>['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CSelectMultipleElementEventMap<any, any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CSelectMultipleElementEventMap<any, any>['validChanged']) => void;
    onvalueChanged?: (value: CSelectMultipleElementEventMap<any, any>['valueChanged']) => void;
    onvalueItemsChanged?: (value: CSelectMultipleElementEventMap<any, any>['valueItemsChanged']) => void;
    onvirtualKeyboardChanged?: (value: CSelectMultipleElementEventMap<any, any>['virtualKeyboardChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-select-multiple': SelectMultipleIntrinsicProps;
        }
    }
}
