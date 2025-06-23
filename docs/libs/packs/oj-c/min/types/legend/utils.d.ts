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
export declare function isLegendInteractive(drilling?: 'on' | 'off', hideAndShowBehavior?: 'on' | 'off', hoverBehavior?: 'dim' | 'none', hasDrillableItem?: boolean, isContextMenuEnabled?: boolean): boolean | undefined;
export declare function parseItemIdx(id: string): number[];
export declare function transformItem(dataItem: any, sectionIndex: number, itemIndex: number, ariaLabelSuffix: string, drilling?: 'on' | 'off', hideAndShowBehavior?: 'on' | 'off', isContextMenuEnabled?: boolean): {
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
    actionable: "inherit" | "off";
    id: string;
};
export declare function transformSection(dataSection: any, ariaLabelSuffix: string, sectionIndex: number, drilling?: 'on' | 'off'): {
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
export declare function isLegendItemDrillable(drilling?: 'on' | 'off', itemDrilling?: 'on' | 'off' | 'inherit'): string;
