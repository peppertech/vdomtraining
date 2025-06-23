var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "ojs/ojmutablearraydataprovider", "ojs/ojmenu", "ojs/ojbutton", "ojs/ojcheckboxset", "ojs/ojoption", "oj-c/checkboxset"], function (require, exports, jsx_runtime_1, hooks_1, MutableArrayDataProvider) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Test4 = void 0;
    const data = [
        { id: 388, label: "Blood donation - 388" },
        { id: 389, label: "Emergency - 389" },
        { id: 390, label: "Home health - 390" },
        { id: 391, label: "Inpatient - 391" },
        { id: 392, label: "Observation - 392" },
    ];
    const encounterClassTypesProvider = new MutableArrayDataProvider(data, { keyAttributes: "id" });
    function Test4() {
        console.log("Component rendered");
        const [disableMenu, setDisableMenu] = (0, hooks_1.useState)(false);
        const [filterEncntrCodes, setFilterEncntrCodes] = (0, hooks_1.useState)([]);
        function waitForSeconds(seconds) {
            return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
        }
        const beforeOpen = (event) => __awaiter(this, void 0, void 0, function* () {
            console.log("beforeOpen Entered");
            console.log("Before waiting");
            setDisableMenu(true);
            yield waitForSeconds(2);
            console.log("after waiting");
            setDisableMenu(false);
        });
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Menu standalone test App" }), (0, jsx_runtime_1.jsxs)("oj-menu-button", { id: "menuButton5", chroming: "borderless", children: ["Test Menu Button", (0, jsx_runtime_1.jsxs)("oj-menu", { id: "options", slot: "menu", "aria-label": "table_menu", onojBeforeOpen: beforeOpen, children: [(0, jsx_runtime_1.jsxs)("oj-option", { value: "AddComp", id: "AddComp", disabled: disableMenu, children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-add-child" }), "Option One"] }), (0, jsx_runtime_1.jsxs)("oj-option", { value: "AddComp", id: "AddComp", disabled: disableMenu, children: [(0, jsx_runtime_1.jsx)("span", { slot: "startIcon", class: "oj-ux-ico-add-child" }), "Option Two"] })] })] }), (0, jsx_runtime_1.jsx)("oj-c-checkboxset", { labelEdge: "inside", options: encounterClassTypesProvider, value: filterEncntrCodes, disabled: false })] }));
    }
    exports.Test4 = Test4;
});
