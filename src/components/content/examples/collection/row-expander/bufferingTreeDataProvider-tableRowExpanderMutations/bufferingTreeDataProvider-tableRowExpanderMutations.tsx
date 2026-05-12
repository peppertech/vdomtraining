import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../../data/cookbook/dataCollections/rowExpanderTable/tableEditableRowExpander/projectData.json';
import { MutableArrayTreeDataProvider } from 'ojs/ojmutablearraytreedataprovider';
import BufferingTreeDataProvider = require('ojs/ojbufferingtreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
import { ojTable } from 'ojs/ojtable';
import 'ojs/ojtable';
import 'ojs/ojrowexpander';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojdatetimepicker';
import 'ojs/ojlabel';
import 'ojs/ojtextarea';
import 'ojs/ojtoolbar';
import 'css!./demo.css';

type Task = {
  id: string;
  name: string;
  resource: string;
  start: string;
  end: string;
  children?: Task[];
};

type TaskKey = string[];
type InputTextChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
type InputDateChangedEvent = CustomEvent<{ value?: string | null }>;
type FirstSelectedRowChangedEvent = ojTable.firstSelectedRowChanged<TaskKey, Task>;
type FirstSelectedRow = ComponentProps<'oj-table'>['firstSelectedRow'];
type TableColumns = ComponentProps<'oj-table'>['columns'];

const initialTreeData = JSON.parse(jsonDataText as string) as Task[];

const cloneTasks = (tasks: Task[]): Task[] => JSON.parse(JSON.stringify(tasks)) as Task[];

const formatKey = (key?: TaskKey | null) => (key && key.length > 0 ? key.join(' / ') : '');

const findNodeInfo = (tasks: Task[], keyPath: TaskKey) => {
  let children = tasks;
  let parent: Task | null = null;

  for (let depth = 0; depth < keyPath.length; depth += 1) {
    const key = keyPath[depth];
    const index = children.findIndex((task) => task.id === key);

    if (index < 0) {
      return null;
    }

    const node = children[index];
    if (depth === keyPath.length - 1) {
      return {
        children,
        index,
        node,
        parent,
      };
    }

    parent = node;
    children = node.children ?? [];
  }

  return null;
};

const applyEdit = (
  tasks: Task[],
  editItem: BufferingDataProvider.EditItem<TaskKey, Task>,
): Task[] => {
  const nextTasks = cloneTasks(tasks);
  const key = editItem.item.metadata.key;
  const info = findNodeInfo(nextTasks, key);

  if (editItem.operation === 'add') {
    const parentKey = key.slice(0, -1);
    const parentInfo = parentKey.length > 0 ? findNodeInfo(nextTasks, parentKey) : null;
    const newTask = cloneTasks([editItem.item.data as Task])[0];

    if (parentKey.length === 0) {
      nextTasks.push(newTask);
    } else if (parentInfo) {
      parentInfo.node.children = [...(parentInfo.node.children ?? []), newTask];
    }
    return nextTasks;
  }

  if (!info) {
    return nextTasks;
  }

  if (editItem.operation === 'update') {
    info.children.splice(info.index, 1, cloneTasks([editItem.item.data as Task])[0]);
  } else if (editItem.operation === 'remove') {
    info.children.splice(info.index, 1);
  }

  return nextTasks;
};

export const BufferingTreeDataProviderTableRowExpanderMutations = () => {
  const dataRef = useRef<Task[]>(cloneTasks(initialTreeData));
  const newTaskCounterRef = useRef(0);
  const [firstSelected, setFirstSelected] = useState<FirstSelectedRow>(undefined);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedKey, setSelectedKey] = useState<TaskKey | null>(null);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [bufferSummary, setBufferSummary] = useState('');
  const [, setDataVersion] = useState(0);

  const mutableTreeDataProvider = useMemo(
    () =>
      new MutableArrayTreeDataProvider<TaskKey, Task>(dataRef.current, 'id', {
        childrenAttribute: 'children',
        useKeyPaths: 'on',
      }),
    [],
  );

  const bufferingDataProvider = useMemo(
    () => new BufferingTreeDataProvider<TaskKey, Task>(mutableTreeDataProvider),
    [mutableTreeDataProvider],
  );

  const dataProvider = useMemo(
    () =>
      new FlattenedTreeDataProviderView<TaskKey, Task>(bufferingDataProvider, {
        expanded: new AllKeySetImpl<TaskKey>(),
      }),
    [bufferingDataProvider],
  );

  const columns = useMemo<TableColumns>(
    () => [
      { headerText: 'Task Name', sortProperty: 'name', weight: 2, minWidth: '13rem', id: 'name' },
      { headerText: 'Resource', sortProperty: 'resource', minWidth: '9rem', id: 'resource' },
      { headerText: 'Start Date', sortProperty: 'start', minWidth: '8rem', id: 'start' },
      { headerText: 'End Date', sortProperty: 'end', minWidth: '8rem', id: 'end' },
    ],
    [],
  );

  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'name' },
  };

  const refreshBufferSummary = () => {
    const items = bufferingDataProvider.getSubmittableItems();
    const summary = items
      .map((editItem) => {
        const task = editItem.item.data as Task | undefined;
        return `${editItem.operation} ${formatKey(editItem.item.metadata.key)}${task ? `: ${task.name}` : ''}`;
      })
      .join('\n');

    setBufferSummary(summary);
  };

  const setFormFromTask = (task: Task | null) => {
    setName(task?.name ?? '');
    setResource(task?.resource ?? '');
    setStart(task?.start ?? '');
    setEnd(task?.end ?? '');
  };

  const createTask = (parentKey: TaskKey = []): Task => {
    newTaskCounterRef.current += 1;
    return {
      id: `new-${newTaskCounterRef.current}`,
      name: name || `New Task ${newTaskCounterRef.current}`,
      resource: resource || 'Unassigned',
      start: start || '2014-01-01',
      end: end || '2014-12-31',
    };
  };

  const firstSelectedRowChangedListener = (event: FirstSelectedRowChangedEvent) => {
    const itemContext = event.detail.value;
    setFirstSelected(itemContext as FirstSelectedRow);
    setSelectedTask(itemContext?.data ?? null);
    setSelectedKey((itemContext?.key as TaskKey | undefined) ?? null);
    setFormFromTask(itemContext?.data ?? null);
  };

  const addSibling = () => {
    if (!selectedKey) {
      return;
    }

    const parentKey = selectedKey.slice(0, -1);
    const task = createTask(parentKey);
    const key = [...parentKey, task.id];
    bufferingDataProvider.addItem({ metadata: { key }, data: task }, { addAfterKey: selectedKey });
    refreshBufferSummary();
  };

  const addChild = () => {
    if (!selectedKey) {
      return;
    }

    const task = createTask(selectedKey);
    const key = [...selectedKey, task.id];
    bufferingDataProvider.addItem({ metadata: { key }, data: task });
    refreshBufferSummary();
  };

  const updateRow = () => {
    if (!selectedKey || !selectedTask) {
      return;
    }

    const updatedTask: Task = {
      ...selectedTask,
      name,
      resource,
      start,
      end,
    };

    bufferingDataProvider.updateItem({ metadata: { key: selectedKey }, data: updatedTask });
    setSelectedTask(updatedTask);
    refreshBufferSummary();
  };

  const removeRow = () => {
    if (!selectedKey || !selectedTask) {
      return;
    }

    bufferingDataProvider.removeItem({ metadata: { key: selectedKey }, data: selectedTask });
    setFirstSelected(undefined);
    setSelectedTask(null);
    setSelectedKey(null);
    setFormFromTask(null);
    refreshBufferSummary();
  };

  const resetRows = () => {
    bufferingDataProvider.resetAllUnsubmittedItems();
    refreshBufferSummary();
  };

  const submitRows = () => {
    const editItems = bufferingDataProvider.getSubmittableItems();

    editItems.forEach((editItem) => {
      bufferingDataProvider.setItemStatus(editItem, 'submitting');
      dataRef.current = applyEdit(dataRef.current, editItem);
      mutableTreeDataProvider.data = dataRef.current;
      bufferingDataProvider.setItemStatus(editItem, 'submitted');
    });

    setDataVersion((value) => value + 1);
    refreshBufferSummary();
  };

  const renderRowTemplate = (row: ojTable.RowTemplateContext<TaskKey, Task>) => (
    <tr>
      <td>
        <oj-row-expander data-oj-clickthrough="disabled" context={row} />
        <span>{row.item.data.name}</span>
      </td>
      <td>
        <span>{row.item.data.resource}</span>
      </td>
      <td>
        <span>{row.item.data.start}</span>
      </td>
      <td>
        <span>{row.item.data.end}</span>
      </td>
    </tr>
  );

  const hasSelection = selectedKey !== null;
  const hasBufferedChanges = bufferSummary.length > 0;

  return (
    <div id="tableDemo">
      <div class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x">
        <div class="oj-flex-item oj-sm-4">
          <div class="oj-panel oj-bg-neutral-30">
            <h6 id="h1" class="oj-typography-subheading-xs">
              Options To Control The Mutations Below
            </h6>
            <oj-form-layout maxColumns={1}>
              <oj-input-text
                id="taskNameInput"
                labelHint="Task Name"
                value={name}
                onvalueChanged={(event: InputTextChangedEvent) => setName(event.detail.value ?? '')}
              />
              <oj-input-text
                id="resourceInput"
                labelHint="Resource"
                value={resource}
                onvalueChanged={(event: InputTextChangedEvent) => setResource(event.detail.value ?? '')}
              />
              <oj-input-date
                id="startInput"
                labelHint="Start Date"
                value={start}
                onvalueChanged={(event: InputDateChangedEvent) => setStart(event.detail.value ?? '')}
              />
              <oj-input-date
                id="endInput"
                labelHint="End Date"
                value={end}
                onvalueChanged={(event: InputDateChangedEvent) => setEnd(event.detail.value ?? '')}
              />
            </oj-form-layout>
            <oj-toolbar chroming="outlined">
              <oj-button id="addSiblingButton" onojAction={addSibling} disabled={!hasSelection}>
                Add Sibling
              </oj-button>
              <oj-button id="addChildButton" onojAction={addChild} disabled={!hasSelection}>
                Add Child
              </oj-button>
              <oj-button id="updateButton" onojAction={updateRow} disabled={!hasSelection}>
                Update
              </oj-button>
              <oj-button id="removeButton" onojAction={removeRow} disabled={!hasSelection}>
                Remove
              </oj-button>
            </oj-toolbar>
          </div>
        </div>
        <div class="oj-flex-item">
          <oj-table
            id="table"
            aria-label="Tree Table Mutation Demo"
            class="demo-table-container"
            data={dataProvider}
            columns={columns}
            firstSelectedRow={firstSelected}
            onfirstSelectedRowChanged={firstSelectedRowChangedListener}
            selectionMode={{ row: 'single' }}
            layout="fixed"
            {...ojTableProps}
          >
            <template slot="rowTemplate" render={renderRowTemplate} />
          </oj-table>
          <oj-toolbar chroming="outlined" class="oj-sm-margin-2x-top">
            <oj-button id="resetButton" onojAction={resetRows} disabled={!hasBufferedChanges}>
              Reset Changes
            </oj-button>
            <oj-button id="submitButton" onojAction={submitRows} disabled={!hasBufferedChanges}>
              Submit Changes
            </oj-button>
          </oj-toolbar>
        </div>
      </div>
      <div class="oj-sm-margin-4x-top">
        <oj-label for="bufferContent">Buffered Changes:</oj-label>
        <oj-text-area
          id="bufferContent"
          rows={8}
          readonly={true}
          class="demo-table-textarea"
          value={bufferSummary}
        />
      </div>
    </div>
  );
};

export default BufferingTreeDataProviderTableRowExpanderMutations;
