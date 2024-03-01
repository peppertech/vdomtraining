export declare function useVizCategories<K extends string | number>(categoriesItem: any[], getCategories: (item: any) => string[], hiddenCategories?: string[], highlightedCategories?: string[], hiddenMatch?: 'any' | 'all', highlightMatch?: 'any' | 'all', onHiddenCategoriesChanged?: (category: string[]) => void, onHighlightedCategoriesChanged?: (category: string[]) => void): {
    hiddenIds: K[];
    updateHidden: (id: K | undefined) => void;
    highlightedIds: K[];
    updateHighlighted: (id: K | undefined) => void;
};
