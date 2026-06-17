import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgauge';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";

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

export const DataGridTemplateGrid = () => {
    const rows = useMemo<CustomerRow[]>(() => jsonData, []);
    const maxAmountOrdered = useMemo(() => rows.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue.totalAmountOrdered), -Infinity), [rows]);
    const minAmountOrdered = useMemo(() => rows.reduce((previousValue, currentValue) => Math.min(previousValue, currentValue.totalAmountOrdered), Infinity), [rows]);
    const thresholdValues = useMemo(() => [{ max: 20000 }, { max: 30000 }, {}], []);
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
    const dateConverter = useMemo(() => new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'medium'
    }), []);
    const numberConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
    }), []);
    const numberConverterShort = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        currencyFormat: 'short'
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
    const renderValue = (column: CustomerColumnKey, value: CustomerCellValue) => {
        if (column === 'firstName' || column === 'lastName') {
            return <span class="oj-typography-body-lg oj-typography-bold">{value}</span>;
        }
        if (column === 'balance') {
            return <span class={(value as number) > 0 ? 'oj-bg-success-30' : 'oj-bg-danger-30'}>{numberConverter.format(value as number)}</span>;
        }
        if (column === 'totalAmountOrdered') {
            return (
                <>
                    <oj-status-meter-gauge min={minAmountOrdered} max={maxAmountOrdered} value={value as number} thresholds={thresholdValues} class="demo-gauge" readonly={true} aria-label="Total amount ordered represented as a status meter" />
                    <div>{numberConverterShort.format(value as number)}</div>
                </>
            );
        }
        if (DATE_COLUMNS.has(column)) {
            return <span>{dateConverter.format(value as string)}</span>;
        }
        if (column === 'company') {
            return <a href={`https://www.morningstar.com/search?query=${value}`} target="_blank">{value}</a>;
        }
        if (column === 'age') {
            return <span class="oj-badge oj-badge-info">{value}</span>;
        }
        if (column === 'isActive') {
            return value
                ? <span class="oj-icon-color-success oj-ux-ico-success-s oj-ux-icon-size-9x" role="img" aria-label="success" />
                : <span class="oj-icon-color-danger oj-ux-ico-error-s oj-ux-icon-size-9x" role="img" aria-label="error" />;
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
                style: 'width:120px;',
                sortable: 'disable'
            }
        }
    };
    return (
        <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid with templates demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
            <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
            <template slot="cellTemplate" render={cellTemplateRenderer} />
        </oj-data-grid>
    );
};

export default DataGridTemplateGrid;
