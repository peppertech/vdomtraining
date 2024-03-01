define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_Legend", "ojs/ojcontext", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "preact/compat", "../hooks/UNSAFE_useVizCategories/useVizCategories", "./events", "./useSectionData", "css!oj-c/legend/legend-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_Legend_1, Context, ojvcomponent_1, utils_1, useDataProvider_1, TemplateHandler_1, UNSAFE_useTranslationBundle_1, compat_1, useVizCategories_1, events_1, useSectionData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearLegend = exports.Legend = void 0;
    function LegendComp({ data = null, drilling = 'off', halign = 'start', valign = 'top', hiddenCategories = [], hideAndShowBehavior = 'off', highlightedCategories = [], hoverBehavior = 'none', orientation = 'vertical', symbolHeight = 0, symbolWidth = 0, textStyle = {}, sectionTitleStyle = {}, sectionTitleHalign = 'start', ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-legend: ${description}` })
                : () => { };
        }, []);
        const isTreeData = (0, utils_1.isTreeDataProvider)(data);
        const { width: symWidth, height: symHeight } = (0, utils_1.getDefaultSymbolDims)(symbolHeight, symbolWidth);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: `oj-c-legend-${halign} oj-c-legend-${valign}`, children: isTreeData ? ((0, jsx_runtime_1.jsx)(SectionalLegend, { data: data, ...props, addBusyState: addBusyState, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symWidth, textStyle: textStyle, sectionTitleStyle: sectionTitleStyle, sectionTitleHalign: sectionTitleHalign })) : ((0, jsx_runtime_1.jsx)(LinearLegend, { ...props, data: data, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symHeight, addBusyState: addBusyState, textStyle: textStyle })) }));
    }
    exports.Legend = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend', LegendComp, "Legend", { "properties": { "data": { "type": "DataProvider|null" }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "halign": { "type": "string", "enumValues": ["center", "end", "start"] }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["off", "on"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" }, "textStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "valign": { "type": "string", "enumValues": ["top", "bottom", "middle"] }, "sectionTitleStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "sectionTitleHalign": { "type": "string", "enumValues": ["center", "end", "start"] } }, "slots": { "itemTemplate": { "data": {} }, "sectionTemplate": { "data": {} } }, "events": { "ojDrill": {} }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "data": null, "drilling": "off", "halign": "start", "valign": "top", "hiddenCategories": [], "hideAndShowBehavior": "off", "highlightedCategories": [], "hoverBehavior": "none", "orientation": "vertical", "symbolHeight": 0, "symbolWidth": 0, "textStyle": {}, "sectionTitleStyle": {}, "sectionTitleHalign": "start" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
    function LinearLegend({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, orientation, symbolHeight, symbolWidth, ...props }) {
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: props.data ? props.data : undefined,
            addBusyState: props.addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior);
        const getItemContext = (context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        };
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const items = itemTemplate
            ? (0, TemplateHandler_1.processTemplate)(data, itemTemplate, getItemContext, 'oj-c-legend-item')
            : data.map((item) => item.data);
        const preactItems = (0, compat_1.useMemo)(() => {
            return items.map((value, itemIndex) => (0, utils_1.transformItem)(value, 0, itemIndex, drilling === 'on' ? translations.viz_drillable() : ''));
        }, [items, drilling, translations]);
        const categoriesItems = (0, compat_1.useMemo)(() => {
            const categoriesItems = [];
            if (isHideShowOn || isHighlightOn) {
                items.forEach((item, itemIndex) => {
                    categoriesItems.push({ id: preactItems[itemIndex].id, categories: item.categories || [] });
                });
            }
            return categoriesItems;
        }, [preactItems, items, isHideShowOn, isHighlightOn]);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', 'any', onHiddenCategoriesChanged, onHighlightedCategoriesChanged);
        const getDrillDetail = (id) => {
            const [_, itemIdx] = id;
            const item = items[itemIdx];
            if (item['categories']?.length > 0)
                return item['categories'];
            return data[itemIdx].metadata?.key;
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling, props.onOjDrill);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        return preactItems.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { orientation: orientation, symbolHeight: symbolHeight, symbolWidth: symbolWidth, isReadOnly: !isInteractive, hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, items: preactItems, onItemAction: itemActionHandler, onInput: inputHandler, ...props, ...textStyles })) : null;
    }
    exports.LinearLegend = LinearLegend;
    function SectionalLegend({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, sectionTitleStyle, orientation, symbolHeight, symbolWidth, data, ...props }) {
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const sections = (0, useSectionData_1.useSectionData)(data, props.addBusyState, sectionTemplate, itemTemplate);
        const preactSections = (0, compat_1.useMemo)(() => {
            const preactSections = sections.map((section, sectionIdx) => (0, utils_1.transformSection)(section, drilling === 'on' ? translations.viz_drillable() : '', sectionIdx));
            return preactSections;
        }, [sections, drilling, translations]);
        const categoriesItems = (0, compat_1.useMemo)(() => {
            const categoriesItems = [];
            if (isHideShowOn || isHighlightOn) {
                sections.forEach((section, sectionIndex) => {
                    section.items.forEach((item, itemIndex) => {
                        categoriesItems.push({
                            id: preactSections[sectionIndex].items[itemIndex].id,
                            categories: item.categories || []
                        });
                    });
                });
            }
            return categoriesItems;
        }, [sections, isHideShowOn, isHighlightOn, preactSections]);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', 'any', onHiddenCategoriesChanged, onHighlightedCategoriesChanged);
        const getDillDetail = (id) => {
            const [sectionIdx, itemIdx] = id;
            const item = sections[sectionIdx].items[itemIdx];
            if (item.categories)
                return item.categories;
            return item.key;
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDillDetail, drilling, props.onOjDrill);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        const sectionTitleStyles = (0, utils_1.getSectionStyles)(sectionTitleStyle);
        return preactSections.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.SectionalLegend, { sections: preactSections, orientation: orientation, sectionTitleHAlign: props.sectionTitleHalign, symbolHeight: symbolHeight, symbolWidth: symbolWidth, isReadOnly: !isInteractive, "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, onItemAction: itemActionHandler, onInput: inputHandler, ...textStyles, ...sectionTitleStyles })) : null;
    }
});
