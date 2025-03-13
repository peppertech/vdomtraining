import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { DataProvider, Item } from 'ojs/ojdataprovider';
import { ImmutableKeySet } from 'ojs/ojkeyset';
import { Action, ExtendGlobalProps, ObservedGlobalProps, ReadOnlyPropertyChanged, TemplateSlot, PropertyChanged } from 'ojs/ojvcomponent';
import { SkeletonRendererContext } from '@oracle/oraclejet-preact/UNSAFE_CardFlexView';
import { CardGridView as PreactCardGridView } from '@oracle/oraclejet-preact/UNSAFE_CardGridView';
import 'css!oj-c/card-view/card-view-styles.css';
type PreactCardViewProps = ComponentProps<typeof PreactCardGridView>;
export type SkeletonTemplateContext = SkeletonRendererContext;
export type ListItemContext<K, D> = {
    data: D;
    item: Item<K, D>;
    isTabbable?: boolean;
};
export type ReorderDetail<K> = {
    reorderedKeys: Array<K>;
    itemKeys: Array<K>;
    referenceKey: K | null;
};
type selectionMode = PreactCardViewProps['selectionMode'] | 'singleRequired';
type Props<K extends string | number, D> = ObservedGlobalProps<'aria-label' | 'aria-labelledby' | 'id'> & {
    onCurrentItemChanged?: ReadOnlyPropertyChanged<K>;
    data?: DataProvider<K, D> | null;
    gutterSize?: PreactCardViewProps['gutterSize'];
    noData?: TemplateSlot<any>;
    scrollPolicyOptions?: {
        fetchSize?: number;
        scroller?: string;
    };
    selected?: ImmutableKeySet<K>;
    itemTemplate?: TemplateSlot<ListItemContext<K, D>>;
    onSelectedChanged?: PropertyChanged<ImmutableKeySet<K>>;
    selectionMode?: selectionMode;
    initialAnimation?: PreactCardViewProps['initialAnimation'];
    focusBehavior?: PreactCardViewProps['focusBehavior'];
    columns?: PreactCardViewProps['columns'] | 'auto';
    reorderable?: {
        items?: 'enabled' | 'disabled';
    };
    onOjReorder?: Action<ReorderDetail<K>>;
    skeletonTemplate?: TemplateSlot<SkeletonTemplateContext>;
};
declare const CardViewImpl: <K extends string | number, D>({ columns, data, focusBehavior, gutterSize, initialAnimation, scrollPolicyOptions, selectionMode, reorderable, ...rest }: Props<K, D>) => import("preact").JSX.Element;
export declare const CardView: ComponentType<ExtendGlobalProps<ComponentProps<typeof CardViewImpl<string | number, any>>>>;
export type CardViewProps<K extends string | number, D> = Props<K, D>;
export {};
export interface CCardViewElement<K extends string | number, D> extends JetElement<CCardViewElementSettableProperties<K, D>>, CCardViewElementSettableProperties<K, D> {
    readonly currentItem?: Parameters<Required<Props<K, D>>['onCurrentItemChanged']>[0];
    addEventListener<T extends keyof CCardViewElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CCardViewElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CCardViewElementSettableProperties<K, D>>(property: T): CCardViewElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CCardViewElementSettableProperties<K, D>>(property: T, value: CCardViewElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CCardViewElementSettableProperties<K, D>>): void;
    setProperties(properties: CCardViewElementSettablePropertiesLenient<K, D>): void;
}
export namespace CCardViewElement {
    interface ojReorder<K extends string | number> extends CustomEvent<ReorderDetail<K> & {}> {
    }
    type columnsChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['columns']>;
    type currentItemChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['currentItem']>;
    type dataChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['data']>;
    type focusBehaviorChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['focusBehavior']>;
    type gutterSizeChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['gutterSize']>;
    type initialAnimationChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['initialAnimation']>;
    type reorderableChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['reorderable']>;
    type scrollPolicyOptionsChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['scrollPolicyOptions']>;
    type selectedChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['selected']>;
    type selectionModeChanged<K extends string | number, D> = JetElementCustomEventStrict<CCardViewElement<K, D>['selectionMode']>;
    type RenderNoDataTemplate = import('ojs/ojvcomponent').TemplateSlot<{}>;
    type RenderItemTemplate<K extends string | number, D> = import('ojs/ojvcomponent').TemplateSlot<ListItemContext<K, D>>;
    type RenderSkeletonTemplate = import('ojs/ojvcomponent').TemplateSlot<SkeletonRendererContext>;
}
export interface CCardViewElementEventMap<K extends string | number, D> extends HTMLElementEventMap {
    'ojReorder': CCardViewElement.ojReorder<K>;
    'columnsChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['columns']>;
    'currentItemChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['currentItem']>;
    'dataChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['data']>;
    'focusBehaviorChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['focusBehavior']>;
    'gutterSizeChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['gutterSize']>;
    'initialAnimationChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['initialAnimation']>;
    'reorderableChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['reorderable']>;
    'scrollPolicyOptionsChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['scrollPolicyOptions']>;
    'selectedChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['selected']>;
    'selectionModeChanged': JetElementCustomEventStrict<CCardViewElement<K, D>['selectionMode']>;
}
export interface CCardViewElementSettableProperties<K extends string | number, D> extends JetSettableProperties {
    columns?: Props<K, D>['columns'];
    data?: Props<K, D>['data'];
    focusBehavior?: Props<K, D>['focusBehavior'];
    gutterSize?: Props<K, D>['gutterSize'];
    initialAnimation?: Props<K, D>['initialAnimation'];
    reorderable?: Props<K, D>['reorderable'];
    scrollPolicyOptions?: Props<K, D>['scrollPolicyOptions'];
    selected?: Props<K, D>['selected'];
    selectionMode?: Props<K, D>['selectionMode'];
}
export interface CCardViewElementSettablePropertiesLenient<K extends string | number, D> extends Partial<CCardViewElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface CardViewIntrinsicProps extends Partial<Readonly<CCardViewElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    currentItem?: never;
    children?: import('preact').ComponentChildren;
    onojReorder?: (value: CCardViewElementEventMap<any, any>['ojReorder']) => void;
    oncolumnsChanged?: (value: CCardViewElementEventMap<any, any>['columnsChanged']) => void;
    oncurrentItemChanged?: (value: CCardViewElementEventMap<any, any>['currentItemChanged']) => void;
    ondataChanged?: (value: CCardViewElementEventMap<any, any>['dataChanged']) => void;
    onfocusBehaviorChanged?: (value: CCardViewElementEventMap<any, any>['focusBehaviorChanged']) => void;
    ongutterSizeChanged?: (value: CCardViewElementEventMap<any, any>['gutterSizeChanged']) => void;
    oninitialAnimationChanged?: (value: CCardViewElementEventMap<any, any>['initialAnimationChanged']) => void;
    onreorderableChanged?: (value: CCardViewElementEventMap<any, any>['reorderableChanged']) => void;
    onscrollPolicyOptionsChanged?: (value: CCardViewElementEventMap<any, any>['scrollPolicyOptionsChanged']) => void;
    onselectedChanged?: (value: CCardViewElementEventMap<any, any>['selectedChanged']) => void;
    onselectionModeChanged?: (value: CCardViewElementEventMap<any, any>['selectionModeChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-card-view': CardViewIntrinsicProps;
        }
    }
}
