import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import { ojGantt } from 'ojs/ojgantt';
import 'ojs/ojgauge';
import { ojStatusMeterGauge } from 'ojs/ojgauge';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/gantt/tooltipTemplate/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = GanttProps['start'];
type GanttEnd = GanttProps['end'];

type Task = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  progressValue: number;
};

type GanttRowData = {
  resource: string;
  tasks: Task[];
};

type RowMappingTemplateContext = {
  data: GanttRowData;
};

type TaskMappingTemplateContext = {
  data: Task;
  rowData: {
    label: string;
  };
};

const data = JSON.parse(dataText as string) as GanttRowData[];

export const GanttTooltip = () => {
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<GanttRowData['resource'], GanttRowData>(data, {
        keyAttributes: 'resource'
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(() => new Date('Jan 3, 2021').toISOString(), []);
  const projectEndDate = useMemo<GanttEnd>(() => new Date('Jan 12, 2021').toISOString(), []);
  const tooltipElements = useMemo(() => {
    const tooltipElem = document.createElement('div');
    const textDiv = document.createElement('div');
    const assignmentText = document.createElement('span');
    const startTimeText = document.createElement('span');
    const endTimeText = document.createElement('span');
    const gauge = document.createElement('oj-status-meter-gauge') as ojStatusMeterGauge;
    return { tooltipElem, textDiv, assignmentText, startTimeText, endTimeText, gauge };
  }, []);

  const getShortDesc = (task: Task, resource: string) => {
    const assignmentString = `Assigned to ${resource}`;
    const startTimeString = `Start Date is ${dateConverter.format(task.begin)}`;
    const endTimeString = `End Date is ${dateConverter.format(task.finish)}`;
    const progressString = `Progress is ${task.progressValue}`;
    return `${assignmentString}, ${startTimeString}, ${endTimeString}, ${progressString}`;
  };

  const getSvgClassName = (taskName: string) => {
    switch (taskName) {
      case 'Day Shift':
        return 'demo-dayshift-taskbar';
      case 'Night Shift':
        return 'demo-nightshift-taskbar';
      case 'Evening Shift':
        return 'demo-eveningshift-taskbar';
      default:
        return '';
    }
  };

  const tooltipFunction = (dataContext: ojGantt.TooltipContext<Task['id'], Task>) => {
    const { tooltipElem, textDiv, assignmentText, startTimeText, endTimeText, gauge } = tooltipElements;
    (dataContext.parentElement as HTMLElement).style.borderWidth = '4px';
    assignmentText.textContent = `Assigned: ${dataContext.rowData.label}`;
    startTimeText.textContent = `Start Date: ${dateConverter.format(dataContext.itemData.begin)}`;
    endTimeText.textContent = `End Date: ${dateConverter.format(dataContext.itemData.finish)}`;
    gauge.min = 0;
    gauge.max = 100;
    gauge.value = dataContext.itemData.progressValue;
    gauge.color = dataContext.color;
    gauge.orientation = 'circular';
    gauge.metricLabel = { rendered: 'on' };
    gauge.plotArea = { rendered: 'on', color: '#E0E0E0' };
    textDiv.replaceChildren(assignmentText, startTimeText, endTimeText);
    tooltipElem.replaceChildren(textDiv, gauge);
    return { insert: tooltipElem };
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
        label={task.data.name}
        svgClassName={getSvgClassName(task.data.name)}
        shortDesc={getShortDesc(task.data, task.rowData.label)}
      />
    );
  };

  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['months', 'weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'days',
    zoomOrder: ['weeks', 'days', 'hours', 'minutes']
  };
  const tooltip: GanttProps['tooltip'] = { renderer: tooltipFunction };
  const ganttProps: Partial<GanttProps> = { rowAxis, gridlines, majorAxis, minorAxis, tooltip };

  return (
    <oj-gantt
      id="gantt"
      aria-label="Custom Tooltip Renderer"
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
  );
};

export default GanttTooltip;
