define(["require", "exports", "../legend-item/legend-item", "../legend-section/legend-section"], function (require, exports, legend_item_1, legend_section_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDefaultSymbolDims = void 0;
    exports.getTextStyles = getTextStyles;
    exports.getSectionStyles = getSectionStyles;
    exports.isLegendInteractive = isLegendInteractive;
    exports.parseItemIdx = parseItemIdx;
    exports.transformItem = transformItem;
    exports.transformSection = transformSection;
    exports.isTreeDataProvider = isTreeDataProvider;
    exports.isLegendItemDrillable = isLegendItemDrillable;
    function getTextStyles(styles) {
        return {
            textFontStyle: styles?.fontStyle,
            textFontSize: styles?.fontSize,
            textFontColor: styles?.color,
            textFontWeight: styles?.fontWeight,
            textDecoration: styles?.textDecoration,
            textFontFamily: styles?.fontFamily
        };
    }
    function getSectionStyles(styles) {
        return {
            sectionTitleColor: styles?.color,
            sectionTitleFontFamily: styles?.fontFamily,
            sectionTitleFontSize: styles?.fontSize,
            sectionTitleFontStyle: styles?.fontStyle,
            sectionTitleFontWeight: styles?.fontWeight,
            sectionTitleTextDecoration: styles?.textDecoration
        };
    }
    function isLegendInteractive(drilling, hideAndShowBehavior, hoverBehavior, hasDrillableItem, isContextMenuEnabled) {
        return (drilling === 'on' ||
            hideAndShowBehavior === 'on' ||
            hoverBehavior === 'dim' ||
            hasDrillableItem ||
            isContextMenuEnabled);
    }
    function parseItemIdx(id) {
        return id.split(';').map((i) => parseInt(i, 10));
    }
    function transformItem(dataItem, sectionIndex, itemIndex, ariaLabelSuffix, drilling, hideAndShowBehavior, isContextMenuEnabled) {
        const item = { ...legend_item_1.LegendItemDefaults, ...dataItem };
        return {
            borderColor: item.borderColor,
            lineWidth: item.lineWidth,
            markerColor: item.markerColor || item.color || undefined,
            lineColor: item.color || undefined,
            markerShape: item.symbolType !== 'line' ? item.markerShape : 'none',
            lineStyle: item.symbolType !== 'marker' ? item.lineStyle : 'none',
            'aria-label': [item.shortDesc, ariaLabelSuffix].filter(Boolean).join(' ') || undefined,
            datatip: item.shortDesc,
            source: item.source,
            text: item.text,
            actionable: hideAndShowBehavior === 'on' || isContextMenuEnabled
                ? 'inherit'
                : isLegendItemDrillable(drilling, item.drilling),
            id: `${sectionIndex};${itemIndex}`
        };
    }
    function transformSection(dataSection, ariaLabelSuffix, sectionIndex, drilling) {
        const section = { ...legend_section_1.LegendSectionDefaults, ...dataSection };
        return {
            items: section.items.map((item, itemIndex) => transformItem(item, sectionIndex, itemIndex, ariaLabelSuffix, drilling)),
            title: section.text || section.title,
            id: `${sectionIndex}`
        };
    }
    function isTreeDataProvider(dataprovider) {
        if (dataprovider && dataprovider['getChildDataProvider']) {
            return true;
        }
        return false;
    }
    const getDefaultSymbolDims = (symbolHeight, symbolWidth) => {
        if (!symbolHeight && !symbolWidth) {
            return { width: undefined, height: undefined };
        }
        if (!symbolHeight) {
            return { width: symbolWidth, height: symbolWidth };
        }
        if (!symbolWidth) {
            return { width: symbolHeight, height: symbolHeight };
        }
        return { width: symbolWidth, height: symbolHeight };
    };
    exports.getDefaultSymbolDims = getDefaultSymbolDims;
    function isLegendItemDrillable(drilling, itemDrilling) {
        let actionable = 'inherit';
        if (itemDrilling === 'on') {
            return actionable;
        }
        else if (itemDrilling === 'off') {
            actionable = 'off';
        }
        else {
            if (drilling === 'on') {
                actionable = 'inherit';
            }
            else if (drilling === 'off') {
                actionable = 'off';
            }
        }
        return actionable;
    }
});
