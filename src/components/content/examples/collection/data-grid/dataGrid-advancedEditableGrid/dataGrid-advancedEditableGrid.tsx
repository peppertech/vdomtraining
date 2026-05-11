import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatetimepicker';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojselectsingle';
import "css!./demo.css";
interface CustomerRecord {
    id: number;
    firstName: string;
    balance: number;
    registered: string;
    isActive: boolean;
    eyeColor: string;
}
interface CustomerSourceRecord extends Omit<CustomerRecord, 'id'> {
    index: number;
}
type EditableColumn = keyof Omit<CustomerRecord, 'id'>;
type DataGridBeforeEditEndEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojBeforeEditEnd']>>[0];
type EditableValue = string | number | boolean | null | undefined;
type HeaderTemplateContext = {
    item: {
        data: {
            data: string;
        };
    };
};
type CellTemplateContext = {
    mode: 'edit' | 'navigation';
    item: {
        columnIndex: number;
        data: {
            data: CustomerRecord[EditableColumn];
        };
    };
};
type EditEndDetail = {
    cancelEdit?: boolean;
    cellContext: {
        indexes: {
            row: number;
            column: number;
        };
    };
};
type EditableElement = HTMLElement & {
    value?: EditableValue;
    rawValue?: EditableValue;
};
interface ColumnDefinition {
    key: EditableColumn;
    label: string;
    width: string;
}
interface SelectOption {
    value: string;
    label: string;
}
interface EditSummary {
    field: string;
    previous: string;
    next: string;
    row: number;
}
const jsonData = JSON.parse(jsonDataText as string) as CustomerSourceRecord[];
const COLUMNS: ColumnDefinition[] = [
    { key: 'firstName', label: 'First Name', width: '160px' },
    { key: 'balance', label: 'Balance', width: '140px' },
    { key: 'registered', label: 'Registered', width: '150px' },
    { key: 'isActive', label: 'Active', width: '120px' },
    { key: 'eyeColor', label: 'Eye Color', width: '140px' }
];
const formatHeaderLabel = (value: string) => value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
export const DataGridAdvancedEditableGrid = () => {
    const [rows, setRows] = useState<CustomerRecord[]>(() => jsonData.slice(0, 8).map((item) => ({
        id: item.index,
        firstName: item.firstName,
        balance: item.balance,
        registered: item.registered,
        isActive: item.isActive,
        eyeColor: item.eyeColor
    })));
    const [lastEdit, setLastEdit] = useState<EditSummary | null>(null);
    const selectOptions = useMemo<SelectOption[]>(() => [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' },
        { value: 'blue', label: 'blue' },
        { value: 'brown', label: 'brown' },
        { value: 'green', label: 'green' }
    ], []);
    const selectDataProvider = useMemo(() => new ArrayDataProvider(selectOptions, {
        keyAttributes: 'value'
    }), [selectOptions]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRecord>(rows, {
        keyAttributes: 'id'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, CustomerRecord>(rowDataProvider, {
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
    const getColumnHeaderStyle = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return `width:${COLUMNS[headerContext.index]?.width ?? '140px'};`;
    };
    const getColumnHeaderHorizontalAlignment = (headerContext: ojDataGrid.HeaderContext<number, string | number>) => {
        return headerContext.index === 1 ? 'right' : 'start';
    };
    const getCellHorizontalAlignment = (cellContext: ojDataGrid.CellContext<number, string | number>) => {
        return cellContext.indexes.column === 1 ? 'right' : 'start';
    };
    const parseValue = (columnKey: EditableColumn, value: EditableValue) => {
        if (columnKey === 'balance') {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : 0;
        }
        if (columnKey === 'isActive') {
            return value === true || value === 'true';
        }
        return value;
    };
    const formatValue = (columnKey: EditableColumn, value: CustomerRecord[EditableColumn]) => {
        if (columnKey === 'balance') {
            return numberConverter.format(value as number) ?? '';
        }
        if (columnKey === 'registered') {
            return dateConverter.format(value as string) ?? '';
        }
        if (columnKey === 'isActive') {
            return String(value);
        }
        return String(value ?? '');
    };
    const handleEditEnd = (event: DataGridBeforeEditEndEvent) => {
        const detail = event.detail as EditEndDetail;
        if (detail.cancelEdit) {
            return;
        }
        const editable = document.querySelector('.editable') as EditableElement | null;
        if (!editable) {
            return;
        }
        const rowIndex = detail.cellContext.indexes.row;
        const columnIndex = detail.cellContext.indexes.column;
        const column = COLUMNS[columnIndex];
        const currentRow = rows[rowIndex];
        if (!column || !currentRow) {
            return;
        }
        const rawValue = editable.value ?? editable.rawValue;
        const nextValue = parseValue(column.key, rawValue) as CustomerRecord[EditableColumn];
        const previousValue = currentRow[column.key];
        setRows((previousRows) => previousRows.map((row, index) => {
            if (index !== rowIndex) {
                return row;
            }
            return {
                ...row,
                [column.key]: nextValue
            };
        }));
        setLastEdit({
            field: formatHeaderLabel(column.key),
            previous: formatValue(column.key, previousValue),
            next: formatValue(column.key, nextValue),
            row: currentRow.id
        });
    };
    const columnHeaderContentTemplateRenderer = (header: HeaderTemplateContext) => {
        return <div class="oj-datagrid-header-cell-content">{header.item.data.data}</div>;
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const column = COLUMNS[cell.item.columnIndex];
        if (!column) {
            return null;
        }
        const columnKey = column.key;
        const cellValue = cell.item.data.data as CustomerRecord[EditableColumn];
        if (cell.mode === 'edit') {
            if (columnKey === 'balance') {
                return <oj-input-number class="editable" value={cellValue as number} labelEdge="none" step={0.01}/>;
            }
            if (columnKey === 'registered') {
                return <oj-input-date class="editable" value={cellValue as string} labelEdge="none"/>;
            }
            if (columnKey === 'isActive') {
                return <oj-select-single class="editable" data={selectDataProvider} value={String(cellValue)} labelEdge="none"/>;
            }
            if (columnKey === 'eyeColor') {
                return <oj-select-single class="editable" data={selectDataProvider} value={String(cellValue)} labelEdge="none"/>;
            }
            return <oj-input-text class="editable" value={String(cellValue)} labelEdge="none"/>;
        }
        return <span>{formatValue(columnKey, cellValue)}</span>;
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
                style: getColumnHeaderStyle
            },
            row: {
                style: 'width:110px;'
            }
        }, selectionMode: {
            cell: 'multiple'
        } };
    return (<div id="datagridwrapper">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Advanced editable customer grid" data={dataGridProvider} scrollPolicy="scroll" editMode="cellEdit" onojBeforeEditEnd={handleEditEnd} {...ojDataGridProps}>
                    <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer}/>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
            <div class="oj-sm-margin-4x-top">
                    <p class="bold">Last edited field: {lastEdit ? `${lastEdit.field} on customer ${lastEdit.row}` : 'None yet'}</p>
                    <p class="bold">Previous value: {lastEdit?.previous ?? 'None yet'}</p>
                    <p class="bold">Updated value: {lastEdit?.next ?? 'None yet'}</p>
                </div>
        </div>);
};
export default DataGridAdvancedEditableGrid;
