import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { LineAreaChart as PreactLineChart } from '@oracle/oraclejet-preact/UNSAFE_LineAreaChart';
import { LineChartItemProps } from '../line-chart-item/line-chart-item';
import 'css!oj-c/line-chart/line-chart-styles.css';
import { Action, Bubbles, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ChartItemTemplateContext, ChartSeriesTemplateContext, ChartGroupTemplateContext } from '../hooks/UNSAFE_useChartData/useChartData';
import { Group } from '@oracle/oraclejet-preact/utils/UNSAFE_visTypes/chart';
import type { ViewPortDetail, PlotArea, YAxis, XAxis, ValueFormats } from '../utils/UNSAFE_vizTypes/chartTypes';
import type { ChartLegend } from '../utils/UNSAFE_vizTypes';
import { DataProvider } from 'ojs/ojdataprovider';
import { LineChartSeriesProps } from 'oj-c/line-chart-series/line-chart-series';
import { type ContextMenuConfig, type ContextMenuSelectionDetail, type ContextMenuActionDetail } from 'oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu';
import { AreaChartSeries } from 'oj-c/area-chart/area-chart';
type PreactLineChartProps = ComponentProps<typeof PreactLineChart>;
export type LineChartContextMenuConfig<K, D> = ContextMenuConfig<LineContextMenuContext<K, D>>;
export type LineChartContextMenuSelectionDetail<K, D> = ContextMenuSelectionDetail<LineContextMenuContext<K, D>>;
export type LineChartContextMenuActionDetail<K, D> = ContextMenuActionDetail<LineContextMenuContext<K, D>>;
export type LineContextMenuContext<K, D> = {
    data?: LineItem<K>;
    itemData?: D;
    type: 'item';
} | {
    type: 'background';
} | {
    type: 'xAxisTickLabel';
    data: Group;
} | {
    type: 'series';
    data: AreaChartSeries<K>;
} | {
    type: 'axisTitle';
    axis: 'x' | 'y';
};
export type LineItem<K> = {
    id: K;
} & LineChartItemProps;
export type LineChartSeries<K> = {
    items: LineItem<K>[];
} & LineChartSeriesProps;
type ItemDrillDetail<K, D> = {
    id: K;
    series: K;
    group: K;
    data: LineItem<K>;
    itemData: D;
    seriesData: LineChartSeries<K>;
    groupData: Group;
};
type SeriesDrillDetail<K> = {
    id: K;
    series: K;
    seriesData: LineChartSeries<K>;
    items: LineItem<K>[];
};
type GroupDrillDetail<K> = {
    id: K;
    group: K;
    groupData: Group;
    items: LineItem<K>[];
};
export type LineChartProps<K, D extends LineItem<K> | any> = ObservedGlobalProps<'aria-label' | 'aria-describedby' | 'aria-labelledby'> & {
    groupComparator?: (context1: ChartGroupTemplateContext<K, D>, context2: ChartGroupTemplateContext<K, D>) => number;
    stack?: 'on' | 'off';
    drilling?: 'on' | 'groupsOnly' | 'seriesOnly' | 'off';
    itemTemplate?: TemplateSlot<ChartItemTemplateContext<K, D>>;
    seriesTemplate?: TemplateSlot<ChartSeriesTemplateContext<K, D>>;
    groupTemplate?: TemplateSlot<ChartGroupTemplateContext<K, D>>;
    orientation?: PreactLineChartProps['orientation'];
    timeAxisType?: 'enabled' | 'mixedFrequency' | 'skipGaps';
    yAxis?: YAxis;
    xAxis?: XAxis;
    plotArea?: PlotArea;
    zoomAndScroll?: PreactLineChartProps['zoomAndScroll'];
    valueFormats?: ValueFormats;
    seriesComparator?: (context1: ChartSeriesTemplateContext<K, D>, context2: ChartSeriesTemplateContext<K, D>) => number;
    onOjItemDrill?: Action<ItemDrillDetail<K, D>>;
    onOjSeriesDrill?: Action<SeriesDrillDetail<K>>;
    onOjGroupDrill?: Action<GroupDrillDetail<K>>;
    onOjViewportChange?: Action<ViewPortDetail>;
    data?: DataProvider<K, D> | null;
    selectionMode?: 'none' | 'single' | 'multiple';
    selection?: K[];
    dragMode?: 'user' | 'select' | 'zoom' | 'pan' | 'off';
    onSelectionChanged?: PropertyChanged<(string | number)[]>;
    hiddenCategories?: string[];
    onHiddenCategoriesChanged?: PropertyChanged<string[]>;
    highlightedCategories?: string[];
    onHighlightedCategoriesChanged?: PropertyChanged<string[]>;
    hideAndShowBehavior?: 'withRescale' | 'withoutRescale' | 'none';
    hoverBehavior?: 'dim' | 'none';
    highlightMatch?: 'any' | 'all';
    legend?: ChartLegend;
    contextMenuConfig?: LineChartContextMenuConfig<K, D>;
    onOjContextMenuAction?: Action<LineChartContextMenuActionDetail<K, D>> & Bubbles;
    onOjContextMenuSelection?: Action<LineChartContextMenuSelectionDetail<K, D>> & Bubbles;
};
declare function LineChartComp<K extends string | number, D extends LineItem<K> | any>({ data, hideAndShowBehavior, orientation, xAxis, yAxis, hoverBehavior, valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling, hiddenCategories, timeAxisType, highlightedCategories, highlightMatch, selection, selectionMode, stack, legend, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }: LineChartProps<K, D>): import("preact").JSX.Element;
export declare const LineChart: ComponentType<ExtendGlobalProps<ComponentProps<typeof LineChartComp>>>;
export {};
export interface CLineChartElement<K extends string | number, D extends LineItem<K> | any> extends JetElement<CLineChartElementSettableProperties<K, D>>, CLineChartElementSettableProperties<K, D> {
    addEventListener<T extends keyof CLineChartElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CLineChartElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLineChartElementSettableProperties<K, D>>(property: T): CLineChartElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLineChartElementSettableProperties<K, D>>(property: T, value: CLineChartElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLineChartElementSettableProperties<K, D>>): void;
    setProperties(properties: CLineChartElementSettablePropertiesLenient<K, D>): void;
}
export namespace CLineChartElement {
    interface ojItemDrill<K extends string | number, D extends LineItem<K> | any> extends CustomEvent<ItemDrillDetail<K, D> & {}> {
    }
    interface ojSeriesDrill<K extends string | number> extends CustomEvent<SeriesDrillDetail<K> & {}> {
    }
    interface ojGroupDrill<K extends string | number> extends CustomEvent<GroupDrillDetail<K> & {}> {
    }
    interface ojViewportChange extends CustomEvent<ViewPortDetail & {}> {
    }
    interface ojContextMenuAction<K extends string | number, D extends LineItem<K> | any> extends CustomEvent<LineChartContextMenuActionDetail<K, D> & {}> {
    }
    interface ojContextMenuSelection<K extends string | number, D extends LineItem<K> | any> extends CustomEvent<LineChartContextMenuSelectionDetail<K, D> & {}> {
    }
    type contextMenuConfigChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['contextMenuConfig']>;
    type dataChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['data']>;
    type dragModeChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['dragMode']>;
    type drillingChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['drilling']>;
    type groupComparatorChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['groupComparator']>;
    type hiddenCategoriesChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['hiddenCategories']>;
    type hideAndShowBehaviorChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['hideAndShowBehavior']>;
    type highlightMatchChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['highlightMatch']>;
    type highlightedCategoriesChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['highlightedCategories']>;
    type hoverBehaviorChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['hoverBehavior']>;
    type legendChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['legend']>;
    type orientationChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['orientation']>;
    type plotAreaChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['plotArea']>;
    type selectionChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['selection']>;
    type selectionModeChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['selectionMode']>;
    type seriesComparatorChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['seriesComparator']>;
    type stackChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['stack']>;
    type timeAxisTypeChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['timeAxisType']>;
    type valueFormatsChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['valueFormats']>;
    type xAxisChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['xAxis']>;
    type yAxisChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['yAxis']>;
    type zoomAndScrollChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['zoomAndScroll']>;
    type RenderItemTemplate<K extends string | number, D extends LineItem<K> | any> = import('ojs/ojvcomponent').TemplateSlot<ChartItemTemplateContext<K, D>>;
    type RenderSeriesTemplate<K extends string | number, D extends LineItem<K> | any> = import('ojs/ojvcomponent').TemplateSlot<ChartSeriesTemplateContext<K, D>>;
    type RenderGroupTemplate<K extends string | number, D extends LineItem<K> | any> = import('ojs/ojvcomponent').TemplateSlot<ChartGroupTemplateContext<K, D>>;
}
export interface CLineChartElementEventMap<K extends string | number, D extends LineItem<K> | any> extends HTMLElementEventMap {
    'ojItemDrill': CLineChartElement.ojItemDrill<K, D>;
    'ojSeriesDrill': CLineChartElement.ojSeriesDrill<K>;
    'ojGroupDrill': CLineChartElement.ojGroupDrill<K>;
    'ojViewportChange': CLineChartElement.ojViewportChange;
    'ojContextMenuAction': CLineChartElement.ojContextMenuAction<K, D>;
    'ojContextMenuSelection': CLineChartElement.ojContextMenuSelection<K, D>;
    'contextMenuConfigChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['contextMenuConfig']>;
    'dataChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['data']>;
    'dragModeChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['dragMode']>;
    'drillingChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['drilling']>;
    'groupComparatorChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['groupComparator']>;
    'hiddenCategoriesChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['hiddenCategories']>;
    'hideAndShowBehaviorChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['hideAndShowBehavior']>;
    'highlightMatchChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['highlightMatch']>;
    'highlightedCategoriesChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['highlightedCategories']>;
    'hoverBehaviorChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['hoverBehavior']>;
    'legendChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['legend']>;
    'orientationChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['orientation']>;
    'plotAreaChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['plotArea']>;
    'selectionChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['selection']>;
    'selectionModeChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['selectionMode']>;
    'seriesComparatorChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['seriesComparator']>;
    'stackChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['stack']>;
    'timeAxisTypeChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['timeAxisType']>;
    'valueFormatsChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['valueFormats']>;
    'xAxisChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['xAxis']>;
    'yAxisChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['yAxis']>;
    'zoomAndScrollChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['zoomAndScroll']>;
}
export interface CLineChartElementSettableProperties<K, D extends LineItem<K> | any> extends JetSettableProperties {
    contextMenuConfig?: LineChartProps<K, D>['contextMenuConfig'];
    data?: LineChartProps<K, D>['data'];
    dragMode?: LineChartProps<K, D>['dragMode'];
    drilling?: LineChartProps<K, D>['drilling'];
    groupComparator?: LineChartProps<K, D>['groupComparator'];
    hiddenCategories?: LineChartProps<K, D>['hiddenCategories'];
    hideAndShowBehavior?: LineChartProps<K, D>['hideAndShowBehavior'];
    highlightMatch?: LineChartProps<K, D>['highlightMatch'];
    highlightedCategories?: LineChartProps<K, D>['highlightedCategories'];
    hoverBehavior?: LineChartProps<K, D>['hoverBehavior'];
    legend?: LineChartProps<K, D>['legend'];
    orientation?: LineChartProps<K, D>['orientation'];
    plotArea?: LineChartProps<K, D>['plotArea'];
    selection?: LineChartProps<K, D>['selection'];
    selectionMode?: LineChartProps<K, D>['selectionMode'];
    seriesComparator?: LineChartProps<K, D>['seriesComparator'];
    stack?: LineChartProps<K, D>['stack'];
    timeAxisType?: LineChartProps<K, D>['timeAxisType'];
    valueFormats?: LineChartProps<K, D>['valueFormats'];
    xAxis?: LineChartProps<K, D>['xAxis'];
    yAxis?: LineChartProps<K, D>['yAxis'];
    zoomAndScroll?: LineChartProps<K, D>['zoomAndScroll'];
}
export interface CLineChartElementSettablePropertiesLenient<K, D extends LineItem<K> | any> extends Partial<CLineChartElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface LineChartIntrinsicProps extends Partial<Readonly<CLineChartElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojContextMenuAction?: (value: CLineChartElementEventMap<any, any>['ojContextMenuAction']) => void;
    onojContextMenuSelection?: (value: CLineChartElementEventMap<any, any>['ojContextMenuSelection']) => void;
    onojGroupDrill?: (value: CLineChartElementEventMap<any, any>['ojGroupDrill']) => void;
    onojItemDrill?: (value: CLineChartElementEventMap<any, any>['ojItemDrill']) => void;
    onojSeriesDrill?: (value: CLineChartElementEventMap<any, any>['ojSeriesDrill']) => void;
    onojViewportChange?: (value: CLineChartElementEventMap<any, any>['ojViewportChange']) => void;
    oncontextMenuConfigChanged?: (value: CLineChartElementEventMap<any, any>['contextMenuConfigChanged']) => void;
    ondataChanged?: (value: CLineChartElementEventMap<any, any>['dataChanged']) => void;
    ondragModeChanged?: (value: CLineChartElementEventMap<any, any>['dragModeChanged']) => void;
    ondrillingChanged?: (value: CLineChartElementEventMap<any, any>['drillingChanged']) => void;
    ongroupComparatorChanged?: (value: CLineChartElementEventMap<any, any>['groupComparatorChanged']) => void;
    onhiddenCategoriesChanged?: (value: CLineChartElementEventMap<any, any>['hiddenCategoriesChanged']) => void;
    onhideAndShowBehaviorChanged?: (value: CLineChartElementEventMap<any, any>['hideAndShowBehaviorChanged']) => void;
    onhighlightMatchChanged?: (value: CLineChartElementEventMap<any, any>['highlightMatchChanged']) => void;
    onhighlightedCategoriesChanged?: (value: CLineChartElementEventMap<any, any>['highlightedCategoriesChanged']) => void;
    onhoverBehaviorChanged?: (value: CLineChartElementEventMap<any, any>['hoverBehaviorChanged']) => void;
    onlegendChanged?: (value: CLineChartElementEventMap<any, any>['legendChanged']) => void;
    onorientationChanged?: (value: CLineChartElementEventMap<any, any>['orientationChanged']) => void;
    onplotAreaChanged?: (value: CLineChartElementEventMap<any, any>['plotAreaChanged']) => void;
    onselectionChanged?: (value: CLineChartElementEventMap<any, any>['selectionChanged']) => void;
    onselectionModeChanged?: (value: CLineChartElementEventMap<any, any>['selectionModeChanged']) => void;
    onseriesComparatorChanged?: (value: CLineChartElementEventMap<any, any>['seriesComparatorChanged']) => void;
    onstackChanged?: (value: CLineChartElementEventMap<any, any>['stackChanged']) => void;
    ontimeAxisTypeChanged?: (value: CLineChartElementEventMap<any, any>['timeAxisTypeChanged']) => void;
    onvalueFormatsChanged?: (value: CLineChartElementEventMap<any, any>['valueFormatsChanged']) => void;
    onxAxisChanged?: (value: CLineChartElementEventMap<any, any>['xAxisChanged']) => void;
    onyAxisChanged?: (value: CLineChartElementEventMap<any, any>['yAxisChanged']) => void;
    onzoomAndScrollChanged?: (value: CLineChartElementEventMap<any, any>['zoomAndScrollChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-line-chart': LineChartIntrinsicProps;
        }
    }
}
