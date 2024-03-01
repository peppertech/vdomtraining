import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { RatingGauge as PreactRatingGauge } from '@oracle/oraclejet-preact/UNSAFE_RatingGauge';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps, ReadOnlyPropertyChanged, PropertyChanged } from 'ojs/ojvcomponent';
import 'css!oj-c/rating-gauge/rating-gauge-styles.css';
import { Threshold } from '../utils/UNSAFE_vizTypes';
type PreactRatingGaugeProps = ComponentProps<typeof PreactRatingGauge>;
type DatatipContext = {
    value: number;
};
export declare const RatingGauge: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-label"> & {
    max?: number | undefined;
    readonly?: boolean | undefined;
    disabled?: boolean | undefined;
    changed?: boolean | undefined;
    onChangedChanged?: PropertyChanged<boolean> | undefined;
    value?: number | null | undefined;
    onValueChanged?: PropertyChanged<number | null> | undefined;
    step?: number | undefined;
    describedBy?: string | null | undefined;
    labelledBy?: string | null | undefined;
    size?: PreactRatingGaugeProps['size'];
    color?: PreactRatingGaugeProps['color'];
    thresholds?: Threshold[] | undefined;
    datatip?: ((context: DatatipContext) => string) | undefined;
    tooltip?: string | undefined;
    onTransientValueChanged?: ReadOnlyPropertyChanged<number | undefined> | undefined;
}>>;
export {};
export interface CRatingGaugeElement extends JetElement<CRatingGaugeElementSettableProperties>, CRatingGaugeElementSettableProperties {
    readonly transientValue?: Parameters<Required<ComponentProps<typeof RatingGauge>>['onTransientValueChanged']>[0];
    addEventListener<T extends keyof CRatingGaugeElementEventMap>(type: T, listener: (this: HTMLElement, ev: CRatingGaugeElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CRatingGaugeElementSettableProperties>(property: T): CRatingGaugeElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CRatingGaugeElementSettableProperties>(property: T, value: CRatingGaugeElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CRatingGaugeElementSettableProperties>): void;
    setProperties(properties: CRatingGaugeElementSettablePropertiesLenient): void;
}
export namespace CRatingGaugeElement {
    type changedChanged = JetElementCustomEventStrict<CRatingGaugeElement['changed']>;
    type colorChanged = JetElementCustomEventStrict<CRatingGaugeElement['color']>;
    type datatipChanged = JetElementCustomEventStrict<CRatingGaugeElement['datatip']>;
    type describedByChanged = JetElementCustomEventStrict<CRatingGaugeElement['describedBy']>;
    type disabledChanged = JetElementCustomEventStrict<CRatingGaugeElement['disabled']>;
    type labelledByChanged = JetElementCustomEventStrict<CRatingGaugeElement['labelledBy']>;
    type maxChanged = JetElementCustomEventStrict<CRatingGaugeElement['max']>;
    type readonlyChanged = JetElementCustomEventStrict<CRatingGaugeElement['readonly']>;
    type sizeChanged = JetElementCustomEventStrict<CRatingGaugeElement['size']>;
    type stepChanged = JetElementCustomEventStrict<CRatingGaugeElement['step']>;
    type thresholdsChanged = JetElementCustomEventStrict<CRatingGaugeElement['thresholds']>;
    type tooltipChanged = JetElementCustomEventStrict<CRatingGaugeElement['tooltip']>;
    type transientValueChanged = JetElementCustomEventStrict<CRatingGaugeElement['transientValue']>;
    type valueChanged = JetElementCustomEventStrict<CRatingGaugeElement['value']>;
}
export interface CRatingGaugeElementEventMap extends HTMLElementEventMap {
    'changedChanged': JetElementCustomEventStrict<CRatingGaugeElement['changed']>;
    'colorChanged': JetElementCustomEventStrict<CRatingGaugeElement['color']>;
    'datatipChanged': JetElementCustomEventStrict<CRatingGaugeElement['datatip']>;
    'describedByChanged': JetElementCustomEventStrict<CRatingGaugeElement['describedBy']>;
    'disabledChanged': JetElementCustomEventStrict<CRatingGaugeElement['disabled']>;
    'labelledByChanged': JetElementCustomEventStrict<CRatingGaugeElement['labelledBy']>;
    'maxChanged': JetElementCustomEventStrict<CRatingGaugeElement['max']>;
    'readonlyChanged': JetElementCustomEventStrict<CRatingGaugeElement['readonly']>;
    'sizeChanged': JetElementCustomEventStrict<CRatingGaugeElement['size']>;
    'stepChanged': JetElementCustomEventStrict<CRatingGaugeElement['step']>;
    'thresholdsChanged': JetElementCustomEventStrict<CRatingGaugeElement['thresholds']>;
    'tooltipChanged': JetElementCustomEventStrict<CRatingGaugeElement['tooltip']>;
    'transientValueChanged': JetElementCustomEventStrict<CRatingGaugeElement['transientValue']>;
    'valueChanged': JetElementCustomEventStrict<CRatingGaugeElement['value']>;
}
export interface CRatingGaugeElementSettableProperties extends JetSettableProperties {
    changed?: ComponentProps<typeof RatingGauge>['changed'];
    color?: ComponentProps<typeof RatingGauge>['color'];
    datatip?: ComponentProps<typeof RatingGauge>['datatip'];
    describedBy?: ComponentProps<typeof RatingGauge>['describedBy'];
    disabled?: ComponentProps<typeof RatingGauge>['disabled'];
    labelledBy?: ComponentProps<typeof RatingGauge>['labelledBy'];
    max?: ComponentProps<typeof RatingGauge>['max'];
    readonly?: ComponentProps<typeof RatingGauge>['readonly'];
    size?: ComponentProps<typeof RatingGauge>['size'];
    step?: ComponentProps<typeof RatingGauge>['step'];
    thresholds?: ComponentProps<typeof RatingGauge>['thresholds'];
    tooltip?: ComponentProps<typeof RatingGauge>['tooltip'];
    value?: ComponentProps<typeof RatingGauge>['value'];
}
export interface CRatingGaugeElementSettablePropertiesLenient extends Partial<CRatingGaugeElementSettableProperties> {
    [key: string]: any;
}
export interface RatingGaugeIntrinsicProps extends Partial<Readonly<CRatingGaugeElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    transientValue?: never;
    onchangedChanged?: (value: CRatingGaugeElementEventMap['changedChanged']) => void;
    oncolorChanged?: (value: CRatingGaugeElementEventMap['colorChanged']) => void;
    ondatatipChanged?: (value: CRatingGaugeElementEventMap['datatipChanged']) => void;
    ondescribedByChanged?: (value: CRatingGaugeElementEventMap['describedByChanged']) => void;
    ondisabledChanged?: (value: CRatingGaugeElementEventMap['disabledChanged']) => void;
    onlabelledByChanged?: (value: CRatingGaugeElementEventMap['labelledByChanged']) => void;
    onmaxChanged?: (value: CRatingGaugeElementEventMap['maxChanged']) => void;
    onreadonlyChanged?: (value: CRatingGaugeElementEventMap['readonlyChanged']) => void;
    onsizeChanged?: (value: CRatingGaugeElementEventMap['sizeChanged']) => void;
    onstepChanged?: (value: CRatingGaugeElementEventMap['stepChanged']) => void;
    onthresholdsChanged?: (value: CRatingGaugeElementEventMap['thresholdsChanged']) => void;
    ontooltipChanged?: (value: CRatingGaugeElementEventMap['tooltipChanged']) => void;
    ontransientValueChanged?: (value: CRatingGaugeElementEventMap['transientValueChanged']) => void;
    onvalueChanged?: (value: CRatingGaugeElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-rating-gauge': RatingGaugeIntrinsicProps;
        }
    }
}
