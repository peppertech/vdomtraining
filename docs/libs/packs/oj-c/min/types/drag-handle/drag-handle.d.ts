import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
declare const DragHandleImpl: () => import("preact").JSX.Element;
export declare const DragHandle: ComponentType<ExtendGlobalProps<ComponentProps<typeof DragHandleImpl>>>;
export {};
export interface CDragHandleElement extends JetElement<CDragHandleElementSettableProperties>, CDragHandleElementSettableProperties {
    addEventListener<T extends keyof CDragHandleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CDragHandleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CDragHandleElementSettableProperties>(property: T): CDragHandleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CDragHandleElementSettableProperties>(property: T, value: CDragHandleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CDragHandleElementSettableProperties>): void;
    setProperties(properties: CDragHandleElementSettablePropertiesLenient): void;
}
export interface CDragHandleElementEventMap extends HTMLElementEventMap {
}
export interface CDragHandleElementSettableProperties extends JetSettableProperties {
}
export interface CDragHandleElementSettablePropertiesLenient extends Partial<CDragHandleElementSettableProperties> {
    [key: string]: any;
}
