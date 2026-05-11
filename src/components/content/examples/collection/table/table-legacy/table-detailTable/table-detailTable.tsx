import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import 'ojs/ojtable';
import * as jsonDataStrText from 'text!../../../data/cookbook/dataCollections/table/detailTable/projectData.json';
import 'ojs/ojrowexpander';
import 'ojs/ojchart';
import "css!./demo.css";
const jsonDataStr = JSON.parse(jsonDataStrText as string);
export const TableDetailTable = () => {
    const columns = useMemo(() => ([
        { headerText: 'Task Name', sortProperty: 'attr.name', weight: 2, id: 'name', minWidth: '8rem' },
        { headerText: 'Resource', sortProperty: 'attr.resource', id: 'resource', minWidth: '9rem' },
        { headerText: 'Start Date', sortProperty: 'attr.start', id: 'start', minWidth: '7rem' },
        { headerText: 'End Date', sortProperty: 'attr.end', id: 'end' }
    ]), []);
    const arrayTreeDataProvider = useMemo(() => new ArrayTreeDataProvider(jsonDataStr, {
        keyAttributes: 'attr.id'
    }), []);
    const dataProvider = useMemo(() => new FlattenedTreeDataProviderView(arrayTreeDataProvider), [arrayTreeDataProvider]);
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { accessibility: {
            rowHeader: "name"
        } };
    return (<oj-table id="table" aria-label="Tasks Table" data={dataProvider} class="demo-table-container" layout="fixed" columns={columns} {...ojTableProps}/>);
};
export default TableDetailTable;
