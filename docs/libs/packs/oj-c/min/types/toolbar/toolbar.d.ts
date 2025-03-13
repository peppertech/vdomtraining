import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { Toolbar as PreactToolbar } from '@oracle/oraclejet-preact/UNSAFE_Toolbar';
import { ComponentProps } from 'preact';
import { Action, Bubbles, ObservedGlobalProps, PropertyChanged } from 'ojs/ojvcomponent';
import { ToolbarItems, ToolbarActionDetail, ToolbarSelection, ToolbarSelectionDetail, ItemChroming, ItemSizes } from './items-toolbar';
export { ToolbarSelection };
type PreactToolbarProps = ComponentProps<typeof PreactToolbar>;
export declare const Toolbar: import("preact").ComponentType<import("ojs/ojvcomponent").ExtendGlobalProps<ObservedGlobalProps<"aria-controls" | "aria-label"> & {
    spacing?: PreactToolbarProps["spacing"];
    chroming?: ItemChroming;
    size?: ItemSizes;
    items?: ToolbarItems[];
    toolbarSelection?: Readonly<Record<string, ToolbarSelection>>;
    onToolbarSelectionChanged?: PropertyChanged<Record<string, ToolbarSelection>>;
    onOjToolbarAction?: Action<ToolbarActionDetail> & Bubbles;
    onOjToolbarSelection?: Action<ToolbarSelectionDetail> & Bubbles;
}>>;
export interface CToolbarElement extends JetElement<CToolbarElementSettableProperties>, CToolbarElementSettableProperties {
    addEventListener<T extends keyof CToolbarElementEventMap>(type: T, listener: (this: HTMLElement, ev: CToolbarElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CToolbarElementSettableProperties>(property: T): CToolbarElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CToolbarElementSettableProperties>(property: T, value: CToolbarElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CToolbarElementSettableProperties>): void;
    setProperties(properties: CToolbarElementSettablePropertiesLenient): void;
}
export namespace CToolbarElement {
    interface ojToolbarAction extends CustomEvent<ToolbarActionDetail & {}> {
    }
    interface ojToolbarSelection extends CustomEvent<ToolbarSelectionDetail & {}> {
    }
    type chromingChanged = JetElementCustomEventStrict<CToolbarElement['chroming']>;
    type itemsChanged = JetElementCustomEventStrict<CToolbarElement['items']>;
    type sizeChanged = JetElementCustomEventStrict<CToolbarElement['size']>;
    type spacingChanged = JetElementCustomEventStrict<CToolbarElement['spacing']>;
    type toolbarSelectionChanged = JetElementCustomEventStrict<CToolbarElement['toolbarSelection']>;
}
export interface CToolbarElementEventMap extends HTMLElementEventMap {
    'ojToolbarAction': CToolbarElement.ojToolbarAction;
    'ojToolbarSelection': CToolbarElement.ojToolbarSelection;
    'chromingChanged': JetElementCustomEventStrict<CToolbarElement['chroming']>;
    'itemsChanged': JetElementCustomEventStrict<CToolbarElement['items']>;
    'sizeChanged': JetElementCustomEventStrict<CToolbarElement['size']>;
    'spacingChanged': JetElementCustomEventStrict<CToolbarElement['spacing']>;
    'toolbarSelectionChanged': JetElementCustomEventStrict<CToolbarElement['toolbarSelection']>;
}
export interface CToolbarElementSettableProperties extends JetSettableProperties {
    chroming?: ComponentProps<typeof Toolbar>['chroming'];
    items?: ComponentProps<typeof Toolbar>['items'];
    size?: ComponentProps<typeof Toolbar>['size'];
    spacing?: ComponentProps<typeof Toolbar>['spacing'];
    toolbarSelection?: ComponentProps<typeof Toolbar>['toolbarSelection'];
}
export interface CToolbarElementSettablePropertiesLenient extends Partial<CToolbarElementSettableProperties> {
    [key: string]: any;
}
export interface ToolbarIntrinsicProps extends Partial<Readonly<CToolbarElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    onojToolbarAction?: (value: CToolbarElementEventMap['ojToolbarAction']) => void;
    onojToolbarSelection?: (value: CToolbarElementEventMap['ojToolbarSelection']) => void;
    onchromingChanged?: (value: CToolbarElementEventMap['chromingChanged']) => void;
    onitemsChanged?: (value: CToolbarElementEventMap['itemsChanged']) => void;
    onsizeChanged?: (value: CToolbarElementEventMap['sizeChanged']) => void;
    onspacingChanged?: (value: CToolbarElementEventMap['spacingChanged']) => void;
    ontoolbarSelectionChanged?: (value: CToolbarElementEventMap['toolbarSelectionChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-toolbar': ToolbarIntrinsicProps;
        }
    }
}
