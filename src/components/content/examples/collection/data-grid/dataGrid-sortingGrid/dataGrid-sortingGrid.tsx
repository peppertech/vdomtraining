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
const INITIAL_COLUMNS = ['2016', '2017', '2018', '2019', '2020'];
type SortDirection = NonNullable<ComponentProps<'oj-data-grid'>['header']>['column'] extends {
    sortable?: ((context: unknown) => infer TResult) | infer TResult;
} ? Extract<TResult, 'ascending' | 'descending'> : 'ascending' | 'descending';
type SortRequestEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojSortRequest']>>[0];
type SortLabelRequestEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojSortLabelRequest']>>[0];
type CellTemplateContext = DataGridElement.CellTemplateContext<States>;
export const DataGridSortingGrid = () => {
    const [rowsSortedBy, setRowsSortedBy] = useState<string>('2020');
    const [rowDirection, setRowDirection] = useState<SortDirection>('descending');
    const [columns, setColumns] = useState<string[]>(INITIAL_COLUMNS);
    const rows = useMemo(() => {
        const nextRows = [...(jsonData as States[])].slice(0, 20);
        nextRows.sort((left, right) => {
            const leftValue = Number(left[rowsSortedBy] ?? 0);
            const rightValue = Number(right[rowsSortedBy] ?? 0);
            return rowDirection === 'ascending' ? leftValue - rightValue : rightValue - leftValue;
        });
        return nextRows;
    }, [rowDirection, rowsSortedBy]);
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
        const column = columns[event.detail.item.index] ?? rowsSortedBy;
        setRowsSortedBy(column);
        setRowDirection(event.detail.direction);
    };
    const handleSortLabelRequest = (event: SortLabelRequestEvent) => {
        if (event.detail.axis !== 'column') {
            return;
        }
        setColumns((currentColumns) => {
            const nextColumns = [...currentColumns];
            nextColumns.sort((left, right) => {
                const leftNumber = Number(left);
                const rightNumber = Number(right);
                return event.detail.direction === 'ascending' ? leftNumber - rightNumber : rightNumber - leftNumber;
            });
            return nextColumns;
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
                style: 'width:160px;'
            },
            column: {
                label: {
                    sortable: 'auto'
                },
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
