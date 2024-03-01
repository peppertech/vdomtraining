import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { TemplateSlot } from 'ojs/ojvcomponent';
export type LegendItemTemplateContext<K, D> = {
    data: D;
    key: K;
    index: number;
    parentData?: Array<D>;
    parentKey?: K;
};
export type LegendSectionTemplateContext<K, D> = {
    data: D;
    key: K;
    index: number;
};
export declare function useSectionData<K, D extends any>(dataProvider: ArrayTreeDataProvider<K, D>, addBusyState: (description: string) => () => void, sectionTemplate?: TemplateSlot<LegendSectionTemplateContext<K, D>>, itemTemplate?: TemplateSlot<LegendItemTemplateContext<K, D>>): any[];
