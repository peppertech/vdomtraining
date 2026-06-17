import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
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
    id: number;
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
type CustomerColumnKey = keyof Omit<CustomerRow, 'id'>;
interface ColumnDefinition {
    key: CustomerColumnKey;
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
    { key: 'lastName', label: 'Last Name', width: '160px' },
    { key: 'balance', label: 'Balance', width: '140px' },
    { key: 'registered', label: 'Registered', width: '150px' },
    { key: 'totalAmountOrdered', label: 'Total Amount Ordered', width: '190px' },
    { key: 'lastOrder', label: 'Last Order', width: '150px' },
    { key: 'company', label: 'Company', width: '180px' },
    { key: 'shortName', label: 'Short Name', width: '140px' },
    { key: 'phone', label: 'Phone', width: '170px' },
    { key: 'address', label: 'Address', width: '210px' },
    { key: 'city', label: 'City', width: '150px' },
    { key: 'state', label: 'State', width: '140px' },
    { key: 'zip', label: 'Zip', width: '110px' },
    { key: 'countryOrigin', label: 'Country Origin', width: '190px' },
    { key: 'gender', label: 'Gender', width: '110px' },
    { key: 'age', label: 'Age', width: '90px' },
    { key: 'birthdate', label: 'Birthdate', width: '150px' },
    { key: 'isActive', label: 'Active', width: '110px' },
    { key: 'height', label: 'Height', width: '110px' },
    { key: 'weight', label: 'Weight', width: '110px' },
    { key: 'eyeColor', label: 'Eye Color', width: '130px' },
    { key: 'hairColor', label: 'Hair Color', width: '130px' },
    { key: 'latitude', label: 'Latitude', width: '130px' },
    { key: 'longitude', label: 'Longitude', width: '130px' }
];
const DATE_COLUMNS = new Set<CustomerColumnKey>(['registered', 'lastOrder', 'birthdate']);
const CURRENCY_COLUMNS = new Set<CustomerColumnKey>(['balance', 'totalAmountOrdered']);
const RIGHT_ALIGNED_COLUMNS = new Set<CustomerColumnKey>([
    'balance',
    'totalAmountOrdered',
    'zip',
    'age',
    'height',
    'weight',
    'latitude',
    'longitude'
]);
export const DataGridCustomContextMenuGrid = () => {
    const dataGridRef = useRef<ojDataGrid<string, number> | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('None selected yet');
    const [launchedFromCell, setLaunchedFromCell] = useState<string>('None launched yet');
    const rows = useMemo<CustomerRow[]>(
        () =>
            jsonData.slice(0, 8).map(({ index, ...item }) => ({
                id: index,
                ...item
            })),
        []
    );
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
    const formatCellValue = (columnKey: CustomerColumnKey, value: CustomerRow[CustomerColumnKey]) => {
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
        const columnKey = COLUMNS[columnIndex]?.key;
        return columnKey ? RIGHT_ALIGNED_COLUMNS.has(columnKey) : false;
    };
    const getColumnHeaderStyle = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return `width:${COLUMNS[headerContext.index]?.width ?? '140px'};`;
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return isRightAlignedColumn(headerContext.index) ? 'right' : 'start';
    };
    const getCellHorizontalAlignment = (cellContext: ojDataGrid.CellContext<number, string | number>) => {
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
            <oj-data-grid ref={dataGridRef} id="datagrid" class="demo-data-grid" aria-label="Data Grid custom context menu demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
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
