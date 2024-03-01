import { TemplateSlot } from 'ojs/ojvcomponent';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
export type ChartItemTemplateContext<K, D> = {
    data: D;
    key: K;
    index: number;
};
export type ChartSeriesTemplateContext<K, D> = {
    items: ChartItemTemplateContext<K, D>[];
    id: string;
    index: number;
};
export type ChartGroupTemplateContext<K, D> = {
    items: ChartItemTemplateContext<K, D>[];
    ids: string[];
    index: number;
    depth: number;
};
export declare function useChartData<K, D>(dataProvider: ArrayDataProvider<K, D>, addBusyState: (description: string) => () => void, itemTemplate?: TemplateSlot<ChartItemTemplateContext<K, D>>, seriesTemplate?: TemplateSlot<ChartSeriesTemplateContext<K, D>>, groupTemplate?: TemplateSlot<ChartGroupTemplateContext<K, D>>, itemElementName?: string, seriesElementName?: string, groupElementName?: string, seriesComparator?: (context1: ChartSeriesTemplateContext<K, D>, context2: ChartSeriesTemplateContext<K, D>) => number, groupComparator?: (context1: ChartGroupTemplateContext<K, D>, context2: ChartGroupTemplateContext<K, D>) => number): {
    series: Record<string, any>[] | {
        lineColor: any;
        areaColor: any;
        accessibleLabel: any;
        drilling: any;
        lineStyle: any;
        lineType: any;
        lineWidth: any;
        markerShape: any;
        markerColor: any;
        markerDisplayed: any;
        markerSize: any;
        id: any;
        name: any;
        items: any;
    }[];
    groups: (Record<string, any> | {
        drilling: any;
        name: any;
        id: any;
        accessibleLabel: any;
    })[];
    getDataItem: (seriesIndex: number, groupIndex: number) => any;
};
