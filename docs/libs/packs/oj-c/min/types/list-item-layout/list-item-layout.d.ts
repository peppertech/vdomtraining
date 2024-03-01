import { ComponentProps } from 'preact';
import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentChildren } from 'preact';
import { ObservedGlobalProps, Slot } from 'ojs/ojvcomponent';
import 'css!oj-c/list-item-layout/list-item-layout-styles.css';
export declare const ListItemLayout: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-label"> & {
    children?: ComponentChildren;
    overline?: Slot;
    selector?: Slot;
    leading?: Slot;
    secondary?: Slot;
    tertiary?: Slot;
    metadata?: Slot;
    trailing?: Slot;
    action?: Slot;
    quaternary?: Slot;
    navigation?: Slot;
    inset?: "none" | "listInset" | undefined;
}>>;
export interface CListItemLayoutElement extends JetElement<CListItemLayoutElementSettableProperties>, CListItemLayoutElementSettableProperties {
    addEventListener<T extends keyof CListItemLayoutElementEventMap>(type: T, listener: (this: HTMLElement, ev: CListItemLayoutElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CListItemLayoutElementSettableProperties>(property: T): CListItemLayoutElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CListItemLayoutElementSettableProperties>(property: T, value: CListItemLayoutElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CListItemLayoutElementSettableProperties>): void;
    setProperties(properties: CListItemLayoutElementSettablePropertiesLenient): void;
}
export namespace CListItemLayoutElement {
    type insetChanged = JetElementCustomEventStrict<CListItemLayoutElement['inset']>;
}
export interface CListItemLayoutElementEventMap extends HTMLElementEventMap {
    'insetChanged': JetElementCustomEventStrict<CListItemLayoutElement['inset']>;
}
export interface CListItemLayoutElementSettableProperties extends JetSettableProperties {
    inset?: ComponentProps<typeof ListItemLayout>['inset'];
}
export interface CListItemLayoutElementSettablePropertiesLenient extends Partial<CListItemLayoutElementSettableProperties> {
    [key: string]: any;
}
export interface ListItemLayoutIntrinsicProps extends Partial<Readonly<CListItemLayoutElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    oninsetChanged?: (value: CListItemLayoutElementEventMap['insetChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-list-item-layout': ListItemLayoutIntrinsicProps;
        }
    }
}
