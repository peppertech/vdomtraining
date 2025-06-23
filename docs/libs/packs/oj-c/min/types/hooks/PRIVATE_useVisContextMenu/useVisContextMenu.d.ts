import { ContextMenuItems } from '../../utils/PRIVATE_ItemsMenu/items-menu';
import { Action, Bubbles } from 'ojs/ojvcomponent';
export type ContextMenuConfig<C> = {
    accessibleLabel?: string;
    items: (context: C) => Array<ContextMenuItems>;
};
export type ContextMenuSelectionDetail<C> = {
    value: string | Array<string>;
    contextMenuContext: C;
    menuSelectionGroupKey: string;
};
export type ContextMenuActionDetail<C> = {
    menuItemKey: string;
    contextMenuContext: C;
};
export declare function useVisContextMenu<K, Context extends {
    data?: any;
    type: string;
}, D>(idToDPItemMap: Map<K, D>, contextMenuConfig?: ContextMenuConfig<Context>, onOjContextMenuAction?: Action<ContextMenuActionDetail<Context>> & Bubbles, onOjContextMenuSelection?: Action<ContextMenuSelectionDetail<Context>> & Bubbles, transformContext?: (context: any) => Parameters<ContextMenuConfig<Context>['items']>[0]): {
    preactContextMenuConfig: {
        itemsRenderer: (context: Parameters<ContextMenuConfig<Context>["items"]>[0]) => import("preact").JSX.Element;
        accessibleLabel: string | undefined;
    };
};
