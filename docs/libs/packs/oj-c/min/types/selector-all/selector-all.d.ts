import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentProps, ComponentType } from 'preact';
import { ExtendGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ImmutableKeySet } from 'ojs/ojkeyset';
type Props<K extends string | number> = {
    selectedKeys: ImmutableKeySet<K>;
    onSelectedKeysChanged?: PropertyChanged<ImmutableKeySet<K>>;
};
declare const SelectorAllImpl: <K extends string | number>({ selectedKeys, onSelectedKeysChanged }: Props<K>) => import("preact").JSX.Element;
export declare const SelectorAll: ComponentType<ExtendGlobalProps<ComponentProps<typeof SelectorAllImpl>>>;
export {};
export interface CSelectorAllElement<K extends string | number> extends JetElement<CSelectorAllElementSettableProperties<K>>, CSelectorAllElementSettableProperties<K> {
    addEventListener<T extends keyof CSelectorAllElementEventMap<K>>(type: T, listener: (this: HTMLElement, ev: CSelectorAllElementEventMap<K>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSelectorAllElementSettableProperties<K>>(property: T): CSelectorAllElement<K>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSelectorAllElementSettableProperties<K>>(property: T, value: CSelectorAllElementSettableProperties<K>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSelectorAllElementSettableProperties<K>>): void;
    setProperties(properties: CSelectorAllElementSettablePropertiesLenient<K>): void;
}
export namespace CSelectorAllElement {
    type selectedKeysChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorAllElement<K>['selectedKeys']>;
}
export interface CSelectorAllElementEventMap<K extends string | number> extends HTMLElementEventMap {
    'selectedKeysChanged': JetElementCustomEventStrict<CSelectorAllElement<K>['selectedKeys']>;
}
export interface CSelectorAllElementSettableProperties<K extends string | number> extends JetSettableProperties {
    selectedKeys: Props<K>['selectedKeys'];
}
export interface CSelectorAllElementSettablePropertiesLenient<K extends string | number> extends Partial<CSelectorAllElementSettableProperties<K>> {
    [key: string]: any;
}
export interface SelectorAllIntrinsicProps extends Partial<Readonly<CSelectorAllElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onselectedKeysChanged?: (value: CSelectorAllElementEventMap<any>['selectedKeysChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-selector-all': SelectorAllIntrinsicProps;
        }
    }
}
