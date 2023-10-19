define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojkeyset", "text!./data/peopleData.json", "ojs/ojmutablearraydataprovider", "ojs/ojbutton", "ojs/ojlistview", "ojs/ojlistitemlayout", "ojs/ojavatar", "ojs/ojtoolbar", "ojs/ojselector"], function (require, exports, jsx_runtime_1, hooks_1, ojkeyset_1, peopleData, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dataProvider = new MutableArrayDataProvider(JSON.parse(peopleData), {
        keyAttributes: "id",
    });
    const gridlinesItemVisible = { item: "visible" };
    const INIT_SELECTEDITEMS = new ojkeyset_1.KeySetImpl([]);
    const ListView = () => {
        const [selectedItems, setselectedItems] = (0, hooks_1.useState)(INIT_SELECTEDITEMS);
        const handleSelectedChanged = (event) => {
            setselectedItems(event.detail.value);
        };
        const renderListItem = (0, hooks_1.useCallback)((item) => {
            return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("oj-list-item-layout", { children: [(0, jsx_runtime_1.jsx)("oj-selector", { "aria-label": "selector", slot: "selector", selectedKeys: selectedItems, onselectedKeysChanged: handleSelectedChanged, selectionMode: "multiple", rowKey: item.data.id, id: "listview_checkboxset" + item.data.id }), (0, jsx_runtime_1.jsx)("oj-avatar", { slot: "leading", shape: "square", size: "sm", src: item.data.image }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-typography-body-md oj-typography-bold" }, { children: item.data.name })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "secondary", class: "oj-typography-body-sm" }, { children: item.data.department })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "action" }, { children: (0, jsx_runtime_1.jsxs)("oj-toolbar", Object.assign({ "aria-label": "Toolbar", chroming: "borderless" }, { children: [(0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "save" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-save" }), "Save"] })), (0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "download" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-download" }), "Download"] })), (0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "print" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-print" }), "Print"] }))] })) }))] }) }));
        }, [selectedItems]);
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsx)("oj-list-view", Object.assign({ id: "listview", "aria-label": "list of employees", data: dataProvider, gridlines: gridlinesItemVisible, selectionMode: "multiple", onselectedChanged: handleSelectedChanged, selected: selectedItems, class: "listview-sizing" }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderListItem }) })) })));
    };
    exports.default = ListView;
});
