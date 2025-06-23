import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { DataProvider, Item } from 'ojs/ojdataprovider';
import { ImmutableKeySet } from 'ojs/ojkeyset';
import { Action, Bubbles, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, ReadOnlyPropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import { ListView as PreactListView, ItemPadding } from '@oracle/oraclejet-preact/UNSAFE_ListView';
import 'css!oj-c/list-view/list-view-styles.css';
import { ContextMenuItems } from '../utils/PRIVATE_ItemsMenu/items-menu';
type PreactListViewProps = ComponentProps<typeof PreactListView>;
export type ContextMenuConfig<K, D> = {
    accessibleLabel?: string;
    items: (context: ListItemContextProps<K, D>) => Array<ContextMenuItems>;
};
type ListItemContextProps<K, D> = Omit<ListItemContext<K, D>, 'isTabbable'>;
export type ListViewContextMenuSelectionDetail<K, D> = {
    value: string | Array<string>;
    menuSelectionGroupKey: string;
    contextMenuContext: ListItemContextProps<K, D>;
};
export type ListViewContextMenuActionDetail<K, D> = {
    menuItemKey: string;
    contextMenuContext: ListItemContextProps<K, D>;
};
export type ListItemContext<K, D> = {
    data: D;
    item: Item<K, D>;
    isTabbable: boolean;
};
export type ItemActionDetail<K, D> = {
    context: ListItemContextProps<K, D>;
};
export type FirstSelectedItemDetail<K, D> = {
    key: K;
    data: D;
};
export type ReorderDetail<K> = {
    reorderedKeys: Array<K>;
    itemKeys: Array<K>;
    referenceKey: K | null;
};
type selectionMode = PreactListViewProps['selectionMode'] | 'singleRequired';
type Props<K extends string | number, D> = ObservedGlobalProps<'aria-label' | 'aria-labelledby' | 'id'> & {
    onCurrentItemChanged?: ReadOnlyPropertyChanged<K>;
    currentItemOverride?: {
        rowKey: K;
    };
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
    selectionMode?: selectionMode;
    onOjItemAction?: Action<ItemActionDetail<K, D>>;
    onOjFirstSelectedItem?: Action<FirstSelectedItemDetail<K, D>>;
    contextMenuConfig?: ContextMenuConfig<K, D>;
    onOjContextMenuAction?: Action<ListViewContextMenuActionDetail<K, D>> & Bubbles;
    onOjContextMenuSelection?: Action<ListViewContextMenuSelectionDetail<K, D>> & Bubbles;
    reorderable?: {
        items?: 'enabled' | 'disabled';
    };
    onOjReorder?: Action<ReorderDetail<K>>;
    item?: {
        padding?: 'disabled' | 'enabled' | ItemPadding;
    };
};
declare const ListViewImpl: <K extends string | number, D>({ selectionMode, reorderable, item, ...rest }: Props<K, D>) => import("preact").JSX.Element;
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
    interface ojFirstSelectedItem<K extends string | number, D> extends CustomEvent<FirstSelectedItemDetail<K, D> & {}> {
    }
    interface ojContextMenuAction<K extends string | number, D> extends CustomEvent<ListViewContextMenuActionDetail<K, D> & {}> {
    }
    interface ojContextMenuSelection<K extends string | number, D> extends CustomEvent<ListViewContextMenuSelectionDetail<K, D> & {}> {
    }
    interface ojReorder<K extends string | number> extends CustomEvent<ReorderDetail<K> & {}> {
    }
    type contextMenuConfigChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['contextMenuConfig']>;
    type currentItemChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['currentItem']>;
    type currentItemOverrideChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['currentItemOverride']>;
    type dataChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['data']>;
    type gridlinesChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['gridlines']>;
    type itemChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['item']>;
    type reorderableChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['reorderable']>;
    type scrollPolicyOptionsChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['scrollPolicyOptions']>;
    type selectedChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['selected']>;
    type selectionModeChanged<K extends string | number, D> = JetElementCustomEventStrict<CListViewElement<K, D>['selectionMode']>;
    type RenderItemTemplate<K extends string | number, D> = import('ojs/ojvcomponent').TemplateSlot<ListItemContext<K, D>>;
    type RenderNoDataTemplate = import('ojs/ojvcomponent').TemplateSlot<{}>;
}
export interface CListViewElementEventMap<K extends string | number, D> extends HTMLElementEventMap {
    'ojItemAction': CListViewElement.ojItemAction<K, D>;
    'ojFirstSelectedItem': CListViewElement.ojFirstSelectedItem<K, D>;
    'ojContextMenuAction': CListViewElement.ojContextMenuAction<K, D>;
    'ojContextMenuSelection': CListViewElement.ojContextMenuSelection<K, D>;
    'ojReorder': CListViewElement.ojReorder<K>;
    'contextMenuConfigChanged': JetElementCustomEventStrict<CListViewElement<K, D>['contextMenuConfig']>;
    'currentItemChanged': JetElementCustomEventStrict<CListViewElement<K, D>['currentItem']>;
    'currentItemOverrideChanged': JetElementCustomEventStrict<CListViewElement<K, D>['currentItemOverride']>;
    'dataChanged': JetElementCustomEventStrict<CListViewElement<K, D>['data']>;
    'gridlinesChanged': JetElementCustomEventStrict<CListViewElement<K, D>['gridlines']>;
    'itemChanged': JetElementCustomEventStrict<CListViewElement<K, D>['item']>;
    'reorderableChanged': JetElementCustomEventStrict<CListViewElement<K, D>['reorderable']>;
    'scrollPolicyOptionsChanged': JetElementCustomEventStrict<CListViewElement<K, D>['scrollPolicyOptions']>;
    'selectedChanged': JetElementCustomEventStrict<CListViewElement<K, D>['selected']>;
    'selectionModeChanged': JetElementCustomEventStrict<CListViewElement<K, D>['selectionMode']>;
}
export interface CListViewElementSettableProperties<K extends string | number, D> extends JetSettableProperties {
    contextMenuConfig?: Props<K, D>['contextMenuConfig'];
    currentItemOverride?: Props<K, D>['currentItemOverride'];
    data?: Props<K, D>['data'];
    gridlines?: Props<K, D>['gridlines'];
    item?: Props<K, D>['item'];
    reorderable?: Props<K, D>['reorderable'];
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
    onojContextMenuAction?: (value: CListViewElementEventMap<any, any>['ojContextMenuAction']) => void;
    onojContextMenuSelection?: (value: CListViewElementEventMap<any, any>['ojContextMenuSelection']) => void;
    onojFirstSelectedItem?: (value: CListViewElementEventMap<any, any>['ojFirstSelectedItem']) => void;
    onojItemAction?: (value: CListViewElementEventMap<any, any>['ojItemAction']) => void;
    onojReorder?: (value: CListViewElementEventMap<any, any>['ojReorder']) => void;
    oncontextMenuConfigChanged?: (value: CListViewElementEventMap<any, any>['contextMenuConfigChanged']) => void;
    oncurrentItemChanged?: (value: CListViewElementEventMap<any, any>['currentItemChanged']) => void;
    oncurrentItemOverrideChanged?: (value: CListViewElementEventMap<any, any>['currentItemOverrideChanged']) => void;
    ondataChanged?: (value: CListViewElementEventMap<any, any>['dataChanged']) => void;
    ongridlinesChanged?: (value: CListViewElementEventMap<any, any>['gridlinesChanged']) => void;
    onitemChanged?: (value: CListViewElementEventMap<any, any>['itemChanged']) => void;
    onreorderableChanged?: (value: CListViewElementEventMap<any, any>['reorderableChanged']) => void;
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
