define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_TabBarCommon", "@oracle/oraclejet-preact/UNSAFE_TabBarMixed"], function (require, exports, jsx_runtime_1, hooks_1, UNSAFE_TabBarCommon_1, UNSAFE_TabBarMixed_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBarMixed = exports.TabBarLayout = void 0;
    exports.TabBarMixedSeparator = TabBarMixedSeparator;
    exports.TabBarItem = TabBarItem;
    exports.RemovableTabBarItem = RemovableTabBarItem;
    exports.OverflowTabBarItem = OverflowTabBarItem;
    Object.defineProperty(exports, "TabBarLayout", { enumerable: true, get: function () { return UNSAFE_TabBarMixed_1.TabBarLayout; } });
    Object.defineProperty(exports, "TabBarMixed", { enumerable: true, get: function () { return UNSAFE_TabBarMixed_1.TabBarMixed; } });
    function TabBarMixedSeparator() {
        return (0, jsx_runtime_1.jsx)("div", { role: "separator" });
    }
    function TabBarItem(props) {
        const { badge, itemKey, label } = props;
        const { onSelect } = (0, hooks_1.useContext)(UNSAFE_TabBarCommon_1.TabBarContext);
        return ((0, jsx_runtime_1.jsxs)("div", { role: "tab", "data-oj-key": itemKey, onClick: () => {
                onSelect && onSelect({ value: itemKey });
            }, children: [label, badge && (0, jsx_runtime_1.jsx)("span", { "data-testid": "badge", children: badge })] }));
    }
    function RemovableTabBarItem(props) {
        const { badge, itemKey, label } = props;
        const { onRemove, onSelect } = (0, hooks_1.useContext)(UNSAFE_TabBarCommon_1.TabBarContext);
        return ((0, jsx_runtime_1.jsxs)("div", { role: "tab", "data-oj-key": itemKey, onClick: () => {
                onSelect && onSelect({ value: itemKey });
            }, children: [label, badge && (0, jsx_runtime_1.jsx)("span", { "data-testid": "badge", children: badge }), (0, jsx_runtime_1.jsx)("button", { "aria-label": "Removable", onClick: () => {
                        onRemove && onRemove({ value: itemKey });
                    }, children: "x" })] }));
    }
    function OverflowTabBarItem(props) {
        const { badge, overflowItems } = props;
        return ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "popup", "data-oj-key": "overflow", children: [badge && (0, jsx_runtime_1.jsx)("span", { "data-testid": "badge-total", children: badge }), overflowItems.map((tab) => ((0, jsx_runtime_1.jsx)(RemovableTabBarItem, { ...tab })))] }));
    }
});
