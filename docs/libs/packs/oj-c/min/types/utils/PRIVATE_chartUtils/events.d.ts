import { Group } from '@oracle/oraclejet-preact/UNSAFE_Axis/axis.types';
import { GroupContext, ItemContext } from '@oracle/oraclejet-preact/UNSAFE_Chart/chart.types';
export declare function getIdFromDetail(detail: {
    seriesIndex?: number;
    groupIndex?: number;
}, series: Record<any, string>[], getDataItem: (seriesIndex: number, groupIndex: number) => any): any;
export declare const getChartEventsHandler: <K, D>(series: Record<string, any>[], groups: Group[], drilling: 'on' | 'groupsOnly' | 'seriesOnly' | 'off', onOjItemDrill?: ((detail: any) => void) | undefined, onOjGroupDrill?: ((detail: any) => void) | undefined, onOjSeriesDrill?: ((detail: any) => void) | undefined) => {
    itemDrillHandler: (detail: ItemContext<K, D>) => void;
    groupDrillHandler: (detail: GroupContext) => void;
    seriesDrillHandler: (detail: any) => void;
};
