import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
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
    company: string;
    gender: string;
    birthdate: string;
    isActive: boolean;
}
type CellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: CustomerRow[keyof Omit<CustomerRow, 'index'>];
        };
    };
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRow[];
const COLUMNS: Array<keyof Omit<CustomerRow, 'index'>> = ['firstName', 'lastName', 'balance', 'registered', 'totalAmountOrdered', 'company', 'gender', 'birthdate', 'isActive'];
export const DataGridTemplateGrid = () => {
    const rows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 12).map((item) => ({
        index: item.index,
        firstName: item.firstName,
        lastName: item.lastName,
        balance: item.balance,
        registered: item.registered,
        totalAmountOrdered: item.totalAmountOrdered,
        company: item.company,
        gender: item.gender,
        birthdate: item.birthdate,
        isActive: item.isActive
    })), []);
    const maxAmountOrdered = useMemo(() => rows.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue.totalAmountOrdered), -Infinity), [rows]);
    const minAmountOrdered = useMemo(() => rows.reduce((previousValue, currentValue) => Math.min(previousValue, currentValue.totalAmountOrdered), Infinity), [rows]);
    const thresholdValues = useMemo(() => [{ max: 20000 }, { max: 30000 }, {}], []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(rows, {
        keyAttributes: 'index'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['index'],
            databody: COLUMNS
        },
        columnHeaders: {
            column: ['First Name', 'Last Name', 'Balance', 'Registered', 'Total Ordered', 'Company', 'Gender', 'Birthdate', 'Active']
        },
        headerLabels: {
            row: ['Row']
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
    const renderValue = (column: keyof Omit<CustomerRow, 'index'>, value: CustomerRow[keyof Omit<CustomerRow, 'index'>]) => {
        if (column === 'firstName' || column === 'lastName') {
            return <span class="oj-typography-body-lg oj-typography-bold">{value}</span>;
        }
        if (column === 'balance') {
            return <span class={(value as number) > 0 ? 'ojBgSuccess30' : 'oj-bg-danger-30'}>{numberConverter.format(value as number)}</span>;
        }
        if (column === 'totalAmountOrdered') {
            return (<>
                  <oj-status-meter-gauge min={minAmountOrdered} max={maxAmountOrdered} value={value as number} thresholds={thresholdValues} class="demo-gauge" readonly={true} aria-label="Total amount ordered represented as a status meter"/>
                  <div>{numberConverterShort.format(value as number)}</div>
              </>);
        }
        if (column === 'registered' || column === 'birthdate') {
            return <span>{dateConverter.format(value as string)}</span>;
        }
        if (column === 'company') {
            return <a href={`https://www.morningstar.com/search?query=${value}`} target="_blank">{value}</a>;
        }
        if (column === 'gender') {
            return <span class="oj-badge oj-badge-info">{value}</span>;
        }
        if (column === 'isActive') {
            return value ? <span class="oj-icon-color-success oj-ux-ico-success-s oj-ux-icon-size-9x" role="img" aria-label="success"/> : <span class="oj-icon-color-danger oj-ux-ico-error-s oj-ux-icon-size-9x" role="img" aria-label="error"/>;
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
        } };
    return (<oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid with templates demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
            <template slot="cellTemplate" render={cellTemplateRenderer}/>
        </oj-data-grid>);
};
export default DataGridTemplateGrid;
