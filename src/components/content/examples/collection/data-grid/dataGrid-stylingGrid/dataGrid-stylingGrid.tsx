import "css!./demo.css";
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

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

type CellTemplateContext = {
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

export default function DataGridStylingGrid() {
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
    const columnHeaderContentTemplateRenderer = (header: ColumnHeaderTemplateContext) => {
        return formatColumnName(header.item.data.data);
    };
    const renderTotalAmount = (value: number) => {
        if (value > 30000) {
            return <span aria-label="exceeds expectations">{numberConverter.format(value)}</span>;
        }
        if (value > 20000) {
            return <span aria-label="meets expectations">{numberConverter.format(value)}</span>;
        }
        return <span class="demo-data-grid-strike-through" aria-label="below expectations">{numberConverter.format(value)}</span>;
    };
    const renderValue = (column: CustomerColumnKey, value: CustomerCellValue) => {
        if (column === 'balance') {
            return (value as number) > 0
                ? <span class="oj-text-color-success">{numberConverter.format(value as number)}</span>
                : <span>{numberConverter.format(value as number)}</span>;
        }
        if (column === 'totalAmountOrdered') {
            return renderTotalAmount(value as number);
        }
        if (DATE_COLUMNS.has(column)) {
            return <span class="oj-typography-body-xs">{dateConverter.format(value as string)}</span>;
        }
        if (column === 'company') {
            return (
                <span class="demo-data-grid-font-italic">
                    <a href={`https://www.morningstar.com/search?query=${value}`} target="_blank">{value}</a>
                </span>
            );
        }
        if (column === 'isActive') {
            return value
                ? <span class="oj-ux-ico-success-s oj-ux-icon-size-9x" role="img" aria-label="success" />
                : <span class="oj-ux-ico-error-s oj-ux-icon-size-9x" role="img" aria-label="error" />;
        }
        if (column === 'eyeColor' || column === 'hairColor') {
            return <span class="oj-typography-body-xl demo-data-grid-underline">{value}</span>;
        }
        return <span>{String(value ?? '')}</span>;
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return renderValue(column, cell.item.data.data);
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        header: {
            column: {
                alignment: {
                    horizontal: getColumnHeaderHorizontalAlignment
                },
                style: getColumnHeaderStyle,
                sortable: 'disable'
            },
            row: {
                style: 'width:120px;',
                sortable: 'disable'
            }
        },
        cell: {
            alignment: {
                horizontal: getCellHorizontalAlignment
            }
        }
    };
    return (
        <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid styling demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
            <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
            <template slot="cellTemplate" render={cellTemplateRenderer} />
        </oj-data-grid>
    );
};
