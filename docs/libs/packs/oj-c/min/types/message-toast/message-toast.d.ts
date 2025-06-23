import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { MessageToastItem, MessageToast as PreactMessageToast } from '@oracle/oraclejet-preact/UNSAFE_MessageToast';
import { DataProvider, ItemMetadata } from 'ojs/ojdataprovider';
import { Action, DynamicTemplateSlots, ExtendGlobalProps } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import 'css!oj-c/message-toast/message-toast-styles.css';
type CloseActionDetail<K extends string | number, D extends MessageToastItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type PreactMessageToastProps = ComponentProps<typeof PreactMessageToast>;
type MessageToastTemplateContext<K extends string | number, D extends MessageToastItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type MessageToastTemplateValueParameters<K extends string | number, D extends MessageToastItem> = {
    data: D;
    key: K;
    metadata: ItemMetadata<K>;
};
type MessageToastProps<K extends string | number, D extends MessageToastItem> = {
    data: DataProvider<K, D>;
    detailTemplateValue?: string | ((parameters: MessageToastTemplateValueParameters<K, D>) => string | undefined);
    iconTemplateValue?: string | ((parameters: MessageToastTemplateValueParameters<K, D>) => string | undefined);
    messageTemplates?: DynamicTemplateSlots<MessageToastTemplateContext<K, D>>;
    offset?: PreactMessageToastProps['offset'];
    position?: PreactMessageToastProps['position'];
    onOjClose?: Action<CloseActionDetail<K, D>>;
};
declare function MessageToastImpl<K extends string | number, D extends MessageToastItem>({ data, detailTemplateValue, iconTemplateValue, messageTemplates, offset, position, onOjClose }: MessageToastProps<K, D>): import("preact").JSX.Element;
export declare const MessageToast: ComponentType<ExtendGlobalProps<ComponentProps<typeof MessageToastImpl>>>;
export type { MessageToastItem, MessageToastProps, MessageToastTemplateContext, MessageToastTemplateValueParameters };
export interface CMessageToastElement<K extends string | number, D extends MessageToastItem> extends JetElement<CMessageToastElementSettableProperties<K, D>>, CMessageToastElementSettableProperties<K, D> {
    addEventListener<T extends keyof CMessageToastElementEventMap<K, D>>(type: T, listener: (this: HTMLElement, ev: CMessageToastElementEventMap<K, D>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CMessageToastElementSettableProperties<K, D>>(property: T): CMessageToastElement<K, D>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CMessageToastElementSettableProperties<K, D>>(property: T, value: CMessageToastElementSettableProperties<K, D>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CMessageToastElementSettableProperties<K, D>>): void;
    setProperties(properties: CMessageToastElementSettablePropertiesLenient<K, D>): void;
}
export namespace CMessageToastElement {
    interface ojClose<K extends string | number, D extends MessageToastItem> extends CustomEvent<CloseActionDetail<K, D> & {}> {
    }
    type dataChanged<K extends string | number, D extends MessageToastItem> = JetElementCustomEventStrict<CMessageToastElement<K, D>['data']>;
    type detailTemplateValueChanged<K extends string | number, D extends MessageToastItem> = JetElementCustomEventStrict<CMessageToastElement<K, D>['detailTemplateValue']>;
    type iconTemplateValueChanged<K extends string | number, D extends MessageToastItem> = JetElementCustomEventStrict<CMessageToastElement<K, D>['iconTemplateValue']>;
    type offsetChanged<K extends string | number, D extends MessageToastItem> = JetElementCustomEventStrict<CMessageToastElement<K, D>['offset']>;
    type positionChanged<K extends string | number, D extends MessageToastItem> = JetElementCustomEventStrict<CMessageToastElement<K, D>['position']>;
    type RenderDetailTemplate<K extends string | number, D extends MessageToastItem> = import('ojs/ojvcomponent').TemplateSlot<MessageToastTemplateContext<K, D>>;
    type RenderIconTemplate<K extends string | number, D extends MessageToastItem> = import('ojs/ojvcomponent').TemplateSlot<MessageToastTemplateContext<K, D>>;
}
export interface CMessageToastElementEventMap<K extends string | number, D extends MessageToastItem> extends HTMLElementEventMap {
    'ojClose': CMessageToastElement.ojClose<K, D>;
    'dataChanged': JetElementCustomEventStrict<CMessageToastElement<K, D>['data']>;
    'detailTemplateValueChanged': JetElementCustomEventStrict<CMessageToastElement<K, D>['detailTemplateValue']>;
    'iconTemplateValueChanged': JetElementCustomEventStrict<CMessageToastElement<K, D>['iconTemplateValue']>;
    'offsetChanged': JetElementCustomEventStrict<CMessageToastElement<K, D>['offset']>;
    'positionChanged': JetElementCustomEventStrict<CMessageToastElement<K, D>['position']>;
}
export interface CMessageToastElementSettableProperties<K extends string | number, D extends MessageToastItem> extends JetSettableProperties {
    data: MessageToastProps<K, D>['data'];
    detailTemplateValue?: MessageToastProps<K, D>['detailTemplateValue'];
    iconTemplateValue?: MessageToastProps<K, D>['iconTemplateValue'];
    offset?: MessageToastProps<K, D>['offset'];
    position?: MessageToastProps<K, D>['position'];
}
export interface CMessageToastElementSettablePropertiesLenient<K extends string | number, D extends MessageToastItem> extends Partial<CMessageToastElementSettableProperties<K, D>> {
    [key: string]: any;
}
export interface MessageToastIntrinsicProps extends Partial<Readonly<CMessageToastElementSettableProperties<any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojClose?: (value: CMessageToastElementEventMap<any, any>['ojClose']) => void;
    ondataChanged?: (value: CMessageToastElementEventMap<any, any>['dataChanged']) => void;
    ondetailTemplateValueChanged?: (value: CMessageToastElementEventMap<any, any>['detailTemplateValueChanged']) => void;
    oniconTemplateValueChanged?: (value: CMessageToastElementEventMap<any, any>['iconTemplateValueChanged']) => void;
    onoffsetChanged?: (value: CMessageToastElementEventMap<any, any>['offsetChanged']) => void;
    onpositionChanged?: (value: CMessageToastElementEventMap<any, any>['positionChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-message-toast': MessageToastIntrinsicProps;
        }
    }
}
