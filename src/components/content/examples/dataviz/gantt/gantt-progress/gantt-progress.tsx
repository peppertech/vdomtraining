import 'css!./demo.css';
import 'oj-c/checkboxset';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/progress/depData.json';
import * as taskDataText from 'text!../data/cookbook/dataVisualizations/gantt/progress/taskData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type CheckboxsetProps = ComponentProps<'oj-c-checkboxset'>;
type CheckboxsetValue = NonNullable<CheckboxsetProps['value']>;
type CheckboxsetOption = Extract<CheckboxsetProps['options'], readonly unknown[] | unknown[]>[number];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps['onvalueChanged']>>[0];

type ProgressTaskData = {
  id: string;
  project: string;
  begin: string;
  finish: string;
  name: string;
  type?: GanttTaskProps['type'];
  progress?: number;
  plannedStart?: string;
  plannedFinish?: string;
};

type ProgressDependencyData = {
  id: string;
  predecessor: string;
  successor: string;
  relation?: ComponentProps<'oj-gantt-dependency'>['type'];
};

type TaskTemplateContext = {
  data: ProgressTaskData;
};

type DependencyTemplateContext = {
  data: ProgressDependencyData;
};

type RowTemplateContext = {
  id: string;
};

const taskData = JSON.parse(taskDataText as string) as ProgressTaskData[];
const depData = JSON.parse(depDataText as string) as ProgressDependencyData[];

const taskElementOptions: CheckboxsetOption[] = [
  { value: 'progress', label: 'Progress' },
  { value: 'baseline', label: 'Baseline' }
];

export const GanttProgress = () => {
  const [selectedOptions, setSelectedOptions] = useState<CheckboxsetValue>(['progress']);
  const showProgress = selectedOptions.includes('progress');
  const showBaseline = selectedOptions.includes('baseline');
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2016-01-01T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2016-08-31T00:00:00.000Z').toISOString(),
    []
  );
  const preppedTaskData = useMemo(
    () =>
      taskData.map((task) => ({
        id: task.id,
        project: task.project,
        begin: task.begin,
        finish: task.finish,
        name: task.name,
        type: task.type,
        progress: showProgress ? task.progress : undefined,
        plannedStart: showBaseline ? task.plannedStart : undefined,
        plannedFinish: showBaseline ? task.plannedFinish : undefined
      })),
    [showBaseline, showProgress]
  );
  const dependencyDataProvider = useMemo(
    () =>
      new ArrayDataProvider<ProgressDependencyData['id'], ProgressDependencyData>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const taskDataProvider = useMemo(
    () =>
      new ArrayDataProvider<ProgressTaskData['id'], ProgressTaskData>(preppedTaskData, {
        keyAttributes: 'id'
      }),
    [preppedTaskData]
  );
  const gridlines: GanttProps['gridlines'] = { horizontal: 'visible', vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, rowAxis, majorAxis, minorAxis };

  const rowTemplateRenderer = (row: RowTemplateContext) => {
    return <oj-gantt-row label={row.id} />;
  };

  const taskTemplateRenderer = (task: TaskTemplateContext) => {
    const progress: GanttTaskProps['progress'] =
      task.data.progress == null ? undefined : { value: task.data.progress };
    const baseline: GanttTaskProps['baseline'] =
      task.data.plannedStart && task.data.plannedFinish
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
        rowId={task.data.project}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        type={task.data.type}
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

  const handleTaskElementChanged = (event: CheckboxsetValueChangedEvent) => {
    setSelectedOptions((event.detail.value ?? []) as CheckboxsetValue);
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="gantt-progress-options" class="oj-typography-subheading-md">
          Task Elements
        </h2>
        <div class="oj-flex oj-sm-gap-4">
          <oj-c-checkboxset
            aria-labelledby="gantt-progress-options"
            direction="row"
            labelEdge="none"
            options={taskElementOptions}
            value={selectedOptions}
            onvalueChanged={handleTaskElementChanged}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Project Gantt"
        animationOnDataChange="auto"
        start={projectStartDate}
        end={projectEndDate}
        taskData={taskDataProvider}
        dependencyData={dependencyDataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowTemplate" render={rowTemplateRenderer} />
        <template slot="taskTemplate" render={taskTemplateRenderer} />
        <template slot="dependencyTemplate" render={dependencyTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttProgress;
