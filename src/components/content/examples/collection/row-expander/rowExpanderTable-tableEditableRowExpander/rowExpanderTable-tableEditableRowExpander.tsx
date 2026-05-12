import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/rowExpanderTable/tableEditableRowExpander/projectData.json';
import type { ojTable } from 'ojs/ojtable';
import { ojInputText } from 'ojs/ojinputtext';
import { ojInputDate } from 'ojs/ojdatetimepicker';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojtable';
import 'ojs/ojrowexpander';
import 'ojs/ojinputtext';
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojdatetimepicker';


type TaskNode = {
  id: string;
  name: string;
  resource: string;
  start: string;
  end: string;
  children?: TaskNode[];
};

type TableColumns = ComponentProps<'oj-table'>['columns'];
type TableEditRow = ComponentProps<'oj-table'>['editRow'];
type EditableRowTemplateContext = ojTable.RowTemplateContext<TaskNode['id'], TaskNode> & {
  mode?: 'navigation' | 'edit';
};

const updateTaskTree = (rows: TaskNode[], taskId: string, nextTask: TaskNode): TaskNode[] =>
  rows.map((row) => {
    if (row.id === taskId) {
      return { ...row, ...nextTask };
    }
    if (!row.children) {
      return row;
    }
    return { ...row, children: updateTaskTree(row.children, taskId, nextTask) };
  });

export const RowExpanderTableTableEditableRowExpander = () => {
  const initialTaskData = useMemo<TaskNode[]>(() => JSON.parse(jsonDataText as string) as TaskNode[], []);
  const [taskRows, setTaskRows] = useState<TaskNode[]>(() => initialTaskData);
  const [editedData, setEditedData] = useState('');
  const [rowData, setRowData] = useState<TaskNode | null>(null);
  const [editRow, setEditRow] = useState<TableEditRow>({ rowKey: null });
  const cancelEditRef = useRef(false);
  const originalDataRef = useRef<TaskNode | null>(null);
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
    []
  );
  const arrayTreeDataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<TaskNode['id'], TaskNode>(taskRows, {
        keyAttributes: 'id'
      }),
    [taskRows]
  );
  const dataProvider = useMemo(
    () => new FlattenedTreeDataProviderView<TaskNode['id'], TaskNode>(arrayTreeDataProvider),
    [arrayTreeDataProvider]
  );
  const columns = useMemo<TableColumns>(
    () => [
      { headerText: 'Task Name', sortProperty: 'name', weight: 2, minWidth: '13rem', className: 'oj-read-only', id: 'name' },
      { headerText: 'Resource', sortProperty: 'resource', minWidth: '8rem', id: 'resource' },
      { headerText: 'Start Date', sortProperty: 'start', minWidth: '8rem', id: 'start' },
      { headerText: 'End Date', sortProperty: 'end', minWidth: '8rem', id: 'end' },
      { headerText: 'Action', width: '6rem', headerStyle: 'text-align: center;', style: 'padding-top: 0px; padding-bottom: 0px; text-align: center;', id: 'action' }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' }
  };

  const handleEditRowChanged = (event: Parameters<NonNullable<ComponentProps<'oj-table'>['oneditRowChanged']>>[0]) => {
    setEditRow(event.detail.value);
  };

  const beforeRowEditListener = (event: ojTable.ojBeforeRowEdit<TaskNode['id'], TaskNode>) => {
    cancelEditRef.current = false;
    const currentRowData = { ...event.detail.rowContext.item.data };
    originalDataRef.current = currentRowData;
    setRowData(currentRowData);
  };

  const hasValidationErrorInRow = (table: ojTable<TaskNode['id'], TaskNode>) => {
    const editables = table.querySelectorAll('.editable');
    for (let index = 0; index < editables.length; index++) {
      const editable = editables.item(index) as ojInputText | ojInputDate;
      editable.validate();
      if (editable.valid !== 'valid') {
        return true;
      }
    }
    return false;
  };

  const isRowDataUpdated = () => {
    if (!rowData || !originalDataRef.current) {
      return false;
    }
    const propNames = Object.keys(rowData) as Array<keyof TaskNode>;
    return propNames.some((propName) => rowData[propName] !== originalDataRef.current?.[propName]);
  };

  const submitRow = (rowKey: TaskNode['id']) => {
    if (!rowData) {
      return;
    }
    setTaskRows((currentRows) => updateTaskTree(currentRows, rowKey, rowData));
    setEditedData(JSON.stringify(rowData));
  };

  const beforeRowEditEndListener = (event: ojTable.ojBeforeRowEditEnd<TaskNode['id'], TaskNode>) => {
    setEditedData('');
    const detail = event.detail;
    if (!detail.cancelEdit && !cancelEditRef.current) {
      if (hasValidationErrorInRow(document.getElementById('table') as ojTable<TaskNode['id'], TaskNode>)) {
        event.preventDefault();
        return;
      }
      if (isRowDataUpdated()) {
        submitRow(detail.rowContext.item.data.id);
      }
    }
  };

  const updateRowData = <K extends keyof TaskNode>(field: K, value: TaskNode[K]) => {
    setRowData((currentRowData) => {
      if (!currentRowData) {
        return currentRowData;
      }
      return { ...currentRowData, [field]: value };
    });
  };

  const handleUpdate = (rowKey: TaskNode['id']) => () => {
    setEditRow({ rowKey });
  };

  const handleDone = () => {
    setEditRow({ rowKey: null });
  };

  const handleCancel = () => {
    cancelEditRef.current = true;
    setRowData(originalDataRef.current ? { ...originalDataRef.current } : null);
    setEditRow({ rowKey: null });
  };

  const rowTemplateRenderer = (row: EditableRowTemplateContext) => {
    const currentRowData = rowData ?? row.item.data;
    const isEditing = row.mode === 'edit';
    return (
      <tr>
        <td>
          <oj-row-expander context={row} data-oj-clickthrough="disabled" />
          <span>{row.item.data.name}</span>
        </td>
        <td>
          {isEditing ? (
            <oj-input-text
              id="it2"
              value={currentRowData.resource}
              class="editable"
              onvalueChanged={(event) => updateRowData('resource', event.detail.value ?? '')}
            />
          ) : (
            <span>{row.item.data.resource}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <oj-input-date
              id="it3"
              value={currentRowData.start}
              class="editable"
              onvalueChanged={(event) => updateRowData('start', event.detail.value ?? '')}
            />
          ) : (
            <span>{dateConverter.format(row.item.data.start)}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <oj-input-date
              id="it4"
              value={currentRowData.end}
              class="editable"
              onvalueChanged={(event) => updateRowData('end', event.detail.value ?? '')}
            />
          ) : (
            <span>{dateConverter.format(row.item.data.end)}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <oj-toolbar chroming="borderless" class="oj-sm-padding-0-vertical">
              <oj-button display="icons" onojAction={handleDone} data-oj-clickthrough="disabled">
                <span slot="startIcon" class="oj-ux-ico-check" />
                Save
              </oj-button>
              <oj-button display="icons" onojAction={handleCancel} data-oj-clickthrough="disabled">
                <span slot="startIcon" class="oj-ux-ico-multiply" />
                Cancel
              </oj-button>
            </oj-toolbar>
          ) : (
            <oj-button display="icons" chroming="borderless" onojAction={handleUpdate(row.item.data.id)} data-oj-clickthrough="disabled">
              <span slot="startIcon" class="oj-ux-ico-edit" />
              Edit
            </oj-button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div id="tableWrapper">
      <oj-table
        id="table"
        aria-label="Tasks Table"
        data={dataProvider}
        editMode="rowEdit"
        oneditRowChanged={handleEditRowChanged}
        editRow={editRow}
        onojBeforeRowEdit={beforeRowEditListener}
        onojBeforeRowEditEnd={beforeRowEditEndListener}
        class="oj-sm-margin-5x-bottom oj-sm-width-full"
        layout="fixed"
        columns={columns}
        {...ojTableProps}
      >
        <template slot="rowTemplate" render={rowTemplateRenderer} />
      </oj-table>
      <p class="oj-sm-margin-5x-bottom">
        To edit a row, double click on it or press Enter. Press Enter to submit the edit, or Esc to
        cancel the edit and return to readonly.
      </p>
      <oj-text-area id="editedContent" labelHint="Edited Data" readonly rows={6} value={editedData} />
    </div>
  );
};

export default RowExpanderTableTableEditableRowExpander;
