import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export declare const LineChartGroupDefaults: Partial<LineChartGroupProps>;
export type LineChartGroupProps = {
    drilling?: 'on' | 'off' | 'inherit';
    name?: string;
    shortDesc?: string;
};
export declare const LineChartGroup: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<LineChartGroupProps>>;
export interface CLineChartGroupElement extends JetElement<CLineChartGroupElementSettableProperties>, CLineChartGroupElementSettableProperties {
    addEventListener<T extends keyof CLineChartGroupElementEventMap>(type: T, listener: (this: HTMLElement, ev: CLineChartGroupElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLineChartGroupElementSettableProperties>(property: T): CLineChartGroupElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLineChartGroupElementSettableProperties>(property: T, value: CLineChartGroupElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLineChartGroupElementSettableProperties>): void;
    setProperties(properties: CLineChartGroupElementSettablePropertiesLenient): void;
}
export namespace CLineChartGroupElement {
    type drillingChanged = JetElementCustomEventStrict<CLineChartGroupElement['drilling']>;
    type nameChanged = JetElementCustomEventStrict<CLineChartGroupElement['name']>;
    type shortDescChanged = JetElementCustomEventStrict<CLineChartGroupElement['shortDesc']>;
}
export interface CLineChartGroupElementEventMap extends HTMLElementEventMap {
    'drillingChanged': JetElementCustomEventStrict<CLineChartGroupElement['drilling']>;
    'nameChanged': JetElementCustomEventStrict<CLineChartGroupElement['name']>;
    'shortDescChanged': JetElementCustomEventStrict<CLineChartGroupElement['shortDesc']>;
}
export interface CLineChartGroupElementSettableProperties extends JetSettableProperties {
    drilling?: LineChartGroupProps['drilling'];
    name?: LineChartGroupProps['name'];
    shortDesc?: LineChartGroupProps['shortDesc'];
}
export interface CLineChartGroupElementSettablePropertiesLenient extends Partial<CLineChartGroupElementSettableProperties> {
    [key: string]: any;
}
export interface LineChartGroupIntrinsicProps extends Partial<Readonly<CLineChartGroupElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    ondrillingChanged?: (value: CLineChartGroupElementEventMap['drillingChanged']) => void;
    onnameChanged?: (value: CLineChartGroupElementEventMap['nameChanged']) => void;
    onshortDescChanged?: (value: CLineChartGroupElementEventMap['shortDescChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-line-chart-group': LineChartGroupIntrinsicProps;
        }
    }
}
