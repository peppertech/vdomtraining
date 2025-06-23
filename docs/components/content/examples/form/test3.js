define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojmutablearraydataprovider", "oj-c/list-view", "oj-c/list-item-layout", "ojs/ojlistview", "ojs/ojlistitemlayout", "oj-c/button"], function (require, exports, jsx_runtime_1, hooks_1, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test3 = void 0;
    const items1 = [
        {
            id: 0,
            label: "zero",
        },
    ];
    const items2 = [
        {
            id: 1,
            label: "one",
        },
        {
            id: 2,
            label: "two",
        },
        {
            id: 3,
            label: "three",
        },
    ];
    function Test3() {
        const [val, setVal] = (0, hooks_1.useState)(false);
        const revisionsDP = (0, hooks_1.useRef)(new MutableArrayDataProvider(items1, {
            keyAttributes: "id",
        }));
        (0, hooks_1.useEffect)(() => {
            revisionsDP.current.data = val ? items2 : items1;
        }, [revisionsDP, val]);
        const toggle = () => {
            setVal(!val);
        };
        const renderItemC = (item) => (0, jsx_runtime_1.jsx)("oj-c-list-item-layout", { children: item.data.label });
        const renderItem = (item) => (0, jsx_runtime_1.jsx)("oj-list-item-layout", { children: item.data.label });
        return ((0, jsx_runtime_1.jsxs)("div", { children: ["Click the button to toggle between \"0\" and \"1,2,3\" in each list view. The two lists should be the same", (0, jsx_runtime_1.jsxs)("div", { class: "oj-flex", children: [(0, jsx_runtime_1.jsxs)("div", { class: "oj-sm-flex-1  oj-sm-margin-4x", children: [(0, jsx_runtime_1.jsx)("div", { children: "oj-c-list-view" }), (0, jsx_runtime_1.jsx)("oj-c-list-view", { data: revisionsDP.current, class: "oj-bg-neutral-20", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderItemC }) })] }), (0, jsx_runtime_1.jsxs)("div", { class: "oj-sm-flex-1 oj-sm-margin-4x", children: [(0, jsx_runtime_1.jsx)("div", { children: "oj-list-view" }), (0, jsx_runtime_1.jsx)("oj-list-view", { data: revisionsDP.current, class: "oj-bg-neutral-20", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderItem }) })] })] }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("oj-c-button", { onojAction: toggle, label: "toggle" })] }));
    }
    exports.Test3 = Test3;
});
