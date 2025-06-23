define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "./DataTabBarMixed"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, DataTabBarMixed_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBarMixed = void 0;
    exports.TabBarMixed = (0, ojvcomponent_1.registerCustomElement)('oj-c-tab-bar-mixed', (props) => {
        const { dynamicTabs = [], dynamicTabsOverflow = 'conveyor', dynamicTabsOverflowIcon = { type: 'class', class: 'oj-ux-ico-collection' }, onOjBeforeSelect, onOjRemove, onOjSelectionAction, onSelectionChanged, selection, separatorPadding = '3rem', size, staticTabs = [], staticTabsDisplay = 'standard', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, id } = props;
        const handleRemove = (event) => {
            if (onOjRemove) {
                onOjRemove({ key: event.value });
            }
        };
        const handleSelect = (event) => {
            (async () => {
                handleOnSelectionChanged: {
                    if (onOjBeforeSelect) {
                        try {
                            await onOjBeforeSelect({ key: event.value });
                        }
                        catch {
                            break handleOnSelectionChanged;
                        }
                    }
                    if (onOjSelectionAction) {
                        onOjSelectionAction({ previousValue: selection || '', value: event.value });
                    }
                    if (selection === event.value) {
                        return;
                    }
                    if (onSelectionChanged) {
                        onSelectionChanged(event.value);
                    }
                }
            })();
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, children: (0, jsx_runtime_1.jsx)(DataTabBarMixed_1.DataTabBarMixed, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, dynamicTabs: dynamicTabs, dynamicTabsOverflow: dynamicTabsOverflow, dynamicTabsOverflowIcon: dynamicTabsOverflowIcon, onRemove: handleRemove, onSelect: handleSelect, selection: selection, separatorPadding: separatorPadding, size: size, staticTabs: staticTabs, staticTabsDisplay: staticTabsDisplay }) }));
    }, "TabBarMixed", { "properties": { "dynamicTabs": { "type": "Array<object>" }, "dynamicTabsOverflow": { "type": "string", "enumValues": ["popup", "conveyor"] }, "dynamicTabsOverflowIcon": { "type": "object" }, "size": { "type": "string", "enumValues": ["md", "lg"] }, "selection": { "type": "string|number", "writeback": true }, "separatorPadding": { "type": "string" }, "staticTabs": { "type": "Array<object>" }, "staticTabsDisplay": { "type": "string", "enumValues": ["standard", "icons"] } }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojRemove": {}, "ojSelectionAction": {} }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "id", "aria-labelledby"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
