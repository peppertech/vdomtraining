import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'ojs/ojdatagrid';
import type { DataGridElement } from 'ojs/ojdatagrid';
import "css!./demo.css";
interface DataDetails {
    index: number;
    name: string;
    address: string;
    age: number;
    gender: string;
    salary: number;
}
type CellTemplateContext = DataGridElement.CellTemplateContext<DataDetails>;
const DATA_COLUMNS: Array<keyof Omit<DataDetails, 'index'>> = ['name', 'address', 'age', 'gender', 'salary'];
const SAMPLE_ROW: DataDetails = {
    index: 0,
    name: 'Freda Gray',
    address: '267 Albany Avenue',
    age: 33,
    gender: 'Female',
    salary: 2270
};
export const DataGridNoDataStateGrid = () => {
    const [rows, setRows] = useState<DataDetails[]>([]);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<number, DataDetails>(rows, {
        keyAttributes: 'index'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, number, DataDetails>(rowDataProvider, rows.length === 0 ? {} : {
        columns: {
            rowHeader: ['index'],
            databody: ['name', 'address', 'age', 'gender', 'salary']
        },
        columnHeaders: {
            column: ['Name', 'Address', 'Age', 'Gender', 'Salary']
        },
        headerLabels: {
            row: ['Customer']
        }
    }), [rowDataProvider, rows.length]);
    const cellTemplateRenderer = (cell: CellTemplateContext) => {
        return <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
                                    <span>{String(cell.item.data[DATA_COLUMNS[cell.item.columnIndex] ?? 'name'])}</span>
                                    {cell.item.columnIndex === 4 ? <oj-button onojAction={() => setRows([])} display="icons" chroming="borderless"><span slot="startIcon" class="oj-ux-ico-delete-circle"/></oj-button> : null}
                                </div>;
    };
    const noDataTemplateRenderer = () => {
        return <div class="oj-flex oj-sm-align-items-center oj-sm-margin-6x">
                                    <div class="oj-flex oj-sm-align-items-start oj-sm-flex-direction-column">
                                                  <span class="oj-sm-padding-2x oj-typography-body-xl">Add a customer for this account.</span>
                                                  <oj-button onojAction={() => setRows([SAMPLE_ROW])} class="oj-sm-padding-2x oj-sm-align-self-flex-start">Add Customer</oj-button>
                                              </div>
                                </div>;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { cell: {
            alignment: {
                horizontal: 'start'
            }
        }, header: {
            column: {
                style: 'width:220px;',
                sortable: 'disable'
            },
            row: {
                style: 'width:90px;',
                sortable: 'disable'
            }
        } };
    return (<oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid with no data template" data={dataGridProvider} {...ojDataGridProps}>
            <template slot="cellTemplate" render={cellTemplateRenderer}/>
            <template slot="noData" render={noDataTemplateRenderer}/>
        </oj-data-grid>);
};
export default DataGridNoDataStateGrid;
