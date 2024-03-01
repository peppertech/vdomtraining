define(["require", "exports", "@oracle/oraclejet-preact/hooks/UNSAFE_useCategories"], function (require, exports, UNSAFE_useCategories_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useVizCategories = void 0;
    function useVizCategories(categoriesItem, getCategories, hiddenCategories, highlightedCategories, hiddenMatch = 'any', highlightMatch = 'all', onHiddenCategoriesChanged, onHighlightedCategoriesChanged) {
        const { ids: hiddenIds, updateCategories: updateHidden } = (0, UNSAFE_useCategories_1.useCategories)(categoriesItem, getCategories, hiddenCategories, hiddenMatch, false, onHiddenCategoriesChanged);
        const { ids: highlightedIds, updateCategories: updateHighlighted } = (0, UNSAFE_useCategories_1.useCategories)(categoriesItem, getCategories, highlightedCategories, highlightMatch, true, onHighlightedCategoriesChanged);
        return {
            hiddenIds,
            updateHidden,
            highlightedIds,
            updateHighlighted
        };
    }
    exports.useVizCategories = useVizCategories;
});
