import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/selection/rowData.json';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/selection/depData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojgantt';
import 'oj-c/input-text';
import 'oj-c/radioset';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type GanttSelectionMode = NonNullable<GanttProps['selectionMode']>;
type GanttDragMode = NonNullable<GanttProps['dragMode']>;
type RadiosetProps = ComponentProps<'oj-c-radioset'>;
type RadiosetOption = Extract<RadiosetProps['options'], readonly unknown[] | unknown[]>[number];
type RadiosetValueChangedEvent = Parameters<NonNullable<RadiosetProps['onvalueChanged']>>[0];
type InputTextProps = ComponentProps<'oj-c-input-text'>;
type InputTextValueChangedEvent = Parameters<NonNullable<InputTextProps['onvalueChanged']>>[0];

type SelectionTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  progress?: number;
  labelPosition?: GanttTaskProps['labelPosition'];
  type?: GanttTaskProps['type'];
};

type SelectionRow = {
  project: string;
  tasks: SelectionTask[];
};

type SelectionDependency = {
  id: string;
  predecessor: string;
  successor: string;
  relation?: ComponentProps<'oj-gantt-dependency'>['type'];
};

type RowMappingTemplateContext = {
  data: SelectionRow;
};

type TaskMappingTemplateContext = {
  data: SelectionTask;
};

type DependencyTemplateContext = {
  data: SelectionDependency;
};

const rowData = JSON.parse(rowDataText as string) as SelectionRow[];
const depData = JSON.parse(depDataText as string) as SelectionDependency[];

const selectionModeOptions: RadiosetOption[] = [
  { value: 'none', label: 'None' },
  { value: 'single', label: 'Single' },
  { value: 'multiple', label: 'Multiple' }
];

const dragModeOptions: RadiosetOption[] = [
  { value: 'pan', label: 'Pan' },
  { value: 'select', label: 'Select' }
];

export const GanttSelection = () => {
  const [dragModeValue, setDragModeValue] = useState<GanttDragMode>('pan');
  const [selectionMode, setSelectionMode] = useState<GanttSelectionMode>('multiple');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>(['design', 'pm1']);
  const dependencyDataProvider = useMemo(
    () =>
      new ArrayDataProvider<SelectionDependency['id'], SelectionDependency>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider<SelectionRow['project'], SelectionRow>(rowData, {
        keyAttributes: 'project'
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2016-01-01T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2016-12-31T00:00:00.000Z').toISOString(),
    []
  );
  const effectiveSelection = selectionMode === 'none' ? [] : selectedTaskIds;
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return (
      <oj-gantt-row
        tasks={row.data.tasks}
        label={row.data.project}
        labelStyle={row.data.tasks[0]?.type === 'summary' ? { fontWeight: 'bold' } : {}}
      />
    );
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    const progress: GanttTaskProps['progress'] =
      task.data.progress == null ? undefined : { value: task.data.progress };
    const taskProps: Partial<GanttTaskProps> = { progress };

    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        labelPosition={task.data.labelPosition ?? 'end'}
        {...taskProps}
      />
    );
  };

  const dependencyTemplateRenderer = (dependency: DependencyTemplateContext) => {
    return (
      <oj-gantt-dependency
        predecessorTaskId={dependency.data.predecessor}
        successorTaskId={dependency.data.successor}
        type={dependency.data.relation}
      />
    );
  };

  const handleSelectionModeChanged = (event: RadiosetValueChangedEvent) => {
    setSelectionMode((event.detail.value ?? 'multiple') as GanttSelectionMode);
  };

  const handleDragModeChanged = (event: RadiosetValueChangedEvent) => {
    setDragModeValue((event.detail.value ?? 'pan') as GanttDragMode);
  };

  const handleSelectedTasksChanged = (event: InputTextValueChangedEvent) => {
    const value = event.detail.value ?? '';
    setSelectedTaskIds(
      value
        .split(',')
        .map((item: string) => item.trim())
        .filter(Boolean)
    );
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 class="oj-typography-subheading-md">Selection Controls</h2>
        <div class="oj-flex oj-sm-gap-4 oj-sm-flex-wrap-wrap">
          <oj-c-radioset
            direction="row"
            labelHint="Selection mode"
            options={selectionModeOptions}
            value={selectionMode}
            onvalueChanged={handleSelectionModeChanged}
          />
          <oj-c-radioset
            direction="row"
            labelHint="Drag mode"
            options={dragModeOptions}
            value={dragModeValue}
            onvalueChanged={handleDragModeChanged}
          />
          <oj-c-input-text
            labelHint="Selected tasks"
            value={selectedTaskIds.join(', ')}
            onvalueChanged={handleSelectedTasksChanged}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Project Gantt"
        dragMode={dragModeValue}
        start={projectStartDate}
        end={projectEndDate}
        selection={effectiveSelection}
        selectionMode={selectionMode}
        rowData={rowDataProvider}
        dependencyData={dependencyDataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
        <template slot="dependencyTemplate" render={dependencyTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttSelection;
