define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/hooks/UNSAFE_useEditableValue/index", "oj-c/editable-value/UNSAFE_useDeferredValidators/useDeferredValidators", "oj-c/select-common/PRIVATE_useCache/index", "oj-c/select-common/PRIVATE_useSelectData/index", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/utils/utils", "oj-c/utils/PRIVATE_keyUtils/keySetUtils", "ojs/ojkeyset", "preact/hooks", "./useSyncValueAndValueItems", "./useValueItems"], function (require, exports, UNSAFE_useTranslationBundle_1, index_1, useDeferredValidators_1, index_2, index_3, useDataProviderListeners_1, utils_1, keySetUtils_1, ojkeyset_1, hooks_1, useSyncValueAndValueItems_1, useValueItems_1) {
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
