import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { LabelledLink as PreactLabelledLink } from '@oracle/oraclejet-preact/UNSAFE_LabelledLink';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { Action, ExtendGlobalProps, ObservedGlobalProps } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType, Ref } from 'preact';
import 'css!oj-c/labelled-link/labelled-link-styles.css';
type PreactLabelledLinkProps = ComponentProps<typeof PreactLabelledLink>;
type LabelledLinkHandle = {
    blur: () => void;
    focus: () => void;
};
export type LabelledLinkProps = ObservedGlobalProps<'aria-describedby'> & {
    columnSpan?: LayoutColumnSpan;
    containerReadonly?: boolean;
    href?: PreactLabelledLinkProps['href'];
    labelEdge?: PreactLabelledLinkProps['labelEdge'];
    labelHint: PreactLabelledLinkProps['label'];
    labelStartWidth?: PreactLabelledLinkProps['labelStartWidth'];
    labelWrapping?: 'truncate' | 'wrap';
    target?: PreactLabelledLinkProps['target'];
    text?: PreactLabelledLinkProps['children'];
    textAlign?: PreactLabelledLinkProps['textAlign'];
    unsafe_labelledBy?: string;
    userAssistanceDensity?: PreactLabelledLinkProps['userAssistanceDensity'];
    onOjAction?: Action;
};
declare const LabelledLinkImpl: (props: LabelledLinkProps, ref: Ref<LabelledLinkHandle>) => import("preact").JSX.Element;
export declare const LabelledLink: ComponentType<ExtendGlobalProps<ComponentProps<typeof LabelledLinkImpl>>>;
export {};
export interface CLabelledLinkElement extends JetElement<CLabelledLinkElementSettableProperties>, CLabelledLinkElementSettableProperties {
    addEventListener<T extends keyof CLabelledLinkElementEventMap>(type: T, listener: (this: HTMLElement, ev: CLabelledLinkElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CLabelledLinkElementSettableProperties>(property: T): CLabelledLinkElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CLabelledLinkElementSettableProperties>(property: T, value: CLabelledLinkElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CLabelledLinkElementSettableProperties>): void;
    setProperties(properties: CLabelledLinkElementSettablePropertiesLenient): void;
    blur: () => void;
    focus: () => void;
}
export namespace CLabelledLinkElement {
    interface ojAction extends CustomEvent<{}> {
    }
    type columnSpanChanged = JetElementCustomEventStrict<CLabelledLinkElement['columnSpan']>;
    type containerReadonlyChanged = JetElementCustomEventStrict<CLabelledLinkElement['containerReadonly']>;
    type hrefChanged = JetElementCustomEventStrict<CLabelledLinkElement['href']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CLabelledLinkElement['labelEdge']>;
    type labelHintChanged = JetElementCustomEventStrict<CLabelledLinkElement['labelHint']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CLabelledLinkElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CLabelledLinkElement['labelWrapping']>;
    type targetChanged = JetElementCustomEventStrict<CLabelledLinkElement['target']>;
    type textChanged = JetElementCustomEventStrict<CLabelledLinkElement['text']>;
    type textAlignChanged = JetElementCustomEventStrict<CLabelledLinkElement['textAlign']>;
    type unsafe_labelledByChanged = JetElementCustomEventStrict<CLabelledLinkElement['unsafe_labelledBy']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CLabelledLinkElement['userAssistanceDensity']>;
}
export interface CLabelledLinkElementEventMap extends HTMLElementEventMap {
    'ojAction': CLabelledLinkElement.ojAction;
    'columnSpanChanged': JetElementCustomEventStrict<CLabelledLinkElement['columnSpan']>;
    'containerReadonlyChanged': JetElementCustomEventStrict<CLabelledLinkElement['containerReadonly']>;
    'hrefChanged': JetElementCustomEventStrict<CLabelledLinkElement['href']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CLabelledLinkElement['labelEdge']>;
    'labelHintChanged': JetElementCustomEventStrict<CLabelledLinkElement['labelHint']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CLabelledLinkElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CLabelledLinkElement['labelWrapping']>;
    'targetChanged': JetElementCustomEventStrict<CLabelledLinkElement['target']>;
    'textChanged': JetElementCustomEventStrict<CLabelledLinkElement['text']>;
    'textAlignChanged': JetElementCustomEventStrict<CLabelledLinkElement['textAlign']>;
    'unsafe_labelledByChanged': JetElementCustomEventStrict<CLabelledLinkElement['unsafe_labelledBy']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CLabelledLinkElement['userAssistanceDensity']>;
}
export interface CLabelledLinkElementSettableProperties extends JetSettableProperties {
    columnSpan?: LabelledLinkProps['columnSpan'];
    containerReadonly?: LabelledLinkProps['containerReadonly'];
    href?: LabelledLinkProps['href'];
    labelEdge?: LabelledLinkProps['labelEdge'];
    labelHint: LabelledLinkProps['labelHint'];
    labelStartWidth?: LabelledLinkProps['labelStartWidth'];
    labelWrapping?: LabelledLinkProps['labelWrapping'];
    target?: LabelledLinkProps['target'];
    text?: LabelledLinkProps['text'];
    textAlign?: LabelledLinkProps['textAlign'];
    unsafe_labelledBy?: LabelledLinkProps['unsafe_labelledBy'];
    userAssistanceDensity?: LabelledLinkProps['userAssistanceDensity'];
}
export interface CLabelledLinkElementSettablePropertiesLenient extends Partial<CLabelledLinkElementSettableProperties> {
    [key: string]: any;
}
export interface LabelledLinkIntrinsicProps extends Partial<Readonly<CLabelledLinkElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onojAction?: (value: CLabelledLinkElementEventMap['ojAction']) => void;
    oncolumnSpanChanged?: (value: CLabelledLinkElementEventMap['columnSpanChanged']) => void;
    oncontainerReadonlyChanged?: (value: CLabelledLinkElementEventMap['containerReadonlyChanged']) => void;
    onhrefChanged?: (value: CLabelledLinkElementEventMap['hrefChanged']) => void;
    onlabelEdgeChanged?: (value: CLabelledLinkElementEventMap['labelEdgeChanged']) => void;
    onlabelHintChanged?: (value: CLabelledLinkElementEventMap['labelHintChanged']) => void;
    onlabelStartWidthChanged?: (value: CLabelledLinkElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CLabelledLinkElementEventMap['labelWrappingChanged']) => void;
    ontargetChanged?: (value: CLabelledLinkElementEventMap['targetChanged']) => void;
    ontextChanged?: (value: CLabelledLinkElementEventMap['textChanged']) => void;
    ontextAlignChanged?: (value: CLabelledLinkElementEventMap['textAlignChanged']) => void;
    onunsafe_labelledByChanged?: (value: CLabelledLinkElementEventMap['unsafe_labelledByChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CLabelledLinkElementEventMap['userAssistanceDensityChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-labelled-link': LabelledLinkIntrinsicProps;
        }
    }
}
