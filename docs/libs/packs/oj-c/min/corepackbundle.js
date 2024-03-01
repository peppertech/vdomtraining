define('oj-c/hooks/UNSAFE_useDataProvider/utils',["require", "exports"], function (require, exports) {
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

define('oj-c/hooks/UNSAFE_useDataProvider/DataProviderHandler',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataProviderHandler = void 0;
    class DataProviderHandler {
        constructor(dataProvider, addBusyState, callback) {
            this.handleMutateEvent = async (event) => {
                const { detail } = event;
                const resolver = this.addBusyState('updating data from mutation event');
                const updatedData = await (0, utils_1.getUpdatedItemsFromMutationDetail)(detail, this.currentData, this.dataProvider);
                resolver?.();
                this.currentData = updatedData;
                this.callback?.onDataUpdated?.(updatedData);
            };
            this.handleRefreshEvent = () => {
                this._fetchDataAndNotify();
            };
            this.addBusyState = addBusyState;
            this.callback = callback;
            this.dataProvider = dataProvider;
            this.currentData = [];
            dataProvider.addEventListener('refresh', this.handleRefreshEvent);
            dataProvider.addEventListener('mutate', this.handleMutateEvent);
            this._fetchDataAndNotify();
        }
        destroy() {
            this.callback = undefined;
            this.currentData = [];
            this.dataProvider.removeEventListener('refresh', this.handleRefreshEvent);
            this.dataProvider.removeEventListener('mutate', this.handleMutateEvent);
        }
        async _fetchData() {
            const fetchedData = [];
            const asyncIterable = this.dataProvider.fetchFirst({ size: -1 });
            for await (const results of asyncIterable) {
                const contextArray = results.data.map((item, index) => {
                    return {
                        data: item,
                        key: results.metadata[index].key,
                        metadata: results.metadata[index]
                    };
                });
                fetchedData.push(...contextArray);
            }
            this.currentData = fetchedData.slice();
            return fetchedData;
        }
        async _fetchDataAndNotify() {
            const resolver = this.addBusyState('fetching data');
            const fetchedData = await this._fetchData();
            this.callback?.onDataUpdated?.(fetchedData);
            resolver();
        }
    }
    exports.DataProviderHandler = DataProviderHandler;
});

define('oj-c/hooks/UNSAFE_useDataProvider/useDataProvider',["require", "exports", "preact/hooks", "./DataProviderHandler"], function (require, exports, hooks_1, DataProviderHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDataProvider = void 0;
    function useDataProvider({ addBusyState, data }) {
        const [fetchedData, setFetchedData] = (0, hooks_1.useState)([]);
        const dataProviderHandler = (0, hooks_1.useRef)();
        (0, hooks_1.useEffect)(() => {
            if (data !== undefined) {
                dataProviderHandler.current = new DataProviderHandler_1.DataProviderHandler(data, addBusyState, {
                    onDataUpdated: setFetchedData
                });
            }
            return () => {
                dataProviderHandler.current?.destroy();
                dataProviderHandler.current = undefined;
            };
        }, [data, addBusyState]);
        return {
            data: fetchedData
        };
    }
    exports.useDataProvider = useDataProvider;
});

define('oj-c/utils/UNSAFE_vizUtils/TemplateHandler',["require", "exports", "preact/compat"], function (require, exports, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processTemplate = exports.processNodeTemplate = void 0;
    const getValidProp = (prop) => {
        return prop[0].toLowerCase() !== prop[0]
            ? prop.toLowerCase().replace(/-./g, (c) => c[1].toUpperCase())
            : prop;
    };
    const resolveProps = (props) => {
        return Object.keys(props).reduce((resolvedProps, prop) => {
            if (prop === 'children')
                return resolvedProps;
            resolvedProps[getValidProp(prop)] = props[prop];
            return resolvedProps;
        }, {});
    };
    const processNodeTemplate = (datum, template, context, templateName) => {
        const children = template(context);
        const node = compat_1.Children.toArray(children).find((child) => {
            if (!child || !child.props) {
                return;
            }
            return (child.props?.children?.type || child.type) === templateName;
        });
        const props = node?.type === templateName ? node.props : (node?.props?.children).props;
        const key = datum.key || datum.metadata?.key;
        return props
            ? { ...resolveProps(props), key, id: key, _itemData: datum.data }
            : { key, id: key, _itemData: datum.data };
    };
    exports.processNodeTemplate = processNodeTemplate;
    const processTemplate = (data, template, getContext, templateName) => {
        return data.map((datum, index) => (0, exports.processNodeTemplate)(datum, template, getContext(datum, index), templateName));
    };
    exports.processTemplate = processTemplate;
});

define('oj-c/utils/PRIVATE_chartUtils/lineAreaUtils',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_visUtils"], function (require, exports, UNSAFE_visUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformValueFormats = exports.transformGroup = exports.transformSeries = exports.transformItem = void 0;
    const colorRamp = (0, UNSAFE_visUtils_1.getColorRamp)();
    function transformItem(item, series) {
        return {
            markerColor: item.color || series.markerColor,
            accessibleLabel: item.shortDesc,
            value: item.value,
            label: item.label,
            id: item.id,
            drilling: item.drilling || series.drilling,
            isMarkerDisplayed: (item.markerDisplayed && item.markerDisplayed !== 'off') ||
                (series.markerDisplayed && series.markerDisplayed !== 'off'),
            markerType: (item.markerShape !== 'auto' && item.markerShape) ||
                (series.markerShape !== 'auto' && series.markerShape),
            markerSize: (item.markerSize !== undefined && item.markerSize) || series.markerSize
        };
    }
    exports.transformItem = transformItem;
    function transformSeries(series, seriesIndex) {
        return {
            lineColor: series.color || colorRamp[seriesIndex % colorRamp.length],
            areaColor: series.areaColor || series.color || colorRamp[seriesIndex % colorRamp.length],
            accessibleLabel: series.shortDesc,
            drilling: series.drilling,
            lineStyle: series.lineStyle,
            lineType: series.lineType,
            lineWidth: series.lineWidth,
            markerShape: series.markerShape,
            markerColor: series.markerColor || colorRamp[seriesIndex % colorRamp.length],
            markerDisplayed: series.markerDisplayed,
            markerSize: series.markerSize,
            id: series.id,
            name: series.name,
            items: series.items
        };
    }
    exports.transformSeries = transformSeries;
    function transformGroup(group) {
        return {
            drilling: group.drilling,
            name: group.name,
            id: group.id,
            accessibleLabel: group.shortDesc
        };
    }
    exports.transformGroup = transformGroup;
    function transformValueFormats(valueFormats) {
        if (!valueFormats)
            return;
        const formats = {};
        if (valueFormats.value) {
            formats.value = {
                isDisplayed: valueFormats.value?.tooltipDisplay !== 'off',
                label: valueFormats.value?.tooltipLabel,
                format: valueFormats.value?.converter?.format
            };
        }
        if (valueFormats.series) {
            formats.series = {
                isDisplayed: valueFormats.series?.tooltipDisplay !== 'off',
                label: valueFormats.series?.tooltipLabel
            };
        }
        if (valueFormats.group) {
            formats.group = {
                isDisplayed: valueFormats.group?.tooltipDisplay !== 'off',
                label: valueFormats.group?.tooltipLabel
            };
        }
        return formats;
    }
    exports.transformValueFormats = transformValueFormats;
});

define('oj-c/hooks/UNSAFE_useChartData/dataUtil',["require", "exports", "ojs/ojlogger", "../../utils/UNSAFE_vizUtils/TemplateHandler", "../../utils/PRIVATE_chartUtils/lineAreaUtils"], function (require, exports, Logger, TemplateHandler_1, lineAreaUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGroupsAndSeries = void 0;
    const createGroupsAndSeries = (data, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator) => {
        const getItemContext = (context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        };
        const items = itemTemplate && itemElementName
            ? (0, TemplateHandler_1.processTemplate)(data, itemTemplate, getItemContext, itemElementName)
            : data.map((item) => {
                return { id: item.key, _itemData: item.data, ...item.data };
            });
        const groupMap = new Map();
        const groupItemMap = groupTemplate || groupComparator ? new Map() : null;
        const seriesMap = new Map();
        const addGroup = (groupId) => {
            let currentMap = groupMap;
            const symbols = [];
            for (let i = 0; i < groupId?.length; i++) {
                const gid = groupId[i];
                let group = currentMap.get(gid);
                if (!group) {
                    group = { value: Symbol(gid) };
                    if (i !== groupId?.length - 1) {
                        group.groups = new Map();
                    }
                    currentMap.set(gid, group);
                }
                if (group.value)
                    symbols.push(group.value);
                if (group.groups)
                    currentMap = group.groups;
            }
            return symbols;
        };
        const addItemIfUnique = (seriesId, groupSymbols, itemIndex) => {
            let itemMap = seriesMap.get(seriesId);
            if (!itemMap) {
                itemMap = new Map();
                seriesMap.set(seriesId, itemMap);
            }
            const leafSymbol = groupSymbols[groupSymbols?.length - 1];
            if (itemMap.get(leafSymbol) === undefined) {
                itemMap.set(leafSymbol, itemIndex);
                if (groupItemMap) {
                    groupSymbols.forEach((groupSymbol) => {
                        let groupItems = groupItemMap.get(groupSymbol);
                        if (!groupItems) {
                            groupItems = [];
                            groupItemMap.set(groupSymbol, groupItems);
                        }
                        groupItems.push(itemIndex);
                    });
                }
            }
        };
        const processItems = () => {
            items.forEach((item, index) => {
                const groupSymbols = addGroup(item['groupId']);
                addItemIfUnique(item['seriesId'], groupSymbols, index);
            });
        };
        const createGroupContext = (groupSymbol, groupIds, index) => {
            const context = {
                ids: groupIds,
                depth: groupIds?.length,
                index: index
            };
            Object.defineProperty(context, 'items', {
                get: () => {
                    return groupItemMap?.get(groupSymbol).map((itemIndex) => {
                        const item = items[itemIndex];
                        return {
                            data: item._itemData,
                            key: item.id,
                            index: itemIndex
                        };
                    });
                }
            });
            return context;
        };
        const createGroupLevel = (mapLevel, prefix) => {
            const gids = [...mapLevel.keys()];
            const groupContexts = new Map();
            const groups = gids.map((gid, index) => {
                let group;
                const value = mapLevel.get(gid);
                const groupSymbol = value?.value;
                const subGroups = value?.groups;
                let groupContext;
                if ((groupTemplate || groupComparator) && groupSymbol) {
                    groupContext = createGroupContext(groupSymbol, [...prefix, gid], index);
                    groupContexts.set(gid, groupContext);
                }
                if (groupTemplate && groupElementName) {
                    group = (0, TemplateHandler_1.processNodeTemplate)({ key: groupSymbol }, groupTemplate, groupContext, groupElementName);
                }
                else {
                    group = {};
                }
                group['id'] = gid;
                group['name'] = group['name'] == null ? gid : group['name'];
                if (subGroups) {
                    group['groups'] = createGroupLevel(subGroups, [...prefix, gid]);
                }
                else {
                    group = (0, lineAreaUtils_1.transformGroup)(group);
                    Object.defineProperty(group, 'symbol', {
                        value: groupSymbol,
                        enumerable: false
                    });
                }
                return group;
            });
            if (groupComparator) {
                groups.sort((a, b) => groupComparator(groupContexts.get(a['id']), groupContexts.get(b['id'])));
            }
            return groups;
        };
        const createGroups = () => {
            try {
                return createGroupLevel(groupMap, []);
            }
            catch (error) {
                Logger.error(error);
                return [];
            }
        };
        const createSeriesContext = (seriesId, index, groupSymbols, itemMap) => {
            const context = {
                id: seriesId,
                index: index
            };
            Object.defineProperty(context, 'items', {
                get: () => {
                    const itemContexts = [];
                    groupSymbols.forEach((symbol) => {
                        const itemIndex = itemMap.get(symbol);
                        if (itemIndex != null) {
                            const item = items[itemIndex];
                            itemContexts.push({
                                data: item._itemData,
                                key: item.id,
                                index: itemIndex
                            });
                        }
                        return undefined;
                    });
                    return itemContexts;
                }
            });
            return context;
        };
        const getGroupSymbols = (groups) => {
            const symbols = [];
            groups.forEach((group) => {
                if (group.groups) {
                    symbols.push(...getGroupSymbols(group.groups));
                }
                else if (group.symbol) {
                    symbols.push(group.symbol);
                }
            });
            return symbols;
        };
        const createSeries = (groups) => {
            let arSeries;
            try {
                const seriesContexts = new Map();
                const groupSymbols = getGroupSymbols(groups);
                const sids = [...seriesMap.keys()];
                arSeries = sids.map((sid, index) => {
                    const itemMap = seriesMap.get(sid);
                    let seriesContext;
                    if ((seriesTemplate || seriesComparator) && itemMap) {
                        seriesContext = createSeriesContext(sid, index, groupSymbols, itemMap);
                        seriesContexts.set(sid, seriesContext);
                    }
                    let series;
                    if (seriesTemplate && seriesContext && seriesElementName) {
                        series = (0, TemplateHandler_1.processNodeTemplate)({ key: sid }, seriesTemplate, seriesContext, seriesElementName);
                    }
                    else {
                        series = { id: sid };
                    }
                    series['name'] = series['name'] == null ? String(sid) : series['name'];
                    series['items'] = groupSymbols.map((symbol) => {
                        let item = null;
                        if (itemMap) {
                            const itemIndex = itemMap.get(symbol);
                            if (itemIndex != null) {
                                item = items[itemIndex];
                            }
                        }
                        return item;
                    });
                    return series;
                });
                if (seriesComparator) {
                    arSeries.sort((a, b) => seriesComparator(seriesContexts.get(a['id']), seriesContexts.get(b['id'])));
                }
                return arSeries.map((series, index) => {
                    series['items'] = series['items'].map((item) => {
                        return (0, lineAreaUtils_1.transformItem)(item, series);
                    });
                    return (0, lineAreaUtils_1.transformSeries)(series, index);
                });
            }
            catch (error) {
                Logger.error(error);
                arSeries = [];
            }
            return arSeries;
        };
        processItems();
        const groups = createGroups();
        const series = createSeries(groups);
        return { groups, series };
    };
    exports.createGroupsAndSeries = createGroupsAndSeries;
});

define('oj-c/hooks/UNSAFE_useChartData/useChartData',["require", "exports", "../UNSAFE_useDataProvider/useDataProvider", "./dataUtil"], function (require, exports, useDataProvider_1, dataUtil_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useChartData = void 0;
    function useChartData(dataProvider, addBusyState, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator) {
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: dataProvider,
            addBusyState
        });
        const { series, groups } = (0, dataUtil_1.createGroupsAndSeries)(data, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator);
        const getDataItem = (seriesIndex, groupIndex) => {
            const seriesItems = series[seriesIndex]['items'];
            return seriesItems[groupIndex];
        };
        return { series, groups, getDataItem };
    }
    exports.useChartData = useChartData;
});

define('oj-c/utils/PRIVATE_chartUtils/events',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartEventsHandler = exports.getIdFromDetail = void 0;
    const getItemDrillDetail = (series, groups, detail) => {
        const data = series[detail.seriesIndex];
        const group = groups[detail.groupIndex].id;
        const groupData = groups[detail.groupIndex];
        const id = detail.id;
        const itemData = series[detail.seriesIndex]['items'];
        const seriesId = series[detail.seriesIndex]['id'];
        const seriesData = series[detail.seriesIndex];
        const itemObj = { data, group, groupData, id, itemData, seriesId, seriesData };
        return itemObj;
    };
    const getGroupDrillDetail = (series, groups, detail) => {
        const group = groups[detail.groupIndex].id;
        const groupData = groups[detail.groupIndex];
        const id = detail.id;
        const items = series[detail.groupIndex]['items'];
        const groupObj = { group, groupData, id, items };
        return groupObj;
    };
    const getSeriesDrillDetail = (series, detail) => {
        const { itemIndex } = detail;
        return {
            id: series[itemIndex]['id'],
            items: series[itemIndex]['items'],
            series: series[itemIndex]['id'],
            seriesData: series
        };
    };
    function getIdFromDetail(detail, series, getDataItem) {
        const { seriesIndex, groupIndex } = detail;
        if (seriesIndex === undefined) {
            return;
        }
        if (groupIndex === undefined) {
            return series[seriesIndex]['id'];
        }
        return getDataItem(seriesIndex, groupIndex).id;
    }
    exports.getIdFromDetail = getIdFromDetail;
    const getChartEventsHandler = (series, groups, drilling, onOjItemDrill, onOjGroupDrill, onOjSeriesDrill) => {
        const itemDrillHandler = (detail) => {
            if (drilling === 'on') {
                onOjItemDrill?.(getItemDrillDetail(series, groups, detail));
            }
        };
        const groupDrillHandler = (detail) => {
            if (drilling === 'on' || drilling === 'groupsOnly') {
                onOjGroupDrill?.(getGroupDrillDetail(series, groups, detail));
            }
        };
        const seriesDrillHandler = (detail) => {
            if (drilling === 'seriesOnly' || drilling === 'on') {
                onOjSeriesDrill?.(getSeriesDrillDetail(series, detail));
            }
        };
        return {
            itemDrillHandler,
            groupDrillHandler,
            seriesDrillHandler
        };
    };
    exports.getChartEventsHandler = getChartEventsHandler;
});

define('oj-c/utils/PRIVATE_chartUtils/legendUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBLACCategoriesItems = exports.getLegendData = exports.LegendDefaults = void 0;
    exports.LegendDefaults = {
        rendered: 'off',
        position: 'auto'
    };
    function getLegendData(series) {
        return series.map((chartSeries) => {
            return {
                markerColor: chartSeries.color || chartSeries.areaColor,
                markerShape: chartSeries.markerShape != 'auto' ? chartSeries.markerShape : 'square',
                text: chartSeries.name || chartSeries.id,
                id: chartSeries.id
            };
        });
    }
    exports.getLegendData = getLegendData;
    function getBLACCategoriesItems(series, groups, getDataItem, hoverBehavior, hideAndShowBehavior) {
        const categoriesItem = [];
        if (hoverBehavior === 'none' && hideAndShowBehavior === 'none') {
            return categoriesItem;
        }
        series.forEach((serie, seriesIndex) => {
            groups.forEach((_, groupIndex) => {
                const data = getDataItem(seriesIndex, groupIndex);
                categoriesItem.push({
                    id: data.id,
                    categories: data.categories || serie['categories'] || [serie['id']]
                });
            });
            categoriesItem.push({
                id: serie['id'],
                categories: serie['categories'] || [serie['id']]
            });
        });
        return categoriesItem;
    }
    exports.getBLACCategoriesItems = getBLACCategoriesItems;
});

define('oj-c/hooks/UNSAFE_useVizCategories/useVizCategories',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useCategories"], function (require, exports, UNSAFE_useCategories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVizCategories = void 0;
    function useVizCategories(categoriesItem, getCategories, hiddenCategories, highlightedCategories, hiddenMatch = 'any', highlightMatch = 'all', onHiddenCategoriesChanged, onHighlightedCategoriesChanged) {
        const { ids: hiddenIds, updateCategories: updateHidden } = (0, UNSAFE_useCategories_1.useCategories)(categoriesItem, getCategories, hiddenCategories, hiddenMatch, false, onHiddenCategoriesChanged);
        const { ids: highlightedIds, updateCategories: updateHighlighted } = (0, UNSAFE_useCategories_1.useCategories)(categoriesItem, getCategories, highlightedCategories, highlightMatch, true, onHighlightedCategoriesChanged);
        return {
            hiddenIds,
            updateHidden,
            highlightedIds,
            updateHighlighted
        };
    }
    exports.useVizCategories = useVizCategories;
});

define('oj-c/hooks/UNSAFE_useLegendPosition/useLegendPosition',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLegendPosition = void 0;
    function useLegendPosition(rootRef, position) {
        const [legendPosition, setLegendPosition] = (0, hooks_1.useState)(position === 'auto' ? 'end' : position);
        (0, hooks_1.useLayoutEffect)(() => {
            if (position === 'auto' && rootRef.current) {
                const rootDims = rootRef.current.getBoundingClientRect();
                if (rootDims.height > rootDims.width) {
                    setLegendPosition('bottom');
                }
            }
        }, [position, rootRef]);
        return legendPosition;
    }
    exports.useLegendPosition = useLegendPosition;
});

define('oj-c/utils/PRIVATE_chartUtils/plotAreaUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPlotArea = void 0;
    function getPlotArea(plotArea, yMajorTick, yMinorTick, xMajorTick) {
        return {
            color: plotArea?.backgroundColor,
            yMajorTick: yMajorTick?.rendered
                ? { isRendered: yMajorTick?.rendered !== 'off', ...yMajorTick }
                : yMajorTick,
            yMinorTick: yMinorTick?.rendered
                ? { isRendered: yMinorTick?.rendered && yMinorTick?.rendered !== 'off', ...yMinorTick }
                : yMinorTick,
            xMajorTick: xMajorTick?.rendered
                ? { isRendered: xMajorTick?.rendered && xMajorTick?.rendered !== 'off', ...xMajorTick }
                : xMajorTick
        };
    }
    exports.getPlotArea = getPlotArea;
});


define('oj-c/area-chart/area-chart',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "ojs/ojcontext", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "ojs/ojvcomponent", "../hooks/UNSAFE_useChartData/useChartData", "../utils/PRIVATE_chartUtils/events", "../utils/PRIVATE_chartUtils/legendUtils", "../hooks/UNSAFE_useVizCategories/useVizCategories", "../hooks/UNSAFE_useLegendPosition/useLegendPosition", "../utils/PRIVATE_chartUtils/lineAreaUtils", "../utils/PRIVATE_chartUtils/plotAreaUtils", "css!oj-c/area-chart/area-chart-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_LineAreaChart_1, Context, UNSAFE_Legend_1, UNSAFE_ChartWithLegend_1, ojvcomponent_1, useChartData_1, events_1, legendUtils_1, useVizCategories_1, useLegendPosition_1, lineAreaUtils_1, plotAreaUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChart = void 0;
    function AreaChartComp({ data, hideAndShowBehavior = 'none', orientation = 'vertical', xAxis, yAxis, hoverBehavior = 'none', valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling = 'off', hiddenCategories = [], highlightedCategories = [], highlightMatch = 'any', selection = [], selectionMode = 'none', stack = 'off', legend = {
        rendered: 'on',
        position: 'auto'
    }, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-area-chart: ${description}` })
                : () => { };
        }, []);
        const { series, groups, getDataItem } = (0, useChartData_1.useChartData)(data, addBusyState, itemTemplate, seriesTemplate, groupTemplate, 'oj-c-area-chart-item', 'oj-c-area-chart-series', 'oj-c-area-chart-group', seriesComparator, groupComparator);
        const { majorTick: xMajorTick, ...xAxisRest } = xAxis ?? {};
        const { majorTick: yMajorTick, minorTick: yMinorTick, ...yAxisRest } = yAxis ?? {};
        const { itemDrillHandler, groupDrillHandler, seriesDrillHandler } = (0, events_1.getChartEventsHandler)(series, groups, drilling, props.onOjItemDrill, props.onOjGroupDrill, props.onOjSeriesDrill);
        const selectionChangeHandler = (detail) => {
            props.onSelectionChanged?.(detail.ids);
        };
        const categoriesItems = (0, legendUtils_1.getBLACCategoriesItems)(series, groups, getDataItem, hoverBehavior, hideAndShowBehavior);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', highlightMatch, props.onHiddenCategoriesChanged, props.onHighlightedCategoriesChanged);
        const onItemInput = (detail) => {
            if (hoverBehavior === 'none')
                return;
            const id = (0, events_1.getIdFromDetail)(detail, series, getDataItem);
            updateHighlighted(id);
        };
        const legendPosition = (0, useLegendPosition_1.useLegendPosition)(rootRef, legend.position || legendUtils_1.LegendDefaults.position);
        const isLegendRendered = (legend.rendered || legendUtils_1.LegendDefaults.rendered) != 'off';
        const legendData = (0, legendUtils_1.getLegendData)(series);
        const isLegendInteractive = hideAndShowBehavior != 'none' || hoverBehavior != 'none' || drilling === 'on';
        const legendItemActionHandler = (detail) => {
            if (hideAndShowBehavior != 'none') {
                updateHidden(detail.itemId);
                return;
            }
            seriesDrillHandler(detail);
        };
        const legendItemInputHandler = (detail) => {
            if (hoverBehavior != 'none') {
                updateHighlighted(detail.itemId);
            }
        };
        const chart = series.length > 0 && groups.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_LineAreaChart_1.LineAreaChart, { type: "area", width: "100%", height: "100%", series: series, groups: groups, getDataItem: getDataItem, onItemInput: onItemInput, drilling: drilling, onItemDrill: itemDrillHandler, onGroupDrill: groupDrillHandler, onSelectionChange: selectionChangeHandler, selectionMode: selectionMode, selectedIds: selectionMode === 'none' ? undefined : selection, orientation: orientation, xAxis: xAxisRest, yAxis: yAxisRest, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds, plotArea: (0, plotAreaUtils_1.getPlotArea)(plotArea, yMajorTick, yMinorTick, xMajorTick), hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, isStacked: stack === 'on', valueFormats: (0, lineAreaUtils_1.transformValueFormats)(valueFormats), "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'] })) : undefined;
        const chartLegend = isLegendRendered && legendData.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { items: legendData, orientation: legendPosition === 'start' || legendPosition === 'end' ? 'vertical' : 'horizontal', isReadOnly: !isLegendInteractive, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds.length === 0 ? undefined : hiddenIds, symbolHeight: legend.symbolHeight, symbolWidth: legend.symbolWidth, onItemAction: legendItemActionHandler, onInput: legendItemInputHandler })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_ChartWithLegend_1.ChartWithLegend, { chart: chart, position: legendPosition, maxSize: legend.maxSize, size: legend.size, legend: chartLegend }) }));
    }
    exports.AreaChart = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart', AreaChartComp, "AreaChart", { "properties": { "data": { "type": "DataProvider|null" }, "seriesComparator": { "type": "function" }, "groupComparator": { "type": "function" }, "stack": { "type": "string", "enumValues": ["off", "on"] }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "yAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "xAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "plotArea": { "type": "object", "properties": { "backgroundColor": { "type": "string" } } }, "zoomAndScroll": { "type": "string", "enumValues": ["off", "live"] }, "valueFormats": { "type": "object", "properties": { "group": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "series": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "value": { "type": "object", "properties": { "converter": { "type": "any" }, "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } } } }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["none", "withoutRescale", "withRescale"] }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "legend": { "type": "object", "properties": { "position": { "type": "string", "enumValues": ["auto", "end", "start", "top", "bottom"] }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] }, "maxSize": { "type": "number|string" }, "size": { "type": "number|string" }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" } } } }, "slots": { "itemTemplate": { "data": {} }, "seriesTemplate": { "data": {} }, "groupTemplate": { "data": {} } }, "events": { "ojViewportChange": {}, "ojItemDrill": {}, "ojGroupDrill": {}, "ojSeriesDrill": {} }, "extension": { "_WRITEBACK_PROPS": ["selection", "hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hideAndShowBehavior": "none", "orientation": "vertical", "hoverBehavior": "none", "drilling": "off", "hiddenCategories": [], "highlightedCategories": [], "highlightMatch": "any", "selection": [], "selectionMode": "none", "stack": "off", "legend": { "rendered": "on", "position": "auto" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart',["require", "exports", "./area-chart/area-chart"], function (require, exports, area_chart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChart = void 0;
    Object.defineProperty(exports, "AreaChart", { enumerable: true, get: function () { return area_chart_1.AreaChart; } });
});

define('oj-c/area-chart-item/area-chart-item',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartItem = void 0;
    exports.AreaChartItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-item', ({}) => {
        return null;
    }, "AreaChartItem", { "properties": { "seriesId": { "type": "string" }, "groupId": { "type": "Array<string>" }, "value": { "type": "number" }, "color": { "type": "string" }, "markerDisplayed": { "type": "string", "enumValues": ["auto", "off", "on"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerSize": { "type": "number" }, "categories": { "type": "Array<string>" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-item',["require", "exports", "./area-chart-item/area-chart-item"], function (require, exports, area_chart_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartItem = void 0;
    Object.defineProperty(exports, "AreaChartItem", { enumerable: true, get: function () { return area_chart_item_1.AreaChartItem; } });
});

define('oj-c/area-chart-series/area-chart-series',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartSeries = exports.AreaChartSeriesDefaults = void 0;
    exports.AreaChartSeriesDefaults = {
        drilling: 'inherit'
    };
    exports.AreaChartSeries = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-series', ({ drilling = exports.AreaChartSeriesDefaults.drilling, ...props }) => {
        return null;
    }, "AreaChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-series',["require", "exports", "./area-chart-series/area-chart-series"], function (require, exports, area_chart_series_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartSeries = void 0;
    Object.defineProperty(exports, "AreaChartSeries", { enumerable: true, get: function () { return area_chart_series_1.AreaChartSeries; } });
});

define('oj-c/area-chart-group/area-chart-group',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartGroup = exports.AreaChartGroupDefaults = void 0;
    exports.AreaChartGroupDefaults = {
        drilling: 'inherit'
    };
    exports.AreaChartGroup = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart-group', ({ drilling = exports.AreaChartGroupDefaults.drilling, ...props }) => {
        return null;
    }, "AreaChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-group',["require", "exports", "./area-chart-group/area-chart-group"], function (require, exports, area_chart_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartGroup = void 0;
    Object.defineProperty(exports, "AreaChartGroup", { enumerable: true, get: function () { return area_chart_group_1.AreaChartGroup; } });
});


define('oj-c/highlight-text/highlight-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_HighlightText", "css!oj-c/highlight-text/highlight-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_HighlightText_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HighlightText = void 0;
    exports.HighlightText = (0, ojvcomponent_1.registerCustomElement)('oj-c-highlight-text', ({ matchText, text }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_HighlightText_1.HighlightText, { matchText: matchText, children: text }) }));
    }, "HighlightText", { "properties": { "matchText": { "type": "string" }, "text": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/highlight-text',["require", "exports", "./highlight-text/highlight-text"], function (require, exports, highlight_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HighlightText = void 0;
    Object.defineProperty(exports, "HighlightText", { enumerable: true, get: function () { return highlight_text_1.HighlightText; } });
});

define('oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAssistiveText = void 0;
    function determineAssistiveText(help, validatorHint, helpHints, converterHint, displayOptions, userAssistanceDensity) {
        const helpHintsDef = userAssistanceDensity !== 'compact' ? helpHints?.definition : undefined;
        return (help?.instruction ||
            (displayOptions?.validatorHint === 'none' ? undefined : validatorHint) ||
            helpHintsDef ||
            (displayOptions?.converterHint === 'none' ? undefined : converterHint));
    }
    function determineSyncValidatorHints(validators) {
        if (!validators.length) {
            return undefined;
        }
        const syncHints = validators
            .map((validator) => typeof validator.getHint === 'function'
            ? validator.getHint()
            : undefined)
            .filter(Boolean);
        return syncHints.join('\n');
    }
    function useAssistiveText({ addBusyState, converter, displayOptions, help, helpHints, userAssistanceDensity, validators }) {
        const [validatorHint, setValidatorHint] = (0, hooks_1.useState)(!validators || !validators.length ? undefined : determineSyncValidatorHints(validators));
        const staleIdentity = (0, hooks_1.useRef)();
        (0, hooks_1.useEffect)(() => {
            if (!validators || !validators.length) {
                setValidatorHint(undefined);
                return;
            }
            setValidatorHint(determineSyncValidatorHints(validators));
            const asyncHints = validators
                .map((validator) => validator.hint)
                .filter(Boolean);
            const localStaleIdentity = (staleIdentity.current = Symbol());
            const resolver = addBusyState?.('resolving the async validator hints');
            Promise.allSettled(asyncHints).then((hints) => {
                setValidatorHint((currentHints) => {
                    const treatedHints = hints
                        .map((result) => (result.status === 'fulfilled' ? result.value : undefined))
                        .filter(Boolean);
                    if (localStaleIdentity !== staleIdentity.current || !treatedHints.length) {
                        return currentHints;
                    }
                    return [currentHints, ...treatedHints].join('\n');
                });
                resolver?.();
            });
        }, [validators]);
        const helpSourceText = userAssistanceDensity !== 'compact'
            ? helpHints?.sourceText
            : helpHints?.definition || helpHints?.sourceText;
        return {
            assistiveText: determineAssistiveText(help, validatorHint, helpHints, converter?.getHint?.() ?? undefined, displayOptions, userAssistanceDensity),
            helpSourceLink: helpHints?.source,
            helpSourceText
        };
    }
    exports.useAssistiveText = useAssistiveText;
});

define('oj-c/editable-value/utils/utils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isShallowEqual = exports.normalizeValue = exports.treatNull = exports.createMessageFromError = void 0;
    function createMessageFromError(error) {
        if (typeof error.getMessage === 'function') {
            return {
                severity: 'error',
                detail: error.getMessage().detail
            };
        }
        return { severity: 'error', detail: error.message };
    }
    exports.createMessageFromError = createMessageFromError;
    function treatNull(value, defaultValue) {
        if (value === null) {
            return defaultValue;
        }
        return value;
    }
    exports.treatNull = treatNull;
    function normalizeValue(value) {
        if (typeof value === 'string' && value === '') {
            return null;
        }
        return value;
    }
    exports.normalizeValue = normalizeValue;
    const isShallowEqual = (a, b) => a === b || (a.length === b.length && a.every((v, i) => v === b[i]));
    exports.isShallowEqual = isShallowEqual;
});

define('oj-c/editable-value/UNSAFE_useComponentMessaging/useComponentMessaging',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useComponentMessaging = void 0;
    function useComponentMessaging({ messagesCustom: messagesCustomProp = [], onMessagesCustomChanged }) {
        const [messagesCustom, setMessagesCustom] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(messagesCustomProp, onMessagesCustomChanged);
        const [componentMessages, setComponentMessages] = (0, hooks_1.useState)([]);
        const [deferredComponentMessages, setDeferredComponentMessages] = (0, hooks_1.useState)([]);
        const prevMessagesCustomPropRef = (0, hooks_1.useRef)(messagesCustomProp);
        const addComponentMessage = (0, hooks_1.useCallback)((...messages) => {
            setComponentMessages((prevMessages) => [...prevMessages, ...messages]);
        }, []);
        const addDeferredComponentMessage = (0, hooks_1.useCallback)((message) => {
            setComponentMessages((prevMessages) => [...prevMessages, message]);
        }, []);
        const clearAllComponentMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages([]);
            setDeferredComponentMessages([]);
        }, []);
        const clearDeferredComponentMessages = (0, hooks_1.useCallback)(() => {
            setDeferredComponentMessages([]);
        }, []);
        const clearAllMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages([]);
            setDeferredComponentMessages([]);
            setMessagesCustom([]);
        }, []);
        const hasCustomErrorMessages = (0, hooks_1.useCallback)(() => {
            return messagesCustom.some((message) => message.severity === 'error');
        }, [messagesCustom]);
        const hasNoErrorMessages = (0, hooks_1.useCallback)(() => {
            return (componentMessages.length === 0 &&
                deferredComponentMessages.length === 0 &&
                hasCustomErrorMessages() === false);
        }, [componentMessages, deferredComponentMessages, hasCustomErrorMessages]);
        const hasHiddenMessages = (0, hooks_1.useCallback)(() => {
            return deferredComponentMessages.length !== 0;
        }, [deferredComponentMessages]);
        const showHiddenMessages = (0, hooks_1.useCallback)(() => {
            setComponentMessages((prevMessages) => [...prevMessages, ...deferredComponentMessages]);
            setDeferredComponentMessages([]);
        }, [deferredComponentMessages]);
        (0, hooks_1.useEffect)(() => {
            if (prevMessagesCustomPropRef.current === messagesCustomProp) {
                return;
            }
            prevMessagesCustomPropRef.current = messagesCustomProp;
            if ((0, utils_1.isShallowEqual)(messagesCustom, messagesCustomProp)) {
                return;
            }
            setMessagesCustom(messagesCustomProp);
        }, [messagesCustom, messagesCustomProp]);
        return (0, hooks_1.useMemo)(() => ({
            componentMessages,
            deferredComponentMessages,
            messagesCustom,
            visibleMessages: [...messagesCustom, ...componentMessages],
            addComponentMessage,
            addDeferredComponentMessage,
            clearAllComponentMessages,
            clearAllMessages,
            clearDeferredComponentMessages,
            hasCustomErrorMessages,
            hasHiddenMessages,
            hasNoErrorMessages,
            setComponentMessages,
            setDeferredComponentMessages,
            showHiddenMessages
        }), [
            componentMessages,
            deferredComponentMessages,
            messagesCustom,
            hasCustomErrorMessages,
            hasHiddenMessages,
            hasNoErrorMessages,
            showHiddenMessages
        ]);
    }
    exports.useComponentMessaging = useComponentMessaging;
});

define('oj-c/editable-value/UNSAFE_useConverter/useConverter',["require", "exports", "ojs/ojconverter-nativenumber", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "../utils/utils"], function (require, exports, ojconverter_nativenumber_1, hooks_1, UNSAFE_useTranslationBundle_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverter = exports.ConverterErrorSymbol = void 0;
    exports.ConverterErrorSymbol = Symbol('ConverterError');
    function shouldSkipParse(value) {
        return value === '' || value === null;
    }
    function shouldSkipFormat(value) {
        return value === null;
    }
    function useConverter({ componentMessagingState, validationState, converter }) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const converterParseError = translations.inputNumber_converterParseError();
        const parse = (0, hooks_1.useCallback)((displayValue) => {
            if (!converter || shouldSkipParse(displayValue)) {
                return displayValue;
            }
            try {
                return converter.parse(displayValue);
            }
            catch (error) {
                const errorMsg = error?.cause === ojconverter_nativenumber_1.USER_INPUT_ERROR
                    ? {
                        severity: 'error',
                        detail: converterParseError
                    }
                    : (0, utils_1.createMessageFromError)(error);
                componentMessagingState.setComponentMessages([errorMsg]);
                validationState.setValid('invalidShown');
                return exports.ConverterErrorSymbol;
            }
        }, [converter, componentMessagingState, validationState]);
        const format = (0, hooks_1.useCallback)((value, shouldSuppressError = false) => {
            if (!converter || shouldSkipFormat(value)) {
                return (0, utils_1.treatNull)(value, '') ?? '';
            }
            try {
                return converter.format(value);
            }
            catch (error) {
                if (!shouldSuppressError) {
                    componentMessagingState.setComponentMessages([(0, utils_1.createMessageFromError)(error)]);
                    validationState.setValid('invalidShown');
                }
                return (0, utils_1.treatNull)(value, '');
            }
        }, [converter, componentMessagingState, validationState]);
        return (0, hooks_1.useMemo)(() => ({
            format,
            parse
        }), [format, parse]);
    }
    exports.useConverter = useConverter;
});

define('oj-c/editable-value/UNSAFE_useConverterLifecycle/useConverterLifecycle',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverterLifecycle = void 0;
    function useConverterLifecycle({ converter, validationState, refreshDisplayValue, runFullValidationAndUpdateValue }) {
        const prevConverterRef = (0, hooks_1.useRef)(converter);
        (0, hooks_1.useEffect)(() => {
            if (prevConverterRef.current === converter) {
                return;
            }
            prevConverterRef.current = converter;
            const { valid } = validationState;
            switch (valid) {
                case 'invalidShown':
                    runFullValidationAndUpdateValue();
                    break;
                case 'valid':
                case 'invalidHidden':
                default:
                    refreshDisplayValue();
                    break;
            }
        }, [converter, validationState, refreshDisplayValue, runFullValidationAndUpdateValue]);
    }
    exports.useConverterLifecycle = useConverterLifecycle;
});

define('oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators',["require", "exports", "ojs/ojvalidator-required", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, RequiredValidator, hooks_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDeferredValidators = void 0;
    function useDeferredValidators({ labelHint, required, requiredMessageDetail: propRequiredMessageDetail }) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.formControl_requiredMessageDetail();
        const requiredValidator = (0, hooks_1.useMemo)(() => {
            if (required) {
                return new RequiredValidator({
                    label: labelHint,
                    messageDetail: requiredMessageDetail
                });
            }
            return null;
        }, [required]);
        return (0, hooks_1.useMemo)(() => [requiredValidator].filter(Boolean), [requiredValidator]);
    }
    exports.useDeferredValidators = useDeferredValidators;
});

define('oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStaleIdentity = void 0;
    function useStaleIdentity() {
        const staleIdentityMap = (0, hooks_1.useRef)(new Map());
        const setStaleIdentity = (0, hooks_1.useCallback)((id) => {
            const localStaleIdentity = Symbol();
            staleIdentityMap.current.set(id, localStaleIdentity);
            return {
                isStale: () => localStaleIdentity !== staleIdentityMap.current.get(id)
            };
        }, []);
        return { setStaleIdentity };
    }
    exports.useStaleIdentity = useStaleIdentity;
});

define('oj-c/editable-value/UNSAFE_useValidators/useValidators',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../UNSAFE_useStaleIdentity/useStaleIdentity", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, useStaleIdentity_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValidators = exports.ValidationResult = void 0;
    exports.ValidationResult = {
        VALID: 'VALID',
        INVALID: 'INVALID',
        STALE: 'STALE'
    };
    function useValidators({ componentMessagingState, defaultValidState, deferredValidators = [], validators = [], addBusyState, onValidChanged }) {
        const [valid, setValid] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(defaultValidState, onValidChanged);
        const { setStaleIdentity } = (0, useStaleIdentity_1.useStaleIdentity)();
        (0, hooks_1.useLayoutEffect)(() => {
            if (defaultValidState !== undefined) {
                onValidChanged?.(defaultValidState);
            }
        }, []);
        const { addComponentMessage, clearAllComponentMessages, clearAllMessages, hasCustomErrorMessages, setComponentMessages } = componentMessagingState;
        const fullValidate = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { doNotClearMessagesCustom = false } = options;
            const hadCustomErrorMessages = hasCustomErrorMessages();
            setValid('pending');
            if (doNotClearMessagesCustom) {
                clearAllComponentMessages();
            }
            else {
                clearAllMessages();
            }
            if (validators.length === 0 && deferredValidators.length === 0) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
                return true;
            }
            function nonDeferredValidate(validator, value) {
                try {
                    const validateResult = validator.validate(value);
                    if (validateResult instanceof Promise) {
                        return validateResult.then(() => { }, (error) => (0, utils_1.createMessageFromError)(error));
                    }
                }
                catch (error) {
                    return (0, utils_1.createMessageFromError)(error);
                }
                return;
            }
            const errors = [];
            const maybeErrorsPromise = [];
            const deferredErrors = deferredValidate(value);
            if (deferredErrors !== undefined) {
                errors.push(...deferredErrors);
            }
            if (value !== null && value !== undefined) {
                for (const validator of validators) {
                    const maybeComponentMessageItem = nonDeferredValidate(validator, value);
                    if (maybeComponentMessageItem !== undefined) {
                        if (maybeComponentMessageItem instanceof Promise) {
                            maybeErrorsPromise.push(maybeComponentMessageItem);
                        }
                        else {
                            errors.push(maybeComponentMessageItem);
                        }
                    }
                }
            }
            if (!errors.length && !maybeErrorsPromise.length) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
                return true;
            }
            const hasSyncError = errors.length !== 0;
            if (hasSyncError) {
                setComponentMessages(errors);
                setValid('invalidShown');
            }
            if (!maybeErrorsPromise.length) {
                return !hasSyncError;
            }
            const resolver = addBusyState?.('running validation');
            const { isStale } = setStaleIdentity('useValidators-validate');
            let hasAsyncError = false;
            for (const asyncValidationResult of maybeErrorsPromise) {
                const maybeValidationError = await asyncValidationResult;
                if (maybeValidationError && !isStale()) {
                    addComponentMessage(maybeValidationError);
                    setValid('invalidShown');
                    hasAsyncError = true;
                }
            }
            if (!hasSyncError && !hasAsyncError && !isStale()) {
                if (hadCustomErrorMessages && doNotClearMessagesCustom) {
                    setValid('invalidShown');
                }
                else {
                    setValid('valid');
                }
            }
            resolver?.();
            return !hasSyncError && !hasAsyncError;
        }, [
            addComponentMessage,
            clearAllComponentMessages,
            clearAllMessages,
            deferredValidators,
            validators
        ]);
        const deferredValidate = (0, hooks_1.useCallback)((value) => {
            const errors = [];
            for (const validator of deferredValidators) {
                try {
                    validator.validate(value);
                }
                catch (error) {
                    errors.push((0, utils_1.createMessageFromError)(error));
                }
            }
            if (errors.length) {
                return errors;
            }
            return undefined;
        }, [deferredValidators]);
        const validateValueOnInternalChange = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { isStale } = setStaleIdentity('useValidationLifeCycle-validateValueOnInternalChange');
            const resolver = addBusyState?.('running validateValueOnInternalChange');
            const validationResult = await fullValidate(value, options);
            resolver?.();
            if (isStale()) {
                return exports.ValidationResult.STALE;
            }
            return validationResult ? exports.ValidationResult.VALID : exports.ValidationResult.INVALID;
        }, [addBusyState, fullValidate]);
        const validateValueOnExternalChange = (0, hooks_1.useCallback)((value) => {
            const { clearAllMessages, setDeferredComponentMessages } = componentMessagingState;
            clearAllMessages();
            const maybeErrors = deferredValidate(value);
            if (maybeErrors) {
                setDeferredComponentMessages(maybeErrors);
                setValid('invalidHidden');
            }
            else {
                setValid('valid');
            }
            return exports.ValidationResult.VALID;
        }, [componentMessagingState, deferredValidate]);
        return (0, hooks_1.useMemo)(() => ({
            valid,
            setValid,
            deferredValidate,
            fullValidate,
            validateValueOnExternalChange,
            validateValueOnInternalChange
        }), [
            valid,
            deferredValidate,
            fullValidate,
            validateValueOnExternalChange,
            validateValueOnInternalChange
        ]);
    }
    exports.useValidators = useValidators;
});

define('oj-c/editable-value/UNSAFE_useValidationLifecycle/useValidationLifecycle',["require", "exports", "preact/hooks", "../UNSAFE_useConverter/useConverter", "../UNSAFE_useValidators/useValidators", "../utils/utils"], function (require, exports, hooks_1, useConverter_1, useValidators_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValidationLifecycle = void 0;
    function useValidationLifecycle({ componentMessagingState, disabled, deferredValidators, readonly, validationState, validators, getValueForValidation, setValueAfterValidation }) {
        const prevDeferredValidatorsRef = (0, hooks_1.useRef)(deferredValidators);
        const prevValidatorsRef = (0, hooks_1.useRef)(validators);
        const prevMessagesCustomRef = (0, hooks_1.useRef)(componentMessagingState.messagesCustom);
        const prevReadonlyRef = (0, hooks_1.useRef)(readonly);
        const prevDisabledRef = (0, hooks_1.useRef)(disabled);
        const isFirstRender = (0, hooks_1.useRef)(true);
        const runFullValidationAndUpdateValue = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled)
                return;
            const { valid, validateValueOnInternalChange } = validationState;
            const value = getValueForValidation(valid);
            if (value === useConverter_1.ConverterErrorSymbol) {
                return;
            }
            const validationResult = await validateValueOnInternalChange(value, {
                doNotClearMessagesCustom: true
            });
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                setValueAfterValidation(value);
            }
        }, [disabled, readonly, validationState, getValueForValidation, setValueAfterValidation]);
        (0, hooks_1.useEffect)(() => {
            if (!isFirstRender.current)
                return;
            isFirstRender.current = false;
            if (readonly || disabled) {
                return;
            }
            const value = getValueForValidation('valid');
            if (value === useConverter_1.ConverterErrorSymbol) {
                return;
            }
            const { deferredValidate, setValid } = validationState;
            const { hasCustomErrorMessages, setDeferredComponentMessages } = componentMessagingState;
            const maybeErrors = deferredValidate(value);
            if (maybeErrors) {
                setDeferredComponentMessages(maybeErrors);
                setValid('invalidHidden');
            }
            if (hasCustomErrorMessages()) {
                setValid('invalidShown');
            }
        }, [disabled, readonly]);
        (0, hooks_1.useEffect)(() => {
            const isRequiredToggledToFalse = prevDeferredValidatorsRef.current !== deferredValidators && deferredValidators.length === 0;
            if (prevDeferredValidatorsRef.current === deferredValidators &&
                prevReadonlyRef.current === readonly &&
                prevDisabledRef.current === disabled) {
                return;
            }
            else {
                prevReadonlyRef.current = readonly;
                prevDisabledRef.current = disabled;
                prevDeferredValidatorsRef.current = deferredValidators;
            }
            const runValidation = isRequiredToggledToFalse || (!readonly && !disabled);
            if (!runValidation) {
                return;
            }
            const { valid, deferredValidate, setValid } = validationState;
            const { clearDeferredComponentMessages, setDeferredComponentMessages } = componentMessagingState;
            switch (valid) {
                case 'valid':
                    const value = getValueForValidation(valid);
                    if (value !== useConverter_1.ConverterErrorSymbol) {
                        const maybeErrors = deferredValidate(value);
                        if (maybeErrors) {
                            setDeferredComponentMessages(maybeErrors);
                            setValid('invalidHidden');
                        }
                    }
                    break;
                case 'invalidHidden':
                    if (deferredValidators.length === 0) {
                        setValid('valid');
                        clearDeferredComponentMessages();
                    }
                    break;
                case 'invalidShown':
                    runFullValidationAndUpdateValue();
                    break;
            }
        }, [
            disabled,
            readonly,
            deferredValidators,
            componentMessagingState,
            validationState,
            getValueForValidation,
            runFullValidationAndUpdateValue
        ]);
        (0, hooks_1.useEffect)(() => {
            if (prevValidatorsRef.current === validators) {
                return;
            }
            else {
                prevValidatorsRef.current = validators;
            }
            if (readonly || disabled) {
                return;
            }
            switch (validationState.valid) {
                case 'invalidShown':
                    runFullValidationAndUpdateValue();
                    break;
            }
        }, [disabled, readonly, validators, validationState]);
        (0, hooks_1.useEffect)(() => {
            if ((0, utils_1.isShallowEqual)(prevMessagesCustomRef.current, componentMessagingState.messagesCustom)) {
                return;
            }
            const { messagesCustom, hasCustomErrorMessages, hasHiddenMessages, hasNoErrorMessages } = componentMessagingState;
            const { valid, setValid } = validationState;
            prevMessagesCustomRef.current = messagesCustom;
            if (hasCustomErrorMessages()) {
                setValid('invalidShown');
            }
            else if (valid === 'pending') {
                return;
            }
            else if (hasNoErrorMessages()) {
                setValid('valid');
            }
            else if (hasHiddenMessages()) {
                setValid('invalidHidden');
            }
        }, [componentMessagingState, validationState]);
        return {
            runFullValidationAndUpdateValue
        };
    }
    exports.useValidationLifecycle = useValidationLifecycle;
});

define('oj-c/editable-value/UNSAFE_useValue/useValue',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValue = void 0;
    function useValue({ value: valueProp, format, parse, onRawValueChanged, onTransientValueChanged, onValueChanged }) {
        const [displayValue, setDisplayValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(format(valueProp, true), onRawValueChanged);
        const [value, setValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onValueChanged);
        (0, hooks_1.useEffect)(() => {
            if (displayValue !== undefined) {
                onRawValueChanged?.(displayValue);
            }
        }, []);
        const [transientValue, setTransientValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onTransientValueChanged);
        (0, hooks_1.useEffect)(() => {
            if (valueProp !== undefined) {
                onTransientValueChanged?.(valueProp);
            }
        }, []);
        return {
            displayValue,
            transientValue,
            value,
            getValueForValidation: (0, hooks_1.useCallback)((valid) => {
                if (valid !== 'invalidShown') {
                    return value;
                }
                return parse((0, utils_1.normalizeValue)(displayValue));
            }, [displayValue, value, parse]),
            setValueAfterValidation: (0, hooks_1.useCallback)((value) => {
                setValue(value);
                setDisplayValue(format(value));
            }, [format]),
            setDisplayValue,
            setTransientValue,
            setValue,
            refreshDisplayValue: (0, hooks_1.useCallback)(() => {
                setDisplayValue(format(value));
            }, [value, format])
        };
    }
    exports.useValue = useValue;
});

define('oj-c/editable-value/UNSAFE_useValueLifecycle/useValueLifecycle',["require", "exports", "preact/hooks", "../UNSAFE_useValidators/useValidators"], function (require, exports, hooks_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueLifecycle = void 0;
    function useValueLifecycle({ value, valueState, format, validateValueOnExternalChange }) {
        const previousValueRef = (0, hooks_1.useRef)(value);
        (0, hooks_1.useEffect)(() => {
            const { value, setDisplayValue } = valueState;
            setDisplayValue(format(value));
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (previousValueRef.current === value) {
                return;
            }
            previousValueRef.current = value;
            if (value !== undefined && value !== valueState.value) {
                const { setDisplayValue, setValue } = valueState;
                const validationResult = validateValueOnExternalChange(value);
                if (validationResult === useValidators_1.ValidationResult.VALID) {
                    setValue(value);
                    setDisplayValue(format(value));
                }
            }
        }, [value, valueState, format]);
    }
    exports.useValueLifecycle = useValueLifecycle;
});

define('oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue',["require", "exports", "preact/hooks", "../UNSAFE_useComponentMessaging/useComponentMessaging", "../UNSAFE_useConverter/useConverter", "../UNSAFE_useConverterLifecycle/useConverterLifecycle", "../UNSAFE_useDeferredValidators/useDeferredValidators", "../UNSAFE_useValidationLifecycle/useValidationLifecycle", "../UNSAFE_useValidators/useValidators", "../UNSAFE_useValue/useValue", "../UNSAFE_useValueLifecycle/useValueLifecycle", "../utils/utils"], function (require, exports, hooks_1, useComponentMessaging_1, useConverter_1, useConverterLifecycle_1, useDeferredValidators_1, useValidationLifecycle_1, useValidators_1, useValue_1, useValueLifecycle_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValue = void 0;
    function useEditableValue({ ariaDescribedBy, converter, disabled, displayOptions, implicitComponentValidator, labelHint, messagesCustom, readonly, required, requiredMessageDetail, shouldNormalizeValueOnCommit = true, validators, value: valueProp, addBusyState, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, onTransientValueChanged, wrapValueState }) {
        const componentMessagingState = (0, useComponentMessaging_1.useComponentMessaging)({
            messagesCustom,
            onMessagesCustomChanged
        });
        const { clearAllMessages, visibleMessages } = componentMessagingState;
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const combinedValidators = !implicitComponentValidator
            ? validators
            : validators
                ? [implicitComponentValidator, ...validators]
                : [implicitComponentValidator];
        const validationState = (0, useValidators_1.useValidators)({
            componentMessagingState,
            defaultValidState: 'valid',
            deferredValidators,
            validators: combinedValidators,
            addBusyState,
            onValidChanged
        });
        const { validateValueOnExternalChange, validateValueOnInternalChange } = validationState;
        const { format, parse } = (0, useConverter_1.useConverter)({
            componentMessagingState,
            converter,
            validationState
        });
        const defaultValueState = (0, useValue_1.useValue)({
            value: valueProp,
            format,
            parse,
            onRawValueChanged,
            onTransientValueChanged,
            onValueChanged
        });
        const valueState = wrapValueState ? wrapValueState(defaultValueState) : defaultValueState;
        const { displayValue, value, getValueForValidation, setValueAfterValidation, refreshDisplayValue, setDisplayValue, setTransientValue, setValue } = valueState;
        const { runFullValidationAndUpdateValue } = (0, useValidationLifecycle_1.useValidationLifecycle)({
            componentMessagingState,
            validationState,
            deferredValidators,
            validators,
            getValueForValidation,
            setValueAfterValidation,
            readonly,
            disabled
        });
        (0, useConverterLifecycle_1.useConverterLifecycle)({
            converter,
            validationState,
            refreshDisplayValue,
            runFullValidationAndUpdateValue
        });
        (0, useValueLifecycle_1.useValueLifecycle)({
            value: valueProp,
            valueState,
            format,
            validateValueOnExternalChange
        });
        const normalizeAndParseValue = (0, hooks_1.useCallback)((value) => {
            return parse(shouldNormalizeValueOnCommit ? (0, utils_1.normalizeValue)(value) : value);
        }, [shouldNormalizeValueOnCommit, parse]);
        const onCommitValue = (0, hooks_1.useCallback)(async (value, doCommitOnValid = true) => {
            const validationResult = await validateValueOnInternalChange(value);
            if (validationResult === useValidators_1.ValidationResult.VALID && doCommitOnValid) {
                setValue(value);
            }
            return validationResult;
        }, [validateValueOnInternalChange]);
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            const parsedValueOrSymbol = normalizeAndParseValue(value);
            if (parsedValueOrSymbol === useConverter_1.ConverterErrorSymbol) {
                return;
            }
            const parsedValue = parsedValueOrSymbol;
            const validationResult = await onCommitValue(parsedValue);
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                setDisplayValue(format(parsedValue));
            }
        }, [format, onCommitValue, normalizeAndParseValue]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            setDisplayValue(value ?? '');
        }, []);
        const reset = (0, hooks_1.useCallback)(() => {
            clearAllMessages();
            validateValueOnExternalChange(value);
            refreshDisplayValue();
        }, [value, clearAllMessages, refreshDisplayValue, validateValueOnExternalChange]);
        const validate = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled) {
                return 'valid';
            }
            const { fullValidate } = validationState;
            const { displayValue, value, setValueAfterValidation } = valueState;
            const newValueOrSymbol = normalizeAndParseValue(displayValue);
            if (newValueOrSymbol === useConverter_1.ConverterErrorSymbol) {
                return 'invalid';
            }
            const newValue = newValueOrSymbol;
            const resolver = addBusyState?.('running component method validate');
            const validateResult = await fullValidate(newValue);
            resolver?.();
            if (validateResult) {
                if (newValue !== value) {
                    setValueAfterValidation(newValue);
                }
                return 'valid';
            }
            return 'invalid';
        }, [validationState, valueState, addBusyState, normalizeAndParseValue, readonly, disabled]);
        const showMessages = (0, hooks_1.useCallback)(() => {
            const { hasHiddenMessages, showHiddenMessages } = componentMessagingState;
            const { setValid } = validationState;
            if (hasHiddenMessages()) {
                showHiddenMessages();
                setValid('invalidShown');
            }
        }, [componentMessagingState, validationState]);
        return {
            value,
            setValue,
            displayValue,
            setDisplayValue,
            setTransientValue,
            methods: {
                reset,
                validate,
                showMessages
            },
            textFieldProps: {
                messages: displayOptions?.messages !== 'none' ? visibleMessages : undefined,
                value: displayValue,
                'aria-describedby': ariaDescribedBy,
                onCommit,
                onInput
            },
            onCommitValue,
            format,
            normalizeAndParseValue
        };
    }
    exports.useEditableValue = useEditableValue;
});

define('oj-c/input-date-text/useImplicitDateConverter',["require", "exports", "preact/hooks", "ojs/ojconverter-localdate"], function (require, exports, hooks_1, ojconverter_localdate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateConverter = void 0;
    function useImplicitDateConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_localdate_1.LocalDateConverter({ dateStyle: 'short' });
        }, [converter]);
        return implicitConverter;
    }
    exports.useImplicitDateConverter = useImplicitDateConverter;
});

define('oj-c/input-date-text/useImplicitDateRangeValidator',["require", "exports", "ojs/ojvalidator-localdaterange", "preact/hooks"], function (require, exports, ojvalidator_localdaterange_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRangeValidator = void 0;
    function useImplicitDateRangeValidator({ formatObj, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, max, min }) {
        const dateRangeValidator = (0, hooks_1.useMemo)(() => {
            if (min !== undefined || max !== undefined) {
                return new ojvalidator_localdaterange_1.LocalDateRangeValidator({
                    formatObj,
                    max,
                    min,
                    rangeOverflowMessageDetail: dateRangeOverflowMessageDetail,
                    rangeUnderflowMessageDetail: dateRangeUnderflowMessageDetail
                });
            }
            return null;
        }, [formatObj, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, min, max]);
        return dateRangeValidator;
    }
    exports.useImplicitDateRangeValidator = useImplicitDateRangeValidator;
});

define('oj-c/input-date-text/useInputDateTextPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/utils/utils", "./useImplicitDateConverter", "./useImplicitDateRangeValidator"], function (require, exports, useEditableValue_1, utils_1, useImplicitDateConverter_1, useImplicitDateRangeValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDateTextPreact = void 0;
    function useInputDateTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, utils_1.treatNull)(min);
        const maxTreatNull = (0, utils_1.treatNull)(max);
        const converter = (0, useImplicitDateConverter_1.useImplicitDateConverter)({
            converter: propConverter
        });
        const implicitComponentValidator = (0, useImplicitDateRangeValidator_1.useImplicitDateRangeValidator)({
            formatObj: converter,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            max: maxTreatNull,
            min: minTreatNull
        });
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            implicitComponentValidator,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
            value,
            setValue,
            methods,
            inputTextProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useInputDateTextPreact = useInputDateTextPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/input-date-text/input-date-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useInputDateTextPreact", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-date-text/input-date-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputText_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useInputDateTextPreact_1, UNSAFE_IntlDateTime_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateText = void 0;
    const FunctionalInputDateText = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, displayOptions, help, helpHints, validators } = props;
        const inputDateTextRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-date-text id=${props.id} is ${desc}`
            });
        }, []);
        const { inputTextProps, methods } = (0, useInputDateTextPreact_1.useInputDateTextPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputDateTextRef.current?.blur(),
            focus: () => inputDateTextRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputTextProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_InputText_1.InputText, { ref: inputDateTextRef, ...assistiveTextProps, ...inputTextProps, variant: variant }));
    });
    let InputDateText = class InputDateText extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputDateTextRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.value)) {
                throw new Error('value must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.min)) {
                throw new Error('min must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.max)) {
                throw new Error('max must be a date-only ISO string');
            }
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputDateText, { busyContextRef: this.busyContextRef, ref: this.inputDateTextRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputDateTextRef.current?.reset();
        }
        showMessages() {
            this.inputDateTextRef.current?.showMessages();
        }
        validate() {
            return this.inputDateTextRef.current?.validate();
        }
        blur() {
            this.inputDateTextRef.current?.blur();
        }
        focus() {
            this.inputDateTextRef.current?.focus();
        }
    };
    exports.InputDateText = InputDateText;
    InputDateText.defaultProps = {
        autocomplete: 'on',
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            converterHint: 'display',
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null
    };
    InputDateText._metadata = { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null", "properties": { "format": { "type": "function" }, "parse": { "type": "function" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputDateText._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputDateText._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputDateText = InputDateText = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-date-text')
    ], InputDateText);
});

define('oj-c/input-date-text',["require", "exports", "./input-date-text/input-date-text"], function (require, exports, input_date_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateText = void 0;
    Object.defineProperty(exports, "InputDateText", { enumerable: true, get: function () { return input_date_text_1.InputDateText; } });
});

define('oj-c/editable-value/UNSAFE_useValueRawValueObject/useValueRawValueObject',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueRawValueObject = void 0;
    function useValueRawValueObject({ value: valueProp, format, parse, onRawValueChanged, onTransientValueChanged, onValueChanged }) {
        const [displayValue, setDisplayValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(format(valueProp, true), onRawValueChanged);
        const [value, setValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onValueChanged);
        (0, hooks_1.useEffect)(() => {
            onRawValueChanged?.(displayValue);
        }, []);
        const [transientValue, setTransientValue] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(valueProp, onTransientValueChanged);
        (0, hooks_1.useEffect)(() => {
            if (valueProp !== undefined) {
                onTransientValueChanged?.(valueProp);
            }
        }, []);
        return {
            displayValue,
            transientValue,
            value,
            getValueForValidation: (0, hooks_1.useCallback)((valid) => {
                if (valid !== 'invalidShown') {
                    return value;
                }
                return parse(displayValue);
            }, [displayValue, parse, value]),
            setValueAfterValidation: (0, hooks_1.useCallback)((value) => {
                setValue(value);
                setDisplayValue(format(value));
            }, [format]),
            setDisplayValue,
            setTransientValue,
            setValue,
            refreshDisplayValue: (0, hooks_1.useCallback)(() => {
                setDisplayValue(format(value));
            }, [format, value])
        };
    }
    exports.useValueRawValueObject = useValueRawValueObject;
});

define('oj-c/editable-value/UNSAFE_useValueRawValueObjectLifecycle/useValueRawValueObjectLifecycle',["require", "exports", "preact/hooks", "../UNSAFE_useValidators/useValidators"], function (require, exports, hooks_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueRawValueObjectLifecycle = void 0;
    function useValueRawValueObjectLifecycle({ value, valueState, format, validateValueOnExternalChange }) {
        const previousValueRef = (0, hooks_1.useRef)(value);
        (0, hooks_1.useEffect)(() => {
            const { value, setDisplayValue } = valueState;
            setDisplayValue(format(value));
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (previousValueRef.current === value) {
                return;
            }
            previousValueRef.current = value;
            if (value !== undefined && value !== valueState.value) {
                const { setDisplayValue, setValue } = valueState;
                const validationResult = validateValueOnExternalChange(value);
                if (validationResult === useValidators_1.ValidationResult.VALID) {
                    setValue(value);
                    setDisplayValue(format(value));
                }
            }
        }, [format, value, valueState]);
    }
    exports.useValueRawValueObjectLifecycle = useValueRawValueObjectLifecycle;
});

define('oj-c/editable-value/UNSAFE_useConverterObject/useConverterObject',["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useConverterObject = exports.ConverterErrorSymbol = void 0;
    exports.ConverterErrorSymbol = Symbol('ConverterError');
    function useConverterObject({ componentMessagingState, validationState, converter }) {
        const parse = (0, hooks_1.useCallback)((displayValue) => {
            if (displayValue === undefined) {
                return null;
            }
            try {
                return converter.parse(displayValue);
            }
            catch (error) {
                const errorMsg = (0, utils_1.createMessageFromError)(error);
                componentMessagingState.setComponentMessages([errorMsg]);
                validationState.setValid('invalidShown');
                return exports.ConverterErrorSymbol;
            }
        }, [converter, componentMessagingState, validationState]);
        const format = (0, hooks_1.useCallback)((value, shouldSuppressError = false) => {
            if (value === null) {
                return undefined;
            }
            try {
                return converter.format(value);
            }
            catch (error) {
                if (!shouldSuppressError) {
                    componentMessagingState.setComponentMessages([(0, utils_1.createMessageFromError)(error)]);
                    validationState.setValid('invalidShown');
                }
                return value;
            }
        }, [componentMessagingState, converter, validationState]);
        return (0, hooks_1.useMemo)(() => ({
            format,
            parse
        }), [format, parse]);
    }
    exports.useConverterObject = useConverterObject;
});

define('oj-c/editable-value/UNSAFE_useEditableValueRawValueObject/useEditableValueRawValueObject',["require", "exports", "preact/hooks", "../UNSAFE_useComponentMessaging/useComponentMessaging", "../UNSAFE_useDeferredValidators/useDeferredValidators", "../UNSAFE_useValidationLifecycle/useValidationLifecycle", "../UNSAFE_useValidators/useValidators", "../UNSAFE_useValueRawValueObject/useValueRawValueObject", "../UNSAFE_useValueRawValueObjectLifecycle/useValueRawValueObjectLifecycle", "../UNSAFE_useConverterObject/useConverterObject"], function (require, exports, hooks_1, useComponentMessaging_1, useDeferredValidators_1, useValidationLifecycle_1, useValidators_1, useValueRawValueObject_1, useValueRawValueObjectLifecycle_1, useConverterObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValueRawValueObject = void 0;
    function useEditableValueRawValueObject({ ariaDescribedBy, converter, disabled, displayOptions, implicitComponentValidator, labelHint, messagesCustom, readonly, required, requiredMessageDetail, validators, value: valueProp, addBusyState, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, onTransientValueChanged, wrapValueState }) {
        const componentMessagingState = (0, useComponentMessaging_1.useComponentMessaging)({
            messagesCustom,
            onMessagesCustomChanged
        });
        const { clearAllMessages, visibleMessages } = componentMessagingState;
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const combinedValidators = !implicitComponentValidator
            ? validators
            : validators
                ? [implicitComponentValidator, ...validators]
                : [implicitComponentValidator];
        const validationState = (0, useValidators_1.useValidators)({
            componentMessagingState,
            defaultValidState: 'valid',
            deferredValidators,
            validators: combinedValidators,
            addBusyState,
            onValidChanged
        });
        const { validateValueOnExternalChange, validateValueOnInternalChange } = validationState;
        const { format, parse } = (0, useConverterObject_1.useConverterObject)({
            componentMessagingState,
            converter,
            validationState
        });
        const defaultValueState = (0, useValueRawValueObject_1.useValueRawValueObject)({
            value: valueProp,
            format,
            parse,
            onRawValueChanged,
            onTransientValueChanged,
            onValueChanged
        });
        const valueState = wrapValueState ? wrapValueState(defaultValueState) : defaultValueState;
        const { displayValue, value, getValueForValidation, setValueAfterValidation, refreshDisplayValue, setDisplayValue, setTransientValue, setValue } = valueState;
        (0, useValidationLifecycle_1.useValidationLifecycle)({
            componentMessagingState,
            validationState,
            deferredValidators,
            validators,
            getValueForValidation,
            setValueAfterValidation,
            readonly,
            disabled
        });
        (0, useValueRawValueObjectLifecycle_1.useValueRawValueObjectLifecycle)({
            value: valueProp,
            format,
            parse,
            valueState,
            validateValueOnExternalChange
        });
        const onCommitValue = (0, hooks_1.useCallback)(async (value, doCommitOnValid = true) => {
            const validationResult = await validateValueOnInternalChange(value);
            if (validationResult === useValidators_1.ValidationResult.VALID && doCommitOnValid) {
                setValue(value);
            }
            return validationResult;
        }, [validateValueOnInternalChange]);
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            if (value === '' || value === null) {
                throw new Error('cannot commit an empty string or null');
            }
            const parsedValueOrSymbol = parse(value);
            if (parsedValueOrSymbol === useConverterObject_1.ConverterErrorSymbol) {
                return;
            }
            const parsedValue = parsedValueOrSymbol;
            const validationResult = await onCommitValue(parsedValue);
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                const formatted = format(parsedValue);
                setDisplayValue(formatted);
            }
        }, [onCommitValue, format, parse]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            if (value === '' || value === null) {
                throw new Error('cannot get an empty string or null in onInput');
            }
            setDisplayValue(value);
        }, []);
        const reset = (0, hooks_1.useCallback)(() => {
            clearAllMessages();
            validateValueOnExternalChange(value);
            refreshDisplayValue();
        }, [value, clearAllMessages, refreshDisplayValue, validateValueOnExternalChange]);
        const validate = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled) {
                return 'valid';
            }
            const { fullValidate } = validationState;
            const { displayValue, value, setValueAfterValidation } = valueState;
            const newValueOrSymbol = parse(displayValue);
            if (newValueOrSymbol === useConverterObject_1.ConverterErrorSymbol) {
                return 'invalid';
            }
            const newValue = newValueOrSymbol;
            const resolver = addBusyState?.('running component method validate');
            const validateResult = await fullValidate(newValue);
            resolver?.();
            if (validateResult) {
                if (newValue !== value) {
                    setValueAfterValidation(newValue);
                }
                return 'valid';
            }
            return 'invalid';
        }, [parse, validationState, valueState, addBusyState, readonly, disabled]);
        const showMessages = (0, hooks_1.useCallback)(() => {
            const { hasHiddenMessages, showHiddenMessages } = componentMessagingState;
            const { setValid } = validationState;
            if (hasHiddenMessages()) {
                showHiddenMessages();
                setValid('invalidShown');
            }
        }, [componentMessagingState, validationState]);
        return {
            value,
            setValue,
            displayValue,
            setDisplayValue,
            setTransientValue,
            methods: {
                reset,
                validate,
                showMessages
            },
            textFieldProps: {
                messages: displayOptions?.messages !== 'none' ? visibleMessages : undefined,
                value: displayValue,
                'aria-describedby': ariaDescribedBy,
                onCommit,
                onInput
            },
            onCommitValue
        };
    }
    exports.useEditableValueRawValueObject = useEditableValueRawValueObject;
});

define('oj-c/input-date-mask/CalendarDateConverter',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "ojs/ojconfig"], function (require, exports, UNSAFE_calendarDateUtils_1, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarDateConverter = void 0;
    class CalendarDateConverter {
        constructor(options) {
            this.locale = options?.locale ?? (0, ojconfig_1.getLocale)();
            this.calendarDateConverter_parseErrorFn = options?.calendarDateConverter_parseErrorFn;
            this.customMask = options?.customMask;
        }
        format(value) {
            const calendarDate = (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(value);
            if (!calendarDate) {
                throw new Error('value must be a date-only ISO string');
            }
            return calendarDate;
        }
        parse(input) {
            if (input !== undefined && !(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarDate)(input)) {
                const now = new Date();
                const currentYear = now.getFullYear();
                const formattedDateExample = (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)(this.locale, `${currentYear}-11-29`, this.customMask);
                const errorStr = this.calendarDateConverter_parseErrorFn &&
                    this.calendarDateConverter_parseErrorFn({
                        dateExample: formattedDateExample
                    });
                throw new Error(errorStr ?? 'parse failed');
            }
            const completeDate = input;
            return (0, UNSAFE_calendarDateUtils_1.getIsoDateStr)(completeDate.year, completeDate.month, completeDate.day);
        }
    }
    exports.CalendarDateConverter = CalendarDateConverter;
});

define('oj-c/input-date-mask/useInputDateMaskPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValueRawValueObject/useEditableValueRawValueObject", "./CalendarDateConverter", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "ojs/ojconverter-preferences", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "oj-c/input-date-text/useImplicitDateRangeValidator", "ojs/ojconfig", "oj-c/editable-value/utils/utils"], function (require, exports, useEditableValueRawValueObject_1, CalendarDateConverter_1, hooks_1, UNSAFE_useTranslationBundle_1, ojconverter_preferences_1, UNSAFE_calendarDateUtils_1, useImplicitDateRangeValidator_1, ojconfig_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDateMaskPreact = void 0;
    function useInputDateMaskPreact({ dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, utils_1.treatNull)(min);
        const maxTreatNull = (0, utils_1.treatNull)(max);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const calendarDateConverter_parseErrorFn = translations.calendarDateConverter_parseError;
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return getMasksFromDatePatternPreferences();
        }, []);
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return new CalendarDateConverter_1.CalendarDateConverter({
                calendarDateConverter_parseErrorFn,
                customMask: masksFromUserPref
            });
        }, [calendarDateConverter_parseErrorFn, masksFromUserPref]);
        const exampleFormatter = (0, hooks_1.useMemo)(() => {
            return {
                format: (value) => {
                    return (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)((0, ojconfig_1.getLocale)(), value, masksFromUserPref);
                }
            };
        }, [masksFromUserPref]);
        const implicitComponentValidator = (0, useImplicitDateRangeValidator_1.useImplicitDateRangeValidator)({
            formatObj: exampleFormatter,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            max: maxTreatNull,
            min: minTreatNull
        });
        const { methods, textFieldProps, value, setValue } = (0, useEditableValueRawValueObject_1.useEditableValueRawValueObject)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: implicitConverter,
            disabled,
            displayOptions,
            implicitComponentValidator,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === undefined || !isPartialDate(textFieldProps.value);
        return {
            value,
            setValue,
            methods,
            inputDateMaskProps: {
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                masks: masksFromUserPref,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useInputDateMaskPreact = useInputDateMaskPreact;
    const isPartialDate = (value) => {
        if (value === undefined)
            return false;
        return value.year !== undefined || value.month !== undefined || value.day !== undefined;
    };
    const getMasksFromDatePatternPreferences = () => {
        const prefs = (0, ojconverter_preferences_1.getDateTimePreferences)();
        const pattern = prefs.dateStyle?.short?.pattern;
        if (!pattern || pattern.toUpperCase().includes('MMM')) {
            return undefined;
        }
        return (0, UNSAFE_calendarDateUtils_1.getDatePlaceholdersFromPattern)(pattern);
    };
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/input-date-mask/input-date-mask',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useInputDateMaskPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "css!oj-c/input-date-mask/input-date-mask-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputDateMask_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useInputDateMaskPreact_1, Layout_1, UNSAFE_IntlDateTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
    const FunctionalInputDateMask = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints, validators } = props;
        const inputDateMaskRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-date-mask id=${props.id} is ${desc}`
            });
        }, []);
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputDateMaskRef.current?.blur(),
            focus: () => inputDateMaskRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_InputDateMask_1.InputDateMask, { ref: inputDateMaskRef, ...assistiveTextProps, ...inputDateMaskProps, variant: variant }));
    });
    let InputDateMask = class InputDateMask extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputDateMaskRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.value)) {
                throw new Error('value must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.min)) {
                throw new Error('min must be a date-only ISO string');
            }
            if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.max)) {
                throw new Error('max must be a date-only ISO string');
            }
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputDateMask, { busyContextRef: this.busyContextRef, ref: this.inputDateMaskRef, ...props }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputDateMaskRef.current?.reset();
        }
        showMessages() {
            this.inputDateMaskRef.current?.showMessages();
        }
        validate() {
            return this.inputDateMaskRef.current?.validate();
        }
        blur() {
            this.inputDateMaskRef.current?.blur();
        }
        focus() {
            this.inputDateMaskRef.current?.focus();
        }
    };
    exports.InputDateMask = InputDateMask;
    InputDateMask.defaultProps = {
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null
    };
    InputDateMask._metadata = { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputDateMask._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputDateMask._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputDateMask = InputDateMask = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-date-mask')
    ], InputDateMask);
});

define('oj-c/input-date-mask',["require", "exports", "./input-date-mask/input-date-mask"], function (require, exports, input_date_mask_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
    Object.defineProperty(exports, "InputDateMask", { enumerable: true, get: function () { return input_date_mask_1.InputDateMask; } });
});

define('oj-c/input-number/useImplicitNumberConverter',["require", "exports", "ojs/ojconverter-nativenumber", "preact/hooks"], function (require, exports, ojconverter_nativenumber_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitNumberConverter = void 0;
    function useImplicitNumberConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_nativenumber_1.NumberConverter();
        }, [converter]);
        return implicitConverter;
    }
    exports.useImplicitNumberConverter = useImplicitNumberConverter;
});

define('oj-c/input-number/useImplicitNumberRangeValidator',["require", "exports", "preact/hooks", "ojs/ojvalidator-numberrange"], function (require, exports, hooks_1, NumberRangeValidator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitNumberRangeValidator = void 0;
    function useImplicitNumberRangeValidator({ converter, max, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail }) {
        const numberRangeValidator = (0, hooks_1.useMemo)(() => {
            if (min !== undefined || max !== undefined) {
                return new NumberRangeValidator({
                    converter,
                    max,
                    min,
                    messageDetail: {
                        exact: numberRangeExactMessageDetail,
                        rangeOverflow: numberRangeOverflowMessageDetail,
                        rangeUnderflow: numberRangeUnderflowMessageDetail
                    }
                });
            }
            return null;
        }, [converter, min, max]);
        return numberRangeValidator;
    }
    exports.useImplicitNumberRangeValidator = useImplicitNumberRangeValidator;
});

define('oj-c/input-number/stepBasisUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.determineSteppedValue = void 0;
    function determineSteppedValue(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt) {
        const precision = _precision(stepOpt, initialValue, minOpt);
        if (precision > 0) {
            const power = Math.pow(10, precision);
            const minOptPower = minOpt !== undefined ? Math.round(minOpt * power) : minOpt;
            const maxOptPower = maxOpt != null ? Math.round(maxOpt * power) : maxOpt;
            const stepOptPower = Math.round(stepOpt * power);
            const adjustValuePower = _adjustValueForZeroPrecision(Math.round(step * power), stepOptPower, Math.round(currentParsedValue * power), initialValue !== undefined && initialValue !== null
                ? Math.round(initialValue * power)
                : initialValue, maxOptPower, minOptPower);
            return adjustValuePower / power;
        }
        return _adjustValueForZeroPrecision(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt);
    }
    exports.determineSteppedValue = determineSteppedValue;
    function _adjustValueForZeroPrecision(step, stepOpt, currentParsedValue, initialValue, maxOpt, minOpt) {
        let stepBase = minOpt != null ? minOpt : initialValue;
        if (stepBase === null || stepBase === undefined) {
            stepBase = 0;
        }
        try {
            currentParsedValue = parseFloat(currentParsedValue.toFixed(0));
        }
        catch (e) {
            if (e instanceof TypeError) {
                currentParsedValue = +currentParsedValue;
            }
        }
        let aboveMin = currentParsedValue - stepBase;
        let rounded = Math.round(aboveMin / stepOpt) * stepOpt;
        rounded = parseFloat(rounded.toFixed(0));
        const multiple = rounded === aboveMin;
        let newValue;
        if (!multiple) {
            if (step < 0) {
                aboveMin = Math.ceil(aboveMin / stepOpt) * stepOpt;
            }
            else {
                aboveMin = Math.floor(aboveMin / stepOpt) * stepOpt;
            }
            newValue = stepBase + aboveMin + step;
        }
        else {
            newValue = currentParsedValue + step;
        }
        newValue = parseFloat(newValue.toFixed(0));
        if (minOpt != null && newValue < minOpt) {
            return minOpt;
        }
        if (maxOpt != null && newValue > maxOpt) {
            let validMax = Math.floor((maxOpt - stepBase) / stepOpt) * stepOpt + stepBase;
            validMax = parseFloat(validMax.toFixed(0));
            return validMax;
        }
        return newValue;
    }
    function _precision(stepOpt, initialValue, minOpt) {
        let precision = _precisionOf(stepOpt);
        if (minOpt != null) {
            precision = Math.max(precision, _precisionOf(minOpt));
        }
        if (initialValue != null) {
            precision = Math.max(precision, _precisionOf(initialValue));
        }
        return precision;
    }
    function _precisionOf(num) {
        const str = num.toString();
        const decimal = str.indexOf('.');
        return decimal === -1 ? 0 : str.length - decimal - 1;
    }
});

define('oj-c/input-number/useNumberInputTextPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "./useImplicitNumberConverter", "./useImplicitNumberRangeValidator", "preact/hooks", "oj-c/editable-value/utils/utils", "./stepBasisUtils"], function (require, exports, useEditableValue_1, useValidators_1, useImplicitNumberConverter_1, useImplicitNumberRangeValidator_1, hooks_1, utils_1, stepBasisUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNumberInputTextPreact = void 0;
    function useNumberInputTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, disabled, displayOptions, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail, placeholder, readonly, required, requiredMessageDetail, step, stepperVariant, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, utils_1.treatNull)(min);
        const maxTreatNull = (0, utils_1.treatNull)(max);
        const converter = (0, useImplicitNumberConverter_1.useImplicitNumberConverter)({
            converter: propConverter
        });
        const implicitComponentValidator = (0, useImplicitNumberRangeValidator_1.useImplicitNumberRangeValidator)({
            converter,
            max: maxTreatNull,
            min: minTreatNull,
            numberRangeExactMessageDetail,
            numberRangeOverflowMessageDetail,
            numberRangeUnderflowMessageDetail
        });
        const { onCommitValue, format, normalizeAndParseValue, methods, textFieldProps, value, setValue, displayValue, setDisplayValue, setTransientValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            implicitComponentValidator,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasMin = minTreatNull !== undefined;
        const hasMax = maxTreatNull !== undefined;
        const isValidating = (0, hooks_1.useRef)(false);
        const stepQueue = (0, hooks_1.useRef)(new Array());
        const currentDisplayValueInStep = (0, hooks_1.useRef)(displayValue);
        const initialValue = (0, hooks_1.useRef)((0, utils_1.treatNull)(propValue));
        if (propValue !== value) {
            initialValue.current = (0, utils_1.treatNull)(propValue);
        }
        const [valueNow, setValueNow] = (0, hooks_1.useState)((0, utils_1.treatNull)(value));
        const [prevValue, setPrevValue] = (0, hooks_1.useState)(value);
        if (value !== prevValue) {
            setPrevValue(value);
            setValueNow((0, utils_1.treatNull)(value));
            setTransientValue(value);
        }
        const [hasUncommittedDisplayValue, setHasUncommittedDisplayValue] = (0, hooks_1.useState)(false);
        currentDisplayValueInStep.current = displayValue;
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            setHasUncommittedDisplayValue(false);
            const parsedValueOrSymbol = normalizeAndParseValue(value);
            const parsedValue = parsedValueOrSymbol;
            if (typeof parsedValueOrSymbol === 'symbol') {
                setValueNow(undefined);
                return;
            }
            const validationResult = await onCommitValue(parsedValue);
            if (validationResult === useValidators_1.ValidationResult.VALID) {
                const formattedValue = format(parsedValue);
                setDisplayValue(formattedValue);
            }
            else {
                setValueNow(parsedValue);
            }
        }, [format, normalizeAndParseValue, onCommitValue]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            setDisplayValue(value ?? '');
            setHasUncommittedDisplayValue(true);
        }, []);
        const textFieldPropsWithOverride = { ...textFieldProps, onCommit, onInput };
        const doStep = (0, hooks_1.useCallback)(async (direction, doCommit) => {
            if (step === undefined || isValidating.current) {
                return;
            }
            const displayValueToStep = currentDisplayValueInStep.current || '0';
            const parsedValueOrSymbol = normalizeAndParseValue(displayValueToStep);
            if (typeof parsedValueOrSymbol === 'symbol') {
                return;
            }
            const parsedValue = parsedValueOrSymbol;
            let newSteppedValue;
            if (direction !== undefined) {
                const stepValue = direction === 'increase' ? step : -1 * step;
                newSteppedValue = (0, stepBasisUtils_1.determineSteppedValue)(stepValue, step, parsedValue, initialValue.current, maxTreatNull, minTreatNull);
            }
            else {
                newSteppedValue = parsedValue;
            }
            isValidating.current = true;
            const formattedValue = format(newSteppedValue);
            setDisplayValue(formattedValue);
            currentDisplayValueInStep.current = formattedValue;
            const validationResult = await onCommitValue(newSteppedValue, doCommit);
            const isSpinning = doCommit === false;
            const valueCommitted = doCommit && validationResult === useValidators_1.ValidationResult.VALID;
            if (isSpinning && validationResult === useValidators_1.ValidationResult.VALID) {
                setTransientValue(newSteppedValue);
            }
            if (!valueCommitted) {
                setValueNow(newSteppedValue);
            }
            isValidating.current = false;
        }, [value, displayValue, format, normalizeAndParseValue, onCommitValue]);
        const processStepQueue = (0, hooks_1.useCallback)(async (direction) => {
            await doStep(direction, true);
            if (stepQueue.current.length > 0) {
                const direction = stepQueue.current.shift();
                processStepQueue(direction);
            }
        }, [doStep]);
        const handleStep = (0, hooks_1.useCallback)(async ({ direction }) => {
            if (isValidating.current) {
                stepQueue.current.push(direction);
            }
            else {
                processStepQueue(direction);
            }
        }, [processStepQueue]);
        const handleSpin = (0, hooks_1.useCallback)(async ({ direction }) => {
            const doCommit = false;
            stepQueue.current = [];
            doStep(direction, doCommit);
        }, [doStep]);
        const handleSpinComplete = (0, hooks_1.useCallback)(async () => {
            const parsedValueOrSymbol = normalizeAndParseValue(currentDisplayValueInStep.current);
            const parsedValue = parsedValueOrSymbol;
            if (typeof parsedValueOrSymbol === 'symbol') {
                return;
            }
            await onCommitValue(parsedValue);
        }, [onCommitValue, normalizeAndParseValue]);
        const valueText = calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, format);
        return {
            value,
            setValue,
            methods,
            inputNumberProps: {
                'aria-valuemax': maxTreatNull,
                'aria-valuemin': minTreatNull,
                'aria-valuenow': valueNow ?? undefined,
                'aria-valuetext': valueText,
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasSteppers: step !== undefined && step > 0,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || (0, utils_1.treatNull)(value) === undefined),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                stepperVariant,
                onSpin: step ? handleSpin : undefined,
                onSpinComplete: step ? handleSpinComplete : undefined,
                onStep: step ? handleStep : undefined,
                placeholder,
                prefix: inputPrefix,
                suffix: inputSuffix,
                isStepDownDisabled: disabled ||
                    (hasMin &&
                        ((valueNow !== undefined && valueNow <= minTreatNull) ||
                            (displayValue === '' && minTreatNull === 0))),
                isStepUpDisabled: disabled ||
                    (hasMax &&
                        ((valueNow !== undefined && valueNow >= maxTreatNull) ||
                            (displayValue === '' && maxTreatNull === 0))),
                textAlign,
                userAssistanceDensity,
                virtualKeyboard,
                ...textFieldPropsWithOverride
            }
        };
    }
    exports.useNumberInputTextPreact = useNumberInputTextPreact;
    function calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, format) {
        if (!hasUncommittedDisplayValue) {
            return displayValue !== '' ? displayValue : undefined;
        }
        let valueText;
        if (valueNow) {
            valueText = format(valueNow);
        }
        return valueText === '' || valueText === null ? undefined : valueText;
    }
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/input-number/input-number',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_NumberInputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useNumberInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-number/input-number-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_NumberInputText_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useNumberInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    const FunctionalInputNumber = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, displayOptions, help, helpHints, validators } = props;
        const inputNumberRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-number id=${props.id} is ${desc}`
            });
        }, []);
        const { inputNumberProps, methods } = (0, useNumberInputTextPreact_1.useNumberInputTextPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputNumberRef.current?.blur(),
            focus: () => inputNumberRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputNumberProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_NumberInputText_1.NumberInputText, { ref: inputNumberRef, ...assistiveTextProps, ...inputNumberProps, variant: variant }));
    });
    let InputNumber = class InputNumber extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputNumberRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            if (props.step !== undefined && props.step < 0) {
                throw new Error('step must be a positive number');
            }
            if (props.min != null && props.max != null && props.max < props.min) {
                throw new Error('max cannot be less than min');
            }
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputNumber, { busyContextRef: this.busyContextRef, ref: this.inputNumberRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputNumberRef.current?.reset();
        }
        showMessages() {
            this.inputNumberRef.current?.showMessages();
        }
        validate() {
            return this.inputNumberRef.current?.validate();
        }
        blur() {
            this.inputNumberRef.current?.blur();
        }
        focus() {
            this.inputNumberRef.current?.focus();
        }
    };
    exports.InputNumber = InputNumber;
    InputNumber.defaultProps = {
        autocomplete: 'on',
        columnSpan: 1,
        converter: null,
        disabled: false,
        displayOptions: {
            converterHint: 'display',
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null,
        virtualKeyboard: 'auto',
        stepperVariant: 'directional'
    };
    InputNumber._metadata = { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "number|null" }, "min": { "type": "number|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "numberRangeExactMessageDetail": { "type": "string" }, "numberRangeOverflowMessageDetail": { "type": "string" }, "numberRangeUnderflowMessageDetail": { "type": "string" }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "step": { "type": "number" }, "stepperVariant": { "type": "string", "enumValues": ["directional", "quantitative"] }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "number|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "auto", "text"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "transientValue": { "type": "number", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "transientValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "transientValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputNumber._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputNumber._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputNumber = InputNumber = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-number')
    ], InputNumber);
});

define('oj-c/input-number',["require", "exports", "./input-number/input-number"], function (require, exports, input_number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    Object.defineProperty(exports, "InputNumber", { enumerable: true, get: function () { return input_number_1.InputNumber; } });
});

define('oj-c/input-password/useInputPasswordPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputPasswordPreact = void 0;
    function useInputPasswordPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', disabled, displayOptions, labelEdge, labelHint, labelStartWidth, maskIcon, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        const hasRevealToggle = maskIcon === 'hidden' ? 'never' : 'always';
        return {
            value,
            setValue,
            methods,
            inputPasswordProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasClearIcon: hasClearIcon,
                hasRevealToggle,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge: labelEdge,
                labelStartWidth,
                placeholder,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useInputPasswordPreact = useInputPasswordPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/input-password/input-password',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputPassword", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useInputPasswordPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-password/input-password-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputPassword_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useInputPasswordPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputPassword = void 0;
    const FunctionalInputPassword = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints, validators } = props;
        const inputPasswordRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-password id=${props.id} is ${desc}`
            });
        }, [props.id, busyContextRef]);
        const { inputPasswordProps, methods } = (0, useInputPasswordPreact_1.useInputPasswordPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputPasswordRef.current?.blur(),
            focus: () => inputPasswordRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputPasswordProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_InputPassword_1.InputPassword, { ref: inputPasswordRef, ...assistiveTextProps, ...inputPasswordProps, variant: variant }));
    });
    let InputPassword = class InputPassword extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputPasswordRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputPassword, { busyContextRef: this.busyContextRef, ref: this.inputPasswordRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputPasswordRef.current?.reset();
        }
        showMessages() {
            this.inputPasswordRef.current?.showMessages();
        }
        validate() {
            return this.inputPasswordRef.current?.validate();
        }
        blur() {
            this.inputPasswordRef.current?.blur();
        }
        focus() {
            this.inputPasswordRef.current?.focus();
        }
    };
    exports.InputPassword = InputPassword;
    InputPassword.defaultProps = {
        autocomplete: 'on',
        clearIcon: 'never',
        columnSpan: 1,
        maskIcon: 'visible',
        disabled: false,
        displayOptions: {
            converterHint: 'display',
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null
    };
    InputPassword._metadata = { "properties": { "autocomplete": { "type": "string" }, "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "maskIcon": { "type": "string", "enumValues": ["hidden", "visible"] }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputPassword._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputPassword._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputPassword = InputPassword = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-password')
    ], InputPassword);
});

define('oj-c/input-password',["require", "exports", "./input-password/input-password"], function (require, exports, input_password_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputPassword = void 0;
    Object.defineProperty(exports, "InputPassword", { enumerable: true, get: function () { return input_password_1.InputPassword; } });
});

define('oj-c/input-text/useInputTextPreact',["require", "exports", "oj-c/editable-value/utils/utils", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, utils_1, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputTextPreact = void 0;
    function useInputTextPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', converter, disabled, displayOptions, end, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, start, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        return {
            value,
            setValue,
            methods,
            inputTextProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                hasClearIcon,
                endContent: end,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: (0, utils_1.treatNull)(length?.max),
                maxLengthUnit: length?.countBy,
                placeholder,
                prefix: inputPrefix,
                startContent: start,
                suffix: inputSuffix,
                textAlign,
                userAssistanceDensity,
                virtualKeyboard,
                ...textFieldProps
            }
        };
    }
    exports.useInputTextPreact = useInputTextPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/input-text/input-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-text/input-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputText_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputText = void 0;
    const FunctionalInputText = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, displayOptions, help, helpHints, validators } = props;
        const inputTextRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-input-text id=${props.id} is ${desc}`
            });
        }, [busyContextRef, props.id]);
        const { inputTextProps, methods } = (0, useInputTextPreact_1.useInputTextPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputTextRef.current?.blur(),
            focus: () => {
                inputTextRef.current?.focus();
            },
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputTextProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_InputText_1.InputText, { ref: inputTextRef, ...assistiveTextProps, ...inputTextProps, variant: variant }));
    });
    let InputText = class InputText extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.inputTextRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalInputText, { busyContextRef: this.busyContextRef, ref: this.inputTextRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.inputTextRef.current?.reset();
        }
        showMessages() {
            this.inputTextRef.current?.showMessages();
        }
        validate() {
            return this.inputTextRef.current?.validate();
        }
        blur() {
            this.inputTextRef.current?.blur();
        }
        focus() {
            this.inputTextRef.current?.focus();
        }
    };
    exports.InputText = InputText;
    InputText.defaultProps = {
        autocomplete: 'on',
        clearIcon: 'never',
        columnSpan: 1,
        converter: null,
        disabled: false,
        displayOptions: {
            converterHint: 'display',
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        length: {
            countBy: 'codePoint',
            max: null
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null,
        virtualKeyboard: 'auto'
    };
    InputText._metadata = { "properties": { "autocomplete": { "type": "string" }, "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "max": { "type": "number|null" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "end": {}, "start": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    InputText._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    InputText._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.InputText = InputText = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-input-text')
    ], InputText);
});

define('oj-c/input-text',["require", "exports", "./input-text/input-text"], function (require, exports, input_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputText = void 0;
    Object.defineProperty(exports, "InputText", { enumerable: true, get: function () { return input_text_1.InputText; } });
});


define('oj-c/message-toast/message-toast',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MessageToast", "@oracle/oraclejet-preact/hooks/UNSAFE_useMessagesContext", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcontext", "css!oj-c/message-toast/message-toast-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MessageToast_1, UNSAFE_useMessagesContext_1, useDataProvider_1, ojvcomponent_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageToast = void 0;
    function MessageToastImpl({ data, detailTemplateValue, iconTemplateValue, messageTemplates, offset = 0, position = 'bottom', onOjClose }) {
        const uniqueId = (0, hooks_1.useRef)((0, ojvcomponent_1.getUniqueId)());
        const rootRef = (0, hooks_1.useRef)();
        const [prevData, setPrevData] = (0, hooks_1.useState)(data);
        const [dpKey, setDpKey] = (0, hooks_1.useState)(0);
        const addBusyState = (0, hooks_1.useCallback)((description = 'MessageToast: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        if (data != prevData) {
            setPrevData(data);
            setDpKey((dpKey) => dpKey + 1);
        }
        const { data: dataArr } = (0, useDataProvider_1.useDataProvider)({
            data,
            addBusyState
        });
        const UNSAFE_messagesLayerId = `messageToastLayer_${uniqueId.current}`;
        const messagesContext = (0, hooks_1.useMemo)(() => ({ addBusyState, UNSAFE_messagesLayerId }), [addBusyState, UNSAFE_messagesLayerId]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, "data-oj-messages-layer-id": UNSAFE_messagesLayerId, children: (0, jsx_runtime_1.jsx)(UNSAFE_useMessagesContext_1.MessagesContext.Provider, { value: messagesContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MessageToast_1.MessageToast, { data: dataArr, detailRendererKey: detailTemplateValue, iconRendererKey: iconTemplateValue, offset: offset, onClose: onOjClose, position: position, renderers: messageTemplates }, dpKey) }) }));
    }
    exports.MessageToast = (0, ojvcomponent_1.registerCustomElement)('oj-c-message-toast', MessageToastImpl, "MessageToast", { "properties": { "data": { "type": "DataProvider" }, "detailTemplateValue": { "type": "string|function" }, "iconTemplateValue": { "type": "string|function" }, "offset": { "type": "number|object" }, "position": { "type": "string", "enumValues": ["top", "bottom", "top-start", "top-end", "bottom-end", "bottom-start", "top-left", "top-right", "bottom-left", "bottom-right"] } }, "extension": { "_DYNAMIC_SLOT": { "prop": "messageTemplates", "isTemplate": 1 } }, "events": { "ojClose": {} } }, { "offset": 0, "position": "bottom" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/message-toast',["require", "exports", "./message-toast/message-toast"], function (require, exports, message_toast_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageToast = void 0;
    Object.defineProperty(exports, "MessageToast", { enumerable: true, get: function () { return message_toast_1.MessageToast; } });
});

define('oj-c/text-area/useTextAreaAutosizePreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTextAreaAutosizePreact = void 0;
    function useTextAreaAutosizePreact({ autocomplete = 'on', autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maxRows, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
            value,
            setValue,
            methods,
            textAreaProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: length?.max ? length.max : undefined,
                maxLengthCounter: length?.counter,
                maxLengthUnit: length?.countBy,
                maxRows: maxRows === -1 ? undefined : maxRows,
                minRows: rows,
                placeholder,
                resize: resizeBehavior,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useTextAreaAutosizePreact = useTextAreaAutosizePreact;
});

define('oj-c/text-area/useTextAreaPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTextAreaPreact = void 0;
    function useTextAreaPreact({ autocomplete = 'on', autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValueChanged, onValidChanged, ...otherProps }, addBusyState) {
        const { methods, textFieldProps, value, setValue } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            validators,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
            value,
            setValue,
            methods,
            textAreaProps: {
                autoComplete: autocomplete,
                autoFocus: autofocus,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: length?.max ? length.max : undefined,
                maxLengthUnit: length?.countBy,
                maxLengthCounter: length?.counter,
                resize: resizeBehavior != 'none' ? resizeBehavior : undefined,
                rows,
                placeholder,
                textAlign,
                userAssistanceDensity,
                ...textFieldProps
            }
        };
    }
    exports.useTextAreaPreact = useTextAreaPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/text-area/text-area',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_TextArea", "@oracle/oraclejet-preact/UNSAFE_TextAreaAutosize", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useTextAreaAutosizePreact", "./useTextAreaPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/text-area/text-area-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_TextArea_1, UNSAFE_TextAreaAutosize_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useTextAreaAutosizePreact_1, useTextAreaPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextArea = void 0;
    const FunctionalTextArea = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, displayOptions, help, helpHints, validators } = props;
        const textAreaRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-text-area id=${props.id} is ${desc}`
            });
        }, []);
        const { textAreaProps, methods } = (0, useTextAreaPreact_1.useTextAreaPreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => textAreaRef.current?.blur(),
            focus: () => textAreaRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: textAreaProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_TextArea_1.TextArea, { ref: textAreaRef, ...assistiveTextProps, ...textAreaProps, variant: variant }));
    });
    const FunctionalTextAreaAutosize = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, converter, help, helpHints, validators } = props;
        const textAreaAutosizeRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-text-area id=${props.id} is ${desc}`
            });
        }, []);
        const { textAreaProps, methods } = (0, useTextAreaAutosizePreact_1.useTextAreaAutosizePreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => textAreaAutosizeRef.current?.blur(),
            focus: () => textAreaAutosizeRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            converter,
            help,
            helpHints,
            userAssistanceDensity: textAreaProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_TextAreaAutosize_1.TextAreaAutosize, { ref: textAreaAutosizeRef, ...assistiveTextProps, ...textAreaProps, variant: variant }));
    });
    let TextArea = class TextArea extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.textAreaRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const FunctionalComp = props.maxRows ? FunctionalTextAreaAutosize : FunctionalTextArea;
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalComp, { busyContextRef: this.busyContextRef, ref: this.textAreaRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.textAreaRef.current?.reset();
        }
        showMessages() {
            this.textAreaRef.current?.showMessages();
        }
        validate() {
            return this.textAreaRef.current?.validate();
        }
        blur() {
            this.textAreaRef.current?.blur();
        }
        focus() {
            this.textAreaRef.current?.focus();
        }
    };
    exports.TextArea = TextArea;
    TextArea.defaultProps = {
        autocomplete: 'on',
        columnSpan: 1,
        converter: null,
        disabled: false,
        displayOptions: {
            converterHint: 'display',
            messages: 'display',
            validatorHint: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        length: {
            countBy: 'codePoint',
            max: null
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        resizeBehavior: 'none',
        userAssistanceDensity: 'reflow',
        validators: [],
        value: null
    };
    TextArea._metadata = { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "counter": { "type": "string", "enumValues": ["none", "remaining"] }, "max": { "type": "number|null" } } }, "maxRows": { "type": "number" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "resizeBehavior": { "type": "string", "enumValues": ["both", "none", "horizontal", "vertical"] }, "rows": { "type": "number" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    TextArea._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    TextArea._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.TextArea = TextArea = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-text-area')
    ], TextArea);
});

define('oj-c/text-area',["require", "exports", "./text-area/text-area"], function (require, exports, text_area_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextArea = void 0;
    Object.defineProperty(exports, "TextArea", { enumerable: true, get: function () { return text_area_1.TextArea; } });
});


define('oj-c/progress-bar/progress-bar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ProgressBar", "ojs/ojvcomponent", "css!oj-c/progress-bar/progress-bar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ProgressBar_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressBar = void 0;
    exports.ProgressBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-bar', ({ max = 100, value = 0, edge = 'none', ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressBar_1.ProgressBar, { value: value === -1 ? 'indeterminate' : value, max: max, edge: edge, "aria-valuetext": otherProps['aria-valuetext'] }) }));
    }, "ProgressBar", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "edge": { "type": "string", "enumValues": ["none", "top"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext"] } }, { "max": 100, "value": 0, "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/progress-bar',["require", "exports", "./progress-bar/progress-bar"], function (require, exports, progress_bar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressBar = void 0;
    Object.defineProperty(exports, "ProgressBar", { enumerable: true, get: function () { return progress_bar_1.ProgressBar; } });
});


define('oj-c/progress-circle/progress-circle',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ProgressCircle", "ojs/ojvcomponent", "css!oj-c/progress-circle/progress-circle-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ProgressCircle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressCircle = void 0;
    exports.ProgressCircle = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-circle', ({ max = 100, value = 0, size = 'md', ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressCircle_1.ProgressCircle, { value: value === -1 ? 'indeterminate' : value, max: max, size: size, "aria-valuetext": otherProps['aria-valuetext'] }) }));
    }, "ProgressCircle", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext"] } }, { "max": 100, "value": 0, "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/progress-circle',["require", "exports", "./progress-circle/progress-circle"], function (require, exports, progress_circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressCircle = void 0;
    Object.defineProperty(exports, "ProgressCircle", { enumerable: true, get: function () { return progress_circle_1.ProgressCircle; } });
});


define('oj-c/avatar/avatar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Avatar", "ojs/ojvcomponent", "css!oj-c/avatar/avatar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Avatar_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Avatar = void 0;
    exports.Avatar = (0, ojvcomponent_1.registerCustomElement)('oj-c-avatar', ({ src, iconClass, initials, shape = 'square', background = 'neutral', size = 'md', ...otherProps }) => {
        const icon = iconClass ? (0, jsx_runtime_1.jsx)("span", { class: iconClass }) : null;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Avatar_1.Avatar, { src: src ?? undefined, background: background, size: size, initials: initials ?? undefined, shape: shape, "aria-label": otherProps['aria-label'], children: icon }) }));
    }, "Avatar", { "properties": { "background": { "type": "string", "enumValues": ["blue", "gray", "green", "orange", "pink", "purple", "teal", "neutral", "slate", "lilac"] }, "initials": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["xs", "sm", "md", "lg", "2xs", "xl", "2xl"] }, "src": { "type": "string|null" }, "iconClass": { "type": "string" }, "shape": { "type": "string", "enumValues": ["square", "circle"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "shape": "square", "background": "neutral", "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/avatar',["require", "exports", "./avatar/avatar"], function (require, exports, avatar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Avatar = void 0;
    Object.defineProperty(exports, "Avatar", { enumerable: true, get: function () { return avatar_1.Avatar; } });
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/button/button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Button", "@oracle/oraclejet-preact/UNSAFE_IconButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "preact", "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "ojs/ojvcomponent-binding", "ojs/ojvcomponent", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Button_1, UNSAFE_IconButton_1, UNSAFE_useTabbableMode_1, preact_1, hooks_1, compat_1, UNSAFE_useTooltip_1, ojvcomponent_binding_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    const FunctionalButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_Button_1.Button, { ref: buttonRef, ...props });
    });
    const FunctionalIconButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconButton_1.IconButton, { ref: iconButtonRef, ...props });
    });
    let Button = class Button extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.buttonRef = (0, preact_1.createRef)();
        }
        render(props) {
            const widthSize = { width: props.edge === 'bottom' ? '100%' : props.width };
            const { chroming: variant, disabled: isDisabled, onOjAction: onAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width: throwAwayWidth, display: display, label: label, ...otherProps } = { ...props };
            const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
                text: props.tooltip,
                isDisabled
            });
            if (props.display != 'icons' ||
                (props.startIcon && props.endIcon && props.display == 'icons') ||
                (!props.startIcon && !props.endIcon && props.display == 'icons')) {
                const buttonContent = () => ((0, jsx_runtime_1.jsx)(FunctionalButton, { ref: this.buttonRef, type: "submit", variant: variant, isDisabled: isDisabled, width: '100%', onAction: onAction, "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, startIcon: props.startIcon, endIcon: props.endIcon, size: props.size, label: props.display == 'icons'
                        ? !props.startIcon && !props.endIcon
                            ? props.label
                            : ''
                        : props.label, display: props.display != 'icons' ? props.display : 'all', ...tooltipProps, ...otherProps }));
                return props.width || props.edge !== 'none' ? ((0, jsx_runtime_1.jsxs)(ojvcomponent_1.Root, { style: widthSize, children: [buttonContent(), tooltipContent] })) : ((0, jsx_runtime_1.jsxs)(ojvcomponent_1.Root, { children: [buttonContent(), tooltipContent] }));
            }
            else {
                return ((0, jsx_runtime_1.jsx)(FunctionalIconButton, { ref: this.buttonRef, type: "submit", variant: variant, isDisabled: isDisabled, tooltip: props.tooltip && props.tooltip !== '' ? props.tooltip : props.label, onAction: onAction, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : props.label, "aria-describedby": ariaDescribedBy, size: props.size, ...otherProps, children: props.startIcon ?? props.endIcon }));
            }
        }
        blur() {
            this.buttonRef.current?.blur();
        }
        focus() {
            this.buttonRef.current?.focus();
        }
    };
    exports.Button = Button;
    Button.defaultProps = {
        chroming: 'outlined',
        disabled: false,
        size: 'md',
        display: 'all',
        endIcon: null,
        startIcon: null,
        edge: 'none',
        tooltip: ''
    };
    Button._metadata = { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined", "callToAction", "danger"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "blur": {}, "focus": {} } };
    Button._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Button._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Button = Button = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-button')
    ], Button);
});

define('oj-c/button',["require", "exports", "./button/button"], function (require, exports, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_1.Button; } });
});

define('oj-c/checkbox/useCheckboxPreact',["require", "exports", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators"], function (require, exports, hooks_1, UNSAFE_useTranslationBundle_1, useEditableValue_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxPreact = void 0;
    function useCheckboxPreact({ ['aria-describedby']: ariaDescribedBy, disabled, displayOptions, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, validators }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkbox_requiredMessageDetail();
        const { methods, onCommitValue, displayValue, setDisplayValue, textFieldProps } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            validators
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const validationResult = await onCommitValue(value);
            const newValue = validationResult === useValidators_1.ValidationResult.INVALID ? false : value;
            setDisplayValue(newValue);
        }, [onCommitValue]);
        const checkboxProps = {
            'aria-describedby': textFieldProps['aria-describedby'],
            isRequired: required,
            isReadonly: readonly,
            isDisabled: disabled,
            messages: textFieldProps.messages,
            onCommit: onCommitHandler,
            userAssistanceDensity,
            value: displayValue
        };
        return {
            methods,
            checkboxProps
        };
    }
    exports.useCheckboxPreact = useCheckboxPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/checkbox/checkbox',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "@oracle/oraclejet-preact/UNSAFE_Checkbox", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_Environment", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useCheckboxPreact", "css!oj-c/checkbox/checkbox-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, ojvcomponent_binding_1, UNSAFE_Checkbox_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, UNSAFE_Environment_1, useAssistiveText_1, useCheckboxPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    const FunctionalCheckbox = (0, compat_1.forwardRef)(({ ['aria-describedby']: ariaDescribedBy, busyContextRef, displayOptions, disabled, required, help, helpHints, id, children, value, messagesCustom, readonly, requiredMessageDetail, userAssistanceDensity, onMessagesCustomChanged, onValidChanged, onValueChanged, validators }, ref) => {
        const checkboxRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-checkbox id=${id} is ${desc}`
            });
        }, [busyContextRef, id]);
        const { checkboxProps, methods } = (0, useCheckboxPreact_1.useCheckboxPreact)({
            ['aria-describedby']: ariaDescribedBy,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            requiredMessageDetail,
            required,
            userAssistanceDensity,
            value,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            validators
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => checkboxRef.current?.blur(),
            focus: () => checkboxRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            validators,
            userAssistanceDensity: checkboxProps.userAssistanceDensity
        });
        return ((0, jsx_runtime_1.jsx)(UNSAFE_Checkbox_1.Checkbox, { ref: checkboxRef, ...assistiveTextProps, ...checkboxProps, children: children }));
    });
    FunctionalCheckbox.displayName = 'FunctionalCheckbox';
    let Checkbox = class Checkbox extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.checkboxRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render(props) {
            const { translations } = this.context;
            const bundle = translations?.['@oracle/oraclejet-preact'];
            const requiredValidator = {
                validate: (value) => {
                    if (props.required && value !== true) {
                        throw new Error(props.requiredMessageDetail || bundle?.checkbox_requiredMessageDetail());
                    }
                    return;
                }
            };
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan || 1], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalCheckbox, { ...props, validators: [requiredValidator], busyContextRef: this.busyContextRef, ref: this.checkboxRef }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.checkboxRef.current?.reset();
        }
        showMessages() {
            this.checkboxRef.current?.showMessages();
        }
        validate() {
            return this.checkboxRef.current?.validate();
        }
        blur() {
            this.checkboxRef.current?.blur();
        }
        focus() {
            this.checkboxRef.current?.focus();
        }
    };
    exports.Checkbox = Checkbox;
    Checkbox.defaultProps = {
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: false
    };
    Checkbox._metadata = { "slots": { "": {} }, "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "boolean", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    Checkbox._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Checkbox._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Checkbox = Checkbox = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-checkbox')
    ], Checkbox);
    Checkbox.contextType = UNSAFE_Environment_1.EnvironmentContext;
});

define('oj-c/checkbox',["require", "exports", "./checkbox/checkbox"], function (require, exports, checkbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return checkbox_1.Checkbox; } });
});

define('oj-c/checkboxset/useCheckboxsetPreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "preact/hooks", "oj-c/editable-value/UNSAFE_useValidators/useValidators"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, hooks_1, useValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxsetPreact = void 0;
    function useCheckboxsetPreact({ 'aria-describedby': ariaDescribedBy, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkboxSet_requiredMessageDetail();
        const { methods, onCommitValue, setDisplayValue, displayValue, textFieldProps } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy,
            disabled,
            displayOptions,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const valueAsArray = value ? Array.from(value) : null;
            const validationResult = await onCommitValue(valueAsArray);
            const newValue = validationResult === useValidators_1.ValidationResult.INVALID ? null : valueAsArray;
            setDisplayValue(newValue);
        }, [onCommitValue]);
        return {
            methods,
            checkboxsetProps: {
                'aria-describedby': textFieldProps['aria-describedby'],
                isRequired: required,
                isReadonly: readonly,
                isDisabled: disabled,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages: textFieldProps.messages,
                onCommit: onCommitHandler,
                userAssistanceDensity,
                value: displayValue
            }
        };
    }
    exports.useCheckboxsetPreact = useCheckboxsetPreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/checkboxset/checkboxset',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "@oracle/oraclejet-preact/UNSAFE_CheckboxSet", "@oracle/oraclejet-preact/UNSAFE_CheckboxItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useCheckboxsetPreact", "css!oj-c/checkboxset/checkboxset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, ojvcomponent_binding_1, UNSAFE_CheckboxSet_1, UNSAFE_CheckboxItem_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, useAssistiveText_1, useDataProvider_1, useCheckboxsetPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkboxset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const FunctionalCheckboxset = (0, compat_1.forwardRef)(({ busyContextRef, displayOptions, help, helpHints, id, direction, options, ...otherProps }, ref) => {
        const checkboxsetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-checkboxset id=${id} is ${desc}`
            });
        }, [busyContextRef, id]);
        const isFromDataProvider = isDataProvider(options);
        const { checkboxsetProps, methods } = (0, useCheckboxsetPreact_1.useCheckboxsetPreact)({
            displayOptions,
            ...otherProps
        }, addBusyState);
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? options : undefined,
            addBusyState
        });
        const { value, userAssistanceDensity, ...checkboxsetRest } = checkboxsetProps;
        const dataArr = (0, hooks_1.useMemo)(() => {
            const clonedOptions = !isFromDataProvider && options ? [...options] : [];
            return isFromDataProvider
                ? Array.isArray(data)
                    ? data.map((item) => ({ value: item.key, ...item.data }))
                    : []
                : clonedOptions;
        }, [data, isFromDataProvider, options]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => checkboxsetRef.current?.blur(),
            focus: () => checkboxsetRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity
        });
        const memoizedSetValue = (0, hooks_1.useMemo)(() => (value ? new Set(value) : undefined), [value]);
        return ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxSet_1.CheckboxSet, { ref: checkboxsetRef, direction: direction, ...assistiveTextProps, ...checkboxsetRest, userAssistanceDensity: userAssistanceDensity, value: memoizedSetValue, children: dataArr.map(({ assistiveText, helpSourceLink, helpSourceText, label, value }) => ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxItem_1.CheckboxItem, { assistiveText: assistiveText, helpSourceLink: helpSourceLink, helpSourceText: helpSourceText, value: value, children: label }, value))) }));
    });
    let Checkboxset = class Checkboxset extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.checkboxSetRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render(props) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan || 1], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalCheckboxset, { ...props, busyContextRef: this.busyContextRef, ref: this.checkboxSetRef }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.checkboxSetRef.current?.reset();
        }
        showMessages() {
            this.checkboxSetRef.current?.showMessages();
        }
        validate() {
            return this.checkboxSetRef.current?.validate();
        }
        blur() {
            this.checkboxSetRef.current?.blur();
        }
        focus() {
            this.checkboxSetRef.current?.focus();
        }
    };
    exports.Checkboxset = Checkboxset;
    Checkboxset.defaultProps = {
        columnSpan: 1,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: null
    };
    Checkboxset._metadata = { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "options": { "type": "Array<object>|DataProvider" }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "Array<any>|null", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {} } };
    Checkboxset._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    Checkboxset._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.Checkboxset = Checkboxset = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-checkboxset')
    ], Checkboxset);
});

define('oj-c/checkboxset',["require", "exports", "./checkboxset/checkboxset"], function (require, exports, checkboxset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkboxset = void 0;
    Object.defineProperty(exports, "Checkboxset", { enumerable: true, get: function () { return checkboxset_1.Checkboxset; } });
});

define('oj-c/utils/UNSAFE_meterUtils/meterUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getThresholdColorByIndex = void 0;
    const THRESHOLD_COLORS = ['danger', 'warning', 'success'];
    const getThresholdColorByIndex = (threshold, index) => {
        if (threshold.color)
            return threshold.color;
        return THRESHOLD_COLORS[index % THRESHOLD_COLORS.length];
    };
    exports.getThresholdColorByIndex = getThresholdColorByIndex;
});


define('oj-c/rating-gauge/rating-gauge',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_RatingGauge", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "css!oj-c/rating-gauge/rating-gauge-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_RatingGauge_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RatingGauge = void 0;
    exports.RatingGauge = (0, ojvcomponent_1.registerCustomElement)('oj-c-rating-gauge', ({ max = 5, value = 0, size = 'md', color = 'neutral', step = 1, readonly = false, disabled = false, changed = false, ...otherProps }) => {
        const [hoveredVal, setHoveredVal] = (0, hooks_1.useState)();
        const inputHandler = (detail) => {
            setHoveredVal(detail.value);
            otherProps.onTransientValueChanged?.(detail.value);
        };
        const commitHandler = (detail) => {
            otherProps.onValueChanged?.(detail.value);
            if (!changed) {
                otherProps.onChangedChanged?.(true);
            }
        };
        const thresholds = otherProps.thresholds?.map((threshold, index) => {
            return {
                ...threshold,
                color: (0, meterUtils_1.getThresholdColorByIndex)(threshold, index)
            };
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_RatingGauge_1.RatingGauge, { isReadonly: readonly, isDisabled: disabled, value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, size: size, color: color, thresholds: thresholds, tooltip: otherProps.tooltip, datatip: otherProps.datatip?.({
                    value: hoveredVal != undefined ? hoveredVal : value
                }), onCommit: commitHandler, onInput: inputHandler, "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps.labelledBy ?? undefined, "aria-describedby": otherProps.describedBy ?? undefined }) }));
    }, "RatingGauge", { "properties": { "max": { "type": "number" }, "readonly": { "type": "boolean" }, "disabled": { "type": "boolean" }, "changed": { "type": "boolean", "writeback": true }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "color": { "type": "string", "enumValues": ["gold", "neutral"] }, "thresholds": { "type": "Array<object>" }, "datatip": { "type": "function" }, "tooltip": { "type": "string" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["changed", "value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "max": 5, "value": 0, "size": "md", "color": "neutral", "step": 1, "readonly": false, "disabled": false, "changed": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/rating-gauge',["require", "exports", "./rating-gauge/rating-gauge"], function (require, exports, rating_gauge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RatingGauge = void 0;
    Object.defineProperty(exports, "RatingGauge", { enumerable: true, get: function () { return rating_gauge_1.RatingGauge; } });
});

define('oj-c/hooks/UNSAFE_useListData/useListData',["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks"], function (require, exports, ojdataproviderfactory_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useListData = void 0;
    const initialState = Object.freeze({
        status: 'loading',
        data: null
    });
    const defaultOptions = {
        isInitialFetchDeferred: false
    };
    const DEFAULT_FETCH_SIZE = 25;
    const useListData = (data, options = defaultOptions) => {
        const fetchNextRef = (0, hooks_1.useRef)(null);
        const totalSizeRef = (0, hooks_1.useRef)(0);
        const isDoneRef = (0, hooks_1.useRef)(false);
        const iteratorRef = (0, hooks_1.useRef)(null);
        const abortControllerRef = (0, hooks_1.useRef)(null);
        const fetchSize = options.fetchSize && options.fetchSize > 0 ? options.fetchSize : DEFAULT_FETCH_SIZE;
        if (!data) {
            const emptyListState = getEmptyState('exact');
            return [emptyListState, (_) => Promise.resolve()];
        }
        const dataProvider = (0, hooks_1.useMemo)(() => wrapData(data), [data]);
        const [state, dispatch] = (0, hooks_1.useReducer)(reducer, options.initialRowsFetched === 0 ? getEmptyState('atLeast') : initialState);
        const fetchRange = (0, hooks_1.useCallback)(async (range, resultsCallback) => {
            const fetchOptions = {
                attributes: options.attributes,
                sortCriteria: options.sortCriteria,
                filterCriterion: options.filterCriterion,
                offset: range.offset,
                size: range.count
            };
            const sizePrecision = isDoneRef.current === true ? 'exact' : 'atLeast';
            if (range.count === 0) {
                dispatch({
                    status: 'success',
                    data: {
                        offset: range.offset,
                        data: [],
                        totalSize: totalSizeRef.current,
                        sizePrecision: sizePrecision
                    }
                });
                return;
            }
            try {
                const result = await dataProvider.fetchByOffset(fetchOptions);
                const results = result['results'];
                if (resultsCallback) {
                    resultsCallback(results);
                }
                dispatch({
                    status: 'success',
                    data: {
                        offset: range.offset,
                        data: results,
                        totalSize: totalSizeRef.current,
                        sizePrecision: sizePrecision
                    }
                });
            }
            catch (error) {
                dispatch({
                    status: 'error',
                    error: error
                });
            }
        }, [dataProvider, options.attributes, options.filterCriterion, options.sortCriteria]);
        const loadInitial = (0, hooks_1.useCallback)(async () => {
            dispatch({ status: 'loading', data: null });
            const controller = new AbortController();
            abortControllerRef.current = controller;
            const iterator = dataProvider
                .fetchFirst({
                attributes: options.attributes,
                sortCriteria: options.sortCriteria,
                filterCriterion: options.filterCriterion,
                size: fetchSize,
                signal: controller.signal
            })[Symbol.asyncIterator]();
            iteratorRef.current = iterator;
            try {
                const result = await iterator.next();
                const fetchParameters = result.value.fetchParameters;
                if (fetchParameters.signal && fetchParameters.signal.aborted) {
                    return;
                }
                totalSizeRef.current = result.value.data.length;
                if (result.done !== undefined) {
                    isDoneRef.current = result.done;
                }
                const initialFetchSize = options.initialRowsFetched && options.initialRowsFetched > 0
                    ? options.initialRowsFetched
                    : fetchSize;
                fetchRange({ offset: 0, count: Math.min(totalSizeRef.current, initialFetchSize) });
            }
            catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
                dispatch({
                    status: 'error',
                    error: error
                });
                iteratorRef.current = null;
            }
        }, [
            dataProvider,
            fetchRange,
            options.attributes,
            options.filterCriterion,
            options.sortCriteria,
            options.fetchSize
        ]);
        const loadRange = (0, hooks_1.useCallback)(async (range) => {
            if (iteratorRef.current === null) {
                loadInitial();
            }
            else {
                const endIndex = range.offset + range.count;
                if (endIndex > totalSizeRef.current) {
                    if (fetchNextRef.current == null) {
                        const promise = fetchNextUntilThresholdOrDone(iteratorRef, totalSizeRef.current, endIndex);
                        fetchNextRef.current = promise;
                        try {
                            const value = await promise;
                            if (value.done !== undefined) {
                                isDoneRef.current = value.done;
                            }
                            const total = value.total;
                            if (total > 0) {
                                totalSizeRef.current = total;
                                fetchRange({
                                    offset: range.offset,
                                    count: Math.min(totalSizeRef.current - range.offset, range.count)
                                });
                            }
                            fetchNextRef.current = null;
                        }
                        catch (error) {
                            dispatch({
                                status: 'error',
                                error: error
                            });
                            fetchNextRef.current = null;
                        }
                    }
                }
                else {
                    fetchRange(range);
                }
            }
        }, [state, loadInitial, fetchRange]);
        const resetAndLoad = (0, hooks_1.useCallback)(() => {
            iteratorRef.current = null;
            fetchNextRef.current = null;
            totalSizeRef.current = 0;
            isDoneRef.current = false;
            if (options.initialRowsFetched === 0) {
                dispatch(getEmptyState('atLeast'));
            }
            else if (!options.isInitialFetchDeferred) {
                loadInitial();
            }
            else {
                dispatch({ status: 'loading', data: null });
            }
        }, [loadInitial, options.isInitialFetchDeferred, options.initialRowsFetched]);
        (0, hooks_1.useEffect)(() => {
            resetAndLoad();
        }, [resetAndLoad]);
        const handleMutation = (0, hooks_1.useCallback)((event) => {
            if (state.status === 'success' && state.data) {
                const dataState = state.data;
                let shouldUpdate = false;
                if (event.detail.add) {
                    const itemsInserted = handleAddRemoveMutation(event.detail.add, dataState, options, true);
                    totalSizeRef.current = totalSizeRef.current + itemsInserted;
                    shouldUpdate = itemsInserted > 0 || dataState.sizePrecision === 'exact';
                    if (itemsInserted === 0) {
                        isDoneRef.current = false;
                    }
                }
                if (event.detail.remove) {
                    const itemsRemoved = handleAddRemoveMutation(event.detail.remove, dataState, options, false);
                    totalSizeRef.current = totalSizeRef.current - itemsRemoved;
                    shouldUpdate = shouldUpdate || itemsRemoved > 0;
                }
                let callback;
                const updateDetail = event.detail.update;
                if (updateDetail) {
                    shouldUpdate = shouldUpdate || handleUpdateMutation(updateDetail, dataState, options);
                    callback = (results) => {
                        processDataAfterUpdate(updateDetail, dataState, results);
                    };
                }
                if (shouldUpdate) {
                    fetchRange({ offset: dataState.offset, count: dataState.data.length }, callback);
                }
            }
        }, [state, options, fetchRange]);
        const handleRefresh = (0, hooks_1.useCallback)((event) => {
            let adjustment = -1;
            const disregardAfterKey = event.detail?.disregardAfterKey;
            if (disregardAfterKey && state.status === 'success') {
                const index = state.data.data.findIndex((value) => {
                    return value.metadata.key === disregardAfterKey;
                });
                if (index > -1) {
                    adjustment = state.data.data.length - index - 1;
                }
                if (adjustment === 0 && state.data.data.length >= fetchSize) {
                    return;
                }
            }
            if (adjustment > -1 && state.status === 'success') {
                totalSizeRef.current = totalSizeRef.current - adjustment;
                loadRange({
                    offset: state.data.offset,
                    count: Math.max(state.data.data.length, fetchSize)
                });
            }
            else {
                if (state.status === 'loading') {
                    abortControllerRef.current?.abort();
                }
                resetAndLoad();
            }
        }, [state, resetAndLoad]);
        (0, hooks_1.useEffect)(() => {
            dataProvider.addEventListener('refresh', handleRefresh);
            dataProvider.addEventListener('mutate', handleMutation);
            return () => {
                dataProvider.removeEventListener('refresh', handleRefresh);
                dataProvider.removeEventListener('mutate', handleMutation);
            };
        }, [dataProvider, resetAndLoad, handleMutation]);
        return [state, loadRange];
    };
    exports.useListData = useListData;
    const wrapData = (data) => {
        const configuration = {
            fetchFirst: { caching: 'visitedByCurrentIterator' }
        };
        return (0, ojdataproviderfactory_1.getEnhancedDataProvider)(data, configuration);
    };
    const reducer = (state, action) => {
        if (state.status === action.status && action.status === 'loading') {
            return state;
        }
        return action;
    };
    const fetchNextUntilThresholdOrDone = async (iteratorRef, current, threshold) => {
        return await fetchNextRecursive(iteratorRef, current, threshold);
    };
    const fetchNextRecursive = async (iteratorRef, currentCount, threshold) => {
        const currentIterator = iteratorRef.current;
        if (currentIterator === null) {
            return { total: -1, done: undefined };
        }
        const result = await currentIterator.next();
        if (currentIterator === iteratorRef.current) {
            currentCount += result.value.data.length;
            if (currentCount >= threshold || result.done) {
                return { total: currentCount, done: result.done };
            }
            return fetchNextRecursive(iteratorRef, currentCount, threshold);
        }
        return { total: -1, done: undefined };
    };
    const getEmptyState = (precision) => {
        return (precision === 'atLeast' ? emptyStateAtLeast : emptyStateExact);
    };
    const emptyStateAtLeast = Object.freeze({
        status: 'success',
        data: {
            offset: 0,
            data: [],
            totalSize: 0,
            sizePrecision: 'atLeast'
        }
    });
    const emptyStateExact = Object.freeze({
        status: 'success',
        data: {
            offset: 0,
            data: [],
            totalSize: 0,
            sizePrecision: 'exact'
        }
    });
    const handleAddRemoveMutation = (detail, dataState, options, isAdd) => {
        let itemCount = 0;
        if (isIndexesAvailable(detail, options)) {
            const indexes = isAdd ? detail.indexes?.sort() : detail.indexes;
            let endIndex = dataState.totalSize - 1;
            indexes?.forEach((index) => {
                if (index <= endIndex) {
                    itemCount = itemCount += 1;
                    if (isAdd) {
                        endIndex = endIndex += 1;
                    }
                }
            });
        }
        else {
        }
        return itemCount;
    };
    const handleUpdateMutation = (detail, dataState, options) => {
        if (isIndexesAvailable(detail, options)) {
            const indexes = detail.indexes ? detail.indexes : [];
            const startIndex = dataState.offset;
            const endIndex = startIndex + dataState.data.length;
            for (let i = 0; i < indexes.length; i++) {
                if (indexes[i] >= startIndex && indexes[i] < endIndex) {
                    return true;
                }
            }
        }
        else {
        }
        return false;
    };
    const processDataAfterUpdate = (detail, dataState, results) => {
        detail.keys.forEach((key) => {
            const updatedData = results.find((item) => {
                return item.metadata.key == key;
            });
            const currentData = dataState.data.find((item) => {
                return item.metadata.key == key;
            });
            if (currentData && updatedData && currentData.data === updatedData.data) {
                updatedData.data = new Proxy(updatedData.data, {});
            }
        });
    };
    const isIndexesAvailable = (detail, options) => {
        return detail.indexes && options.sortCriteria == null && options.filterCriterion == null;
    };
});

define('oj-c/select-common/utils/utils',["require", "exports"], function (require, exports) {
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

define('oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "preact/hooks", "../utils/utils"], function (require, exports, UNSAFE_logger_1, hooks_1, utils_1) {
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

define('oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider',["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks"], function (require, exports, ojdataproviderfactory_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapDataProvider = void 0;
    function useWrapDataProvider(data) {
        const dataProvider = (0, hooks_1.useMemo)(() => {
            return data
                ? (0, ojdataproviderfactory_1.getEnhancedDataProvider)(data, {
                    fetchFirst: { caching: 'visitedByCurrentIterator' }
                })
                : data;
        }, [data]);
        return dataProvider;
    }
    exports.useWrapDataProvider = useWrapDataProvider;
});

define('oj-c/select-common/UNSAFE_useWrapValueState/useWrapValueState',["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapValueState = void 0;
    function useWrapValueState({ arItemContexts, isLoading, preactValueItems, setPreactValueItems }) {
        const getValueForValidationFunc = (0, hooks_1.useCallback)((valueForValidation) => {
            return (valid) => {
                if (valid === 'invalidShown' && !isLoading) {
                    return (0, utils_1.isEmpty)(preactValueItems) ? null : valueForValidation;
                }
                return valueForValidation;
            };
        }, [isLoading, preactValueItems]);
        const refreshDisplayValue = (0, hooks_1.useCallback)(() => {
            setPreactValueItems(arItemContexts);
        }, [arItemContexts]);
        const wrapValueState = (0, hooks_1.useCallback)((valueState) => {
            return {
                ...valueState,
                getValueForValidation: getValueForValidationFunc(valueState.value),
                refreshDisplayValue
            };
        }, [getValueForValidationFunc, refreshDisplayValue]);
        return { wrapValueState };
    }
    exports.useWrapValueState = useWrapValueState;
});

define('oj-c/utils/UNSAFE_keyUtils/keySetUtils',["require", "exports", "ojs/ojkeyset"], function (require, exports, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keysToKeySet = exports.keySetToKeys = void 0;
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
});

define('oj-c/select-multiple/useSyncValueAndValueItems',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, utils_1, hooks_1) {
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

define('oj-c/select-multiple/useValueItems',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1) {
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

define('oj-c/select-multiple/useSelectMultiplePreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "oj-c/hooks/UNSAFE_useListData/useListData", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider", "oj-c/select-common/UNSAFE_useWrapValueState/useWrapValueState", "oj-c/select-common/utils/utils", "oj-c/utils/UNSAFE_keyUtils/keySetUtils", "ojs/ojdataprovider", "preact/hooks", "./useSyncValueAndValueItems", "./useValueItems"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, useValidators_1, useListData_1, useDataProviderListeners_1, useWrapDataProvider_1, useWrapValueState_1, utils_1, keySetUtils_1, ojdataprovider_1, hooks_1, useSyncValueAndValueItems_1, useValueItems_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectMultiplePreact = void 0;
    function useSelectMultiplePreact({ data: propData, disabled, displayOptions, itemTemplate, itemText, labelEdge, labelHint, labelStartWidth, messagesCustom, placeholder, readonly, required, requiredMessageDetail: propRequiredMessageDetail, textAlign, userAssistanceDensity, value: propValue, valueItems: propValueItems, virtualKeyboard, onMessagesCustomChanged, onValidChanged, onValueChanged, onValueItemsChanged, ...otherProps }, addBusyState) {
        const [filterCriterion, setFilterCriterion] = (0, hooks_1.useState)(undefined);
        const [isLoading, setIsLoading] = (0, hooks_1.useState)(propData != null &&
            propValue != null &&
            propValue.size > 0 &&
            (propValueItems == null || propValueItems.size === 0));
        const { valueItems, setValueItems, preactValueItems: arItemContexts } = (0, useValueItems_1.useValueItems)(propValueItems, onValueItemsChanged);
        const [prevArItemContexts, setPrevArItemContexts] = (0, hooks_1.useState)(arItemContexts);
        const [preactValueItems, setPreactValueItems] = (0, hooks_1.useState)(arItemContexts);
        if (prevArItemContexts !== arItemContexts && preactValueItems !== arItemContexts) {
            setPreactValueItems(arItemContexts);
        }
        const { wrapValueState } = (0, useWrapValueState_1.useWrapValueState)({
            arItemContexts,
            isLoading,
            preactValueItems,
            setPreactValueItems
        });
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.select_requiredMessageDetail();
        const { methods, onCommitValue, setValue, textFieldProps, value } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            wrapValueState
        });
        const { 'aria-describedby': ariaDescribedBy, messages } = textFieldProps;
        const hasNoValue = value === null || (value instanceof Set && value.size === 0);
        const dataProvider = (0, useWrapDataProvider_1.useWrapDataProvider)(propData);
        const [valueToSync, setValueToSync] = (0, hooks_1.useState)(value);
        const [valueItemsToSync, setValueItemsToSync] = (0, hooks_1.useState)(valueItems);
        const [prevValue, setPrevValue] = (0, hooks_1.useState)(value);
        const [prevValueItems, setPrevValueItems] = (0, hooks_1.useState)(valueItems);
        if (prevValue !== value) {
            setValueToSync(value);
        }
        if (prevValueItems !== valueItems) {
            setValueItemsToSync(valueItems);
        }
        (0, useDataProviderListeners_1.useDataProviderListeners)({
            dataProvider,
            setValue: setValue,
            setValueToSync: setValueToSync,
            setValueItemsToSync,
            value: value,
            valueItems
        });
        (0, useSyncValueAndValueItems_1.useSyncValueAndValueItems)({
            addBusyState,
            dataProvider: dataProvider,
            setIsLoading,
            setValue: setValue,
            setValueItems,
            value: valueToSync,
            valueItems: valueItemsToSync
        });
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(dataProvider, {
            filterCriterion,
            initialRowsFetched: 0
        });
        const onCommit = (0, hooks_1.useCallback)(async (detail) => {
            const validationResult = await onCommitValue((detail.value && detail.value.size > 0 ? detail.value : utils_1.DEFAULT_VALUE));
            if (validationResult === useValidators_1.ValidationResult.INVALID) {
                setPreactValueItems(undefined);
            }
        }, [onCommitValue]);
        const onFilter = (0, hooks_1.useCallback)(({ searchText }) => {
            const fc = searchText && searchText.length > 0
                ? ojdataprovider_1.FilterFactory.getFilter({ filterDef: { text: searchText } })
                : undefined;
            setFilterCriterion(fc);
        }, []);
        const prevSelectedKeysRef = (0, hooks_1.useRef)((0, keySetUtils_1.keysToKeySet)({ all: false, keys: new Set() }));
        const itemRenderer = (0, hooks_1.useCallback)(({ data, metadata, searchText, selectedKeys: preactSelectedKeys, onSelectionChange: preactOnSelectionChange }) => {
            const newPreactSelectedKeys = preactSelectedKeys ?? new Set();
            const prevPreactSelectedKeys = prevSelectedKeysRef.current.keys.keys ?? new Set();
            const selectedKeys = (0, utils_1.isSetEqual)(prevPreactSelectedKeys, newPreactSelectedKeys)
                ? prevSelectedKeysRef.current
                : (0, keySetUtils_1.keysToKeySet)({ all: false, keys: newPreactSelectedKeys });
            prevSelectedKeysRef.current = selectedKeys;
            const onSelectedKeysChanged = ((arg) => {
                const immutableKeySet = (arg instanceof CustomEvent ? arg.detail.value : arg);
                const immutableSet = immutableKeySet.keys.keys;
                preactOnSelectionChange({
                    target: arg instanceof CustomEvent ? arg.target : null,
                    value: new Set(immutableSet?.values())
                });
            });
            return itemTemplate
                ? itemTemplate({
                    selectedKeys,
                    onSelectedKeysChanged,
                    item: {
                        data,
                        metadata
                    },
                    searchText
                })
                : undefined;
        }, [itemTemplate]);
        const _selectItemsByValue = (0, hooks_1.useCallback)(async (value) => {
            return onCommit({
                value: value ?? undefined,
                previousValue: propValue ?? undefined
            });
        }, [onCommit, propValue]);
        if (prevArItemContexts !== arItemContexts) {
            setPrevArItemContexts(arItemContexts);
        }
        if (prevValue !== value) {
            setPrevValue(value);
        }
        if (prevValueItems !== valueItems) {
            setPrevValueItems(valueItems);
        }
        return {
            methods,
            selectMultipleProps: {
                'aria-describedby': ariaDescribedBy,
                data: listDataState.data,
                isDisabled: disabled,
                isLoading,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                itemRenderer: itemTemplate ? itemRenderer : undefined,
                itemText,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages,
                onCommit,
                onFilter,
                onLoadRange,
                placeholder,
                textAlign,
                userAssistanceDensity,
                valueItems: preactValueItems,
                virtualKeyboard
            },
            _selectItemsByValue
        };
    }
    exports.useSelectMultiplePreact = useSelectMultiplePreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/select-multiple/select-multiple',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectMultiple", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useSelectMultiplePreact", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/select-multiple/select-multiple-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectMultiple_1, UNSAFE_useTabbableMode_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useAssistiveText_1, useSelectMultiplePreact_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useAccessibleContext_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
    const FunctionalSelectMultiple = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints } = props;
        const selectMultipleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-select-multiple id=${props.id}: ${desc}`
            });
        }, [busyContextRef, props.id]);
        const { selectMultipleProps, methods, _selectItemsByValue } = (0, useSelectMultiplePreact_1.useSelectMultiplePreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectMultipleRef.current?.blur(),
            focus: () => selectMultipleRef.current?.focus(),
            _selectItemsByValue,
            ...methods
        }), [methods, _selectItemsByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectMultipleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_SelectMultiple_1.SelectMultiple, { ref: selectMultipleRef, ...assistiveTextProps, ...selectMultipleProps, variant: variant }));
    });
    FunctionalSelectMultiple.displayName = 'Forwarded<FunctionalSelectMultiple>';
    let SelectMultiple = class SelectMultiple extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.selectMultipleRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalSelectMultiple, { busyContextRef: this.busyContextRef, ref: this.selectMultipleRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.selectMultipleRef.current?.reset();
        }
        showMessages() {
            this.selectMultipleRef.current?.showMessages();
        }
        validate() {
            return this.selectMultipleRef.current?.validate();
        }
        blur() {
            this.selectMultipleRef.current?.blur();
        }
        focus() {
            this.selectMultipleRef.current?.focus();
        }
        _selectItemsByValue(value) {
            return this.selectMultipleRef.current?._selectItemsByValue(value);
        }
    };
    exports.SelectMultiple = SelectMultiple;
    SelectMultiple.defaultProps = {
        columnSpan: 1,
        data: null,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: null,
        valueItems: null,
        virtualKeyboard: 'auto'
    };
    SelectMultiple._metadata = { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "object|null", "writeback": true }, "valueItems": { "type": "object|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItems"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {}, "_selectItemsByValue": {} } };
    SelectMultiple._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    SelectMultiple._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.SelectMultiple = SelectMultiple = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-select-multiple')
    ], SelectMultiple);
});

define('oj-c/select-multiple',["require", "exports", "./select-multiple/select-multiple"], function (require, exports, select_multiple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
    Object.defineProperty(exports, "SelectMultiple", { enumerable: true, get: function () { return select_multiple_1.SelectMultiple; } });
});

define('oj-c/select-single/useSyncValueAndValueItem',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, useStaleIdentity_1, utils_1, hooks_1) {
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

define('oj-c/select-single/useValueItem',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useUncontrolledState", "preact/hooks"], function (require, exports, UNSAFE_useUncontrolledState_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useValueItem = void 0;
    function useValueItem(propValueItem, onValueItemsChanged) {
        const [valueItem, setValueItem] = (0, UNSAFE_useUncontrolledState_1.useUncontrolledState)(propValueItem, onValueItemsChanged);
        (0, hooks_1.useEffect)(() => {
            if (valueItem !== propValueItem) {
                setValueItem(propValueItem);
            }
        }, [propValueItem]);
        return {
            valueItem,
            setValueItem
        };
    }
    exports.useValueItem = useValueItem;
});

define('oj-c/select-single/useSelectSinglePreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "oj-c/editable-value/utils/utils", "oj-c/hooks/UNSAFE_useListData/useListData", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider", "oj-c/select-common/UNSAFE_useWrapValueState/useWrapValueState", "oj-c/select-common/utils/utils", "ojs/ojdataprovider", "preact/hooks", "./useSyncValueAndValueItem", "./useValueItem"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, useValidators_1, utils_1, useListData_1, useDataProviderListeners_1, useWrapDataProvider_1, useWrapValueState_1, utils_2, ojdataprovider_1, hooks_1, useSyncValueAndValueItem_1, useValueItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectSinglePreact = void 0;
    function useSelectSinglePreact({ advancedSearch, data: propData, disabled, displayOptions, itemTemplate, itemText, labelEdge, labelHint, labelStartWidth, messagesCustom, placeholder, readonly, requiredMessageDetail: propRequiredMessageDetail, required, textAlign, userAssistanceDensity, value: propValue, valueItem: propValueItem, virtualKeyboard, onMessagesCustomChanged, onOjAdvancedSearchAction, onOjValueAction, onValidChanged, onValueChanged, onValueItemChanged, ...otherProps }, addBusyState) {
        const [filterCriterion, setFilterCriterion] = (0, hooks_1.useState)(undefined);
        const [isLoading, setIsLoading] = (0, hooks_1.useState)(propData != null && propValue != null && propValueItem == null);
        const { valueItem, setValueItem } = (0, useValueItem_1.useValueItem)(propValueItem, onValueItemChanged);
        const [preactValueItem, setPreactValueItem] = (0, hooks_1.useState)(valueItem);
        (0, hooks_1.useEffect)(() => {
            setPreactValueItem(valueItem);
        }, [valueItem]);
        const { wrapValueState } = (0, useWrapValueState_1.useWrapValueState)({
            arItemContexts: valueItem,
            isLoading,
            preactValueItems: preactValueItem,
            setPreactValueItems: setPreactValueItem
        });
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.select_requiredMessageDetail();
        const { methods, onCommitValue, setValue, textFieldProps, value } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            wrapValueState
        });
        const { 'aria-describedby': ariaDescribedBy, messages } = textFieldProps;
        const hasNoValue = value === null;
        const dataProvider = (0, useWrapDataProvider_1.useWrapDataProvider)(propData);
        const [valueToSync, setValueToSync] = (0, hooks_1.useState)(value);
        const [valueItemToSync, setValueItemToSync] = (0, hooks_1.useState)(valueItem);
        (0, hooks_1.useEffect)(() => {
            setValueToSync(value);
        }, [value]);
        (0, hooks_1.useEffect)(() => {
            setValueItemToSync(valueItem);
        }, [valueItem]);
        (0, useDataProviderListeners_1.useDataProviderListeners)({
            dataProvider,
            setValue,
            setValueToSync,
            setValueItemsToSync: setValueItemToSync,
            value,
            valueItems: valueItem
        });
        (0, useSyncValueAndValueItem_1.useSyncValueAndValueItem)({
            addBusyState,
            dataProvider: dataProvider,
            setIsLoading,
            setValue,
            setValueItem,
            value: valueToSync,
            valueItem: valueItemToSync
        });
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(dataProvider, {
            filterCriterion,
            initialRowsFetched: 0
        });
        const onCommit = (0, hooks_1.useCallback)(async ({ previousValue, value }) => {
            const validationResult = await onCommitValue(value != null ? value : utils_2.DEFAULT_VALUE);
            if (validationResult === useValidators_1.ValidationResult.INVALID) {
                setPreactValueItem(undefined);
            }
            else if (validationResult === useValidators_1.ValidationResult.VALID && listDataState.status === 'success') {
                if (value == null) {
                    onOjValueAction?.({
                        itemContext: utils_2.DEFAULT_ITEM_CONTEXT,
                        previousValue: previousValue ?? utils_2.DEFAULT_VALUE,
                        value: utils_2.DEFAULT_VALUE
                    });
                }
                else if (value === valueItem?.key) {
                    onOjValueAction?.({
                        itemContext: valueItem,
                        previousValue: previousValue ?? utils_2.DEFAULT_VALUE,
                        value
                    });
                }
                else {
                    const data = listDataState.data.data;
                    let item = data.find((item) => item.metadata.key === value);
                    if (item === undefined) {
                        const fetchResults = await dataProvider.fetchByKeys({ keys: new Set([value]) });
                        item = fetchResults.results.get(value);
                    }
                    const itemContext = {
                        data: item.data,
                        key: item.metadata.key,
                        metadata: item.metadata
                    };
                    onOjValueAction?.({
                        itemContext: itemContext,
                        previousValue: previousValue ?? utils_2.DEFAULT_VALUE,
                        value: value ?? utils_2.DEFAULT_VALUE
                    });
                }
            }
        }, [dataProvider, listDataState, valueItem, onCommitValue, onOjValueAction]);
        const onFilter = (0, hooks_1.useCallback)(({ searchText }) => {
            const fc = searchText && searchText.length > 0
                ? ojdataprovider_1.FilterFactory.getFilter({ filterDef: { text: searchText } })
                : undefined;
            setFilterCriterion(fc);
        }, []);
        const itemRenderer = (0, hooks_1.useCallback)(({ data, metadata, searchText }) => {
            return itemTemplate
                ? itemTemplate({
                    item: {
                        data,
                        metadata
                    },
                    searchText
                })
                : undefined;
        }, [itemTemplate]);
        const _selectItemByValue = (0, hooks_1.useCallback)(async (value) => {
            return onCommit({
                value: value ?? undefined,
                previousValue: propValue ?? undefined
            });
        }, [onCommit, propValue]);
        const onAdvancedSearchAction = (0, hooks_1.useCallback)((detail) => {
            onOjAdvancedSearchAction?.(detail);
        }, [onOjAdvancedSearchAction]);
        const _doAdvancedSearchAction = (0, hooks_1.useCallback)((searchText) => {
            onAdvancedSearchAction({ searchText });
        }, [onAdvancedSearchAction]);
        return {
            methods,
            selectSingleProps: {
                advancedSearch,
                'aria-describedby': ariaDescribedBy,
                data: listDataState.data,
                isDisabled: disabled,
                isLoading,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                itemRenderer: itemTemplate ? itemRenderer : undefined,
                itemText,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages,
                onAdvancedSearchAction,
                onCommit,
                onFilter,
                onLoadRange,
                placeholder,
                textAlign,
                userAssistanceDensity,
                valueItem: (0, utils_1.treatNull)(preactValueItem, undefined),
                virtualKeyboard
            },
            _doAdvancedSearchAction,
            _selectItemByValue
        };
    }
    exports.useSelectSinglePreact = useSelectSinglePreact;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/select-single/select-single',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_SelectSingle", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "preact", "preact/compat", "preact/hooks", "./useSelectSinglePreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/select-single/select-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_SelectSingle_1, useAssistiveText_1, Context, ojvcomponent_1, ojvcomponent_binding_1, preact_1, compat_1, hooks_1, useSelectSinglePreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
    const FunctionalSelectSingle = (0, compat_1.forwardRef)((props, ref) => {
        const { busyContextRef, displayOptions, help, helpHints } = props;
        const selectSingleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-select-single id=${props.id}: ${desc}`
            });
        }, [busyContextRef, props.id]);
        const { selectSingleProps, methods, _doAdvancedSearchAction, _selectItemByValue } = (0, useSelectSinglePreact_1.useSelectSinglePreact)(props, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectSingleRef.current?.blur(),
            focus: () => selectSingleRef.current?.focus(),
            _doAdvancedSearchAction,
            _selectItemByValue,
            ...methods
        }), [methods, _doAdvancedSearchAction, _selectItemByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectSingleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(UNSAFE_SelectSingle_1.SelectSingle, { ref: selectSingleRef, ...assistiveTextProps, ...selectSingleProps, variant: variant }));
    });
    let SelectSingle = class SelectSingle extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.selectSingleRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            const containerProps = {
                isFormLayout: props.containerReadonly !== undefined,
                isReadonly: props.containerReadonly,
                labelWrapping: props.labelWrapping
            };
            const accessibleProps = {
                UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
            };
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(FunctionalSelectSingle, { busyContextRef: this.busyContextRef, ref: this.selectSingleRef, ...props }) }) }) }));
        }
        componentWillUnmount() {
            this.busyContextRef.current = null;
        }
        reset() {
            this.selectSingleRef.current?.reset();
        }
        showMessages() {
            this.selectSingleRef.current?.showMessages();
        }
        validate() {
            return this.selectSingleRef.current?.validate();
        }
        blur() {
            this.selectSingleRef.current?.blur();
        }
        focus() {
            this.selectSingleRef.current?.focus();
        }
        _doAdvancedSearchAction(searchText) {
            return this.selectSingleRef.current?._doAdvancedSearchAction(searchText);
        }
        _selectItemByValue(value) {
            return this.selectSingleRef.current?._selectItemByValue(value);
        }
    };
    exports.SelectSingle = SelectSingle;
    SelectSingle.defaultProps = {
        advancedSearch: 'off',
        columnSpan: 1,
        data: null,
        disabled: false,
        displayOptions: {
            messages: 'display'
        },
        help: {
            instruction: ''
        },
        helpHints: {
            definition: '',
            source: '',
            sourceText: undefined
        },
        messagesCustom: [],
        readonly: false,
        required: false,
        userAssistanceDensity: 'reflow',
        value: null,
        valueItem: null,
        virtualKeyboard: 'auto'
    };
    SelectSingle._metadata = { "properties": { "advancedSearch": { "type": "string", "enumValues": ["off", "on"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "any", "writeback": true }, "valueItem": { "type": "object|null", "properties": { "data": { "type": "any" }, "key": { "type": "any" }, "metadata": { "type": "object", "properties": { "indexFromParent": { "type": "number" }, "isLeaf": { "type": "boolean" }, "key": { "type": "any" }, "message": { "type": "object", "properties": { "detail": { "type": "string" }, "severity": { "type": "string|number" }, "summary": { "type": "string" } } }, "parentKey": { "type": "any" }, "suggestion": { "type": "object" }, "treeDepth": { "type": "number" } } } }, "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "events": { "ojAdvancedSearchAction": {}, "ojValueAction": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItem"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "reset": {}, "showMessages": {}, "validate": {}, "blur": {}, "focus": {}, "_doAdvancedSearchAction": {}, "_selectItemByValue": {} } };
    SelectSingle._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    SelectSingle._consumedContexts = [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.SelectSingle = SelectSingle = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-select-single')
    ], SelectSingle);
});

define('oj-c/select-single',["require", "exports", "./select-single/select-single"], function (require, exports, select_single_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
    Object.defineProperty(exports, "SelectSingle", { enumerable: true, get: function () { return select_single_1.SelectSingle; } });
});


define('oj-c/collapsible/collapsible',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Collapsible", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcontext", "css!oj-c/collapsible/collapsible-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Collapsible_1, ojvcomponent_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collapsible = void 0;
    exports.Collapsible = (0, ojvcomponent_1.registerCustomElement)('oj-c-collapsible', (props) => {
        const { id, children, disabled, expanded, iconPosition, variant, header } = props;
        const rootRef = (0, hooks_1.useRef)(null);
        const didMountRef = (0, hooks_1.useRef)(false);
        const resolveBusyState = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return Context.getContext(rootRef.current)
                .getBusyContext()
                ?.addBusyState({
                description: `oj-c-collapsible: id='${id}' is ${desc}.`
            });
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (resolveBusyState.current) {
                resolveBusyState.current();
            }
            resolveBusyState.current = addBusyState('animating');
        }, [expanded]);
        const toggleHandler = async (event) => {
            let target = event.target;
            for (; target && target !== rootRef?.current; target = target.parentElement) {
                if (target.getAttribute('data-oj-clickthrough') === 'disabled') {
                    return;
                }
            }
            const beforeProp = event.value ? props.onOjBeforeExpand : props.onOjBeforeCollapse;
            try {
                await beforeProp?.(event);
                props.onExpandedChanged?.(event.value);
            }
            catch (_) {
            }
        };
        const transitionEndHandler = (event) => {
            const expandedProp = event.value ? props.onOjExpand : props.onOjCollapse;
            expandedProp?.(event);
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_Collapsible_1.Collapsible, { header: header, iconPosition: iconPosition, variant: variant, isExpanded: expanded, isDisabled: disabled, onToggle: toggleHandler, onTransitionEnd: transitionEndHandler, children: children }) }));
    }, "Collapsible", { "slots": { "": {}, "header": {} }, "properties": { "disabled": { "type": "boolean" }, "expanded": { "type": "boolean", "writeback": true }, "iconPosition": { "type": "string", "enumValues": ["end", "start"] }, "variant": { "type": "string", "enumValues": ["basic", "horizontal-rule"] } }, "events": { "ojBeforeCollapse": { "cancelable": true }, "ojBeforeExpand": { "cancelable": true }, "ojCollapse": {}, "ojExpand": {} }, "extension": { "_WRITEBACK_PROPS": ["expanded"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["id"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/collapsible',["require", "exports", "./collapsible/collapsible"], function (require, exports, collapsible_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collapsible = void 0;
    Object.defineProperty(exports, "Collapsible", { enumerable: true, get: function () { return collapsible_1.Collapsible; } });
});

define('oj-c/utils/UNSAFE_focusTabUtils/focusUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFirstTabStop = exports.focusFirstTabStop = void 0;
    const focusFirstTabStop = (element) => {
        if (!element)
            return;
        const focusElement = (0, exports.getFirstTabStop)(element);
        if (focusElement) {
            focusElement.focus();
        }
        return focusElement;
    };
    exports.focusFirstTabStop = focusFirstTabStop;
    const getFirstTabStop = (element) => {
        const tabbable = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (tabbable && tabbable.length > 0) {
            return tabbable[0];
        }
        return null;
    };
    exports.getFirstTabStop = getFirstTabStop;
});


define('oj-c/file-picker/file-picker',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_FilePicker", "preact/hooks", "preact/compat", "ojs/ojvcomponent", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_focusTabUtils/focusUtils", "css!oj-c/file-picker/file-picker-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_FilePicker_1, hooks_1, compat_1, ojvcomponent_1, UNSAFE_useTabbableMode_1, focusUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilePicker = void 0;
    const getPrimaryText = (primaryText) => {
        if (typeof primaryText === 'function') {
            return primaryText();
        }
        return primaryText;
    };
    const getSecondaryText = (secondaryText, selectionMode) => {
        if (typeof secondaryText === 'function') {
            return secondaryText({ selectionMode: selectionMode });
        }
        return secondaryText;
    };
    exports.FilePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-file-picker', (0, compat_1.forwardRef)(({ capture = 'none', disabled = false, selectionMode = 'multiple', trigger, accept, primaryText, secondaryText, onOjBeforeSelect, onOjSelect, onOjInvalidSelect, ...otherProps }, ref) => {
        const elementPromiseResolverRef = (0, hooks_1.useRef)(null);
        const resolveTestPromise = (0, hooks_1.useCallback)(() => {
            if (elementPromiseResolverRef.current) {
                elementPromiseResolverRef.current();
                elementPromiseResolverRef.current = null;
            }
        }, []);
        const onCommit = (0, hooks_1.useCallback)((event) => {
            onOjBeforeSelect?.({ files: event.files }).then(() => {
                resolveTestPromise();
                onOjSelect?.({ files: event.files });
            }, (messages) => {
                resolveTestPromise();
                onOjInvalidSelect?.({ messages: messages, until: null });
            });
        }, [onOjBeforeSelect, onOjSelect, onOjInvalidSelect, resolveTestPromise]);
        const onReject = (0, hooks_1.useCallback)((event) => {
            resolveTestPromise();
            onOjInvalidSelect?.(event);
        }, [onOjInvalidSelect, resolveTestPromise]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => (0, focusUtils_1.focusFirstTabStop)(rootRef.current),
            blur: () => {
                const focusElement = document.activeElement;
                if (rootRef.current?.contains(focusElement)) {
                    focusElement.blur();
                }
            },
            _doSelectHelper: (fileList) => {
                const promise = new Promise((resolve) => {
                    elementPromiseResolverRef.current = resolve;
                });
                const ref = preactRef.current;
                ref.onClickSelected(fileList);
                return promise;
            }
        }));
        const rootRef = (0, hooks_1.useRef)(null);
        const preactRef = (0, hooks_1.useRef)(null);
        const BaseFilePicker = UNSAFE_FilePicker_1.FilePicker;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: trigger ? 'oj-c-file-picker-with-trigger' : undefined, children: (0, jsx_runtime_1.jsx)(BaseFilePicker, { __testHandlerSymbol: preactRef, capture: capture, isDisabled: disabled, selectionMode: selectionMode, onCommit: onCommit, onReject: onReject, accept: accept, primaryText: getPrimaryText(primaryText), secondaryText: getSecondaryText(secondaryText, selectionMode), "aria-label": otherProps['aria-label'], width: "100%", children: trigger }) }));
    }), "FilePicker", { "properties": { "accept": { "type": "Array<string>" }, "capture": { "type": "string", "enumValues": ["none", "environment", "user", "implementation"] }, "disabled": { "type": "boolean" }, "primaryText": { "type": "string|function" }, "secondaryText": { "type": "string|function" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "slots": { "trigger": {} }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojInvalidSelect": {}, "ojSelect": {} }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] }, "methods": { "focus": {}, "blur": {}, "_doSelectHelper": {} } }, { "capture": "none", "disabled": false, "selectionMode": "multiple" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/file-picker',["require", "exports", "./file-picker/file-picker"], function (require, exports, file_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilePicker = void 0;
    Object.defineProperty(exports, "FilePicker", { enumerable: true, get: function () { return file_picker_1.FilePicker; } });
});


define('oj-c/meter-bar/meter-bar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MeterBar", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "css!oj-c/meter-bar/meter-bar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MeterBar_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterBar = void 0;
    exports.MeterBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-meter-bar', ({ max = 100, value = 0, min = 0, size = 'md', orientation = 'horizontal', step = 1, indicatorSize = 1, readonly = false, thresholdDisplay = 'indicator', ...props }) => {
        const [hoveredVal, setHoveredVal] = (0, hooks_1.useState)();
        const inputHandler = (detail) => {
            setHoveredVal(detail.value);
            props.onTransientValueChanged?.(detail.value);
        };
        const commitHandler = (detail) => {
            props.onValueChanged?.(detail.value);
        };
        const thresholds = props.thresholds?.map((threshold, index) => {
            return {
                ...threshold,
                color: (0, meterUtils_1.getThresholdColorByIndex)(threshold, index)
            };
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { class: `oj-c-meter-bar-${orientation}`, children: (0, jsx_runtime_1.jsx)(UNSAFE_MeterBar_1.MeterBar, { value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, min: min, size: size, orientation: orientation, indicatorSize: indicatorSize, datatip: props.datatip
                    ? props.datatip({
                        value: hoveredVal != undefined ? hoveredVal : value
                    })
                    : props.datatip, onCommit: readonly ? undefined : commitHandler, onInput: readonly ? undefined : inputHandler, length: '100%', thresholds: thresholds, referenceLines: props.referenceLines, thresholdDisplay: thresholdDisplay === 'plotArea' ? 'track' : thresholdDisplay, indicatorColor: props.color, trackColor: props.plotArea?.color, isTrackRendered: props.plotArea?.rendered !== 'off', "aria-label": props['aria-label'], "aria-labelledby": props.labelledBy ?? undefined, "aria-describedby": props.describedBy ?? undefined }) }));
    }, "MeterBar", { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "readonly": { "type": "boolean" }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "color": { "type": "string" }, "indicatorSize": { "type": "number" }, "plotArea": { "type": "object", "properties": { "color": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["off", "on"] } } }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "referenceLines": { "type": "Array<object>" }, "thresholdDisplay": { "type": "string", "enumValues": ["all", "plotArea", "indicator"] }, "thresholds": { "type": "Array<object>" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "datatip": { "type": "function" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "max": 100, "value": 0, "min": 0, "size": "md", "orientation": "horizontal", "step": 1, "indicatorSize": 1, "readonly": false, "thresholdDisplay": "indicator" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/meter-bar',["require", "exports", "./meter-bar/meter-bar"], function (require, exports, meter_bar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterBar = void 0;
    Object.defineProperty(exports, "MeterBar", { enumerable: true, get: function () { return meter_bar_1.MeterBar; } });
});


define('oj-c/meter-circle/meter-circle',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MeterCircle", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "css!oj-c/meter-circle/meter-circle-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MeterCircle_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterCircle = void 0;
    exports.MeterCircle = (0, ojvcomponent_1.registerCustomElement)('oj-c-meter-circle', ({ max = 100, value = 0, min = 0, size = 'md', step = 1, readonly = false, startAngle = 90, indicatorSize = 1, angleExtent = 360, thresholdDisplay = 'indicator', ...props }) => {
        const [hoveredVal, setHoveredVal] = (0, hooks_1.useState)();
        const inputHandler = (detail) => {
            setHoveredVal(detail.value);
            props.onTransientValueChanged?.(detail.value);
        };
        const commitHandler = (detail) => {
            props.onValueChanged?.(detail.value);
        };
        const thresholds = props.thresholds?.map((threshold, index) => {
            return {
                ...threshold,
                color: (0, meterUtils_1.getThresholdColorByIndex)(threshold, index)
            };
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_MeterCircle_1.MeterCircle, { value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, min: min, size: size, angleExtent: angleExtent, startAngle: startAngle, indicatorSize: indicatorSize, innerRadius: props.innerRadius, datatip: props.datatip
                    ? props.datatip({
                        value: hoveredVal != undefined ? hoveredVal : value
                    })
                    : props.datatip, onCommit: readonly ? undefined : commitHandler, onInput: readonly ? undefined : inputHandler, thresholds: thresholds, trackColor: props.plotArea?.color, indicatorColor: props.color, isTrackRendered: props.plotArea?.rendered !== 'off', referenceLines: props.referenceLines, thresholdDisplay: thresholdDisplay === 'plotArea' ? 'track' : thresholdDisplay, "aria-label": props['aria-label'], "aria-labelledby": props.labelledBy ?? undefined, "aria-describedby": props.describedBy ?? undefined, children: (context) => {
                    return props.centerTemplate?.({ value, ...context });
                } }) }));
    }, "MeterCircle", { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "readonly": { "type": "boolean" }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "color": { "type": "string" }, "indicatorSize": { "type": "number" }, "innerRadius": { "type": "number" }, "plotArea": { "type": "object", "properties": { "color": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["off", "on"] } } }, "angleExtent": { "type": "number" }, "startAngle": { "type": "number" }, "referenceLines": { "type": "Array<object>" }, "thresholdDisplay": { "type": "string", "enumValues": ["all", "plotArea", "indicator"] }, "thresholds": { "type": "Array<object>" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "datatip": { "type": "function" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "slots": { "centerTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "max": 100, "value": 0, "min": 0, "size": "md", "step": 1, "readonly": false, "startAngle": 90, "indicatorSize": 1, "angleExtent": 360, "thresholdDisplay": "indicator" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/meter-circle',["require", "exports", "./meter-circle/meter-circle"], function (require, exports, meter_circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterCircle = void 0;
    Object.defineProperty(exports, "MeterCircle", { enumerable: true, get: function () { return meter_circle_1.MeterCircle; } });
});


define('oj-c/line-chart/line-chart',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "ojs/ojcontext", "ojs/ojvcomponent", "../hooks/UNSAFE_useChartData/useChartData", "../utils/PRIVATE_chartUtils/events", "../utils/PRIVATE_chartUtils/legendUtils", "../hooks/UNSAFE_useLegendPosition/useLegendPosition", "../hooks/UNSAFE_useVizCategories/useVizCategories", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "../utils/PRIVATE_chartUtils/lineAreaUtils", "oj-c/utils/PRIVATE_chartUtils/plotAreaUtils", "css!oj-c/line-chart/line-chart-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_LineAreaChart_1, Context, ojvcomponent_1, useChartData_1, events_1, legendUtils_1, useLegendPosition_1, useVizCategories_1, UNSAFE_Legend_1, UNSAFE_ChartWithLegend_1, lineAreaUtils_1, plotAreaUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChart = void 0;
    function LineChartComp({ data, hideAndShowBehavior = 'none', orientation = 'vertical', xAxis, yAxis, hoverBehavior = 'none', valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling = 'off', hiddenCategories = [], highlightedCategories = [], highlightMatch = 'any', selection = [], selectionMode = 'none', stack = 'off', legend = {
        rendered: 'on',
        position: 'auto'
    }, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-line-chart: ${description}` })
                : () => { };
        }, []);
        const { series, groups, getDataItem } = (0, useChartData_1.useChartData)(data, addBusyState, itemTemplate, seriesTemplate, groupTemplate, 'oj-c-line-chart-item', 'oj-c-line-chart-series', 'oj-c-line-chart-group', seriesComparator, groupComparator);
        const { majorTick: xMajorTick, ...xAxisRest } = xAxis ?? {};
        const { majorTick: yMajorTick, minorTick: yMinorTick, ...yAxisRest } = yAxis ?? {};
        const { seriesDrillHandler, itemDrillHandler, groupDrillHandler } = (0, events_1.getChartEventsHandler)(series, groups, drilling, props.onOjItemDrill, props.onOjGroupDrill, props.onOjSeriesDrill);
        const selectionChangeHandler = (detail) => {
            props.onSelectionChanged?.(detail.ids);
        };
        const categoriesItems = (0, legendUtils_1.getBLACCategoriesItems)(series, groups, getDataItem, hoverBehavior, hideAndShowBehavior);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', highlightMatch, props.onHiddenCategoriesChanged, props.onHighlightedCategoriesChanged);
        const onItemInput = (detail) => {
            if (hoverBehavior === 'none')
                return;
            const id = (0, events_1.getIdFromDetail)(detail, series, getDataItem);
            updateHighlighted(id);
        };
        const legendData = (0, legendUtils_1.getLegendData)(series);
        const isLegendRendered = (legend.rendered || legendUtils_1.LegendDefaults.rendered) != 'off';
        const isLegendInteractive = hideAndShowBehavior != 'none' ||
            hoverBehavior != 'none' ||
            drilling === 'on' ||
            drilling === 'seriesOnly';
        const legendPosition = (0, useLegendPosition_1.useLegendPosition)(rootRef, legend.position || legendUtils_1.LegendDefaults.position);
        const legendItemActionHandler = (detail) => {
            if (hideAndShowBehavior != 'none') {
                updateHidden(detail.itemId);
                return;
            }
            seriesDrillHandler(detail);
        };
        const legendItemInputHandler = (detail) => {
            if (hoverBehavior != 'none') {
                updateHighlighted(detail.itemId);
            }
        };
        const chart = series.length > 0 && groups.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_LineAreaChart_1.LineAreaChart, { type: "line", width: "100%", height: "100%", series: series, groups: groups, getDataItem: getDataItem, onItemInput: onItemInput, drilling: drilling !== 'seriesOnly' ? drilling : undefined, onItemDrill: itemDrillHandler, onGroupDrill: groupDrillHandler, onSelectionChange: selectionChangeHandler, selectionMode: selectionMode, selectedIds: selectionMode === 'none' ? undefined : selection, orientation: orientation, xAxis: xAxisRest, yAxis: yAxisRest, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds, plotArea: (0, plotAreaUtils_1.getPlotArea)(plotArea, yMajorTick, yMinorTick, xMajorTick), hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, isStacked: stack === 'on', valueFormats: (0, lineAreaUtils_1.transformValueFormats)(valueFormats), "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'] })) : undefined;
        const chartLegend = isLegendRendered && legendData.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { items: legendData, orientation: legendPosition === 'start' || legendPosition === 'end' ? 'vertical' : 'horizontal', isReadOnly: !isLegendInteractive, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds.length === 0 ? undefined : hiddenIds, symbolHeight: legend.symbolHeight, symbolWidth: legend.symbolWidth, onItemAction: legendItemActionHandler, onInput: legendItemInputHandler })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_ChartWithLegend_1.ChartWithLegend, { chart: chart, position: legendPosition, maxSize: legend.maxSize, size: legend.size, legend: chartLegend }) }));
    }
    exports.LineChart = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart', LineChartComp, "LineChart", { "properties": { "groupComparator": { "type": "function" }, "stack": { "type": "string", "enumValues": ["off", "on"] }, "drilling": { "type": "string", "enumValues": ["off", "on", "groupsOnly", "seriesOnly"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "yAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "xAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "lineColor": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } } } }, "plotArea": { "type": "object", "properties": { "backgroundColor": { "type": "string" } } }, "zoomAndScroll": { "type": "string", "enumValues": ["off", "live"] }, "valueFormats": { "type": "object", "properties": { "group": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "series": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "value": { "type": "object", "properties": { "converter": { "type": "any" }, "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } } } }, "seriesComparator": { "type": "function" }, "data": { "type": "DataProvider|null" }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["none", "withoutRescale", "withRescale"] }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "legend": { "type": "object", "properties": { "position": { "type": "string", "enumValues": ["auto", "end", "start", "top", "bottom"] }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] }, "maxSize": { "type": "number|string" }, "size": { "type": "number|string" }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" } } } }, "slots": { "itemTemplate": { "data": {} }, "seriesTemplate": { "data": {} }, "groupTemplate": { "data": {} } }, "events": { "ojItemDrill": {}, "ojSeriesDrill": {}, "ojGroupDrill": {}, "ojViewportChange": {} }, "extension": { "_WRITEBACK_PROPS": ["selection", "hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hideAndShowBehavior": "none", "orientation": "vertical", "hoverBehavior": "none", "drilling": "off", "hiddenCategories": [], "highlightedCategories": [], "highlightMatch": "any", "selection": [], "selectionMode": "none", "stack": "off", "legend": { "rendered": "on", "position": "auto" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart',["require", "exports", "./line-chart/line-chart"], function (require, exports, line_chart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChart = void 0;
    Object.defineProperty(exports, "LineChart", { enumerable: true, get: function () { return line_chart_1.LineChart; } });
});

define('oj-c/line-chart-item/line-chart-item',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartItem = void 0;
    exports.LineChartItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart-item', ({}) => {
        return null;
    }, "LineChartItem", { "properties": { "seriesId": { "type": "string" }, "groupId": { "type": "Array<string>" }, "value": { "type": "number" }, "color": { "type": "string" }, "markerDisplayed": { "type": "string", "enumValues": ["auto", "off", "on"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerSize": { "type": "number" }, "categories": { "type": "Array<string>" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-item',["require", "exports", "./line-chart-item/line-chart-item"], function (require, exports, line_chart_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartItem = void 0;
    Object.defineProperty(exports, "LineChartItem", { enumerable: true, get: function () { return line_chart_item_1.LineChartItem; } });
});

define('oj-c/line-chart-series/line-chart-series',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartSeries = exports.LineChartSeriesDefaults = void 0;
    exports.LineChartSeriesDefaults = {
        drilling: 'inherit'
    };
    exports.LineChartSeries = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart-series', ({ drilling = exports.LineChartSeriesDefaults.drilling, ...props }) => {
        return null;
    }, "LineChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-series',["require", "exports", "./line-chart-series/line-chart-series"], function (require, exports, line_chart_series_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartSeries = void 0;
    Object.defineProperty(exports, "LineChartSeries", { enumerable: true, get: function () { return line_chart_series_1.LineChartSeries; } });
});

define('oj-c/line-chart-group/line-chart-group',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartGroup = exports.LineChartGroupDefaults = void 0;
    exports.LineChartGroupDefaults = {
        drilling: 'inherit'
    };
    exports.LineChartGroup = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart-group', ({ drilling = exports.LineChartGroupDefaults.drilling, ...props }) => {
        return null;
    }, "LineChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-group',["require", "exports", "./line-chart-group/line-chart-group"], function (require, exports, line_chart_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartGroup = void 0;
    Object.defineProperty(exports, "LineChartGroup", { enumerable: true, get: function () { return line_chart_group_1.LineChartGroup; } });
});


define('oj-c/list-item-layout/list-item-layout',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ListItemLayout", "ojs/ojvcomponent", "css!oj-c/list-item-layout/list-item-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ListItemLayout_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItemLayout = void 0;
    exports.ListItemLayout = (0, ojvcomponent_1.registerCustomElement)('oj-c-list-item-layout', ({ children, ...otherProps }) => {
        const primary = children;
        const insetStyle = { padding: otherProps.inset === 'none' ? '0' : '12px 16px' };
        const actionSlot = otherProps.action ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-clickthrough": "disabled", children: otherProps.action })) : undefined;
        const navSlot = otherProps.navigation ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-clickthrough": "disabled", children: otherProps.navigation })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)("div", { style: insetStyle, children: (0, jsx_runtime_1.jsx)(UNSAFE_ListItemLayout_1.ListItemLayout, { primary: primary, overline: otherProps.overline, selector: otherProps.selector, leading: otherProps.leading, secondary: otherProps.secondary, tertiary: otherProps.tertiary, metadata: otherProps.metadata, trailing: otherProps.trailing, action: actionSlot, quaternary: otherProps.quaternary, navigation: navSlot }) }) }));
    }, "ListItemLayout", { "slots": { "": {}, "overline": {}, "selector": {}, "leading": {}, "secondary": {}, "tertiary": {}, "metadata": {}, "trailing": {}, "action": {}, "quaternary": {}, "navigation": {} }, "properties": { "inset": { "type": "string", "enumValues": ["none", "listInset"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/list-item-layout',["require", "exports", "./list-item-layout/list-item-layout"], function (require, exports, list_item_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItemLayout = void 0;
    Object.defineProperty(exports, "ListItemLayout", { enumerable: true, get: function () { return list_item_layout_1.ListItemLayout; } });
});

define('oj-c/list-view/useHandleRemoveCurrentKey',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useHandleRemoveCurrentKey = void 0;
    function useHandleRemoveCurrentKey(dataState, currentKey, onChange) {
        const prevDataState = (0, hooks_1.useRef)();
        (0, hooks_1.useEffect)(() => {
            const oldDataState = prevDataState.current;
            if (currentKey &&
                onChange &&
                oldDataState &&
                dataState &&
                oldDataState.offset === dataState.offset &&
                oldDataState !== dataState) {
                const newKeys = dataState.data.map((dataMetadata) => {
                    return dataMetadata.metadata.key;
                });
                if (newKeys.indexOf(currentKey) === -1) {
                    const oldKeys = oldDataState?.data.map((dataMetadata) => {
                        return dataMetadata.metadata.key;
                    });
                    let index = oldKeys.indexOf(currentKey);
                    if (index > -1) {
                        const backward = index === oldKeys.length - 1;
                        while (index >= 0 && index < oldKeys.length) {
                            index = backward ? index - 1 : index + 1;
                            const newCurrentKey = oldKeys[index];
                            if (newKeys.indexOf(newCurrentKey) > -1) {
                                onChange({ value: newCurrentKey });
                                break;
                            }
                        }
                    }
                }
            }
            prevDataState.current = dataState;
        }, [dataState, currentKey, onChange]);
    }
    exports.useHandleRemoveCurrentKey = useHandleRemoveCurrentKey;
});

define('oj-c/list-view/useListViewPreact',["require", "exports", "preact/hooks", "../utils/UNSAFE_keyUtils/keySetUtils", "../hooks/UNSAFE_useListData/useListData", "./useHandleRemoveCurrentKey"], function (require, exports, hooks_1, keySetUtils_1, useListData_1, useHandleRemoveCurrentKey_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useListViewPreact = void 0;
    const useListViewPreact = ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, data: propData, gridlines, onCurrentItemChanged, selectionMode, selected, scrollPolicyOptions, onSelectedChanged, onOjItemAction }, addBusyState, isClickthroughDisabled) => {
        const resolveBusyState = (0, hooks_1.useRef)();
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(propData, {
            fetchSize: scrollPolicyOptions?.fetchSize
        });
        const selectedKeys = (0, keySetUtils_1.keySetToKeys)(selected);
        const listData = listDataState.status !== 'error' ? listDataState.data : null;
        const [currentItem, setCurrentItem] = (0, hooks_1.useState)();
        (0, hooks_1.useEffect)(() => {
            if (listDataState.status === 'loading') {
                resolveBusyState.current = addBusyState('list data is in fetch state');
            }
            else {
                if (resolveBusyState.current) {
                    resolveBusyState.current();
                    resolveBusyState.current = undefined;
                }
            }
        }, [listDataState.status, addBusyState]);
        const handleOnCurrentItemChanged = (detail) => {
            setCurrentItem(detail.value);
            onCurrentItemChanged && onCurrentItemChanged(detail.value);
        };
        const dataState = listDataState.status === 'error' ? null : listDataState.data;
        (0, useHandleRemoveCurrentKey_1.useHandleRemoveCurrentKey)(dataState, currentItem, handleOnCurrentItemChanged);
        const viewportConfig = scrollPolicyOptions?.scroller
            ? {
                scroller: () => {
                    if (scrollPolicyOptions.scroller) {
                        return document.querySelector(scrollPolicyOptions.scroller);
                    }
                    return null;
                }
            }
            : undefined;
        const suggestions = (0, hooks_1.useMemo)(() => getSuggestionsInfo(listDataState), [listDataState]);
        const getRowKey = (data) => {
            return data.metadata.key;
        };
        const onLoadMore = (0, hooks_1.useCallback)(() => {
            if (listData) {
                const fetchSize = scrollPolicyOptions && scrollPolicyOptions.fetchSize ? scrollPolicyOptions.fetchSize : 25;
                onLoadRange({ offset: 0, count: listData.data.length + fetchSize });
            }
        }, [scrollPolicyOptions, onLoadRange, listData]);
        return {
            status: listDataState.status,
            listViewProps: {
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledBy,
                data: listData ? listData.data : null,
                currentKey: currentItem,
                getRowKey,
                gridlines,
                onCurrentKeyChange: handleOnCurrentItemChanged,
                hasMore: listData ? listData.sizePrecision === 'atLeast' : false,
                onLoadMore,
                onSelectionChange: (detail) => {
                    onSelectedChanged &&
                        !isClickthroughDisabled(detail.target) &&
                        onSelectedChanged((0, keySetUtils_1.keysToKeySet)(detail.value));
                },
                selectedKeys,
                selectionMode,
                promotedSection: suggestions,
                onItemAction: (detail) => {
                    const item = detail.context.data;
                    const itemActionDetail = { context: { item, data: item.data } };
                    onOjItemAction && onOjItemAction(itemActionDetail);
                },
                viewportConfig
            }
        };
    };
    exports.useListViewPreact = useListViewPreact;
    function getSuggestionsInfo(listDataState) {
        if (listDataState.status !== 'success') {
            return { count: 0 };
        }
        const data = listDataState.data.data;
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].metadata.suggestion == null) {
                break;
            }
            count += 1;
        }
        return { count };
    }
});

define('oj-c/list-view/listViewItem',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, jsx_runtime_1, UNSAFE_useTabbableMode_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItem = void 0;
    const ListItem = ({ context, itemTemplate }) => {
        const { isTabbable } = (0, UNSAFE_useTabbableMode_1.useTabbableMode)();
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const itemContext = {
            isTabbable,
            data: context.data.data,
            item: context.data
        };
        return ((0, jsx_runtime_1.jsxs)(UNSAFE_useTabbableMode_1.TabbableModeContext.Provider, { value: { isTabbable }, children: [itemTemplate && itemTemplate(itemContext), itemContext.item.metadata?.suggestion && ((0, jsx_runtime_1.jsx)("span", { class: "oj-helper-hidden-accessible", children: translations.list_suggestion() }))] }));
    };
    exports.ListItem = ListItem;
});


define('oj-c/list-view/list-view',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "@oracle/oraclejet-preact/UNSAFE_ListView", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "./useListViewPreact", "./listViewItem", "css!oj-c/list-view/list-view-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, ojvcomponent_1, compat_1, hooks_1, UNSAFE_EmptyList_1, UNSAFE_ListView_1, UNSAFE_useTranslationBundle_1, useListViewPreact_1, listViewItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListView = void 0;
    const ListViewPreactWrapper = ({ addBusyState, isClickthroughDisabled, itemTemplate, noData, ...rest }) => {
        const { status, listViewProps } = (0, useListViewPreact_1.useListViewPreact)(rest, addBusyState, isClickthroughDisabled);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        if (status === 'success' && !listViewProps.hasMore && listViewProps.data?.length === 0) {
            if (noData) {
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noData(compat_1.Children) }));
            }
            else {
                const noDataContent = translations.noData_message();
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noDataContent }));
            }
        }
        return ((0, jsx_runtime_1.jsx)(UNSAFE_ListView_1.ListView, { ...listViewProps, children: (context) => {
                return (0, jsx_runtime_1.jsx)(listViewItem_1.ListItem, { context: context, itemTemplate: itemTemplate });
            } }));
    };
    const ListViewImpl = ({ selectionMode = 'none', ...rest }) => {
        const rootRef = (0, hooks_1.useRef)();
        const busyContextRef = (0, hooks_1.useRef)(Context.getContext(rootRef.current).getBusyContext());
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-list-view: ${desc}`
            });
        }, []);
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target === null || rootRef.current === undefined) {
                return false;
            }
            return isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const props = {
            selectionMode,
            ...rest
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(ListViewPreactWrapper, { addBusyState: addBusyState, isClickthroughDisabled: isClickthroughDisabled, ...props }) }));
    };
    exports.ListView = (0, ojvcomponent_1.registerCustomElement)('oj-c-list-view', ListViewImpl, "ListView", { "properties": { "currentItem": { "type": "any", "readOnly": true, "writeback": true }, "data": { "type": "DataProvider|null" }, "gridlines": { "type": "object", "properties": { "item": { "type": "string", "enumValues": ["hidden", "visible"] }, "top": { "type": "string", "enumValues": ["hidden", "visible"] }, "bottom": { "type": "string", "enumValues": ["hidden", "visible"] } } }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" }, "scroller": { "type": "string" } } }, "selected": { "type": "object", "writeback": true }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] } }, "slots": { "itemTemplate": { "data": {} }, "noData": { "data": {} } }, "events": { "ojItemAction": {} }, "extension": { "_WRITEBACK_PROPS": ["currentItem", "selected"], "_READ_ONLY_PROPS": ["currentItem"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] } }, { "selectionMode": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
    const isEventClickthroughDisabled = function (event, rootElement) {
        let node = event.target;
        while (node != null && node !== rootElement) {
            if (isClickthroughDisabled(node)) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    const isClickthroughDisabled = function (element) {
        return element.dataset['ojClickthrough'] === 'disabled';
    };
});

define('oj-c/list-view',["require", "exports", "./list-view/list-view"], function (require, exports, list_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListView = void 0;
    Object.defineProperty(exports, "ListView", { enumerable: true, get: function () { return list_view_1.ListView; } });
});

define('oj-c/radioset/useRadiosetPreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRadiosetPreact = void 0;
    function useRadiosetPreact({ direction, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.radio_requiredMessageDetail();
        const { value, methods, textFieldProps } = (0, useEditableValue_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            disabled,
            displayOptions,
            labelHint,
            messagesCustom,
            readonly,
            required,
            requiredMessageDetail,
            value: propValue,
            addBusyState,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged
        });
        return {
            methods,
            radiosetProps: {
                'aria-describedby': textFieldProps['aria-describedby'],
                isRequired: required,
                isReadonly: readonly,
                isDisabled: disabled,
                label: labelHint,
                labelEdge,
                labelStartWidth,
                messages: textFieldProps['messages'],
                onCommit: textFieldProps['onCommit'],
                userAssistanceDensity,
                value
            }
        };
    }
    exports.useRadiosetPreact = useRadiosetPreact;
});


define('oj-c/radioset/radioset',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_RadioItem", "@oracle/oraclejet-preact/UNSAFE_RadioSet", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojvcomponent", "preact/hooks", "preact/compat", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useRadiosetPreact", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/radioset/radioset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_RadioItem_1, UNSAFE_RadioSet_1, UNSAFE_useTabbableMode_1, UNSAFE_useFormContext_1, useAssistiveText_1, ojvcomponent_1, hooks_1, compat_1, useDataProvider_1, useRadiosetPreact_1, Context, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radioset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const FunctionalRadioset = (0, compat_1.forwardRef)(({ columnSpan = 1, disabled = false, direction = 'column', displayOptions = {
        messages: 'display'
    }, help = {
        instruction: ''
    }, helpHints = {
        definition: '',
        source: ''
    }, messagesCustom = [], readonly = false, required = false, userAssistanceDensity = 'reflow', value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const radiosetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'Radioset: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { options, containerReadonly, labelWrapping } = otherProps;
        const { radiosetProps, methods } = (0, useRadiosetPreact_1.useRadiosetPreact)({
            direction,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            required,
            userAssistanceDensity,
            value,
            ...otherProps
        }, addBusyState);
        let dataArr = [];
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isDataProvider(options) ? options : undefined,
            addBusyState
        });
        dataArr = (0, hooks_1.useMemo)(() => {
            let retDataArr = [];
            if (isDataProvider(options)) {
                if (Array.isArray(data)) {
                    retDataArr = data.map((item) => {
                        return { value: item.key, ...item.data };
                    });
                }
            }
            else if (options) {
                retDataArr = [...options];
            }
            return retDataArr;
        }, [options, data]);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => radiosetRef.current?.blur(),
            focus: () => radiosetRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: radiosetProps.userAssistanceDensity
        });
        const containerProps = {
            isFormLayout: containerReadonly !== undefined,
            isReadonly: containerReadonly,
            labelWrapping: labelWrapping
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_RadioSet_1.RadioSet, { ref: radiosetRef, direction: direction, ...assistiveTextProps, ...radiosetProps, children: dataArr.map((radioItem) => ((0, jsx_runtime_1.jsx)(UNSAFE_RadioItem_1.RadioItem, { assistiveText: radioItem.assistiveText, helpSourceLink: radioItem.helpSourceLink, helpSourceText: radioItem.helpSourceText, value: radioItem.value, children: radioItem.label }, radioItem.value))) }) }) }));
    });
    exports.Radioset = (0, ojvcomponent_1.registerCustomElement)('oj-c-radioset', FunctionalRadioset, "Radioset", { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelHint": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "options": { "type": "Array<object>|DataProvider" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "any", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "direction": "column", "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "readonly": false, "required": false, "userAssistanceDensity": "reflow", "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/radioset',["require", "exports", "./radioset/radioset"], function (require, exports, radioset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radioset = void 0;
    Object.defineProperty(exports, "Radioset", { enumerable: true, get: function () { return radioset_1.Radioset; } });
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/split-menu-button/split-menu-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SplitMenuButton", "@oracle/oraclejet-preact/UNSAFE_Menu", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "preact", "preact/hooks", "preact/compat", "ojs/ojvcomponent", "css!oj-c/split-menu-button/split-menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SplitMenuButton_1, UNSAFE_Menu_1, UNSAFE_useTabbableMode_1, preact_1, hooks_1, compat_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitMenuButton = void 0;
    const FunctionalSplitMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            doAction: () => buttonRef.current?.dispatchEvent(new Event('ojAction', { bubbles: true }))
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_SplitMenuButton_1.SplitMenuButton, { ref: buttonRef, ...props });
    });
    let SplitMenuButton = class SplitMenuButton extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.buttonRef = (0, preact_1.createRef)();
            this.renderMenu = (items) => {
                return items.map((item) => {
                    if (item && (item.type === 'divider' || item.type === 'separator')) {
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuSeparator, {});
                    }
                    else if ((item.type === 'item' || !item.type) && item.label) {
                        return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuItem, { label: item.label, isDisabled: item.disabled, onAction: item.onAction }));
                    }
                    else {
                        return;
                    }
                });
            };
        }
        render(props) {
            const { chroming, label, disabled, size, onOjAction: onAction, items } = { ...props };
            const widthSize = { width: props.width };
            return props.width ? ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { style: widthSize, children: (0, jsx_runtime_1.jsx)(FunctionalSplitMenuButton, { label: label, ref: this.buttonRef, variant: chroming, size: size, width: '100%', isDisabled: disabled, onAction: onAction, children: this.renderMenu(items) }) })) : ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(FunctionalSplitMenuButton, { label: label, ref: this.buttonRef, variant: chroming, size: size, width: '100%', isDisabled: disabled, onAction: onAction, children: this.renderMenu(items) }) }));
        }
        blur() {
            this.buttonRef.current?.blur();
        }
        focus() {
            this.buttonRef.current?.focus();
        }
        doAction() {
            this.buttonRef.current?.doAction();
        }
    };
    exports.SplitMenuButton = SplitMenuButton;
    SplitMenuButton.defaultProps = {
        label: '',
        chroming: 'outlined',
        disabled: false,
        size: 'md',
        items: []
    };
    SplitMenuButton._metadata = { "properties": { "label": { "type": "string" }, "items": { "type": "Array<object>" }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "outlined", "callToAction"] } }, "events": { "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["title"] }, "methods": { "blur": {}, "focus": {}, "doAction": {} } };
    SplitMenuButton._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    SplitMenuButton._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.SplitMenuButton = SplitMenuButton = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-split-menu-button')
    ], SplitMenuButton);
});

define('oj-c/split-menu-button',["require", "exports", "./split-menu-button/split-menu-button"], function (require, exports, split_menu_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitMenuButton = void 0;
    Object.defineProperty(exports, "SplitMenuButton", { enumerable: true, get: function () { return split_menu_button_1.SplitMenuButton; } });
});

define('oj-c/selector/selector',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Selector", "ojs/ojvcomponent", "../utils/UNSAFE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Selector_1, ojvcomponent_1, keySetUtils_1, UNSAFE_useTabbableMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    const SelectorImpl = ({ rowKey, selectedKeys, indeterminate = false, selectionMode = 'multiple', onSelectedKeysChanged, ...otherProps }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Selector_1.Selector, { isPartial: indeterminate, rowKey: rowKey, selectedKeys: (0, keySetUtils_1.keySetToKeys)(selectedKeys), selectionMode: selectionMode, "aria-label": otherProps['aria-label'], onChange: (detail) => {
                    onSelectedKeysChanged?.((0, keySetUtils_1.keysToKeySet)(detail.value));
                } }, rowKey) }));
    };
    exports.Selector = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector', SelectorImpl, "Selector", { "properties": { "rowKey": { "type": "any" }, "selectedKeys": { "type": "object", "writeback": true }, "indeterminate": { "type": "boolean" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "indeterminate": false, "selectionMode": "multiple" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/selector',["require", "exports", "./selector/selector"], function (require, exports, selector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    Object.defineProperty(exports, "Selector", { enumerable: true, get: function () { return selector_1.Selector; } });
});

define('oj-c/selector-all/selector-all',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectorAll", "ojs/ojvcomponent", "../utils/UNSAFE_keyUtils/keySetUtils"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectorAll_1, ojvcomponent_1, keySetUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectorAll = void 0;
    const SelectorAllImpl = ({ selectedKeys, onSelectedKeysChanged }) => {
        const keys = selectedKeys.keys;
        const selected = (keys.all
            ? keys.deletedKeys.size > 0
                ? 'partial-all'
                : 'all'
            : keys.keys.size > 0
                ? 'partial'
                : 'none');
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectorAll_1.SelectorAll, { selected: selected, onChange: (detail) => {
                    onSelectedKeysChanged?.((0, keySetUtils_1.keysToKeySet)(detail.value));
                } }) }));
    };
    exports.SelectorAll = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector-all', SelectorAllImpl, "SelectorAll", { "properties": { "selectedKeys": { "type": "object", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/selector-all',["require", "exports", "./selector-all/selector-all"], function (require, exports, selector_all_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectorAll = void 0;
    Object.defineProperty(exports, "SelectorAll", { enumerable: true, get: function () { return selector_all_1.SelectorAll; } });
});

define('oj-c/legend-item/legend-item',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendItem = exports.LegendItemDefaults = void 0;
    exports.LegendItemDefaults = {
        markerShape: 'square',
        symbolType: 'marker',
        borderColor: '',
        categories: [],
        lineStyle: 'solid'
    };
    exports.LegendItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend-item', ({ markerShape = exports.LegendItemDefaults.markerShape, symbolType = exports.LegendItemDefaults.symbolType, borderColor = exports.LegendItemDefaults.borderColor, categories = exports.LegendItemDefaults.categories, lineStyle = exports.LegendItemDefaults.lineStyle, ...props }) => {
        return null;
    }, "LegendItem", { "properties": { "text": { "type": "string" }, "categories": { "type": "Array<string>" }, "symbolType": { "type": "string", "enumValues": ["marker", "image", "line", "lineWithMarker"] }, "source": { "type": "string" }, "color": { "type": "string" }, "borderColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "dotted", "solid"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["square", "circle", "ellipse", "diamond", "human", "plus", "star", "triangleDown", "triangleUp", "rectangle"] }, "markerColor": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/legend-section/legend-section',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendSection = exports.LegendSectionDefaults = void 0;
    exports.LegendSectionDefaults = {
        text: ''
    };
    exports.LegendSection = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend-section', ({ text = exports.LegendSectionDefaults.text, ...props }) => {
        return null;
    }, "LegendSection", { "properties": { "text": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/legend/utils',["require", "exports", "../legend-item/legend-item", "../legend-section/legend-section"], function (require, exports, legend_item_1, legend_section_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDefaultSymbolDims = exports.isTreeDataProvider = exports.transformSection = exports.transformItem = exports.parseItemId = exports.isLegendInteractive = exports.getSectionStyles = exports.getTextStyles = void 0;
    function getTextStyles(styles) {
        return {
            textFontStyle: styles?.fontStyle,
            textFontSize: styles?.fontSize,
            textFontColor: styles?.color,
            textFontWeight: styles?.fontWeight,
            textDecoration: styles?.textDecoration,
            textFontFamily: styles?.fontFamily
        };
    }
    exports.getTextStyles = getTextStyles;
    function getSectionStyles(styles) {
        return {
            sectionTitleColor: styles?.color,
            sectionTitleFontFamily: styles?.fontFamily,
            sectionTitleFontSize: styles?.fontSize,
            sectionTitleFontStyle: styles?.fontStyle,
            sectionTitleFontWeight: styles?.fontWeight,
            sectionTitleTextDecoration: styles?.textDecoration
        };
    }
    exports.getSectionStyles = getSectionStyles;
    function isLegendInteractive(drilling, hideAndShowBehavior, hoverBehavior) {
        return drilling === 'on' || hideAndShowBehavior === 'on' || hoverBehavior === 'dim';
    }
    exports.isLegendInteractive = isLegendInteractive;
    function parseItemId(id) {
        return id.split(';').map((i) => parseInt(i, 10));
    }
    exports.parseItemId = parseItemId;
    function transformItem(dataItem, sectionIndex, itemIndex, ariaLabelSuffix) {
        const item = { ...legend_item_1.LegendItemDefaults, ...dataItem };
        return {
            borderColor: item.borderColor,
            lineWidth: item.lineWidth,
            markerColor: item.markerColor || item.color || undefined,
            lineColor: item.color || undefined,
            markerShape: item.symbolType !== 'line' ? item.markerShape : 'none',
            lineStyle: item.symbolType !== 'marker' ? item.lineStyle : 'none',
            'aria-label': [item.shortDesc, ariaLabelSuffix].filter(Boolean).join(' ') || undefined,
            datatip: item.shortDesc,
            source: item.source,
            text: item.text,
            id: `${sectionIndex};${itemIndex}`
        };
    }
    exports.transformItem = transformItem;
    function transformSection(dataSection, ariaLabelSuffix, sectionIndex) {
        const section = { ...legend_section_1.LegendSectionDefaults, ...dataSection };
        return {
            items: section.items.map((item, itemIndex) => transformItem(item, sectionIndex, itemIndex, ariaLabelSuffix)),
            title: section.text || section.title,
            id: `${sectionIndex}`
        };
    }
    exports.transformSection = transformSection;
    function isTreeDataProvider(dataprovider) {
        if (dataprovider && dataprovider['getChildDataProvider']) {
            return true;
        }
        return false;
    }
    exports.isTreeDataProvider = isTreeDataProvider;
    const getDefaultSymbolDims = (symbolHeight, symbolWidth) => {
        if (!symbolHeight && !symbolWidth) {
            return { width: undefined, height: undefined };
        }
        if (!symbolHeight) {
            return { width: symbolWidth, height: symbolWidth };
        }
        if (!symbolWidth) {
            return { width: symbolHeight, height: symbolHeight };
        }
        return { width: symbolWidth, height: symbolHeight };
    };
    exports.getDefaultSymbolDims = getDefaultSymbolDims;
});

define('oj-c/legend/events',["require", "exports", "./utils"], function (require, exports, utils_1) {
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

define('oj-c/legend/useSectionData',["require", "exports", "preact/compat", "../utils/UNSAFE_vizUtils/TemplateHandler", "../hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojflattenedtreedataproviderview", "ojs/ojkeyset"], function (require, exports, compat_1, TemplateHandler_1, useDataProvider_1, FlattenedTreeDataProviderView, ojkeyset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSectionData = void 0;
    function useSectionData(dataProvider, addBusyState, sectionTemplate, itemTemplate) {
        const dpRef = (0, compat_1.useRef)(dataProvider);
        const flatDpRef = (0, compat_1.useRef)(new FlattenedTreeDataProviderView(dataProvider, {
            expanded: new ojkeyset_1.AllKeySetImpl()
        }));
        if (dpRef.current != dataProvider) {
            dpRef.current = dataProvider;
            flatDpRef.current = new FlattenedTreeDataProviderView(dpRef.current, {
                expanded: new ojkeyset_1.AllKeySetImpl()
            });
        }
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: flatDpRef.current,
            addBusyState
        });
        const sections = [];
        if (data.length > 0) {
            let currentSection;
            for (const item of data) {
                const context = {
                    key: item.metadata?.key,
                    data: item.data,
                    index: item.metadata.indexFromParent
                };
                const isSection = item?.metadata?.treeDepth === 0;
                if (isSection) {
                    currentSection = item;
                    let sectionData = item.data;
                    const items = [];
                    if (sectionTemplate) {
                        sectionData = (0, TemplateHandler_1.processNodeTemplate)(item, sectionTemplate, context, 'oj-c-legend-section');
                    }
                    sections.push({ ...sectionData, items });
                }
                else {
                    const itemContext = {
                        ...context,
                        parentKey: item.metadata?.parentKey,
                        parentData: currentSection?.data
                    };
                    const processedItem = itemTemplate
                        ? (0, TemplateHandler_1.processNodeTemplate)(item, itemTemplate, itemContext, 'oj-c-legend-item')
                        : item.data;
                    sections[sections.length - 1]['items'].push({
                        key: item.metadata?.key,
                        ...processedItem
                    });
                }
            }
        }
        return sections;
    }
    exports.useSectionData = useSectionData;
});


define('oj-c/legend/legend',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_Legend", "ojs/ojcontext", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "preact/compat", "../hooks/UNSAFE_useVizCategories/useVizCategories", "./events", "./useSectionData", "css!oj-c/legend/legend-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_Legend_1, Context, ojvcomponent_1, utils_1, useDataProvider_1, TemplateHandler_1, UNSAFE_useTranslationBundle_1, compat_1, useVizCategories_1, events_1, useSectionData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearLegend = exports.Legend = void 0;
    function LegendComp({ data = null, drilling = 'off', halign = 'start', valign = 'top', hiddenCategories = [], hideAndShowBehavior = 'off', highlightedCategories = [], hoverBehavior = 'none', orientation = 'vertical', symbolHeight = 0, symbolWidth = 0, textStyle = {}, sectionTitleStyle = {}, sectionTitleHalign = 'start', ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-legend: ${description}` })
                : () => { };
        }, []);
        const isTreeData = (0, utils_1.isTreeDataProvider)(data);
        const { width: symWidth, height: symHeight } = (0, utils_1.getDefaultSymbolDims)(symbolHeight, symbolWidth);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: `oj-c-legend-${halign} oj-c-legend-${valign}`, children: isTreeData ? ((0, jsx_runtime_1.jsx)(SectionalLegend, { data: data, ...props, addBusyState: addBusyState, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symWidth, textStyle: textStyle, sectionTitleStyle: sectionTitleStyle, sectionTitleHalign: sectionTitleHalign })) : ((0, jsx_runtime_1.jsx)(LinearLegend, { ...props, data: data, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symHeight, addBusyState: addBusyState, textStyle: textStyle })) }));
    }
    exports.Legend = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend', LegendComp, "Legend", { "properties": { "data": { "type": "DataProvider|null" }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "halign": { "type": "string", "enumValues": ["center", "end", "start"] }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["off", "on"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" }, "textStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "valign": { "type": "string", "enumValues": ["top", "bottom", "middle"] }, "sectionTitleStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "sectionTitleHalign": { "type": "string", "enumValues": ["center", "end", "start"] } }, "slots": { "itemTemplate": { "data": {} }, "sectionTemplate": { "data": {} } }, "events": { "ojDrill": {} }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "data": null, "drilling": "off", "halign": "start", "valign": "top", "hiddenCategories": [], "hideAndShowBehavior": "off", "highlightedCategories": [], "hoverBehavior": "none", "orientation": "vertical", "symbolHeight": 0, "symbolWidth": 0, "textStyle": {}, "sectionTitleStyle": {}, "sectionTitleHalign": "start" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
    function LinearLegend({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, orientation, symbolHeight, symbolWidth, ...props }) {
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: props.data ? props.data : undefined,
            addBusyState: props.addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior);
        const getItemContext = (context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        };
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const items = itemTemplate
            ? (0, TemplateHandler_1.processTemplate)(data, itemTemplate, getItemContext, 'oj-c-legend-item')
            : data.map((item) => item.data);
        const preactItems = (0, compat_1.useMemo)(() => {
            return items.map((value, itemIndex) => (0, utils_1.transformItem)(value, 0, itemIndex, drilling === 'on' ? translations.viz_drillable() : ''));
        }, [items, drilling, translations]);
        const categoriesItems = (0, compat_1.useMemo)(() => {
            const categoriesItems = [];
            if (isHideShowOn || isHighlightOn) {
                items.forEach((item, itemIndex) => {
                    categoriesItems.push({ id: preactItems[itemIndex].id, categories: item.categories || [] });
                });
            }
            return categoriesItems;
        }, [preactItems, items, isHideShowOn, isHighlightOn]);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', 'any', onHiddenCategoriesChanged, onHighlightedCategoriesChanged);
        const getDrillDetail = (id) => {
            const [_, itemIdx] = id;
            const item = items[itemIdx];
            if (item['categories']?.length > 0)
                return item['categories'];
            return data[itemIdx].metadata?.key;
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling, props.onOjDrill);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        return preactItems.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { orientation: orientation, symbolHeight: symbolHeight, symbolWidth: symbolWidth, isReadOnly: !isInteractive, hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, items: preactItems, onItemAction: itemActionHandler, onInput: inputHandler, ...props, ...textStyles })) : null;
    }
    exports.LinearLegend = LinearLegend;
    function SectionalLegend({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, sectionTitleStyle, orientation, symbolHeight, symbolWidth, data, ...props }) {
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const sections = (0, useSectionData_1.useSectionData)(data, props.addBusyState, sectionTemplate, itemTemplate);
        const preactSections = (0, compat_1.useMemo)(() => {
            const preactSections = sections.map((section, sectionIdx) => (0, utils_1.transformSection)(section, drilling === 'on' ? translations.viz_drillable() : '', sectionIdx));
            return preactSections;
        }, [sections, drilling, translations]);
        const categoriesItems = (0, compat_1.useMemo)(() => {
            const categoriesItems = [];
            if (isHideShowOn || isHighlightOn) {
                sections.forEach((section, sectionIndex) => {
                    section.items.forEach((item, itemIndex) => {
                        categoriesItems.push({
                            id: preactSections[sectionIndex].items[itemIndex].id,
                            categories: item.categories || []
                        });
                    });
                });
            }
            return categoriesItems;
        }, [sections, isHideShowOn, isHighlightOn, preactSections]);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', 'any', onHiddenCategoriesChanged, onHighlightedCategoriesChanged);
        const getDillDetail = (id) => {
            const [sectionIdx, itemIdx] = id;
            const item = sections[sectionIdx].items[itemIdx];
            if (item.categories)
                return item.categories;
            return item.key;
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDillDetail, drilling, props.onOjDrill);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        const sectionTitleStyles = (0, utils_1.getSectionStyles)(sectionTitleStyle);
        return preactSections.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.SectionalLegend, { sections: preactSections, orientation: orientation, sectionTitleHAlign: props.sectionTitleHalign, symbolHeight: symbolHeight, symbolWidth: symbolWidth, isReadOnly: !isInteractive, "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, onItemAction: itemActionHandler, onInput: inputHandler, ...textStyles, ...sectionTitleStyles })) : null;
    }
});

define('oj-c/legend',["require", "exports", "./legend/legend"], function (require, exports, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Legend = void 0;
    Object.defineProperty(exports, "Legend", { enumerable: true, get: function () { return legend_1.Legend; } });
});

define('oj-c/legend-item',["require", "exports", "./legend-item/legend-item"], function (require, exports, legend_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendItem = void 0;
    Object.defineProperty(exports, "LegendItem", { enumerable: true, get: function () { return legend_item_1.LegendItem; } });
});

define('oj-c/legend-section',["require", "exports", "./legend-section/legend-section"], function (require, exports, legend_section_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendSection = void 0;
    Object.defineProperty(exports, "LegendSection", { enumerable: true, get: function () { return legend_section_1.LegendSection; } });
});

define('oj-c/tag-cloud-item/tag-cloud-item',["require", "exports", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent"], function (require, exports, translationBundle_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloudItem = exports.TagCloudItemDefaults = void 0;
    exports.TagCloudItemDefaults = {
        categories: []
    };
    exports.TagCloudItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud-item', ({ categories = exports.TagCloudItemDefaults.categories, ...props }) => {
        return null;
    }, "TagCloudItem", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "label": { "type": "string" }, "value": { "type": "number|null" }, "url": { "type": "string" }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tag-cloud/utils',["require", "exports", "../tag-cloud-item/tag-cloud-item"], function (require, exports, tag_cloud_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.executeLink = exports.transformItem = void 0;
    function transformItem(dataItem) {
        const item = { ...tag_cloud_item_1.TagCloudItemDefaults, ...dataItem };
        return {
            color: item.color,
            accessibleLabel: item.shortDesc,
            value: item.value,
            label: item.label,
            id: item.key != null ? item?.key : item.id,
            role: (item.url ? 'link' : undefined)
        };
    }
    exports.transformItem = transformItem;
    function executeLink(dest) {
        const newWindow = window.open(dest, '_blank');
        if (newWindow)
            newWindow.focus();
    }
    exports.executeLink = executeLink;
});


define('oj-c/tag-cloud/tag-cloud',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_TagCloud", "ojs/ojcontext", "./utils", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "../hooks/UNSAFE_useVizCategories/useVizCategories", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "css!oj-c/tag-cloud/tag-cloud-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, UNSAFE_TagCloud_1, Context, utils_1, UNSAFE_VisStatusMessage_1, useVizCategories_1, ojvcomponent_1, utils_2, useDataProvider_1, TemplateHandler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    function TagCloudComp({ hiddenCategories = [], data = null, highlightedCategories = [], hoverBehavior = 'none', layout = 'rectangular', selection = [], selectionMode = 'none', highlightMatch = 'all', ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: description })
                : () => { };
        }, []);
        const { data: compData } = (0, useDataProvider_1.useDataProvider)({
            data: data ? data : undefined,
            addBusyState: addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const getItemContext = (0, hooks_1.useCallback)((context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        }, []);
        const items = (0, compat_1.useMemo)(() => {
            const items = props.itemTemplate
                ? (0, TemplateHandler_1.processTemplate)(compData, props.itemTemplate, getItemContext, 'oj-c-tag-cloud-item')
                : compData.map((item) => item.data);
            return items;
        }, [props.itemTemplate, compData, getItemContext]);
        const [idItemMap, preactItems] = (0, compat_1.useMemo)(() => {
            const idItemMap = new Map();
            const preactItems = items.map((item) => {
                if (item.id != null || item.key != null)
                    idItemMap.set(item.id || item.key, item);
                return (0, utils_2.transformItem)(item);
            });
            return [idItemMap, preactItems];
        }, [items]);
        const [hasUrl, categoriesItems] = (0, compat_1.useMemo)(() => {
            let hasUrl = false;
            const categories = items.map((item, itemIndex) => {
                hasUrl = hasUrl || item.url != null;
                return { id: preactItems[itemIndex].id, categories: item.categories || [] };
            });
            return [hasUrl, categories];
        }, [preactItems, items]);
        const { hiddenIds, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', highlightMatch, props.onHiddenCategoriesChanged, props.onHighlightedCategoriesChanged);
        const itemActionHandler = (detail) => {
            const item = idItemMap.get(detail.id);
            if (item?.url) {
                (0, utils_1.executeLink)(item.url);
            }
        };
        const selectionChangeHandler = (detail) => {
            props.onSelectionChanged?.(detail.ids);
        };
        const inputHandler = (detail) => {
            if (isHighlightOn)
                updateHighlighted(detail.id);
        };
        const datatip = props.datatip != undefined
            ? (d) => {
                return {
                    content: props.datatip?.({ id: d.data.id }),
                    borderColor: undefined
                };
            }
            : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: !data || items.length === 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'] })) : ((0, jsx_runtime_1.jsx)(UNSAFE_TagCloud_1.TagCloud, { layout: layout, datatip: datatip, highlightedIds: isHighlightOn ? highlightedIds : undefined, hiddenIds: hiddenIds, accessibleLabel: props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], items: preactItems, selectionMode: selectionMode, onSelectionChange: selectionChangeHandler, onItemAction: hasUrl ? itemActionHandler : undefined, onItemInput: inputHandler, selectedIds: selectionMode === 'none' ? undefined : selection, width: "100%", height: "100%" })) }));
    }
    exports.TagCloud = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud', TagCloudComp, "TagCloud", { "properties": { "data": { "type": "DataProvider|null" }, "datatip": { "type": "function" }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "touchResponse": { "type": "string", "enumValues": ["auto", "touchStart"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "layout": { "type": "string", "enumValues": ["cloud", "rectangular"] }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true } }, "slots": { "itemTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories", "selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hiddenCategories": [], "data": null, "highlightedCategories": [], "hoverBehavior": "none", "layout": "rectangular", "selection": [], "selectionMode": "none", "highlightMatch": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tag-cloud',["require", "exports", "./tag-cloud/tag-cloud"], function (require, exports, tag_cloud_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    Object.defineProperty(exports, "TagCloud", { enumerable: true, get: function () { return tag_cloud_1.TagCloud; } });
});

define('oj-c/tag-cloud-item',["require", "exports", "./tag-cloud-item/tag-cloud-item"], function (require, exports, tag_cloud_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloudItem = void 0;
    Object.defineProperty(exports, "TagCloudItem", { enumerable: true, get: function () { return tag_cloud_item_1.TagCloudItem; } });
});


define('oj-c/message-banner/message-banner',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MessageBanner", "@oracle/oraclejet-preact/hooks/UNSAFE_useMessagesContext", "ojs/ojvcomponent", "preact/hooks", "../hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojcontext", "css!oj-c/message-banner/message-banner-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MessageBanner_1, UNSAFE_useMessagesContext_1, ojvcomponent_1, hooks_1, useDataProvider_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageBanner = void 0;
    function MessageBannerImpl({ data, detailTemplateValue, messageTemplates, type = 'section', onOjClose }) {
        const prevData = (0, hooks_1.useRef)(data);
        const rootRef = (0, hooks_1.useRef)();
        const [dpKey, setDpKey] = (0, hooks_1.useState)(0);
        const addBusyState = (0, hooks_1.useCallback)((description = 'MessageBanner: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const messagesContext = (0, hooks_1.useMemo)(() => ({ addBusyState }), [addBusyState]);
        if (data != prevData.current) {
            setDpKey((dpKey) => dpKey + 1);
            prevData.current = data;
        }
        const { data: dataArr } = (0, useDataProvider_1.useDataProvider)({
            data,
            addBusyState
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useMessagesContext_1.MessagesContext.Provider, { value: messagesContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MessageBanner_1.MessageBanner, { data: dataArr, detailRendererKey: detailTemplateValue, renderers: messageTemplates, variant: type, onClose: onOjClose }, `dp-${dpKey}`) }) }));
    }
    exports.MessageBanner = (0, ojvcomponent_1.registerCustomElement)('oj-c-message-banner', MessageBannerImpl, "MessageBanner", { "properties": { "data": { "type": "DataProvider" }, "type": { "type": "string", "enumValues": ["page", "section"] }, "detailTemplateValue": { "type": "string|function" } }, "extension": { "_DYNAMIC_SLOT": { "prop": "messageTemplates", "isTemplate": 1 } }, "events": { "ojClose": {} } }, { "type": "section" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/message-banner',["require", "exports", "./message-banner/message-banner"], function (require, exports, message_banner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageBanner = void 0;
    Object.defineProperty(exports, "MessageBanner", { enumerable: true, get: function () { return message_banner_1.MessageBanner; } });
});


define('oj-c/action-card/action-card',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ActionCard", "ojs/ojvcomponent", "css!oj-c/action-card/action-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ActionCard_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    exports.ActionCard = (0, ojvcomponent_1.registerCustomElement)('oj-c-action-card', ({ children, onOjAction }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ActionCard_1.ActionCard, { onAction: onOjAction, width: "100%", height: "100%", children: children }) }));
    }, "ActionCard", { "slots": { "": {} }, "events": { "ojAction": { "bubbles": true } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/action-card',["require", "exports", "./action-card/action-card"], function (require, exports, action_card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    Object.defineProperty(exports, "ActionCard", { enumerable: true, get: function () { return action_card_1.ActionCard; } });
});


define('oj-c/selection-card/selection-card',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectionCard", "ojs/ojvcomponent", "css!oj-c/selection-card/selection-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectionCard_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionCard = void 0;
    exports.SelectionCard = (0, ojvcomponent_1.registerCustomElement)('oj-c-selection-card', ({ children, selected }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectionCard_1.SelectionCard, { isSelected: selected, width: "100%", height: "100%", children: children }) }));
    }, "SelectionCard", { "slots": { "": {} }, "properties": { "selected": { "type": "boolean" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/selection-card',["require", "exports", "./selection-card/selection-card"], function (require, exports, selection_card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionCard = void 0;
    Object.defineProperty(exports, "SelectionCard", { enumerable: true, get: function () { return selection_card_1.SelectionCard; } });
});


define('oj-c/drawer-popup/drawer-popup',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerPopup", "ojs/ojvcomponent", "preact/hooks", "css!oj-c/drawer-popup/drawer-popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerPopup_1, ojvcomponent_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    exports.DrawerPopup = (0, ojvcomponent_1.registerCustomElement)('oj-c-drawer-popup', ({ children, opened = false, edge = 'start', modality = 'modal', autoDismiss = 'focus-loss', closeGesture = 'swipe', onOjBeforeClose, onOpenedChanged, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const onCloseHandler = async (detail) => {
            if ((detail.reason === 'outsideClick' && autoDismiss === 'focus-loss') ||
                (detail.reason === 'swipe' && closeGesture === 'swipe') ||
                detail.reason === 'escapeKey') {
                try {
                    await onOjBeforeClose?.({});
                    onOpenedChanged?.(false);
                }
                catch (_) {
                }
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_DrawerPopup_1.DrawerPopup, { isOpen: opened, placement: edge, modality: modality, onClose: onCloseHandler, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: (0, jsx_runtime_1.jsx)("div", { ref: rootRef, children: children }) }) }));
    }, "DrawerPopup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "edge": { "type": "string", "enumValues": ["end", "start", "bottom"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focus-loss"] }, "closeGesture": { "type": "string", "enumValues": ["none", "swipe"] } }, "events": { "ojBeforeClose": { "cancelable": true } }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby"] } }, { "opened": false, "edge": "start", "modality": "modal", "autoDismiss": "focus-loss", "closeGesture": "swipe" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/drawer-popup',["require", "exports", "./drawer-popup/drawer-popup"], function (require, exports, drawer_popup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    Object.defineProperty(exports, "DrawerPopup", { enumerable: true, get: function () { return drawer_popup_1.DrawerPopup; } });
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/form-layout/form-layout',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact", "@oracle/oraclejet-preact/UNSAFE_FormLayout", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent-binding", "ojs/ojvcomponent", "ojs/ojcontext"], function (require, exports, jsx_runtime_1, translationBundle_1, preact_1, UNSAFE_FormLayout_1, Layout_1, ojvcomponent_binding_1, ojvcomponent_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormLayout = void 0;
    let FormLayout = class FormLayout extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.busyContextRef = (0, preact_1.createRef)();
            this.rootRef = (0, preact_1.createRef)();
        }
        componentDidMount() {
            this.busyContextRef.current = Context.getContext(this.rootRef.current).getBusyContext();
        }
        render({ columnSpan, ...props }) {
            let preactColumns = props.maxColumns;
            let preactColumnBehavior = 'responsive';
            if (props.columns && props.columns > 0) {
                preactColumns = props.columns;
                preactColumnBehavior = 'fixed';
            }
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: this.rootRef, class: columnSpan ? Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan] : '', children: (0, jsx_runtime_1.jsx)(UNSAFE_FormLayout_1.FormLayout, { columns: preactColumns, columnBehavior: preactColumnBehavior, direction: props.direction, isFullWidth: props.fullWidth, labelEdge: props.labelEdge, labelStartWidth: props.labelStartWidth, labelWrapping: props.labelWrapping, isReadonly: props.readonly, userAssistanceDensity: props.userAssistanceDensity, children: props.children }) }));
        }
    };
    exports.FormLayout = FormLayout;
    FormLayout.defaultProps = {
        columns: 0,
        columnSpan: 1,
        direction: 'row',
        fullWidth: false,
        labelEdge: 'inside',
        labelStartWidth: '33%',
        labelWrapping: 'wrap',
        maxColumns: 1,
        userAssistanceDensity: 'efficient'
    };
    FormLayout._metadata = { "slots": { "": {} }, "properties": { "columns": { "type": "number" }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "fullWidth": { "type": "boolean" }, "labelEdge": { "type": "string", "enumValues": ["start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" }, "provide": [{ "name": "containerLabelEdge" }, { "name": "labelEdge" }] } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" }, "provide": [{ "name": "labelStartWidth" }, { "name": "labelWidth" }] } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" }, "provide": [{ "name": "labelWrapping" }] } }, "maxColumns": { "type": "number" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" }, "provide": [{ "name": "containerReadonly", "default": false }, { "name": "readonly" }] } }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" }, "provide": [{ "name": "containerUserAssistanceDensity", "default": "efficient" }, { "name": "userAssistanceDensity", "default": "efficient" }] } } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["id"] } };
    FormLayout._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    exports.FormLayout = FormLayout = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-form-layout')
    ], FormLayout);
});

define('oj-c/form-layout',["require", "exports", "./form-layout/form-layout"], function (require, exports, form_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormLayout = void 0;
    Object.defineProperty(exports, "FormLayout", { enumerable: true, get: function () { return form_layout_1.FormLayout; } });
});

define('oj-c/utils/UNSAFE_focusTabUtils/index',["require", "exports", "./focusUtils"], function (require, exports, focusUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.focusFirstTabStop = void 0;
    Object.defineProperty(exports, "focusFirstTabStop", { enumerable: true, get: function () { return focusUtils_1.focusFirstTabStop; } });
});

define('oj-c/labelled-link/useLabelledLinkPreact',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLabelledLinkPreact = void 0;
    function useLabelledLinkPreact({ 'aria-describedby': ariaDescribedBy, href, labelEdge, labelHint, labelStartWidth, target, text, textAlign, userAssistanceDensity, onOjAction }) {
        const onClickHandler = (0, hooks_1.useCallback)((event) => {
            if (href === undefined) {
                event.preventDefault();
                onOjAction?.();
            }
        }, [href, onOjAction]);
        return {
            'aria-describedby': ariaDescribedBy,
            children: text,
            href: href ?? '#',
            label: labelHint,
            labelEdge: labelEdge,
            labelStartWidth: labelStartWidth,
            target: target,
            textAlign: textAlign,
            userAssistanceDensity: userAssistanceDensity,
            onClick: onClickHandler
        };
    }
    exports.useLabelledLinkPreact = useLabelledLinkPreact;
});


define('oj-c/labelled-link/labelled-link',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_LabelledLink", "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "../utils/UNSAFE_focusTabUtils/index", "./useLabelledLinkPreact", "css!oj-c/labelled-link/labelled-link-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_LabelledLink_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, UNSAFE_useTabbableMode_1, Layout_1, ojvcomponent_1, compat_1, hooks_1, index_1, useLabelledLinkPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledLink = void 0;
    const LabelledLinkImpl = (props, ref) => {
        const containerProps = {
            isFormLayout: props.containerReadonly !== undefined,
            isReadonly: props.containerReadonly,
            labelWrapping: props.labelWrapping
        };
        const accessibleProps = {
            UNSAFE_ariaLabelledBy: props.unsafe_labelledBy
        };
        const preactProps = (0, useLabelledLinkPreact_1.useLabelledLinkPreact)(props);
        const rootRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => {
                if (rootRef.current?.contains(document.activeElement)) {
                    document.activeElement.blur();
                }
            },
            focus: () => (0, index_1.focusFirstTabStop)(rootRef.current)
        }));
        const { columnSpan = 1 } = props;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_LabelledLink_1.LabelledLink, { ...preactProps }) }) }) }));
    };
    exports.LabelledLink = (0, ojvcomponent_1.registerCustomElement)('oj-c-labelled-link', (0, compat_1.forwardRef)(LabelledLinkImpl), "LabelledLink", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "href": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "target": { "type": "string" }, "text": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } } }, "events": { "ojAction": {} }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby"] }, "methods": { "blur": {}, "focus": {} } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, {
        consume: [UNSAFE_useTabbableMode_1.TabbableModeContext]
    });
});

define('oj-c/labelled-link',["require", "exports", "./labelled-link/labelled-link"], function (require, exports, labelled_link_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledLink = void 0;
    Object.defineProperty(exports, "LabelledLink", { enumerable: true, get: function () { return labelled_link_1.LabelledLink; } });
});

define('oj-c/utils/PRIVATE_ItemsMenu/menu-item-icon',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuItemIcon = void 0;
    function MenuItemIcon(props) {
        if (props.icon.type === 'img') {
            return (0, jsx_runtime_1.jsx)("img", { src: props.icon.src });
        }
        else {
            return (0, jsx_runtime_1.jsx)("span", { class: props.icon.class });
        }
    }
    exports.MenuItemIcon = MenuItemIcon;
});

define('oj-c/utils/PRIVATE_ItemsMenu/menu-select-items',["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuSelectItems = void 0;
    function MenuSelectItems(props) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.items.map((item) => {
                return (item && ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMenuItem, { label: item.label, isDisabled: item.disabled, endIcon: item.endIcon ? (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }) : undefined, value: item.value })));
            }) }));
    }
    exports.MenuSelectItems = MenuSelectItems;
});

define('oj-c/utils/PRIVATE_ItemsMenu/items-menu',["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "./menu-select-items", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, menu_select_items_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsMenu = void 0;
    const ItemsMenu = ({ items = [], selection = {}, onSelectionChanged, onOjMenuAction }) => {
        const getSingleGroupSelection = (key) => {
            const item = selection[key];
            return item && typeof item == 'string' ? item : undefined;
        };
        const getMultipleGroupSelection = (key) => {
            const item = selection[key];
            return Array.isArray(item) ? item : [];
        };
        const setSelectionValue = (selection, key, value) => {
            const updatedSelection = { ...selection };
            if (Array.isArray(value) && value.length === 0) {
                delete updatedSelection[key];
            }
            else {
                updatedSelection[key] = value;
            }
            return updatedSelection;
        };
        const getItemActionHandler = (key, onAction) => {
            return () => {
                onAction?.();
                onOjMenuAction?.({ key });
            };
        };
        const getCommit = (key, selection) => {
            return (detail) => {
                onSelectionChanged?.(setSelectionValue(selection, key, detail.value));
            };
        };
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'divider':
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuSeparator, {});
                    case 'submenu':
                        if (item.items && item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.Submenu, { label: item.label, children: (0, jsx_runtime_1.jsx)(exports.ItemsMenu, { items: item.items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuAction: onOjMenuAction }) }));
                        }
                        return;
                    case 'selectsingle':
                        if (item.items && item.key) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectSingleMenuGroup, { value: getSingleGroupSelection(item.key), onCommit: getCommit(item.key, selection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case 'selectmultiple':
                        if (item.items && item.key) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMultipleMenuGroup, { value: getMultipleGroupSelection(item.key), onCommit: getCommit(item.key, selection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case undefined:
                    case 'item':
                        if (item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuItem, { label: item.label, isDisabled: item.disabled, variant: item.variant, startIcon: item.startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.startIcon }), endIcon: item.endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }), onAction: getItemActionHandler(item.key, item.onAction) }));
                        }
                        return;
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsMenu = ItemsMenu;
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/menu-button/menu-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MenuButton", "@oracle/oraclejet-preact/UNSAFE_IconMenuButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useToggle", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "preact", "preact/hooks", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/compat", "ojs/ojvcomponent", "ojs/ojvcomponent-binding", "oj-c/utils/PRIVATE_ItemsMenu/items-menu", "css!oj-c/menu-button/menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MenuButton_1, UNSAFE_IconMenuButton_1, UNSAFE_useToggle_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, preact_1, hooks_1, UNSAFE_mergeProps_1, compat_1, ojvcomponent_1, ojvcomponent_binding_1, items_menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuButton = void 0;
    let MenuButton = class MenuButton extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.buttonRef = (0, preact_1.createRef)();
            this.OverFlowIcon = () => {
                return (0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-overflow-h" });
            };
        }
        render(props) {
            const { chroming, label, disabled, suffix, size, items, display, startIcon, endIcon, selection, onSelectionChanged, onOjMenuAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps } = { ...props };
            const { bool: isOpen, toggle: toggleOpen } = (0, UNSAFE_useToggle_1.useToggle)();
            const widthSize = props.width ? { width: props.width } : {};
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { style: widthSize, children: display !== 'icons' || (startIcon && endIcon) ? ((0, jsx_runtime_1.jsx)(FunctionalMenuButton, { isMenuOpen: isOpen, onToggleMenu: toggleOpen, label: display === 'icons' ? (!startIcon ? label : '') : label, suffix: display === 'icons' ? (!startIcon ? suffix : '') : suffix, ref: this.buttonRef, variant: chroming, size: size, width: '100%', "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, icon: display !== 'label' ? props.startIcon : null, isDisabled: disabled, ...otherProps, children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuAction: onOjMenuAction }) })) : ((0, jsx_runtime_1.jsx)(FunctionalIconMenuButton, { isMenuOpen: isOpen, width: '100%', onToggleMenu: toggleOpen, ref: this.buttonRef, variant: chroming, isDisabled: disabled, tooltip: props.tooltip, accessibleLabel: accessibleLabel && accessibleLabel !== '' ? accessibleLabel : props.label, "aria-describedby": ariaDescribedBy, size: props.size, isIconOnly: (!props.startIcon && props.endIcon) || (!props.startIcon && !props.endIcon)
                        ? display === 'icons'
                        : false, ...otherProps, icon: props.startIcon ?? (props.endIcon ? props.endIcon : (0, jsx_runtime_1.jsx)(this.OverFlowIcon, {})), children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuAction: onOjMenuAction }) })) }));
        }
        blur() {
            this.buttonRef.current?.blur();
        }
        focus() {
            this.buttonRef.current?.focus();
        }
    };
    exports.MenuButton = MenuButton;
    MenuButton.defaultProps = {
        label: '',
        chroming: 'outlined',
        disabled: false,
        size: 'md',
        display: 'all',
        items: []
    };
    MenuButton._metadata = { "properties": { "label": { "type": "string" }, "suffix": { "type": "string" }, "tooltip": { "type": "string" }, "items": { "type": "Array<object>" }, "selection": { "type": "object", "writeback": true }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojMenuAction": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "blur": {}, "focus": {} } };
    MenuButton._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    MenuButton._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.MenuButton = MenuButton = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-menu-button')
    ], MenuButton);
    const FunctionalMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_MenuButton_1.MenuButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconMenuButton_1.IconMenuButton, { ref: iconButtonRef, ...props });
    });
});

define('oj-c/menu-button',["require", "exports", "./menu-button/menu-button"], function (require, exports, menu_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuButton = void 0;
    Object.defineProperty(exports, "MenuButton", { enumerable: true, get: function () { return menu_button_1.MenuButton; } });
});


define("corepackbundle", function(){});

