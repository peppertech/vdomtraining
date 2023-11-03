define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojresponsiveutils", "ojs/ojarraydataprovider", "ojs/ojtoolbar", "ojs/ojmenu", "ojs/ojbutton", "ojs/ojnavigationlist"], function (require, exports, jsx_runtime_1, hooks_1, ResponsiveUtils, ArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Header = void 0;
    const Header = (props) => {
        const [selectedPage, setSelectedPage] = (0, hooks_1.useState)(props.page ? props.page : "bindings");
        const mediaQueryRef = (0, hooks_1.useRef)(window.matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")));
        const [isSmallWidth, setIsSmallWidth] = (0, hooks_1.useState)(mediaQueryRef.current.matches);
        (0, hooks_1.useEffect)(() => {
            mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
            return () => mediaQueryRef.current.removeEventListener("change", handleMediaQueryChange);
        }, [mediaQueryRef]);
        const handleMediaQueryChange = (e) => {
            setIsSmallWidth(e.matches);
        };
        const getDisplayType = () => {
            return isSmallWidth ? "icons" : "all";
        };
        const routesDP = new ArrayDataProvider(props.routes.slice(1), {
            keyAttributes: "path",
        });
        const pageChangeHandler = (event) => {
            if (event.detail.updatedFrom === "internal")
                props.onPageChanged(event.detail.value);
        };
        const renderNavList = (item) => {
            return ((0, jsx_runtime_1.jsx)("li", Object.assign({ id: item.data.path }, { children: (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: "#" }, { children: [(0, jsx_runtime_1.jsx)("span", { class: item.data.detail.iconClass }), getDisplayType() === "all" ? item.data.detail.label : ""] })) })));
        };
        return ((0, jsx_runtime_1.jsx)("header", Object.assign({ role: "banner", class: "oj-web-applayout-header" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-bar-middle oj-sm-align-items-baseline" }, { children: [(0, jsx_runtime_1.jsx)("span", { role: "img", class: "oj-icon demo-oracle-icon", title: "Oracle Logo", alt: "Oracle Logo" }), (0, jsx_runtime_1.jsx)("h1", Object.assign({ class: "oj-sm-only-hide oj-web-applayout-header-title", title: "Virtual DOM Training Application" }, { children: props.appName }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex-bar-end" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ role: "navigation", class: "oj-web-applayout-max-width oj-web-applayout-navbar" }, { children: (0, jsx_runtime_1.jsx)("oj-navigation-list", Object.assign({ selection: props.page, edge: "top", id: "navilist1", "aria-label": "Main navigation, select a page", onselectionChanged: pageChangeHandler, drillMode: "none", data: routesDP }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderNavList }) })) })) }))] })) })));
    };
    exports.Header = Header;
});
