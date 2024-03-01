define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueItems = void 0;
    function useValueItems(propValueItems, onValueItemsChanged) {
        const [valueItems, setValueItems] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(propValueItems, onValueItemsChanged);
        const [prevPropValueItems, setPrevPropValueItems] = (0, hooks_1.useState)(propValueItems);
        if (prevPropValueItems !== propValueItems && valueItems !== propValueItems) {
            setValueItems(propValueItems);
        }
        const [prevValueItems, setPrevValueItems] = (0, hooks_1.useState)(valueItems);
        const [preactValueItems, setPreactValueItems] = (0, hooks_1.useState)(valueItems ? Array.from(valueItems.values()) : undefined);
        if (prevValueItems !== valueItems) {
            setPreactValueItems(valueItems ? Array.from(valueItems.values()) : undefined);
        }
        if (prevPropValueItems !== propValueItems) {
            setPrevPropValueItems(propValueItems);
        }
        if (prevValueItems !== valueItems) {
            setPrevValueItems(valueItems);
        }
        return {
            valueItems,
            setValueItems,
            preactValueItems
        };
    }
    exports.useValueItems = useValueItems;
});
