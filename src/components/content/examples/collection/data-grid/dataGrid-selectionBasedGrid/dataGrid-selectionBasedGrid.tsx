import "css!./demo.css";
import type { JetElementCustomEvent } from 'ojs/index';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojselectsingle';
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type SelectValue = 'cell_multiple' | 'cell_single' | 'row_multiple' | 'row_single';
type TableColumns = ComponentProps<'oj-table'>['columns'];
type SelectSingleValue = ComponentProps<'oj-select-single'>['value'];

interface CustomerRow {
    index: number;
    firstName: string;
    lastName: string;
    balance: number;
    registered: string;
    totalAmountOrdered: number;
    lastOrder: string;
    company: string;
    shortName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    countryOrigin: string;
    gender: string;
    age: number;
    birthdate: string;
    isActive: boolean;
    height: number;
    weight: number;
    eyeColor: string;
    hairColor: string;
    latitude: number;
    longitude: number;
}

type CustomerColumnKey = keyof Omit<CustomerRow, 'index'>;
type CustomerCellValue = CustomerRow[CustomerColumnKey];

interface SelectionRecord {
    rowStartIndex: number;
    columnStartIndex: number;
    rowEndIndex: number;
    columnEndIndex: number;
}

interface SelectedRangeRow extends SelectionRecord {
    id: number;
}

interface SelectionModeOption {
    value: string;
    label: string;
    children?: SelectionModeOption[];
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
            data: CustomerCellValue;
        };
    };
};
type ColumnHeaderTemplateContext = {
    item: {
        data: {
            data: CustomerColumnKey;
        };
    };
};

const jsonData = JSON.parse(jsonDataText as string) as CustomerRow[];
const COLUMNS = Object.keys(jsonData[0]).filter((key): key is CustomerColumnKey => key !== 'index');
const DATE_COLUMNS = new Set<CustomerColumnKey>(['registered', 'lastOrder', 'birthdate']);
const WIDE_COLUMN_WIDTHS: Partial<Record<CustomerColumnKey, string>> = {
    phone: '175px',
    registered: '150px',
    lastOrder: '150px',
    birthdate: '150px',
    totalAmountOrdered: '185px',
    address: '250px',
    state: '250px',
    countryOrigin: '250px'
};

const formatColumnName = (column: CustomerColumnKey) => {
    return column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

export default function DataGridSelectionBasedGrid() {
    const [selectValue, setSelectValue] = useState<SelectValue>('cell_multiple');
    const [selectedRows, setSelectedRows] = useState<SelectionRecord[]>([]);
    const rows = useMemo<CustomerRow[]>(() => jsonData, []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(rows, {
        keyAttributes: 'index'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<CustomerCellValue, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['index'],
            databody: COLUMNS
        },
        columnHeaders: {
            column: COLUMNS.slice()
        }
    }), [rowDataProvider]);
    const selectionMode = useMemo(() => {
        const [key, value] = selectValue.split('_');
        return { [key]: value };
    }, [selectValue]);
    const groupData = useMemo<SelectionModeOption[]>(() => [
        {
            value: 'cell',
            label: 'Cell',
            children: [
                { value: 'cell_multiple', label: 'Multiple Cells' },
                { value: 'cell_single', label: 'Single Cell' }
            ]
        },
        {
            value: 'row',
            label: 'Row',
            children: [
                { value: 'row_multiple', label: 'Multiple Rows' },
                { value: 'row_single', label: 'Single Row' }
            ]
        }
    ], []);
    const groupDataProvider = useMemo(() => new ArrayTreeDataProvider<string, SelectionModeOption>(groupData, {
        keyAttributes: 'value'
    }), [groupData]);
    const tableRows = useMemo<SelectedRangeRow[]>(() => selectedRows.map((row, index) => ({
        ...row,
        id: index
    })), [selectedRows]);
    const tableDataProvider = useMemo(() => new ArrayDataProvider<number, SelectedRangeRow>(tableRows, {
        keyAttributes: 'id'
    }), [tableRows]);
    const numericIndexes = useMemo(() => {
        const firstRowValues = Object.values(rows[0]).slice(1) as CustomerCellValue[];
        return firstRowValues.reduce<number[]>((numeric, data, index) => {
            const numberValue = Number(data);
            if (!Number.isNaN(numberValue) || !Number.isNaN(Date.parse(String(data)))) {
                numeric.push(index);
            }
            return numeric;
        }, []);
    }, [rows]);
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
    const isRightAlignedColumn = (columnIndex: number) => {
        return numericIndexes.includes(columnIndex) || columnIndex === 15;
    };
    const getColumnHeaderStyle = (headerContext: ojDataGrid.HeaderContext<number, CustomerCellValue>) => {
        const column = COLUMNS[headerContext.index];
        return `width:${column ? WIDE_COLUMN_WIDTHS[column] ?? '125px' : '125px'};`;
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: ojDataGrid.HeaderContext<number, CustomerCellValue>) => {
        return isRightAlignedColumn(headerContext.index) ? 'right' : 'start';
    };
    const getCellHorizontalAlignment = (cellContext: ojDataGrid.CellContext<number, CustomerCellValue>) => {
        return isRightAlignedColumn(cellContext.indexes.column) ? 'right' : 'start';
    };
    const formatValue = (column: CustomerColumnKey, value: CustomerCellValue) => {
        if (column === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (DATE_COLUMNS.has(column)) {
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
    const columnHeaderContentTemplateRenderer = (header: ColumnHeaderTemplateContext) => {
        return formatColumnName(header.item.data.data);
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return <span>{formatValue(column, cell.item.data.data)}</span>;
    };
    const handleSelectionModeChanged = (event: JetElementCustomEvent<SelectSingleValue>) => {
        setSelectValue((event.detail.value ?? 'cell_multiple') as SelectValue);
    };
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
        columnsDefault: {
            sortable: 'disabled'
        }
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        cell: {
            alignment: {
                horizontal: getCellHorizontalAlignment
            }
        },
        header: {
            column: {
                alignment: {
                    horizontal: getColumnHeaderHorizontalAlignment
                },
                style: getColumnHeaderStyle,
                sortable: 'disable'
            },
            row: {
                sortable: 'disable',
                style: 'width:120px;'
            }
        }
    };
    return (
        <div id="containerDiv">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                <oj-form-layout labelEdge="top" maxColumns={2} direction="row" userAssistanceDensity="compact">
                    <oj-select-single labelHint="Selection Mode" id="grpdata" onvalueChanged={handleSelectionModeChanged} value={selectValue} class="demo-data-grid-select-single" data={groupDataProvider} required={true} />
                    <div>
                        <label for="selectedInfo">Current Selection:</label>
                        <oj-table id="table" aria-label="Selected ranges table" data={tableDataProvider} columns={columnForTable} scrollPolicy="loadAll" class="demo-data-grid-table" {...ojTableProps} />
                    </div>
                </oj-form-layout>
            </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid selection based demo" data={dataGridProvider} selectionMode={selectionMode} onselectionChanged={selectionChangedListener} scrollPolicy="loadMoreOnScroll" {...ojDataGridProps}>
                <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
                <template slot="cellTemplate" render={cellTemplateRenderer} />
            </oj-data-grid>
        </div>
    );
};
