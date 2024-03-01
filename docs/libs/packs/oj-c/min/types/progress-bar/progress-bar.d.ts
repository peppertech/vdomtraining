import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ProgressBar as PreactProgressBar } from '@oracle/oraclejet-preact/UNSAFE_ProgressBar';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps } from 'ojs/ojvcomponent';
import 'css!oj-c/progress-bar/progress-bar-styles.css';
type PreactProgressBarProps = ComponentProps<typeof PreactProgressBar>;
export declare const ProgressBar: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-valuetext"> & {
    max?: number | undefined;
    value?: number | undefined;
    edge?: PreactProgressBarProps['edge'];
}>>;
export {};
export interface CProgressBarElement extends JetElement<CProgressBarElementSettableProperties>, CProgressBarElementSettableProperties {
    addEventListener<T extends keyof CProgressBarElementEventMap>(type: T, listener: (this: HTMLElement, ev: CProgressBarElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CProgressBarElementSettableProperties>(property: T): CProgressBarElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CProgressBarElementSettableProperties>(property: T, value: CProgressBarElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CProgressBarElementSettableProperties>): void;
    setProperties(properties: CProgressBarElementSettablePropertiesLenient): void;
}
export namespace CProgressBarElement {
    type edgeChanged = JetElementCustomEventStrict<CProgressBarElement['edge']>;
    type maxChanged = JetElementCustomEventStrict<CProgressBarElement['max']>;
    type valueChanged = JetElementCustomEventStrict<CProgressBarElement['value']>;
}
export interface CProgressBarElementEventMap extends HTMLElementEventMap {
    'edgeChanged': JetElementCustomEventStrict<CProgressBarElement['edge']>;
    'maxChanged': JetElementCustomEventStrict<CProgressBarElement['max']>;
    'valueChanged': JetElementCustomEventStrict<CProgressBarElement['value']>;
}
export interface CProgressBarElementSettableProperties extends JetSettableProperties {
    edge?: ComponentProps<typeof ProgressBar>['edge'];
    max?: ComponentProps<typeof ProgressBar>['max'];
    value?: ComponentProps<typeof ProgressBar>['value'];
}
export interface CProgressBarElementSettablePropertiesLenient extends Partial<CProgressBarElementSettableProperties> {
    [key: string]: any;
}
export interface ProgressBarIntrinsicProps extends Partial<Readonly<CProgressBarElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onedgeChanged?: (value: CProgressBarElementEventMap['edgeChanged']) => void;
    onmaxChanged?: (value: CProgressBarElementEventMap['maxChanged']) => void;
    onvalueChanged?: (value: CProgressBarElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-progress-bar': ProgressBarIntrinsicProps;
        }
    }
}
