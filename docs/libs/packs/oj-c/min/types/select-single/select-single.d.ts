import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { SelectSingle as PreactSelectSingle } from '@oracle/oraclejet-preact/UNSAFE_SelectSingle';
import { DisplayOptions, Help, HelpHints } from 'oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText';
import { ItemContext } from 'ojs/ojcommontypes';
import { DataProvider, Item } from 'ojs/ojdataprovider';
import { Action, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { Component, ComponentProps } from 'preact';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import 'css!oj-c/select-single/select-single-styles.css';
type PreactSelectSingleProps = ComponentProps<typeof PreactSelectSingle>;
type ItemTemplateContext<K extends string | number, D extends Record<string, any>> = Pick<Parameters<NonNullable<PreactSelectSingleProps['itemRenderer']>>[0], 'searchText'> & {
    item: Item<K, D>;
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
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    data?: DataProvider<V, D> | null;
    disabled?: boolean;
    displayOptions?: Omit<DisplayOptions, 'converterHint' | 'validatorHint'>;
    help?: Help;
    helpHints?: HelpHints;
    itemTemplate?: TemplateSlot<ItemTemplateContext<V, D>>;
    itemText: keyof D | ((itemContext: ItemContext<V, D>) => string);
    labelEdge?: PreactSelectSingleProps['labelEdge'];
    labelHint: string;
    labelStartWidth?: Size;
    labelWrapping?: 'truncate' | 'wrap';
    messagesCustom?: PreactSelectSingleProps['messages'];
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    textAlign?: PreactSelectSingleProps['textAlign'];
    unsafe_labelledBy?: string;
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
export declare class SelectSingle<V extends string | number, D extends Record<string, any>> extends Component<ExtendGlobalProps<Props<V, D>>> {
    static defaultProps: Pick<Props<any, any>, 'advancedSearch' | 'columnSpan' | 'data' | 'disabled' | 'displayOptions' | 'help' | 'helpHints' | 'messagesCustom' | 'readonly' | 'required' | 'requiredMessageDetail' | 'userAssistanceDensity' | 'value' | 'valueItem' | 'virtualKeyboard'>;
    private busyContextRef;
    private selectSingleRef;
    private rootRef;
    componentDidMount(): void;
    render({ columnSpan, ...props }: ExtendGlobalProps<Props<V, D>>): import("preact").JSX.Element;
    componentWillUnmount(): void;
    reset(): void;
    showMessages(): void;
    validate(): Promise<'valid' | 'invalid'>;
    blur(): void;
    focus(): void;
    _doAdvancedSearchAction(searchText: string): void | undefined;
    _selectItemByValue(value: V | null): Promise<void> | undefined;
}
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
    _doAdvancedSearchAction: SelectSingle<V, D>['_doAdvancedSearchAction'];
    _selectItemByValue: SelectSingle<V, D>['_selectItemByValue'];
    blur: SelectSingle<V, D>['blur'];
    focus: SelectSingle<V, D>['focus'];
    reset: SelectSingle<V, D>['reset'];
    showMessages: SelectSingle<V, D>['showMessages'];
    validate: SelectSingle<V, D>['validate'];
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
    type messagesCustomChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['messagesCustom']>;
    type placeholderChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['placeholder']>;
    type readonlyChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['readonly']>;
    type requiredChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['required']>;
    type requiredMessageDetailChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['requiredMessageDetail']>;
    type textAlignChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['textAlign']>;
    type unsafe_labelledByChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['unsafe_labelledBy']>;
    type userAssistanceDensityChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['userAssistanceDensity']>;
    type validChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['valid']>;
    type valueChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['value']>;
    type valueItemChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['valueItem']>;
    type virtualKeyboardChanged<V extends string | number, D extends Record<string, any>> = JetElementCustomEventStrict<CSelectSingleElement<V, D>['virtualKeyboard']>;
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
    'messagesCustomChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['messagesCustom']>;
    'placeholderChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['placeholder']>;
    'readonlyChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['readonly']>;
    'requiredChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['required']>;
    'requiredMessageDetailChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['requiredMessageDetail']>;
    'textAlignChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['textAlign']>;
    'unsafe_labelledByChanged': JetElementCustomEventStrict<CSelectSingleElement<V, D>['unsafe_labelledBy']>;
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
    messagesCustom?: Props<V, D>['messagesCustom'];
    placeholder?: Props<V, D>['placeholder'];
    readonly?: Props<V, D>['readonly'];
    required?: Props<V, D>['required'];
    requiredMessageDetail?: Props<V, D>['requiredMessageDetail'];
    textAlign?: Props<V, D>['textAlign'];
    unsafe_labelledBy?: Props<V, D>['unsafe_labelledBy'];
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
    onmessagesCustomChanged?: (value: CSelectSingleElementEventMap<any, any>['messagesCustomChanged']) => void;
    onplaceholderChanged?: (value: CSelectSingleElementEventMap<any, any>['placeholderChanged']) => void;
    onreadonlyChanged?: (value: CSelectSingleElementEventMap<any, any>['readonlyChanged']) => void;
    onrequiredChanged?: (value: CSelectSingleElementEventMap<any, any>['requiredChanged']) => void;
    onrequiredMessageDetailChanged?: (value: CSelectSingleElementEventMap<any, any>['requiredMessageDetailChanged']) => void;
    ontextAlignChanged?: (value: CSelectSingleElementEventMap<any, any>['textAlignChanged']) => void;
    onunsafe_labelledByChanged?: (value: CSelectSingleElementEventMap<any, any>['unsafe_labelledByChanged']) => void;
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
