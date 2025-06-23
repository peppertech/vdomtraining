import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export declare const AreaChartSeriesDefaults: Partial<AreaChartSeriesProps>;
export type AreaChartSeriesProps = {
    categories?: string[];
    color?: string;
    drilling?: 'on' | 'off' | 'inherit';
    lineType?: 'curved' | 'straight';
    markerShape?: 'circle' | 'diamond' | 'human' | 'plus' | 'square' | 'star' | 'triangleDown' | 'triangleUp' | 'auto';
    markerColor?: string;
    markerDisplayed?: string;
    markerSize?: number;
    name?: string;
    shortDesc?: string;
};
export declare const AreaChartSeries: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<AreaChartSeriesProps>>;
export interface CAreaChartSeriesElement extends JetElement<CAreaChartSeriesElementSettableProperties>, CAreaChartSeriesElementSettableProperties {
    addEventListener<T extends keyof CAreaChartSeriesElementEventMap>(type: T, listener: (this: HTMLElement, ev: CAreaChartSeriesElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CAreaChartSeriesElementSettableProperties>(property: T): CAreaChartSeriesElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CAreaChartSeriesElementSettableProperties>(property: T, value: CAreaChartSeriesElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CAreaChartSeriesElementSettableProperties>): void;
    setProperties(properties: CAreaChartSeriesElementSettablePropertiesLenient): void;
}
export namespace CAreaChartSeriesElement {
    type categoriesChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['color']>;
    type drillingChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['drilling']>;
    type lineTypeChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['lineType']>;
    type markerColorChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['markerColor']>;
    type markerDisplayedChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['markerDisplayed']>;
    type markerShapeChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['markerShape']>;
    type markerSizeChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['markerSize']>;
    type nameChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['name']>;
    type shortDescChanged = JetElementCustomEventStrict<CAreaChartSeriesElement['shortDesc']>;
}
export interface CAreaChartSeriesElementEventMap extends HTMLElementEventMap {
    'categoriesChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['color']>;
    'drillingChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['drilling']>;
    'lineTypeChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['lineType']>;
    'markerColorChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['markerColor']>;
    'markerDisplayedChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['markerDisplayed']>;
    'markerShapeChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['markerShape']>;
    'markerSizeChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['markerSize']>;
    'nameChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['name']>;
    'shortDescChanged': JetElementCustomEventStrict<CAreaChartSeriesElement['shortDesc']>;
}
export interface CAreaChartSeriesElementSettableProperties extends JetSettableProperties {
    categories?: AreaChartSeriesProps['categories'];
    color?: AreaChartSeriesProps['color'];
    drilling?: AreaChartSeriesProps['drilling'];
    lineType?: AreaChartSeriesProps['lineType'];
    markerColor?: AreaChartSeriesProps['markerColor'];
    markerDisplayed?: AreaChartSeriesProps['markerDisplayed'];
    markerShape?: AreaChartSeriesProps['markerShape'];
    markerSize?: AreaChartSeriesProps['markerSize'];
    name?: AreaChartSeriesProps['name'];
    shortDesc?: AreaChartSeriesProps['shortDesc'];
}
export interface CAreaChartSeriesElementSettablePropertiesLenient extends Partial<CAreaChartSeriesElementSettableProperties> {
    [key: string]: any;
}
export interface AreaChartSeriesIntrinsicProps extends Partial<Readonly<CAreaChartSeriesElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    oncategoriesChanged?: (value: CAreaChartSeriesElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CAreaChartSeriesElementEventMap['colorChanged']) => void;
    ondrillingChanged?: (value: CAreaChartSeriesElementEventMap['drillingChanged']) => void;
    onlineTypeChanged?: (value: CAreaChartSeriesElementEventMap['lineTypeChanged']) => void;
    onmarkerColorChanged?: (value: CAreaChartSeriesElementEventMap['markerColorChanged']) => void;
    onmarkerDisplayedChanged?: (value: CAreaChartSeriesElementEventMap['markerDisplayedChanged']) => void;
    onmarkerShapeChanged?: (value: CAreaChartSeriesElementEventMap['markerShapeChanged']) => void;
    onmarkerSizeChanged?: (value: CAreaChartSeriesElementEventMap['markerSizeChanged']) => void;
    onnameChanged?: (value: CAreaChartSeriesElementEventMap['nameChanged']) => void;
    onshortDescChanged?: (value: CAreaChartSeriesElementEventMap['shortDescChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-area-chart-series': AreaChartSeriesIntrinsicProps;
        }
    }
}
