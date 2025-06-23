import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ComponentChildren, ComponentType } from 'preact';
import { Action, CancelableAction, ExtendGlobalProps, PropertyChanged, Slot, ObservedGlobalProps } from 'ojs/ojvcomponent';
import 'css!oj-c/collapsible/collapsible-styles.css';
export type CollapsibleToggleDetail = {
    target: EventTarget | null;
};
export type Props = ObservedGlobalProps<'id'> & {
    children: ComponentChildren;
    disabled?: boolean;
    expanded?: boolean;
    iconPosition?: 'start' | 'end';
    variant?: 'basic' | 'horizontal-rule';
    header?: Slot;
    onExpandedChanged?: PropertyChanged<boolean>;
    onOjBeforeCollapse?: CancelableAction<CollapsibleToggleDetail>;
    onOjBeforeExpand?: CancelableAction<CollapsibleToggleDetail>;
    onOjCollapse?: Action<CollapsibleToggleDetail>;
    onOjExpand?: Action<CollapsibleToggleDetail>;
};
export declare const Collapsible: ComponentType<ExtendGlobalProps<Props>>;
export interface CCollapsibleElement extends JetElement<CCollapsibleElementSettableProperties>, CCollapsibleElementSettableProperties {
    addEventListener<T extends keyof CCollapsibleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CCollapsibleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CCollapsibleElementSettableProperties>(property: T): CCollapsibleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CCollapsibleElementSettableProperties>(property: T, value: CCollapsibleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CCollapsibleElementSettableProperties>): void;
    setProperties(properties: CCollapsibleElementSettablePropertiesLenient): void;
}
export namespace CCollapsibleElement {
    interface ojBeforeCollapse extends CustomEvent<CollapsibleToggleDetail & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojBeforeExpand extends CustomEvent<CollapsibleToggleDetail & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojCollapse extends CustomEvent<CollapsibleToggleDetail & {}> {
    }
    interface ojExpand extends CustomEvent<CollapsibleToggleDetail & {}> {
    }
    type disabledChanged = JetElementCustomEventStrict<CCollapsibleElement['disabled']>;
    type expandedChanged = JetElementCustomEventStrict<CCollapsibleElement['expanded']>;
    type iconPositionChanged = JetElementCustomEventStrict<CCollapsibleElement['iconPosition']>;
    type variantChanged = JetElementCustomEventStrict<CCollapsibleElement['variant']>;
}
export interface CCollapsibleElementEventMap extends HTMLElementEventMap {
    'ojBeforeCollapse': CCollapsibleElement.ojBeforeCollapse;
    'ojBeforeExpand': CCollapsibleElement.ojBeforeExpand;
    'ojCollapse': CCollapsibleElement.ojCollapse;
    'ojExpand': CCollapsibleElement.ojExpand;
    'disabledChanged': JetElementCustomEventStrict<CCollapsibleElement['disabled']>;
    'expandedChanged': JetElementCustomEventStrict<CCollapsibleElement['expanded']>;
    'iconPositionChanged': JetElementCustomEventStrict<CCollapsibleElement['iconPosition']>;
    'variantChanged': JetElementCustomEventStrict<CCollapsibleElement['variant']>;
}
export interface CCollapsibleElementSettableProperties extends JetSettableProperties {
    disabled?: Props['disabled'];
    expanded?: Props['expanded'];
    iconPosition?: Props['iconPosition'];
    variant?: Props['variant'];
}
export interface CCollapsibleElementSettablePropertiesLenient extends Partial<CCollapsibleElementSettableProperties> {
    [key: string]: any;
}
export interface CollapsibleIntrinsicProps extends Partial<Readonly<CCollapsibleElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeCollapse?: (value: CCollapsibleElementEventMap['ojBeforeCollapse']) => void;
    onojBeforeExpand?: (value: CCollapsibleElementEventMap['ojBeforeExpand']) => void;
    onojCollapse?: (value: CCollapsibleElementEventMap['ojCollapse']) => void;
    onojExpand?: (value: CCollapsibleElementEventMap['ojExpand']) => void;
    ondisabledChanged?: (value: CCollapsibleElementEventMap['disabledChanged']) => void;
    onexpandedChanged?: (value: CCollapsibleElementEventMap['expandedChanged']) => void;
    oniconPositionChanged?: (value: CCollapsibleElementEventMap['iconPositionChanged']) => void;
    onvariantChanged?: (value: CCollapsibleElementEventMap['variantChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-collapsible': CollapsibleIntrinsicProps;
        }
    }
}
