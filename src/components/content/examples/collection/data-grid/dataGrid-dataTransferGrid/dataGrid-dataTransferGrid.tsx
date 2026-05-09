import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/population.json';
import 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface PopulationRow {
    states: string;
    [key: string]: string | number;
}
interface SelectionRange {
    startIndex: {
        row?: number;
        column?: number;
    };
    endIndex: {
        row?: number;
        column?: number;
    };
}
type DataGridSelection = NonNullable<ComponentProps<'oj-data-grid'>['selection']>;
type DataTransferOptions = NonNullable<ComponentProps<'oj-data-grid'>['dataTransferOptions']>;
type DataGridCellTemplateContext = {
    item: {
        data: {
            data: string | number;
        };
    };
};
type SelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onselectionChanged']>>[0];
type DataTransferRequestEvent = {
    type: string;
    detail: {
        sourceRange?: SelectionRange;
        targetRange?: SelectionRange;
        action?: string;
    };
};
const SOURCE_ROWS = (jsonData as PopulationRow[]).slice(0, 8);
const COLUMN_KEYS = Object.keys(SOURCE_ROWS[0]).filter((key) => key !== 'states');
const cloneRows = () => SOURCE_ROWS.map((row) => ({ ...row }));
const normalizeRange = (range: SelectionRange, rowCount: number, columnCount: number) => ({
    startRow: range.startIndex.row ?? 0,
    startColumn: range.startIndex.column ?? 0,
    endRow: range.endIndex.row === -1 || range.endIndex.row == null ? rowCount - 1 : range.endIndex.row,
    endColumn: range.endIndex.column === -1 || range.endIndex.column == null ? columnCount - 1 : range.endIndex.column
});
export const DataGridDataTransferGrid = () => {
    const [rows, setRows] = useState<PopulationRow[]>(() => cloneRows());
    const [selection, setSelection] = useState<DataGridSelection>([]);
    const [clipboardData, setClipboardData] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [messageText, setMessageText] = useState<string>('');
    const dataTransferOptions = useMemo<DataTransferOptions>(() => ({
        cut: 'enable',
        copy: 'enable',
        paste: 'enable',
        fill: 'enable'
    }), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, PopulationRow>(rows, {
        keyAttributes: 'states'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, PopulationRow>(rowDataProvider, {
        columns: {
            rowHeader: ['states'],
            databody: COLUMN_KEYS
        },
        columnHeaders: {
            column: COLUMN_KEYS.map((key) => ({ data: key }))
        },
        headerLabels: {
            row: ['States'],
            column: ['Years']
        }
    }), [rowDataProvider]);
    const readMatrix = (range: SelectionRange) => {
        const { startRow, startColumn, endRow, endColumn } = normalizeRange(range, rows.length, COLUMN_KEYS.length);
        const matrix: string[][] = [];
        for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
            const rowValues: string[] = [];
            for (let columnIndex = startColumn; columnIndex <= endColumn; columnIndex++) {
                rowValues.push(String(rows[rowIndex][COLUMN_KEYS[columnIndex]] ?? ''));
            }
            matrix.push(rowValues);
        }
        return matrix;
    };
    const matrixToString = (matrix: string[][]) => matrix.map((row) => row.join('\t')).join('\n');
    const handleCopy = async (event: DataTransferRequestEvent) => {
        const matrix = readMatrix(event.detail.sourceRange as SelectionRange);
        const nextClipboardData = matrixToString(matrix);
        setEventType(event.type);
        setClipboardData(nextClipboardData);
        setMessageText('');
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(nextClipboardData);
        }
    };
    const handleCut = async (event: DataTransferRequestEvent) => {
        const sourceRange = event.detail.sourceRange as SelectionRange;
        await handleCopy(event);
        const { startRow, startColumn, endRow, endColumn } = normalizeRange(sourceRange, rows.length, COLUMN_KEYS.length);
        setRows((currentRows) => currentRows.map((row, rowIndex) => {
            if (rowIndex < startRow || rowIndex > endRow) {
                return row;
            }
            const nextRow = { ...row };
            for (let columnIndex = startColumn; columnIndex <= endColumn; columnIndex++) {
                nextRow[COLUMN_KEYS[columnIndex]] = '';
            }
            return nextRow;
        }));
        setEventType(`${event.type}, cut`);
    };
    const handlePaste = async (event: DataTransferRequestEvent) => {
        const targetRange = event.detail.targetRange as SelectionRange;
        const sourceText = navigator.clipboard?.readText ? await navigator.clipboard.readText().catch(() => clipboardData) : clipboardData;
        const clipboardText = sourceText || clipboardData;
        if (!clipboardText) {
            setMessageText('Copy or cut a cell range before pasting.');
            return;
        }
        const matrix = clipboardText.split(/\r?\n/).filter(Boolean).map((row) => row.split('\t'));
        const { startRow, startColumn, endRow, endColumn } = normalizeRange(targetRange, rows.length, COLUMN_KEYS.length);
        setRows((currentRows) => currentRows.map((row, rowIndex) => {
            if (rowIndex < startRow || rowIndex > endRow) {
                return row;
            }
            const nextRow = { ...row };
            for (let columnIndex = startColumn; columnIndex <= endColumn; columnIndex++) {
                const matrixRow = (rowIndex - startRow) % matrix.length;
                const matrixColumn = (columnIndex - startColumn) % matrix[0].length;
                nextRow[COLUMN_KEYS[columnIndex]] = matrix[matrixRow][matrixColumn];
            }
            return nextRow;
        }));
        setEventType(`${event.type}, ${event.detail.action ?? 'paste'}`);
        setMessageText('');
    };
    const handleFill = (event: DataTransferRequestEvent) => {
        const sourceRange = event.detail.sourceRange as SelectionRange;
        const targetRange = event.detail.targetRange as SelectionRange;
        const matrix = readMatrix(sourceRange);
        const { startRow, startColumn, endRow, endColumn } = normalizeRange(targetRange, rows.length, COLUMN_KEYS.length);
        setRows((currentRows) => currentRows.map((row, rowIndex) => {
            if (rowIndex < startRow || rowIndex > endRow) {
                return row;
            }
            const nextRow = { ...row };
            for (let columnIndex = startColumn; columnIndex <= endColumn; columnIndex++) {
                const matrixRow = (rowIndex - startRow) % matrix.length;
                const matrixColumn = (columnIndex - startColumn) % matrix[0].length;
                nextRow[COLUMN_KEYS[columnIndex]] = matrix[matrixRow][matrixColumn];
            }
            return nextRow;
        }));
        setEventType(`${event.type}, ${event.detail.action ?? 'fill'}`);
        setMessageText('');
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        return <span>{cell.item.data.data}</span>;
    };
    const handleSelectionChanged = (event: SelectionChangedEvent) => {
        setSelection(event.detail.value ?? []);
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { selectionMode: {
            cell: 'multiple'
        }, cell: {
            className: 'oj-helper-text-align-right',
            alignment: {
                horizontal: 'right'
            }
        }, header: {
            row: {
                sortable: 'disable',
                className: 'demo-data-grid-header-row',
                style: 'width:130px;'
            },
            column: {
                sortable: 'disable',
                style: 'width:110px;'
            }
        } };
    return (<div id="datagrid-container">
            <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
                    <oj-form-layout labelEdge="top" maxColumns={2} direction="row" class="oj-sm-margin-4x-top">
                              <oj-text-area labelHint="Clipboard Data" readonly={true} value={clipboardData}/>
                              <oj-text-area labelHint="Event Triggered" readonly={true} value={eventType}/>
                          </oj-form-layout>
                    {messageText ? <p class="oj-text-color-danger">{messageText}</p> : null}
                </div>
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid data transfer demo" data={dataGridProvider} selection={selection} onselectionChanged={handleSelectionChanged} scrollPolicy="scroll" dataTransferOptions={dataTransferOptions} onojCutRequest={handleCut} onojCopyRequest={handleCopy} onojPasteRequest={handlePaste} onojFillRequest={handleFill} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridDataTransferGrid;
