define(["require", "exports", "preact/jsx-runtime", "./header", "./footer", "./content/index", "ojs/ojvcomponent", "preact/hooks", "preact-iso", "ojs/ojcontext", "preact"], function (require, exports, jsx_runtime_1, header_1, footer_1, index_1, ojvcomponent_1, hooks_1, preact_iso_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    const routeArray = [
        {
            path: "/bindings",
            detail: {
                label: "Bindings",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control",
            },
        },
        {
            path: "/modules",
            detail: {
                label: "Modules",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup",
            },
        },
        {
            path: "/examples",
            detail: {
                label: "Examples",
                iconClass: "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
            },
        },
    ];
    exports.App = (0, ojvcomponent_1.registerCustomElement)("app-root", (props) => {
        var _a, _b;
        const appName = (_a = props.appName) !== null && _a !== void 0 ? _a : "VDOM Training";
        const userLogin = (_b = props.userLogin) !== null && _b !== void 0 ? _b : "some.person@oracle.com";
        (0, hooks_1.useEffect)(() => {
            Context.getPageContext().getBusyContext().applicationBootstrapComplete();
        }, []);
        return ((0, jsx_runtime_1.jsx)(preact_iso_1.LocationProvider, { children: (0, jsx_runtime_1.jsxs)("div", { id: "appContainer", class: "oj-web-applayout-page", children: [(0, jsx_runtime_1.jsx)(header_1.Header, { appName: appName, userLogin: userLogin, routes: routeArray }), (0, jsx_runtime_1.jsx)(index_1.default, {}), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }) }));
    });
});
