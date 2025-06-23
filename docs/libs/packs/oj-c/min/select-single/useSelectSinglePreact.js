define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/select-common/PRIVATE_useCache/index", "oj-c/select-common/PRIVATE_useSelectData/index", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/utils/utils", "ojs/ojkeyset", "preact/hooks", "./useSyncValueAndValueItem", "./useValueItem"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, useDeferredValidators_1, index_2, index_3, useDataProviderListeners_1, utils_1, ojkeyset_1, hooks_1, useSyncValueAndValueItem_1, useValueItem_1) {
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
