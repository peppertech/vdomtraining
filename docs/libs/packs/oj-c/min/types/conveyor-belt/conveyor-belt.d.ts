import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import { ComponentChildren, ComponentType, Ref, ComponentProps } from 'preact';
import 'css!oj-c/conveyor-belt/conveyor-belt-styles.css';
import { ConveyorItemContext } from './conveyorBeltItem';
import { DataProvider } from 'ojs/ojdataprovider';
type ScrollableHandle = {
    scrollElementIntoView: (element: HTMLElement) => void;
};
export type ConveyorBeltDataItem = {
    label?: string;
};
export type ConveyorBeltArrayDataItem<K, D> = {
    data: D;
    key: K;
};
export type ConevyorBeltPreactWrapperProps<K extends string | number, D> = {
    children: ComponentChildren;
    scrollPosition?: number;
    onScrollPositionChanged?: PropertyChanged<number>;
    arrowVisibility?: 'auto' | 'visible' | 'hidden';
    items?: Array<ConveyorBeltArrayDataItem<K, D>> | DataProvider<K, D>;
    itemTemplate?: TemplateSlot<ConveyorItemContext<K, D>>;
    orientation?: 'horizontal' | 'vertical';
};
export type ConveyorProps<K extends string | number, D extends ConveyorBeltDataItem> = ConevyorBeltPreactWrapperProps<K, D>;
declare const ConveyorBeltComp: ({ children, orientation, ...rest }: ConevyorBeltPreactWrapperProps<string | number, ConveyorBeltDataItem>, ref?: Ref<ScrollableHandle>) => import("preact").JSX.Element;
export declare const ConveyorBelt: ComponentType<ExtendGlobalProps<ComponentProps<typeof ConveyorBeltComp>>>;
export {};
export interface CConveyorBeltElement extends JetElement<CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem>>, CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem> {
    addEventListener<T extends keyof CConveyorBeltElementEventMap>(type: T, listener: (this: HTMLElement, ev: CConveyorBeltElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem>>(property: T): CConveyorBeltElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem>>(property: T, value: CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CConveyorBeltElementSettableProperties<string | number, ConveyorBeltDataItem>>): void;
    setProperties(properties: CConveyorBeltElementSettablePropertiesLenient<string | number, ConveyorBeltDataItem>): void;
    scrollElementIntoView: (element: HTMLElement) => void;
}
export namespace CConveyorBeltElement {
    type arrowVisibilityChanged = JetElementCustomEventStrict<CConveyorBeltElement['arrowVisibility']>;
    type itemsChanged = JetElementCustomEventStrict<CConveyorBeltElement['items']>;
    type orientationChanged = JetElementCustomEventStrict<CConveyorBeltElement['orientation']>;
    type scrollPositionChanged = JetElementCustomEventStrict<CConveyorBeltElement['scrollPosition']>;
    type RenderItemTemplate<K extends string | number, D> = import('ojs/ojvcomponent').TemplateSlot<ConveyorItemContext<K, D>>;
}
export interface CConveyorBeltElementEventMap extends HTMLElementEventMap {
    'arrowVisibilityChanged': JetElementCustomEventStrict<CConveyorBeltElement['arrowVisibility']>;
    'itemsChanged': JetElementCustomEventStrict<CConveyorBeltElement['items']>;
    'orientationChanged': JetElementCustomEventStrict<CConveyorBeltElement['orientation']>;
    'scrollPositionChanged': JetElementCustomEventStrict<CConveyorBeltElement['scrollPosition']>;
}
export interface CConveyorBeltElementSettableProperties<K extends string | number, D> extends JetSettableProperties {
    arrowVisibility?: ConevyorBeltPreactWrapperProps<K, D>['arrowVisibility'];
    items?: ConevyorBeltPreactWrapperProps<K, D>['items'];
    orientation?: ConevyorBeltPreactWrapperProps<K, D>['orientation'];
    scrollPosition?: ConevyorBeltPreactWrapperProps<K, D>['scrollPosition'];
}
export interface CConveyorBeltElementSettablePropertiesLenient<K extends string | number, D> extends Partial<CConveyorBeltElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface ConveyorBeltIntrinsicProps extends Partial<Readonly<CConveyorBeltElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onarrowVisibilityChanged?: (value: CConveyorBeltElementEventMap['arrowVisibilityChanged']) => void;
    onitemsChanged?: (value: CConveyorBeltElementEventMap['itemsChanged']) => void;
    onorientationChanged?: (value: CConveyorBeltElementEventMap['orientationChanged']) => void;
    onscrollPositionChanged?: (value: CConveyorBeltElementEventMap['scrollPositionChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-conveyor-belt': ConveyorBeltIntrinsicProps;
        }
    }
}
