import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export declare const AreaChartGroupDefaults: Partial<AreaChartGroupProps>;
export type AreaChartGroupProps = {
    drilling?: 'on' | 'off' | 'inherit';
    name?: string;
    shortDesc?: string;
};
export declare const AreaChartGroup: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<AreaChartGroupProps>>;
export interface CAreaChartGroupElement extends JetElement<CAreaChartGroupElementSettableProperties>, CAreaChartGroupElementSettableProperties {
    addEventListener<T extends keyof CAreaChartGroupElementEventMap>(type: T, listener: (this: HTMLElement, ev: CAreaChartGroupElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CAreaChartGroupElementSettableProperties>(property: T): CAreaChartGroupElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CAreaChartGroupElementSettableProperties>(property: T, value: CAreaChartGroupElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CAreaChartGroupElementSettableProperties>): void;
    setProperties(properties: CAreaChartGroupElementSettablePropertiesLenient): void;
}
export namespace CAreaChartGroupElement {
    type drillingChanged = JetElementCustomEventStrict<CAreaChartGroupElement['drilling']>;
    type nameChanged = JetElementCustomEventStrict<CAreaChartGroupElement['name']>;
    type shortDescChanged = JetElementCustomEventStrict<CAreaChartGroupElement['shortDesc']>;
}
export interface CAreaChartGroupElementEventMap extends HTMLElementEventMap {
    'drillingChanged': JetElementCustomEventStrict<CAreaChartGroupElement['drilling']>;
    'nameChanged': JetElementCustomEventStrict<CAreaChartGroupElement['name']>;
    'shortDescChanged': JetElementCustomEventStrict<CAreaChartGroupElement['shortDesc']>;
}
export interface CAreaChartGroupElementSettableProperties extends JetSettableProperties {
    drilling?: AreaChartGroupProps['drilling'];
    name?: AreaChartGroupProps['name'];
    shortDesc?: AreaChartGroupProps['shortDesc'];
}
export interface CAreaChartGroupElementSettablePropertiesLenient extends Partial<CAreaChartGroupElementSettableProperties> {
    [key: string]: any;
}
export interface AreaChartGroupIntrinsicProps extends Partial<Readonly<CAreaChartGroupElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    ondrillingChanged?: (value: CAreaChartGroupElementEventMap['drillingChanged']) => void;
    onnameChanged?: (value: CAreaChartGroupElementEventMap['nameChanged']) => void;
    onshortDescChanged?: (value: CAreaChartGroupElementEventMap['shortDescChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-area-chart-group': AreaChartGroupIntrinsicProps;
        }
    }
}
