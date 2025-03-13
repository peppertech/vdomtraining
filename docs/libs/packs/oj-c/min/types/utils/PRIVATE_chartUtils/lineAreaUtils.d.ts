import { ValueFormats } from '@oracle/oraclejet-preact/utils/UNSAFE_visTypes/chart';
export declare function transformItem(item: any, series: any): {
    markerColor: any;
    accessibleLabel: any;
    value: any;
    label: any;
    id: any;
    drilling: any;
    isMarkerDisplayed: any;
    markerType: any;
    markerSize: any;
};
export declare function transformSeries(series: any, seriesIndex: number): {
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
};
export declare function transformGroup(group: any): {
    drilling: any;
    name: any;
    id: any;
    accessibleLabel: any;
};
export declare function transformValueFormats(valueFormats: any): ValueFormats | undefined;
