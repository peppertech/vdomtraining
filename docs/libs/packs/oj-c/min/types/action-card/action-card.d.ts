import { ComponentProps } from 'preact';
import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentChildren } from 'preact';
import { Action, Bubbles } from 'ojs/ojvcomponent';
import 'css!oj-c/action-card/action-card-styles.css';
type Props = {
    children?: ComponentChildren;
    onOjAction: Action & Bubbles;
};
export declare const ActionCard: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<Props>>;
export {};
export interface CActionCardElement extends JetElement<CActionCardElementSettableProperties>, CActionCardElementSettableProperties {
    addEventListener<T extends keyof CActionCardElementEventMap>(type: T, listener: (this: HTMLElement, ev: CActionCardElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CActionCardElementSettableProperties>(property: T): CActionCardElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CActionCardElementSettableProperties>(property: T, value: CActionCardElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CActionCardElementSettableProperties>): void;
    setProperties(properties: CActionCardElementSettablePropertiesLenient): void;
}
export namespace CActionCardElement {
    interface ojAction extends CustomEvent<{}> {
    }
}
export interface CActionCardElementEventMap extends HTMLElementEventMap {
    'ojAction': CActionCardElement.ojAction;
}
export interface CActionCardElementSettableProperties extends JetSettableProperties {
}
export interface CActionCardElementSettablePropertiesLenient extends Partial<CActionCardElementSettableProperties> {
    [key: string]: any;
}
export interface ActionCardIntrinsicProps extends Partial<Readonly<CActionCardElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojAction?: (value: CActionCardElementEventMap['ojAction']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-action-card': ActionCardIntrinsicProps;
        }
    }
}
