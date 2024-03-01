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
    key?: string;
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
