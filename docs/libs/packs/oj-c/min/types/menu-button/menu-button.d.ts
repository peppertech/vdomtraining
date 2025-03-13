import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, ObservedGlobalProps, PropertyChanged, Slot, Action, Bubbles } from 'ojs/ojvcomponent';
import { MenuButton as PreactMenuButton } from '@oracle/oraclejet-preact/UNSAFE_MenuButton';
import { Size } from '@oracle/oraclejet-preact/utils/UNSAFE_size';
import { ItemsMenu, MenuItemSelectionDetail, SelectMenuItemDetail, MenuSelection, MenuItems } from 'oj-c/utils/PRIVATE_ItemsMenu/items-menu';
export type { MenuValueUpdateDetail } from '@oracle/oraclejet-preact/UNSAFE_Menu/menuUtils';
export type { MenuSelection, MenuItems, MenuItemSelectionDetail, SelectMenuItemDetail } from 'oj-c/utils/PRIVATE_ItemsMenu/items-menu';
export type PreactMenuButtonProps = ComponentProps<typeof PreactMenuButton>;
import { ComponentProps, Ref, ComponentType } from 'preact';
import 'css!oj-c/menu-button/menu-button-styles.css';
type ItemsMenuProps = ComponentProps<typeof ItemsMenu>;
type ItemsMenuButtonProps = {
    items: MenuItems[];
};
type MenuButtonMenuSelectionDetail = SelectMenuItemDetail<MenuSelection>;
type Props = ObservedGlobalProps<'aria-describedby' | 'aria-label'> & {
    label: string;
    suffix?: string;
    tooltip?: string;
    startIcon?: Slot;
    endIcon?: Slot;
    items?: ItemsMenuButtonProps['items'];
    onOjMenuAction?: Action<MenuItemSelectionDetail> & Bubbles;
    onOjMenuSelection?: Action<MenuButtonMenuSelectionDetail> & Bubbles;
    selection?: ItemsMenuProps['selection'];
    onSelectionChanged?: PropertyChanged<ItemsMenuProps['selection']>;
    display?: 'all' | 'icons' | 'label';
    disabled?: boolean;
    size?: PreactMenuButtonProps['size'];
    width?: Size;
    chroming?: PreactMenuButtonProps['variant'];
};
type MenuButtonHandle = {
    focus: () => void;
    blur: () => void;
    click: () => void;
};
declare function MenuButtonImpl({ label, chroming, disabled, size, display, items, tooltip, suffix, startIcon, endIcon, selection, onSelectionChanged, onOjMenuAction, onOjMenuSelection, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width }: Props, ref: Ref<MenuButtonHandle>): import("preact").JSX.Element;
export declare const MenuButton: ComponentType<ExtendGlobalProps<ComponentProps<typeof MenuButtonImpl>>>;
export interface CMenuButtonElement extends JetElement<CMenuButtonElementSettableProperties>, CMenuButtonElementSettableProperties {
    addEventListener<T extends keyof CMenuButtonElementEventMap>(type: T, listener: (this: HTMLElement, ev: CMenuButtonElementEventMap[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CMenuButtonElementSettableProperties>(property: T): CMenuButtonElement[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CMenuButtonElementSettableProperties>(property: T, value: CMenuButtonElementSettableProperties[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CMenuButtonElementSettableProperties>): void;
    setProperties(properties: CMenuButtonElementSettablePropertiesLenient): void;
    blur: () => void;
    click: () => void;
    focus: () => void;
}
export namespace CMenuButtonElement {
    interface ojMenuAction extends CustomEvent<MenuItemSelectionDetail & {}> {
    }
    interface ojMenuSelection extends CustomEvent<MenuButtonMenuSelectionDetail & {}> {
    }
    type chromingChanged = JetElementCustomEventStrict<CMenuButtonElement['chroming']>;
    type disabledChanged = JetElementCustomEventStrict<CMenuButtonElement['disabled']>;
    type displayChanged = JetElementCustomEventStrict<CMenuButtonElement['display']>;
    type itemsChanged = JetElementCustomEventStrict<CMenuButtonElement['items']>;
    type labelChanged = JetElementCustomEventStrict<CMenuButtonElement['label']>;
    type selectionChanged = JetElementCustomEventStrict<CMenuButtonElement['selection']>;
    type sizeChanged = JetElementCustomEventStrict<CMenuButtonElement['size']>;
    type suffixChanged = JetElementCustomEventStrict<CMenuButtonElement['suffix']>;
    type tooltipChanged = JetElementCustomEventStrict<CMenuButtonElement['tooltip']>;
    type widthChanged = JetElementCustomEventStrict<CMenuButtonElement['width']>;
}
export interface CMenuButtonElementEventMap extends HTMLElementEventMap {
    'ojMenuAction': CMenuButtonElement.ojMenuAction;
    'ojMenuSelection': CMenuButtonElement.ojMenuSelection;
    'chromingChanged': JetElementCustomEventStrict<CMenuButtonElement['chroming']>;
    'disabledChanged': JetElementCustomEventStrict<CMenuButtonElement['disabled']>;
    'displayChanged': JetElementCustomEventStrict<CMenuButtonElement['display']>;
    'itemsChanged': JetElementCustomEventStrict<CMenuButtonElement['items']>;
    'labelChanged': JetElementCustomEventStrict<CMenuButtonElement['label']>;
    'selectionChanged': JetElementCustomEventStrict<CMenuButtonElement['selection']>;
    'sizeChanged': JetElementCustomEventStrict<CMenuButtonElement['size']>;
    'suffixChanged': JetElementCustomEventStrict<CMenuButtonElement['suffix']>;
    'tooltipChanged': JetElementCustomEventStrict<CMenuButtonElement['tooltip']>;
    'widthChanged': JetElementCustomEventStrict<CMenuButtonElement['width']>;
}
export interface CMenuButtonElementSettableProperties extends JetSettableProperties {
    chroming?: Props['chroming'];
    disabled?: Props['disabled'];
    display?: Props['display'];
    items?: Props['items'];
    label: Props['label'];
    selection?: Props['selection'];
    size?: Props['size'];
    suffix?: Props['suffix'];
    tooltip?: Props['tooltip'];
    width?: Props['width'];
}
export interface CMenuButtonElementSettablePropertiesLenient extends Partial<CMenuButtonElementSettableProperties> {
    [key: string]: any;
}
export interface MenuButtonIntrinsicProps extends Partial<Readonly<CMenuButtonElementSettableProperties>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    children?: import('preact').ComponentChildren;
    onojMenuAction?: (value: CMenuButtonElementEventMap['ojMenuAction']) => void;
    onojMenuSelection?: (value: CMenuButtonElementEventMap['ojMenuSelection']) => void;
    onchromingChanged?: (value: CMenuButtonElementEventMap['chromingChanged']) => void;
    ondisabledChanged?: (value: CMenuButtonElementEventMap['disabledChanged']) => void;
    ondisplayChanged?: (value: CMenuButtonElementEventMap['displayChanged']) => void;
    onitemsChanged?: (value: CMenuButtonElementEventMap['itemsChanged']) => void;
    onlabelChanged?: (value: CMenuButtonElementEventMap['labelChanged']) => void;
    onselectionChanged?: (value: CMenuButtonElementEventMap['selectionChanged']) => void;
    onsizeChanged?: (value: CMenuButtonElementEventMap['sizeChanged']) => void;
    onsuffixChanged?: (value: CMenuButtonElementEventMap['suffixChanged']) => void;
    ontooltipChanged?: (value: CMenuButtonElementEventMap['tooltipChanged']) => void;
    onwidthChanged?: (value: CMenuButtonElementEventMap['widthChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-menu-button': MenuButtonIntrinsicProps;
        }
    }
}
