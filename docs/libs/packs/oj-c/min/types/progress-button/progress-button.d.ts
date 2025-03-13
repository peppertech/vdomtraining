import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, Action, Bubbles, Slot } from 'ojs/ojvcomponent';
import { ProgressButton as PreactProgressButton } from '@oracle/oraclejet-preact/UNSAFE_ProgressButton';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { ComponentProps, Ref, ComponentType } from 'preact';
import 'css!oj-c/progress-button/progress-button-styles.css';
type PreactProgressButtonProps = ComponentProps<typeof PreactProgressButton>;
type Props = {
    label: string;
    tooltip?: string;
    startIcon?: Slot;
    disabled?: boolean;
    isLoading?: boolean;
    width?: Size;
    display?: 'all' | 'icons' | 'label';
    size?: 'sm' | 'md' | 'lg';
    edge?: PreactProgressButtonProps['edge'];
    chroming?: PreactProgressButtonProps['variant'];
    onOjAction?: Action & Bubbles;
};
type ProgressButtonHandle = {
    focus: () => void;
    blur: () => void;
    click: () => void;
};
declare function ProgressButtonImpl({ chroming, disabled, size, display, startIcon, edge, tooltip, isLoading, width, label, onOjAction, ...otherProps }: Props, ref: Ref<ProgressButtonHandle>): import("preact").JSX.Element;
export declare const ProgressButton: ComponentType<ExtendGlobalProps<ComponentProps<typeof ProgressButtonImpl>>>;
export {};
export interface CProgressButtonElement extends JetElement<CProgressButtonElementSettableProperties>, CProgressButtonElementSettableProperties {
    addEventListener<T extends keyof CProgressButtonElementEventMap>(type: T, listener: (this: HTMLElement, ev: CProgressButtonElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CProgressButtonElementSettableProperties>(property: T): CProgressButtonElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CProgressButtonElementSettableProperties>(property: T, value: CProgressButtonElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CProgressButtonElementSettableProperties>): void;
    setProperties(properties: CProgressButtonElementSettablePropertiesLenient): void;
    blur: () => void;
    click: () => void;
    focus: () => void;
}
export namespace CProgressButtonElement {
    interface ojAction extends CustomEvent<{}> {
    }
    type chromingChanged = JetElementCustomEventStrict<CProgressButtonElement['chroming']>;
    type disabledChanged = JetElementCustomEventStrict<CProgressButtonElement['disabled']>;
    type displayChanged = JetElementCustomEventStrict<CProgressButtonElement['display']>;
    type edgeChanged = JetElementCustomEventStrict<CProgressButtonElement['edge']>;
    type isLoadingChanged = JetElementCustomEventStrict<CProgressButtonElement['isLoading']>;
    type labelChanged = JetElementCustomEventStrict<CProgressButtonElement['label']>;
    type sizeChanged = JetElementCustomEventStrict<CProgressButtonElement['size']>;
    type tooltipChanged = JetElementCustomEventStrict<CProgressButtonElement['tooltip']>;
    type widthChanged = JetElementCustomEventStrict<CProgressButtonElement['width']>;
}
export interface CProgressButtonElementEventMap extends HTMLElementEventMap {
    'ojAction': CProgressButtonElement.ojAction;
    'chromingChanged': JetElementCustomEventStrict<CProgressButtonElement['chroming']>;
    'disabledChanged': JetElementCustomEventStrict<CProgressButtonElement['disabled']>;
    'displayChanged': JetElementCustomEventStrict<CProgressButtonElement['display']>;
    'edgeChanged': JetElementCustomEventStrict<CProgressButtonElement['edge']>;
    'isLoadingChanged': JetElementCustomEventStrict<CProgressButtonElement['isLoading']>;
    'labelChanged': JetElementCustomEventStrict<CProgressButtonElement['label']>;
    'sizeChanged': JetElementCustomEventStrict<CProgressButtonElement['size']>;
    'tooltipChanged': JetElementCustomEventStrict<CProgressButtonElement['tooltip']>;
    'widthChanged': JetElementCustomEventStrict<CProgressButtonElement['width']>;
}
export interface CProgressButtonElementSettableProperties extends JetSettableProperties {
    chroming?: Props['chroming'];
    disabled?: Props['disabled'];
    display?: Props['display'];
    edge?: Props['edge'];
    isLoading?: Props['isLoading'];
    label: Props['label'];
    size?: Props['size'];
    tooltip?: Props['tooltip'];
    width?: Props['width'];
}
export interface CProgressButtonElementSettablePropertiesLenient extends Partial<CProgressButtonElementSettableProperties> {
    [key: string]: any;
}
export interface ProgressButtonIntrinsicProps extends Partial<Readonly<CProgressButtonElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojAction?: (value: CProgressButtonElementEventMap['ojAction']) => void;
    onchromingChanged?: (value: CProgressButtonElementEventMap['chromingChanged']) => void;
    ondisabledChanged?: (value: CProgressButtonElementEventMap['disabledChanged']) => void;
    ondisplayChanged?: (value: CProgressButtonElementEventMap['displayChanged']) => void;
    onedgeChanged?: (value: CProgressButtonElementEventMap['edgeChanged']) => void;
    onisLoadingChanged?: (value: CProgressButtonElementEventMap['isLoadingChanged']) => void;
    onlabelChanged?: (value: CProgressButtonElementEventMap['labelChanged']) => void;
    onsizeChanged?: (value: CProgressButtonElementEventMap['sizeChanged']) => void;
    ontooltipChanged?: (value: CProgressButtonElementEventMap['tooltipChanged']) => void;
    onwidthChanged?: (value: CProgressButtonElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-progress-button': ProgressButtonIntrinsicProps;
        }
    }
}
