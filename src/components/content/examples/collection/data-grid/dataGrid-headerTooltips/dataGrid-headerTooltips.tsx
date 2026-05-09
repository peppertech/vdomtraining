import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import * as jsonDataText from 'text!../data/cookbook/dataCollections/dataGrid/shared/employeePerformance.json';
import 'ojs/ojdatagrid';
import { ojDataGrid } from 'ojs/ojdatagrid';
import "css!./demo.css";
const jsonData = JSON.parse(jsonDataText as string);
interface DataDetails {
    name: string;
    communication: number;
    teamwork: number;
    contingent: number;
    resourceful: number;
}
const COLUMN_KEYS: Array<keyof Omit<DataDetails, 'name'>> = ['communication', 'teamwork', 'contingent', 'resourceful'];
export const DataGridHeaderTooltips = () => {
    const rows = useMemo(() => jsonData as DataDetails[], []);
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, DataDetails>(rows, {
        keyAttributes: 'name'
    }), [rows]);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string, string, DataDetails>(rowDataProvider, {
        columns: {
            rowHeader: ['name'],
            databody: COLUMN_KEYS
        },
        columnHeaders: {
            column: ['Communication', 'Teamwork', 'Contingent', 'Resourceful']
        },
        headerLabels: {
            row: ['Employees']
        }
    }), [rowDataProvider]);
    const handleDescription = (context: ojDataGrid.HeaderContext<string, DataDetails>) => {
        if (context.index === 0) {
            return 'Ensures open communication and provides feedback during project work. Rated on a 1-5 scale.';
        }
        if (context.index === 1) {
            return 'Works effectively with others to attain a shared goal. Rated on a 1-5 scale.';
        }
        if (context.index === 2) {
            return 'Adapts and responds to change in times of adversity. Rated on a 1-5 scale.';
        }
        if (context.index === 3) {
            return 'Gathers relevant information to define future strategy. Rated on a 1-5 scale.';
        }
        return null;
    };
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = { header: {
            row: {
                style: 'width:250px;',
                sortable: 'disable'
            },
            column: {
                style: 'width:250px;',
                description: handleDescription,
                sortable: 'disable'
            }
        } };
    return (<div id="datagrid-container">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid header tooltip demo" data={dataGridProvider} {...ojDataGridProps}/>
        </div>);
};
export default DataGridHeaderTooltips;
