import "css!./demo.css";
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojdatetimepicker';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojselectsingle';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/customers.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface CustomerRecord {
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

type EditableColumn = keyof Omit<CustomerRecord, 'index' | 'gender'>;
type CustomerCellValue = CustomerRecord[EditableColumn];
type DataGridBeforeEditEndEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojBeforeEditEnd']>>[0];
type EditableValue = string | number | boolean | null | undefined;

type HeaderTemplateContext = {
    item: {
        data: {
            data: EditableColumn;
        };
    };
};

type CellTemplateContext = {
    mode: 'edit' | 'navigation';
    item: {
        columnIndex: number;
        data: {
            data: CustomerCellValue;
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

const jsonData = JSON.parse(jsonDataText as string) as CustomerRecord[];
const COLUMNS = Object.keys(jsonData[0])
    .filter((key): key is EditableColumn => key !== 'index' && key !== 'gender');
const DATE_COLUMNS = new Set<EditableColumn>(['registered', 'lastOrder', 'birthdate']);
const WIDE_COLUMN_WIDTHS: Partial<Record<EditableColumn, string>> = {
    phone: '175px',
    registered: '150px',
    lastOrder: '150px',
    birthdate: '150px',
    totalAmountOrdered: '185px',
    address: '250px',
    state: '250px',
    countryOrigin: '250px'
};

const formatHeaderLabel = (value: string) =>
    value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());

export default function DataGridAdvancedEditableGrid() {
    const editableRef = useRef<EditableElement | null>(null);
    const [rows, setRows] = useState<CustomerRecord[]>(() => jsonData);
    const [lastEdit, setLastEdit] = useState<EditSummary | null>(null);

    const booleanOptions = useMemo<SelectOption[]>(() => [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' }
    ], []);
    const eyeColorOptions = useMemo<SelectOption[]>(() => [
        { value: 'blue', label: 'blue' },
        { value: 'brown', label: 'brown' },
        { value: 'green', label: 'green' }
    ], []);
    const hairColorOptions = useMemo<SelectOption[]>(() => [
        { value: 'grey', label: 'grey' },
        { value: 'red', label: 'red' },
        { value: 'black', label: 'black' },
        { value: 'brown', label: 'brown' }
    ], []);

    const booleanDataProvider = useMemo(() => new ArrayDataProvider(booleanOptions, {
        keyAttributes: 'value'
    }), [booleanOptions]);
    const eyeColorDataProvider = useMemo(() => new ArrayDataProvider(eyeColorOptions, {
        keyAttributes: 'value'
    }), [eyeColorOptions]);
    const hairColorDataProvider = useMemo(() => new ArrayDataProvider(hairColorOptions, {
        keyAttributes: 'value'
    }), [hairColorOptions]);

    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, CustomerRecord>(rows, {
        keyAttributes: 'index'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<CustomerCellValue, number, CustomerRecord>(rowDataProvider, {
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

    const isRightAlignedColumn = (columnIndex: number) => numericIndexes.includes(columnIndex);
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
    const getIsEditable = (cellContext: ojDataGrid.CellContext<number, CustomerCellValue>) => {
        return COLUMNS[cellContext.indexes.column] === 'totalAmountOrdered' ? 'disable' : 'enable';
    };

    const parseValue = (columnKey: EditableColumn, value: EditableValue) => {
        if (typeof rows[0]?.[columnKey] === 'number') {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : 0;
        }
        if (columnKey === 'isActive') {
            return value === true || value === 'true';
        }
        return value;
    };

    const formatValue = (columnKey: EditableColumn, value: CustomerCellValue) => {
        if (columnKey === 'balance' || columnKey === 'totalAmountOrdered') {
            return numberConverter.format(value as number) ?? '';
        }
        if (DATE_COLUMNS.has(columnKey)) {
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
        const editable = editableRef.current;
        if (!editable) {
            return;
        }
        const rowIndex = detail.cellContext.indexes.row;
        const columnIndex = detail.cellContext.indexes.column;
        const columnKey = COLUMNS[columnIndex];
        const currentRow = rows[rowIndex];
        if (!columnKey || !currentRow) {
            return;
        }
        const rawValue = editable.value ?? editable.rawValue;
        const nextValue = parseValue(columnKey, rawValue) as CustomerCellValue;
        const previousValue = currentRow[columnKey];
        setRows((previousRows) => previousRows.map((row, index) => {
            if (index !== rowIndex) {
                return row;
            }
            return {
                ...row,
                [columnKey]: nextValue
            };
        }));
        setLastEdit({
            field: formatHeaderLabel(columnKey),
            previous: formatValue(columnKey, previousValue),
            next: formatValue(columnKey, nextValue),
            row: currentRow.index
        });
    };

    const columnHeaderContentTemplateRenderer = (header: HeaderTemplateContext) => {
        return <div class="oj-datagrid-header-cell-content">{formatHeaderLabel(header.item.data.data)}</div>;
    };

    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        const columnKey = COLUMNS[cell.item.columnIndex];
        if (!columnKey) {
            return null;
        }
        const cellValue = cell.item.data.data;
        if (cell.mode === 'edit') {
            if (typeof rows[0]?.[columnKey] === 'number') {
                return <oj-input-number ref={editableRef} class="editable" value={cellValue as number} labelEdge="none" step={0.01} />;
            }
            if (DATE_COLUMNS.has(columnKey)) {
                return <oj-input-date ref={editableRef} class="editable" value={cellValue as string} labelEdge="none" />;
            }
            if (columnKey === 'isActive') {
                return <oj-select-single ref={editableRef} class="editable" data={booleanDataProvider} value={String(cellValue)} labelEdge="none" />;
            }
            if (columnKey === 'eyeColor') {
                return <oj-select-single ref={editableRef} class="editable" data={eyeColorDataProvider} value={String(cellValue)} labelEdge="none" />;
            }
            if (columnKey === 'hairColor') {
                return <oj-select-single ref={editableRef} class="editable" data={hairColorDataProvider} value={String(cellValue)} labelEdge="none" />;
            }
            return <oj-input-text ref={editableRef} class="editable" value={String(cellValue)} labelEdge="none" />;
        }
        return <span>{formatValue(columnKey, cellValue)}</span>;
    };

    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        cell: {
            editable: getIsEditable,
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
                sortable: 'disable'
            },
            row: {
                style: 'width:120px;',
                sortable: 'disable'
            }
        },
        selectionMode: {
            cell: 'multiple'
        }
    };

    return (
        <div id="datagridwrapper">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Advanced editable customer grid" data={dataGridProvider} scrollPolicy="scroll" editMode="cellEdit" onojBeforeEditEnd={handleEditEnd} {...ojDataGridProps}>
                <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer} />
                <template slot="cellTemplate" render={cellTemplateRenderer} />
            </oj-data-grid>
            <div class="oj-sm-margin-4x-top">
                <p class="bold">Last edited field: {lastEdit ? `${lastEdit.field} on customer ${lastEdit.row}` : 'None yet'}</p>
                <p class="bold">Previous value: {lastEdit?.previous ?? 'None yet'}</p>
                <p class="bold">Updated value: {lastEdit?.next ?? 'None yet'}</p>
            </div>
        </div>
    );
};
