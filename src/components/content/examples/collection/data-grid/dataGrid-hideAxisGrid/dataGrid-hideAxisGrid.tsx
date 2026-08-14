import "css!./demo.css";
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojselectcombobox';
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
type SelectManyValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-select-many'>['onvalueChanged']>>[0];
type HiddenColumnsChangedEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onhiddenColumnsChanged']>>[0];
type HiddenRowsChangedEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onhiddenRowsChanged']>>[0];

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
const BASE_COLUMNS = Object.keys(jsonData[0])
    .filter((key): key is CustomerColumnKey => key !== 'index')
    .slice(0, 12);
const DATE_COLUMNS = new Set<CustomerColumnKey>(['registered', 'lastOrder', 'birthdate']);

const formatColumnName = (column: CustomerColumnKey) => {
    return column.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase());
};

const toNumberSet = (values: Iterable<number | string>) => new Set(Array.from(values, Number));
const areNumberSetsEqual = (left: Set<number>, right: Set<number>) => {
    if (left.size !== right.size) {
        return false;
    }
    return Array.from(left).every((value) => right.has(value));
};
const setNumberSetIfChanged = (
    setter: (updater: (current: Set<number>) => Set<number>) => void,
    nextValues: Iterable<number | string>
) => {
    const nextSet = toNumberSet(nextValues);
    setter((currentSet) => areNumberSetsEqual(currentSet, nextSet) ? currentSet : nextSet);
};

export default function DataGridHideAxisGrid() {
    const [hiddenColumnValues, setHiddenColumnValues] = useState<Set<number>>(() => new Set([0, 5]));
    const [hiddenRowValues, setHiddenRowValues] = useState<Set<number>>(() => new Set([0, 7]));
    const baseRows = useMemo<CustomerRow[]>(() => jsonData, []);
    const selectedHiddenColumns = useMemo(() => Array.from(hiddenColumnValues), [hiddenColumnValues]);
    const selectedHiddenRows = useMemo(() => Array.from(hiddenRowValues), [hiddenRowValues]);
    const columnOptions = useMemo(() => BASE_COLUMNS.map((column, index) => ({
        value: index,
        label: `${index} - ${formatColumnName(column)}`
    })), []);
    const rowOptions = useMemo(() => Array.from({ length: Object.keys(baseRows[0] ?? {}).length }, (_row, index) => ({
        value: index,
        label: String(index)
    })), [baseRows]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(baseRows, {
        keyAttributes: 'index'
    }), [baseRows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<CustomerCellValue, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['index'],
            databody: BASE_COLUMNS
        },
        columnHeaders: {
            column: BASE_COLUMNS.slice()
        }
    }), [rowDataProvider]);
    const columnOptionsProvider = useMemo(() => new ArrayDataProvider<number, {
        value: number;
        label: string;
    }>(columnOptions, {
        keyAttributes: 'value'
    }), [columnOptions]);
    const rowOptionsProvider = useMemo(() => new ArrayDataProvider<number, {
        value: number;
        label: string;
    }>(rowOptions, {
        keyAttributes: 'value'
    }), [rowOptions]);
    const numericIndexes = useMemo(() => {
        const firstRowValues = BASE_COLUMNS.map((column) => baseRows[0]?.[column]) as CustomerCellValue[];
        return firstRowValues.reduce<number[]>((numeric, data, index) => {
            const numberValue = Number(data);
            if (!Number.isNaN(numberValue) || !Number.isNaN(Date.parse(String(data)))) {
                numeric.push(index);
            }
            return numeric;
        }, []);
    }, [baseRows]);
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
        return numericIndexes.includes(columnIndex);
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
    const handleHiddenRowChange = (event: SelectManyValueChangedEvent) => {
        setNumberSetIfChanged(setHiddenRowValues, (event.detail.value ?? []) as Array<number | string>);
    };
    const handleHiddenColumnChange = (event: SelectManyValueChangedEvent) => {
        setNumberSetIfChanged(setHiddenColumnValues, (event.detail.value ?? []) as Array<number | string>);
    };
    const handleGridHiddenRowsChanged = (event: HiddenRowsChangedEvent) => {
        setNumberSetIfChanged(setHiddenRowValues, event.detail.value.values());
    };
    const handleGridHiddenColumnsChanged = (event: HiddenColumnsChangedEvent) => {
        setNumberSetIfChanged(setHiddenColumnValues, event.detail.value.values());
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: ojDataGrid.HeaderContext<number, CustomerCellValue>) => {
        return isRightAlignedColumn(headerContext.index) ? 'right' : 'start';
    };
    const getCellHorizontalAlignment = (cellContext: ojDataGrid.CellContext<number, CustomerCellValue>) => {
        return isRightAlignedColumn(cellContext.indexes.column) ? 'right' : 'start';
    };
    const columnHeaderContentTemplateRenderer = (header: ColumnHeaderTemplateContext) => {
        return <span>{formatColumnName(header.item.data.data)}</span>;
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = BASE_COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return <span>{formatValue(column, cell.item.data.data)}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        hiddenColumns: hiddenColumnValues,
        hiddenRows: hiddenRowValues,
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
                hidable: 'enable',
                style: 'width:185px;',
                sortable: 'disable'
            },
            row: {
                hidable: 'enable',
                style: 'width:90px;',
                sortable: 'disable'
            }
        },
        selectionMode: {
            cell: 'multiple'
        }
    };
    return (
        <div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                <h2 class="oj-typography-subheading-sm">Datagrid Hidden Indices:</h2>
                <oj-form-layout labelEdge="inside" maxColumns={2} direction="row" userAssistanceDensity="compact">
                    <oj-select-many id="hiddenRowSelection" value={selectedHiddenRows} onvalueChanged={handleHiddenRowChange} labelEdge="inside" labelHint="Select indices to hide rows" options={rowOptionsProvider} class="oj-form-control-max-width-md" />
                    <oj-select-many id="hiddenColumnSelection" value={selectedHiddenColumns} onvalueChanged={handleHiddenColumnChange} labelEdge="inside" labelHint="Select indices to hide columns" options={columnOptionsProvider} class="oj-form-control-max-width-md" />
                </oj-form-layout>
            </div>
            <oj-data-grid
                id="datagrid"
                class="demo-data-grid"
                aria-label="Data Grid hide columns demo"
                data={dataGridProvider}
                scrollPolicy="scroll"
                onhiddenRowsChanged={handleGridHiddenRowsChanged}
                onhiddenColumnsChanged={handleGridHiddenColumnsChanged}
                {...ojDataGridProps}
            >
                <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
                <template slot="cellTemplate" render={cellTemplateRenderer} />
            </oj-data-grid>
        </div>
    );
};
