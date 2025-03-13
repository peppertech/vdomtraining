import { Group, GroupDetail, ItemDetail } from '@oracle/oraclejet-preact/utils/UNSAFE_visTypes/chart';
export declare function getIdFromDetail(detail: {
    seriesIndex?: number;
    groupIndex?: number;
}, series: Record<any, string>[], getDataItem: (seriesIndex: number, groupIndex: number) => any): any;
export declare const getChartEventsHandler: <K, D>(series: Record<string, any>[], groups: Group[], drilling: "on" | "groupsOnly" | "seriesOnly" | "off", onOjItemDrill?: (detail: any) => void, onOjGroupDrill?: (detail: any) => void, onOjSeriesDrill?: (detail: any) => void) => {
    itemDrillHandler: (detail: ItemDetail<K, D>) => void;
    groupDrillHandler: (detail: GroupDetail) => void;
    seriesDrillHandler: (detail: any) => void;
};
