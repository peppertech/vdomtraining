import { TemplateSlot } from 'ojs/ojvcomponent';
import { Item } from 'ojs/ojdataprovider';
export type ConveyorItemContext<K, D> = {
    data: D;
    item: Item<K, D>;
};
export type Metadata<K> = {
    key: K;
    suggestion?: Record<string, any>;
    treeDepth?: number;
    isLeaf?: boolean;
    parentKey?: K;
};
export type ConveyorBeltItemRendererContext<K, D> = {
    index: number;
    data: D;
    metadata: Metadata<K>;
};
type ConveyorBeltItemProps<K extends string | number, D> = {
    context: ConveyorBeltItemRendererContext<K, Item<K, D>>;
    itemTemplate: TemplateSlot<ConveyorItemContext<K, D>>;
};
export declare const ConveyorBeltItem: <K extends string | number, D>({ context, itemTemplate }: ConveyorBeltItemProps<K, D>) => import("preact").JSX.Element;
export {};
