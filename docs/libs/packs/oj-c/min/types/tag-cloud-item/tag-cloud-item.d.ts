import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
export declare const TagCloudItemDefaults: Partial<TagCloudItemProps>;
export type TagCloudItemProps = {
    categories?: string[];
    color?: string;
    label: string;
    value: number | null;
    url?: string;
    shortDesc?: string;
};
export declare const TagCloudItem: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<TagCloudItemProps>>;
export interface CTagCloudItemElement extends JetElement<CTagCloudItemElementSettableProperties>, CTagCloudItemElementSettableProperties {
    addEventListener<T extends keyof CTagCloudItemElementEventMap>(type: T, listener: (this: HTMLElement, ev: CTagCloudItemElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTagCloudItemElementSettableProperties>(property: T): CTagCloudItemElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTagCloudItemElementSettableProperties>(property: T, value: CTagCloudItemElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTagCloudItemElementSettableProperties>): void;
    setProperties(properties: CTagCloudItemElementSettablePropertiesLenient): void;
}
export namespace CTagCloudItemElement {
    type categoriesChanged = JetElementCustomEventStrict<CTagCloudItemElement['categories']>;
    type colorChanged = JetElementCustomEventStrict<CTagCloudItemElement['color']>;
    type labelChanged = JetElementCustomEventStrict<CTagCloudItemElement['label']>;
    type shortDescChanged = JetElementCustomEventStrict<CTagCloudItemElement['shortDesc']>;
    type urlChanged = JetElementCustomEventStrict<CTagCloudItemElement['url']>;
    type valueChanged = JetElementCustomEventStrict<CTagCloudItemElement['value']>;
}
export interface CTagCloudItemElementEventMap extends HTMLElementEventMap {
    'categoriesChanged': JetElementCustomEventStrict<CTagCloudItemElement['categories']>;
    'colorChanged': JetElementCustomEventStrict<CTagCloudItemElement['color']>;
    'labelChanged': JetElementCustomEventStrict<CTagCloudItemElement['label']>;
    'shortDescChanged': JetElementCustomEventStrict<CTagCloudItemElement['shortDesc']>;
    'urlChanged': JetElementCustomEventStrict<CTagCloudItemElement['url']>;
    'valueChanged': JetElementCustomEventStrict<CTagCloudItemElement['value']>;
}
export interface CTagCloudItemElementSettableProperties extends JetSettableProperties {
    categories?: TagCloudItemProps['categories'];
    color?: TagCloudItemProps['color'];
    label: TagCloudItemProps['label'];
    shortDesc?: TagCloudItemProps['shortDesc'];
    url?: TagCloudItemProps['url'];
    value: TagCloudItemProps['value'];
}
export interface CTagCloudItemElementSettablePropertiesLenient extends Partial<CTagCloudItemElementSettableProperties> {
    [key: string]: any;
}
export interface TagCloudItemIntrinsicProps extends Partial<Readonly<CTagCloudItemElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    oncategoriesChanged?: (value: CTagCloudItemElementEventMap['categoriesChanged']) => void;
    oncolorChanged?: (value: CTagCloudItemElementEventMap['colorChanged']) => void;
    onlabelChanged?: (value: CTagCloudItemElementEventMap['labelChanged']) => void;
    onshortDescChanged?: (value: CTagCloudItemElementEventMap['shortDescChanged']) => void;
    onurlChanged?: (value: CTagCloudItemElementEventMap['urlChanged']) => void;
    onvalueChanged?: (value: CTagCloudItemElementEventMap['valueChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-tag-cloud-item': TagCloudItemIntrinsicProps;
        }
    }
}
