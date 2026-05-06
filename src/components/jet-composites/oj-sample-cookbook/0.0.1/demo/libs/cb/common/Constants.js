define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Constants {
    }
    Constants.ID_SEPARATOR = "\u00A9";
    Constants.FILE_SEPARATOR = "/";
    Constants.TABS_COMPONENT_ID = "hnavlist";
    Constants.DEMO_SCROLL_CONTAINER_CLASS = "demo-scroll-container";
    Constants.PLATFORM_MAP = {
        redwood: {
            id: "redwood",
            label: "Redwood",
            iconStyleClass: "oj-ux-ico-oracle-o ",
            displayList: ["desktop", "phone_portrait"],
            demoThemes: ["none", "ocean"],
            disabled: false
        },
        alta: {
            id: "alta",
            label: "Alta Web - Deprecated",
            iconStyleClass: "oj-ux-ico-file-web ",
            displayList: ["desktop", "phone_portrait"],
            demoThemes: ["none", "stealth", "green", "sanfrancisco"],
            disabled: false
        },
        "alta-ios": {
            id: "alta-ios",
            label: "Alta iOS - Deprecated",
            iconStyleClass: "oj-ux-ico-apple-ios ",
            demoThemes: ["none", "stealth", "green", "sanfrancisco"],
            disabled: false
        },
        "alta-android": {
            id: "alta-android",
            label: "Alta Android - Deprecated",
            iconStyleClass: "oj-ux-ico-android ",
            demoThemes: ["none", "stealth", "green", "sanfrancisco"],
            disabled: false
        },
        "alta-windows": {
            id: "alta-windows",
            label: "Alta Windows - Deprecated",
            iconStyleClass: "oj-ux-ico-microsoft-windows ",
            demoThemes: ["none", "stealth", "green", "sanfrancisco"],
            disabled: false
        },
        ocean: {
            id: "ocean",
            label: "Ocean Demo Theme",
            iconStyleClass: "oj-ux-ico-minimize ",
            displayList: ["desktop", "phone_portrait"],
            demoThemes: ["none"],
            disabled: false
        }
    };
    //VB
    //JET
    Constants.ALL_TAB_ID = "st_all";
    Constants.INFO_TAB_ID = "nt_info";
    Constants.ALL_TAB_HTML_EDITOR_ID = "html-example-all";
    Constants.ALL_TAB_JS_EDITOR_ID = "script-example-all";
    Constants.ALL_TAB_TS_EDITOR_ID = "tsscript-example-all";
    Constants.ALL_TAB_WD_TS_EDITOR_ID = "wdtsscript-example-all";
    Constants.ALL_TAB_CSS_EDITOR_ID = "css-example-all";
    Constants.MODULE_VIEW_REG_EXP = new RegExp("^js" +
        Constants.FILE_SEPARATOR +
        "views" +
        Constants.FILE_SEPARATOR +
        "((.)*)?.html$");
    Constants.MODULE_VIEW_MODEL_REG_EXP = new RegExp("^js" +
        Constants.FILE_SEPARATOR +
        "viewModels" +
        Constants.FILE_SEPARATOR +
        "((.)*)?.[jt]{1}s");
    Constants.COMPONENT_DEMO_NAME = "componentDemoContent";
    Constants.DEMO_TITLE_INSERT_POINT = "<!--DemoPageTitle-->";
    Constants.DEMO_ALTA_LINK_INSERT_POINT = "<!--AltaLink-->";
    Constants.HTML_INSERT_POINT_IN_DEMO_TEMPLATE = "<!--demoContentStart-->";
    Constants.EDITOR_TYPES = {
        html: "htmlmixed",
        js: "javascript",
        ts: "text/typescript-jsx",
        css: "css",
        json: "application/json"
    };
    Constants.ARTIFACT_FILE_TYPE_HTML = "html";
    Constants.ARTIFACT_FILE_TYPE_JS = "js";
    Constants.ARTIFACT_FILE_TYPE_TS = "ts";
    Constants.ARTIFACT_FILE_TYPE_WD_TS = "spec.ts";
    Constants.ARTIFACT_FILE_TYPE_CSS = "css";
    Constants.ARTIFACT_FILE_TYPE_VIEW = "view";
    Constants.ARTIFACT_FILE_TYPE_VIEW_MODEL = "viewModel";
    Constants.ARTIFACT_FILE_TYPE_VIEW_MODEL_TS = "viewModelTS";
    Constants.ARTIFACT_TYPE_DEMO = "demo";
    Constants.ARTIFACT_TYPE_WD_TS = "webdriver";
    Constants.ARTIFACT_TYPE_CONFIG = "config";
    Constants.ARTIFACT_TYPE_MODULE = "module";
    Constants.ARTIFACT_TYPE_COMPOSITE = "composite";
    Constants.ARTIFACT_TYPE_JSON = "json";
    Constants.ARTIFACT_TYPE_OTHER = "other";
    Constants.INDEX_TEMPLATE_FILE = "js/templates/demo/index.html";
    Constants.HTML_INDENTATION = "        "; // 8 spaces
    Constants.HTML_FOLD_LINES = "1-12";
    Constants.HTML_READ_ONLY_LINES = 26;
    Constants.HTML_CUSTOM_HEADER_MARKER = "***Token:Metadata2***";
    Constants.HTML_CUSTOM_HEADER_PREFIX = "<!--customHeaderStart-->";
    Constants.HTML_CUSTOM_HEADER_SUFFIX = "<!--customHeaderEnd-->";
    Constants.HTML_DEMO_CODE_PREFIX = "<!--demoCodeStart-->";
    Constants.HTML_DEMO_CODE_SUFFIX = "<!--demoCodeEnd-->";
    Constants.HTML_DEMO_TITLE_PREFIX = "<title>";
    Constants.HTML_DEMO_TITLE_SUFFIX = "</title>";
    Constants.HTML_CUSTOM_HEADER_INDENTATION = "    "; // 4 spaces
    Constants.MAIN_TEMPLATE_FILE = "js/templates/js/main.js";
    Constants.JET_COMMUNITY_MAIN_TEMPLATE_FILE = "resources/dt/templates/main.js";
    Constants.JET_COMMUNITY_INDEX_TEMPLATE_FILE = "resources/dt/templates/index.html";
    Constants.MAIN_JS_FILE = "js" + Constants.FILE_SEPARATOR + "main.js";
    Constants.HTML_FILE = "demo" + Constants.FILE_SEPARATOR + "demo.html";
    Constants.JS_FILE = "js" + Constants.FILE_SEPARATOR + "demo.js";
    Constants.TS_FILE = "js" + Constants.FILE_SEPARATOR + "demo.ts";
    Constants.CSS_FILE = "css" + Constants.FILE_SEPARATOR + "demo.css";
    Constants.WD_TS_FILE = "js" + Constants.FILE_SEPARATOR + "cookbook-ui-wd.spec.ts";
    Constants.JET_COMMUNITY_MAIN_JS_FILE = "main.js";
    Constants.JET_COMMUNITY_HTML_FILE = "demo.html";
    Constants.JET_COMMUNITY_JS_FILE = "demo.js";
    Constants.JET_COMMUNITY_TS_FILE = "demo.ts";
    Constants.JET_COMMUNITY_CSS_FILE = "demo.css";
    Constants.JET_COMMUNITY_MODULE_VIEW_REG_EXP = new RegExp("^views" + Constants.FILE_SEPARATOR + "((.)*)?.html$");
    Constants.JET_COMMUNITY_MODULE_VIEW_MODEL_REG_EXP = new RegExp("^viewModels" + Constants.FILE_SEPARATOR + "((.)*)?.[jt]{1}s");
    Constants.JET_COMMUNITY_HTML_FOLD_LINES = "1-12";
    Constants.JET_COMMUNITY_HTML_READ_ONLY_LINES = 26;
    exports.default = Constants;
});
