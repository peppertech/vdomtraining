import { LineAreaChart as PreactLineAreaChart } from '@oracle/oraclejet-preact/UNSAFE_LineAreaChart';
import { ComponentProps } from 'preact';
import { ColorProps } from '@oracle/oraclejet-preact/utils/UNSAFE_interpolations/colors';
import { MajorTick, MinorTick } from '@oracle/oraclejet-preact/UNSAFE_PlotArea/PlotArea.types';
type PreactLineAreaChartProps = ComponentProps<typeof PreactLineAreaChart>;
export type ViewPortDetail = {
    startGroup: string;
    endGroup: string;
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
};
export type PlotArea = {
    backgroundColor?: ColorProps['color'];
};
export type YAxis = {
    majorTick?: Omit<MajorTick, 'isRendered'> & {
        rendered: 'off' | 'on' | 'auto';
    };
    minorTick?: Omit<MinorTick, 'isRendered'> & {
        rendered: 'off' | 'on' | 'auto';
    };
} & Omit<PreactLineAreaChartProps['yAxis'], 'position'>;
export type XAxis = {
    majorTick?: Omit<MajorTick, 'isRendered'> & {
        rendered: 'off' | 'on' | 'auto';
    };
} & Omit<PreactLineAreaChartProps['xAxis'], 'timeAxisType' | 'groups' | 'offset'>;
type TextValueFormat = {
    tooltipLabel?: string;
    tooltipDisplay?: 'off' | 'auto';
};
type NumericalValueFormat = {
    converter: any;
} & TextValueFormat;
export type ValueFormats = {
    group: TextValueFormat;
    series: TextValueFormat;
    value: NumericalValueFormat;
};
export {};
