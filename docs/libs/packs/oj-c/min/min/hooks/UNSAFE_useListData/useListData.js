define(["require", "exports", "ojs/ojdataproviderfactory", "preact/hooks"], function (require, exports, ojdataproviderfactory_1, hooks_1) {
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
