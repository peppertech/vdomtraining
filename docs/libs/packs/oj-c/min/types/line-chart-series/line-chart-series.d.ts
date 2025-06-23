import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export declare const LineChartSeriesDefaults: Partial<LineChartSeriesProps>;
export type LineChartSeriesProps = {
    categories?: string[];
    color?: string;
    drilling?: 'on' | 'off' | 'inherit';
    lineStyle?: 'solid' | 'dotted' | 'dashed';
    lineType?: 'curved' | 'straight';
    lineWidth?: number;
    markerShape?: 'circle' | 'diamond' | 'human' | 'plus' | 'square' | 'star' | 'triangleDown' | 'triangleUp' | 'auto';
    markerColor?: string;
    markerDisplayed?: string;
    markerSize?: number;
    name?: string;
    shortDesc?: string;
};
export declare const LineChartSeries: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<LineChartSeriesProps>>;
export interface CLineChartSeriesElement extends JetElement<CLineChartSeriesElementSettableProperties>, CLineChartSeriesElementSettableProperties {
    addEventListener<T extends keyof CLineChartSeriesElementEventMap>(type: T, listener: (this: HTMLElement, ev: CLineChartSeriesElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLineChartSeriesElementSettableProperties>(property: T): CLineChartSeriesElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLineChartSeriesElementSettableProperties>(property: T, value: CLineChartSeriesElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLineChartSeriesElementSettableProperties>): void;
    setProperties(properties: CLineChartSeriesElementSettablePropertiesLenient): void;
}
export namespace CLineChartSeriesElement {
    type categoriesChanged = JetElementCustomEventStrict<CLineChartSeriesElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CLineChartSeriesElement['color']>;
    type drillingChanged = JetElementCustomEventStrict<CLineChartSeriesElement['drilling']>;
    type lineStyleChanged = JetElementCustomEventStrict<CLineChartSeriesElement['lineStyle']>;
    type lineTypeChanged = JetElementCustomEventStrict<CLineChartSeriesElement['lineType']>;
    type lineWidthChanged = JetElementCustomEventStrict<CLineChartSeriesElement['lineWidth']>;
    type markerColorChanged = JetElementCustomEventStrict<CLineChartSeriesElement['markerColor']>;
    type markerDisplayedChanged = JetElementCustomEventStrict<CLineChartSeriesElement['markerDisplayed']>;
    type markerShapeChanged = JetElementCustomEventStrict<CLineChartSeriesElement['markerShape']>;
    type markerSizeChanged = JetElementCustomEventStrict<CLineChartSeriesElement['markerSize']>;
    type nameChanged = JetElementCustomEventStrict<CLineChartSeriesElement['name']>;
    type shortDescChanged = JetElementCustomEventStrict<CLineChartSeriesElement['shortDesc']>;
}
export interface CLineChartSeriesElementEventMap extends HTMLElementEventMap {
    'categoriesChanged': JetElementCustomEventStrict<CLineChartSeriesElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CLineChartSeriesElement['color']>;
    'drillingChanged': JetElementCustomEventStrict<CLineChartSeriesElement['drilling']>;
    'lineStyleChanged': JetElementCustomEventStrict<CLineChartSeriesElement['lineStyle']>;
    'lineTypeChanged': JetElementCustomEventStrict<CLineChartSeriesElement['lineType']>;
    'lineWidthChanged': JetElementCustomEventStrict<CLineChartSeriesElement['lineWidth']>;
    'markerColorChanged': JetElementCustomEventStrict<CLineChartSeriesElement['markerColor']>;
    'markerDisplayedChanged': JetElementCustomEventStrict<CLineChartSeriesElement['markerDisplayed']>;
    'markerShapeChanged': JetElementCustomEventStrict<CLineChartSeriesElement['markerShape']>;
    'markerSizeChanged': JetElementCustomEventStrict<CLineChartSeriesElement['markerSize']>;
    'nameChanged': JetElementCustomEventStrict<CLineChartSeriesElement['name']>;
    'shortDescChanged': JetElementCustomEventStrict<CLineChartSeriesElement['shortDesc']>;
}
export interface CLineChartSeriesElementSettableProperties extends JetSettableProperties {
    categories?: LineChartSeriesProps['categories'];
    color?: LineChartSeriesProps['color'];
    drilling?: LineChartSeriesProps['drilling'];
    lineStyle?: LineChartSeriesProps['lineStyle'];
    lineType?: LineChartSeriesProps['lineType'];
    lineWidth?: LineChartSeriesProps['lineWidth'];
    markerColor?: LineChartSeriesProps['markerColor'];
    markerDisplayed?: LineChartSeriesProps['markerDisplayed'];
    markerShape?: LineChartSeriesProps['markerShape'];
    markerSize?: LineChartSeriesProps['markerSize'];
    name?: LineChartSeriesProps['name'];
    shortDesc?: LineChartSeriesProps['shortDesc'];
}
export interface CLineChartSeriesElementSettablePropertiesLenient extends Partial<CLineChartSeriesElementSettableProperties> {
    [key: string]: any;
}
export interface LineChartSeriesIntrinsicProps extends Partial<Readonly<CLineChartSeriesElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    oncategoriesChanged?: (value: CLineChartSeriesElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CLineChartSeriesElementEventMap['colorChanged']) => void;
    ondrillingChanged?: (value: CLineChartSeriesElementEventMap['drillingChanged']) => void;
    onlineStyleChanged?: (value: CLineChartSeriesElementEventMap['lineStyleChanged']) => void;
    onlineTypeChanged?: (value: CLineChartSeriesElementEventMap['lineTypeChanged']) => void;
    onlineWidthChanged?: (value: CLineChartSeriesElementEventMap['lineWidthChanged']) => void;
    onmarkerColorChanged?: (value: CLineChartSeriesElementEventMap['markerColorChanged']) => void;
    onmarkerDisplayedChanged?: (value: CLineChartSeriesElementEventMap['markerDisplayedChanged']) => void;
    onmarkerShapeChanged?: (value: CLineChartSeriesElementEventMap['markerShapeChanged']) => void;
    onmarkerSizeChanged?: (value: CLineChartSeriesElementEventMap['markerSizeChanged']) => void;
    onnameChanged?: (value: CLineChartSeriesElementEventMap['nameChanged']) => void;
    onshortDescChanged?: (value: CLineChartSeriesElementEventMap['shortDescChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-line-chart-series': LineChartSeriesIntrinsicProps;
        }
    }
}
