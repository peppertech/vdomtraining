import "css!./demo.css";
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
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
type CellResizeEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojCellResize']>>[0];

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

type ResizeEventDetail = {
    dimension: string;
    size: number;
    indices?: number[];
    level?: number;
    levels?: number[];
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
    return column.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase());
};

export default function DataGridResizing() {
    const [eventLog, setEventLog] = useState<string>('');
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
        const firstRowValues = COLUMNS.map((column) => rows[0]?.[column]) as CustomerCellValue[];
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
    const formatValue = (column: CustomerColumnKey, value: CustomerCellValue) => {
        if (column === 'balance' || column === 'totalAmountOrdered') {
            return numberConverter.format(value as number) ?? '';
        }
        if (DATE_COLUMNS.has(column)) {
            return dateConverter.format(value as string) ?? '';
        }
        return String(value ?? '');
    };
    const resizeListener = (event: CellResizeEvent) => {
        const detail = event.detail as ResizeEventDetail;
        const lines = [
            'Triggered ojCellResize event:',
            `Dimension: ${detail.dimension}`,
            `Size: ${detail.size}`
        ];
        if (detail.indices) {
            lines.push(`Indices: ${detail.indices.join(', ')}`);
        }
        if (detail.level != null) {
            lines.push(`Level: ${detail.level}`);
        }
        if (detail.levels) {
            lines.push(`Levels: ${detail.levels.join(', ')}`);
        }
        setEventLog((current) => `${lines.join('\n')}\n\n${current}`);
    };
    const columnHeaderContentTemplateRenderer = (header: ColumnHeaderTemplateContext) => {
        return formatColumnName(header.item.data.data);
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return <span>{formatValue(column, cell.item.data.data)}</span>;
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
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                sortable: 'disable'
            },
            row: {
                sortable: 'disable',
                resizable: {
                    width: 'enable',
                    height: 'enable'
                }
            }
        }
    };
    return (
        <div id="container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                <oj-form-layout>
                    <oj-text-area id="eventLog" value={eventLog} rows={10} readonly={true} labelHint="Event Log" />
                </oj-form-layout>
            </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid resizing demo" data={dataGridProvider} onojCellResize={resizeListener} {...ojDataGridProps}>
                <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
                <template slot="cellTemplate" render={cellTemplateRenderer} />
            </oj-data-grid>
        </div>
    );
};
