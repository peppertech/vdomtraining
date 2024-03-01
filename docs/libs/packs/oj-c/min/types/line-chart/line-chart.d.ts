import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { LineAreaChart as PreactLineChart } from '@oracle/oraclejet-preact/UNSAFE_LineAreaChart';
import { LineChartItemProps } from '../line-chart-item/line-chart-item';
import 'css!oj-c/line-chart/line-chart-styles.css';
import { Action, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ChartItemTemplateContext, ChartSeriesTemplateContext, ChartGroupTemplateContext } from '../hooks/UNSAFE_useChartData/useChartData';
import { Group } from '@oracle/oraclejet-preact/UNSAFE_Axis/axis.types';
import { ViewPortDetail, PlotArea, YAxis, XAxis, ValueFormats } from '../utils/UNSAFE_vizTypes/chartTypes';
import type { ChartLegend } from '../utils/UNSAFE_vizTypes';
import { DataProvider } from 'ojs/ojdataprovider';
import { LineChartSeriesProps } from 'oj-c/line-chart-series/line-chart-series';
type PreactLineChartProps = ComponentProps<typeof PreactLineChart>;
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
    onSelectionChanged?: PropertyChanged<(string | number)[]>;
    hiddenCategories?: string[];
    onHiddenCategoriesChanged?: PropertyChanged<string[]>;
    highlightedCategories?: string[];
    onHighlightedCategoriesChanged?: PropertyChanged<string[]>;
    hideAndShowBehavior?: 'withRescale' | 'withoutRescale' | 'none';
    hoverBehavior?: 'dim' | 'none';
    highlightMatch?: 'any' | 'all';
    legend?: ChartLegend;
};
declare function LineChartComp<K extends string | number, D extends LineItem<K> | any>({ data, hideAndShowBehavior, orientation, xAxis, yAxis, hoverBehavior, valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling, hiddenCategories, highlightedCategories, highlightMatch, selection, selectionMode, stack, legend, ...props }: LineChartProps<K, D>): import("preact").JSX.Element;
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
    type dataChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['data']>;
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
    type valueFormatsChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['valueFormats']>;
    type xAxisChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['xAxis']>;
    type yAxisChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['yAxis']>;
    type zoomAndScrollChanged<K extends string | number, D extends LineItem<K> | any> = JetElementCustomEventStrict<CLineChartElement<K, D>['zoomAndScroll']>;
}
export interface CLineChartElementEventMap<K extends string | number, D extends LineItem<K> | any> extends HTMLElementEventMap {
    'ojItemDrill': CLineChartElement.ojItemDrill<K, D>;
    'ojSeriesDrill': CLineChartElement.ojSeriesDrill<K>;
    'ojGroupDrill': CLineChartElement.ojGroupDrill<K>;
    'ojViewportChange': CLineChartElement.ojViewportChange;
    'dataChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['data']>;
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
    'valueFormatsChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['valueFormats']>;
    'xAxisChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['xAxis']>;
    'yAxisChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['yAxis']>;
    'zoomAndScrollChanged': JetElementCustomEventStrict<CLineChartElement<K, D>['zoomAndScroll']>;
}
export interface CLineChartElementSettableProperties<K, D extends LineItem<K> | any> extends JetSettableProperties {
    data?: LineChartProps<K, D>['data'];
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
    onojGroupDrill?: (value: CLineChartElementEventMap<any, any>['ojGroupDrill']) => void;
    onojItemDrill?: (value: CLineChartElementEventMap<any, any>['ojItemDrill']) => void;
    onojSeriesDrill?: (value: CLineChartElementEventMap<any, any>['ojSeriesDrill']) => void;
    onojViewportChange?: (value: CLineChartElementEventMap<any, any>['ojViewportChange']) => void;
    ondataChanged?: (value: CLineChartElementEventMap<any, any>['dataChanged']) => void;
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
