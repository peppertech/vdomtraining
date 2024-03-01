import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { CancelableAction, ExtendGlobalProps, PropertyChanged, ObservedGlobalProps } from 'ojs/ojvcomponent';
import { ComponentChildren, ComponentType } from 'preact';
import 'css!oj-c/drawer-popup/drawer-popup-styles.css';
type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label' | 'aria-labelledby'> & {
    children: ComponentChildren;
    opened: boolean;
    modality?: 'modal' | 'modeless';
    edge?: 'start' | 'end' | 'bottom';
    autoDismiss?: 'focus-loss' | 'none';
    closeGesture?: 'swipe' | 'none';
    onOjBeforeClose?: CancelableAction<object>;
    onOpenedChanged?: PropertyChanged<boolean>;
};
export declare const DrawerPopup: ComponentType<ExtendGlobalProps<Props>>;
export {};
export interface CDrawerPopupElement extends JetElement<CDrawerPopupElementSettableProperties>, CDrawerPopupElementSettableProperties {
    addEventListener<T extends keyof CDrawerPopupElementEventMap>(type: T, listener: (this: HTMLElement, ev: CDrawerPopupElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CDrawerPopupElementSettableProperties>(property: T): CDrawerPopupElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CDrawerPopupElementSettableProperties>(property: T, value: CDrawerPopupElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CDrawerPopupElementSettableProperties>): void;
    setProperties(properties: CDrawerPopupElementSettablePropertiesLenient): void;
}
export namespace CDrawerPopupElement {
    interface ojBeforeClose extends CustomEvent<{
        accept: (param: Promise<void>) => void;
    }> {
    }
    type autoDismissChanged = JetElementCustomEventStrict<CDrawerPopupElement['autoDismiss']>;
    type closeGestureChanged = JetElementCustomEventStrict<CDrawerPopupElement['closeGesture']>;
    type edgeChanged = JetElementCustomEventStrict<CDrawerPopupElement['edge']>;
    type modalityChanged = JetElementCustomEventStrict<CDrawerPopupElement['modality']>;
    type openedChanged = JetElementCustomEventStrict<CDrawerPopupElement['opened']>;
}
export interface CDrawerPopupElementEventMap extends HTMLElementEventMap {
    'ojBeforeClose': CDrawerPopupElement.ojBeforeClose;
    'autoDismissChanged': JetElementCustomEventStrict<CDrawerPopupElement['autoDismiss']>;
    'closeGestureChanged': JetElementCustomEventStrict<CDrawerPopupElement['closeGesture']>;
    'edgeChanged': JetElementCustomEventStrict<CDrawerPopupElement['edge']>;
    'modalityChanged': JetElementCustomEventStrict<CDrawerPopupElement['modality']>;
    'openedChanged': JetElementCustomEventStrict<CDrawerPopupElement['opened']>;
}
export interface CDrawerPopupElementSettableProperties extends JetSettableProperties {
    autoDismiss?: Props['autoDismiss'];
    closeGesture?: Props['closeGesture'];
    edge?: Props['edge'];
    modality?: Props['modality'];
    opened: Props['opened'];
}
export interface CDrawerPopupElementSettablePropertiesLenient extends Partial<CDrawerPopupElementSettableProperties> {
    [key: string]: any;
}
export interface DrawerPopupIntrinsicProps extends Partial<Readonly<CDrawerPopupElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeClose?: (value: CDrawerPopupElementEventMap['ojBeforeClose']) => void;
    onautoDismissChanged?: (value: CDrawerPopupElementEventMap['autoDismissChanged']) => void;
    oncloseGestureChanged?: (value: CDrawerPopupElementEventMap['closeGestureChanged']) => void;
    onedgeChanged?: (value: CDrawerPopupElementEventMap['edgeChanged']) => void;
    onmodalityChanged?: (value: CDrawerPopupElementEventMap['modalityChanged']) => void;
    onopenedChanged?: (value: CDrawerPopupElementEventMap['openedChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-drawer-popup': DrawerPopupIntrinsicProps;
        }
    }
}
