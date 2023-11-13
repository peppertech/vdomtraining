define('components/header',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojresponsiveutils", "ojs/ojarraydataprovider", "ojs/ojtoolbar", "ojs/ojmenu", "ojs/ojbutton", "ojs/ojnavigationlist"], function (require, exports, jsx_runtime_1, hooks_1, ResponsiveUtils, ArrayDataProvider) {
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

define('components/footer',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
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

define('components/content/bindings/attributes',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Attributes = (props) => {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: props.testId }, { children: [(0, jsx_runtime_1.jsx)("p", { children: props.message }), (0, jsx_runtime_1.jsx)("p", { children: "The code will look something like this:" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel" }, { children: (0, jsx_runtime_1.jsxs)("code", { children: ["return (", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "<div id={props.testId}>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "{props.message}", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "</div>", (0, jsx_runtime_1.jsx)("br", {}), ");"] }) })), (0, jsx_runtime_1.jsx)("p", { children: "with the value for the id and the message sent in as props" })] })));
    };
    exports.default = Attributes;
});

define('components/content/bindings/jetattributes',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const JETAttr = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "When using JET, if you wanted to bind the id of a div, and the content inside of that div, you would use a : (colon) in front of the id attribute and an oj-bind-text element for the content. It would look something like this:" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-sm-margin-4x-bottom" }, { children: (0, jsx_runtime_1.jsxs)("code", { children: ['<div :id="[[testId]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", '<oj-bind-text value="[[message]]"></oj-bind-text>', (0, jsx_runtime_1.jsx)("br", {}), '</div>'] }) }))] }));
    };
    exports.default = JETAttr;
});

define('components/content/bindings/jetforeach',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const JETforeach = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "JET also provided a binding element for iterating over an array of data. The oj-bind-for-each element looked something like the below code." }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-sm-margin-4x-bottom" }, { children: (0, jsx_runtime_1.jsx)("code", { children: (0, jsx_runtime_1.jsxs)("div", { children: ['<oj-bind-for-each data="[[itemList]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", '<template data-oj-as="item">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", '<div :id="[[item.detail.id]]">', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0", '<oj-bind-text value="[[item.detail.message]]"></oj-bind-text>', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "</div>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "</template>", (0, jsx_runtime_1.jsx)("br", {}), "</oj-bind-for-each>"] }) }) }))] }));
    };
    exports.default = JETforeach;
});

define('components/content/bindings/foreach',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Foreach = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: "VDOM does not have a view and viewModel like JET MVVM does. It is all done in the TypeScript file. Iterating over an array of data is done using the JavaScript Map() method." }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-panel oj-sm-margin-4x-bottom" }, { children: (0, jsx_runtime_1.jsx)("code", { children: (0, jsx_runtime_1.jsxs)("div", { children: ["return (", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "<ul>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "{", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0", "itemList.map((item) => (", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0\u00A0", "<li>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0\u00A0\u00A0", '<a id={item.id} href={item.linkTarget} target="_blank">{item.message}</a>', (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0\u00A0\u00A0", "</a>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0\u00A0", "</li>", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0\u00A0", "))", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0\u00A0", "}", (0, jsx_runtime_1.jsx)("br", {}), "\u00A0", "</ul>", (0, jsx_runtime_1.jsx)("br", {}), ")"] }) }) })), (0, jsx_runtime_1.jsx)("p", { children: "Notice that the arrow function inside the map() method, uses parenthesis and not curly braces? This is a bit of a shortcut provided by JSX. If you use curly braces, you would then have to provide a return method with parenthesis inside of that." })] }));
    };
    exports.default = Foreach;
});

define('components/content/bindings/index',["require", "exports", "preact/jsx-runtime", "./attributes", "./jetattributes", "./jetforeach", "./foreach"], function (require, exports, jsx_runtime_1, attributes_1, jetattributes_1, jetforeach_1, foreach_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const BindingContent = () => {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ class: "oj-typography-heading-lg" }, { children: " Bindings" })), (0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: "All binding is done using JSX." })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h3", Object.assign({ class: "oj-typography-heading-xs" }, { children: "Attribute and Text" })), (0, jsx_runtime_1.jsx)(jetattributes_1.default, {}), (0, jsx_runtime_1.jsx)(attributes_1.default, { testId: "fred", message: "In VDOM, both the id and the content are defined using JSX and props" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h3", Object.assign({ class: "oj-typography-heading-xs" }, { children: "For-Each" })), (0, jsx_runtime_1.jsx)(jetforeach_1.default, {}), (0, jsx_runtime_1.jsx)(foreach_1.default, {})] })));
    };
    exports.default = BindingContent;
});

define('components/content/modules/modules',["require", "exports", "preact/jsx-runtime", "preact", "preact/hooks", "ojs/ojbutton"], function (require, exports, jsx_runtime_1, preact_1, hooks_1) {
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

define('components/content/modules/index',["require", "exports", "preact/jsx-runtime", "./modules"], function (require, exports, jsx_runtime_1, modules_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ModulesContent = () => {
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ class: "oj-typography-heading-lg" }, { children: " Modules " })), (0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: "oj-module element is replaced by components." })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("h3", Object.assign({ class: "oj-typography-heading-xs" }, { children: "Modules / Templates" })), (0, jsx_runtime_1.jsx)(modules_1.default, {})] })));
    };
    exports.default = ModulesContent;
});

/**
 * @license text 2.0.16 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {
    'use strict';

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }

    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
        if (port1 === port2) {
            return true;
        } else if (protocol1 === protocol2) {
            if (protocol1 === 'http') {
                return useDefault(port1, '80') === useDefault(port2, '80');
            } else if (protocol1 === 'https') {
                return useDefault(port1, '443') === useDefault(port2, '443');
            }
        }
        return false;
    }

    text = {
        version: '2.0.16',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.lastIndexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || isSamePort(uProtocol, uPort, protocol, port));
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'] &&
            !process.versions['atom-shell'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file[0] === '\uFEFF') {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});


define('text!components/content/examples/collection/data/departmentData.json',[],function () { return '[\r\n  {\r\n    "DepartmentId": 10,\r\n    "DepartmentName": "Finance 9",\r\n    "LocationId": 300,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2014-06-13",\r\n    "EmployeeCount": 335,\r\n    "Type": "Sales",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 20,\r\n    "DepartmentName": "Control And Credit 9",\r\n    "LocationId": 300,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2019-09-10",\r\n    "EmployeeCount": 206,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 30,\r\n    "DepartmentName": "Purchasing 28",\r\n    "LocationId": 400,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2021-01-03",\r\n    "EmployeeCount": 473,\r\n    "Type": "HR",\r\n    "Currency": "JPY",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 40,\r\n    "DepartmentName": "Purchasing 27",\r\n    "LocationId": 400,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2016-02-01",\r\n    "EmployeeCount": 369,\r\n    "Type": "Finance",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 5,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 50,\r\n    "DepartmentName": "Shipping 4",\r\n    "LocationId": 300,\r\n    "ManagerId": 2001,\r\n    "StartDate": "2014-07-31",\r\n    "EmployeeCount": 476,\r\n    "Type": "HR",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 60,\r\n    "DepartmentName": "Finance 10",\r\n    "LocationId": 400,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2017-01-17",\r\n    "EmployeeCount": 304,\r\n    "Type": "Sales",\r\n    "Currency": "JPY",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 70,\r\n    "DepartmentName": "Operations 9",\r\n    "LocationId": 400,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2015-05-24",\r\n    "EmployeeCount": 334,\r\n    "Type": "Sales",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 80,\r\n    "DepartmentName": "Sales and Marketing 18",\r\n    "LocationId": 500,\r\n    "ManagerId": 4001,\r\n    "StartDate": "2017-03-25",\r\n    "EmployeeCount": 211,\r\n    "Type": "Finance",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 90,\r\n    "DepartmentName": "Inventory 6",\r\n    "LocationId": 400,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2017-12-18",\r\n    "EmployeeCount": 429,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 1,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 100,\r\n    "DepartmentName": "Billing 22",\r\n    "LocationId": 400,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2014-06-26",\r\n    "EmployeeCount": 219,\r\n    "Type": "Sales",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 110,\r\n    "DepartmentName": "Finance 1",\r\n    "LocationId": 100,\r\n    "ManagerId": 3001,\r\n    "StartDate": "2020-02-12",\r\n    "EmployeeCount": 412,\r\n    "Type": "Finance",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 120,\r\n    "DepartmentName": "Sales and Marketing 28",\r\n    "LocationId": 300,\r\n    "ManagerId": 2001,\r\n    "StartDate": "2014-07-11",\r\n    "EmployeeCount": 373,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 130,\r\n    "DepartmentName": "Operations 22",\r\n    "LocationId": 300,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2015-05-26",\r\n    "EmployeeCount": 245,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 140,\r\n    "DepartmentName": "Human Resources 22",\r\n    "LocationId": 200,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2015-09-08",\r\n    "EmployeeCount": 217,\r\n    "Type": "Finance",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 5,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 150,\r\n    "DepartmentName": "Shipping 17",\r\n    "LocationId": 300,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2017-10-04",\r\n    "EmployeeCount": 441,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 160,\r\n    "DepartmentName": "Administration 8",\r\n    "LocationId": 400,\r\n    "ManagerId": 2001,\r\n    "StartDate": "2014-12-21",\r\n    "EmployeeCount": 332,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 170,\r\n    "DepartmentName": "Purchasing 14",\r\n    "LocationId": 400,\r\n    "ManagerId": 4001,\r\n    "StartDate": "2019-01-25",\r\n    "EmployeeCount": 282,\r\n    "Type": "Marketing",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 180,\r\n    "DepartmentName": "Operations 13",\r\n    "LocationId": 400,\r\n    "ManagerId": 2001,\r\n    "StartDate": "2016-01-18",\r\n    "EmployeeCount": 336,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 4,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 190,\r\n    "DepartmentName": "Control And Credit 18",\r\n    "LocationId": 100,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2014-03-11",\r\n    "EmployeeCount": 391,\r\n    "Type": "Sales",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 4,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 200,\r\n    "DepartmentName": "Purchasing 10",\r\n    "LocationId": 200,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2014-02-06",\r\n    "EmployeeCount": 211,\r\n    "Type": "Sales",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 4,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 210,\r\n    "DepartmentName": "Finance 2",\r\n    "LocationId": 100,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2014-01-29",\r\n    "EmployeeCount": 239,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 1,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 220,\r\n    "DepartmentName": "Administration 4",\r\n    "LocationId": 300,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2014-08-15",\r\n    "EmployeeCount": 355,\r\n    "Type": "Marketing",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 4,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 230,\r\n    "DepartmentName": "Human Resources 6",\r\n    "LocationId": 300,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2020-03-14",\r\n    "EmployeeCount": 385,\r\n    "Type": "Marketing",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 240,\r\n    "DepartmentName": "Control And Credit 24",\r\n    "LocationId": 200,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2015-04-25",\r\n    "EmployeeCount": 355,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 250,\r\n    "DepartmentName": "Control And Credit 8",\r\n    "LocationId": 200,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2020-11-17",\r\n    "EmployeeCount": 361,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 1,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 260,\r\n    "DepartmentName": "Billing 21",\r\n    "LocationId": 200,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2018-05-18",\r\n    "EmployeeCount": 467,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 4,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 270,\r\n    "DepartmentName": "Administration 5",\r\n    "LocationId": 400,\r\n    "ManagerId": 3001,\r\n    "StartDate": "2016-07-09",\r\n    "EmployeeCount": 495,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 280,\r\n    "DepartmentName": "Purchasing 27",\r\n    "LocationId": 100,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2017-01-20",\r\n    "EmployeeCount": 364,\r\n    "Type": "Finance",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 290,\r\n    "DepartmentName": "Human Resources 24",\r\n    "LocationId": 200,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2020-03-03",\r\n    "EmployeeCount": 242,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 300,\r\n    "DepartmentName": "Finance 23",\r\n    "LocationId": 300,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2020-09-20",\r\n    "EmployeeCount": 327,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 310,\r\n    "DepartmentName": "Inventory 24",\r\n    "LocationId": 500,\r\n    "ManagerId": 3001,\r\n    "StartDate": "2015-07-18",\r\n    "EmployeeCount": 420,\r\n    "Type": "Finance",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 5,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 320,\r\n    "DepartmentName": "Shipping 26",\r\n    "LocationId": 400,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2015-09-16",\r\n    "EmployeeCount": 219,\r\n    "Type": "Sales",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 330,\r\n    "DepartmentName": "Inventory 22",\r\n    "LocationId": 200,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2014-11-22",\r\n    "EmployeeCount": 356,\r\n    "Type": "HR",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 340,\r\n    "DepartmentName": "Purchasing 4",\r\n    "LocationId": 300,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2014-03-02",\r\n    "EmployeeCount": 202,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 350,\r\n    "DepartmentName": "Purchasing 9",\r\n    "LocationId": 400,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2020-06-09",\r\n    "EmployeeCount": 415,\r\n    "Type": "Finance",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 2,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 360,\r\n    "DepartmentName": "Purchasing 14",\r\n    "LocationId": 300,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2020-07-20",\r\n    "EmployeeCount": 323,\r\n    "Type": "HR",\r\n    "Currency": "JPY",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 370,\r\n    "DepartmentName": "Operations 4",\r\n    "LocationId": 500,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2015-08-23",\r\n    "EmployeeCount": 473,\r\n    "Type": "HR",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 5,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 380,\r\n    "DepartmentName": "Sales and Marketing 26",\r\n    "LocationId": 500,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2017-08-02",\r\n    "EmployeeCount": 380,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 3,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 390,\r\n    "DepartmentName": "Control And Credit 12",\r\n    "LocationId": 200,\r\n    "ManagerId": 1001,\r\n    "StartDate": "2017-10-08",\r\n    "EmployeeCount": 328,\r\n    "Type": "Sales",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 60\r\n  },\r\n  {\r\n    "DepartmentId": 400,\r\n    "DepartmentName": "Sales and Marketing 6",\r\n    "LocationId": 300,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2019-02-06",\r\n    "EmployeeCount": 301,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 410,\r\n    "DepartmentName": "Administration 3",\r\n    "LocationId": 400,\r\n    "ManagerId": 3001,\r\n    "StartDate": "2020-07-09",\r\n    "EmployeeCount": 250,\r\n    "Type": "Finance",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 2,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 420,\r\n    "DepartmentName": "Finance 18",\r\n    "LocationId": 400,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2017-08-07",\r\n    "EmployeeCount": 409,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 430,\r\n    "DepartmentName": "Operations 11",\r\n    "LocationId": 400,\r\n    "ManagerId": 3001,\r\n    "StartDate": "2015-09-24",\r\n    "EmployeeCount": 296,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 440,\r\n    "DepartmentName": "Inventory 6",\r\n    "LocationId": 300,\r\n    "ManagerId": 4001,\r\n    "StartDate": "2016-05-27",\r\n    "EmployeeCount": 467,\r\n    "Type": "HR",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 450,\r\n    "DepartmentName": "Inventory 27",\r\n    "LocationId": 300,\r\n    "ManagerId": 4001,\r\n    "StartDate": "2019-05-29",\r\n    "EmployeeCount": 244,\r\n    "Type": "HR",\r\n    "Currency": "JPY",\r\n    "Primary": ["checked"],\r\n    "Rating": 1,\r\n    "TargetComplete": 90\r\n  },\r\n  {\r\n    "DepartmentId": 460,\r\n    "DepartmentName": "Transportation 8",\r\n    "LocationId": 400,\r\n    "ManagerId": 6001,\r\n    "StartDate": "2018-08-23",\r\n    "EmployeeCount": 443,\r\n    "Type": "Finance",\r\n    "Currency": "EUR",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 80\r\n  },\r\n  {\r\n    "DepartmentId": 470,\r\n    "DepartmentName": "Inventory 21",\r\n    "LocationId": 300,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2015-01-20",\r\n    "EmployeeCount": 250,\r\n    "Type": "Sales",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 1,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 480,\r\n    "DepartmentName": "Finance 14",\r\n    "LocationId": 300,\r\n    "ManagerId": 7001,\r\n    "StartDate": "2014-09-24",\r\n    "EmployeeCount": 319,\r\n    "Type": "Marketing",\r\n    "Currency": "USD",\r\n    "Primary": ["checked"],\r\n    "Rating": 5,\r\n    "TargetComplete": 50\r\n  },\r\n  {\r\n    "DepartmentId": 490,\r\n    "DepartmentName": "Human Resources 12",\r\n    "LocationId": 300,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2019-06-29",\r\n    "EmployeeCount": 448,\r\n    "Type": "HR",\r\n    "Currency": "JPY",\r\n    "Primary": [],\r\n    "Rating": 2,\r\n    "TargetComplete": 70\r\n  },\r\n  {\r\n    "DepartmentId": 500,\r\n    "DepartmentName": "Transportation 29",\r\n    "LocationId": 300,\r\n    "ManagerId": 5001,\r\n    "StartDate": "2014-01-07",\r\n    "EmployeeCount": 453,\r\n    "Type": "HR",\r\n    "Currency": "EUR",\r\n    "Primary": ["checked"],\r\n    "Rating": 3,\r\n    "TargetComplete": 80\r\n  }\r\n]';});

define('components/content/examples/collection/table',["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/departmentData.json", "ojs/ojmutablearraydataprovider", "ojs/ojbutton", "ojs/ojtable", "ojs/ojmenu", "ojs/ojinputtext", "ojs/ojtoolbar"], function (require, exports, jsx_runtime_1, hooks_1, deptData, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Data = JSON.parse(deptData);
    const setColumnsDefault = {
        sortable: "disabled",
    };
    const setSelectionMode = {
        row: "multiple",
        column: "multiple",
    };
    const setScrollPolicy = {
        fetchSize: 10,
        maxCount: 500,
    };
    const columnsDef = [
        {
            headerText: "Department Id",
            field: "DepartmentId",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
            sortable: "enabled",
        },
        {
            headerText: "Department Name",
            field: "DepartmentName",
            resizable: "enabled",
            template: "deptNameTemplate",
        },
        {
            headerText: "Location Id",
            field: "LocationId",
            headerClassName: "oj-sm-only-hide",
            className: "oj-sm-only-hide",
            resizable: "enabled",
        },
        { headerText: "Manager Id", field: "ManagerId", resizable: "enabled" },
        { headerText: "Action", resizable: "disabled", template: "actionTemplate" },
    ];
    const dataprovider = new MutableArrayDataProvider(Data, {
        keyAttributes: "DepartmentId",
        implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
    });
    const menuListener = (event) => {
        console.log("Menu item " + event.detail.selectedValue + " was clicked");
    };
    const Table = () => {
        const [deptName, setDeptName] = (0, hooks_1.useState)();
        const [editRow, setEditRow] = (0, hooks_1.useState)();
        const cancelEdit = (0, hooks_1.useRef)(false);
        const submitRow = (key) => {
            let tempArray = [];
            for (let element of Data) {
                if (element.DepartmentId === key) {
                    console.log(element);
                    element.DepartmentName = deptName;
                }
                tempArray.push(element);
            }
            dataprovider.data = tempArray;
        };
        const beforeRowEditListener = (event) => {
            const rowContext = event.detail.rowContext;
            setDeptName(rowContext.item.data.DepartmentName);
        };
        const beforeRowEditEndListener = (event) => {
            if (!cancelEdit.current) {
                const key = event.detail.rowContext.item.data.DepartmentId;
                submitRow(key);
            }
        };
        const updateDeptName = (event) => {
            if (event.detail.updatedFrom === "internal") {
                setDeptName(event.detail.value);
            }
        };
        const editableTemplate = (cell) => {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cell.mode == "navigation" && cell.data, cell.mode == "edit" && ((0, jsx_runtime_1.jsx)("oj-input-text", { id: "it1", value: deptName, class: "editable", onvalueChanged: updateDeptName }))] }));
        };
        const actionColumn = (cell) => {
            const handleUpdate = (event) => {
                setEditRow({ rowKey: cell.item.data.DepartmentId });
            };
            const handleEditOption = (event) => {
                if (event.detail.updatedFrom === "internal") {
                    if (event.detail.value === "save") {
                        cancelEdit.current = false;
                        setEditRow({ rowKey: null });
                    }
                    else {
                        cancelEdit.current = true;
                        setEditRow({ rowKey: null });
                    }
                }
            };
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cell.mode == "navigation" && ((0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ "data-oj-clickthrough": "disabled", display: "icons", chroming: "borderless", onojAction: handleUpdate }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-edit" }), "Edit"] }))), cell.mode == "edit" && ((0, jsx_runtime_1.jsxs)("oj-buttonset-one", Object.assign({ id: "formatsetWidth1", "aria-label": "Choose only one format", display: "icons", chroming: "borderless", onvalueChanged: handleEditOption, class: "oj-buttonset-width-auto" }, { children: [(0, jsx_runtime_1.jsxs)("oj-option", Object.assign({ value: "save" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-check" }), "Save"] })), (0, jsx_runtime_1.jsxs)("oj-option", Object.assign({ value: "cancel" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-multiply" }), "Cancel"] }))] })))] }));
        };
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("oj-table", Object.assign({ id: "table", "aria-label": "Departments Table", data: dataprovider, editMode: "rowEdit", editRow: editRow, selectionMode: setSelectionMode, scrollPolicy: "loadMoreOnScroll", scrollPolicyOptions: setScrollPolicy, columnsDefault: setColumnsDefault, columns: columnsDef, onojBeforeRowEdit: beforeRowEditListener, onojBeforeRowEditEnd: beforeRowEditEndListener, class: "table-sizing" }, { children: [(0, jsx_runtime_1.jsx)("template", { slot: "actionTemplate", render: actionColumn }), (0, jsx_runtime_1.jsx)("template", { slot: "deptNameTemplate", render: editableTemplate })] })) }));
    };
    exports.default = Table;
});


define('text!components/content/examples/collection/data/treeviewData.json',[],function () { return '[\r\n  {\r\n    "title":"News",\r\n    "id":"news"\r\n  },\r\n  {\r\n    "title":"Blogs",\r\n    "id":"blogs",\r\n    "children":[\r\n      {\r\n        "title":"Today",\r\n        "id":"today"\r\n      },\r\n      {\r\n        "title":"Yesterday",\r\n        "id":"yesterday"\r\n      },\r\n      {\r\n        "title":"Archive",\r\n        "id":"archive"\r\n      }\r\n    ]\r\n  },\r\n  {\r\n    "title":"Links",\r\n    "id":"links",\r\n    "children":[\r\n      {\r\n        "title":"Oracle",\r\n        "id":"oracle",\r\n        "children":[\r\n          {\r\n            "title":"USA",\r\n            "id":"usa",\r\n            "children":[\r\n              {\r\n                "title":"Northeast",\r\n                "id":"northeast"\r\n              },\r\n              {\r\n                "title":"Midwest",\r\n                "id":"midwest"\r\n              },\r\n              {\r\n                "title":"South",\r\n                "id":"south"\r\n              },\r\n              {\r\n                "title":"West",\r\n                "id":"west"\r\n              }\r\n            ]\r\n          },\r\n          {\r\n            "title":"Europe",\r\n            "id":"europe"\r\n          },\r\n          {\r\n            "title":"Asia",\r\n            "id":"asia",\r\n            "children":[\r\n              {\r\n                "title":"Japan",\r\n                "id":"japan"\r\n              },\r\n              {\r\n                "title":"China",\r\n                "id":"china"\r\n              },\r\n              {\r\n                "title":"India",\r\n                "id":"india"\r\n              }\r\n            ]\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        "title":"IBM",\r\n        "id":"ibm"\r\n      },\r\n      {\r\n        "title":"Microsoft",\r\n        "id":"microsoft"\r\n      }\r\n    ]\r\n  }\r\n]';});

define('components/content/examples/collection/treeview',["require", "exports", "preact/jsx-runtime", "preact/hooks", "text!./data/treeviewData.json", "ojs/ojarraytreedataprovider", "ojs/ojkeyset", "ojs/ojbutton", "ojs/ojmenu", "ojs/ojtreeview"], function (require, exports, jsx_runtime_1, hooks_1, treeviewData, ArrayTreeDataProvider, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const actionColumn = (item) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-treeview-item-icon" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ class: "oj-treeview-item-text" }, { children: item.data.title }))] }));
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
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: [(0, jsx_runtime_1.jsx)("oj-tree-view", Object.assign({ id: "treeview", data: data, onselectedChanged: handleSelectedChanged, selectionMode: "leafOnly", "aria-label": "Tree View with JSON Data" }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: actionColumn }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "selected-list" }, { children: listofSelected }))] })));
    };
    exports.default = Treeview;
});


define('text!components/content/examples/collection/data/peopleData.json',[],function () { return '[\r\n  {\r\n    "id": 1,\r\n    "name": "Chris Black",\r\n    "title": "Oracle Cloud Infrastructure GTM Channel Director EMEA",\r\n    "image": "images/hcm/placeholder-male-01.png",\r\n    "department": "Engineering"\r\n  },\r\n  {\r\n    "id": 2,\r\n    "name": "Christine Cooper",\r\n    "title": "Senior Principal Escalation Manager",\r\n    "image": "images/hcm/placeholder-female-01.png",\r\n    "department": "Global Support"\r\n  },\r\n  {\r\n    "id": 3,\r\n    "name": "Chris Benalamore",\r\n    "title": "Area Business Operations Director EMEA & JAPAC",\r\n    "image": "images/hcm/placeholder-male-03.png",\r\n    "department": "Customer Support"\r\n  },\r\n  {\r\n    "id": 4,\r\n    "name": "Christopher Johnson",\r\n    "title": "Vice-President HCM Application Development",\r\n    "image": "images/hcm/placeholder-male-04.png",\r\n    "department": "Sales"\r\n  },\r\n  {\r\n    "id": 5,\r\n    "name": "Samire Christian",\r\n    "title": "Consulting Project Technical Manager",\r\n    "image": "images/hcm/placeholder-male-05.png",\r\n    "department": "Global Support"\r\n  },\r\n  {\r\n    "id": 6,\r\n    "name": "Kurt Marchris",\r\n    "title": "Customer Service Analyst",\r\n    "image": "images/hcm/placeholder-male-06.png",\r\n    "department": "Customer Support"\r\n  },\r\n  {\r\n    "id": 7,\r\n    "name": "Zelda Christian Cooperman",\r\n    "title": "Senior Principal Escalation Manager",\r\n    "image": "images/hcm/placeholder-female-02.png",\r\n    "department": "Engineering"\r\n  }\r\n]';});

define('components/content/examples/collection/listview',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojkeyset", "text!./data/peopleData.json", "ojs/ojmutablearraydataprovider", "ojs/ojbutton", "ojs/ojlistview", "ojs/ojlistitemlayout", "ojs/ojavatar", "ojs/ojtoolbar", "ojs/ojselector"], function (require, exports, jsx_runtime_1, hooks_1, ojkeyset_1, peopleData, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dataProvider = new MutableArrayDataProvider(JSON.parse(peopleData), {
        keyAttributes: "id",
    });
    const gridlinesItemVisible = { item: "visible" };
    const INIT_SELECTEDITEMS = new ojkeyset_1.KeySetImpl([]);
    const ListView = () => {
        const [selectedItems, setselectedItems] = (0, hooks_1.useState)(INIT_SELECTEDITEMS);
        const handleSelectedChanged = (event) => {
            setselectedItems(event.detail.value);
        };
        const renderListItem = (0, hooks_1.useCallback)((item) => {
            return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("oj-list-item-layout", { children: [(0, jsx_runtime_1.jsx)("oj-selector", { "aria-label": "selector", slot: "selector", selectedKeys: selectedItems, onselectedKeysChanged: handleSelectedChanged, selectionMode: "multiple", rowKey: item.data.id, id: "listview_checkboxset" + item.data.id }), (0, jsx_runtime_1.jsx)("oj-avatar", { slot: "leading", shape: "square", size: "sm", src: item.data.image }), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-typography-body-md oj-typography-bold" }, { children: item.data.name })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "secondary", class: "oj-typography-body-sm" }, { children: item.data.department })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "action" }, { children: (0, jsx_runtime_1.jsxs)("oj-toolbar", Object.assign({ "aria-label": "Toolbar", chroming: "borderless" }, { children: [(0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "save" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-save" }), "Save"] })), (0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "download" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-download" }), "Download"] })), (0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ id: "print" + item.data.id, display: "icons", class: "oj-button-sm" }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-print" }), "Print"] }))] })) }))] }) }));
        }, [selectedItems]);
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsx)("oj-list-view", Object.assign({ id: "listview", "aria-label": "list of employees", data: dataProvider, gridlines: gridlinesItemVisible, selectionMode: "multiple", onselectedChanged: handleSelectedChanged, selected: selectedItems, class: "listview-sizing" }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderListItem }) })) })));
    };
    exports.default = ListView;
});


define('text!components/content/examples/collection/data/population.json',[],function () { return '[\r\n  {\r\n    "states": "Alabama",\r\n    "2000": 4452173,\r\n    "2001": 4467634,\r\n    "2002": 4480089,\r\n    "2003": 4503491,\r\n    "2004": 4530729,\r\n    "2005": 4569805,\r\n    "2006": 4628981,\r\n    "2007": 4672840,\r\n    "2008": 4718206,\r\n    "2009": 4757938,\r\n    "2010": 4785514,\r\n    "2011": 4799642,\r\n    "2012": 4816632,\r\n    "2013": 4831586,\r\n    "2014": 4843737,\r\n    "2015": 4854803,\r\n    "2016": 4866824,\r\n    "2017": 4877989,\r\n    "2018": 4891628,\r\n    "2019": 4907965,\r\n    "2020": 4921532\r\n  },\r\n  {\r\n    "states": "Alaska",\r\n    "2000": 627963,\r\n    "2001": 633714,\r\n    "2002": 642337,\r\n    "2003": 648414,\r\n    "2004": 659286,\r\n    "2005": 666946,\r\n    "2006": 675302,\r\n    "2007": 680300,\r\n    "2008": 687455,\r\n    "2009": 698895,\r\n    "2010": 713982,\r\n    "2011": 722349,\r\n    "2012": 730810,\r\n    "2013": 737626,\r\n    "2014": 737075,\r\n    "2015": 738430,\r\n    "2016": 742575,\r\n    "2017": 740983,\r\n    "2018": 736624,\r\n    "2019": 733603,\r\n    "2020": 731158\r\n  },\r\n  {\r\n    "states": "Arizona",\r\n    "2000": 5160586,\r\n    "2001": 5273477,\r\n    "2002": 5396255,\r\n    "2003": 5510364,\r\n    "2004": 5652404,\r\n    "2005": 5839077,\r\n    "2006": 6029141,\r\n    "2007": 6167681,\r\n    "2008": 6280362,\r\n    "2009": 6343154,\r\n    "2010": 6407342,\r\n    "2011": 6473416,\r\n    "2012": 6556344,\r\n    "2013": 6634690,\r\n    "2014": 6732873,\r\n    "2015": 6832810,\r\n    "2016": 6944767,\r\n    "2017": 7048088,\r\n    "2018": 7164228,\r\n    "2019": 7291843,\r\n    "2020": 7421401\r\n  },\r\n  {\r\n    "states": "Arkansas",\r\n    "2000": 2678588,\r\n    "2001": 2691571,\r\n    "2002": 2705927,\r\n    "2003": 2724816,\r\n    "2004": 2749686,\r\n    "2005": 2781097,\r\n    "2006": 2821761,\r\n    "2007": 2848650,\r\n    "2008": 2874554,\r\n    "2009": 2896843,\r\n    "2010": 921998,\r\n    "2011": 2941038,\r\n    "2012": 2952876,\r\n    "2013": 2960459,\r\n    "2014": 2968759,\r\n    "2015": 2979732,\r\n    "2016": 2991815,\r\n    "2017": 3003855,\r\n    "2018": 3012161,\r\n    "2019": 3020985,\r\n    "2020": 3030522\r\n  },\r\n  {\r\n    "states": "California",\r\n    "2000": 33987977,\r\n    "2001": 34479458,\r\n    "2002": 34871843,\r\n    "2003": 35253159,\r\n    "2004": 35574576,\r\n    "2005": 35827943,\r\n    "2006": 36021202,\r\n    "2007": 36250311,\r\n    "2008": 36604337,\r\n    "2009": 36961229,\r\n    "2010": 37319550,\r\n    "2011": 37636311,\r\n    "2012": 37944551,\r\n    "2013": 38253768,\r\n    "2014": 38586706,\r\n    "2015": 38904296,\r\n    "2016": 39149186,\r\n    "2017": 39337785,\r\n    "2018": 39437463,\r\n    "2019": 39437610,\r\n    "2020": 39368078\r\n  },\r\n  {\r\n    "states": "Colorado",\r\n    "2000": 4326921,\r\n    "2001": 4425687,\r\n    "2002": 4490406,\r\n    "2003": 4528732,\r\n    "2004": 4575013,\r\n    "2005": 4631888,\r\n    "2006": 4720423,\r\n    "2007": 4803868,\r\n    "2008": 4889730,\r\n    "2009": 4972195,\r\n    "2010": 5047539,\r\n    "2011": 5121900,\r\n    "2012": 5193660,\r\n    "2013": 5270774,\r\n    "2014": 5352637,\r\n    "2015": 5454328,\r\n    "2016": 5543844,\r\n    "2017": 5617421,\r\n    "2018": 5697155,\r\n    "2019": 5758486,\r\n    "2020": 5807719\r\n  },\r\n  {\r\n    "states": "Connecticut",\r\n    "2000": 3411777,\r\n    "2001": 3432835,\r\n    "2002": 3458749,\r\n    "2003": 3484336,\r\n    "2004": 3496094,\r\n    "2005": 3506956,\r\n    "2006": 3517460,\r\n    "2007": 3527270,\r\n    "2008": 3545579,\r\n    "2009": 3561807,\r\n    "2010": 3579173,\r\n    "2011": 3588632,\r\n    "2012": 3595211,\r\n    "2013": 3595792,\r\n    "2014": 3595697,\r\n    "2015": 3588561,\r\n    "2016": 3579830,\r\n    "2017": 3575324,\r\n    "2018": 3574561,\r\n    "2019": 3566022,\r\n    "2020": 3557006\r\n  },\r\n  {\r\n    "states": "Delaware",\r\n    "2000": 786373,\r\n    "2001": 795699,\r\n    "2002": 806169,\r\n    "2003": 818003,\r\n    "2004": 830803,\r\n    "2005": 845150,\r\n    "2006": 859268,\r\n    "2007": 871749,\r\n    "2008": 883874,\r\n    "2009": 891730,\r\n    "2010": 899647,\r\n    "2011": 907590,\r\n    "2012": 915518,\r\n    "2013": 924062,\r\n    "2014": 933131,\r\n    "2015": 942065,\r\n    "2016": 949989,\r\n    "2017": 957942,\r\n    "2018": 966985,\r\n    "2019": 976668,\r\n    "2020": 986809\r\n  },\r\n  {\r\n    "states": "District of Columbia",\r\n    "2000": 572046,\r\n    "2001": 574504,\r\n    "2002": 573158,\r\n    "2003": 568502,\r\n    "2004": 567754,\r\n    "2005": 567136,\r\n    "2006": 570681,\r\n    "2007": 574404,\r\n    "2008": 580236,\r\n    "2009": 592228,\r\n    "2010": 605282,\r\n    "2011": 620290,\r\n    "2012": 635737,\r\n    "2013": 651559,\r\n    "2014": 663603,\r\n    "2015": 677014,\r\n    "2016": 687576,\r\n    "2017": 697079,\r\n    "2018": 704147,\r\n    "2019": 708253,\r\n    "2020": 712816\r\n  },\r\n  {\r\n    "states": "Florida",\r\n    "2000": 16047515,\r\n    "2001": 16356966,\r\n    "2002": 16689370,\r\n    "2003": 17004085,\r\n    "2004": 17415318,\r\n    "2005": 17842038,\r\n    "2006": 18166990,\r\n    "2007": 18367842,\r\n    "2008": 18527305,\r\n    "2009": 18652644,\r\n    "2010": 18846143,\r\n    "2011": 19055607,\r\n    "2012": 19302016,\r\n    "2013": 19551678,\r\n    "2014": 19853880,\r\n    "2015": 20219111,\r\n    "2016": 20627237,\r\n    "2017": 20977089,\r\n    "2018": 21254926,\r\n    "2019": 21492056,\r\n    "2020": 21733312\r\n  },\r\n  {\r\n    "states": "Georgia",\r\n    "2000": 8227303,\r\n    "2001": 8377038,\r\n    "2002": 8508256,\r\n    "2003": 8622793,\r\n    "2004": 8769252,\r\n    "2005": 8925922,\r\n    "2006": 9155813,\r\n    "2007": 9349988,\r\n    "2008": 9504843,\r\n    "2009": 9620846,\r\n    "2010": 9712209,\r\n    "2011": 9803630,\r\n    "2012": 9903580,\r\n    "2013": 9975592,\r\n    "2014": 10071204,\r\n    "2015": 10183353,\r\n    "2016": 10308442,\r\n    "2017": 10417031,\r\n    "2018": 10519389,\r\n    "2019": 10628020,\r\n    "2020": 10710017\r\n  },\r\n  {\r\n    "states": "Hawaii",\r\n    "2000": 1213519,\r\n    "2001": 1225948,\r\n    "2002": 1239613,\r\n    "2003": 1251154,\r\n    "2004": 1273569,\r\n    "2005": 1292729,\r\n    "2006": 1309731,\r\n    "2007": 1315675,\r\n    "2008": 1332213,\r\n    "2009": 1346717,\r\n    "2010": 1364004,\r\n    "2011": 1379562,\r\n    "2012": 1395199,\r\n    "2013": 1408822,\r\n    "2014": 1415335,\r\n    "2015": 1422999,\r\n    "2016": 1428885,\r\n    "2017": 1425763,\r\n    "2018": 1423102,\r\n    "2019": 1415615,\r\n    "2020": 1407006\r\n  },\r\n  {\r\n    "states": "Idaho",\r\n    "2000": 1299430,\r\n    "2001": 1319962,\r\n    "2002": 1340372,\r\n    "2003": 1363380,\r\n    "2004": 1391802,\r\n    "2005": 1428241,\r\n    "2006": 1468669,\r\n    "2007": 1505105,\r\n    "2008": 1534320,\r\n    "2009": 1554439,\r\n    "2010": 1570819,\r\n    "2011": 1584272,\r\n    "2012": 1595910,\r\n    "2013": 1612053,\r\n    "2014": 1632248,\r\n    "2015": 1652495,\r\n    "2016": 1684036,\r\n    "2017": 1719745,\r\n    "2018": 1752074,\r\n    "2019": 1789060,\r\n    "2020": 1826913\r\n  },\r\n  {\r\n    "states": "Illinois",\r\n    "2000": 12434161,\r\n    "2001": 12488445,\r\n    "2002": 12525556,\r\n    "2003": 12556006,\r\n    "2004": 12589773,\r\n    "2005": 12609903,\r\n    "2006": 12643955,\r\n    "2007": 12695866,\r\n    "2008": 12747038,\r\n    "2009": 12796778,\r\n    "2010": 12840545,\r\n    "2011": 12867783,\r\n    "2012": 12883029,\r\n    "2013": 12895778,\r\n    "2014": 12885092,\r\n    "2015": 12859585,\r\n    "2016": 12821709,\r\n    "2017": 12779893,\r\n    "2018": 12724685,\r\n    "2019": 12667017,\r\n    "2020": 12587530\r\n  },\r\n  {\r\n    "states": "Indiana",\r\n    "2000": 6091866,\r\n    "2001": 6127760,\r\n    "2002": 6155967,\r\n    "2003": 6196638,\r\n    "2004": 6233007,\r\n    "2005": 6278616,\r\n    "2006": 6332669,\r\n    "2007": 6379599,\r\n    "2008": 6424806,\r\n    "2009": 6459325,\r\n    "2010": 6490555,\r\n    "2011": 6517250,\r\n    "2012": 6538989,\r\n    "2013": 6570575,\r\n    "2014": 6596019,\r\n    "2015": 6611442,\r\n    "2016": 6637898,\r\n    "2017": 6662068,\r\n    "2018": 6698481,\r\n    "2019": 6731010,\r\n    "2020": 6754953\r\n  },\r\n  {\r\n    "states": "Iowa",\r\n    "2000": 2929067,\r\n    "2001": 2931997,\r\n    "2002": 2934234,\r\n    "2003": 2941999,\r\n    "2004": 2953635,\r\n    "2005": 2964454,\r\n    "2006": 2982644,\r\n    "2007": 2999212,\r\n    "2008": 3016734,\r\n    "2009": 3032870,\r\n    "2010": 3050819,\r\n    "2011": 3066772,\r\n    "2012": 3076844,\r\n    "2013": 3093935,\r\n    "2014": 3110643,\r\n    "2015": 3122541,\r\n    "2016": 3133210,\r\n    "2017": 3143734,\r\n    "2018": 3149900,\r\n    "2019": 3159596,\r\n    "2020": 3163561\r\n  },\r\n  {\r\n    "states": "Kansas",\r\n    "2000": 2693681,\r\n    "2001": 2702162,\r\n    "2002": 2713535,\r\n    "2003": 2723004,\r\n    "2004": 2734373,\r\n    "2005": 2745299,\r\n    "2006": 2762931,\r\n    "2007": 2783785,\r\n    "2008": 2808076,\r\n    "2009": 2832704,\r\n    "2010": 2858266,\r\n    "2011": 2869677,\r\n    "2012": 2886024,\r\n    "2013": 2894306,\r\n    "2014": 2901861,\r\n    "2015": 2910717,\r\n    "2016": 2912977,\r\n    "2017": 2910892,\r\n    "2018": 2912748,\r\n    "2019": 2912635,\r\n    "2020": 2913805\r\n  },\r\n  {\r\n    "states": "Kentucky",\r\n    "2000": 4049021,\r\n    "2001": 4068132,\r\n    "2002": 4089875,\r\n    "2003": 4117170,\r\n    "2004": 4146101,\r\n    "2005": 4182742,\r\n    "2006": 4219239,\r\n    "2007": 4256672,\r\n    "2008": 4289878,\r\n    "2009": 4317074,\r\n    "2010": 4348464,\r\n    "2011": 4370817,\r\n    "2012": 4387865,\r\n    "2013": 4406906,\r\n    "2014": 4416992,\r\n    "2015": 4429126,\r\n    "2016": 4440306,\r\n    "2017": 4455590,\r\n    "2018": 4464273,\r\n    "2019": 4472345,\r\n    "2020": 4477251\r\n  },\r\n  {\r\n    "states": "Louisiana",\r\n    "2000": 4471885,\r\n    "2001": 4477875,\r\n    "2002": 4497267,\r\n    "2003": 4521042,\r\n    "2004": 4552238,\r\n    "2005": 4576628,\r\n    "2006": 4302665,\r\n    "2007": 4375581,\r\n    "2008": 4435586,\r\n    "2009": 4491648,\r\n    "2010": 4544635,\r\n    "2011": 4576244,\r\n    "2012": 4602067,\r\n    "2013": 4626040,\r\n    "2014": 4645938,\r\n    "2015": 4666998,\r\n    "2016": 4681346,\r\n    "2017": 4673673,\r\n    "2018": 4664450,\r\n    "2019": 4658285,\r\n    "2020": 4645318\r\n  },\r\n  {\r\n    "states": "Maine",\r\n    "2000": 1277072,\r\n    "2001": 1285692,\r\n    "2002": 1295960,\r\n    "2003": 1306513,\r\n    "2004": 1313688,\r\n    "2005": 1318787,\r\n    "2006": 1323619,\r\n    "2007": 1327040,\r\n    "2008": 1330509,\r\n    "2009": 1329590,\r\n    "2010": 1327651,\r\n    "2011": 1328473,\r\n    "2012": 1328094,\r\n    "2013": 1328543,\r\n    "2014": 1331217,\r\n    "2015": 1329098,\r\n    "2016": 1332348,\r\n    "2017": 1335743,\r\n    "2018": 1340123,\r\n    "2019": 1345770,\r\n    "2020": 1350141\r\n  },\r\n  {\r\n    "states": "Maryland",\r\n    "2000": 5311034,\r\n    "2001": 5374691,\r\n    "2002": 5440389,\r\n    "2003": 5496269,\r\n    "2004": 5546935,\r\n    "2005": 5592379,\r\n    "2006": 5627367,\r\n    "2007": 5653408,\r\n    "2008": 5684965,\r\n    "2009": 5730388,\r\n    "2010": 5788784,\r\n    "2011": 5840241,\r\n    "2012": 5888375,\r\n    "2013": 5925197,\r\n    "2014": 5960064,\r\n    "2015": 5988528,\r\n    "2016": 6007014,\r\n    "2017": 6028186,\r\n    "2018": 6042153,\r\n    "2019": 6054954,\r\n    "2020": 6055802\r\n  },\r\n  {\r\n    "states": "Massachusetts",\r\n    "2000": 6361104,\r\n    "2001": 6397634,\r\n    "2002": 6417206,\r\n    "2003": 6422565,\r\n    "2004": 6412281,\r\n    "2005": 6403290,\r\n    "2006": 6410084,\r\n    "2007": 6431559,\r\n    "2008": 6468967,\r\n    "2009": 6517613,\r\n    "2010": 6566440,\r\n    "2011": 6614218,\r\n    "2012": 6664269,\r\n    "2013": 6715158,\r\n    "2014": 6764864,\r\n    "2015": 6797484,\r\n    "2016": 6827280,\r\n    "2017": 6863560,\r\n    "2018": 6885720,\r\n    "2019": 6894883,\r\n    "2020": 6893574\r\n  },\r\n  {\r\n    "states": "Michigan",\r\n    "2000": 9952450,\r\n    "2001": 9991120,\r\n    "2002": 10015710,\r\n    "2003": 10041152,\r\n    "2004": 10055315,\r\n    "2005": 10051137,\r\n    "2006": 10036081,\r\n    "2007": 10001284,\r\n    "2008": 9946889,\r\n    "2009": 9901591,\r\n    "2010": 9877597,\r\n    "2011": 9883053,\r\n    "2012": 9898289,\r\n    "2013": 9914802,\r\n    "2014": 9932033,\r\n    "2015": 9934483,\r\n    "2016": 9954117,\r\n    "2017": 9976752,\r\n    "2018": 9987286,\r\n    "2019": 9984795,\r\n    "2020": 9966555\r\n  },\r\n  {\r\n    "states": "Minnesota",\r\n    "2000": 4933692,\r\n    "2001": 4982796,\r\n    "2002": 5018935,\r\n    "2003": 5053572,\r\n    "2004": 5087713,\r\n    "2005": 5119598,\r\n    "2006": 5163555,\r\n    "2007": 5207203,\r\n    "2008": 5247018,\r\n    "2009": 5281203,\r\n    "2010": 5310934,\r\n    "2011": 5346620,\r\n    "2012": 5377500,\r\n    "2013": 5414722,\r\n    "2014": 5452665,\r\n    "2015": 5484002,\r\n    "2016": 5525360,\r\n    "2017": 5569283,\r\n    "2018": 5608762,\r\n    "2019": 5640053,\r\n    "2020": 5657342\r\n  },\r\n  {\r\n    "states": "Mississippi",\r\n    "2000": 2848353,\r\n    "2001": 2852994,\r\n    "2002": 2858681,\r\n    "2003": 2868312,\r\n    "2004": 2889010,\r\n    "2005": 2905943,\r\n    "2006": 2904978,\r\n    "2007": 2928350,\r\n    "2008": 2947806,\r\n    "2009": 2958774,\r\n    "2010": 2970615,\r\n    "2011": 2979147,\r\n    "2012": 2984599,\r\n    "2013": 2989839,\r\n    "2014": 2991892,\r\n    "2015": 2990231,\r\n    "2016": 2990595,\r\n    "2017": 2990674,\r\n    "2018": 2982879,\r\n    "2019": 2978227,\r\n    "2020": 2966786\r\n  },\r\n  {\r\n    "states": "Missouri",\r\n    "2000": 5607285,\r\n    "2001": 5641142,\r\n    "2002": 5674825,\r\n    "2003": 5709403,\r\n    "2004": 5747741,\r\n    "2005": 5790300,\r\n    "2006": 5842704,\r\n    "2007": 5887612,\r\n    "2008": 5923916,\r\n    "2009": 5961088,\r\n    "2010": 5996089,\r\n    "2011": 6011182,\r\n    "2012": 6026027,\r\n    "2013": 6042989,\r\n    "2014": 6059130,\r\n    "2015": 6075411,\r\n    "2016": 6091384,\r\n    "2017": 6111382,\r\n    "2018": 6125986,\r\n    "2019": 6140475,\r\n    "2020": 6151548\r\n  },\r\n  {\r\n    "states": "Montana",\r\n    "2000": 903773,\r\n    "2001": 906961,\r\n    "2002": 911667,\r\n    "2003": 919630,\r\n    "2004": 930009,\r\n    "2005": 940102,\r\n    "2006": 952692,\r\n    "2007": 964706,\r\n    "2008": 976415,\r\n    "2009": 983982,\r\n    "2010": 990730,\r\n    "2011": 997518,\r\n    "2012": 1004168,\r\n    "2013": 1014158,\r\n    "2014": 1022657,\r\n    "2015": 1031495,\r\n    "2016": 1042137,\r\n    "2017": 1053862,\r\n    "2018": 1061818,\r\n    "2019": 1070123,\r\n    "2020": 1080577\r\n  },\r\n  {\r\n    "states": "Nebraska",\r\n    "2000": 1713820,\r\n    "2001": 1719836,\r\n    "2002": 1728292,\r\n    "2003": 1738643,\r\n    "2004": 1749370,\r\n    "2005": 1761497,\r\n    "2006": 1772693,\r\n    "2007": 1783440,\r\n    "2008": 1796378,\r\n    "2009": 1812683,\r\n    "2010": 1829591,\r\n    "2011": 1840914,\r\n    "2012": 1853691,\r\n    "2013": 1865813,\r\n    "2014": 1879955,\r\n    "2015": 1892059,\r\n    "2016": 1906483,\r\n    "2017": 1916998,\r\n    "2018": 1925512,\r\n    "2019": 1932571,\r\n    "2020": 1937552\r\n  },\r\n  {\r\n    "states": "Nevada",\r\n    "2000": 2018741,\r\n    "2001": 2098399,\r\n    "2002": 2173791,\r\n    "2003": 2248850,\r\n    "2004": 2346222,\r\n    "2005": 2432143,\r\n    "2006": 2522658,\r\n    "2007": 2601072,\r\n    "2008": 2653630,\r\n    "2009": 2684665,\r\n    "2010": 2702483,\r\n    "2011": 2713114,\r\n    "2012": 2744670,\r\n    "2013": 2776956,\r\n    "2014": 2818935,\r\n    "2015": 2868531,\r\n    "2016": 2919555,\r\n    "2017": 2972097,\r\n    "2018": 3030725,\r\n    "2019": 3090771,\r\n    "2020": 3138259\r\n  },\r\n  {\r\n    "states": "New Hampshire",\r\n    "2000": 1239882,\r\n    "2001": 1255517,\r\n    "2002": 1269089,\r\n    "2003": 1279840,\r\n    "2004": 1290121,\r\n    "2005": 1298492,\r\n    "2006": 1308389,\r\n    "2007": 1312540,\r\n    "2008": 1315906,\r\n    "2009": 1316102,\r\n    "2010": 1316807,\r\n    "2011": 1320444,\r\n    "2012": 1324677,\r\n    "2013": 1327272,\r\n    "2014": 1334257,\r\n    "2015": 1337480,\r\n    "2016": 1343694,\r\n    "2017": 1350395,\r\n    "2018": 1355064,\r\n    "2019": 1360783,\r\n    "2020": 1366275\r\n  },\r\n  {\r\n    "states": "New Jersey",\r\n    "2000": 8430621,\r\n    "2001": 8492671,\r\n    "2002": 8552643,\r\n    "2003": 8601402,\r\n    "2004": 8634561,\r\n    "2005": 8651974,\r\n    "2006": 8661679,\r\n    "2007": 8677885,\r\n    "2008": 8711090,\r\n    "2009": 8755602,\r\n    "2010": 8799451,\r\n    "2011": 8828552,\r\n    "2012": 8845671,\r\n    "2013": 8857821,\r\n    "2014": 8867277,\r\n    "2015": 8870312,\r\n    "2016": 8873584,\r\n    "2017": 8888147,\r\n    "2018": 8891730,\r\n    "2019": 8891258,\r\n    "2020": 8882371\r\n  },\r\n  {\r\n    "states": "New Mexico",\r\n    "2000": 1821204,\r\n    "2001": 1831690,\r\n    "2002": 1855309,\r\n    "2003": 1877574,\r\n    "2004": 1903808,\r\n    "2005": 1932274,\r\n    "2006": 1962137,\r\n    "2007": 1990070,\r\n    "2008": 2010662,\r\n    "2009": 2036802,\r\n    "2010": 2064614,\r\n    "2011": 2080707,\r\n    "2012": 2087715,\r\n    "2013": 2092833,\r\n    "2014": 2090236,\r\n    "2015": 2090071,\r\n    "2016": 2092555,\r\n    "2017": 2092844,\r\n    "2018": 2093754,\r\n    "2019": 2099634,\r\n    "2020": 2106319\r\n  },\r\n  {\r\n    "states": "New York",\r\n    "2000": 19001780,\r\n    "2001": 19082838,\r\n    "2002": 19137800,\r\n    "2003": 19175939,\r\n    "2004": 19171567,\r\n    "2005": 19132610,\r\n    "2006": 19104631,\r\n    "2007": 19132335,\r\n    "2008": 19212436,\r\n    "2009": 19307066,\r\n    "2010": 19399956,\r\n    "2011": 19499921,\r\n    "2012": 19574362,\r\n    "2013": 19626488,\r\n    "2014": 19653431,\r\n    "2015": 19657321,\r\n    "2016": 19636391,\r\n    "2017": 19593849,\r\n    "2018": 19544098,\r\n    "2019": 19463131,\r\n    "2020": 19336776\r\n  },\r\n  {\r\n    "states": "North Carolina",\r\n    "2000": 8081614,\r\n    "2001": 8210122,\r\n    "2002": 8326201,\r\n    "2003": 8422501,\r\n    "2004": 8553152,\r\n    "2005": 8705407,\r\n    "2006": 8917270,\r\n    "2007": 9118037,\r\n    "2008": 9309449,\r\n    "2009": 9449566,\r\n    "2010": 9574586,\r\n    "2011": 9658913,\r\n    "2012": 9751810,\r\n    "2013": 9846717,\r\n    "2014": 9937295,\r\n    "2015": 10037218,\r\n    "2016": 10161802,\r\n    "2017": 10275758,\r\n    "2018": 10391358,\r\n    "2019": 10501384,\r\n    "2020": 10600823\r\n  },\r\n  {\r\n    "states": "North Dakota",\r\n    "2000": 642023,\r\n    "2001": 639062,\r\n    "2002": 638168,\r\n    "2003": 638817,\r\n    "2004": 644705,\r\n    "2005": 646089,\r\n    "2006": 649422,\r\n    "2007": 652822,\r\n    "2008": 657569,\r\n    "2009": 664968,\r\n    "2010": 674752,\r\n    "2011": 685526,\r\n    "2012": 702227,\r\n    "2013": 723149,\r\n    "2014": 738736,\r\n    "2015": 755537,\r\n    "2016": 756114,\r\n    "2017": 756755,\r\n    "2018": 760062,\r\n    "2019": 763724,\r\n    "2020": 765309\r\n  },\r\n  {\r\n    "states": "Ohio",\r\n    "2000": 11363543,\r\n    "2001": 11387404,\r\n    "2002": 11407889,\r\n    "2003": 11434788,\r\n    "2004": 11452251,\r\n    "2005": 11463320,\r\n    "2006": 11481213,\r\n    "2007": 11500468,\r\n    "2008": 11515391,\r\n    "2009": 11528896,\r\n    "2010": 11539449,\r\n    "2011": 11545735,\r\n    "2012": 11550971,\r\n    "2013": 11579692,\r\n    "2014": 11606573,\r\n    "2015": 11622315,\r\n    "2016": 11640060,\r\n    "2017": 11665706,\r\n    "2018": 11680892,\r\n    "2019": 11696507,\r\n    "2020": 11693217\r\n  },\r\n  {\r\n    "states": "Oklahoma",\r\n    "2000": 3454365,\r\n    "2001": 3467100,\r\n    "2002": 3489080,\r\n    "2003": 3504892,\r\n    "2004": 3525233,\r\n    "2005": 3548597,\r\n    "2006": 3594090,\r\n    "2007": 3634349,\r\n    "2008": 3668976,\r\n    "2009": 3717572,\r\n    "2010": 3760014,\r\n    "2011": 3788824,\r\n    "2012": 3819320,\r\n    "2013": 3853891,\r\n    "2014": 3879187,\r\n    "2015": 3910518,\r\n    "2016": 3928143,\r\n    "2017": 3933602,\r\n    "2018": 3943488,\r\n    "2019": 3960676,\r\n    "2020": 3980783\r\n  },\r\n  {\r\n    "states": "Oregon",\r\n    "2000": 3429708,\r\n    "2001": 3467937,\r\n    "2002": 3513424,\r\n    "2003": 3547376,\r\n    "2004": 3569463,\r\n    "2005": 3613202,\r\n    "2006": 3670883,\r\n    "2007": 3722417,\r\n    "2008": 3768748,\r\n    "2009": 3808600,\r\n    "2010": 3837614,\r\n    "2011": 3872672,\r\n    "2012": 3900102,\r\n    "2013": 3924110,\r\n    "2014": 3965447,\r\n    "2015": 4018542,\r\n    "2016": 4093271,\r\n    "2017": 4147294,\r\n    "2018": 4183538,\r\n    "2019": 4216116,\r\n    "2020": 4241507\r\n  },\r\n  {\r\n    "states": "Pennsylvania",\r\n    "2000": 12284173,\r\n    "2001": 12298970,\r\n    "2002": 12331031,\r\n    "2003": 12374658,\r\n    "2004": 12410722,\r\n    "2005": 12449990,\r\n    "2006": 12510809,\r\n    "2007": 12563937,\r\n    "2008": 12612285,\r\n    "2009": 12666858,\r\n    "2010": 12711406,\r\n    "2011": 12747052,\r\n    "2012": 12769123,\r\n    "2013": 12779538,\r\n    "2014": 12792392,\r\n    "2015": 12789838,\r\n    "2016": 12788468,\r\n    "2017": 12794679,\r\n    "2018": 12809107,\r\n    "2019": 12798883,\r\n    "2020": 12783254\r\n  },\r\n  {\r\n    "states": "Rhode Island",\r\n    "2000": 1050268,\r\n    "2001": 1057142,\r\n    "2002": 1065995,\r\n    "2003": 1071342,\r\n    "2004": 1074579,\r\n    "2005": 1067916,\r\n    "2006": 1063096,\r\n    "2007": 1057315,\r\n    "2008": 1055003,\r\n    "2009": 1053646,\r\n    "2010": 1053994,\r\n    "2011": 1053829,\r\n    "2012": 1054893,\r\n    "2013": 1055560,\r\n    "2014": 1056511,\r\n    "2015": 1056886,\r\n    "2016": 1057816,\r\n    "2017": 1056554,\r\n    "2018": 1059338,\r\n    "2019": 1058158,\r\n    "2020": 1057125\r\n  },\r\n  {\r\n    "states": "South Carolina",\r\n    "2000": 4024223,\r\n    "2001": 4064995,\r\n    "2002": 4107795,\r\n    "2003": 4150297,\r\n    "2004": 4210921,\r\n    "2005": 4270150,\r\n    "2006": 4357847,\r\n    "2007": 4444110,\r\n    "2008": 4528996,\r\n    "2009": 4589872,\r\n    "2010": 4635846,\r\n    "2011": 4672655,\r\n    "2012": 4719027,\r\n    "2013": 4766469,\r\n    "2014": 4826858,\r\n    "2015": 4896006,\r\n    "2016": 4963031,\r\n    "2017": 5027102,\r\n    "2018": 5091702,\r\n    "2019": 5157702,\r\n    "2020": 5218040\r\n  },\r\n  {\r\n    "states": "South Dakota",\r\n    "2000": 755844,\r\n    "2001": 757972,\r\n    "2002": 760020,\r\n    "2003": 763729,\r\n    "2004": 770396,\r\n    "2005": 775493,\r\n    "2006": 783033,\r\n    "2007": 791623,\r\n    "2008": 799124,\r\n    "2009": 807067,\r\n    "2010": 816193,\r\n    "2011": 823740,\r\n    "2012": 833859,\r\n    "2013": 842751,\r\n    "2014": 849670,\r\n    "2015": 854663,\r\n    "2016": 863693,\r\n    "2017": 873732,\r\n    "2018": 879386,\r\n    "2019": 887127,\r\n    "2020": 892717\r\n  },\r\n  {\r\n    "states": "Tennessee",\r\n    "2000": 5703719,\r\n    "2001": 5750789,\r\n    "2002": 5795918,\r\n    "2003": 5847812,\r\n    "2004": 5910809,\r\n    "2005": 5991057,\r\n    "2006": 6088766,\r\n    "2007": 6175727,\r\n    "2008": 6247411,\r\n    "2009": 6306019,\r\n    "2010": 6355518,\r\n    "2011": 6400298,\r\n    "2012": 6455752,\r\n    "2013": 6496943,\r\n    "2014": 6544617,\r\n    "2015": 6595354,\r\n    "2016": 6651277,\r\n    "2017": 6714748,\r\n    "2018": 6778180,\r\n    "2019": 6830325,\r\n    "2020": 6886834\r\n  },\r\n  {\r\n    "states": "Texas",\r\n    "2000": 20944499,\r\n    "2001": 21319622,\r\n    "2002": 21690325,\r\n    "2003": 22030931,\r\n    "2004": 22394023,\r\n    "2005": 22778123,\r\n    "2006": 23359580,\r\n    "2007": 23831983,\r\n    "2008": 24309039,\r\n    "2009": 24801761,\r\n    "2010": 25241897,\r\n    "2011": 25645504,\r\n    "2012": 26084120,\r\n    "2013": 26479646,\r\n    "2014": 26963092,\r\n    "2015": 27468531,\r\n    "2016": 27914064,\r\n    "2017": 28291024,\r\n    "2018": 28624564,\r\n    "2019": 28986794,\r\n    "2020": 29360759\r\n  },\r\n  {\r\n    "states": "Utah",\r\n    "2000": 2244502,\r\n    "2001": 2283715,\r\n    "2002": 2324815,\r\n    "2003": 2360137,\r\n    "2004": 2401580,\r\n    "2005": 2457719,\r\n    "2006": 2525507,\r\n    "2007": 2597746,\r\n    "2008": 2663029,\r\n    "2009": 2723421,\r\n    "2010": 2775413,\r\n    "2011": 2814797,\r\n    "2012": 2854146,\r\n    "2013": 2898773,\r\n    "2014": 2938327,\r\n    "2015": 2983626,\r\n    "2016": 3044241,\r\n    "2017": 3103540,\r\n    "2018": 3155153,\r\n    "2019": 3203383,\r\n    "2020": 3249879\r\n  },\r\n  {\r\n    "states": "Vermont",\r\n    "2000": 609618,\r\n    "2001": 612223,\r\n    "2002": 615442,\r\n    "2003": 617858,\r\n    "2004": 619920,\r\n    "2005": 621215,\r\n    "2006": 622892,\r\n    "2007": 623481,\r\n    "2008": 624151,\r\n    "2009": 624817,\r\n    "2010": 625886,\r\n    "2011": 627197,\r\n    "2012": 626361,\r\n    "2013": 626603,\r\n    "2014": 625693,\r\n    "2015": 625810,\r\n    "2016": 624366,\r\n    "2017": 625132,\r\n    "2018": 624802,\r\n    "2019": 624046,\r\n    "2020": 623347\r\n  },\r\n  {\r\n    "states": "Virginia",\r\n    "2000": 7105817,\r\n    "2001": 7198362,\r\n    "2002": 7286873,\r\n    "2003": 7366977,\r\n    "2004": 7475575,\r\n    "2005": 7577105,\r\n    "2006": 7673725,\r\n    "2007": 7751000,\r\n    "2008": 7833496,\r\n    "2009": 7925937,\r\n    "2010": 8024004,\r\n    "2011": 8102437,\r\n    "2012": 8187456,\r\n    "2013": 8255861,\r\n    "2014": 8315430,\r\n    "2015": 8367303,\r\n    "2016": 8417651,\r\n    "2017": 8471011,\r\n    "2018": 8510920,\r\n    "2019": 8556642,\r\n    "2020": 8590563\r\n  },\r\n  {\r\n    "states": "Washington",\r\n    "2000": 5910512,\r\n    "2001": 5985722,\r\n    "2002": 6052349,\r\n    "2003": 6104115,\r\n    "2004": 6178645,\r\n    "2005": 6257305,\r\n    "2006": 6370753,\r\n    "2007": 6461587,\r\n    "2008": 6562231,\r\n    "2009": 6667426,\r\n    "2010": 6743009,\r\n    "2011": 6827479,\r\n    "2012": 6898599,\r\n    "2013": 6966252,\r\n    "2014": 7057531,\r\n    "2015": 7167287,\r\n    "2016": 7299961,\r\n    "2017": 7427951,\r\n    "2018": 7526793,\r\n    "2019": 7614024,\r\n    "2020": 7693612\r\n  },\r\n  {\r\n    "states": "West Virginia",\r\n    "2000": 1807021,\r\n    "2001": 1801481,\r\n    "2002": 1805414,\r\n    "2003": 1812295,\r\n    "2004": 1816438,\r\n    "2005": 1820492,\r\n    "2006": 1827912,\r\n    "2007": 1834052,\r\n    "2008": 1840310,\r\n    "2009": 1847775,\r\n    "2010": 1854265,\r\n    "2011": 1856606,\r\n    "2012": 1857446,\r\n    "2013": 1854768,\r\n    "2014": 1850569,\r\n    "2015": 1843332,\r\n    "2016": 1832435,\r\n    "2017": 1818683,\r\n    "2018": 1805953,\r\n    "2019": 1795263,\r\n    "2020": 1784787\r\n  },\r\n  {\r\n    "states": "Wisconsin",\r\n    "2000": 5373999,\r\n    "2001": 5406835,\r\n    "2002": 5445162,\r\n    "2003": 5479203,\r\n    "2004": 5514026,\r\n    "2005": 5546166,\r\n    "2006": 5577655,\r\n    "2007": 5610775,\r\n    "2008": 5640996,\r\n    "2009": 5669264,\r\n    "2010": 5690538,\r\n    "2011": 5705840,\r\n    "2012": 5720825,\r\n    "2013": 5738012,\r\n    "2014": 5753199,\r\n    "2015": 5762927,\r\n    "2016": 5775170,\r\n    "2017": 5793147,\r\n    "2018": 5809319,\r\n    "2019": 5824581,\r\n    "2020": 5832655\r\n  },\r\n  {\r\n    "states": "Wyoming",\r\n    "2000": 494300,\r\n    "2001": 494657,\r\n    "2002": 500017,\r\n    "2003": 503453,\r\n    "2004": 509106,\r\n    "2005": 514157,\r\n    "2006": 522667,\r\n    "2007": 534876,\r\n    "2008": 546043,\r\n    "2009": 559851,\r\n    "2010": 564531,\r\n    "2011": 567491,\r\n    "2012": 576656,\r\n    "2013": 582620,\r\n    "2014": 583159,\r\n    "2015": 586389,\r\n    "2016": 585243,\r\n    "2017": 579994,\r\n    "2018": 579054,\r\n    "2019": 580116,\r\n    "2020": 582328\r\n  }\r\n]\r\n';});

define('components/content/examples/collection/datagrid',["require", "exports", "preact/jsx-runtime", "text!./data/population.json", "ojs/ojmutablearraydataprovider", "ojs/ojrowdatagridprovider", "ojs/ojconverter-number", "ojs/ojdatagrid", "ojs/ojbutton", "ojs/ojtoolbar"], function (require, exports, jsx_runtime_1, popData, MutableArrayDataProvider, ojrowdatagridprovider_1, ojconverter_number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const populationData = JSON.parse(popData);
    const mutableArrayDataProvider = new MutableArrayDataProvider(populationData);
    const getColumnHeaderClassName = (headerContext) => {
        return getAlignmentClassNameByIndex(headerContext.index);
    };
    const getCellClassName = (cellContext) => {
        return getAlignmentClassNameByIndex(cellContext.indexes.column);
    };
    const getAlignmentClassNameByIndex = (index) => { };
    const cellStyle = {
        className: getCellClassName,
    };
    const numberConverter = new ojconverter_number_1.IntlNumberConverter({ useGrouping: true });
    const headerStyle = {
        column: {
            className: getColumnHeaderClassName,
            resizable: {
                height: "disable",
            },
            label: {},
        },
        columnEnd: {
            label: {},
            resizable: {
                height: "disable",
            },
        },
        row: {
            label: {},
            style: "width:165px",
            resizable: {
                width: "disable",
            },
        },
        rowEnd: {
            label: {},
            resizable: {
                width: "disable",
            },
        },
    };
    const dataDP = new ojrowdatagridprovider_1.RowDataGridProvider(mutableArrayDataProvider, {
        columns: {
            rowHeader: ["states"],
        },
        columnHeaders: {
            column: "attributeName",
        },
        headerLabels: {
            column: ["Years"],
            row: ["States"],
        },
    });
    const cellRenderer = (cell) => {
        return (0, jsx_runtime_1.jsx)("span", { children: numberConverter.format(cell.item.data.data) });
    };
    const DataGrid = () => {
        const changePopulation = () => {
            let tempData = Object.assign([], populationData);
            tempData.unshift({
                states: "FreeState",
                "2000": 5160586,
                "2001": 5273477,
                "2002": 5396255,
                "2003": 5510364,
                "2004": 5652404,
                "2005": 5839077,
                "2006": 6029141,
                "2007": 6167681,
                "2008": 6280362,
                "2009": 6343154,
                "2010": 6407342,
                "2011": 6473416,
                "2012": 6556344,
                "2013": 6634690,
                "2014": 6732873,
                "2015": 6832810,
                "2016": 6944767,
                "2017": 7048088,
                "2018": 7164228,
                "2019": 7291843,
                "2020": 7421401,
            });
            mutableArrayDataProvider.data = tempData;
        };
        const resetPopulation = () => {
            mutableArrayDataProvider.data = populationData;
        };
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ id: "dataGridLabel", class: "oj-typography-heading-xs" }, { children: "State Population by Year" })), (0, jsx_runtime_1.jsx)("oj-data-grid", Object.assign({ id: "datagrid", class: "demo-data-grid", "aria-labelledby": "dataGridLabel", header: headerStyle, cell: cellStyle, data: dataDP }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "cellTemplate", render: cellRenderer }) })), (0, jsx_runtime_1.jsxs)("oj-toolbar", { children: [(0, jsx_runtime_1.jsx)("oj-button", { onojAction: changePopulation, label: "Add new State" }), (0, jsx_runtime_1.jsx)("oj-button", { onojAction: resetPopulation, label: "Reset" })] })] })));
    };
    exports.default = DataGrid;
});

define('components/content/examples/collection/index',["require", "exports", "preact/jsx-runtime", "./table", "./treeview", "./listview", "./datagrid", "preact"], function (require, exports, jsx_runtime_1, table_1, treeview_1, listview_1, datagrid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Collection = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex oj-sm-flex-items-1" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-lg" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Table " })), (0, jsx_runtime_1.jsx)(table_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-lg" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " ListView " })), (0, jsx_runtime_1.jsx)(listview_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Treeview " })), (0, jsx_runtime_1.jsx)(treeview_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-lg" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " DataGrid " })), (0, jsx_runtime_1.jsx)(datagrid_1.default, {})] }))] })) })));
    };
    exports.default = Collection;
});


define('text!components/content/examples/form/data/peopleData.json',[],function () { return '[\r\n  {\r\n    "id": 1,\r\n    "name": "Chris Black",\r\n    "title": "Oracle Cloud Infrastructure GTM Channel Director EMEA",\r\n    "image": "images/hcm/placeholder-male-01.png",\r\n    "department": "Engineering"\r\n  },\r\n  {\r\n    "id": 2,\r\n    "name": "Christine Cooper",\r\n    "title": "Senior Principal Escalation Manager",\r\n    "image": "images/hcm/placeholder-female-01.png",\r\n    "department": "Global Support"\r\n  },\r\n  {\r\n    "id": 3,\r\n    "name": "Chris Benalamore",\r\n    "title": "Area Business Operations Director EMEA & JAPAC",\r\n    "image": "images/hcm/placeholder-male-03.png",\r\n    "department": "Customer Support"\r\n  },\r\n  {\r\n    "id": 4,\r\n    "name": "Christopher Johnson",\r\n    "title": "Vice-President HCM Application Development",\r\n    "image": "images/hcm/placeholder-male-04.png",\r\n    "department": "Sales"\r\n  },\r\n  {\r\n    "id": 5,\r\n    "name": "Samire Christian",\r\n    "title": "Consulting Project Technical Manager",\r\n    "image": "images/hcm/placeholder-male-05.png",\r\n    "department": "Global Support"\r\n  },\r\n  {\r\n    "id": 6,\r\n    "name": "Kurt Marchris",\r\n    "title": "Customer Service Analyst",\r\n    "image": "images/hcm/placeholder-male-06.png",\r\n    "department": "Customer Support"\r\n  },\r\n  {\r\n    "id": 7,\r\n    "name": "Zelda Christian Cooperman",\r\n    "title": "Senior Principal Escalation Manager",\r\n    "image": "images/hcm/placeholder-female-02.png",\r\n    "department": "Engineering"\r\n  }\r\n]';});

define('components/content/examples/form/formelements',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojconverter-number", "ojs/ojconverterutils-i18n", "ojs/ojmutablearraydataprovider", "text!./data/peopleData.json", "ojs/ojbutton", "ojs/ojcheckboxset", "ojs/ojformlayout", "ojs/ojinputtext", "ojs/ojdatetimepicker", "ojs/ojselectsingle", "ojs/ojdialog"], function (require, exports, jsx_runtime_1, hooks_1, NumberConverter, ConverterUtilsI18n, MutableArrayDataProvider, peopleData) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const buyers = [];
    JSON.parse(peopleData).map((item) => {
        buyers.push({ id: item.id, value: item.name, label: item.name });
    });
    const buyerData = new MutableArrayDataProvider(buyers, {
        keyAttributes: "value",
    });
    const hintDefinition = {
        definition: "cost of a single item",
    };
    const placeholder = "Enter item cost";
    const lblHint = "Item Cost";
    const eurNumberConverter = new NumberConverter.IntlNumberConverter({
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
    });
    let value = "598.42";
    let name = "Kopi Luwak beans (2 lbs)";
    let valDateTime = ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(new Date());
    const FormElements = () => {
        const [formData, setFormData] = (0, hooks_1.useState)({
            itemName: name,
            itemBuyer: "",
            itemCost: value,
            salesDate: valDateTime,
        });
        const [isDisabled, setIsDisabled] = (0, hooks_1.useState)(true);
        const [density, setDensity] = (0, hooks_1.useState)("efficient");
        const dialogRef = (0, hooks_1.useRef)(null);
        const onChange = (event) => {
            setFormData(Object.assign(Object.assign({}, formData), { [event.currentTarget.id]: event.detail.value }));
        };
        const onSubmit = (event) => {
            event.preventDefault();
            dialogRef.current.open();
            console.log("formData: " + JSON.stringify(formData));
        };
        const close = () => {
            dialogRef.current.close();
        };
        const handleAgreement = (event) => {
            event.detail.value.length < 1 ? setIsDisabled(true) : setIsDisabled(false);
        };
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("oj-form-layout", Object.assign({ userAssistanceDensity: density, labelEdge: "inside", columns: 1, class: "oj-md-margin-4x-horizontal" }, { children: [(0, jsx_runtime_1.jsx)("oj-input-text", Object.assign({ id: "itemName", value: formData.itemName, labelHint: "Name", onvalueChanged: onChange }, { children: (0, jsx_runtime_1.jsx)("span", { slot: "end", class: "oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end", role: "presentation" }) })), (0, jsx_runtime_1.jsx)("oj-input-text", { id: "itemCost", value: formData.itemCost, placeholder: placeholder, labelHint: lblHint, helpHints: hintDefinition, onvalueChanged: onChange, converter: eurNumberConverter }), (0, jsx_runtime_1.jsx)("oj-input-date-time", { id: "salesDate", value: formData.salesDate, labelHint: "Purchase date", onvalueChanged: onChange }), (0, jsx_runtime_1.jsx)("oj-select-single", { id: "itemBuyer", labelHint: "Buyer", data: buyerData, value: formData.itemBuyer, onvalueChanged: onChange }), (0, jsx_runtime_1.jsx)("oj-checkboxset", Object.assign({ id: "checkboxSetAgreeId", labelHint: "Everything is correct?", labelEdge: "inside", onvalueChanged: handleAgreement }, { children: (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ value: "agree" }, { children: "I Agree" })) })), (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ onojAction: onSubmit, disabled: isDisabled }, { children: "Send this stuff" }))] })), (0, jsx_runtime_1.jsxs)("oj-dialog", Object.assign({ ref: dialogRef, dialogTitle: "Form Data Submitted" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "body" }, { children: (0, jsx_runtime_1.jsxs)("oj-form-layout", Object.assign({ id: "desc" }, { children: [(0, jsx_runtime_1.jsx)("oj-input-text", { id: "finalName", readonly: true, value: formData.itemName, labelHint: "Name" }), (0, jsx_runtime_1.jsx)("oj-input-text", { id: "finalPrice", readonly: true, value: formData.itemCost, labelHint: "Price", converter: eurNumberConverter }), (0, jsx_runtime_1.jsx)("oj-input-date-time", { id: "salesDate", value: formData.salesDate, labelHint: "Purchase date", readonly: true })] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "footer" }, { children: (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "okButton", onojAction: close }, { children: "OK" })) }))] }))] }));
    };
    exports.default = FormElements;
});

define('components/content/examples/form/index',["require", "exports", "preact/jsx-runtime", "./formelements"], function (require, exports, jsx_runtime_1, formelements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Form = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Form Elements " })), (0, jsx_runtime_1.jsx)(formelements_1.default, {})] })) })) })));
    };
    exports.default = Form;
});


define('text!components/content/examples/dataviz/data/basicData.json',[],function () { return '[\r\n\t{\r\n\t\t"id": 0,\r\n\t\t"series": "Series 1",\r\n\t\t"group": "Group A",\r\n\t\t"value": 42\r\n\t},\r\n\t{\r\n\t\t"id": 1,\r\n\t\t"series": "Series 1",\r\n\t\t"group": "Group B",\r\n\t\t"value": 34\r\n\t},\r\n\t{\r\n\t\t"id": 2,\r\n\t\t"series": "Series 2",\r\n\t\t"group": "Group A",\r\n\t\t"value": 55\r\n\t},\r\n\t{\r\n\t\t"id": 3,\r\n\t\t"series": "Series 2",\r\n\t\t"group": "Group B",\r\n\t\t"value": 30\r\n\t},\r\n\t{\r\n\t\t"id": 4,\r\n\t\t"series": "Series 3",\r\n\t\t"group": "Group A",\r\n\t\t"value": 36\r\n\t},\r\n\t{\r\n\t\t"id": 5,\r\n\t\t"series": "Series 3",\r\n\t\t"group": "Group B",\r\n\t\t"value": 50\r\n\t},\r\n\t{\r\n\t\t"id": 6,\r\n\t\t"series": "Series 4",\r\n\t\t"group": "Group A",\r\n\t\t"value": 22\r\n\t},\r\n\t{\r\n\t\t"id": 7,\r\n\t\t"series": "Series 4",\r\n\t\t"group": "Group B",\r\n\t\t"value": 46\r\n\t},\r\n\t{\r\n\t\t"id": 8,\r\n\t\t"series": "Series 5",\r\n\t\t"group": "Group A",\r\n\t\t"value": 22\r\n\t},\r\n\t{\r\n\t\t"id": 9,\r\n\t\t"series": "Series 5",\r\n\t\t"group": "Group B",\r\n\t\t"value": 46\r\n\t}\r\n]';});

define('components/content/examples/dataviz/chart',["require", "exports", "preact/jsx-runtime", "ojs/ojmutablearraydataprovider", "text!./data/basicData.json", "ojs/ojchart"], function (require, exports, jsx_runtime_1, MutableArrayDataProvider, data) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const xaxisConfig = {
        tickLabel: { rotation: "auto", rendered: "on" },
    };
    const dataProvider = new MutableArrayDataProvider(JSON.parse(data), {
        keyAttributes: "id",
    });
    const renderChartItem = (item) => {
        return ((0, jsx_runtime_1.jsx)("oj-chart-item", { value: item.data.value, groupId: [item.data.group], seriesId: item.data.series }));
    };
    const Chart = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsx)("oj-chart", Object.assign({ "aria-label": "sample bar chart", id: "barChart", type: "bar", orientation: "vertical", stack: "off", data: dataProvider, animationOnDisplay: "auto", animationOnDataChange: "auto", hoverBehavior: "dim", hideAndShowBehavior: "withRescale", xAxis: xaxisConfig, class: "chart-sizing" }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderChartItem }) })) })));
    };
    exports.default = Chart;
});


define('text!components/content/examples/dataviz/data/drillData.json',[],function () { return '[\r\n  {\r\n    "id": 0,\r\n    "series": "Series 1",\r\n    "quarter": "Q1",\r\n    "value": 74\r\n  },\r\n  {\r\n    "id": 1,\r\n    "series": "Series 1",\r\n    "quarter": "Q2",\r\n    "value": 42\r\n  },\r\n  {\r\n    "id": 2,\r\n    "series": "Series 1",\r\n    "quarter": "Q3",\r\n    "value": 70\r\n  },\r\n  {\r\n    "id": 3,\r\n    "series": "Series 1",\r\n    "quarter": "Q4",\r\n    "value": 46\r\n  },\r\n  {\r\n    "id": 4,\r\n    "series": "Series 2",\r\n    "quarter": "Q1",\r\n    "value": 50\r\n  },\r\n  {\r\n    "id": 5,\r\n    "series": "Series 2",\r\n    "quarter": "Q2",\r\n    "value": 58\r\n  },\r\n  {\r\n    "id": 6,\r\n    "series": "Series 2",\r\n    "quarter": "Q3",\r\n    "value": 46\r\n  },\r\n  {\r\n    "id": 7,\r\n    "series": "Series 2",\r\n    "quarter": "Q4",\r\n    "value": 54\r\n  },\r\n  {\r\n    "id": 8,\r\n    "series": "Series 3",\r\n    "quarter": "Q1",\r\n    "value": 34\r\n  },\r\n  {\r\n    "id": 9,\r\n    "series": "Series 3",\r\n    "quarter": "Q2",\r\n    "value": 22\r\n  },\r\n  {\r\n    "id": 10,\r\n    "series": "Series 3",\r\n    "quarter": "Q3",\r\n    "value": 30\r\n  },\r\n  {\r\n    "id": 11,\r\n    "series": "Series 3",\r\n    "quarter": "Q4",\r\n    "value": 32\r\n  },\r\n  {\r\n    "id": 12,\r\n    "series": "Series 4",\r\n    "quarter": "Q1",\r\n    "value": 18\r\n  },\r\n  {\r\n    "id": 13,\r\n    "series": "Series 4",\r\n    "quarter": "Q2",\r\n    "value": 6\r\n  },\r\n  {\r\n    "id": 14,\r\n    "series": "Series 4",\r\n    "quarter": "Q3",\r\n    "value": 14\r\n  },\r\n  {\r\n    "id": 15,\r\n    "series": "Series 4",\r\n    "quarter": "Q4",\r\n    "value": 22\r\n  }\r\n]\r\n';});

define('components/content/examples/dataviz/chart-drill',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojattributegrouphandler", "ojs/ojmutablearraydataprovider", "text!./data/drillData.json", "ojs/ojbutton", "ojs/ojchart"], function (require, exports, jsx_runtime_1, hooks_1, ojattributegrouphandler_1, MutableArrayDataProvider, data) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrillChart = void 0;
    const dataProvider = new MutableArrayDataProvider([], {
        keyAttributes: "id",
    });
    const colorHandler = new ojattributegrouphandler_1.ColorAttributeGroupHandler();
    const years = ["2012", "2013", "2014", "2015"];
    const getYearlyItems = () => {
        const chartData = JSON.parse(data);
        const items = [];
        for (let i = 0; i < chartData.length; i += 4) {
            const year = years[i / 4];
            chartData[i].color = colorHandler.getValue(year);
            chartData[i].group = year;
            chartData[i].series = "Total Revenue";
            chartData[i].value =
                chartData[i].value +
                    chartData[i + 1].value +
                    chartData[i + 2].value +
                    chartData[i + 3].value;
            items.push(chartData[i]);
        }
        dataProvider.data = items;
    };
    const getQuarterlyItems = (year) => {
        const start = (year - 2012) * 4;
        const chartData = JSON.parse(data).slice(start, start + 4);
        for (let i = 0; i < chartData.length; i++) {
            chartData[i].color = colorHandler.getValue(year.toString());
            chartData[i].series = year;
        }
        dataProvider.data = chartData;
    };
    const renderChartItem = (item) => {
        return ((0, jsx_runtime_1.jsx)("oj-chart-item", { groupId: [item.data.group || item.data.quarter], seriesId: item.data.series, color: item.data.color, value: item.data.value }));
    };
    const DrillChart = () => {
        const [isDisabled, setIsDisabled] = (0, hooks_1.useState)(true);
        const [drillingValue, setDrillingValue] = (0, hooks_1.useState)("groupsOnly");
        const [titleValue, setTitleValue] = (0, hooks_1.useState)("Annual");
        const [tickLabelStyle, setTickLabelStyle] = (0, hooks_1.useState)({
            textDecoration: "underline",
            color: "#045fab",
        });
        const xaxisConfig = {
            tickLabel: {
                rotation: "auto",
                rendered: "on",
                style: tickLabelStyle,
            },
        };
        (0, hooks_1.useEffect)(() => {
            getYearlyItems();
        }, []);
        const drillUpButtonClick = (event) => {
            getYearlyItems();
            setDrillingValue("groupsOnly");
            setTitleValue("Annual");
            setTickLabelStyle({ textDecoration: "underline", color: "#045fab" });
            setIsDisabled(true);
        };
        const chartDrillAction = (event) => {
            getQuarterlyItems(Number(event.detail.group));
            setDrillingValue("off");
            setTitleValue(event.detail.group);
            setTickLabelStyle({});
            setIsDisabled(false);
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "chart-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-typography-heading-xs" }, { children: [titleValue, " Revenue"] })), (0, jsx_runtime_1.jsx)("oj-toolbar", Object.assign({ "aria-controls": "barChart" }, { children: !isDisabled && ((0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "drillUpButton", onojAction: drillUpButtonClick, chroming: "outlined" }, { children: "Return" }))) })), (0, jsx_runtime_1.jsx)("oj-chart", Object.assign({ id: "barChart", type: "bar", orientation: "vertical", data: dataProvider, drilling: drillingValue, xAxis: xaxisConfig, onojGroupDrill: chartDrillAction, legend: { rendered: "off" } }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderChartItem }) }))] })) })));
    };
    exports.DrillChart = DrillChart;
});

define('components/content/examples/dataviz/legend',["require", "exports", "preact/jsx-runtime", "ojs/ojattributegrouphandler", "ojs/ojmutablearraydataprovider", "ojs/ojlegend"], function (require, exports, jsx_runtime_1, ojattributegrouphandler_1, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fruits = [
        { fruit: "Blueberries" },
        { fruit: "Kiwis" },
        { fruit: "Bananas" },
        { fruit: "Apples" },
        { fruit: "Grapes" },
    ];
    const dataProvider = new MutableArrayDataProvider(fruits, {
        keyAttributes: "fruit",
    });
    const colorHandler = new ojattributegrouphandler_1.ColorAttributeGroupHandler();
    const getColor = (item) => {
        return colorHandler.getValue(item);
    };
    const renderLegendItem = (item) => {
        if (item) {
            return ((0, jsx_runtime_1.jsx)("oj-legend-item", { text: item.data.fruit, color: getColor(item.data.fruit) }));
        }
    };
    const Legend = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-md-margin-4x-horizontal" }, { children: (0, jsx_runtime_1.jsx)("oj-legend", Object.assign({ id: "legend1", orientation: "vertical", data: dataProvider, symbolHeight: 20, symbolWidth: 20 }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: renderLegendItem }) })) })));
    };
    exports.default = Legend;
});

define('components/content/examples/dataviz/index',["require", "exports", "preact/jsx-runtime", "./chart", "./chart-drill", "./legend"], function (require, exports, jsx_runtime_1, chart_1, chart_drill_1, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DataViz = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex oj-sm-flex-items-1" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Chart " })), (0, jsx_runtime_1.jsx)(chart_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Standalone Legend " })), (0, jsx_runtime_1.jsx)(legend_1.default, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Drillable Chart " })), (0, jsx_runtime_1.jsx)(chart_drill_1.DrillChart, {})] }))] })) })));
    };
    exports.default = DataViz;
});

define('components/content/examples/control/index',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Control = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6" }, { children: (0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Something coming soon " })) })) })) })));
    };
    exports.default = Control;
});

define('components/content/examples/navlayout/navlist',["require", "exports", "preact/jsx-runtime", "ojs/ojmutablearraytreedataprovider", "preact/hooks", "ojs/ojnavigationlist", "preact"], function (require, exports, jsx_runtime_1, ojmutablearraytreedataprovider_1, hooks_1) {
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
            return ((0, jsx_runtime_1.jsx)("li", Object.assign({ id: item.data.id }, { children: (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: "" }, { children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-navigationlist-item-icon " + item.data.icons }), item.data.name] })) })));
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("oj-navigation-list", Object.assign({ style: "max-width:20rem", drillMode: "collapsible", "aria-label": "Choose a navigation item", selection: selectedItem, data: dataprovider, onselectionChanged: changeHandler, id: "navlist" }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: navItemTemplate }) })) })));
    };
    exports.NavList = NavList;
});

define('components/content/examples/navlayout/accordion',["require", "exports", "preact/jsx-runtime", "ojs/ojaccordion", "ojs/ojradioset", "ojs/ojlabel", "preact"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Accordion = void 0;
    const Accordion = () => {
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("oj-accordion", Object.assign({ id: "a1" }, { children: [(0, jsx_runtime_1.jsxs)("oj-collapsible", Object.assign({ id: "c1" }, { children: [(0, jsx_runtime_1.jsxs)("h3", Object.assign({ slot: "header" }, { children: [(0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-cart oj-ux-icon-size-5x oj-sm-padding-2x-end" }), "Header 1"] })), (0, jsx_runtime_1.jsx)("p", { children: "Content 1." })] })), (0, jsx_runtime_1.jsxs)("oj-collapsible", Object.assign({ id: "c3", expanded: true }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ slot: "header" }, { children: "Header 2" })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("oj-label", Object.assign({ id: "mainlabelid" }, { children: "Colors" })), (0, jsx_runtime_1.jsxs)("oj-radioset", Object.assign({ id: "radiosetBasicDemoId", value: "red", "labelled-by": "mainlabelid" }, { children: [(0, jsx_runtime_1.jsx)("oj-option", Object.assign({ id: "blueopt", value: "blue" }, { children: "Blue" })), (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ id: "greenopt", value: "green" }, { children: "Green" })), (0, jsx_runtime_1.jsx)("oj-option", Object.assign({ id: "redopt", value: "red" }, { children: "Red" }))] }))] })] })), (0, jsx_runtime_1.jsxs)("oj-collapsible", Object.assign({ id: "c4" }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ slot: "header" }, { children: "Header 3" })), (0, jsx_runtime_1.jsx)("p", { children: "Content 3." })] }))] })) })));
    };
    exports.Accordion = Accordion;
});

define('css',[],function(){if("undefined"==typeof window)return{load:function(a,b,c){c()}};var a=document.getElementsByTagName("head")[0],b=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,c=!1,d=!0;b[1]||b[7]?c=parseInt(b[1])<6||parseInt(b[7])<=9:b[2]||b[8]?d=!1:b[4]&&(c=parseInt(b[4])<18);var e={};e.pluginBuilder="./css-builder";var f,g,h,i=function(){f=document.createElement("style"),a.appendChild(f),g=f.styleSheet||f.sheet},j=0,k=[],l=function(a){g.addImport(a),f.onload=function(){m()},j++,31==j&&(i(),j=0)},m=function(){h();var a=k.shift();return a?(h=a[1],void l(a[0])):void(h=null)},n=function(a,b){if(g&&g.addImport||i(),g&&g.addImport)h?k.push([a,b]):(l(a),h=b);else{f.textContent='@import "'+a+'";';var c=setInterval(function(){try{f.sheet.cssRules,clearInterval(c),b()}catch(a){}},10)}},o=function(b,c){var e=document.createElement("link");if(e.type="text/css",e.rel="stylesheet",d)e.onload=function(){e.onload=function(){},setTimeout(c,7)};else var f=setInterval(function(){for(var a=0;a<document.styleSheets.length;a++){var b=document.styleSheets[a];if(b.href==e.href)return clearInterval(f),c()}},10);e.href=b,a.appendChild(e)};return e.normalize=function(a,b){return".css"==a.substr(a.length-4,4)&&(a=a.substr(0,a.length-4)),b(a)},e.load=function(a,b,d,e){(c?n:o)(b.toUrl(a+".css"),d)},e});

define('css!components/content/examples/navlayout/style/actioncard',[],function(){});
define('components/content/examples/navlayout/actioncard',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojactioncard", "ojs/ojlabel", "preact", "css!./style/actioncard.css"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    const ActionCard = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        const actionHandler = (event) => {
            setLogMsg("Action handler invoked - " + event.currentTarget.id);
        };
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: [(0, jsx_runtime_1.jsx)("oj-action-card", Object.assign({ id: "Default", onojAction: actionHandler, class: "oj-sm-margin-2x demo-card-content" }, { children: "Non-interactive content goes in here" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-sm-padding-4x-vertical" }, { children: [(0, jsx_runtime_1.jsx)("oj-label", Object.assign({ for: "changelog" }, { children: "Event:" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ id: "changelog" }, { children: logMsg }))] }))] })));
    };
    exports.ActionCard = ActionCard;
});

define('components/content/examples/navlayout/tabbar',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojactioncard", "ojs/ojlabel", "preact"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBar = void 0;
    const TabBar = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        const actionHandler = (event) => {
            setLogMsg("Action handler invoked - " + event.currentTarget.id);
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: "See the /examples/index.tsx file for oj-tab-bar code used above." })) })));
    };
    exports.TabBar = TabBar;
});

define('components/content/examples/navlayout/dialog',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojdialog", "ojs/ojpopup", "ojs/ojbutton", "preact"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = exports.Dialog = void 0;
    const Dialog = () => {
        const diag1 = (0, hooks_1.useRef)(null);
        const open = (event) => {
            var _a;
            (_a = diag1.current) === null || _a === void 0 ? void 0 : _a.open();
        };
        const close = () => {
            var _a;
            (_a = diag1.current) === null || _a === void 0 ? void 0 : _a.close();
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: [(0, jsx_runtime_1.jsx)("oj-button", { onojAction: open, label: "Open Dialog" }), (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsxs)("oj-dialog", Object.assign({ id: "dialog1", "dialog-title": "Example Dialog", "aria-describedby": "desc", ref: diag1 }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "body" }, { children: (0, jsx_runtime_1.jsx)("p", Object.assign({ id: "desc" }, { children: "This is the dialog content. User can change dialog resize behavior, cancel behavior and drag behavior by setting properties. Default property value depends on the theme." })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ slot: "footer" }, { children: (0, jsx_runtime_1.jsx)("oj-button", Object.assign({ id: "okButton", onojAction: close }, { children: "OK" })) }))] })) })] })) })));
    };
    exports.Dialog = Dialog;
    const Popup = () => {
        const [logMsg, setLogMsg] = (0, hooks_1.useState)("none");
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: "See the /examples/index.tsx file for oj-tab-bar code used above." })) })));
    };
    exports.Popup = Popup;
});

define('components/content/examples/navlayout/popup',["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojpopup", "ojs/ojbutton"], function (require, exports, jsx_runtime_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = void 0;
    const positionConfig = {
        at: {
            horizontal: "end",
            vertical: "top",
        },
        my: {
            horizontal: "start",
            vertical: "bottom",
        },
    };
    const Popup = () => {
        const popRef = (0, hooks_1.useRef)(null);
        const open = (event) => {
            var _a;
            (_a = popRef.current) === null || _a === void 0 ? void 0 : _a.open("#btn1");
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-oj-typography-bold" }, { children: [(0, jsx_runtime_1.jsx)("oj-button", { id: "btn1", onojAction: open, label: "Show popup" }), (0, jsx_runtime_1.jsx)("oj-popup", Object.assign({ id: "popupId1", ref: popRef, autoDismiss: "focusLoss", modality: "modeless", position: positionConfig, tail: "simple" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex" }, { children: (0, jsx_runtime_1.jsx)("pre", Object.assign({ class: "\r\n                oj-flex-item\r\n                demo-position\r\n                oj-typography-body-sm\r\n              " }, { children: "Something short and sweet goes here!" })) })) }))] })) })));
    };
    exports.Popup = Popup;
});

define('components/content/examples/navlayout/index',["require", "exports", "preact/jsx-runtime", "./navlist", "./accordion", "./actioncard", "./tabbar", "./dialog", "./popup", "preact/hooks", "preact", "ojs/ojbutton", "ojs/ojformlayout", "ojs/ojinputtext", "ojs/ojdrawerlayout"], function (require, exports, jsx_runtime_1, navlist_1, accordion_1, actioncard_1, tabbar_1, dialog_1, popup_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const NavLayout = () => {
        const [opened, setOpened] = (0, hooks_1.useState)(false);
        const toggleDrawer = () => {
            setOpened(!opened);
        };
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: [(0, jsx_runtime_1.jsx)("oj-button", { onojAction: toggleDrawer, "aria-label": "To go to drawer content, locate header with name Drawer Content", label: "Toggle End Drawer", chroming: "callToAction" }), (0, jsx_runtime_1.jsxs)("oj-drawer-layout", Object.assign({ endOpened: opened, class: "demo-full-height" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex oj-sm-flex-items-1" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Navigation List " })), (0, jsx_runtime_1.jsx)(navlist_1.NavList, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: "Accordion and Collapsible" })), (0, jsx_runtime_1.jsx)(accordion_1.Accordion, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Action Card " })), (0, jsx_runtime_1.jsx)(actioncard_1.ActionCard, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Tabbar " })), (0, jsx_runtime_1.jsx)(tabbar_1.TabBar, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Dialog " })), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {})] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ class: "oj-typography-heading-sm" }, { children: " Popup " })), (0, jsx_runtime_1.jsx)(popup_1.Popup, {})] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ slot: "end", class: "oj-color-invert nav-drawer-light-bg demo-full-height" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "demo-drawer-header" }, { children: [(0, jsx_runtime_1.jsx)("h6", { children: "Drawer Content" }), (0, jsx_runtime_1.jsxs)("oj-button", Object.assign({ display: "icons", chroming: "borderless", onojAction: toggleDrawer }, { children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-close" }), "Close"] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "demo-padding demo-form-container oj-typography-body-md" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "Add any kind of content that you like in here." }), (0, jsx_runtime_1.jsx)("p", { children: "You can also set the drawer to overlay instead of reflowing the page content." }), (0, jsx_runtime_1.jsx)("p", { children: "If you want a drawer that covers the full page instead of this content area, you can use the oj-drawer-popup component." })] }))] }))] }))] })));
    };
    exports.default = NavLayout;
});

define('components/content/examples/index',["require", "exports", "preact/jsx-runtime", "./collection/index", "./form/index", "./dataviz/index", "./control/index", "./navlayout/index", "preact/hooks", "ojs/ojmutablearraydataprovider", "ojs/ojnavigationlist"], function (require, exports, jsx_runtime_1, index_1, index_2, index_3, index_4, index_5, hooks_1, MutableArrayDataProvider) {
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
            return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("a", Object.assign({ href: "#" }, { children: [(0, jsx_runtime_1.jsx)("span", {}), item.data.label] })) }));
        };
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ class: "oj-typography-heading-lg" }, { children: " Examples " })), (0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("oj-tab-bar", Object.assign({ edge: "top", data: tabbarDP, selection: activeTab, onselectionChanged: loadTabContent }, { children: (0, jsx_runtime_1.jsx)("template", { slot: "itemTemplate", render: tabItemTemplate }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-flex-item oj-sm-margin-6x-bottom oj-sm-12" }, { children: pageContent() }))] })));
    };
    exports.default = ExampleContent;
});

define('components/content/index',["require", "exports", "preact/jsx-runtime", "./bindings/index", "./modules/index", "./examples/index"], function (require, exports, jsx_runtime_1, index_1, index_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Content = (props) => {
        let pageContent = (page) => {
            switch (page) {
                case "modules":
                    return (0, jsx_runtime_1.jsx)(index_2.default, {});
                case "bindings":
                    return (0, jsx_runtime_1.jsx)(index_1.default, {});
                case "examples":
                    return (0, jsx_runtime_1.jsx)(index_3.default, {});
            }
        };
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ class: "oj-web-applayout-max-width oj-web-applayout-content" }, { children: pageContent(props.page) })));
    };
    exports.default = Content;
});

define('components/app',["require", "exports", "preact/jsx-runtime", "./header", "./footer", "./content/index", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcorerouter", "ojs/ojurlparamadapter", "ojs/ojcontext", "preact"], function (require, exports, jsx_runtime_1, header_1, footer_1, index_1, ojvcomponent_1, hooks_1, CoreRouter, UrlParamAdapter, Context) {
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

define('index',["require","exports","./components/app"],(function(require,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0})}));
/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
requirejs.config({map:{"*":{react:"preact/compat","react-dom":"preact/compat"}},baseUrl:".",paths:{knockout:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/knockout/knockout-3.5.1",jquery:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/jquery/jquery-3.6.4.min","jqueryui-amd":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/jquery/jqueryui-amd-1.13.2.min",hammerjs:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/hammer/hammer-2.0.8.min",ojdnd:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/dnd-polyfill/dnd-polyfill-1.0.2.min",ojL10n:"libs/oj/15.1.2/ojL10n","@oracle/oraclejet-preact":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/oraclejet-preact/amd","oj-c":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/../../packs/oj-c/15.1.2/min",persist:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/persist/min",text:"libs/require/text",signals:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/js-signals/signals.min",touchr:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/touchr/touchr",preact:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/dist/preact.umd","preact/hooks":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/hooks/dist/hooks.umd","preact/compat":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/compat/dist/compat.umd","preact/jsx-runtime":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/jsx-runtime/dist/jsxRuntime.umd","preact/debug":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/debug/dist/debug.umd","preact/devtools":"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/preact/devtools/dist/devtools.umd",proj4:"https://static.oracle.com/cdn/jet/15.1.2/3rdparty/proj4js/dist/proj4",css:"libs/require-css/css.min",ojcss:"libs/oj/15.1.2/min/ojcss","ojs/ojcss":"libs/oj/15.1.2/min/ojcss","css-builder":"libs/require-css/css-builder",normalize:"libs/require-css/normalize","ojs/normalize":"libs/require-css/normalize",components:"components"}}),require(["index"]);
define("bundle-temp", function(){});


(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('.demo-card-content {\r\n  max-width: 25rem;\r\n  height: 15rem;\r\n  padding: 2rem;\r\n}\r\n');
