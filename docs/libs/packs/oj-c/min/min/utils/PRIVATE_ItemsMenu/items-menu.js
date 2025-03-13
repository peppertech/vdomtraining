define(["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "./menu-select-items", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, menu_select_items_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsMenu = void 0;
    const ItemsMenu = ({ items = [], selection = {}, onSelectionChanged, onOjMenuAction, isSplitMenu = false, onOjMenuSelection }) => {
        const getSingleGroupSelection = (key) => {
            const item = selection[key];
            return item && typeof item == 'string' ? item : undefined;
        };
        const getMultipleGroupSelection = (key) => {
            const item = selection[key];
            return Array.isArray(item) ? item : [];
        };
        const setSelectionValue = (selection, key, value) => {
            const updatedSelection = { ...selection };
            if (Array.isArray(value) && value.length === 0) {
                delete updatedSelection[key];
            }
            else {
                updatedSelection[key] = value;
            }
            return updatedSelection;
        };
        const getItemActionHandler = (key, onAction) => {
            return () => {
                onAction?.();
                onOjMenuAction?.({ key });
            };
        };
        function getCommit(key, selection, onSelection) {
            return (detail) => {
                onSelection?.({ value: detail.value, menuSelectionGroupKey: key });
                onOjMenuSelection?.({ value: detail.value, menuSelectionGroupKey: key });
                onSelectionChanged?.(setSelectionValue(selection, key, detail.value));
            };
        }
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'divider':
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuSeparator, {});
                    case 'submenu':
                        if (item.items && item.label && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.Submenu, { label: item.label, itemKey: item.key, children: (0, jsx_runtime_1.jsx)(exports.ItemsMenu, { items: item.items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) }));
                        }
                        return;
                    case 'selectsingle':
                        if (item.items && item.key && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectSingleMenuGroup, { groupKey: item.key, value: item.selection || getSingleGroupSelection(item.key), onCommit: getCommit(item.key, selection, item.onSelection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case 'selectmultiple':
                        if (item.items && item.key && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMultipleMenuGroup, { groupKey: item.key, value: item.selection || getMultipleGroupSelection(item.key), onCommit: getCommit(item.key, selection, item.onSelection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case undefined:
                    case 'item':
                        if (item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuItem, { itemKey: item.key, label: item.label, isDisabled: item.disabled, variant: !isSplitMenu ? item.variant : undefined, startIcon: !isSplitMenu &&
                                    item.startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.startIcon }), endIcon: !isSplitMenu &&
                                    item.endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }), onAction: getItemActionHandler(item.key, item.onAction) }));
                        }
                        return;
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsMenu = ItemsMenu;
});
