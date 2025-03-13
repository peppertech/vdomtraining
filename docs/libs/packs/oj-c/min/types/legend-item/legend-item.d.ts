import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { LineStyle, MarkerShapes } from '@oracle/oraclejet-preact/utils/UNSAFE_visTypes/common';
export declare const LegendItemDefaults: Partial<LegendItemProps>;
export type LegendItemProps = {
    text: string;
    categories?: string[];
    symbolType?: 'line' | 'lineWithMarker' | 'image' | 'marker';
    source?: string;
    color?: string;
    borderColor?: string;
    lineStyle?: LineStyle;
    lineWidth?: number;
    markerShape?: MarkerShapes;
    markerColor?: string;
    shortDesc?: string;
    drilling?: 'on' | 'off' | 'inherit';
};
export declare const LegendItem: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<LegendItemProps>>;
export interface CLegendItemElement extends JetElement<CLegendItemElementSettableProperties>, CLegendItemElementSettableProperties {
    addEventListener<T extends keyof CLegendItemElementEventMap>(type: T, listener: (this: HTMLElement, ev: CLegendItemElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLegendItemElementSettableProperties>(property: T): CLegendItemElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLegendItemElementSettableProperties>(property: T, value: CLegendItemElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLegendItemElementSettableProperties>): void;
    setProperties(properties: CLegendItemElementSettablePropertiesLenient): void;
}
export namespace CLegendItemElement {
    type borderColorChanged = JetElementCustomEventStrict<CLegendItemElement['borderColor']>;
    type categoriesChanged = JetElementCustomEventStrict<CLegendItemElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CLegendItemElement['color']>;
    type drillingChanged = JetElementCustomEventStrict<CLegendItemElement['drilling']>;
    type lineStyleChanged = JetElementCustomEventStrict<CLegendItemElement['lineStyle']>;
    type lineWidthChanged = JetElementCustomEventStrict<CLegendItemElement['lineWidth']>;
    type markerColorChanged = JetElementCustomEventStrict<CLegendItemElement['markerColor']>;
    type markerShapeChanged = JetElementCustomEventStrict<CLegendItemElement['markerShape']>;
    type shortDescChanged = JetElementCustomEventStrict<CLegendItemElement['shortDesc']>;
    type sourceChanged = JetElementCustomEventStrict<CLegendItemElement['source']>;
    type symbolTypeChanged = JetElementCustomEventStrict<CLegendItemElement['symbolType']>;
    type textChanged = JetElementCustomEventStrict<CLegendItemElement['text']>;
}
export interface CLegendItemElementEventMap extends HTMLElementEventMap {
    'borderColorChanged': JetElementCustomEventStrict<CLegendItemElement['borderColor']>;
    'categoriesChanged': JetElementCustomEventStrict<CLegendItemElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CLegendItemElement['color']>;
    'drillingChanged': JetElementCustomEventStrict<CLegendItemElement['drilling']>;
    'lineStyleChanged': JetElementCustomEventStrict<CLegendItemElement['lineStyle']>;
    'lineWidthChanged': JetElementCustomEventStrict<CLegendItemElement['lineWidth']>;
    'markerColorChanged': JetElementCustomEventStrict<CLegendItemElement['markerColor']>;
    'markerShapeChanged': JetElementCustomEventStrict<CLegendItemElement['markerShape']>;
    'shortDescChanged': JetElementCustomEventStrict<CLegendItemElement['shortDesc']>;
    'sourceChanged': JetElementCustomEventStrict<CLegendItemElement['source']>;
    'symbolTypeChanged': JetElementCustomEventStrict<CLegendItemElement['symbolType']>;
    'textChanged': JetElementCustomEventStrict<CLegendItemElement['text']>;
}
export interface CLegendItemElementSettableProperties extends JetSettableProperties {
    borderColor?: LegendItemProps['borderColor'];
    categories?: LegendItemProps['categories'];
    color?: LegendItemProps['color'];
    drilling?: LegendItemProps['drilling'];
    lineStyle?: LegendItemProps['lineStyle'];
    lineWidth?: LegendItemProps['lineWidth'];
    markerColor?: LegendItemProps['markerColor'];
    markerShape?: LegendItemProps['markerShape'];
    shortDesc?: LegendItemProps['shortDesc'];
    source?: LegendItemProps['source'];
    symbolType?: LegendItemProps['symbolType'];
    text: LegendItemProps['text'];
}
export interface CLegendItemElementSettablePropertiesLenient extends Partial<CLegendItemElementSettableProperties> {
    [key: string]: any;
}
export interface LegendItemIntrinsicProps extends Partial<Readonly<CLegendItemElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onborderColorChanged?: (value: CLegendItemElementEventMap['borderColorChanged']) => void;
    oncategoriesChanged?: (value: CLegendItemElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CLegendItemElementEventMap['colorChanged']) => void;
    ondrillingChanged?: (value: CLegendItemElementEventMap['drillingChanged']) => void;
    onlineStyleChanged?: (value: CLegendItemElementEventMap['lineStyleChanged']) => void;
    onlineWidthChanged?: (value: CLegendItemElementEventMap['lineWidthChanged']) => void;
    onmarkerColorChanged?: (value: CLegendItemElementEventMap['markerColorChanged']) => void;
    onmarkerShapeChanged?: (value: CLegendItemElementEventMap['markerShapeChanged']) => void;
    onshortDescChanged?: (value: CLegendItemElementEventMap['shortDescChanged']) => void;
    onsourceChanged?: (value: CLegendItemElementEventMap['sourceChanged']) => void;
    onsymbolTypeChanged?: (value: CLegendItemElementEventMap['symbolTypeChanged']) => void;
    ontextChanged?: (value: CLegendItemElementEventMap['textChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-legend-item': LegendItemIntrinsicProps;
        }
    }
}
