define(["require", "exports", "ojs/ojdataprovider", "@oracle/oraclejet-preact/utils/UNSAFE_logger"], function (require, exports, ojdataprovider_1, UNSAFE_logger_1) {
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
