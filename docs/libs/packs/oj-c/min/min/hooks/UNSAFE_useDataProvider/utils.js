define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUpdatedItemsFromMutationDetail = void 0;
    async function getUpdatedItemsFromMutationDetail(detail, currentData, dataProvider) {
        const { add, remove, update } = detail ?? {};
        const keyIndexMap = new Map();
        for (const [index, item] of currentData.entries()) {
            keyIndexMap.set(item.key, index);
        }
        let mutatedData = [...currentData];
        if (remove) {
            mutatedData = removeItemsFromDetail(remove, mutatedData, keyIndexMap);
        }
        if (add) {
            mutatedData = await addItemsFromDetail(add, mutatedData, keyIndexMap, dataProvider);
        }
        if (update) {
            mutatedData = await updateItemsFromDetail(update, mutatedData, keyIndexMap, dataProvider);
        }
        return mutatedData;
    }
    exports.getUpdatedItemsFromMutationDetail = getUpdatedItemsFromMutationDetail;
    function addItemsAtEnd(itemsToAdd, itemMetadataToAdd, items) {
        const indices = new Array(itemsToAdd.length).fill(-1);
        return addItemsAtIndices(indices, itemsToAdd, itemMetadataToAdd, items);
    }
    function addItemsAtIndices(indices, itemsToAdd, itemMetadataToAdd, items) {
        const returnItems = [...items];
        indices.forEach((addAtIndex, index) => {
            const addItem = {
                data: itemsToAdd[index],
                key: itemMetadataToAdd[index]?.key,
                metadata: itemMetadataToAdd[index]
            };
            if (addAtIndex >= 0) {
                returnItems.splice(addAtIndex, 0, addItem);
            }
            else {
                returnItems.push(addItem);
            }
        });
        return returnItems;
    }
    function addItemsBeforeKeys(beforeKeys, itemsToAdd, items, keyIndexMap) {
        const addIndices = [];
        const itemMetadataToAdd = [];
        beforeKeys.forEach((key) => {
            addIndices.push(getIndexByKey(keyIndexMap, key));
            itemMetadataToAdd.push({ key });
        });
        return addItemsAtIndices(addIndices, itemsToAdd, itemMetadataToAdd, items);
    }
    async function addItemsFromDetail(detail, items, keyIndexMap, dataProvider) {
        const { addBeforeKeys, data, indexes, keys, metadata } = detail;
        let mutatedData = [...items];
        let treatedData = data || [];
        let treatedMetaData = metadata || [];
        if (treatedData.length === 0 && keys?.size) {
            const fetchResults = (await fetchDataByKeys(dataProvider, keys)) ?? [];
            treatedData = fetchResults.map((itemContext) => itemContext.data);
            treatedMetaData = fetchResults.map((itemContext) => itemContext.metadata);
        }
        if (treatedMetaData.length === 0 && keys?.size) {
            treatedMetaData = [...keys].map((key) => ({ key }));
        }
        if (treatedData.length) {
            if (indexes?.length) {
                mutatedData = addItemsAtIndices(indexes, treatedData, treatedMetaData, mutatedData);
            }
            else if (addBeforeKeys?.length) {
                mutatedData = addItemsBeforeKeys(addBeforeKeys, treatedData, mutatedData, keyIndexMap);
            }
            else {
                mutatedData = addItemsAtEnd(treatedData, treatedMetaData, mutatedData);
            }
        }
        return mutatedData;
    }
    async function fetchDataByKeys(dataProvider, keys) {
        const fetchedData = [];
        const results = (await dataProvider.fetchByKeys({ keys })).results;
        for (const key of keys) {
            if (results.has(key)) {
                const result = results.get(key);
                fetchedData.push({ ...result, key });
            }
        }
        return fetchedData;
    }
    function getIndexByKey(keyIndexMap, key) {
        if (keyIndexMap.has(key)) {
            return keyIndexMap.get(key);
        }
        return -1;
    }
    function removeItemsAtIndices(indices, items) {
        const returnItems = [...items];
        indices.sort((a, b) => b - a);
        indices.forEach((index) => {
            if (index < returnItems.length) {
                returnItems.splice(index, 1);
            }
        });
        return returnItems;
    }
    function removeItemsAtKeys(keys, items, keyIndexMap) {
        const indicesToRemove = [];
        keys.forEach((key) => {
            const index = getIndexByKey(keyIndexMap, key);
            if (index !== -1) {
                indicesToRemove.push(index);
            }
        });
        return removeItemsAtIndices(indicesToRemove, items);
    }
    function removeItemsFromDetail(detail, items, keyIndexMap) {
        const { indexes, keys } = detail;
        let mutatedData = [...items];
        if (indexes?.length) {
            mutatedData = removeItemsAtIndices(indexes, mutatedData);
        }
        else if (keys?.size) {
            mutatedData = removeItemsAtKeys(keys, mutatedData, keyIndexMap);
        }
        return mutatedData;
    }
    function updateItemsAtIndices(indices, itemsToUpdate, itemMetadataToUpdate, items) {
        const returnItems = [...items];
        indices.forEach((updateAtIndex, index) => {
            if (returnItems[updateAtIndex]) {
                const addItem = {
                    data: itemsToUpdate[index],
                    key: itemMetadataToUpdate[index]?.key,
                    metadata: itemMetadataToUpdate[index]
                };
                returnItems.splice(updateAtIndex, 1, addItem);
            }
        });
        return returnItems;
    }
    function updateItemsAtKeys(keys, itemsToUpdate, itemMetadataToUpdate, items, keyIndexMap) {
        const returnItems = [...items];
        keys.forEach((key) => {
            const index = getIndexByKey(keyIndexMap, key);
            const addItem = {
                data: itemsToUpdate[index],
                key: itemMetadataToUpdate[index]?.key,
                metadata: itemMetadataToUpdate[index]
            };
            if (index >= 0) {
                returnItems.splice(index, 1, addItem);
            }
        });
        return returnItems;
    }
    async function updateItemsFromDetail(detail, items, keyIndexMap, dataProvider) {
        const { data, indexes, keys, metadata } = detail;
        let mutatedData = [...items];
        let treatedData = data || [];
        let treatedMetaData = metadata || [];
        if (treatedData.length === 0 && keys?.size) {
            const fetchResults = (await fetchDataByKeys(dataProvider, keys)) ?? [];
            treatedData = fetchResults.map((itemContext) => itemContext.data);
            treatedMetaData = fetchResults.map((itemContext) => itemContext.metadata);
        }
        if (treatedMetaData.length === 0 && keys?.size) {
            treatedMetaData = [...keys].map((key) => ({ key }));
        }
        if (treatedData.length) {
            if (indexes?.length) {
                mutatedData = updateItemsAtIndices(indexes, treatedData, treatedMetaData, mutatedData);
            }
            else if (keys?.size) {
                mutatedData = updateItemsAtKeys(keys, treatedData, treatedMetaData, mutatedData, keyIndexMap);
            }
        }
        return mutatedData;
    }
});
