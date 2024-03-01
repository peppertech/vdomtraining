define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, useStaleIdentity_1, utils_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSyncValueAndValueItem = void 0;
    function useSyncValueAndValueItem({ addBusyState, dataProvider, setIsLoading, setValue, setValueItem, value, valueItem }) {
        const prevValueRef = (0, hooks_1.useRef)(value);
        const prevValueItemsRef = (0, hooks_1.useRef)(valueItem);
        const { setStaleIdentity } = (0, useStaleIdentity_1.useStaleIdentity)();
        const hasValue = value != null;
        const hasValueItem = valueItem != null;
        const syncValueItemToValue = (0, hooks_1.useCallback)(async () => {
            if (!hasValue) {
                if (hasValueItem) {
                    setValueItem(utils_1.DEFAULT_VALUE_ITEM);
                }
                return;
            }
            if (value != null && valueItem != null && valueItem.key === value) {
                setValueItem(Object.assign({}, valueItem));
                return;
            }
            if (!dataProvider) {
                return;
            }
            setIsLoading(true);
            const resolveBusyState = addBusyState('useSyncValueItem: calling fetchByKeys');
            const { isStale } = setStaleIdentity('useSyncValueItem:fetchByKeys');
            try {
                const fetchResults = await dataProvider.fetchByKeys({ keys: new Set([value]) });
                if (!isStale()) {
                    const newValueItems = handleFetchByKeysResults(value, valueItem, fetchResults.results);
                    setValueItem(newValueItems);
                }
            }
            catch (reason) {
                if (!isStale()) {
                    (0, UNSAFE_logger_1.error)(`SelectMultiple: fetchByKeys promise rejected: ${reason}`);
                }
            }
            if (!isStale()) {
                setIsLoading(false);
            }
            resolveBusyState();
        }, [dataProvider, hasValue, hasValueItem, value, valueItem]);
        const syncValueToValueItem = (0, hooks_1.useCallback)(() => {
            if (!hasValueItem) {
                if (hasValue) {
                    setValue(utils_1.DEFAULT_VALUE);
                }
                return;
            }
            if (valueItem.key !== value) {
                setValue(valueItem.key);
                return;
            }
        }, [hasValue, hasValueItem, value, valueItem]);
        (0, hooks_1.useEffect)(() => {
            if (hasValue) {
                syncValueItemToValue();
            }
            else if (hasValueItem) {
                syncValueToValueItem();
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (value !== prevValueRef.current && valueItem !== prevValueItemsRef.current) {
                prevValueRef.current = value;
                prevValueItemsRef.current = valueItem;
                if (value) {
                    syncValueItemToValue();
                }
                else {
                    syncValueToValueItem();
                }
            }
            else if (value !== prevValueRef.current) {
                prevValueRef.current = value;
                syncValueItemToValue();
            }
            else if (valueItem !== prevValueItemsRef.current) {
                prevValueItemsRef.current = valueItem;
                syncValueToValueItem();
            }
        }, [value, valueItem]);
    }
    exports.useSyncValueAndValueItem = useSyncValueAndValueItem;
    function handleFetchByKeysResults(value, valueItem, fetchByKeysResults) {
        if (valueItem && valueItem.key === value) {
            return valueItem;
        }
        const item = fetchByKeysResults.get(value);
        if (!item) {
            throw new Error(`oj-c-select-single: could not fetch data for key ${value}`);
        }
        return {
            key: value,
            data: item.data,
            metadata: item.metadata ? item.metadata : { key: value }
        };
    }
});
