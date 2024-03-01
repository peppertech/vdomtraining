import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
export type ChartLegend = {
    position: 'start' | 'end' | 'bottom' | 'top' | 'auto';
    rendered: 'on' | 'off' | 'auto';
    maxSize?: Size;
    size?: Size;
    symbolHeight?: number;
    symbolWidth?: number;
};
