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
const COLUMNS = ['2016', '2017', '2018', '2019', '2020'];
type SortRequestEvent = Parameters<NonNullable<ComponentProps<'oj-data-grid'>['onojSortRequest']>>[0];
type CellTemplateContext = DataGridElement.CellTemplateContext<States>;
export const DataGridOverView = () => {
    const [sortColumn, setSortColumn] = useState<string>('2020');
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('descending');
    const rows = useMemo(() => {
        const nextRows = [...(jsonData as States[])];
        nextRows.sort((left, right) => {
            const leftValue = Number(left[sortColumn] ?? 0);
            const rightValue = Number(right[sortColumn] ?? 0);
            return sortDirection === 'ascending' ? leftValue - rightValue : rightValue - leftValue;
        });
        return nextRows.slice(0, 20);
    }, [sortColumn, sortDirection]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, States>(rows, {
        keyAttributes: 'states'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, States>(rowDataProvider, {
        columns: {
            rowHeader: ['states'],
            databody: COLUMNS
        },
        columnHeaders: {
            column: COLUMNS
        },
        headerLabels: {
            row: ['States'],
            column: ['Years']
        }
    }), [rowDataProvider]);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: true }), []);
    const handleSortRequest = (event: SortRequestEvent) => {
        const columnKey = COLUMNS[event.detail.item.index] ?? sortColumn;
        setSortColumn(columnKey);
        setSortDirection(event.detail.direction);
    };
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return numberConverter.format(Number(cell.item.data.data));
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { selectionMode: {
            cell: 'multiple'
        }, header: {
            column: {
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                style: 'width:120px;'
            },
            row: {
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                className: 'demo-data-grid-header-row',
                style: 'width:165px;',
                sortable: 'disable'
            }
        } };
    return (<div id="datagrid-container">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid overview demo" data={dataGridProvider} scrollPolicy="loadMoreOnScroll" onojSortRequest={handleSortRequest} {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridOverView;
