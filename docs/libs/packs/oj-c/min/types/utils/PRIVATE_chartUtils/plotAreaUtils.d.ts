import type { MajorTick as PreactMajorTick, MinorTick as PreactMinorTick } from '@oracle/oraclejet-preact/UNSAFE_PlotArea/PlotArea.types';
import { PlotArea } from '../UNSAFE_vizTypes/chartTypes';
type MajorTick = Omit<PreactMajorTick, 'isRendered'> & {
    rendered: 'on' | 'off' | 'auto';
};
type MinorTick = Omit<PreactMinorTick, 'isRendered'> & {
    rendered: 'on' | 'off' | 'auto';
};
export declare function getPlotArea(plotArea?: PlotArea, yMajorTick?: MajorTick, yMinorTick?: MinorTick, xMajorTick?: MajorTick): {
    color: import("csstype").Property.Color | undefined;
    yMajorTick: MajorTick | {
        lineStyle?: "dashed" | "dotted" | "solid" | undefined;
        lineWidth?: number | undefined;
        lineColor?: import("csstype").Property.Color | undefined;
        rendered: "auto" | "off" | "on";
        isRendered: boolean;
    } | undefined;
    yMinorTick: MinorTick | {
        lineStyle?: "dashed" | "dotted" | "solid" | undefined;
        lineWidth?: number | undefined;
        lineColor?: import("csstype").Property.Color | undefined;
        rendered: "auto" | "off" | "on";
        isRendered: boolean;
    } | undefined;
    xMajorTick: MajorTick | {
        lineStyle?: "dashed" | "dotted" | "solid" | undefined;
        lineWidth?: number | undefined;
        lineColor?: import("csstype").Property.Color | undefined;
        rendered: "auto" | "off" | "on";
        isRendered: boolean;
    } | undefined;
};
export {};
