import 'css!./demo.css';
import 'oj-c/checkboxset';
import 'oj-c/input-text';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/valueFormats/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type CheckboxsetProps = ComponentProps<'oj-c-checkboxset'>;
type CheckboxsetValue = NonNullable<CheckboxsetProps['value']>;
type CheckboxsetOption = Extract<CheckboxsetProps['options'], readonly unknown[] | unknown[]>[number];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps['onvalueChanged']>>[0];

type ValueFormatTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  attributeDesc?: string;
  progress?: number;
  plannedStart?: string;
  plannedFinish?: string;
  downtimeBegin?: string;
  downtimeFinish?: string;
  overtimeBegin?: string;
  overtimeFinish?: string;
};

type ValueFormatRow = {
  resource: string;
  tasks: ValueFormatTask[];
};

type RowMappingTemplateContext = {
  data: ValueFormatRow;
};

type TaskMappingTemplateContext = {
  data: ValueFormatTask;
};

const rowData = JSON.parse(rowDataText as string) as ValueFormatRow[];

const tooltipOptions: CheckboxsetOption[] = [
  { value: 'attribute', label: 'Show attribute' },
  { value: 'progress', label: 'Show progress' }
];

export const GanttValueFormats = () => {
  const [rowLabel, setRowLabel] = useState('Employee');
  const [startLabel, setStartLabel] = useState('Actual Start');
  const [endLabel, setEndLabel] = useState('Actual End');
  const [progressLabel, setProgressLabel] = useState('Completed');
  const [selectedOptions, setSelectedOptions] = useState<CheckboxsetValue>([
    'attribute',
    'progress'
  ]);
  const showAttribute = selectedOptions.includes('attribute');
  const showProgress = selectedOptions.includes('progress');
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ValueFormatRow['resource'], ValueFormatRow>(rowData, {
        keyAttributes: 'resource'
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
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'short'
      }),
    []
  );
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
  const valueFormats: GanttProps['valueFormats'] = {
    row: {
      tooltipDisplay: 'auto',
      tooltipLabel: rowLabel
    },
    start: {
      tooltipDisplay: 'auto',
      tooltipLabel: startLabel,
      converter: dateConverter
    },
    end: {
      tooltipDisplay: 'auto',
      tooltipLabel: endLabel,
      converter: dateConverter
    },
    attribute: {
      tooltipDisplay: showAttribute ? 'auto' : 'off',
      tooltipLabel: 'Attribute'
    },
    progress: {
      tooltipDisplay: showProgress ? 'auto' : 'off',
      tooltipLabel: progressLabel
    }
  };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis,
    valueFormats
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.resource} tasks={row.data.tasks} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    const attribute: GanttTaskProps['attribute'] = {
      rendered: showAttribute ? 'on' : 'off',
      shortDesc: task.data.attributeDesc
    };
    const progress: GanttTaskProps['progress'] =
      showProgress && task.data.progress != null ? { value: task.data.progress } : undefined;
    const baseline: GanttTaskProps['baseline'] =
      task.data.plannedStart && task.data.plannedFinish
        ? {
            start: task.data.plannedStart,
            end: task.data.plannedFinish
          }
        : undefined;
    const downtime: GanttTaskProps['downtime'] =
      task.data.downtimeBegin && task.data.downtimeFinish
        ? {
            start: task.data.downtimeBegin,
            end: task.data.downtimeFinish
          }
        : undefined;
    const overtime: GanttTaskProps['overtime'] =
      task.data.overtimeBegin && task.data.overtimeFinish
        ? {
            start: task.data.overtimeBegin,
            end: task.data.overtimeFinish
          }
        : undefined;
    const taskProps: Partial<GanttTaskProps> = {
      attribute,
      progress,
      baseline,
      downtime,
      overtime
    };

    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        {...taskProps}
      />
    );
  };

  const handleRowLabelChanged = (event: InputTextValueChangedEvent) => {
    setRowLabel(event.detail.value ?? '');
  };

  const handleStartLabelChanged = (event: InputTextValueChangedEvent) => {
    setStartLabel(event.detail.value ?? '');
  };

  const handleEndLabelChanged = (event: InputTextValueChangedEvent) => {
    setEndLabel(event.detail.value ?? '');
  };

  const handleProgressLabelChanged = (event: InputTextValueChangedEvent) => {
    setProgressLabel(event.detail.value ?? '');
  };

  const handleTooltipOptionsChanged = (event: CheckboxsetValueChangedEvent) => {
    setSelectedOptions((event.detail.value ?? []) as CheckboxsetValue);
  };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="value-format-options" class="oj-typography-subheading-md">
          Tooltip Label Options
        </h2>
        <div class="oj-flex oj-sm-gap-4 oj-sm-flex-wrap-wrap">
          <oj-c-input-text labelHint="Row label" value={rowLabel} onvalueChanged={handleRowLabelChanged} />
          <oj-c-input-text
            labelHint="Start label"
            value={startLabel}
            onvalueChanged={handleStartLabelChanged}
          />
          <oj-c-input-text labelHint="End label" value={endLabel} onvalueChanged={handleEndLabelChanged} />
          <oj-c-input-text
            labelHint="Progress label"
            value={progressLabel}
            onvalueChanged={handleProgressLabelChanged}
          />
          <oj-c-checkboxset
            aria-labelledby="value-format-options"
            direction="row"
            labelEdge="none"
            options={tooltipOptions}
            value={selectedOptions}
            onvalueChanged={handleTooltipOptionsChanged}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Value Formats"
        start={projectStartDate}
        end={projectEndDate}
        selectionMode="single"
        rowData={dataProvider}
        class="demo-gantt oj-helper-inline-block"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttValueFormats;
