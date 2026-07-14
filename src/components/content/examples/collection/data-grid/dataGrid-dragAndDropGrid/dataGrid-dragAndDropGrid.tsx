import "css!./demo.css";
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import 'ojs/ojmenu';
import { ojMenu,ojMenuEventMap } from 'ojs/ojmenu';
import 'ojs/ojoption';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/population.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
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
type DataGridCellTemplateContext = {
    item: {
        data: {
            data: string | number;
        };
    };
};
type DragStartContext = {
    range?: SelectionRange[];
};
type DropHeaderContext = {
    index: number;
    position?: 'before' | 'after';
};
type CutRequestEvent = {
    detail: {
        sourceRange: SelectionRange;
    };
};
type DataGridContext = {
    axis?: 'row' | 'rowEnd' | 'column' | 'columnEnd';
    index?: number;
};
type DataTransferOptions = NonNullable<ComponentProps<'oj-data-grid'>['dataTransferOptions']>;
type DataGridProps = ComponentProps<'oj-data-grid'>;
type DataGridDropConfig = NonNullable<NonNullable<DataGridProps['dnd']>['drop']>;
type DataGridRowDropHandler = NonNullable<NonNullable<DataGridDropConfig['rows']>['drop']>;
type DataGridColumnDropHandler = NonNullable<NonNullable<DataGridDropConfig['columns']>['drop']>;
type DataGridRowDropEvent = Parameters<DataGridRowDropHandler>[0];
type DataGridRowDropContext = Parameters<DataGridRowDropHandler>[1];
type DataGridColumnDropEvent = Parameters<DataGridColumnDropHandler>[0];
type DataGridColumnDropContext = Parameters<DataGridColumnDropHandler>[1];
const SOURCE_ROWS = (jsonData as PopulationRow[]).slice(0, 8);
const INITIAL_COLUMNS = Object.keys(SOURCE_ROWS[0]).filter((key) => key !== 'states');
const cloneRows = () => SOURCE_ROWS.map((row) => ({ ...row }));
export const DataGridDragAndDropGrid = () => {
    const dataGridRef = useRef<ojDataGrid<string, string> | null>(null);
    const [rows, setRows] = useState<PopulationRow[]>(() => cloneRows());
    const [columns, setColumns] = useState<string[]>(INITIAL_COLUMNS);
    const [menuAxis, setMenuAxis] = useState<'row' | 'column' | null>(null);
    const cutRangeRef = useRef<SelectionRange | null>(null);
    const draggedRangesRef = useRef<SelectionRange[]>([]);
    const insertIndexRef = useRef<number>(0);
    const dataTransferOptions = useMemo<DataTransferOptions>(() => ({
        cut: 'enable'
    }), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, PopulationRow>(rows, {
        keyAttributes: 'states'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, PopulationRow>(rowDataProvider, {
        columns: {
            rowHeader: ['states'],
            databody: columns
        },
        columnHeaders: {
            column: columns
        },
        headerLabels: {
            row: ['States'],
            column: ['Years']
        }
    }), [columns, rowDataProvider]);
    const normalizeIndexes = (ranges: SelectionRange[], axis: 'row' | 'column') => {
        const indexes = new Set<number>();
        ranges.forEach((range) => {
            const start = range.startIndex[axis] ?? 0;
            const rawEnd = range.endIndex[axis];
            const end = rawEnd === -1 || rawEnd == null ? start : rawEnd;
            for (let index = start; index <= end; index++) {
                indexes.add(index);
            }
        });
        return Array.from(indexes).sort((left, right) => left - right);
    };
    const reorderRows = (dropIndex: number, position: 'before' | 'after') => {
        const draggedIndexes = normalizeIndexes(draggedRangesRef.current, 'row');
        if (draggedIndexes.length === 0) {
            return;
        }
        setRows((currentRows) => {
            const movingRows = draggedIndexes.map((index) => currentRows[index]);
            const remainingRows = currentRows.filter((_row, index) => !draggedIndexes.includes(index));
            const beforeCount = draggedIndexes.filter((index) => index < dropIndex).length;
            let adjustedIndex = dropIndex - beforeCount;
            if (position === 'after') {
                adjustedIndex += 1;
            }
            remainingRows.splice(adjustedIndex, 0, ...movingRows);
            return remainingRows;
        });
    };
    const reorderColumns = (dropIndex: number, position: 'before' | 'after') => {
        const draggedIndexes = normalizeIndexes(draggedRangesRef.current, 'column');
        if (draggedIndexes.length === 0) {
            return;
        }
        setColumns((currentColumns) => {
            const movingColumns = draggedIndexes.map((index) => currentColumns[index]);
            const remainingColumns = currentColumns.filter((_column, index) => !draggedIndexes.includes(index));
            const beforeCount = draggedIndexes.filter((index) => index < dropIndex).length;
            let adjustedIndex = dropIndex - beforeCount;
            if (position === 'after') {
                adjustedIndex += 1;
            }
            remainingColumns.splice(adjustedIndex, 0, ...movingColumns);
            return remainingColumns;
        });
    };
    const handleDragStart = (_event: Event, dragContext: DragStartContext) => {
        draggedRangesRef.current = dragContext.range ?? [];
    };
    const handleDropRows = (_event: DataGridRowDropEvent, dropHeaderContext: DataGridRowDropContext) => {
        reorderRows(dropHeaderContext.index, dropHeaderContext.position === 'after' ? 'after' : 'before');
    };
    const handleDropColumns = (_event: DataGridColumnDropEvent, dropHeaderContext: DataGridColumnDropContext) => {
        reorderColumns(dropHeaderContext.index, dropHeaderContext.position === 'after' ? 'after' : 'before');
    };
    const handleCut = (event: CutRequestEvent) => {
        const sourceRange = event.detail.sourceRange;
        if (sourceRange.endIndex.column === -1 || sourceRange.endIndex.row === -1) {
            cutRangeRef.current = sourceRange;
        }
    };
    const insertCutRows = (insertIndex: number, position: 'before' | 'after') => {
        const cutRange = cutRangeRef.current;
        if (!cutRange) {
            return;
        }
        const rowIndexes = normalizeIndexes([cutRange], 'row');
        if (rowIndexes.length === 0) {
            return;
        }
        setRows((currentRows) => {
            const movingRows = rowIndexes.map((index) => currentRows[index]);
            const remainingRows = currentRows.filter((_row, index) => !rowIndexes.includes(index));
            const beforeCount = rowIndexes.filter((index) => index < insertIndex).length;
            let adjustedIndex = insertIndex - beforeCount;
            if (position === 'after') {
                adjustedIndex += 1;
            }
            remainingRows.splice(adjustedIndex, 0, ...movingRows);
            return remainingRows;
        });
    };
    const insertCutColumns = (insertIndex: number, position: 'before' | 'after') => {
        const cutRange = cutRangeRef.current;
        if (!cutRange) {
            return;
        }
        const columnIndexes = normalizeIndexes([cutRange], 'column');
        if (columnIndexes.length === 0) {
            return;
        }
        setColumns((currentColumns) => {
            const movingColumns = columnIndexes.map((index) => currentColumns[index]);
            const remainingColumns = currentColumns.filter((_column, index) => !columnIndexes.includes(index));
            const beforeCount = columnIndexes.filter((index) => index < insertIndex).length;
            let adjustedIndex = insertIndex - beforeCount;
            if (position === 'after') {
                adjustedIndex += 1;
            }
            remainingColumns.splice(adjustedIndex, 0, ...movingColumns);
            return remainingColumns;
        });
    };
    const handleMenuAction = (event: ojMenuEventMap['ojMenuAction']) => {
        const selectedValue = String(event.detail.selectedValue);
        if (selectedValue === 'insertRowBefore') {
            insertCutRows(insertIndexRef.current, 'before');
        }
        else if (selectedValue === 'insertRowAfter') {
            insertCutRows(insertIndexRef.current, 'after');
        }
        else if (selectedValue === 'insertColBefore') {
            insertCutColumns(insertIndexRef.current, 'before');
        }
        else if (selectedValue === 'insertColAfter') {
            insertCutColumns(insertIndexRef.current, 'after');
        }
    };
    const beforeOpenHandler = (event: ojMenu.ojBeforeOpen) => {
        const target = event.detail.originalEvent.target as Element;
        const datagrid = dataGridRef.current;
        const context = datagrid?.getContextByNode(target) as DataGridContext | null;
        if (context?.index != null) {
            if (context.axis === 'row' || context.axis === 'rowEnd') {
                setMenuAxis('row');
            }
            else if (context.axis === 'column' || context.axis === 'columnEnd') {
                setMenuAxis('column');
            }
            insertIndexRef.current = context.index;
            return;
        }
        setMenuAxis(null);
    };
    const cellTemplateRenderer = (cell: DataGridCellTemplateContext) => {
        return <span>{cell.item.data.data}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { selectionMode: {
            cell: 'multiple'
        }, dnd: {
            drag: {
                rows: {
                    dataTypes: '["application/ojdatagridrows+json"]',
                    dragStart: handleDragStart
                },
                columns: {
                    dataTypes: '["application/ojdatagridcols+json"]',
                    dragStart: handleDragStart
                }
            },
            drop: {
                rows: {
                    drop: handleDropRows,
                    dataTypes: '["application/ojdatagridrows+json"]'
                },
                columns: {
                    drop: handleDropColumns,
                    dataTypes: '["application/ojdatagridcols+json"]'
                }
            }
        }, header: {
            row: {
                className: 'demo-data-grid-header-row',
                style: 'width:130px;'
            }
        } };
    return (<div id="datagrid-container">
            <oj-data-grid ref={dataGridRef} id="datagrid" class="demo-data-grid" aria-label="Data Grid drag and drop demo" data={dataGridProvider} scrollPolicy="scroll" dataTransferOptions={dataTransferOptions} onojCutRequest={handleCut} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                    <oj-menu slot="contextMenu" onojMenuAction={handleMenuAction} onojBeforeOpen={beforeOpenHandler} aria-label="custom context menu">
                              <oj-option id="cut" value="cut" data-oj-command="oj-datagrid-cutCells">Cut</oj-option>
                              <oj-option id="insertRow" value="insertCopiedRow" disabled={menuAxis !== 'row'}>
                                          Insert Cut Row
                                          <oj-menu id="insertRowSubMenu" aria-label="row insert actions">
                                                        <oj-option id="insertRowBefore" value="insertRowBefore">Before</oj-option>
                                                        <oj-option id="insertRowAfter" value="insertRowAfter">After</oj-option>
                                                    </oj-menu>
                                      </oj-option>
                              <oj-option id="insertColumn" value="insertCopiedColumn" disabled={menuAxis !== 'column'}>
                                          Insert Cut Column
                                          <oj-menu id="insertColumnSubMenu" aria-label="column insert actions">
                                                        <oj-option id="insertColBefore" value="insertColBefore">Before</oj-option>
                                                        <oj-option id="insertColAfter" value="insertColAfter">After</oj-option>
                                                    </oj-menu>
                                      </oj-option>
                          </oj-menu>
                </oj-data-grid>
        </div>);
};
export default DataGridDragAndDropGrid;
