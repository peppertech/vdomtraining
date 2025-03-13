import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, PropertyChanged, Action, CancelableAction, ObservedGlobalProps } from 'ojs/ojvcomponent';
import { ComponentChildren, ComponentType } from 'preact';
import 'css!oj-c/popup/popup-styles.css';
import { InitialFocus, Tail, Modality, PopupPlacement } from '@oracle/oraclejet-preact/UNSAFE_Popup';
import { Coords, Offset } from '@oracle/oraclejet-preact/UNSAFE_Floating';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
type PositionCollision = 'none' | 'flip' | 'fit' | 'flipfit' | 'flipcenter';
export type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'id'> & {
    children?: ComponentChildren;
    opened: boolean;
    launcher?: string | Element;
    anchor?: string | Element | Coords;
    placement?: PopupPlacement;
    modality?: Modality;
    autoDismiss?: 'none' | 'focusLoss';
    tail?: Tail;
    initialFocus?: InitialFocus;
    offset?: Offset;
    collision?: PositionCollision;
    onOpenedChanged?: PropertyChanged<boolean>;
    onOjOpen?: Action;
    onOjBeforeClose?: CancelableAction<object>;
    onOjClose?: Action;
    onOjFocus?: Action;
    width?: Size;
    minWidth?: Size;
    maxWidth?: Size;
    height?: Size;
    minHeight?: Size;
    maxHeight?: Size;
};
export declare const Popup: ComponentType<ExtendGlobalProps<Props>>;
export {};
export interface CPopupElement extends JetElement<CPopupElementSettableProperties>, CPopupElementSettableProperties {
    addEventListener<T extends keyof CPopupElementEventMap>(type: T, listener: (this: HTMLElement, ev: CPopupElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CPopupElementSettableProperties>(property: T): CPopupElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CPopupElementSettableProperties>(property: T, value: CPopupElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CPopupElementSettableProperties>): void;
    setProperties(properties: CPopupElementSettablePropertiesLenient): void;
}
export namespace CPopupElement {
    interface ojOpen extends CustomEvent<{}> {
    }
    interface ojBeforeClose extends CustomEvent<{
        accept: (param: Promise<void>) => void;
    }> {
    }
    interface ojClose extends CustomEvent<{}> {
    }
    interface ojFocus extends CustomEvent<{}> {
    }
    type anchorChanged = JetElementCustomEventStrict<CPopupElement['anchor']>;
    type autoDismissChanged = JetElementCustomEventStrict<CPopupElement['autoDismiss']>;
    type collisionChanged = JetElementCustomEventStrict<CPopupElement['collision']>;
    type heightChanged = JetElementCustomEventStrict<CPopupElement['height']>;
    type initialFocusChanged = JetElementCustomEventStrict<CPopupElement['initialFocus']>;
    type launcherChanged = JetElementCustomEventStrict<CPopupElement['launcher']>;
    type maxHeightChanged = JetElementCustomEventStrict<CPopupElement['maxHeight']>;
    type maxWidthChanged = JetElementCustomEventStrict<CPopupElement['maxWidth']>;
    type minHeightChanged = JetElementCustomEventStrict<CPopupElement['minHeight']>;
    type minWidthChanged = JetElementCustomEventStrict<CPopupElement['minWidth']>;
    type modalityChanged = JetElementCustomEventStrict<CPopupElement['modality']>;
    type offsetChanged = JetElementCustomEventStrict<CPopupElement['offset']>;
    type openedChanged = JetElementCustomEventStrict<CPopupElement['opened']>;
    type placementChanged = JetElementCustomEventStrict<CPopupElement['placement']>;
    type tailChanged = JetElementCustomEventStrict<CPopupElement['tail']>;
    type widthChanged = JetElementCustomEventStrict<CPopupElement['width']>;
}
export interface CPopupElementEventMap extends HTMLElementEventMap {
    'ojOpen': CPopupElement.ojOpen;
    'ojBeforeClose': CPopupElement.ojBeforeClose;
    'ojClose': CPopupElement.ojClose;
    'ojFocus': CPopupElement.ojFocus;
    'anchorChanged': JetElementCustomEventStrict<CPopupElement['anchor']>;
    'autoDismissChanged': JetElementCustomEventStrict<CPopupElement['autoDismiss']>;
    'collisionChanged': JetElementCustomEventStrict<CPopupElement['collision']>;
    'heightChanged': JetElementCustomEventStrict<CPopupElement['height']>;
    'initialFocusChanged': JetElementCustomEventStrict<CPopupElement['initialFocus']>;
    'launcherChanged': JetElementCustomEventStrict<CPopupElement['launcher']>;
    'maxHeightChanged': JetElementCustomEventStrict<CPopupElement['maxHeight']>;
    'maxWidthChanged': JetElementCustomEventStrict<CPopupElement['maxWidth']>;
    'minHeightChanged': JetElementCustomEventStrict<CPopupElement['minHeight']>;
    'minWidthChanged': JetElementCustomEventStrict<CPopupElement['minWidth']>;
    'modalityChanged': JetElementCustomEventStrict<CPopupElement['modality']>;
    'offsetChanged': JetElementCustomEventStrict<CPopupElement['offset']>;
    'openedChanged': JetElementCustomEventStrict<CPopupElement['opened']>;
    'placementChanged': JetElementCustomEventStrict<CPopupElement['placement']>;
    'tailChanged': JetElementCustomEventStrict<CPopupElement['tail']>;
    'widthChanged': JetElementCustomEventStrict<CPopupElement['width']>;
}
export interface CPopupElementSettableProperties extends JetSettableProperties {
    anchor?: Props['anchor'];
    autoDismiss?: Props['autoDismiss'];
    collision?: Props['collision'];
    height?: Props['height'];
    initialFocus?: Props['initialFocus'];
    launcher?: Props['launcher'];
    maxHeight?: Props['maxHeight'];
    maxWidth?: Props['maxWidth'];
    minHeight?: Props['minHeight'];
    minWidth?: Props['minWidth'];
    modality?: Props['modality'];
    offset?: Props['offset'];
    opened: Props['opened'];
    placement?: Props['placement'];
    tail?: Props['tail'];
    width?: Props['width'];
}
export interface CPopupElementSettablePropertiesLenient extends Partial<CPopupElementSettableProperties> {
    [key: string]: any;
}
export interface PopupIntrinsicProps extends Partial<Readonly<CPopupElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeClose?: (value: CPopupElementEventMap['ojBeforeClose']) => void;
    onojClose?: (value: CPopupElementEventMap['ojClose']) => void;
    onojFocus?: (value: CPopupElementEventMap['ojFocus']) => void;
    onojOpen?: (value: CPopupElementEventMap['ojOpen']) => void;
    onanchorChanged?: (value: CPopupElementEventMap['anchorChanged']) => void;
    onautoDismissChanged?: (value: CPopupElementEventMap['autoDismissChanged']) => void;
    oncollisionChanged?: (value: CPopupElementEventMap['collisionChanged']) => void;
    onheightChanged?: (value: CPopupElementEventMap['heightChanged']) => void;
    oninitialFocusChanged?: (value: CPopupElementEventMap['initialFocusChanged']) => void;
    onlauncherChanged?: (value: CPopupElementEventMap['launcherChanged']) => void;
    onmaxHeightChanged?: (value: CPopupElementEventMap['maxHeightChanged']) => void;
    onmaxWidthChanged?: (value: CPopupElementEventMap['maxWidthChanged']) => void;
    onminHeightChanged?: (value: CPopupElementEventMap['minHeightChanged']) => void;
    onminWidthChanged?: (value: CPopupElementEventMap['minWidthChanged']) => void;
    onmodalityChanged?: (value: CPopupElementEventMap['modalityChanged']) => void;
    onoffsetChanged?: (value: CPopupElementEventMap['offsetChanged']) => void;
    onopenedChanged?: (value: CPopupElementEventMap['openedChanged']) => void;
    onplacementChanged?: (value: CPopupElementEventMap['placementChanged']) => void;
    ontailChanged?: (value: CPopupElementEventMap['tailChanged']) => void;
    onwidthChanged?: (value: CPopupElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-popup': PopupIntrinsicProps;
        }
    }
}
