define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useTranslationBundle", "oj-c/editable-value/UNSAFE_useEditableValue/useEditableValue", "oj-c/editable-value/UNSAFE_useValidators/useValidators", "oj-c/hooks/UNSAFE_useListData/useListData", "oj-c/select-common/UNSAFE_useDataProviderListeners/useDataProviderListeners", "oj-c/select-common/UNSAFE_useWrapDataProvider/useWrapDataProvider", "oj-c/select-common/UNSAFE_useWrapValueState/useWrapValueState", "oj-c/select-common/utils/utils", "oj-c/utils/UNSAFE_keyUtils/keySetUtils", "ojs/ojdataprovider", "preact/hooks", "./useSyncValueAndValueItems", "./useValueItems"], function (require, exports, UNSAFE_useTranslationBundle_1, useEditableValue_1, useValidators_1, useListData_1, useDataProviderListeners_1, useWrapDataProvider_1, useWrapValueState_1, utils_1, keySetUtils_1, ojdataprovider_1, hooks_1, useSyncValueAndValueItems_1, useValueItems_1) {
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
