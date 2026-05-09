import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojmenu';
import { ojMenu, ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojoption';
import "css!./demo.css";
type CustomerRecord = {
    index: number;
    firstName: string;
    balance: number;
    registered: string;
    company: string;
    isActive: boolean;
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRecord[];
interface CustomerRow {
    id: number;
    firstName: string;
    balance: number;
    registered: string;
    company: string;
    isActive: boolean;
}
interface ColumnDefinition {
    key: keyof Omit<CustomerRow, 'id'>;
    label: string;
    width: string;
}
type DataGridCellTemplateContext = {
    item: {
        columnIndex: number;
        data: {
            data: CustomerRow[ColumnDefinition['key']];
        };
    };
};
type DataGridHeaderTemplateContext = {
    item: {
        data: {
            data: string;
        };
    };
};
type DataGridContext = {
    indexes?: {
        row: number;
        column: number;
    };
    index?: number;
    axis?: string;
};
const COLUMNS: ColumnDefinition[] = [
    { key: 'firstName', label: 'First Name', width: '160px' },
    { key: 'balance', label: 'Balance', width: '140px' },
    { key: 'registered', label: 'Registered', width: '150px' },
    { key: 'company', label: 'Company', width: '180px' },
    { key: 'isActive', label: 'Active', width: '110px' }
];
export const DataGridCustomContextMenuGrid = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
    const [launchedFromCell, setLaunchedFromCell] = useState<string>('None launched yet');
    const rows = useMemo<CustomerRow[]>(() => jsonData.slice(0, 8).map((item) => ({
        id: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        company: item.company,
        isActive: item.isActive
    })), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRow>(rows, {
        keyAttributes: 'id'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, CustomerRow>(rowDataProvider, {
        columns: {
            rowHeader: ['id'],
            databody: COLUMNS.map((column) => column.key)
        },
        columnHeaders: {
            column: COLUMNS.map((column) => ({ data: column.label }))
        },
        headerLabels: {
            row: ['Customer']
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
    const formatCellValue = (columnKey: ColumnDefinition['key'], value: CustomerRow[ColumnDefinition['key']]) => {
        if (columnKey === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (columnKey === 'registered') {
            return dateConverter.format(value as string) ?? '';
        }
        if (columnKey === 'isActive') {
            return value ? 'true' : 'false';
        }
        return String(value ?? '');
    };
    const getColumnHeaderStyle = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return `width:${COLUMNS[headerContext.index]?.width ?? '140px'};`;
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return headerContext.index === 1 ? 'right' : 'start';
    };
    const getCellHorizontalAlignment = (cellContext: ojDataGrid.CellContext<number, string | number>) => {
        return cellContext.indexes.column === 1 ? 'right' : 'start';
    };
    const myActionFunction = (event: ojMenuEventMap['ojMenuAction']) => {
        setSelectedMenuItem(String(event.detail.selectedValue));
    };
    const myBeforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
        const target = event.detail.originalEvent.target as Element;
        const datagrid = document.getElementById('datagrid') as ojDataGrid<string, number> | null;
        const context = datagrid?.getContextByNode(target) as DataGridContext | null;
        if (!context) {
            setLaunchedFromCell('Unknown origin');
            return;
        }
        if (context.indexes) {
            setLaunchedFromCell(`cell index ${context.indexes.row},${context.indexes.column}`);
            return;
        }
        if (context.index != null) {
            setLaunchedFromCell(`${context.axis} header index ${context.index}`);
            return;
        }
        setLaunchedFromCell('Unknown origin');
    };
    const columnHeaderContentTemplateRenderer = (header: DataGridHeaderTemplateContext) => {
        return header.item.data.data;
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        return <span>{formatCellValue(column.key, cell.item.data.data)}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { cell: {
            alignment: {
                horizontal: getCellHorizontalAlignment
            }
        }, header: {
            column: {
                alignment: {
                    horizontal: getColumnHeaderHorizontalAlignment
                },
                style: getColumnHeaderStyle,
                resizable: {
                    width: 'enable',
                    height: 'enable'
                }
            },
            row: {
                style: 'width:110px;',
                resizable: {
                    width: 'enable',
                    height: 'enable'
                }
            }
        } };
    return (<div id="datagridwrapper">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid custom context menu demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
                    <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer}/>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                    <oj-menu slot="contextMenu" onojMenuAction={myActionFunction} onojBeforeOpen={myBeforeOpenFunction} aria-label="Grid context menu">
                              <oj-option id="myFirstItem" value="Inspect Cell">Inspect Cell</oj-option>
                              <oj-option id="myOtherItem" value="Inspect Header">Inspect Header</oj-option>
                              <oj-option id="resizeWidth" value="Resize Width" data-oj-command="oj-datagrid-resizeWidth"/>
                              <oj-option id="resizeHeight" value="Resize Height" data-oj-command="oj-datagrid-resizeHeight"/>
                          </oj-menu>
                </oj-data-grid>
            <div class="oj-sm-margin-5x-bottom">
                    <p class="bold">Last selected menu item: <span id="results">{selectedMenuItem}</span></p>
                    <p class="bold">Launched from: <span id="results1">{launchedFromCell}</span></p>
                </div>
        </div>);
};
export default DataGridCustomContextMenuGrid;
