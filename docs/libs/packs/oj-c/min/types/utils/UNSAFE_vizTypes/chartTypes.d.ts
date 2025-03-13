import { ColorProps } from '@oracle/oraclejet-preact/utils/UNSAFE_interpolations/colors';
import Converter = require('ojs/ojconverter');
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
export type ChartAxisConverter = {
    format: (value: number) => string;
};
export type YAxisTickLabel = {
    converter?: Converter<number>;
    rendered?: 'on' | 'off';
    style?: Partial<CSSStyleDeclaration>;
};
export type XAxisTickLabel = {
    converter?: Converter<string> | [Converter<string>, Converter<string>];
    rendered?: 'on' | 'off';
    rotation?: 'auto' | 'none';
    style?: Partial<CSSStyleDeclaration>;
};
export type MajorTick = {
    lineColor?: ColorProps['color'];
    lineStyle?: 'dashed' | 'dotted' | 'solid';
    lineWidth?: number;
    rendered: 'off' | 'on' | 'auto';
};
export type MinorTick = {
    lineColor?: ColorProps['color'];
    lineStyle?: 'dashed' | 'dotted' | 'solid';
    lineWidth?: number;
    rendered: 'off' | 'on' | 'auto';
};
export type YAxis = {
    dataMax?: number;
    dataMin?: number;
    max?: number;
    min?: number;
    majorTick?: MajorTick;
    minorTick?: MinorTick;
    tickLabel?: YAxisTickLabel;
    viewportMin?: number;
    viewportMax?: number;
    step?: number;
    size?: number;
    scale?: 'log' | 'linear';
    title?: string;
    titleStyle?: Partial<CSSStyleDeclaration>;
};
export type XAxis = {
    majorTick?: MajorTick;
    minorTick?: MinorTick;
    tickLabel?: XAxisTickLabel;
    viewportMin?: number;
    viewportMax?: number;
    step?: number;
    size?: number;
    scale?: 'log' | 'linear';
    title?: string;
    titleStyle?: Partial<CSSStyleDeclaration>;
};
export type TextValueFormat = {
    tooltipLabel?: string;
    tooltipDisplay?: 'off' | 'auto';
};
export type NumericalValueFormat = {
    converter: Converter<number>;
} & TextValueFormat;
export type ValueFormats = {
    group: TextValueFormat;
    series: TextValueFormat;
    value: NumericalValueFormat;
};
