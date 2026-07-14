import "css!./demo.css";
import 'ojs/ojdatagrid';
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/dataGrid/shared/population.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const jsonData = JSON.parse(jsonDataText as string);
interface States {
    states: string;
    [propName: string]: number | string;
}
const parsedData = jsonData as States[];
const columnDeclaration = [
    {
        data: 'Years',
        children: [
            {
                data: '2000s',
                children: [
                    { data: '2000' },
                    { data: '2001' },
                    { data: '2002' },
                    { data: '2003' },
                    { data: '2004' },
                    { data: '2005' },
                    { data: '2006' },
                    { data: '2007' },
                    { data: '2008' },
                    { data: '2009' }
                ]
            },
            {
                data: '2010s',
                children: [
                    { data: '2010' },
                    { data: '2011' },
                    { data: '2012' },
                    { data: '2013' },
                    { data: '2014' },
                    { data: '2015' },
                    { data: '2016' },
                    { data: '2017' },
                    { data: '2018' },
                    { data: '2019' }
                ]
            },
            {
                data: '2020s',
                depth: 2
            }
        ]
    }
];
export const DataGridExpandHeaders = () => {
    const rowDataProvider = useMemo(() => new ArrayDataProvider<string, States>(parsedData, {
        keyAttributes: 'states'
    }), []);
    const dataGridProvider = useMemo(() => new RowDataGridProvider<string | number, string, States>(rowDataProvider, {
        columns: {
            rowHeader: ['states']
        },
        columnHeaders: {
            column: () => columnDeclaration,
            columnEnd: columnDeclaration
        },
        headerLabels: {
            column: () => ['Year', 'Decade', 'Label'],
            columnEnd: ['Year', 'Decade', 'Label'],
            row: ['States']
        }
    }), [rowDataProvider]);
    return (<div id="datagrid-container">
            <oj-data-grid id="datagrid" class="demo-data-grid" aria-label="Data Grid nested headers demo" data={dataGridProvider}/>
        </div>);
};
export default DataGridExpandHeaders;
