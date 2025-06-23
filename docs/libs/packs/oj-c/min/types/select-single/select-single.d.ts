import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { SelectSingle as PreactSelectSingle } from '@oracle/oraclejet-preact/UNSAFE_SelectSingle';
import type { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { type LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { type DisplayOptions, type Help, type HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import type { ItemContext } from 'ojs/ojcommontypes';
import type { DataProvider, Item, TextFilter } from 'ojs/ojdataprovider';
import type { ImmutableKeySet } from 'ojs/ojkeyset';
import { type Action, type ExtendGlobalProps, type ObservedGlobalProps, type PropertyChanged, type ReadOnlyPropertyChanged, type TemplateSlot } from 'ojs/ojvcomponent';
import type { ComponentProps, ComponentType } from 'preact';
import 'css!oj-c/select-single/select-single-styles.css';
type PreactSelectSingleProps = ComponentProps<typeof PreactSelectSingle>;
type DisplayOptionsProps = Omit<DisplayOptions, 'converterHint' | 'validatorHint'>;
type ItemTemplateContext<K extends string | number, D extends Record<string, any>> = Pick<Parameters<NonNullable<PreactSelectSingleProps['itemRenderer']>>[0], 'searchText'> & {
    item: Item<K, D>;
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
    onRowAction: (detail: {
        item: Item<K, D>;
    }) => void;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
type AdvancedSearchActionPayload = Parameters<NonNullable<PreactSelectSingleProps['onAdvancedSearchAction']>>[0];
type ValueActionPayload<V, D> = {
    itemContext: ItemContext<V, D> | null;
    previousValue: V | null;
    value: V | null;
};
type Props<V extends string | number, D extends Record<string, any>> = ObservedGlobalProps<'aria-describedby' | 'id'> & {
    advancedSearch?: PreactSelectSingleProps['advancedSearch'];
    collectionTemplate?: TemplateSlot<CollectionTemplateContext<V, D>>;
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    data?: DataProvider<V, D> | null;
    disabled?: boolean;
    displayOptions?: DisplayOptionsProps;
    help?: Help;
    helpHints?: HelpHints;
    itemTemplate?: TemplateSlot<ItemTemplateContext<V, D>>;
    itemText: keyof D | ((itemContext: ItemContext<V, D>) => string);
    labelEdge?: PreactSelectSingleProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    matchBy?: Array<TextFilter<D>['matchBy']> | null;
    messagesCustom?: PreactSelectSingleProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactSelectSingleProps['textAlign'];
    userAssistanceDensity?: PreactSelectSingleProps['userAssistanceDensity'];
    value?: V | null;
    valueItem?: ItemContext<V, D> | null;
    virtualKeyboard?: PreactSelectSingleProps['virtualKeyboard'];
    onMessagesCustomChanged?: PropertyChanged<PreactSelectSingleProps['messages']>;
    onValidChanged?: ReadOnlyPropertyChanged<ValidState>;
    onValueChanged?: PropertyChanged<V | null | undefined>;
    onValueItemChanged?: PropertyChanged<ItemContext<V, D> | null | undefined>;
    onOjAdvancedSearchAction?: Action<AdvancedSearchActionPayload>;
    onOjValueAction?: Action<ValueActionPayload<V, D>>;
};
export declare const SelectSingle: ComponentType<ExtendGlobalProps<Props<string | number, Record<string, any>>>>;
export type SelectSingleProps<V extends string | number, D extends Record<string, any>> = Props<V, D>;
export {};
export interface CSelectSingleElement<V extends string | number, D extends Record<string, any>> extends JetElement<CSelectSingleElementSettableProperties<V, D>>, CSelectSingleElementSettableProperties<V, D> {
    readonly valid?: Parameters<Required<Props<V, D>>['onValidChanged']>[0];
    addEventListener<T extends keyof CSelectSingleElementEventMap<V, D>>(type: T, listener: (this: HTMLElement, ev: CSelectSingleElementEventMap<V, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSelectSingleElementSettableProperties<V, D>>(property: T): CSelectSingleElement<V, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSelectSingleElementSettableProperties<V, D>>(property: T, value: CSelectSingleElementSettableProperties<V, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSelectSingleElementSettableProperties<V, D>>): void;
    setProperties(properties: CSelectSingleElementSettablePropertiesLenient<V, D>): void;
    UNSAFE_focusAndOpenDropdown: () => void;
    _doAdvancedSearchAction: (searchText: string) => void;
    _selectItemByValue: (value: V | null) => Promise<void>;
    blur: () => void;
    focus: () => void;
    reset: () => void;
    showMessages: () => void;
    validate: () => Promise<'invalid' | 'valid'>;
}
export namespace CSelectSingleElement {
    interface ojAdvancedSearchAction extends CustomEvent<{
        searchText: string;
    }> {
    }
    interface ojValueAction<V extends string | number, D extends Record<string, any>> extends CustomEvent<ValueActionPayload<V, D> & {}> {
    }
    type advancedSearchChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['advancedSearch']>;
    type columnSpanChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['columnSpan']>;
    type containerReadonlyChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['containerReadonly']>;
    type dataChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['data']>;
    type disabledChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['disabled']>;
    type displayOptionsChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['displayOptions']>;
    type helpChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['help']>;
    type helpHintsChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['helpHints']>;
    type itemTextChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['itemText']>;
    type labelEdgeChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelEdge']>;
    type labelHintChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelHint']>;
    type labelStartWidthChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelStartWidth']>;
    type labelWrappingChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelWrapping']>;
    type matchByChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['matchBy']>;
    type messagesCustomChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['messagesCustom']>;
    type placeholderChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['placeholder']>;
    type readonlyChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['readonly']>;
    type requiredChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['required']>;
    type requiredMessageDetailChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['requiredMessageDetail']>;
    type textAlignChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['textAlign']>;
    type userAssistanceDensityChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['userAssistanceDensity']>;
    type validChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['valid']>;
    type valueChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['value']>;
    type valueItemChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['valueItem']>;
    type virtualKeyboardChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['virtualKeyboard']>;
    type RenderCollectionTemplate<V extends string | number, D extends Record<string, any>> = import('ojs/ojvcomponent').TemplateSlot<CollectionTemplateContext<V, D>>;
    type RenderItemTemplate<V extends string | number, D extends Record<string, any>> = import('ojs/ojvcomponent').TemplateSlot<ItemTemplateContext<V, D>>;
}
export interface CSelectSingleElementEventMap<V extends string | number, D extends Record<string, any>> extends HTMLElementEventMap {
    'ojAdvancedSearchAction': CSelectSingleElement.ojAdvancedSearchAction;
    'ojValueAction': CSelectSingleElement.ojValueAction<V, D>;
    'advancedSearchChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['advancedSearch']>;
    'columnSpanChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['containerReadonly']>;
    'dataChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['data']>;
    'disabledChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['disabled']>;
    'displayOptionsChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['displayOptions']>;
    'helpChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['help']>;
    'helpHintsChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['helpHints']>;
    'itemTextChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['itemText']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['labelWrapping']>;
    'matchByChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['matchBy']>;
    'messagesCustomChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['placeholder']>;
    'readonlyChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['textAlign']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['userAssistanceDensity']>;
    'validChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['valid']>;
    'valueChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['value']>;
    'valueItemChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['valueItem']>;
    'virtualKeyboardChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['virtualKeyboard']>;
}
export interface CSelectSingleElementSettableProperties<V extends string | number, D extends Record<string, any>> extends JetSettableProperties {
    advancedSearch?: Props<V, D>['advancedSearch'];
    columnSpan?: Props<V, D>['columnSpan'];
    containerReadonly?: Props<V, D>['containerReadonly'];
    data?: Props<V, D>['data'];
    disabled?: Props<V, D>['disabled'];
    displayOptions?: Props<V, D>['displayOptions'];
    help?: Props<V, D>['help'];
    helpHints?: Props<V, D>['helpHints'];
    itemText: Props<V, D>['itemText'];
    labelEdge?: Props<V, D>['labelEdge'];
    labelHint: Props<V, D>['labelHint'];
    labelStartWidth?: Props<V, D>['labelStartWidth'];
    labelWrapping?: Props<V, D>['labelWrapping'];
    matchBy?: Props<V, D>['matchBy'];
    messagesCustom?: Props<V, D>['messagesCustom'];
    placeholder?: Props<V, D>['placeholder'];
    readonly?: Props<V, D>['readonly'];
    required?: Props<V, D>['required'];
    requiredMessageDetail?: Props<V, D>['requiredMessageDetail'];
    textAlign?: Props<V, D>['textAlign'];
    userAssistanceDensity?: Props<V, D>['userAssistanceDensity'];
    value?: Props<V, D>['value'];
    valueItem?: Props<V, D>['valueItem'];
    virtualKeyboard?: Props<V, D>['virtualKeyboard'];
}
export interface CSelectSingleElementSettablePropertiesLenient<V extends string | number, D extends Record<string, any>> extends Partial<CSelectSingleElementSettableProperties<V, D>> {
    [key: string]: any;
}
export interface SelectSingleIntrinsicProps extends Partial<Readonly<CSelectSingleElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    valid?: never;
    children?: import('preact').ComponentChildren;
    onojAdvancedSearchAction?: (value: CSelectSingleElementEventMap<any, any>['ojAdvancedSearchAction']) => void;
    onojValueAction?: (value: CSelectSingleElementEventMap<any, any>['ojValueAction']) => void;
    onadvancedSearchChanged?: (value: CSelectSingleElementEventMap<any, any>['advancedSearchChanged']) => void;
    oncolumnSpanChanged?: (value: CSelectSingleElementEventMap<any, any>['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CSelectSingleElementEventMap<any, any>['containerReadonlyChanged']) => void;
    ondataChanged?: (value: CSelectSingleElementEventMap<any, any>['dataChanged']) => void;
    ondisabledChanged?: (value: CSelectSingleElementEventMap<any, any>['disabledChanged']) => void;
    ondisplayOptionsChanged?: (value: CSelectSingleElementEventMap<any, any>['displayOptionsChanged']) => void;
    onhelpChanged?: (value: CSelectSingleElementEventMap<any, any>['helpChanged']) => void;
    onhelpHintsChanged?: (value: CSelectSingleElementEventMap<any, any>['helpHintsChanged']) => void;
    onitemTextChanged?: (value: CSelectSingleElementEventMap<any, any>['itemTextChanged']) => void;
    onlabelEdgeChanged?: (value: CSelectSingleElementEventMap<any, any>['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CSelectSingleElementEventMap<any, any>['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CSelectSingleElementEventMap<any, any>['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CSelectSingleElementEventMap<any, any>['labelWrappingChanged']) => void;
    onmatchByChanged?: (value: CSelectSingleElementEventMap<any, any>['matchByChanged']) => void;
    onmessagesCustomChanged?: (value: CSelectSingleElementEventMap<any, any>['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CSelectSingleElementEventMap<any, any>['placeholderChanged']) => void;
    onreadonlyChanged?: (value: CSelectSingleElementEventMap<any, any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CSelectSingleElementEventMap<any, any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CSelectSingleElementEventMap<any, any>['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CSelectSingleElementEventMap<any, any>['textAlignChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CSelectSingleElementEventMap<any, any>['userAssistanceDensityChanged']) => void;
    onvalidChanged?: (value: CSelectSingleElementEventMap<any, any>['validChanged']) => void;
    onvalueChanged?: (value: CSelectSingleElementEventMap<any, any>['valueChanged']) => void;
    onvalueItemChanged?: (value: CSelectSingleElementEventMap<any, any>['valueItemChanged']) => void;
    onvirtualKeyboardChanged?: (value: CSelectSingleElementEventMap<any, any>['virtualKeyboardChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-select-single': SelectSingleIntrinsicProps;
        }
    }
}
