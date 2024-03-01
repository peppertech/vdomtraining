import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { TagCloud as PreactTagCloud } from '@oracle/oraclejet-preact/UNSAFE_TagCloud';
import 'css!oj-c/tag-cloud/tag-cloud-styles.css';
import { DataProvider } from 'ojs/ojdataprovider';
import { TagCloudItemProps } from '../tag-cloud-item/tag-cloud-item';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
type PreactTagCloudProps = ComponentProps<typeof PreactTagCloud>;
type DatatipContext<K> = {
    id: K;
};
export type Item<K> = {
    id: K;
} & TagCloudItemProps;
export type TagCloudItemTemplateContext<K, D> = {
    data: D;
    key: K;
    index: number;
};
export type TagCloudProps<K, D extends Item<K> | any> = ObservedGlobalProps<'aria-label' | 'aria-describedby' | 'aria-labelledby'> & {
    data: DataProvider<K, D> | null;
    datatip?: (context: DatatipContext<K>) => string;
    hiddenCategories?: string[] | undefined;
    touchResponse?: 'touchStart' | 'auto';
    highlightMatch?: 'any' | 'all';
    onHiddenCategoriesChanged?: PropertyChanged<string[]>;
    highlightedCategories?: string[];
    onHighlightedCategoriesChanged?: PropertyChanged<string[]>;
    hoverBehavior?: 'dim' | 'none';
    layout?: PreactTagCloudProps['layout'];
    selectionMode?: 'none' | 'single' | 'multiple';
    selection?: K[];
    onSelectionChanged?: PropertyChanged<K[]>;
    itemTemplate?: TemplateSlot<TagCloudItemTemplateContext<K, D>>;
};
declare function TagCloudComp<K extends string | number, D extends any>({ hiddenCategories, data, highlightedCategories, hoverBehavior, layout, selection, selectionMode, highlightMatch, ...props }: TagCloudProps<K, D>): import("preact").JSX.Element;
export declare const TagCloud: ComponentType<ExtendGlobalProps<ComponentProps<typeof TagCloudComp>>>;
export {};
export interface CTagCloudElement<K extends string | number, D extends any> extends JetElement<CTagCloudElementSettableProperties<K, D>>, CTagCloudElementSettableProperties<K, D> {
    addEventListener<T extends keyof CTagCloudElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CTagCloudElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTagCloudElementSettableProperties<K, D>>(property: T): CTagCloudElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTagCloudElementSettableProperties<K, D>>(property: T, value: CTagCloudElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTagCloudElementSettableProperties<K, D>>): void;
    setProperties(properties: CTagCloudElementSettablePropertiesLenient<K, D>): void;
}
export namespace CTagCloudElement {
    type dataChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['data']>;
    type datatipChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['datatip']>;
    type hiddenCategoriesChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['hiddenCategories']>;
    type highlightMatchChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['highlightMatch']>;
    type highlightedCategoriesChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['highlightedCategories']>;
    type hoverBehaviorChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['hoverBehavior']>;
    type layoutChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['layout']>;
    type selectionChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['selection']>;
    type selectionModeChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['selectionMode']>;
    type touchResponseChanged<K extends string | number, D extends any> = JetElementCustomEventStrict<CTagCloudElement<K, D>['touchResponse']>;
}
export interface CTagCloudElementEventMap<K extends string | number, D extends any> extends HTMLElementEventMap {
    'dataChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['data']>;
    'datatipChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['datatip']>;
    'hiddenCategoriesChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['hiddenCategories']>;
    'highlightMatchChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['highlightMatch']>;
    'highlightedCategoriesChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['highlightedCategories']>;
    'hoverBehaviorChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['hoverBehavior']>;
    'layoutChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['layout']>;
    'selectionChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['selection']>;
    'selectionModeChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['selectionMode']>;
    'touchResponseChanged': JetElementCustomEventStrict<CTagCloudElement<K, D>['touchResponse']>;
}
export interface CTagCloudElementSettableProperties<K, D extends Item<K> | any> extends JetSettableProperties {
    data: TagCloudProps<K, D>['data'];
    datatip?: TagCloudProps<K, D>['datatip'];
    hiddenCategories?: TagCloudProps<K, D>['hiddenCategories'];
    highlightMatch?: TagCloudProps<K, D>['highlightMatch'];
    highlightedCategories?: TagCloudProps<K, D>['highlightedCategories'];
    hoverBehavior?: TagCloudProps<K, D>['hoverBehavior'];
    layout?: TagCloudProps<K, D>['layout'];
    selection?: TagCloudProps<K, D>['selection'];
    selectionMode?: TagCloudProps<K, D>['selectionMode'];
    touchResponse?: TagCloudProps<K, D>['touchResponse'];
}
export interface CTagCloudElementSettablePropertiesLenient<K, D extends Item<K> | any> extends Partial<CTagCloudElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface TagCloudIntrinsicProps extends Partial<Readonly<CTagCloudElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    ondataChanged?: (value: CTagCloudElementEventMap<any, any>['dataChanged']) => void;
    ondatatipChanged?: (value: CTagCloudElementEventMap<any, any>['datatipChanged']) => void;
    onhiddenCategoriesChanged?: (value: CTagCloudElementEventMap<any, any>['hiddenCategoriesChanged']) => void;
    onhighlightMatchChanged?: (value: CTagCloudElementEventMap<any, any>['highlightMatchChanged']) => void;
    onhighlightedCategoriesChanged?: (value: CTagCloudElementEventMap<any, any>['highlightedCategoriesChanged']) => void;
    onhoverBehaviorChanged?: (value: CTagCloudElementEventMap<any, any>['hoverBehaviorChanged']) => void;
    onlayoutChanged?: (value: CTagCloudElementEventMap<any, any>['layoutChanged']) => void;
    onselectionChanged?: (value: CTagCloudElementEventMap<any, any>['selectionChanged']) => void;
    onselectionModeChanged?: (value: CTagCloudElementEventMap<any, any>['selectionModeChanged']) => void;
    ontouchResponseChanged?: (value: CTagCloudElementEventMap<any, any>['touchResponseChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-tag-cloud': TagCloudIntrinsicProps;
        }
    }
}
