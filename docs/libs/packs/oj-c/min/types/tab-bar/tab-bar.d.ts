import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import type { Action, CancelableAction, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import type { ComponentProps, ComponentType } from 'preact';
import { DataProvider } from 'ojs/ojdataprovider';
import { DataTabBar } from './DataTabBar';
export type DataTabBarProps = ComponentProps<typeof DataTabBar>;
type Severity = 'warning' | 'info' | 'none' | 'error' | 'confirmation';
export type TabIconData = {
    type?: 'class';
    class: string;
} | {
    type: 'img';
    src: string;
};
export type TabData<K extends string | number> = {
    itemKey: K;
    label: string;
    icon?: TabIconData;
    badge?: number;
    metadata?: string;
    severity?: Severity;
    tabPanelId?: string;
    isRemovable?: boolean;
};
export type TabLinkItemData<K extends string | number> = {
    itemKey: K;
    label: string;
    icon?: TabIconData;
    badge?: number;
    metadata?: string;
    severity?: Severity;
    tabPanelId?: string;
    href: string;
};
export type KeyDetail<K extends string | number> = {
    key: K;
};
export type SelectionActionDetail<K extends string | number> = {
    previousValue: K;
    value: K;
};
export type ReorderDetail<K extends string | number> = {
    reorderedKeys: K[];
};
export type Props<K extends string | number> = ObservedGlobalProps<'aria-label' | 'id' | 'aria-labelledby'> & {
    data?: DataTabBarProps['data'] | DataProvider<K, TabData<K> | TabLinkItemData<K>>;
    selection?: K;
    onOjBeforeSelect?: CancelableAction<KeyDetail<K>>;
    onOjRemove?: Action<KeyDetail<K>>;
    onOjReorder?: Action<ReorderDetail<K>>;
    onOjSelectionAction?: Action<SelectionActionDetail<K>>;
    onSelectionChanged?: PropertyChanged<K>;
    reorderable?: DataTabBarProps['reorderable'];
    overflow?: DataTabBarProps['overflow'];
    display?: DataTabBarProps['display'];
    layout?: DataTabBarProps['layout'];
    edge?: DataTabBarProps['edge'];
    truncation?: DataTabBarProps['truncation'];
};
export declare const TabBar: ComponentType<ExtendGlobalProps<Props<string | number>>>;
export {};
export interface CTabBarElement extends JetElement<CTabBarElementSettableProperties<string | number>>, CTabBarElementSettableProperties<string | number> {
    addEventListener<T extends keyof CTabBarElementEventMap>(type: T, listener: (this: HTMLElement, ev: CTabBarElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTabBarElementSettableProperties<string | number>>(property: T): CTabBarElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTabBarElementSettableProperties<string | number>>(property: T, value: CTabBarElementSettableProperties<string | number>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTabBarElementSettableProperties<string | number>>): void;
    setProperties(properties: CTabBarElementSettablePropertiesLenient<string | number>): void;
    _doReorderHelper: (tabBarKeys: (string | number)[]) => void;
}
export namespace CTabBarElement {
    interface ojBeforeSelect<K extends string | number> extends CustomEvent<KeyDetail<K> & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojRemove<K extends string | number> extends CustomEvent<KeyDetail<K> & {}> {
    }
    interface ojReorder<K extends string | number> extends CustomEvent<ReorderDetail<K> & {}> {
    }
    interface ojSelectionAction<K extends string | number> extends CustomEvent<SelectionActionDetail<K> & {}> {
    }
    type dataChanged = JetElementCustomEventStrict<CTabBarElement['data']>;
    type displayChanged = JetElementCustomEventStrict<CTabBarElement['display']>;
    type edgeChanged = JetElementCustomEventStrict<CTabBarElement['edge']>;
    type layoutChanged = JetElementCustomEventStrict<CTabBarElement['layout']>;
    type overflowChanged = JetElementCustomEventStrict<CTabBarElement['overflow']>;
    type reorderableChanged = JetElementCustomEventStrict<CTabBarElement['reorderable']>;
    type selectionChanged = JetElementCustomEventStrict<CTabBarElement['selection']>;
    type truncationChanged = JetElementCustomEventStrict<CTabBarElement['truncation']>;
}
export interface CTabBarElementEventMap extends HTMLElementEventMap {
    'ojBeforeSelect': CTabBarElement.ojBeforeSelect<string | number>;
    'ojRemove': CTabBarElement.ojRemove<string | number>;
    'ojReorder': CTabBarElement.ojReorder<string | number>;
    'ojSelectionAction': CTabBarElement.ojSelectionAction<string | number>;
    'dataChanged': JetElementCustomEventStrict<CTabBarElement['data']>;
    'displayChanged': JetElementCustomEventStrict<CTabBarElement['display']>;
    'edgeChanged': JetElementCustomEventStrict<CTabBarElement['edge']>;
    'layoutChanged': JetElementCustomEventStrict<CTabBarElement['layout']>;
    'overflowChanged': JetElementCustomEventStrict<CTabBarElement['overflow']>;
    'reorderableChanged': JetElementCustomEventStrict<CTabBarElement['reorderable']>;
    'selectionChanged': JetElementCustomEventStrict<CTabBarElement['selection']>;
    'truncationChanged': JetElementCustomEventStrict<CTabBarElement['truncation']>;
}
export interface CTabBarElementSettableProperties<K extends string | number> extends JetSettableProperties {
    data?: Props<K>['data'];
    display?: Props<K>['display'];
    edge?: Props<K>['edge'];
    layout?: Props<K>['layout'];
    overflow?: Props<K>['overflow'];
    reorderable?: Props<K>['reorderable'];
    selection?: Props<K>['selection'];
    truncation?: Props<K>['truncation'];
}
export interface CTabBarElementSettablePropertiesLenient<K extends string | number> extends Partial<CTabBarElementSettableProperties<K>> {
    [key: string]: any;
}
export interface TabBarIntrinsicProps extends Partial<Readonly<CTabBarElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onojBeforeSelect?: (value: CTabBarElementEventMap['ojBeforeSelect']) => void;
    onojRemove?: (value: CTabBarElementEventMap['ojRemove']) => void;
    onojReorder?: (value: CTabBarElementEventMap['ojReorder']) => void;
    onojSelectionAction?: (value: CTabBarElementEventMap['ojSelectionAction']) => void;
    ondataChanged?: (value: CTabBarElementEventMap['dataChanged']) => void;
    ondisplayChanged?: (value: CTabBarElementEventMap['displayChanged']) => void;
    onedgeChanged?: (value: CTabBarElementEventMap['edgeChanged']) => void;
    onlayoutChanged?: (value: CTabBarElementEventMap['layoutChanged']) => void;
    onoverflowChanged?: (value: CTabBarElementEventMap['overflowChanged']) => void;
    onreorderableChanged?: (value: CTabBarElementEventMap['reorderableChanged']) => void;
    onselectionChanged?: (value: CTabBarElementEventMap['selectionChanged']) => void;
    ontruncationChanged?: (value: CTabBarElementEventMap['truncationChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-tab-bar': TabBarIntrinsicProps;
        }
    }
}
