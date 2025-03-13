import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
type LayoutWidths = 'equal' | 'auto';
type WidthStyling = {
    style?: Styling;
};
type Styling = {
    width?: string;
    maxWidth?: string;
};
export declare function widthStyle(layoutWidth?: LayoutWidths, width?: Size, maxWidth?: Size): WidthStyling;
export {};
