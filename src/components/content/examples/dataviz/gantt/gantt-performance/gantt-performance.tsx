import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojgantt';
import 'oj-c/button';
import 'oj-c/checkboxset';
import 'oj-c/input-number';
import 'oj-c/radioset';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type CheckboxsetProps = ComponentProps<'oj-c-checkboxset'>;
type CheckboxsetValue = NonNullable<CheckboxsetProps['value']>;
type CheckboxsetOption = Extract<CheckboxsetProps['options'], readonly unknown[] | unknown[]>[number];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps['onvalueChanged']>>[0];
type RadiosetProps = ComponentProps<'oj-c-radioset'>;
type RadiosetOption = Extract<RadiosetProps['options'], readonly unknown[] | unknown[]>[number];
type RadiosetValueChangedEvent = Parameters<NonNullable<RadiosetProps['onvalueChanged']>>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type TaskVariation = 'bar' | 'milestone';

type PerfTask = {
  taskId: string;
  start: string;
  end: string;
  label: string;
  labelPosition: GanttTaskProps['labelPosition'];
  progress?: GanttTaskProps['progress'];
  baseline?: GanttTaskProps['baseline'];
};

type PerfRow = {
  id: string;
  label: string;
  tasks: PerfTask[];
};

type RowMappingTemplateContext = {
  data: PerfRow;
};

type TaskMappingTemplateContext = {
  data: PerfTask;
};

const performanceOptions: CheckboxsetOption[] = [
  { value: 'progress', label: 'Show progress' },
  { value: 'baseline', label: 'Show baseline' }
];

const variationOptions: RadiosetOption[] = [
  { value: 'bar', label: 'Bar' },
  { value: 'milestone', label: 'Milestone' }
];

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateRandomData = (
  numRows: number,
  numTasksPerRow: number,
  variation: TaskVariation,
  showProgress: boolean,
  showBaseline: boolean
): PerfRow[] => {
  const week = 7 * 24 * 60 * 60 * 1000;
  return Array.from({ length: numRows }, (_, rowIndex) => ({
    id: `row_${rowIndex + 1}`,
    label: `Row ${rowIndex + 1}`,
    tasks: Array.from({ length: numTasksPerRow }, (_, taskIndex) => {
      const start = randomDate(new Date(Date.UTC(2016, 0, 1)), new Date(Date.UTC(2016, 11, 20)));
      const end = variation === 'milestone' ? start : randomDate(start, new Date(start.getTime() + week));
      return {
        taskId: `task_${rowIndex + 1}_${taskIndex + 1}`,
        start: start.toISOString(),
        end: end.toISOString(),
        label: `Task ${rowIndex + 1}-${taskIndex + 1}`,
        labelPosition: 'end',
        progress: showProgress ? { value: Math.random() } : undefined,
        baseline: showBaseline
          ? { start: start.toISOString(), end: end.toISOString() }
          : undefined
      };
    })
  }));
};

export const GanttPerformance = () => {
  const [numTasksPerRow, setNumTasksPerRow] = useState<number>(10);
  const [numRows, setNumRows] = useState<number>(100);
  const [taskVariation, setTaskVariation] = useState<TaskVariation>('bar');
  const [selectedOptions, setSelectedOptions] = useState<CheckboxsetValue>(['progress']);
  const showProgress = selectedOptions.includes('progress');
  const showBaseline = selectedOptions.includes('baseline');
  const [data, setData] = useState<PerfRow[]>(() =>
    generateRandomData(100, 10, 'bar', true, false)
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<PerfRow['id'], PerfRow>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2016-01-01T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2016-12-31T00:00:00.000Z').toISOString(),
    []
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days', 'hours']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, rowAxis, majorAxis, minorAxis };

  const regenerateData = () => {
    setData(generateRandomData(numRows, numTasksPerRow, taskVariation, showProgress, showBaseline));
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.label} tasks={row.data.tasks} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.taskId}
        start={task.data.start}
        end={task.data.end}
        label={task.data.label}
        labelPosition={task.data.labelPosition}
        progress={task.data.progress}
        baseline={task.data.baseline}
      />
    );
  };

  const handleNumRowsChanged = (event: InputNumberValueChangedEvent) => {
    setNumRows(Math.max(1, event.detail.value ?? 1));
  };

  const handleTasksPerRowChanged = (event: InputNumberValueChangedEvent) => {
    setNumTasksPerRow(Math.max(1, event.detail.value ?? 1));
  };

  const handleVariationChanged = (event: RadiosetValueChangedEvent) => {
    setTaskVariation((event.detail.value ?? 'bar') as TaskVariation);
  };

  const handleOptionsChanged = (event: CheckboxsetValueChangedEvent) => {
    setSelectedOptions((event.detail.value ?? []) as CheckboxsetValue);
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="performance-options" class="oj-typography-subheading-md">
          Performance Demo Controls
        </h2>
        <div class="oj-flex oj-sm-gap-4 oj-sm-flex-wrap-wrap oj-sm-align-items-center">
          <oj-c-input-number
            labelHint="Rows"
            min={1}
            step={10}
            value={numRows}
            onvalueChanged={handleNumRowsChanged}
          />
          <oj-c-input-number
            labelHint="Tasks per row"
            min={1}
            step={1}
            value={numTasksPerRow}
            onvalueChanged={handleTasksPerRowChanged}
          />
          <oj-c-radioset
            direction="row"
            labelHint="Variation"
            options={variationOptions}
            value={taskVariation}
            onvalueChanged={handleVariationChanged}
          />
          <oj-c-checkboxset
            aria-labelledby="performance-options"
            direction="row"
            labelEdge="none"
            options={performanceOptions}
            value={selectedOptions}
            onvalueChanged={handleOptionsChanged}
          />
          <oj-c-button label="Regenerate Data" onojAction={regenerateData} />
        </div>
      </div>
      <oj-gantt
        id="gantt1"
        aria-label="Performance Demo"
        start={projectStartDate}
        end={projectEndDate}
        selectionMode="single"
        rowData={dataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttPerformance;
