import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { MessageBannerItem } from '@oracle/oraclejet-preact/UNSAFE_MessageBanner';
import { DataProvider, ItemMetadata } from 'ojs/ojdataprovider';
import { Action, DynamicTemplateSlots, ExtendGlobalProps } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import 'css!oj-c/message-banner/message-banner-styles.css';
type MessageBannerTemplateContext<K extends string | number, D extends MessageBannerItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type CloseActionDetail<K extends string | number, D extends MessageBannerItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type MessageBannerTemplateValueParameters<K extends string | number, D extends MessageBannerItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type MessageBannerProps<K extends string | number, D extends MessageBannerItem> = {
    data: DataProvider<K, D>;
    type?: 'page' | 'section';
    detailTemplateValue?: string | ((parameters: MessageBannerTemplateValueParameters<K, D>) => string | undefined);
    messageTemplates?: DynamicTemplateSlots<MessageBannerTemplateContext<K, D>>;
    onOjClose?: Action<CloseActionDetail<K, D>>;
    sorting?: 'severity' | 'off';
};
declare function MessageBannerImpl<K extends string | number, D extends MessageBannerItem>({ data, detailTemplateValue, messageTemplates, type, sorting, onOjClose }: MessageBannerProps<K, D>): import("preact").JSX.Element;
export declare const MessageBanner: ComponentType<ExtendGlobalProps<ComponentProps<typeof MessageBannerImpl>>>;
export type { MessageBannerItem, MessageBannerProps, MessageBannerTemplateContext, MessageBannerTemplateValueParameters };
export interface CMessageBannerElement<K extends string | number, D extends MessageBannerItem> extends JetElement<CMessageBannerElementSettableProperties<K, D>>, CMessageBannerElementSettableProperties<K, D> {
    addEventListener<T extends keyof CMessageBannerElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CMessageBannerElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CMessageBannerElementSettableProperties<K, D>>(property: T): CMessageBannerElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CMessageBannerElementSettableProperties<K, D>>(property: T, value: CMessageBannerElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CMessageBannerElementSettableProperties<K, D>>): void;
    setProperties(properties: CMessageBannerElementSettablePropertiesLenient<K, D>): void;
}
export namespace CMessageBannerElement {
    interface ojClose<K extends string | number, D extends MessageBannerItem> extends CustomEvent<CloseActionDetail<K, D> & {}> {
    }
    type dataChanged<K extends string | number, D extends MessageBannerItem> = JetElementCustomEventStrict<CMessageBannerElement<K, D>['data']>;
    type detailTemplateValueChanged<K extends string | number, D extends MessageBannerItem> = JetElementCustomEventStrict<CMessageBannerElement<K, D>['detailTemplateValue']>;
    type sortingChanged<K extends string | number, D extends MessageBannerItem> = JetElementCustomEventStrict<CMessageBannerElement<K, D>['sorting']>;
    type typeChanged<K extends string | number, D extends MessageBannerItem> = JetElementCustomEventStrict<CMessageBannerElement<K, D>['type']>;
    type RenderDetailTemplate<K extends string | number, D extends MessageBannerItem> = import('ojs/ojvcomponent').TemplateSlot<MessageBannerTemplateContext<K, D>>;
}
export interface CMessageBannerElementEventMap<K extends string | number, D extends MessageBannerItem> extends HTMLElementEventMap {
    'ojClose': CMessageBannerElement.ojClose<K, D>;
    'dataChanged': JetElementCustomEventStrict<CMessageBannerElement<K, D>['data']>;
    'detailTemplateValueChanged': JetElementCustomEventStrict<CMessageBannerElement<K, D>['detailTemplateValue']>;
    'sortingChanged': JetElementCustomEventStrict<CMessageBannerElement<K, D>['sorting']>;
    'typeChanged': JetElementCustomEventStrict<CMessageBannerElement<K, D>['type']>;
}
export interface CMessageBannerElementSettableProperties<K extends string | number, D extends MessageBannerItem> extends JetSettableProperties {
    data: MessageBannerProps<K, D>['data'];
    detailTemplateValue?: MessageBannerProps<K, D>['detailTemplateValue'];
    sorting?: MessageBannerProps<K, D>['sorting'];
    type?: MessageBannerProps<K, D>['type'];
}
export interface CMessageBannerElementSettablePropertiesLenient<K extends string | number, D extends MessageBannerItem> extends Partial<CMessageBannerElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface MessageBannerIntrinsicProps extends Partial<Readonly<CMessageBannerElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojClose?: (value: CMessageBannerElementEventMap<any, any>['ojClose']) => void;
    ondataChanged?: (value: CMessageBannerElementEventMap<any, any>['dataChanged']) => void;
    ondetailTemplateValueChanged?: (value: CMessageBannerElementEventMap<any, any>['detailTemplateValueChanged']) => void;
    onsortingChanged?: (value: CMessageBannerElementEventMap<any, any>['sortingChanged']) => void;
    ontypeChanged?: (value: CMessageBannerElementEventMap<any, any>['typeChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-message-banner': MessageBannerIntrinsicProps;
        }
    }
}
