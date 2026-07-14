// @ts-nocheck
import 'css!./demo.css';
import 'ojs/ojdatagrid';
import * as flattenedModule from 'ojs/ojflattenedtreedatagriddatasource';
import * as JsonTreeDataSource from 'ojs/ojjsontreedatasource';
import 'ojs/ojrowexpander';
import 'preact';
import type { ComponentChildren,ComponentProps } from 'preact';
import { render } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderDataGrid/dataGridRowExpander/projectData.json';

type DataGridRendererContext = {
  key?: string | number;
  data?: unknown;
  [property: string]: unknown;
};

const createRenderer =
  (factory: (context: DataGridRendererContext) => ComponentChildren) =>
  (context: DataGridRendererContext) => {
  const container = document.createElement('div');
  render(factory(context), container);
  return { insert: container };
};

export const RowExpanderDataGridDataGridRowExpander = () => {
  const dataSource = useMemo(
    () =>
      new flattenedModule.FlattenedTreeDataGridDataSource(
        new JsonTreeDataSource(JSON.parse(jsonDataStr as string)),
        {
          rowHeader: 'name',
          columns: ['resource', 'start', 'end']
        }
      ),
    []
  );

  const columnHeaderRenderer = createRenderer((context) => {
    if (context.key === 'resource') return <span>Resource</span>;
    if (context.key === 'start') return <span>Start Date</span>;
    if (context.key === 'end') return <span>End Date</span>;
    return <span>{String(context.key)}</span>;
  });

  const rowHeaderRenderer = createRenderer((context) => (
    <>
      <oj-row-expander context={context} />
      <span>{String(context.data ?? '')}</span>
    </>
  ));

  const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
    'selectionMode.cell': 'single',
    'header.column.renderer': columnHeaderRenderer,
    'header.column.style': 'width:110px;',
    'header.column.resizable.width': 'enable',
    'header.row.renderer': rowHeaderRenderer,
    'header.row.style': 'width:200px;',
    'cell.className': 'oj-sm-justify-content-flex-start'
  };

  return (
    <oj-data-grid
      id="datagrid"
      class="demo-rowexpander"
      aria-label="Data Grid with Row Expander"
      data={dataSource}
      {...ojDataGridProps}
    />
  );
};

export default RowExpanderDataGridDataGridRowExpander;
