define(["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "./menu-select-items", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, menu_select_items_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsMenu = void 0;
    const ItemsMenu = ({ items = [], selection = {}, onSelectionChanged, onOjMenuAction }) => {
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
        const getCommit = (key, selection) => {
            return (detail) => {
                onSelectionChanged?.(setSelectionValue(selection, key, detail.value));
            };
        };
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'divider':
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuSeparator, {});
                    case 'submenu':
                        if (item.items && item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.Submenu, { label: item.label, children: (0, jsx_runtime_1.jsx)(exports.ItemsMenu, { items: item.items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuAction: onOjMenuAction }) }));
                        }
                        return;
                    case 'selectsingle':
                        if (item.items && item.key) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectSingleMenuGroup, { value: getSingleGroupSelection(item.key), onCommit: getCommit(item.key, selection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case 'selectmultiple':
                        if (item.items && item.key) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMultipleMenuGroup, { value: getMultipleGroupSelection(item.key), onCommit: getCommit(item.key, selection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case undefined:
                    case 'item':
                        if (item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuItem, { label: item.label, isDisabled: item.disabled, variant: item.variant, startIcon: item.startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.startIcon }), endIcon: item.endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }), onAction: getItemActionHandler(item.key, item.onAction) }));
                        }
                        return;
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsMenu = ItemsMenu;
});
