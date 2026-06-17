import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import type { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/population.json';
import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojdatagrid';
import type { DataGridElement, ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface PopulationRow {
    states: string;
    [key: string]: string | number;
}
type DataGridSelection = NonNullable<ComponentProps<'oj-data-grid'>['selection']>;
type SelectionRange = DataGridSelection[number];
type SelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onselectionChanged']>>[0];
type ColumnHeaderTemplateContext = DataGridElement.ColumnHeaderContentTemplateContext<PopulationRow>;
type DataGridDomElement = ojDataGrid<string, PopulationRow> & HTMLElement;
const SOURCE_ROWS = (jsonData as PopulationRow[]).slice(0, 8);
const ROW_HEADER_KEY = 'states';
const COLUMN_KEYS = Object.keys(SOURCE_ROWS[0]).filter((key) => key !== ROW_HEADER_KEY);
const cloneRows = () => SOURCE_ROWS.map((row) => ({ ...row }));
export const DataGridCrudGrid = () => {
    const dataGridRef = useRef<DataGridDomElement | null>(null);
    const [rows, setRows] = useState<PopulationRow[]>(() => cloneRows());
    const [selection, setSelection] = useState<DataGridSelection>([]);
    const [inputTextValue, setInputTextValue] = useState<string>('');
    const [listenersEnabled, setListenersEnabled] = useState<boolean>(true);
    const [eventStatus, setEventStatus] = useState<string>("Event listeners are enabled.\n");
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, PopulationRow>(rows, {
        keyAttributes: ROW_HEADER_KEY
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, PopulationRow>(rowDataProvider, {
        columns: {
            rowHeader: [ROW_HEADER_KEY],
            databody: COLUMN_KEYS
        },
        columnHeaders: {
            column: COLUMN_KEYS.map((key) => ({ data: key }))
        }
    }), [rowDataProvider]);
    const appendEvent = (message: string) => {
        if (!listenersEnabled) {
            return;
        }
        setEventStatus((current) => `${current}${message}\n`);
    };
    const handleInputTextValueValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setInputTextValue(event.detail.value ?? '');
    };
    const getSelectedRange = () => selection[0];
    const getBounds = (selectedRange: SelectionRange | undefined) => {
        if (!selectedRange) {
            return null;
        }
        const startRow = selectedRange.startIndex?.row ?? 0;
        const endRow = selectedRange.endIndex?.row ?? startRow;
        const startColumn = selectedRange.startIndex?.column ?? 0;
        const endColumn = selectedRange.endIndex?.column ?? startColumn;
        return { startRow, endRow, startColumn, endColumn };
    };
    const updateSelection = (_event: ojButton.ojAction) => {
        const bounds = getBounds(getSelectedRange());
        if (!bounds || !inputTextValue) {
            return;
        }
        setRows((currentRows) => currentRows.map((row, rowIndex) => {
            if (rowIndex < bounds.startRow || rowIndex > bounds.endRow) {
                return row;
            }
            const nextRow = { ...row };
            for (let columnIndex = bounds.startColumn; columnIndex <= bounds.endColumn; columnIndex++) {
                const columnKey = COLUMN_KEYS[columnIndex];
                const currentValue = nextRow[columnKey];
                nextRow[columnKey] = typeof currentValue === 'number' ? Number(inputTextValue) || 0 : inputTextValue;
            }
            return nextRow;
        }));
        appendEvent('update triggered');
    };
    const removeSelection = (_event: ojButton.ojAction) => {
        const bounds = getBounds(getSelectedRange());
        if (!bounds) {
            return;
        }
        setRows((currentRows) => currentRows.filter((_row, rowIndex) => rowIndex < bounds.startRow || rowIndex > bounds.endRow));
        appendEvent('remove triggered');
    };
    const addSelection = (_event: ojButton.ojAction) => {
        const bounds = getBounds(getSelectedRange());
        if (!bounds) {
            return;
        }
        setRows((currentRows) => {
            const duplicates = currentRows.slice(bounds.startRow, bounds.endRow + 1).map((row, index) => ({
                ...row,
                states: `${row.states} Copy ${index + 1}`
            }));
            return [
                ...currentRows.slice(0, bounds.endRow + 1),
                ...duplicates,
                ...currentRows.slice(bounds.endRow + 1)
            ];
        });
        appendEvent('add triggered');
    };
    const resetGrid = (_event: ojButton.ojAction) => {
        setRows(cloneRows());
        setSelection([]);
        setInputTextValue('');
        appendEvent('refresh triggered');
    };
    const addEvents = (_event: ojButton.ojAction) => {
        setListenersEnabled(true);
        setEventStatus("Event listeners are enabled.\n");
    };
    const removeEvents = (_event: ojButton.ojAction) => {
        setListenersEnabled(false);
        setEventStatus("Event listeners are disabled.\n");
    };
    const selectionChange = (event: SelectionChangedEvent) => {
        const nextSelection = event.detail.value ?? [];
        setSelection(nextSelection);
        const grid = dataGridRef.current;
        const currentCell = grid?.currentCell;
        if (!currentCell || currentCell.type !== 'cell') {
            return;
        }
        const rowIndex = currentCell.indexes?.row ?? 0;
        const columnIndex = currentCell.indexes?.column ?? 0;
        const currentRow = rows[rowIndex];
        const columnKey = COLUMN_KEYS[columnIndex];
        if (currentRow && columnKey) {
            setInputTextValue(String(currentRow[columnKey] ?? ''));
        }
    };
    const formatColumnHeader = (header: string) => header.replace(/([A-Z])/g, ' $1').replace(/^./, (value) => value.toUpperCase());
    const columnHeaderContentTemplateRenderer = (header: ColumnHeaderTemplateContext) => {
        return formatColumnHeader(String(header.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                className: 'demo-data-grid-header-row',
                style: 'width:140px;',
                sortable: 'disable'
            },
            column: {
                sortable: 'disable'
            }
        }, selectionMode: {
            cell: 'multiple'
        } };
    return (<div id="dataGridDemo">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-8">
                              <oj-data-grid ref={dataGridRef} id="datagrid" class="demo-data-grid" aria-label="DataGrid CRUD demo" data={dataGridProvider} scrollPolicy="scroll" selection={selection} onselectionChanged={selectionChange} {...ojDataGridProps}>
                                          <template slot="columnHeaderContentTemplate" render={columnHeaderContentTemplateRenderer}/>
                                      </oj-data-grid>
                          </div>
                    <div class="oj-flex-item oj-sm-4">
                              <div class="oj-panel oj-bg-neutral-30 oj-web-padding oj-sm-margin-4x-start demo-height">
                                          <oj-form-layout readonly={false} maxColumns={1} direction="row">
                                                        <oj-input-text id="textInput" labelHint="Text to apply" onvalueChanged={handleInputTextValueValueChanged} value={inputTextValue}/>
                                                        <div>
                                                                        <oj-button id="updateButton" onojAction={updateSelection} disabled={selection.length === 0}>Update Selection</oj-button>
                                                                        <oj-button id="removeButton" onojAction={removeSelection} disabled={selection.length === 0}>Remove Rows</oj-button>
                                                                        <oj-button id="addButton" onojAction={addSelection} disabled={selection.length === 0}>Duplicate Rows</oj-button>
                                                                        <oj-button id="resetGrid" onojAction={resetGrid}>Reset</oj-button>
                                                                    </div>
                                                        <div>
                                                                        <oj-button id="addEventsButton" onojAction={addEvents} disabled={listenersEnabled}>Enable Event Log</oj-button>
                                                                        <oj-button id="removeEventsButton" onojAction={removeEvents} disabled={!listenersEnabled}>Disable Event Log</oj-button>
                                                                    </div>
                                                        <oj-text-area id="eventStatus" labelHint="Event status" readonly={true} maxRows={10} class="oj-sm-web-padding-vertical" value={eventStatus}/>
                                                    </oj-form-layout>
                                      </div>
                          </div>
                </div>
        </div>);
};
export default DataGridCrudGrid;
