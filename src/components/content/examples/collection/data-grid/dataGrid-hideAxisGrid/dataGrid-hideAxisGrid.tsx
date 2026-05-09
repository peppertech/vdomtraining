import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'ojs/ojselectcombobox';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import "css!./demo.css";
interface CustomerRow {
    index: number;
    firstName: string;
    balance: number;
    registered: string;
    lastOrder: string;
    company: string;
    age: number;
}
type SelectManyValue = NonNullable<ComponentProps<'oj-select-many'>['value']>;
type SelectManyValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-select-many'>['onvalueChanged']>>[0];
type CellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: CustomerRow[keyof Omit<CustomerRow, 'index'>];
        };
    };
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRow[];
const BASE_COLUMNS: Array<keyof Omit<CustomerRow, 'index'>> = ['firstName', 'balance', 'registered', 'lastOrder', 'company', 'age'];
export const DataGridHideAxisGrid = () => {
    const [hiddenColumnValues, setHiddenColumnValues] = useState<number[]>([1, 4]);
    const [hiddenRowValues, setHiddenRowValues] = useState<number[]>([0, 3]);
    const baseRows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 10).map((item) => ({
        index: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        lastOrder: item.lastOrder,
        company: item.company,
        age: item.age
    })), []);
    const visibleRows = useMemo(() => baseRows.filter((_row, index) => !hiddenRowValues.includes(index)), [baseRows, hiddenRowValues]);
    const visibleColumns = useMemo(() => BASE_COLUMNS.filter((_column, index) => !hiddenColumnValues.includes(index)), [hiddenColumnValues]);
    const hideOptions = useMemo(() => BASE_COLUMNS.map((_item, index) => ({
        value: index,
        label: String(index)
    })), []);
    const rowOptions = useMemo(() => baseRows.map((_item, index) => ({
        value: index,
        label: String(index)
    })), [baseRows]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(visibleRows, {
        keyAttributes: 'index'
    }), [visibleRows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['index'],
            databody: visibleColumns
        },
        columnHeaders: {
            column: visibleColumns.map((column) => column.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase()))
        },
        headerLabels: {
            row: ['Row']
        }
    }), [rowDataProvider, visibleColumns]);
    const columnOptionsProvider = useMemo(() => new ArrayDataProvider<number, {
        value: number;
        label: string;
    }>(hideOptions, {
        keyAttributes: 'value'
    }), [hideOptions]);
    const rowOptionsProvider = useMemo(() => new ArrayDataProvider<number, {
        value: number;
        label: string;
    }>(rowOptions, {
        keyAttributes: 'value'
    }), [rowOptions]);
    const dateConverter = useMemo(() => new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'medium'
    }), []);
    const numberConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
    }), []);
    const formatValue = (column: keyof Omit<CustomerRow, 'index'>, value: CustomerRow[keyof Omit<CustomerRow, 'index'>]) => {
        if (column === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (column === 'registered' || column === 'lastOrder') {
            return dateConverter.format(value as string) ?? '';
        }
        return String(value ?? '');
    };
    const handleHiddenRowChange = (event: SelectManyValueChangedEvent) => {
        setHiddenRowValues((event.detail.value ?? []) as SelectManyValue as number[]);
    };
    const handleHiddenColumnChange = (event: SelectManyValueChangedEvent) => {
        setHiddenColumnValues((event.detail.value ?? []) as SelectManyValue as number[]);
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = visibleColumns[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return <span>{formatValue(column, cell.item.data.data)}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { cell: {
            alignment: {
                horizontal: 'start'
            }
        }, header: {
            column: {
                style: 'width:185px;',
                sortable: 'disable'
            },
            row: {
                style: 'width:90px;',
                sortable: 'disable'
            }
        }, selectionMode: {
            cell: 'multiple'
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <h2 class="oj-typography-subheading-sm">Datagrid Hidden Indices:</h2>
                    <oj-form-layout labelEdge="inside" maxColumns={2} direction="row" userAssistanceDensity="compact">
                              <oj-select-many id="hiddenRowSelection" value={hiddenRowValues} onvalueChanged={handleHiddenRowChange} labelEdge="inside" labelHint="Hidden row indices" options={rowOptionsProvider} class="oj-form-control-max-width-md"/>
                              <oj-select-many id="hiddenColumnSelection" value={hiddenColumnValues} onvalueChanged={handleHiddenColumnChange} labelEdge="inside" labelHint="Hidden column indices" options={columnOptionsProvider} class="oj-form-control-max-width-md"/>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid hide axis demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridHideAxisGrid;
