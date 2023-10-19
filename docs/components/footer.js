define(["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _DEFAULT_LINKS = [
        {
            name: "About Oracle",
            linkId: "aboutOracle",
            linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about",
        },
        {
            name: "Contact Us",
            linkId: "contactUs",
            linkTarget: "http://www.oracle.com/us/corporate/contact/index.html",
        },
        {
            name: "Legal Notices",
            linkId: "legalNotices",
            linkTarget: "http://www.oracle.com/us/legal/index.html",
        },
        {
            name: "Terms Of Use",
            linkId: "termsOfUse",
            linkTarget: "http://www.oracle.com/us/legal/terms/index.html",
        },
        {
            name: "Your Privacy Rights",
            linkId: "yourPrivacyRights",
            linkTarget: "http://www.oracle.com/us/legal/privacy/index.html",
        },
    ];
    const Footer = ({ links = _DEFAULT_LINKS }) => {
        return ((0, jsx_runtime_1.jsxs)("footer", Object.assign({ class: "oj-web-applayout-footer", role: "contentinfo" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-footer-item oj-web-applayout-max-width" }, { children: (0, jsx_runtime_1.jsx)("ul", { children: links.map((item) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ id: item.linkId, href: item.linkTarget, target: "_blank" }, { children: item.name })) }))) }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-footer-item oj-web-applayout-max-width oj-text-secondary-color oj-text-sm" }, { children: "Copyright \u00A9 2014, 2023 Oracle and/or its affiliates All rights reserved." }))] })));
    };
    exports.default = Footer;
});
