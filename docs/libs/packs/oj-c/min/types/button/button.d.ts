import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, Action, Bubbles, ObservedGlobalProps, Slot } from 'ojs/ojvcomponent';
import { Button as PreactButton } from '@oracle/oraclejet-preact/UNSAFE_Button';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { ComponentProps, Ref, ComponentType } from 'preact';
import 'css!oj-c/button/button-styles.css';
type PreactButtonProps = ComponentProps<typeof PreactButton>;
type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label'> & {
    label: string;
    tooltip?: string;
    startIcon?: Slot;
    endIcon?: Slot;
    disabled?: boolean;
    width?: Size;
    display?: 'all' | 'icons' | 'label';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    edge?: PreactButtonProps['edge'];
    chroming?: PreactButtonProps['variant'];
    onOjAction?: Action & Bubbles;
};
type ButtonHandle = {
    focus: () => void;
    blur: () => void;
    click: () => void;
};
declare function ButtonImpl({ chroming, disabled, size, display, endIcon, startIcon, edge, tooltip, width, label, onOjAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }: Props, ref: Ref<ButtonHandle>): import("preact").JSX.Element;
export declare const Button: ComponentType<ExtendGlobalProps<ComponentProps<typeof ButtonImpl>>>;
export {};
export interface CButtonElement extends JetElement<CButtonElementSettableProperties>, CButtonElementSettableProperties {
    addEventListener<T extends keyof CButtonElementEventMap>(type: T, listener: (this: HTMLElement, ev: CButtonElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CButtonElementSettableProperties>(property: T): CButtonElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CButtonElementSettableProperties>(property: T, value: CButtonElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CButtonElementSettableProperties>): void;
    setProperties(properties: CButtonElementSettablePropertiesLenient): void;
    blur: () => void;
    click: () => void;
    focus: () => void;
}
export namespace CButtonElement {
    interface ojAction extends CustomEvent<{}> {
    }
    type chromingChanged = JetElementCustomEventStrict<CButtonElement['chroming']>;
    type disabledChanged = JetElementCustomEventStrict<CButtonElement['disabled']>;
    type displayChanged = JetElementCustomEventStrict<CButtonElement['display']>;
    type edgeChanged = JetElementCustomEventStrict<CButtonElement['edge']>;
    type labelChanged = JetElementCustomEventStrict<CButtonElement['label']>;
    type sizeChanged = JetElementCustomEventStrict<CButtonElement['size']>;
    type tooltipChanged = JetElementCustomEventStrict<CButtonElement['tooltip']>;
    type widthChanged = JetElementCustomEventStrict<CButtonElement['width']>;
}
export interface CButtonElementEventMap extends HTMLElementEventMap {
    'ojAction': CButtonElement.ojAction;
    'chromingChanged': JetElementCustomEventStrict<CButtonElement['chroming']>;
    'disabledChanged': JetElementCustomEventStrict<CButtonElement['disabled']>;
    'displayChanged': JetElementCustomEventStrict<CButtonElement['display']>;
    'edgeChanged': JetElementCustomEventStrict<CButtonElement['edge']>;
    'labelChanged': JetElementCustomEventStrict<CButtonElement['label']>;
    'sizeChanged': JetElementCustomEventStrict<CButtonElement['size']>;
    'tooltipChanged': JetElementCustomEventStrict<CButtonElement['tooltip']>;
    'widthChanged': JetElementCustomEventStrict<CButtonElement['width']>;
}
export interface CButtonElementSettableProperties extends JetSettableProperties {
    chroming?: Props['chroming'];
    disabled?: Props['disabled'];
    display?: Props['display'];
    edge?: Props['edge'];
    label: Props['label'];
    size?: Props['size'];
    tooltip?: Props['tooltip'];
    width?: Props['width'];
}
export interface CButtonElementSettablePropertiesLenient extends Partial<CButtonElementSettableProperties> {
    [key: string]: any;
}
export interface ButtonIntrinsicProps extends Partial<Readonly<CButtonElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojAction?: (value: CButtonElementEventMap['ojAction']) => void;
    onchromingChanged?: (value: CButtonElementEventMap['chromingChanged']) => void;
    ondisabledChanged?: (value: CButtonElementEventMap['disabledChanged']) => void;
    ondisplayChanged?: (value: CButtonElementEventMap['displayChanged']) => void;
    onedgeChanged?: (value: CButtonElementEventMap['edgeChanged']) => void;
    onlabelChanged?: (value: CButtonElementEventMap['labelChanged']) => void;
    onsizeChanged?: (value: CButtonElementEventMap['sizeChanged']) => void;
    ontooltipChanged?: (value: CButtonElementEventMap['tooltipChanged']) => void;
    onwidthChanged?: (value: CButtonElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-button': ButtonIntrinsicProps;
        }
    }
}
