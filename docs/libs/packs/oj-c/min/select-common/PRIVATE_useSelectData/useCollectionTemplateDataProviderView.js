define(["require", "exports", "oj-c/hooks/UNSAFE_useListData/useListData", "preact/hooks", "./CollectionTemplateDataProviderView"], function (require, exports, useListData_1, hooks_1, CollectionTemplateDataProviderView_1) {
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
