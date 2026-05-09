import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";
interface CustomerRow {
    index: number;
    firstName: string;
    balance: number;
    registered: string;
    totalAmountOrdered: number;
    company: string;
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
const COLUMNS: Array<keyof Omit<CustomerRow, 'index'>> = ['firstName', 'balance', 'registered', 'totalAmountOrdered', 'company', 'isActive'];
export const DataGridStylingGrid = () => {
    const rows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 12).map((item) => ({
        index: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        totalAmountOrdered: item.totalAmountOrdered,
        company: item.company,
        isActive: item.isActive
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
            column: ['First Name', 'Balance', 'Registered', 'Total Ordered', 'Company', 'Active']
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
    const renderValue = (column: keyof Omit<CustomerRow, 'index'>, value: CustomerRow[keyof Omit<CustomerRow, 'index'>]) => {
        if (column === 'balance') {
            return <span class={(value as number) > 0 ? 'ojTextColorSuccess' : 'oj-text-color-danger'}>{numberConverter.format(value as number)}</span>;
        }
        if (column === 'totalAmountOrdered') {
            const numericValue = value as number;
            const cssClass = numericValue >= 30000 ? 'ojTextColorSuccess' : numericValue >= 20000 ? 'ojTextColorWarning' : 'demo-data-grid-strike-through';
            return <span class={cssClass}>{numberConverter.format(numericValue)}</span>;
        }
        if (column === 'registered') {
            return <span class="oj-typography-body-xs">{dateConverter.format(value as string)}</span>;
        }
        if (column === 'company') {
            return <span class="demo-data-grid-font-italic">{value}</span>;
        }
        if (column === 'isActive') {
            return value ? <span class="oj-ux-ico-success-s oj-ux-icon-size-9x" role="img" aria-label="success"/> : <span class="oj-ux-ico-error-s oj-ux-icon-size-9x" role="img" aria-label="error"/>;
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
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            column: {
                style: 'width:185px;',
                sortable: 'disable'
            },
            row: {
                style: 'width:90px;',
                sortable: 'disable'
            }
        }, cell: {
            alignment: {
                horizontal: 'start'
            }
        } };
    return (<oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid styling demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
            <template slot="cellTemplate" render={cellTemplateRenderer}/>
        </oj-data-grid>);
};
export default DataGridStylingGrid;
