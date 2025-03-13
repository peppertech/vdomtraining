define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useCategories"], function (require, exports, UNSAFE_useCategories_1) {
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
