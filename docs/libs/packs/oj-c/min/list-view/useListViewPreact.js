define(["require", "exports", "preact/hooks", "../utils/UNSAFE_keyUtils/keySetUtils", "../hooks/UNSAFE_useListData/useListData", "./useHandleRemoveCurrentKey"], function (require, exports, hooks_1, keySetUtils_1, useListData_1, useHandleRemoveCurrentKey_1) {
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
