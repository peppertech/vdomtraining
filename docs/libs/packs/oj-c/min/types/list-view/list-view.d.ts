import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { DataProvider, Item } from 'ojs/ojdataprovider';
import { ImmutableKeySet } from 'ojs/ojkeyset';
import { Action, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import { ListView as PreactListView } from '@oracle/oraclejet-preact/UNSAFE_ListView';
import 'css!oj-c/list-view/list-view-styles.css';
type PreactListViewProps = ComponentProps<typeof PreactListView>;
export type ListItemContext<K, D> = {
    data: D;
    item: Item<K, D>;
    isTabbable: boolean;
};
export type ItemActionDetail<K, D> = {
    context: Omit<ListItemContext<K, D>, 'isTabbable'>;
};
type Props<K extends string | number, D> = ObservedGlobalProps<'aria-label' | 'aria-labelledby' | 'id'> & {
    onCurrentItemChanged?: ReadOnlyPropertyChanged<K>;
    data?: DataProvider<K, D> | null;
    gridlines?: PreactListViewProps['gridlines'];
    itemTemplate?: TemplateSlot<ListItemContext<K, D>>;
    noData?: TemplateSlot<any>;
    scrollPolicyOptions?: {
        fetchSize?: number;
        scroller?: string;
    };
    selected?: ImmutableKeySet<K>;
    onSelectedChanged?: PropertyChanged<ImmutableKeySet<K>>;
    selectionMode?: PreactListViewProps['selectionMode'];
    onOjItemAction?: Action<ItemActionDetail<K, D>>;
};
declare const ListViewImpl: <K extends string | number, D>({ selectionMode, ...rest }: Props<K, D>) => import("preact").JSX.Element;
export declare const ListView: ComponentType<ExtendGlobalProps<ComponentProps<typeof ListViewImpl<string | number, any>>>>;
export type ListViewProps<K extends string | number, D> = Props<K, D>;
export {};
export interface CListViewElement<K extends string | number, D> extends JetElement<CListViewElementSettableProperties<K, D>>, CListViewElementSettableProperties<K, D> {
    readonly currentItem?: Parameters<Required<Props<K, D>>['onCurrentItemChanged']>[0];
    addEventListener<T extends keyof CListViewElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CListViewElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CListViewElementSettableProperties<K, D>>(property: T): CListViewElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CListViewElementSettableProperties<K, D>>(property: T, value: CListViewElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CListViewElementSettableProperties<K, D>>): void;
    setProperties(properties: CListViewElementSettablePropertiesLenient<K, D>): void;
}
export namespace CListViewElement {
    interface ojItemAction<K extends string | number, D> extends CustomEvent<ItemActionDetail<K, D> & {}> {
    }
    type currentItemChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['currentItem']>;
    type dataChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['data']>;
    type gridlinesChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['gridlines']>;
    type scrollPolicyOptionsChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['scrollPolicyOptions']>;
    type selectedChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['selected']>;
    type selectionModeChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['selectionMode']>;
}
export interface CListViewElementEventMap<K extends string | number, D> extends HTMLElementEventMap {
    'ojItemAction': CListViewElement.ojItemAction<K, D>;
    'currentItemChanged': JetElementCustomEventStrict<CListViewElement<K, D>['currentItem']>;
    'dataChanged': JetElementCustomEventStrict<CListViewElement<K, D>['data']>;
    'gridlinesChanged': JetElementCustomEventStrict<CListViewElement<K, D>['gridlines']>;
    'scrollPolicyOptionsChanged': JetElementCustomEventStrict<CListViewElement<K, D>['scrollPolicyOptions']>;
    'selectedChanged': JetElementCustomEventStrict<CListViewElement<K, D>['selected']>;
    'selectionModeChanged': JetElementCustomEventStrict<CListViewElement<K, D>['selectionMode']>;
}
export interface CListViewElementSettableProperties<K extends string | number, D> extends JetSettableProperties {
    data?: Props<K, D>['data'];
    gridlines?: Props<K, D>['gridlines'];
    scrollPolicyOptions?: Props<K, D>['scrollPolicyOptions'];
    selected?: Props<K, D>['selected'];
    selectionMode?: Props<K, D>['selectionMode'];
}
export interface CListViewElementSettablePropertiesLenient<K extends string | number, D> extends Partial<CListViewElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface ListViewIntrinsicProps extends Partial<Readonly<CListViewElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    currentItem?: never;
    children?: import('preact').ComponentChildren;
    onojItemAction?: (value: CListViewElementEventMap<any, any>['ojItemAction']) => void;
    oncurrentItemChanged?: (value: CListViewElementEventMap<any, any>['currentItemChanged']) => void;
    ondataChanged?: (value: CListViewElementEventMap<any, any>['dataChanged']) => void;
    ongridlinesChanged?: (value: CListViewElementEventMap<any, any>['gridlinesChanged']) => void;
    onscrollPolicyOptionsChanged?: (value: CListViewElementEventMap<any, any>['scrollPolicyOptionsChanged']) => void;
    onselectedChanged?: (value: CListViewElementEventMap<any, any>['selectedChanged']) => void;
    onselectionModeChanged?: (value: CListViewElementEventMap<any, any>['selectionModeChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-list-view': ListViewIntrinsicProps;
        }
    }
}
