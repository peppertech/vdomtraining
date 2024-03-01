define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_logger_1, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDataProviderListeners = void 0;
    function cloneValue(value) {
        return value instanceof Set ? new Set(value.values()) : value;
    }
    function cloneValueItem(valueItem) {
        return valueItem instanceof Map ? new Map(valueItem.entries()) : Object.assign({}, valueItem);
    }
    function compareValues(value, valueToCompare) {
        if ((value instanceof Set && valueToCompare instanceof Set) ||
            (value instanceof Map && valueToCompare instanceof Map)) {
            return value.size === valueToCompare.size;
        }
        if (typeof value === 'object' && typeof valueToCompare === 'object') {
            return value.key === valueToCompare.key;
        }
        return value === valueToCompare;
    }
    function containsValue(value, query) {
        return value instanceof Set ? value.has(query) : value != null && value === query;
    }
    function deleteFromValue(value, toDelete) {
        if (value instanceof Set || value instanceof Map) {
            value.delete(toDelete);
            return value;
        }
        if (typeof value === 'number' || typeof value === 'string') {
            if (value === toDelete) {
                return utils_1.DEFAULT_VALUE;
            }
            return value;
        }
        if (typeof value === 'object' && value.key === toDelete) {
            return utils_1.DEFAULT_VALUE_ITEMS;
        }
        return value;
    }
    function useDataProviderListeners({ dataProvider, setValue, setValueToSync, setValueItemsToSync, value, valueItems }) {
        const isSelectMultiple = value instanceof Set;
        const handleRefresh = (0, hooks_1.useCallback)(() => {
            if (!(0, utils_1.isEmpty)(value)) {
                setValueToSync(cloneValue(value));
                setValueItemsToSync(utils_1.DEFAULT_VALUE_ITEMS);
            }
        }, [value]);
        const handleMutation = (0, hooks_1.useCallback)((event) => {
            if ((0, utils_1.isEmpty)(value)) {
                return;
            }
            let newVal = cloneValue(value);
            if (event.detail.remove != null) {
                const keys = event.detail.remove.keys;
                keys.forEach((key) => {
                    if (containsValue(newVal, key)) {
                        newVal = deleteFromValue(newVal, key);
                        (0, UNSAFE_logger_1.warn)(`
              ${isSelectMultiple ? 'SelectMultiple' : 'SelectSingle'}: selected value removed from data provider: ${key}`);
                    }
                });
                if (!compareValues(newVal, value)) {
                    setValue(!(0, utils_1.isEmpty)(newVal) ? newVal : utils_1.DEFAULT_VALUE);
                    setValueToSync(!(0, utils_1.isEmpty)(newVal) ? newVal : utils_1.DEFAULT_VALUE);
                }
            }
            if ((0, utils_1.isEmpty)(newVal)) {
                return;
            }
            if (event.detail.update != null) {
                const keys = event.detail.update.keys;
                let newValueItems = (0, utils_1.isEmpty)(valueItems)
                    ? valueItems
                    : cloneValueItem(valueItems);
                keys.forEach((key) => {
                    if (containsValue(newVal, key)) {
                        newValueItems = deleteFromValue(newValueItems, key);
                    }
                });
                if (!compareValues(newValueItems, valueItems)) {
                    setValueToSync(newVal);
                    setValueItemsToSync(!(0, utils_1.isEmpty)(newValueItems) ? newValueItems : utils_1.DEFAULT_VALUE_ITEMS);
                }
            }
        }, [value, valueItems]);
        (0, hooks_1.useEffect)(() => {
            dataProvider?.addEventListener('refresh', handleRefresh);
            dataProvider?.addEventListener('mutate', handleMutation);
            return () => {
                dataProvider?.removeEventListener('refresh', handleRefresh);
                dataProvider?.removeEventListener('mutate', handleMutation);
            };
        }, [dataProvider, handleMutation, handleRefresh]);
    }
    exports.useDataProviderListeners = useDataProviderListeners;
});
