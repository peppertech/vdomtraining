import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import "css!./demo.css";
interface CustomerRow {
    index: number;
    firstName: string;
    balance: number;
    registered: string;
    lastOrder: string;
    company: string;
}
type CellResizeEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojCellResize']>>[0];
type CellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: CustomerRow[keyof Omit<CustomerRow, 'index'>];
        };
    };
};
type ResizeEventDetail = {
    dimension: string;
    size: number;
    indices?: number[];
    levels?: number[];
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRow[];
const COLUMNS: Array<keyof Omit<CustomerRow, 'index'>> = ['firstName', 'balance', 'registered', 'lastOrder', 'company'];
export const DataGridResizing = () => {
    const [eventLog, setEventLog] = useState<string>('');
    const rows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 12).map((item) => ({
        index: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        lastOrder: item.lastOrder,
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
            column: ['First Name', 'Balance', 'Registered', 'Last Order', 'Company']
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
    const formatValue = (column: keyof Omit<CustomerRow, 'index'>, value: CustomerRow[keyof Omit<CustomerRow, 'index'>]) => {
        if (column === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (column === 'registered' || column === 'lastOrder') {
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
        if (detail.levels) {
            lines.push(`Levels: ${detail.levels.join(', ')}`);
        }
        setEventLog((current) => `${lines.join('\n')}\n\n${current}`);
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
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
                style: 'width:170px;',
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
                },
                style: 'width:90px;'
            }
        } };
    return (<div id="container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout>
                              <oj-text-area id="eventLog" value={eventLog} rows={10} readonly={true} labelHint="Event Log"/>
                          </oj-form-layout>
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid resizing demo" data={dataGridProvider} onojCellResize={resizeListener} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridResizing;
