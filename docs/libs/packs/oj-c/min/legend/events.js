define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLegendEventsHandler = void 0;
    const getLegendEventsHandler = (isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling = 'off', getItemDrilling, onOjDrill) => {
        const itemActionHandler = (detail) => {
            if (typeof detail.itemId === 'string' && isHideShowOn) {
                updateHidden(detail.itemId);
            }
            const [sectionIdx, itemIdx] = (0, utils_1.parseItemIdx)(detail.itemId);
            if ((0, utils_1.isLegendItemDrillable)(drilling, getItemDrilling(itemIdx, sectionIdx)) !== 'off') {
                onOjDrill?.({ id: getDrillDetail([sectionIdx, itemIdx]) });
            }
        };
        const inputHandler = (detail) => {
            if (typeof detail.itemId === 'string' && isHighlightOn) {
                updateHighlighted(detail.itemId);
            }
        };
        return {
            itemActionHandler,
            inputHandler
        };
    };
    exports.getLegendEventsHandler = getLegendEventsHandler;
});
