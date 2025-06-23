import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Action, CancelableAction, ExtendGlobalProps, PropertyChanged, Slot } from 'ojs/ojvcomponent';
import { ComponentChildren, ComponentType } from 'preact';
import 'css!oj-c/drawer-layout/drawer-layout-styles.css';
type Placement = 'start' | 'end' | 'bottom';
type OnCloseDetail = {
    edge: Placement;
};
type Props = {
    children: ComponentChildren;
    start?: Slot;
    end?: Slot;
    bottom?: Slot;
    startOpened?: boolean;
    endOpened?: boolean;
    bottomOpened?: boolean;
    startDisplay?: 'auto' | 'reflow' | 'overlay';
    endDisplay?: 'auto' | 'reflow' | 'overlay';
    bottomDisplay?: 'auto' | 'reflow' | 'overlay';
    onOjBeforeClose?: CancelableAction<OnCloseDetail>;
    onOjClose?: Action<OnCloseDetail>;
    onStartOpenedChanged?: PropertyChanged<boolean>;
    onEndOpenedChanged?: PropertyChanged<boolean>;
    onBottomOpenedChanged?: PropertyChanged<boolean>;
};
export declare const DrawerLayout: ComponentType<ExtendGlobalProps<Props>>;
export {};
export interface CDrawerLayoutElement extends JetElement<CDrawerLayoutElementSettableProperties>, CDrawerLayoutElementSettableProperties {
    addEventListener<T extends keyof CDrawerLayoutElementEventMap>(type: T, listener: (this: HTMLElement, ev: CDrawerLayoutElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CDrawerLayoutElementSettableProperties>(property: T): CDrawerLayoutElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CDrawerLayoutElementSettableProperties>(property: T, value: CDrawerLayoutElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CDrawerLayoutElementSettableProperties>): void;
    setProperties(properties: CDrawerLayoutElementSettablePropertiesLenient): void;
}
export namespace CDrawerLayoutElement {
    interface ojBeforeClose extends CustomEvent<OnCloseDetail & {
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojClose extends CustomEvent<OnCloseDetail & {}> {
    }
    type bottomDisplayChanged = JetElementCustomEventStrict<CDrawerLayoutElement['bottomDisplay']>;
    type bottomOpenedChanged = JetElementCustomEventStrict<CDrawerLayoutElement['bottomOpened']>;
    type endDisplayChanged = JetElementCustomEventStrict<CDrawerLayoutElement['endDisplay']>;
    type endOpenedChanged = JetElementCustomEventStrict<CDrawerLayoutElement['endOpened']>;
    type startDisplayChanged = JetElementCustomEventStrict<CDrawerLayoutElement['startDisplay']>;
    type startOpenedChanged = JetElementCustomEventStrict<CDrawerLayoutElement['startOpened']>;
}
export interface CDrawerLayoutElementEventMap extends HTMLElementEventMap {
    'ojBeforeClose': CDrawerLayoutElement.ojBeforeClose;
    'ojClose': CDrawerLayoutElement.ojClose;
    'bottomDisplayChanged': JetElementCustomEventStrict<CDrawerLayoutElement['bottomDisplay']>;
    'bottomOpenedChanged': JetElementCustomEventStrict<CDrawerLayoutElement['bottomOpened']>;
    'endDisplayChanged': JetElementCustomEventStrict<CDrawerLayoutElement['endDisplay']>;
    'endOpenedChanged': JetElementCustomEventStrict<CDrawerLayoutElement['endOpened']>;
    'startDisplayChanged': JetElementCustomEventStrict<CDrawerLayoutElement['startDisplay']>;
    'startOpenedChanged': JetElementCustomEventStrict<CDrawerLayoutElement['startOpened']>;
}
export interface CDrawerLayoutElementSettableProperties extends JetSettableProperties {
    bottomDisplay?: Props['bottomDisplay'];
    bottomOpened?: Props['bottomOpened'];
    endDisplay?: Props['endDisplay'];
    endOpened?: Props['endOpened'];
    startDisplay?: Props['startDisplay'];
    startOpened?: Props['startOpened'];
}
export interface CDrawerLayoutElementSettablePropertiesLenient extends Partial<CDrawerLayoutElementSettableProperties> {
    [key: string]: any;
}
export interface DrawerLayoutIntrinsicProps extends Partial<Readonly<CDrawerLayoutElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeClose?: (value: CDrawerLayoutElementEventMap['ojBeforeClose']) => void;
    onojClose?: (value: CDrawerLayoutElementEventMap['ojClose']) => void;
    onbottomDisplayChanged?: (value: CDrawerLayoutElementEventMap['bottomDisplayChanged']) => void;
    onbottomOpenedChanged?: (value: CDrawerLayoutElementEventMap['bottomOpenedChanged']) => void;
    onendDisplayChanged?: (value: CDrawerLayoutElementEventMap['endDisplayChanged']) => void;
    onendOpenedChanged?: (value: CDrawerLayoutElementEventMap['endOpenedChanged']) => void;
    onstartDisplayChanged?: (value: CDrawerLayoutElementEventMap['startDisplayChanged']) => void;
    onstartOpenedChanged?: (value: CDrawerLayoutElementEventMap['startOpenedChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-drawer-layout': DrawerLayoutIntrinsicProps;
        }
    }
}
