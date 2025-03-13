import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps } from 'preact';
import { RefObject } from 'preact/compat';
import { Legend as PreactLegend } from '@oracle/oraclejet-preact/UNSAFE_Legend';
import 'css!oj-c/legend/legend-styles.css';
import { DataProvider } from 'ojs/ojdataprovider';
import { Action, Bubbles, ObservedGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { LegendItemProps } from '../legend-item/legend-item';
import { LegendItemTemplateContext, LegendSectionTemplateContext } from './useSectionData';
import { type ContextMenuConfig, type ContextMenuSelectionDetail, type ContextMenuActionDetail } from 'oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu';
type PreactLegendProps = ComponentProps<typeof PreactLegend>;
export type SizeHandle = {
    _getPreferredSize: (_width: number, _height: number) => {
        width: number;
        height: number;
    };
};
export type LegendContextMenuConfig<K, D> = ContextMenuConfig<LegendContextMenuContext<K, D>>;
export type LegendContextMenuSelectionDetail<K, D> = ContextMenuSelectionDetail<LegendContextMenuContext<K, D>>;
export type LegendContextMenuActionDetail<K, D> = ContextMenuActionDetail<LegendContextMenuContext<K, D>>;
export type LegendContextMenuContext<K, D> = {
    data?: Item<K>;
    itemData?: D;
    itemIndexPath: number[];
    type: 'item';
} | {
    type: 'background';
};
export type Item<K> = {
    id: K;
} & LegendItemProps;
export type Section<K> = {
    id: K;
    items: Item<K>[];
    title: string;
};
type DrillDetail<K> = {
    id: K;
};
type LegendProps<K, D extends Item<K> | Section<K> | any> = ObservedGlobalProps<'aria-label' | 'aria-describedby' | 'aria-labelledby'> & {
    data?: DataProvider<K, D> | null;
    drilling?: 'on' | 'off';
    halign?: 'center' | 'end' | 'start';
    hiddenCategories?: string[];
    onHiddenCategoriesChanged?: PropertyChanged<string[]>;
    hideAndShowBehavior?: 'on' | 'off';
    highlightedCategories?: string[];
    onHighlightedCategoriesChanged?: PropertyChanged<string[]>;
    hoverBehavior?: 'dim' | 'none';
    orientation?: PreactLegendProps['orientation'];
    symbolHeight?: PreactLegendProps['symbolHeight'];
    symbolWidth?: PreactLegendProps['symbolWidth'];
    textStyle?: Partial<Pick<CSSStyleDeclaration, 'color' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'fontStyle' | 'textDecoration'>>;
    valign?: 'middle' | 'bottom' | 'top';
    sectionTitleStyle?: Partial<Pick<CSSStyleDeclaration, 'color' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'fontStyle' | 'textDecoration'>>;
    sectionTitleHalign?: 'center' | 'end' | 'start';
    itemTemplate?: TemplateSlot<LegendItemTemplateContext<K, D>>;
    sectionTemplate?: TemplateSlot<LegendSectionTemplateContext<K, D>>;
    onOjDrill?: Action<DrillDetail<K>>;
    contextMenuConfig?: LegendContextMenuConfig<K, D>;
    onOjContextMenuAction?: Action<LegendContextMenuActionDetail<K, D>> & Bubbles;
    onOjContextMenuSelection?: Action<LegendContextMenuSelectionDetail<K, D>> & Bubbles;
};
export declare const Legend: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<LegendProps<string | number, any>>>;
type LinearLegendProps<K extends string | number, D> = Omit<LegendProps<K, D>, 'sectionTitleStyle'> & {
    addBusyState: (description: string) => () => void;
    linearLegendRef?: RefObject<SizeHandle>;
};
export declare const LinearLegend: <K extends string | number, D extends unknown>({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, orientation, symbolHeight, symbolWidth, valign, halign, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }: LinearLegendProps<K, D>) => import("preact").JSX.Element | null;
type SectionalLegendProps<K extends string | number, D> = LegendProps<K, D> & {
    addBusyState: (description: string) => () => void;
    sectionalLegendRef?: RefObject<SizeHandle>;
};
export declare const SectionalLegend: <K extends string | number, D extends unknown>({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, sectionTitleStyle, orientation, symbolHeight, symbolWidth, valign, halign, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }: SectionalLegendProps<K, D>) => import("preact").JSX.Element | null;
export {};
export interface CLegendElement<K extends string | number, D extends Item<K> | Section<K> | any> extends JetElement<CLegendElementSettableProperties<K, D>>, CLegendElementSettableProperties<K, D> {
    addEventListener<T extends keyof CLegendElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CLegendElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLegendElementSettableProperties<K, D>>(property: T): CLegendElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLegendElementSettableProperties<K, D>>(property: T, value: CLegendElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLegendElementSettableProperties<K, D>>): void;
    setProperties(properties: CLegendElementSettablePropertiesLenient<K, D>): void;
    _getPreferredSize: (_width: number, _height: number) => {
        width: number;
        height: number;
    };
}
export namespace CLegendElement {
    interface ojDrill<K extends string | number> extends CustomEvent<DrillDetail<K> & {}> {
    }
    interface ojContextMenuAction<K extends string | number, D extends Item<K> | Section<K> | any> extends CustomEvent<LegendContextMenuActionDetail<K, D> & {}> {
    }
    interface ojContextMenuSelection<K extends string | number, D extends Item<K> | Section<K> | any> extends CustomEvent<LegendContextMenuSelectionDetail<K, D> & {}> {
    }
    type contextMenuConfigChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['contextMenuConfig']>;
    type dataChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['data']>;
    type drillingChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['drilling']>;
    type halignChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['halign']>;
    type hiddenCategoriesChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['hiddenCategories']>;
    type hideAndShowBehaviorChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['hideAndShowBehavior']>;
    type highlightedCategoriesChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['highlightedCategories']>;
    type hoverBehaviorChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['hoverBehavior']>;
    type orientationChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['orientation']>;
    type sectionTitleHalignChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['sectionTitleHalign']>;
    type sectionTitleStyleChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['sectionTitleStyle']>;
    type symbolHeightChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['symbolHeight']>;
    type symbolWidthChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['symbolWidth']>;
    type textStyleChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['textStyle']>;
    type valignChanged<K extends string | number, D extends Item<K> | Section<K> | any> = JetElementCustomEventStrict<CLegendElement<K, D>['valign']>;
    type RenderItemTemplate<K extends string | number, D extends Item<K> | Section<K> | any> = import('ojs/ojvcomponent').TemplateSlot<LegendItemTemplateContext<K, D>>;
    type RenderSectionTemplate<K extends string | number, D extends Item<K> | Section<K> | any> = import('ojs/ojvcomponent').TemplateSlot<LegendSectionTemplateContext<K, D>>;
}
export interface CLegendElementEventMap<K extends string | number, D extends Item<K> | Section<K> | any> extends HTMLElementEventMap {
    'ojDrill': CLegendElement.ojDrill<K>;
    'ojContextMenuAction': CLegendElement.ojContextMenuAction<K, D>;
    'ojContextMenuSelection': CLegendElement.ojContextMenuSelection<K, D>;
    'contextMenuConfigChanged': JetElementCustomEventStrict<CLegendElement<K, D>['contextMenuConfig']>;
    'dataChanged': JetElementCustomEventStrict<CLegendElement<K, D>['data']>;
    'drillingChanged': JetElementCustomEventStrict<CLegendElement<K, D>['drilling']>;
    'halignChanged': JetElementCustomEventStrict<CLegendElement<K, D>['halign']>;
    'hiddenCategoriesChanged': JetElementCustomEventStrict<CLegendElement<K, D>['hiddenCategories']>;
    'hideAndShowBehaviorChanged': JetElementCustomEventStrict<CLegendElement<K, D>['hideAndShowBehavior']>;
    'highlightedCategoriesChanged': JetElementCustomEventStrict<CLegendElement<K, D>['highlightedCategories']>;
    'hoverBehaviorChanged': JetElementCustomEventStrict<CLegendElement<K, D>['hoverBehavior']>;
    'orientationChanged': JetElementCustomEventStrict<CLegendElement<K, D>['orientation']>;
    'sectionTitleHalignChanged': JetElementCustomEventStrict<CLegendElement<K, D>['sectionTitleHalign']>;
    'sectionTitleStyleChanged': JetElementCustomEventStrict<CLegendElement<K, D>['sectionTitleStyle']>;
    'symbolHeightChanged': JetElementCustomEventStrict<CLegendElement<K, D>['symbolHeight']>;
    'symbolWidthChanged': JetElementCustomEventStrict<CLegendElement<K, D>['symbolWidth']>;
    'textStyleChanged': JetElementCustomEventStrict<CLegendElement<K, D>['textStyle']>;
    'valignChanged': JetElementCustomEventStrict<CLegendElement<K, D>['valign']>;
}
export interface CLegendElementSettableProperties<K, D extends Item<K> | Section<K> | any> extends JetSettableProperties {
    contextMenuConfig?: ComponentProps<typeof Legend>['contextMenuConfig'];
    data?: ComponentProps<typeof Legend>['data'];
    drilling?: ComponentProps<typeof Legend>['drilling'];
    halign?: ComponentProps<typeof Legend>['halign'];
    hiddenCategories?: ComponentProps<typeof Legend>['hiddenCategories'];
    hideAndShowBehavior?: ComponentProps<typeof Legend>['hideAndShowBehavior'];
    highlightedCategories?: ComponentProps<typeof Legend>['highlightedCategories'];
    hoverBehavior?: ComponentProps<typeof Legend>['hoverBehavior'];
    orientation?: ComponentProps<typeof Legend>['orientation'];
    sectionTitleHalign?: ComponentProps<typeof Legend>['sectionTitleHalign'];
    sectionTitleStyle?: ComponentProps<typeof Legend>['sectionTitleStyle'];
    symbolHeight?: ComponentProps<typeof Legend>['symbolHeight'];
    symbolWidth?: ComponentProps<typeof Legend>['symbolWidth'];
    textStyle?: ComponentProps<typeof Legend>['textStyle'];
    valign?: ComponentProps<typeof Legend>['valign'];
}
export interface CLegendElementSettablePropertiesLenient<K, D extends Item<K> | Section<K> | any> extends Partial<CLegendElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface LegendIntrinsicProps extends Partial<Readonly<CLegendElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojContextMenuAction?: (value: CLegendElementEventMap<any, any>['ojContextMenuAction']) => void;
    onojContextMenuSelection?: (value: CLegendElementEventMap<any, any>['ojContextMenuSelection']) => void;
    onojDrill?: (value: CLegendElementEventMap<any, any>['ojDrill']) => void;
    oncontextMenuConfigChanged?: (value: CLegendElementEventMap<any, any>['contextMenuConfigChanged']) => void;
    ondataChanged?: (value: CLegendElementEventMap<any, any>['dataChanged']) => void;
    ondrillingChanged?: (value: CLegendElementEventMap<any, any>['drillingChanged']) => void;
    onhalignChanged?: (value: CLegendElementEventMap<any, any>['halignChanged']) => void;
    onhiddenCategoriesChanged?: (value: CLegendElementEventMap<any, any>['hiddenCategoriesChanged']) => void;
    onhideAndShowBehaviorChanged?: (value: CLegendElementEventMap<any, any>['hideAndShowBehaviorChanged']) => void;
    onhighlightedCategoriesChanged?: (value: CLegendElementEventMap<any, any>['highlightedCategoriesChanged']) => void;
    onhoverBehaviorChanged?: (value: CLegendElementEventMap<any, any>['hoverBehaviorChanged']) => void;
    onorientationChanged?: (value: CLegendElementEventMap<any, any>['orientationChanged']) => void;
    onsectionTitleHalignChanged?: (value: CLegendElementEventMap<any, any>['sectionTitleHalignChanged']) => void;
    onsectionTitleStyleChanged?: (value: CLegendElementEventMap<any, any>['sectionTitleStyleChanged']) => void;
    onsymbolHeightChanged?: (value: CLegendElementEventMap<any, any>['symbolHeightChanged']) => void;
    onsymbolWidthChanged?: (value: CLegendElementEventMap<any, any>['symbolWidthChanged']) => void;
    ontextStyleChanged?: (value: CLegendElementEventMap<any, any>['textStyleChanged']) => void;
    onvalignChanged?: (value: CLegendElementEventMap<any, any>['valignChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-legend': LegendIntrinsicProps;
        }
    }
}
