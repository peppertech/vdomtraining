// @ts-nocheck
import { render } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as flattenedModule from 'ojs/ojflattenedtreedatagriddatasource';
import * as JsonTreeDataSource from 'ojs/ojjsontreedatasource';
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderDataGrid/dataGridRowExpander/projectData.json';
import 'ojs/ojrowexpander';
import 'ojs/ojdatagrid';
import 'css!./demo.css';

const createRenderer = (factory: any) => (context: any) => {
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

  const columnHeaderRenderer = createRenderer((context: any) => {
    if (context.key === 'resource') return <span>Resource</span>;
    if (context.key === 'start') return <span>Start Date</span>;
    if (context.key === 'end') return <span>End Date</span>;
    return <span>{String(context.key)}</span>;
  });

  const rowHeaderRenderer = createRenderer((context: any) => (
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
