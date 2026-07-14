import "css!./demo.css";
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface MergeRow {
    rowLabel: string;
    [key: string]: string;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<MergeRow>;
const createRows = () => {
    return Array.from({ length: 12 }, (_unused, rowIndex) => {
        const row: MergeRow = {
            rowLabel: `Row ${rowIndex + 1}`
        };
        for (let columnIndex = 0; columnIndex < 12; columnIndex++) {
            const groupRow = Math.floor(rowIndex / 2);
            const groupColumn = Math.floor(columnIndex / 2);
            row[`c${columnIndex + 1}`] = `${groupRow},${groupColumn}`;
        }
        return row;
    });
};
const COLUMNS = Array.from({ length: 12 }, (_unused, index) => `c${index + 1}`);
export const DataGridMergeCellsGrid = () => {
    const rows = useMemo(() => createRows(), []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, MergeRow>(rows, {
        keyAttributes: 'rowLabel'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, MergeRow>(rowDataProvider, {
        columns: {
            rowHeader: ['rowLabel'],
            databody: COLUMNS
        },
        columnHeaders: {
            column: COLUMNS.map((_column, index) => `Column ${index + 1}`)
        },
        headerLabels: {
            row: ['Rows']
        }
    }), [rowDataProvider]);
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return <span>{cell.item.data.data}</span>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { selectionMode: {
            cell: 'multiple'
        }, header: {
            column: {
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                sortable: 'disable',
                style: 'width:100px;'
            },
            row: {
                sortable: 'disable',
                resizable: {
                    width: 'enable',
                    height: 'enable'
                },
                style: 'width:110px;'
            }
        } };
    return (<div id="datagrid-container">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid merge cells demo" data={dataGridProvider} scrollPolicy="scroll" {...ojDataGridProps}>
                    <template slot="cellTemplate" render={cellTemplateRenderer}/>
                </oj-data-grid>
        </div>);
};
export default DataGridMergeCellsGrid;
