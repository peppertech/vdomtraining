import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { LineAreaChart as PreactAreaChart } from '@oracle/oraclejet-preact/UNSAFE_LineAreaChart';
import { DataProvider } from 'ojs/ojdataprovider';
import { AreaChartItemProps } from '../area-chart-item/area-chart-item';
import 'css!oj-c/area-chart/area-chart-styles.css';
import { Action, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ChartItemTemplateContext, ChartSeriesTemplateContext, ChartGroupTemplateContext } from '../hooks/UNSAFE_useChartData/useChartData';
import { Group } from '@oracle/oraclejet-preact/UNSAFE_Axis/axis.types';
import { ViewPortDetail, PlotArea, YAxis, XAxis, ValueFormats } from '../utils/UNSAFE_vizTypes/chartTypes';
import { AreaChartSeriesProps } from '../area-chart-series/area-chart-series';
import { ChartLegend } from 'oj-c/utils/UNSAFE_vizTypes/legendTypes';
type PreactAreaChartProps = ComponentProps<typeof PreactAreaChart>;
export type AreaItem<K> = {
    id: K;
} & AreaChartItemProps;
export type LineChartSeries<K> = {
    items: AreaItem<K>[];
} & AreaChartSeriesProps;
type ItemDrillDetail<K, D> = {
    id: K;
    series: K;
    group: K;
    data: AreaItem<K>;
    itemData: D;
    seriesData: LineChartSeries<K>;
    groupData: Group;
};
type SeriesDrillDetail<K> = {
    id: K;
    series: K;
    seriesData: LineChartSeries<K>;
    items: AreaItem<K>[];
};
type GroupDrillDetail<K> = {
    id: K;
    group: K;
    groupData: Group;
    items: AreaItem<K>[];
};
export type AreaChartProps<K, D extends AreaItem<K> | any> = ObservedGlobalProps<'aria-label' | 'aria-describedby' | 'aria-labelledby'> & {
    data?: DataProvider<K, D> | null;
    itemTemplate?: TemplateSlot<ChartItemTemplateContext<K, D>>;
    seriesTemplate?: TemplateSlot<ChartSeriesTemplateContext<K, D>>;
    groupTemplate?: TemplateSlot<ChartGroupTemplateContext<K, D>>;
    seriesComparator?: (context1: ChartSeriesTemplateContext<K, D>, context2: ChartSeriesTemplateContext<K, D>) => number;
    groupComparator?: (context1: ChartGroupTemplateContext<K, D>, context2: ChartGroupTemplateContext<K, D>) => number;
    stack?: 'on' | 'off';
    drilling?: 'on' | 'off';
    orientation?: PreactAreaChartProps['orientation'];
    yAxis?: YAxis;
    xAxis?: XAxis;
    plotArea?: PlotArea;
    zoomAndScroll?: PreactAreaChartProps['zoomAndScroll'];
    valueFormats?: ValueFormats;
    onOjViewportChange?: Action<ViewPortDetail>;
    onOjItemDrill?: Action<ItemDrillDetail<K, D>>;
    onOjGroupDrill?: Action<GroupDrillDetail<K>>;
    onOjSeriesDrill?: Action<SeriesDrillDetail<K>>;
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
declare function AreaChartComp<K extends string | number, D extends AreaItem<K> | any>({ data, hideAndShowBehavior, orientation, xAxis, yAxis, hoverBehavior, valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling, hiddenCategories, highlightedCategories, highlightMatch, selection, selectionMode, stack, legend, ...props }: AreaChartProps<K, D>): import("preact").JSX.Element;
export declare const AreaChart: ComponentType<ExtendGlobalProps<ComponentProps<typeof AreaChartComp>>>;
export {};
export interface CAreaChartElement<K extends string | number, D extends AreaItem<K> | any> extends JetElement<CAreaChartElementSettableProperties<K, D>>, CAreaChartElementSettableProperties<K, D> {
    addEventListener<T extends keyof CAreaChartElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CAreaChartElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CAreaChartElementSettableProperties<K, D>>(property: T): CAreaChartElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CAreaChartElementSettableProperties<K, D>>(property: T, value: CAreaChartElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CAreaChartElementSettableProperties<K, D>>): void;
    setProperties(properties: CAreaChartElementSettablePropertiesLenient<K, D>): void;
}
export namespace CAreaChartElement {
    interface ojViewportChange extends CustomEvent<ViewPortDetail & {}> {
    }
    interface ojItemDrill<K extends string | number, D extends AreaItem<K> | any> extends CustomEvent<ItemDrillDetail<K, D> & {}> {
    }
    interface ojGroupDrill<K extends string | number> extends CustomEvent<GroupDrillDetail<K> & {}> {
    }
    interface ojSeriesDrill<K extends string | number> extends CustomEvent<SeriesDrillDetail<K> & {}> {
    }
    type dataChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['data']>;
    type drillingChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['drilling']>;
    type groupComparatorChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['groupComparator']>;
    type hiddenCategoriesChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['hiddenCategories']>;
    type hideAndShowBehaviorChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['hideAndShowBehavior']>;
    type highlightMatchChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['highlightMatch']>;
    type highlightedCategoriesChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['highlightedCategories']>;
    type hoverBehaviorChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['hoverBehavior']>;
    type legendChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['legend']>;
    type orientationChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['orientation']>;
    type plotAreaChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['plotArea']>;
    type selectionChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['selection']>;
    type selectionModeChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['selectionMode']>;
    type seriesComparatorChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['seriesComparator']>;
    type stackChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['stack']>;
    type valueFormatsChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['valueFormats']>;
    type xAxisChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['xAxis']>;
    type yAxisChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['yAxis']>;
    type zoomAndScrollChanged<K extends string | number, D extends AreaItem<K> | any> = JetElementCustomEventStrict<CAreaChartElement<K, D>['zoomAndScroll']>;
}
export interface CAreaChartElementEventMap<K extends string | number, D extends AreaItem<K> | any> extends HTMLElementEventMap {
    'ojViewportChange': CAreaChartElement.ojViewportChange;
    'ojItemDrill': CAreaChartElement.ojItemDrill<K, D>;
    'ojGroupDrill': CAreaChartElement.ojGroupDrill<K>;
    'ojSeriesDrill': CAreaChartElement.ojSeriesDrill<K>;
    'dataChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['data']>;
    'drillingChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['drilling']>;
    'groupComparatorChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['groupComparator']>;
    'hiddenCategoriesChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['hiddenCategories']>;
    'hideAndShowBehaviorChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['hideAndShowBehavior']>;
    'highlightMatchChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['highlightMatch']>;
    'highlightedCategoriesChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['highlightedCategories']>;
    'hoverBehaviorChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['hoverBehavior']>;
    'legendChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['legend']>;
    'orientationChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['orientation']>;
    'plotAreaChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['plotArea']>;
    'selectionChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['selection']>;
    'selectionModeChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['selectionMode']>;
    'seriesComparatorChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['seriesComparator']>;
    'stackChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['stack']>;
    'valueFormatsChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['valueFormats']>;
    'xAxisChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['xAxis']>;
    'yAxisChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['yAxis']>;
    'zoomAndScrollChanged': JetElementCustomEventStrict<CAreaChartElement<K, D>['zoomAndScroll']>;
}
export interface CAreaChartElementSettableProperties<K, D extends AreaItem<K> | any> extends JetSettableProperties {
    data?: AreaChartProps<K, D>['data'];
    drilling?: AreaChartProps<K, D>['drilling'];
    groupComparator?: AreaChartProps<K, D>['groupComparator'];
    hiddenCategories?: AreaChartProps<K, D>['hiddenCategories'];
    hideAndShowBehavior?: AreaChartProps<K, D>['hideAndShowBehavior'];
    highlightMatch?: AreaChartProps<K, D>['highlightMatch'];
    highlightedCategories?: AreaChartProps<K, D>['highlightedCategories'];
    hoverBehavior?: AreaChartProps<K, D>['hoverBehavior'];
    legend?: AreaChartProps<K, D>['legend'];
    orientation?: AreaChartProps<K, D>['orientation'];
    plotArea?: AreaChartProps<K, D>['plotArea'];
    selection?: AreaChartProps<K, D>['selection'];
    selectionMode?: AreaChartProps<K, D>['selectionMode'];
    seriesComparator?: AreaChartProps<K, D>['seriesComparator'];
    stack?: AreaChartProps<K, D>['stack'];
    valueFormats?: AreaChartProps<K, D>['valueFormats'];
    xAxis?: AreaChartProps<K, D>['xAxis'];
    yAxis?: AreaChartProps<K, D>['yAxis'];
    zoomAndScroll?: AreaChartProps<K, D>['zoomAndScroll'];
}
export interface CAreaChartElementSettablePropertiesLenient<K, D extends AreaItem<K> | any> extends Partial<CAreaChartElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface AreaChartIntrinsicProps extends Partial<Readonly<CAreaChartElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojGroupDrill?: (value: CAreaChartElementEventMap<any, any>['ojGroupDrill']) => void;
    onojItemDrill?: (value: CAreaChartElementEventMap<any, any>['ojItemDrill']) => void;
    onojSeriesDrill?: (value: CAreaChartElementEventMap<any, any>['ojSeriesDrill']) => void;
    onojViewportChange?: (value: CAreaChartElementEventMap<any, any>['ojViewportChange']) => void;
    ondataChanged?: (value: CAreaChartElementEventMap<any, any>['dataChanged']) => void;
    ondrillingChanged?: (value: CAreaChartElementEventMap<any, any>['drillingChanged']) => void;
    ongroupComparatorChanged?: (value: CAreaChartElementEventMap<any, any>['groupComparatorChanged']) => void;
    onhiddenCategoriesChanged?: (value: CAreaChartElementEventMap<any, any>['hiddenCategoriesChanged']) => void;
    onhideAndShowBehaviorChanged?: (value: CAreaChartElementEventMap<any, any>['hideAndShowBehaviorChanged']) => void;
    onhighlightMatchChanged?: (value: CAreaChartElementEventMap<any, any>['highlightMatchChanged']) => void;
    onhighlightedCategoriesChanged?: (value: CAreaChartElementEventMap<any, any>['highlightedCategoriesChanged']) => void;
    onhoverBehaviorChanged?: (value: CAreaChartElementEventMap<any, any>['hoverBehaviorChanged']) => void;
    onlegendChanged?: (value: CAreaChartElementEventMap<any, any>['legendChanged']) => void;
    onorientationChanged?: (value: CAreaChartElementEventMap<any, any>['orientationChanged']) => void;
    onplotAreaChanged?: (value: CAreaChartElementEventMap<any, any>['plotAreaChanged']) => void;
    onselectionChanged?: (value: CAreaChartElementEventMap<any, any>['selectionChanged']) => void;
    onselectionModeChanged?: (value: CAreaChartElementEventMap<any, any>['selectionModeChanged']) => void;
    onseriesComparatorChanged?: (value: CAreaChartElementEventMap<any, any>['seriesComparatorChanged']) => void;
    onstackChanged?: (value: CAreaChartElementEventMap<any, any>['stackChanged']) => void;
    onvalueFormatsChanged?: (value: CAreaChartElementEventMap<any, any>['valueFormatsChanged']) => void;
    onxAxisChanged?: (value: CAreaChartElementEventMap<any, any>['xAxisChanged']) => void;
    onyAxisChanged?: (value: CAreaChartElementEventMap<any, any>['yAxisChanged']) => void;
    onzoomAndScrollChanged?: (value: CAreaChartElementEventMap<any, any>['zoomAndScrollChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-area-chart': AreaChartIntrinsicProps;
        }
    }
}
