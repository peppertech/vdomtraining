define(["require", "exports", "preact/hooks", "../hooks/UNSAFE_useListData/useListData", "../utils/PRIVATE_collectionUtils/collectionUtils"], function (require, exports, hooks_1, useListData_1, collectionUtils_1) {
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
