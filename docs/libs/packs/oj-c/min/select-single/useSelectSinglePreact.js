define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "oj-c/editable-value/utils/utils", "oj-c/hooks/UNSAFE_useListData/useListData", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider", "oj-c/select-common/UNSAFE_useWrapValueState/useWrapValueState", "oj-c/select-common/utils/utils", "ojs/ojdataprovider", "preact/hooks", "./useSyncValueAndValueItem", "./useValueItem"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, useValidators_1, utils_1, useListData_1, useDataProviderListeners_1, useWrapDataProvider_1, useWrapValueState_1, utils_2, ojdataprovider_1, hooks_1, useSyncValueAndValueItem_1, useValueItem_1) {
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
