import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/population.json';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface States {
    states: string;
    [propName: string]: number | string;
}
const populationRows = jsonData as States[];
const INITIAL_COLUMNS = Object.keys(populationRows[0] ?? {})
    .filter((key) => key !== 'states')
    .sort((left, right) => Number(left) - Number(right));
const DEFAULT_SORT_COLUMN = INITIAL_COLUMNS[1] ?? INITIAL_COLUMNS[0] ?? '2000';
const getSortedRows = (rows: States[], column: string, direction: SortDirection) => {
    const nextRows = [...rows];
    nextRows.sort((left, right) => {
        const leftValue = Number(left[column] ?? 0);
        const rightValue = Number(right[column] ?? 0);
        return direction === 'ascending' ? leftValue - rightValue : rightValue - leftValue;
    });
    return nextRows;
};
type SortDirection = NonNullable<ComponentProps<'oj-data-grid'>['header']>['column'] extends {
    sortable?: ((context: unknown) => infer TResult) | infer TResult;
} ? Extract<TResult, 'ascending' | 'descending'> : 'ascending' | 'descending';
type SortRequestEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojSortRequest']>>[0];
type SortLabelRequestEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojSortLabelRequest']>>[0];
type CellTemplateContext = DataGridElement.CellTemplateContext<States>;
export const DataGridSortingGrid = () => {
    const [rows, setRows] = useState<States[]>(() => getSortedRows(populationRows, DEFAULT_SORT_COLUMN, 'ascending'));
    const [columns, setColumns] = useState<string[]>(INITIAL_COLUMNS);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, States>(rows, {
        keyAttributes: 'states'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, States>(rowDataProvider, {
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
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const handleSortRequest = (event: SortRequestEvent) => {
        if (event.detail.axis === 'column') {
            const column = columns[event.detail.item.index] ?? DEFAULT_SORT_COLUMN;
            setRows((currentRows) => getSortedRows(currentRows, column, event.detail.direction));
            return;
        }
        const row = rows[event.detail.item.index];
        if (!row) {
            return;
        }
        setColumns((currentColumns) => {
            const nextColumns = [...currentColumns];
            nextColumns.sort((left, right) => {
                const leftValue = Number(row[left] ?? 0);
                const rightValue = Number(row[right] ?? 0);
                return event.detail.direction === 'ascending' ? leftValue - rightValue : rightValue - leftValue;
            });
            return nextColumns;
        });
    };
    const handleSortLabelRequest = (event: SortLabelRequestEvent) => {
        if (event.detail.axis === 'column') {
            setColumns((currentColumns) => {
                const nextColumns = [...currentColumns];
                nextColumns.sort((left, right) => {
                    const leftNumber = Number(left);
                    const rightNumber = Number(right);
                    return event.detail.direction === 'ascending' ? leftNumber - rightNumber : rightNumber - leftNumber;
                });
                return nextColumns;
            });
            return;
        }
        setRows((currentRows) => {
            const nextRows = [...currentRows];
            nextRows.sort((left, right) => {
                const comparison = left.states.localeCompare(right.states);
                return event.detail.direction === 'ascending' ? comparison : -comparison;
            });
            return nextRows;
        });
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return numberConverter.format(Number(cell.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                className: 'demo-header-cell',
                label: {
                    sortable: 'auto'
                },
                sortable: 'auto',
                style: 'width:160px;'
            },
            column: {
                label: {
                    sortable: 'auto'
                },
                sortable: 'auto',
                style: 'width:120px;'
            }
        } };
    return (<div id="datagrid-container">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid provider sorting demo" data={dataGridProvider} scrollPolicy="scroll" onojSortLabelRequest={handleSortLabelRequest} onojSortRequest={handleSortRequest} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridSortingGrid;
