import { ComponentProps } from 'preact';
import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentChildren } from 'preact';
import 'css!oj-c/selection-card/selection-card-styles.css';
type Props = {
    children?: ComponentChildren;
    selected?: boolean;
};
export declare const SelectionCard: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<Props>>;
export {};
export interface CSelectionCardElement extends JetElement<CSelectionCardElementSettableProperties>, CSelectionCardElementSettableProperties {
    addEventListener<T extends keyof CSelectionCardElementEventMap>(type: T, listener: (this: HTMLElement, ev: CSelectionCardElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSelectionCardElementSettableProperties>(property: T): CSelectionCardElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSelectionCardElementSettableProperties>(property: T, value: CSelectionCardElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSelectionCardElementSettableProperties>): void;
    setProperties(properties: CSelectionCardElementSettablePropertiesLenient): void;
}
export namespace CSelectionCardElement {
    type selectedChanged = JetElementCustomEventStrict<CSelectionCardElement['selected']>;
}
export interface CSelectionCardElementEventMap extends HTMLElementEventMap {
    'selectedChanged': JetElementCustomEventStrict<CSelectionCardElement['selected']>;
}
export interface CSelectionCardElementSettableProperties extends JetSettableProperties {
    selected?: ComponentProps<typeof SelectionCard>['selected'];
}
export interface CSelectionCardElementSettablePropertiesLenient extends Partial<CSelectionCardElementSettableProperties> {
    [key: string]: any;
}
export interface SelectionCardIntrinsicProps extends Partial<Readonly<CSelectionCardElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onselectedChanged?: (value: CSelectionCardElementEventMap['selectedChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-selection-card': SelectionCardIntrinsicProps;
        }
    }
}
