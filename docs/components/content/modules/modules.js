define(["require", "exports", "preact/jsx-runtime", "preact", "preact/hooks", "ojs/ojbutton"], function (require, exports, jsx_runtime_1, preact_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Page1() {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: "This is Page 1 content" }), (0, jsx_runtime_1.jsx)("div", {})] }));
    }
    function Page2() {
        return (0, jsx_runtime_1.jsx)("div", { children: "This is Page 2 content" });
    }
    function Page3() {
        return (0, jsx_runtime_1.jsx)("div", { children: "This is Page 3 content" });
    }
    function Active() {
        return (0, jsx_runtime_1.jsx)("div", { children: "This is the active component" });
    }
    function NotActive() {
        return (0, jsx_runtime_1.jsx)("div", { children: "This is the inactive component" });
    }
    const FragmentChild = ((0, jsx_runtime_1.jsxs)(preact_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { children: "Item 3" }), (0, jsx_runtime_1.jsx)("li", { children: "Item 4" })] }));
    function FragmentParent() {
        return ((0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "Item 1" }), (0, jsx_runtime_1.jsx)("li", { children: "Item 2" }), FragmentChild] }));
    }
    const PageContent = (props) => {
        switch (props.pageName) {
            case "Page1":
                return (0, jsx_runtime_1.jsx)(Page1, {});
            case "Page2":
                return (0, jsx_runtime_1.jsx)(Page2, {});
            case "Page3":
                return (0, jsx_runtime_1.jsx)(Page3, {});
            default:
                return (0, jsx_runtime_1.jsx)(Page1, {});
        }
    };
    const Modules = () => {
        const [isActive, setIsActive] = (0, hooks_1.useState)(true);
        const [pageName, setPageName] = (0, hooks_1.useState)("Page3");
        const toggleActive = () => {
            isActive ? setIsActive(false) : setIsActive(true);
        };
        const pageChangeHandler = (event) => {
            setPageName(event.detail.value);
        };
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "In the JET MVVM architecture it was very common to use an oj-module element to load different pages or sections of pages. With VDOM you will never use an oj-module element. Usually you will use components for the parts of your content. You can also use a special kind of content called a Fragment. These are then loaded using JSX." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "activeBtn", onojAction: toggleActive }, { children: "Toggle Active State" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-panel-shadow-sm oj-sm-margin-2x-top oj-sm-margin-6x-bottom" }, { children: isActive ? (0, jsx_runtime_1.jsx)(Active, {}) : (0, jsx_runtime_1.jsx)(NotActive, {}) })), (0, jsx_runtime_1.jsxs)("oj-buttonset-one", Object.assign({ id: "pageset", value: pageName, onvalueChanged: pageChangeHandler, "aria-label": "Choose a page." }, { children: [(0, jsx_runtime_1.jsx)("oj-option", Object.assign({ value: "Page1" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Page 1" }) })), (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ value: "Page2" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Page 2" }) })), (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ value: "Page3" }, { children: (0, jsx_runtime_1.jsx)("span", { children: "Page 3" }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-panel-shadow-sm oj-sm-margin-2x-top oj-sm-margin-6x-bottom" }, { children: (0, jsx_runtime_1.jsx)(PageContent, { pageName: pageName }) })), (0, jsx_runtime_1.jsx)("p", { children: "A Fragment can be used to return DOM that does not require a wrapping or parent DOM element like normal Functional component does. In the example below, a Functional component us returning an unordered list. This works fine because the <ul> element can be used as the parent node. However if you wanted to dynamically insert some <li> elements using a different Functional component, this would work because it's not valid to return multiple elements at the root level of the render method. This is where a Fragment comes in. You would use the <Fragment> element to wrap the <li> elements that you want to be inserted into the first components unordered list. The Fragment will return the DOM elements without a wrapping element." }), (0, jsx_runtime_1.jsx)(FragmentParent, {})] }));
    };
    exports.default = Modules;
});
