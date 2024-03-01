import { ItemContext } from 'ojs/ojcommontypes';
import { ChartGroupTemplateContext, ChartItemTemplateContext, ChartSeriesTemplateContext } from './useChartData';
import { TemplateSlot } from 'ojs/ojvcomponent';
import { AreaChartItemProps } from 'oj-c/area-chart-item/area-chart-item';
import { AreaChartGroupProps } from 'oj-c/area-chart-group/area-chart-group';
import { AreaChartSeriesProps } from 'oj-c/area-chart-series/area-chart-series';
export type ItemProps<K, D> = {
    id: K;
    _itemData?: D;
} & AreaChartItemProps;
export type SeriesProps<K, D> = {
    id: string;
    items: ItemProps<K, D>[];
} & AreaChartSeriesProps;
export type GroupsProps = {
    id: string;
    groups?: GroupsProps[];
    symbol?: symbol;
} & AreaChartGroupProps;
declare const createGroupsAndSeries: <K, D>(data: ItemContext<K, D>[], itemTemplate?: TemplateSlot<ChartItemTemplateContext<K, D>> | undefined, seriesTemplate?: TemplateSlot<ChartSeriesTemplateContext<K, D>> | undefined, groupTemplate?: TemplateSlot<ChartGroupTemplateContext<K, D>> | undefined, itemElementName?: string, seriesElementName?: string, groupElementName?: string, seriesComparator?: ((context1: ChartSeriesTemplateContext<K, D>, context2: ChartSeriesTemplateContext<K, D>) => number) | undefined, groupComparator?: ((context1: ChartGroupTemplateContext<K, D>, context2: ChartGroupTemplateContext<K, D>) => number) | undefined) => {
    groups: (Record<string, any> | {
        drilling: any;
        name: any;
        id: any;
        accessibleLabel: any;
    })[];
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
};
export { createGroupsAndSeries };
