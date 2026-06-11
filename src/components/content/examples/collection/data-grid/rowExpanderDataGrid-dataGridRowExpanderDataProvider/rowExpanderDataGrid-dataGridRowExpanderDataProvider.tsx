// @ts-nocheck
import { render } from 'preact';
import type { ComponentChildren, ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderDataGrid/dataGridRowExpanderDataProvider/projectData.json';
import 'ojs/ojrowexpander';
import 'ojs/ojdatagrid';
import 'css!./demo.css';
interface Project {
    id: string;
    name: string;
    resource: string;
    start: string;
    end: string;
    children?: Array<Project>;
}
type DataGridRendererContext = {
    key?: string | number;
    data?: unknown;
    keys?: {
        column?: string | number;
    };
    [property: string]: unknown;
};
const createRenderer = (factory: (context: DataGridRendererContext) => ComponentChildren) => (context: DataGridRendererContext) => {
    const container = document.createElement('div');
    render(factory(context), container);
    return { insert: container };
};
export const RowExpanderDataGridDataGridRowExpanderDataProvider = () => {
    const dataSource = useMemo(() => {
        const arrayTreeDataProvider = new ArrayTreeDataProvider<Project['id'], Project>(JSON.parse(jsonDataStr as string), {
            keyAttributes: 'id'
        });
        return new FlattenedTreeDataProviderView(arrayTreeDataProvider);
    }, []);
    const columnHeaderRenderer = createRenderer((context) => {
        if (context.key === 'id')
            return <span>Task ID</span>;
        if (context.key === 'name')
            return <span>Task</span>;
        if (context.key === 'resource')
            return <span>Resource</span>;
        if (context.key === 'start')
            return <span>Start Date</span>;
        if (context.key === 'end')
            return <span>End Date</span>;
        return <span>{String(context.key)}</span>;
    });
    const cellRenderer = createRenderer((context) => (<>
      {context.keys?.column === 'id' && <oj-row-expander context={context}/>}
      <span>{String(context.data ?? '')}</span>
    </>));
    const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
        selectionMode: {
            cell: 'single'
        },
        header: {
            column: {
                renderer: columnHeaderRenderer,
                style: 'width:125px;',
                resizable: {
                    width: 'enable'
                }
            }
        },
        cell: {
            className: 'oj-sm-justify-content-flex-start',
            renderer: cellRenderer
        }
    };
    return (<oj-data-grid id="datagrid" class="demo-rowexpander" aria-label="Data Grid with Row Expander" data={dataSource} {...ojDataGridProps}/>);
};
export default RowExpanderDataGridDataGridRowExpanderDataProvider;
