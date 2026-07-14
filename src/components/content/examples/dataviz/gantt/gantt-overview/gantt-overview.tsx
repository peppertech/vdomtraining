import "css!./demo.css";
import 'oj-c/checkboxset';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/overview/depData.json';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/overview/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<ComponentProps<'oj-gantt'>['end']>;
type GanttReferenceObjects = NonNullable<GanttProps['referenceObjects']>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type CheckboxsetProps = ComponentProps<'oj-c-checkboxset'>;
type CheckboxsetValue = NonNullable<CheckboxsetProps['value']>;
type CheckboxsetOption = Extract<CheckboxsetProps['options'], readonly unknown[] | unknown[]>[number];
type CheckboxsetValueChangedEvent = Parameters<NonNullable<CheckboxsetProps['onvalueChanged']>>[0];
type GanttOverviewOption = 'attribute' | 'overtime' | 'downtime';
type OverviewReferenceObject = NonNullable<GanttReferenceObjects[number]>;
type OverviewTask = {
  id: string;
  start: string;
  end: string;
  svgClassName?: string;
  attributeDesc?: string;
  downtimeStart?: string;
  downtimeEnd?: string;
  overtimeStart?: string;
  overtimeEnd?: string;
};
type OverviewRow = {
  id: string;
  label: string;
  tasks: OverviewTask[];
  referenceObjects?: OverviewReferenceObject[];
  rows?: OverviewRow[];
};
type OverviewDependency = {
  id: string;
  predecessor: string;
  successor: string;
};
type RowMappingTemplateContext = {
  data: OverviewRow;
};
type TaskMappingTemplateContext = {
  data: OverviewTask;
};
type DependencyTemplateContext = {
  data: OverviewDependency;
};

const rowData = JSON.parse(rowDataText as string) as OverviewRow[];
const depData = JSON.parse(depDataText as string) as OverviewDependency[];
const displayOptions: CheckboxsetOption[] = [
  { value: 'attribute', label: 'Show attribute' },
  { value: 'overtime', label: 'Show overtime' },
  { value: 'downtime', label: 'Show downtime' }
];

export const GanttOverview = () => {
  const [selectedOptions, setSelectedOptions] = useState<CheckboxsetValue>([
    'attribute',
    'overtime',
    'downtime'
  ]);
  const projectStartDate = useMemo<GanttStart>(() => new Date('2020-10-01T00:00:00.000Z').toISOString(), []);
  const projectEndDate = useMemo<GanttEnd>(() => new Date('2020-10-31T04:00:00.000Z').toISOString(), []);
  const viewportStart = useMemo<GanttStart>(() => new Date('2020-10-01T00:00:00.000Z').toISOString(), []);
  const viewportEnd = useMemo<GanttEnd>(() => new Date('2020-10-08T00:00:00.000Z').toISOString(), []);
  const dataProvider = useMemo(() => new ArrayTreeDataProvider<OverviewRow['id'], OverviewRow>(rowData, {
    childrenAttribute: 'rows',
    keyAttributes: 'id'
  }), []);
  const dependenciesDataProvider = useMemo(() => new ArrayDataProvider<OverviewDependency['id'], OverviewDependency>(depData, {
    keyAttributes: 'id'
  }), []);
  const dateConverter = useMemo(() => new IntlDateTimeConverter({
    formatType: 'datetime',
    dateFormat: 'medium',
    timeFormat: 'short'
  }), []);
  const currentDate = '2020-10-04T12:00:00.000Z';
  const currentDateFormatted = dateConverter.format(currentDate) ?? currentDate;
  const referenceObjects = useMemo<GanttReferenceObjects>(() => [{ value: currentDate }], []);
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = {
    rendered: 'on',
    width: '210px'
  };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'days',
    converter: { days: dateConverter }
  };
  const minorAxis: GanttProps['minorAxis'] = { scale: 'hours' };
  const showAttribute = selectedOptions.includes('attribute');
  const showOvertime = selectedOptions.includes('overtime');
  const showDowntime = selectedOptions.includes('downtime');
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row referenceObjects={row.data.referenceObjects} tasks={row.data.tasks} label={row.data.label} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    const attribute: GanttTaskProps['attribute'] = {
      rendered: !showAttribute || task.data.svgClassName === 'demo-gantt-task-hold' ? 'off' : 'on',
      shortDesc: task.data.attributeDesc
    };
    const downtime: GanttTaskProps['downtime'] = showDowntime
      ? {
          start: task.data.downtimeStart,
          end: task.data.downtimeEnd
        }
      : undefined;
    const overtime: GanttTaskProps['overtime'] = showOvertime
      ? {
          start: task.data.overtimeStart,
          end: task.data.overtimeEnd
        }
      : undefined;
    const taskHeight: GanttTaskProps['height'] = task.data.svgClassName === 'demo-gantt-task-hold' ? 12 : undefined;
    const taskBorderRadius: GanttTaskProps['borderRadius'] = task.data.svgClassName === 'demo-gantt-task-hold' ? '0' : undefined;
    const taskProps: Partial<GanttTaskProps> = {
      attribute,
      downtime,
      overtime
    };

    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.start}
        end={task.data.end}
        height={taskHeight}
        borderRadius={taskBorderRadius}
        svgClassName={task.data.svgClassName}
        {...taskProps}
      />
    );
  };

  const dependencyTemplateRenderer = (dependency: DependencyTemplateContext) => {
    return <oj-gantt-dependency predecessorTaskId={dependency.data.predecessor} successorTaskId={dependency.data.successor} />;
  };
  const handleDisplayOptionsChanged = (event: CheckboxsetValueChangedEvent) => {
    setSelectedOptions((event.detail.value ?? []) as CheckboxsetValue);
  };

  return (
    <div id="container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Gantt Below</h2>
        <div class="oj-flex oj-sm-gap-4 oj-sm-flex-wrap-wrap">
          <oj-c-checkboxset
            aria-labelledby="h1"
            direction="row"
            labelEdge="none"
            options={displayOptions}
            value={selectedOptions}
            onvalueChanged={handleDisplayOptionsChanged}
          />
        </div>
      </div>
      <oj-gantt
        id="gantt"
        start={projectStartDate}
        end={projectEndDate}
        viewportStart={viewportStart}
        viewportEnd={viewportEnd}
        selectionMode="multiple"
        selectionBehavior="highlightDependencies"
        taskAggregation="on"
        dependencyLineShape="straight"
        referenceObjects={referenceObjects}
        rowData={dataProvider}
        dependencyData={dependenciesDataProvider}
        aria-label={`Gantt Chart. Current date is ${currentDateFormatted}`}
        class="demo-gantt"
        {...ganttProps}
      >
        <template
          slot="rowMappingTemplate"
          render={rowMappingTemplateRenderer}
        />
        <template
          slot="taskMappingTemplate"
          render={taskMappingTemplateRenderer}
        />
        <template
          slot="dependencyTemplate"
          render={dependencyTemplateRenderer}
        />
      </oj-gantt>
    </div>
  );
};
export default GanttOverview;
