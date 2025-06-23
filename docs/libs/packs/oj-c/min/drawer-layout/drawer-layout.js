define(["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerLayout", "ojs/ojvcomponent", "css!oj-c/drawer-layout/drawer-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerLayout_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerLayout = void 0;
    exports.DrawerLayout = (0, ojvcomponent_1.registerCustomElement)('oj-c-drawer-layout', ({ children, start, end, bottom, startOpened = false, endOpened = false, bottomOpened = false, startDisplay = 'auto', endDisplay = 'auto', bottomDisplay = 'auto', onOjBeforeClose, onOjClose, onStartOpenedChanged, onEndOpenedChanged, onBottomOpenedChanged }) => {
        const onOjBeforeCloseHandler = async (detail) => {
            try {
                await onOjBeforeClose?.({
                    edge: detail.placement
                });
                switch (detail.placement) {
                    case 'start':
                        onStartOpenedChanged?.(false);
                        break;
                    case 'end':
                        onEndOpenedChanged?.(false);
                        break;
                    case 'bottom':
                        onBottomOpenedChanged?.(false);
                        break;
                }
            }
            catch (_) {
            }
        };
        const onOjCloseHandler = async (detail) => {
            if (detail.value === false) {
                onOjClose?.({
                    edge: detail.placement
                });
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_DrawerLayout_1.DrawerLayout, { startDrawer: start, endDrawer: end, bottomDrawer: bottom, isStartOpen: startOpened, isEndOpen: endOpened, isBottomOpen: bottomOpened, startDisplay: startDisplay === 'auto' ? undefined : startDisplay, endDisplay: endDisplay === 'auto' ? undefined : endDisplay, bottomDisplay: bottomDisplay === 'auto' ? undefined : bottomDisplay, onClose: onOjBeforeCloseHandler, onTransitionEnd: onOjCloseHandler, children: children }) }));
    }, "DrawerLayout", { "slots": { "": {}, "start": {}, "end": {}, "bottom": {} }, "properties": { "startOpened": { "type": "boolean", "writeback": true }, "endOpened": { "type": "boolean", "writeback": true }, "bottomOpened": { "type": "boolean", "writeback": true }, "startDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] }, "endDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] }, "bottomDisplay": { "type": "string", "enumValues": ["auto", "overlay", "reflow"] } }, "events": { "ojBeforeClose": { "cancelable": true }, "ojClose": {} }, "extension": { "_WRITEBACK_PROPS": ["startOpened", "endOpened", "bottomOpened"], "_READ_ONLY_PROPS": [] } }, { "startOpened": false, "endOpened": false, "bottomOpened": false, "startDisplay": "auto", "endDisplay": "auto", "bottomDisplay": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});
