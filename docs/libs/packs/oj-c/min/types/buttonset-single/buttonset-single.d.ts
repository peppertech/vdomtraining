import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ButtonSetSingle as PreactButtonSetSingle } from '@oracle/oraclejet-preact/UNSAFE_ButtonSetSingle';
import { type ToggleItem } from 'oj-c/utils/PRIVATE_toggleUtils/index';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
export type { ToggleItem } from 'oj-c/utils/PRIVATE_toggleUtils';
import { ComponentProps, Ref, ComponentType } from 'preact';
import 'css!oj-c/buttonset-single/buttonset-single-styles.css';
export type PreactButtonSetSingleProps = ComponentProps<typeof PreactButtonSetSingle>;
type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label'> & {
    value?: string;
    onValueChanged?: PropertyChanged<string | undefined>;
    items?: ToggleItem[];
    display?: 'all' | 'icons' | 'label';
    disabled?: boolean;
    size?: PreactButtonSetSingleProps['size'];
    width?: Size;
    maxWidth?: Size;
    chroming?: PreactButtonSetSingleProps['variant'];
    layoutWidth?: PreactButtonSetSingleProps['layoutWidth'];
};
type ButtonsetSingleHandle = {
    focus: () => void;
    blur: () => void;
};
declare function ButtonsetSingleImpl({ chroming, disabled, value, onValueChanged, size, width, maxWidth, layoutWidth, items, display, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }: Props, ref: Ref<ButtonsetSingleHandle>): import("preact").JSX.Element;
export declare const ButtonsetSingle: ComponentType<ExtendGlobalProps<ComponentProps<typeof ButtonsetSingleImpl>>>;
export interface CButtonsetSingleElement extends JetElement<CButtonsetSingleElementSettableProperties>, CButtonsetSingleElementSettableProperties {
    addEventListener<T extends keyof CButtonsetSingleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CButtonsetSingleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CButtonsetSingleElementSettableProperties>(property: T): CButtonsetSingleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CButtonsetSingleElementSettableProperties>(property: T, value: CButtonsetSingleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CButtonsetSingleElementSettableProperties>): void;
    setProperties(properties: CButtonsetSingleElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
}
export namespace CButtonsetSingleElement {
    type chromingChanged = JetElementCustomEventStrict<CButtonsetSingleElement['chroming']>;
    type disabledChanged = JetElementCustomEventStrict<CButtonsetSingleElement['disabled']>;
    type displayChanged = JetElementCustomEventStrict<CButtonsetSingleElement['display']>;
    type itemsChanged = JetElementCustomEventStrict<CButtonsetSingleElement['items']>;
    type layoutWidthChanged = JetElementCustomEventStrict<CButtonsetSingleElement['layoutWidth']>;
    type maxWidthChanged = JetElementCustomEventStrict<CButtonsetSingleElement['maxWidth']>;
    type sizeChanged = JetElementCustomEventStrict<CButtonsetSingleElement['size']>;
    type valueChanged = JetElementCustomEventStrict<CButtonsetSingleElement['value']>;
    type widthChanged = JetElementCustomEventStrict<CButtonsetSingleElement['width']>;
}
export interface CButtonsetSingleElementEventMap extends HTMLElementEventMap {
    'chromingChanged': JetElementCustomEventStrict<CButtonsetSingleElement['chroming']>;
    'disabledChanged': JetElementCustomEventStrict<CButtonsetSingleElement['disabled']>;
    'displayChanged': JetElementCustomEventStrict<CButtonsetSingleElement['display']>;
    'itemsChanged': JetElementCustomEventStrict<CButtonsetSingleElement['items']>;
    'layoutWidthChanged': JetElementCustomEventStrict<CButtonsetSingleElement['layoutWidth']>;
    'maxWidthChanged': JetElementCustomEventStrict<CButtonsetSingleElement['maxWidth']>;
    'sizeChanged': JetElementCustomEventStrict<CButtonsetSingleElement['size']>;
    'valueChanged': JetElementCustomEventStrict<CButtonsetSingleElement['value']>;
    'widthChanged': JetElementCustomEventStrict<CButtonsetSingleElement['width']>;
}
export interface CButtonsetSingleElementSettableProperties extends JetSettableProperties {
    chroming?: Props['chroming'];
    disabled?: Props['disabled'];
    display?: Props['display'];
    items?: Props['items'];
    layoutWidth?: Props['layoutWidth'];
    maxWidth?: Props['maxWidth'];
    size?: Props['size'];
    value?: Props['value'];
    width?: Props['width'];
}
export interface CButtonsetSingleElementSettablePropertiesLenient extends Partial<CButtonsetSingleElementSettableProperties> {
    [key: string]: any;
}
export interface ButtonsetSingleIntrinsicProps extends Partial<Readonly<CButtonsetSingleElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onchromingChanged?: (value: CButtonsetSingleElementEventMap['chromingChanged']) => void;
    ondisabledChanged?: (value: CButtonsetSingleElementEventMap['disabledChanged']) => void;
    ondisplayChanged?: (value: CButtonsetSingleElementEventMap['displayChanged']) => void;
    onitemsChanged?: (value: CButtonsetSingleElementEventMap['itemsChanged']) => void;
    onlayoutWidthChanged?: (value: CButtonsetSingleElementEventMap['layoutWidthChanged']) => void;
    onmaxWidthChanged?: (value: CButtonsetSingleElementEventMap['maxWidthChanged']) => void;
    onsizeChanged?: (value: CButtonsetSingleElementEventMap['sizeChanged']) => void;
    onvalueChanged?: (value: CButtonsetSingleElementEventMap['valueChanged']) => void;
    onwidthChanged?: (value: CButtonsetSingleElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-buttonset-single': ButtonsetSingleIntrinsicProps;
        }
    }
}
