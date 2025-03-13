import { ListItemContext as PreactListItemContext } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { CardViewProps } from './card-view';
import { Item } from 'ojs/ojdataprovider';
type CardViewItemProps<K extends string | number, D> = {
    context: PreactListItemContext<K, Item<K, D>>;
    itemTemplate: CardViewProps<K, D>['itemTemplate'];
};
export declare const CardViewItem: <K extends string | number, D>({ context, itemTemplate }: CardViewItemProps<K, D>) => import("preact").JSX.Element;
export {};
