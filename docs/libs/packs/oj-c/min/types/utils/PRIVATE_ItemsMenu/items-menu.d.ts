import { ContextMenuItems, MenuSelection, MenuItemSelectionDetail, SelectMenuItemDetail } from './menuTypes';
export { MenuItem, MenuItems, ContextMenuItems, MenuSeparator, MenuSelection, MenuItemSelectionDetail, MenuIcon, MenuSelectItem, SelectMenuItemDetail } from './menuTypes';
type ItemsMenuMenuItems = (ContextMenuItems | {
    type: 'divider';
})[];
type Props = {
    items?: ItemsMenuMenuItems;
    selection?: Readonly<Record<string, MenuSelection>>;
    onSelectionChanged?: (value: Readonly<Record<string, MenuSelection>>) => void;
    onOjMenuAction?: (details: MenuItemSelectionDetail) => void;
    onOjMenuSelection?: (details: SelectMenuItemDetail<string | Array<string>> & {
        menuSelectionGroupKey: string;
    }) => void;
    isSplitMenu?: boolean;
};
export declare const ItemsMenu: ({ items, selection, onSelectionChanged, onOjMenuAction, isSplitMenu, onOjMenuSelection }: Props) => import("preact").JSX.Element;
