import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Avatar as PreactAvatar } from '@oracle/oraclejet-preact/UNSAFE_Avatar';
import { ComponentProps } from 'preact';
import { ObservedGlobalProps } from 'ojs/ojvcomponent';
import 'css!oj-c/avatar/avatar-styles.css';
type PreactAvatarProps = ComponentProps<typeof PreactAvatar>;
export declare const Avatar: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-label"> & {
    background?: PreactAvatarProps['background'];
    initials?: string | null | undefined;
    size?: PreactAvatarProps['size'];
    src?: string | null | undefined;
    iconClass?: string | undefined;
    shape?: PreactAvatarProps['shape'];
}>>;
export {};
export interface CAvatarElement extends JetElement<CAvatarElementSettableProperties>, CAvatarElementSettableProperties {
    addEventListener<T extends keyof CAvatarElementEventMap>(type: T, listener: (this: HTMLElement, ev: CAvatarElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CAvatarElementSettableProperties>(property: T): CAvatarElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CAvatarElementSettableProperties>(property: T, value: CAvatarElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CAvatarElementSettableProperties>): void;
    setProperties(properties: CAvatarElementSettablePropertiesLenient): void;
}
export namespace CAvatarElement {
    type backgroundChanged = JetElementCustomEventStrict<CAvatarElement['background']>;
    type iconClassChanged = JetElementCustomEventStrict<CAvatarElement['iconClass']>;
    type initialsChanged = JetElementCustomEventStrict<CAvatarElement['initials']>;
    type shapeChanged = JetElementCustomEventStrict<CAvatarElement['shape']>;
    type sizeChanged = JetElementCustomEventStrict<CAvatarElement['size']>;
    type srcChanged = JetElementCustomEventStrict<CAvatarElement['src']>;
}
export interface CAvatarElementEventMap extends HTMLElementEventMap {
    'backgroundChanged': JetElementCustomEventStrict<CAvatarElement['background']>;
    'iconClassChanged': JetElementCustomEventStrict<CAvatarElement['iconClass']>;
    'initialsChanged': JetElementCustomEventStrict<CAvatarElement['initials']>;
    'shapeChanged': JetElementCustomEventStrict<CAvatarElement['shape']>;
    'sizeChanged': JetElementCustomEventStrict<CAvatarElement['size']>;
    'srcChanged': JetElementCustomEventStrict<CAvatarElement['src']>;
}
export interface CAvatarElementSettableProperties extends JetSettableProperties {
    background?: ComponentProps<typeof Avatar>['background'];
    iconClass?: ComponentProps<typeof Avatar>['iconClass'];
    initials?: ComponentProps<typeof Avatar>['initials'];
    shape?: ComponentProps<typeof Avatar>['shape'];
    size?: ComponentProps<typeof Avatar>['size'];
    src?: ComponentProps<typeof Avatar>['src'];
}
export interface CAvatarElementSettablePropertiesLenient extends Partial<CAvatarElementSettableProperties> {
    [key: string]: any;
}
export interface AvatarIntrinsicProps extends Partial<Readonly<CAvatarElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onbackgroundChanged?: (value: CAvatarElementEventMap['backgroundChanged']) => void;
    oniconClassChanged?: (value: CAvatarElementEventMap['iconClassChanged']) => void;
    oninitialsChanged?: (value: CAvatarElementEventMap['initialsChanged']) => void;
    onshapeChanged?: (value: CAvatarElementEventMap['shapeChanged']) => void;
    onsizeChanged?: (value: CAvatarElementEventMap['sizeChanged']) => void;
    onsrcChanged?: (value: CAvatarElementEventMap['srcChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-avatar': AvatarIntrinsicProps;
        }
    }
}
