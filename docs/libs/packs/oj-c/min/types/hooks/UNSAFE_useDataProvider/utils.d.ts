import { ItemContext } from 'ojs/ojcommontypes';
import { DataProvider, DataProviderMutationEventDetail } from 'ojs/ojdataprovider';
export declare function getUpdatedItemsFromMutationDetail<K, D>(detail: DataProviderMutationEventDetail<K, D>, currentData: ItemContext<K, D>[], dataProvider: DataProvider<K, D>): Promise<ItemContext<K, D>[]>;
