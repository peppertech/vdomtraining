import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { MeterCircle as PreactMeterCircle, CenterContext } from '@oracle/oraclejet-preact/UNSAFE_MeterCircle';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps, ReadOnlyPropertyChanged, PropertyChanged, TemplateSlot } from 'ojs/ojvcomponent';
import 'css!oj-c/meter-circle/meter-circle-styles.css';
import { ReferenceLine as CommonReferenceLine, Threshold } from '../utils/UNSAFE_vizTypes';
type ReferenceLine = Omit<CommonReferenceLine, 'position'>;
type PreactMeterCircleProps = ComponentProps<typeof PreactMeterCircle>;
type CenterTemplateContext = CenterContext & {
    value: number | null;
};
type PlotArea = {
    color?: PreactMeterCircleProps['trackColor'];
    rendered?: 'on' | 'off';
};
export type DatatipContext = {
    value: number;
};
export type ThresholdDisplay = 'all' | 'plotArea' | 'indicator';
export declare const MeterCircle: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-describedby" | "aria-label" | "aria-labelledby"> & {
    max?: number;
    min?: number;
    readonly?: boolean;
    value?: number | null;
    onValueChanged?: PropertyChanged<number | null>;
    step?: number;
    color?: PreactMeterCircleProps["indicatorColor"];
    indicatorSize?: number;
    innerRadius?: number | undefined;
    plotArea: PlotArea;
    angleExtent?: PreactMeterCircleProps["angleExtent"];
    startAngle?: PreactMeterCircleProps["startAngle"];
    referenceLines?: Array<ReferenceLine>;
    thresholdDisplay?: ThresholdDisplay;
    thresholds?: Array<Threshold>;
    describedBy?: string | null;
    labelledBy?: string | null;
    size?: PreactMeterCircleProps["size"];
    datatip?: (context: DatatipContext) => string | null;
    onTransientValueChanged?: ReadOnlyPropertyChanged<number | undefined>;
    centerTemplate?: TemplateSlot<CenterTemplateContext>;
}>>;
export {};
export interface CMeterCircleElement extends JetElement<CMeterCircleElementSettableProperties>, CMeterCircleElementSettableProperties {
    readonly transientValue?: Parameters<Required<ComponentProps<typeof MeterCircle>>['onTransientValueChanged']>[0];
    addEventListener<T extends keyof CMeterCircleElementEventMap>(type: T, listener: (this: HTMLElement, ev: CMeterCircleElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CMeterCircleElementSettableProperties>(property: T): CMeterCircleElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CMeterCircleElementSettableProperties>(property: T, value: CMeterCircleElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CMeterCircleElementSettableProperties>): void;
    setProperties(properties: CMeterCircleElementSettablePropertiesLenient): void;
}
export namespace CMeterCircleElement {
    type angleExtentChanged = JetElementCustomEventStrict<CMeterCircleElement['angleExtent']>;
    type colorChanged = JetElementCustomEventStrict<CMeterCircleElement['color']>;
    type datatipChanged = JetElementCustomEventStrict<CMeterCircleElement['datatip']>;
    type describedByChanged = JetElementCustomEventStrict<CMeterCircleElement['describedBy']>;
    type indicatorSizeChanged = JetElementCustomEventStrict<CMeterCircleElement['indicatorSize']>;
    type innerRadiusChanged = JetElementCustomEventStrict<CMeterCircleElement['innerRadius']>;
    type labelledByChanged = JetElementCustomEventStrict<CMeterCircleElement['labelledBy']>;
    type maxChanged = JetElementCustomEventStrict<CMeterCircleElement['max']>;
    type minChanged = JetElementCustomEventStrict<CMeterCircleElement['min']>;
    type plotAreaChanged = JetElementCustomEventStrict<CMeterCircleElement['plotArea']>;
    type readonlyChanged = JetElementCustomEventStrict<CMeterCircleElement['readonly']>;
    type referenceLinesChanged = JetElementCustomEventStrict<CMeterCircleElement['referenceLines']>;
    type sizeChanged = JetElementCustomEventStrict<CMeterCircleElement['size']>;
    type startAngleChanged = JetElementCustomEventStrict<CMeterCircleElement['startAngle']>;
    type stepChanged = JetElementCustomEventStrict<CMeterCircleElement['step']>;
    type thresholdDisplayChanged = JetElementCustomEventStrict<CMeterCircleElement['thresholdDisplay']>;
    type thresholdsChanged = JetElementCustomEventStrict<CMeterCircleElement['thresholds']>;
    type transientValueChanged = JetElementCustomEventStrict<CMeterCircleElement['transientValue']>;
    type valueChanged = JetElementCustomEventStrict<CMeterCircleElement['value']>;
    type RenderCenterTemplate = import('ojs/ojvcomponent').TemplateSlot<CenterTemplateContext>;
}
export interface CMeterCircleElementEventMap extends HTMLElementEventMap {
    'angleExtentChanged': JetElementCustomEventStrict<CMeterCircleElement['angleExtent']>;
    'colorChanged': JetElementCustomEventStrict<CMeterCircleElement['color']>;
    'datatipChanged': JetElementCustomEventStrict<CMeterCircleElement['datatip']>;
    'describedByChanged': JetElementCustomEventStrict<CMeterCircleElement['describedBy']>;
    'indicatorSizeChanged': JetElementCustomEventStrict<CMeterCircleElement['indicatorSize']>;
    'innerRadiusChanged': JetElementCustomEventStrict<CMeterCircleElement['innerRadius']>;
    'labelledByChanged': JetElementCustomEventStrict<CMeterCircleElement['labelledBy']>;
    'maxChanged': JetElementCustomEventStrict<CMeterCircleElement['max']>;
    'minChanged': JetElementCustomEventStrict<CMeterCircleElement['min']>;
    'plotAreaChanged': JetElementCustomEventStrict<CMeterCircleElement['plotArea']>;
    'readonlyChanged': JetElementCustomEventStrict<CMeterCircleElement['readonly']>;
    'referenceLinesChanged': JetElementCustomEventStrict<CMeterCircleElement['referenceLines']>;
    'sizeChanged': JetElementCustomEventStrict<CMeterCircleElement['size']>;
    'startAngleChanged': JetElementCustomEventStrict<CMeterCircleElement['startAngle']>;
    'stepChanged': JetElementCustomEventStrict<CMeterCircleElement['step']>;
    'thresholdDisplayChanged': JetElementCustomEventStrict<CMeterCircleElement['thresholdDisplay']>;
    'thresholdsChanged': JetElementCustomEventStrict<CMeterCircleElement['thresholds']>;
    'transientValueChanged': JetElementCustomEventStrict<CMeterCircleElement['transientValue']>;
    'valueChanged': JetElementCustomEventStrict<CMeterCircleElement['value']>;
}
export interface CMeterCircleElementSettableProperties extends JetSettableProperties {
    angleExtent?: ComponentProps<typeof MeterCircle>['angleExtent'];
    color?: ComponentProps<typeof MeterCircle>['color'];
    datatip?: ComponentProps<typeof MeterCircle>['datatip'];
    describedBy?: ComponentProps<typeof MeterCircle>['describedBy'];
    indicatorSize?: ComponentProps<typeof MeterCircle>['indicatorSize'];
    innerRadius?: ComponentProps<typeof MeterCircle>['innerRadius'];
    labelledBy?: ComponentProps<typeof MeterCircle>['labelledBy'];
    max?: ComponentProps<typeof MeterCircle>['max'];
    min?: ComponentProps<typeof MeterCircle>['min'];
    plotArea: ComponentProps<typeof MeterCircle>['plotArea'];
    readonly?: ComponentProps<typeof MeterCircle>['readonly'];
    referenceLines?: ComponentProps<typeof MeterCircle>['referenceLines'];
    size?: ComponentProps<typeof MeterCircle>['size'];
    startAngle?: ComponentProps<typeof MeterCircle>['startAngle'];
    step?: ComponentProps<typeof MeterCircle>['step'];
    thresholdDisplay?: ComponentProps<typeof MeterCircle>['thresholdDisplay'];
    thresholds?: ComponentProps<typeof MeterCircle>['thresholds'];
    value?: ComponentProps<typeof MeterCircle>['value'];
}
export interface CMeterCircleElementSettablePropertiesLenient extends Partial<CMeterCircleElementSettableProperties> {
    [key: string]: any;
}
export interface MeterCircleIntrinsicProps extends Partial<Readonly<CMeterCircleElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    transientValue?: never;
    children?: import('preact').ComponentChildren;
    onangleExtentChanged?: (value: CMeterCircleElementEventMap['angleExtentChanged']) => void;
    oncolorChanged?: (value: CMeterCircleElementEventMap['colorChanged']) => void;
    ondatatipChanged?: (value: CMeterCircleElementEventMap['datatipChanged']) => void;
    ondescribedByChanged?: (value: CMeterCircleElementEventMap['describedByChanged']) => void;
    onindicatorSizeChanged?: (value: CMeterCircleElementEventMap['indicatorSizeChanged']) => void;
    oninnerRadiusChanged?: (value: CMeterCircleElementEventMap['innerRadiusChanged']) => void;
    onlabelledByChanged?: (value: CMeterCircleElementEventMap['labelledByChanged']) => void;
    onmaxChanged?: (value: CMeterCircleElementEventMap['maxChanged']) => void;
    onminChanged?: (value: CMeterCircleElementEventMap['minChanged']) => void;
    onplotAreaChanged?: (value: CMeterCircleElementEventMap['plotAreaChanged']) => void;
    onreadonlyChanged?: (value: CMeterCircleElementEventMap['readonlyChanged']) => void;
    onreferenceLinesChanged?: (value: CMeterCircleElementEventMap['referenceLinesChanged']) => void;
    onsizeChanged?: (value: CMeterCircleElementEventMap['sizeChanged']) => void;
    onstartAngleChanged?: (value: CMeterCircleElementEventMap['startAngleChanged']) => void;
    onstepChanged?: (value: CMeterCircleElementEventMap['stepChanged']) => void;
    onthresholdDisplayChanged?: (value: CMeterCircleElementEventMap['thresholdDisplayChanged']) => void;
    onthresholdsChanged?: (value: CMeterCircleElementEventMap['thresholdsChanged']) => void;
    ontransientValueChanged?: (value: CMeterCircleElementEventMap['transientValueChanged']) => void;
    onvalueChanged?: (value: CMeterCircleElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-meter-circle': MeterCircleIntrinsicProps;
        }
    }
}
