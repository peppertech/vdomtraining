define(["require", "exports", "ojs/ojkeyset"], function (require, exports, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFirstKey = exports.isEmpty = exports.keysToKeySet = exports.keySetToKeys = void 0;
    const keySetToKeys = (keySet) => {
        if (!keySet) {
            return { all: false, keys: new Set() };
        }
        let keys = {};
        if (keySet.isAddAll()) {
            const deletedValues = new Set(keySet.deletedValues());
            keys = { all: true, deletedKeys: deletedValues };
        }
        else if (!keySet.isAddAll()) {
            const values = new Set(keySet.values());
            keys = { all: false, keys: values };
        }
        return keys;
    };
    exports.keySetToKeys = keySetToKeys;
    const keysToKeySet = (keys) => {
        let keySet;
        if (keys.all) {
            keySet = new ojkeyset_1.AllKeySetImpl();
            keySet = keySet.delete(new Set(keys.deletedKeys.values()));
        }
        else if (!keys.all) {
            keySet = new ojkeyset_1.KeySetImpl(new Set(keys.keys.values()));
        }
        return keySet;
    };
    exports.keysToKeySet = keysToKeySet;
    const isEmpty = (keys) => {
        if (keys.all) {
            return false;
        }
        else {
            return keys.keys.size === 0;
        }
    };
    exports.isEmpty = isEmpty;
    const getFirstKey = (keys, data) => {
        if (keys.all === false && keys.keys.size > 0) {
            const [first] = keys.keys;
            return first;
        }
        else if (data.length > 0) {
            return data[0];
        }
        return null;
    };
    exports.getFirstKey = getFirstKey;
});
