import { MenuValueUpdateDetail } from '@oracle/oraclejet-preact/UNSAFE_Menu/menuUtils';
export type { MenuValueUpdateDetail } from '@oracle/oraclejet-preact/UNSAFE_Menu/menuUtils';
export type MenuIcon = {
    type?: 'class';
    class: string;
} | {
    type: 'img';
    src: string;
};
export type MenuSelectItem = {
    label: string;
    disabled?: boolean;
    endIcon?: MenuIcon;
    value: string;
};
export interface MenuItemSelectionDetail {
    key: string;
}
export type MenuSelection = string | Array<string>;
export type MenuSeparator = {
    type: 'separator' | 'divider';
};
export type MenuItem = {
    type?: 'item';
    label: string;
    key: string;
    disabled?: boolean;
    onAction?: () => void;
    startIcon?: MenuIcon;
    endIcon?: MenuIcon;
    variant?: 'standard' | 'destructive';
};
export type MenuSubMenu = {
    key?: string;
    type: 'submenu';
    label?: string;
    disabled?: boolean;
    startIcon?: string;
    items?: Array<MenuItems>;
};
export type MenuSelectSingle = {
    type: 'selectsingle';
    key: string;
    items?: Array<MenuSelectItem>;
};
export type MenuSelectMultiple = {
    type: 'selectmultiple';
    key: string;
    items?: Array<MenuSelectItem>;
};
export type MenuItems = MenuSeparator | MenuItem | MenuSubMenu | MenuSelectSingle | MenuSelectMultiple;
type ContextMenuSeparator = {
    type: 'separator';
};
type ContextMenuSubMenu = Omit<MenuSubMenu, 'items'> & {
    items?: Array<ContextMenuItems>;
};
export type ContextMenuSelectSingle = MenuSelectSingle & {
    selection?: string;
    onSelection?: (detail: SelectMenuItemDetail<string>) => void;
};
export type ContextMenuSelectMultiple = MenuSelectMultiple & {
    selection?: Array<string>;
    onSelection?: (detail: SelectMenuItemDetail<Array<string>>) => void;
};
export type SelectMenuItemDetail<T extends MenuSelection> = {
    value: MenuValueUpdateDetail<T>['value'];
    menuSelectionGroupKey: string;
};
export type ContextMenuItems = ContextMenuSeparator | MenuItem | ContextMenuSubMenu | ContextMenuSelectSingle | ContextMenuSelectMultiple;
