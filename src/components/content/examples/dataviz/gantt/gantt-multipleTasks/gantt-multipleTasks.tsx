import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/multipleTasks/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type GanttReferenceObjects = NonNullable<GanttProps['referenceObjects']>;
type CustomScale = {
  name: string;
  labelPosition: 'center';
  formatter: (date: string) => string;
  getNextDate: (date: string) => string;
  getPreviousDate: (date: string) => string;
};

type ShiftTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
};

type ShiftRow = {
  resource: string;
  shifts: ShiftTask[];
};

type RowMappingTemplateContext = {
  data: ShiftRow;
};

type TaskMappingTemplateContext = {
  data: ShiftTask;
};

const rowData = JSON.parse(rowDataText as string) as ShiftRow[];

export const GanttMultipleTasks = () => {
  const hour = 60 * 60 * 1000;
  const converter = useMemo(
    () =>
      new IntlDateTimeConverter({
        hour: '2-digit',
        hour12: true
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2021-01-04T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2021-01-19T00:00:00.000Z').toISOString(),
    []
  );
  const viewportStart = useMemo(() => new Date('2021-01-04T00:00:00.000Z').toISOString(), []);
  const viewportEnd = useMemo(() => new Date('2021-01-11T00:00:00.000Z').toISOString(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ShiftRow['resource'], ShiftRow>(rowData, {
        keyAttributes: 'resource'
      }),
    []
  );
  const currentDateFormatted = converter.format('2021-01-10T08:00:00.000Z') ?? '';
  const referenceObjects = useMemo<GanttReferenceObjects>(
    () => [{ value: '2021-01-10T08:00:00.000Z' }],
    []
  );
  const custom8HrScale = useMemo<CustomScale>(
    () => ({
      name: '8hr',
      labelPosition: 'center',
      formatter: (date: string) => converter.format(date) ?? '',
      getNextDate: (date: string) => new Date(new Date(date).getTime() + 8 * hour).toISOString(),
      getPreviousDate: (date: string) => {
        const current = new Date(date);
        current.setMinutes(0, 0, 0);
        current.setHours(Math.floor(current.getHours() / 8) * 8);
        return current.toISOString();
      }
    }),
    [converter]
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'days',
    zoomOrder: ['weeks', 'days', custom8HrScale, 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: custom8HrScale,
    zoomOrder: ['weeks', 'days', custom8HrScale, 'hours']
  };
  const taskDefaults: GanttProps['taskDefaults'] = { labelPosition: 'end' };
  const ganttProps: Partial<GanttProps> = { gridlines, rowAxis, majorAxis, minorAxis, taskDefaults };

  const getSvgClassName = (name: string) => {
    if (name.includes('Night')) {
      return 'demo-gantt-task-emphasis-low';
    }
    if (name.includes('Evening')) {
      return 'demo-gantt-task-emphasis-high';
    }
    return 'demo-gantt-task';
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row tasks={row.data.shifts} label={row.data.resource} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        svgClassName={getSvgClassName(task.data.name)}
      />
    );
  };

  return (
    <oj-gantt
      id="gantt"
      start={projectStartDate}
      end={projectEndDate}
      selectionMode="single"
      referenceObjects={referenceObjects}
      viewportStart={viewportStart}
      viewportEnd={viewportEnd}
      rowData={dataProvider}
      aria-label={`Gantt Chart. Current date is ${currentDateFormatted}`}
      class="demo-gantt"
      {...ganttProps}
    >
      <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
      <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
    </oj-gantt>
  );
};

export default GanttMultipleTasks;
