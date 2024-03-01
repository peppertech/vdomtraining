define(["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLegendEventsHandler = void 0;
    const getLegendEventsHandler = (isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling = 'off', onOjDrill) => {
        const itemActionHandler = (detail) => {
            if (isHideShowOn) {
                updateHidden(detail.itemId);
            }
            else if (drilling === 'on') {
                onOjDrill?.({ id: getDrillDetail((0, utils_1.parseItemId)(detail.itemId)) });
            }
        };
        const inputHandler = (detail) => {
            if (isHighlightOn) {
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
