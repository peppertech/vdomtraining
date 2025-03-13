define('oj-c/hooks/UNSAFE_useVisBusyState/useVisBusyState',["require", "exports", "preact/hooks", "ojs/ojcontext"], function (require, exports, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVisBusyState = useVisBusyState;
    function useVisBusyState(rootRef, baseDescription = '') {
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            if (rootRef.current) {
                const busyContext = Context.getContext(rootRef.current).getBusyContext();
                return busyContext.addBusyState({ description: `${baseDescription}${description}` });
            }
            return () => { };
        }, [baseDescription, rootRef]);
        const busyStateContext = (0, hooks_1.useMemo)(() => ({ addBusyState }), [addBusyState]);
        return busyStateContext;
    }
});

define('oj-c/utils/UNSAFE_vizUtils/TemplateHandler',["require", "exports", "preact/compat"], function (require, exports, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processTemplate = exports.processNodeTemplate = void 0;
    const PRIVATE_VALUE_KEY = '__oj_private_do_not_use_value';
    const PRIVATE_CHECKED_KEY = '__oj_private_do_not_use_checked';
    const convertPrivatePropFromPreact = (prop, value) => {
        if (prop === PRIVATE_VALUE_KEY) {
            return { prop: 'value', value: typeof value !== 'symbol' ? value : undefined };
        }
        if (prop === PRIVATE_CHECKED_KEY) {
            return { prop: 'checked', value: typeof value !== 'symbol' ? value : undefined };
        }
        return { prop, value };
    };
    const getValidProp = (prop) => {
        return prop[0].toLowerCase() !== prop[0]
            ? prop.toLowerCase().replace(/-./g, (c) => c[1].toUpperCase())
            : prop;
    };
    const resolveProps = (props) => {
        return Object.keys(props).reduce((resolvedProps, origProp) => {
            if (origProp === 'children')
                return resolvedProps;
            const { prop, value } = convertPrivatePropFromPreact(origProp, props[origProp]);
            resolvedProps[getValidProp(prop)] = value;
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
    exports.transformItem = transformItem;
    exports.transformSeries = transformSeries;
    exports.transformGroup = transformGroup;
    exports.transformValueFormats = transformValueFormats;
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
    function transformGroup(group) {
        return {
            drilling: group.drilling,
            name: group.name,
            id: group.id,
            accessibleLabel: group.shortDesc
        };
    }
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

define('oj-c/hooks/UNSAFE_useDataProvider/utils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUpdatedItemsFromMutationDetail = getUpdatedItemsFromMutationDetail;
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
    exports.useDataProvider = useDataProvider;
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
});

define('oj-c/hooks/PRIVATE_useVisData/useVisData',["require", "exports", "preact/hooks", "../UNSAFE_useDataProvider/useDataProvider"], function (require, exports, hooks_1, useDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVisData = useVisData;
    const STATE_GRAPH = {
        initial: {
            setDP: 'fetching',
            setNoDP: 'fetched'
        },
        fetching: {
            setDP: 'fetching',
            setData: 'fetched',
            setNoDP: 'fetched'
        },
        fetched: {
            setDP: 'fetching',
            setNoDP: 'fetched'
        }
    };
    const reducer = (state, action) => {
        const nextState = STATE_GRAPH[state][action];
        return nextState || state;
    };
    function useVisData({ addBusyState, dataProvider }) {
        const [state, send] = (0, hooks_1.useReducer)(reducer, 'initial');
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: dataProvider,
            addBusyState
        });
        (0, hooks_1.useEffect)(() => {
            if (state === 'initial')
                return;
            send('setData');
        }, [data]);
        (0, hooks_1.useEffect)(() => {
            send(dataProvider ? 'setDP' : 'setNoDP');
        }, [dataProvider]);
        return {
            data,
            isLoading: state !== 'fetched'
        };
    }
});

define('oj-c/hooks/UNSAFE_useChartData/useChartData',["require", "exports", "./dataUtil", "../PRIVATE_useVisData/useVisData"], function (require, exports, dataUtil_1, useVisData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useChartData = useChartData;
    function useChartData(dataProvider, addBusyState, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator) {
        const { data, isLoading } = (0, useVisData_1.useVisData)({
            dataProvider,
            addBusyState
        });
        const { series, groups } = (0, dataUtil_1.createGroupsAndSeries)(data, itemTemplate, seriesTemplate, groupTemplate, itemElementName, seriesElementName, groupElementName, seriesComparator, groupComparator);
        const idToDPItemMap = new Map(data.map((item) => [item.key, item.data]));
        const getDataItem = (seriesIndex, groupIndex) => {
            const seriesItems = series[seriesIndex]['items'];
            return seriesItems[groupIndex];
        };
        return { series, groups, getDataItem, isLoading, idToDPItemMap };
    }
});

define('oj-c/utils/PRIVATE_chartUtils/events',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChartEventsHandler = void 0;
    exports.getIdFromDetail = getIdFromDetail;
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
    exports.LegendDefaults = void 0;
    exports.getLegendData = getLegendData;
    exports.getBLACCategoriesItems = getBLACCategoriesItems;
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
});

define('oj-c/hooks/UNSAFE_useVizCategories/useVizCategories',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useCategories"], function (require, exports, UNSAFE_useCategories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVizCategories = useVizCategories;
    function useVizCategories(categoriesItem, getCategories, hiddenCategories, highlightedCategories, hiddenMatch = 'any', highlightMatch = 'all', onHiddenCategoriesChanged, onHighlightedCategoriesChanged) {
        const { ids: hiddenIds, updateCategories: updateHidden } = (0, UNSAFE_useCategories_1.useCategories)({
            items: categoriesItem,
            getCategoriesFromItem: getCategories,
            initialCategories: hiddenCategories,
            matchCriteria: hiddenMatch,
            replace: false,
            onCategoriesChange: onHiddenCategoriesChanged
        });
        const { ids: highlightedIds, updateCategories: updateHighlighted } = (0, UNSAFE_useCategories_1.useCategories)({
            items: categoriesItem,
            getCategoriesFromItem: getCategories,
            initialCategories: highlightedCategories,
            matchCriteria: highlightMatch,
            replace: true,
            onCategoriesChange: onHighlightedCategoriesChanged
        });
        return {
            hiddenIds,
            updateHidden,
            highlightedIds,
            updateHighlighted
        };
    }
});

define('oj-c/hooks/UNSAFE_useLegendPosition/useLegendPosition',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLegendPosition = useLegendPosition;
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
});

define('oj-c/utils/PRIVATE_chartUtils/plotAreaUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPlotArea = getPlotArea;
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
});

define('oj-c/utils/PRIVATE_chartUtils/axisUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPreactAxisProps = void 0;
    const getPreactAxisProps = (axisProps) => {
        const newProps = {};
        const { tickLabel, ...rest } = axisProps;
        if (tickLabel?.converter) {
            if (Array.isArray(tickLabel.converter)) {
                newProps['format'] = [
                    (value) => tickLabel.converter[0]?.format?.(new Date(value).toISOString()),
                    (value) => tickLabel.converter[1]?.format?.(new Date(value).toISOString())
                ];
            }
            else {
                newProps['format'] = (value) => tickLabel.converter?.format?.(axisProps['timeAxisType'] ? new Date(value).toISOString() : value);
            }
        }
        newProps['isRendered'] = tickLabel?.rendered != 'off';
        newProps['style'] = tickLabel?.style;
        newProps['rotation'] = tickLabel?.rotation != 'none' ? 'autoRotate' : 'none';
        return { tickLabel: newProps, ...rest };
    };
    exports.getPreactAxisProps = getPreactAxisProps;
});

define('oj-c/utils/PRIVATE_ItemsMenu/menu-item-icon',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuItemIcon = MenuItemIcon;
    function MenuItemIcon(props) {
        if (props.icon.type === 'img') {
            return (0, jsx_runtime_1.jsx)("img", { src: props.icon.src });
        }
        else {
            return (0, jsx_runtime_1.jsx)("span", { class: props.icon.class });
        }
    }
});

define('oj-c/utils/PRIVATE_ItemsMenu/menu-select-items',["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuSelectItems = MenuSelectItems;
    function MenuSelectItems(props) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.items.map((item) => {
                return (item && ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMenuItem, { label: item.label, isDisabled: item.disabled, endIcon: item.endIcon ? (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }) : undefined, value: item.value })));
            }) }));
    }
});

define('oj-c/utils/PRIVATE_ItemsMenu/items-menu',["require", "exports", "preact/jsx-runtime", "./menu-item-icon", "./menu-select-items", "@oracle/oraclejet-preact/UNSAFE_Menu"], function (require, exports, jsx_runtime_1, menu_item_icon_1, menu_select_items_1, UNSAFE_Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsMenu = void 0;
    const ItemsMenu = ({ items = [], selection = {}, onSelectionChanged, onOjMenuAction, isSplitMenu = false, onOjMenuSelection }) => {
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
        function getCommit(key, selection, onSelection) {
            return (detail) => {
                onSelection?.({ value: detail.value, menuSelectionGroupKey: key });
                onOjMenuSelection?.({ value: detail.value, menuSelectionGroupKey: key });
                onSelectionChanged?.(setSelectionValue(selection, key, detail.value));
            };
        }
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'divider':
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuSeparator, {});
                    case 'submenu':
                        if (item.items && item.label && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.Submenu, { label: item.label, itemKey: item.key, children: (0, jsx_runtime_1.jsx)(exports.ItemsMenu, { items: item.items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) }));
                        }
                        return;
                    case 'selectsingle':
                        if (item.items && item.key && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectSingleMenuGroup, { groupKey: item.key, value: item.selection || getSingleGroupSelection(item.key), onCommit: getCommit(item.key, selection, item.onSelection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case 'selectmultiple':
                        if (item.items && item.key && !isSplitMenu) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.SelectMultipleMenuGroup, { groupKey: item.key, value: item.selection || getMultipleGroupSelection(item.key), onCommit: getCommit(item.key, selection, item.onSelection), children: (0, jsx_runtime_1.jsx)(menu_select_items_1.MenuSelectItems, { items: item.items }) }));
                        }
                        return;
                    case undefined:
                    case 'item':
                        if (item.label) {
                            return ((0, jsx_runtime_1.jsx)(UNSAFE_Menu_1.MenuItem, { itemKey: item.key, label: item.label, isDisabled: item.disabled, variant: !isSplitMenu ? item.variant : undefined, startIcon: !isSplitMenu &&
                                    item.startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.startIcon }), endIcon: !isSplitMenu &&
                                    item.endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: item.endIcon }), onAction: getItemActionHandler(item.key, item.onAction) }));
                        }
                        return;
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsMenu = ItemsMenu;
});

define('oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu',["require", "exports", "preact/jsx-runtime", "preact/hooks", "../../utils/PRIVATE_ItemsMenu/items-menu"], function (require, exports, jsx_runtime_1, hooks_1, items_menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVisContextMenu = useVisContextMenu;
    function useVisContextMenu(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, transformContext) {
        const itemsRenderer = (0, hooks_1.useCallback)((context) => {
            let itemDetail = transformContext ? transformContext(context) : context;
            if (!transformContext && context.type === 'item') {
                const preactItemId = context.data?.id;
                const itemData = idToDPItemMap.get(preactItemId);
                itemDetail = { ...context, itemData };
            }
            const items = contextMenuConfig?.items(itemDetail);
            return ((0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, onOjMenuAction: ({ key }) => {
                    onOjContextMenuAction?.({
                        menuItemKey: key,
                        contextMenuContext: itemDetail
                    });
                }, onOjMenuSelection: ({ value, menuSelectionGroupKey }) => {
                    onOjContextMenuSelection?.({
                        value,
                        contextMenuContext: itemDetail,
                        menuSelectionGroupKey
                    });
                } }));
        }, [
            contextMenuConfig?.items,
            onOjContextMenuAction,
            onOjContextMenuSelection,
            idToDPItemMap,
            transformContext
        ]);
        const preactContextMenuConfig = (0, hooks_1.useMemo)(() => {
            return {
                itemsRenderer,
                accessibleLabel: contextMenuConfig?.accessibleLabel
            };
        }, [contextMenuConfig?.accessibleLabel, itemsRenderer]);
        return { preactContextMenuConfig };
    }
});


define('oj-c/area-chart/area-chart',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_VisProgressiveLoader", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "ojs/ojvcomponent", "../hooks/UNSAFE_useChartData/useChartData", "../utils/PRIVATE_chartUtils/events", "../utils/PRIVATE_chartUtils/legendUtils", "../hooks/UNSAFE_useVizCategories/useVizCategories", "../hooks/UNSAFE_useLegendPosition/useLegendPosition", "../utils/PRIVATE_chartUtils/lineAreaUtils", "../utils/PRIVATE_chartUtils/plotAreaUtils", "../utils/PRIVATE_chartUtils/axisUtils", "oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu", "css!oj-c/area-chart/area-chart-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_VisProgressiveLoader_1, UNSAFE_LineAreaChart_1, UNSAFE_VisStatusMessage_1, UNSAFE_Legend_1, UNSAFE_ChartWithLegend_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1, ojvcomponent_1, useChartData_1, events_1, legendUtils_1, useVizCategories_1, useLegendPosition_1, lineAreaUtils_1, plotAreaUtils_1, axisUtils_1, useVisContextMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChart = void 0;
    const HIGHLIGHTED_DEFAULT = [];
    const SELECTION_DEFAULT = [];
    const HIDDEN_DEFAULT = [];
    const LEGEND_DEFAULT = { rendered: 'on', position: 'auto' };
    function AreaChartComp({ data, hideAndShowBehavior = 'none', orientation = 'vertical', xAxis, yAxis, hoverBehavior = 'none', valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling = 'off', hiddenCategories = HIDDEN_DEFAULT, highlightedCategories = HIGHLIGHTED_DEFAULT, highlightMatch = 'any', selection = SELECTION_DEFAULT, selectionMode = 'none', timeAxisType, stack = 'off', legend = LEGEND_DEFAULT, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-area-chart: ');
        const { series, groups, getDataItem, isLoading, idToDPItemMap } = (0, useChartData_1.useChartData)(data, busyStateContext.addBusyState, itemTemplate, seriesTemplate, groupTemplate, 'oj-c-area-chart-item', 'oj-c-area-chart-series', 'oj-c-area-chart-group', seriesComparator, groupComparator);
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
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection);
        const chart = series.length > 0 && groups.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_LineAreaChart_1.LineAreaChart, { type: "area", width: "100%", height: "100%", series: series, groups: groups, getDataItem: getDataItem, onItemHover: onItemInput, onItemFocus: onItemInput, drilling: drilling, dragMode: props.dragMode, onItemDrill: itemDrillHandler, onGroupDrill: groupDrillHandler, onSelectionChange: selectionChangeHandler, selectionMode: selectionMode, selectedIds: selectionMode === 'none' ? undefined : selection, orientation: orientation, xAxis: (0, axisUtils_1.getPreactAxisProps)({ ...xAxisRest, timeAxisType }), yAxis: (0, axisUtils_1.getPreactAxisProps)(yAxisRest), highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds, plotArea: (0, plotAreaUtils_1.getPlotArea)(plotArea, yMajorTick, yMinorTick, xMajorTick), hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, isStacked: stack === 'on', valueFormats: (0, lineAreaUtils_1.transformValueFormats)(valueFormats), "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined })) : (!isLoading && ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'], "aria-describedby": props['aria-describedby'], "aria-labelledby": props['aria-labelledby'] })));
        const chartLegend = isLegendRendered && legendData.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { items: legendData, orientation: legendPosition === 'start' || legendPosition === 'end' ? 'vertical' : 'horizontal', halign: "center", valign: "middle", hideAndShowBehavior: hideAndShowBehavior === 'none' ? 'off' : 'on', hoverBehavior: hoverBehavior, isReadOnly: !isLegendInteractive, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds.length === 0 ? undefined : hiddenIds, symbolHeight: legend.symbolHeight, symbolWidth: legend.symbolWidth, onItemAction: legendItemActionHandler, onItemHover: legendItemInputHandler, onItemFocus: legendItemInputHandler })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_VisProgressiveLoader_1.VisProgressiveLoader, { isLoading: isLoading, type: "area", "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], children: (0, jsx_runtime_1.jsx)(UNSAFE_ChartWithLegend_1.ChartWithLegend, { chart: chart, position: legendPosition, maxSize: legend.maxSize, size: legend.size, legend: chartLegend }) }) }) }));
    }
    exports.AreaChart = (0, ojvcomponent_1.registerCustomElement)('oj-c-area-chart', AreaChartComp, "AreaChart", { "properties": { "data": { "type": "DataProvider|null" }, "seriesComparator": { "type": "function" }, "groupComparator": { "type": "function" }, "stack": { "type": "string", "enumValues": ["off", "on"] }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "timeAxisType": { "type": "string", "enumValues": ["enabled", "mixedFrequency", "skipGaps"] }, "yAxis": { "type": "object", "properties": { "dataMax": { "type": "number" }, "dataMin": { "type": "number" }, "max": { "type": "number" }, "min": { "type": "number" }, "majorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "tickLabel": { "type": "object", "properties": { "converter": { "type": "object" }, "rendered": { "type": "string", "enumValues": ["off", "on"] }, "style": { "type": "object" } } }, "viewportMin": { "type": "number" }, "viewportMax": { "type": "number" }, "step": { "type": "number" }, "size": { "type": "number" }, "scale": { "type": "string", "enumValues": ["linear", "log"] }, "title": { "type": "string" }, "titleStyle": { "type": "object" } } }, "xAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "tickLabel": { "type": "object", "properties": { "converter": { "type": "object|Array<object>" }, "rendered": { "type": "string", "enumValues": ["off", "on"] }, "rotation": { "type": "string", "enumValues": ["auto", "none"] }, "style": { "type": "object" } } }, "viewportMin": { "type": "number" }, "viewportMax": { "type": "number" }, "step": { "type": "number" }, "size": { "type": "number" }, "scale": { "type": "string", "enumValues": ["linear", "log"] }, "title": { "type": "string" }, "titleStyle": { "type": "object" } } }, "plotArea": { "type": "object", "properties": { "backgroundColor": { "type": "string" } } }, "zoomAndScroll": { "type": "string", "enumValues": ["off", "live"] }, "valueFormats": { "type": "object", "properties": { "group": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "series": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "value": { "type": "object", "properties": { "converter": { "type": "object" }, "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } } } }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "dragMode": { "type": "string", "enumValues": ["pan", "zoom", "select", "off", "user"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["none", "withoutRescale", "withRescale"] }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "legend": { "type": "object", "properties": { "position": { "type": "string", "enumValues": ["auto", "end", "start", "top", "bottom"] }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] }, "maxSize": { "type": "number|string" }, "size": { "type": "number|string" }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" } } }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } } }, "slots": { "itemTemplate": { "data": {} }, "seriesTemplate": { "data": {} }, "groupTemplate": { "data": {} } }, "events": { "ojViewportChange": {}, "ojItemDrill": {}, "ojGroupDrill": {}, "ojSeriesDrill": {}, "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["selection", "hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hideAndShowBehavior": "none", "orientation": "vertical", "hoverBehavior": "none", "drilling": "off", "hiddenCategories": [], "highlightedCategories": [], "highlightMatch": "any", "selection": [], "selectionMode": "none", "stack": "off", "legend": { "rendered": "on", "position": "auto" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart',["require", "exports", "oj-c/area-chart/area-chart"], function (require, exports, area_chart_1) {
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
    }, "AreaChartItem", { "properties": { "seriesId": { "type": "string" }, "groupId": { "type": "Array<string>" }, "value": { "type": "number" }, "x": { "type": "string" }, "color": { "type": "string" }, "markerDisplayed": { "type": "string", "enumValues": ["auto", "off", "on"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerSize": { "type": "number" }, "categories": { "type": "Array<string>" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-item',["require", "exports", "oj-c/area-chart-item/area-chart-item"], function (require, exports, area_chart_item_1) {
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
    }, "AreaChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-series',["require", "exports", "oj-c/area-chart-series/area-chart-series"], function (require, exports, area_chart_series_1) {
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
    }, "AreaChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/area-chart-group',["require", "exports", "oj-c/area-chart-group/area-chart-group"], function (require, exports, area_chart_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AreaChartGroup = void 0;
    Object.defineProperty(exports, "AreaChartGroup", { enumerable: true, get: function () { return area_chart_group_1.AreaChartGroup; } });
});

define('oj-c/date-picker/date-picker',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_DatePicker", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, ojvcomponent_1, UNSAFE_DatePicker_1, UNSAFE_IntlDateTime_1, UNSAFE_useTabbableMode_1, UNSAFE_calendarDateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatePicker = void 0;
    exports.DatePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-date-picker', ({ dayFormatter, daysOutsideMonth = 'hidden', monthAndYearPicker = 'on', max = null, maxWidth, min = null, readonly = false, todayButton = 'visible', todayTimeZone, value = null, width, weekDisplay = 'none', onValueChanged, ...otherProps }) => {
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(value)) {
            throw new Error('value must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(min)) {
            throw new Error('min must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(max)) {
            throw new Error('max must be a date-only ISO string');
        }
        if (max && min && max < min) {
            throw new Error('max must be greater than or equal to min');
        }
        const maxCalendarDate = max ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(max) : undefined;
        const minCalendarDate = min ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(min) : undefined;
        const valueCalendarDate = value
            ? (0, UNSAFE_calendarDateUtils_1.getCalendarDateFromIso)(value)
            : undefined;
        const onCommitHandler = (0, hooks_1.useCallback)(({ value, previousValue }) => {
            if (onValueChanged && value !== previousValue) {
                value
                    ? onValueChanged((0, UNSAFE_calendarDateUtils_1.getIsoDateStr)(value.year, value.month, value.day))
                    : onValueChanged(null);
            }
        }, [onValueChanged]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, children: (0, jsx_runtime_1.jsx)(UNSAFE_DatePicker_1.DatePicker, { dayFormatter: dayFormatter ?? undefined, daysOutsideMonth: daysOutsideMonth, monthAndYearPicker: monthAndYearPicker, max: maxCalendarDate, min: minCalendarDate, isReadonly: readonly, todayButton: todayButton, todayTimeZone: todayTimeZone ?? undefined, value: valueCalendarDate, weekDisplay: weekDisplay, width: width, maxWidth: maxWidth, onCommit: onCommitHandler }) }));
    }, "DatePicker", { "properties": { "dayFormatter": { "type": "function" }, "daysOutsideMonth": { "type": "string", "enumValues": ["hidden", "selectable"] }, "monthAndYearPicker": { "type": "string", "enumValues": ["off", "on"] }, "max": { "type": "string|null" }, "maxWidth": { "type": "number|string" }, "min": { "type": "string|null" }, "readonly": { "type": "boolean" }, "todayButton": { "type": "string", "enumValues": ["hidden", "visible"] }, "todayTimeZone": { "type": "string" }, "value": { "type": "string|null", "writeback": true }, "weekDisplay": { "type": "string", "enumValues": ["number", "none"] }, "width": { "type": "number|string" } }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] } }, { "daysOutsideMonth": "hidden", "monthAndYearPicker": "on", "max": null, "min": null, "readonly": false, "todayButton": "visible", "value": null, "weekDisplay": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/date-picker',["require", "exports", "oj-c/date-picker/date-picker"], function (require, exports, date_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatePicker = void 0;
    Object.defineProperty(exports, "DatePicker", { enumerable: true, get: function () { return date_picker_1.DatePicker; } });
});


define('oj-c/dialog/dialog',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Dialog", "preact/hooks", "ojs/ojcontext", "css!oj-c/dialog/dialog-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_Dialog_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dialog = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.Dialog = (0, ojvcomponent_1.registerCustomElement)('oj-c-dialog', ({ id, header, body, footer, cancelBehavior = 'none', dialogTitle, dragAffordance = 'none', headerDecoration = 'on', launcher, modality = 'modal', opened = false, resizeBehavior = 'none', anchor, placement, offset, onOjOpen, onOjBeforeClose, onOjClose, onOjFocus, onOjDragStart, onOjDragMove, onOjDragEnd, onOjResizeStart, onOjResize, onOjResizeEnd, onOpenedChanged, width, minWidth, maxWidth, height, minHeight, maxHeight, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const anchorRef = (0, hooks_1.useRef)(null);
        const launcherRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-dialog id='${id}' is ${desc}` })
                : () => { };
        }, [id]);
        const preactRef = (0, hooks_1.useCallback)((elem) => {
            if (rootRef.current) {
                if (elem) {
                    rootRef.current[LAYER_CONTENT] = elem;
                }
                else {
                    delete rootRef.current[LAYER_CONTENT];
                }
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            return () => {
                if (resolveBusyState.current) {
                    resolveBusyState.current();
                }
            };
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
        }, [opened, addBusyState]);
        let defaultPlacement = placement;
        const isObject = (value) => {
            return typeof value === 'object' && !Array.isArray(value) && value !== null;
        };
        let localLauncher;
        if (typeof launcher === 'string') {
            const launcherEl = document.querySelector(launcher);
            if (launcherEl) {
                localLauncher = launcherEl;
            }
        }
        else if (launcher instanceof HTMLElement) {
            if (document.body.contains(launcher)) {
                localLauncher = launcher;
            }
        }
        else {
            localLauncher = document.activeElement;
        }
        if (!placement) {
            if (!anchor || anchor instanceof Window || anchor === 'window') {
                defaultPlacement = 'center';
            }
            else {
                defaultPlacement = 'bottom-start';
            }
        }
        let localAnchor;
        if (anchor instanceof Window || anchor === 'window') {
            localAnchor = undefined;
        }
        else if (typeof anchor === 'string') {
            const queriedAnchor = document.querySelector(anchor);
            localAnchor = queriedAnchor;
        }
        else if (anchor instanceof Element) {
            localAnchor = document.body.contains(anchor) ? anchor : undefined;
        }
        else if (isObject(anchor)) {
            if (typeof anchor?.x === 'number' && typeof anchor?.y === 'number') {
                localAnchor = anchor;
            }
        }
        const handleOnClose = async (detail) => {
            if (cancelBehavior != 'none') {
                try {
                    await onOjBeforeClose?.({ detail });
                    onOpenedChanged?.(false);
                }
                catch (_) {
                }
            }
        };
        const handleOnTransitionEnd = async (value) => {
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
            if (value) {
                onOjOpen?.();
            }
            else {
                onOjClose?.();
            }
        };
        const handleOnFocus = () => {
            onOjFocus?.();
        };
        const handleOnDragStart = (detail) => {
            onOjResizeStart?.(detail);
        };
        const handleOnDragMove = (detail) => {
            onOjResize?.(detail);
        };
        const handleOnDragEnd = (detail) => {
            onOjResizeEnd?.(detail);
        };
        const handleOnResizeStart = (detail) => {
            onOjResizeStart?.(detail);
        };
        const handleOnResize = (detail) => {
            onOjResize?.(detail);
        };
        const handleOnResizeEnd = (detail) => {
            onOjResizeEnd?.(detail);
        };
        const { width: flexibleCompWidth, height: flexibleCompHeight, anchorRef: flexibleCompAnchorRef, ...flexibleCompProps } = (0, UNSAFE_Dialog_1.useFlexibleComponent)({
            isDraggable: dragAffordance === 'header',
            isResizable: resizeBehavior === 'resizable',
            onDragStart: handleOnDragStart,
            onDragMove: handleOnDragMove,
            onDragEnd: handleOnDragEnd,
            onResizeStart: handleOnResizeStart,
            onResize: handleOnResize,
            onResizeEnd: handleOnResizeEnd
        });
        anchorRef.current = localAnchor;
        launcherRef.current = localLauncher;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_Dialog_1.Dialog, { ref: preactRef, header: header || dialogTitle, launcherRef: launcherRef, footer: footer, modality: modality, isOpen: opened, cancelBehavior: cancelBehavior, resizeBehavior: resizeBehavior, dragAffordance: dragAffordance, headerDecoration: headerDecoration, ...flexibleCompProps, anchorRef: flexibleCompAnchorRef || anchorRef, placement: flexibleCompAnchorRef ? defaultPlacement : placement, offset: flexibleCompAnchorRef ? 0 : offset, onClose: handleOnClose, onTransitionEnd: handleOnTransitionEnd, onFocusSet: handleOnFocus, width: flexibleCompWidth || width, minWidth: minWidth, maxWidth: maxWidth, height: flexibleCompHeight || height, minHeight: minHeight, maxHeight: maxHeight, role: otherProps['role'], "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: body }) }));
    }, "Dialog", { "slots": { "header": {}, "body": {}, "footer": {} }, "properties": { "cancelBehavior": { "type": "string", "enumValues": ["none", "icon", "escape"] }, "dialogTitle": { "type": "string" }, "dragAffordance": { "type": "string", "enumValues": ["none", "header"] }, "headerDecoration": { "type": "string", "enumValues": ["off", "on"] }, "launcher": { "type": "string|Element" }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "opened": { "type": "boolean", "writeback": true }, "resizeBehavior": { "type": "string", "enumValues": ["none", "resizable"] }, "anchor": { "type": "string|Element|object" }, "placement": { "type": "string", "enumValues": ["center", "end", "start", "top", "bottom", "top-start", "top-end", "start-top", "start-bottom", "bottom-start", "bottom-end", "end-top", "end-bottom"] }, "offset": { "type": "number|object" }, "width": { "type": "number|string" }, "minWidth": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "height": { "type": "number|string" }, "minHeight": { "type": "number|string" }, "maxHeight": { "type": "number|string" } }, "events": { "ojOpen": {}, "ojBeforeClose": { "cancelable": true }, "ojClose": {}, "ojFocus": {}, "ojDragStart": {}, "ojDragMove": {}, "ojDragEnd": {}, "ojResizeStart": {}, "ojResize": {}, "ojResizeEnd": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "role", "id"] } }, { "cancelBehavior": "none", "dragAffordance": "none", "headerDecoration": "on", "modality": "modal", "opened": false, "resizeBehavior": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/dialog',["require", "exports", "oj-c/dialog/dialog"], function (require, exports, dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dialog = void 0;
    Object.defineProperty(exports, "Dialog", { enumerable: true, get: function () { return dialog_1.Dialog; } });
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

define('oj-c/highlight-text',["require", "exports", "oj-c/highlight-text/highlight-text"], function (require, exports, highlight_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HighlightText = void 0;
    Object.defineProperty(exports, "HighlightText", { enumerable: true, get: function () { return highlight_text_1.HighlightText; } });
});

define('oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext"], function (require, exports, UNSAFE_useFormContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useMergedFormContext = useMergedFormContext;
    function useMergedFormContext({ propContainerReadonly, propLabelWrapping, propReadonly, propUserAssistanceDensity }) {
        const formContext = (0, UNSAFE_useFormContext_1.useFormContext)();
        const uadValue = propUserAssistanceDensity ?? formContext.userAssistanceDensity;
        const readonlyValue = propReadonly ?? formContext.isReadonly;
        const { isFormLayout: formContextIsFormLayout, isReadonly: formContextIsReadonly, labelWrapping: formContextLabelWrapping, ...otherFormContextProps } = formContext;
        const containerProps = {
            ...otherFormContextProps,
            isFormLayout: propContainerReadonly !== undefined || formContextIsFormLayout,
            isReadonly: propContainerReadonly ?? formContextIsReadonly,
            labelWrapping: propLabelWrapping ?? formContextLabelWrapping
        };
        return {
            containerProps,
            readonlyValue,
            uadValue
        };
    }
});

define('oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAssistiveText = useAssistiveText;
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

define('oj-c/input-date-text/useImplicitDateRangeValidator',["require", "exports", "ojs/ojvalidator-localdaterange", "preact/hooks"], function (require, exports, ojvalidator_localdaterange_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRangeValidator = useImplicitDateRangeValidator;
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
});

define('oj-c/hooks/UNSAFE_useEditableValue/utils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.treatNull = exports.normalizeValue = exports.isShallowEqual = exports.hasErrorMessages = exports.getVirtualKeyboardHintFromConverter = exports.createMessageFromError = void 0;
    const createMessageFromError = (error) => {
        if (typeof error.getMessage === 'function') {
            return {
                severity: 'error',
                detail: error.getMessage().detail
            };
        }
        return { severity: 'error', detail: error.message };
    };
    exports.createMessageFromError = createMessageFromError;
    const treatNull = (value, defaultValue) => {
        if (value === null) {
            return defaultValue;
        }
        return value;
    };
    exports.treatNull = treatNull;
    const normalizeValue = (value) => {
        if (typeof value === 'string' && value === '') {
            return null;
        }
        return value;
    };
    exports.normalizeValue = normalizeValue;
    const isShallowEqual = (a, b) => a === b || (a.length === b.length && a.every((v, i) => v === b[i]));
    exports.isShallowEqual = isShallowEqual;
    const hasErrorMessages = (messages) => {
        return !!messages && messages.some((message) => message.severity === 'error');
    };
    exports.hasErrorMessages = hasErrorMessages;
    const getVirtualKeyboardHintFromConverter = (converter) => {
        let virtualKeyboardHint;
        if (converter && converter.resolvedOptions) {
            const resOptions = converter.resolvedOptions();
            virtualKeyboardHint = resOptions?.virtualKeyboardHint ?? 'text';
        }
        else {
            virtualKeyboardHint = 'text';
        }
        return virtualKeyboardHint;
    };
    exports.getVirtualKeyboardHintFromConverter = getVirtualKeyboardHintFromConverter;
});

define('oj-c/hooks/UNSAFE_useEditableValue/converterUtils',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.format = format;
    exports.parse = parse;
    function parse(displayValue, converter, translateConverterParseError) {
        if (displayValue === undefined) {
            return { result: 'success', value: null };
        }
        if (shouldSkipParse(displayValue)) {
            return { result: 'success', value: displayValue };
        }
        try {
            return {
                result: 'success',
                value: converter.parse(displayValue)
            };
        }
        catch (error) {
            const message = translateConverterParseError?.(error) ?? (0, utils_1.createMessageFromError)(error);
            return {
                result: 'failure',
                error: message
            };
        }
    }
    function format(value, defaultValue, converter) {
        if (shouldSkipFormat(value)) {
            return { result: 'success', value: defaultValue };
        }
        try {
            return {
                result: 'success',
                value: converter.format(value)
            };
        }
        catch (error) {
            return {
                result: 'failure',
                error: (0, utils_1.createMessageFromError)(error)
            };
        }
    }
    function shouldSkipParse(value) {
        return value === '' || value === null;
    }
    function shouldSkipFormat(value) {
        return value === null;
    }
});

define('oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useStaleIdentity = useStaleIdentity;
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
});

define('oj-c/hooks/UNSAFE_useEditableValue/reducer',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reducer = reducer;
    exports.addComponentMessage = addComponentMessage;
    exports.clearAllMessages = clearAllMessages;
    exports.showHiddenMessages = showHiddenMessages;
    exports.updateComponentMessages = updateComponentMessages;
    exports.updateCustomMessages = updateCustomMessages;
    exports.updateDisplayValue = updateDisplayValue;
    exports.updateHiddenMessages = updateHiddenMessages;
    exports.updatePreviousConverter = updatePreviousConverter;
    exports.updatePreviousDeferredValidators = updatePreviousDeferredValidators;
    exports.updatePreviousDisabled = updatePreviousDisabled;
    exports.updatePreviousReadonly = updatePreviousReadonly;
    exports.updatePreviousValidators = updatePreviousValidators;
    exports.updatePreviousValue = updatePreviousValue;
    exports.updateTransientValue = updateTransientValue;
    exports.updateValidStatus = updateValidStatus;
    exports.updateValue = updateValue;
    function reducer(state, action) {
        const customMsgs = state.customMessages ?? [];
        const hiddenMsgs = state.hiddenMessages;
        const componentMsgs = state.componentMessages;
        const shownMsgs = state.shownMessages;
        switch (action.type) {
            case 'UPDATE_DISPLAY_VALUE':
                return {
                    ...state,
                    displayValue: action.payload
                };
            case 'UPDATE_VALID':
                return {
                    ...state,
                    valid: action.payload
                };
            case 'UPDATE_VALUE':
                return {
                    ...state,
                    value: action.payload
                };
            case 'UPDATE_TRANSIENT_VALUE':
                return {
                    ...state,
                    transientValue: action.payload
                };
            case 'UPDATE_PREVIOUS_CONVERTER':
                return {
                    ...state,
                    previousConverter: action.payload
                };
            case 'UPDATE_PREVIOUS_DEFERRED_VALIDATORS':
                return {
                    ...state,
                    previousDeferredValidators: action.payload
                };
            case 'UPDATE_PREVIOUS_DISABLED':
                return {
                    ...state,
                    previousDisabled: action.payload
                };
            case 'UPDATE_PREVIOUS_READONLY':
                return {
                    ...state,
                    previousReadonly: action.payload
                };
            case 'UPDATE_PREVIOUS_VALIDATORS':
                return {
                    ...state,
                    previousValidators: action.payload
                };
            case 'UPDATE_PREVIOUS_VALUE':
                return {
                    ...state,
                    previousValue: action.payload
                };
            case 'UPDATE_COMPONENT_MESSAGES':
                return {
                    ...state,
                    componentMessages: action.payload,
                    shownMessages: [...customMsgs, ...action.payload]
                };
            case 'UPDATE_HIDDEN_MESSAGES':
                return {
                    ...state,
                    hiddenMessages: action.payload
                };
            case 'UPDATE_CUSTOM_MESSAGES':
                return {
                    ...state,
                    customMessages: action.payload,
                    shownMessages: [...action.payload, ...componentMsgs]
                };
            case 'CLEAR_ALL_MESSAGES':
                return {
                    ...state,
                    shownMessages: [],
                    hiddenMessages: [],
                    customMessages: [],
                    componentMessages: []
                };
            case 'ADD_COMPONENT_MESSAGE':
                return {
                    ...state,
                    componentMessages: [...componentMsgs, action.payload],
                    shownMessages: [...shownMsgs, action.payload]
                };
            case 'SHOW_HIDDEN_MESSAGES':
                return hiddenMsgs.length === 0
                    ? state
                    : {
                        ...state,
                        hiddenMessages: [],
                        shownMessages: [...customMsgs, ...componentMsgs, ...hiddenMsgs]
                    };
            default:
                return state;
        }
    }
    function updateDisplayValue(dispatch, displayValue, { onRawValueChanged }) {
        dispatch({ type: 'UPDATE_DISPLAY_VALUE', payload: displayValue });
        onRawValueChanged?.(displayValue);
    }
    function updateValidStatus(dispatch, state, { onValidChanged }) {
        dispatch({ type: 'UPDATE_VALID', payload: state });
        onValidChanged?.(state);
    }
    function updateValue(dispatch, value, { onValueChanged }) {
        dispatch({ type: 'UPDATE_VALUE', payload: value });
        onValueChanged?.(value);
    }
    function updateTransientValue(dispatch, transientValue, { onTransientValueChanged }) {
        dispatch({ type: 'UPDATE_TRANSIENT_VALUE', payload: transientValue });
        onTransientValueChanged?.(transientValue);
    }
    function updateComponentMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_COMPONENT_MESSAGES', payload: messages });
    }
    function updateHiddenMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_HIDDEN_MESSAGES', payload: messages });
    }
    function updateCustomMessages(dispatch, messages) {
        dispatch({ type: 'UPDATE_CUSTOM_MESSAGES', payload: messages });
    }
    function updatePreviousValue(dispatch, value) {
        dispatch({ type: 'UPDATE_PREVIOUS_VALUE', payload: value });
    }
    function updatePreviousConverter(dispatch, converter) {
        dispatch({ type: 'UPDATE_PREVIOUS_CONVERTER', payload: converter });
    }
    function updatePreviousDeferredValidators(dispatch, validators) {
        dispatch({ type: 'UPDATE_PREVIOUS_DEFERRED_VALIDATORS', payload: validators });
    }
    function updatePreviousDisabled(dispatch, disabled) {
        dispatch({ type: 'UPDATE_PREVIOUS_DISABLED', payload: disabled });
    }
    function updatePreviousReadonly(dispatch, readonly) {
        dispatch({ type: 'UPDATE_PREVIOUS_READONLY', payload: readonly });
    }
    function updatePreviousValidators(dispatch, validators) {
        dispatch({ type: 'UPDATE_PREVIOUS_VALIDATORS', payload: validators });
    }
    function clearAllMessages(dispatch, _value, { onMessagesCustomChanged }) {
        dispatch({ type: 'CLEAR_ALL_MESSAGES' });
        onMessagesCustomChanged?.([]);
    }
    function showHiddenMessages(dispatch) {
        dispatch({ type: 'SHOW_HIDDEN_MESSAGES' });
    }
    function addComponentMessage(dispatch, message) {
        dispatch({ type: 'ADD_COMPONENT_MESSAGE', payload: message });
    }
});

define('oj-c/hooks/UNSAFE_useEditableValue/validationUtils',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAsync = validateAsync;
    exports.validateSync = validateSync;
    function validateSync({ validators, value }) {
        const errors = [];
        for (const validator of validators) {
            try {
                validator.validate(value);
            }
            catch (error) {
                errors.push((0, utils_1.createMessageFromError)(error));
            }
        }
        if (errors.length) {
            return { result: 'failure', errors };
        }
        return { result: 'success' };
    }
    function validateAsync({ validators, value }) {
        const doValidate = (validator, value) => {
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
        };
        const errors = [];
        const maybeErrorPromises = [];
        for (const validator of validators) {
            const maybeComponentMessageItem = doValidate(validator, value);
            if (maybeComponentMessageItem !== undefined) {
                if (maybeComponentMessageItem instanceof Promise) {
                    maybeErrorPromises.push(maybeComponentMessageItem);
                }
                else {
                    errors.push(maybeComponentMessageItem);
                }
            }
        }
        return {
            errors,
            maybeErrorPromises
        };
    }
});

define('oj-c/hooks/UNSAFE_useEditableValue/useEditableValue',["require", "exports", "preact/hooks", "./converterUtils", "./utils", "oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity", "./reducer", "./validationUtils"], function (require, exports, hooks_1, converterUtils_1, utils_1, useStaleIdentity_1, reducer_1, validationUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValue = useEditableValue;
    function useEditableValue({ addBusyState, ariaDescribedBy, converter, defaultDisplayValue, deferredValidators, disabled, displayOptions, messagesCustom, onDisplayValueChanged, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged: propOnValidChanged, onValueChanged, translateConverterParseError, readonly, validators, value }) {
        const initialRender = (0, hooks_1.useRef)(true);
        const { setStaleIdentity } = (0, useStaleIdentity_1.useStaleIdentity)();
        const [state, dispatch] = (0, hooks_1.useReducer)((reducer_1.reducer), {
            shownMessages: [],
            hiddenMessages: [],
            customMessages: messagesCustom,
            componentMessages: [],
            value: value,
            valid: 'pending'
        }, (args) => {
            const conversion = converter
                ? (0, converterUtils_1.format)(value, defaultDisplayValue, converter)
                : { result: 'success', value: (0, utils_1.treatNull)(value, defaultDisplayValue) };
            return {
                ...args,
                displayValue: conversion.result === 'success' ? conversion.value : defaultDisplayValue
            };
        });
        const currentValidRef = (0, hooks_1.useRef)();
        const onValidChanged = (0, hooks_1.useCallback)((newValid) => {
            if (newValid !== currentValidRef.current) {
                currentValidRef.current = newValid;
                propOnValidChanged?.(newValid);
            }
        }, [propOnValidChanged]);
        const _dispatch = (0, hooks_1.useCallback)((updateFn, payload) => {
            updateFn(dispatch, payload, {
                onMessagesCustomChanged,
                onRawValueChanged,
                onTransientValueChanged,
                onValidChanged,
                onValueChanged
            });
            return true;
        }, [
            dispatch,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged
        ]);
        const validateDeferredSync = (0, hooks_1.useCallback)((value) => {
            const valueToSendToDeferredValidation = typeof value === 'string' ? value.trim() : value;
            const deferredValidate = (0, validationUtils_1.validateSync)({
                validators: deferredValidators ?? [],
                value: valueToSendToDeferredValidation
            });
            return deferredValidate;
        }, [deferredValidators]);
        const setValue = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.updateValue, value);
        }, [_dispatch]);
        const setDisplayValue = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.updateDisplayValue, value);
        }, [_dispatch]);
        const setTransientValue = (0, hooks_1.useCallback)((transientValue) => {
            _dispatch(reducer_1.updateTransientValue, transientValue);
        }, [_dispatch]);
        const formatValue = (0, hooks_1.useCallback)((value) => {
            let newDisplayValue;
            if (!converter) {
                newDisplayValue = (0, utils_1.treatNull)(value, defaultDisplayValue);
            }
            else {
                const conversion = (0, converterUtils_1.format)(value, defaultDisplayValue, converter);
                if (conversion.result === 'failure') {
                    _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                    _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                    newDisplayValue = (0, utils_1.treatNull)(value, defaultDisplayValue);
                }
                else {
                    newDisplayValue = conversion.value;
                }
            }
            return newDisplayValue;
        }, [converter, defaultDisplayValue, _dispatch]);
        const refreshDisplayValue = (0, hooks_1.useCallback)((value) => {
            const newDisplayValue = formatValue(value);
            _dispatch(reducer_1.updateDisplayValue, newDisplayValue);
            onDisplayValueChanged?.();
            return true;
        }, [_dispatch, formatValue, onDisplayValueChanged]);
        const getValueForValidation = (0, hooks_1.useCallback)(() => {
            if (state.valid !== 'invalidShown') {
                return { result: 'success', value: state.value };
            }
            if (!converter) {
                return { result: 'success', value: (0, utils_1.normalizeValue)(state.displayValue) };
            }
            return (0, converterUtils_1.parse)((0, utils_1.normalizeValue)(state.displayValue), converter, translateConverterParseError);
        }, [converter, state.displayValue, state.valid, state.value, translateConverterParseError]);
        const normalizeAndParseValue = (0, hooks_1.useCallback)((value) => {
            if (!converter) {
                return {
                    result: 'success',
                    value: (0, utils_1.normalizeValue)(value)
                };
            }
            return (0, converterUtils_1.parse)((0, utils_1.normalizeValue)(value), converter, translateConverterParseError);
        }, [converter, translateConverterParseError]);
        const parseValue = (0, hooks_1.useCallback)((value) => {
            const conversion = normalizeAndParseValue(value);
            if (conversion.result === 'failure') {
                _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            }
            return conversion;
        }, [_dispatch, normalizeAndParseValue]);
        const fullValidate = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { doNotClearMessagesCustom = false } = options;
            const hasCustomErrorMessages = doNotClearMessagesCustom && (0, utils_1.hasErrorMessages)(messagesCustom);
            if (doNotClearMessagesCustom) {
                _dispatch(reducer_1.updateComponentMessages, []);
                _dispatch(reducer_1.updateHiddenMessages, []);
            }
            else {
                _dispatch(reducer_1.clearAllMessages);
            }
            if ((!validators || validators.length === 0) &&
                (!deferredValidators || deferredValidators.length === 0)) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
                return true;
            }
            const errors = [];
            const deferredValidate = validateDeferredSync(value);
            deferredValidate.result === 'failure' && errors.push(...deferredValidate.errors);
            let nonDeferredValidate = undefined;
            if (value !== null && value !== undefined) {
                nonDeferredValidate = (0, validationUtils_1.validateAsync)({ validators: validators ?? [], value });
            }
            errors.push(...(nonDeferredValidate?.errors ?? []));
            const maybeErrorPromises = nonDeferredValidate?.maybeErrorPromises ?? [];
            if (!errors.length && !maybeErrorPromises.length) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
                return true;
            }
            const hasSyncError = errors.length !== 0;
            hasSyncError &&
                _dispatch(reducer_1.updateComponentMessages, errors) &&
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            if (!maybeErrorPromises.length) {
                return !hasSyncError;
            }
            !hasSyncError && _dispatch(reducer_1.updateValidStatus, 'pending');
            const resolver = addBusyState?.('running asynchronous validation');
            const { isStale } = setStaleIdentity('useEditableValue-full-validate');
            let hasAsyncError = false;
            const asyncValidations = [];
            for (const maybeErrorPromise of maybeErrorPromises) {
                const asyncValidation = maybeErrorPromise.then((maybeValidationError) => {
                    if (maybeValidationError && !isStale()) {
                        _dispatch(reducer_1.addComponentMessage, maybeValidationError);
                        _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                        hasAsyncError = true;
                    }
                });
                asyncValidations.push(asyncValidation);
            }
            await Promise.all(asyncValidations);
            if (!hasSyncError && !hasAsyncError && !isStale()) {
                _dispatch(reducer_1.updateValidStatus, hasCustomErrorMessages ? 'invalidShown' : 'valid');
            }
            resolver?.();
            return !hasSyncError && !hasAsyncError;
        }, [
            addBusyState,
            _dispatch,
            deferredValidators,
            messagesCustom,
            setStaleIdentity,
            validateDeferredSync,
            validators
        ]);
        const runFullValidationAndUpdateValue = async () => {
            if (disabled || readonly)
                return;
            const conversion = getValueForValidation();
            if (conversion.result === 'failure') {
                _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                return;
            }
            const newValue = conversion.value;
            const validated = await validateValueOnInternalChange(newValue, {
                doNotClearMessagesCustom: true
            });
            validated && _dispatch(reducer_1.updateValue, newValue) && refreshDisplayValue(newValue);
        };
        const validateValueOnExternalChange = (0, hooks_1.useCallback)((value) => {
            _dispatch(reducer_1.clearAllMessages);
            const validated = validateDeferredSync(value);
            validated.result === 'failure' && _dispatch(reducer_1.updateHiddenMessages, validated.errors);
            _dispatch(reducer_1.updateValidStatus, validated.result === 'failure' ? 'invalidHidden' : 'valid');
            return true;
        }, [_dispatch, validateDeferredSync]);
        const validateValueOnInternalChange = (0, hooks_1.useCallback)(async (value, options = {}) => {
            const { isStale } = setStaleIdentity('useEditableValue-validateValueOnInternalChange');
            const resolver = addBusyState?.('Running validateValueOnInternalChange');
            const validationResult = await fullValidate(value, options);
            resolver?.();
            if (isStale()) {
                return false;
            }
            return validationResult;
        }, [addBusyState, fullValidate, setStaleIdentity]);
        const onCommitValue = (0, hooks_1.useCallback)(async (value, doCommitOnValid = true) => {
            const validated = await validateValueOnInternalChange(value);
            validated && doCommitOnValid && _dispatch(reducer_1.updateValue, value);
            return validated;
        }, [_dispatch, validateValueOnInternalChange]);
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            const conversion = parseValue(value);
            if (conversion.result === 'failure') {
                return false;
            }
            const parsedValue = conversion.value;
            const succeeded = await onCommitValue(parsedValue);
            succeeded && refreshDisplayValue(parsedValue);
            return succeeded;
        }, [onCommitValue, parseValue, refreshDisplayValue]);
        const onInput = (0, hooks_1.useCallback)(({ value }) => {
            _dispatch(reducer_1.updateDisplayValue, value ?? defaultDisplayValue);
        }, [_dispatch, defaultDisplayValue]);
        const validate = (0, hooks_1.useCallback)(async () => {
            if (readonly || disabled) {
                return 'valid';
            }
            const conversion = parseValue(state.displayValue);
            if (conversion.result === 'failure') {
                return 'invalid';
            }
            const newValue = conversion.value;
            const resolver = addBusyState?.('Running component method validate');
            const validated = await fullValidate(newValue);
            resolver?.();
            if (validated) {
                if (newValue !== state.value) {
                    _dispatch(reducer_1.updateValue, newValue);
                    refreshDisplayValue(newValue);
                }
                return 'valid';
            }
            return 'invalid';
        }, [
            addBusyState,
            disabled,
            _dispatch,
            fullValidate,
            parseValue,
            readonly,
            refreshDisplayValue,
            state.displayValue,
            state.value
        ]);
        const reset = (0, hooks_1.useCallback)(() => {
            validateValueOnExternalChange(state.value);
            refreshDisplayValue(state.value);
        }, [refreshDisplayValue, state.value, validateValueOnExternalChange]);
        const showMessages = (0, hooks_1.useCallback)(() => {
            if (state.hiddenMessages && state.hiddenMessages.length > 0) {
                _dispatch(reducer_1.showHiddenMessages);
                _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            }
        }, [_dispatch, state.hiddenMessages]);
        if (!initialRender.current && state.previousValue !== value) {
            _dispatch(reducer_1.updatePreviousValue, value);
            if (value !== state.value) {
                validateValueOnExternalChange(value);
                _dispatch(reducer_1.updateValue, value);
                refreshDisplayValue(value);
            }
        }
        if (!initialRender.current && state.previousConverter !== converter) {
            _dispatch(reducer_1.updatePreviousConverter, converter);
            state.valid !== 'invalidShown' && refreshDisplayValue(value);
            state.valid === 'invalidShown' && runFullValidationAndUpdateValue();
        }
        if (!initialRender.current && state.previousValidators !== validators) {
            _dispatch(reducer_1.updatePreviousValidators, validators);
            state.valid === 'invalidShown' && runFullValidationAndUpdateValue();
        }
        if (!initialRender.current &&
            ((!state.customMessages && messagesCustom) ||
                (state.customMessages && !messagesCustom) ||
                (state.customMessages &&
                    messagesCustom &&
                    !(0, utils_1.isShallowEqual)(state.customMessages, messagesCustom)))) {
            const compMsgs = state.componentMessages ?? [];
            const hiddenMsgs = state.hiddenMessages ?? [];
            const customMsgs = messagesCustom ?? [];
            const hasErrors = (0, utils_1.hasErrorMessages)(customMsgs);
            const hasHiddenMessages = hiddenMsgs.length > 0;
            const hasNoMessages = compMsgs.length === 0 && hiddenMsgs.length === 0 && customMsgs.length === 0;
            _dispatch(reducer_1.updateCustomMessages, customMsgs);
            hasErrors && _dispatch(reducer_1.updateValidStatus, 'invalidShown');
            !hasErrors &&
                state.valid !== 'pending' &&
                ((hasNoMessages && _dispatch(reducer_1.updateValidStatus, 'valid')) ||
                    (hasHiddenMessages && _dispatch(reducer_1.updateValidStatus, 'invalidHidden')));
        }
        if (!initialRender.current &&
            (state.previousDeferredValidators !== deferredValidators ||
                state.previousDisabled !== disabled ||
                state.previousReadonly !== readonly)) {
            const isRequiredToggledToFalse = deferredValidators?.length === 0;
            state.previousDeferredValidators !== deferredValidators &&
                _dispatch(reducer_1.updatePreviousDeferredValidators, deferredValidators);
            state.previousDisabled !== disabled && _dispatch(reducer_1.updatePreviousDisabled, disabled);
            state.previousReadonly !== readonly && _dispatch(reducer_1.updatePreviousReadonly, readonly);
            if (isRequiredToggledToFalse || (!readonly && !disabled)) {
                switch (state.valid) {
                    case 'valid':
                        const conversion = getValueForValidation();
                        if (conversion.result === 'failure') {
                            _dispatch(reducer_1.updateComponentMessages, [conversion.error]);
                            _dispatch(reducer_1.updateValidStatus, 'invalidShown');
                        }
                        else {
                            const deferredValidate = validateDeferredSync(conversion.value);
                            deferredValidate.result === 'failure' &&
                                _dispatch(reducer_1.updateHiddenMessages, deferredValidate.errors) &&
                                _dispatch(reducer_1.updateValidStatus, 'invalidHidden');
                        }
                        break;
                    case 'invalidHidden':
                        if (deferredValidators?.length === 0) {
                            _dispatch(reducer_1.updateValidStatus, 'valid');
                            _dispatch(reducer_1.updateHiddenMessages, []);
                        }
                        break;
                    case 'invalidShown':
                        runFullValidationAndUpdateValue();
                        break;
                }
            }
        }
        if (initialRender.current) {
            initialRender.current = false;
        }
        (0, hooks_1.useEffect)(() => {
            _dispatch(reducer_1.updatePreviousValue, value);
            _dispatch(reducer_1.updatePreviousConverter, converter);
            _dispatch(reducer_1.updatePreviousValidators, validators);
            _dispatch(reducer_1.updatePreviousDeferredValidators, deferredValidators);
            _dispatch(reducer_1.updatePreviousDisabled, disabled);
            _dispatch(reducer_1.updatePreviousReadonly, readonly);
            _dispatch(reducer_1.updateCustomMessages, messagesCustom);
            _dispatch(reducer_1.updateTransientValue, value);
            if (!disabled && !readonly) {
                const validated = validateDeferredSync(value);
                validated.result === 'failure' &&
                    _dispatch(reducer_1.updateHiddenMessages, validated.errors) &&
                    _dispatch(reducer_1.updateValidStatus, (0, utils_1.hasErrorMessages)(messagesCustom) ? 'invalidShown' : 'invalidHidden');
                validated.result === 'success' &&
                    _dispatch(reducer_1.updateValidStatus, (0, utils_1.hasErrorMessages)(messagesCustom) ? 'invalidShown' : 'valid') &&
                    refreshDisplayValue(value);
            }
            else {
                _dispatch(reducer_1.updateValidStatus, 'valid');
                refreshDisplayValue(value);
            }
        }, []);
        return {
            value: state.value,
            displayValue: state.displayValue,
            formatValue,
            methods: {
                reset,
                showMessages,
                validate
            },
            onCommitValue,
            parseValue,
            refreshDisplayValue,
            setDisplayValue,
            setTransientValue,
            setValue,
            textFieldProps: {
                'aria-describedby': ariaDescribedBy,
                messages: displayOptions?.messages !== 'none' ? state.shownMessages : undefined,
                onCommit,
                onInput,
                value: state.displayValue
            },
            validateValueOnExternalChange
        };
    }
});

define('oj-c/hooks/UNSAFE_useEditableValue/index',["require", "exports", "./utils", "./useEditableValue"], function (require, exports, utils_1, useEditableValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useEditableValue = exports.treatNull = exports.getVirtualKeyboardHintFromConverter = void 0;
    Object.defineProperty(exports, "getVirtualKeyboardHintFromConverter", { enumerable: true, get: function () { return utils_1.getVirtualKeyboardHintFromConverter; } });
    Object.defineProperty(exports, "treatNull", { enumerable: true, get: function () { return utils_1.treatNull; } });
    Object.defineProperty(exports, "useEditableValue", { enumerable: true, get: function () { return useEditableValue_1.useEditableValue; } });
});

define('oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators',["require", "exports", "ojs/ojvalidator-required", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, RequiredValidator, hooks_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDeferredValidators = useDeferredValidators;
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
});

define('oj-c/input-date-mask/useInputDateMaskPreact',["require", "exports", "./CalendarDateConverter", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "ojs/ojconverter-preferences", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "oj-c/input-date-text/useImplicitDateRangeValidator", "ojs/ojconfig", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, CalendarDateConverter_1, hooks_1, UNSAFE_useTranslationBundle_1, ojconverter_preferences_1, UNSAFE_calendarDateUtils_1, useImplicitDateRangeValidator_1, ojconfig_1, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMasksFromDatePatternPreferences = void 0;
    exports.useInputDateMaskPreact = useInputDateMaskPreact;
    function useInputDateMaskPreact({ dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const calendarDateConverter_parseErrorFn = translations.calendarDateConverter_parseError;
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return (0, exports.getMasksFromDatePatternPreferences)();
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
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: implicitConverter,
            defaultDisplayValue: undefined,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: combinedValidators,
            value: propValue
        });
        const hasNoValue = value === undefined || !isPartialDate(textFieldProps.value);
        return {
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
    exports.getMasksFromDatePatternPreferences = getMasksFromDatePatternPreferences;
});


define('oj-c/input-date-mask/input-date-mask',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputDateMaskPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "css!oj-c/input-date-mask/input-date-mask-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputDateMask_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputDateMaskPreact_1, Layout_1, UNSAFE_IntlDateTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const InputDateMaskImpl = ({ columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputDateMaskRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'InputDateMask: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)({
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
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
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(value)) {
            throw new Error('value must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.min)) {
            throw new Error('min must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.max)) {
            throw new Error('max must be a date-only ISO string');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputDateMask_1.InputDateMask, { ref: inputDateMaskRef, ...assistiveTextProps, ...inputDateMaskProps, variant: variant }) }) }));
    };
    exports.InputDateMask = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-date-mask', (0, compat_1.forwardRef)(InputDateMaskImpl), "InputDateMask", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-date-mask',["require", "exports", "oj-c/input-date-mask/input-date-mask"], function (require, exports, input_date_mask_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateMask = void 0;
    Object.defineProperty(exports, "InputDateMask", { enumerable: true, get: function () { return input_date_mask_1.InputDateMask; } });
});

define('oj-c/input-date-picker/useCombinedImplicitValidators',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCombinedImplicitValidators = void 0;
    const useCombinedImplicitValidators = (...validators) => (0, hooks_1.useMemo)(() => ({
        validate(value) {
            for (const validator of validators) {
                validator?.validate(value);
            }
        }
    }), [...validators]);
    exports.useCombinedImplicitValidators = useCombinedImplicitValidators;
});

define('oj-c/input-date-picker/useImplicitCalendarDateConverter',["require", "exports", "oj-c/input-date-mask/CalendarDateConverter", "oj-c/input-date-mask/useInputDateMaskPreact", "preact/hooks"], function (require, exports, CalendarDateConverter_1, useInputDateMaskPreact_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitCalendarDateConverter = void 0;
    const useImplicitCalendarDateConverter = ({ calendarDateConverter_parseErrorFn }) => {
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return (0, useInputDateMaskPreact_1.getMasksFromDatePatternPreferences)();
        }, []);
        return (0, hooks_1.useMemo)(() => {
            return new CalendarDateConverter_1.CalendarDateConverter({
                calendarDateConverter_parseErrorFn,
                customMask: masksFromUserPref
            });
        }, [calendarDateConverter_parseErrorFn, masksFromUserPref]);
    };
    exports.useImplicitCalendarDateConverter = useImplicitCalendarDateConverter;
});

define('oj-c/input-date-picker/utils',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils"], function (require, exports, UNSAFE_calendarDateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertCompleteDate = exports.compareCalendarDates = void 0;
    const compareCalendarDates = (val1, val2) => {
        if (val1.year === val2.year && val1.month === val2.month && val1.day === val2.day) {
            return 0;
        }
        if (val1.year === val2.year) {
            if (val1.month === val2.month) {
                return val1.day > val2.day ? 1 : -1;
            }
            return val1.month > val2.month ? 1 : -1;
        }
        return val1.year > val2.year ? 1 : -1;
    };
    exports.compareCalendarDates = compareCalendarDates;
    const assertCompleteDate = (date) => {
        if (!(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarDate)(date))
            throw new Error('DateRestrictionValidator: Expected full date, but received partial date');
    };
    exports.assertCompleteDate = assertCompleteDate;
});

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
define('oj-c/input-date-picker/DateRangeValidator',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var _DateRangeValidator_instances, _DateRangeValidator_getOverflowErrorDetail, _DateRangeValidator_getUnderflowErrorDetail;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateRangeValidator = void 0;
    class DateRangeValidator {
        constructor(options) {
            _DateRangeValidator_instances.add(this);
            if (options.min && options.max && (0, utils_1.compareCalendarDates)(options.min, options.max) > 0) {
                throw new Error('min must be less than max');
            }
            this.options = options;
        }
        validate(value) {
            if (value === null)
                return;
            const { converter, max, min } = this.options;
            const valueCalendarDate = converter.format(value);
            (0, utils_1.assertCompleteDate)(valueCalendarDate);
            if (max && (0, utils_1.compareCalendarDates)(valueCalendarDate, max) > 0) {
                throw new Error(__classPrivateFieldGet(this, _DateRangeValidator_instances, "m", _DateRangeValidator_getOverflowErrorDetail).call(this, value, max));
            }
            if (min && (0, utils_1.compareCalendarDates)(valueCalendarDate, min) < 0) {
                throw new Error(__classPrivateFieldGet(this, _DateRangeValidator_instances, "m", _DateRangeValidator_getUnderflowErrorDetail).call(this, value, min));
            }
        }
    }
    exports.DateRangeValidator = DateRangeValidator;
    _DateRangeValidator_instances = new WeakSet(), _DateRangeValidator_getOverflowErrorDetail = function _DateRangeValidator_getOverflowErrorDetail(value, max) {
        const { converter, dateRangeOverflowMessageDetail, defaultRangeOverflowMessageDetailFn, formatObj } = this.options;
        const isoMax = converter.parse(max);
        const maxString = formatObj.format(isoMax);
        if (dateRangeOverflowMessageDetail) {
            const valueString = formatObj.format(value);
            return dateRangeOverflowMessageDetail({ value: valueString, max: maxString });
        }
        return defaultRangeOverflowMessageDetailFn({ max: maxString });
    }, _DateRangeValidator_getUnderflowErrorDetail = function _DateRangeValidator_getUnderflowErrorDetail(value, min) {
        const { converter, dateRangeUnderflowMessageDetail, defaultRangeUnderflowMessageDetailFn, formatObj } = this.options;
        const isoMin = converter.parse(min);
        const minString = formatObj.format(isoMin);
        if (dateRangeUnderflowMessageDetail) {
            const valueString = formatObj.format(value);
            return dateRangeUnderflowMessageDetail({ value: valueString, min: minString });
        }
        return defaultRangeUnderflowMessageDetailFn({ min: minString });
    };
});

define('oj-c/input-date-picker/useImplicitDateRangeValidator',["require", "exports", "preact/hooks", "./DateRangeValidator"], function (require, exports, hooks_1, DateRangeValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRangeValidator = void 0;
    const useImplicitDateRangeValidator = ({ converter, defaultRangeOverflowMessageDetailFn, defaultRangeUnderflowMessageDetailFn, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, formatObj, max, min }) => (0, hooks_1.useMemo)(() => {
        if (!min && !max)
            return undefined;
        return new DateRangeValidator_1.DateRangeValidator({
            converter,
            defaultRangeOverflowMessageDetailFn,
            defaultRangeUnderflowMessageDetailFn,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            formatObj,
            max,
            min
        });
    }, [
        converter,
        defaultRangeOverflowMessageDetailFn,
        defaultRangeUnderflowMessageDetailFn,
        dateRangeOverflowMessageDetail,
        dateRangeUnderflowMessageDetail,
        formatObj,
        max,
        min
    ]);
    exports.useImplicitDateRangeValidator = useImplicitDateRangeValidator;
});

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
define('oj-c/input-date-picker/DateRestrictionValidator',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    var _DateRestrictionValidator_instances, _DateRestrictionValidator_getErrorDetail, _DateRestrictionValidator_getDayState;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateRestrictionValidator = void 0;
    class DateRestrictionValidator {
        constructor(options) {
            _DateRestrictionValidator_instances.add(this);
            this.options = options;
        }
        validate(value) {
            if (value == null)
                return;
            const valueCalendarDate = this.options.converter.format(value);
            const { state } = __classPrivateFieldGet(this, _DateRestrictionValidator_instances, "m", _DateRestrictionValidator_getDayState).call(this, valueCalendarDate);
            if (state === 'enabled')
                return;
            throw new Error(__classPrivateFieldGet(this, _DateRestrictionValidator_instances, "m", _DateRestrictionValidator_getErrorDetail).call(this, value, state));
        }
    }
    exports.DateRestrictionValidator = DateRestrictionValidator;
    _DateRestrictionValidator_instances = new WeakSet(), _DateRestrictionValidator_getErrorDetail = function _DateRestrictionValidator_getErrorDetail(value, state) {
        if (this.options.dateRestrictionMessageDetail)
            return this.options.dateRestrictionMessageDetail({ state, value });
        return this.options.defaultRestrictionMessageDetail();
    }, _DateRestrictionValidator_getDayState = function _DateRestrictionValidator_getDayState(date) {
        (0, utils_1.assertCompleteDate)(date);
        return this.options.dayFormatter(date);
    };
});

define('oj-c/input-date-picker/useImplicitDateRestrictionValidator',["require", "exports", "preact/hooks", "./DateRestrictionValidator"], function (require, exports, hooks_1, DateRestrictionValidator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateRestrictionValidator = void 0;
    const useImplicitDateRestrictionValidator = ({ converter, dateRestrictionMessageDetail, dayFormatter, defaultRestrictionMessageDetail }) => (0, hooks_1.useMemo)(() => {
        if (!dayFormatter)
            return undefined;
        return new DateRestrictionValidator_1.DateRestrictionValidator({
            converter,
            dateRestrictionMessageDetail,
            dayFormatter,
            defaultRestrictionMessageDetail
        });
    }, [converter, dateRestrictionMessageDetail, dayFormatter, defaultRestrictionMessageDetail]);
    exports.useImplicitDateRestrictionValidator = useImplicitDateRestrictionValidator;
});

define('oj-c/input-date-picker/useInputDatePicker',["require", "exports", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "oj-c/input-date-mask/useInputDateMaskPreact", "preact/hooks", "./useCombinedImplicitValidators", "./useImplicitCalendarDateConverter", "./useImplicitDateRangeValidator", "./useImplicitDateRestrictionValidator", "./utils", "ojs/ojcontext", "ojs/ojconfig"], function (require, exports, UNSAFE_IntlDateTime_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTranslationBundle_1, UNSAFE_calendarDateUtils_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, useInputDateMaskPreact_1, hooks_1, useCombinedImplicitValidators_1, useImplicitCalendarDateConverter_1, useImplicitDateRangeValidator_1, useImplicitDateRestrictionValidator_1, utils_1, Context, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDatePicker = void 0;
    const useInputDatePicker = (props, ref) => {
        assertProps(props);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const rootRef = (0, hooks_1.useRef)(null);
        const inputDatePickerRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'InputDatePicker: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { containerProps: formContextValue, readonlyValue: mergedReadonly, uadValue: mergedUserAssistanceDensity } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly: props.containerReadonly,
            propLabelWrapping: props.labelWrapping,
            propReadonly: props.readonly,
            propUserAssistanceDensity: props.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        const implicitConverter = (0, useImplicitCalendarDateConverter_1.useImplicitCalendarDateConverter)({
            calendarDateConverter_parseErrorFn: translations.calendarDateConverter_parseError
        });
        const { max: maxCalendarDate, min: minCalendarDate } = useMinMax({
            converter: implicitConverter,
            max: props.max,
            min: props.min
        });
        if (maxCalendarDate)
            (0, utils_1.assertCompleteDate)(maxCalendarDate);
        if (minCalendarDate)
            (0, utils_1.assertCompleteDate)(minCalendarDate);
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return (0, useInputDateMaskPreact_1.getMasksFromDatePatternPreferences)();
        }, []);
        const exampleFormatter = (0, hooks_1.useMemo)(() => {
            return {
                format: (value) => {
                    return (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)((0, ojconfig_1.getLocale)(), value, masksFromUserPref);
                }
            };
        }, [masksFromUserPref]);
        const implicitDateRestrictionValidator = (0, useImplicitDateRestrictionValidator_1.useImplicitDateRestrictionValidator)({
            converter: implicitConverter,
            dateRestrictionMessageDetail: props.dateRestrictionMessageDetail,
            dayFormatter: props.dayFormatter,
            defaultRestrictionMessageDetail: translations.inputDatePicker_dateRestrictionMessageDetail
        });
        const implicitDateRangeValidator = (0, useImplicitDateRangeValidator_1.useImplicitDateRangeValidator)({
            converter: implicitConverter,
            dateRangeOverflowMessageDetail: props.dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail: props.dateRangeUnderflowMessageDetail,
            defaultRangeOverflowMessageDetailFn: translations.inputDatePicker_dateRangeOverflowMessageDetail,
            defaultRangeUnderflowMessageDetailFn: translations.inputDatePicker_dateRangeUnderflowMessageDetail,
            formatObj: exampleFormatter,
            max: maxCalendarDate,
            min: minCalendarDate
        });
        const implicitValidator = (0, useCombinedImplicitValidators_1.useCombinedImplicitValidators)(implicitDateRangeValidator, implicitDateRestrictionValidator);
        const mergedValidators = (0, hooks_1.useMemo)(() => [implicitValidator, ...(props.validators ?? [])], [implicitValidator, props.validators]);
        const { inputDateMaskProps, methods } = (0, useInputDateMaskPreact_1.useInputDateMaskPreact)({
            ...props,
            readonly: mergedReadonly,
            validators: mergedValidators,
            userAssistanceDensity: mergedUserAssistanceDensity,
            dateRangeOverflowMessageDetail: undefined,
            dateRangeUnderflowMessageDetail: undefined,
            max: undefined,
            min: undefined
        }, addBusyState);
        const { assistiveText, helpSourceLink, helpSourceText } = (0, useAssistiveText_1.useAssistiveText)({
            addBusyState,
            displayOptions: props.displayOptions,
            help: props.help,
            helpHints: props.helpHints,
            userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
            validators: props.validators ?? []
        });
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputDatePickerRef.current?.blur(),
            focus: () => inputDatePickerRef.current?.focus(),
            ...methods
        }), [methods]);
        return {
            formContextValue,
            inputDatePickerProps: {
                'aria-describedby': inputDateMaskProps['aria-describedby'],
                assistiveText: assistiveText,
                dayFormatter: props.dayFormatter,
                daysOutsideMonth: props.daysOutsideMonth,
                helpSourceLink: helpSourceLink,
                helpSourceText: helpSourceText,
                isDisabled: inputDateMaskProps.isDisabled,
                isReadonly: inputDateMaskProps.isReadonly,
                isRequired: inputDateMaskProps.isRequired,
                isRequiredShown: inputDateMaskProps.isRequiredShown,
                label: inputDateMaskProps.label,
                labelEdge: inputDateMaskProps.labelEdge,
                labelStartWidth: inputDateMaskProps.labelStartWidth,
                masks: inputDateMaskProps.masks,
                max: maxCalendarDate,
                messages: inputDateMaskProps.messages,
                min: minCalendarDate,
                monthAndYearPicker: props.monthAndYearPicker,
                onCommit: inputDateMaskProps.onCommit,
                onInput: inputDateMaskProps.onInput,
                ref: inputDatePickerRef,
                textAlign: inputDateMaskProps.textAlign,
                todayTimeZone: props.todayTimeZone,
                todayButton: props.todayButton,
                userAssistanceDensity: inputDateMaskProps.userAssistanceDensity,
                value: inputDateMaskProps.value,
                variant: variant,
                weekDisplay: props.weekDisplay
            },
            rootProps: {
                id: props.id,
                class: Layout_1.layoutSpanStyles.layoutSpanColumn[props.columnSpan ?? 1],
                ref: rootRef
            }
        };
    };
    exports.useInputDatePicker = useInputDatePicker;
    const assertProps = (props) => {
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.value)) {
            throw new Error(`InputDatePicker - value must be a date-only ISO string: ${props.value}`);
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.min)) {
            throw new Error(`InputDatePicker - min must be a date-only ISO string: ${props.min}`);
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(props.max)) {
            throw new Error(`InputDatePicker - max must be a date-only ISO string: ${props.max}`);
        }
    };
    const useMinMax = ({ converter, max, min }) => {
        return (0, hooks_1.useMemo)(() => ({
            max: max ? converter.format(max) : undefined,
            min: min ? converter.format(min) : undefined
        }), [converter, max, min]);
    };
});


define('oj-c/input-date-picker/input-date-picker',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_InputDatePicker", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojvcomponent", "preact/compat", "./useInputDatePicker", "css!oj-c/input-date-picker/input-date-picker-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_InputDatePicker_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, ojvcomponent_1, compat_1, useInputDatePicker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDatePicker = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    function InputDatePickerImpl({ columnSpan = 1, daysOutsideMonth = 'hidden', disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, messagesCustom = messagesCustomDefault, monthAndYearPicker = 'on', required = false, todayButton = 'visible', validators = validatorsDefault, value = null, weekDisplay = 'none', ...otherProps }, ref) {
        const { formContextValue, inputDatePickerProps, rootProps } = (0, useInputDatePicker_1.useInputDatePicker)({
            columnSpan,
            daysOutsideMonth,
            disabled,
            displayOptions,
            help,
            helpHints,
            messagesCustom,
            monthAndYearPicker,
            required,
            todayButton,
            validators,
            value,
            weekDisplay,
            ...otherProps
        }, ref);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...rootProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: formContextValue, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputDatePicker_1.InputDatePicker, { ...inputDatePickerProps }) }) }));
    }
    exports.InputDatePicker = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-date-picker', (0, compat_1.forwardRef)(InputDatePickerImpl), "InputDatePicker", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "function" }, "dateRangeUnderflowMessageDetail": { "type": "function" }, "dateRestrictionMessageDetail": { "type": "function" }, "dayFormatter": { "type": "function" }, "daysOutsideMonth": { "type": "string", "enumValues": ["hidden", "selectable"] }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "monthAndYearPicker": { "type": "string", "enumValues": ["off", "on"] }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "todayTimeZone": { "type": "string" }, "todayButton": { "type": "string", "enumValues": ["hidden", "visible"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "weekDisplay": { "type": "string", "enumValues": ["number", "none"] }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" }, "day": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "daysOutsideMonth": "hidden", "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "monthAndYearPicker": "on", "required": false, "todayButton": "visible", "validators": [], "value": null, "weekDisplay": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-date-picker',["require", "exports", "oj-c/input-date-picker/input-date-picker"], function (require, exports, input_date_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDatePicker = void 0;
    Object.defineProperty(exports, "InputDatePicker", { enumerable: true, get: function () { return input_date_picker_1.InputDatePicker; } });
});

define('oj-c/input-date-text/useImplicitDateConverter',["require", "exports", "preact/hooks", "ojs/ojconverter-localdate"], function (require, exports, hooks_1, ojconverter_localdate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitDateConverter = useImplicitDateConverter;
    function useImplicitDateConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_localdate_1.LocalDateConverter({ dateStyle: 'short' });
        }, [converter]);
        return implicitConverter;
    }
});

define('oj-c/input-date-text/useInputDateTextPreact',["require", "exports", "preact/hooks", "./useImplicitDateConverter", "./useImplicitDateRangeValidator", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, hooks_1, useImplicitDateConverter_1, useImplicitDateRangeValidator_1, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputDateTextPreact = useInputDateTextPreact;
    function useInputDateTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
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
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: combinedValidators,
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
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
});


define('oj-c/input-date-text/input-date-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputDateTextPreact", "@oracle/oraclejet-preact/UNSAFE_IntlDateTime", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-date-text/input-date-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputText_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputDateTextPreact_1, UNSAFE_IntlDateTime_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateText = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        converterHint: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const InputDateTextImpl = ({ autocomplete = 'on', columnSpan = 1, containerReadonly: propContainerReadonly, converter = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputDateTextRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc = 'InputDateText: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-date-text id=${id} is ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputTextProps, methods } = (0, useInputDateTextPreact_1.useInputDateTextPreact)({
            autocomplete,
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
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
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(value)) {
            throw new Error('value must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.min)) {
            throw new Error('min must be a date-only ISO string');
        }
        if (!UNSAFE_IntlDateTime_1.DateTimeUtils.isDateOnlyIsoString(otherProps.max)) {
            throw new Error('max must be a date-only ISO string');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputText_1.InputText, { ref: inputDateTextRef, ...assistiveTextProps, ...inputTextProps, variant: variant }) }) }));
    };
    exports.InputDateText = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-date-text', (0, compat_1.forwardRef)(InputDateTextImpl), "InputDateText", { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null", "properties": { "format": { "type": "function" }, "parse": { "type": "function" } } }, "dateRangeOverflowMessageDetail": { "type": "string" }, "dateRangeUnderflowMessageDetail": { "type": "string" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "string|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "string|null" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "columnSpan": 1, "converter": null, "disabled": false, "displayOptions": { "messages": "display", "converterHint": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-date-text',["require", "exports", "oj-c/input-date-text/input-date-text"], function (require, exports, input_date_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputDateText = void 0;
    Object.defineProperty(exports, "InputDateText", { enumerable: true, get: function () { return input_date_text_1.InputDateText; } });
});

define('oj-c/input-month-mask/CalendarMonthConverter',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "ojs/ojconfig"], function (require, exports, UNSAFE_calendarDateUtils_1, ojconfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarMonthConverter = void 0;
    class CalendarMonthConverter {
        constructor(options) {
            this.locale = options?.locale ?? (0, ojconfig_1.getLocale)();
            this.calendarMonthConverter_parseErrorFn = options?.calendarMonthConverter_parseErrorFn;
            this.customMask = options?.customMask;
        }
        format(value) {
            if (!(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarMonth)(value)) {
                throw new Error('value must have year and month');
            }
            return value;
        }
        parse(input) {
            if (input !== undefined && !(0, UNSAFE_calendarDateUtils_1.isCompleteCalendarMonth)(input)) {
                const now = new Date();
                const currentYear = now.getFullYear();
                const formattedDateExample = (0, UNSAFE_calendarDateUtils_1.formatIsoDateStrAsExample)(this.locale, `${currentYear}-11-29`, this.customMask, 'month');
                const errorStr = this.calendarMonthConverter_parseErrorFn &&
                    this.calendarMonthConverter_parseErrorFn({
                        dateExample: formattedDateExample
                    });
                throw new Error(errorStr ?? 'parse failed');
            }
            return input;
        }
    }
    exports.CalendarMonthConverter = CalendarMonthConverter;
});

define('oj-c/input-month-mask/CalendarMonthRangeValidator',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CalendarMonthRangeValidator = void 0;
    class CalendarMonthRangeValidator {
        constructor(options) {
            if (options.min &&
                options.max &&
                CalendarMonthRangeValidator._compareCalendarMonths(options.min, options.max) > 0) {
                throw new Error('min must be less than max');
            }
            this.defaultRangeOverflowMessageDetailFn = options.defaultRangeOverflowMessageDetailFn;
            this.defaultRangeUnderflowMessageDetailFn = options.defaultRangeUnderflowMessageDetailFn;
            this.min = options.min;
            this.max = options.max;
            this.dateRangeOverflowMessageDetail = options.dateRangeOverflowMessageDetail;
            this.dateRangeUnderflowMessageDetail = options.dateRangeUnderflowMessageDetail;
            this.formatObj = options.formatObj;
        }
        validate(value) {
            const messageDetailRangeOverflow = this.dateRangeOverflowMessageDetail;
            const messageDetailRangeUnderflow = this.dateRangeUnderflowMessageDetail;
            const min = this.min;
            const max = this.max;
            if (value === null) {
                return;
            }
            const valStr = value ? this.formatObj.format(value) : value;
            if (max && CalendarMonthRangeValidator._compareCalendarMonths(value, max) > 0) {
                const maxStr = this.formatObj.format(max);
                const detail = messageDetailRangeOverflow
                    ? messageDetailRangeOverflow({ max: maxStr, value: valStr })
                    : this.defaultRangeOverflowMessageDetailFn({ max: maxStr });
                throw new Error(detail);
            }
            if (min && CalendarMonthRangeValidator._compareCalendarMonths(value, min) < 0) {
                const minStr = this.formatObj.format(min);
                const detail = messageDetailRangeUnderflow
                    ? messageDetailRangeUnderflow({ min: minStr, value: valStr })
                    : this.defaultRangeUnderflowMessageDetailFn({ min: minStr });
                throw new Error(detail);
            }
            return value;
        }
        static _compareCalendarMonths(val1, val2) {
            if (val1.year === val2.year && val1.month === val2.month) {
                return 0;
            }
            if (val1.year === val2.year) {
                return val1.month > val2.month ? 1 : -1;
            }
            return val1.year > val2.year ? 1 : -1;
        }
    }
    exports.CalendarMonthRangeValidator = CalendarMonthRangeValidator;
});

define('oj-c/input-month-mask/useImplicitCalendarMonthRangeValidator',["require", "exports", "preact/hooks", "./CalendarMonthRangeValidator", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, hooks_1, CalendarMonthRangeValidator_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitCalendarMonthRangeValidator = useImplicitCalendarMonthRangeValidator;
    function useImplicitCalendarMonthRangeValidator({ formatObj, dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, max, min }) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const defaultRangeOverflowMessageDetailFn = translations.inputMonthMask_dateRangeOverflowMessageDetail;
        const defaultRangeUnderflowMessageDetailFn = translations.inputMonthMask_dateRangeUnderflowMessageDetail;
        const calendarMonthRangeValidator = (0, hooks_1.useMemo)(() => {
            if (min !== undefined || max !== undefined) {
                return new CalendarMonthRangeValidator_1.CalendarMonthRangeValidator({
                    defaultRangeOverflowMessageDetailFn,
                    defaultRangeUnderflowMessageDetailFn,
                    formatObj,
                    max,
                    min,
                    dateRangeOverflowMessageDetail,
                    dateRangeUnderflowMessageDetail
                });
            }
            return null;
        }, [
            formatObj,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            defaultRangeOverflowMessageDetailFn,
            defaultRangeUnderflowMessageDetailFn,
            min,
            max
        ]);
        return calendarMonthRangeValidator;
    }
});

define('oj-c/input-month-mask/useInputMonthMaskPreact',["require", "exports", "./CalendarMonthConverter", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "ojs/ojconverter-preferences", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "./useImplicitCalendarMonthRangeValidator", "ojs/ojconfig", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, CalendarMonthConverter_1, hooks_1, UNSAFE_useTranslationBundle_1, ojconverter_preferences_1, UNSAFE_calendarDateUtils_1, useImplicitCalendarMonthRangeValidator_1, ojconfig_1, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputMonthMaskPreact = useInputMonthMaskPreact;
    function useInputMonthMaskPreact({ dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const calendarMonthConverter_parseErrorFn = translations.calendarMonthConverter_parseError;
        const masksFromUserPref = (0, hooks_1.useMemo)(() => {
            return getMasksFromDatePatternPreferences();
        }, []);
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return new CalendarMonthConverter_1.CalendarMonthConverter({
                calendarMonthConverter_parseErrorFn,
                customMask: masksFromUserPref
            });
        }, [calendarMonthConverter_parseErrorFn, masksFromUserPref]);
        const exampleFormatter = (0, hooks_1.useMemo)(() => {
            return {
                format: (value) => {
                    return (0, UNSAFE_calendarDateUtils_1.formatCalendarMonthRequiredAsExample)((0, ojconfig_1.getLocale)(), value, masksFromUserPref);
                }
            };
        }, [masksFromUserPref]);
        const implicitComponentValidator = (0, useImplicitCalendarMonthRangeValidator_1.useImplicitCalendarMonthRangeValidator)({
            formatObj: exampleFormatter,
            dateRangeOverflowMessageDetail,
            dateRangeUnderflowMessageDetail,
            max: maxTreatNull,
            min: minTreatNull
        });
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: implicitConverter,
            defaultDisplayValue: undefined,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: combinedValidators,
            value: propValue
        });
        const hasNoValue = value === undefined || !isPartialDate(textFieldProps.value);
        return {
            methods,
            inputMonthMaskProps: {
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
    const isPartialDate = (value) => {
        if (value === undefined)
            return false;
        return value.year !== undefined || value.month !== undefined;
    };
    const getMasksFromDatePatternPreferences = () => {
        const prefs = (0, ojconverter_preferences_1.getDateTimePreferences)();
        const pattern = prefs.dateStyle?.short?.pattern;
        if (!pattern || pattern.toUpperCase().includes('MMM')) {
            return undefined;
        }
        const datePlaceholders = (0, UNSAFE_calendarDateUtils_1.getDatePlaceholdersFromPattern)(pattern);
        const monthDatePlaceholder = (0, UNSAFE_calendarDateUtils_1.getMonthYearPlaceholdersFromDatePlaceholders)(datePlaceholders);
        return monthDatePlaceholder;
    };
});


define('oj-c/input-month-mask/input-month-mask',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputDateMask", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputMonthMaskPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils", "css!oj-c/input-month-mask/input-month-mask-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputDateMask_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputMonthMaskPreact_1, Layout_1, UNSAFE_calendarDateUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputMonthMask = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const InputMonthMaskImpl = ({ columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputMonthMaskRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'InputMonthMask: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputMonthMaskProps, methods } = (0, useInputMonthMaskPreact_1.useInputMonthMaskPreact)({
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputMonthMaskRef.current?.blur(),
            focus: () => inputMonthMaskRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputMonthMaskProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        if (!(0, UNSAFE_calendarDateUtils_1.isValidCalendarMonthRequired)(value)) {
            throw new Error('If the value property is defined, it must be an object with year and month defined.');
        }
        if (!(0, UNSAFE_calendarDateUtils_1.isValidCalendarMonthRequired)(otherProps.min)) {
            throw new Error('If the min property is defined, it must be an object with year and month defined.');
        }
        if (!(0, UNSAFE_calendarDateUtils_1.isValidCalendarMonthRequired)(otherProps.max)) {
            throw new Error('If the max property is defined, it must be an object with year and month defined.');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputDateMask_1.InputDateMask, { ref: inputMonthMaskRef, ...assistiveTextProps, ...inputMonthMaskProps, variant: variant, granularity: "month" }) }) }));
    };
    exports.InputMonthMask = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-month-mask', (0, compat_1.forwardRef)(InputMonthMaskImpl), "InputMonthMask", { "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "dateRangeOverflowMessageDetail": { "type": "function" }, "dateRangeUnderflowMessageDetail": { "type": "function" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "object|null", "properties": { "year": { "type": "number" }, "month": { "type": "number" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "min": { "type": "object|null", "properties": { "year": { "type": "number" }, "month": { "type": "number" } } }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "object|null", "properties": { "year": { "type": "number" }, "month": { "type": "number" } }, "writeback": true }, "rawValue": { "type": "object", "properties": { "year": { "type": "number" }, "month": { "type": "number" } }, "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-month-mask',["require", "exports", "oj-c/input-month-mask/input-month-mask"], function (require, exports, input_month_mask_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputMonthMask = void 0;
    Object.defineProperty(exports, "InputMonthMask", { enumerable: true, get: function () { return input_month_mask_1.InputMonthMask; } });
});

define('oj-c/input-number/useImplicitNumberConverter',["require", "exports", "ojs/ojconverter-nativenumber", "preact/hooks"], function (require, exports, ojconverter_nativenumber_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitNumberConverter = useImplicitNumberConverter;
    function useImplicitNumberConverter({ converter }) {
        const implicitConverter = (0, hooks_1.useMemo)(() => {
            return converter ?? new ojconverter_nativenumber_1.NumberConverter();
        }, [converter]);
        return implicitConverter;
    }
});

define('oj-c/input-number/useImplicitNumberRangeValidator',["require", "exports", "preact/hooks", "ojs/ojvalidator-numberrange"], function (require, exports, hooks_1, NumberRangeValidator) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useImplicitNumberRangeValidator = useImplicitNumberRangeValidator;
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
        }, [
            converter,
            min,
            max,
            numberRangeExactMessageDetail,
            numberRangeOverflowMessageDetail,
            numberRangeUnderflowMessageDetail
        ]);
        return numberRangeValidator;
    }
});

define('oj-c/input-number/stepBasisUtils',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.determineSteppedValue = determineSteppedValue;
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

define('oj-c/input-number/useNumberInputTextPreact',["require", "exports", "preact/hooks", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "./useImplicitNumberConverter", "./useImplicitNumberRangeValidator", "preact/hooks", "./stepBasisUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "ojs/ojconverter-nativenumber"], function (require, exports, hooks_1, index_1, useDeferredValidators_1, useImplicitNumberConverter_1, useImplicitNumberRangeValidator_1, hooks_2, stepBasisUtils_1, UNSAFE_useTranslationBundle_1, ojconverter_nativenumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNumberInputTextPreact = useNumberInputTextPreact;
    function useNumberInputTextPreact({ autocomplete = 'on', autofocus, converter: propConverter, disabled, displayOptions, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, numberRangeExactMessageDetail, numberRangeOverflowMessageDetail, numberRangeUnderflowMessageDetail, placeholder, readonly, required, requiredMessageDetail, step, stepperVariant, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onTransientValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const minTreatNull = (0, index_1.treatNull)(min);
        const maxTreatNull = (0, index_1.treatNull)(max);
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
        const combinedValidators = (0, hooks_1.useMemo)(() => {
            const v1 = implicitComponentValidator ? [implicitComponentValidator] : [];
            const v2 = validators ? validators : [];
            return [...v1, ...v2];
        }, [implicitComponentValidator, validators]);
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const converterParseError = translations.inputNumber_converterParseError();
        const translateConverterParseError = (0, hooks_2.useCallback)((error) => {
            return error?.cause === ojconverter_nativenumber_1.USER_INPUT_ERROR
                ? { severity: 'error', detail: converterParseError }
                : undefined;
        }, [converterParseError]);
        const { onCommitValue, formatValue, parseValue, methods, textFieldProps, value, setValue, displayValue, setDisplayValue, setTransientValue } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onTransientValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            translateConverterParseError,
            validators: combinedValidators,
            value: propValue
        });
        const hasMin = minTreatNull !== undefined;
        const hasMax = maxTreatNull !== undefined;
        const isValidating = (0, hooks_2.useRef)(false);
        const stepQueue = (0, hooks_2.useRef)(new Array());
        const currentDisplayValueInStep = (0, hooks_2.useRef)(displayValue);
        const initialValue = (0, hooks_2.useRef)((0, index_1.treatNull)(propValue));
        if (propValue !== value) {
            initialValue.current = (0, index_1.treatNull)(propValue);
        }
        const [valueNow, setValueNow] = (0, hooks_2.useState)((0, index_1.treatNull)(value));
        const [prevValue, setPrevValue] = (0, hooks_2.useState)(value);
        if (value !== prevValue) {
            setPrevValue(value);
            setValueNow((0, index_1.treatNull)(value));
            setTransientValue(value);
        }
        const [hasUncommittedDisplayValue, setHasUncommittedDisplayValue] = (0, hooks_2.useState)(false);
        currentDisplayValueInStep.current = displayValue;
        const onCommit = (0, hooks_2.useCallback)(async ({ value }) => {
            setHasUncommittedDisplayValue(false);
            const conversion = parseValue(value);
            if (conversion.result === 'failure') {
                setValueNow(undefined);
                return;
            }
            const parsedValue = conversion.value;
            const commitSucceeded = await onCommitValue(parsedValue);
            if (commitSucceeded) {
                const formattedValue = formatValue(parsedValue);
                setDisplayValue(formattedValue);
            }
            else {
                setValueNow(parsedValue ?? undefined);
            }
        }, [formatValue, parseValue, onCommitValue, setDisplayValue]);
        const onInput = (0, hooks_2.useCallback)(({ value }) => {
            setDisplayValue(value ?? '');
            setHasUncommittedDisplayValue(true);
        }, [setDisplayValue]);
        const textFieldPropsWithOverride = { ...textFieldProps, onCommit, onInput };
        const doStep = (0, hooks_2.useCallback)(async (direction, doCommit) => {
            if (step === undefined || isValidating.current) {
                return;
            }
            const displayValueToStep = currentDisplayValueInStep.current || '0';
            const conversion = parseValue(displayValueToStep);
            if (conversion.result === 'failure') {
                return;
            }
            const parsedValue = conversion.value;
            let newSteppedValue;
            if (direction !== undefined) {
                const stepValue = direction === 'increase' ? step : -1 * step;
                newSteppedValue = (0, stepBasisUtils_1.determineSteppedValue)(stepValue, step, parsedValue, initialValue.current, maxTreatNull, minTreatNull);
            }
            else {
                newSteppedValue = parsedValue;
            }
            isValidating.current = true;
            const formattedValue = formatValue(newSteppedValue);
            setDisplayValue(formattedValue);
            currentDisplayValueInStep.current = formattedValue;
            const commitSucceeded = await onCommitValue(newSteppedValue, doCommit);
            const isSpinning = doCommit === false;
            const valueCommitted = doCommit && commitSucceeded;
            if (isSpinning && commitSucceeded) {
                setTransientValue(newSteppedValue);
            }
            if (!valueCommitted) {
                setValueNow(newSteppedValue);
            }
            isValidating.current = false;
        }, [
            formatValue,
            maxTreatNull,
            minTreatNull,
            parseValue,
            onCommitValue,
            setDisplayValue,
            setTransientValue,
            step
        ]);
        const processStepQueue = (0, hooks_2.useCallback)(async (direction) => {
            await doStep(direction, true);
            if (stepQueue.current.length > 0) {
                const direction = stepQueue.current.shift();
                processStepQueue(direction);
            }
        }, [doStep]);
        const handleStep = (0, hooks_2.useCallback)(async ({ direction }) => {
            if (isValidating.current) {
                stepQueue.current.push(direction);
            }
            else {
                processStepQueue(direction);
            }
        }, [processStepQueue]);
        const handleSpin = (0, hooks_2.useCallback)(async ({ direction }) => {
            const doCommit = false;
            stepQueue.current = [];
            doStep(direction, doCommit);
        }, [doStep]);
        const handleSpinComplete = (0, hooks_2.useCallback)(async () => {
            const conversion = parseValue(currentDisplayValueInStep.current);
            if (conversion.result === 'failure') {
                return;
            }
            await onCommitValue(conversion.value);
        }, [onCommitValue, parseValue]);
        const lastValueNow = (0, hooks_2.useRef)();
        const lastDisplayValue = (0, hooks_2.useRef)();
        const lastHasUncommittedDisplayValue = (0, hooks_2.useRef)();
        const lastValueText = (0, hooks_2.useRef)();
        let valueText;
        if (hasUncommittedDisplayValue !== lastHasUncommittedDisplayValue.current ||
            displayValue !== lastDisplayValue.current ||
            valueNow !== lastValueNow.current) {
            valueText = calculateValueText(hasUncommittedDisplayValue, displayValue, valueNow, formatValue);
            lastHasUncommittedDisplayValue.current = hasUncommittedDisplayValue;
            lastDisplayValue.current = displayValue;
            lastValueNow.current = valueNow;
            lastValueText.current = valueText;
        }
        else {
            valueText = lastValueText.current;
        }
        const normalizedVirtualKeyboard = virtualKeyboard === 'auto' ? (0, index_1.getVirtualKeyboardHintFromConverter)(converter) : virtualKeyboard;
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
                isRequiredShown: required && (userAssistanceDensity === 'compact' || (0, index_1.treatNull)(value) === undefined),
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
                virtualKeyboard: normalizedVirtualKeyboard,
                ...textFieldPropsWithOverride
            }
        };
    }
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


define('oj-c/input-number/input-number',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_NumberInputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useNumberInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-number/input-number-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_NumberInputText_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useNumberInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    const displayOptionsDefault = {
        converterHint: 'display',
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const InputNumberImpl = ({ autocomplete = 'on', columnSpan = 1, converter = null, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, stepperVariant = 'directional', userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, virtualKeyboard = 'auto', value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const inputNumberRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc = 'InputNumber: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-number id=${id} is ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputNumberProps, methods } = (0, useNumberInputTextPreact_1.useNumberInputTextPreact)({
            autocomplete,
            converter,
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            stepperVariant,
            userAssistanceDensity: uadValue,
            validators,
            virtualKeyboard,
            value,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => inputNumberRef.current?.blur(),
            focus: () => inputNumberRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputNumberProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        if (otherProps.step !== undefined && otherProps.step < 0) {
            throw new Error('step must be a positive number');
        }
        if (otherProps.min != null && otherProps.max != null && otherProps.max < otherProps.min) {
            throw new Error('max cannot be less than min');
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_NumberInputText_1.NumberInputText, { ref: inputNumberRef, ...assistiveTextProps, ...inputNumberProps, variant: variant }) }) }));
    };
    exports.InputNumber = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-number', (0, compat_1.forwardRef)(InputNumberImpl), "InputNumber", { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "max": { "type": "number|null" }, "min": { "type": "number|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "numberRangeExactMessageDetail": { "type": "string" }, "numberRangeOverflowMessageDetail": { "type": "string" }, "numberRangeUnderflowMessageDetail": { "type": "string" }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "step": { "type": "number" }, "stepperVariant": { "type": "string", "enumValues": ["directional", "quantitative"] }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "number|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "auto", "text"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "transientValue": { "type": "number|null", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "transientValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "transientValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "columnSpan": 1, "converter": null, "disabled": false, "displayOptions": { "converterHint": "display", "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "stepperVariant": "directional", "validators": [], "virtualKeyboard": "auto", "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-number',["require", "exports", "oj-c/input-number/input-number"], function (require, exports, input_number_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputNumber = void 0;
    Object.defineProperty(exports, "InputNumber", { enumerable: true, get: function () { return input_number_1.InputNumber; } });
});

define('oj-c/input-password/useInputPasswordPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/hooks/UNSAFE_useEditableValue/index"], function (require, exports, useDeferredValidators_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputPasswordPreact = useInputPasswordPreact;
    function useInputPasswordPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', disabled, displayOptions, labelEdge, labelHint, labelStartWidth, maskIcon, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        const hasRevealToggle = maskIcon === 'hidden' ? 'never' : 'always';
        return {
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
});


define('oj-c/input-password/input-password',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputPassword", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputPasswordPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-password/input-password-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputPassword_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputPasswordPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputPassword = void 0;
    const displayOptionsDefault = {
        converterHint: 'display',
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    function InputPasswordImpl({ autocomplete = 'on', clearIcon = 'never', columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, maskIcon = 'visible', messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const inputPasswordRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-password id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputPasswordProps, methods } = (0, useInputPasswordPreact_1.useInputPasswordPreact)({
            autocomplete,
            clearIcon,
            disabled,
            displayOptions,
            maskIcon,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputPassword_1.InputPassword, { ref: inputPasswordRef, ...assistiveTextProps, ...inputPasswordProps, variant: variant }) }) }));
    }
    exports.InputPassword = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-password', (0, compat_1.forwardRef)(InputPasswordImpl), "InputPassword", { "properties": { "autocomplete": { "type": "string" }, "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "maskIcon": { "type": "string", "enumValues": ["hidden", "visible"] }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "string|null", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "clearIcon": "never", "columnSpan": 1, "disabled": false, "displayOptions": { "converterHint": "display", "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "maskIcon": "visible", "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-password',["require", "exports", "oj-c/input-password/input-password"], function (require, exports, input_password_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputPassword = void 0;
    Object.defineProperty(exports, "InputPassword", { enumerable: true, get: function () { return input_password_1.InputPassword; } });
});

define('oj-c/input-sensitive-text/useInputSensitiveTextPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/hooks/UNSAFE_useEditableValue/index"], function (require, exports, useDeferredValidators_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputSensitiveTextPreact = useInputSensitiveTextPreact;
    function useInputSensitiveTextPreact({ autofocus, clearIcon = 'never', disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maskIcon, maskIconLabel, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        const hasRevealToggle = maskIcon === 'hidden' ? 'never' : 'always';
        return {
            methods,
            inputSensitiveTextProps: {
                ...textFieldProps,
                autoFocus: autofocus,
                hasClearIcon,
                hasRevealToggle,
                isDisabled: disabled,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                label: labelHint,
                labelEdge,
                labelStartWidth,
                maxLength: (0, index_1.treatNull)(length?.max),
                maxLengthUnit: length?.countBy,
                placeholder,
                revealToggleLabel: maskIconLabel,
                textAlign,
                userAssistanceDensity,
                virtualKeyboard
            }
        };
    }
});


define('oj-c/input-sensitive-text/input-sensitive-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/compat", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputSensitiveText", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojvcomponent", "ojs/ojcontext", "./useInputSensitiveTextPreact", "css!oj-c/input-sensitive-text/input-sensitive-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, compat_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputSensitiveText_1, Layout_1, useAssistiveText_1, ojvcomponent_1, Context, useInputSensitiveTextPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputSensitiveText = void 0;
    const displayOptionsDefault = {
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const lengthDefault = {
        countBy: 'codePoint',
        max: null
    };
    const FunctionalInputSensitiveText = (0, compat_1.forwardRef)(({ clearIcon = 'never', columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, length = lengthDefault, maskIcon = 'visible', messagesCustom = messagesCustomDefault, maskIconLabel, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) => {
        const rootRef = (0, compat_1.useRef)();
        const inputSensitiveTextRef = (0, compat_1.useRef)();
        const addBusyState = (0, compat_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-sensitive-text id=${id} is ${description}` })
                : () => { };
        }, []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputSensitiveTextProps, methods } = (0, useInputSensitiveTextPreact_1.useInputSensitiveTextPreact)({
            clearIcon,
            columnSpan,
            disabled,
            displayOptions,
            help,
            helpHints,
            id,
            length,
            maskIcon,
            maskIconLabel,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        }, addBusyState);
        (0, compat_1.useImperativeHandle)(ref, () => ({
            blur: () => inputSensitiveTextRef.current?.blur(),
            focus: () => inputSensitiveTextRef.current?.focus(),
            ...methods
        }), [methods]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: inputSensitiveTextProps.userAssistanceDensity,
            validators
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputSensitiveText_1.InputSensitiveText, { ref: inputSensitiveTextRef, ...assistiveTextProps, ...inputSensitiveTextProps, variant: variant }) }) }));
    });
    exports.InputSensitiveText = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-sensitive-text', FunctionalInputSensitiveText, "InputSensitiveText", { "properties": { "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "max": { "type": "number|null" } } }, "maskIcon": { "type": "string", "enumValues": ["hidden", "visible"] }, "maskIconLabel": { "type": "string" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "clearIcon": "never", "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "length": { "countBy": "codePoint", "max": null }, "maskIcon": "visible", "messagesCustom": [], "required": false, "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-sensitive-text',["require", "exports", "oj-c/input-sensitive-text/input-sensitive-text"], function (require, exports, input_sensitive_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputSensitiveText = void 0;
    Object.defineProperty(exports, "InputSensitiveText", { enumerable: true, get: function () { return input_sensitive_text_1.InputSensitiveText; } });
});

define('oj-c/input-text/useInputTextPreact',["require", "exports", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useInputTextPreact = useInputTextPreact;
    function useInputTextPreact({ autocomplete = 'on', autofocus, clearIcon = 'never', converter, disabled, displayOptions, end, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, start, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        const hasClearIcon = clearIcon === 'conditional' ? 'conditionally' : clearIcon;
        const normalizedVirtualKeyboard = virtualKeyboard === 'auto' ? (0, index_1.getVirtualKeyboardHintFromConverter)(converter) : virtualKeyboard;
        return {
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
                maxLength: (0, index_1.treatNull)(length?.max),
                maxLengthUnit: length?.countBy,
                placeholder,
                prefix: inputPrefix,
                startContent: start,
                suffix: inputSuffix,
                textAlign,
                userAssistanceDensity,
                virtualKeyboard: normalizedVirtualKeyboard,
                ...textFieldProps
            }
        };
    }
});


define('oj-c/input-text/input-text',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useAccessibleContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_InputText", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useInputTextPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/input-text/input-text-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useAccessibleContext_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_InputText_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useInputTextPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InputText = void 0;
    const displayOptionsDefault = {
        converterHint: 'display',
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const lengthDefault = {
        countBy: 'codePoint',
        max: null
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    function InputTextImpl({ autocomplete = 'on', clearIcon = 'never', columnSpan = 1, containerReadonly: propContainerReadonly, converter = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, length = lengthDefault, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, virtualKeyboard = 'auto', ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const inputTextRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc = 'InputText: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-input-text id=${id} is ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { inputTextProps, methods } = (0, useInputTextPreact_1.useInputTextPreact)({
            autocomplete,
            clearIcon,
            converter,
            disabled,
            displayOptions,
            length,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            validators,
            value,
            virtualKeyboard,
            ...otherProps
        }, addBusyState);
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
        const accessibleProps = {
            UNSAFE_ariaLabelledBy: otherProps.unsafe_labelledBy
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_useAccessibleContext_1.AccessibleContext.Provider, { value: accessibleProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_InputText_1.InputText, { ref: inputTextRef, ...assistiveTextProps, ...inputTextProps, variant: variant }) }) }) }));
    }
    exports.InputText = (0, ojvcomponent_1.registerCustomElement)('oj-c-input-text', (0, compat_1.forwardRef)(InputTextImpl), "InputText", { "properties": { "autocomplete": { "type": "string" }, "clearIcon": { "type": "string", "enumValues": ["conditional", "always", "never"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "inputPrefix": { "type": "string" }, "inputSuffix": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "max": { "type": "number|null" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "unsafe_labelledBy": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "end": {}, "start": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "clearIcon": "never", "columnSpan": 1, "converter": null, "disabled": false, "displayOptions": { "converterHint": "display", "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "length": { "countBy": "codePoint", "max": null }, "messagesCustom": [], "required": false, "validators": [], "value": null, "virtualKeyboard": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/input-text',["require", "exports", "oj-c/input-text/input-text"], function (require, exports, input_text_1) {
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
    exports.MessageToast = (0, ojvcomponent_1.registerCustomElement)('oj-c-message-toast', MessageToastImpl, "MessageToast", { "properties": { "data": { "type": "DataProvider" }, "detailTemplateValue": { "type": "string|function" }, "iconTemplateValue": { "type": "string|function" }, "offset": { "type": "number|object" }, "position": { "type": "string", "enumValues": ["top", "bottom", "top-start", "top-end", "bottom-start", "bottom-end", "top-left", "top-right", "bottom-left", "bottom-right"] } }, "extension": { "_DYNAMIC_SLOT": { "prop": "messageTemplates", "isTemplate": 1 } }, "events": { "ojClose": {} } }, { "offset": 0, "position": "bottom" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/message-toast',["require", "exports", "oj-c/message-toast/message-toast"], function (require, exports, message_toast_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageToast = void 0;
    Object.defineProperty(exports, "MessageToast", { enumerable: true, get: function () { return message_toast_1.MessageToast; } });
});

define('oj-c/text-area/useTextAreaAutosizePreact',["require", "exports", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTextAreaAutosizePreact = useTextAreaAutosizePreact;
    function useTextAreaAutosizePreact({ autocomplete = 'on', autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, maxRows, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
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
});

define('oj-c/text-area/useTextAreaPreact',["require", "exports", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, index_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useTextAreaPreact = useTextAreaPreact;
    function useTextAreaPreact({ autocomplete = 'on', autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValueChanged, onValidChanged, ...otherProps }, addBusyState) {
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, textFieldProps, value } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            converter: converter,
            defaultDisplayValue: '',
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
            validators: (0, index_1.treatNull)(validators, undefined),
            value: propValue,
            onMessagesCustomChanged,
            onRawValueChanged,
            onValidChanged,
            onValueChanged
        });
        const hasNoValue = value === null || (typeof value === 'string' && value === '');
        return {
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
});


define('oj-c/text-area/text-area',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/UNSAFE_TextArea", "@oracle/oraclejet-preact/UNSAFE_TextAreaAutosize", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useTextAreaAutosizePreact", "./useTextAreaPreact", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/text-area/text-area-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, UNSAFE_TextArea_1, UNSAFE_TextAreaAutosize_1, useAssistiveText_1, Context, ojvcomponent_1, compat_1, hooks_1, useTextAreaAutosizePreact_1, useTextAreaPreact_1, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextArea = void 0;
    const displayOptionsDefault = {
        converterHint: 'display',
        messages: 'display',
        validatorHint: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const lengthDefault = {
        countBy: 'codePoint',
        counter: 'remaining',
        max: null
    };
    const messagesCustomDefault = [];
    const validatorsDefault = [];
    const FunctionalTextArea = (0, compat_1.forwardRef)((props, ref) => {
        const { addBusyState, converter, displayOptions, help, helpHints, validators } = props;
        const textAreaRef = (0, hooks_1.useRef)();
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
        const { addBusyState, converter, help, helpHints, validators } = props;
        const textAreaAutosizeRef = (0, hooks_1.useRef)();
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
    function TextAreaImpl({ autocomplete = 'on', columnSpan = 1, converter = null, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, length = lengthDefault, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, resizeBehavior = 'none', userAssistanceDensity: propUserAssistanceDensity, validators = validatorsDefault, value = null, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const textAreaRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-text-area id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const FunctionalComp = otherProps.maxRows ? FunctionalTextAreaAutosize : FunctionalTextArea;
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => textAreaRef.current?.blur(),
            focus: () => textAreaRef.current?.focus(),
            reset: () => textAreaRef.current?.reset(),
            showMessages: () => textAreaRef.current?.showMessages(),
            validate: () => {
                return textAreaRef.current?.validate();
            }
        }), []);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const props = {
            addBusyState,
            autocomplete,
            converter,
            disabled,
            displayOptions,
            help,
            helpHints,
            length,
            messagesCustom,
            readonly: readonlyValue,
            required,
            resizeBehavior,
            userAssistanceDensity: uadValue,
            validators,
            value,
            ...otherProps
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(FunctionalComp, { ref: textAreaRef, ...props }) }) }));
    }
    exports.TextArea = (0, ojvcomponent_1.registerCustomElement)('oj-c-text-area', (0, compat_1.forwardRef)(TextAreaImpl), "TextArea", { "properties": { "autocomplete": { "type": "string" }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "converter": { "type": "object|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "converterHint": { "type": "string", "enumValues": ["none", "display"] }, "messages": { "type": "string", "enumValues": ["none", "display"] }, "validatorHint": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "length": { "type": "object", "properties": { "countBy": { "type": "string", "enumValues": ["codePoint", "codeUnit"] }, "counter": { "type": "string", "enumValues": ["none", "remaining"] }, "max": { "type": "number|null" } } }, "maxRows": { "type": "number" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "resizeBehavior": { "type": "string", "enumValues": ["both", "none", "horizontal", "vertical"] }, "rows": { "type": "number" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "validators": { "type": "Array<object>|null" }, "value": { "type": "any", "writeback": true }, "rawValue": { "type": "string", "readOnly": true, "writeback": true }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "rawValue", "valid", "value"], "_READ_ONLY_PROPS": ["rawValue", "valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id", "autofocus"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "autocomplete": "on", "columnSpan": 1, "converter": null, "disabled": false, "displayOptions": { "converterHint": "display", "messages": "display", "validatorHint": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "length": { "countBy": "codePoint", "counter": "remaining", "max": null }, "messagesCustom": [], "required": false, "resizeBehavior": "none", "validators": [], "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/text-area',["require", "exports", "oj-c/text-area/text-area"], function (require, exports, text_area_1) {
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressBar_1.ProgressBar, { value: value === -1 ? 'indeterminate' : value, max: max, edge: edge, "aria-valuetext": otherProps['aria-valuetext'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'] }) }));
    }, "ProgressBar", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "edge": { "type": "string", "enumValues": ["none", "top"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext", "aria-label", "aria-labelledby"] } }, { "max": 100, "value": 0, "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/progress-bar',["require", "exports", "oj-c/progress-bar/progress-bar"], function (require, exports, progress_bar_1) {
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_ProgressCircle_1.ProgressCircle, { value: value === -1 ? 'indeterminate' : value, max: max, size: size, "aria-valuetext": otherProps['aria-valuetext'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'] }) }));
    }, "ProgressCircle", { "properties": { "max": { "type": "number" }, "value": { "type": "number" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-valuetext", "aria-label", "aria-labelledby"] } }, { "max": 100, "value": 0, "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/progress-circle',["require", "exports", "oj-c/progress-circle/progress-circle"], function (require, exports, progress_circle_1) {
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

define('oj-c/avatar',["require", "exports", "oj-c/avatar/avatar"], function (require, exports, avatar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Avatar = void 0;
    Object.defineProperty(exports, "Avatar", { enumerable: true, get: function () { return avatar_1.Avatar; } });
});


define('oj-c/button/button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Button", "@oracle/oraclejet-preact/UNSAFE_IconButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_Button_1, UNSAFE_IconButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    function ButtonImpl({ chroming = 'outlined', disabled = false, size = 'md', display = 'all', endIcon, startIcon, edge = 'none', tooltip, width, label, onOjAction, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' ||
            (startIcon && endIcon && display == 'icons') ||
            (!startIcon && !endIcon && display == 'icons');
        const widthSize = { width: edge === 'bottom' ? '100%' : width };
        const widthProps = width || edge !== 'none' ? { style: widthSize } : {};
        const ariaProps = { 'aria-describedby': ariaDescribedBy, 'aria-label': accessibleLabel };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalButton, { ref: buttonRef, type: "submit", variant: chroming, tooltip: tooltip, isDisabled: disabled, width: '100%', onAction: onOjAction, startIcon: startIcon, endIcon: endIcon, size: size, label: display == 'icons' ? (!startIcon && !endIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...ariaProps, ...otherProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalIconButton, { width: '100%', ref: iconButtonRef, type: "submit", variant: chroming, isDisabled: disabled, tooltip: tooltip && tooltip !== '' ? tooltip : label, onAction: onOjAction, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, ...otherProps, children: startIcon ?? endIcon }) }));
        }
    }
    exports.Button = (0, ojvcomponent_1.registerCustomElement)('oj-c-button', (0, compat_1.forwardRef)(ButtonImpl), "Button", { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["xs", "sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined", "callToAction", "danger"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.click()
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_Button_1.Button, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconButton_1.IconButton, { ref: iconButtonRef, ...props });
    });
});

define('oj-c/button',["require", "exports", "oj-c/button/button"], function (require, exports, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return button_1.Button; } });
});

define('oj-c/checkbox/useCheckboxPreact',["require", "exports", "preact/hooks", "oj-c/hooks/UNSAFE_useEditableValue/index", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, hooks_1, index_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxPreact = useCheckboxPreact;
    function useCheckboxPreact({ ['aria-describedby']: ariaDescribedBy, disabled, displayOptions, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkbox_requiredMessageDetail();
        const deferredValidators = (0, hooks_1.useMemo)(() => {
            return [
                {
                    validate: (value) => {
                        if (required && value !== true) {
                            throw new Error(requiredMessageDetail);
                        }
                        return;
                    }
                }
            ];
        }, [requiredMessageDetail, required]);
        const { methods, onCommitValue, displayValue, refreshDisplayValue, textFieldProps } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy,
            defaultDisplayValue: false,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            value: propValue
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const commitSucceeded = await onCommitValue(value);
            const newValue = commitSucceeded ? value : false;
            refreshDisplayValue(newValue);
        }, [onCommitValue, refreshDisplayValue]);
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
});


define('oj-c/checkbox/checkbox',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "ojs/ojcontext", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_Checkbox", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "./useCheckboxPreact", "css!oj-c/checkbox/checkbox-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, Context, ojvcomponent_1, UNSAFE_Checkbox_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useCheckboxPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const FunctionalCheckbox = (0, compat_1.forwardRef)(({ ['aria-describedby']: ariaDescribedBy, children, columnSpan = 1, containerReadonly: propContainerReadonly, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, messagesCustom = messagesCustomDefault, onMessagesCustomChanged, onValidChanged, onValueChanged, readonly: propReadonly, required = false, requiredMessageDetail, userAssistanceDensity: propUserAssistanceDensity, value = false }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const checkboxRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-checkbox id=${id} is ${description}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping: undefined,
            propReadonly,
            propUserAssistanceDensity
        });
        const { checkboxProps, methods } = (0, useCheckboxPreact_1.useCheckboxPreact)({
            ['aria-describedby']: ariaDescribedBy,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly: readonlyValue,
            required,
            requiredMessageDetail,
            userAssistanceDensity: uadValue,
            value
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
            userAssistanceDensity: checkboxProps.userAssistanceDensity
        });
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_Checkbox_1.Checkbox, { ref: checkboxRef, ...assistiveTextProps, ...checkboxProps, children: children }) }) }));
    });
    const Checkbox = (0, ojvcomponent_1.registerCustomElement)('oj-c-checkbox', FunctionalCheckbox, "Checkbox", { "slots": { "": {} }, "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "boolean", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "columnSpan": 1, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "messagesCustom": [], "required": false, "value": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    exports.Checkbox = Checkbox;
});

define('oj-c/checkbox',["require", "exports", "oj-c/checkbox/checkbox"], function (require, exports, checkbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkbox = void 0;
    Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function () { return checkbox_1.Checkbox; } });
});

define('oj-c/checkboxset/useCheckboxsetPreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "preact/hooks", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, hooks_1, useDeferredValidators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCheckboxsetPreact = useCheckboxsetPreact;
    function useCheckboxsetPreact({ 'aria-describedby': ariaDescribedBy, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.checkboxSet_requiredMessageDetail();
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { methods, displayValue, onCommitValue, refreshDisplayValue, textFieldProps } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy,
            defaultDisplayValue: null,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            value: propValue
        });
        const onCommitHandler = (0, hooks_1.useCallback)(async ({ value }) => {
            const valueAsArray = value ? Array.from(value) : null;
            const commitSuccessful = await onCommitValue(valueAsArray);
            const newValue = commitSuccessful ? valueAsArray : null;
            refreshDisplayValue(newValue);
        }, [onCommitValue, refreshDisplayValue]);
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
});


define('oj-c/checkboxset/checkboxset',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_CheckboxSet", "@oracle/oraclejet-preact/UNSAFE_CheckboxItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useCheckboxsetPreact", "css!oj-c/checkboxset/checkboxset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, Context, Layout_1, ojvcomponent_1, UNSAFE_CheckboxSet_1, UNSAFE_CheckboxItem_1, UNSAFE_useFormContext_1, useMergedFormContext_1, UNSAFE_useTabbableMode_1, useAssistiveText_1, useDataProvider_1, useCheckboxsetPreact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Checkboxset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const FunctionalCheckboxset = (0, compat_1.forwardRef)(({ id, options, containerReadonly: propContainerReadonly, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, disabled = false, direction = 'column', labelWrapping: propLabelWrapping, messagesCustom = messagesCustomDefault, columnSpan = 1, readonly: propReadonly, userAssistanceDensity: propUserAssistanceDensity, required = false, value = null, ...otherProps }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const checkboxsetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((description = 'Checkboxset: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const isFromDataProvider = isDataProvider(options);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { checkboxsetProps, methods } = (0, useCheckboxsetPreact_1.useCheckboxsetPreact)({
            displayOptions,
            readonly: readonlyValue,
            required,
            messagesCustom,
            disabled,
            value,
            userAssistanceDensity: uadValue,
            ...otherProps
        }, addBusyState);
        const { value: hookValue, ...checkboxsetRest } = checkboxsetProps;
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? options : undefined,
            addBusyState
        });
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
            userAssistanceDensity: uadValue
        });
        const memoizedSetValue = (0, hooks_1.useMemo)(() => (hookValue ? new Set(hookValue) : undefined), [hookValue]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_CheckboxSet_1.CheckboxSet, { ref: checkboxsetRef, direction: direction, ...assistiveTextProps, ...checkboxsetRest, userAssistanceDensity: uadValue, value: memoizedSetValue, children: dataArr.map(({ assistiveText, helpSourceLink, helpSourceText, label, value }) => ((0, jsx_runtime_1.jsx)(UNSAFE_CheckboxItem_1.CheckboxItem, { assistiveText: assistiveText, helpSourceLink: helpSourceLink, helpSourceText: helpSourceText, value: value, children: label }, value))) }) }) }));
    });
    const Checkboxset = (0, ojvcomponent_1.registerCustomElement)('oj-c-checkboxset', FunctionalCheckboxset, "Checkboxset", { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "disabled": { "type": "boolean" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "options": { "type": "Array<object>|DataProvider" }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "requiredMessageDetail": { "type": "string" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "value": { "type": "Array<string|number>|null", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "disabled": false, "direction": "column", "messagesCustom": [], "columnSpan": 1, "required": false, "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    exports.Checkboxset = Checkboxset;
});

define('oj-c/checkboxset',["require", "exports", "oj-c/checkboxset/checkboxset"], function (require, exports, checkboxset_1) {
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


define('oj-c/rating-gauge/rating-gauge',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_RatingGauge", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "@oracle/oraclejet-preact/utils/UNSAFE_stringUtils", "css!oj-c/rating-gauge/rating-gauge-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_RatingGauge_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1, UNSAFE_stringUtils_1) {
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
        const preactRatingGaugeAriaLabelledBy = (0, UNSAFE_stringUtils_1.merge)([
            otherProps['aria-labelledby'],
            otherProps.labelledBy
        ]);
        const preactRatingGaugeAriaDescribedBy = (0, UNSAFE_stringUtils_1.merge)([
            otherProps['aria-describedby'],
            otherProps.describedBy
        ]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_RatingGauge_1.RatingGauge, { isReadonly: readonly, isDisabled: disabled, value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, size: size, color: color, thresholds: thresholds, tooltip: otherProps.tooltip, datatip: otherProps.datatip?.({
                    value: hoveredVal != undefined ? hoveredVal : value
                }), onCommit: commitHandler, onInput: inputHandler, "aria-label": otherProps['aria-label'], "aria-labelledby": preactRatingGaugeAriaLabelledBy ?? undefined, "aria-describedby": preactRatingGaugeAriaDescribedBy ?? undefined }) }));
    }, "RatingGauge", { "properties": { "max": { "type": "number" }, "readonly": { "type": "boolean" }, "disabled": { "type": "boolean" }, "changed": { "type": "boolean", "writeback": true }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "color": { "type": "string", "enumValues": ["gold", "neutral"] }, "thresholds": { "type": "Array<object>" }, "datatip": { "type": "function" }, "tooltip": { "type": "string" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["changed", "value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "aria-describedby"] } }, { "max": 5, "value": 0, "size": "md", "color": "neutral", "step": 1, "readonly": false, "disabled": false, "changed": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/rating-gauge',["require", "exports", "oj-c/rating-gauge/rating-gauge"], function (require, exports, rating_gauge_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RatingGauge = void 0;
    Object.defineProperty(exports, "RatingGauge", { enumerable: true, get: function () { return rating_gauge_1.RatingGauge; } });
});

define('oj-c/select-common/utils/utils',["require", "exports", "ojs/ojdataprovider", "@oracle/oraclejet-preact/utils/UNSAFE_logger"], function (require, exports, ojdataprovider_1, UNSAFE_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_VALUE_ITEMS = exports.DEFAULT_VALUE_ITEM = exports.DEFAULT_VALUE = exports.DEFAULT_ITEM_CONTEXT = void 0;
    exports.isEmpty = isEmpty;
    exports.isSetEqual = isSetEqual;
    exports.getFilterCriterion = getFilterCriterion;
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
    function isSetEqual(a, b) {
        if (a === b)
            return true;
        if (a?.size !== b?.size)
            return false;
        const aArray = Array.from(a);
        const bArray = Array.from(b);
        return aArray.every((value, index) => value === bArray[index]);
    }
    function getFilterCriterion(dataProvider, searchText, paramMatchBy) {
        const hasSearchText = searchText && searchText.length > 0;
        if (!hasSearchText) {
            return undefined;
        }
        const arMatchBy = paramMatchBy;
        const hasMatchBy = arMatchBy && arMatchBy.length > 0;
        const filterCapability = dataProvider?.getCapability('filter');
        const hasTextFilterCapability = filterCapability && filterCapability.textFilter;
        if (dataProvider && hasSearchText && !hasTextFilterCapability) {
            (0, UNSAFE_logger_1.error)('Core Pack Select: DataProvider does not support text filter.  ' +
                'Filtering results in dropdown may not work correctly.');
        }
        const matchBy = dataProvider && hasTextFilterCapability && hasSearchText && hasMatchBy
            ? arMatchBy.reduce((result, curr) => {
                if (result) {
                    return result;
                }
                if (curr === 'unknown') {
                    return curr;
                }
                if (curr) {
                    if (filterCapability.textFilterMatching &&
                        filterCapability.textFilterMatching.matchBy &&
                        filterCapability.textFilterMatching.matchBy.indexOf(curr) > -1) {
                        return curr;
                    }
                    (0, UNSAFE_logger_1.warn)(`Core Pack Select: DataProvider does not support text filter "${curr}" matching.  ` +
                        'Filtering results in dropdown may not work as expected.');
                }
                return undefined;
            }, null)
            : undefined;
        const filterDef = matchBy ? { text: searchText, matchBy } : { text: searchText };
        const fc = ojdataprovider_1.FilterFactory.getFilter({ filterDef });
        return fc;
    }
});

define('oj-c/select-common/PRIVATE_useCache/useCache',["require", "exports", "preact/hooks", "../utils/utils"], function (require, exports, hooks_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCache = useCache;
    function useCache() {
        const cache = (0, hooks_1.useRef)(new Map());
        return (0, hooks_1.useCallback)((key, value, deps) => {
            if (isChanged(cache.current, key, deps)) {
                cache.current.set(key, { value, deps });
                return value;
            }
            return cache.current.get(key).value;
        }, []);
    }
    const isChanged = (cache, key, deps) => {
        if (!cache.has(key))
            return true;
        const oldDeps = cache.get(key).deps;
        return (oldDeps.length !== deps.length || oldDeps.some((value, index) => !isEquals(value, deps[index])));
    };
    const isEquals = (value1, value2) => {
        if (value1 === value2)
            return true;
        if (value1 instanceof Set && value2 instanceof Set) {
            return (0, utils_1.isSetEqual)(value1, value2);
        }
        return value1 === value2;
    };
});

define('oj-c/select-common/PRIVATE_useCache/index',["require", "exports", "./useCache"], function (require, exports, useCache_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCache = void 0;
    Object.defineProperty(exports, "useCache", { enumerable: true, get: function () { return useCache_1.useCache; } });
});

define('oj-c/hooks/UNSAFE_useListData/useListData',["require", "exports", "ojs/ojdatacollection-common", "ojs/ojdataproviderfactory", "preact/hooks"], function (require, exports, ojdatacollection_common_1, ojdataproviderfactory_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEmptyState = exports.useListData = void 0;
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
        const dataProvider = (0, hooks_1.useMemo)(() => wrapData(data), [data]);
        const [state, dispatch] = (0, hooks_1.useReducer)(reducer, options.initialRowsFetched === 0 ? (0, exports.getEmptyState)('atLeast') : initialState);
        const fetchRange = (0, hooks_1.useCallback)(async (range, resultsCallback) => {
            if (dataProvider == null) {
                return;
            }
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
            if (dataProvider == null) {
                return;
            }
            if (state.status === 'loading') {
                abortControllerRef.current?.abort((0, ojdatacollection_common_1.getAbortReason)());
            }
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
                if (iterator !== iteratorRef.current) {
                    return;
                }
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
            fetchSize,
            options.attributes,
            options.filterCriterion,
            options.initialRowsFetched,
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
                            if (total > 0 || (total === 0 && isDoneRef.current)) {
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
        }, [loadInitial, fetchRange]);
        const resetAndLoad = (0, hooks_1.useCallback)(() => {
            iteratorRef.current = null;
            fetchNextRef.current = null;
            totalSizeRef.current = 0;
            isDoneRef.current = false;
            if (options.initialRowsFetched === 0) {
                dispatch((0, exports.getEmptyState)('atLeast'));
            }
            else if (!options.isInitialFetchDeferred) {
                loadInitial();
            }
            else {
                dispatch({ status: 'loading', data: null });
            }
        }, [loadInitial, options.isInitialFetchDeferred, options.initialRowsFetched]);
        (0, hooks_1.useEffect)(() => {
            if (dataProvider) {
                resetAndLoad();
            }
        }, [dataProvider, resetAndLoad]);
        const handleMutation = (0, hooks_1.useCallback)((event) => {
            if (state.status === 'success' && state.data) {
                const dataState = state.data;
                let count = dataState.data.length;
                let shouldUpdate = false;
                if (event.detail.add) {
                    const itemsInserted = handleAddRemoveMutation(event.detail.add, dataState, options, true);
                    totalSizeRef.current = totalSizeRef.current + itemsInserted;
                    count = count + itemsInserted;
                    shouldUpdate = itemsInserted > 0 || dataState.sizePrecision === 'exact';
                    if (itemsInserted < event.detail.add.data.length) {
                        isDoneRef.current = false;
                    }
                }
                if (event.detail.remove) {
                    const itemsRemoved = handleAddRemoveMutation(event.detail.remove, dataState, options, false);
                    totalSizeRef.current = Math.max(0, totalSizeRef.current - itemsRemoved);
                    count = Math.max(0, count - itemsRemoved);
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
                    fetchRange({ offset: dataState.offset, count }, callback);
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
        }, [state, fetchSize, loadRange, resetAndLoad]);
        (0, hooks_1.useEffect)(() => {
            if (dataProvider) {
                dataProvider.addEventListener('refresh', handleRefresh);
                dataProvider.addEventListener('mutate', handleMutation);
            }
            return () => {
                if (dataProvider) {
                    dataProvider.removeEventListener('refresh', handleRefresh);
                    dataProvider.removeEventListener('mutate', handleMutation);
                }
            };
        }, [dataProvider, resetAndLoad, handleMutation, handleRefresh]);
        if (!data) {
            const emptyListState = (0, exports.getEmptyState)('exact');
            return [emptyListState, (_) => Promise.resolve()];
        }
        return [state, loadRange];
    };
    exports.useListData = useListData;
    const wrapData = (data) => {
        if (data == null) {
            return null;
        }
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
    exports.getEmptyState = getEmptyState;
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
            const indexes = isAdd ? detail.indexes?.sort((a, b) => a - b) : detail.indexes;
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
            if (isAdd) {
            }
            else {
                const allKeys = dataState.data.map((d) => d.metadata.key);
                detail.keys.forEach((key) => {
                    if (allKeys.includes(key)) {
                        itemCount += 1;
                    }
                });
            }
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
            const detailKeys = Array.from(detail.keys);
            const allKeys = dataState.data.map((d) => d.metadata.key);
            for (let i = 0; i < detailKeys.length; i++) {
                const key = detailKeys[i];
                if (allKeys.includes(key)) {
                    return true;
                }
            }
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

define('oj-c/select-common/PRIVATE_DebouncingDataProviderView/Debouncer',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debouncer = void 0;
    class Debouncer {
        constructor() {
            this._responseTimes = [
                { time: 900, count: 0 },
                { time: 720, count: 0 },
                { time: 600, count: 0 },
                { time: 450, count: 0 },
                { time: 360, count: 0 },
                { time: 300, count: 0 }
            ];
            this._requestTime = { time: 250, count: 0 };
            this._lastRequestTime = 0;
        }
        debounce(callback, filterTextLength) {
            const wait = this.GetDebounceTime(filterTextLength);
            return (...args) => {
                window.setTimeout(() => {
                    callback(...args);
                }, wait);
            };
        }
        recordResponseTime(time, filterTextLength) {
            const index = Math.min(filterTextLength, 5);
            const record = this._responseTimes[index];
            if (record.count === 0) {
                record.time = time;
            }
            else {
                record.time = (record.time * record.count + time) / (record.count + 1);
            }
            record.count += 1;
        }
        recordRequestTime() {
            const requestTime = Date.now();
            const lastRequestTime = this._lastRequestTime;
            this._lastRequestTime = requestTime;
            if (lastRequestTime === 0) {
                return;
            }
            const time = requestTime - lastRequestTime;
            if (time > 1000) {
                return;
            }
            const record = this._requestTime;
            if (record.count === 0) {
                record.time = time;
            }
            else {
                record.time = (record.time * record.count + time) / (record.count + 1);
            }
            record.count += 1;
        }
        _getResponseTime(filterTextLength) {
            const index = Math.min(filterTextLength, 5);
            const record = this._responseTimes[index];
            return record.time;
        }
        _getRequestTime() {
            return this._requestTime.time;
        }
        GetDebounceTime(filterTextLength) {
            const responseTime = this._getResponseTime(filterTextLength);
            const requestTime = this._getRequestTime();
            const paddedRequestTime = 1.2 * requestTime;
            if (responseTime < paddedRequestTime) {
                return 0;
            }
            const factor = (responseTime - paddedRequestTime) / responseTime;
            const debounceTime = (1 + factor) * paddedRequestTime;
            return debounceTime;
        }
    }
    exports.Debouncer = Debouncer;
});

define('oj-c/select-common/PRIVATE_DebouncingDataProviderView/DebouncingDataProviderView',["require", "exports", "ojs/ojdataprovider", "./Debouncer"], function (require, exports, ojdataprovider_1, Debouncer_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DebouncingDataProviderView = void 0;
    class AsyncIteratorWrapper {
        constructor(dataProvider, debouncer, params) {
            this._isFirstNext = true;
            this.dataProvider = dataProvider;
            this.debouncer = debouncer;
            this.params = params;
        }
        next() {
            if (this._isFirstNext) {
                this.debouncer.recordRequestTime();
                this._isFirstNext = false;
                const filterText = this.params?.filterCriterion?.text;
                const debounceCallback = (resolve, reject) => {
                    if (this.params?.signal?.aborted) {
                        reject(this.params?.signal?.reason);
                        return;
                    }
                    const asyncIterable = this.dataProvider.fetchFirst(this.params);
                    this._asyncIterator = asyncIterable[Symbol.asyncIterator]();
                    const fetchStart = Date.now();
                    const iterPromise = this._asyncIterator.next();
                    iterPromise.then((result) => {
                        const fetchEnd = Date.now();
                        this.debouncer.recordResponseTime(fetchEnd - fetchStart, filterText ? filterText.length : 0);
                        resolve(result);
                    }, reject);
                };
                const callback = (resolve, reject) => {
                    const promise = new Promise((pResolve, pReject) => {
                        this.debouncer.debounce(debounceCallback, filterText ? filterText.length : 0)(pResolve, pReject);
                    });
                    return promise.then(resolve, reject);
                };
                return (0, ojdataprovider_1.wrapWithAbortHandling)(this.params?.signal, callback, false);
            }
            return this._asyncIterator.next();
        }
    }
    class AsyncIterableWrapper {
        constructor(dataProvider, debouncer, params) {
            this[_a] = () => {
                return new AsyncIteratorWrapper(this.dataProvider, this.debouncer, this.params);
            };
            this.dataProvider = dataProvider;
            this.debouncer = debouncer;
            this.params = params;
        }
    }
    _a = Symbol.asyncIterator;
    class DebouncingDataProviderView {
        constructor(dataProvider) {
            this._debouncer = new Debouncer_1.Debouncer();
            this.dataProvider = dataProvider;
        }
        fetchFirst(params) {
            return new AsyncIterableWrapper(this.dataProvider, this._debouncer, params);
        }
        fetchByKeys(params) {
            return this.dataProvider.fetchByKeys(params);
        }
        containsKeys(params) {
            return this.dataProvider.containsKeys(params);
        }
        fetchByOffset(params) {
            return this.dataProvider.fetchByOffset(params);
        }
        getTotalSize() {
            return this.dataProvider.getTotalSize();
        }
        isEmpty() {
            return this.dataProvider.isEmpty();
        }
        getCapability(capabilityName) {
            return this.dataProvider.getCapability(capabilityName);
        }
        addEventListener(eventType, listener) {
            this.dataProvider.addEventListener(eventType, listener);
        }
        removeEventListener(eventType, listener) {
            this.dataProvider.removeEventListener(eventType, listener);
        }
        dispatchEvent(event) {
            return this.dataProvider.dispatchEvent(event);
        }
    }
    exports.DebouncingDataProviderView = DebouncingDataProviderView;
});

define('oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider',["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks", "../PRIVATE_DebouncingDataProviderView/DebouncingDataProviderView"], function (require, exports, ojdataproviderfactory_1, hooks_1, DebouncingDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapDataProvider = useWrapDataProvider;
    function useWrapDataProvider(data) {
        const dataProvider = (0, hooks_1.useMemo)(() => {
            if (!data) {
                return data;
            }
            const enhancedDP = (0, ojdataproviderfactory_1.getEnhancedDataProvider)(data, {
                fetchFirst: { caching: 'visitedByCurrentIterator' }
            });
            const filterCapability = enhancedDP.getCapability('fetchFirst');
            const isImmediate = filterCapability?.iterationSpeed === 'immediate';
            return isImmediate ? enhancedDP : new DebouncingDataProviderView_1.DebouncingDataProviderView(enhancedDP);
        }, [data]);
        return dataProvider;
    }
});

define('oj-c/select-common/UNSAFE_useWrapDataProvider/index',["require", "exports", "./useWrapDataProvider"], function (require, exports, useWrapDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useWrapDataProvider = void 0;
    Object.defineProperty(exports, "useWrapDataProvider", { enumerable: true, get: function () { return useWrapDataProvider_1.useWrapDataProvider; } });
});

define('oj-c/select-common/PRIVATE_useSelectData/CollectionTemplateDataProviderView',["require", "exports", "ojs/ojdataprovider"], function (require, exports, ojdataprovider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CollectionTemplateDataProviderView = exports.SELECT_INTERNALS = void 0;
    exports.SELECT_INTERNALS = Symbol('__SELECT_INTERNALS__');
    class CollectionTemplateDataProviderView {
        get currentDataProvider() {
            return this.overrideDataProvider ?? this.originalDataProvider;
        }
        setFilterCriterion(filter) {
            const previousFilter = this.filterCriterion;
            this.filterCriterion = filter;
            if (!this.compareFilter(previousFilter, filter)) {
                const event = new ojdataprovider_1.DataProviderRefreshEvent();
                Object.defineProperty(event, exports.SELECT_INTERNALS, {
                    value: { cause: 'filterCriterionChanged' }
                });
                this.dispatchEvent(event);
                this.options.onRefresh?.();
            }
        }
        setDataStateOverride(dataStateOverride) {
            if (this.dataStateOverride !== dataStateOverride) {
                this.dataStateOverride = dataStateOverride;
                this.overrideDataProvider =
                    this.dataStateOverride?.status === 'success'
                        ? new DataStateDataProviderView(this.dataStateOverride)
                        : undefined;
                const event = new ojdataprovider_1.DataProviderRefreshEvent();
                Object.defineProperty(event, exports.SELECT_INTERNALS, {
                    value: { cause: 'dataOverrideChanged' }
                });
                this.dispatchEvent(event);
                this.options.onRefresh?.();
            }
        }
        compareFilter(fc1, fc2) {
            if (fc1 === fc2)
                return true;
            if (fc1 === undefined || fc2 === undefined)
                return false;
            const keys1 = Object.keys(fc1);
            const keys2 = Object.keys(fc2);
            if (keys1.length !== keys2.length)
                return false;
            return keys1.every((key) => keys2.includes(key) && fc1[key] === fc2[key]);
        }
        constructor(dataProvider, options) {
            this.originalDataProvider = dataProvider;
            this.options = options;
            if (dataProvider.createOptimizedKeyMap)
                this.createOptimizedKeyMap = (initialMap) => dataProvider.createOptimizedKeyMap(initialMap);
            if (dataProvider.createOptimizedKeySet)
                this.createOptimizedKeySet = (initialMap) => dataProvider.createOptimizedKeySet(initialMap);
        }
        async fetchByOffset(parameters) {
            const overriddenParams = this.filterCriterion
                ? { ...parameters, filterCriterion: this.filterCriterion }
                : parameters;
            const results = await this.currentDataProvider.fetchByOffset(overriddenParams);
            this.options.onOffsetFetch?.({ results });
            return results;
        }
        fetchFirst(parameters) {
            const overriddenParams = this.filterCriterion
                ? { ...parameters, filterCriterion: this.filterCriterion }
                : parameters;
            const options = this.options;
            options.onInitializeFetch?.();
            const iterable = this.currentDataProvider.fetchFirst(overriddenParams);
            return {
                [Symbol.asyncIterator]() {
                    let offset = 0;
                    const iterator = iterable[Symbol.asyncIterator]();
                    return {
                        async next() {
                            const itResult = await iterator.next();
                            const { value: results, done = false } = itResult;
                            options.onNextIteration?.({ results, offset, done });
                            offset += results.data.length;
                            return itResult;
                        }
                    };
                }
            };
        }
        addEventListener(eventType, listener) {
            return this.originalDataProvider.addEventListener(eventType, listener);
        }
        containsKeys(parameters) {
            return this.currentDataProvider.containsKeys(parameters);
        }
        dispatchEvent(event) {
            return this.originalDataProvider.dispatchEvent(event);
        }
        fetchByKeys(parameters) {
            return this.currentDataProvider.fetchByKeys(parameters);
        }
        getCapability(capabilityName) {
            return this.originalDataProvider.getCapability(capabilityName);
        }
        getTotalSize() {
            return this.currentDataProvider.getTotalSize();
        }
        isEmpty() {
            return this.currentDataProvider.isEmpty();
        }
        removeEventListener(eventType, listener) {
            return this.originalDataProvider.removeEventListener(eventType, listener);
        }
    }
    exports.CollectionTemplateDataProviderView = CollectionTemplateDataProviderView;
    class DataStateDataProviderView {
        constructor(dataState) {
            this.dataState = dataState;
        }
        containsKeys(parameters) {
            const { keys } = parameters;
            const { data } = this.dataState;
            const foundKeys = new Set();
            data.data.forEach((item) => {
                if (keys.has(item.metadata.key)) {
                    foundKeys.add(item.metadata.key);
                }
            });
            return Promise.resolve({
                containsParameters: parameters,
                results: foundKeys
            });
        }
        fetchByKeys(parameters) {
            const { keys } = parameters;
            const { data } = this.dataState;
            const results = new Map();
            data.data.forEach((item) => {
                if (keys.has(item.metadata.key)) {
                    results.set(item.metadata.key, item);
                }
            });
            return Promise.resolve({
                fetchParameters: parameters,
                results
            });
        }
        fetchByOffset(parameters) {
            const { offset, size } = parameters;
            const { data } = this.dataState;
            const filteredData = data.data.slice(offset, size);
            const results = {
                fetchParameters: parameters ?? {},
                results: filteredData.map((item) => ({ data: item.data, metadata: item.metadata })),
                done: offset + (size ?? 0) >= data.totalSize
            };
            return Promise.resolve(results);
        }
        fetchFirst(parameters) {
            const { data } = this.dataState;
            return {
                [Symbol.asyncIterator]() {
                    let offset = 0;
                    const size = parameters?.size ?? 25;
                    const totalSize = data.totalSize;
                    return {
                        async next() {
                            if (offset < totalSize) {
                                const filteredData = data.data.slice(offset, size);
                                const resultsOverride = filteredData.reduce((acc, value) => {
                                    acc.data.push(value.data);
                                    acc.metadata.push(value.metadata);
                                    return acc;
                                }, { data: [], metadata: [] });
                                const results = {
                                    ...resultsOverride,
                                    fetchParameters: parameters ?? {},
                                    totalFilteredRowCount: data.totalSize
                                };
                                const adjustedSize = Math.min(size, totalSize - offset);
                                offset += offset + adjustedSize;
                                return { value: results, done: false };
                            }
                            const results = {
                                data: [],
                                metadata: [],
                                fetchParameters: parameters ?? {},
                                totalFilteredRowCount: data.totalSize
                            };
                            return { value: results, done: true };
                        }
                    };
                }
            };
        }
        getCapability() {
            return null;
        }
        getTotalSize() {
            return Promise.resolve(this.dataState.data.totalSize);
        }
        isEmpty() {
            return this.dataState.data.totalSize === 0 ? 'yes' : 'no';
        }
        addEventListener() { }
        dispatchEvent() {
            return false;
        }
        removeEventListener() { }
    }
});

define('oj-c/select-common/PRIVATE_useSelectData/useCollectionTemplateDataProviderView',["require", "exports", "oj-c/hooks/UNSAFE_useListData/useListData", "preact/hooks", "./CollectionTemplateDataProviderView"], function (require, exports, useListData_1, hooks_1, CollectionTemplateDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCollectionTemplateDataProviderView = useCollectionTemplateDataProviderView;
    function useCollectionTemplateDataProviderView({ dataProvider, options: { dataStateOverride, filterCriterion } }) {
        const [state, dispatch] = (0, hooks_1.useReducer)((reducer), {
            dataState: (0, useListData_1.getEmptyState)('atLeast')
        });
        const wrappedDP = (0, hooks_1.useMemo)(() => dataProvider == null
            ? dataProvider
            : new CollectionTemplateDataProviderView_1.CollectionTemplateDataProviderView(dataProvider, {
                onInitializeFetch() {
                    dispatch({ type: 'loading' });
                },
                onNextIteration({ results: { data, metadata, fetchParameters }, offset, done }) {
                    if (fetchParameters.signal?.aborted)
                        return;
                    const items = data.map((item, index) => ({
                        data: item,
                        metadata: metadata[index]
                    }));
                    dispatch({ type: 'append', payload: { items, offset, done } });
                },
                onOffsetFetch({ results: { results, done, fetchParameters } }) {
                    if (fetchParameters.signal?.aborted)
                        return;
                    dispatch({
                        type: 'update',
                        payload: { items: results, done, offset: fetchParameters.offset }
                    });
                },
                onRefresh() {
                    dispatch({ type: 'loading' });
                }
            }), [dataProvider]);
        const prevFilterCriterionRef = (0, hooks_1.useRef)();
        if (prevFilterCriterionRef.current !== filterCriterion) {
            prevFilterCriterionRef.current = filterCriterion;
            wrappedDP?.setFilterCriterion(filterCriterion);
        }
        const prevDataStateOverride = (0, hooks_1.useRef)();
        if (prevDataStateOverride.current !== dataStateOverride) {
            prevDataStateOverride.current = dataStateOverride;
            wrappedDP?.setDataStateOverride(dataStateOverride);
        }
        return {
            dataState: state.dataState,
            dataProvider: wrappedDP
        };
    }
    const reducer = (state, { type, payload }) => {
        switch (type) {
            case 'append': {
                const { dataState } = state;
                const prevData = dataState.status === 'success' ? dataState.data : null;
                const { done, items } = payload;
                return {
                    ...state,
                    dataState: {
                        status: 'success',
                        data: {
                            data: [...(prevData?.data ?? []), ...items],
                            offset: prevData?.offset ?? 0,
                            sizePrecision: done ? 'exact' : 'atLeast',
                            totalSize: (prevData?.data.length ?? 0) + items.length
                        }
                    }
                };
            }
            case 'update': {
                return {
                    ...state,
                    dataState: {
                        status: 'success',
                        data: {
                            data: payload.items,
                            offset: payload.offset,
                            sizePrecision: payload.done ? 'exact' : 'atLeast',
                            totalSize: payload.items.length
                        }
                    }
                };
            }
            case 'loading': {
                return {
                    ...state,
                    dataState: {
                        status: 'loading',
                        data: null
                    }
                };
            }
            default:
                return state;
        }
    };
});

define('oj-c/select-common/PRIVATE_useSelectData/useSelectData',["require", "exports", "oj-c/hooks/UNSAFE_useListData/useListData", "preact/hooks", "../UNSAFE_useWrapDataProvider/index", "./useCollectionTemplateDataProviderView"], function (require, exports, useListData_1, hooks_1, index_1, useCollectionTemplateDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectData = void 0;
    const noOp = () => { };
    const useSelectData = ({ data, dataStateOverride: propDataStateOverride, filterCriterion, hasCollectionTemplate }) => {
        const dataProvider = (0, index_1.useWrapDataProvider)(data);
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(dataProvider ?? null, {
            filterCriterion,
            initialRowsFetched: 0
        });
        const dataStateOverride = (0, hooks_1.useMemo)(() => (propDataStateOverride ? { status: 'success', data: propDataStateOverride } : undefined), [propDataStateOverride]);
        const { dataState: templateDataState, dataProvider: templateDataProvider } = (0, useCollectionTemplateDataProviderView_1.useCollectionTemplateDataProviderView)({
            dataProvider,
            options: { dataStateOverride, filterCriterion }
        });
        return {
            dataProvider: hasCollectionTemplate ? templateDataProvider : dataProvider,
            dataState: hasCollectionTemplate ? dataStateOverride ?? templateDataState : listDataState,
            onLoadRange: hasCollectionTemplate ? noOp : onLoadRange
        };
    };
    exports.useSelectData = useSelectData;
});

define('oj-c/select-common/PRIVATE_useSelectData/index',["require", "exports", "./useSelectData", "./CollectionTemplateDataProviderView"], function (require, exports, useSelectData_1, CollectionTemplateDataProviderView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SELECT_INTERNALS = exports.useSelectData = void 0;
    Object.defineProperty(exports, "useSelectData", { enumerable: true, get: function () { return useSelectData_1.useSelectData; } });
    Object.defineProperty(exports, "SELECT_INTERNALS", { enumerable: true, get: function () { return CollectionTemplateDataProviderView_1.SELECT_INTERNALS; } });
});

define('oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "preact/hooks", "../PRIVATE_useSelectData/index", "../utils/utils"], function (require, exports, UNSAFE_logger_1, hooks_1, index_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useDataProviderListeners = useDataProviderListeners;
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
        const handleRefresh = (0, hooks_1.useCallback)((event) => {
            if (!shouldHandleRefreshEvent(event))
                return;
            if (!(0, utils_1.isEmpty)(value)) {
                setValueToSync(cloneValue(value));
                setValueItemsToSync(utils_1.DEFAULT_VALUE_ITEMS);
            }
        }, [setValueItemsToSync, setValueToSync, value]);
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
        }, [isSelectMultiple, setValue, setValueItemsToSync, setValueToSync, value, valueItems]);
        (0, hooks_1.useEffect)(() => {
            dataProvider?.addEventListener('refresh', handleRefresh);
            dataProvider?.addEventListener('mutate', handleMutation);
            return () => {
                dataProvider?.removeEventListener('refresh', handleRefresh);
                dataProvider?.removeEventListener('mutate', handleMutation);
            };
        }, [dataProvider, handleMutation, handleRefresh]);
    }
    const shouldHandleRefreshEvent = (event) => {
        if (index_1.SELECT_INTERNALS in event) {
            const { cause = '' } = event[index_1.SELECT_INTERNALS];
            return !['filterCriterionChanged', 'dataOverrideChanged'].includes(cause);
        }
        return true;
    };
});

define('oj-c/utils/PRIVATE_keyUtils/keySetUtils',["require", "exports", "ojs/ojkeyset"], function (require, exports, ojkeyset_1) {
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

define('oj-c/select-multiple/useSyncValueAndValueItems',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, utils_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSyncValueAndValueItems = useSyncValueAndValueItems;
    function useSyncValueAndValueItems({ addBusyState, dataProvider, setDisplayValue, setIsLoading, setValue, setValueItems, value, valueItems, validateValueOnExternalChange }) {
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
        }, [
            addBusyState,
            dataProvider,
            hasValue,
            hasValueItems,
            setIsLoading,
            setValueItems,
            value,
            valueItems
        ]);
        const syncValueToValueItems = (0, hooks_1.useCallback)(() => {
            const updateValue = (nextValue) => {
                const validationSucceeded = validateValueOnExternalChange(nextValue);
                if (validationSucceeded) {
                    setValue(nextValue);
                    setDisplayValue(nextValue);
                }
            };
            if (!hasValueItems) {
                if (hasValue) {
                    updateValue(utils_1.DEFAULT_VALUE);
                }
                return;
            }
            const arValueItemsKeys = Array.from(valueItems.keys());
            const valueItemsKeys = new Set(arValueItemsKeys);
            if (!value || !(value instanceof Set) || value.size !== valueItemsKeys.size) {
                updateValue(valueItemsKeys);
                return;
            }
            const arValueKeys = Array.from(value.keys());
            const isDifferent = arValueItemsKeys.some((key, index) => key !== arValueKeys[index]);
            if (isDifferent) {
                updateValue(valueItemsKeys);
            }
        }, [
            hasValue,
            hasValueItems,
            setDisplayValue,
            setValue,
            validateValueOnExternalChange,
            value,
            valueItems
        ]);
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
        }, [syncValueItemsToValue, syncValueToValueItems, value, valueItems]);
    }
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
    exports.useValueItems = useValueItems;
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
});

define('oj-c/select-multiple/useSelectMultiplePreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/select-common/PRIVATE_useCache/index", "oj-c/select-common/PRIVATE_useSelectData/index", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/utils/utils", "oj-c/utils/PRIVATE_keyUtils/keySetUtils", "ojs/ojkeyset", "preact/hooks", "./useSyncValueAndValueItems", "./useValueItems"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, useDeferredValidators_1, index_2, index_3, useDataProviderListeners_1, utils_1, keySetUtils_1, ojkeyset_1, hooks_1, useSyncValueAndValueItems_1, useValueItems_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectMultiplePreact = useSelectMultiplePreact;
    function useSelectMultiplePreact({ collectionTemplate, data, disabled, displayOptions, itemTemplate, itemText, labelEdge, labelHint, labelStartWidth, matchBy: propMatchBy, messagesCustom, placeholder, readonly, required, requiredMessageDetail: propRequiredMessageDetail, textAlign, userAssistanceDensity, value: propValue, valueItems: propValueItems, virtualKeyboard, onMessagesCustomChanged, onValidChanged, onValueChanged, onValueItemsChanged, ...otherProps }, addBusyState) {
        const [filterCriterion, setFilterCriterion] = (0, hooks_1.useState)(undefined);
        const [isLoading, setIsLoading] = (0, hooks_1.useState)(data != null &&
            propValue != null &&
            propValue.size > 0 &&
            (propValueItems == null || propValueItems.size === 0));
        const matchBy = (0, hooks_1.useMemo)(() => {
            return propMatchBy && propMatchBy.length > 0 ? [...propMatchBy] : undefined;
        }, [propMatchBy]);
        const { valueItems, setValueItems, preactValueItems: arItemContexts } = (0, useValueItems_1.useValueItems)(propValueItems, onValueItemsChanged);
        const [prevArItemContexts, setPrevArItemContexts] = (0, hooks_1.useState)(arItemContexts);
        const [preactValueItems, setPreactValueItems] = (0, hooks_1.useState)(arItemContexts);
        if (prevArItemContexts !== arItemContexts && preactValueItems !== arItemContexts) {
            setPreactValueItems(arItemContexts);
        }
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.select_requiredMessageDetail();
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const onDisplayValueChanged = (0, hooks_1.useCallback)(() => {
            setPreactValueItems(arItemContexts);
        }, [arItemContexts]);
        const { methods, onCommitValue, setDisplayValue, setValue, textFieldProps, value, validateValueOnExternalChange } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            defaultDisplayValue: null,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onDisplayValueChanged,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            value: propValue
        });
        const { 'aria-describedby': ariaDescribedBy, messages } = textFieldProps;
        const hasNoValue = value === null || (value instanceof Set && value.size === 0);
        const [dataStateOverride, setDataStateOverride] = (0, hooks_1.useState)();
        const { dataProvider, dataState, onLoadRange } = (0, index_3.useSelectData)({
            data,
            dataStateOverride,
            filterCriterion,
            hasCollectionTemplate: collectionTemplate !== undefined
        });
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
            setDisplayValue: setDisplayValue,
            setIsLoading,
            setValue: setValue,
            setValueItems,
            value: valueToSync,
            valueItems: valueItemsToSync,
            validateValueOnExternalChange
        });
        const onCommit = (0, hooks_1.useCallback)(async ({ value }) => {
            const valueToCommit = (value && value.size > 0 ? value : utils_1.DEFAULT_VALUE);
            setDisplayValue(valueToCommit);
            const commitSucceeded = await onCommitValue(valueToCommit);
            if (!commitSucceeded) {
                setPreactValueItems(undefined);
            }
            else if (commitSucceeded) {
                if (value && value.size > 0 && arItemContexts?.length === value.size) {
                    const arKeys = Array.from(value);
                    const allValuesInItemContexts = arKeys.every((key, index) => {
                        return key === arItemContexts?.[index].key;
                    });
                    if (allValuesInItemContexts && preactValueItems !== arItemContexts) {
                        setPreactValueItems(arItemContexts);
                    }
                }
            }
        }, [arItemContexts, preactValueItems, onCommitValue, setDisplayValue]);
        const onFilter = (0, hooks_1.useCallback)(({ searchText }) => {
            const fc = (0, utils_1.getFilterCriterion)(dataProvider, searchText, matchBy);
            setFilterCriterion(fc);
        }, [dataProvider, matchBy]);
        const prevSelectedKeysRef = (0, hooks_1.useRef)((0, keySetUtils_1.keysToKeySet)({ all: false, keys: new Set() }));
        const itemRenderer = (0, hooks_1.useMemo)(() => {
            if (!itemTemplate)
                return undefined;
            return ({ data, metadata, searchText, selectedKeys: preactSelectedKeys, onSelectionChange: preactOnSelectionChange }) => {
                const newPreactSelectedKeys = preactSelectedKeys ?? new Set();
                const prevPreactSelectedKeys = prevSelectedKeysRef.current.keys.keys ?? new Set();
                const selectedKeys = (0, utils_1.isSetEqual)(prevPreactSelectedKeys, newPreactSelectedKeys)
                    ? prevSelectedKeysRef.current
                    : (0, keySetUtils_1.keysToKeySet)({ all: false, keys: newPreactSelectedKeys });
                prevSelectedKeysRef.current = selectedKeys;
                const onSelectedKeysChanged = ((arg) => {
                    const immutableKeySet = (arg instanceof CustomEvent ? arg.detail.value : arg);
                    const immutableSet = immutableKeySet.keys.keys;
                    if (prevSelectedKeysRef.current === immutableKeySet)
                        return;
                    preactOnSelectionChange({
                        target: arg instanceof CustomEvent ? arg.target : null,
                        value: new Set(immutableSet?.values())
                    });
                });
                return itemTemplate({
                    selectedKeys,
                    onSelectedKeysChanged,
                    item: {
                        data: data,
                        metadata: metadata
                    },
                    searchText
                });
            };
        }, [itemTemplate]);
        const stableCollectionTemplateContextRef = (0, hooks_1.useRef)();
        const cache = (0, index_2.useCache)();
        const collectionRenderer = (0, hooks_1.useMemo)(() => {
            if (!collectionTemplate)
                return undefined;
            return ({ currentRowKeyOverride, onPersistCurrentRowKey, onSelectedChange, searchText, selected, selectedOnlyData }) => {
                if (dataStateOverride !== selectedOnlyData) {
                    setDataStateOverride(selectedOnlyData);
                }
                const newCollectionTemplateContext = {
                    currentRowOverride: cache('currentRowOverride', currentRowKeyOverride ? { rowKey: currentRowKeyOverride } : undefined, [currentRowKeyOverride, searchText]),
                    data: dataProvider,
                    onCurrentRowChanged: cache('onCurrentRowChanged', ({ rowKey }) => {
                        onPersistCurrentRowKey({ value: rowKey });
                    }, [onPersistCurrentRowKey]),
                    onSelectedChanged: cache('onSelectedChanged', (detail) => {
                        if (detail.value?.keys.all === false) {
                            const immutableSet = detail.value.keys.keys;
                            const current = selected ?? new Set();
                            const next = new Set(immutableSet.values());
                            if (!(0, utils_1.isSetEqual)(current, next))
                                onSelectedChange({ value: next });
                        }
                    }, [selected, onSelectedChange]),
                    searchText,
                    selected: cache('selected', new ojkeyset_1.KeySetImpl([...(selected?.values() ?? [])]), [selected])
                };
                if (!stableCollectionTemplateContextRef.current) {
                    stableCollectionTemplateContextRef.current = newCollectionTemplateContext;
                }
                else {
                    Object.assign(stableCollectionTemplateContextRef.current, newCollectionTemplateContext);
                }
                return collectionTemplate(stableCollectionTemplateContextRef.current);
            };
        }, [cache, collectionTemplate, dataProvider, dataStateOverride]);
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
                collectionRenderer,
                data: dataState.status !== 'error' ? dataState.data : null,
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
});


define('oj-c/select-multiple/select-multiple',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectMultiple", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useSelectMultiplePreact", "ojs/ojcontext", "css!oj-c/select-multiple/select-multiple-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectMultiple_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, ojvcomponent_1, compat_1, hooks_1, useSelectMultiplePreact_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    function SelectMultipleImpl({ columnSpan = 1, containerReadonly: propContainerReadonly, data = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, matchBy = null, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, value = null, valueItems = null, virtualKeyboard = 'auto', ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const selectMultipleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-select-multiple id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { selectMultipleProps, methods, _selectItemsByValue } = (0, useSelectMultiplePreact_1.useSelectMultiplePreact)({
            data,
            disabled,
            displayOptions,
            matchBy,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            value,
            valueItems,
            virtualKeyboard,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectMultipleRef.current?.blur(),
            focus: () => selectMultipleRef.current?.focus(),
            _selectItemsByValue,
            UNSAFE_focusAndOpenDropdown: () => {
                if (rootRef.current) {
                    const rootElem = rootRef.current;
                    const run = () => rootElem.firstElementChild?.dispatchEvent(new MouseEvent('mousedown'));
                    const busyContext = Context.getContext(rootElem).getBusyContext();
                    busyContext.whenReady().then(run);
                }
            },
            ...methods
        }), [methods, _selectItemsByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectMultipleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectMultiple_1.SelectMultiple, { ref: selectMultipleRef, ...assistiveTextProps, ...selectMultipleProps, variant: variant }) }) }));
    }
    exports.SelectMultiple = (0, ojvcomponent_1.registerCustomElement)('oj-c-select-multiple', (0, compat_1.forwardRef)(SelectMultipleImpl), "SelectMultiple", { "slots": { "collectionTemplate": { "data": {} }, "itemTemplate": { "data": {} } }, "properties": { "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "matchBy": { "type": "Array<string>|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "object|null", "writeback": true }, "valueItems": { "type": "object|null", "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItems"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {}, "_selectItemsByValue": {}, "UNSAFE_focusAndOpenDropdown": {} } }, { "columnSpan": 1, "data": null, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "matchBy": null, "messagesCustom": [], "required": false, "value": null, "valueItems": null, "virtualKeyboard": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/select-multiple',["require", "exports", "oj-c/select-multiple/select-multiple"], function (require, exports, select_multiple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectMultiple = void 0;
    Object.defineProperty(exports, "SelectMultiple", { enumerable: true, get: function () { return select_multiple_1.SelectMultiple; } });
});

define('oj-c/select-single/useSyncValueAndValueItem',["require", "exports", "@oracle/oraclejet-preact/utils/UNSAFE_logger", "oj-c/editable-value/UNSAFE_useStaleIdentity/useStaleIdentity", "oj-c/select-common/utils/utils", "preact/hooks"], function (require, exports, UNSAFE_logger_1, useStaleIdentity_1, utils_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSyncValueAndValueItem = useSyncValueAndValueItem;
    function useSyncValueAndValueItem({ addBusyState, dataProvider, setDisplayValue, setIsLoading, setValue, setValueItem, value, valueItem, validateValueOnExternalChange }) {
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
        }, [
            addBusyState,
            dataProvider,
            hasValue,
            hasValueItem,
            setIsLoading,
            setStaleIdentity,
            setValueItem,
            value,
            valueItem
        ]);
        const syncValueToValueItem = (0, hooks_1.useCallback)(() => {
            const updateValue = (nextValue) => {
                const validationSucceeded = validateValueOnExternalChange(nextValue);
                if (validationSucceeded) {
                    setValue(nextValue);
                    setDisplayValue(nextValue);
                }
            };
            if (!hasValueItem) {
                if (hasValue) {
                    updateValue(utils_1.DEFAULT_VALUE);
                }
                return;
            }
            if (valueItem.key !== value) {
                updateValue(valueItem.key);
                return;
            }
        }, [
            hasValue,
            hasValueItem,
            setDisplayValue,
            setValue,
            validateValueOnExternalChange,
            value,
            valueItem
        ]);
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
        }, [syncValueItemToValue, syncValueToValueItem, value, valueItem]);
    }
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
    exports.useValueItem = useValueItem;
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
});

define('oj-c/select-single/useSelectSinglePreact',["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/select-common/PRIVATE_useCache/index", "oj-c/select-common/PRIVATE_useSelectData/index", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/utils/utils", "ojs/ojkeyset", "preact/hooks", "./useSyncValueAndValueItem", "./useValueItem"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, useDeferredValidators_1, index_2, index_3, useDataProviderListeners_1, utils_1, ojkeyset_1, hooks_1, useSyncValueAndValueItem_1, useValueItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectSinglePreact = useSelectSinglePreact;
    function useSelectSinglePreact({ advancedSearch, collectionTemplate, data, disabled, displayOptions, itemTemplate, itemText, labelEdge, labelHint, labelStartWidth, matchBy: propMatchBy, messagesCustom, placeholder, readonly, requiredMessageDetail: propRequiredMessageDetail, required, textAlign, userAssistanceDensity, value: propValue, valueItem: propValueItem, virtualKeyboard, onMessagesCustomChanged, onOjAdvancedSearchAction, onOjValueAction, onValidChanged, onValueChanged, onValueItemChanged, ...otherProps }, addBusyState) {
        const [filterCriterion, setFilterCriterion] = (0, hooks_1.useState)(undefined);
        const [isLoading, setIsLoading] = (0, hooks_1.useState)(data != null && propValue != null && propValueItem == null);
        const matchBy = (0, hooks_1.useMemo)(() => {
            return propMatchBy && propMatchBy.length > 0 ? [...propMatchBy] : undefined;
        }, [propMatchBy]);
        const { valueItem, setValueItem } = (0, useValueItem_1.useValueItem)(propValueItem, onValueItemChanged);
        const [preactValueItem, setPreactValueItem] = (0, hooks_1.useState)(valueItem);
        (0, hooks_1.useEffect)(() => {
            setPreactValueItem(valueItem);
        }, [valueItem]);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.select_requiredMessageDetail();
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const onDisplayValueChanged = (0, hooks_1.useCallback)(() => {
            setPreactValueItem(valueItem);
        }, [valueItem]);
        const { methods, onCommitValue, setDisplayValue, setValue, textFieldProps, value, validateValueOnExternalChange } = (0, index_1.useEditableValue)({
            addBusyState,
            ariaDescribedBy: otherProps['aria-describedby'],
            defaultDisplayValue: null,
            deferredValidators,
            disabled,
            displayOptions,
            messagesCustom,
            onDisplayValueChanged,
            onMessagesCustomChanged,
            onValidChanged,
            onValueChanged,
            readonly,
            value: propValue
        });
        const { 'aria-describedby': ariaDescribedBy, messages } = textFieldProps;
        const hasNoValue = value === null;
        const { dataProvider, dataState, onLoadRange } = (0, index_3.useSelectData)({
            data,
            filterCriterion,
            hasCollectionTemplate: collectionTemplate !== undefined
        });
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
            setDisplayValue,
            setIsLoading,
            setValue,
            setValueItem,
            value: valueToSync,
            valueItem: valueItemToSync,
            validateValueOnExternalChange
        });
        const onCommit = (0, hooks_1.useCallback)(async ({ previousValue, value }) => {
            const valueToCommit = value != null ? value : utils_1.DEFAULT_VALUE;
            setDisplayValue(valueToCommit);
            const commitSucceeded = await onCommitValue(valueToCommit);
            if (!commitSucceeded) {
                setPreactValueItem(undefined);
            }
            else if (commitSucceeded && dataState.status === 'success') {
                if (value == null) {
                    onOjValueAction?.({
                        itemContext: utils_1.DEFAULT_ITEM_CONTEXT,
                        previousValue: previousValue ?? utils_1.DEFAULT_VALUE,
                        value: utils_1.DEFAULT_VALUE
                    });
                }
                else if (value === valueItem?.key) {
                    onOjValueAction?.({
                        itemContext: valueItem,
                        previousValue: previousValue ?? utils_1.DEFAULT_VALUE,
                        value
                    });
                    if (preactValueItem !== valueItem) {
                        setPreactValueItem(valueItem);
                    }
                }
                else {
                    const data = dataState.data.data;
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
                        previousValue: previousValue ?? utils_1.DEFAULT_VALUE,
                        value: value ?? utils_1.DEFAULT_VALUE
                    });
                }
            }
        }, [
            dataProvider,
            dataState,
            preactValueItem,
            valueItem,
            onCommitValue,
            onOjValueAction,
            setDisplayValue
        ]);
        const onFilter = (0, hooks_1.useCallback)(({ searchText }) => {
            const fc = (0, utils_1.getFilterCriterion)(dataProvider, searchText, matchBy);
            setFilterCriterion(fc);
        }, [dataProvider, matchBy]);
        const itemRenderer = (0, hooks_1.useMemo)(() => {
            if (!itemTemplate)
                return undefined;
            return ({ data, metadata, searchText }) => {
                return itemTemplate({
                    item: {
                        data: data,
                        metadata: metadata
                    },
                    searchText
                });
            };
        }, [itemTemplate]);
        const stableCollectionTemplateContextRef = (0, hooks_1.useRef)();
        const cache = (0, index_2.useCache)();
        const collectionRenderer = (0, hooks_1.useMemo)(() => {
            if (!collectionTemplate)
                return undefined;
            return ({ currentRowKeyOverride, searchText, selected, onPersistCurrentRowKey, onRowAction }) => {
                const newCollectionTemplateContext = {
                    currentRowOverride: cache('currentRowOverride', currentRowKeyOverride ? { rowKey: currentRowKeyOverride } : undefined, [currentRowKeyOverride, searchText]),
                    data: dataProvider,
                    onCurrentRowChanged: cache('onCurrentRowChanged', ({ rowKey }) => {
                        onPersistCurrentRowKey({ value: rowKey });
                    }, [onPersistCurrentRowKey]),
                    onRowAction: cache('onRowAction', ({ item }) => {
                        onRowAction({
                            context: { data: item.data, key: item.metadata.key, metadata: item.metadata }
                        });
                    }, [onRowAction]),
                    searchText,
                    selected: cache('selected', new ojkeyset_1.KeySetImpl([...(selected?.values() ?? [])]), [selected])
                };
                if (!stableCollectionTemplateContextRef.current) {
                    stableCollectionTemplateContextRef.current = newCollectionTemplateContext;
                }
                else {
                    Object.assign(stableCollectionTemplateContextRef.current, newCollectionTemplateContext);
                }
                return collectionTemplate(stableCollectionTemplateContextRef.current);
            };
        }, [cache, collectionTemplate, dataProvider]);
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
                collectionRenderer,
                data: dataState.status !== 'error' ? dataState.data : null,
                isDisabled: disabled,
                isLoading,
                isReadonly: readonly,
                isRequired: required,
                isRequiredShown: required && (userAssistanceDensity === 'compact' || hasNoValue),
                itemRenderer,
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
                valueItem: (0, index_1.treatNull)(preactValueItem, undefined),
                virtualKeyboard
            },
            _doAdvancedSearchAction,
            _selectItemByValue
        };
    }
});


define('oj-c/select-single/select-single',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectSingle", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "./useSelectSinglePreact", "ojs/ojcontext", "css!oj-c/select-single/select-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectSingle_1, UNSAFE_useFormContext_1, UNSAFE_useFormVariantContext_1, UNSAFE_useTabbableMode_1, Layout_1, useAssistiveText_1, useMergedFormContext_1, ojvcomponent_1, compat_1, hooks_1, useSelectSinglePreact_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    function SelectSingleImpl({ advancedSearch = 'off', columnSpan = 1, containerReadonly: propContainerReadonly, data = null, disabled = false, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, id, labelWrapping: propLabelWrapping, matchBy = null, messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, value = null, valueItem = null, virtualKeyboard = 'auto', ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const selectSingleRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-select-single id=${id}: ${desc}` })
                : () => { };
        }, [id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { selectSingleProps, methods, _doAdvancedSearchAction, _selectItemByValue } = (0, useSelectSinglePreact_1.useSelectSinglePreact)({
            advancedSearch,
            data,
            disabled,
            displayOptions,
            matchBy,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
            value,
            valueItem,
            virtualKeyboard,
            ...otherProps
        }, addBusyState);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => selectSingleRef.current?.blur(),
            focus: () => selectSingleRef.current?.focus(),
            _doAdvancedSearchAction,
            _selectItemByValue,
            UNSAFE_focusAndOpenDropdown: () => {
                if (rootRef.current) {
                    const rootElem = rootRef.current;
                    const run = () => rootElem.firstElementChild?.dispatchEvent(new MouseEvent('mousedown'));
                    const busyContext = Context.getContext(rootElem).getBusyContext();
                    busyContext.whenReady().then(run);
                }
            },
            ...methods
        }), [methods, _doAdvancedSearchAction, _selectItemByValue]);
        const assistiveTextProps = (0, useAssistiveText_1.useAssistiveText)({
            displayOptions,
            help,
            helpHints,
            userAssistanceDensity: selectSingleProps.userAssistanceDensity
        });
        const variant = (0, UNSAFE_useFormVariantContext_1.useFormVariantContext)();
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectSingle_1.SelectSingle, { ref: selectSingleRef, ...assistiveTextProps, ...selectSingleProps, variant: variant }) }) }));
    }
    exports.SelectSingle = (0, ojvcomponent_1.registerCustomElement)('oj-c-select-single', (0, compat_1.forwardRef)(SelectSingleImpl), "SelectSingle", { "properties": { "advancedSearch": { "type": "string", "enumValues": ["off", "on"] }, "columnSpan": { "type": "number" }, "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "data": { "type": "DataProvider|null" }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "itemText": { "type": "string|number|function" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelHint": { "type": "string" }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "matchBy": { "type": "Array<string>|null" }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "placeholder": { "type": "string" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "textAlign": { "type": "string", "enumValues": ["end", "start", "right"] }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "string|number|null", "writeback": true }, "valueItem": { "type": "object|null", "properties": { "data": { "type": "any" }, "key": { "type": "any" }, "metadata": { "type": "object", "properties": { "indexFromParent": { "type": "number" }, "isLeaf": { "type": "boolean" }, "key": { "type": "any" }, "message": { "type": "object", "properties": { "detail": { "type": "string" }, "severity": { "type": "string|number" }, "summary": { "type": "string" } } }, "parentKey": { "type": "any" }, "suggestion": { "type": "object" }, "treeDepth": { "type": "number" } } } }, "writeback": true }, "virtualKeyboard": { "type": "string", "enumValues": ["number", "search", "auto", "url", "text", "email", "tel"] }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true } }, "slots": { "collectionTemplate": { "data": {} }, "itemTemplate": { "data": {} } }, "events": { "ojAdvancedSearchAction": {}, "ojValueAction": {} }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value", "valueItem"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {}, "_doAdvancedSearchAction": {}, "_selectItemByValue": {}, "UNSAFE_focusAndOpenDropdown": {} } }, { "advancedSearch": "off", "columnSpan": 1, "data": null, "disabled": false, "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "matchBy": null, "messagesCustom": [], "required": false, "value": null, "valueItem": null, "virtualKeyboard": "auto" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useFormVariantContext_1.FormVariantContext, UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/select-single',["require", "exports", "oj-c/select-single/select-single"], function (require, exports, select_single_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectSingle = void 0;
    Object.defineProperty(exports, "SelectSingle", { enumerable: true, get: function () { return select_single_1.SelectSingle; } });
});


define('oj-c/collapsible/collapsible',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Collapsible", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojcontext", "css!oj-c/collapsible/collapsible-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Collapsible_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collapsible = void 0;
    exports.Collapsible = (0, ojvcomponent_1.registerCustomElement)('oj-c-collapsible', ({ id, children, header, disabled = false, expanded = false, iconPosition = 'start', variant = 'basic', ...props }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const didMountRef = (0, hooks_1.useRef)(false);
        const hasBeenExpanded = (0, hooks_1.useRef)(expanded);
        const resolveBusyState = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return Context.getContext(rootRef.current)
                .getBusyContext()
                ?.addBusyState({
                description: `oj-c-collapsible: id='${id}' is ${desc}.`
            });
        }, [id]);
        (0, hooks_1.useEffect)(() => {
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (expanded) {
                hasBeenExpanded.current = true;
            }
            if (resolveBusyState.current) {
                resolveBusyState.current();
            }
            resolveBusyState.current = addBusyState('animating');
        }, [expanded, addBusyState]);
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_Collapsible_1.Collapsible, { header: header, iconPosition: iconPosition, variant: variant, isExpanded: expanded, isDisabled: disabled, onToggle: toggleHandler, onTransitionEnd: transitionEndHandler, children: (expanded || hasBeenExpanded.current) && children }) }));
    }, "Collapsible", { "slots": { "": {}, "header": {} }, "properties": { "disabled": { "type": "boolean" }, "expanded": { "type": "boolean", "writeback": true }, "iconPosition": { "type": "string", "enumValues": ["end", "start"] }, "variant": { "type": "string", "enumValues": ["basic", "horizontal-rule"] } }, "events": { "ojBeforeCollapse": { "cancelable": true }, "ojBeforeExpand": { "cancelable": true }, "ojCollapse": {}, "ojExpand": {} }, "extension": { "_WRITEBACK_PROPS": ["expanded"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["id"] } }, { "disabled": false, "expanded": false, "iconPosition": "start", "variant": "basic" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/collapsible',["require", "exports", "oj-c/collapsible/collapsible"], function (require, exports, collapsible_1) {
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
            }
        }));
        const rootRef = (0, hooks_1.useRef)(null);
        const preactRef = (0, hooks_1.useRef)(null);
        const BaseFilePicker = UNSAFE_FilePicker_1.FilePicker;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: trigger ? 'oj-c-file-picker-with-trigger' : undefined, children: (0, jsx_runtime_1.jsx)(BaseFilePicker, { __testHandlerSymbol: preactRef, capture: capture === null ? undefined : capture, isDisabled: disabled, selectionMode: selectionMode, onCommit: onCommit, onReject: onReject, accept: accept === null ? undefined : accept, primaryText: getPrimaryText(primaryText), secondaryText: getSecondaryText(secondaryText, selectionMode), "aria-label": otherProps['aria-label'], width: "100%", children: trigger }) }));
    }), "FilePicker", { "properties": { "accept": { "type": "Array<string>|null" }, "capture": { "type": "string|null", "enumValues": ["none", "environment", "user", "implementation"] }, "disabled": { "type": "boolean" }, "primaryText": { "type": "string|function" }, "secondaryText": { "type": "string|function" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "slots": { "trigger": {} }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojInvalidSelect": {}, "ojSelect": {} }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] }, "methods": { "focus": {}, "blur": {} } }, { "capture": "none", "disabled": false, "selectionMode": "multiple" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/file-picker',["require", "exports", "oj-c/file-picker/file-picker"], function (require, exports, file_picker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilePicker = void 0;
    Object.defineProperty(exports, "FilePicker", { enumerable: true, get: function () { return file_picker_1.FilePicker; } });
});


define('oj-c/meter-bar/meter-bar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MeterBar", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "@oracle/oraclejet-preact/utils/UNSAFE_stringUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "css!oj-c/meter-bar/meter-bar-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MeterBar_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1, UNSAFE_stringUtils_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterBar = void 0;
    exports.MeterBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-meter-bar', ({ max = 100, value = 0, min = 0, size = 'md', orientation = 'horizontal', step = 1, indicatorSize = 1, readonly = false, thresholdDisplay = 'indicator', baseline, ...props }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-meter-bar: ');
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
        const preactMeterBarAriaLabelledBy = (0, UNSAFE_stringUtils_1.merge)([props['aria-labelledby'], props.labelledBy]);
        const preactMeterBarAriaDescribedBy = (0, UNSAFE_stringUtils_1.merge)([props['aria-describedby'], props.describedBy]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: `oj-c-meter-bar-${orientation}${size === 'fit' ? '-fit' : ''}`, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MeterBar_1.MeterBar, { value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, min: min, size: size, orientation: orientation, indicatorSize: indicatorSize, baseline: baseline, datatip: props.datatip
                        ? props.datatip({
                            value: hoveredVal != undefined ? hoveredVal : value
                        })
                        : props.datatip, onCommit: readonly ? undefined : commitHandler, onInput: readonly ? undefined : inputHandler, length: '100%', thresholds: thresholds, referenceLines: props.referenceLines, thresholdDisplay: thresholdDisplay === 'plotArea' ? 'track' : thresholdDisplay, indicatorColor: props.color, trackColor: props.plotArea?.color, isTrackRendered: props.plotArea?.rendered !== 'off', "aria-label": props['aria-label'], "aria-labelledby": preactMeterBarAriaLabelledBy ?? undefined, "aria-describedby": preactMeterBarAriaDescribedBy ?? undefined }) }) }));
    }, "MeterBar", { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "readonly": { "type": "boolean" }, "value": { "type": "number|null", "writeback": true }, "baseline": { "type": "number" }, "step": { "type": "number" }, "color": { "type": "string" }, "indicatorSize": { "type": "number" }, "plotArea": { "type": "object", "properties": { "color": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["off", "on"] } } }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "referenceLines": { "type": "Array<object>" }, "thresholdDisplay": { "type": "string", "enumValues": ["all", "plotArea", "indicator"] }, "thresholds": { "type": "Array<object>" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg", "fit"] }, "datatip": { "type": "function" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "aria-describedby"] } }, { "max": 100, "value": 0, "min": 0, "size": "md", "orientation": "horizontal", "step": 1, "indicatorSize": 1, "readonly": false, "thresholdDisplay": "indicator" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/meter-bar',["require", "exports", "oj-c/meter-bar/meter-bar"], function (require, exports, meter_bar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterBar = void 0;
    Object.defineProperty(exports, "MeterBar", { enumerable: true, get: function () { return meter_bar_1.MeterBar; } });
});


define('oj-c/meter-circle/meter-circle',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MeterCircle", "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../utils/UNSAFE_meterUtils/meterUtils", "@oracle/oraclejet-preact/utils/UNSAFE_stringUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "css!oj-c/meter-circle/meter-circle-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MeterCircle_1, ojvcomponent_1, hooks_1, UNSAFE_useTabbableMode_1, meterUtils_1, UNSAFE_stringUtils_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterCircle = void 0;
    exports.MeterCircle = (0, ojvcomponent_1.registerCustomElement)('oj-c-meter-circle', ({ max = 100, value = 0, min = 0, size = 'md', step = 1, readonly = false, startAngle = 90, indicatorSize = 1, angleExtent = 360, thresholdDisplay = 'indicator', ...props }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-meter-bar: ');
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
        const preactMeterCircleAriaLabelledBy = (0, UNSAFE_stringUtils_1.merge)([props['aria-labelledby'], props.labelledBy]);
        const preactMeterCircleAriaDescribedBy = (0, UNSAFE_stringUtils_1.merge)([props['aria-describedby'], props.describedBy]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, class: size === 'fit' ? 'oj-c-meter-circle-fit' : undefined, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MeterCircle_1.MeterCircle, { value: (hoveredVal != undefined ? hoveredVal : value), step: step, max: max, min: min, size: size, angleExtent: angleExtent, startAngle: startAngle, indicatorSize: indicatorSize, innerRadius: props.innerRadius, datatip: props.datatip
                        ? props.datatip({
                            value: hoveredVal != undefined ? hoveredVal : value
                        })
                        : props.datatip, onCommit: readonly ? undefined : commitHandler, onInput: readonly ? undefined : inputHandler, thresholds: thresholds, trackColor: props.plotArea?.color, indicatorColor: props.color, isTrackRendered: props.plotArea?.rendered !== 'off', referenceLines: props.referenceLines, thresholdDisplay: thresholdDisplay === 'plotArea' ? 'track' : thresholdDisplay, "aria-label": props['aria-label'], "aria-labelledby": preactMeterCircleAriaLabelledBy ?? undefined, "aria-describedby": preactMeterCircleAriaDescribedBy ?? undefined, children: (context) => {
                        return props.centerTemplate?.({ value, ...context });
                    } }) }) }));
    }, "MeterCircle", { "properties": { "max": { "type": "number" }, "min": { "type": "number" }, "readonly": { "type": "boolean" }, "value": { "type": "number|null", "writeback": true }, "step": { "type": "number" }, "color": { "type": "string" }, "indicatorSize": { "type": "number" }, "innerRadius": { "type": "number" }, "plotArea": { "type": "object", "properties": { "color": { "type": "string" }, "rendered": { "type": "string", "enumValues": ["off", "on"] } } }, "angleExtent": { "type": "number" }, "startAngle": { "type": "number" }, "referenceLines": { "type": "Array<object>" }, "thresholdDisplay": { "type": "string", "enumValues": ["all", "plotArea", "indicator"] }, "thresholds": { "type": "Array<object>" }, "describedBy": { "type": "string|null" }, "labelledBy": { "type": "string|null" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg", "fit"] }, "datatip": { "type": "function" }, "transientValue": { "type": "number", "readOnly": true, "writeback": true } }, "slots": { "centerTemplate": { "data": {} } }, "extension": { "_WRITEBACK_PROPS": ["value", "transientValue"], "_READ_ONLY_PROPS": ["transientValue"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "aria-describedby"] } }, { "max": 100, "value": 0, "min": 0, "size": "md", "step": 1, "readonly": false, "startAngle": 90, "indicatorSize": 1, "angleExtent": 360, "thresholdDisplay": "indicator" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/meter-circle',["require", "exports", "oj-c/meter-circle/meter-circle"], function (require, exports, meter_circle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterCircle = void 0;
    Object.defineProperty(exports, "MeterCircle", { enumerable: true, get: function () { return meter_circle_1.MeterCircle; } });
});


define('oj-c/line-chart/line-chart',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "@oracle/oraclejet-preact/UNSAFE_VisProgressiveLoader", "@oracle/oraclejet-preact/UNSAFE_LineAreaChart", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "ojs/ojvcomponent", "../hooks/UNSAFE_useChartData/useChartData", "../utils/PRIVATE_chartUtils/events", "../utils/PRIVATE_chartUtils/legendUtils", "../hooks/UNSAFE_useLegendPosition/useLegendPosition", "../hooks/UNSAFE_useVizCategories/useVizCategories", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/UNSAFE_ChartWithLegend", "../utils/PRIVATE_chartUtils/lineAreaUtils", "oj-c/utils/PRIVATE_chartUtils/plotAreaUtils", "../utils/PRIVATE_chartUtils/axisUtils", "oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu", "css!oj-c/line-chart/line-chart-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1, UNSAFE_VisProgressiveLoader_1, UNSAFE_LineAreaChart_1, UNSAFE_VisStatusMessage_1, ojvcomponent_1, useChartData_1, events_1, legendUtils_1, useLegendPosition_1, useVizCategories_1, UNSAFE_Legend_1, UNSAFE_ChartWithLegend_1, lineAreaUtils_1, plotAreaUtils_1, axisUtils_1, useVisContextMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChart = void 0;
    const HIGHLIGHTED_DEFAULT = [];
    const SELECTION_DEFAULT = [];
    const HIDDEN_DEFAULT = [];
    const LEGEND_DEFAULT = { rendered: 'on', position: 'auto' };
    function LineChartComp({ data, hideAndShowBehavior = 'none', orientation = 'vertical', xAxis, yAxis, hoverBehavior = 'none', valueFormats, plotArea, zoomAndScroll, itemTemplate, seriesTemplate, groupTemplate, seriesComparator, groupComparator, drilling = 'off', hiddenCategories = HIDDEN_DEFAULT, timeAxisType, highlightedCategories = HIGHLIGHTED_DEFAULT, highlightMatch = 'any', selection = SELECTION_DEFAULT, selectionMode = 'none', stack = 'off', legend = LEGEND_DEFAULT, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-line-chart: ');
        const { series, groups, getDataItem, isLoading, idToDPItemMap } = (0, useChartData_1.useChartData)(data, busyStateContext.addBusyState, itemTemplate, seriesTemplate, groupTemplate, 'oj-c-line-chart-item', 'oj-c-line-chart-series', 'oj-c-line-chart-group', seriesComparator, groupComparator);
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
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection);
        const chart = series.length > 0 && groups.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_LineAreaChart_1.LineAreaChart, { type: "line", width: "100%", height: "100%", series: series, groups: groups, getDataItem: getDataItem, onItemHover: onItemInput, onItemFocus: onItemInput, dragMode: props.dragMode, drilling: drilling !== 'seriesOnly' ? drilling : undefined, onItemDrill: itemDrillHandler, onGroupDrill: groupDrillHandler, onSelectionChange: selectionChangeHandler, selectionMode: selectionMode, selectedIds: selectionMode === 'none' ? undefined : selection, orientation: orientation, xAxis: (0, axisUtils_1.getPreactAxisProps)({ ...xAxisRest, timeAxisType }), yAxis: (0, axisUtils_1.getPreactAxisProps)(yAxisRest), highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds, plotArea: (0, plotAreaUtils_1.getPlotArea)(plotArea, yMajorTick, yMinorTick, xMajorTick), hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, isStacked: stack === 'on', valueFormats: (0, lineAreaUtils_1.transformValueFormats)(valueFormats), "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined })) : (!isLoading && ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'], "aria-describedby": props['aria-describedby'], "aria-labelledby": props['aria-labelledby'] })));
        const chartLegend = isLegendRendered && legendData.length > 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { items: legendData, orientation: legendPosition === 'start' || legendPosition === 'end' ? 'vertical' : 'horizontal', hideAndShowBehavior: hideAndShowBehavior === 'none' ? 'off' : 'on', hoverBehavior: hoverBehavior, isReadOnly: !isLegendInteractive, highlightedIds: highlightedIds.length === 0 ? undefined : highlightedIds, hiddenIds: hiddenIds.length === 0 ? undefined : hiddenIds, symbolHeight: legend.symbolHeight, symbolWidth: legend.symbolWidth, halign: "center", valign: "middle", onItemAction: legendItemActionHandler, onItemHover: legendItemInputHandler, onItemFocus: legendItemInputHandler })) : undefined;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_VisProgressiveLoader_1.VisProgressiveLoader, { isLoading: isLoading, type: "line", "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], children: (0, jsx_runtime_1.jsx)(UNSAFE_ChartWithLegend_1.ChartWithLegend, { chart: chart, position: legendPosition, maxSize: legend.maxSize, size: legend.size, legend: chartLegend }) }) }) }));
    }
    exports.LineChart = (0, ojvcomponent_1.registerCustomElement)('oj-c-line-chart', LineChartComp, "LineChart", { "properties": { "groupComparator": { "type": "function" }, "stack": { "type": "string", "enumValues": ["off", "on"] }, "drilling": { "type": "string", "enumValues": ["off", "on", "groupsOnly", "seriesOnly"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "timeAxisType": { "type": "string", "enumValues": ["enabled", "mixedFrequency", "skipGaps"] }, "yAxis": { "type": "object", "properties": { "dataMax": { "type": "number" }, "dataMin": { "type": "number" }, "max": { "type": "number" }, "min": { "type": "number" }, "majorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "tickLabel": { "type": "object", "properties": { "converter": { "type": "object" }, "rendered": { "type": "string", "enumValues": ["off", "on"] }, "style": { "type": "object" } } }, "viewportMin": { "type": "number" }, "viewportMax": { "type": "number" }, "step": { "type": "number" }, "size": { "type": "number" }, "scale": { "type": "string", "enumValues": ["linear", "log"] }, "title": { "type": "string" }, "titleStyle": { "type": "object" } } }, "xAxis": { "type": "object", "properties": { "majorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "minorTick": { "type": "object", "properties": { "lineColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] } } }, "tickLabel": { "type": "object", "properties": { "converter": { "type": "object|Array<object>" }, "rendered": { "type": "string", "enumValues": ["off", "on"] }, "rotation": { "type": "string", "enumValues": ["auto", "none"] }, "style": { "type": "object" } } }, "viewportMin": { "type": "number" }, "viewportMax": { "type": "number" }, "step": { "type": "number" }, "size": { "type": "number" }, "scale": { "type": "string", "enumValues": ["linear", "log"] }, "title": { "type": "string" }, "titleStyle": { "type": "object" } } }, "plotArea": { "type": "object", "properties": { "backgroundColor": { "type": "string" } } }, "zoomAndScroll": { "type": "string", "enumValues": ["off", "live"] }, "valueFormats": { "type": "object", "properties": { "group": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "series": { "type": "object", "properties": { "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } }, "value": { "type": "object", "properties": { "converter": { "type": "object" }, "tooltipLabel": { "type": "string" }, "tooltipDisplay": { "type": "string", "enumValues": ["auto", "off"] } } } } }, "seriesComparator": { "type": "function" }, "data": { "type": "DataProvider|null" }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "dragMode": { "type": "string", "enumValues": ["pan", "zoom", "select", "off", "user"] }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["none", "withoutRescale", "withRescale"] }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "legend": { "type": "object", "properties": { "position": { "type": "string", "enumValues": ["auto", "end", "start", "top", "bottom"] }, "rendered": { "type": "string", "enumValues": ["auto", "off", "on"] }, "maxSize": { "type": "number|string" }, "size": { "type": "number|string" }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" } } }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } } }, "slots": { "itemTemplate": { "data": {} }, "seriesTemplate": { "data": {} }, "groupTemplate": { "data": {} } }, "events": { "ojItemDrill": {}, "ojSeriesDrill": {}, "ojGroupDrill": {}, "ojViewportChange": {}, "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["selection", "hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hideAndShowBehavior": "none", "orientation": "vertical", "hoverBehavior": "none", "drilling": "off", "hiddenCategories": [], "highlightedCategories": [], "highlightMatch": "any", "selection": [], "selectionMode": "none", "stack": "off", "legend": { "rendered": "on", "position": "auto" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart',["require", "exports", "oj-c/line-chart/line-chart"], function (require, exports, line_chart_1) {
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
    }, "LineChartItem", { "properties": { "seriesId": { "type": "string" }, "groupId": { "type": "Array<string>" }, "value": { "type": "number" }, "x": { "type": "string" }, "color": { "type": "string" }, "markerDisplayed": { "type": "string", "enumValues": ["auto", "off", "on"] }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerSize": { "type": "number" }, "categories": { "type": "Array<string>" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "shortDesc": { "type": "string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-item',["require", "exports", "oj-c/line-chart-item/line-chart-item"], function (require, exports, line_chart_item_1) {
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
    }, "LineChartSeries", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineType": { "type": "string", "enumValues": ["curved", "straight"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["auto", "square", "circle", "diamond", "human", "plus", "star", "triangleDown", "triangleUp"] }, "markerColor": { "type": "string" }, "markerDisplayed": { "type": "string" }, "markerSize": { "type": "number" }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-series',["require", "exports", "oj-c/line-chart-series/line-chart-series"], function (require, exports, line_chart_series_1) {
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
    }, "LineChartGroup", { "properties": { "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] }, "name": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "drilling": "inherit" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/line-chart-group',["require", "exports", "oj-c/line-chart-group/line-chart-group"], function (require, exports, line_chart_group_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineChartGroup = void 0;
    Object.defineProperty(exports, "LineChartGroup", { enumerable: true, get: function () { return line_chart_group_1.LineChartGroup; } });
});


define('oj-c/list-item-layout/list-item-layout',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ListItemLayout", "@oracle/oraclejet-preact/UNSAFE_Inset", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "ojs/ojvcomponent", "css!oj-c/list-item-layout/list-item-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ListItemLayout_1, UNSAFE_Inset_1, UNSAFE_useCollectionInteractionContext_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItemLayout = void 0;
    exports.ListItemLayout = (0, ojvcomponent_1.registerCustomElement)('oj-c-list-item-layout', ({ children, ...otherProps }) => {
        const primary = children;
        const actionSlot = otherProps.action ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-clickthrough": "disabled", children: otherProps.action })) : undefined;
        const navSlot = otherProps.navigation ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-clickthrough": "disabled", children: otherProps.navigation })) : undefined;
        const layout = otherProps.inset === 'none' ? ((0, jsx_runtime_1.jsx)(UNSAFE_ListItemLayout_1.ListItemLayout, { verticalAlignment: otherProps.verticalAlignment, primary: primary, overline: otherProps.overline, selector: otherProps.selector, leading: otherProps.leading, secondary: otherProps.secondary, tertiary: otherProps.tertiary, metadata: otherProps.metadata, trailing: otherProps.trailing, action: actionSlot, quaternary: otherProps.quaternary, navigation: navSlot })) : ((0, jsx_runtime_1.jsx)(UNSAFE_Inset_1.Inset, { variant: "listview", children: (0, jsx_runtime_1.jsx)(UNSAFE_ListItemLayout_1.ListItemLayout, { verticalAlignment: otherProps.verticalAlignment, primary: primary, overline: otherProps.overline, selector: otherProps.selector, leading: otherProps.leading, secondary: otherProps.secondary, tertiary: otherProps.tertiary, metadata: otherProps.metadata, trailing: otherProps.trailing, action: actionSlot, quaternary: otherProps.quaternary, navigation: navSlot }) }));
        return (0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: layout });
    }, "ListItemLayout", { "slots": { "": {}, "overline": {}, "selector": {}, "leading": {}, "secondary": {}, "tertiary": {}, "metadata": {}, "trailing": {}, "action": {}, "quaternary": {}, "navigation": {} }, "properties": { "inset": { "type": "string", "enumValues": ["none", "listInset"] }, "verticalAlignment": { "type": "string", "enumValues": ["top", "middle"] } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext] });
});

define('oj-c/list-item-layout',["require", "exports", "oj-c/list-item-layout/list-item-layout"], function (require, exports, list_item_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListItemLayout = void 0;
    Object.defineProperty(exports, "ListItemLayout", { enumerable: true, get: function () { return list_item_layout_1.ListItemLayout; } });
});

define('oj-c/list-view/useHandleRemoveCurrentKey',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useHandleRemoveCurrentKey = useHandleRemoveCurrentKey;
    function useHandleRemoveCurrentKey(dataState, updateCurrentKey) {
        const prevDataState = (0, hooks_1.useRef)();
        const currentKeyRef = (0, hooks_1.useRef)();
        const notifyCurrentKeyChanged = (detail) => {
            currentKeyRef.current = detail.value;
        };
        (0, hooks_1.useEffect)(() => {
            const oldDataState = prevDataState.current;
            if (currentKeyRef.current &&
                oldDataState &&
                dataState &&
                oldDataState.offset === dataState.offset &&
                oldDataState !== dataState) {
                const newKeys = dataState.data.map((dataMetadata) => {
                    return dataMetadata.metadata.key;
                });
                if (newKeys.indexOf(currentKeyRef.current) === -1) {
                    const oldKeys = oldDataState?.data.map((dataMetadata) => {
                        return dataMetadata.metadata.key;
                    });
                    let index = oldKeys.indexOf(currentKeyRef.current);
                    if (index > -1) {
                        const backward = index === oldKeys.length - 1;
                        while (index >= 0 && index < oldKeys.length) {
                            index = backward ? index - 1 : index + 1;
                            const newCurrentKey = oldKeys[index];
                            if (newKeys.indexOf(newCurrentKey) > -1) {
                                updateCurrentKey(newCurrentKey);
                                break;
                            }
                        }
                    }
                }
            }
            prevDataState.current = dataState;
        }, [dataState, updateCurrentKey]);
        return {
            notifyCurrentKeyChanged
        };
    }
});

define('oj-c/list-view/useCurrentItemOverride',["require", "exports", "preact/hooks"], function (require, exports, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCurrentItemOverride = void 0;
    const useCurrentItemOverride = (currentItemOverride) => {
        const preactOverrideRef = (0, hooks_1.useRef)();
        const [, setInternalOverride] = (0, hooks_1.useState)();
        const updateCurrentItemOverride = (0, hooks_1.useCallback)((key) => {
            setInternalOverride({ rowKey: key });
            preactOverrideRef.current = { rowKey: key };
        }, []);
        const appOverrideRef = (0, hooks_1.useRef)();
        if (appOverrideRef.current !== currentItemOverride) {
            appOverrideRef.current = currentItemOverride;
            preactOverrideRef.current = currentItemOverride;
        }
        return {
            preactCurrentItemOverride: preactOverrideRef.current,
            updateCurrentItemOverride
        };
    };
    exports.useCurrentItemOverride = useCurrentItemOverride;
});

define('oj-c/utils/PRIVATE_collectionUtils/collectionUtils',["require", "exports", "../PRIVATE_keyUtils/keySetUtils"], function (require, exports, keySetUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleOnSelectionChanged = exports.getSelectedKeys = void 0;
    const getSelectedKeys = (selected, listData, selectionMode, onSelectedChanged) => {
        const numOfSelectedItems = !selected?.keys?.all
            ? selected?.keys.keys?.size
            : listData?.data.length;
        let selectedKeys;
        if (listData &&
            listData.data.length > 0 &&
            selectionMode === 'singleRequired' &&
            numOfSelectedItems === 0) {
            selectedKeys = { all: false, keys: new Set([listData.data[0].metadata.key]) };
            onSelectedChanged && onSelectedChanged((0, keySetUtils_1.keysToKeySet)(selectedKeys));
        }
        else {
            selectedKeys = (0, keySetUtils_1.keySetToKeys)(selected);
        }
        return selectedKeys;
    };
    exports.getSelectedKeys = getSelectedKeys;
    const handleOnSelectionChanged = (selectionMode, detail, onSelectedChanged, isClickthroughDisabled) => {
        if (selectionMode !== 'singleRequired' || detail.value.keys?.size !== 0) {
            onSelectedChanged &&
                !isClickthroughDisabled(detail.target) &&
                onSelectedChanged((0, keySetUtils_1.keysToKeySet)(detail.value));
        }
    };
    exports.handleOnSelectionChanged = handleOnSelectionChanged;
});

define('oj-c/list-view/useListViewPreact',["require", "exports", "preact/hooks", "../utils/PRIVATE_keyUtils/keySetUtils", "../hooks/UNSAFE_useListData/useListData", "./useHandleRemoveCurrentKey", "./useCurrentItemOverride", "ojs/ojlogger", "../utils/PRIVATE_collectionUtils/collectionUtils"], function (require, exports, hooks_1, keySetUtils_1, useListData_1, useHandleRemoveCurrentKey_1, useCurrentItemOverride_1, Logger, collectionUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useListViewPreact = void 0;
    const useListViewPreact = ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, data: propData, gridlines, currentItemOverride, onCurrentItemChanged, selectionMode, selected, scrollPolicyOptions, onSelectedChanged, onOjItemAction, onOjFirstSelectedItem, reorderable, onOjReorder, item }, addBusyState, isClickthroughDisabled) => {
        const currentPromiseRef = (0, hooks_1.useRef)();
        const resolveBusyState = (0, hooks_1.useRef)();
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(propData, {
            fetchSize: scrollPolicyOptions?.fetchSize
        });
        const listData = listDataState.status !== 'error' ? listDataState.data : null;
        const { preactCurrentItemOverride, updateCurrentItemOverride } = (0, useCurrentItemOverride_1.useCurrentItemOverride)(currentItemOverride);
        const firstSelectedItemRef = (0, hooks_1.useRef)();
        const selectedKeys = (0, collectionUtils_1.getSelectedKeys)(selected, listData, selectionMode, onSelectedChanged);
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
        const handleOnOjFirstSelectedItem = (0, hooks_1.useCallback)((data) => {
            if (selected && onOjFirstSelectedItem && propData) {
                const selectedKeys = (0, keySetUtils_1.keySetToKeys)(selected);
                if (!(0, keySetUtils_1.isEmpty)(selectedKeys)) {
                    const firstSelectedKey = (0, keySetUtils_1.getFirstKey)(selectedKeys, data);
                    const firstSelectedItem = data.find((listItem) => firstSelectedKey === listItem.metadata.key);
                    if (firstSelectedItem) {
                        const data = firstSelectedItem.data;
                        if (firstSelectedItemRef.current === undefined ||
                            data !== firstSelectedItemRef.current.data) {
                            const detail = { key: firstSelectedKey, data };
                            firstSelectedItemRef.current = { ...detail };
                            onOjFirstSelectedItem(detail);
                        }
                    }
                    else {
                        const initialPromise = propData.fetchByKeys({
                            keys: new Set([firstSelectedKey])
                        });
                        currentPromiseRef.current = initialPromise;
                        initialPromise.then((value) => {
                            if (initialPromise === currentPromiseRef.current) {
                                const item = value.results.get(firstSelectedKey);
                                if (item === undefined) {
                                    Logger.warn(`Item with '${firstSelectedKey}' key couldn't be found `);
                                }
                                else {
                                    const detail = { key: firstSelectedKey, data: item.data };
                                    firstSelectedItemRef.current = { ...detail };
                                    onOjFirstSelectedItem(detail);
                                }
                            }
                        });
                    }
                }
            }
        }, [selected, onOjFirstSelectedItem, propData, listData]);
        (0, hooks_1.useEffect)(() => {
            if (selectionMode === 'singleRequired' && listData && listData.data.length > 0) {
                handleOnOjFirstSelectedItem(listData.data);
            }
        }, [selectionMode, listData, handleOnOjFirstSelectedItem]);
        const handleOnSelectionChange = (detail) => {
            (0, collectionUtils_1.handleOnSelectionChanged)(selectionMode, detail, onSelectedChanged, isClickthroughDisabled);
        };
        (0, hooks_1.useEffect)(() => {
            const _listener = (event) => {
                if (onOjFirstSelectedItem && event.detail.update && firstSelectedItemRef.current) {
                    const detail = event.detail.update;
                    const index = Array.from(detail.keys).indexOf(firstSelectedItemRef.current.key);
                    if (index > -1 && detail.data && index < detail.data.length) {
                        const newData = detail.data[index];
                        if (firstSelectedItemRef.current.data !== newData) {
                            firstSelectedItemRef.current.data = newData;
                            const detail = { ...firstSelectedItemRef.current };
                            onOjFirstSelectedItem(detail);
                        }
                    }
                }
            };
            if (propData) {
                propData.addEventListener('mutate', _listener);
            }
            return () => {
                if (propData) {
                    propData.removeEventListener('mutate', _listener);
                }
            };
        }, [propData, onOjFirstSelectedItem]);
        const dataState = listDataState.status === 'error' ? null : listDataState.data;
        const { notifyCurrentKeyChanged } = (0, useHandleRemoveCurrentKey_1.useHandleRemoveCurrentKey)(dataState, updateCurrentItemOverride);
        const preactOnPersistCurrentItem = (detail) => {
            onCurrentItemChanged?.(detail.value);
            notifyCurrentKeyChanged(detail);
        };
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
                currentItemOverride: preactCurrentItemOverride,
                getRowKey,
                gridlines,
                onPersistCurrentItem: preactOnPersistCurrentItem,
                hasMore: listData ? listData.sizePrecision === 'atLeast' : false,
                onLoadMore,
                onSelectionChange: handleOnSelectionChange,
                selectedKeys,
                selectionMode: selectionMode === 'singleRequired' ? 'single' : selectionMode,
                promotedSection: suggestions,
                onItemAction: (detail) => {
                    const item = detail.context.data;
                    const itemActionDetail = { context: { item, data: item.data } };
                    onOjItemAction &&
                        !isClickthroughDisabled(detail.target) &&
                        onOjItemAction(itemActionDetail);
                },
                onReorder: reorderable?.items === 'enabled'
                    ? (detail) => {
                        onOjReorder && onOjReorder(detail);
                    }
                    : null,
                viewportConfig,
                itemPadding: item?.padding
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

define('oj-c/list-view/DataFetchLiveRegion',["require", "exports", "preact/jsx-runtime", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_LiveRegion", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, jsx_runtime_1, hooks_1, UNSAFE_LiveRegion_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataFetchLiveRegion = void 0;
    const MSG_DELAY = 50;
    const DataFetchLiveRegion = (props) => {
        const [isFetchingMsgRendered, setFetchingMsgRendered] = (0, hooks_1.useState)(false);
        (0, hooks_1.useEffect)(() => {
            let timeoutId;
            if (props.isFetching) {
                timeoutId = setTimeout(() => {
                    if (props.isFetching) {
                        setFetchingMsgRendered(true);
                    }
                }, MSG_DELAY);
            }
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            };
        }, [props.isFetching]);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        if (props.isFetching) {
            return (0, jsx_runtime_1.jsx)(UNSAFE_LiveRegion_1.LiveRegion, { timeout: MSG_DELAY, children: translations.list_msgFetchingData() });
        }
        return isFetchingMsgRendered ? ((0, jsx_runtime_1.jsx)(UNSAFE_LiveRegion_1.LiveRegion, { timeout: 0, children: translations.list_msgFetchCompleted() })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
    };
    exports.DataFetchLiveRegion = DataFetchLiveRegion;
});

define('oj-c/hooks/PRIVATE_useSelectionContext/ItemKeyContext',["require", "exports", "preact"], function (require, exports, preact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemKeyContext = void 0;
    exports.ItemKeyContext = (0, preact_1.createContext)(undefined);
});

define('oj-c/list-view/listViewItem',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../hooks/PRIVATE_useSelectionContext/ItemKeyContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, jsx_runtime_1, UNSAFE_useTabbableMode_1, ItemKeyContext_1, UNSAFE_useTranslationBundle_1) {
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
        return ((0, jsx_runtime_1.jsx)(ItemKeyContext_1.ItemKeyContext.Provider, { value: context.metadata.key, children: (0, jsx_runtime_1.jsxs)(UNSAFE_useTabbableMode_1.TabbableModeContext.Provider, { value: { isTabbable }, children: [itemTemplate && itemTemplate(itemContext), itemContext.item.metadata?.suggestion && ((0, jsx_runtime_1.jsx)("span", { class: "oj-helper-hidden-accessible", children: translations.list_suggestion() }))] }) }));
    };
    exports.ListItem = ListItem;
});

define('oj-c/hooks/PRIVATE_useSelectionContext/SelectionContext',["require", "exports", "preact"], function (require, exports, preact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionContext = void 0;
    exports.SelectionContext = (0, preact_1.createContext)(undefined);
});


define('oj-c/list-view/list-view',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "@oracle/oraclejet-preact/UNSAFE_ListView", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "./useListViewPreact", "./DataFetchLiveRegion", "./listViewItem", "../utils/PRIVATE_ItemsMenu/items-menu", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "css!oj-c/list-view/list-view-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, ojvcomponent_1, compat_1, hooks_1, UNSAFE_EmptyList_1, UNSAFE_ListView_1, UNSAFE_useTranslationBundle_1, UNSAFE_useCollectionInteractionContext_1, useListViewPreact_1, DataFetchLiveRegion_1, listViewItem_1, items_menu_1, SelectionContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListView = void 0;
    const ListViewPreactWrapper = ({ addBusyState, isClickthroughDisabled, itemTemplate, noData, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...rest }) => {
        const { status, listViewProps } = (0, useListViewPreact_1.useListViewPreact)(rest, addBusyState, isClickthroughDisabled);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const itemsRenderer = (0, hooks_1.useCallback)((context) => {
            const item = context.data;
            const itemDetail = { item, data: item.data };
            const items = contextMenuConfig?.items(itemDetail);
            return ((0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, onOjMenuAction: ({ key }) => {
                    onOjContextMenuAction?.({
                        menuItemKey: key,
                        contextMenuContext: itemDetail
                    });
                }, onOjMenuSelection: ({ value, menuSelectionGroupKey }) => {
                    onOjContextMenuSelection?.({
                        value,
                        menuSelectionGroupKey,
                        contextMenuContext: itemDetail
                    });
                } }));
        }, [contextMenuConfig?.items, onOjContextMenuAction, onOjContextMenuSelection]);
        const preactContextMenuConfig = (0, hooks_1.useMemo)(() => {
            return {
                itemsRenderer,
                accessibleLabel: contextMenuConfig?.accessibleLabel
            };
        }, [contextMenuConfig?.accessibleLabel, itemsRenderer]);
        if (status === 'success' && !listViewProps.hasMore && listViewProps.data?.length === 0) {
            if (noData) {
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noData(compat_1.Children) }));
            }
            else {
                const noDataContent = translations.noData_message();
                return ((0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { "aria-label": listViewProps['aria-label'], "aria-labelledby": listViewProps['aria-labelledby'], children: noDataContent }));
            }
        }
        const selectInfo = {
            selected: listViewProps.selectedKeys,
            selectionMode: listViewProps.selectionMode,
            onSelectedChange: rest.onSelectedChanged
        };
        return ((0, jsx_runtime_1.jsxs)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: [(0, jsx_runtime_1.jsx)(UNSAFE_ListView_1.ListView, { ...listViewProps, ...(contextMenuConfig && {
                        contextMenuConfig: preactContextMenuConfig
                    }), children: (0, hooks_1.useCallback)((context) => {
                        return (0, jsx_runtime_1.jsx)(listViewItem_1.ListItem, { context: context, itemTemplate: itemTemplate });
                    }, [itemTemplate]) }), (0, jsx_runtime_1.jsx)(DataFetchLiveRegion_1.DataFetchLiveRegion, { isFetching: status === 'loading' })] }));
    };
    const ListViewImpl = ({ selectionMode = 'none', reorderable = { items: 'disabled' }, item = { padding: 'disabled' }, ...rest }) => {
        const rootRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({
                    description: `oj-c-list-view: ${desc}`
                })
                : () => { };
        }, []);
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target === null || rootRef.current === undefined) {
                return false;
            }
            return isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const props = {
            selectionMode,
            reorderable,
            item,
            ...rest
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(ListViewPreactWrapper, { addBusyState: addBusyState, isClickthroughDisabled: isClickthroughDisabled, ...props }) }));
    };
    exports.ListView = (0, ojvcomponent_1.registerCustomElement)('oj-c-list-view', ListViewImpl, "ListView", { "properties": { "currentItem": { "type": "string|number", "readOnly": true, "writeback": true }, "currentItemOverride": { "type": "object", "properties": { "rowKey": { "type": "string|number" } } }, "data": { "type": "DataProvider|null" }, "gridlines": { "type": "object", "properties": { "item": { "type": "string", "enumValues": ["hidden", "visible"] }, "top": { "type": "string", "enumValues": ["hidden", "visible"] }, "bottom": { "type": "string", "enumValues": ["hidden", "visible"] } } }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" }, "scroller": { "type": "string" } } }, "selected": { "type": "object", "writeback": true }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single", "singleRequired"] }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } }, "reorderable": { "type": "object", "properties": { "items": { "type": "string", "enumValues": ["disabled", "enabled"] } } }, "item": { "type": "object", "properties": { "padding": { "type": "string|object" } } } }, "slots": { "itemTemplate": { "data": {} }, "noData": { "data": {} } }, "events": { "ojItemAction": {}, "ojFirstSelectedItem": {}, "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true }, "ojReorder": {} }, "extension": { "_WRITEBACK_PROPS": ["currentItem", "selected"], "_READ_ONLY_PROPS": ["currentItem"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] } }, { "selectionMode": "none", "reorderable": { "items": "disabled" }, "item": { "padding": "disabled" } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext] });
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

define('oj-c/list-view',["require", "exports", "oj-c/list-view/list-view"], function (require, exports, list_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListView = void 0;
    Object.defineProperty(exports, "ListView", { enumerable: true, get: function () { return list_view_1.ListView; } });
});

define('oj-c/radioset/useRadiosetPreact',["require", "exports", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/hooks/UNSAFE_useEditableValue/index", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle"], function (require, exports, useDeferredValidators_1, index_1, UNSAFE_useTranslationBundle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRadiosetPreact = useRadiosetPreact;
    function useRadiosetPreact({ direction, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, ...otherProps }, addBusyState) {
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const requiredMessageDetail = propRequiredMessageDetail || translations.radio_requiredMessageDetail();
        const deferredValidators = (0, useDeferredValidators_1.useDeferredValidators)({
            labelHint,
            required,
            requiredMessageDetail
        });
        const { value, methods, textFieldProps } = (0, index_1.useEditableValue)({
            ariaDescribedBy: otherProps['aria-describedby'],
            deferredValidators,
            defaultDisplayValue: null,
            disabled,
            displayOptions,
            messagesCustom,
            readonly,
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
});


define('oj-c/radioset/radioset',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_RadioItem", "@oracle/oraclejet-preact/UNSAFE_RadioSet", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormContext", "oj-c/hooks/UNSAFE_useMergedFormContext/useMergedFormContext", "oj-c/editable-value/UNSAFE_useAssistiveText/useAssistiveText", "ojs/ojvcomponent", "preact/hooks", "preact/compat", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "./useRadiosetPreact", "ojs/ojcontext", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "css!oj-c/radioset/radioset-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_RadioItem_1, UNSAFE_RadioSet_1, UNSAFE_useTabbableMode_1, UNSAFE_useFormContext_1, useMergedFormContext_1, useAssistiveText_1, ojvcomponent_1, hooks_1, compat_1, useDataProvider_1, useRadiosetPreact_1, Context, Layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radioset = void 0;
    function isDataProvider(options) {
        return options && 'fetchFirst' in options;
    }
    const displayOptionsDefault = {
        messages: 'display'
    };
    const helpDefault = {
        instruction: ''
    };
    const helpHintsDefault = {
        definition: '',
        source: ''
    };
    const messagesCustomDefault = [];
    const FunctionalRadioset = (0, compat_1.forwardRef)(({ containerReadonly: propContainerReadonly, displayOptions = displayOptionsDefault, help = helpDefault, helpHints = helpHintsDefault, labelWrapping: propLabelWrapping, columnSpan = 1, disabled = false, direction = 'column', messagesCustom = messagesCustomDefault, readonly: propReadonly, required = false, userAssistanceDensity: propUserAssistanceDensity, value = null, ...otherProps }, ref) => {
        const { options } = otherProps;
        const rootRef = (0, hooks_1.useRef)();
        const radiosetRef = (0, hooks_1.useRef)();
        const addBusyState = (0, hooks_1.useCallback)((desc = 'Radioset: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-radioset id=${otherProps.id} is ${desc}` })
                : () => { };
        }, [otherProps.id]);
        const { containerProps, uadValue, readonlyValue } = (0, useMergedFormContext_1.useMergedFormContext)({
            propContainerReadonly,
            propLabelWrapping,
            propReadonly,
            propUserAssistanceDensity
        });
        const { radiosetProps, methods } = (0, useRadiosetPreact_1.useRadiosetPreact)({
            direction,
            disabled,
            displayOptions,
            messagesCustom,
            readonly: readonlyValue,
            required,
            userAssistanceDensity: uadValue,
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
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: otherProps.id, ref: rootRef, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormContext_1.FormContext.Provider, { value: containerProps, children: (0, jsx_runtime_1.jsx)(UNSAFE_RadioSet_1.RadioSet, { ref: radiosetRef, direction: direction, ...assistiveTextProps, ...radiosetProps, children: dataArr.map((radioItem) => ((0, jsx_runtime_1.jsx)(UNSAFE_RadioItem_1.RadioItem, { assistiveText: radioItem.assistiveText, helpSourceLink: radioItem.helpSourceLink, helpSourceText: radioItem.helpSourceText, value: radioItem.value, children: radioItem.label }, radioItem.value))) }) }) }));
    });
    exports.Radioset = (0, ojvcomponent_1.registerCustomElement)('oj-c-radioset', FunctionalRadioset, "Radioset", { "properties": { "containerReadonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "disabled": { "type": "boolean" }, "displayOptions": { "type": "object", "properties": { "messages": { "type": "string", "enumValues": ["none", "display"] } } }, "help": { "type": "object", "properties": { "instruction": { "type": "string" } } }, "helpHints": { "type": "object", "properties": { "definition": { "type": "string" }, "source": { "type": "string" }, "sourceText": { "type": "string" } } }, "labelHint": { "type": "string" }, "labelEdge": { "type": "string", "enumValues": ["none", "start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" } } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" } } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" } } }, "messagesCustom": { "type": "Array<object>", "writeback": true }, "options": { "type": "Array<object>|DataProvider" }, "valid": { "type": "string", "enumValues": ["pending", "valid", "invalidHidden", "invalidShown"], "readOnly": true, "writeback": true }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" } } }, "required": { "type": "boolean" }, "requiredMessageDetail": { "type": "string" }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" } } }, "value": { "type": "string|number|null", "writeback": true } }, "extension": { "_WRITEBACK_PROPS": ["messagesCustom", "valid", "value"], "_READ_ONLY_PROPS": ["valid"], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "id"] }, "methods": { "blur": {}, "focus": {}, "showMessages": {}, "reset": {}, "validate": {} } }, { "displayOptions": { "messages": "display" }, "help": { "instruction": "" }, "helpHints": { "definition": "", "source": "" }, "columnSpan": 1, "disabled": false, "direction": "column", "messagesCustom": [], "required": false, "value": null }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/radioset',["require", "exports", "oj-c/radioset/radioset"], function (require, exports, radioset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Radioset = void 0;
    Object.defineProperty(exports, "Radioset", { enumerable: true, get: function () { return radioset_1.Radioset; } });
});


define('oj-c/split-menu-button/split-menu-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_SplitMenuButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "../utils/PRIVATE_ItemsMenu/items-menu", "preact/hooks", "preact/compat", "css!oj-c/split-menu-button/split-menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_SplitMenuButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, items_menu_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitMenuButton = void 0;
    function SplitMenuButtonImpl({ label, chroming = 'outlined', disabled = false, size = 'md', items = [], width, tooltip, onOjMenuAction, onOjAction, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const widthSize = width ? { width: width } : {};
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => buttonRef.current?.blur(),
            focus: () => buttonRef.current?.focus(),
            click: () => buttonRef.current?.click()
        }), [buttonRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { style: widthSize, ref: rootRef, children: (0, jsx_runtime_1.jsx)(FunctionalSplitMenuButton, { tooltip: tooltip, label: label, ref: buttonRef, variant: chroming, size: size, width: '100%', "aria-describedby": ariaDescribedBy, isDisabled: disabled, onAction: onOjAction, ...otherProps, children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { isSplitMenu: true, items: items, onOjMenuAction: onOjMenuAction }) }) }));
    }
    exports.SplitMenuButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-split-menu-button', (0, compat_1.forwardRef)(SplitMenuButtonImpl), "SplitMenuButton", { "properties": { "label": { "type": "string" }, "items": { "type": "Array<object>" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "outlined", "callToAction"], "binding": { "consume": { "name": "containerChroming" } } } }, "events": { "ojMenuAction": { "bubbles": true }, "ojAction": { "bubbles": true } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["aria-describedby"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "items": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalSplitMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.dispatchEvent(new Event('ojAction', { bubbles: true }))
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_SplitMenuButton_1.SplitMenuButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
});

define('oj-c/split-menu-button',["require", "exports", "oj-c/split-menu-button/split-menu-button"], function (require, exports, split_menu_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SplitMenuButton = void 0;
    Object.defineProperty(exports, "SplitMenuButton", { enumerable: true, get: function () { return split_menu_button_1.SplitMenuButton; } });
});

define('oj-c/hooks/PRIVATE_useSelectionContext/useSelectionContext',["require", "exports", "preact/hooks", "./SelectionContext"], function (require, exports, hooks_1, SelectionContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useSelectionContext = useSelectionContext;
    function useSelectionContext() {
        return (0, hooks_1.useContext)(SelectionContext_1.SelectionContext);
    }
});

define('oj-c/hooks/PRIVATE_useSelectionContext/useItemKeyContext',["require", "exports", "preact/hooks", "./ItemKeyContext"], function (require, exports, hooks_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useItemKeyContext = useItemKeyContext;
    function useItemKeyContext() {
        return (0, hooks_1.useContext)(ItemKeyContext_1.ItemKeyContext);
    }
});

define('oj-c/selector/selector',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Selector", "preact/hooks", "ojs/ojvcomponent", "../utils/PRIVATE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../hooks/PRIVATE_useSelectionContext/useSelectionContext", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "../hooks/PRIVATE_useSelectionContext/useItemKeyContext", "../hooks/PRIVATE_useSelectionContext/ItemKeyContext"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Selector_1, hooks_1, ojvcomponent_1, keySetUtils_1, UNSAFE_useCollectionInteractionContext_1, UNSAFE_useTabbableMode_1, useSelectionContext_1, SelectionContext_1, useItemKeyContext_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    const SelectorImpl = ({ rowKey, selectedKeys, indeterminate = false, selectionMode, onSelectedKeysChanged, ...otherProps }) => {
        const itemKey = (0, useItemKeyContext_1.useItemKeyContext)();
        if (itemKey !== undefined) {
            rowKey = itemKey;
        }
        const selectionInfo = (0, useSelectionContext_1.useSelectionContext)();
        let keys = undefined;
        if (selectionInfo) {
            keys = selectionInfo.selected;
            onSelectedKeysChanged = selectionInfo.onSelectedChange;
            if (selectionInfo.selectionMode && selectionInfo.selectionMode !== 'none') {
                selectionMode = selectionInfo.selectionMode;
            }
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Selector_1.Selector, { isPartial: indeterminate, rowKey: rowKey, selectedKeys: keys == null ? (0, keySetUtils_1.keySetToKeys)(selectedKeys) : keys, selectionMode: selectionMode == null ? 'multiple' : selectionMode, "aria-label": otherProps['aria-label'], onChange: (0, hooks_1.useCallback)((detail) => {
                    const keySet = (0, keySetUtils_1.keysToKeySet)(detail.value);
                    if (onSelectedKeysChanged) {
                        onSelectedKeysChanged(keySet);
                    }
                }, [onSelectedKeysChanged]) }, rowKey) }));
    };
    exports.Selector = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector', SelectorImpl, "Selector", { "properties": { "rowKey": { "type": "string|number" }, "selectedKeys": { "type": "object", "writeback": true }, "indeterminate": { "type": "boolean" }, "selectionMode": { "type": "string", "enumValues": ["multiple", "single"] } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label"] } }, { "indeterminate": false }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, {
        consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext, UNSAFE_useTabbableMode_1.TabbableModeContext, SelectionContext_1.SelectionContext, ItemKeyContext_1.ItemKeyContext]
    });
});

define('oj-c/selector',["require", "exports", "oj-c/selector/selector"], function (require, exports, selector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selector = void 0;
    Object.defineProperty(exports, "Selector", { enumerable: true, get: function () { return selector_1.Selector; } });
});

define('oj-c/selector-all/selector-all',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_SelectorAll", "ojs/ojvcomponent", "../utils/PRIVATE_keyUtils/keySetUtils"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_SelectorAll_1, ojvcomponent_1, keySetUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectorAll = void 0;
    const SelectorAllImpl = ({ selectedKeys, onSelectedKeysChanged, showTooltip, ...otherProps }) => {
        const keys = selectedKeys.keys;
        const selected = (keys.all
            ? keys.deletedKeys.size > 0
                ? 'partial'
                : 'all'
            : keys.keys.size > 0
                ? 'partial'
                : 'none');
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_SelectorAll_1.SelectorAll, { selected: selected, onChange: (detail) => {
                    onSelectedKeysChanged?.((0, keySetUtils_1.keysToKeySet)(detail.value));
                }, showTooltip: showTooltip, ...otherProps }) }));
    };
    exports.SelectorAll = (0, ojvcomponent_1.registerCustomElement)('oj-c-selector-all', SelectorAllImpl, "SelectorAll", { "properties": { "selectedKeys": { "type": "object", "writeback": true }, "showTooltip": { "type": "string", "enumValues": ["disabled", "enabled"] } }, "extension": { "_WRITEBACK_PROPS": ["selectedKeys"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/selector-all',["require", "exports", "oj-c/selector-all/selector-all"], function (require, exports, selector_all_1) {
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
        lineStyle: 'solid',
        drilling: 'inherit'
    };
    exports.LegendItem = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend-item', ({ markerShape = exports.LegendItemDefaults.markerShape, symbolType = exports.LegendItemDefaults.symbolType, borderColor = exports.LegendItemDefaults.borderColor, categories = exports.LegendItemDefaults.categories, lineStyle = exports.LegendItemDefaults.lineStyle, drilling = exports.LegendItemDefaults.drilling, ...props }) => {
        return null;
    }, "LegendItem", { "properties": { "text": { "type": "string" }, "categories": { "type": "Array<string>" }, "symbolType": { "type": "string", "enumValues": ["marker", "image", "line", "lineWithMarker"] }, "source": { "type": "string" }, "color": { "type": "string" }, "borderColor": { "type": "string" }, "lineStyle": { "type": "string", "enumValues": ["dashed", "solid", "dotted"] }, "lineWidth": { "type": "number" }, "markerShape": { "type": "string", "enumValues": ["square", "circle", "ellipse", "diamond", "human", "plus", "star", "triangleDown", "triangleUp", "rectangle"] }, "markerColor": { "type": "string" }, "shortDesc": { "type": "string" }, "drilling": { "type": "string", "enumValues": ["inherit", "off", "on"] } } }, { "markerShape": "square", "symbolType": "marker", "borderColor": "", "categories": [], "lineStyle": "solid", "drilling": "inherit" }, {
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
    }, "LegendSection", { "properties": { "text": { "type": "string" } } }, { "text": "" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/legend/utils',["require", "exports", "../legend-item/legend-item", "../legend-section/legend-section"], function (require, exports, legend_item_1, legend_section_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDefaultSymbolDims = void 0;
    exports.getTextStyles = getTextStyles;
    exports.getSectionStyles = getSectionStyles;
    exports.isLegendInteractive = isLegendInteractive;
    exports.parseItemIdx = parseItemIdx;
    exports.transformItem = transformItem;
    exports.transformSection = transformSection;
    exports.isTreeDataProvider = isTreeDataProvider;
    exports.isLegendItemDrillable = isLegendItemDrillable;
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
    function isLegendInteractive(drilling, hideAndShowBehavior, hoverBehavior, hasDrillableItem, isContextMenuEnabled) {
        return (drilling === 'on' ||
            hideAndShowBehavior === 'on' ||
            hoverBehavior === 'dim' ||
            hasDrillableItem ||
            isContextMenuEnabled);
    }
    function parseItemIdx(id) {
        return id.split(';').map((i) => parseInt(i, 10));
    }
    function transformItem(dataItem, sectionIndex, itemIndex, ariaLabelSuffix, drilling, hideAndShowBehavior, isContextMenuEnabled) {
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
            actionable: hideAndShowBehavior === 'on' || isContextMenuEnabled
                ? 'inherit'
                : isLegendItemDrillable(drilling, item.drilling),
            id: `${sectionIndex};${itemIndex}`
        };
    }
    function transformSection(dataSection, ariaLabelSuffix, sectionIndex, drilling) {
        const section = { ...legend_section_1.LegendSectionDefaults, ...dataSection };
        return {
            items: section.items.map((item, itemIndex) => transformItem(item, sectionIndex, itemIndex, ariaLabelSuffix, drilling)),
            title: section.text || section.title,
            id: `${sectionIndex}`
        };
    }
    function isTreeDataProvider(dataprovider) {
        if (dataprovider && dataprovider['getChildDataProvider']) {
            return true;
        }
        return false;
    }
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
    function isLegendItemDrillable(drilling, itemDrilling) {
        let actionable = 'inherit';
        if (itemDrilling === 'on') {
            return actionable;
        }
        else if (itemDrilling === 'off') {
            actionable = 'off';
        }
        else {
            if (drilling === 'on') {
                actionable = 'inherit';
            }
            else if (drilling === 'off') {
                actionable = 'off';
            }
        }
        return actionable;
    }
});

define('oj-c/legend/events',["require", "exports", "./utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLegendEventsHandler = void 0;
    const getLegendEventsHandler = (isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling = 'off', getItemDrilling, onOjDrill) => {
        const itemActionHandler = (detail) => {
            if (typeof detail.itemId === 'string' && isHideShowOn) {
                updateHidden(detail.itemId);
            }
            const [sectionIdx, itemIdx] = (0, utils_1.parseItemIdx)(detail.itemId);
            if ((0, utils_1.isLegendItemDrillable)(drilling, getItemDrilling(itemIdx, sectionIdx)) !== 'off') {
                onOjDrill?.({ id: getDrillDetail([sectionIdx, itemIdx]) });
            }
        };
        const inputHandler = (detail) => {
            if (typeof detail.itemId === 'string' && isHighlightOn) {
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
    exports.useSectionData = useSectionData;
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
        const idToDPItemMap = new Map(data.map((item) => [item.key, item.data]));
        return {
            sections,
            idToDPItemMap
        };
    }
});


define('oj-c/legend/legend',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_Legend", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "@oracle/oraclejet-preact/UNSAFE_SectionalLegend", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "preact/compat", "../hooks/UNSAFE_useVizCategories/useVizCategories", "./events", "./useSectionData", "oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu", "css!oj-c/legend/legend-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, UNSAFE_Legend_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1, UNSAFE_SectionalLegend_1, ojvcomponent_1, utils_1, useDataProvider_1, TemplateHandler_1, UNSAFE_useTranslationBundle_1, compat_2, useVizCategories_1, events_1, useSectionData_1, useVisContextMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SectionalLegend = exports.LinearLegend = exports.Legend = void 0;
    const HIGHLIGHTED_DEFAULT = [];
    const HIDDEN_DEFAULT = [];
    const TEXTSTYLE_DEFAULT = {};
    const SECTION_TITLE_DEFAULT = {};
    exports.Legend = (0, ojvcomponent_1.registerCustomElement)('oj-c-legend', (0, compat_1.forwardRef)(({ data = null, drilling = 'off', halign = 'start', valign = 'top', hiddenCategories = HIDDEN_DEFAULT, hideAndShowBehavior = 'off', highlightedCategories = HIGHLIGHTED_DEFAULT, hoverBehavior = 'none', orientation = 'vertical', symbolHeight = 0, symbolWidth = 0, textStyle = TEXTSTYLE_DEFAULT, sectionTitleStyle = SECTION_TITLE_DEFAULT, sectionTitleHalign = 'start', contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, itemTemplate, sectionTemplate, onOjDrill, ...props }, ref) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-legend: ');
        const legendRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            _getPreferredSize: (_width, _height) => {
                return legendRef.current._getPreferredSize(_width, _height);
            }
        }));
        const isTreeData = (0, utils_1.isTreeDataProvider)(data);
        const { width: symWidth, height: symHeight } = (0, utils_1.getDefaultSymbolDims)(symbolHeight, symbolWidth);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: isTreeData ? ((0, jsx_runtime_1.jsx)(exports.SectionalLegend, { ...props, onOjDrill: onOjDrill, data: data, halign: halign, valign: valign, sectionTemplate: sectionTemplate, itemTemplate: itemTemplate, addBusyState: busyStateContext.addBusyState, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symWidth, textStyle: textStyle, sectionTitleStyle: sectionTitleStyle, sectionTitleHalign: sectionTitleHalign, sectionalLegendRef: legendRef, contextMenuConfig: contextMenuConfig, onOjContextMenuAction: onOjContextMenuAction, onOjContextMenuSelection: onOjContextMenuSelection })) : ((0, jsx_runtime_1.jsx)(exports.LinearLegend, { ...props, onOjDrill: onOjDrill, data: data, valign: valign, halign: halign, itemTemplate: itemTemplate, drilling: drilling, hiddenCategories: hiddenCategories, hideAndShowBehavior: hideAndShowBehavior, highlightedCategories: highlightedCategories, hoverBehavior: hoverBehavior, orientation: orientation, symbolHeight: symHeight, symbolWidth: symHeight, addBusyState: busyStateContext.addBusyState, textStyle: textStyle, linearLegendRef: legendRef, contextMenuConfig: contextMenuConfig, onOjContextMenuAction: onOjContextMenuAction, onOjContextMenuSelection: onOjContextMenuSelection })) }) }));
    }), "Legend", { "properties": { "data": { "type": "DataProvider|null" }, "drilling": { "type": "string", "enumValues": ["off", "on"] }, "halign": { "type": "string", "enumValues": ["center", "end", "start"] }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "hideAndShowBehavior": { "type": "string", "enumValues": ["off", "on"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] }, "symbolHeight": { "type": "number" }, "symbolWidth": { "type": "number" }, "textStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "valign": { "type": "string", "enumValues": ["top", "bottom", "middle"] }, "sectionTitleStyle": { "type": "object", "properties": { "color": { "type": "string" }, "fontFamily": { "type": "string" }, "fontSize": { "type": "string" }, "fontStyle": { "type": "string" }, "fontWeight": { "type": "string" }, "textDecoration": { "type": "string" } } }, "sectionTitleHalign": { "type": "string", "enumValues": ["center", "end", "start"] }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } } }, "slots": { "itemTemplate": { "data": {} }, "sectionTemplate": { "data": {} } }, "events": { "ojDrill": {}, "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] }, "methods": { "_getPreferredSize": {} } }, { "data": null, "drilling": "off", "halign": "start", "valign": "top", "hiddenCategories": [], "hideAndShowBehavior": "off", "highlightedCategories": [], "hoverBehavior": "none", "orientation": "vertical", "symbolHeight": 0, "symbolWidth": 0, "textStyle": {}, "sectionTitleStyle": {}, "sectionTitleHalign": "start" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [] });
    const LinearLegend = ({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, orientation, symbolHeight, symbolWidth, valign, halign, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) => {
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: props.data ? props.data : undefined,
            addBusyState: props.addBusyState
        });
        const idToDPItemMap = new Map(data.map((item) => [item.key, item.data]));
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const getItemContext = (context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        };
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const items = (itemTemplate
            ? (0, TemplateHandler_1.processTemplate)(data, itemTemplate, getItemContext, 'oj-c-legend-item')
            : data.map((item) => item.data));
        const hasDrillableItem = (0, compat_2.useMemo)(() => {
            return items.some((value) => value.drilling === 'on');
        }, [items]);
        const isContextMenuEnabled = !!contextMenuConfig;
        const preactItems = (0, compat_2.useMemo)(() => {
            return items.map((value, itemIndex) => {
                return (0, utils_1.transformItem)(value, 0, itemIndex, (drilling === 'on' && value.drilling !== 'off') || value.drilling === 'on'
                    ? translations.vis_drillable()
                    : '', drilling, hideAndShowBehavior, isContextMenuEnabled);
            });
        }, [items, drilling, translations]);
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior, hasDrillableItem, isContextMenuEnabled);
        const categoriesItems = (0, compat_2.useMemo)(() => {
            const categoriesItems = [];
            if (isHideShowOn || isHighlightOn) {
                items.forEach((item, itemIndex) => {
                    categoriesItems.push({
                        id: preactItems[itemIndex].id,
                        categories: item.categories || []
                    });
                });
            }
            return categoriesItems;
        }, [preactItems, items, isHideShowOn, isHighlightOn]);
        const { hiddenIds, updateHidden, highlightedIds, updateHighlighted } = (0, useVizCategories_1.useVizCategories)(categoriesItems, (item) => item.categories, hiddenCategories, highlightedCategories, 'any', 'any', onHiddenCategoriesChanged, onHighlightedCategoriesChanged);
        const getDrillDetail = (id) => {
            const [_, itemIdx] = id;
            const item = items[itemIdx];
            if ((item.categories || []).length > 0)
                return item.categories;
            return data[itemIdx].metadata?.key;
        };
        const getItemDrilling = (itemIdx) => {
            const item = items[itemIdx];
            return item?.drilling || 'inherit';
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling, getItemDrilling, props.onOjDrill);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        const transformContext = (context) => {
            if (context.type !== 'item')
                return context;
            const id = context.data.id;
            const [_, itemIdx] = (0, utils_1.parseItemIdx)(id);
            const corepackItemData = idToDPItemMap.get(data[itemIdx].metadata?.key);
            const corepackData = { ...preactItems[itemIdx], id: data[itemIdx].metadata?.key };
            return {
                data: corepackData,
                itemData: corepackItemData,
                itemIndexPath: [itemIdx],
                type: 'item'
            };
        };
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, transformContext);
        const { data: _data, ...otherProps } = props;
        return preactItems.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_Legend_1.Legend, { ref: props.linearLegendRef, orientation: orientation, symbolHeight: symbolHeight, valign: valign, halign: halign, symbolWidth: symbolWidth, isReadOnly: !isInteractive, hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, items: preactItems, onItemAction: itemActionHandler, onItemHover: inputHandler, onItemFocus: inputHandler, contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined, ...otherProps, ...textStyles })) : null;
    };
    exports.LinearLegend = LinearLegend;
    const SectionalLegend = ({ hoverBehavior, hideAndShowBehavior, hiddenCategories, highlightedCategories, onHiddenCategoriesChanged, onHighlightedCategoriesChanged, drilling, itemTemplate, sectionTemplate, textStyle, sectionTitleStyle, orientation, symbolHeight, symbolWidth, valign, halign, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) => {
        const isHighlightOn = hoverBehavior === 'dim';
        const isHideShowOn = hideAndShowBehavior === 'on';
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        const { sections: s, idToDPItemMap } = (0, useSectionData_1.useSectionData)(props.data, props.addBusyState, sectionTemplate, itemTemplate);
        const sections = s;
        const hasDrillableItem = (0, compat_2.useMemo)(() => {
            return sections.some((section) => section.items.some((item) => item.drilling === 'on'));
        }, [sections]);
        const preactSections = (0, compat_2.useMemo)(() => {
            const preactSections = sections.map((section, sectionIdx) => (0, utils_1.transformSection)(section, drilling === 'on' ? translations.vis_drillable() : '', sectionIdx));
            return preactSections;
        }, [sections, drilling, translations]);
        const isContextMenuEnabled = !!contextMenuConfig;
        const isInteractive = (0, utils_1.isLegendInteractive)(drilling, hideAndShowBehavior, hoverBehavior, hasDrillableItem, isContextMenuEnabled);
        const categoriesItems = (0, compat_2.useMemo)(() => {
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
        const getDrillDetail = (id) => {
            const [sectionIdx, itemIdx] = id;
            const item = sections[sectionIdx].items[itemIdx];
            if (item.categories)
                return item.categories;
            return item.key;
        };
        const getItemDrilling = (itemIdx, sectionIdx) => {
            const item = sections[sectionIdx].items[itemIdx];
            return item?.drilling || 'inherit';
        };
        const { itemActionHandler, inputHandler } = (0, events_1.getLegendEventsHandler)(isHideShowOn, isHighlightOn, updateHidden, updateHighlighted, getDrillDetail, drilling, getItemDrilling, props.onOjDrill);
        const transformContext = (context) => {
            if (context.type !== 'item')
                return context;
            const id = context.data.id;
            const [sectionIdx, itemIdx] = (0, utils_1.parseItemIdx)(id);
            const corepackItemData = idToDPItemMap.get(sections[sectionIdx].items[itemIdx].key);
            const corepackData = {
                ...preactSections[sectionIdx].items[itemIdx],
                id: sections[sectionIdx].items[itemIdx].key
            };
            return {
                data: corepackData,
                itemData: corepackItemData,
                itemIndexPath: [sectionIdx, itemIdx],
                type: 'item'
            };
        };
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, transformContext);
        const textStyles = (0, utils_1.getTextStyles)(textStyle);
        const sectionTitleStyles = (0, utils_1.getSectionStyles)(sectionTitleStyle);
        return preactSections.length !== 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_SectionalLegend_1.SectionalLegend, { ref: props.sectionalLegendRef, sections: preactSections, orientation: orientation, sectionTitleHAlign: props.sectionTitleHalign, symbolHeight: symbolHeight, symbolWidth: symbolWidth, isReadOnly: !isInteractive, valign: valign, halign: halign, hideAndShowBehavior: hideAndShowBehavior, hoverBehavior: hoverBehavior, "aria-label": props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], hiddenIds: isHideShowOn ? hiddenIds : undefined, highlightedIds: isHighlightOn ? highlightedIds : undefined, onItemAction: itemActionHandler, onItemHover: inputHandler, onItemFocus: inputHandler, contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined, ...textStyles, ...sectionTitleStyles })) : null;
    };
    exports.SectionalLegend = SectionalLegend;
});

define('oj-c/legend',["require", "exports", "oj-c/legend/legend"], function (require, exports, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Legend = void 0;
    Object.defineProperty(exports, "Legend", { enumerable: true, get: function () { return legend_1.Legend; } });
});

define('oj-c/legend-item',["require", "exports", "oj-c/legend-item/legend-item"], function (require, exports, legend_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LegendItem = void 0;
    Object.defineProperty(exports, "LegendItem", { enumerable: true, get: function () { return legend_item_1.LegendItem; } });
});

define('oj-c/legend-section',["require", "exports", "oj-c/legend-section/legend-section"], function (require, exports, legend_section_1) {
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
    }, "TagCloudItem", { "properties": { "categories": { "type": "Array<string>" }, "color": { "type": "string" }, "label": { "type": "string" }, "value": { "type": "number|null" }, "url": { "type": "string" }, "shortDesc": { "type": "string" } } }, { "categories": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tag-cloud/utils',["require", "exports", "../tag-cloud-item/tag-cloud-item"], function (require, exports, tag_cloud_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformItem = transformItem;
    exports.executeLink = executeLink;
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
    function executeLink(dest) {
        const newWindow = window.open(dest, '_blank');
        if (newWindow)
            newWindow.focus();
    }
});


define('oj-c/tag-cloud/tag-cloud',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "preact/hooks", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_TagCloud", "@oracle/oraclejet-preact/hooks/UNSAFE_useVisBusyStateContext", "../hooks/UNSAFE_useVisBusyState/useVisBusyState", "./utils", "@oracle/oraclejet-preact/UNSAFE_VisStatusMessage", "../hooks/UNSAFE_useVizCategories/useVizCategories", "ojs/ojvcomponent", "./utils", "../hooks/UNSAFE_useDataProvider/useDataProvider", "../utils/UNSAFE_vizUtils/TemplateHandler", "oj-c/hooks/PRIVATE_useVisContextMenu/useVisContextMenu", "css!oj-c/tag-cloud/tag-cloud-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, hooks_1, compat_1, UNSAFE_TagCloud_1, UNSAFE_useVisBusyStateContext_1, useVisBusyState_1, utils_1, UNSAFE_VisStatusMessage_1, useVizCategories_1, ojvcomponent_1, utils_2, useDataProvider_1, TemplateHandler_1, useVisContextMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    const HIGHLIGHTED_DEFAULT = [];
    const SELECTION_DEFAULT = [];
    const HIDDEN_DEFAULT = [];
    function TagCloudComp({ hiddenCategories = HIDDEN_DEFAULT, data = null, highlightedCategories = HIGHLIGHTED_DEFAULT, hoverBehavior = 'none', layout = 'rectangular', selection = SELECTION_DEFAULT, selectionMode = 'none', highlightMatch = 'all', contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection, ...props }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const busyStateContext = (0, useVisBusyState_1.useVisBusyState)(rootRef, 'oj-c-tag-cloud: ');
        const { data: compData } = (0, useDataProvider_1.useDataProvider)({
            data: data ? data : undefined,
            addBusyState: busyStateContext.addBusyState
        });
        const isHighlightOn = hoverBehavior === 'dim';
        const getItemContext = (0, hooks_1.useCallback)((context, index) => {
            return {
                data: context.data,
                key: context.key,
                index
            };
        }, []);
        const idToDPItemMap = new Map(compData.map((item) => [item.key, item.data]));
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
        const { preactContextMenuConfig } = (0, useVisContextMenu_1.useVisContextMenu)(idToDPItemMap, contextMenuConfig, onOjContextMenuAction, onOjContextMenuSelection);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useVisBusyStateContext_1.VisBusyStateContext.Provider, { value: busyStateContext, children: !data || items.length === 0 ? ((0, jsx_runtime_1.jsx)(UNSAFE_VisStatusMessage_1.VisNoData, { "aria-label": props['aria-label'], "aria-describedby": props['aria-describedby'], "aria-labelledby": props['aria-labelledby'] })) : ((0, jsx_runtime_1.jsx)(UNSAFE_TagCloud_1.TagCloud, { layout: layout, datatip: datatip, highlightedIds: isHighlightOn ? highlightedIds : undefined, accessibleLabel: props['aria-label'], "aria-describedBy": props['aria-describedby'], "aria-labelledBy": props['aria-labelledby'], items: preactItems.filter((i) => !hiddenIds?.includes(i.id)), selectionMode: selectionMode, onSelectionChange: selectionChangeHandler, onItemAction: hasUrl ? itemActionHandler : undefined, onItemFocus: inputHandler, onItemHover: inputHandler, selectedIds: selectionMode === 'none' ? undefined : selection, width: "100%", height: "100%", contextMenuConfig: contextMenuConfig ? preactContextMenuConfig : undefined })) }) }));
    }
    exports.TagCloud = (0, ojvcomponent_1.registerCustomElement)('oj-c-tag-cloud', TagCloudComp, "TagCloud", { "properties": { "data": { "type": "DataProvider|null" }, "datatip": { "type": "function" }, "hiddenCategories": { "type": "Array<string>", "writeback": true }, "touchResponse": { "type": "string", "enumValues": ["auto", "touchStart"] }, "highlightMatch": { "type": "string", "enumValues": ["all", "any"] }, "highlightedCategories": { "type": "Array<string>", "writeback": true }, "hoverBehavior": { "type": "string", "enumValues": ["none", "dim"] }, "layout": { "type": "string", "enumValues": ["cloud", "rectangular"] }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "selection": { "type": "Array<any>", "writeback": true }, "contextMenuConfig": { "type": "object", "properties": { "accessibleLabel": { "type": "string" }, "items": { "type": "function" } } } }, "slots": { "itemTemplate": { "data": {} } }, "events": { "ojContextMenuAction": { "bubbles": true }, "ojContextMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["hiddenCategories", "highlightedCategories", "selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-describedby", "aria-labelledby"] } }, { "hiddenCategories": [], "data": null, "highlightedCategories": [], "hoverBehavior": "none", "layout": "rectangular", "selection": [], "selectionMode": "none", "highlightMatch": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tag-cloud',["require", "exports", "oj-c/tag-cloud/tag-cloud"], function (require, exports, tag_cloud_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloud = void 0;
    Object.defineProperty(exports, "TagCloud", { enumerable: true, get: function () { return tag_cloud_1.TagCloud; } });
});

define('oj-c/tag-cloud-item',["require", "exports", "oj-c/tag-cloud-item/tag-cloud-item"], function (require, exports, tag_cloud_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagCloudItem = void 0;
    Object.defineProperty(exports, "TagCloudItem", { enumerable: true, get: function () { return tag_cloud_item_1.TagCloudItem; } });
});


define('oj-c/message-banner/message-banner',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_MessageBanner", "@oracle/oraclejet-preact/hooks/UNSAFE_useMessagesContext", "ojs/ojvcomponent", "preact/hooks", "../hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojcontext", "css!oj-c/message-banner/message-banner-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_MessageBanner_1, UNSAFE_useMessagesContext_1, ojvcomponent_1, hooks_1, useDataProvider_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageBanner = void 0;
    const severityOrder = {
        error: 0,
        warning: 1,
        info: 2,
        confirmation: 3,
        none: 4
    };
    const severityLevels = Object.keys(severityOrder).length;
    const severitySort = ({ data: dataA }, { data: dataB }) => {
        const severityA = dataA.severity ? severityOrder[dataA.severity] : severityLevels;
        const severityB = dataB.severity ? severityOrder[dataB.severity] : severityLevels;
        if (severityA !== severityB) {
            return severityA - severityB;
        }
        if (dataA.timestamp && dataB.timestamp) {
            const valueA = new Date(dataA.timestamp).valueOf();
            const valueB = new Date(dataB.timestamp).valueOf();
            return valueB - valueA;
        }
        return 0;
    };
    function MessageBannerImpl({ data, detailTemplateValue, messageTemplates, type = 'section', sorting = 'severity', onOjClose }) {
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
        const sortedData = (0, hooks_1.useMemo)(() => {
            if (sorting === 'off')
                return dataArr;
            const dataCopy = [...dataArr];
            return dataCopy.sort(severitySort);
        }, [dataArr, sorting]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_useMessagesContext_1.MessagesContext.Provider, { value: messagesContext, children: (0, jsx_runtime_1.jsx)(UNSAFE_MessageBanner_1.MessageBanner, { data: sortedData, detailRendererKey: detailTemplateValue, renderers: messageTemplates, variant: type, onClose: onOjClose }, `dp-${dpKey}`) }) }));
    }
    exports.MessageBanner = (0, ojvcomponent_1.registerCustomElement)('oj-c-message-banner', MessageBannerImpl, "MessageBanner", { "properties": { "data": { "type": "DataProvider" }, "type": { "type": "string", "enumValues": ["page", "section"] }, "detailTemplateValue": { "type": "string|function" }, "sorting": { "type": "string", "enumValues": ["off", "severity"] } }, "extension": { "_DYNAMIC_SLOT": { "prop": "messageTemplates", "isTemplate": 1 } }, "events": { "ojClose": {} } }, { "type": "section", "sorting": "severity" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/message-banner',["require", "exports", "oj-c/message-banner/message-banner"], function (require, exports, message_banner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageBanner = void 0;
    Object.defineProperty(exports, "MessageBanner", { enumerable: true, get: function () { return message_banner_1.MessageBanner; } });
});


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('oj-c/action-card/action-card',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_ActionCard", "preact", "ojs/ojvcomponent", "preact/compat", "preact/hooks", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "css!oj-c/action-card/action-card-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_ActionCard_1, preact_1, ojvcomponent_1, compat_1, hooks_1, UNSAFE_useTabbableMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionCard = void 0;
    let ActionCard = class ActionCard extends preact_1.Component {
        constructor() {
            super(...arguments);
            this.actionCardRef = (0, preact_1.createRef)();
        }
        render({ children, onOjAction }) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(FunctionalActionCard, { ref: this.actionCardRef, onAction: onOjAction, width: "100%", height: "100%", children: children }) }));
        }
        click() {
            this.actionCardRef.current?.click();
        }
        blur() {
            this.actionCardRef.current?.blur();
        }
        focus() {
            this.actionCardRef.current?.focus();
        }
    };
    exports.ActionCard = ActionCard;
    ActionCard._metadata = { "slots": { "": {} }, "events": { "ojAction": { "bubbles": true } }, "methods": { "click": {}, "blur": {}, "focus": {} } };
    ActionCard._translationBundleMap = {
        '@oracle/oraclejet-preact': translationBundle_1.default
    };
    ActionCard._consumedContexts = [UNSAFE_useTabbableMode_1.TabbableModeContext];
    exports.ActionCard = ActionCard = __decorate([
        (0, ojvcomponent_1.customElement)('oj-c-action-card')
    ], ActionCard);
    const FunctionalActionCard = (0, compat_1.forwardRef)((props, ref) => {
        const actionCardRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => actionCardRef.current?.focus(),
            blur: () => actionCardRef.current?.blur(),
            click: () => actionCardRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_ActionCard_1.ActionCard, { ref: actionCardRef, ...props });
    });
});

define('oj-c/action-card',["require", "exports", "oj-c/action-card/action-card"], function (require, exports, action_card_1) {
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

define('oj-c/selection-card',["require", "exports", "oj-c/selection-card/selection-card"], function (require, exports, selection_card_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionCard = void 0;
    Object.defineProperty(exports, "SelectionCard", { enumerable: true, get: function () { return selection_card_1.SelectionCard; } });
});


define('oj-c/popup/popup',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_Popup", "ojs/ojcontext", "css!oj-c/popup/popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, hooks_1, UNSAFE_Popup_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.Popup = (0, ojvcomponent_1.registerCustomElement)('oj-c-popup', ({ id, opened = false, children, anchor, launcher, placement, collision = 'fit', modality = 'modeless', offset, initialFocus = 'auto', autoDismiss = 'focusLoss', tail = 'none', onOpenedChanged, onOjOpen, onOjBeforeClose, onOjClose, onOjFocus, width, minWidth, maxWidth = 'calc(100vw - 3rem)', height, minHeight, maxHeight = 'calc(100vw - 3rem)', ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        let defaultPlacement = placement;
        const anchorRef = (0, hooks_1.useRef)(null);
        const launcherRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-popup id='${id}' is ${desc}` })
                : () => { };
        }, [id]);
        const preactRef = (0, hooks_1.useCallback)((elem) => {
            if (rootRef.current) {
                if (elem) {
                    rootRef.current[LAYER_CONTENT] = elem;
                }
                else {
                    delete rootRef.current[LAYER_CONTENT];
                }
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            return () => {
                if (resolveBusyState.current) {
                    resolveBusyState.current();
                }
            };
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
        }, [opened, addBusyState]);
        let localLauncher;
        if (typeof launcher === 'string') {
            const launcherEl = document.querySelector(launcher);
            if (launcherEl) {
                localLauncher = launcherEl;
            }
        }
        else if (launcher instanceof HTMLElement) {
            if (document.body.contains(launcher)) {
                localLauncher = launcher;
            }
        }
        else {
            localLauncher = document.activeElement;
        }
        const isObject = (value) => {
            return typeof value === 'object' && !Array.isArray(value) && value !== null;
        };
        let localAnchor;
        if (!anchor) {
            localAnchor = localLauncher;
        }
        else if (anchor instanceof Window || anchor === 'window') {
            localAnchor = 'window';
        }
        else if (typeof anchor === 'string') {
            const queriedAnchor = document.querySelector(anchor);
            localAnchor = queriedAnchor || localLauncher;
        }
        else if (anchor instanceof Element) {
            localAnchor = document.body.contains(anchor) ? anchor : localLauncher;
        }
        else if (isObject(anchor)) {
            if (typeof anchor.x === 'number' && typeof anchor.y === 'number') {
                localAnchor = anchor;
            }
            else {
                localAnchor = localLauncher;
            }
        }
        if (!placement) {
            if (localAnchor === 'window') {
                defaultPlacement = 'center';
            }
            else {
                defaultPlacement = 'bottom-start';
            }
        }
        const flipOptions = { mainAxis: true, crossAxis: true };
        const shiftOptions = { mainAxis: false, crossAxis: false };
        switch (collision) {
            case 'none': {
                flipOptions.mainAxis = false;
                flipOptions.crossAxis = false;
                break;
            }
            case 'fit': {
                flipOptions.mainAxis = false;
                flipOptions.crossAxis = false;
                shiftOptions.mainAxis = true;
                shiftOptions.crossAxis = true;
                break;
            }
            case 'flipcenter':
            case 'flipfit': {
                shiftOptions.mainAxis = true;
                shiftOptions.crossAxis = true;
                break;
            }
            default:
            case 'flip': {
                break;
            }
        }
        const isMainAxisVertical = (placement) => {
            return ['top', 'bottom'].indexOf(placement.split('-')[0]) > -1;
        };
        const verticalMainAxis = placement ? isMainAxisVertical(placement) : true;
        const derivedOffset = {
            mainAxis: verticalMainAxis ? offset?.y : offset?.x,
            crossAxis: verticalMainAxis ? offset?.x : offset?.y
        };
        const handleOnClickOutside = async () => {
            if (autoDismiss === 'focusLoss') {
                return dispatchBeforeClose({ reason: 'outsideClick' });
            }
        };
        const handleOnClose = async (detail) => {
            if (detail.reason === 'escapeKey') {
                return dispatchBeforeClose(detail);
            }
        };
        const dispatchBeforeClose = async (detail) => {
            try {
                await onOjBeforeClose?.({ detail });
                onOpenedChanged?.(false);
            }
            catch (_) {
            }
        };
        const handleOnTransitionEnd = async (value) => {
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
            if (value) {
                onOjOpen?.();
            }
            else {
                onOjClose?.();
            }
        };
        const handleOnFocus = () => {
            onOjFocus?.();
        };
        anchorRef.current = localAnchor;
        launcherRef.current = localLauncher;
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_Popup_1.Popup, { ref: preactRef, isOpen: opened, anchorRef: anchorRef.current === 'window' ? undefined : anchorRef, launcherRef: launcherRef, placement: placement ?? defaultPlacement, offset: derivedOffset, flipOptions: flipOptions, shiftOptions: shiftOptions, modality: modality, initialFocus: initialFocus, tail: tail, onClose: handleOnClose, onClickOutside: handleOnClickOutside, onTransitionEnd: handleOnTransitionEnd, onFocusSet: handleOnFocus, width: width, minWidth: minWidth, maxWidth: maxWidth, height: height, minHeight: minHeight, maxHeight: maxHeight, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: children }) }));
    }, "Popup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "launcher": { "type": "string|Element" }, "anchor": { "type": "string|Element|object" }, "placement": { "type": "string", "enumValues": ["center", "end", "start", "top", "bottom", "top-start", "top-end", "top-start-corner", "top-end-corner", "start-top", "start-bottom", "start-top-corner", "start-bottom-corner", "bottom-start", "bottom-end", "bottom-start-corner", "bottom-end-corner", "end-top", "end-bottom", "end-top-corner", "end-bottom-corner"] }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focusLoss"] }, "tail": { "type": "string", "enumValues": ["none", "simple"] }, "initialFocus": { "type": "string", "enumValues": ["auto", "none", "popup", "firstFocusable"] }, "offset": { "type": "number|object" }, "collision": { "type": "string", "enumValues": ["none", "flip", "fit", "flipfit", "flipcenter"] }, "width": { "type": "number|string" }, "minWidth": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "height": { "type": "number|string" }, "minHeight": { "type": "number|string" }, "maxHeight": { "type": "number|string" } }, "events": { "ojOpen": {}, "ojBeforeClose": { "cancelable": true }, "ojClose": {}, "ojFocus": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "id"] } }, { "opened": false, "collision": "fit", "modality": "modeless", "initialFocus": "auto", "autoDismiss": "focusLoss", "tail": "none", "maxWidth": "calc(100vw - 3rem)", "maxHeight": "calc(100vw - 3rem)" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/popup',["require", "exports", "oj-c/popup/popup"], function (require, exports, popup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Popup = void 0;
    Object.defineProperty(exports, "Popup", { enumerable: true, get: function () { return popup_1.Popup; } });
});


define('oj-c/drawer-popup/drawer-popup',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerPopup", "ojs/ojvcomponent", "preact/hooks", "ojs/ojcontext", "css!oj-c/drawer-popup/drawer-popup-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerPopup_1, ojvcomponent_1, hooks_1, Context) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    const LAYER_CONTENT = Symbol.for('__oj_c_layer_content');
    exports.DrawerPopup = (0, ojvcomponent_1.registerCustomElement)('oj-c-drawer-popup', ({ id, children, opened = false, edge = 'start', modality = 'modal', autoDismiss = 'focus-loss', closeGesture = 'swipe', onOjBeforeClose, onOjClose, onOpenedChanged, backgroundColor, ...otherProps }) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const resolveBusyState = (0, hooks_1.useRef)();
        const didMountRef = (0, hooks_1.useRef)(false);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({ description: `oj-c-drawer-popup id='${id}' is ${desc}` })
                : () => { };
        }, [id]);
        const preactRef = (0, hooks_1.useCallback)((elem) => {
            if (rootRef.current) {
                if (elem) {
                    rootRef.current[LAYER_CONTENT] = elem;
                }
                else {
                    delete rootRef.current[LAYER_CONTENT];
                }
            }
        }, []);
        (0, hooks_1.useEffect)(() => {
            return () => {
                if (resolveBusyState.current) {
                    resolveBusyState.current();
                }
            };
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
        }, [opened, addBusyState]);
        const onOjBeforeCloseHandler = async (detail) => {
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
        const transitionEndHandler = async (value) => {
            if (resolveBusyState.current) {
                resolveBusyState.current();
                resolveBusyState.current = undefined;
            }
            if (value === false) {
                onOjClose?.();
            }
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, id: id, children: (0, jsx_runtime_1.jsx)(UNSAFE_DrawerPopup_1.DrawerPopup, { ref: preactRef, isOpen: opened, placement: edge, modality: modality, onClose: onOjBeforeCloseHandler, onTransitionEnd: transitionEndHandler, backgroundColor: backgroundColor, "aria-describedby": otherProps['aria-describedby'], "aria-label": otherProps['aria-label'], "aria-labelledby": otherProps['aria-labelledby'], children: children }) }));
    }, "DrawerPopup", { "slots": { "": {} }, "properties": { "opened": { "type": "boolean", "writeback": true }, "modality": { "type": "string", "enumValues": ["modal", "modeless"] }, "edge": { "type": "string", "enumValues": ["end", "start", "bottom"] }, "autoDismiss": { "type": "string", "enumValues": ["none", "focus-loss"] }, "closeGesture": { "type": "string", "enumValues": ["none", "swipe"] }, "backgroundColor": { "type": "string" } }, "events": { "ojBeforeClose": { "cancelable": true }, "ojClose": {} }, "extension": { "_WRITEBACK_PROPS": ["opened"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label", "aria-labelledby", "id"] } }, { "opened": false, "edge": "start", "modality": "modal", "autoDismiss": "focus-loss", "closeGesture": "swipe" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/drawer-popup',["require", "exports", "oj-c/drawer-popup/drawer-popup"], function (require, exports, drawer_popup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerPopup = void 0;
    Object.defineProperty(exports, "DrawerPopup", { enumerable: true, get: function () { return drawer_popup_1.DrawerPopup; } });
});


define('oj-c/drawer-layout/drawer-layout',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_DrawerLayout", "ojs/ojvcomponent", "css!oj-c/drawer-layout/drawer-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_DrawerLayout_1, ojvcomponent_1) {
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

define('oj-c/drawer-layout',["require", "exports", "oj-c/drawer-layout/drawer-layout"], function (require, exports, drawer_layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DrawerLayout = void 0;
    Object.defineProperty(exports, "DrawerLayout", { enumerable: true, get: function () { return drawer_layout_1.DrawerLayout; } });
});


define('oj-c/form-layout/form-layout',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_FormLayout", "@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout", "ojs/ojvcomponent", "css!oj-c/form-layout/form-layout-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_FormLayout_1, Layout_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormLayout = void 0;
    function FormLayoutImpl({ columns = 0, columnSpan = 1, direction = 'row', fullWidth = false, id, maxColumns = 1, ...otherProps }) {
        let preactColumns = maxColumns;
        let preactColumnBehavior = 'responsive';
        if (columns > 0) {
            preactColumns = columns;
            preactColumnBehavior = 'fixed';
        }
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, class: Layout_1.layoutSpanStyles.layoutSpanColumn[columnSpan], children: (0, jsx_runtime_1.jsx)(UNSAFE_FormLayout_1.FormLayout, { columns: preactColumns, columnBehavior: preactColumnBehavior, direction: direction, isFullWidth: fullWidth, labelEdge: otherProps.labelEdge, labelStartWidth: otherProps.labelStartWidth, labelWrapping: otherProps.labelWrapping, isReadonly: otherProps.readonly, userAssistanceDensity: otherProps.userAssistanceDensity, children: otherProps.children }) }));
    }
    exports.FormLayout = (0, ojvcomponent_1.registerCustomElement)('oj-c-form-layout', FormLayoutImpl, "FormLayout", { "slots": { "": {} }, "properties": { "columns": { "type": "number" }, "columnSpan": { "type": "number" }, "direction": { "type": "string", "enumValues": ["row", "column"] }, "fullWidth": { "type": "boolean" }, "labelEdge": { "type": "string", "enumValues": ["start", "top", "inside"], "binding": { "consume": { "name": "containerLabelEdge" }, "provide": [{ "name": "containerLabelEdge" }, { "name": "labelEdge" }] } }, "labelStartWidth": { "type": "number|string", "binding": { "consume": { "name": "labelWidth" }, "provide": [{ "name": "labelStartWidth" }, { "name": "labelWidth" }] } }, "labelWrapping": { "type": "string", "enumValues": ["truncate", "wrap"], "binding": { "consume": { "name": "labelWrapping" }, "provide": [{ "name": "labelWrapping" }] } }, "maxColumns": { "type": "number" }, "readonly": { "type": "boolean", "binding": { "consume": { "name": "containerReadonly" }, "provide": [{ "name": "containerReadonly", "default": false }, { "name": "readonly" }] } }, "userAssistanceDensity": { "type": "string", "enumValues": ["compact", "reflow", "efficient"], "binding": { "consume": { "name": "containerUserAssistanceDensity" }, "provide": [{ "name": "containerUserAssistanceDensity", "default": "efficient" }, { "name": "userAssistanceDensity", "default": "efficient" }] } } }, "extension": { "_OBSERVED_GLOBAL_PROPS": ["id"] } }, { "columns": 0, "columnSpan": 1, "direction": "row", "fullWidth": false, "maxColumns": 1 }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/form-layout',["require", "exports", "oj-c/form-layout/form-layout"], function (require, exports, form_layout_1) {
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
    exports.useLabelledLinkPreact = useLabelledLinkPreact;
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

define('oj-c/labelled-link',["require", "exports", "oj-c/labelled-link/labelled-link"], function (require, exports, labelled_link_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledLink = void 0;
    Object.defineProperty(exports, "LabelledLink", { enumerable: true, get: function () { return labelled_link_1.LabelledLink; } });
});


define('oj-c/menu-button/menu-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_MenuButton", "@oracle/oraclejet-preact/UNSAFE_IconMenuButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "@oracle/oraclejet-preact/hooks/UNSAFE_useToggle", "oj-c/utils/PRIVATE_ItemsMenu/items-menu", "preact/hooks", "preact/compat", "css!oj-c/menu-button/menu-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_MenuButton_1, UNSAFE_IconMenuButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, UNSAFE_useToggle_1, items_menu_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuButton = void 0;
    function MenuButtonImpl({ label = '', chroming = 'outlined', disabled = false, size = 'md', display = 'all', items = [], tooltip, suffix, startIcon, endIcon, selection, onSelectionChanged, onOjMenuAction, onOjMenuSelection, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display !== 'icons' || (startIcon && endIcon);
        const { bool: isOpen, toggle: toggleOpen } = (0, UNSAFE_useToggle_1.useToggle)();
        const widthProps = width ? { style: { width: width } } : {};
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...widthProps, ref: rootRef, children: isLabelButton ? ((0, jsx_runtime_1.jsx)(FunctionalMenuButton, { isMenuOpen: isOpen, onToggleMenu: toggleOpen, label: display === 'icons' ? (!startIcon ? label : '') : label, suffix: display === 'icons' ? (!startIcon ? suffix : '') : suffix, ref: buttonRef, variant: chroming, size: size, tooltip: tooltip, width: '100%', "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, icon: display !== 'label' ? startIcon : null, isDisabled: disabled, children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) })) : ((0, jsx_runtime_1.jsx)(FunctionalIconMenuButton, { isMenuOpen: isOpen, width: '100%', onToggleMenu: toggleOpen, ref: iconButtonRef, variant: chroming, isDisabled: disabled, tooltip: tooltip, accessibleLabel: accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, isIconOnly: (!startIcon && endIcon) || (!startIcon && !endIcon) ? display === 'icons' : false, icon: startIcon ?? (endIcon ? endIcon : (0, jsx_runtime_1.jsx)(OverFlowIcon, {})), children: (0, jsx_runtime_1.jsx)(items_menu_1.ItemsMenu, { items: items, selection: selection, onSelectionChanged: onSelectionChanged, onOjMenuSelection: onOjMenuSelection, onOjMenuAction: onOjMenuAction }) })) }));
    }
    const OverFlowIcon = () => {
        return (0, jsx_runtime_1.jsx)("span", { class: "oj-ux-ico-overflow-h" });
    };
    exports.MenuButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-menu-button', (0, compat_1.forwardRef)(MenuButtonImpl), "MenuButton", { "properties": { "label": { "type": "string" }, "suffix": { "type": "string" }, "tooltip": { "type": "string" }, "items": { "type": "Array<object>" }, "selection": { "type": "object", "writeback": true }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["xs", "sm", "md", "lg"] }, "width": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["solid", "ghost", "borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "events": { "ojMenuAction": { "bubbles": true }, "ojMenuSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "label": "", "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "items": [] }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalMenuButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.click()
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
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconMenuButton_1.IconMenuButton, { ref: iconButtonRef, ...props });
    });
});

define('oj-c/menu-button',["require", "exports", "oj-c/menu-button/menu-button"], function (require, exports, menu_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MenuButton = void 0;
    Object.defineProperty(exports, "MenuButton", { enumerable: true, get: function () { return menu_button_1.MenuButton; } });
});

define('oj-c/tab-bar/DataTabBarIcon',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataTabBarIcon = DataTabBarIcon;
    function DataTabBarIcon(props) {
        const { icon } = props;
        if (!icon) {
            return null;
        }
        if (icon.type === 'class') {
            return (0, jsx_runtime_1.jsx)("span", { class: icon.class });
        }
        return null;
    }
});

define('oj-c/tab-bar/ContentRenderer',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/UNSAFE_TabBar", "@oracle/oraclejet-preact/UNSAFE_OverflowTabBar", "./DataTabBarIcon", "@oracle/oraclejet-preact/UNSAFE_ReorderableTabBar"], function (require, exports, jsx_runtime_1, UNSAFE_TabBar_1, UNSAFE_OverflowTabBar_1, DataTabBarIcon_1, UNSAFE_ReorderableTabBar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBarRenderer = TabBarRenderer;
    exports.OverflowTabBarRenderer = OverflowTabBarRenderer;
    const badgeRenderer = (badgeValue, display) => {
        if (badgeValue != null) {
            let modifiedBadge = '';
            if (display === 'stacked' || display === 'icons') {
                modifiedBadge = badgeValue > 99 ? '99+' : badgeValue.toString();
            }
            else {
                modifiedBadge = badgeValue > 999 ? '999+' : badgeValue.toString();
            }
            return modifiedBadge;
        }
        else
            return undefined;
    };
    const tabBarItemRenderer = (tab, display) => {
        return ((0, jsx_runtime_1.jsx)(UNSAFE_TabBar_1.TabBarItem, { icon: tab.icon ? (0, jsx_runtime_1.jsx)(DataTabBarIcon_1.DataTabBarIcon, { icon: tab.icon }) : undefined, badge: badgeRenderer(tab.badge, display), itemKey: tab.itemKey, label: tab.label, metadata: tab.metadata, severity: tab.severity, "aria-controls": tab.tabPanelId, labelMaxWidth: tab.labelMaxWidth }));
    };
    const removableTabBarItemRenderer = (tab, display) => {
        return ((0, jsx_runtime_1.jsx)(UNSAFE_TabBar_1.RemovableTabBarItem, { icon: tab.icon ? (0, jsx_runtime_1.jsx)(DataTabBarIcon_1.DataTabBarIcon, { icon: tab.icon }) : undefined, "aria-controls": tab.tabPanelId, badge: badgeRenderer(tab.badge, display), itemKey: tab.itemKey, label: tab.label, metadata: tab.metadata, severity: tab.severity }));
    };
    const linkTabBarItemRenderer = (tab, display) => {
        return ((0, jsx_runtime_1.jsx)(UNSAFE_TabBar_1.TabBarLinkItem, { icon: tab.icon ? (0, jsx_runtime_1.jsx)(DataTabBarIcon_1.DataTabBarIcon, { icon: tab.icon }) : undefined, "aria-controls": tab.tabPanelId, badge: badgeRenderer(tab.badge, display), itemKey: tab.itemKey, label: tab.label, metadata: tab.metadata, severity: tab.severity, href: tab.href }));
    };
    function TabBarRenderer(props, handleSelect, rootRef) {
        const { data, truncation, ...tabBarProps } = props;
        const display = tabBarProps.display;
        const { maxWidths } = (0, UNSAFE_TabBar_1.useProgressiveTruncation)({
            rootRef,
            isDisabled: !(truncation && truncation === 'progressive')
        });
        const items = truncation === 'progressive'
            ? data.map((item) => ({
                ...item,
                labelMaxWidth: maxWidths?.get(item.itemKey)
            }))
            : data;
        const isLinkType = (item) => {
            return 'href' in item;
        };
        return tabBarProps.reorderable === 'enabled' ? ((0, jsx_runtime_1.jsx)(UNSAFE_ReorderableTabBar_1.ReorderableTabBar, { ...tabBarProps, onSelect: handleSelect, children: items.map((tab) => tab != null &&
                (isLinkType(tab)
                    ? linkTabBarItemRenderer(tab, display)
                    : tab.isRemovable
                        ? removableTabBarItemRenderer(tab, display)
                        : tabBarItemRenderer(tab, display))) })) : ((0, jsx_runtime_1.jsx)(UNSAFE_TabBar_1.TabBar, { onSelect: handleSelect, ref: rootRef, ...tabBarProps, children: items.map((tab) => isLinkType(tab)
                ? linkTabBarItemRenderer(tab, display)
                : tab.isRemovable
                    ? removableTabBarItemRenderer(tab, display)
                    : tabBarItemRenderer(tab, display)) }));
    }
    function OverflowTabBarRenderer(props, handleSelect) {
        const { data, truncation, ...overflowTabBarProps } = props;
        return ((0, jsx_runtime_1.jsx)(UNSAFE_OverflowTabBar_1.OverflowTabBar, { items: data, onSelect: handleSelect, truncation: truncation, ...overflowTabBarProps }));
    }
});

define('oj-c/tab-bar/DataTabBar',["require", "exports", "preact/jsx-runtime", "preact", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt", "./ContentRenderer"], function (require, exports, jsx_runtime_1, preact_1, UNSAFE_ConveyorBelt_1, ContentRenderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataTabBar = DataTabBar;
    function DataTabBar(props) {
        const { onRemove, onReorder, onSelect, selection, data = [], display, layout, edge, overflow, reorderable, truncation, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby } = props;
        const tabBarRef = (0, preact_1.createRef)();
        const handleSelect = (event) => {
            if (event.value && onSelect) {
                onSelect(event);
            }
        };
        const conveyorRenderer = () => {
            return ((0, jsx_runtime_1.jsx)(UNSAFE_ConveyorBelt_1.ConveyorBelt, { children: (0, ContentRenderer_1.TabBarRenderer)({
                    onRemove,
                    selection,
                    layout,
                    display,
                    edge,
                    'aria-label': ariaLabel,
                    'aria-labelledby': ariaLabelledby,
                    data,
                    reorderable,
                    truncation,
                    onReorder
                }, handleSelect, tabBarRef) }));
        };
        return overflow === 'popup'
            ? (0, ContentRenderer_1.OverflowTabBarRenderer)({
                selection,
                onRemove,
                data,
                layout,
                display,
                edge,
                truncation,
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledby
            }, handleSelect)
            : overflow === 'conveyor'
                ? conveyorRenderer()
                : (0, ContentRenderer_1.TabBarRenderer)({
                    onRemove,
                    selection,
                    layout,
                    display,
                    edge,
                    'aria-label': ariaLabel,
                    'aria-labelledby': ariaLabelledby,
                    data,
                    reorderable,
                    truncation,
                    onReorder
                }, handleSelect, tabBarRef);
    }
});

define('oj-c/tab-bar/tab-bar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "ojs/ojcontext", "./DataTabBar", "preact/hooks", "preact/compat"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, useDataProvider_1, Context, DataTabBar_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBar = void 0;
    function isDataProvider(data) {
        return data && 'fetchFirst' in data;
    }
    exports.TabBar = (0, ojvcomponent_1.registerCustomElement)('oj-c-tab-bar', (0, compat_1.forwardRef)(({ data = [], onOjBeforeSelect, onOjRemove, onOjReorder, onOjSelectionAction, onSelectionChanged, reorderable = 'disabled', overflow = 'hidden', truncation = 'none', selection, display = 'standard', layout = 'stretch', edge = 'top', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, id }, ref) => {
        const rootRef = (0, hooks_1.useRef)(null);
        const addBusyState = (0, hooks_1.useCallback)((description = 'MessageBanner: busyState') => {
            return rootRef.current
                ? Context.getContext(rootRef.current).getBusyContext().addBusyState({ description })
                : () => { };
        }, []);
        const { data: dataProviderData } = (0, useDataProvider_1.useDataProvider)({
            data: !Array.isArray(data) && isDataProvider(data) ? data : undefined,
            addBusyState
        });
        const dataArr = (0, hooks_1.useMemo)(() => {
            let retDataArr = [];
            if (Array.isArray(data)) {
                retDataArr = data;
            }
            else {
                if (isDataProvider(data)) {
                    retDataArr = dataProviderData.map((item) => {
                        return { ...item.data };
                    });
                }
            }
            return retDataArr;
        }, [data, dataProviderData]);
        const handleRemove = (event) => {
            if (onOjRemove) {
                onOjRemove({ key: event.value });
            }
        };
        const handleReorder = (event) => {
            if (onOjReorder) {
                onOjReorder({ reorderedKeys: event.reorderedKeys });
            }
        };
        const handleSelect = (event) => {
            (async () => {
                handleOnSelectionChanged: {
                    if (onOjBeforeSelect) {
                        try {
                            await onOjBeforeSelect({ key: event.value });
                        }
                        catch {
                            break handleOnSelectionChanged;
                        }
                    }
                    if (onOjSelectionAction) {
                        onOjSelectionAction({ previousValue: selection || '', value: event.value });
                    }
                    if (selection === event.value) {
                        return;
                    }
                    if (onSelectionChanged) {
                        onSelectionChanged(event.value);
                    }
                }
            })();
        };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            _doReorderHelper: (tabBarKeys) => {
                onOjReorder && onOjReorder({ reorderedKeys: tabBarKeys });
                return Promise.resolve();
            }
        }));
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(DataTabBar_1.DataTabBar, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, data: dataArr, onRemove: handleRemove, onReorder: handleReorder, onSelect: handleSelect, reorderable: reorderable, selection: selection, display: display, edge: edge, layout: layout, overflow: overflow, truncation: truncation }) }));
    }), "TabBar", { "properties": { "data": { "type": "Array<object>|DataProvider" }, "selection": { "type": "string|number", "writeback": true }, "reorderable": { "type": "string", "enumValues": ["disabled", "enabled"] }, "overflow": { "type": "string", "enumValues": ["hidden", "popup", "conveyor"] }, "display": { "type": "string", "enumValues": ["standard", "icons", "stacked"] }, "layout": { "type": "string", "enumValues": ["stretch", "condense"] }, "edge": { "type": "string", "enumValues": ["top", "bottom"] }, "truncation": { "type": "string", "enumValues": ["none", "progressive"] } }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojRemove": {}, "ojReorder": {}, "ojSelectionAction": {} }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "id", "aria-labelledby"] }, "methods": { "_doReorderHelper": {} } }, { "data": [], "reorderable": "disabled", "overflow": "hidden", "truncation": "none", "display": "standard", "layout": "stretch", "edge": "top" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tab-bar',["require", "exports", "oj-c/tab-bar/tab-bar"], function (require, exports, tab_bar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBar = void 0;
    Object.defineProperty(exports, "TabBar", { enumerable: true, get: function () { return tab_bar_1.TabBar; } });
});

define('oj-c/tab-bar-mixed/DataTabBarMixedIcon',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataTabBarMixedIcon = DataTabBarMixedIcon;
    function DataTabBarMixedIcon(props) {
        const { icon } = props;
        if (!icon) {
            return null;
        }
        if (icon.type === 'class') {
            return (0, jsx_runtime_1.jsx)("span", { class: icon.class });
        }
        return null;
    }
});

define('oj-c/tab-bar-mixed/sumBadge',["require", "exports", "ojs/ojlogger"], function (require, exports, Logger) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sumBadge = sumBadge;
    function sumBadge(items) {
        return items.reduce((total, item) => {
            if (!item.badge) {
                return total;
            }
            const num = Number(item.badge);
            if (!Number.isInteger(num)) {
                Logger.warn(`Tab item with itemKey '${item.itemKey}' provided a badge of '${item.badge}', expected integer`);
                return total;
            }
            if (num < 0) {
                Logger.warn(`Tab item with itemKey '${item.itemKey}' provided a negative numerical badge value of '${item.badge}', expected positive integer. This will be discarded from total.`);
                return total;
            }
            return total + item.badge;
        }, 0);
    }
});

define('oj-c/tab-bar-mixed/DataTabBarMixed',["require", "exports", "preact/jsx-runtime", "preact/hooks", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt", "@oracle/oraclejet-preact/UNSAFE_TabBarMixed", "./DataTabBarMixedIcon", "./sumBadge", "preact"], function (require, exports, jsx_runtime_1, hooks_1, UNSAFE_ConveyorBelt_1, UNSAFE_TabBarMixed_1, DataTabBarMixedIcon_1, sumBadge_1, preact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataTabBarMixed = DataTabBarMixed;
    function DataTabBarMixed(props) {
        const { dynamicTabs = [], dynamicTabsOverflowIcon, dynamicTabsOverflow, onRemove, onSelect, selection, separatorPadding, size = 'lg', staticTabs = [], staticTabsDisplay, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby } = props;
        const [isOverflowMenuOpen, setIsOverflowMenuOpen] = (0, hooks_1.useState)(false);
        const tabBarMixedRef = (0, preact_1.createRef)();
        const isOutsideMouseDown = (0, hooks_1.useRef)(false);
        const handleClose = (e) => {
            if (tabBarMixedRef.current && ['itemAction', 'dismissed'].includes(e.reason)) {
                tabBarMixedRef?.current?.focus();
            }
            if (e.reason === 'outsideMousedown') {
                isOutsideMouseDown.current = true;
            }
            setIsOverflowMenuOpen(false);
        };
        const handleSelect = (event) => {
            if (event.value && event.value === 'overflow') {
                if (isOutsideMouseDown.current) {
                    setIsOverflowMenuOpen(false);
                }
                else {
                    setIsOverflowMenuOpen(true);
                }
            }
            else if (onSelect) {
                onSelect(event);
            }
            isOutsideMouseDown.current = false;
        };
        const badgeTotal = (0, sumBadge_1.sumBadge)(dynamicTabs);
        const isDividerVisible = staticTabs.length > 0 && dynamicTabs.length > 0;
        return ((0, jsx_runtime_1.jsxs)(UNSAFE_TabBarMixed_1.TabBarMixed, { onRemove: onRemove, onSelect: handleSelect, selection: selection, size: size, ref: tabBarMixedRef, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, children: [(0, jsx_runtime_1.jsxs)(UNSAFE_TabBarMixed_1.TabBarLayout, { layout: "stretch", display: staticTabsDisplay, children: [staticTabs.map((tab) => ((0, jsx_runtime_1.jsx)(UNSAFE_TabBarMixed_1.TabBarItem, { icon: tab.icon ? ((0, jsx_runtime_1.jsx)(DataTabBarMixedIcon_1.DataTabBarMixedIcon, { label: staticTabsDisplay === 'icons' ? tab.label : undefined, icon: tab.icon })) : undefined, itemKey: tab.itemKey, label: tab.label, badge: tab.badge ? tab.badge.toString() : undefined, "aria-controls": tab.tabPanelId }))), dynamicTabsOverflow === 'popup' && ((0, jsx_runtime_1.jsx)(UNSAFE_TabBarMixed_1.OverflowTabBarItem, { badge: badgeTotal > 0 ? badgeTotal.toString() : undefined, icon: (0, jsx_runtime_1.jsx)(DataTabBarMixedIcon_1.DataTabBarMixedIcon, { icon: dynamicTabsOverflowIcon }), isOpen: isOverflowMenuOpen, onClose: handleClose, overflowItemKey: "overflow", overflowItems: dynamicTabs.map((tab) => ({
                                itemKey: tab.itemKey,
                                badge: tab.badge ? tab.badge.toString() : undefined,
                                label: tab.label,
                                isRemovable: true
                            })) }))] }), dynamicTabsOverflow === 'conveyor' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isDividerVisible && (0, jsx_runtime_1.jsx)(UNSAFE_TabBarMixed_1.TabBarMixedSeparator, { padding: separatorPadding }), (0, jsx_runtime_1.jsx)(UNSAFE_ConveyorBelt_1.ConveyorBelt, { children: (0, jsx_runtime_1.jsx)(UNSAFE_TabBarMixed_1.TabBarLayout, { display: "standard", layout: "condense", children: dynamicTabs.map((tab) => ((0, jsx_runtime_1.jsx)(UNSAFE_TabBarMixed_1.RemovableTabBarItem, { "aria-controls": tab.tabPanelId, badge: tab.badge ? tab.badge.toString() : undefined, itemKey: tab.itemKey, label: tab.label }))) }) })] }))] }));
    }
});

define('oj-c/tab-bar-mixed/tab-bar-mixed',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "./DataTabBarMixed"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, DataTabBarMixed_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBarMixed = void 0;
    exports.TabBarMixed = (0, ojvcomponent_1.registerCustomElement)('oj-c-tab-bar-mixed', (props) => {
        const { dynamicTabs = [], dynamicTabsOverflow = 'conveyor', dynamicTabsOverflowIcon = { type: 'class', class: 'oj-ux-ico-collection' }, onOjBeforeSelect, onOjRemove, onOjSelectionAction, onSelectionChanged, selection, separatorPadding = '3rem', size, staticTabs = [], staticTabsDisplay = 'standard', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, id } = props;
        const handleRemove = (event) => {
            if (onOjRemove) {
                onOjRemove({ key: event.value });
            }
        };
        const handleSelect = (event) => {
            (async () => {
                handleOnSelectionChanged: {
                    if (onOjBeforeSelect) {
                        try {
                            await onOjBeforeSelect({ key: event.value });
                        }
                        catch {
                            break handleOnSelectionChanged;
                        }
                    }
                    if (onOjSelectionAction) {
                        onOjSelectionAction({ previousValue: selection || '', value: event.value });
                    }
                    if (selection === event.value) {
                        return;
                    }
                    if (onSelectionChanged) {
                        onSelectionChanged(event.value);
                    }
                }
            })();
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, children: (0, jsx_runtime_1.jsx)(DataTabBarMixed_1.DataTabBarMixed, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, dynamicTabs: dynamicTabs, dynamicTabsOverflow: dynamicTabsOverflow, dynamicTabsOverflowIcon: dynamicTabsOverflowIcon, onRemove: handleRemove, onSelect: handleSelect, selection: selection, separatorPadding: separatorPadding, size: size, staticTabs: staticTabs, staticTabsDisplay: staticTabsDisplay }) }));
    }, "TabBarMixed", { "properties": { "dynamicTabs": { "type": "Array<object>" }, "dynamicTabsOverflow": { "type": "string", "enumValues": ["popup", "conveyor"] }, "dynamicTabsOverflowIcon": { "type": "object" }, "size": { "type": "string", "enumValues": ["md", "lg"] }, "selection": { "type": "string|number", "writeback": true }, "separatorPadding": { "type": "string" }, "staticTabs": { "type": "Array<object>" }, "staticTabsDisplay": { "type": "string", "enumValues": ["standard", "icons"] } }, "events": { "ojBeforeSelect": { "cancelable": true }, "ojRemove": {}, "ojSelectionAction": {} }, "extension": { "_WRITEBACK_PROPS": ["selection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "id", "aria-labelledby"] } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/tab-bar-mixed',["require", "exports", "oj-c/tab-bar-mixed/tab-bar-mixed"], function (require, exports, tab_bar_mixed_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TabBarMixed = void 0;
    Object.defineProperty(exports, "TabBarMixed", { enumerable: true, get: function () { return tab_bar_mixed_1.TabBarMixed; } });
});

define('oj-c/card-view/useCardViewPreact',["require", "exports", "preact/hooks", "../hooks/UNSAFE_useListData/useListData", "../utils/PRIVATE_collectionUtils/collectionUtils"], function (require, exports, hooks_1, useListData_1, collectionUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useCardViewPreact = void 0;
    const useCardViewPreact = ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, data: propData, gutterSize, focusBehavior, selected, onSelectedChanged, scrollPolicyOptions, selectionMode, initialAnimation, columns: corePackColumns, reorderable, onOjReorder, skeletonTemplate }, addBusyState, isClickthroughDisabled) => {
        const resolveBusyState = (0, hooks_1.useRef)();
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(propData, {
            fetchSize: scrollPolicyOptions?.fetchSize
        });
        const listData = listDataState.status !== 'error' ? listDataState.data : null;
        const preactColumns = Number.isInteger(corePackColumns) ? corePackColumns : undefined;
        const selectedKeys = (0, collectionUtils_1.getSelectedKeys)(selected, listData, selectionMode, onSelectedChanged);
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
        }, [listDataState.status]);
        const handleOnSelectionChange = (detail) => {
            (0, collectionUtils_1.handleOnSelectionChanged)(selectionMode, detail, onSelectedChanged, isClickthroughDisabled);
        };
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
        const getRowKey = (data) => {
            return data.metadata.key;
        };
        const onLoadMore = (0, hooks_1.useCallback)(() => {
            if (listData) {
                const fetchSize = scrollPolicyOptions && scrollPolicyOptions.fetchSize ? scrollPolicyOptions.fetchSize : 25;
                onLoadRange({ offset: 0, count: listData.data.length + fetchSize });
            }
        }, [listDataState, scrollPolicyOptions, onLoadRange]);
        return {
            status: listDataState.status,
            cardViewProps: {
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledBy,
                data: listData ? listData.data : null,
                getRowKey,
                gutterSize,
                hasMore: listData ? listData.sizePrecision === 'atLeast' : false,
                onLoadMore,
                focusBehavior,
                onSelectionChange: handleOnSelectionChange,
                selectedKeys,
                selectionMode: selectionMode === 'singleRequired' ? 'single' : selectionMode,
                initialAnimation,
                columns: preactColumns,
                viewportConfig,
                onReorder: reorderable?.items === 'enabled'
                    ? (detail) => {
                        onOjReorder && onOjReorder(detail);
                    }
                    : null,
                skeletonRenderer: skeletonTemplate
            }
        };
    };
    exports.useCardViewPreact = useCardViewPreact;
});

define('oj-c/card-view/cardViewItem',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "../hooks/PRIVATE_useSelectionContext/ItemKeyContext"], function (require, exports, jsx_runtime_1, UNSAFE_useTabbableMode_1, ItemKeyContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardViewItem = void 0;
    const CardViewItem = ({ context, itemTemplate }) => {
        const { isTabbable } = (0, UNSAFE_useTabbableMode_1.useTabbableMode)();
        const itemContext = {
            isTabbable,
            data: context.data.data,
            item: context.data
        };
        return ((0, jsx_runtime_1.jsx)(ItemKeyContext_1.ItemKeyContext.Provider, { value: context.metadata.key, children: (0, jsx_runtime_1.jsx)(UNSAFE_useTabbableMode_1.TabbableModeContext.Provider, { value: { isTabbable }, children: itemTemplate && itemTemplate(itemContext) }) }));
    };
    exports.CardViewItem = CardViewItem;
});


define('oj-c/card-view/card-view',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "preact/hooks", "ojs/ojvcomponent", "preact/compat", "@oracle/oraclejet-preact/UNSAFE_CardFlexView", "@oracle/oraclejet-preact/UNSAFE_CardGridView", "./useCardViewPreact", "./cardViewItem", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "@oracle/oraclejet-preact/UNSAFE_EmptyList", "../hooks/PRIVATE_useSelectionContext/SelectionContext", "css!oj-c/card-view/card-view-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, hooks_1, ojvcomponent_1, compat_1, UNSAFE_CardFlexView_1, UNSAFE_CardGridView_1, useCardViewPreact_1, cardViewItem_1, UNSAFE_useTranslationBundle_1, UNSAFE_EmptyList_1, SelectionContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardView = void 0;
    const CardViewPreactWrapper = ({ addBusyState, isClickthroughDisabled, itemTemplate, noData, ...rest }) => {
        const { status, cardViewProps } = (0, useCardViewPreact_1.useCardViewPreact)(rest, addBusyState, isClickthroughDisabled);
        const translations = (0, UNSAFE_useTranslationBundle_1.useTranslationBundle)('@oracle/oraclejet-preact');
        if (status === 'success' && !cardViewProps.hasMore && cardViewProps.data?.length === 0) {
            if (noData) {
                return (0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { children: noData(compat_1.Children) });
            }
            else {
                const noDataContent = translations.noData_message();
                return (0, jsx_runtime_1.jsx)(UNSAFE_EmptyList_1.EmptyList, { children: noDataContent });
            }
        }
        const selectInfo = {
            selected: cardViewProps.selectedKeys,
            selectionMode: cardViewProps.selectionMode,
            onSelectedChange: rest.onSelectedChanged
        };
        const itemRenderer = (0, hooks_1.useCallback)((context) => {
            return (0, jsx_runtime_1.jsx)(cardViewItem_1.CardViewItem, { context: context, itemTemplate: itemTemplate });
        }, [itemTemplate]);
        if (cardViewProps.columns) {
            return ((0, jsx_runtime_1.jsx)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: (0, jsx_runtime_1.jsx)(UNSAFE_CardGridView_1.CardGridView, { ...cardViewProps, children: itemRenderer }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(SelectionContext_1.SelectionContext.Provider, { value: selectInfo, children: (0, jsx_runtime_1.jsx)(UNSAFE_CardFlexView_1.CardFlexView, { ...cardViewProps, children: itemRenderer }) }));
        }
    };
    const CardViewImpl = ({ columns = 'auto', data = null, focusBehavior = 'card', gutterSize = 'sm', initialAnimation = 'slideUp', scrollPolicyOptions = { fetchSize: 25 }, selectionMode = 'none', reorderable = { items: 'disabled' }, ...rest }) => {
        const rootRef = (0, hooks_1.useRef)();
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target === null || rootRef.current === undefined) {
                return false;
            }
            return isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return rootRef.current
                ? Context.getContext(rootRef.current)
                    .getBusyContext()
                    .addBusyState({
                    description: `oj-c-card-view: ${desc}`
                })
                : () => { };
        }, []);
        const props = {
            columns,
            data,
            focusBehavior,
            gutterSize,
            initialAnimation,
            scrollPolicyOptions,
            selectionMode,
            reorderable,
            ...rest
        };
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: props.id, ref: rootRef, children: (0, jsx_runtime_1.jsx)(CardViewPreactWrapper, { addBusyState: addBusyState, isClickthroughDisabled: isClickthroughDisabled, ...props }) }));
    };
    exports.CardView = (0, ojvcomponent_1.registerCustomElement)('oj-c-card-view', CardViewImpl, "CardView", { "properties": { "currentItem": { "type": "string|number", "readOnly": true, "writeback": true }, "data": { "type": "DataProvider|null" }, "gutterSize": { "type": "string", "enumValues": ["xs", "sm", "md", "lg", "xl"] }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" }, "scroller": { "type": "string" } } }, "selected": { "type": "object", "writeback": true }, "selectionMode": { "type": "string", "enumValues": ["none", "multiple", "single", "singleRequired"] }, "initialAnimation": { "type": "string", "enumValues": ["slideUp", "slideDown"] }, "focusBehavior": { "type": "string", "enumValues": ["content", "card"] }, "columns": { "type": "number|string" }, "reorderable": { "type": "object", "properties": { "items": { "type": "string", "enumValues": ["disabled", "enabled"] } } } }, "slots": { "noData": { "data": {} }, "itemTemplate": { "data": {} }, "skeletonTemplate": { "data": {} } }, "events": { "ojReorder": {} }, "extension": { "_WRITEBACK_PROPS": ["currentItem", "selected"], "_READ_ONLY_PROPS": ["currentItem"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] } }, { "columns": "auto", "data": null, "focusBehavior": "card", "gutterSize": "sm", "initialAnimation": "slideUp", "scrollPolicyOptions": { "fetchSize": 25 }, "selectionMode": "none", "reorderable": { "items": "disabled" } }, {
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

define('oj-c/card-view',["require", "exports", "oj-c/card-view/card-view"], function (require, exports, card_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardView = void 0;
    Object.defineProperty(exports, "CardView", { enumerable: true, get: function () { return card_view_1.CardView; } });
});

define('oj-c/conveyor-belt/conveyorBeltItem',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt"], function (require, exports, jsx_runtime_1, UNSAFE_ConveyorBelt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConveyorBeltItem = void 0;
    const ConveyorBeltItem = ({ context, itemTemplate }) => {
        const itemContext = {
            data: context.data.data,
            item: context.data
        };
        return ((0, jsx_runtime_1.jsx)(UNSAFE_ConveyorBelt_1.ConveyorBeltItem, { children: itemTemplate && itemTemplate(itemContext) }));
    };
    exports.ConveyorBeltItem = ConveyorBeltItem;
});


define('oj-c/conveyor-belt/conveyor-belt',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcontext", "@oracle/oraclejet-preact/UNSAFE_ConveyorBelt", "@oracle/oraclejet-preact/hooks/UNSAFE_useUser", "ojs/ojvcomponent", "preact/hooks", "preact/compat", "./conveyorBeltItem", "oj-c/hooks/UNSAFE_useDataProvider/useDataProvider", "css!oj-c/conveyor-belt/conveyor-belt-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, Context, UNSAFE_ConveyorBelt_1, UNSAFE_useUser_1, ojvcomponent_1, hooks_1, compat_1, conveyorBeltItem_1, useDataProvider_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConveyorBelt = void 0;
    function isDataProvider(items) {
        return (items && 'fetchFirst' in items) || false;
    }
    const ConveyorBeltPreactWrapper = (0, compat_1.forwardRef)(({ addBusyState, onScrollPositionChanged, items, itemTemplate, children, ...rest }, ref) => {
        const conveyorRef = (0, hooks_1.useRef)(null);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            scrollElementIntoView: (element) => conveyorRef.current?.scrollElementIntoView(element),
            scrollPrevious: () => conveyorRef.current?.scrollPrevious(),
            scrollNext: () => conveyorRef.current?.scrollNext()
        }), []);
        const isFromDataProvider = isDataProvider(items);
        const { data } = (0, useDataProvider_1.useDataProvider)({
            data: isFromDataProvider ? items : undefined,
            addBusyState
        });
        const dataArr = (0, hooks_1.useMemo)(() => {
            const clonedOptions = !isFromDataProvider && items
                ? [...items].map((item) => {
                    const metadata = { key: item.key };
                    return {
                        key: item.key,
                        data: {
                            data: item.data,
                            metadata: metadata
                        }
                    };
                })
                : [];
            return isFromDataProvider
                ? Array.isArray(data)
                    ? data.map((item) => {
                        const metadata = { key: item.key };
                        return {
                            key: item.key,
                            data: {
                                data: item.data,
                                metadata: item.metadata ?? metadata
                            }
                        };
                    })
                    : []
                : clonedOptions;
        }, [data, isFromDataProvider, items]);
        const scrollPositionChangedHandler = (value) => {
            if (value)
                onScrollPositionChanged?.(value);
        };
        const childrenContent = itemTemplate
            ? dataArr.map((dataObj, index) => {
                const context = {
                    index: index,
                    data: dataObj.data,
                    metadata: dataObj.data.metadata
                };
                return (0, jsx_runtime_1.jsx)(conveyorBeltItem_1.ConveyorBeltItem, { context: context, itemTemplate: itemTemplate });
            })
            : children;
        return ((0, jsx_runtime_1.jsx)(UNSAFE_ConveyorBelt_1.ConveyorBelt, { onScrollPositionChanged: scrollPositionChangedHandler, ref: conveyorRef, ...rest, children: childrenContent }));
    });
    const ConveyorBeltComp = ({ children, orientation = 'horizontal', ...rest }, ref) => {
        const rootRef = (0, hooks_1.useRef)();
        const conveyorBeltRef = (0, hooks_1.useRef)(null);
        const busyContextRef = (0, hooks_1.useRef)(Context.getContext(rootRef.current).getBusyContext());
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-conveyor-belt: ${desc}`
            });
        }, []);
        const { direction } = (0, UNSAFE_useUser_1.useUser)();
        const keyDownHandler = (event) => {
            if (event.target !== rootRef.current) {
                return;
            }
            if (orientation === 'horizontal') {
                switch (event.key) {
                    case 'ArrowRight':
                        if (direction === 'rtl') {
                            conveyorBeltRef.current?.scrollPrevious();
                        }
                        else {
                            conveyorBeltRef.current?.scrollNext();
                        }
                        event.preventDefault();
                        break;
                    case 'ArrowLeft':
                        if (direction === 'rtl') {
                            conveyorBeltRef.current?.scrollNext();
                        }
                        else {
                            conveyorBeltRef.current?.scrollPrevious();
                        }
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
            else if (orientation === 'vertical') {
                switch (event.key) {
                    case 'ArrowDown':
                        conveyorBeltRef.current?.scrollNext();
                        event.preventDefault();
                        break;
                    case 'ArrowUp':
                        conveyorBeltRef.current?.scrollPrevious();
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            scrollElementIntoView: (element) => conveyorBeltRef.current?.scrollElementIntoView(element)
        }), []);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, onKeyDown: keyDownHandler, children: (0, jsx_runtime_1.jsx)(ConveyorBeltPreactWrapper, { ref: conveyorBeltRef, addBusyState: addBusyState, orientation: orientation, ...rest, children: children }) }));
    };
    exports.ConveyorBelt = (0, ojvcomponent_1.registerCustomElement)('oj-c-conveyor-belt', (0, compat_1.forwardRef)(ConveyorBeltComp), "ConveyorBelt", { "slots": { "": {}, "itemTemplate": { "data": {} } }, "properties": { "scrollPosition": { "type": "number", "writeback": true }, "arrowVisibility": { "type": "string", "enumValues": ["auto", "hidden", "visible"] }, "items": { "type": "Array<object>|DataProvider" }, "orientation": { "type": "string", "enumValues": ["horizontal", "vertical"] } }, "extension": { "_WRITEBACK_PROPS": ["scrollPosition"], "_READ_ONLY_PROPS": [] }, "methods": { "scrollElementIntoView": {} } }, { "orientation": "horizontal" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/conveyor-belt',["require", "exports", "oj-c/conveyor-belt/conveyor-belt"], function (require, exports, conveyor_belt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConveyorBelt = void 0;
    Object.defineProperty(exports, "ConveyorBelt", { enumerable: true, get: function () { return conveyor_belt_1.ConveyorBelt; } });
});

define('oj-c/drag-handle/drag-handle',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_DragHandle"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_DragHandle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DragHandle = void 0;
    const DragHandleImpl = () => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_DragHandle_1.DragHandle, {}) }));
    };
    exports.DragHandle = (0, ojvcomponent_1.registerCustomElement)('oj-c-drag-handle', DragHandleImpl, "DragHandle", undefined, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/drag-handle',["require", "exports", "oj-c/drag-handle/drag-handle"], function (require, exports, drag_handle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DragHandle = void 0;
    Object.defineProperty(exports, "DragHandle", { enumerable: true, get: function () { return drag_handle_1.DragHandle; } });
});

define('oj-c/toggle-button/toggle-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ToggleButton", "@oracle/oraclejet-preact/UNSAFE_IconToggleButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/button/button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ToggleButton_1, UNSAFE_IconToggleButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleButton = void 0;
    function ToggleButtonImpl({ chroming = 'outlined', disabled = false, 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, width, display = 'all', value = false, label, tooltip, startIcon, endIcon, size = 'md', onValueChanged }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' ||
            (startIcon && endIcon && display == 'icons') ||
            (!startIcon && !endIcon && display == 'icons');
        const widthProps = width ? { style: { width } } : {};
        const ariaProps = { 'aria-describedby': ariaDescribedBy, 'aria-label': accessibleLabel };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalToggleButton, { ref: buttonRef, isSelected: value, tooltip: tooltip, onToggle: () => {
                        onValueChanged?.(!value);
                    }, variant: chroming, isDisabled: disabled, width: width ? '100%' : undefined, startIcon: startIcon, endIcon: endIcon, size: size, label: display == 'icons' ? (!startIcon && !endIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...ariaProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, "aria-describedby": ariaDescribedBy, children: (0, jsx_runtime_1.jsx)(FunctionalIconToggleButton, { isSelected: value, onToggle: () => {
                        onValueChanged?.(!value);
                    }, width: width ? '100%' : undefined, ref: iconButtonRef, variant: chroming, isDisabled: disabled, tooltip: tooltip && tooltip !== '' ? tooltip : label, "aria-label": accessibleLabel && accessibleLabel !== '' ? accessibleLabel : label, "aria-describedby": ariaDescribedBy, size: size, children: startIcon ?? endIcon }) }));
        }
    }
    exports.ToggleButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-toggle-button', (0, compat_1.forwardRef)(ToggleButtonImpl), "ToggleButton", { "properties": { "label": { "type": "string" }, "value": { "type": "boolean", "writeback": true }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {}, "endIcon": {} }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "display": "all", "value": false, "size": "md" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalToggleButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.click()
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_ToggleButton_1.ToggleButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconToggleButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconToggleButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconToggleButtonRef.current?.focus(),
            blur: () => iconToggleButtonRef.current?.blur(),
            click: () => iconToggleButtonRef.current?.click()
        }), []);
        return ((0, jsx_runtime_1.jsx)(UNSAFE_IconToggleButton_1.IconToggleButton, { ref: iconToggleButtonRef, ...props }));
    });
});

define('oj-c/toggle-button',["require", "exports", "oj-c/toggle-button/toggle-button"], function (require, exports, toggle_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleButton = void 0;
    Object.defineProperty(exports, "ToggleButton", { enumerable: true, get: function () { return toggle_button_1.ToggleButton; } });
});

define('oj-c/utils/PRIVATE_toggleUtils/toggle-item-icon',["require", "exports", "preact/jsx-runtime"], function (require, exports, jsx_runtime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ToggleItemIcon = ToggleItemIcon;
    function ToggleItemIcon(props) {
        if (props.icon.type === 'img') {
            return (0, jsx_runtime_1.jsx)("img", { src: props.icon.src });
        }
        else {
            return (0, jsx_runtime_1.jsx)("span", { class: props.icon.class });
        }
    }
});

define('oj-c/utils/PRIVATE_toggleUtils/widthStyle',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widthStyle = widthStyle;
    function widthStyle(layoutWidth, width, maxWidth) {
        return layoutWidth == 'equal'
            ? maxWidth
                ? { style: { width: '100%', maxWidth: maxWidth } }
                : { style: { width: '100%' } }
            : width
                ? maxWidth
                    ? { style: { width: width, maxWidth: maxWidth } }
                    : { style: { width: width } }
                : maxWidth
                    ? { style: { maxWidth: maxWidth } }
                    : {};
    }
});

define('oj-c/utils/PRIVATE_toggleUtils/index',["require", "exports", "./toggle-item-icon", "./widthStyle"], function (require, exports, toggle_item_icon_1, widthStyle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widthStyle = exports.ToggleItemIcon = void 0;
    Object.defineProperty(exports, "ToggleItemIcon", { enumerable: true, get: function () { return toggle_item_icon_1.ToggleItemIcon; } });
    Object.defineProperty(exports, "widthStyle", { enumerable: true, get: function () { return widthStyle_1.widthStyle; } });
});


define('oj-c/buttonset-single/buttonset-single',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ButtonSetSingle", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/utils/PRIVATE_toggleUtils/index", "@oracle/oraclejet-preact/UNSAFE_ButtonSetItem", "preact/compat", "preact/hooks", "css!oj-c/buttonset-single/buttonset-single-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ButtonSetSingle_1, UNSAFE_useTabbableMode_1, index_1, UNSAFE_ButtonSetItem_1, compat_1, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtonsetSingle = void 0;
    function ButtonsetSingleImpl({ chroming = 'outlined', disabled = false, value, onValueChanged, size = 'md', width, maxWidth, layoutWidth, items = [], display = 'all', 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonsetRef = (0, hooks_1.useRef)();
        const widthProps = (0, index_1.widthStyle)(layoutWidth, width, maxWidth);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => buttonsetRef.current?.blur(),
            focus: () => buttonsetRef.current?.focus()
        }), [buttonsetRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...widthProps, ref: rootRef, children: (0, jsx_runtime_1.jsx)(FunctionalButtonSetSingle, { value: value, onCommit: (detail) => {
                    onValueChanged?.(detail.value);
                }, ref: buttonsetRef, display: display, variant: chroming, layoutWidth: layoutWidth, size: size, width: widthProps.style ? (widthProps.style.width ? '100%' : undefined) : undefined, "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, isDisabled: disabled, ...otherProps, children: items?.map((item) => {
                    return ((0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetItem_1.ButtonSetItem, { label: item.label, value: item.value, isDisabled: item.disabled, startIcon: item.startIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.startIcon }), endIcon: item.endIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.endIcon }) }));
                }) }) }));
    }
    exports.ButtonsetSingle = (0, ojvcomponent_1.registerCustomElement)('oj-c-buttonset-single', (0, compat_1.forwardRef)(ButtonsetSingleImpl), "ButtonsetSingle", { "properties": { "value": { "type": "string", "writeback": true }, "items": { "type": "Array<object>" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } }, "layoutWidth": { "type": "string", "enumValues": ["auto", "equal"] } }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "items": [], "display": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalButtonSetSingle = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetSingle_1.ButtonSetSingle, { ref: buttonRef, ...props });
    });
});

define('oj-c/buttonset-single',["require", "exports", "oj-c/buttonset-single/buttonset-single"], function (require, exports, buttonset_single_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtonsetSingle = void 0;
    Object.defineProperty(exports, "ButtonsetSingle", { enumerable: true, get: function () { return buttonset_single_1.ButtonsetSingle; } });
});


define('oj-c/buttonset-multiple/buttonset-multiple',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ButtonSetMultiple", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "oj-c/utils/PRIVATE_toggleUtils/index", "@oracle/oraclejet-preact/UNSAFE_ButtonSetItem", "preact/hooks", "preact/compat", "css!oj-c/buttonset-multiple/buttonset-multiple-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ButtonSetMultiple_1, UNSAFE_useTabbableMode_1, index_1, UNSAFE_ButtonSetItem_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtonsetMultiple = void 0;
    function ButtonsetMultipleImpl({ chroming = 'outlined', disabled = false, value, onValueChanged, size = 'md', width, maxWidth, layoutWidth, items = [], display = 'all', 'aria-label': accessibleLabel, 'aria-describedby': ariaDescribedBy, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonsetRef = (0, hooks_1.useRef)();
        const widthProps = (0, index_1.widthStyle)(layoutWidth, width, maxWidth);
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => buttonsetRef.current?.blur(),
            focus: () => buttonsetRef.current?.focus()
        }), [buttonsetRef]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ...widthProps, ref: rootRef, children: (0, jsx_runtime_1.jsx)(FunctionalButtonSetMultiple, { value: value, onCommit: (detail) => {
                    onValueChanged?.(detail.value);
                }, ref: buttonsetRef, display: display, layoutWidth: layoutWidth, variant: chroming, size: size, width: widthProps.style ? (widthProps.style.width ? '100%' : undefined) : undefined, "aria-label": accessibleLabel, "aria-describedby": ariaDescribedBy, isDisabled: disabled, ...otherProps, children: items?.map((item) => {
                    return ((0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetItem_1.ButtonSetItem, { label: item.label, value: item.value, isDisabled: item.disabled, startIcon: item.startIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.startIcon }), endIcon: item.endIcon && (0, jsx_runtime_1.jsx)(index_1.ToggleItemIcon, { icon: item.endIcon }) }));
                }) }) }));
    }
    exports.ButtonsetMultiple = (0, ojvcomponent_1.registerCustomElement)('oj-c-buttonset-multiple', (0, compat_1.forwardRef)(ButtonsetMultipleImpl), "ButtonsetMultiple", { "properties": { "value": { "type": "Array<string>", "writeback": true }, "items": { "type": "Array<object>" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "disabled": { "type": "boolean" }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "width": { "type": "number|string" }, "maxWidth": { "type": "number|string" }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"], "binding": { "consume": { "name": "containerChroming" } } }, "layoutWidth": { "type": "string", "enumValues": ["auto", "equal"] } }, "extension": { "_WRITEBACK_PROPS": ["value"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-describedby", "aria-label"] }, "methods": { "focus": {}, "blur": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "items": [], "display": "all" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalButtonSetMultiple = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_ButtonSetMultiple_1.ButtonSetMultiple, { ref: buttonRef, ...props });
    });
});

define('oj-c/buttonset-multiple',["require", "exports", "oj-c/buttonset-multiple/buttonset-multiple"], function (require, exports, buttonset_multiple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ButtonsetMultiple = void 0;
    Object.defineProperty(exports, "ButtonsetMultiple", { enumerable: true, get: function () { return buttonset_multiple_1.ButtonsetMultiple; } });
});


define('oj-c/table/table',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojcustomelement-registry", "ojs/ojcontext", "ojs/ojvcomponent", "preact/hooks", "../hooks/UNSAFE_useListData/useListData", "@oracle/oraclejet-preact/UNSAFE_TableView", "ojs/ojkeyset", "../utils/PRIVATE_keyUtils/keySetUtils", "@oracle/oraclejet-preact/hooks/UNSAFE_useCollectionInteractionContext", "@oracle/oraclejet-preact/hooks/UNSAFE_useFormVariantContext", "css!oj-c/table/table-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojcustomelement_registry_1, Context, ojvcomponent_1, hooks_1, useListData_1, UNSAFE_TableView_1, ojkeyset_1, keySetUtils_1, UNSAFE_useCollectionInteractionContext_1, UNSAFE_useFormVariantContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Table = void 0;
    const _SELECTION_COLUMN_KEY = 'oj-c-table_selection';
    const _selectedDefault = {};
    const _selectionModeDefault = { row: 'none', column: 'none' };
    const _scrollPolicyOptionsDefault = { fetchSize: 25 };
    const _isClickthroughDisabled = function (element) {
        return element.dataset['ojClickthrough'] === 'disabled';
    };
    const _isEventClickthroughDisabled = function (event, rootElement) {
        let node = event.target;
        while (node != null && node !== rootElement) {
            if (_isClickthroughDisabled(node)) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    function TableImpl({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, id, data, columns, row, horizontalGridVisible = 'enabled', verticalGridVisible = 'disabled', layout = 'contents', currentCellOverride, onCurrentCellChanged, selected = _selectedDefault, selectionMode = _selectionModeDefault, onSelectedChanged, selectAllControl = 'visible', columnOrder, cellTemplate, headerTemplate, footerTemplate, templates, onOjRowAction, noData, columnWidths, scrollPolicyOptions = _scrollPolicyOptionsDefault }) {
        const rootRef = (0, hooks_1.useRef)(null);
        const tableViewRef = (0, hooks_1.useRef)(null);
        const isClickthroughDisabled = (0, hooks_1.useCallback)((target) => {
            if (target == null || rootRef.current == null) {
                return false;
            }
            return _isEventClickthroughDisabled({ target }, rootRef.current);
        }, []);
        const [listDataState, onLoadRange] = (0, useListData_1.useListData)(data, {
            fetchSize: scrollPolicyOptions?.fetchSize
        });
        const onLoadMore = (0, hooks_1.useCallback)(() => {
            if (listDataState.status === 'success' && listDataState.data && onLoadRange) {
                const fetchSize = scrollPolicyOptions && scrollPolicyOptions.fetchSize != null
                    ? scrollPolicyOptions.fetchSize
                    : 25;
                onLoadRange({ offset: 0, count: listDataState.data.data.length + fetchSize });
            }
        }, [listDataState, onLoadRange, scrollPolicyOptions]);
        const hasMore = listDataState.status === 'loading' ||
            (listDataState.status === 'success' && listDataState.data.sizePrecision === 'atLeast');
        const realizedColumnWidths = (0, hooks_1.useMemo)(() => {
            const preactColumnWidths = { ...columnWidths };
            if (selectionMode?.row === 'multiple') {
                preactColumnWidths[_SELECTION_COLUMN_KEY] = 36;
            }
            return preactColumnWidths;
        }, [selectionMode?.row, columnWidths]);
        function getRowContext(context) {
            const { data } = context;
            return {
                item: data
            };
        }
        const tableCellSelectorRenderer = (context) => {
            return context.selector != null ? context.selector() : undefined;
        };
        const tableHeaderSelectorRenderer = (context) => {
            return context.selector != null ? ((0, jsx_runtime_1.jsx)("div", { "data-oj-table-selector": 'all', children: context.selector() })) : undefined;
        };
        function getPreactHeaderRenderer(headerTemplate) {
            if (headerTemplate) {
                return (context) => {
                    const templateContext = {
                        key: context.key,
                        headerText: context.headerText,
                        isTabbable: context.isTabbable
                    };
                    return headerTemplate(templateContext);
                };
            }
            return undefined;
        }
        function getPreactFooterRenderer(footerTemplate) {
            if (footerTemplate) {
                return (context) => {
                    const templateContext = {
                        key: context.key,
                        footerText: context.footerText,
                        isTabbable: context.isTabbable
                    };
                    return footerTemplate(templateContext);
                };
            }
            return undefined;
        }
        function getPreactNoDataRenderer(noData) {
            if (noData) {
                return (context) => {
                    return noData({ isTabbable: context.isTabbable });
                };
            }
            return undefined;
        }
        function getPreactCellRenderer(cellTemplate, field) {
            return (context) => {
                const templateContext = {
                    item: context.rowData,
                    columnKey: context.columnKey,
                    data: field != null ? context.rowData.data[field] : undefined,
                    isTabbable: context.isTabbable
                };
                return cellTemplate
                    ? cellTemplate(templateContext)
                    : templateContext.data != null
                        ? String(templateContext.data)
                        : undefined;
            };
        }
        function getPreactColumns(cols, globalCellTemplate, globalHeaderTemplate, globalFooterTemplate, templates) {
            const preactColumns = {};
            if (selectionMode?.row === 'multiple') {
                preactColumns[_SELECTION_COLUMN_KEY] = {
                    sticky: 'enabled',
                    selectable: 'disabled',
                    renderer: tableCellSelectorRenderer,
                    headerRenderer: selectAllControl !== 'hidden' ? tableHeaderSelectorRenderer : undefined,
                    padding: 'disabled',
                    headerPadding: 'disabled',
                    tooltip: 'disabled',
                    headerTooltip: 'disabled'
                };
            }
            Object.keys(cols).forEach((key) => {
                const colKey = key;
                const column = cols[colKey];
                const cellRenderer = column.template && templates && templates[column.template]
                    ? getPreactCellRenderer(templates[column.template], column.field)
                    : getPreactCellRenderer(globalCellTemplate, column.field);
                const headerCellRenderer = column.headerTemplate && templates && templates[column.headerTemplate]
                    ? getPreactHeaderRenderer(templates[column.headerTemplate])
                    : getPreactHeaderRenderer(globalHeaderTemplate);
                const footerCellRenderer = column.footerTemplate && templates && templates[column.footerTemplate]
                    ? getPreactFooterRenderer(templates[column.footerTemplate])
                    : getPreactFooterRenderer(globalFooterTemplate);
                const headerText = column.headerText ?? undefined;
                const footerText = column.footerText ?? undefined;
                const maxWidth = column.maxWidth ?? undefined;
                const minWidth = column.minWidth ?? undefined;
                const weight = column.weight ?? undefined;
                let padding;
                const columnPadding = column.padding;
                if (typeof columnPadding === 'function') {
                    padding = (context) => {
                        const internalContext = getRowContext(context);
                        return columnPadding(internalContext);
                    };
                }
                else {
                    padding = columnPadding ?? 'enabled';
                }
                const headerPadding = column.headerPadding ?? 'enabled';
                const footerPadding = column.footerPadding ?? 'enabled';
                let tooltip;
                const columnTooltip = column.tooltip;
                if (typeof columnTooltip === 'function') {
                    tooltip = (context) => {
                        const internalContext = getRowContext(context);
                        return columnTooltip(internalContext);
                    };
                }
                else {
                    tooltip = columnTooltip ?? 'enabled';
                }
                const headerTooltip = column.headerTooltip ?? 'enabled';
                const footerTooltip = column.footerTooltip ?? 'enabled';
                const sticky = column.sticky ?? 'disabled';
                const horizontalAlignment = column.horizontalAlignment ?? 'start';
                preactColumns[colKey] = {
                    headerText: headerText,
                    footerText: footerText,
                    renderer: cellRenderer,
                    headerRenderer: headerCellRenderer,
                    footerRenderer: footerCellRenderer,
                    maxWidth,
                    minWidth,
                    weight,
                    padding,
                    headerPadding,
                    footerPadding,
                    tooltip,
                    headerTooltip,
                    footerTooltip,
                    sticky,
                    horizontalAlignment
                };
            });
            return preactColumns;
        }
        const handleKeyDown = (0, hooks_1.useCallback)((event) => {
            if (event.key === ' ') {
                const targetElement = event.target;
                if (targetElement.children.length > 0 &&
                    targetElement.children[0].dataset['ojTableSelector'] === 'all' &&
                    !event.repeat) {
                    let newRowSelection;
                    if (selected.row?.isAddAll() && selected.row.keys.deletedKeys?.size === 0) {
                        newRowSelection = new ojkeyset_1.KeySetImpl();
                    }
                    else {
                        newRowSelection = new ojkeyset_1.AllKeySetImpl();
                    }
                    onSelectedChanged({
                        row: newRowSelection,
                        column: new ojkeyset_1.KeySetImpl()
                    });
                }
            }
        }, [onSelectedChanged, selected]);
        const selectAllHandlerProps = selectionMode?.row === 'multiple' && selectAllControl !== 'hidden'
            ? { onKeyDown: handleKeyDown }
            : {};
        const preactColumns = (0, hooks_1.useMemo)(() => {
            return columns
                ? getPreactColumns(columns, cellTemplate, headerTemplate, footerTemplate, templates)
                : {};
        }, [columns, cellTemplate, headerTemplate, footerTemplate, templates, selectionMode?.row]);
        const preactColumnOrder = (0, hooks_1.useMemo)(() => {
            const newColumnOrder = [];
            let hasSelectorColumn = false;
            if (selectionMode?.row === 'multiple') {
                newColumnOrder.push(_SELECTION_COLUMN_KEY);
                hasSelectorColumn = true;
            }
            if (columnOrder != null) {
                for (const key of columnOrder) {
                    if (preactColumns[key] != null && !newColumnOrder.includes(key)) {
                        newColumnOrder.push(key);
                    }
                }
            }
            else {
                for (const [key] of Object.entries(preactColumns)) {
                    if (key !== _SELECTION_COLUMN_KEY) {
                        newColumnOrder.push(key);
                    }
                }
            }
            return newColumnOrder.length === 1 && hasSelectorColumn ? [] : newColumnOrder;
        }, [columnOrder, selectionMode?.row, preactColumns]);
        const preactData = listDataState.status === 'success' ? listDataState?.data?.data || [] : [];
        const preactGetRowKey = (data) => {
            return data.metadata.key;
        };
        const preactGetAccessibleRowHeaders = (preactContext) => {
            const internalContext = getRowContext(preactContext);
            const rowHeaders = new Set();
            if (row != null && row.accessibleRowHeader != null) {
                if (typeof row.accessibleRowHeader === 'string') {
                    rowHeaders.add(row.accessibleRowHeader);
                }
                else if (Array.isArray(row.accessibleRowHeader)) {
                    row.accessibleRowHeader.forEach((header) => rowHeaders.add(header));
                }
                else if (typeof row.accessibleRowHeader === 'function') {
                    const result = row.accessibleRowHeader(internalContext);
                    if (typeof result === 'string') {
                        rowHeaders.add(result);
                    }
                    else if (Array.isArray(result)) {
                        result.forEach((header) => rowHeaders.add(header));
                    }
                }
            }
            else if (preactColumnOrder.length > 0) {
                if (selectionMode?.row === 'multiple') {
                    rowHeaders.add(preactColumnOrder[1]);
                }
                else {
                    rowHeaders.add(preactColumnOrder[0]);
                }
            }
            return rowHeaders;
        };
        const preactOnRowAction = (0, hooks_1.useCallback)((eventDetail) => {
            if (onOjRowAction && eventDetail != null && !isClickthroughDisabled(eventDetail.target)) {
                onOjRowAction({ context: getRowContext(eventDetail.context) });
            }
        }, [onOjRowAction, isClickthroughDisabled, getRowContext]);
        const gridlines = (0, hooks_1.useMemo)(() => ({
            horizontal: horizontalGridVisible === 'enabled' ? 'visible' : 'hidden',
            vertical: verticalGridVisible === 'enabled' ? 'visible' : 'hidden'
        }), [horizontalGridVisible, verticalGridVisible]);
        const noDataRenderer = (0, hooks_1.useMemo)(() => {
            return getPreactNoDataRenderer(noData);
        }, [noData]);
        const preactSelected = (0, hooks_1.useMemo)(() => {
            return selected
                ? {
                    row: selected.row ? (0, keySetUtils_1.keySetToKeys)(selected.row) : undefined,
                    column: selected.column ? (0, keySetUtils_1.keySetToKeys)(selected.column) : undefined
                }
                : undefined;
        }, [selected?.row, selected?.column]);
        const preactOnSelectionChange = (0, hooks_1.useCallback)((detail) => {
            if (!isClickthroughDisabled(detail.target)) {
                const value = detail.value;
                const rowKeySet = value.row
                    ? (0, keySetUtils_1.keysToKeySet)(value.row)
                    : undefined;
                const columnKeySet = value.column
                    ? (0, keySetUtils_1.keysToKeySet)(value.column)
                    : undefined;
                onSelectedChanged({
                    row: rowKeySet,
                    column: columnKeySet
                });
            }
        }, [onSelectedChanged, isClickthroughDisabled]);
        const onPersistCurrentCell = (0, hooks_1.useCallback)((detail) => {
            if (onCurrentCellChanged) {
                onCurrentCellChanged(detail.value);
            }
        }, [onCurrentCellChanged]);
        const busyContextRef = (0, hooks_1.useRef)();
        const childBusyContextRef = (0, hooks_1.useRef)();
        const resolveDataBusyStateRef = (0, hooks_1.useRef)();
        const resolveContentBusyStateRef = (0, hooks_1.useRef)();
        const [isInitialLoading, setIsInitialLoading] = (0, hooks_1.useState)(layout === 'contents');
        const isInitialLoadingRef = (0, hooks_1.useRef)(isInitialLoading);
        (0, hooks_1.useEffect)(() => {
            busyContextRef.current = Context.getContext(rootRef.current).getBusyContext();
            childBusyContextRef.current = Context.getContext(tableViewRef.current).getBusyContext();
        }, []);
        const addBusyState = (0, hooks_1.useCallback)((desc) => {
            return busyContextRef.current?.addBusyState({
                description: `oj-c-table: ${desc}`
            });
        }, []);
        (0, hooks_1.useEffect)(() => {
            if (listDataState.status === 'loading') {
                resolveDataBusyStateRef.current = addBusyState('Table is loading data');
            }
            else {
                if (isInitialLoadingRef.current) {
                    resolveContentBusyStateRef.current = addBusyState('Table content is initializing');
                    childBusyContextRef.current.whenReady().then(function () {
                        if (resolveContentBusyStateRef.current) {
                            resolveContentBusyStateRef.current();
                            resolveContentBusyStateRef.current = undefined;
                        }
                        setIsInitialLoading(false);
                        isInitialLoadingRef.current = false;
                    });
                }
            }
            return () => {
                if (resolveDataBusyStateRef.current) {
                    resolveDataBusyStateRef.current();
                    resolveDataBusyStateRef.current = undefined;
                }
                if (resolveContentBusyStateRef.current) {
                    resolveContentBusyStateRef.current();
                    resolveContentBusyStateRef.current = undefined;
                }
            };
        }, [listDataState.status, addBusyState]);
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { id: id, ref: rootRef, children: (0, jsx_runtime_1.jsx)("div", { ref: tableViewRef, "data-oj-context": true, ...selectAllHandlerProps, ...(cellTemplate ? { 'data-oj-ct': true } : {}), ...(headerTemplate ? { 'data-oj-ht': true } : {}), ...(footerTemplate ? { 'data-oj-ft': true } : {}), ...(noData ? { 'data-oj-ndt': true } : {}), style: "display: contents;", children: (0, jsx_runtime_1.jsx)(UNSAFE_useFormVariantContext_1.FormVariantContext.Provider, { value: 'embedded', children: (0, jsx_runtime_1.jsx)(ojvcomponent_1.ReportBusyContext.Provider, { value: tableViewRef, children: (0, jsx_runtime_1.jsx)(UNSAFE_TableView_1.TableView, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, columns: preactColumns, data: preactData, getRowKey: preactGetRowKey, getAccessibleRowHeaders: preactGetAccessibleRowHeaders, gridlines: gridlines, layout: isInitialLoading ? 'pending' : layout, selected: preactSelected, selectionMode: selectionMode, onSelectionChange: preactOnSelectionChange, columnOrder: preactColumnOrder, onRowAction: preactOnRowAction, noDataRenderer: noDataRenderer, columnWidths: realizedColumnWidths, onLoadMore: onLoadMore, hasMore: hasMore, currentCellOverride: currentCellOverride, onPersistCurrentCell: onPersistCurrentCell, width: '100%' }) }) }) }) }));
    }
    exports.Table = (0, ojvcomponent_1.registerCustomElement)('oj-c-table', TableImpl, "Table", { "properties": { "layout": { "type": "string", "enumValues": ["fixed", "contents"] }, "data": { "type": "DataProvider" }, "columns": { "type": "object" }, "row": { "type": "object", "properties": { "accessibleRowHeader": { "type": "string|Array<string>|function" } } }, "horizontalGridVisible": { "type": "string", "enumValues": ["disabled", "enabled"] }, "verticalGridVisible": { "type": "string", "enumValues": ["disabled", "enabled"] }, "selected": { "type": "object", "properties": { "column": { "type": "object" }, "row": { "type": "object" } }, "writeback": true }, "selectionMode": { "type": "object", "properties": { "column": { "type": "string", "enumValues": ["none", "multiple", "single"] }, "row": { "type": "string", "enumValues": ["none", "multiple", "single"] } } }, "selectAllControl": { "type": "string", "enumValues": ["hidden", "visible"] }, "columnOrder": { "type": "Array<string>", "writeback": true }, "currentCellOverride": { "type": "object" }, "currentCell": { "type": "object", "readOnly": true, "writeback": true }, "columnWidths": { "type": "object", "writeback": true }, "scrollPolicyOptions": { "type": "object", "properties": { "fetchSize": { "type": "number" } } } }, "slots": { "cellTemplate": { "data": {} }, "headerTemplate": { "data": {} }, "footerTemplate": { "data": {} }, "noData": { "data": {} } }, "extension": { "_DYNAMIC_SLOT": { "prop": "templates", "isTemplate": 1 }, "_WRITEBACK_PROPS": ["selected", "columnOrder", "currentCell", "columnWidths"], "_READ_ONLY_PROPS": ["currentCell"], "_OBSERVED_GLOBAL_PROPS": ["aria-label", "aria-labelledby", "id"] }, "events": { "ojRowAction": { "bubbles": true } } }, { "horizontalGridVisible": "enabled", "verticalGridVisible": "disabled", "layout": "contents", "selected": {}, "selectionMode": { "row": "none", "column": "none" }, "selectAllControl": "visible", "scrollPolicyOptions": { "fetchSize": 25 } }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useCollectionInteractionContext_1.CollectionInteractionContext] });
    const metadata = (0, ojcustomelement_registry_1.getMetadata)('oj-c-table');
    metadata.properties.__oj_private_do_not_use_userAssistanceDensity = {
        binding: {
            provide: [
                { name: 'containerUserAssistanceDensity', default: 'compact' },
                { name: 'userAssistanceDensity', default: 'compact' }
            ]
        }
    };
});

define('oj-c/table',["require", "exports", "oj-c/table/table"], function (require, exports, table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Table = void 0;
    Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return table_1.Table; } });
});


define('oj-c/progress-button/progress-button',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "ojs/ojvcomponent", "@oracle/oraclejet-preact/UNSAFE_ProgressButton", "@oracle/oraclejet-preact/UNSAFE_IconProgressButton", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "@oracle/oraclejet-preact/hooks/UNSAFE_useTooltip", "@oracle/oraclejet-preact/utils/UNSAFE_mergeProps", "preact/hooks", "preact/compat", "css!oj-c/progress-button/progress-button-styles.css"], function (require, exports, jsx_runtime_1, translationBundle_1, ojvcomponent_1, UNSAFE_ProgressButton_1, UNSAFE_IconProgressButton_1, UNSAFE_useTabbableMode_1, UNSAFE_useTooltip_1, UNSAFE_mergeProps_1, hooks_1, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressButton = void 0;
    function ProgressButtonImpl({ chroming = 'outlined', disabled = false, size = 'md', display = 'all', startIcon, edge = 'none', tooltip, isLoading, width, label, onOjAction, ...otherProps }, ref) {
        const rootRef = (0, hooks_1.useRef)();
        const buttonRef = (0, hooks_1.useRef)();
        const iconButtonRef = (0, hooks_1.useRef)();
        const isLabelButton = display != 'icons' || (!startIcon && display == 'icons');
        const widthSize = { width: edge === 'bottom' ? '100%' : width };
        const widthProps = width || edge !== 'none' ? { style: widthSize } : {};
        const ariaProps = { 'aria-label': label };
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            blur: () => (isLabelButton ? buttonRef.current?.blur() : iconButtonRef?.current?.blur()),
            focus: () => (isLabelButton ? buttonRef.current?.focus() : iconButtonRef?.current?.focus()),
            click: () => (isLabelButton ? buttonRef.current?.click() : iconButtonRef?.current?.click())
        }), [isLabelButton, buttonRef, iconButtonRef]);
        if (isLabelButton) {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, children: (0, jsx_runtime_1.jsx)(FunctionalProgressButton, { ref: buttonRef, type: "submit", variant: chroming, isDisabled: disabled, width: '100%', onAction: onOjAction, startIcon: startIcon, isLoading: isLoading, size: size, label: display == 'icons' ? (!startIcon ? label : '') : label, display: display != 'icons' ? display : 'all', ...otherProps }) }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { ref: rootRef, ...widthProps, children: (0, jsx_runtime_1.jsx)(FunctionalIconProgressButton, { width: '100%', ref: iconButtonRef, type: "submit", variant: chroming, isDisabled: disabled, isLoading: isLoading, tooltip: label, onAction: onOjAction, size: size, ...ariaProps, ...otherProps, children: startIcon }) }));
        }
    }
    exports.ProgressButton = (0, ojvcomponent_1.registerCustomElement)('oj-c-progress-button', (0, compat_1.forwardRef)(ProgressButtonImpl), "ProgressButton", { "properties": { "label": { "type": "string" }, "tooltip": { "type": "string" }, "disabled": { "type": "boolean" }, "isLoading": { "type": "boolean" }, "width": { "type": "number|string" }, "display": { "type": "string", "enumValues": ["all", "label", "icons"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "edge": { "type": "string", "enumValues": ["none", "bottom"] }, "chroming": { "type": "string", "enumValues": ["solid", "borderless", "outlined", "callToAction"], "binding": { "consume": { "name": "containerChroming" } } } }, "slots": { "startIcon": {} }, "events": { "ojAction": { "bubbles": true } }, "methods": { "focus": {}, "blur": {}, "click": {} } }, { "chroming": "outlined", "disabled": false, "size": "md", "display": "all", "edge": "none" }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
    const FunctionalProgressButton = (0, compat_1.forwardRef)((props, ref) => {
        const buttonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => buttonRef.current?.focus(),
            blur: () => buttonRef.current?.blur(),
            click: () => buttonRef.current?.click()
        }), []);
        const { tooltipContent, tooltipProps } = (0, UNSAFE_useTooltip_1.useTooltip)({
            text: props.tooltip,
            isDisabled: props.isDisabled
        });
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UNSAFE_ProgressButton_1.ProgressButton, { ref: buttonRef, ...(0, UNSAFE_mergeProps_1.mergeProps)(props, tooltipProps) }), tooltipContent] }));
    });
    const FunctionalIconProgressButton = (0, compat_1.forwardRef)((props, ref) => {
        const iconButtonRef = (0, hooks_1.useRef)();
        (0, hooks_1.useImperativeHandle)(ref, () => ({
            focus: () => iconButtonRef.current?.focus(),
            blur: () => iconButtonRef.current?.blur(),
            click: () => iconButtonRef.current?.click()
        }), []);
        return (0, jsx_runtime_1.jsx)(UNSAFE_IconProgressButton_1.IconProgressButton, { ref: iconButtonRef, ...props });
    });
});

define('oj-c/progress-button',["require", "exports", "oj-c/progress-button/progress-button"], function (require, exports, progress_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressButton = void 0;
    Object.defineProperty(exports, "ProgressButton", { enumerable: true, get: function () { return progress_button_1.ProgressButton; } });
});

define('oj-c/skeleton/skeleton',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Skeleton", "ojs/ojvcomponent"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Skeleton_1, ojvcomponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Skeleton = void 0;
    const SkeletonImpl = ({ height, width, borderRadius }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Skeleton_1.Skeleton, { height: height, width: width, borderRadius: borderRadius }) }));
    };
    exports.Skeleton = (0, ojvcomponent_1.registerCustomElement)('oj-c-skeleton', SkeletonImpl, "Skeleton", { "properties": { "height": { "type": "number|string" }, "width": { "type": "number|string" }, "borderRadius": { "type": "number|string" } } }, undefined, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    });
});

define('oj-c/skeleton',["require", "exports", "oj-c/skeleton/skeleton"], function (require, exports, skeleton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Skeleton = void 0;
    Object.defineProperty(exports, "Skeleton", { enumerable: true, get: function () { return skeleton_1.Skeleton; } });
});

define('oj-c/toolbar/items-toolbar',["require", "exports", "preact/jsx-runtime", "@oracle/oraclejet-preact/UNSAFE_Toolbar", "oj-c/button", "oj-c/menu-button", "oj-c/split-menu-button", "oj-c/utils/PRIVATE_ItemsMenu/menu-item-icon", "oj-c/buttonset-single", "oj-c/buttonset-multiple", "oj-c/toggle-button", "oj-c/progress-button"], function (require, exports, jsx_runtime_1, UNSAFE_Toolbar_1, button_1, menu_button_1, split_menu_button_1, menu_item_icon_1, buttonset_single_1, buttonset_multiple_1, toggle_button_1, progress_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemsToolbar = void 0;
    const ItemsToolbar = ({ items = [], size, chroming, toolbarSelection = {}, onToolbarSelectionChanged, onOjToolbarAction, onOjToolbarSelection }) => {
        const setSelectionValue = (selection, value, key, menuButtonSelection = {}) => {
            let updatedSelection = { ...selection };
            if (!key) {
                for (const k in menuButtonSelection) {
                    if (!(k in value))
                        delete updatedSelection[k];
                }
                updatedSelection = { ...updatedSelection, ...value };
            }
            else {
                if (Array.isArray(value) && value.length === 0) {
                    delete updatedSelection[key];
                }
                else {
                    updatedSelection[key] = value;
                }
            }
            return updatedSelection;
        };
        const getItemActionHandler = (key, onAction) => {
            return () => {
                onAction?.();
                onOjToolbarAction?.({ key });
            };
        };
        const getSelectionChanges = (selection, key = '', value) => {
            onOjToolbarSelection?.({ value: value, toolbarSelectionGroupKey: key });
            onToolbarSelectionChanged?.(setSelectionValue(selection, value, key));
        };
        const getMenuButtonSelection = (toolbarSelection, menuItems, menuButtonSelection) => {
            menuItems?.forEach((item) => {
                if (item.type === 'selectsingle' || item.type === 'selectmultiple') {
                    if (item.key in toolbarSelection) {
                        menuButtonSelection[item.key] = toolbarSelection[item.key];
                    }
                }
                else if (item.type === 'submenu') {
                    menuButtonSelection = getMenuButtonSelection(toolbarSelection, item.items, menuButtonSelection);
                }
            });
            return menuButtonSelection;
        };
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: items.map((item) => {
                switch (item.type) {
                    case 'button': {
                        const { startIcon, endIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(button_1.Button, { ...props, chroming: itemChroming || chroming, size: size, onOjAction: getItemActionHandler(item.key, item.onAction), startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'menu-button': {
                        const { startIcon, endIcon, items: menuItems, chroming: itemChroming, ...props } = item;
                        let menuButtonSelection = {};
                        menuButtonSelection = getMenuButtonSelection(toolbarSelection, menuItems, menuButtonSelection);
                        return ((0, jsx_runtime_1.jsx)(menu_button_1.MenuButton, { ...props, items: menuItems, chroming: itemChroming || chroming, size: size, onOjMenuAction: getItemActionHandler(''), selection: menuButtonSelection, onOjMenuSelection: (value) => {
                                onOjToolbarSelection?.({
                                    value: value,
                                    toolbarSelectionGroupKey: ''
                                });
                            }, onSelectionChanged: (value) => {
                                onToolbarSelectionChanged?.(setSelectionValue(toolbarSelection, value, '', menuButtonSelection));
                            }, startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'split-menu-button': {
                        return ((0, jsx_runtime_1.jsx)(split_menu_button_1.SplitMenuButton, { size: size, ...item, onOjAction: getItemActionHandler(item.key, item.onAction) }));
                    }
                    case 'buttonset-single': {
                        const { chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(buttonset_single_1.ButtonsetSingle, { chroming: itemChroming || chroming, size: size, ...props, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            } }));
                    }
                    case 'buttonset-multiple': {
                        const { chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(buttonset_multiple_1.ButtonsetMultiple, { chroming: itemChroming || chroming, size: size, ...props, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            } }));
                    }
                    case 'toggle-button': {
                        const { startIcon, endIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(toggle_button_1.ToggleButton, { chroming: itemChroming || chroming, size: size, value: toolbarSelection[item.key], onValueChanged: (value) => {
                                getSelectionChanges(toolbarSelection, item.key, value);
                            }, ...props, startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }), endIcon: endIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: endIcon }) }));
                    }
                    case 'progress-button': {
                        const { startIcon, chroming: itemChroming, ...props } = item;
                        return ((0, jsx_runtime_1.jsx)(progress_button_1.ProgressButton, { chroming: itemChroming || chroming, size: size, ...props, onOjAction: getItemActionHandler(item.key, item.onAction), startIcon: startIcon && (0, jsx_runtime_1.jsx)(menu_item_icon_1.MenuItemIcon, { icon: startIcon }) }));
                    }
                    case 'separator':
                        return (0, jsx_runtime_1.jsx)(UNSAFE_Toolbar_1.ToolbarSeparator, {});
                    default:
                        return;
                }
            }) }));
    };
    exports.ItemsToolbar = ItemsToolbar;
});

define('oj-c/toolbar/toolbar',["require", "exports", "preact/jsx-runtime", '@oracle/oraclejet-preact/translationBundle', "@oracle/oraclejet-preact/UNSAFE_Toolbar", "@oracle/oraclejet-preact/hooks/UNSAFE_useTabbableMode", "ojs/ojvcomponent", "./items-toolbar"], function (require, exports, jsx_runtime_1, translationBundle_1, UNSAFE_Toolbar_1, UNSAFE_useTabbableMode_1, ojvcomponent_1, items_toolbar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Toolbar = void 0;
    exports.Toolbar = (0, ojvcomponent_1.registerCustomElement)('oj-c-toolbar', ({ 'aria-controls': ariaControls, 'aria-label': ariaLabel, spacing, size, chroming, items = [], toolbarSelection = {}, onToolbarSelectionChanged, onOjToolbarAction, onOjToolbarSelection }) => {
        return ((0, jsx_runtime_1.jsx)(ojvcomponent_1.Root, { children: (0, jsx_runtime_1.jsx)(UNSAFE_Toolbar_1.Toolbar, { "aria-controls": ariaControls, "aria-label": ariaLabel, spacing: spacing, children: (0, jsx_runtime_1.jsx)(items_toolbar_1.ItemsToolbar, { items: items, size: size, chroming: chroming, toolbarSelection: toolbarSelection, onToolbarSelectionChanged: onToolbarSelectionChanged, onOjToolbarAction: onOjToolbarAction, onOjToolbarSelection: onOjToolbarSelection }) }) }));
    }, "Toolbar", { "properties": { "spacing": { "type": "string", "enumValues": ["sm", "lg"] }, "chroming": { "type": "string", "enumValues": ["borderless", "outlined"] }, "size": { "type": "string", "enumValues": ["sm", "md", "lg"] }, "items": { "type": "Array<object>" }, "toolbarSelection": { "type": "object", "writeback": true } }, "events": { "ojToolbarAction": { "bubbles": true }, "ojToolbarSelection": { "bubbles": true } }, "extension": { "_WRITEBACK_PROPS": ["toolbarSelection"], "_READ_ONLY_PROPS": [], "_OBSERVED_GLOBAL_PROPS": ["aria-controls", "aria-label"] } }, { "items": [], "toolbarSelection": {} }, {
        '@oracle/oraclejet-preact': translationBundle_1.default
    }, { consume: [UNSAFE_useTabbableMode_1.TabbableModeContext] });
});

define('oj-c/toolbar',["require", "exports", "oj-c/toolbar/toolbar"], function (require, exports, toolbar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Toolbar = void 0;
    Object.defineProperty(exports, "Toolbar", { enumerable: true, get: function () { return toolbar_1.Toolbar; } });
});


define("corepackbundle", function(){});

