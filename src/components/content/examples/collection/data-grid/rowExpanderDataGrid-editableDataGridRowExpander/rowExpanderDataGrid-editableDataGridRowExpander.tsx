// @ts-nocheck
import 'css!./demo.css';
import * as DataCollectionEditUtils from 'ojs/ojdatacollection-utils';
import 'ojs/ojdatagrid';
import * as flattenedModule from 'ojs/ojflattenedtreedatagriddatasource';
import 'ojs/ojinputtext';
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
  mode?: string;
  cell?: {
    data?: string | number;
  };
  [property: string]: unknown;
};

const createRenderer =
  (factory: (context: DataGridRendererContext) => ComponentChildren) =>
  (context: DataGridRendererContext) => {
  const container = document.createElement('div');
  render(factory(context), container);
  return { insert: container };
};

export const RowExpanderDataGridEditableDataGridRowExpander = () => {
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

  const handleEditEnd = DataCollectionEditUtils.basicHandleEditEnd;

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

  const cellRenderer = createRenderer((context) => {
    if (context.mode === 'edit') {
      return (
        <oj-input-text
          aria-label="cell data"
          value={context.cell?.data}
          class="oj-helper-text-align-start editable"
        />
      );
    }
    return <span>{String(context.cell?.data ?? '')}</span>;
  });

  const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
    'selectionMode.cell': 'single',
    'header.column.renderer': columnHeaderRenderer,
    'header.column.style': 'width:100px;',
    'header.column.resizable.width': 'enable',
    'header.row.renderer': rowHeaderRenderer,
    'header.row.style': 'width:200px;',
    'cell.className': 'oj-sm-justify-content-flex-start',
    'cell.renderer': cellRenderer
  };

  return (
    <oj-data-grid
      id="datagrid"
      class="demo-rowexpander"
      aria-label="Data Grid with Row Expander"
      data={dataSource}
      editMode="cellEdit"
      onojBeforeEditEnd={handleEditEnd}
      {...ojDataGridProps}
    />
  );
};

export default RowExpanderDataGridEditableDataGridRowExpander;
