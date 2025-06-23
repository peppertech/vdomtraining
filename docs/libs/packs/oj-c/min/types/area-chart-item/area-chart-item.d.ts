import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export type AreaChartItemProps = {
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
export declare const AreaChartItem: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<AreaChartItemProps>>;
export interface CAreaChartItemElement extends JetElement<CAreaChartItemElementSettableProperties>, CAreaChartItemElementSettableProperties {
    addEventListener<T extends keyof CAreaChartItemElementEventMap>(type: T, listener: (this: HTMLElement, ev: CAreaChartItemElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CAreaChartItemElementSettableProperties>(property: T): CAreaChartItemElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CAreaChartItemElementSettableProperties>(property: T, value: CAreaChartItemElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CAreaChartItemElementSettableProperties>): void;
    setProperties(properties: CAreaChartItemElementSettablePropertiesLenient): void;
}
export namespace CAreaChartItemElement {
    type categoriesChanged = JetElementCustomEventStrict<CAreaChartItemElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CAreaChartItemElement['color']>;
    type drillingChanged = JetElementCustomEventStrict<CAreaChartItemElement['drilling']>;
    type groupIdChanged = JetElementCustomEventStrict<CAreaChartItemElement['groupId']>;
    type markerDisplayedChanged = JetElementCustomEventStrict<CAreaChartItemElement['markerDisplayed']>;
    type markerShapeChanged = JetElementCustomEventStrict<CAreaChartItemElement['markerShape']>;
    type markerSizeChanged = JetElementCustomEventStrict<CAreaChartItemElement['markerSize']>;
    type seriesIdChanged = JetElementCustomEventStrict<CAreaChartItemElement['seriesId']>;
    type shortDescChanged = JetElementCustomEventStrict<CAreaChartItemElement['shortDesc']>;
    type valueChanged = JetElementCustomEventStrict<CAreaChartItemElement['value']>;
    type xChanged = JetElementCustomEventStrict<CAreaChartItemElement['x']>;
}
export interface CAreaChartItemElementEventMap extends HTMLElementEventMap {
    'categoriesChanged': JetElementCustomEventStrict<CAreaChartItemElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CAreaChartItemElement['color']>;
    'drillingChanged': JetElementCustomEventStrict<CAreaChartItemElement['drilling']>;
    'groupIdChanged': JetElementCustomEventStrict<CAreaChartItemElement['groupId']>;
    'markerDisplayedChanged': JetElementCustomEventStrict<CAreaChartItemElement['markerDisplayed']>;
    'markerShapeChanged': JetElementCustomEventStrict<CAreaChartItemElement['markerShape']>;
    'markerSizeChanged': JetElementCustomEventStrict<CAreaChartItemElement['markerSize']>;
    'seriesIdChanged': JetElementCustomEventStrict<CAreaChartItemElement['seriesId']>;
    'shortDescChanged': JetElementCustomEventStrict<CAreaChartItemElement['shortDesc']>;
    'valueChanged': JetElementCustomEventStrict<CAreaChartItemElement['value']>;
    'xChanged': JetElementCustomEventStrict<CAreaChartItemElement['x']>;
}
export interface CAreaChartItemElementSettableProperties extends JetSettableProperties {
    categories?: AreaChartItemProps['categories'];
    color?: AreaChartItemProps['color'];
    drilling?: AreaChartItemProps['drilling'];
    groupId: AreaChartItemProps['groupId'];
    markerDisplayed?: AreaChartItemProps['markerDisplayed'];
    markerShape?: AreaChartItemProps['markerShape'];
    markerSize?: AreaChartItemProps['markerSize'];
    seriesId: AreaChartItemProps['seriesId'];
    shortDesc?: AreaChartItemProps['shortDesc'];
    value: AreaChartItemProps['value'];
    x?: AreaChartItemProps['x'];
}
export interface CAreaChartItemElementSettablePropertiesLenient extends Partial<CAreaChartItemElementSettableProperties> {
    [key: string]: any;
}
export interface AreaChartItemIntrinsicProps extends Partial<Readonly<CAreaChartItemElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    oncategoriesChanged?: (value: CAreaChartItemElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CAreaChartItemElementEventMap['colorChanged']) => void;
    ondrillingChanged?: (value: CAreaChartItemElementEventMap['drillingChanged']) => void;
    ongroupIdChanged?: (value: CAreaChartItemElementEventMap['groupIdChanged']) => void;
    onmarkerDisplayedChanged?: (value: CAreaChartItemElementEventMap['markerDisplayedChanged']) => void;
    onmarkerShapeChanged?: (value: CAreaChartItemElementEventMap['markerShapeChanged']) => void;
    onmarkerSizeChanged?: (value: CAreaChartItemElementEventMap['markerSizeChanged']) => void;
    onseriesIdChanged?: (value: CAreaChartItemElementEventMap['seriesIdChanged']) => void;
    onshortDescChanged?: (value: CAreaChartItemElementEventMap['shortDescChanged']) => void;
    onvalueChanged?: (value: CAreaChartItemElementEventMap['valueChanged']) => void;
    onxChanged?: (value: CAreaChartItemElementEventMap['xChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-area-chart-item': AreaChartItemIntrinsicProps;
        }
    }
}
