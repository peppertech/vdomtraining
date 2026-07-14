import 'css!./demo.css';
import 'oj-c/input-number';
import 'oj-c/radioset';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/taskManipulate/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type DragMode = NonNullable<GanttProps['dragMode']>;
type RadiosetProps = ComponentProps<'oj-c-radioset'>;
type RadiosetOption = Extract<RadiosetProps['options'], readonly unknown[] | unknown[]>[number];
type RadiosetValueChangedEvent = Parameters<NonNullable<RadiosetProps['onvalueChanged']>>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];

type ManipulateTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  user: string;
};

type ManipulateRow = {
  resource: string;
  tasks: ManipulateTask[];
};

type RowMappingTemplateContext = {
  data: ManipulateRow;
};

type TaskMappingTemplateContext = {
  data: ManipulateTask;
};

const rowData = JSON.parse(rowDataText as string) as ManipulateRow[];

const dragModeOptions: RadiosetOption[] = [
  { value: 'pan', label: 'Pan' },
  { value: 'select', label: 'Select' }
];

export const GanttTaskManipulate = () => {
  const [dragModeValue, setDragModeValue] = useState<DragMode>('pan');
  const [offsetHours, setOffsetHours] = useState<number>(0);
  const shiftedRows = useMemo(
    () =>
      rowData.map((row) => ({
        resource: row.resource,
        tasks: row.tasks.map((task) => ({
          id: task.id,
          name: task.name,
          user: task.user,
          begin: new Date(new Date(task.begin).getTime() + offsetHours * 60 * 60 * 1000).toISOString(),
          finish: new Date(new Date(task.finish).getTime() + offsetHours * 60 * 60 * 1000).toISOString()
        }))
      })),
    [offsetHours]
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ManipulateRow['resource'], ManipulateRow>(shiftedRows, {
        keyAttributes: 'resource'
      }),
    [shiftedRows]
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'days',
    zoomOrder: ['months', 'weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'hours',
    zoomOrder: ['weeks', 'days', 'hours', 'minutes']
  };
  const dnd: GanttProps['dnd'] = { move: { tasks: 'enabled' } };
  const taskDefaults: GanttProps['taskDefaults'] = {
    resizable: 'enabled',
    labelPosition: 'innerCenter',
    borderRadius: '5',
    height: 50
  };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis,
    dnd,
    taskDefaults
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.resource} tasks={row.data.tasks} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={`${task.data.name}: ${task.data.user}`}
      />
    );
  };

  const handleDragModeChanged = (event: RadiosetValueChangedEvent) => {
    setDragModeValue((event.detail.value ?? 'pan') as DragMode);
  };

  const handleOffsetHoursChanged = (event: InputNumberValueChangedEvent) => {
    setOffsetHours(event.detail.value ?? 0);
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 class="oj-typography-subheading-md">Schedule Controls</h2>
        <div class="oj-flex oj-sm-gap-4 oj-sm-flex-wrap-wrap">
          <oj-c-radioset
            direction="row"
            labelHint="Drag mode"
            options={dragModeOptions}
            value={dragModeValue}
            onvalueChanged={handleDragModeChanged}
          />
          <oj-c-input-number
            labelHint="Shift all tasks by hours"
            value={offsetHours}
            onvalueChanged={handleOffsetHoursChanged}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Gantt with draggable tasks"
        dragMode={dragModeValue}
        start="2021-01-04T07:00:00.000Z"
        end="2021-01-06T18:00:00.000Z"
        viewportStart="2021-01-04T07:00:00.000Z"
        viewportEnd="2021-01-05T01:00:00.000Z"
        rowData={dataProvider}
        selectionMode="multiple"
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttTaskManipulate;
