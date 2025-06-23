import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { DataTabBarMixed } from './DataTabBarMixed';
import type { Action, CancelableAction, ExtendGlobalProps, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import type { ComponentProps, ComponentType } from 'preact';
type DataTabBarMixedProps = ComponentProps<typeof DataTabBarMixed>;
export type { TabData } from './DataTabBarMixed.types';
export type { TabIconData } from './DataTabBarMixedIcon';
export type KeyDetail<K extends string | number> = {
    key: K;
};
export type SelectionActionDetail<K extends string | number> = {
    previousValue: K;
    value: K;
};
export type Props<K extends string | number> = ObservedGlobalProps<'aria-label' | 'id' | 'aria-labelledby'> & {
    dynamicTabs?: DataTabBarMixedProps['dynamicTabs'];
    dynamicTabsOverflow?: DataTabBarMixedProps['dynamicTabsOverflow'];
    dynamicTabsOverflowIcon?: DataTabBarMixedProps['dynamicTabsOverflowIcon'];
    size?: 'md' | 'lg';
    selection?: K;
    separatorPadding?: string;
    onOjBeforeSelect?: CancelableAction<KeyDetail<K>>;
    onOjRemove?: Action<KeyDetail<K>>;
    onOjSelectionAction?: Action<SelectionActionDetail<K>>;
    onSelectionChanged?: PropertyChanged<K>;
    staticTabs?: DataTabBarMixedProps['staticTabs'];
    staticTabsDisplay?: DataTabBarMixedProps['staticTabsDisplay'];
};
export declare const TabBarMixed: ComponentType<ExtendGlobalProps<Props<string | number>>>;
export interface CTabBarMixedElement extends JetElement<CTabBarMixedElementSettableProperties<string | number>>, CTabBarMixedElementSettableProperties<string | number> {
    addEventListener<T extends keyof CTabBarMixedElementEventMap>(type: T, listener: (this: HTMLElement, ev: CTabBarMixedElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTabBarMixedElementSettableProperties<string | number>>(property: T): CTabBarMixedElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTabBarMixedElementSettableProperties<string | number>>(property: T, value: CTabBarMixedElementSettableProperties<string | number>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTabBarMixedElementSettableProperties<string | number>>): void;
    setProperties(properties: CTabBarMixedElementSettablePropertiesLenient<string | number>): void;
}
export namespace CTabBarMixedElement {
    interface ojBeforeSelect<K extends string | number> extends CustomEvent<KeyDetail<K> & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojRemove<K extends string | number> extends CustomEvent<KeyDetail<K> & {}> {
    }
    interface ojSelectionAction<K extends string | number> extends CustomEvent<SelectionActionDetail<K> & {}> {
    }
    type dynamicTabsChanged = JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabs']>;
    type dynamicTabsOverflowChanged = JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabsOverflow']>;
    type dynamicTabsOverflowIconChanged = JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabsOverflowIcon']>;
    type selectionChanged = JetElementCustomEventStrict<CTabBarMixedElement['selection']>;
    type separatorPaddingChanged = JetElementCustomEventStrict<CTabBarMixedElement['separatorPadding']>;
    type sizeChanged = JetElementCustomEventStrict<CTabBarMixedElement['size']>;
    type staticTabsChanged = JetElementCustomEventStrict<CTabBarMixedElement['staticTabs']>;
    type staticTabsDisplayChanged = JetElementCustomEventStrict<CTabBarMixedElement['staticTabsDisplay']>;
}
export interface CTabBarMixedElementEventMap extends HTMLElementEventMap {
    'ojBeforeSelect': CTabBarMixedElement.ojBeforeSelect<string | number>;
    'ojRemove': CTabBarMixedElement.ojRemove<string | number>;
    'ojSelectionAction': CTabBarMixedElement.ojSelectionAction<string | number>;
    'dynamicTabsChanged': JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabs']>;
    'dynamicTabsOverflowChanged': JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabsOverflow']>;
    'dynamicTabsOverflowIconChanged': JetElementCustomEventStrict<CTabBarMixedElement['dynamicTabsOverflowIcon']>;
    'selectionChanged': JetElementCustomEventStrict<CTabBarMixedElement['selection']>;
    'separatorPaddingChanged': JetElementCustomEventStrict<CTabBarMixedElement['separatorPadding']>;
    'sizeChanged': JetElementCustomEventStrict<CTabBarMixedElement['size']>;
    'staticTabsChanged': JetElementCustomEventStrict<CTabBarMixedElement['staticTabs']>;
    'staticTabsDisplayChanged': JetElementCustomEventStrict<CTabBarMixedElement['staticTabsDisplay']>;
}
export interface CTabBarMixedElementSettableProperties<K extends string | number> extends JetSettableProperties {
    dynamicTabs?: Props<K>['dynamicTabs'];
    dynamicTabsOverflow?: Props<K>['dynamicTabsOverflow'];
    dynamicTabsOverflowIcon?: Props<K>['dynamicTabsOverflowIcon'];
    selection?: Props<K>['selection'];
    separatorPadding?: Props<K>['separatorPadding'];
    size?: Props<K>['size'];
    staticTabs?: Props<K>['staticTabs'];
    staticTabsDisplay?: Props<K>['staticTabsDisplay'];
}
export interface CTabBarMixedElementSettablePropertiesLenient<K extends string | number> extends Partial<CTabBarMixedElementSettableProperties<K>> {
    [key: string]: any;
}
export interface TabBarMixedIntrinsicProps extends Partial<Readonly<CTabBarMixedElementSettableProperties<any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onojBeforeSelect?: (value: CTabBarMixedElementEventMap['ojBeforeSelect']) => void;
    onojRemove?: (value: CTabBarMixedElementEventMap['ojRemove']) => void;
    onojSelectionAction?: (value: CTabBarMixedElementEventMap['ojSelectionAction']) => void;
    ondynamicTabsChanged?: (value: CTabBarMixedElementEventMap['dynamicTabsChanged']) => void;
    ondynamicTabsOverflowChanged?: (value: CTabBarMixedElementEventMap['dynamicTabsOverflowChanged']) => void;
    ondynamicTabsOverflowIconChanged?: (value: CTabBarMixedElementEventMap['dynamicTabsOverflowIconChanged']) => void;
    onselectionChanged?: (value: CTabBarMixedElementEventMap['selectionChanged']) => void;
    onseparatorPaddingChanged?: (value: CTabBarMixedElementEventMap['separatorPaddingChanged']) => void;
    onsizeChanged?: (value: CTabBarMixedElementEventMap['sizeChanged']) => void;
    onstaticTabsChanged?: (value: CTabBarMixedElementEventMap['staticTabsChanged']) => void;
    onstaticTabsDisplayChanged?: (value: CTabBarMixedElementEventMap['staticTabsDisplayChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-tab-bar-mixed': TabBarMixedIntrinsicProps;
        }
    }
}
