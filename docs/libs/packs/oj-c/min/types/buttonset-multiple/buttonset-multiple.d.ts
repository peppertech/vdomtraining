import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ButtonSetMultiple as PreactButtonSetMultiple } from '@oracle/oraclejet-preact/UNSAFE_ButtonSetMultiple';
import { type ToggleItem } from 'oj-c/utils/PRIVATE_toggleUtils/index';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
export type { ToggleItem } from 'oj-c/utils/PRIVATE_toggleUtils/toggleTypes';
import { ComponentProps, Ref, ComponentType } from 'preact';
import 'css!oj-c/buttonset-multiple/buttonset-multiple-styles.css';
export type PreactButtonSetMultipleProps = ComponentProps<typeof PreactButtonSetMultiple>;
type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label'> & {
    value?: string[];
    onValueChanged?: PropertyChanged<string[] | undefined>;
    items?: ToggleItem[];
    display?: 'all' | 'icons' | 'label';
    disabled?: boolean;
    size?: PreactButtonSetMultipleProps['size'];
    width?: Size;
    maxWidth?: Size;
    chroming?: PreactButtonSetMultipleProps['variant'];
    layoutWidth?: PreactButtonSetMultipleProps['layoutWidth'];
};
type ButtonsetMultipleHandle = {
    focus: () => void;
    blur: () => void;
};
declare function ButtonsetMultipleImpl({ chroming, disabled, value, onValueChanged, size, width, maxWidth, layoutWidth, items, display, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }: Props, ref: Ref<ButtonsetMultipleHandle>): import("preact").JSX.Element;
export declare const ButtonsetMultiple: ComponentType<ExtendGlobalProps<ComponentProps<typeof ButtonsetMultipleImpl>>>;
export interface CButtonsetMultipleElement extends JetElement<CButtonsetMultipleElementSettableProperties>, CButtonsetMultipleElementSettableProperties {
    addEventListener<T extends keyof CButtonsetMultipleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CButtonsetMultipleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CButtonsetMultipleElementSettableProperties>(property: T): CButtonsetMultipleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CButtonsetMultipleElementSettableProperties>(property: T, value: CButtonsetMultipleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CButtonsetMultipleElementSettableProperties>): void;
    setProperties(properties: CButtonsetMultipleElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
}
export namespace CButtonsetMultipleElement {
    type chromingChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['chroming']>;
    type disabledChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['disabled']>;
    type displayChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['display']>;
    type itemsChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['items']>;
    type layoutWidthChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['layoutWidth']>;
    type maxWidthChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['maxWidth']>;
    type sizeChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['size']>;
    type valueChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['value']>;
    type widthChanged = JetElementCustomEventStrict<CButtonsetMultipleElement['width']>;
}
export interface CButtonsetMultipleElementEventMap extends HTMLElementEventMap {
    'chromingChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['chroming']>;
    'disabledChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['disabled']>;
    'displayChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['display']>;
    'itemsChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['items']>;
    'layoutWidthChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['layoutWidth']>;
    'maxWidthChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['maxWidth']>;
    'sizeChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['size']>;
    'valueChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['value']>;
    'widthChanged': JetElementCustomEventStrict<CButtonsetMultipleElement['width']>;
}
export interface CButtonsetMultipleElementSettableProperties extends JetSettableProperties {
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
export interface CButtonsetMultipleElementSettablePropertiesLenient extends Partial<CButtonsetMultipleElementSettableProperties> {
    [key: string]: any;
}
export interface ButtonsetMultipleIntrinsicProps extends Partial<Readonly<CButtonsetMultipleElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onchromingChanged?: (value: CButtonsetMultipleElementEventMap['chromingChanged']) => void;
    ondisabledChanged?: (value: CButtonsetMultipleElementEventMap['disabledChanged']) => void;
    ondisplayChanged?: (value: CButtonsetMultipleElementEventMap['displayChanged']) => void;
    onitemsChanged?: (value: CButtonsetMultipleElementEventMap['itemsChanged']) => void;
    onlayoutWidthChanged?: (value: CButtonsetMultipleElementEventMap['layoutWidthChanged']) => void;
    onmaxWidthChanged?: (value: CButtonsetMultipleElementEventMap['maxWidthChanged']) => void;
    onsizeChanged?: (value: CButtonsetMultipleElementEventMap['sizeChanged']) => void;
    onvalueChanged?: (value: CButtonsetMultipleElementEventMap['valueChanged']) => void;
    onwidthChanged?: (value: CButtonsetMultipleElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-buttonset-multiple': ButtonsetMultipleIntrinsicProps;
        }
    }
}
