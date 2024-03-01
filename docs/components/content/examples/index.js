define(["require", "exports", "preact/jsx-runtime", "./collection/index", "./form/index", "./dataviz/index", "./control/index", "./navlayout/index", "preact/hooks", "ojs/ojmutablearraydataprovider", "ojs/ojnavigationlist"], function (require, exports, jsx_runtime_1, index_1, index_2, index_3, index_4, index_5, hooks_1, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ExampleContent = () => {
        const [activeTab, setActiveTab] = (0, hooks_1.useState)("collection");
        const tabs = [
            { value: "collection", label: "Collection" },
            { value: "form", label: "Form" },
            { value: "dataviz", label: "Data Visualization" },
            { value: "control", label: "Control" },
            { value: "navlayout", label: "Navigation and Layout" },
        ];
        const tabbarDP = new MutableArrayDataProvider(tabs, {
            keyAttributes: "value",
        });
        const loadTabContent = (event) => {
            setActiveTab(event.detail.value);
        };
        let pageContent = () => {
            switch (activeTab) {
                case "form":
                    return (0, jsx_runtime_1.jsx)(index_2.default, {});
                case "collection":
                    return (0, jsx_runtime_1.jsx)(index_1.default, {});
                case "dataviz":
                    return (0, jsx_runtime_1.jsx)(index_3.default, {});
                case "control":
                    return (0, jsx_runtime_1.jsx)(index_4.default, {});
                case "navlayout":
                    return (0, jsx_runtime_1.jsx)(index_5.default, {});
                default:
                    return (0, jsx_runtime_1.jsx)(index_1.default, {});
            }
        };
        const tabItemTemplate = (item) => {
            return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("a", { href: "#", children: [(0, jsx_runtime_1.jsx)("span", {}), item.data.label] }) }));
        };
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("h1", { class: "oj-typography-heading-lg", children: " Examples " }), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("oj-tab-bar", { edge: "top", data: tabbarDP, selection: activeTab, onselectionChanged: loadTabContent, children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: tabItemTemplate }) }), (0, jsx_runtime_1.jsx)("div", { class: "oj-flex-item oj-sm-margin-6x-bottom oj-sm-12", children: pageContent() })] }));
    };
    exports.default = ExampleContent;
});
