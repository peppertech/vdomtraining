import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/hierarchicalTasks/rowData.json';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/hierarchicalTasks/depData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojgantt';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'oj-c/checkboxset';
import 'oj-c/radioset';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttExpanded = GanttProps['expanded'];
type GanttReferenceObjects = NonNullable<GanttProps['referenceObjects']>;
type CheckboxsetProps = ComponentProps<'oj-c-checkboxset'>;
type CheckboxsetValue = NonNullable<CheckboxsetProps['value']>;
type CheckboxsetOption = Extract<CheckboxsetProps['options'], readonly unknown[] | unknown[]>[number];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps['onvalueChanged']>>[0];
type RadiosetProps = ComponentProps<'oj-c-radioset'>;
type RadiosetOption = Extract<RadiosetProps['options'], readonly unknown[] | unknown[]>[number];
type RadiosetValueChangedEvent = Parameters<NonNullable<RadiosetProps['onvalueChanged']>>[0];
type ParentRowPosition = 'static' | 'sticky';

type HierarchicalTask = {
  id: string;
  label: string;
  name?: string;
  progress?: number;
  type?: GanttTaskProps['type'];
  start: string;
  end: string;
  plannedStart: string;
  plannedFinish: string;
  finish?: string;
};

type HierarchicalRow = {
  id: string;
  tasks: HierarchicalTask[];
  subTasks?: HierarchicalRow[];
};

type HierarchicalDependency = {
  id: string;
  predecessor: string;
  successor: string;
  type?: ComponentProps<'oj-gantt-dependency'>['type'];
};

type RowMappingTemplateContext = {
  data: HierarchicalRow;
};

type TaskMappingTemplateContext = {
  data: HierarchicalTask;
  rowData: HierarchicalRow;
};

type DependencyTemplateContext = {
  data: HierarchicalDependency;
};

const rowData = JSON.parse(rowDataText as string) as HierarchicalRow[];
const depData = JSON.parse(depDataText as string) as HierarchicalDependency[];

const taskOptions: CheckboxsetOption[] = [
  { value: 'progress', label: 'Progress' },
  { value: 'baseline', label: 'Baseline' }
];

const parentRowPositionOptions: RadiosetOption[] = [
  { value: 'static', label: 'Static' },
  { value: 'sticky', label: 'Sticky' }
];

export const GanttHierarchicalTasks = () => {
  const [taskConfig, setTaskConfig] = useState<CheckboxsetValue>(['progress']);
  const [parentRowPositionValue, setParentRowPositionValue] = useState<ParentRowPosition>('static');
  const projectStartDate = useMemo(() => new Date('2016-01-01T00:00:00.000Z').toISOString(), []);
  const projectEndDate = useMemo(() => new Date('2016-12-31T00:00:00.000Z').toISOString(), []);
  const expanded = useMemo<GanttExpanded>(
    () => new KeySetImpl(['design', 'dev', 'production', 'qa']),
    []
  );
  const tasksDataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<HierarchicalRow['id'], HierarchicalRow>(rowData, {
        keyAttributes: 'id',
        childrenAttribute: 'subTasks'
      }),
    []
  );
  const dependenciesDataProvider = useMemo(
    () =>
      new ArrayDataProvider<HierarchicalDependency['id'], HierarchicalDependency>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const quartersConverter = useMemo(
    () => ({
      format: (date: string) => `Q${Math.floor(new Date(date).getMonth() / 3) + 1}`,
      parse: (value: string) => value
    }),
    []
  );
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const currentDateString = useMemo(() => new Date('2016-06-14T08:00:00.000Z').toISOString(), []);
  const currentDateFormatted = dateConverter.format(currentDateString) ?? '';
  const referenceObjects = useMemo<GanttReferenceObjects>(
    () => [{ value: currentDateString }],
    [currentDateString]
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'quarters',
    zoomOrder: ['quarters', 'months', 'weeks', 'days'],
    converter: { quarters: quartersConverter }
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'months',
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
        label={row.data.tasks[0]?.label}
        labelStyle={row.data.subTasks ? { fontWeight: 'bold' } : {}}
        tasks={row.data.tasks}
      />
    );
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    const progress: GanttTaskProps['progress'] =
      taskConfig.includes('progress') && task.data.progress != null
        ? { value: task.data.progress }
        : undefined;
    const baseline: GanttTaskProps['baseline'] = taskConfig.includes('baseline')
      ? {
          start: task.data.plannedStart,
          end: task.data.plannedFinish
        }
      : undefined;
    const taskProps: Partial<GanttTaskProps> = {
      progress,
      baseline
    };

    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.start}
        end={task.data.end}
        label={task.data.name}
        type={task.rowData.subTasks ? 'summary' : 'auto'}
        {...taskProps}
      />
    );
  };

  const dependencyTemplateRenderer = (dependency: DependencyTemplateContext) => {
    return (
      <oj-gantt-dependency
        predecessorTaskId={dependency.data.predecessor}
        successorTaskId={dependency.data.successor}
        type={dependency.data.type}
      />
    );
  };

  const handleTaskSettings = (event: CheckboxsetValueChangedEvent) => {
    setTaskConfig((event.detail.value ?? []) as CheckboxsetValue);
  };

  const handleParentRowPositionChanged = (event: RadiosetValueChangedEvent) => {
    setParentRowPositionValue((event.detail.value ?? 'static') as ParentRowPosition);
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Gantt Below
        </h2>
        <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4">
          <oj-c-radioset
            direction="row"
            labelHint="Parent row position"
            options={parentRowPositionOptions}
            value={parentRowPositionValue}
            onvalueChanged={handleParentRowPositionChanged}
          />
          <oj-c-checkboxset
            aria-labelledby="h1"
            direction="row"
            labelHint="Task elements to show"
            options={taskOptions}
            value={taskConfig}
            onvalueChanged={handleTaskSettings}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        start={projectStartDate}
        end={projectEndDate}
        selectionMode="single"
        parentRowPosition={parentRowPositionValue}
        referenceObjects={referenceObjects}
        expanded={expanded}
        rowData={tasksDataProvider}
        dependencyData={dependenciesDataProvider}
        aria-label={`Gantt Chart. Current date is ${currentDateFormatted}`}
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

export default GanttHierarchicalTasks;
