define(["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, utils_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSyncValueAndValueItems = void 0;
    function useSyncValueAndValueItems({ addBusyState, dataProvider, setIsLoading, setValue, setValueItems, value, valueItems }) {
        const prevValueRef = (0, hooks_1.useRef)(value);
        const prevValueItemsRef = (0, hooks_1.useRef)(valueItems);
        const hasValue = value && value instanceof Set && value.size > 0;
        const hasValueItems = valueItems && valueItems.size > 0;
        const latestFetchRef = (0, hooks_1.useRef)(null);
        const syncValueItemsToValue = (0, hooks_1.useCallback)(() => {
            if (!hasValue) {
                if (hasValueItems) {
                    setValueItems(utils_1.DEFAULT_VALUE_ITEMS);
                }
                return;
            }
            const arValues = Array.from(value.keys());
            const valuesToFetch = arValues.reduce((accum, currKey) => {
                if (!hasValueItems || !valueItems.has(currKey)) {
                    accum.push(currKey);
                }
                return accum;
            }, []);
            if (valuesToFetch.length === 0) {
                const newValItems = new Map();
                value.forEach((currKey) => {
                    newValItems.set(currKey, valueItems.get(currKey));
                });
                const newValItemsKeys = Array.from(newValItems.keys());
                const isOrderEqual = arValues.every((key, index) => key === newValItemsKeys[index]);
                if (valueItems?.size !== newValItems.size || !isOrderEqual) {
                    setValueItems(newValItems);
                }
                return;
            }
            setIsLoading(true);
            const resolveBusyState = addBusyState('useSyncValueItems: calling fetchByKeys');
            const latestFetch = {};
            latestFetchRef.current = latestFetch;
            const afterFetch = () => {
                if (latestFetch === latestFetchRef.current) {
                    setIsLoading(false);
                }
                resolveBusyState();
            };
            dataProvider
                .fetchByKeys({ keys: new Set(valuesToFetch) })
                .then((fbkResults) => {
                if (latestFetch === latestFetchRef.current) {
                    const newValueItems = handleFetchByKeysResults(value, valueItems, fbkResults.results);
                    setValueItems(newValueItems);
                    afterFetch();
                }
            }, (reason) => {
                if (latestFetch === latestFetchRef.current) {
                    (0, UNSAFE_logger_1.error)(`SelectMultiple: fetchByKeys promise rejected: ${reason}`);
                }
                afterFetch();
            });
        }, [dataProvider, hasValue, hasValueItems, value, valueItems]);
        const syncValueToValueItems = (0, hooks_1.useCallback)(() => {
            if (!hasValueItems) {
                if (hasValue) {
                    setValue(utils_1.DEFAULT_VALUE);
                }
                return;
            }
            const arValueItemsKeys = Array.from(valueItems.keys());
            const valueItemsKeys = new Set(arValueItemsKeys);
            if (!value || !(value instanceof Set) || value.size !== valueItemsKeys.size) {
                setValue(valueItemsKeys);
                return;
            }
            const arValueKeys = Array.from(value.keys());
            const isDifferent = arValueItemsKeys.some((key, index) => key !== arValueKeys[index]);
            if (isDifferent) {
                setValue(valueItemsKeys);
            }
        }, [hasValue, hasValueItems, value, valueItems]);
        (0, hooks_1.useEffect)(() => {
            if (hasValue) {
                syncValueItemsToValue();
            }
            else if (hasValueItems) {
                syncValueToValueItems();
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (value !== prevValueRef.current && valueItems !== prevValueItemsRef.current) {
                prevValueRef.current = value;
                prevValueItemsRef.current = valueItems;
                if (value) {
                    syncValueItemsToValue();
                }
                else {
                    syncValueToValueItems();
                }
            }
            else if (value !== prevValueRef.current) {
                prevValueRef.current = value;
                syncValueItemsToValue();
            }
            else if (valueItems !== prevValueItemsRef.current) {
                prevValueItemsRef.current = valueItems;
                syncValueToValueItems();
            }
        }, [value, valueItems]);
    }
    exports.useSyncValueAndValueItems = useSyncValueAndValueItems;
    function handleFetchByKeysResults(value, valueItems, fetchByKeysResults) {
        const arKeys = Array.from(value.keys());
        return arKeys.reduce((accumMap, currKey) => {
            if (valueItems && valueItems.has(currKey)) {
                accumMap.set(currKey, valueItems.get(currKey));
                return accumMap;
            }
            const item = fetchByKeysResults.get(currKey);
            if (!item) {
                throw new Error(`oj-c-select-multiple: could not fetch data for key ${currKey}`);
            }
            accumMap.set(currKey, {
                key: currKey,
                data: item.data,
                metadata: item.metadata ? item.metadata : { key: currKey }
            });
            return accumMap;
        }, new Map());
    }
});
