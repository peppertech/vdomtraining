define(["require", "exports", "preact/jsx-runtime", "./header", "./footer", "./content/index", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcorerouter", "ojs/ojurlparamadapter", "ojs/ojcontext", "preact"], function (require, exports, jsx_runtime_1, header_1, footer_1, index_1, ojvcomponent_1, hooks_1, CoreRouter, UrlParamAdapter, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    const routeArray = [
        { path: "", redirect: "bindings" },
        {
            path: "bindings",
            detail: {
                label: "Bindings",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control",
            },
        },
        {
            path: "modules",
            detail: {
                label: "Modules",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup",
            },
        },
        {
            path: "examples",
            detail: {
                label: "Examples",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
            },
        },
    ];
    const router = new CoreRouter(routeArray, {
        urlAdapter: new UrlParamAdapter(),
    });
    const pageChangeHandler = (value) => {
        router.go({ path: value });
    };
    exports.App = (0, ojvcomponent_1.registerCustomElement)("app-root", (props) => {
        props.appName = "VDOM Training";
        props.userLogin = "some.person@oracle.com";
        const [routePath, setRoutePath] = (0, hooks_1.useState)("");
        (0, hooks_1.useEffect)(() => {
            Context.getPageContext().getBusyContext().applicationBootstrapComplete();
            router.currentState.subscribe(routerUpdated);
            router.sync();
        }, []);
        const routerUpdated = (actionable) => {
            var _a;
            const newPath = (_a = actionable.state) === null || _a === void 0 ? void 0 : _a.path;
            setRoutePath(newPath);
        };
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "appContainer", class: "oj-web-applayout-page" }, { children: [(0, jsx_runtime_1.jsx)(header_1.Header, { appName: props.appName, page: routePath, onPageChanged: pageChangeHandler, userLogin: props.userLogin, routes: routeArray }), (0, jsx_runtime_1.jsx)(index_1.default, { page: routePath }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] })));
    }, "App", { "properties": { "appName": { "type": "string" }, "userLogin": { "type": "string" } } });
});
