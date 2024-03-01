export declare function getTextStyles(styles?: Partial<CSSStyleDeclaration>): {
    textFontStyle: string | undefined;
    textFontSize: string | undefined;
    textFontColor: string | undefined;
    textFontWeight: string | undefined;
    textDecoration: string | undefined;
    textFontFamily: string | undefined;
};
export declare function getSectionStyles(styles?: Partial<CSSStyleDeclaration>): {
    sectionTitleColor: string | undefined;
    sectionTitleFontFamily: string | undefined;
    sectionTitleFontSize: string | undefined;
    sectionTitleFontStyle: string | undefined;
    sectionTitleFontWeight: string | undefined;
    sectionTitleTextDecoration: string | undefined;
};
export declare function isLegendInteractive(drilling?: 'on' | 'off', hideAndShowBehavior?: 'on' | 'off', hoverBehavior?: 'dim' | 'none'): boolean;
export declare function parseItemId(id: string): number[];
export declare function transformItem(dataItem: any, sectionIndex: number, itemIndex: number, ariaLabelSuffix: string): {
    borderColor: any;
    lineWidth: any;
    markerColor: any;
    lineColor: any;
    markerShape: any;
    lineStyle: any;
    'aria-label': string | undefined;
    datatip: any;
    source: any;
    text: any;
    id: string;
};
export declare function transformSection(dataSection: any, ariaLabelSuffix: string, sectionIndex: number): {
    items: any;
    title: any;
    id: string;
};
export declare function isTreeDataProvider(dataprovider: any): boolean;
export declare const getDefaultSymbolDims: (symbolHeight: number, symbolWidth: number) => {
    width: undefined;
    height: undefined;
} | {
    width: number;
    height: number;
};
