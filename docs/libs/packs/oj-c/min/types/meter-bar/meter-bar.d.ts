import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { MeterBar as PreactMeterBar } from '@oracle/oraclejet-preact/UNSAFE_MeterBar';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps, ReadOnlyPropertyChanged, PropertyChanged } from 'ojs/ojvcomponent';
import 'css!oj-c/meter-bar/meter-bar-styles.css';
import { ReferenceLine, Threshold } from '../utils/UNSAFE_vizTypes';
type PreactMeterBarProps = ComponentProps<typeof PreactMeterBar>;
type PlotArea = {
    color?: PreactMeterBarProps['trackColor'];
    rendered?: 'on' | 'off';
};
export type ThresholdDisplay = 'all' | 'plotArea' | 'indicator';
type DatatipContext = {
    value: number;
};
export declare const MeterBar: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-label"> & {
    max?: number | undefined;
    min?: number | undefined;
    readonly?: boolean | undefined;
    value?: number | null | undefined;
    onValueChanged?: PropertyChanged<number | null> | undefined;
    step?: number | undefined;
    color?: PreactMeterBarProps['indicatorColor'];
    indicatorSize?: number | undefined;
    plotArea?: PlotArea | undefined;
    orientation?: PreactMeterBarProps['orientation'];
    referenceLines?: ReferenceLine[] | undefined;
    thresholdDisplay?: ThresholdDisplay | undefined;
    thresholds?: Threshold[] | undefined;
    describedBy?: string | null | undefined;
    labelledBy?: string | null | undefined;
    size?: PreactMeterBarProps['size'];
    datatip?: ((context: DatatipContext) => string | null) | undefined;
    onTransientValueChanged?: ReadOnlyPropertyChanged<number | undefined> | undefined;
}>>;
export {};
export interface CMeterBarElement extends JetElement<CMeterBarElementSettableProperties>, CMeterBarElementSettableProperties {
    readonly transientValue?: Parameters<Required<ComponentProps<typeof MeterBar>>['onTransientValueChanged']>[0];
    addEventListener<T extends keyof CMeterBarElementEventMap>(type: T, listener: (this: HTMLElement, ev: CMeterBarElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CMeterBarElementSettableProperties>(property: T): CMeterBarElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CMeterBarElementSettableProperties>(property: T, value: CMeterBarElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CMeterBarElementSettableProperties>): void;
    setProperties(properties: CMeterBarElementSettablePropertiesLenient): void;
}
export namespace CMeterBarElement {
    type colorChanged = JetElementCustomEventStrict<CMeterBarElement['color']>;
    type datatipChanged = JetElementCustomEventStrict<CMeterBarElement['datatip']>;
    type describedByChanged = JetElementCustomEventStrict<CMeterBarElement['describedBy']>;
    type indicatorSizeChanged = JetElementCustomEventStrict<CMeterBarElement['indicatorSize']>;
    type labelledByChanged = JetElementCustomEventStrict<CMeterBarElement['labelledBy']>;
    type maxChanged = JetElementCustomEventStrict<CMeterBarElement['max']>;
    type minChanged = JetElementCustomEventStrict<CMeterBarElement['min']>;
    type orientationChanged = JetElementCustomEventStrict<CMeterBarElement['orientation']>;
    type plotAreaChanged = JetElementCustomEventStrict<CMeterBarElement['plotArea']>;
    type readonlyChanged = JetElementCustomEventStrict<CMeterBarElement['readonly']>;
    type referenceLinesChanged = JetElementCustomEventStrict<CMeterBarElement['referenceLines']>;
    type sizeChanged = JetElementCustomEventStrict<CMeterBarElement['size']>;
    type stepChanged = JetElementCustomEventStrict<CMeterBarElement['step']>;
    type thresholdDisplayChanged = JetElementCustomEventStrict<CMeterBarElement['thresholdDisplay']>;
    type thresholdsChanged = JetElementCustomEventStrict<CMeterBarElement['thresholds']>;
    type transientValueChanged = JetElementCustomEventStrict<CMeterBarElement['transientValue']>;
    type valueChanged = JetElementCustomEventStrict<CMeterBarElement['value']>;
}
export interface CMeterBarElementEventMap extends HTMLElementEventMap {
    'colorChanged': JetElementCustomEventStrict<CMeterBarElement['color']>;
    'datatipChanged': JetElementCustomEventStrict<CMeterBarElement['datatip']>;
    'describedByChanged': JetElementCustomEventStrict<CMeterBarElement['describedBy']>;
    'indicatorSizeChanged': JetElementCustomEventStrict<CMeterBarElement['indicatorSize']>;
    'labelledByChanged': JetElementCustomEventStrict<CMeterBarElement['labelledBy']>;
    'maxChanged': JetElementCustomEventStrict<CMeterBarElement['max']>;
    'minChanged': JetElementCustomEventStrict<CMeterBarElement['min']>;
    'orientationChanged': JetElementCustomEventStrict<CMeterBarElement['orientation']>;
    'plotAreaChanged': JetElementCustomEventStrict<CMeterBarElement['plotArea']>;
    'readonlyChanged': JetElementCustomEventStrict<CMeterBarElement['readonly']>;
    'referenceLinesChanged': JetElementCustomEventStrict<CMeterBarElement['referenceLines']>;
    'sizeChanged': JetElementCustomEventStrict<CMeterBarElement['size']>;
    'stepChanged': JetElementCustomEventStrict<CMeterBarElement['step']>;
    'thresholdDisplayChanged': JetElementCustomEventStrict<CMeterBarElement['thresholdDisplay']>;
    'thresholdsChanged': JetElementCustomEventStrict<CMeterBarElement['thresholds']>;
    'transientValueChanged': JetElementCustomEventStrict<CMeterBarElement['transientValue']>;
    'valueChanged': JetElementCustomEventStrict<CMeterBarElement['value']>;
}
export interface CMeterBarElementSettableProperties extends JetSettableProperties {
    color?: ComponentProps<typeof MeterBar>['color'];
    datatip?: ComponentProps<typeof MeterBar>['datatip'];
    describedBy?: ComponentProps<typeof MeterBar>['describedBy'];
    indicatorSize?: ComponentProps<typeof MeterBar>['indicatorSize'];
    labelledBy?: ComponentProps<typeof MeterBar>['labelledBy'];
    max?: ComponentProps<typeof MeterBar>['max'];
    min?: ComponentProps<typeof MeterBar>['min'];
    orientation?: ComponentProps<typeof MeterBar>['orientation'];
    plotArea?: ComponentProps<typeof MeterBar>['plotArea'];
    readonly?: ComponentProps<typeof MeterBar>['readonly'];
    referenceLines?: ComponentProps<typeof MeterBar>['referenceLines'];
    size?: ComponentProps<typeof MeterBar>['size'];
    step?: ComponentProps<typeof MeterBar>['step'];
    thresholdDisplay?: ComponentProps<typeof MeterBar>['thresholdDisplay'];
    thresholds?: ComponentProps<typeof MeterBar>['thresholds'];
    value?: ComponentProps<typeof MeterBar>['value'];
}
export interface CMeterBarElementSettablePropertiesLenient extends Partial<CMeterBarElementSettableProperties> {
    [key: string]: any;
}
export interface MeterBarIntrinsicProps extends Partial<Readonly<CMeterBarElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    transientValue?: never;
    oncolorChanged?: (value: CMeterBarElementEventMap['colorChanged']) => void;
    ondatatipChanged?: (value: CMeterBarElementEventMap['datatipChanged']) => void;
    ondescribedByChanged?: (value: CMeterBarElementEventMap['describedByChanged']) => void;
    onindicatorSizeChanged?: (value: CMeterBarElementEventMap['indicatorSizeChanged']) => void;
    onlabelledByChanged?: (value: CMeterBarElementEventMap['labelledByChanged']) => void;
    onmaxChanged?: (value: CMeterBarElementEventMap['maxChanged']) => void;
    onminChanged?: (value: CMeterBarElementEventMap['minChanged']) => void;
    onorientationChanged?: (value: CMeterBarElementEventMap['orientationChanged']) => void;
    onplotAreaChanged?: (value: CMeterBarElementEventMap['plotAreaChanged']) => void;
    onreadonlyChanged?: (value: CMeterBarElementEventMap['readonlyChanged']) => void;
    onreferenceLinesChanged?: (value: CMeterBarElementEventMap['referenceLinesChanged']) => void;
    onsizeChanged?: (value: CMeterBarElementEventMap['sizeChanged']) => void;
    onstepChanged?: (value: CMeterBarElementEventMap['stepChanged']) => void;
    onthresholdDisplayChanged?: (value: CMeterBarElementEventMap['thresholdDisplayChanged']) => void;
    onthresholdsChanged?: (value: CMeterBarElementEventMap['thresholdsChanged']) => void;
    ontransientValueChanged?: (value: CMeterBarElementEventMap['transientValueChanged']) => void;
    onvalueChanged?: (value: CMeterBarElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-meter-bar': MeterBarIntrinsicProps;
        }
    }
}
