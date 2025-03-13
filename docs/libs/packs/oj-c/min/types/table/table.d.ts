import { JetElement, JetSettableProperties, JetElementCustomEventStrict, JetSetPropertyType } from 'ojs/index';
import { GlobalProps } from 'ojs/ojvcomponent';
import 'ojs/oj-jsx-interfaces';
import { ExtendGlobalProps, Action, Bubbles, PropertyChanged, ReadOnlyPropertyChanged, ObservedGlobalProps, TemplateSlot, DynamicTemplateSlots } from 'ojs/ojvcomponent';
import { ComponentProps, ComponentType } from 'preact';
import 'css!oj-c/table/table-styles.css';
import { DataProvider, Item } from 'ojs/ojdataprovider';
import { ImmutableKeySet } from 'ojs/ojkeyset';
export type RowContext<K, D> = {
    item: Item<K, D>;
};
export type CellTemplateContext<K, D, C> = {
    columnKey: C;
    item: Item<K, D>;
    data?: D[keyof D];
    isTabbable: boolean;
};
export type HeaderTemplateContext<C> = {
    key: C;
    headerText?: string;
    isTabbable: boolean;
};
export type FooterTemplateContext<C> = {
    key: C;
    footerText?: string;
    isTabbable: boolean;
};
type NoDataContext = {
    isTabbable: boolean;
};
type RowActionDetail<K, D> = {
    context: RowContext<K, D>;
};
type CellPadding = {
    bottom?: 'enabled' | 'disabled';
    end?: 'enabled' | 'disabled';
    start?: 'enabled' | 'disabled';
    top?: 'enabled' | 'disabled';
};
export type Column<K, D> = {
    field?: keyof D;
    headerText?: string;
    footerText?: string;
    template?: string;
    headerTemplate?: string;
    footerTemplate?: string;
    maxWidth?: number;
    minWidth?: number;
    weight?: number;
    padding?: 'enabled' | 'disabled' | CellPadding | ((context: RowContext<K, D>) => 'enabled' | 'disabled' | CellPadding);
    headerPadding?: 'enabled' | 'disabled' | CellPadding;
    footerPadding?: 'enabled' | 'disabled' | CellPadding;
    tooltip?: 'enabled' | 'disabled' | ((context: RowContext<K, D>) => 'enabled' | 'disabled');
    headerTooltip?: 'enabled' | 'disabled';
    footerTooltip?: 'enabled' | 'disabled';
    sticky?: 'enabled' | 'disabled';
    horizontalAlignment?: 'start' | 'end' | 'left' | 'right' | 'center';
};
declare const _SELECTION_COLUMN_KEY = "oj-c-table_selection";
type TableDefaultColumnKey = typeof _SELECTION_COLUMN_KEY;
type DataCell<K, C> = {
    rowKey: K;
    columnKey: C | TableDefaultColumnKey;
    type: 'data';
};
type NoDataCell = {
    type: 'noData';
};
type HeaderCell<C> = {
    columnKey: C | TableDefaultColumnKey;
    type: 'header';
};
type FooterCell<C> = {
    columnKey: C | TableDefaultColumnKey;
    type: 'footer';
};
type Cell<K, C> = DataCell<K, C> | HeaderCell<C> | FooterCell<C> | NoDataCell;
type DataCellRowOverride<K, C> = {
    rowKey: K;
    columnKey?: C | TableDefaultColumnKey;
    type?: 'data';
};
type DataCellColumnOverride<K, C> = {
    rowKey?: K;
    columnKey: C | TableDefaultColumnKey;
    type?: 'data';
};
type DataCellTypeOverride<K, C> = {
    rowKey?: K;
    columnKey?: C | TableDefaultColumnKey;
    type: 'data';
};
type HeaderCellColumnOverride<C> = {
    columnKey: C | TableDefaultColumnKey;
    type?: 'header';
};
type HeaderCellTypeOverride<C> = {
    columnKey?: C | TableDefaultColumnKey;
    type: 'header';
};
type FooterCellColumnOverride<C> = {
    columnKey: C | TableDefaultColumnKey;
    type?: 'footer';
};
type FooterCellTypeOverride<C> = {
    columnKey?: C | TableDefaultColumnKey;
    type: 'footer';
};
type CellOverride<K, C> = DataCellRowOverride<K, C> | DataCellColumnOverride<K, C> | DataCellTypeOverride<K, C> | HeaderCellColumnOverride<C> | HeaderCellTypeOverride<C> | FooterCellColumnOverride<C> | FooterCellTypeOverride<C> | NoDataCell;
export type TableProps<K extends string | number, D, C extends string> = ObservedGlobalProps<'aria-label' | 'aria-labelledby' | 'id'> & {
    layout?: 'contents' | 'fixed';
    data?: DataProvider<K, D>;
    columns?: Record<C, Column<K, D>>;
    row?: {
        accessibleRowHeader?: C | C[] | ((context: RowContext<K, D>) => C | C[]);
    };
    horizontalGridVisible?: 'enabled' | 'disabled';
    verticalGridVisible?: 'enabled' | 'disabled';
    selected?: {
        column?: ImmutableKeySet<C>;
        row?: ImmutableKeySet<K>;
    };
    selectionMode?: {
        column?: 'none' | 'single' | 'multiple';
        row?: 'none' | 'single' | 'multiple';
    };
    selectAllControl?: 'hidden' | 'visible';
    onSelectedChanged?: PropertyChanged<{
        row?: ImmutableKeySet<K>;
        column?: ImmutableKeySet<C>;
    }>;
    columnOrder?: C[];
    onColumnOrderChanged?: PropertyChanged<C[]>;
    cellTemplate?: TemplateSlot<CellTemplateContext<K, D, C>>;
    headerTemplate?: TemplateSlot<HeaderTemplateContext<C>>;
    footerTemplate?: TemplateSlot<FooterTemplateContext<C>>;
    templates?: DynamicTemplateSlots<CellTemplateContext<K, D, C> | HeaderTemplateContext<C> | FooterTemplateContext<C>>;
    onOjRowAction?: Action<RowActionDetail<K, D>> & Bubbles;
    noData?: TemplateSlot<NoDataContext>;
    currentCellOverride?: CellOverride<K, C>;
    onCurrentCellChanged?: ReadOnlyPropertyChanged<Cell<K, C> | undefined>;
    columnWidths?: Record<C, number>;
    onColumnWidthsChanged?: PropertyChanged<C[]>;
    scrollPolicyOptions?: {
        fetchSize?: number;
    };
};
declare function TableImpl<K extends string | number, D, C extends string>({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, id, data, columns, row, horizontalGridVisible, verticalGridVisible, layout, currentCellOverride, onCurrentCellChanged, selected, selectionMode, onSelectedChanged, selectAllControl, columnOrder, cellTemplate, headerTemplate, footerTemplate, templates, onOjRowAction, noData, columnWidths, scrollPolicyOptions }: TableProps<K, D, C>): import("preact").JSX.Element;
export declare const Table: ComponentType<ExtendGlobalProps<ComponentProps<typeof TableImpl<string | number, any, string>>>>;
export {};
export interface CTableElement<K extends string | number, D, C extends string> extends JetElement<CTableElementSettableProperties<K, D, C>>, CTableElementSettableProperties<K, D, C> {
    readonly currentCell?: Parameters<Required<TableProps<K, D, C>>['onCurrentCellChanged']>[0];
    addEventListener<T extends keyof CTableElementEventMap<K, D, C>>(type: T, listener: (this: HTMLElement, ev: CTableElementEventMap<K, D, C>[T]) => any, options?: (boolean | AddEventListenerOptions)): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: (boolean | AddEventListenerOptions)): void;
    getProperty<T extends keyof CTableElementSettableProperties<K, D, C>>(property: T): CTableElement<K, D, C>[T];
    getProperty(property: string): any;
    setProperty<T extends keyof CTableElementSettableProperties<K, D, C>>(property: T, value: CTableElementSettableProperties<K, D, C>[T]): void;
    setProperty<T extends string>(property: T, value: JetSetPropertyType<T, CTableElementSettableProperties<K, D, C>>): void;
    setProperties(properties: CTableElementSettablePropertiesLenient<K, D, C>): void;
}
export namespace CTableElement {
    interface ojRowAction<K extends string | number, D> extends CustomEvent<RowActionDetail<K, D> & {}> {
    }
    type columnOrderChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['columnOrder']>;
    type columnWidthsChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['columnWidths']>;
    type columnsChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['columns']>;
    type currentCellChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['currentCell']>;
    type currentCellOverrideChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['currentCellOverride']>;
    type dataChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['data']>;
    type horizontalGridVisibleChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['horizontalGridVisible']>;
    type layoutChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['layout']>;
    type rowChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['row']>;
    type scrollPolicyOptionsChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['scrollPolicyOptions']>;
    type selectAllControlChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['selectAllControl']>;
    type selectedChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['selected']>;
    type selectionModeChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['selectionMode']>;
    type verticalGridVisibleChanged<K extends string | number, D, C extends string> = JetElementCustomEventStrict<CTableElement<K, D, C>['verticalGridVisible']>;
    type RenderCellTemplate<K extends string | number, D, C extends string> = import('ojs/ojvcomponent').TemplateSlot<CellTemplateContext<K, D, C>>;
    type RenderHeaderTemplate<C extends string> = import('ojs/ojvcomponent').TemplateSlot<HeaderTemplateContext<C>>;
    type RenderFooterTemplate<C extends string> = import('ojs/ojvcomponent').TemplateSlot<FooterTemplateContext<C>>;
    type RenderNoDataTemplate = import('ojs/ojvcomponent').TemplateSlot<NoDataContext>;
    type RenderTemplate<K extends string | number, D, C extends string> = import('ojs/ojvcomponent').TemplateSlot<CellTemplateContext<K, D, C>>;
}
export interface CTableElementEventMap<K extends string | number, D, C extends string> extends HTMLElementEventMap {
    'ojRowAction': CTableElement.ojRowAction<K, D>;
    'columnOrderChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['columnOrder']>;
    'columnWidthsChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['columnWidths']>;
    'columnsChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['columns']>;
    'currentCellChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['currentCell']>;
    'currentCellOverrideChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['currentCellOverride']>;
    'dataChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['data']>;
    'horizontalGridVisibleChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['horizontalGridVisible']>;
    'layoutChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['layout']>;
    'rowChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['row']>;
    'scrollPolicyOptionsChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['scrollPolicyOptions']>;
    'selectAllControlChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['selectAllControl']>;
    'selectedChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['selected']>;
    'selectionModeChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['selectionMode']>;
    'verticalGridVisibleChanged': JetElementCustomEventStrict<CTableElement<K, D, C>['verticalGridVisible']>;
}
export interface CTableElementSettableProperties<K extends string | number, D, C extends string> extends JetSettableProperties {
    columnOrder?: TableProps<K, D, C>['columnOrder'];
    columnWidths?: TableProps<K, D, C>['columnWidths'];
    columns?: TableProps<K, D, C>['columns'];
    currentCellOverride?: TableProps<K, D, C>['currentCellOverride'];
    data?: TableProps<K, D, C>['data'];
    horizontalGridVisible?: TableProps<K, D, C>['horizontalGridVisible'];
    layout?: TableProps<K, D, C>['layout'];
    row?: TableProps<K, D, C>['row'];
    scrollPolicyOptions?: TableProps<K, D, C>['scrollPolicyOptions'];
    selectAllControl?: TableProps<K, D, C>['selectAllControl'];
    selected?: TableProps<K, D, C>['selected'];
    selectionMode?: TableProps<K, D, C>['selectionMode'];
    verticalGridVisible?: TableProps<K, D, C>['verticalGridVisible'];
}
export interface CTableElementSettablePropertiesLenient<K extends string | number, D, C extends string> extends Partial<CTableElementSettableProperties<K, D, C>> {
    [key: string]: any;
}
export interface TableIntrinsicProps extends Partial<Readonly<CTableElementSettableProperties<any, any, any>>>, GlobalProps, Pick<preact.JSX.HTMLAttributes, 'ref' | 'key'> {
    currentCell?: never;
    children?: import('preact').ComponentChildren;
    onojRowAction?: (value: CTableElementEventMap<any, any, any>['ojRowAction']) => void;
    oncolumnOrderChanged?: (value: CTableElementEventMap<any, any, any>['columnOrderChanged']) => void;
    oncolumnWidthsChanged?: (value: CTableElementEventMap<any, any, any>['columnWidthsChanged']) => void;
    oncolumnsChanged?: (value: CTableElementEventMap<any, any, any>['columnsChanged']) => void;
    oncurrentCellChanged?: (value: CTableElementEventMap<any, any, any>['currentCellChanged']) => void;
    oncurrentCellOverrideChanged?: (value: CTableElementEventMap<any, any, any>['currentCellOverrideChanged']) => void;
    ondataChanged?: (value: CTableElementEventMap<any, any, any>['dataChanged']) => void;
    onhorizontalGridVisibleChanged?: (value: CTableElementEventMap<any, any, any>['horizontalGridVisibleChanged']) => void;
    onlayoutChanged?: (value: CTableElementEventMap<any, any, any>['layoutChanged']) => void;
    onrowChanged?: (value: CTableElementEventMap<any, any, any>['rowChanged']) => void;
    onscrollPolicyOptionsChanged?: (value: CTableElementEventMap<any, any, any>['scrollPolicyOptionsChanged']) => void;
    onselectAllControlChanged?: (value: CTableElementEventMap<any, any, any>['selectAllControlChanged']) => void;
    onselectedChanged?: (value: CTableElementEventMap<any, any, any>['selectedChanged']) => void;
    onselectionModeChanged?: (value: CTableElementEventMap<any, any, any>['selectionModeChanged']) => void;
    onverticalGridVisibleChanged?: (value: CTableElementEventMap<any, any, any>['verticalGridVisibleChanged']) => void;
}
declare global {
    namespace preact.JSX {
        interface IntrinsicElements {
            'oj-c-table': TableIntrinsicProps;
        }
    }
}
