import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Selector as PreactSelector } from '@oracle/oraclejet-preact/UNSAFE_Selector';
import { ComponentProps, ComponentType } from 'preact';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ImmutableKeySet } from 'ojs/ojkeyset';
type PreactSelectorProps = ComponentProps<typeof PreactSelector>;
type Props<K extends string | number> = ObservedGlobalProps<'aria-label'> & {
    rowKey: K;
    selectedKeys: ImmutableKeySet<K>;
    onSelectedKeysChanged?: PropertyChanged<ImmutableKeySet<K>>;
    indeterminate?: PreactSelectorProps['isPartial'];
    selectionMode?: PreactSelectorProps['selectionMode'];
};
declare const SelectorImpl: <K extends string | number>({ rowKey, selectedKeys, indeterminate, selectionMode, onSelectedKeysChanged, ...otherProps }: Props<K>) => import("preact").JSX.Element;
export declare const Selector: ComponentType<ExtendGlobalProps<ComponentProps<typeof SelectorImpl>>>;
export {};
export interface CSelectorElement<K extends string | number> extends JetElement<CSelectorElementSettableProperties<K>>, CSelectorElementSettableProperties<K> {
    addEventListener<T extends keyof CSelectorElementEventMap<K>>(type: T, listener: (this: HTMLElement, ev: CSelectorElementEventMap<K>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSelectorElementSettableProperties<K>>(property: T): CSelectorElement<K>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSelectorElementSettableProperties<K>>(property: T, value: CSelectorElementSettableProperties<K>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSelectorElementSettableProperties<K>>): void;
    setProperties(properties: CSelectorElementSettablePropertiesLenient<K>): void;
}
export namespace CSelectorElement {
    type indeterminateChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorElement<K>['indeterminate']>;
    type rowKeyChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorElement<K>['rowKey']>;
    type selectedKeysChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorElement<K>['selectedKeys']>;
    type selectionModeChanged<K extends string | number> = JetElementCustomEventStrict<CSelectorElement<K>['selectionMode']>;
}
export interface CSelectorElementEventMap<K extends string | number> extends HTMLElementEventMap {
    'indeterminateChanged': JetElementCustomEventStrict<CSelectorElement<K>['indeterminate']>;
    'rowKeyChanged': JetElementCustomEventStrict<CSelectorElement<K>['rowKey']>;
    'selectedKeysChanged': JetElementCustomEventStrict<CSelectorElement<K>['selectedKeys']>;
    'selectionModeChanged': JetElementCustomEventStrict<CSelectorElement<K>['selectionMode']>;
}
export interface CSelectorElementSettableProperties<K extends string | number> extends JetSettableProperties {
    indeterminate?: Props<K>['indeterminate'];
    rowKey: Props<K>['rowKey'];
    selectedKeys: Props<K>['selectedKeys'];
    selectionMode?: Props<K>['selectionMode'];
}
export interface CSelectorElementSettablePropertiesLenient<K extends string | number> extends Partial<CSelectorElementSettableProperties<K>> {
    [key: string]: any;
}
export interface SelectorIntrinsicProps extends Partial<Readonly<CSelectorElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onindeterminateChanged?: (value: CSelectorElementEventMap<any>['indeterminateChanged']) => void;
    onrowKeyChanged?: (value: CSelectorElementEventMap<any>['rowKeyChanged']) => void;
    onselectedKeysChanged?: (value: CSelectorElementEventMap<any>['selectedKeysChanged']) => void;
    onselectionModeChanged?: (value: CSelectorElementEventMap<any>['selectionModeChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-selector': SelectorIntrinsicProps;
        }
    }
}
