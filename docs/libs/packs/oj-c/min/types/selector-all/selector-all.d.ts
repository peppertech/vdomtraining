import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { SelectorAll as PreactSelectorAll } from '@oracle/oraclejet-preact/UNSAFE_SelectorAll';
import { ComponentProps, ComponentType } from 'preact';
import { ObservedGlobalProps, ExtendGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ImmutableKeySet } from 'ojs/ojkeyset';
type PreactSelectorAllProps = ComponentProps<typeof PreactSelectorAll>;
type Props<K extends string | number> = ObservedGlobalProps<'aria-label' | 'aria-labelledby'> & {
    selectedKeys: ImmutableKeySet<K>;
    onSelectedKeysChanged?: PropertyChanged<ImmutableKeySet<K>>;
    showTooltip?: PreactSelectorAllProps['showTooltip'];
};
declare const SelectorAllImpl: <K extends string | number>({ selectedKeys, onSelectedKeysChanged, showTooltip, ...otherProps }: Props<K>) => import("preact").JSX.Element;
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
    type showTooltipChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorAllElement<K>['showTooltip']>;
}
export interface CSelectorAllElementEventMap<K extends string | number> extends HTMLElementEventMap {
    'selectedKeysChanged': JetElementCustomEventStrict<CSelectorAllElement<K>['selectedKeys']>;
    'showTooltipChanged': JetElementCustomEventStrict<CSelectorAllElement<K>['showTooltip']>;
}
export interface CSelectorAllElementSettableProperties<K extends string | number> extends JetSettableProperties {
    selectedKeys: Props<K>['selectedKeys'];
    showTooltip?: Props<K>['showTooltip'];
}
export interface CSelectorAllElementSettablePropertiesLenient<K extends string | number> extends Partial<CSelectorAllElementSettableProperties<K>> {
    [key: string]: any;
}
export interface SelectorAllIntrinsicProps extends Partial<Readonly<CSelectorAllElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onselectedKeysChanged?: (value: CSelectorAllElementEventMap<any>['selectedKeysChanged']) => void;
    onshowTooltipChanged?: (value: CSelectorAllElementEventMap<any>['showTooltipChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-selector-all': SelectorAllIntrinsicProps;
        }
    }
}
