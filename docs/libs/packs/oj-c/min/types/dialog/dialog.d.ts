import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, PropertyChanged, Action, CancelableAction, ObservedGlobalProps, Slot } from 'ojs/ojvcomponent';
import { ComponentType } from 'preact';
import 'css!oj-c/dialog/dialog-styles.css';
import { CancelBehavior } from '@oracle/oraclejet-preact/UNSAFE_Dialog';
import { WindowOverlayPlacement } from '@oracle/oraclejet-preact/UNSAFE_WindowOverlay';
import { Coords, Offset } from '@oracle/oraclejet-preact/UNSAFE_Floating';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
type Modality = 'modal' | 'modeless';
export type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'role' | 'id'> & {
    header?: Slot;
    body?: Slot;
    footer?: Slot;
    cancelBehavior?: CancelBehavior;
    dialogTitle?: string;
    dragAffordance?: 'none' | 'header';
    headerDecoration?: 'off' | 'on';
    launcher?: string | Element;
    modality?: Modality;
    opened: boolean;
    resizeBehavior?: 'none' | 'resizable';
    anchor?: string | Element | Coords;
    placement?: WindowOverlayPlacement;
    offset?: Offset;
    onOjOpen?: Action;
    onOjBeforeClose?: CancelableAction<object>;
    onOjClose?: Action;
    onOjFocus?: Action;
    onOpenedChanged?: PropertyChanged<boolean>;
    onOjDragStart?: Action;
    onOjDragMove?: Action;
    onOjDragEnd?: Action;
    onOjResizeStart?: Action;
    onOjResize?: Action;
    onOjResizeEnd?: Action;
    width?: Size;
    minWidth?: Size;
    maxWidth?: Size;
    height?: Size;
    minHeight?: Size;
    maxHeight?: Size;
};
export declare const Dialog: ComponentType<ExtendGlobalProps<Props>>;
export {};
export interface CDialogElement extends JetElement<CDialogElementSettableProperties>, CDialogElementSettableProperties {
    addEventListener<T extends keyof CDialogElementEventMap>(type: T, listener: (this: HTMLElement, ev: CDialogElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CDialogElementSettableProperties>(property: T): CDialogElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CDialogElementSettableProperties>(property: T, value: CDialogElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CDialogElementSettableProperties>): void;
    setProperties(properties: CDialogElementSettablePropertiesLenient): void;
}
export namespace CDialogElement {
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
    interface ojDragStart extends CustomEvent<{}> {
    }
    interface ojDragMove extends CustomEvent<{}> {
    }
    interface ojDragEnd extends CustomEvent<{}> {
    }
    interface ojResizeStart extends CustomEvent<{}> {
    }
    interface ojResize extends CustomEvent<{}> {
    }
    interface ojResizeEnd extends CustomEvent<{}> {
    }
    type anchorChanged = JetElementCustomEventStrict<CDialogElement['anchor']>;
    type cancelBehaviorChanged = JetElementCustomEventStrict<CDialogElement['cancelBehavior']>;
    type dialogTitleChanged = JetElementCustomEventStrict<CDialogElement['dialogTitle']>;
    type dragAffordanceChanged = JetElementCustomEventStrict<CDialogElement['dragAffordance']>;
    type headerDecorationChanged = JetElementCustomEventStrict<CDialogElement['headerDecoration']>;
    type heightChanged = JetElementCustomEventStrict<CDialogElement['height']>;
    type launcherChanged = JetElementCustomEventStrict<CDialogElement['launcher']>;
    type maxHeightChanged = JetElementCustomEventStrict<CDialogElement['maxHeight']>;
    type maxWidthChanged = JetElementCustomEventStrict<CDialogElement['maxWidth']>;
    type minHeightChanged = JetElementCustomEventStrict<CDialogElement['minHeight']>;
    type minWidthChanged = JetElementCustomEventStrict<CDialogElement['minWidth']>;
    type modalityChanged = JetElementCustomEventStrict<CDialogElement['modality']>;
    type offsetChanged = JetElementCustomEventStrict<CDialogElement['offset']>;
    type openedChanged = JetElementCustomEventStrict<CDialogElement['opened']>;
    type placementChanged = JetElementCustomEventStrict<CDialogElement['placement']>;
    type resizeBehaviorChanged = JetElementCustomEventStrict<CDialogElement['resizeBehavior']>;
    type widthChanged = JetElementCustomEventStrict<CDialogElement['width']>;
}
export interface CDialogElementEventMap extends HTMLElementEventMap {
    'ojOpen': CDialogElement.ojOpen;
    'ojBeforeClose': CDialogElement.ojBeforeClose;
    'ojClose': CDialogElement.ojClose;
    'ojFocus': CDialogElement.ojFocus;
    'ojDragStart': CDialogElement.ojDragStart;
    'ojDragMove': CDialogElement.ojDragMove;
    'ojDragEnd': CDialogElement.ojDragEnd;
    'ojResizeStart': CDialogElement.ojResizeStart;
    'ojResize': CDialogElement.ojResize;
    'ojResizeEnd': CDialogElement.ojResizeEnd;
    'anchorChanged': JetElementCustomEventStrict<CDialogElement['anchor']>;
    'cancelBehaviorChanged': JetElementCustomEventStrict<CDialogElement['cancelBehavior']>;
    'dialogTitleChanged': JetElementCustomEventStrict<CDialogElement['dialogTitle']>;
    'dragAffordanceChanged': JetElementCustomEventStrict<CDialogElement['dragAffordance']>;
    'headerDecorationChanged': JetElementCustomEventStrict<CDialogElement['headerDecoration']>;
    'heightChanged': JetElementCustomEventStrict<CDialogElement['height']>;
    'launcherChanged': JetElementCustomEventStrict<CDialogElement['launcher']>;
    'maxHeightChanged': JetElementCustomEventStrict<CDialogElement['maxHeight']>;
    'maxWidthChanged': JetElementCustomEventStrict<CDialogElement['maxWidth']>;
    'minHeightChanged': JetElementCustomEventStrict<CDialogElement['minHeight']>;
    'minWidthChanged': JetElementCustomEventStrict<CDialogElement['minWidth']>;
    'modalityChanged': JetElementCustomEventStrict<CDialogElement['modality']>;
    'offsetChanged': JetElementCustomEventStrict<CDialogElement['offset']>;
    'openedChanged': JetElementCustomEventStrict<CDialogElement['opened']>;
    'placementChanged': JetElementCustomEventStrict<CDialogElement['placement']>;
    'resizeBehaviorChanged': JetElementCustomEventStrict<CDialogElement['resizeBehavior']>;
    'widthChanged': JetElementCustomEventStrict<CDialogElement['width']>;
}
export interface CDialogElementSettableProperties extends JetSettableProperties {
    anchor?: Props['anchor'];
    cancelBehavior?: Props['cancelBehavior'];
    dialogTitle?: Props['dialogTitle'];
    dragAffordance?: Props['dragAffordance'];
    headerDecoration?: Props['headerDecoration'];
    height?: Props['height'];
    launcher?: Props['launcher'];
    maxHeight?: Props['maxHeight'];
    maxWidth?: Props['maxWidth'];
    minHeight?: Props['minHeight'];
    minWidth?: Props['minWidth'];
    modality?: Props['modality'];
    offset?: Props['offset'];
    opened: Props['opened'];
    placement?: Props['placement'];
    resizeBehavior?: Props['resizeBehavior'];
    width?: Props['width'];
}
export interface CDialogElementSettablePropertiesLenient extends Partial<CDialogElementSettableProperties> {
    [key: string]: any;
}
export interface DialogIntrinsicProps extends Partial<Readonly<CDialogElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojBeforeClose?: (value: CDialogElementEventMap['ojBeforeClose']) => void;
    onojClose?: (value: CDialogElementEventMap['ojClose']) => void;
    onojDragEnd?: (value: CDialogElementEventMap['ojDragEnd']) => void;
    onojDragMove?: (value: CDialogElementEventMap['ojDragMove']) => void;
    onojDragStart?: (value: CDialogElementEventMap['ojDragStart']) => void;
    onojFocus?: (value: CDialogElementEventMap['ojFocus']) => void;
    onojOpen?: (value: CDialogElementEventMap['ojOpen']) => void;
    onojResize?: (value: CDialogElementEventMap['ojResize']) => void;
    onojResizeEnd?: (value: CDialogElementEventMap['ojResizeEnd']) => void;
    onojResizeStart?: (value: CDialogElementEventMap['ojResizeStart']) => void;
    onanchorChanged?: (value: CDialogElementEventMap['anchorChanged']) => void;
    oncancelBehaviorChanged?: (value: CDialogElementEventMap['cancelBehaviorChanged']) => void;
    ondialogTitleChanged?: (value: CDialogElementEventMap['dialogTitleChanged']) => void;
    ondragAffordanceChanged?: (value: CDialogElementEventMap['dragAffordanceChanged']) => void;
    onheaderDecorationChanged?: (value: CDialogElementEventMap['headerDecorationChanged']) => void;
    onheightChanged?: (value: CDialogElementEventMap['heightChanged']) => void;
    onlauncherChanged?: (value: CDialogElementEventMap['launcherChanged']) => void;
    onmaxHeightChanged?: (value: CDialogElementEventMap['maxHeightChanged']) => void;
    onmaxWidthChanged?: (value: CDialogElementEventMap['maxWidthChanged']) => void;
    onminHeightChanged?: (value: CDialogElementEventMap['minHeightChanged']) => void;
    onminWidthChanged?: (value: CDialogElementEventMap['minWidthChanged']) => void;
    onmodalityChanged?: (value: CDialogElementEventMap['modalityChanged']) => void;
    onoffsetChanged?: (value: CDialogElementEventMap['offsetChanged']) => void;
    onopenedChanged?: (value: CDialogElementEventMap['openedChanged']) => void;
    onplacementChanged?: (value: CDialogElementEventMap['placementChanged']) => void;
    onresizeBehaviorChanged?: (value: CDialogElementEventMap['resizeBehaviorChanged']) => void;
    onwidthChanged?: (value: CDialogElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-dialog': DialogIntrinsicProps;
        }
    }
}
