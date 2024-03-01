export declare const getLegendEventsHandler: (isHideShowOn: boolean, isHighlightOn: boolean, updateHidden: (id: string) => void, updateHighlighted: (id?: string) => void, getDrillDetail: (arr: number[]) => any, drilling?: 'on' | 'off', onOjDrill?: ((detail: {
    id: any;
}) => void) | undefined) => {
    itemActionHandler: (detail: {
        itemId: string;
    }) => void;
    inputHandler: (detail: {
        itemId?: string;
    }) => void;
};
