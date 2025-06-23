import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { ExtendGlobalProps } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
type Props = {
    height: Size;
    width?: Size;
    borderRadius?: Size;
};
declare const SkeletonImpl: ({ height, width, borderRadius }: Props) => import("preact").JSX.Element;
export declare const Skeleton: ComponentType<ExtendGlobalProps<ComponentProps<typeof SkeletonImpl>>>;
export {};
export interface CSkeletonElement extends JetElement<CSkeletonElementSettableProperties>, CSkeletonElementSettableProperties {
    addEventListener<T extends keyof CSkeletonElementEventMap>(type: T, listener: (this: HTMLElement, ev: CSkeletonElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CSkeletonElementSettableProperties>(property: T): CSkeletonElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CSkeletonElementSettableProperties>(property: T, value: CSkeletonElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CSkeletonElementSettableProperties>): void;
    setProperties(properties: CSkeletonElementSettablePropertiesLenient): void;
}
export namespace CSkeletonElement {
    type borderRadiusChanged = JetElementCustomEventStrict<CSkeletonElement['borderRadius']>;
    type heightChanged = JetElementCustomEventStrict<CSkeletonElement['height']>;
    type widthChanged = JetElementCustomEventStrict<CSkeletonElement['width']>;
}
export interface CSkeletonElementEventMap extends HTMLElementEventMap {
    'borderRadiusChanged': JetElementCustomEventStrict<CSkeletonElement['borderRadius']>;
    'heightChanged': JetElementCustomEventStrict<CSkeletonElement['height']>;
    'widthChanged': JetElementCustomEventStrict<CSkeletonElement['width']>;
}
export interface CSkeletonElementSettableProperties extends JetSettableProperties {
    borderRadius?: Props['borderRadius'];
    height: Props['height'];
    width?: Props['width'];
}
export interface CSkeletonElementSettablePropertiesLenient extends Partial<CSkeletonElementSettableProperties> {
    [key: string]: any;
}
export interface SkeletonIntrinsicProps extends Partial<Readonly<CSkeletonElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onborderRadiusChanged?: (value: CSkeletonElementEventMap['borderRadiusChanged']) => void;
    onheightChanged?: (value: CSkeletonElementEventMap['heightChanged']) => void;
    onwidthChanged?: (value: CSkeletonElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-skeleton': SkeletonIntrinsicProps;
        }
    }
}
