import { ListItemRendererContext as PreactListItemRendererContext } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { ListViewProps } from './list-view';
import { Item } from 'ojs/ojdataprovider';
type ListItemProps<K extends string | number, D> = {
    context: PreactListItemRendererContext<K, Item<K, D>>;
    itemTemplate: ListViewProps<K, D>['itemTemplate'];
};
export declare const ListItem: <K extends string | number, D>({ context, itemTemplate }: ListItemProps<K, D>) => import("preact").JSX.Element;
export {};
