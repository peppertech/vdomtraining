import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export type LineChartItemProps = {
    seriesId: string;
    groupId: Array<string>;
    value: number;
    x?: string;
    color?: string;
    markerDisplayed?: 'on' | 'off' | 'auto';
    markerShape?: 'circle' | 'diamond' | 'human' | 'plus' | 'square' | 'star' | 'triangleDown' | 'triangleUp' | 'auto';
    markerSize?: number;
    categories?: string[];
    drilling?: 'on' | 'off' | 'inherit';
    shortDesc?: string;
};
export declare const LineChartItem: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<LineChartItemProps>>;
export interface CLineChartItemElement extends JetElement<CLineChartItemElementSettableProperties>, CLineChartItemElementSettableProperties {
    addEventListener<T extends keyof CLineChartItemElementEventMap>(type: T, listener: (this: HTMLElement, ev: CLineChartItemElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLineChartItemElementSettableProperties>(property: T): CLineChartItemElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLineChartItemElementSettableProperties>(property: T, value: CLineChartItemElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLineChartItemElementSettableProperties>): void;
    setProperties(properties: CLineChartItemElementSettablePropertiesLenient): void;
}
export namespace CLineChartItemElement {
    type categoriesChanged = JetElementCustomEventStrict<CLineChartItemElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CLineChartItemElement['color']>;
    type drillingChanged = JetElementCustomEventStrict<CLineChartItemElement['drilling']>;
    type groupIdChanged = JetElementCustomEventStrict<CLineChartItemElement['groupId']>;
    type markerDisplayedChanged = JetElementCustomEventStrict<CLineChartItemElement['markerDisplayed']>;
    type markerShapeChanged = JetElementCustomEventStrict<CLineChartItemElement['markerShape']>;
    type markerSizeChanged = JetElementCustomEventStrict<CLineChartItemElement['markerSize']>;
    type seriesIdChanged = JetElementCustomEventStrict<CLineChartItemElement['seriesId']>;
    type shortDescChanged = JetElementCustomEventStrict<CLineChartItemElement['shortDesc']>;
    type valueChanged = JetElementCustomEventStrict<CLineChartItemElement['value']>;
    type xChanged = JetElementCustomEventStrict<CLineChartItemElement['x']>;
}
export interface CLineChartItemElementEventMap extends HTMLElementEventMap {
    'categoriesChanged': JetElementCustomEventStrict<CLineChartItemElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CLineChartItemElement['color']>;
    'drillingChanged': JetElementCustomEventStrict<CLineChartItemElement['drilling']>;
    'groupIdChanged': JetElementCustomEventStrict<CLineChartItemElement['groupId']>;
    'markerDisplayedChanged': JetElementCustomEventStrict<CLineChartItemElement['markerDisplayed']>;
    'markerShapeChanged': JetElementCustomEventStrict<CLineChartItemElement['markerShape']>;
    'markerSizeChanged': JetElementCustomEventStrict<CLineChartItemElement['markerSize']>;
    'seriesIdChanged': JetElementCustomEventStrict<CLineChartItemElement['seriesId']>;
    'shortDescChanged': JetElementCustomEventStrict<CLineChartItemElement['shortDesc']>;
    'valueChanged': JetElementCustomEventStrict<CLineChartItemElement['value']>;
    'xChanged': JetElementCustomEventStrict<CLineChartItemElement['x']>;
}
export interface CLineChartItemElementSettableProperties extends JetSettableProperties {
    categories?: LineChartItemProps['categories'];
    color?: LineChartItemProps['color'];
    drilling?: LineChartItemProps['drilling'];
    groupId: LineChartItemProps['groupId'];
    markerDisplayed?: LineChartItemProps['markerDisplayed'];
    markerShape?: LineChartItemProps['markerShape'];
    markerSize?: LineChartItemProps['markerSize'];
    seriesId: LineChartItemProps['seriesId'];
    shortDesc?: LineChartItemProps['shortDesc'];
    value: LineChartItemProps['value'];
    x?: LineChartItemProps['x'];
}
export interface CLineChartItemElementSettablePropertiesLenient extends Partial<CLineChartItemElementSettableProperties> {
    [key: string]: any;
}
export interface LineChartItemIntrinsicProps extends Partial<Readonly<CLineChartItemElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    oncategoriesChanged?: (value: CLineChartItemElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CLineChartItemElementEventMap['colorChanged']) => void;
    ondrillingChanged?: (value: CLineChartItemElementEventMap['drillingChanged']) => void;
    ongroupIdChanged?: (value: CLineChartItemElementEventMap['groupIdChanged']) => void;
    onmarkerDisplayedChanged?: (value: CLineChartItemElementEventMap['markerDisplayedChanged']) => void;
    onmarkerShapeChanged?: (value: CLineChartItemElementEventMap['markerShapeChanged']) => void;
    onmarkerSizeChanged?: (value: CLineChartItemElementEventMap['markerSizeChanged']) => void;
    onseriesIdChanged?: (value: CLineChartItemElementEventMap['seriesIdChanged']) => void;
    onshortDescChanged?: (value: CLineChartItemElementEventMap['shortDescChanged']) => void;
    onvalueChanged?: (value: CLineChartItemElementEventMap['valueChanged']) => void;
    onxChanged?: (value: CLineChartItemElementEventMap['xChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-line-chart-item': LineChartItemIntrinsicProps;
        }
    }
}
