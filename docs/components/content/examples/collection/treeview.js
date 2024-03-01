define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/treeviewData.json", "ojs/ojarraytreedataprovider", "ojs/ojkeyset", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojtreeview"], function (require, exports, jsx_runtime_1, hooks_1, treeviewData, ArrayTreeDataProvider, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const actionColumn = (item) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-treeview-item-icon" }), (0, jsx_runtime_1.jsx)("span", { class: "oj-treeview-item-text", children: item.data.title })] }));
    const data = new ArrayTreeDataProvider(JSON.parse(treeviewData), {
        keyAttributes: "id",
    });
    const INIT_SELECTED = new ojkeyset_1.KeySetImpl([]);
    const Treeview = () => {
        const [selected, setselected] = (0, hooks_1.useState)(INIT_SELECTED);
        const [listofSelected, setlistofSelected] = (0, hooks_1.useState)("nothing selected yet");
        const handleSelectedChanged = (0, hooks_1.useCallback)((event) => {
            setselected(event.detail.value);
            let tempArray = [];
            event.detail.value
                .values()
                .forEach((value) => {
                tempArray.push(value);
            });
            let list = tempArray.toString().replaceAll(",", " ");
            setlistofSelected(list != "" ? list : "Nothing selected");
        }, [selected, setselected]);
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-md-margin-4x-horizontal", children: [(0, jsx_runtime_1.jsx)("oj-tree-view", { id: "treeview", data: data, onselectedChanged: handleSelectedChanged, selectionMode: "leafOnly", "aria-label": "Tree View with JSON Data", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: actionColumn }) }), (0, jsx_runtime_1.jsx)("div", { class: "selected-list", children: listofSelected })] }));
    };
    exports.default = Treeview;
});
