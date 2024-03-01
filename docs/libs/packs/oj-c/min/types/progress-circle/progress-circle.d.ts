import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ProgressCircle as PreactProgressCircle } from '@oracle/oraclejet-preact/UNSAFE_ProgressCircle';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps } from 'ojs/ojvcomponent';
import 'css!oj-c/progress-circle/progress-circle-styles.css';
type PreactProgressCircleProps = ComponentProps<typeof PreactProgressCircle>;
export declare const ProgressCircle: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-valuetext"> & {
    max?: number | undefined;
    value?: number | undefined;
    size?: PreactProgressCircleProps['size'];
}>>;
export {};
export interface CProgressCircleElement extends JetElement<CProgressCircleElementSettableProperties>, CProgressCircleElementSettableProperties {
    addEventListener<T extends keyof CProgressCircleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CProgressCircleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CProgressCircleElementSettableProperties>(property: T): CProgressCircleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CProgressCircleElementSettableProperties>(property: T, value: CProgressCircleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CProgressCircleElementSettableProperties>): void;
    setProperties(properties: CProgressCircleElementSettablePropertiesLenient): void;
}
export namespace CProgressCircleElement {
    type maxChanged = JetElementCustomEventStrict<CProgressCircleElement['max']>;
    type sizeChanged = JetElementCustomEventStrict<CProgressCircleElement['size']>;
    type valueChanged = JetElementCustomEventStrict<CProgressCircleElement['value']>;
}
export interface CProgressCircleElementEventMap extends HTMLElementEventMap {
    'maxChanged': JetElementCustomEventStrict<CProgressCircleElement['max']>;
    'sizeChanged': JetElementCustomEventStrict<CProgressCircleElement['size']>;
    'valueChanged': JetElementCustomEventStrict<CProgressCircleElement['value']>;
}
export interface CProgressCircleElementSettableProperties extends JetSettableProperties {
    max?: ComponentProps<typeof ProgressCircle>['max'];
    size?: ComponentProps<typeof ProgressCircle>['size'];
    value?: ComponentProps<typeof ProgressCircle>['value'];
}
export interface CProgressCircleElementSettablePropertiesLenient extends Partial<CProgressCircleElementSettableProperties> {
    [key: string]: any;
}
export interface ProgressCircleIntrinsicProps extends Partial<Readonly<CProgressCircleElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onmaxChanged?: (value: CProgressCircleElementEventMap['maxChanged']) => void;
    onsizeChanged?: (value: CProgressCircleElementEventMap['sizeChanged']) => void;
    onvalueChanged?: (value: CProgressCircleElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-progress-circle': ProgressCircleIntrinsicProps;
        }
    }
}
