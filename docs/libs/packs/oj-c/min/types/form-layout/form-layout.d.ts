import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Component, ComponentProps, ComponentChildren } from 'preact';
import { FormLayout as PreactFormLayout } from '@oracle/oraclejet-preact/UNSAFE_FormLayout';
import { LayoutColumnSpan } from '@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout';
import { ExtendGlobalProps, ObservedGlobalProps } from 'ojs/ojvcomponent';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
type PreactFormLayoutProps = ComponentProps<typeof PreactFormLayout>;
type Props = ObservedGlobalProps<'id'> & {
    children: ComponentChildren;
    columns?: PreactFormLayoutProps['columns'] | 0;
    columnSpan?: LayoutColumnSpan;
    direction?: PreactFormLayoutProps['direction'];
    fullWidth?: PreactFormLayoutProps['isFullWidth'];
    labelEdge?: PreactFormLayoutProps['labelEdge'];
    labelStartWidth?: Size;
    labelWrapping?: PreactFormLayoutProps['labelWrapping'];
    maxColumns?: PreactFormLayoutProps['columns'];
    readonly?: boolean;
    userAssistanceDensity?: PreactFormLayoutProps['userAssistanceDensity'];
};
export declare class FormLayout extends Component<ExtendGlobalProps<Props>> {
    static defaultProps: Partial<Props>;
    private busyContextRef;
    private rootRef;
    componentDidMount(): void;
    render({ columnSpan, ...props }: ExtendGlobalProps<Props>): import("preact").JSX.Element;
}
export type FormLayoutProps = Props;
export {};
export interface CFormLayoutElement extends JetElement<CFormLayoutElementSettableProperties>, CFormLayoutElementSettableProperties {
    addEventListener<T extends keyof CFormLayoutElementEventMap>(type: T, listener: (this: HTMLElement, ev: CFormLayoutElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CFormLayoutElementSettableProperties>(property: T): CFormLayoutElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CFormLayoutElementSettableProperties>(property: T, value: CFormLayoutElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CFormLayoutElementSettableProperties>): void;
    setProperties(properties: CFormLayoutElementSettablePropertiesLenient): void;
}
export namespace CFormLayoutElement {
    type columnSpanChanged = JetElementCustomEventStrict<CFormLayoutElement['columnSpan']>;
    type columnsChanged = JetElementCustomEventStrict<CFormLayoutElement['columns']>;
    type directionChanged = JetElementCustomEventStrict<CFormLayoutElement['direction']>;
    type fullWidthChanged = JetElementCustomEventStrict<CFormLayoutElement['fullWidth']>;
    type labelEdgeChanged = JetElementCustomEventStrict<CFormLayoutElement['labelEdge']>;
    type labelStartWidthChanged = JetElementCustomEventStrict<CFormLayoutElement['labelStartWidth']>;
    type labelWrappingChanged = JetElementCustomEventStrict<CFormLayoutElement['labelWrapping']>;
    type maxColumnsChanged = JetElementCustomEventStrict<CFormLayoutElement['maxColumns']>;
    type readonlyChanged = JetElementCustomEventStrict<CFormLayoutElement['readonly']>;
    type userAssistanceDensityChanged = JetElementCustomEventStrict<CFormLayoutElement['userAssistanceDensity']>;
}
export interface CFormLayoutElementEventMap extends HTMLElementEventMap {
    'columnSpanChanged': JetElementCustomEventStrict<CFormLayoutElement['columnSpan']>;
    'columnsChanged': JetElementCustomEventStrict<CFormLayoutElement['columns']>;
    'directionChanged': JetElementCustomEventStrict<CFormLayoutElement['direction']>;
    'fullWidthChanged': JetElementCustomEventStrict<CFormLayoutElement['fullWidth']>;
    'labelEdgeChanged': JetElementCustomEventStrict<CFormLayoutElement['labelEdge']>;
    'labelStartWidthChanged': JetElementCustomEventStrict<CFormLayoutElement['labelStartWidth']>;
    'labelWrappingChanged': JetElementCustomEventStrict<CFormLayoutElement['labelWrapping']>;
    'maxColumnsChanged': JetElementCustomEventStrict<CFormLayoutElement['maxColumns']>;
    'readonlyChanged': JetElementCustomEventStrict<CFormLayoutElement['readonly']>;
    'userAssistanceDensityChanged': JetElementCustomEventStrict<CFormLayoutElement['userAssistanceDensity']>;
}
export interface CFormLayoutElementSettableProperties extends JetSettableProperties {
    columnSpan?: Props['columnSpan'];
    columns?: Props['columns'];
    direction?: Props['direction'];
    fullWidth?: Props['fullWidth'];
    labelEdge?: Props['labelEdge'];
    labelStartWidth?: Props['labelStartWidth'];
    labelWrapping?: Props['labelWrapping'];
    maxColumns?: Props['maxColumns'];
    readonly?: Props['readonly'];
    userAssistanceDensity?: Props['userAssistanceDensity'];
}
export interface CFormLayoutElementSettablePropertiesLenient extends Partial<CFormLayoutElementSettableProperties> {
    [key: string]: any;
}
export interface FormLayoutIntrinsicProps extends Partial<Readonly<CFormLayoutElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    oncolumnSpanChanged?: (value: CFormLayoutElementEventMap['columnSpanChanged']) => void;
    oncolumnsChanged?: (value: CFormLayoutElementEventMap['columnsChanged']) => void;
    ondirectionChanged?: (value: CFormLayoutElementEventMap['directionChanged']) => void;
    onfullWidthChanged?: (value: CFormLayoutElementEventMap['fullWidthChanged']) => void;
    onlabelEdgeChanged?: (value: CFormLayoutElementEventMap['labelEdgeChanged']) => void;
    onlabelStartWidthChanged?: (value: CFormLayoutElementEventMap['labelStartWidthChanged']) => void;
    onlabelWrappingChanged?: (value: CFormLayoutElementEventMap['labelWrappingChanged']) => void;
    onmaxColumnsChanged?: (value: CFormLayoutElementEventMap['maxColumnsChanged']) => void;
    onreadonlyChanged?: (value: CFormLayoutElementEventMap['readonlyChanged']) => void;
    onuserAssistanceDensityChanged?: (value: CFormLayoutElementEventMap['userAssistanceDensityChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-form-layout': FormLayoutIntrinsicProps;
        }
    }
}
