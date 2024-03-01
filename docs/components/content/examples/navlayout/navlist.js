define(["require", "exports", "preact/jsx-runtime", "ojs/ojmutablearraytreedataprovider", "preact/hooks", "ojs/ojnavigationlist", "preact"], function (require, exports, jsx_runtime_1, ojmutablearraytreedataprovider_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavList = void 0;
    const navData = [
        {
            name: "Home",
            id: "home",
            icons: "oj-ux-ico-home",
        },
        {
            name: "Getting Started",
            id: "gettingstarted",
            icons: "oj-ux-ico-education",
            children: [
                {
                    name: "Download",
                    id: "download",
                },
                {
                    name: "Quick Start",
                    id: "quickstart",
                },
                {
                    name: "Build",
                    id: "build",
                },
                {
                    name: "Testing",
                    id: "testing",
                },
            ],
        },
        {
            name: "Cookbook",
            id: "cookbook",
            icons: "oj-ux-ico-book",
            children: [
                {
                    name: "Sample1",
                    id: "sample1",
                },
                {
                    name: "Sample2",
                    id: "sample2",
                },
                {
                    name: "Sample3",
                    id: "sample3",
                },
                {
                    name: "Sample4",
                    id: "sample4",
                },
            ],
        },
        {
            name: "Style Lab",
            id: "stylelab",
            icons: "oj-ux-ico-color-palette",
            disabled: "true",
        },
        {
            name: "Library",
            id: "libraray",
            icons: "oj-ux-ico-library",
            children: [
                {
                    name: "Articles",
                    id: "articles",
                    children: [
                        {
                            name: "News1",
                            id: "news1",
                        },
                        {
                            name: "News2",
                            id: "news2",
                        },
                        {
                            name: "News3",
                            id: "news3",
                        },
                        {
                            name: "News4",
                            id: "news4",
                        },
                    ],
                },
                {
                    name: "Audios",
                    id: "audios",
                },
                {
                    name: "Videos",
                    id: "videos",
                },
                {
                    name: "Magazines",
                    id: "magazines",
                },
            ],
        },
    ];
    const dataprovider = new ojmutablearraytreedataprovider_1.MutableArrayTreeDataProvider(navData, "id", {
        keyAttributeScope: "global",
    });
    const NavList = () => {
        const [selectedItem, setSelectedItem] = (0, hooks_1.useState)("home");
        const changeHandler = (event) => {
            if (event.detail.updatedFrom === "internal")
                setSelectedItem(event.detail.value);
        };
        const navItemTemplate = (item) => {
            return ((0, jsx_runtime_1.jsx)("li", { id: item.data.id, children: (0, jsx_runtime_1.jsxs)("a", { href: "", children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-navigationlist-item-icon " + item.data.icons }), item.data.name] }) }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: (0, jsx_runtime_1.jsx)("oj-navigation-list", { style: "max-width:20rem", drillMode: "collapsible", "aria-label": "Choose a navigation item", selection: selectedItem, data: dataprovider, onselectionChanged: changeHandler, id: "navlist", children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: navItemTemplate }) }) }));
    };
    exports.NavList = NavList;
});
