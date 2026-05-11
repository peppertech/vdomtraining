import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import type { JetElementCustomEvent } from 'ojs/index';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojdatagrid';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojformlayout';
import 'ojs/ojselectsingle';
import 'ojs/ojtable';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";
type SelectValue = 'cell_multiple' | 'cell_single' | 'row_multiple' | 'row_single';
type TableColumns = ComponentProps<'oj-table'>['columns'];
type SelectSingleValue = ComponentProps<'oj-select-single'>['value'];
interface CustomerRow {
    index: number;
    firstName: string;
    balance: number;
    registered: string;
    company: string;
}
interface SelectionRecord {
    rowStartIndex: number;
    columnStartIndex: number;
    rowEndIndex: number;
    columnEndIndex: number;
}
interface SelectedRangeRow extends SelectionRecord {
    id: number;
}
type DataGridSelectionRange = {
    startIndex: {
        row: number;
        column: number;
    };
    endIndex: {
        row: number;
        column: number;
    };
};
type SelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onselectionChanged']>>[0];
type DataGridCellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: string | number;
        };
    };
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRow[];
const COLUMNS: Array<keyof Omit<CustomerRow, 'index'>> = ['firstName', 'balance', 'registered', 'company'];
export const DataGridSelectionBasedGrid = () => {
    const [selectValue, setSelectValue] = useState<SelectValue>('cell_multiple');
    const [selectedRows, setSelectedRows] = useState<SelectionRecord[]>([]);
    const rows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 12).map((item) => ({
        index: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        company: item.company
    })), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(rows, {
        keyAttributes: 'index'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['index'],
            databody: COLUMNS
        },
        columnHeaders: {
            column: ['First Name', 'Balance', 'Registered', 'Company']
        },
        headerLabels: {
            row: ['Row']
        }
    }), [rowDataProvider]);
    const selectionMode = useMemo(() => {
        const [key, value] = selectValue.split('_');
        return { [key]: value };
    }, [selectValue]);
    const groupData = useMemo(() => [
        { value: 'cell_multiple', label: 'Multiple Cells' },
        { value: 'cell_single', label: 'Single Cell' },
        { value: 'row_multiple', label: 'Multiple Rows' },
        { value: 'row_single', label: 'Single Row' }
    ], []);
    const groupDataProvider = useMemo(() => new ArrayDataProvider<string, {
        value: string;
        label: string;
    }>(groupData, {
        keyAttributes: 'value'
    }), [groupData]);
    const tableRows = useMemo<SelectedRangeRow[]>(() => selectedRows.map((row, index) => ({
        ...row,
        id: index
    })), [selectedRows]);
    const tableDataProvider = useMemo(() => new ArrayDataProvider<number, SelectedRangeRow>(tableRows, {
        keyAttributes: 'id'
    }), [tableRows]);
    const dateConverter = useMemo(() => new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'medium'
    }), []);
    const numberConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
    }), []);
    const columnForTable = useMemo<TableColumns>(() => [
        { headerText: 'Row Start Index', field: 'rowStartIndex', resizable: 'enabled' },
        { headerText: 'Column Start Index', field: 'columnStartIndex', resizable: 'enabled' },
        { headerText: 'Row End Index', field: 'rowEndIndex', resizable: 'enabled' },
        { headerText: 'Column End Index', field: 'columnEndIndex', resizable: 'enabled' }
    ], []);
    const formatValue = (column: keyof Omit<CustomerRow, 'index'>, value: CustomerRow[keyof Omit<CustomerRow, 'index'>]) => {
        if (column === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (column === 'registered') {
            return dateConverter.format(value as string) ?? '';
        }
        return String(value ?? '');
    };
    const selectionChangedListener = (event: SelectionChangedEvent) => {
        const nextSelection = ((event.detail.value ?? []) as DataGridSelectionRange[]).map((selection) => ({
            rowStartIndex: selection.startIndex.row >= 0 ? selection.startIndex.row : -1,
            rowEndIndex: selection.endIndex.row >= 0 ? selection.endIndex.row : -1,
            columnStartIndex: selection.startIndex.column >= 0 ? selection.startIndex.column : -1,
            columnEndIndex: selection.endIndex.column >= 0 ? selection.endIndex.column : -1
        }));
        setSelectedRows(nextSelection);
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        return <span>{formatValue(column, cell.item.data.data)}</span>;
    };
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { columnsDefault: {
            sortable: 'disabled'
        } };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { cell: {
            alignment: {
                horizontal: 'start'
            }
        }, header: {
            column: {
                style: 'width:170px;',
                sortable: 'disable'
            },
            row: {
                sortable: 'disable',
                style: 'width:90px;'
            }
        } };
    return (<div id="containerDiv">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout labelEdge="top" maxColumns={2} direction="row" userAssistanceDensity="compact">
                              <oj-select-single labelHint="Selection Mode" id="grpdata" onvalueChanged={(event: JetElementCustomEvent<SelectSingleValue>) => setSelectValue((event.detail.value ?? 'cell_multiple') as SelectValue)} value={selectValue} class="demo-data-grid-select-single" data={groupDataProvider} required={true}/>
                              <div>
                                          <label for="selectedInfo">Current Selection:</label>
                                          <oj-table id="table" aria-label="Selected ranges table" data={tableDataProvider} columns={columnForTable} scrollPolicy="loadAll" class="demo-data-grid-table" {...ojTableProps}/>
                                      </div>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid selection based demo" data={dataGridProvider} selectionMode={selectionMode} onselectionChanged={selectionChangedListener} scrollPolicy="loadMoreOnScroll" {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridSelectionBasedGrid;
