define(["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/UNSAFE_Toolbar", "oj-c/button", "oj-c/menu-button", "oj-c/split-menu-button", "oj-c/utils/PRIVATE_ItemsMenu/menu-item-icon", "oj-c/buttonset-single", "oj-c/buttonset-multiple", "oj-c/toggle-button", "oj-c/progress-button"], function (require, exports, jsx_runtime_1, UNSAFE_Toolbar_1, button_1, menu_button_1, split_menu_button_1, menu_item_icon_1, buttonset_single_1, buttonset_multiple_1, toggle_button_1, progress_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsToolbar = void 0;
    const ItemsToolbar = ({ items = [], size, chroming, toolbarSelection = {}, onToolbarSelectionChanged, onOjToolbarAction, onOjToolbarSelection }) => {
        const setSelectionValue = (selection, value, key, menuButtonSelection = {}) => {
            let updatedSelection = { ...selection };
            if (!key) {
                for (const k in menuButtonSelection) {
                    if (!(k in value))
                        delete updatedSelection[k];
                }
                updatedSelection = { ...updatedSelection, ...value };
            }
            else {
                if (Array.isArray(value) && value.length === 0) {
                    delete updatedSelection[key];
                }
                else {
                    updatedSelection[key] = value;
                }
            }
            return updatedSelection;
        };
        const getItemActionHandler = (key, onAction) => {
            return () => {
                onAction?.();
                onOjToolbarAction?.({ key });
            };
        };
        const getSelectionChanges = (selection, key = '', value) => {
            onOjToolbarSelection?.({ value: value, toolbarSelectionGroupKey: key });
            onToolbarSelectionChanged?.(setSelectionValue(selection, value, key));
        };
        const getMenuButtonSelection = (toolbarSelection, menuItems, menuButtonSelection) => {
            menuItems?.forEach((item) => {
                if (item.type === 'selectsingle' || item.type === 'selectmultiple') {
                    if (item.key in toolbarSelection) {
                        menuButtonSelection[item.key] = toolbarSelection[item.key];
                    }
                }
                else if (item.type === 'submenu') {
                    menuButtonSelection = getMenuButtonSelection(toolbarSelection, item.items, menuButtonSelection);
                }
            });
            return menuButtonSelection;
        };
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'button': {
                        const { startIcon, endIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(button_1.Button, { ...props, chroming: itemChroming || chroming, size: size, onOjAction: getItemActionHandler(item.key, item.onAction), startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'menu-button': {
                        const { startIcon, endIcon, items: menuItems, chroming: itemChroming, ...props } = item;
                        let menuButtonSelection = {};
                        menuButtonSelection = getMenuButtonSelection(toolbarSelection, menuItems, menuButtonSelection);
                        return ((0, jsx_runtime_1.jsx)(menu_button_1.MenuButton, { ...props, items: menuItems, chroming: itemChroming || chroming, size: size, onOjMenuAction: getItemActionHandler(''), selection: menuButtonSelection, onOjMenuSelection: (value) => {
                                onOjToolbarSelection?.({
                                    value: value,
                                    toolbarSelectionGroupKey: ''
                                });
                            }, onSelectionChanged: (value) => {
                                onToolbarSelectionChanged?.(setSelectionValue(toolbarSelection, value, '', menuButtonSelection));
                            }, startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'split-menu-button': {
                        return ((0, jsx_runtime_1.jsx)(split_menu_button_1.SplitMenuButton, { size: size, ...item, onOjAction: getItemActionHandler(item.key, item.onAction) }));
                    }
                    case 'buttonset-single': {
                        const { chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(buttonset_single_1.ButtonsetSingle, { chroming: itemChroming || chroming, size: size, ...props, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            } }));
                    }
                    case 'buttonset-multiple': {
                        const { chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(buttonset_multiple_1.ButtonsetMultiple, { chroming: itemChroming || chroming, size: size, ...props, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            } }));
                    }
                    case 'toggle-button': {
                        const { startIcon, endIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(toggle_button_1.ToggleButton, { chroming: itemChroming || chroming, size: size, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            }, ...props, startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'progress-button': {
                        const { startIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(progress_button_1.ProgressButton, { chroming: itemChroming || chroming, size: size, ...props, onOjAction: getItemActionHandler(item.key, item.onAction), startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }) }));
                    }
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Toolbar_1.ToolbarSeparator, {});
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsToolbar = ItemsToolbar;
});
