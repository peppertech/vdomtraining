import { PropertyChanged } from 'ojs/ojvcomponent';
import { SelectToolbarItemDetail, ToolbarItems, ToolbarActionDetail, ToolbarSelection, ItemChroming, ItemSizes } from './itemsTypes';
export type { ToolbarItems, ToolbarActionDetail, ToolbarSelection, ToolbarSelectionDetail, ItemChroming, ItemSizes } from './itemsTypes';
type Props = {
    items?: ToolbarItems[];
    chroming?: ItemChroming;
    size?: ItemSizes;
    toolbarSelection?: Record<string, ToolbarSelection>;
    onToolbarSelectionChanged?: PropertyChanged<Record<string, ToolbarSelection>>;
    onOjToolbarAction?: (details: ToolbarActionDetail) => void;
    onOjToolbarSelection?: (details: SelectToolbarItemDetail<ToolbarSelection> & {
        toolbarSelectionGroupKey: string;
    }) => void;
};
export declare const ItemsToolbar: ({ items, size, chroming, toolbarSelection, onToolbarSelectionChanged, onOjToolbarAction, onOjToolbarSelection }: Props) => import("preact").JSX.Element;
