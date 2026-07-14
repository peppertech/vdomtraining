import "css!./demo.css";
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojmenu';
import { ojMenu,ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojoption';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type CustomerRecord = {
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
};
const jsonData = JSON.parse(jsonDataText as string) as CustomerRecord[];
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
type DataGridCellTemplateContext = {
    item: {
        columnIndex: number;
            data: {
            data: CustomerCellValue;
        };
    };
};
type DataGridHeaderTemplateContext = {
    item: {
        data: {
            data: CustomerColumnKey;
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
const COLUMNS = Object.keys(jsonData[0]).filter((key): key is CustomerColumnKey => key !== 'index');
const DATE_COLUMNS = new Set<CustomerColumnKey>(['registered', 'lastOrder', 'birthdate']);
const CURRENCY_COLUMNS = new Set<CustomerColumnKey>(['balance', 'totalAmountOrdered']);
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

export const DataGridCustomContextMenuGrid = () => {
    const dataGridRef = useRef<ojDataGrid<CustomerCellValue, number> | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
    const [launchedFromCell, setLaunchedFromCell] = useState<string>('None launched yet');
    const rows = useMemo<CustomerRow[]>(() => jsonData.map((item) => ({ ...item })), []);
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
    const formatCellValue = (columnKey: CustomerColumnKey, value: CustomerCellValue) => {
        if (CURRENCY_COLUMNS.has(columnKey)) {
            return numberConverter.format(value as number) ?? '';
        }
        if (DATE_COLUMNS.has(columnKey)) {
            return dateConverter.format(value as string) ?? '';
        }
        if (columnKey === 'isActive') {
            return value ? 'true' : 'false';
        }
        return String(value ?? '');
    };
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
    const myActionFunction = (event: ojMenuEventMap['ojMenuAction']) => {
        setSelectedMenuItem(String(event.detail.selectedValue));
    };
    const myBeforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
        const target = event.detail.originalEvent.target as Element;
        const datagrid = dataGridRef.current;
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
        return formatColumnName(header.item.data.data);
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        return <span>{formatCellValue(column, cell.item.data.data)}</span>;
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
            <oj-data-grid ref={dataGridRef} id="datagrid" class="demo-data-grid" aria-label="Data Grid custom context menu demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
                    <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer}/>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                    <oj-menu slot="contextMenu" onojMenuAction={myActionFunction} onojBeforeOpen={myBeforeOpenFunction} aria-label="Employee Edit">
                              <oj-option id="myFirstItem" value="My First Item">My First Item</oj-option>
                              <oj-option id="myOtherItem" value="My Other Item">My Other Item</oj-option>
                              <oj-option id="resizeWidth" value="Resize Width" data-oj-command="oj-datagrid-resizeWidth"/>
                              <oj-option id="resizeHeight" value="Resize Height" data-oj-command="oj-datagrid-resizeHeight"/>
                          </oj-menu>
                </oj-data-grid>
            <div class="oj-sm-margin-5x-bottom">
                    <p class="bold">Last selected menu item: <span id="results">{selectedMenuItem}</span></p>
                    <p class="bold">Launched from cell: <span id="results1">{launchedFromCell}</span></p>
                </div>
        </div>);
};
export default DataGridCustomContextMenuGrid;
