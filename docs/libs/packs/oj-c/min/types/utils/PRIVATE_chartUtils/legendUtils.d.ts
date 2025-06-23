export type CategoriesItem = {
    id: string | number;
    categories: string[];
};
export declare const LegendDefaults: {
    rendered: "off";
    position: "auto";
};
export declare function getLegendData(series: any): any;
export declare function getBLACCategoriesItems(series: any, groups: any, getDataItem: (seriesIndex: number, groupIndex: number) => any, hoverBehavior: 'dim' | 'none', hideAndShowBehavior: 'withRescale' | 'withoutRescale' | 'none'): CategoriesItem[];
