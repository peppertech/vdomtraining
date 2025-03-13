define(["require", "exports", "preact/jsx-runtime", "./collection/index", "./form/index", "./dataviz/index", "./control/index", "./navlayout/index", "preact/hooks", "ojs/ojmutablearraydataprovider", "ojs/ojurlparamadapter", "preact", "ojs/ojnavigationlist"], function (require, exports, jsx_runtime_1, index_1, index_2, index_3, index_4, index_5, hooks_1, MutableArrayDataProvider, UrlParamAdapter) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let exampleRouter = null;
    const ExampleContent = (props) => {
        const [activeTab, setActiveTab] = (0, hooks_1.useState)("collection");
        const tabs = [
            { path: "", redirect: "collection" },
            { path: "collection", label: "Collection", detail: {} },
            { path: "form", label: "Form", detail: {} },
            { path: "dataviz", label: "Data Visualization", detail: {} },
            { path: "control", label: "Control", detail: {} },
            { path: "navlayout", label: "Navigation and Layout", detail: {} },
        ];
        if (!props.router.childRouter) {
            exampleRouter = props.router.createChildRouter(tabs, {
                urlAdapter: new UrlParamAdapter(),
            });
        }
        (0, hooks_1.useEffect)(() => {
            if (exampleRouter) {
                exampleRouter.currentState.subscribe(routerUpdated);
                exampleRouter.sync();
            }
        }, []);
        const routerUpdated = (actionable) => {
            var _a;
            const newPath = (_a = actionable.state) === null || _a === void 0 ? void 0 : _a.path;
            setActiveTab(newPath);
        };
        const tabbarDP = new MutableArrayDataProvider(tabs.slice(0), {
            keyAttributes: "path",
        });
        const loadTabContent = (event) => {
            setActiveTab(event.detail.value);
            exampleRouter.go({ path: event.detail.value });
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
