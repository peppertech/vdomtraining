define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isSetEqual = exports.isEmpty = exports.DEFAULT_VALUE_ITEMS = exports.DEFAULT_VALUE_ITEM = exports.DEFAULT_VALUE = exports.DEFAULT_ITEM_CONTEXT = void 0;
    exports.DEFAULT_ITEM_CONTEXT = null;
    exports.DEFAULT_VALUE = null;
    exports.DEFAULT_VALUE_ITEM = null;
    exports.DEFAULT_VALUE_ITEMS = null;
    function isEmpty(value) {
        if (!value)
            return true;
        if (Array.isArray(value))
            return value.length === 0;
        if (value instanceof Set || value instanceof Map)
            return value.size === 0;
        return false;
    }
    exports.isEmpty = isEmpty;
    function isSetEqual(a, b) {
        if (a === b)
            return true;
        if (a?.size !== b?.size)
            return false;
        const aArray = Array.from(a);
        const bArray = Array.from(b);
        return aArray.every((value, index) => value === bArray[index]);
    }
    exports.isSetEqual = isSetEqual;
});
